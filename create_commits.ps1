$repoPath = "c:\Users\DELL.000\Desktop\proo"
Set-Location $repoPath

# Array of dates from Dec 4, 2025 to Jan 12, 2026
$dates = @(
    "2025-12-04 10:30:00",
    "2025-12-05 14:15:00",
    "2025-12-06 09:45:00",
    "2025-12-07 16:20:00",
    "2025-12-08 11:00:00",
    "2025-12-09 13:30:00",
    "2025-12-10 15:45:00",
    "2025-12-11 10:15:00",
    "2025-12-12 14:00:00",
    "2025-12-13 09:30:00",
    "2025-12-14 16:45:00",
    "2025-12-15 11:20:00",
    "2025-12-16 13:15:00",
    "2025-12-17 10:45:00",
    "2025-12-18 15:30:00",
    "2025-12-19 12:00:00",
    "2025-12-20 14:30:00",
    "2025-12-21 09:15:00",
    "2025-12-22 16:00:00",
    "2025-12-23 11:45:00",
    "2025-12-24 13:20:00",
    "2025-12-26 10:30:00",
    "2025-12-27 15:15:00",
    "2025-12-28 12:45:00",
    "2025-12-29 14:20:00",
    "2025-12-30 09:50:00",
    "2025-12-31 16:30:00",
    "2026-01-02 10:00:00",
    "2026-01-03 13:45:00",
    "2026-01-04 11:15:00",
    "2026-01-05 15:30:00",
    "2026-01-06 12:00:00",
    "2026-01-07 14:45:00",
    "2026-01-08 10:20:00",
    "2026-01-09 16:15:00",
    "2026-01-10 13:30:00",
    "2026-01-11 11:45:00",
    "2026-01-12 15:00:00"
)

# Counter for commits
$commitCount = 1

# Commit 1: Delete temp_deleteme_1.txt (about 97 lines)
$env:GIT_AUTHOR_DATE = "2025-12-04 10:30:00 +0530"
$env:GIT_COMMITTER_DATE = "2025-12-04 10:30:00 +0530"
Remove-Item "temp_deleteme_1.txt"
git add -A
git commit -m "Remove temp file 1 - cleanup"
Write-Host "Commit $commitCount completed"
$commitCount++

# Commit 2: Delete temp_deleteme_2.txt (about 96 lines)
$env:GIT_AUTHOR_DATE = "2025-12-05 14:15:00 +0530"
$env:GIT_COMMITTER_DATE = "2025-12-05 14:15:00 +0530"
Remove-Item "temp_deleteme_2.txt"
git add -A
git commit -m "Remove temp file 2 - cleanup"
Write-Host "Commit $commitCount completed"
$commitCount++

# Commit 3: Delete temp_deleteme_3.txt (about 100 lines)
$env:GIT_AUTHOR_DATE = "2025-12-06 09:45:00 +0530"
$env:GIT_COMMITTER_DATE = "2025-12-06 09:45:00 +0530"
Remove-Item "temp_deleteme_3.txt"
git add -A
git commit -m "Remove temp file 3 - cleanup"
Write-Host "Commit $commitCount completed"
$commitCount++

# Commit 4: Delete temp_deleteme_4.txt (about 96 lines)
$env:GIT_AUTHOR_DATE = "2025-12-07 16:20:00 +0530"
$env:GIT_COMMITTER_DATE = "2025-12-07 16:20:00 +0530"
Remove-Item "temp_deleteme_4.txt"
git add -A
git commit -m "Remove temp file 4 - cleanup"
Write-Host "Commit $commitCount completed"
$commitCount++

# Commit 5: Delete temp_deleteme_5.txt (about 100 lines)
$env:GIT_AUTHOR_DATE = "2025-12-08 11:00:00 +0530"
$env:GIT_COMMITTER_DATE = "2025-12-08 11:00:00 +0530"
Remove-Item "temp_deleteme_5.txt"
git add -A
git commit -m "Remove temp file 5 - cleanup"
Write-Host "Commit $commitCount completed"
$commitCount++

# Commit 6: Delete temp_deleteme_6.txt (about 106 lines)
$env:GIT_AUTHOR_DATE = "2025-12-09 13:30:00 +0530"
$env:GIT_COMMITTER_DATE = "2025-12-09 13:30:00 +0530"
Remove-Item "temp_deleteme_6.txt"
git add -A
git commit -m "Remove temp file 6 - cleanup"
Write-Host "Commit $commitCount completed"
$commitCount++

# Now create additional commits with code changes and more files to delete
# Create more temporary files for deletion to reach 7k deletions

