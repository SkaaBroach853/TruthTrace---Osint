# Architecture

TRUTHTRACE is a browser-local modular monolith. `src/core.js` contains deterministic normalization, scoring, graph construction, and the demo provider. `src/app.js` provides route views, validation, local persistence, and interaction logic. The UI deliberately reports unavailable external providers instead of manufacturing results.
