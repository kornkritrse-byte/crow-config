# load.ps1 — pull from GitHub and copy files to local Claude locations

$repoDir = $PSScriptRoot
$memoryDest = "$HOME\.claude\projects\C--Users-$env:USERNAME-crow-config\memory"

Set-Location $repoDir
git pull

Copy-Item "$repoDir\CROW.md" -Destination "$HOME\CLAUDE.md" -Force

if (-not (Test-Path $memoryDest)) {
    New-Item -ItemType Directory -Force -Path $memoryDest | Out-Null
}
# Mirror memory (deletes propagate — otherwise this machine's stale live copy
# resurrects deleted files into the repo on its next save).
if (Test-Path "$repoDir\memory\sitrep.md") {
    robocopy "$repoDir\memory" $memoryDest /MIR /NFL /NDL /NJH /NJS | Out-Null
} else {
    Write-Warning "repo memory\ has no sitrep.md — skipping memory load (broken checkout?)"
}

Write-Host "Loaded from GitHub."
