# TRUTHTRACE case study: Riverlight launch claim

## 1. Introduction

TRUTHTRACE is an educational OSINT workspace for examining the evidence surrounding online news claims. It does not label a story true or false; it records indicators, source context, and limitations.

## 2. Objective

Assess the fictional Riverlight launch article using source, claim, image, timeline, and content-risk signals, then create a traceable report.

## 3. Methodology

1. Submit the target URL, text, or local sample case.
2. Extract public article content only after URL safety checks.
3. Normalize evidence and claims.
4. Calculate a weighted, explainable assessment.
5. Review the evidence graph and timeline.
6. Export the report as a PDF.

## 4. Observations

The local sample includes supporting evidence for an ongoing project, but contradicting evidence for its completion date, claimed attendance, and image context. Source transparency is also limited. One fact-check provider remains unavailable and is explicitly marked as such.

## 5. Result

The sample assessment is **Likely Misleading** (36/100), with high coverage of deterministic signals. This is an evidence-based risk assessment, not a declaration of falsity.

## 6. Limitations and future work

The included source names and URLs are fictional. Real search, archive, reverse-image, and fact-check results require provider-specific credentials and endpoints. Human review remains necessary.

## 7. Screenshot checklist

Capture these screens after running `npm run dev` for your final report:

1. Home screen and local investigation entry point.
2. Investigation dashboard assessment card.
3. Evidence ledger and explainability panel.
4. Evidence graph and timeline.
5. Settings provider configuration panel.
6. Generated PDF report.
