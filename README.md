# Brainchurn

A layered method for turning a problem into evaluated solutions.

Brainchurn is a single-file progressive web app that walks you through six stages of structured ideation and ends with an exportable, ranked and scored report. One codebase runs on desktop and mobile, installs to a home screen, and works fully offline after the first load. Your work stays in your own browser — nothing is sent to a server.

## The six layers

1. **Frame** — state the problem and the constraints that matter.
2. **Diverge** — generate raw associations and seed terms.
3. **Break** — apply lateral provocations to unsettle fixed assumptions.
4. **Cover** — combine elements to fill out the solution space.
5. **Converge** — weigh candidates and keep the strongest.
6. **Result** — export a ranked, scored solution report.

## Idea engines

Switch engines at any time from the header dropdown:

- **Offline** — you supply the associations. Nothing leaves your device.
- **Open data** — pulls live word associations from the free [Datamuse API](https://www.datamuse.com/api/). No account or key.
- **AI bridge** — generates a prompt for any AI you use, then parses the results back into the app. Keyless.

## Install

Open the deployed URL, then:

- **Android (Chrome):** menu → **Add to Home screen** / **Install app**.
- **iPhone (Safari):** Share → **Add to Home Screen**.

It launches full-screen like a native app and works offline after the first visit.

## Run or deploy

It is a static site — no build step. Open `index.html` locally, or host the five files (`index.html`, `manifest.webmanifest`, `service-worker.js`, `icon-192.png`, `icon-512.png`) on any static host. GitHub Pages works well; HTTPS is required for install and offline. See `DEPLOY_GitHub.md` for step-by-step instructions.

## Privacy

State persists only in your browser's `localStorage`. The Offline and AI-bridge engines make no network calls; the Open-data engine queries Datamuse directly and is never cached.

## Notes

Brainchurn implements general, non-proprietary creativity techniques and ships no third-party word database. The name is a working placeholder pending a trademark search.
