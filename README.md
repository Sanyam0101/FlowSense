# FlowSense – UX Analytics Dashboard

FlowSense is a real-time UX analytics dashboard for tracking behavior signals (clicks, rage clicks, form drop-offs, navigation), exploring issues, and exporting reports.

## Features

- Connected dashboard pages: Overview, Analytics, Issues, Live Feed, Data Export, and Settings.
- Computed KPI cards (active sessions, rage clicks, abandonment rate, average session time).
- Event trend chart + per-page analytics breakdown.
- Issue detection with severity badges.
- Live feed filtering by event type.
- **Data export** to CSV, Excel (`.xlsx`), and PDF.
- Local persistence via `localStorage`.
- Configurable refresh interval, buffer size, auto-sample toggle, and clear-data action.
- GitHub Pages deployment workflow.

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Ensure Actions are enabled.
3. Use the included workflow in `.github/workflows/deploy-pages.yml`.
4. In **Settings → Pages**, select **GitHub Actions**.

## Notes

- On GitHub Pages, WebSocket streaming is skipped automatically and the app remains functional with sample telemetry.
- Exports use browser libraries (`xlsx` + `jsPDF`) loaded in `index.html`.
