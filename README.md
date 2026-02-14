# FlowSense – UX Analytics Dashboard

FlowSense is a lightweight real-time UX analytics dashboard that tracks behavior signals (clicks, rage clicks, form drop-offs, and navigation), surfaces issues, and lets teams export event data.

## What is included

- Overview dashboard with key UX metrics.
- Behavior trend analytics and page breakdown.
- Issue detection list for high-friction events.
- Live feed of incoming events.
- **Data export feature**: download current analytics buffer as:
  - CSV
  - Excel (`.xlsx`)
  - PDF
- Settings for refresh interval and local event buffer size.
- GitHub Pages deployment workflow.

## Run locally

```bash
npm install
npm start
```

Then open `http://localhost:3000`.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In repository settings, ensure **Actions** are enabled.
3. The included workflow `.github/workflows/deploy-pages.yml` builds and deploys the static dashboard to GitHub Pages.
4. In **Settings → Pages**, source should be **GitHub Actions**.

## Notes

- The app stores sampled events in `localStorage` for quick demo/testing.
- On GitHub Pages, WebSocket streaming is disabled automatically and the app continues with generated sample telemetry.

