# load.ps1 — pull from GitHub and copy files to local Claude locations

$repoDir = $PSScriptRoot
$memoryDest = "$HOME\.claude\projects\C--Users-$env:USERNAME\memory"

Set-Location $repoDir
git pull

Copy-Item "$repoDir\CLAUDE.md" -Destination "$HOME\CLAUDE.md" -Force

if (-not (Test-Path $memoryDest)) {
    New-Item -ItemType Directory -Force -Path $memoryDest | Out-Null
}
Copy-Item "$repoDir\memory\*" -Destination "$memoryDest\" -Force

Write-Host "Loaded from GitHub."
