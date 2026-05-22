# Playstore UI Context

## Purpose
- React frontend for internal APK distribution.
- Supports company-specific app listings.

## Confirmed Architecture
- Metadata-driven UI.
- Per-company config uses `metadata/company-config.json`.
- App metadata uses `apps.json` per company.
- GitHub Pages deployment uses CRA `homepage: "."`.
- GitHub Actions deploys the app to GitHub Pages from `web/playstore-ui/build`.
- Routing uses hash URLs for GitHub Pages compatibility.
- Global styles use:
  - `colors.js`
  - `globalStyles.js`
- `AppCard.js` renders app name, version badge, release date, optional icon, optional size, download button, Android install button, and QR code.
- `CompanyPage.js` renders app cards in a responsive grid.

## Access Control
- Supports password-protected apps.
- Supports public apps.
- Access behavior is company-based.

## Unknown
