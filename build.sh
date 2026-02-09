#!/bin/bash

# InkBridge PC Companion - Build Script
# Builds distributable packages for all platforms

set -e  # Exit on error

echo "🔨 Building InkBridge PC Companion..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "${YELLOW}⚠️  Installing dependencies...${NC}"
  npm install
fi

# Clean dist directory
echo "${BLUE}🧹 Cleaning dist directory...${NC}"
rm -rf dist/

# Build for all platforms or specific platform
BUILD_TARGET="${1:-all}"

case $BUILD_TARGET in
  linux)
    echo "${BLUE}🐧 Building for Linux...${NC}"
    npm run build:linux
    ;;
  windows)
    echo "${BLUE}🪟 Building for Windows...${NC}"
    npm run build:windows
    ;;
  mac)
    echo "${BLUE}🍎 Building for macOS...${NC}"
    npm run build:mac
    ;;
  all)
    echo "${BLUE}🌐 Building for all platforms...${NC}"
    npm run build
    ;;
  *)
    echo "${YELLOW}Usage: $0 [linux|windows|mac|all]${NC}"
    exit 1
    ;;
esac

echo ""
echo "${GREEN}✅ Build complete!${NC}"
echo ""
echo "📦 Packages created in ./dist/"
ls -lh dist/ || echo "No dist directory found"

echo ""
echo "${BLUE}📋 Next steps:${NC}"
echo "  1. Test the packages on target platforms"
echo "  2. Create release on GitHub"
echo "  3. Upload packages to release"
echo ""
