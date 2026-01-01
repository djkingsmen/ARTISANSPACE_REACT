#!/usr/bin/env python3
# Generate large text files for deletion

import os

os.chdir(r"c:\Users\DELL.000\Desktop\proo")

# Create massive files
for file_num in range(1, 6):
    filename = f"massive_file_{file_num}.txt"
    
    with open(filename, 'w') as f:
        f.write(f"Massive file {file_num} for deletion\n")
        f.write("=" * 80 + "\n\n")
        
        # Write 1000+ lines per file
        for i in range(1200):
            f.write(f"Line {i}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n")
        
        # Add bulk text
        bulk_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n"
        
        for j in range(100):
            f.write(bulk_text)
    
    print(f"Created {filename}")

print("All files created successfully!")
