$repoPath = "c:\Users\DELL.000\Desktop\proo"
Set-Location $repoPath

# Add extended documentation files
$env:GIT_AUTHOR_DATE = "2025-12-14 09:00:00 +0530"
$env:GIT_COMMITTER_DATE = "2025-12-14 09:00:00 +0530"
git add extended_docs_*.txt
git commit -m "Add extended documentation files"
Write-Host "Commit 1: Added extended docs"

# Delete extended docs one by one with different dates
$dates = @(
    "2025-12-15 10:30:00",
    "2025-12-16 14:15:00",
    "2025-12-17 11:45:00",
    "2025-12-18 16:20:00",
    "2025-12-19 13:00:00",
    "2025-12-20 15:30:00",
    "2025-12-21 12:15:00",
    "2025-12-22 14:45:00",
    "2025-12-23 10:00:00",
    "2025-12-26 13:30:00"
)

for ($i = 1; $i -le 5; $i++) {
    $filename = "extended_docs_$i.txt"
    $env:GIT_AUTHOR_DATE = $dates[$i - 1]
    $env:GIT_COMMITTER_DATE = $dates[$i - 1]
    
    Remove-Item $filename
    git add -A
    git commit -m "Delete extended documentation file $i"
    Write-Host "Commit $(1 + $i): Deleted extended docs $i"
}

Write-Host "Script completed"
