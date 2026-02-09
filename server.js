const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const QRCode = require('qrcode');
const cors = require('cors');
const os = require('os');
const robot = require('robotjs');
const clipboardy = require('clipboardy');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

const PORT = 3001;

// WebSocket connection tracking
let connectedClients = new Set();

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

const serverURL = `http://${getLocalIP()}:${PORT}`;
const sessionType = process.env.XDG_SESSION_TYPE || 'unknown';

// Generate QR Code
let qrCodeDataURL = '';
QRCode.toDataURL(serverURL, { width: 300 }, (err, url) => {
  if (err) {
    console.error('Error generating QR code:', err);
  } else {
    qrCodeDataURL = url;
    console.log('QR Code generated for:', serverURL);
  }
});

// Status endpoint
app.get('/status', (req, res) => {
  res.json({
    connected: connectedClients.size > 0,
    clients: connectedClients.size
  });
});

// Diagnostics endpoint
app.get('/diagnostics', (req, res) => {
  let mouseTestOk = false;
  try {
    const pos = robot.getMousePos();
    robot.moveMouse(pos.x + 1, pos.y + 1);
    robot.moveMouse(pos.x, pos.y);
    mouseTestOk = true;
  } catch (error) {
    mouseTestOk = false;
  }

  res.json({
    platform: process.platform,
    sessionType: sessionType,
    mouseTestOk: mouseTestOk,
  });
});

// Optional quick test endpoint
app.post('/test-mouse', (req, res) => {
  try {
    const pos = robot.getMousePos();
    robot.moveMouse(pos.x + 10, pos.y + 10);
    robot.moveMouse(pos.x, pos.y);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error) });
  }
});

