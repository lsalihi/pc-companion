#!/bin/bash

# InkBridge PC Companion - Installation Script
# Installs dependencies and prepares the application

set -e

echo "🖊️  InkBridge PC Companion - Setup"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check Node.js installation
echo "${BLUE}Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
  echo "${RED}❌ Node.js is not installed${NC}"
  echo "Please install Node.js from https://nodejs.org/"
  exit 1
fi

NODE_VERSION=$(node -v)
echo "${GREEN}✅ Node.js ${NODE_VERSION} found${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
  echo "${RED}❌ npm is not installed${NC}"
  exit 1
fi

NPM_VERSION=$(npm -v)
echo "${GREEN}✅ npm ${NPM_VERSION} found${NC}"
echo ""

# Install dependencies
echo "${BLUE}📦 Installing dependencies...${NC}"
npm install

echo ""
echo "${GREEN}✅ Installation complete!${NC}"
echo ""
echo "${BLUE}📋 Available commands:${NC}"
echo "  npm start              - Start the application"
echo "  npm run dev            - Start in development mode"
echo "  npm run build          - Build for all platforms"
echo "  npm run build:linux    - Build for Linux"
echo "  npm run build:windows  - Build for Windows"
echo "  npm run build:mac      - Build for macOS"
echo ""
echo "${YELLOW}To start the application, run:${NC}"
echo "  npm start"
echo ""
