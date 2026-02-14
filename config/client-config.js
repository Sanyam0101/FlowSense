const CONFIG = {
    API_ENDPOINT: window.location.origin,
    WS_ENDPOINT: window.location.protocol === 'https:'
        ? `wss://${window.location.host}`
        : `ws://${window.location.host}`
};
