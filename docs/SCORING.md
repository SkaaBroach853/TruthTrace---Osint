# TRUTHTRACE assessment scoring

## Purpose

TRUTHTRACE produces an **evidence assessment**. It does not declare a news item, person, or organisation to be true or false. The score helps a reviewer see which collected signals support, contradict, or limit the investigation.

## Dimensions and weights

| Dimension | Weight | What is considered |
|---|---:|---|
| Source transparency | 20 | Named author, contact/editorial information, source identity and contextual disclosure. |
| Claim consistency | 20 | Whether the article's own title, text, dates and stated claims agree. |
| Cross-source agreement | 20 | Independent corroboration or contradiction; syndications are not counted as independent confirmation. |
| Image context | 15 | Local fingerprint, metadata, earlier observed context and configured reverse-image results. |
| Timeline consistency | 10 | Publication dates, archive observations, claimed events and image observations. |
| Content-risk signals | 10 | Transparent heuristics such as unsupported certainty, sensational wording, missing author/date or unsupported figures. |
| Evidence quality | 5 | Source traceability, timestamp, directness and the reliability recorded for each item. |

Total possible weight: **100**.

## Calculation

Each available dimension is scored from 0 to 100. TRUTHTRACE applies its weight, then normalises the total by the sum of **available** weights:

```text
assessment score = round( Σ(dimension score × dimension weight) / Σ(available weights) )
```

An unavailable search, archive, fact-check or reverse-image provider does **not** automatically lower the score. The interface reports signal coverage separately, for example `5/7 dimensions`.

## Verdict bands

| Score | Assessment wording | Meaning |
|---:|---|---|
| 80–100 | Strongly Supported | Available evidence is strongly consistent and well traced. |
| 65–79 | Probably Authentic | Available evidence is mostly consistent; some uncertainty may remain. |
| 45–64 | Inconclusive | Evidence is mixed, incomplete or insufficient for a directional assessment. |
| 25–44 | Likely Misleading | Material contradictions or risk indicators require careful verification. |
| 0–24 | High Risk / Likely False | Available evidence contains strong, traceable contradictions. |

## Confidence and human review

Confidence measures **signal coverage**, not truth. It is High when six or seven dimensions are available, Medium when four or five are available, and Low below that. Human reviewer notes, confirmations and rejections are stored separately and never silently alter the automated score.

## Safeguards

- A new domain, HTTPS, missing EXIF data, or a missing provider alone is never proof of misinformation.
- Every displayed reason should link to an evidence identifier and source context.
- AI-assisted summaries explain submitted material; they do not generate a truth verdict.
- The score must be interpreted with the timeline, evidence ledger, source limitations and human review.
