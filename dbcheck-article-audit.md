# dBcheck article audit

Audit date: 2026-07-12  
Scope: 20 published Markdown pages in `src/content/articles` and `src/content/sounds`  
Audit state: baseline audit with an approved remediation log

## Executive summary

All 20 pages build and are reachable. Titles, slugs and filenames are unique, required frontmatter parses, every rendered page has one H1, a canonical URL, indexable metadata, Open Graph metadata, breadcrumbs and valid Article/BreadcrumbList JSON-LD. The generated sitemap contains all 20 content URLs and no redirect URLs. Automated checking found no broken internal links and no source URL that returned 404.

The baseline audit found **0 Critical**, **9 Important** and **5 Minor** issues. After approval, the verified site defects were corrected and the judgment-based items were reviewed individually. No Critical or Important site defect remains open. Five publisher-protected source URLs still require optional manual verification, and four genuinely separate future topics remain in the content backlog.

## Approved remediation, 2026-07-12

| Finding | Status | Action |
|---|---|---|
| I-1 Safe-exposure intent overlap | Resolved | Renamed the listening-time page to `NIOSH Exposure Time at 85 dBA: How the Model Works`, narrowed its primary intent to the NIOSH occupational model and updated inbound anchor text. The slug remains stable. |
| I-2 Fundamentals intent overlap | Resolved | Shortened the pillar's 3 dB/10 dB treatment and directed the detailed derivation to `is-3-db-twice-as-loud`; removed the duplicate continuation block. |
| I-3 Incomplete research metadata | Resolved | `researchSources` now covers every rendered source in all 20 files. The SPL page retained two original research sources and now cites and renders them explicitly. |
| I-4 Long meta descriptions | Resolved | Shortened all three descriptions. Every content description is now 160 characters or shorter. |
| I-5 Weak sound-page inbound linking | Resolved | Added contextual body links so all five sound pages receive editorial inbound links. No bulk or unrelated links were added. |
| I-6 Missing target coverage | Resolved as content decision | `How Loud Is Too Loud` is owned by the safe-level pillar and `NIOSH Noise Exposure Time Chart` by the NIOSH exposure-time page; separate pages would increase cannibalization. Four distinct topics remain in the backlog below. |
| I-7 Medical source mapping | Resolved | Reduced the medical paragraph to the symptoms and urgency explicitly supported by NIDCD's Sudden Deafness guidance. |
| I-8 Common-sound source strength | Reviewed; no rewrite needed | Conversation, vacuum and baby-crying pages already label their ranges as editorial/approximate, expose distance and metric differences, and explain source variability. Those caveats were retained. |
| I-9 Sound-page structural repetition | Reviewed; no mechanical rewrite | Headings, examples, measurement procedures and endings are source-specific. Shared UI framing remains intentional; the generic final CTA was varied by cluster. |
| M-1 Repetitive final CTA | Resolved | The shared component now renders distinct sound, exposure, smartphone and fundamentals CTA variants from one centralized decision. |
| M-2 List density | Reviewed; no change | Dense lists are concentrated in procedures, checklists and comparisons where prose would reduce scanability. |
| M-3 Duplicate continuation links | Resolved | Removed the repeated four-link continuation block from `what-is-a-decibel`. |
| M-4 Source automation gaps | Open manual check | Five publisher-protected URLs still return 403 to automated clients; none returned 404 or is proven broken. |
| M-5 Question density | Reviewed; no change | The questions are mainly search-aligned headings and concrete examples rather than filler. |

### Content backlog retained after remediation

- Concert Hearing Protection: a distinct practical support article.
- How Distance Affects Sound Level: a fundamentals support article covering free-field limits and real-room caveats.
- How to Add and Average Decibel Levels: a calculation-focused fundamentals article.
- Noise Dose Calculator: a future tool, distinct from the current NIOSH reference-time calculator.

The baseline inventory and findings below are retained as audit evidence. Statuses above describe the current post-remediation state.

