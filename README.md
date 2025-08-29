# FlowSense – Real-time UX Analytics Dashboard

_A cutting-edge toolkit for product teams to detect and analyze user experience issues instantly. Leverages real-time tracking, AI-powered insights, and visual session replays._

---

## Overview

**FlowSense** enables dynamic monitoring of user behavior and helps teams catch UX problems in real time.  
Integrate the tracker to your website and stream live user data to the FlowSense dashboard for actionable insights into navigation patterns, form abandonment, frustration signals, and more. Visual session replay and advanced analytics empower rapid improvements to your product.

---

## Features

- **Real-time event tracking**
- **Rage click detection**
- **Form abandonment analysis**
- **Navigation pattern analysis**
- **Visual session replay**
- **AI-driven insights (GroqCloud integration)**
- **Real-time event streaming (Fluvio WebSocket)**

---

## Quick Start

1. **Clone the repo**
    ```
    git clone https://github.com/YOUR_USERNAME/FlowSense.git
    cd FlowSense
    ```

2. **Install Node.js dependencies**
    ```
    npm install
    ```

3. **Configure API/authentication**
    - Insert your GroqCloud API key in `utils/groqApi.js`  
      ```
      const GROQ_API_KEY = 'your-groq-api-key';
      ```
    - Update the Fluvio WebSocket endpoint in `utils/fluvioStream.js`  
      ```
      this.ws = new WebSocket('your-fluvio-websocket-endpoint');
      ```

4. **Start the server**
    ```
    node server.js
    ```

5. **Add tracking to your website**
    - In `<head>`:
      ```
      <script src="https://your-cdn/flowsense-tracker.js"></script>
      ```

---

## Tracker Capabilities

- Monitors clicks, detects rage clicks
- Tracks form interactions and abandonment
- Captures navigation and frustration signals
- Takes periodic screenshots for visual analysis

---

## Repository Structure

FlowSense/
├── components/ # UI/dashboard components
├── config/ # App and API configs
├── public/ # Static assets
├── styles/ # CSS and design files
├── tracking/ # Core tracking scripts
├── utils/ # Utility modules (APIs, streaming)
├── app.js # Main app logic
├── server.js # Node.js backend
├── index.html # Dashboard landing page
├── README.md # Documentation
└── package.json # Project metadata


---

## API Documentation

### Tracking Events
window.flowsense.trackEvent({
type: 'custom_event',
data: { /* Your custom data */ }
});
---

## Demo Screenshots

![Dashboard UI](Screenshot-2025-08-29-160520.jpg)

![Dashboard UI Page Example](Screenshot-2025-08-29-160541.jpg)

![Visual Session Replay](Screenshot-2025-08-29-160528.jpg)

![Event Details](Screenshot-2025-08-29-160535.jpg)

---

## License

MIT License

---

## Maintainer

Sanyam Garg
gargsanyam217@gmail.com

---
