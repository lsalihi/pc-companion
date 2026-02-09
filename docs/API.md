# API Reference - InkBridge PC Companion

Complete API documentation for WebSocket and HTTP endpoints.

## WebSocket API

**Server URL**: `ws://<local-ip>:3001`

### Connection

```javascript
const ws = new WebSocket('ws://192.168.1.100:3001');

ws.on('open', () => {
  console.log('Connected to PC Companion');
});

ws.on('error', (error) => {
  console.error('Connection error:', error);
});
```

---

## Events from Mobile to PC

### 1. `handwriting`

Send handwriting stroke data for processing.

**Event Structure:**
```json
{
  "type": "handwriting",
  "data": {
    "strokes": [
      {
        "id": "stroke-123",
        "points": [
          {
            "x": 100.5,
            "y": 200.3,
            "pressure": 0.8,
            "timestamp": 1234567890123
          }
        ],
        "color": "#000000",
        "width": 2
      }
    ],
    "canvasWidth": 1080,
    "canvasHeight": 1920
  },
  "timestamp": 1234567890123
}
```

**Client Example:**
```javascript
ws.send(JSON.stringify({
  type: 'handwriting',
  data: {
    strokes: [{
      id: 'stroke-' + Date.now(),
      points: points,
      color: '#000000',
      width: 2
    }],
    canvasWidth: 1080,
    canvasHeight: 1920
  },
  timestamp: Date.now()
}));
```

---

### 2. `text`

Send recognized text to be typed.

**Event Structure:**
```json
{
  "type": "text",
  "data": {
    "text": "Hello World",
    "confidence": 0.95,
    "language": "en",
    "alternatives": [
      {"text": "Hello word", "confidence": 0.85}
    ]
  },
  "timestamp": 1234567890123
}
```

**Client Example:**
```javascript
ws.send(JSON.stringify({
  type: 'text',
  data: {
    text: 'Hello World',
    confidence: 0.95,
    language: 'en'
  },
  timestamp: Date.now()
}));
```

**Server Processing:**
- Sanitizes input for security
- Types text using RobotJS (X11)
- Uses clipboard paste for Wayland
- Logs activity

---

### 3. `gesture`

Send gesture commands for keyboard actions.

**Supported Gestures:**
- `space` - Insert space
- `backspace` - Delete previous number character
- `enter` - Insert new line
- `undo` - Undo last action
- `clear` - Clear current text

**Event Structure:**
```json
{
  "type": "gesture",
  "data": {
    "gesture": "space",
    "count": 1
  },
  "timestamp": 1234567890123
}
```

**Client Example:**
```javascript
// Send space gesture
ws.send(JSON.stringify({
  type: 'gesture',
  data: {
    gesture: 'space',
    count: 1
  },
  timestamp: Date.now()
}));

// Send multiple backspaces
ws.send(JSON.stringify({
  type: 'gesture',
  data: {
    gesture: 'backspace',
    count: 3
  },
  timestamp: Date.now()
}));
```

**Server Actions:**
```javascript
{
  'space': () => robot.keyTap('space'),
  'backspace': () => robot.keyTap('backspace'),
  'enter': () => robot.keyTap('enter'),
  'undo': () => robot.keyTap('z', ['control']),
  'clear': () => robot.keyTap('a', ['control']) + robot.keyTap('backspace')
}
```

---

### 4. `punctuation`

Send punctuation marks to be inserted.

**Supported Punctuation:**
`.` `,` `?` `!` `;` `:` `-` `'` `"` `(` `)` `[` `]` `{` `}`

**Event Structure:**
```json
{
  "type": "punctuation",
  "data": {
    "symbol": ".",
    "autoSpace": true
  },
  "timestamp": 1234567890123
}
```

**Client Example:**
```javascript
ws.send(JSON.stringify({
  type: 'punctuation',
  data: {
    symbol: '.',
    autoSpace: true
  },
  timestamp: Date.now()
}));
```

---

### 5. `ping`

Keep-alive message.

**Event Structure:**
```json
{
  "type": "ping",
  "timestamp": 1234567890123
}
```

**Server Response:**
```json
{
  "type": "pong",
  "timestamp": 1234567890123
}
```

---

## Events from PC to Mobile

### 1. `connection_status`

Notifies client of connection state changes.

**Event Structure:**
```json
{
  "type": "connection_status",
  "status": "connected",
  "clientId": "client-abc123",
  "serverVersion": "1.0.0",
  "capabilities": ["handwriting", "text", "gestures"],
  "timestamp": 1234567890123
}
```

**Statuses:**
- `connected` - Successfully connected
- `disconnected` - Connection closed
- `error` - Connection error

---

### 2. `error`

Sends error messages to client.

