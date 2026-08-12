# Bruce Moseti

**Site:** https://brucemoseti.github.io/brucemoseti-personal-website/

[Email](mailto:brucemosetie@gmail.com) · [LinkedIn](https://www.linkedin.com/in/bruce-moseti-9553172a9/) · [GitHub](https://github.com/BruceMoseti)

## Running locally

```bash
npm install
npm run dev
```

## Deploying

The site builds for two hosts. Vite's `base` switches automatically: Vercel serves from the
domain root, GitHub Pages serves from `/brucemoseti-personal-website/`.

**Vercel** — import this repo at [vercel.com/new](https://vercel.com/new) and deploy. The
settings in `vercel.json` are picked up automatically, so no build configuration is needed.
Every push to `main` then redeploys on its own.

**GitHub Pages** — `npm run deploy` builds and force-pushes `dist/` to the `gh-pages` branch.

## Project screenshots

`npm run shots` recaptures the live-app screenshots in `public/projects/` with Playwright.
