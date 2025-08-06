#!/bin/bash

echo "🚀 Starting SymptoScan MERN Stack Application"
echo "============================================="

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   sudo systemctl start mongod"
    echo "   OR"
    echo "   mongod --dbpath /path/to/your/db"
    exit 1
fi

echo "✅ MongoDB is running"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"

# Install dependencies if node_modules don't exist
if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server && npm install && cd ..
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && npm install && cd ..
fi

# Seed the database
echo "🌱 Seeding database with sample data..."
cd server && npm run seed && cd ..

# Start the backend server
echo "🔧 Starting backend server on port 5000..."
cd server && npm run dev &
SERVER_PID=$!

# Wait a moment for server to start
sleep 3

# Start the frontend
echo "🎨 Starting frontend on port 3000..."
cd client && npm run dev &
CLIENT_PID=$!

echo ""
echo "🎉 SymptoScan is now running!"
echo "================================"
echo "🔗 Frontend: http://localhost:3000"
echo "🔗 Backend:  http://localhost:5000"
echo "🔗 API Health: http://localhost:5000/api/health"
echo ""
echo "📱 Features Available:"
echo "   • User Registration & Login"
echo "   • AI-Powered Symptom Checker"
echo "   • Diagnosis Results with Severity"
echo "   • User Dashboard with History"
echo "   • Contact Form"
echo "   • Responsive Premium UI"
echo ""
echo "⚠️  Medical Disclaimer: This is for educational purposes only."
echo "   Always consult healthcare professionals for medical advice."
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait $SERVER_PID $CLIENT_PID