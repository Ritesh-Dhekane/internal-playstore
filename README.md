# internal-playstore

## Playstore UI

- Install: `cd web/playstore-ui && npm install`
- Run locally: `npm start`
- Deploy to GitHub Pages: `npm run deploy`

GitHub Pages routes use hash URLs:
- `#/demo`
- `#/mtg`
- `#/flx`

## Automatic Deployment

- Push changes to `main`.
- GitHub Actions builds `web/playstore-ui`.
- GitHub Pages publishes the latest build automatically.
