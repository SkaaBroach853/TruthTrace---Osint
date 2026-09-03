# API contract (future provider boundary)

The local build uses an in-browser service layer. A production adapter can expose `GET /api/health`, `POST/GET /api/investigations`, `GET /api/investigations/:id`, `POST /api/investigations/:id/analyze`, and `POST /api/reports`. Inputs must be runtime validated and URL fetching must apply SSRF controls described in `SECURITY.md`.
