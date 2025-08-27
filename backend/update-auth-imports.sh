#!/bin/bash

# Script to update auth middleware imports across all routes
# Updates from auth.middleware.js to auth.middleware.compatible.js

echo "Updating auth middleware imports in route files..."

# Find all route files and update the import statements
for file in $(find /Users/siddhantgureja/Desktop/CodeFusion/backend/src/routes -name "*.js"); do
  echo "Processing $file"
  sed -i '' 's/from \"..\/middleware\/auth.middleware.js\"/from \"..\/middleware\/auth.middleware.compatible.js\"/g' "$file"
done

echo "Update complete! Please restart your backend server."
