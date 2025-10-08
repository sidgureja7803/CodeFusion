#!/bin/bash

# Fix and Test Script for CodeFusion
# This script fixes email configuration and tests both email and AI features

echo "🛠️ CodeFusion Fix and Test Script"
echo "=================================="

# Change to backend directory
cd "$(dirname "$0")/backend"

echo -e "\n📧 Fixing Email Configuration..."
node fix-email-config.js

echo -e "\n🧪 Testing SMTP Configuration..."
node test-smtp.js

echo -e "\n🤖 Testing AI API Configuration..."
node test-ai.js

echo -e "\n✅ All tests completed!"
echo "Check the output above for any errors or warnings."
echo "If everything is working correctly, restart your backend server:"
echo "cd backend && npm run dev"
