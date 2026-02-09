# 🖊️ InkBridge PC Companion

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/lsalihi/pc-companion)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)]()

Professional desktop companion application for **InkBridge Pro** mobile app. Transform your mobile device into a powerful handwriting input tool for your computer.

## ✨ Features

- 🔄 **Real-time Communication**: WebSocket-based instant data transfer
- 📱 **Easy Connection**: Scan QR code to connect mobile and desktop
- ✍️ **Handwriting Input**: Receive handwritten text from your mobile device
- ⌨️ **Keyboard Simulation**: Automatic typing of recognized text using RobotJS
- 📋 **Clipboard Integration**: Copy handwriting to clipboard instantly
- 🎨 **Modern UI**: Beautiful Electron-based interface
- 🔒 **Secure**: Local network communication only
- 🌐 **Cross-Platform**: Works on Windows, macOS, and Linux

## 📦 Installation

### Option 1: Download Executable (Recommended for Users)

Download the latest release for your platform:
- **Windows**: `InkBridge-PC-Companion-Setup-1.0.0.exe`
- **macOS**: `InkBridge-PC-Companion-1.0.0.dmg`
- **Linux**: `InkBridge-PC-Companion-1.0.0.AppImage` or `.deb`

[Download Latest Release →](https://github.com/lsalihi/pc-companion/releases)

### Option 2: Install from Source (For Developers)

```bash
# Clone the repository
git clone https://github.com/lsalihi/pc-companion.git
cd pc-companion

# Install dependencies
npm install

# Start the application
npm start
```

## 🚀 Quick Start

1. **Launch the Application**
   - Double-click the installed application, or run `npm start` from source

2. **Scan QR Code**
   - Open InkBridge Pro mobile app
   - Navigate to "Connect to PC"
   - Scan the QR code displayed on your computer

3. **Start Writing**
   - Write on your mobile device
   - Text appears automatically on your computer

## 📖 Documentation

- [User Guide](docs/USER_GUIDE.md) - Complete usage instructions
- [Developer Guide](docs/DEVELOPER.md) - Technical documentation
- [API Reference](docs/API.md) - WebSocket API documentation
- [Troubleshooting](docs/TROUBLESHOOTING.md) - Common issues and solutions

## 🛠️ System Requirements

### Minimum Requirements
- **OS**: Windows 10+, macOS 10.13+, or Linux (Ubuntu 18.04+)
- **RAM**: 2 GB
- **Network**: WiFi connection
- **Mobile**: InkBridge Pro app installed

### Recommended
- **RAM**: 4 GB or more
- **Network**: 5 GHz WiFi for best performance

## 🔧 Configuration

The application uses port `3001` by default. To change:

```javascript
// Edit server.js
const PORT = 3001; // Change to your preferred port
```

For advanced configuration, see [Developer Guide](docs/DEVELOPER.md).

## 🏗️ Building from Source

### Build Executables

```bash
# Install dev dependencies
npm install

# Build for all platforms
npm run build

# Or build for specific platform
npm run build:linux
npm run build:windows
npm run build:mac
```

Output files will be in the `dist/` directory.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

## 🐛 Bug Reports

Found a bug? Please [open an issue](https://github.com/lsalihi/pc-companion/issues) with:
- Operating system and version
- Application version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 🔐 Security

For security concerns, please email: security@inkbridge.app

Do not open public issues for security vulnerabilities.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Electron](https://www.electronjs.org/) - Desktop application framework
- [Express](https://expressjs.com/) - Web server framework
- [WebSocket](https://github.com/websockets/ws) - Real-time communication
- [RobotJS](http://robotjs.io/) - Keyboard automation
- [QRCode](https://www.npmjs.com/package/qrcode) - QR code generation

## 📧 Contact

- Website: [inkbridge.app](https://inkbridge.app)
- Email: contact@inkbridge.app
- GitHub: [@lsalihi](https://github.com/lsalihi)

## ⭐ Support

If you find this project helpful, please give it a ⭐️ on GitHub!

---

Made with ❤️ by the InkBridge Team