## A. Inventory

Word counts are retained from the baseline audit and exclude frontmatter. Source, internal-link and status columns reflect the approved remediation. Source count is the number of entries rendered under `Sources`; internal-link count is the number of Markdown links to dBcheck routes in the article body, including tool and index links. The shared rendered CTA is listed separately from contextual links in the body.

| Filename | Title | Slug | Content cluster | Primary intent | Article type | Words | Sources | Internal links | Rendered CTA target | Status |
|---|---|---|---|---|---|---:|---:|---:|---|---|
| `are-decibel-meter-apps-accurate.md` | Are Decibel Meter Apps Accurate? | `are-decibel-meter-apps-accurate` | Smartphone sound measurement | Accuracy/evidence | Pillar | 2,221 | 12 | 7 | `/#features` | Resolved |
| `db-vs-dba.md` | dB vs dBA: What Is the Difference? | `db-vs-dba` | Decibel fundamentals | Definition/comparison | Support | 1,005 | 5 | 2 | `/sounds/` | Pass |
| `how-long-can-you-listen-at-85-db.md` | NIOSH Exposure Time at 85 dBA: How the Model Works | `how-long-can-you-listen-at-85-db` | Noise exposure and hearing risk | NIOSH exposure time | Support | 1,534 | 6 | 8 | `/tools/safe-listening-time-calculator/` | Resolved |
| `how-to-calibrate-a-decibel-meter-app.md` | How to Calibrate a Decibel Meter App | `how-to-calibrate-a-decibel-meter-app` | Smartphone sound measurement | How-to | Support | 1,855 | 5 | 3 | `/#features` | Reviewed; no change |
| `how-to-measure-decibels-with-android-phone.md` | How to Measure Decibels With an Android Phone | `how-to-measure-decibels-with-android-phone` | Smartphone sound measurement | How-to | Support | 1,835 | 6 | 6 | `/#features` | Resolved |
| `is-3-db-twice-as-loud.md` | Is 3 dB Twice as Loud? Sound Energy vs Perceived Loudness | `is-3-db-twice-as-loud` | Decibel fundamentals | Explanation | Support | 1,073 | 7 | 1 | `/sounds/` | Resolved through pillar scope |
| `niosh-vs-osha-noise-exposure-limits.md` | NIOSH vs OSHA Noise Exposure Limits | `niosh-vs-osha-noise-exposure-limits` | Noise exposure and hearing risk | Comparison | Reference | 1,759 | 9 | 7 | `/tools/safe-listening-time-calculator/` | Resolved |
| `phone-sound-meter-vs-professional-meter.md` | Phone Sound Meter vs Professional Sound Level Meter | `phone-sound-meter-vs-professional-meter` | Smartphone sound measurement | Comparison | Support | 1,897 | 7 | 4 | `/#features` | Resolved |
| `what-is-a-decibel.md` | What Is a Decibel? A Simple Guide to Sound Levels | `what-is-a-decibel` | Decibel fundamentals | Definition | Pillar | 1,756 | 10 | 6 | `/sounds/` | Resolved |
| `what-is-a-safe-decibel-level.md` | What Is a Safe Decibel Level? | `what-is-a-safe-decibel-level` | Noise exposure and hearing risk | Safety overview | Pillar | 2,018 | 10 | 12 | `/tools/safe-listening-time-calculator/` | Resolved |
| `what-is-noise-dose.md` | What Is Noise Dose? | `what-is-noise-dose` | Noise exposure and hearing risk | Definition | Support | 1,618 | 6 | 6 | `/tools/safe-listening-time-calculator/` | Reviewed; no change |
| `what-is-sound-pressure-level.md` | What Is Sound Pressure Level? SPL Explained | `what-is-sound-pressure-level` | Decibel fundamentals | Definition | Support | 1,278 | 9 | 3 | `/sounds/` | Resolved |
| `why-decibel-meter-apps-show-different-results.md` | Why Do Decibel Meter Apps Show Different Results? | `why-decibel-meter-apps-show-different-results` | Smartphone sound measurement | Troubleshooting/explanation | Support | 1,567 | 6 | 4 | `/#features` | Pass |
| `why-does-85-db-matter.md` | Why Does 85 dB Matter? | `why-does-85-db-matter` | Noise exposure and hearing risk | Explanation | Support | 1,450 | 9 | 6 | `/tools/safe-listening-time-calculator/` | Resolved |
| `why-is-the-decibel-scale-logarithmic.md` | Why Is the Decibel Scale Logarithmic? | `why-is-the-decibel-scale-logarithmic` | Decibel fundamentals | Explanation | Support | 1,003 | 4 | 2 | `/sounds/` | Resolved through pillar scope |
| `baby-crying.md` | How Loud Is a Baby Crying? | `baby-crying` | Common sound reference library | Sound level | Sound page | 1,262 | 6 | 8 | `/sounds/` | Reviewed; inbound resolved |
| `concert.md` | How Loud Is a Concert? | `concert` | Common sound reference library | Sound level/exposure | Sound page | 1,361 | 6 | 10 | `/sounds/` | Inbound resolved; protection backlog |
| `lawn-mower.md` | How Loud Is a Lawn Mower? | `lawn-mower` | Common sound reference library | Sound level/exposure | Sound page | 1,372 | 6 | 10 | `/sounds/` | Inbound resolved |
| `normal-conversation.md` | How Loud Is a Normal Conversation? | `normal-conversation` | Common sound reference library | Sound level | Sound page | 1,222 | 6 | 6 | `/sounds/` | Reviewed; inbound resolved |
| `vacuum-cleaner.md` | How Loud Is a Vacuum Cleaner? | `vacuum-cleaner` | Common sound reference library | Sound level | Sound page | 1,343 | 6 | 9 | `/sounds/` | Reviewed; inbound resolved |

