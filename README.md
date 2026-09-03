# TRUTHTRACE

An explainable, local-first OSINT news-verification mini project. It includes a deterministic fictional demo case, transparent assessment scoring, evidence graph, source and image intelligence, timelines, reviewer notes, report printing, and browser-local persistence.

## Run

```bash
npm install
npm run dev
```

Open the displayed local URL and select **Load local case**. `npm run dev` starts both the Vite UI and the SQLite-backed API. Run `npm run check` for the production build and deterministic tests.

## Local backend features

- SQLite persistence in `data/truthtrace.db`
- Safe public-URL article extraction with time and response-size limits
- JPEG, PNG, and WebP upload analysis: SHA-256, local fingerprint, and available EXIF metadata
- Server-generated PDF at `/api/reports/:id.pdf`
- Provider-key configuration from Settings for the current local server session

Never commit `.env` or paste keys into client-side code. Add replacement keys to `.env` using `.env.example` as a template.

## Limitations and ethics

External providers are deliberately unconfigured: the application does not claim remote search, WHOIS, archive, fact-check, or reverse-image results. Demo citations and domains are fictional. Assessments are indicators, not definitive truth declarations; use public information lawfully and ethically.