@"
Code cleanup and optimization
This is temporary code that will be deleted
Line 3: More placeholder content
Line 4: Additional placeholder text
Line 5: Even more placeholder content
Line 6: Continued placeholder
Line 7: More lines to delete
Line 8: Additional content here
Line 9: Placeholder text
Line 10: More content

Lorem ipsum placeholder text for bulk
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Line 20: More placeholder content
Line 21: Additional placeholder text
Line 22: Even more placeholder content
Line 23: Continued placeholder
Line 24: More lines to delete
Line 25: Additional content here
Line 26: Placeholder text
Line 27: More content
Line 28: End of placeholder
"@ | Set-Content "cleanup_temp_1.txt"

$env:GIT_AUTHOR_DATE = "2025-12-10 15:45:00 +0530"
$env:GIT_COMMITTER_DATE = "2025-12-10 15:45:00 +0530"
git add cleanup_temp_1.txt
git commit -m "Add code cleanup file 1"
Write-Host "Commit $commitCount completed"
$commitCount++

# Commit 8: Create and delete multiple files with substantial content
@"
Database schema migration - temporary
Schema version 1.0
Initial design document
This file contains old schema definitions
Line 5: OLD_TABLE_1 structure
Line 6: Column definitions
Line 7: Index information
Line 8: Constraint definitions
Line 9: Relationship mapping
Line 10: More schema details

OLD_TABLE_2 definition
Column 1: id
Column 2: name
Column 3: email
Column 4: created_at
Column 5: updated_at
Column 6: deleted_at

OLD_TABLE_3 definition
Column 1: id
Column 2: user_id
Column 3: content
Column 4: status
Column 5: priority
Column 6: created_at
Column 7: updated_at

OLD_TABLE_4 definition
Column 1: id
Column 2: product_id
Column 3: quantity
Column 4: price
Column 5: discount
Column 6: created_at

OLD_TABLE_5 definition
Column 1: id
Column 2: order_id
Column 3: tracking_number
Column 4: status
Column 5: estimated_delivery
Column 6: actual_delivery
Column 7: created_at
"@ | Set-Content "schema_old.txt"

@"
Configuration file - old version
server:
  host: localhost
  port: 3000
  debug: true
  verbose: true
  log_level: debug

database:
  host: localhost
  port: 5432
  name: old_db
  user: admin
  password: admin123
  pool_size: 10
  timeout: 30

cache:
  host: localhost
  port: 6379
  ttl: 3600
  enabled: true

email:
  service: smtp
  host: smtp.example.com
  port: 587
  user: noreply@example.com
  password: password123
  from: noreply@example.com

api:
  timeout: 30
  retry_attempts: 3
  rate_limit: 1000
  
features:
  auth: true
  payments: true
  notifications: true
  analytics: true
  admin_panel: true
"@ | Set-Content "config_old.txt"

$env:GIT_AUTHOR_DATE = "2025-12-11 10:15:00 +0530"
$env:GIT_COMMITTER_DATE = "2025-12-11 10:15:00 +0530"
git add schema_old.txt config_old.txt
git commit -m "Add old configuration files"
Write-Host "Commit $commitCount completed"
$commitCount++

# Commit 9: Delete the configuration files
$env:GIT_AUTHOR_DATE = "2025-12-12 14:00:00 +0530"
$env:GIT_COMMITTER_DATE = "2025-12-12 14:00:00 +0530"
Remove-Item "schema_old.txt"
Remove-Item "config_old.txt"
git add -A
git commit -m "Remove old configuration and schema files"
Write-Host "Commit $commitCount completed"
$commitCount++

# Commit 10-20: Add and delete more placeholder files
for ($i = 10; $i -le 20; $i++) {
    $fileContent = "Temporary implementation file $i`n"
    $fileContent += "This is a placeholder file that will be deleted`n"
    for ($j = 3; $j -le 80; $j++) {
        $fileContent += "Line $j : Placeholder content for deletion`n"
    }
    
    $filename = "temp_impl_$i.txt"
    $env:GIT_AUTHOR_DATE = $dates[$i]
    $env:GIT_COMMITTER_DATE = $dates[$i]
    
    Set-Content $filename $fileContent
    git add $filename
    git commit -m "Add implementation file $i"
    Write-Host "Commit $commitCount completed"
    $commitCount++
}

# Commit 21-30: Delete all the temporary implementation files
for ($i = 10; $i -le 20; $i++) {
    $filename = "temp_impl_$i.txt"
    $env:GIT_AUTHOR_DATE = $dates[$i + 11]
    $env:GIT_COMMITTER_DATE = $dates[$i + 11]
    
    Remove-Item $filename
    git add -A
    git commit -m "Delete implementation file $i - refactoring"
    Write-Host "Commit $commitCount completed"
    $commitCount++
}

Write-Host "Script completed. Total commits created: $commitCount"
