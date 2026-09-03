<!--
Before printing: replace every BLUE placeholder, insert the four labelled screenshots,
update the contents page numbers, then remove this comment. Use Times New Roman 12 pt,
1.5 line spacing, justified alignment. Cover, certificate and contents are separate from
the ten-page main body limit.
-->

<div align="center">

# MINI PROJECT REPORT

## ON

# TRUTHTRACE
## Open-Source Intelligence for News Verification

<br><br>

Submitted in partial fulfilment of the requirements for the award of

## **[BLUE: DEGREE / COURSE NAME]**

<br>

Submitted by

## **[BLUE: STUDENT FULL NAME]**
### PRN: **[BLUE: PRN NUMBER]**

<br>

Under the guidance of

## **[BLUE: GUIDE NAME]**

<br><br>

**[BLUE: DEPARTMENT NAME]**  
**[BLUE: COLLEGE NAME]**  
**[BLUE: UNIVERSITY NAME]**  
Academic Year 2026–27

</div>

\newpage

<div align="center">

# CERTIFICATE

</div>

This is to certify that **[BLUE: STUDENT FULL NAME]**, bearing PRN **[BLUE: PRN NUMBER]**, has satisfactorily completed the mini project titled **“TRUTHTRACE: Open-Source Intelligence for News Verification”** in partial fulfilment of the requirements for **[BLUE: DEGREE / COURSE NAME]** during the academic year 2026–27.

The work presented in this report is carried out under my supervision and, to the best of my knowledge, has not been submitted elsewhere for the award of any degree or diploma.

<br><br><br>

| | | |
|---|---|---|
| **[BLUE: GUIDE NAME]**<br>Project Guide | **[BLUE: HOD NAME]**<br>Head of Department | **[BLUE: PRINCIPAL NAME]**<br>Principal |

<br><br>

Date: **[BLUE: DATE]**  
Place: **[BLUE: CITY]**

\newpage

# CONTENTS

| Sr. No. | Content | Page No. |
|---:|---|:---:|
| 1 | Introduction | ____ |
| 1.1 | Background and Importance of OSINT in Cybersecurity / Investigations | ____ |
| 1.2 | Objectives of the Mini Project | ____ |
| 2 | Literature Review / Theoretical Background | ____ |
| 2.1 | Sources of OSINT | ____ |
| 2.2 | OSINT Tools and Techniques | ____ |
| 3 | Problem Definition | ____ |
| 3.1 | Scope of the Project | ____ |
| 3.2 | Use Case Selection | ____ |
| 3.3 | Expected Outcomes | ____ |
| 4 | Methodology | ____ |
| 4.1 | Tools and Platforms Used | ____ |
| 4.2 | Data Collection Process | ____ |
| 4.3 | Data Analysis Methods | ____ |
| 4.4 | Workflow Diagram | ____ |
| 5 | Implementation / Case Study | ____ |
| 5.1 | Step-by-Step Execution and Tool Configuration | ____ |
| 5.2 | Tool Outputs and Raw Data Samples | ____ |
| 5.3 | Observations | ____ |
| 6 | Results and Discussion | ____ |
| 6.1 | Findings from the Investigation | ____ |
| 6.2 | Comparison with Existing Methods and Challenges | ____ |
| 7 | Conclusion and Future Work | ____ |
| 7.1 | Summary of Results | ____ |
| 7.2 | Limitations of the Project | ____ |
| 7.3 | Future Enhancements | ____ |
| 8 | References | ____ |

\newpage

# 1. Introduction

## 1.1 Background and Importance of OSINT in Cybersecurity / Investigations

Open-Source Intelligence (OSINT) is intelligence produced by collecting, evaluating and correlating information that is publicly available or lawfully accessible. In a cybersecurity and digital-investigation context, OSINT helps an analyst establish context before making a conclusion. It can reveal how a domain is presented, when a page was observed, whether independent reporting agrees with a claim, and whether media has previously appeared in a different context. The essential activity is not merely searching: it is preserving sources, assessing limitations, and showing the evidence trail.

Online misinformation makes this approach important. News-like webpages can reuse genuine images, quote authentic organisations out of context, or state unverified numerical claims. A binary “fake/real” output is not adequate for an academic investigation because it hides uncertainty. A defensible system must distinguish observed facts from inferences, transparent heuristics from proof, and unavailable data from negative evidence.

