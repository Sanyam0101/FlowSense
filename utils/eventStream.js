function initEventStream() {
    try {
        let eventBuffer = [];
        const MAX_BUFFER_SIZE = 100;

        function processEvent(event) {
            const processedEvent = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                type: event.type,
                data: event.data,
                sessionId: event.sessionId,
                url: event.url
            };

            eventBuffer.push(processedEvent);
            if (eventBuffer.length > MAX_BUFFER_SIZE) {
                eventBuffer.shift();
            }

            return processedEvent;
        }

        function getEventBuffer() {
            return eventBuffer;
        }

        function clearEventBuffer() {
            eventBuffer = [];
        }

        return {
            processEvent,
            getEventBuffer,
            clearEventBuffer
        };
    } catch (error) {
        console.error('Event stream initialization error:', error);
        return null;
    }
}

const eventStream = initEventStream();
