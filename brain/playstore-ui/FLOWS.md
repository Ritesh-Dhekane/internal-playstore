# Playstore UI Flows

## Company Routing
- Supported company routes:
  - `/mtg`
  - `/flx`
  - `/demo`
- Routes map to company-specific configuration and metadata.

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