## B. Frontmatter audit

Required fields checked: `title`, `description`, `slug`, `primaryIntent`, `contentCluster`, `researchSources`, `lastReviewed` and `draft`.

- No required field is missing or empty.
- All 20 titles are unique.
- All 20 slugs are unique.
- Every filename matches its frontmatter slug.
- All `lastReviewed` values parse as valid dates.
- No field-name variants were found.
- `draft` is normalized by the collection schema and all 20 imported pages are published.
- The content loader uses frontmatter `slug` as the collection ID, so route generation has one source of truth.

### Baseline `researchSources` inconsistencies — resolved

Six files list more sources in the rendered `Sources` section than in `researchSources`. This does not break rendering, but the metadata is incomplete unless the field is explicitly defined as a selected-source list.

| File | `researchSources` | Rendered sources | Difference |
|---|---:|---:|---:|
| `are-decibel-meter-apps-accurate.md` | 8 | 12 | 4 |
| `niosh-vs-osha-noise-exposure-limits.md` | 8 | 9 | 1 |
| `what-is-a-decibel.md` | 7 | 10 | 3 |
| `what-is-a-safe-decibel-level.md` | 7 | 10 | 3 |
| `what-is-sound-pressure-level.md` | 6 | 7 | 1 |
| `why-does-85-db-matter.md` | 7 | 9 | 2 |

Completed action: `researchSources` now enumerates the rendered source set consistently in all 20 files.

## C. SEO audit

### Technical SEO

- All 20 content pages have a unique title tag and meta description.
- All 20 have a self-referencing canonical URL.
- Every page has exactly one H1 and a logical rendered heading structure.
- No content page contains `noindex`.
- All 20 canonical content URLs are present in the sitemap.
- Redirect-only legacy sound URLs are excluded from the sitemap.
- Open Graph and Twitter metadata are present.
- Article and BreadcrumbList structured data parses on all 20 pages.
- No fake author, review, rating or Product schema is present.
- `lastReviewed` is rendered and used as `dateModified`; no invented publication date is emitted.
- Automated route resolution found no broken internal URL.

