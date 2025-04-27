const config = {
    server: {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development'
    },
    groq: {
        apiKey: process.env.GROQ_API_KEY || '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'
    },
    fluvio: {
        websocketEndpoint: process.env.FLUVIO_WEBSOCKET_ENDPOINT || 'ws://localhost:3000'
    }
};

module.exports = config;
