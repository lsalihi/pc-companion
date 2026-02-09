# Troubleshooting Guide

Common issues and solutions for InkBridge PC Companion.

## Table of Contents

1. [Connection Issues](#connection-issues)
2. [QR Code Problems](#qr-code-problems)
3. [Text Input Issues](#text-input-issues)
4. [Performance Problems](#performance-problems)
5. [Platform-Specific Issues](#platform-specific-issues)
6. [Network Issues](#network-issues)

---

## Connection Issues

### Cannot Connect to PC

**Symptoms:**
- Mobile app shows "Connection failed"
- QR code scans but connection times out
- Connection drops immediately

**Solutions:**

1. **Check Network Connection**
   ```bash
   # Verify both devices are on same network
   # On PC:
   ip addr show  # Linux
   ipconfig      # Windows
   ifconfig      # macOS
   ```

2. **Check Firewall**
   
   **Linux:**
   ```bash
   sudo ufw allow 3001
   # Or
   sudo firewall-cmd --add-port=3001/tcp --permanent
   ```
   
   **Windows:**
   - Open Windows Defender Firewall
   - Allow InkBridge PC Companion through firewall
   - Allow port 3001 TCP/UDP
   
   **macOS:**
   - System Preferences → Security & Privacy → Firewall
   - Firewall Options → Add InkBridge PC Companion

3. **Verify Port Availability**
   ```bash
   # Check if port 3001 is in use
   netstat -an | grep 3001      # Linux/macOS
   netstat -an | findstr 3001   # Windows
   ```

4. **Restart Both Applications**
   - Close mobile app completely
   - Quit PC Companion
   - Start PC Companion first
   - Then open mobile app

---

### Frequent Disconnections

**Symptoms:**
- Connection drops every few minutes
- "Reconnecting..." message appears frequently

**Solutions:**

1. **Improve WiFi Signal**
   - Move closer to router
   - Switch to 5 GHz band if available
   - Reduce interference (other devices, microwaves)

2. **Check Router Settings**
   - Disable AP isolation
   - Increase DHCP lease time
   - Enable QoS for better prioritization

3. **Disable Power Saving**
   
   **Android:**
   - Settings → Battery → Battery Optimization
   - Disable for InkBridge Pro
   
   **iOS:**
   - Settings → General → Background App Refresh
   - Enable for InkBridge Pro

---

## QR Code Problems

### QR Code Not Displaying

**Symptoms:**
- Window opens but QR code is blank
- Error message when generating QR code

**Solutions:**

1. **Check Console Logs**
   ```bash
   # Start with debug mode
   npm start
   # Look for QR generation errors
   ```

2. **Verify Dependencies**
   ```bash
   npm install qrcode --save
   ```

3. **Manual IP Entry**
   ```
   ws://YOUR_IP:3001
   ```
   Enter this URL manually in mobile app settings

---

### QR Code Won't Scan

**Symptoms:**
- Camera focuses but doesn't detect QR code
- Scanner shows "Invalid QR code"

**Solutions:**

1. **Improve Display Quality**
   - Increase window size
   - Adjust screen brightness
   - Clean screen

2. **Try Different Camera**
   - Use device's back camera instead of front
   - Ensure adequate lighting

3. **Update Mobile App**
   - Check for updates in app store
   - Ensure compatibility

---

## Text Input Issues

### Text Not Appearing

**Symptoms:**
- Handwriting recognized but nothing types
- Gestures work but text doesn't

**Solutions:**

1. **Check Focus**
   - Click in a text field before writing
   - Ensure target application has focus

2. **Platform-Specific Fixes**

   **Wayland (Linux):**
   ```bash
   # Set environment variable
   export XDG_SESSION_TYPE=wayland
   npm start
   ```
   
   **X11 (Linux):**
   ```bash
   # Install XDoTool
   sudo apt-get install xdotool  # Ubuntu/Debian
   sudo dnf install xdotool      # Fedora
   ```

3. **Verify RobotJS**
   ```bash
   # Reinstall RobotJS
   npm uninstall robotjs
   npm install robotjs --save
   ```

4. **Test Keyboard Simulation**
   ```javascript
   // In server.js, add debug:
   console.log('Typing:', text);
   robot.typeString('test');
   ```

---

### Wrong Characters Appearing

**Symptoms:**
- Different text than what was written
- Special characters appear incorrectly

**Solutions:**

1. **Check Keyboard Layout**
   - Ensure PC keyboard layout matches expected
   - ENG US recommended

2. **Character Encoding**
   ```javascript
   // In server.js:
   const text = Buffer.from(data.text, 'utf8').toString();
   ```

3. **Disable Autocorrect**
   - Turn off autocorrect in target application
   - May interfere with handwriting input

---

### Gestures Not Working

**Symptoms:**
- Space, backspace, enter don't respond
- Undo doesn't work

**Solutions:**

1. **Check RobotJS Permissions**
   
   **macOS:**
   - System Preferences → Security & Privacy
   - Privacy → Accessibility
   - Add Terminal or Electron

   **Linux:**
   - Run with sudo (not recommended)
   - Or add user to input group:
   ```bash
   sudo usermod -a -G input $USER
   ```

2. **Test Individual Gestures**
   ```javascript
   // Debug in server.js:
   robot.keyTap('space');
   console.log('Space tapped');
   ```

---

## Performance Problems

### Lag or Delay

**Symptoms:**
- Text appears seconds after writing
- Noticeable delay between write and type

**Solutions:**

1. **Network Optimization**
   ```bash
   # Check ping
   ping YOUR_PC_IP
   # Should be < 10ms
   ```

2. **Reduce System Load**
   - Close unnecessary applications
   - Disable antivirus temporarily for testing
   - Check CPU/RAM usage

3. **Optimize WebSocket**
   ```javascript
   // In server.js:
   wss.on('connection', (ws) => {
     ws.binaryType = 'arraybuffer'; // Faster
   });
   ```

4. **Batch Messages**
   - Enable batching in mobile app settings
   - Reduces network overhead

---

### High CPU Usage

**Symptoms:**
- PC Companion uses excessive CPU
- System becomes slow

**Solutions:**

1. **Check for Loops**
   ```bash
   # Monitor in real-time
   top    # Linux/macOS
   taskmgr.exe  # Windows
   ```

2. **Limit Sampling Rate**
   ```javascript
   // In mobile app:
   const SAMPLE_RATE = 60; // Sample at 60Hz instead of max
   ```

3. **Update Dependencies**
   ```bash
   npm update
   ```

---

## Platform-Specific Issues

### Linux (Wayland)

**Issue:** RobotJS doesn't work on Wayland

**Solution:**
```javascript
// Automatic fallback to clipboard paste
if (process.env.XDG_SESSION_TYPE === 'wayland') {
  clipboardy.writeSync(text);
  robot.keyTap('v', ['control']);
}
```

**Alternative:** Use X11 session
```bash
# At login, choose "Ubuntu on Xorg" or similar
```

---

### macOS

**Issue:** Security permissions required

**Solution:**
1. System Preferences → Security & Privacy
2. Privacy → Accessibility
3. Add InkBridge PC Companion
4. Privacy → Input Monitoring
5. Add InkBridge PC Companion

**Issue:** App not signed

**Solution:**
```bash
# Remove quarantine attribute
xattr -d com.apple.quarantine /path/to/InkBridge.app
```

---

### Windows

**Issue:** Microsoft Defender blocks app

**Solution:**
1. Windows Security → Virus & threat protection
2. Manage settings → Add exclusion
3. Add folder: C:\Program Files\InkBridge PC Companion

**Issue:** Visual C++ Runtime missing

**Solution:**
- Install Visual C++ Redistributable 2015-2022
- Download from Microsoft website

---

## Network Issues

### Can't Find PC on Network

**Symptoms:**
- PC IP doesn't respond
- Devices can't see each other

**Solutions:**

1. **Check Network Settings**
   ```bash
   # Ensure not on guest network
   # Verify same subnet
   ip addr show | grep inet
   ```

2. **mDNS/Bonjour**
   ```bash
   # Install Avahi (Linux)
   sudo apt-get install avahi-daemon
   
   # Then connect using:
   ws://pc-companion.local:3001
   ```

3. **Static IP**
   - Assign static IP to PC
   - Update mobile app connection

---

### VPN Interference

**Symptoms:**
- Works without VPN, fails with VPN
- Can't connect when VPN is active

**Solutions:**

1. **Split Tunneling**
   - Configure VPN to exempt local network
   - Add 192.168.x.x to exclusions

2. **Disable VPN**
   - Temporarily disable for local connection
   - Or use VPN only on one device

---

## Advanced Debugging

### Enable Debug Logging

```bash
# Set environment variable
DEBUG=* npm start
```

### Network Packet Analysis

```bash
# Linux/macOS
sudo tcpdump -i any port 3001

# Windows (Wireshark)
# Filter: tcp.port == 3001
```

### JavaScript Console

```javascript
// In Electron app:
// Press F12 or Ctrl+Shift+I
// Check Console tab for errors
```

---

## Still Need Help?

### Collect Diagnostic Information

1. **System Info**
   ```bash
   # Linux
   uname -a
   cat /etc/os-release
   
   # macOS
   sw_vers
   
   # Windows
   systeminfo
   ```

2. **Application Logs**
   - Located in:
     - Linux: `~/.config/inkbridge-pc-companion/logs/`
     - macOS: `~/Library/Logs/InkBridge PC Companion/`
     - Windows: `%APPDATA%\inkbridge-pc-companion\logs\`

3. **Network Configuration**
   ```bash
   ifconfig -a    # macOS/Linux
   ipconfig /all  # Windows
   ```

### Submit a Bug Report

Include:
- Operating system and version
- PC Companion version
- Mobile app version
- Steps to reproduce
- Error messages
- Log files

**Create Issue:** https://github.com/lsalihi/pc-companion/issues

### Contact Support

- Email: support@inkbridge.app
- Include diagnostic info from above

---

## FAQ

**Q: Does this work over the internet?**
A: No, only on local network. Internet support planned for future release.

**Q: Can I use multiple devices?**
A: Yes, multiple mobile devices can connect simultaneously.

**Q: What's the maximum distance?**
A: Limited by WiFi range, typically 30-50 meters indoors.

**Q: Does it work with VNC/RDP?**
A: Yes, but performance may vary. Local connection recommended.

**Q: Can I customize the port?**
A: Yes, edit PORT variable in server.js and rebuild.

---

*Last updated: 2026-02-09*