### Baseline search-intent and metadata findings

1. **Safe-exposure overlap.** `what-is-a-safe-decibel-level`, `why-does-85-db-matter` and `how-long-can-you-listen-at-85-db` all cover the 85 dBA threshold and exposure-time table. Their purposes are distinguishable, but title and body ownership should be sharpened. “How Long Can You Safely Listen…” is especially risky because the article correctly explains that the NIOSH model is not an individual safety guarantee.
2. **Fundamentals overlap.** `what-is-a-decibel`, `why-is-the-decibel-scale-logarithmic` and `is-3-db-twice-as-loud` repeat the logarithmic-scale and 3/10 dB explanations. Keep the pillar concise and let the two support pages own the deeper derivations.
3. **Meta descriptions over 160 characters.** `how-to-measure-decibels-with-android-phone` (164), `niosh-vs-osha-noise-exposure-limits` (163) and `phone-sound-meter-vs-professional-meter` (174) may be truncated. This is not an indexing error.
4. **Editorially weak sound-page discovery.** All five sound pages are discoverable from `/sounds`, `/articles` and search, so none is a technical orphan. However, none receives an incoming body link from another article. Add only contextually useful links in a later content pass.
5. **Missing planned topics.** Six placeholders had no publishable target and were removed rather than turned into broken links: Concert Hearing Protection, How Distance Affects Sound Level, How Loud Is Too Loud, How to Add and Average Decibel Levels, NIOSH Noise Exposure Time Chart and Noise Dose Calculator. These are content gaps, not broken routes.

No descriptions are implausibly short, no duplicate title tags were found, and no page is thin merely by word count: the shortest page is 1,003 words.

## D. Style audit

### Corpus-wide checks

- Em dash: 0 occurrences.
- En dash: 0 occurrences.
- Exact generic phrases `This article will`, `Let's explore`, `It is important to note` and `In conclusion`: 0 occurrences.
- Exact generic AI terms `delve`, `ever-evolving` and `landscape`: 0 relevant occurrences.
- No substantive paragraph was duplicated verbatim across files.
- The five sound pages use a visibly similar sequence: range, variability, measurement, phone limitations, exposure context, CTA and sources. The material is not duplicate text, but the structure and endings should be varied in an approved editorial pass.
- The shared final CTA is deliberately consistent by cluster; together with article-level CTA text it can feel repetitive across sequential reading.

### File-by-file style findings

| File | Finding |
|---|---|
| `are-decibel-meter-apps-accurate.md` | 34 bullet items; scanability is good, but several adjacent lists could be consolidated after a human read. |
| `db-vs-dba.md` | No notable style defect. Five question marks are mostly useful headings/examples. |
| `how-long-can-you-listen-at-85-db.md` | Title uses “Safely” more strongly than the article's own caveats; this is also an SEO/safety wording issue. |
| `how-to-calibrate-a-decibel-meter-app.md` | 39 bullet items, the highest list density in the set. Avoid mechanical conversion; review where procedure steps genuinely need lists. |
| `how-to-measure-decibels-with-android-phone.md` | No generic introduction; 17 bullets are proportionate for a practical guide. |
| `is-3-db-twice-as-loud.md` | Concise and direct; some explanatory material repeats the logarithmic pillar. |
| `niosh-vs-osha-noise-exposure-limits.md` | 29 bullets and multiple comparison blocks; accurate scanning structure, but dense. |
| `phone-sound-meter-vs-professional-meter.md` | 25 bullets; comparison structure is useful, though the ending resembles other smartphone pages. |
| `what-is-a-decibel.md` | 18 question marks and the same four support links appear in both inline text and the final continuation block. |
| `what-is-a-safe-decibel-level.md` | Strong caveat language; final safety summary overlaps the 85 dBA support pages. |
| `what-is-noise-dose.md` | 24 bullets; formula and workflow sections are clear, but list density merits a human pass. |
| `what-is-sound-pressure-level.md` | No notable style defect; technical terms are introduced before use. |
| `why-decibel-meter-apps-show-different-results.md` | No notable style defect; troubleshooting sequence is appropriately concrete. |
| `why-does-85-db-matter.md` | Clear opening, but much of the conclusion repeats the safe-level pillar's threshold explanation. |
| `why-is-the-decibel-scale-logarithmic.md` | No generic filler; ownership of the 3 dB/10 dB examples overlaps two adjacent pages. |
| `baby-crying.md` | Unique examples, but follows the same visible sound-page frame and CTA cadence as the other four. |
| `concert.md` | 22 bullets; the exposure checklist is useful, though the page would benefit from the missing dedicated protection target. |
| `lawn-mower.md` | Distinguishes push/riding use well; structure and closing cadence resemble the other sound pages. |
| `normal-conversation.md` | Seven bullets and varied prose; source caveats matter more than style. |
| `vacuum-cleaner.md` | Nine bullets and distinct room/position discussion; template cadence remains visible. |