TRUTHTRACE was developed as a local-first web application that supports this evidence-led workflow. The application accepts a public article URL, pasted article text, a headline or claim, a domain, and an image. It stores investigation records in a local SQLite database, extracts permitted public-page text after validation, calculates local image fingerprints and EXIF metadata, represents findings as evidence items, and produces a deterministic assessment with explainable signals. It is designed for lawful educational use and does not bypass authentication, access controls, or privacy protections.

## 1.2 Objectives of the Mini Project

The objectives of TRUTHTRACE are:

1. To provide a compact investigation workspace for analysing public online-news claims.
2. To collect structured evidence from article input, source context, timelines and images.
3. To calculate an explainable assessment rather than a black-box truth verdict.
4. To provide local SHA-256, image fingerprint and available EXIF analysis for uploaded images.
5. To show evidence relationships using a graph and chronological timeline.
6. To support human review without silently changing the automated score.
7. To generate a traceable PDF report suitable for academic demonstration.

\newpage

# 2. Literature Review / Theoretical Background

## 2.1 Sources of OSINT

OSINT sources include publicly accessible webpages, search indexes, official institutional websites, domain registration and DNS data, web archives, news databases, public social-media posts, documents, image metadata and reputable fact-check publications. Each source has different reliability and availability characteristics. For example, an official announcement may demonstrate that an organisation made a statement, while independent reporting may provide corroboration or contradiction. A reposted article should not automatically be treated as an independent source because it may be syndicated from the same origin.

The open web is the principal source used by this project. The system deliberately does not collect from the dark web, private groups, credentials, closed databases or authenticated accounts. Although these areas are discussed in OSINT literature, they are outside this project's lawful and ethical scope. Search results and archives are useful leads, but they require timestamp and source attribution before being treated as evidence.

## 2.2 OSINT Tools and Techniques

Common OSINT tools include search engines, Google Fact Check Tools, web archives, DNS/RDAP lookup services, metadata readers, image-search systems, Shodan, SpiderFoot and Maltego. These tools are complementary: Maltego visualises relationships; Shodan indexes internet-exposed services; SpiderFoot automates broad reconnaissance; and archive services provide historical captures. TRUTHTRACE focuses on a narrower, demonstrable news-verification use case rather than reproducing all of these platforms.

The project uses the following techniques: input validation; public URL safety screening; lightweight article extraction; domain normalisation; claim structuring; content-risk heuristics; local image hashing; EXIF reading; evidence polarity classification; timeline ordering; weighted assessment; and human review. Google Fact Check Tools supports searches of fact-checked claims, while the Internet Archive provides APIs for Wayback-related access [1][2]. These are future enrichment sources, not substitutes for analyst judgement.

\newpage

# 3. Problem Definition

## 3.1 Scope of the Project

The problem addressed is the difficulty of assessing a suspicious online article in a transparent and repeatable way. Individuals often see a headline, image and URL but cannot easily record why a claim seems supported, misleading or inconclusive. TRUTHTRACE addresses this by converting an investigation into structured claims, evidence, source information, image information, a graph, a timeline and a report.

The system is a modular local application. It does not perform universal credibility ranking, declare a person or organisation dishonest, scrape paywalled/authenticated sources, or conduct surveillance. External providers are optional. When an API key is absent, the corresponding feature is explicitly marked **unavailable**, not treated as proof of falsehood.

## 3.2 Use Case Selection

The selected use case is **verification of a potentially misleading online news claim**. This combines several syllabus-relevant OSINT activities: domain analysis, public-web extraction, media metadata inspection, source comparison and timeline reconstruction. It is safer and more academically demonstrable than personal profiling. The supplied local sample is fictional; therefore it does not accuse a real person or organisation.

## 3.3 Expected Outcomes

The expected output is a saved investigation containing a case identifier, input target, evidence ledger, claims, source cards, image analysis, graph, timeline, assessment and PDF report. The user should be able to explain exactly which evidence contributes to an assessment and identify which providers were unavailable. The desired learning outcome is critical evaluation of online information rather than reliance on a single automated label.

\newpage

# 4. Methodology

## 4.1 Tools and Platforms Used

The frontend is built with HTML, CSS and JavaScript using Vite. The backend uses Node.js and Express. SQLite, through `better-sqlite3`, stores local investigation records. Multer validates JPEG, PNG and WebP uploads; ExifReader reads available image metadata; Node's cryptography library calculates SHA-256 fingerprints; and PDFKit creates server-side reports. The application runs locally through `npm run dev`.