// Serve QR code
app.get('/qr', (req, res) => {
  if (qrCodeDataURL) {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>InkBridge Pro - PC Companion</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            .container {
              background: white;
              padding: 40px;
              border-radius: 20px;
              box-shadow: 0 10px 40px rgba(0,0,0,0.3);
              text-align: center;
            }
            h1 {
              color: #667eea;
              margin-bottom: 10px;
            }
            p {
              color: #666;
              margin-bottom: 30px;
            }
            img {
              border: 5px solid #667eea;
              border-radius: 10px;
              padding: 10px;
              background: white;
            }
            .status {
              margin-top: 20px;
              padding: 10px 20px;
              background: #4CAF50;
              color: white;
              border-radius: 5px;
              display: inline-block;
            }
            .url {
              font-family: monospace;
              background: #f5f5f5;
              padding: 10px;
              border-radius: 5px;
              color: #333;
              margin-top: 15px;
            }
            .diag {
              margin-top: 16px;
              padding: 12px;
              background: #f5f7ff;
              color: #333;
              border-radius: 8px;
              font-size: 13px;
              width: 320px;
              text-align: left;
            }
            .diag strong { color: #3a4bdc; }
            .diag button {
              margin-top: 8px;
              border: none;
              background: #3a4bdc;
              color: white;
              padding: 6px 10px;
              border-radius: 6px;
              cursor: pointer;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🖊️ InkBridge Pro</h1>
            <p>Scannez ce QR code avec votre application mobile</p>
            <img src="${qrCodeDataURL}" alt="QR Code" />
            <div class="url">${serverURL}</div>
            <div class="status" id="status">⏳ En attente de connexion...</div>
            <div class="diag" id="diag">
              <div><strong>Input check</strong></div>
              <div id="diagText">Loading…</div>
              <button id="testBtn">Test Mouse</button>
            </div>
          </div>
          <script>
            // Simple polling for status updates
            setInterval(() => {
              fetch('/status')
                .then(r => r.json())
                .then(data => {
                  const status = document.getElementById('status');
                  if (data.connected) {
                    status.textContent = '✅ Mobile connecté !';
                    status.style.background = '#4CAF50';
                  } else {
                    status.textContent = '⏳ En attente de connexion...';
                    status.style.background = '#FFC107';
                  }
                })
                .catch(err => console.error('Status check failed:', err));
            }, 2000);

            function loadDiag() {
              fetch('/diagnostics')
                .then(r => r.json())
                .then(data => {
                  const el = document.getElementById('diagText');
                  if (data.platform === 'linux' && data.sessionType === 'wayland') {
                    el.innerHTML = 'Wayland détecté. RobotJS ne peut pas contrôler la souris. Passez en session <strong>Xorg/X11</strong>.';
                  } else if (!data.mouseTestOk) {
                    el.textContent = 'Test mouse: échec. Vérifiez permissions ou session X11.';
                  } else {
                    el.textContent = 'Test mouse: OK.';
                  }
                })
                .catch(() => {
                  const el = document.getElementById('diagText');
                  el.textContent = 'Diagnostics indisponibles.';
                });
            }

            document.getElementById('testBtn').addEventListener('click', () => {
              fetch('/test-mouse', { method: 'POST' })
                .then(r => r.json())
                .then(() => loadDiag());
            });

            loadDiag();
          </script>
        </body>
      </html>
    `);
  } else {
    res.status(500).send('QR Code not generated yet');
  }
});

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('📱 Client connected');
  connectedClients.add(ws);

  // Broadcast connection status to web clients
  broadcastToWebClients({ type: 'mobile-connected' });

  ws.on('message', async (message) => {
    console.log('Raw message received:', message.toString());
    try {
      const data = JSON.parse(message);
      console.log('📩 Received:', data.event);

      switch(data.event) {
        case 'handwriting':
          console.log('✍️ Handwriting data:', data.data);
          if (data.data.text) {
            console.log('Text recognized:', data.data.text);
            await simulateKeyboardInput(data.data.text);
          }
          break;

        case 'gesture':
          console.log('👆 Gesture:', data.data.type);
          handleGesture(data.data.type);
          break;

        case 'punctuation':
          console.log('📝 Punctuation:', data.data.symbol);
          simulateKeyboardInput(data.data.symbol);
          break;

        case 'touchpad':
          console.log('🖱️ Touchpad:', data.data);
          handleTouchpad(data.data);
          break;
        case 'layout':
          if (data.data && (data.data.layout === 'azerty' || data.data.layout === 'qwerty')) {
            currentLayout = data.data.layout;
            console.log('⌨️ Layout set to:', currentLayout);
          }
          break;
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('📱 Client disconnected');
    connectedClients.delete(ws);
    broadcastToWebClients({ type: 'mobile-disconnected' });
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

function broadcastToWebClients(data) {
  // This would broadcast to web interface clients if any
  console.log('Broadcasting:', data);
}

function handleGesture(type) {
  switch(type) {
    case 'space':
      typeText(' ');
      break;
    case 'backspace':
      keyTap('backspace');
      break;
    case 'enter':
      keyTap('enter');
      break;
    case 'undo':
      keyTap('z', getUndoModifier());
      break;
  }
}

const TOUCHPAD_SENSITIVITY = Number(process.env.INKBRIDGE_TOUCHPAD_SENSITIVITY || 1.2);
const TOUCHPAD_SCROLL_SENSITIVITY = Number(process.env.INKBRIDGE_TOUCHPAD_SCROLL_SENSITIVITY || 2.0);

function handleTouchpad(data) {
  if (!data || !data.type) return;

  try {
    if (data.type === 'move') {
      let dx = Number(data.dx || 0) * TOUCHPAD_SENSITIVITY;
      let dy = Number(data.dy || 0) * TOUCHPAD_SENSITIVITY;
      if (!dx && !dy) return;
      dx = Math.round(dx) || (Math.abs(dx) > 0.1 ? (dx > 0 ? 1 : -1) : 0);
      dy = Math.round(dy) || (Math.abs(dy) > 0.1 ? (dy > 0 ? 1 : -1) : 0);
      if (!dx && !dy) return;
      const pos = robot.getMousePos();
      robot.moveMouse(pos.x + dx, pos.y + dy);
      return;
    }

    if (data.type === 'scroll') {
      let dx = Number(data.dx || 0) * TOUCHPAD_SCROLL_SENSITIVITY;
      let dy = Number(data.dy || 0) * TOUCHPAD_SCROLL_SENSITIVITY;
      dx = Math.round(dx) || (Math.abs(dx) > 0.2 ? (dx > 0 ? 1 : -1) : 0);
      dy = Math.round(dy) || (Math.abs(dy) > 0.2 ? (dy > 0 ? 1 : -1) : 0);
      if (!dx && !dy) return;
      robot.scrollMouse(dx, dy);
      return;
    }

    if (data.type === 'click') {
      const button = data.button === 'right' ? 'right' : 'left';
      robot.mouseClick(button);
    }
  } catch (error) {
    console.error('Touchpad error:', error);
  }
}

let currentLayout = process.env.INKBRIDGE_LAYOUT || 'azerty';
const AZERTY_CHAR_TO_KEY = {
  '&': { key: '1' },
  'é': { key: '2' },
  '"': { key: '3' },
  "'": { key: '4' },
  '(': { key: '5' },
  '-': { key: '6' },
  'è': { key: '7' },
  '_': { key: '8' },
  'ç': { key: '9' },
  'à': { key: '0' },
  ')': { key: 'minus' },
  '=': { key: 'equal' },
};

function keyTap(key, modifier) {
  try {
    if (modifier) {
      robot.keyTap(key, modifier);
    } else {
      robot.keyTap(key);
    }
  } catch (error) {
    console.error('Keyboard input failed:', error);
  }
}

async function pasteText(text) {
  const modifier = process.platform === 'darwin' ? 'command' : 'control';
  try {
    const previous = await clipboardy.read();
    await clipboardy.write(text);
    keyTap('v', modifier);
    // Restore clipboard to avoid disrupting user
    setTimeout(() => clipboardy.write(previous).catch(() => {}), 100);
    return true;
  } catch (error) {
    console.error('Clipboard paste failed, using typeString:', error.message);
    return false;
  }
}

async function typeText(text) {
  if (!text) return;
  // Prefer clipboard paste so characters match exactly.
  const pasted = await pasteText(text);
  if (pasted) return;

  // Fallback: layout-aware typing for better accuracy on AZERTY.
  if (currentLayout === 'azerty') {
    for (const ch of text) {
      if (/[0-9]/.test(ch)) {
        keyTap(ch, 'shift'); // AZERTY digits require shift
        continue;
      }
      const mapped = AZERTY_CHAR_TO_KEY[ch];
      if (mapped?.key) {
        keyTap(mapped.key);
        continue;
      }
      robot.typeString(ch);
    }
    return;
  }

  // Default fallback
  robot.typeString(text);
}

function getUndoModifier() {
  return process.platform === 'darwin' ? 'command' : 'control';
}

// Simulate keyboard input
async function simulateKeyboardInput(text) {
  console.log('⌨️  Typing:', text);
  try {
    await typeText(text);
  } catch (error) {
    console.error('Keyboard typing failed:', error);
  }
}

// Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log('\n🚀 InkBridge Pro PC Companion Server');
  console.log('=====================================');
  console.log(`📡 Server running on: ${serverURL}`);
  console.log(`🌐 Open in browser: ${serverURL}/qr`);
  console.log('=====================================\n');
});

module.exports = { server };
