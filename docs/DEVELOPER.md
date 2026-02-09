# Developer Guide - InkBridge PC Companion

Technical documentation for developers working with or contributing to InkBridge PC Companion.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Development Setup](#development-setup)
3. [Project Structure](#project-structure)
4. [Core Components](#core-components)
5. [WebSocket API](#websocket-api)
6. [Building and Distribution](#building-and-distribution)
7. [Testing](#testing)
8. [Contributing](#contributing)

## Architecture Overview

### Technology Stack

- **Electron**: Desktop application framework
- **Node.js**: Runtime environment
- **Express**: HTTP server
- **WebSocket (ws)**: Real-time communication
- **RobotJS**: Keyboard/mouse automation
- **QRCode**: QR code generation
- **Clipboardy**: Cross-platform clipboard access

### Architecture Diagram

```
┌─────────────────────────────────────┐
│     Electron Main Process           │
│  ┌───────────────────────────────┐  │
│  │   Renderer Process (UI)      │  │
│  │   - QR Code Display          │  │
│  │   - Connection Status        │  │
│  └───────────────────────────────┘  │
└─────────────────┬───────────────────┘
                  │
                  │ IPC
                  │
┌─────────────────▼───────────────────┐
│     Node.js Server Process          │
│  ┌───────────────────────────────┐  │
│  │   Express HTTP Server        │  │
│  │   - /status endpoint         │  │
│  │   - /qr endpoint             │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │   WebSocket Server           │  │
│  │   - handwriting events       │  │
│  │   - gesture events           │  │
│  │   - text events              │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │   RobotJS Integration        │  │
│  │   - Keyboard simulation      │  │
│  │   - Mouse control            │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
                  │
                  │ Network
                  │
┌─────────────────▼───────────────────┐
│     Mobile App (React Native)       │
│  ┌───────────────────────────────┐  │
│  │   QR Scanner                 │  │
│  │   Canvas for Handwriting     │  │
│  │   WebSocket Client           │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- Python (for RobotJS compilation)
- Build tools:
  - **Windows**: Visual Studio Build Tools
  - **macOS**: Xcode Command Line Tools
  - **Linux**: build-essential package

### Installation

```bash
# Clone repository
git clone https://github.com/lsalihi/pc-companion.git
cd pc-companion

# Install dependencies
npm install

# Start development
npm run dev
```

### Environment Variables

Create a `.env` file (optional):

```env
PORT=3001
DEBUG=true
LOG_LEVEL=info
```

## Project Structure

```
pc-companion/
├── main.js                 # Electron main process
├── server.js               # WebSocket/HTTP server
├── package.json            # Project configuration
├── package-lock.json       # Dependency lock file
│
├── docs/                   # Documentation
│   ├── USER_GUIDE.md
│   ├── DEVELOPER.md
│   ├── API.md
│   └── TROUBLESHOOTING.md
│
├── build/                  # Build resources
│   ├── icon.png           # Linux icon
│   ├── icon.ico           # Windows icon
│   └── icon.icns          # macOS icon
│
├── dist/                   # Build output (generated)
│   ├── linux/
│   ├── win/
│   └── mac/
│
├── node_modules/           # Dependencies (git-ignored)
├── .gitignore             # Git ignore rules
├── LICENSE                # MIT License
├── README.md              # Project overview
├── CHANGELOG.md           # Version history
└── CONTRIBUTING.md        # Contribution guidelines
```

## Core Components

### 1. Electron Main Process (`main.js`)

Manages the Electron application lifecycle and UI.

```javascript
const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  
  // Load UI content
  win.loadHTML(generateQRCodeHTML());
}
```

### 2. Server Process (`server.js`)

Handles WebSocket connections and HTTP endpoints.

**Key Functions:**

```javascript
// Get local IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// Handle WebSocket connections
wss.on('connection', (ws, req) => {
  connectedClients.add(ws);
  
  ws.on('message', (message) => {
    handleMessage(ws, message);
  });
  
  ws.on('close', () => {
    connectedClients.delete(ws);
  });
});
```

### 3. Keyboard Simulation

Uses RobotJS for keyboard automation.

```javascript
const robot = require('robotjs');

function typeText(text) {
  // Get current session type
  const sessionType = process.env.XDG_SESSION_TYPE;
  
  if (sessionType === 'wayland') {
    // Wayland: Use clipboard method
    clipboardy.writeSync(text);
    robot.keyTap('v', ['control']);
  } else {
    // X11: Direct typing
    robot.typeString(text);
  }
}
```

## WebSocket API

### Events from Mobile App

#### 1. `handwriting`
Receives handwriting stroke data.

**Payload:**
```json
{
  "type": "handwriting",
  "data": {
    "strokes": [
      {
        "points": [
          {"x": 100, "y": 200, "timestamp": 1234567890},
          {"x": 105, "y": 205, "timestamp": 1234567895}
        ]
      }
    ]
  }
}
```

#### 2. `text`
Receives recognized text.

**Payload:**
```json
{
  "type": "text",
  "data": {
    "text": "Hello World",
    "confidence": 0.95
  }
}
```

#### 3. `gesture`
Receives gesture commands.

**Payload:**
```json
{
  "type": "gesture",
  "data": {
    "gesture": "space" | "backspace" | "enter" | "undo"
  }
}
```

#### 4. `punctuation`
Receives punctuation marks.

**Payload:**
```json
{
  "type": "punctuation",
  "data": {
    "symbol": "." | "," | "?" | "!" | etc.
  }
}
```

### Events to Mobile App

#### 1. `connection_status`
Sends connection status updates.

```json
{
  "type": "connection_status",
  "status": "connected" | "disconnected",
  "clientCount": 1
}
```

#### 2. `error`
Sends error messages.

```json
{
  "type": "error",
  "message": "Error description"
}
```

## HTTP Endpoints

### `GET /status`
Health check endpoint.

**Response:**
```json
{
  "status": "running",
  "version": "1.0.0",
  "connections": 1,
  "uptime": 3600,
  "sessionType": "x11"
}
```

### `GET /qr`
Returns QR code as data URL.

**Response:**
```json
{
  "qrCode": "data:image/png;base64,..."
}
```

## Building and Distribution

### Development Build

```bash
npm run dev
```

### Production Build

```bash
# Build for current platform
npm run build

# Build for specific platform
npm run build:linux
npm run build:windows
npm run build:mac
```

### Build Configuration

Edit `package.json` build section:

```json
{
  "build": {
    "appId": "com.inkbridge.pccompanion",
    "productName": "InkBridge PC Companion",
    "directories": {
      "output": "dist"
    },
    "linux": {
      "target": ["AppImage", "deb"],
      "category": "Utility"
    }
  }
}
```

### Creating Installers

Executables are generated in `dist/` directory:
- **Windows**: `.exe` installer and portable `.exe`
- **macOS**: `.dmg` disk image and `.zip`
- **Linux**: `.AppImage` and `.deb` package

## Testing

### Manual Testing

1. Start the application
2. Connect with mobile app
3. Test handwriting recognition
4. Test gestures
5. Test different applications

### Automated Testing (Future)

```bash
npm test
```

### Debug Mode

Enable verbose logging:

```bash
DEBUG=* npm start
```

## Performance Optimization

### WebSocket Performance

- Use binary frames for stroke data
- Implement compression for text
- Batch small messages
- Use connection pooling

### RobotJS Optimization

```javascript
// Set typing delay (ms)
robot.setKeyboardDelay(10);

// Batch operations
function typeBatch(texts) {
  texts.forEach(text => robot.typeString(text));
}
```

## Security Considerations

### Network Security

1. **Local Network Only**
   - Bind to local interface only
   - Don't expose to public internet

2. **Input Sanitization**
   ```javascript
   function sanitizeInput(text) {
     return text.replace(/[<>]/g, '');
   }
   ```

3. **Rate Limiting**
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   app.use(rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
   }));
   ```

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

### Code Style

- Use ESLint configuration
- Follow Airbnb JavaScript Style Guide
- Add JSDoc comments

### Pull Request Process

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Update documentation
6. Submit pull request

## Debugging

### Electron DevTools

```javascript
// In main.js
win.webContents.openDevTools();
```

### Server Logs

```javascript
// Add detailed logging
wss.on('connection', (ws, req) => {
  console.log(`[${new Date().toISOString()}] New connection from ${req.socket.remoteAddress}`);
});
```

### Network Debugging

```bash
# Monitor WebSocket traffic
npm install -g wscat
wscat -c ws://localhost:3001
```

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [RobotJS Documentation](http://robotjs.io/docs/)
- [Node.js Guides](https://nodejs.org/en/docs/guides/)

---

**Questions?** Open an issue or contact the development team.
