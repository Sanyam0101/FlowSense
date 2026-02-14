class FluvioEventStream {
    constructor() {
        this.subscribers = new Set();
        this.connected = false;
        this.ws = null;
        this.reconnectTimer = null;
        this.shouldReconnect = true;
    }

    connect() {
        if (!CONFIG.WS_ENDPOINT || window.location.hostname.includes('github.io') || this.ws) {
            return;
        }

        this.shouldReconnect = true;

        try {
            this.ws = new WebSocket(CONFIG.WS_ENDPOINT);

            this.ws.onopen = () => {
                this.connected = true;
                if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
            };

            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    this.notifySubscribers(data);
                } catch (e) {
                    console.warn('Invalid websocket event payload', e);
                }
            };

            this.ws.onerror = () => {
                this.connected = false;
            };

            this.ws.onclose = () => {
                this.connected = false;
                this.ws = null;
                if (this.shouldReconnect) {
                    this.reconnectTimer = setTimeout(() => this.connect(), 5000);
                }
            };
        } catch (error) {
            this.connected = false;
            this.ws = null;
        }
    }

    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    notifySubscribers(event) {
        this.subscribers.forEach((callback) => callback(event));
    }

    disconnect() {
        this.shouldReconnect = false;
        if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.connected = false;
    }
}

const fluvioStream = new FluvioEventStream();