No broad style rewrite is recommended without article-by-article editorial judgment.

## E. Factual and safety audit

### Checks that passed

- `dB` is generally used for the generic level concept and `dBA` where A-weighted guidance or measurements are intended.
- SPL is defined relative to 20 micropascals and kept distinct from perceived loudness.
- LAeq and LCpeak are described as different metrics; average, maximum and peak are not treated as interchangeable corpus-wide.
- RMS is described in measurement context rather than as a synonym for a displayed maximum.
- Noise dose, projected dose and TWA are explained as model-dependent occupational metrics.
- NIOSH (85 dBA, 8 h, 3 dB exchange), OSHA (90 dBA PEL, 5 dB exchange) and WHO leisure guidance are labeled as different frameworks.
- Exposure-time tables are repeatedly qualified as guidance, not personal safety guarantees.
- Phone microphone, processing, AGC, clipping and calibration limitations are stated.
- Calibration is not presented as a universal correction for frequency response, clipping or device processing.
- No page claims that dBcheck or a phone is a certified Class 1 or Class 2 meter.
- No sound level is presented without variability context; the five summary cards expose range, distance, sound type and exposure context.

### Items requiring editorial/source review

1. **Medical-support scope:** `what-is-a-safe-decibel-level.md` lists several urgent symptoms and actions. The cited sudden-hearing-loss source clearly supports urgent care for sudden hearing loss, but the audit could not establish that it supports every symptom in the combined sentence. Have a qualified editor map each medical statement to a supporting source before changing the wording.
2. **“Safely” in an exposure-time title:** `how-long-can-you-listen-at-85-db.md` correctly says that exposure guidance is not a guarantee, but the title can be read as a personal assurance. Retitle only after approving the intended search target.
3. **Common-sound synthesis:** baby crying, conversation and vacuum ranges combine evidence collected with different ages, distances, environments and metrics. The pages currently label the ranges approximate and explain variability, which prevents a Critical finding. Future edits should preserve those qualifications.
4. **Peak/maximum language on sound pages:** current pages distinguish typical range from short maxima or peaks. Any later copy tightening must not collapse those values into one universal number.

No unsupported Class 1/Class 2, diagnosis, or individual safety-guarantee claim was found.

## F. Source audit

