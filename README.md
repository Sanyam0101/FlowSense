# FlowSense - Real-time UX Analytics
Real-time UX analytics dashboard that helps product teams detect user experience issues instantly.

## Setup Instructions

1. Set up your GroqCloud API:
   bash
   # Replace with your actual API key in utils/groqApi.js
   const GROQ_API_KEY = 'your-groq-api-key';
   

2. Set up Fluvio streaming:
   bash
   # Update the WebSocket endpoint in utils/fluvioStream.js
   this.ws = new WebSocket('your-fluvio-websocket-endpoint');
   

3. Add the tracking script to your website:
   html
   <script src="path-to/flowsense-tracker.js"></script>
   

4. Start the FlowSense dashboard:
   bash
   # Using VS Code Live Server
   1. Install Live Server extension
   2. Right-click on index.html
   3. Select "Open with Live Server"
   

## Testing Real Websites

1. Add the tracking script to your website's `<head>` section:
   html
   <script src="https://your-cdn/flowsense-tracker.js"></script>
   

2. Configure the tracker endpoint in flowsense-tracker.js:
   javascript
   const FLOWSENSE_API = 'your-api-endpoint';
   

3. The tracker will automatically:
   - Track clicks and detect rage clicks
   - Monitor form interactions and abandonment
   - Track navigation patterns
   - Capture user frustration signals
   - Take periodic screenshots for visual analysis

4. View real-time analytics in the FlowSense dashboard

## Features

- Real-time event tracking
- Rage click detection
- Form abandonment analysis
- Navigation pattern analysis
- Visual session replay
- AI-powered insights using GroqCloud
- Real-time event streaming with Fluvio

## API Documentation

### Tracking Events
javascript
window.flowsense.trackEvent({
    type: 'custom_event',
    data: {
        // Your custom data
    }
});
