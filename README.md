
<img width="201" height="72" alt="Screenshot 2025-04-27 142407" src="https://github.com/user-attachments/assets/41cdbbce-2552-45db-be23-4bd43ba30893" />

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

![Dashboard UI]
<img width="1900" height="880" alt="Screenshot 2025-04-27 142218" src="https://github.com/user-attachments/assets/2e52c42a-805b-4fa5-a01b-a88d8171ae80" />


![Dashboard UI Page Example]
<img width="1892" height="911" alt="Screenshot 2025-04-27 142227" src="https://github.com/user-attachments/assets/a5e22783-16f9-4c37-899a-80dcb0f661f9" />

<img width="1050" height="879" alt="Screenshot 2025-04-27 142254" src="https://github.com/user-attachments/assets/1bd71d78-4170-4b1f-b562-d85a470d71ad" />

![Visual Session Replay]

<img width="1761" height="807" alt="Screenshot 2025-04-27 142312" src="https://github.com/user-attachments/assets/3846ba71-78ae-42b3-aed3-e3a8a2b6b9bb" />

![Event Details](Screenshot-2025-08-29-160535.jpg)

---<img width="1909" height="882" alt="Screenshot 2025-04-27 142242" src="https://github.com/user-attachments/assets/e2b446f0-69b9-4bed-aee1-5f29d8488c3e" />


## License

MIT License

---

## Maintainer

Sanyam Garg
gargsanyam217@gmail.com

---
