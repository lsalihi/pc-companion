# User Guide - InkBridge PC Companion

Welcome to InkBridge PC Companion! This guide will help you get the most out of your handwriting input experience.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Connecting Your Device](#connecting-your-device)
3. [Using Handwriting Input](#using-handwriting-input)
4. [Gestures and Controls](#gestures-and-controls)
5. [Troubleshooting](#troubleshooting)
6. [Tips and Tricks](#tips-and-tricks)

## Getting Started

### First Launch

1. **Start the Application**
   - Windows: Double-click the InkBridge PC Companion icon
   - macOS: Open from Applications folder
   - Linux: Run the AppImage or launch from your application menu

2. **Allow Network Access**
   - If prompted by your firewall, allow the application to accept incoming connections
   - This is required for your mobile device to connect

3. **QR Code Display**
   - A window will open showing a QR code
- This QR code contains your computer's IP address and connection information

## Connecting Your Device

### Step-by-Step Connection

1. **Ensure Same Network**
   - Your computer and mobile device must be on the same WiFi network
   - 5 GHz WiFi recommended for best performance

2. **Open Mobile App**
   - Launch InkBridge Pro on your mobile device
   - Tap on "Connect to PC"

3. **Scan QR Code**
   - Point your camera at the QR code on your computer screen
   - The app will automatically detect and connect

4. **Connection Confirmed**
   - A message will appear on both devices
   - The status indicator will turn green

### Connection Status

- 🟢 **Green**: Connected and ready
- 🟡 **Yellow**: Connecting...
- 🔴 **Red**: Disconnected

## Using Handwriting Input

### Basic Writing

1. **Start Writing**
   - Once connected, write naturally on your mobile device
   - Text will appear on your computer in real-time

2. **Text Insertion**
   - Text is typed wherever your cursor is focused
   - Works in any application: browsers, word processors, code editors, etc.

3. **Automatic Spacing**
   - The app automatically adds spaces between words
   - Punctuation is handled intelligently

### Advanced Features

#### Clipboard Mode
- Handwriting is copied to clipboard instead of typed
- Useful for pasting in specific locations

#### Burst Mode
- Write continuously without pauses
- Text appears after you finish writing

## Gestures and Controls

### Supported Gestures

| Gesture | Action | How to Perform |
|---------|--------|----------------|
| **Space** | Add space | Swipe right |
| **Backspace** | Delete character | Swipe left |
| **Enter** | New line | Swipe down |
| **Undo** | Undo last action | Two-finger tap |
| **Clear** | Clear current text | Three-finger tap |

### Punctuation

Draw these symbols naturally:
- Period (.)
- Comma (,)
- Question mark (?)
- Exclamation point (!)
- Dash (-)
- Colon (:)
- Semicolon (;)

## Troubleshooting

### Cannot Connect

**Problem**: QR code won't scan

**Solutions**:
1. Ensure both devices are on the same WiFi network
2. Check if firewall is blocking port 3001
3. Try restarting both applications
4. Verify the IP address displayed is correct

**Problem**: Connection drops frequently

**Solutions**:
1. Move closer to your WiFi router
2. Switch to 5 GHz WiFi if available
3. Close other network-intensive applications
4. Check for WiFi interference

### Text Not Appearing

**Problem**: Handwriting recognized but text doesn't appear

**Solutions**:
1. Ensure an application has focus on your computer
2. Click in a text field before writing
3. Check if clipboard mode is enabled
4. Verify keyboard simulation is not blocked

### Performance Issues

**Problem**: Lag or delay in recognition

**Solutions**:
1. Close unnecessary applications on both devices
2. Improve WiFi signal strength
3. Reduce handwriting complexity temporarily
4. Restart both applications

## Tips and Tricks

### Improve Recognition Accuracy

1. **Write Clearly**
   - Use consistent letter sizes
   - Maintain even spacing
   - Write at a steady pace

2. **Calibration**
   - Complete the initial calibration in the mobile app
   - Recalibrate if accuracy decreases

3. **Practice Mode**
   - Use practice mode to improve your handwriting style
   - The system learns from your patterns

### Maximize Productivity

1. **Keyboard Shortcuts**
   - Use gestures for common actions
   - Learn punctuation patterns

2. **Application-Specific Tips**
   - **Coding**: Enable code completion mode
   - **Writing**: Use burst mode for faster input
   - **Forms**: Use clipboard mode for precision

3. **Multi-Monitor Setup**
   - Keep the QR code window on a secondary monitor
   - Write while viewing your work on the primary display

### Security Best Practices

1. **Network Security**
   - Only use on trusted networks
   - Disconnect when not in use
   - Don't share your QR code publicly

2. **Privacy**
   - All data stays on your local network
   - No cloud storage or external servers
   - Handwriting data is not logged

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Q` | Quit application |
| `Ctrl/Cmd + R` | Regenerate QR code |
| `Ctrl/Cmd + D` | Toggle debug mode |
| `Ctrl/Cmd + ,` | Open settings (future) |

## Advanced Configuration

### Custom Port

Edit `server.js` to change the default port (3001):

```javascript
const PORT = 3001; // Change to your preferred port
```

### Network Interface Selection

For systems with multiple network interfaces, the app automatically selects the first non-internal IPv4 address.

## Getting Help

- **Documentation**: [https://github.com/lsalihi/pc-companion](https://github.com/lsalihi/pc-companion)
- **Issues**: Report bugs on GitHub Issues
- **Email**: contact@inkbridge.app
- **Community**: Join our Discord server (link in README)

## Updates

The application will notify you when updates are available. Always keep both the PC Companion and mobile app updated for the best experience.

---

**Need more help?** Check the [Troubleshooting Guide](TROUBLESHOOTING.md) or [Developer Documentation](DEVELOPER.md) for technical details.