**Event Structure:**
```json
{
  "type": "error",
  "code": "ERR_INVALID_INPUT",
  "message": "Invalid handwriting data format",
  "details": {
    "field": "strokes",
    "expected": "array",
    "received": "string"
  },
  "timestamp": 1234567890123
}
```

**Error Codes:**
- `ERR_INVALID_INPUT` - Invalid data format
- `ERR_AUTHENTICATION` - Auth failed
- `ERR_RATE_LIMIT` - Too many requests
- `ERR_SERVER_ERROR` - Internal server error

---

### 3. `acknowledgment`

Confirms receipt and processing of data.

**Event Structure:**
```json
{
  "type": "acknowledgment",
  "messageId": "msg-123",
  "status": "processed",
  "timestamp": 1234567890123
}
```

---

## HTTP API

### Base URL
```
http://<local-ip>:3001
```

---

### `GET /status`

Get server status and information.

**Response:**
```json
{
  "status": "running",
  "version": "1.0.0",
  "uptime": 3600,
  "connections": {
    "active": 1,
    "total": 5
  },
  "system": {
    "platform": "linux",
    "sessionType": "x11",
    "hostname": "desktop-pc"
  },
  "network": {
    "ip": "192.168.1.100",
    "port": 3001
  },
  "timestamp": 1234567890123
}
```

**Example:**
```bash
curl http://192.168.1.100:3001/status
```

---

### `GET /qr`

Get QR code image as data URL.

**Response:**
```json
{
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "url": "ws://192.168.1.100:3001",
  "timestamp": 1234567890123
}
```

**Example:**
```bash
curl http://192.168.1.100:3001/qr
```

---

### `GET /health`

Simple health check endpoint.

**Response:**
```json
{
  "ok": true
}
```

**Status Codes:**
- `200` - Service is healthy
- `503` - Service unavailable

---

## Rate Limiting

To prevent abuse, APIs are rate-limited:

- **WebSocket Messages**: 100 messages/second per connection
- **HTTP Endpoints**: 60 requests/minute per IP

**Rate Limit Headers:**
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1234567890
```

**Rate Limit Exceeded Response:**
```json
{
  "error": "Rate limit exceeded",
  "retryAfter": 30
}
```

---

## Authentication

### Method 1: QR Code (Recommended)

1. Scan QR code with mobile app
2. Automatic connection with embedded credentials
3. Session-based authentication

### Method 2: Manual Connection (Advanced)

```javascript
const ws = new WebSocket('ws://192.168.1.100:3001');

ws.on('open', () => {
  // Send authentication
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'your-session-token'
  }));
});
```

---

## Error Handling

### Client-Side

```javascript
ws.on('error', (error) => {
  console.error('WebSocket error:', error);
  // Attempt reconnection
  reconnect();
});

ws.on('close', (code, reason) => {
  console.log(`Connection closed: ${code} - ${reason}`);
  // Handle disconnection
});
```

### Server-Side Error Events

```javascript
ws.on('message', (message) => {
  try {
    const data = JSON.parse(message);
    handleMessage(data);
  } catch (error) {
    ws.send(JSON.stringify({
      type: 'error',
      code: 'ERR_INVALID_JSON',
      message: 'Invalid JSON format'
    }));
  }
});
```

---

## Best Practices

### 1. Connection Management

```javascript
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;

function connect() {
  const ws = new WebSocket(url);
  
  ws.on('close', () => {
    if (reconnectAttempts < maxReconnectAttempts) {
      reconnectAttempts++;
      setTimeout(connect, 1000 * reconnectAttempts);
    }
  });
  
  ws.on('open', () => {
    reconnectAttempts = 0;
  });
}
```

### 2. Message Batching

```javascript
let messageQueue = [];
let batchTimer;

function queueMessage(message) {
  messageQueue.push(message);
  
  if (!batchTimer) {
    batchTimer = setTimeout(() => {
      sendBatch(messageQueue);
      messageQueue = [];
      batchTimer = null;
    }, 50); // Batch every 50ms
  }
}
```

### 3. Data Validation

```javascript
function validateHandwriting(data) {
  if (!data.strokes || !Array.isArray(data.strokes)) {
    throw new Error('Invalid strokes data');
  }
  
  for (const stroke of data.strokes) {
    if (!stroke.points || !Array.isArray(stroke.points)) {
      throw new Error('Invalid stroke points');
    }
  }
  
  return true;
}
```

---

## Code Examples

### Complete Client Implementation

See [examples/client.js](../examples/client.js) for a full implementation example.

### React Native Integration

See [examples/react-native.js](../examples/react-native.js) for React Native integration.

---

## Changelog

- **v1.0.0** (2026-02-09): Initial API release

---

## Support

- **Documentation**: [GitHub Wiki](https://github.com/lsalihi/pc-companion/wiki)
- **Issues**: [GitHub Issues](https://github.com/lsalihi/pc-companion/issues)
- **Email**: api-support@inkbridge.app
