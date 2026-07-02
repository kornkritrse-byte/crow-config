# save.ps1 — copy local Claude files into repo and push to GitHub

$repoDir = $PSScriptRoot
$memorySource = "$HOME\.claude\projects\C--Users-$env:USERNAME-crow-config\memory"

# Persona is stored as CROW.md in the repo (not CLAUDE.md) to avoid double-loading
# when a session runs from inside the repo. The loaded copy is ~/CLAUDE.md.
Copy-Item "$HOME\CLAUDE.md" -Destination "$repoDir\CROW.md" -Force
# Mirror memory (deletes propagate). Guarded on sitrep.md so a wrong-slug or
# empty source dir can never wipe the repo's memory.
if (Test-Path "$memorySource\sitrep.md") {
    robocopy $memorySource "$repoDir\memory" /MIR /NFL /NDL /NJH /NJS | Out-Null
} else {
    Write-Warning "$memorySource has no sitrep.md — skipping memory sync (wrong slug or empty dir?)"
}

Set-Location $repoDir
$changes = git status --porcelain
if ($changes) {
    git add .
    git commit -m "sync $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}
# Push whenever ahead of origin, not only when files just changed — otherwise a
# commit made while offline strands locally (next run sees a clean tree and skips).
$ahead = git rev-list "@{u}..HEAD" 2>$null
if ($ahead) {
    git push
    Write-Host "Saved to GitHub."
} else {
    Write-Host "Nothing new to save."
}
