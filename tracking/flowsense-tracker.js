(function() {
    const FLOWSENSE_API = CONFIG.API_ENDPOINT;
    
    class FlowSenseTracker {
        constructor() {
            this.sessionId = this.generateSessionId();
            this.events = [];
            this.isRecording = false;
            this.lastClick = null;
            this.formData = new Map();
            this.scrollEvents = [];
            this.lastScrollTime = Date.now();
        }

        generateSessionId() {
            return 'fs-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        }

        init() {
            this.attachEventListeners();
            this.startHeartbeat();
            this.initializeWebSocket();
            console.log('FlowSense tracker initialized');
        }

        initializeWebSocket() {
            this.ws = new WebSocket(CONFIG.WS_ENDPOINT);
            
            this.ws.onopen = () => {
                console.log('WebSocket connection established');
                this.sendEvent({
                    type: 'session_start',
                    timestamp: Date.now(),
                    url: window.location.href
                });
            };

            this.ws.onclose = () => {
                console.log('WebSocket connection closed');
                setTimeout(() => this.initializeWebSocket(), 5000);
            };
        }

        attachEventListeners() {
            // Click tracking
            document.addEventListener('click', (e) => {
                const now = Date.now();
                const clickEvent = {
                    type: 'click',
                    timestamp: now,
                    target: {
                        tagName: e.target.tagName,
                        className: e.target.className,
                        id: e.target.id,
                        innerText: e.target.innerText?.substring(0, 50)
                    },
                    position: {
                        x: e.clientX,
                        y: e.clientY
                    }
                };

                // Detect rage clicks
                if (this.lastClick && now - this.lastClick < 500) {
                    clickEvent.type = 'rage_click';
                }
                this.lastClick = now;
                this.trackEvent(clickEvent);
            });

            // Form tracking
            document.addEventListener('submit', (e) => {
                const formId = e.target.id || 'unknown_form';
                this.trackEvent({
                    type: 'form_submit',
                    timestamp: Date.now(),
                    formId: formId
                });
            });

            // Form field tracking
            document.addEventListener('input', (e) => {
                if (e.target.form) {
                    const formId = e.target.form.id || 'unknown_form';
                    const formData = {
                        lastInteraction: Date.now(),
                        fields: e.target.form.elements.length,
                        filledFields: Array.from(e.target.form.elements)
                            .filter(el => el.value.length > 0).length
                    };
                    this.formData.set(formId, formData);
                }
            });

            // Scroll tracking
            let scrollTimeout;
            document.addEventListener('scroll', () => {
                const now = Date.now();
                this.scrollEvents.push(now);
                
                // Clean up old scroll events
                this.scrollEvents = this.scrollEvents.filter(time => now - time < 1000);
                
                // Detect rapid scrolling
                if (this.scrollEvents.length > 5) {
                    this.trackEvent({
                        type: 'rapid_scroll',
                        timestamp: now,
                        data: {
                            scrollCount: this.scrollEvents.length
                        }
                    });
                }

                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    this.scrollEvents = [];
                }, 1000);
            });

            // Navigation tracking
            window.addEventListener('popstate', () => {
                this.trackEvent({
                    type: 'navigation',
                    timestamp: Date.now(),
                    data: {
                        from: document.referrer,
                        to: window.location.href,
                        backButton: true
                    }
                });
            });
        }

        startHeartbeat() {
            setInterval(() => {
                // Check for form abandonment
                this.formData.forEach((data, formId) => {
                    if (Date.now() - data.lastInteraction > 30000) {
                        this.trackEvent({
                            type: 'form_abandon',
                            timestamp: Date.now(),
                            formId: formId,
                            data: {
                                timeElapsed: Date.now() - data.lastInteraction,
                                completionRate: (data.filledFields / data.fields) * 100
                            }
                        });
                        this.formData.delete(formId);
                    }
                });

                // Send batched events
                this.sendEvents();
            }, 5000);
        }

        trackEvent(event) {
            event.sessionId = this.sessionId;
            event.url = window.location.href;
            event.userAgent = navigator.userAgent;
            this.events.push(event);

            // Send immediately if it's a critical event
            if (['rage_click', 'form_abandon', 'error'].includes(event.type)) {
                this.sendEvents();
            }

            // Send through WebSocket for real-time updates
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify(event));
            }
        }

        async sendEvents() {
            if (this.events.length === 0) return;

            try {
                const response = await fetch(`${FLOWSENSE_API}/api/events`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sessionId: this.sessionId,
                        events: this.events
                    })
                });

                if (response.ok) {
                    this.events = [];
                }
            } catch (error) {
                console.error('Failed to send events:', error);
            }
        }
    }

    window.flowsense = new FlowSenseTracker();
    window.flowsense.init();
})();
