function processUserBehavior(event) {
    try {
        return {
            type: event.type,
            timestamp: new Date().toISOString(),
            data: event.data
        };
    } catch (error) {
        console.error('Error processing user behavior:', error);
        return null;
    }
}

function detectAnomalies(events) {
    try {
        const anomalies = [];
        
        // Detect rage clicks
        const clickEvents = events.filter(e => e.type === 'click');
        if (clickEvents.length > 5 && clickEvents[0].timestamp - clickEvents[4].timestamp < 2000) {
            anomalies.push({
                type: 'rage_click',
                severity: 'high',
                location: clickEvents[0].data.location
            });
        }
        
        return anomalies;
    } catch (error) {
        console.error('Error detecting anomalies:', error);
        return [];
    }
}

function generateInsights(anomalies) {
    try {
        return anomalies.map(anomaly => ({
            type: anomaly.type,
            message: `Detected ${anomaly.type} at ${anomaly.location}`,
            severity: anomaly.severity,
            timestamp: new Date().toISOString()
        }));
    } catch (error) {
        console.error('Error generating insights:', error);
        return [];
    }
}