External integrations are designed as optional providers: NewsAPI or another approved news-search provider for cross-source discovery, Google Fact Check Tools for claim matches, Internet Archive for historical observations, TinEye or another authorised reverse-image provider, and NVIDIA NIM for optional AI-assisted claim extraction. Provider keys are kept in a local `.env` file and are never placed in client-side source code. NewsAPI documents a development API-key option, while NVIDIA documents obtaining a key through its API Catalog [3][4].

## 4.2 Data Collection Process

1. The reviewer enters a URL, text, headline, claim, domain or image.
2. URLs are parsed and checked to reject malformed addresses and private/local network targets.
3. For a permitted public URL, the backend resolves the hostname, applies a timeout and response-size limit, then extracts title and readable text.
4. The input is stored as a case in SQLite with a UTC timestamp.
5. Uploaded image files are limited to supported MIME types and 8 MB. SHA-256, a local fingerprint, and available EXIF fields are recorded.
6. Findings are stored as evidence with type, polarity, source, timestamp, confidence and provider metadata.

## 4.3 Data Analysis Methods

The assessment is deterministic and has seven dimensions: source transparency (20%), claim consistency (20%), cross-source agreement (20%), image context (15%), timeline consistency (10%), content-risk signals (10%) and evidence quality (5%). Available dimensions are normalised so that missing provider data does not lower a score automatically. Verdict bands are Strongly Supported (80–100), Probably Authentic (65–79), Inconclusive (45–64), Likely Misleading (25–44) and High Risk / Likely False (0–24).

Evidence is classified as supporting, contradicting, neutral or unavailable. The automated score is separate from reviewer decisions. This prevents a user note from being represented incorrectly as an automated finding.

## 4.4 Workflow Diagram

```text
INPUT → VALIDATE → COLLECT → NORMALISE → CORRELATE → ASSESS → EXPLAIN → REPORT
  │         │           │           │             │          │          │
URL/Text  SSRF guard  SQLite +    Evidence,      Weighted   Graph +    PDF
Image     type/size   metadata    claims, time   score      timeline
```

\newpage

# 5. Implementation / Case Study

## 5.1 Step-by-Step Execution and Tool Configuration

1. Install dependencies using `npm install`.
2. Create `.env` in the project root from `.env.example`. Keys not available to the student remain blank. The `.env` file must not be committed or submitted publicly.
3. Run `npm run dev`. This starts the Vite interface and the API service at local port 8787.
4. Open the displayed local address and select **Load local case**, or create a new investigation.
5. Enter a public URL or paste article text. The interface validates that at least one target is supplied; messages appear as application dialogs rather than browser popups.
6. Upload a JPEG, PNG or WebP image when image analysis is required. Inspect the resulting hash, local fingerprint and metadata status.
7. Open Evidence, Claims, Source Intelligence, Images, Graph and Timeline tabs. Select graph nodes to inspect relationships.
8. Record a human review note if needed. The automated assessment remains unchanged.
9. Open Reports and choose **Download PDF**.

**Figure 1. Home / local investigation entry point (insert one screenshot, approximately one-sixth page).**

> *Insert screenshot here: home screen or New Investigation form. Caption: “TRUTHTRACE local investigation input interface.”*

## 5.2 Tool Outputs and Raw Data Samples

The local sample case is labelled `LOCAL-001` in the interface and is based on fictional Riverlight content. It demonstrates the model without making claims about real entities.

| Field | Example local output |
|---|---|
| Case ID | LOCAL-001 |
| Input target | `https://news.example.invalid/riverlight-launch` |
| Assessment | Likely Misleading, 36/100 |
| Supporting evidence | A fictional public project announcement; independent reporting of a smaller pilot event |
| Contradicting evidence | Earlier different-context image; schedule conflict; unsupported attendance number |
| Unavailable evidence | Fact-check provider not configured |
| Image data | JPEG type, SHA-256/fingerprint, EXIF status |

The important raw-data concept is traceability. Each evidence item contains an identifier such as `E-004`, type, title, description, polarity, source, observed date, confidence and provider metadata. An example is shown below.

```json
{
  "id": "E-004",
  "type": "IMAGE",
  "title": "Earlier different-context image",
  "polarity": "CONTRADICTING",
  "source": "Local image analysis",
  "confidence": 94,
  "observedAt": "2025-11-04"
}
```

**Figure 2. Evidence ledger and explainability panel (insert one screenshot, approximately one-sixth page).**

> *Insert screenshot here. Caption: “Evidence is classified by polarity and linked to the assessment.”*