- The 20 pages render 144 source entries in total; per-page counts range from 4 to 12 and are proportionate to article scope.
- Numerical claims generally have nearby citations or are supported by the page's source set.
- Core safety and measurement claims rely primarily on NIOSH, OSHA, WHO, NIDCD, IEC material, peer-reviewed papers and official technical documentation.
- The targeted research reports support the core distinctions and caveats used in the articles: dB/dBA/SPL metrics, NIOSH/OSHA/WHO model separation, smartphone variability and clipping, and the editorial common-sound ranges.
- The six baseline `researchSources` mismatches in section B reduced metadata consistency; they are resolved in the remediation pass.
- Equivalent organizations and documents are sometimes named differently between frontmatter and the rendered source list. Normalize names only after defining a citation style.
- Common-sound evidence is uneven: concert and lawn-mower ranges have stronger direct measurement support; conversation, vacuum and baby crying require more synthesis across differing conditions. The prose currently discloses this variability.

### URL verification

There are 51 unique source URLs. Automated HTTP checking produced:

- 46 successful responses.
- 0 confirmed 404 responses.
- 5 responses blocked with HTTP 403 by the publisher or bot protection: three DOI publisher destinations, IEC Electropedia and one ScienceDirect abstract. These are **not classified as broken**; they need a normal-browser/manual check if publication policy requires full verification.

No official source was replaced with a weaker blog source during integration, and no URL, DOI or publication name was invented.

## G. Internal linking audit

Counts below include distinct article-body destinations. Index, search, homepage and template-related links are described separately.

| Source | Destinations |
|---|---|
| `are-decibel-meter-apps-accurate` | `what-is-a-decibel`, `how-to-measure-decibels-with-android-phone`, `why-decibel-meter-apps-show-different-results`, `what-is-sound-pressure-level`, `db-vs-dba`, `how-to-calibrate-a-decibel-meter-app`, `phone-sound-meter-vs-professional-meter` |
| `db-vs-dba` | `what-is-a-decibel`, `why-decibel-meter-apps-show-different-results` |
| `how-long-can-you-listen-at-85-db` | `what-is-a-safe-decibel-level`, `is-3-db-twice-as-loud`, `what-is-noise-dose`, `are-decibel-meter-apps-accurate`, `how-to-measure-decibels-with-android-phone`, `why-does-85-db-matter`, `niosh-vs-osha-noise-exposure-limits`, safe-time calculator |
| `how-to-calibrate-a-decibel-meter-app` | `are-decibel-meter-apps-accurate`, `db-vs-dba`, `phone-sound-meter-vs-professional-meter` |
| `how-to-measure-decibels-with-android-phone` | `are-decibel-meter-apps-accurate`, `vacuum-cleaner`, `baby-crying`, `db-vs-dba`, `what-is-sound-pressure-level`, `phone-sound-meter-vs-professional-meter` |
| `is-3-db-twice-as-loud` | `what-is-a-decibel` |
| `niosh-vs-osha-noise-exposure-limits` | `what-is-a-safe-decibel-level`, `why-does-85-db-matter`, `how-long-can-you-listen-at-85-db`, `what-is-noise-dose`, `phone-sound-meter-vs-professional-meter`, `are-decibel-meter-apps-accurate`, `how-to-measure-decibels-with-android-phone` |
| `phone-sound-meter-vs-professional-meter` | `are-decibel-meter-apps-accurate`, `how-to-calibrate-a-decibel-meter-app`, `db-vs-dba`, `how-to-measure-decibels-with-android-phone` |
| `what-is-a-decibel` | `why-is-the-decibel-scale-logarithmic`, `what-is-sound-pressure-level`, `db-vs-dba`, `is-3-db-twice-as-loud`, `normal-conversation`, `vacuum-cleaner` |
| `what-is-a-safe-decibel-level` | `what-is-a-decibel`, `db-vs-dba`, `is-3-db-twice-as-loud`, `why-does-85-db-matter`, `niosh-vs-osha-noise-exposure-limits`, `what-is-noise-dose`, `are-decibel-meter-apps-accurate`, `how-to-measure-decibels-with-android-phone`, `concert`, `lawn-mower`, `how-long-can-you-listen-at-85-db`, safe-time calculator |
| `what-is-noise-dose` | `what-is-a-safe-decibel-level`, `why-does-85-db-matter`, `how-long-can-you-listen-at-85-db`, `niosh-vs-osha-noise-exposure-limits`, `are-decibel-meter-apps-accurate`, `how-to-measure-decibels-with-android-phone` |
| `what-is-sound-pressure-level` | `what-is-a-decibel`, `is-3-db-twice-as-loud`, `db-vs-dba` |
| `why-decibel-meter-apps-show-different-results` | `are-decibel-meter-apps-accurate`, `db-vs-dba`, `what-is-sound-pressure-level`, `how-to-calibrate-a-decibel-meter-app` |
| `why-does-85-db-matter` | `db-vs-dba`, `is-3-db-twice-as-loud`, `what-is-a-safe-decibel-level`, `niosh-vs-osha-noise-exposure-limits`, `how-long-can-you-listen-at-85-db`, safe-time calculator |
| `why-is-the-decibel-scale-logarithmic` | `what-is-a-decibel`, `is-3-db-twice-as-loud` |
| `baby-crying` | `/sounds`, `what-is-sound-pressure-level`, `db-vs-dba`, `what-is-a-safe-decibel-level`, `how-to-measure-decibels-with-android-phone`, `are-decibel-meter-apps-accurate`, `phone-sound-meter-vs-professional-meter` |
| `concert` | `/sounds`, `db-vs-dba`, `what-is-sound-pressure-level`, `what-is-a-safe-decibel-level`, `why-does-85-db-matter`, `how-long-can-you-listen-at-85-db`, `how-to-measure-decibels-with-android-phone`, `are-decibel-meter-apps-accurate`, `phone-sound-meter-vs-professional-meter`, safe-time calculator |
| `lawn-mower` | `/sounds`, `what-is-sound-pressure-level`, `db-vs-dba`, `why-does-85-db-matter`, `how-long-can-you-listen-at-85-db`, `what-is-a-safe-decibel-level`, `how-to-measure-decibels-with-android-phone`, `are-decibel-meter-apps-accurate`, `phone-sound-meter-vs-professional-meter`, safe-time calculator |
| `normal-conversation` | `/sounds`, `what-is-sound-pressure-level`, `what-is-a-safe-decibel-level`, `are-decibel-meter-apps-accurate`, `how-to-measure-decibels-with-android-phone` |
| `vacuum-cleaner` | `/sounds`, `what-is-sound-pressure-level`, `db-vs-dba`, `how-to-measure-decibels-with-android-phone`, `what-is-a-safe-decibel-level`, `why-does-85-db-matter`, `are-decibel-meter-apps-accurate`, `phone-sound-meter-vs-professional-meter` |

