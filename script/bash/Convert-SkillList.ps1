<#
.SYNOPSIS
    Converts SkillList.txt (tab-delimited, tab-padded, CRLF, TIS-620 bytes)
    into comma-delimited CSV suitable for Postgres COPY.

.DESCRIPTION
    - Splits on TAB only (never on whitespace - the name column contains real spaces).
    - Drops trailing empty padding fields, keeps interior fields as-is.
    - Rows whose field count != -FieldCount are written to <output>.bad instead
      of the main file, because their columns are shifted and would import wrong.
    - Fields containing a comma or quote are RFC-4180 quoted.
    - Bytes are passed through unchanged (Latin-1 round-trip), so the Thai
      TIS-620 characters in some skill names are not corrupted.

.EXAMPLE
    .\Convert-SkillList.ps1
    .\Convert-SkillList.ps1 -InputFile .\script\raw_data\SkillList.txt -OutputFile .\SKILL_RAW.csv
    .\Convert-SkillList.ps1 -KeepRagged      # write ragged rows into the main file anyway
    .\Convert-SkillList.ps1 -NoQuote         # never quote (matches naive awk output)
#>

[CmdletBinding()]
param(
    [string]$InputFile  = ".\SkillList.txt",
    [string]$OutputFile = ".\SKILL_RAW.csv",
    [int]   $FieldCount = 54,
    [switch]$KeepRagged,
    [switch]$AsciiOnly,
    [int]   $Transcode = 0,
    [switch]$NoQuote,
    [switch]$Header
)

$ErrorActionPreference = 'Stop'

$inPath = (Resolve-Path -LiteralPath $InputFile).Path
$outPath = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $OutputFile))
$badPath = $outPath + '.bad'

# Latin-1 maps every byte 0-255 to a char and back, so non-ASCII bytes survive intact.
$latin1 = [System.Text.Encoding]::GetEncoding(28591)
$text   = $latin1.GetString([System.IO.File]::ReadAllBytes($inPath))

$good = [System.Collections.Generic.List[string]]::new()
$bad  = [System.Collections.Generic.List[string]]::new()
$seen = @{}
$notes = [System.Collections.Generic.List[string]]::new()

if ($Header) { $good.Add("skill_id,$( (2..$FieldCount | ForEach-Object { "c$_" }) -join ',' )") }

$lineNo = 0
foreach ($line in ($text -split "`r`n|`n|`r")) {
    $lineNo++
    if ($line.Trim() -eq '') { continue }

    $f = $line -split "`t"

    # drop trailing empty padding only
    $end = $f.Count
    while ($end -gt 0 -and $f[$end - 1] -eq '') { $end-- }
    $f = @($f[0..($end - 1)])

    # non-ASCII handling: these are TIS-620 (cp874) Thai bytes, not UTF-8
    $hasHigh = $false
    foreach ($c in $f) { foreach ($ch in $c.ToCharArray()) { if ([int]$ch -gt 127) { $hasHigh = $true; break } } }

    if ($hasHigh) {
        if ($AsciiOnly) {
            $notes.Add("line ${lineNo}: id $($f[0]) has non-ASCII bytes, excluded")
            $bad.Add(($f -join ','))
            continue
        }
        if ($Transcode -gt 0) {
            $src = [System.Text.Encoding]::GetEncoding($Transcode)
            $f = @($f | ForEach-Object { $src.GetString($latin1.GetBytes($_)) })
        }
    }

    # RFC-4180 quoting
    $cells = foreach ($c in $f) {
        if (-not $NoQuote -and ($c.Contains(',') -or $c.Contains('"'))) {
            '"' + $c.Replace('"', '""') + '"'
        } else { $c }
    }
    $row = $cells -join ','

    $id = $f[0]
    if ($seen.ContainsKey($id)) {
        $notes.Add("line ${lineNo}: duplicate id $id (first seen line $($seen[$id]))")
    } else { $seen[$id] = $lineNo }

    if ($f.Count -ne $FieldCount) {
        $notes.Add("line ${lineNo}: id $id has $($f.Count) fields, expected $FieldCount")
        if ($KeepRagged) { $good.Add($row) } else { $bad.Add($row) }
    } else {
        $good.Add($row)
    }
}

$outEnc = if ($Transcode -gt 0) { [System.Text.UTF8Encoding]::new($false) } else { $latin1 }

function Write-Lf([string]$path, $rows) {
    if ($rows.Count -eq 0) { return }
    $s = ($rows -join "`n") + "`n"
    [System.IO.File]::WriteAllBytes($path, $script:outEnc.GetBytes($s))
}

Write-Lf $outPath $good
Write-Lf $badPath $bad

Write-Host "Read $lineNo line(s)"
Write-Host "  -> $($good.Count) row(s) to $OutputFile"
if ($bad.Count) { Write-Host "  -> $($bad.Count) ragged row(s) quarantined to $([System.IO.Path]::GetFileName($badPath))" -ForegroundColor Yellow }

if ($notes.Count) {
    Write-Host ""
    Write-Warning "$($notes.Count) issue(s):"
    $notes | Select-Object -First 60 | ForEach-Object { Write-Host "  $_" -ForegroundColor Yellow }
    if ($notes.Count -gt 60) { Write-Host "  ... $($notes.Count - 60) more" -ForegroundColor Yellow }
}
