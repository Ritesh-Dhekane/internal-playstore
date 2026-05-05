# Playstore UI Context

## Purpose
- React frontend for internal APK distribution.
- Supports company-specific app listings.

## Confirmed Architecture
- Metadata-driven UI.
- Per-company config uses `metadata/company-config.json`.
- App metadata uses `apps.json` per company.
- Global styles use:
  - `colors.js`
  - `globalStyles.js`

## Access Control
- Supports password-protected apps.
- Supports public apps.
- Access behavior is company-based.

## Unknown

