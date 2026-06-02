# save.ps1 — copy local Claude files into repo and push to GitHub

$repoDir = $PSScriptRoot
$memorySource = "$HOME\.claude\projects\C--Users-$env:USERNAME\memory"

Copy-Item "$HOME\CLAUDE.md" -Destination "$repoDir\CLAUDE.md" -Force
Copy-Item "$memorySource\*" -Destination "$repoDir\memory\" -Force

Set-Location $repoDir
$changes = git status --porcelain
if ($changes) {
    git add .
    git commit -m "sync $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    git push
    Write-Host "Saved to GitHub."
} else {
    Write-Host "Nothing new to save."
}
