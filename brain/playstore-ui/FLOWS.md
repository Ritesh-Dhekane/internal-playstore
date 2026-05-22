# Playstore UI Flows

## Company Routing
- Supported company routes:
  - `/mtg`
  - `/flx`
  - `/demo`
- Routes map to company-specific configuration and metadata.
- GitHub Pages route format:
  - `#/mtg`
  - `#/flx`
  - `#/demo`

## Deployment
- From `web/playstore-ui`, run `npm run deploy`.
- Deploy script builds the React app and publishes `build` via `gh-pages`.
- Pushes to `main` trigger `.github/workflows/deploy.yml`.
- The workflow installs and builds inside `web/playstore-ui`.
- The workflow publishes `web/playstore-ui/build` to GitHub Pages.
- Static metadata and APK paths are resolved relative to CRA `PUBLIC_URL`.

## App Install
- App listing can provide QR code install.
- App listing can provide Android install button.
- App listing provides a `Download APK` button.
- Android install CTA is sticky within `AppCard.js`.

## App Listing
- `CompanyPage.js` sorts apps by date descending before rendering.
- First sorted app is passed to `AppCard.js` as latest.
- App cards render in a responsive grid.

## Unknown
