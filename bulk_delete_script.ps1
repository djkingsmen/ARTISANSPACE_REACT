$repoPath = "c:\Users\DELL.000\Desktop\proo"
Set-Location $repoPath

# Add bulk deletion files
$env:GIT_AUTHOR_DATE = "2025-12-24 10:00:00 +0530"
$env:GIT_COMMITTER_DATE = "2025-12-24 10:00:00 +0530"
git add bulk_delete_*.txt
git commit -m "Add bulk files for deletion"

# Delete them one by one with different dates
$deleteDates = @(
    "2025-12-25 11:30:00",
    "2026-01-01 12:00:00",
    "2026-01-05 13:30:00",
    "2026-01-10 14:00:00"
)

for ($i = 1; $i -le 4; $i++) {
    $filename = "bulk_delete_$i.txt"
    $env:GIT_AUTHOR_DATE = $deleteDates[$i - 1]
    $env:GIT_COMMITTER_DATE = $deleteDates[$i - 1]
    
    Remove-Item $filename
    git add -A
    git commit -m "Delete bulk file $i - code cleanup"
}

Write-Host "Completed bulk deletion commits"