## 5.3 Observations

The case shows why multiple signals are required. A project may exist while a particular article still uses an unrelated image or inflates attendance. HTTPS, a real-looking domain, or a single supporting article alone is insufficient. Conversely, missing API data cannot prove misinformation. The graph presents article-to-claim-to-evidence relationships, while the timeline makes chronology visible.

**Figure 3. Evidence graph and timeline (insert one screenshot, approximately one-sixth page).**

> *Insert screenshot here. Caption: “Aligned graph nodes and timeline reveal relationships and sequence.”*

\newpage

# 6. Results and Discussion

## 6.1 Findings from the Investigation

The sample case produces a score of 36/100, which falls in the Likely Misleading band. The principal negative signals are the image-context mismatch, an unsupported high attendance figure, a timeline inconsistency and limited author transparency. Positive signals are retained: an announcement supports the existence of an ongoing project, HTTPS is present, and independent local reporting describes a smaller event. The final assessment is therefore not “the whole story is false”; it is that the available evidence indicates a material risk of misleading presentation.

The application successfully demonstrates data persistence, safe input validation, structured case display, local image analysis, evidence graph, timeline, review separation and PDF export. Build and deterministic unit tests validate URL safety, domain normalisation, score normalisation, verdict bands and graph construction.

## 6.2 Comparison with Existing Methods and Challenges Faced

Manual verification commonly involves opening many tabs, copying URLs into notes and losing the link between an observation and a conclusion. TRUTHTRACE improves this by providing a single evidence object and a reproducible local case record. It is lighter than broad frameworks such as Maltego or SpiderFoot and is targeted to an academic news-verification workflow. It does not replace those tools for large-scale investigations.

Important challenges include external API costs, rate limits, incomplete search indexes, archive availability, CORS restrictions, access controls, dynamic webpages, missing EXIF metadata and duplicate syndicated news. The project responds by allowing the core workflow to run without credentials and by marking integrations unavailable. This is more honest than generating realistic-looking but fabricated results.

**Figure 4. Settings and PDF report (insert one screenshot, approximately one-sixth page).**

> *Insert screenshot here. Caption: “Local provider configuration and server-generated investigation report.”*

\newpage

# 7. Conclusion and Future Work

## 7.1 Summary of Results

TRUTHTRACE demonstrates a practical OSINT workflow for the verification of online news claims. It collects inputs lawfully, structures evidence, separates supporting and contradicting findings, performs local image checks, produces an explainable score, and preserves the investigation in SQLite. The evidence graph and timeline make the reasoning more understandable than a single classification label.

## 7.2 Limitations of the Project

The present project is a local educational prototype. Its sample case is fictional. Full cross-source search, archive history, fact-check search and reverse-image matching depend on external providers and their terms of use. The article extractor is intentionally conservative and may fail on JavaScript-heavy sites, paywalls or pages that prohibit access. An image fingerprint can detect local duplicates but cannot by itself establish the original source. The score is an aid to analyst judgement, not a legal, journalistic or factual determination.

## 7.3 Future Enhancements

Future development can add configured provider adapters for NewsAPI, Google Fact Check Tools, Internet Archive and a licensed reverse-image service; semantic but evidence-grounded claim extraction using NVIDIA NIM; duplicate-story clustering; screenshot capture with source attribution; role-based reviewer accounts; encrypted at-rest provider configuration; and more complete PDF evidence appendices. Any such enhancement should retain explicit provenance, consent, rate limiting and ethical controls.

\newpage

# 8. References

1. Google for Developers. *Fact Check Tools API: claims.search*. Available: https://developers.google.com/fact-check/tools/api/reference/rest/v1alpha1/claims/search. Accessed: 03 September 2026.
2. Internet Archive. *Developer Resources and Wayback APIs*. Available: https://archive.org/help/wayback_api.php. Accessed: 03 September 2026.
3. NewsAPI. *Documentation and Authentication*. Available: https://newsapi.org/docs and https://newsapi.org/docs/authentication. Accessed: 03 September 2026.
4. NVIDIA. *API Catalog Quickstart Guide*. Available: https://docs.api.nvidia.com/nim/re/docs/api-quickstart. Accessed: 03 September 2026.
5. TinEye. *TinEye APIs: Getting Started*. Available: https://help.tineye.com/category/168-getting-started. Accessed: 03 September 2026.
6. OWASP Foundation. *Server-Side Request Forgery Prevention Cheat Sheet*. Available: https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html. Accessed: 03 September 2026.