### Graph conclusions

- No technical orphan exists: every page is linked from a category index and included in search and sitemap.
- The three main pillars receive meaningful support-page links: `are-decibel-meter-apps-accurate` has 13 editorial inbound links, `what-is-a-safe-decibel-level` has 9 and `what-is-a-decibel` has 6.
- The two weakest non-sound inbound counts are `why-decibel-meter-apps-show-different-results` and `why-is-the-decibel-scale-logarithmic`, both with 2. Their parent pillars do link to them, so they are not orphans.
- All five sound pages now receive contextual links from article bodies. `vacuum-cleaner` receives two; the other four receive one each. Index, homepage, search and sitemap discovery remain in place.
- Every sound page links back to `/sounds`.
- Smartphone pages link to dB/dBA/SPL foundations where the concept is used.
- Safety pages link to the relevant fundamentals and exposure pillar.
- The duplicate continuation block was removed from `what-is-a-decibel`; its six distinct links now serve separate fundamentals and everyday-sound contexts.
- All existing planned-link placeholders were replaced; the six absent targets listed in section C were removed from public copy and not linked.

## H. Common sound page audit

| Page | Range first | Distance | Variability | Sound type | Average/max/peak distinction | Exposure context | Phone limitation | Template repetition |
|---|---|---|---|---|---|---|---|---|
| Normal conversation | Yes, 55–75 dBA | Yes, about 1 m | Yes | Yes | Yes | Cautious | Yes | Moderate |
| Vacuum cleaner | Yes, 65–85 dBA | Yes, operator/about 1 m | Yes | Yes | Yes | Cautious | Yes | Moderate |
| Lawn mower | Yes, 86–96 dBA | Yes, operator position | Yes | Yes | Yes | Cautious | Yes | Moderate |
| Concert | Yes, 85–105 dBA | Yes, listener position | Yes | Yes | Yes | Cautious | Yes | Moderate |
| Baby crying | Yes, 75–100 dBA | Yes, caregiving distance | Yes | Yes | Yes | Cautious | Yes | Moderate |

