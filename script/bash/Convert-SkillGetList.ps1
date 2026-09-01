<#
.SYNOPSIS
    Converts SKILL_GET_LIST.txt (whitespace-delimited, tab-padded) into
    job_id,count,"skill_id,skill_id,..." CSV.

.EXAMPLE
    .\Convert-SkillGetList.ps1
    .\Convert-SkillGetList.ps1 -InputFile .\script\raw_data\SKILL_GET_LIST.txt -OutputFile .\JOB_SKILL_RAW.txt
    .\Convert-SkillGetList.ps1 -Normalized     # emits job_id,skill_id,slot pairs instead
#>

[CmdletBinding()]
param(
    [string]$InputFile  = ".\SKILL_GET_LIST.txt",
    [string]$OutputFile = ".\JOB_SKILL_RAW.txt",
    [switch]$Normalized,
    [switch]$Dedupe,
    [switch]$Header
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath $InputFile)) {
    throw "Input file not found: $InputFile"
}

$out       = [System.Collections.Generic.List[string]]::new()
$warnings  = [System.Collections.Generic.List[string]]::new()
$lineNo    = 0
$jobsSeen  = @{}

if ($Header) {
    if ($Normalized) { $out.Add('job_id,skill_id,slot') }
    else             { $out.Add('job_id,skill_count,skill_ids') }
}

foreach ($line in [System.IO.File]::ReadLines((Resolve-Path -LiteralPath $InputFile))) {
    $lineNo++

    # Split on any run of whitespace (tabs, spaces) and drop empty padding fields.
    $f = $line -split '\s+' | Where-Object { $_ -ne '' }
    if ($f.Count -eq 0) { continue }

    if ($f.Count -lt 3) {
        $warnings.Add("line ${lineNo}: only $($f.Count) field(s), skipped")
        continue
    }

    $jobId    = $f[0]
    $declared = $f[1]
    $skills   = @($f[2..($f.Count - 1)])

    # --- validation -------------------------------------------------------
    if ($jobId -notmatch '^\d+$') {
        $warnings.Add("line ${lineNo}: job id '$jobId' is not numeric, skipped")
        continue
    }
    if ($declared -notmatch '^\d+$') {
        $warnings.Add("line ${lineNo}: count field '$declared' is not numeric, skipped")
        continue
    }
    if ($jobsSeen.ContainsKey($jobId)) {
        $warnings.Add("job ${jobId}: duplicate job id (also on line $($jobsSeen[$jobId]))")
    } else {
        $jobsSeen[$jobId] = $lineNo
    }

    $bad = $skills | Where-Object { $_ -notmatch '^\d+$' }
    if ($bad) {
        $warnings.Add("job ${jobId}: non-numeric skill id(s): $($bad -join ', ')")
    }

    $dupIds = ($skills | Group-Object | Where-Object Count -gt 1).Name
    if ($dupIds) {
        $warnings.Add("job ${jobId}: duplicate skill id(s) in row: $($dupIds -join ', ')")
        if ($Dedupe) { $skills = @($skills | Select-Object -Unique) }
    }

    if ([int]$declared -ne $skills.Count) {
        $warnings.Add("job ${jobId}: declared count $declared, actual $($skills.Count)")
    }

    # --- emit -------------------------------------------------------------
    if ($Normalized) {
        for ($i = 0; $i -lt $skills.Count; $i++) {
            $out.Add("$jobId,$($skills[$i]),$($i + 1)")
        }
    } else {
        $out.Add("$jobId,$($skills.Count),`"$($skills -join ',')`"")
    }
}

# LF endings + no BOM: safest for Postgres COPY and for a bind-mounted Linux container.
$enc = [System.Text.UTF8Encoding]::new($false)
[System.IO.File]::WriteAllText(
    [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $OutputFile)),
    (($out -join "`n") + "`n"),
    $enc
)

Write-Host "Read $lineNo line(s) -> wrote $($out.Count) row(s) to $OutputFile"

if ($warnings.Count) {
    Write-Host ""
    Write-Warning "$($warnings.Count) issue(s) found:"
    $warnings | ForEach-Object { Write-Host "  $_" -ForegroundColor Yellow }
}
