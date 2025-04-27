class FluvioEventStream {
    constructor() {
        this.subscribers = new Set();
        this.buffer = [];
        this.MAX_BUFFER_SIZE = 1000;
        this.connected = false;
        this.ws = null;
    }

    async connect() {
        try {
            this.ws = new WebSocket(CONFIG.WS_ENDPOINT);
            
            this.ws.onopen = () => {
                this.connected = true;
                console.log('Connected to Fluvio event stream');
            };

            this.ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this.processEvent(data);
            };

            this.ws.onerror = (error) => {
                console.error('Fluvio connection error:', error);
                this.connected = false;
            };

            this.ws.onclose = () => {
                this.connected = false;
                setTimeout(() => this.connect(), 5000); // Reconnect after 5 seconds
            };
        } catch (error) {
            console.error('Fluvio connection error:', error);
            this.connected = false;
        }
    }

    processEvent(event) {
        this.buffer.push(event);
        if (this.buffer.length > this.MAX_BUFFER_SIZE) {
            this.buffer.shift();
        }
        this.notifySubscribers(event);
    }

    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    notifySubscribers(event) {
        this.subscribers.forEach(callback => callback(event));
    }

    getBuffer() {
        return [...this.buffer];
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
        }
        this.connected = false;
        this.subscribers.clear();
    }
}

const fluvioStream = new FluvioEventStream();
