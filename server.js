const express = require('express');
const cors = require('cors');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const WebSocket = require('ws');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Static file serving
app.use(express.static(__dirname));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Main route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Proxy configuration
const proxyOptions = {
    target: 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: {
        '^/proxy': ''
    }
};

app.use('/proxy', createProxyMiddleware(proxyOptions));

// API endpoints
app.post('/api/events', (req, res) => {
    try {
        const events = req.body;
        console.log('Received events:', events);
        res.json({ status: 'success', message: 'Events received' });
    } catch (error) {
        console.error('Error processing events:', error);
        res.status(500).json({ status: 'error', message: 'Failed to process events' });
    }
});

// Client-side routing handler
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        status: 'error',
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`FlowSense server running on http://localhost:${PORT}`);
});

// WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            // Process real-time analytics data
            console.log('Received WebSocket message:', data);
            
            // Broadcast to all connected clients
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        } catch (error) {
            console.error('WebSocket message error:', error);
        }
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});
