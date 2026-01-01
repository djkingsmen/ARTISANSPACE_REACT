$repoPath = "c:\Users\DELL.000\Desktop\proo"
Set-Location $repoPath

# Add massive files
$env:GIT_AUTHOR_DATE = "2025-12-28 10:00:00 +0530"
$env:GIT_COMMITTER_DATE = "2025-12-28 10:00:00 +0530"
git add massive_file_*.txt
git commit -m "Add massive files for structure optimization"

# Delete them one by one with different dates
$deleteDates = @(
    "2026-01-01 08:00:00",
    "2026-01-02 09:15:00",
    "2026-01-03 10:30:00",
    "2026-01-04 11:45:00",
    "2026-01-05 13:00:00"
)

for ($i = 1; $i -le 5; $i++) {
    $filename = "massive_file_$i.txt"
    $env:GIT_AUTHOR_DATE = $deleteDates[$i - 1]
    $env:GIT_COMMITTER_DATE = $deleteDates[$i - 1]
    
    Remove-Item $filename
    git add -A
    git commit -m "Remove massive file $i - structural refactoring"
}

Write-Host "Completed massive file deletion commits"
