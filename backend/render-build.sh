#!/bin/bash
# Render build script for backend

echo "🚀 Starting Render build process..."
echo "📍 Current directory: $(pwd)"
echo "📂 Directory contents:"
ls -la

# Navigate to backend directory if not already there
if [ -d "backend" ]; then
  echo "✅ Found backend directory, navigating..."
  cd backend
elif [ -f "package.json" ]; then
  echo "✅ Already in backend directory"
else
  echo "❌ ERROR: Cannot find backend directory!"
  exit 1
fi

echo "📍 Now in: $(pwd)"
echo "📦 Installing dependencies..."
npm install

echo "🔨 Generating Prisma client..."
npx prisma generate

echo "✅ Build complete!"