All required summary facts are visible near the beginning through the sourced summary card. The pages correctly present ranges, not universal single values. Their strongest shared weakness is structural sameness; the most important factual caveat is that conversation, vacuum and baby-crying ranges synthesize measurements made under differing conditions.

## I. Baseline prioritized correction list

### Critical — 0

No factual error, broken route, broken internal link, duplicate slug, unsafe health guarantee, invalid metadata or indexing failure was confirmed.

### Important — 9

1. **I-1 Safe-exposure intent overlap:** clarify ownership among the safe-level, 85 dB and listening-time pages; review “Safely” in the listening-time title.
2. **I-2 Fundamentals intent overlap:** reduce repeated logarithmic/3 dB/10 dB explanations while preserving the pillar/support relationship.
3. **I-3 Incomplete research metadata:** normalize the six `researchSources` lists or document them as selected sources.
4. **I-4 Long meta descriptions:** shorten the three descriptions over 160 characters without changing intent.
5. **I-5 Weak sound-page inbound linking:** add selective contextual links from relevant articles to the five published sound pages.
6. **I-6 Missing target coverage:** decide whether the six removed planned targets belong in the future content backlog.
7. **I-7 Medical source mapping:** verify that every urgent symptom/action in `what-is-a-safe-decibel-level` has direct authoritative support.
8. **I-8 Common-sound source strength:** review the synthesis behind conversation, vacuum and baby-crying ranges; retain distance/metric caveats.
9. **I-9 Sound-page structural repetition:** vary the five pages' information flow and endings without mechanically rewriting them.

### Minor — 5

1. **M-1 Repetitive final CTA:** the shared cluster CTA is restrained but identical across many sequential pages.
2. **M-2 List density:** manually review the calibration, app-accuracy, NIOSH/OSHA, professional-meter, noise-dose and concert pages.
3. **M-3 Duplicate continuation links:** `what-is-a-decibel` presents the same four support links twice.
4. **M-4 Source automation gaps:** manually verify the five publisher-protected URLs that returned 403; none is currently proven broken.
5. **M-5 Question density:** `what-is-a-decibel` uses 18 question marks; most are purposeful, but the pattern is conspicuous.

## Verification record

- `npm run build`: passed; 25 canonical public pages and 8 redirects generated.
- Content/page validator: passed; 20 article pages, 25 sitemap URLs, 33 search entries, 0 errors.
- Internal route and asset resolution: passed; 0 broken targets.
- Source URL check: 46 success, 5 publisher-blocked 403, 0 confirmed 404.
- Desktop Chromium: homepage, article index, search, Explorer and concert page checked.
- Mobile Chromium at 390 px: navigation, article tables/math, sound index, Explorer and calculator checked.
- Mobile overflow: a raw-source-URL overflow found during testing was fixed; final page `scrollWidth` equals viewport width.
- Console: no errors or warnings in the tested article, sound-index and calculator flows.

## Remaining follow-up

The current site has no open Critical or Important defect from this audit. Optional follow-up consists of manually opening the five publisher-protected source URLs in a normal browser and scheduling the four distinct backlog topics when they fit the content roadmap.
