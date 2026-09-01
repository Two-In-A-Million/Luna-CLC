<#
.SYNOPSIS
    Converts ToolTipMsg.txt (#Msg / { } block format) into  id,"message"  CSV.

.DESCRIPTION
    Source layout:
        #Msg<TAB>10017
        {<TAB>
        $Status$ effect: $StatusData$ damage per second.<TAB>
        }<TAB>

    Output:
        10017,"${STATUS} effect: ${STATUSDATA} damage per second."

    - $Token$ is rewritten to ${TOKEN} (uppercased, braces added).
    - Message is always quoted; inner " is doubled (RFC 4180).
    - Multi-line bodies keep a real newline inside the quoted field, which
      Postgres COPY ... CSV reads correctly. Use -JoinWith to flatten instead.
    - Bytes are passed through unchanged (Latin-1 round-trip), so non-ASCII
      characters in some messages are not corrupted.
    - Tolerates the three malformations present in the file: a missing '{',
      an id carried on the '{' line, and a '}' used where '{' belongs.

.EXAMPLE
    .\Convert-ToolTipMsg.ps1 -InputFile ..\raw_data\ToolTipMsg.txt -OutputFile ..\CSV\tooltip.csv
    .\Convert-ToolTipMsg.ps1 -JoinWith ' '          # flatten multi-line messages
    .\Convert-ToolTipMsg.ps1 -DropDuplicates        # keep only first row per id
#>

[CmdletBinding()]
param(
    [string]$InputFile  = ".\ToolTipMsg.txt",
    [string]$OutputFile = ".\tooltip.csv",
    [string]$JoinWith   = "`n",
    [switch]$DropDuplicates,
    [switch]$NoTokenRewrite,
    [switch]$Header
)

$ErrorActionPreference = 'Stop'

$inPath  = (Resolve-Path -LiteralPath $InputFile).Path
$outPath = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $OutputFile))

# Latin-1 maps every byte 0-255 to a char and back, so non-ASCII bytes survive.
$latin1 = [System.Text.Encoding]::GetEncoding(28591)
$raw    = $latin1.GetString([System.IO.File]::ReadAllBytes($inPath))

# strip the trailing padding tab each line carries
$lines = @($raw -split "`r`n|`n|`r" | ForEach-Object { $_.TrimEnd("`t") })

$rows  = [System.Collections.Generic.List[string]]::new()
$notes = [System.Collections.Generic.List[string]]::new()
$seen  = @{}

if ($Header) { $rows.Add('msg_id,message') }

$i = 0
$n = $lines.Count

while ($i -lt $n) {
    if (-not $lines[$i].StartsWith('#Msg')) { $i++; continue }

    $start = $i + 1
    $parts = $lines[$i] -split "`t"
    $id    = if ($parts.Count -gt 1) { $parts[1].Trim() } else { '' }
    $i++

    while ($i -lt $n -and $lines[$i].Trim() -eq '') { $i++ }

    if ($i -lt $n -and $lines[$i].StartsWith('{')) {
        $bp = $lines[$i] -split "`t"
        if (-not $id -and $bp.Count -gt 1 -and $bp[1].Trim()) {
            $id = $bp[1].Trim()
            $notes.Add("line ${start}: id recovered from brace line -> $id")
        }
        $i++
    }
    elseif ($i -lt $n -and $lines[$i] -eq '}') {
        $notes.Add("line ${start}: id $id opened with '}' instead of '{'")
        $i++
    }
    else {
        $notes.Add("line ${start}: id $id has no opening brace")
    }

    $body = [System.Collections.Generic.List[string]]::new()
    while ($i -lt $n -and $lines[$i] -ne '}') { $body.Add($lines[$i]); $i++ }
    $i++

    if ($id -notmatch '^\d+$') {
        $notes.Add("line ${start}: unusable id '$id', skipped")
        continue
    }
    if ($seen.ContainsKey($id)) {
        $notes.Add("line ${start}: duplicate id $id (first seen line $($seen[$id]))")
        if ($DropDuplicates) { continue }
    } else { $seen[$id] = $start }

    $msg = $body -join $JoinWith

    if (-not $NoTokenRewrite) {
        $msg = [regex]::Replace($msg, '\$([A-Za-z0-9_]+)\$', {
            param($m) '${' + $m.Groups[1].Value.ToUpperInvariant() + '}'
        })
    }

    $rows.Add("$id,`"$($msg.Replace('"','""'))`"")
}

$text = ($rows -join "`n") + "`n"
[System.IO.File]::WriteAllBytes($outPath, $latin1.GetBytes($text))

Write-Host "Parsed $n line(s) -> $($rows.Count) row(s) to $OutputFile"

if ($notes.Count) {
    $dupes = @($notes | Where-Object { $_ -like '*duplicate id*' }).Count
    Write-Host ""
    Write-Warning "$($notes.Count) issue(s) ($dupes duplicate id(s)):"
    $notes | Where-Object { $_ -notlike '*duplicate id*' } |
        Select-Object -First 40 | ForEach-Object { Write-Host "  $_" -ForegroundColor Yellow }
}
