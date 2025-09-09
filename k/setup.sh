#!/bin/bash

# Prime Numbers Assignment GUI - Automated Setup Script
# This script sets up the complete project structure and dependencies

echo "🚀 Setting up Prime Numbers Assignment GUI..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if Python3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 is not installed. Please install Python3"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

echo "✅ Backend dependencies installed"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

echo "✅ Frontend dependencies installed"

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
pip3 install gmpy2 sympy
if [ $? -ne 0 ]; then
    echo "⚠️  Failed to install Python dependencies. Please install manually:"
    echo "   pip3 install gmpy2 sympy"
fi

cd ..

echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Start the backend: cd backend && npm start"
echo "2. Start the frontend: cd frontend && npm start"
echo "3. Open your browser to http://localhost:3000"
echo ""
echo "🌟 Your Prime Numbers Assignment GUI is ready!"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "🎯 Happy computing!"
