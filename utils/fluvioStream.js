class FluvioEventStream {
    constructor() {
        this.subscribers = new Set();
        this.connected = false;
        this.ws = null;
        this.reconnectTimer = null;
    }

    connect() {
        if (!CONFIG.WS_ENDPOINT || window.location.hostname.includes('github.io')) {
            return;
        }

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
                this.reconnectTimer = setTimeout(() => this.connect(), 5000);
            };
        } catch (error) {
            this.connected = false;
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
        if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
        if (this.ws) this.ws.close();
        this.connected = false;
    }
}

const fluvioStream = new FluvioEventStream();
