# dBcheck.app evidence-first website improvement audit

**Audit date:** 2026-08-21  
**Scope:** audit and implementation planning only  
**Production changes made:** none  
**Finding count:** **P0 5 · P1 6 · P2 6 · P3 1**

## 1. Executive assessment

dBcheck.app has a strong technical and editorial base. The local production build succeeds, all 56 indexable routes are present on the live site with matching rendered text, canonicals and hreflang are internally coherent, the finite 40-page editorial corpus has distinct search intents, and the calculators produced correct reference results. There is no evidence supporting a URL migration, locale-architecture change, mass rewrite, content expansion, consolidation, noindex campaign, schema expansion, or publication-date change.

The site is not ready to be left unchanged, however. Five P0 issues should be corrected before wider promotion:

1. GA4 runs and sets identifying first-party cookies before any choice, while the site has no privacy/controller disclosure.
2. The YAMNet claim says classification happens “without recording audio,” although the app captures live PCM through `AudioRecord`; the defensible claim is that classifier input is not persisted.
3. The homepage calls the feature a “real dosimeter” and advertises “85 dB peak alerts,” while the app's actual peak-warning constant is 120 dB and 85 dB is an exposure threshold/event boundary.
4. “Hearing health status/companion” overstates a weekly noise-exposure summary and a relative, non-clinical hearing flow.
5. The launch feature list includes the tinnitus pitch profile even though current app truth explicitly gates it to v1.5, not v1.0.

The first recommended implementation batch is **Batch 1: tracking and legal-information baseline**. It removes the clearest live privacy/legal exposure and also cuts the largest third-party JavaScript cost. Product wording corrections are Batch 2 and should follow immediately.

The prior indexing loss cannot be attributed from this repository and was not investigated. Nothing in the current route, canonical, hreflang, sitemap, robots, title, description, or internal-link evidence justifies speculative “AI content,” crawl-budget, freshness, publishing-frequency, or mass-consolidation recommendations.

## 2. Audit scope and limitations

### Evidence inspected

- The complete website checkout, including framework configuration, lockfile, content collections, routes, templates, data modules, metadata, sitemap, robots, redirects, tests, deployment configuration, built assets, and current dirty-tree state.
- The live site at `https://dbcheck.app/`, its 56 sitemap URLs, eight legacy redirects, `robots.txt`, sitemaps, HTTP behavior, browser requests, cookies, and unknown-route response.
- The current Android app checkout and its current `PROJECT.md`, with production-code spot checks for claims where wording mattered.
- All 40 editorial Markdown files mechanically; all 20 English editorial pages semantically; German metadata, introductions, headings, citations, and a stratified browser sample; and the complete German high-risk exposure/legal material relevant to disputed claims.
- All five English calculator implementations and all four German localized calculator routes.

### Validation performed

- `npm run check`: 0 errors, 0 warnings, 18 hints.
- `npm test`: 14/14 tests passed.
- `npm run build -- --outDir <temporary-directory>`: success; 56 sitemap pages and 8 generated noindex redirect pages.
- Browser checks with Chromium/Playwright at 360, 390, 768, and 1440 px on the required representative page types.
- Keyboard checks for navigation, language switching, search, calculator controls, add/remove controls, and the hero Listen/Mute flow.
- Reduced-motion and forced-colors smoke checks.
- Mobile Lighthouse lab run on the local production preview: performance 78, accessibility 97, best practices 96, SEO 100; FCP 2.8 s, LCP 4.5 s, TBT 130 ms, CLS 0.006, total transfer 715 KiB.
- Mechanical generated-HTML audit for titles, descriptions, H1s, canonicals, hreflang, schema, indexability, anchors, internal links, duplicate IDs, form labels, missing image alt text, and sitemap membership.
- Automated outbound-link reachability check across 76 unique source URLs.

### Limitations

- No Google Search Console, field Core Web Vitals/CrUX, analytics dashboard, backlink data, server logs, or historical crawl snapshots were supplied. Indexing causation is therefore deliberately out of scope.
- The repository contains no `dbcheck-article-humanizer-*.md` or `dbcheck-article-validator-*.md` files in the website or adjacent app checkout. The requested language-specific heuristics could not be applied as external artifacts; corpus-level scripts and direct editorial judgment were used instead.
- Three authoritative source URLs returned automated HTTP 403 responses: two ISO abstract pages (`63077`, `63078`) and one Acta Acustica full-text page. They are bot-blocked, not proven broken; manual browser/source verification remains appropriate.
- Lighthouse is one synthetic mobile lab run, not field data. Absolute timings can vary; the identified LCP element and third-party transfer costs are still concrete.
- Forced-colors received a browser smoke check. Full NVDA/JAWS/VoiceOver/TalkBack testing and native Windows High Contrast review were not available. A CSS-zoom smoke check was used as a limited 200% proxy, not as a substitute for a full assistive-technology sign-off.
- This is not legal advice. The analytics, privacy, controller, and provider-information finding is based on observed behavior and official texts; final wording and jurisdictional applicability require the owner or counsel.
- The existing untracked `.codex-remote-attachments/` directory was preserved and not inspected as production source.

## 3. Repository and framework overview

| Area | Current implementation | Audit decision |
|---|---|---|
| Framework | Astro 7 static site; no frontend framework | KEEP AS IS |
| Package manager | npm with `package-lock.json` | KEEP AS IS |
| Browser dependency | `anime.js`, dynamically loaded for defined motion paths | KEEP AS IS |
| Locales | `en` default without prefix; `de` under localized content segments | KEEP AS IS |
| Shared layout | `src/layouts/Base.astro` owns metadata, nav, search, footer, motion, and analytics | Appropriate ownership; specific findings below |
| Content | `src/content/articles/{en,de}` and `src/content/sounds/{en,de}` | KEEP AS IS |
| Content schema | `src/content.config.ts` with locale, translation, intent, source, and date fields | KEEP AS IS; Astro emits deprecation hints to schedule later |
| Route pairing | `src/i18n/routes.ts` | KEEP AS IS |
| Search | Static locale-specific JSON built from published content/data | KEEP AS IS |
| Sound data | `src/data/sounds.ts` | KEEP AS IS |
| Tool data | `src/data/tools.ts` | KEEP AS IS |
| Price display | `src/data/prices.ts` plus Cloudflare country trace and EUR fallback | Keep implementation; do not treat website prices as Play Console verification |
| Calculators | Pure libraries plus progressively enhanced Astro components/scripts | KEEP AS IS |
| Structured data | Homepage `WebSite`; editorial `Article` + `BreadcrumbList` | KEEP AS IS |
| Deployment | Cloudflare static assets via `wrangler.jsonc`; security headers in `public/_headers` | KEEP AS IS except 404/privacy work |
| Build commands | `npm run check`, `npm test`, `npm run build`, `npm run preview` | Confirmed from `package.json` |

The build contains 64 HTML files: 56 indexable pages and 8 noindex redirect documents. Search JSON endpoints are generated separately and are not HTML pages. Drafts are filtered from routes, listings, homepage, and search.

`npm run check` currently reports 15 deprecation hints from importing `z` through `astro:content` and 3 explicit-inline hints in `Base.astro`. They do not break the current Astro 7 build and are not elevated into a separate finding; address them only during a planned framework-maintenance pass.

## 4. Complete route and locale inventory

### Shared mechanical result

Every route in the 56-row ledger below returned 200 locally and live, is indexable, has a self-referencing canonical, appears once in the sitemap, is reachable through ordinary crawlable HTML links, has exactly one H1, and has a non-empty unique title and meta description. Paired routes have reciprocal `en`/`de`/`x-default` alternates. The English-only noise-dose calculator intentionally has no invented German alternate.

`In` and `Out` are counts of unique indexable internal routes in the generated link graph. Schema is `WebSite`, `Article+BreadcrumbList`, or `—`. Route-generation ownership is:

- `/`: `src/pages/index.astro`.
- English indexes: their page file plus `ArticleIndexPage.astro`, `SoundIndexPage.astro`, or `ToolsIndexPage.astro`.
- English editorial details: `src/pages/articles/[slug].astro` or `src/pages/sounds/[slug].astro` + `EditorialPage.astro` + the matching Markdown file.
- German editorial details: `src/pages/de/artikel/[slug].astro` or `src/pages/de/alltagsgeraeusche/[slug].astro` + `EditorialPage.astro` + the matching Markdown file.
- English tools: the named static page plus shared calculator components/scripts.
- German tools: `src/pages/[locale]/[toolsSegment]/[slug].astro` + the shared component selected from `src/data/tools.ts`.

### Route ledger: homepage, English indexes and editorial pages

| Route | Type | In/Out | Schema | Title · H1 · Description |
|---|---|---:|---|---|
| `/` | Home | 55/9 | WebSite | **dBcheck: sound information, tools and an Android sound meter** · “Understand the sound around you.” · Explore common sound levels, free educational tools and dBcheck for Android: a personal sound awareness and hearing-result tracking app. |
| `/articles/` | Article index | 29/23 | — | **Articles and sound guides \| dBcheck** · “Articles and sound guides” · Sourced dBcheck guides about decibels, phone sound measurement, noise exposure and common sound levels. |
| `/articles/are-decibel-meter-apps-accurate/` | Article | 15/11 | Article+BreadcrumbList | **Are Decibel Meter Apps Accurate? \| dBcheck** · same H1 · How accurate smartphone decibel meter apps can be, why Android results vary, what calibration can improve, and when a professional meter is required. |
| `/articles/db-vs-dba/` | Article | 15/7 | Article+BreadcrumbList | **dB vs dBA: What Is the Difference? \| dBcheck** · same H1 · The practical difference between dB and dBA, what A-weighting does, why dBA is widely used, and when another metric may be needed. |
| `/articles/how-long-can-you-listen-at-85-db/` | Article | 8/12 | Article+BreadcrumbList | **NIOSH Exposure Time at 85 dBA: How the Model Works \| dBcheck** · same H1 · How the NIOSH 85 dBA model calculates occupational exposure time from 85 to 115 dBA, and why the result is not a personal safety guarantee. |
| `/articles/how-to-calibrate-a-decibel-meter-app/` | Article | 5/7 | Article+BreadcrumbList | **How to Calibrate a Decibel Meter App \| dBcheck** · same H1 · How to align a smartphone sound meter app with a reliable reference, calculate an offset, verify several levels, and understand what calibration cannot fix. |
| `/articles/how-to-measure-decibels-with-android-phone/` | Article | 13/10 | Article+BreadcrumbList | **How to Measure Decibels With an Android Phone \| dBcheck** · same H1 · Measure environmental sound with an Android phone while controlling position, distance, duration, settings, and common sources of error. |
| `/articles/is-3-db-twice-as-loud/` | Article | 8/6 | Article+BreadcrumbList | **Is 3 dB Twice as Loud? Energy vs Loudness \| dBcheck** · same H1 · Why a 3 dB increase doubles sound energy but not perceived loudness, what a 10 dB change means, and how the NIOSH 3 dB exchange rate works. |
| `/articles/niosh-vs-osha-noise-exposure-limits/` | Article | 6/12 | Article+BreadcrumbList | **NIOSH vs OSHA Noise Exposure Limits \| dBcheck** · same H1 · Compare NIOSH and OSHA noise limits, including criterion levels, exchange rates, dose, TWA, hearing conservation, and legal status. |
| `/articles/phone-sound-meter-vs-professional-meter/` | Article | 10/8 | Article+BreadcrumbList | **Phone Sound Meter vs Professional Meter \| dBcheck** · same H1 · Compare phone sound meter apps with professional meters for accuracy, calibration, peak capture, compliance, cost, and practical use. |
| `/articles/what-is-a-decibel/` | Article | 8/11 | Article+BreadcrumbList | **What Is a Decibel? A Simple Guide to Sound Levels \| dBcheck** · same H1 · A clear explanation of what decibels measure, why the dB scale is logarithmic, how dB differs from dBA, and how to interpret common level changes. |
| `/articles/what-is-a-safe-decibel-level/` | Article | 11/16 | Article+BreadcrumbList | **What Is a Safe Decibel Level? \| dBcheck** · same H1 · Why no single decibel level is safe in every situation, how sound level and duration interact, and how NIOSH, OSHA, WHO, and EU guidance differ. |
| `/articles/what-is-noise-dose/` | Article | 6/11 | Article+BreadcrumbList | **What Is Noise Dose? \| dBcheck** · same H1 · What noise dose percentages mean, how sound level and exposure time accumulate, what 100% dose represents, and why NIOSH and OSHA dose values differ. |
| `/articles/what-is-sound-pressure-level/` | Article | 11/8 | Article+BreadcrumbList | **What Is Sound Pressure Level? SPL Explained \| dBcheck** · same H1 · An explanation of sound pressure, SPL, the 20 micropascal reference, distance effects, and smartphone limits. |
| `/articles/why-decibel-meter-apps-show-different-results/` | Article | 4/8 | Article+BreadcrumbList | **Why Do Decibel Meter Apps Show Different Results? \| dBcheck** · same H1 · Why weighting, response time, averaging, calibration, processing, and hardware create different readings. |
| `/articles/why-does-85-db-matter/` | Article | 9/10 | Article+BreadcrumbList | **Why Does 85 dB Matter? \| dBcheck** · same H1 · Why 85 dBA appears in hearing-risk guidance, what NIOSH means by 85 dBA for eight hours, and why it is not universal. |
| `/articles/why-is-the-decibel-scale-logarithmic/` | Article | 4/7 | Article+BreadcrumbList | **Why Is the Decibel Scale Logarithmic? \| dBcheck** · same H1 · Why sound levels use a logarithmic scale, what common changes mean, and why ordinary addition is wrong. |

### Route ledger: English sounds and tools

| Route | Type | In/Out | Schema | Title · H1 · Description |
|---|---|---:|---|---|
| `/sounds/` | Sound index | 13/9 | — | **Common sound levels \| dBcheck** · “Common sounds, placed on a useful scale.” · Explore typical decibel ranges with distance and measurement context. |
| `/sounds/baby-crying/` | Sound guide | 5/11 | Article+BreadcrumbList | **How Loud Is a Baby Crying? \| dBcheck** · same H1 · Typical levels at caregiving distance, close-range variation, and phone-measurement limits. |
| `/sounds/concert/` | Sound guide | 5/14 | Article+BreadcrumbList | **How Loud Is a Concert? \| dBcheck** · same H1 · Typical concert levels, audience position, and separation of LAeq, maximum, peak, and duration. |
| `/sounds/lawn-mower/` | Sound guide | 5/14 | Article+BreadcrumbList | **How Loud Is a Lawn Mower? \| dBcheck** · same H1 · Operator-position levels, variation under load, and hearing-protection context. |
| `/sounds/normal-conversation/` | Sound guide | 5/9 | Article+BreadcrumbList | **How Loud Is a Normal Conversation? \| dBcheck** · same H1 · Distance, vocal effort, and repeatable phone measurement. |
| `/sounds/vacuum-cleaner/` | Sound guide | 6/12 | Article+BreadcrumbList | **How Loud Is a Vacuum Cleaner? \| dBcheck** · same H1 · Model, floor, room, distance, and repeatable comparison. |
| `/tools/` | Tool index | 29/9 | — | **Free sound tools \| dBcheck** · “Useful calculations, without an account.” · Free calculators for exposure, dose, distance, addition, and common sounds. |
| `/tools/add-decibels/` | Calculator | 2/5 | — | **Add decibels calculator \| dBcheck** · “Sound levels add as energy, not ordinary numbers.” · Combine independent sound levels logarithmically. |
| `/tools/daily-noise-exposure-level-calculator/` | Calculator | 2/4 | — | **Daily noise exposure level calculator \| dBcheck** · “Combine work periods into one L_EX,8h value.” · EU-model eight-hour normalization. |
| `/tools/decibel-distance/` | Calculator | 2/4 | — | **Decibel distance calculator \| dBcheck** · “Distance changes level, but the room changes the rule.” · Simplified free-field point-source estimate. |
| `/tools/noise-dose-calculator/` | Calculator | 1/4 | — | **NIOSH noise dose calculator \| dBcheck** · “One day can contain many exposures.” · NIOSH 85 dBA / 8 h / 3 dB multi-period estimate. |
| `/tools/safe-listening-time-calculator/` | Calculator | 10/4 | — | **NIOSH exposure time calculator \| dBcheck** · “Level and time share the same budget.” · Time to a 100% NIOSH occupational daily dose. |

### Route ledger: German indexes and editorial pages

| Route | Type | In/Out | Schema | Title · H1 · Description |
|---|---|---:|---|---|
| `/de/artikel/` | Article index | 27/23 | — | **Artikel und Geräusch-Ratgeber \| dBcheck** · same H1 · Quellenbasierte Ratgeber zu Dezibel, Smartphone-Messungen, Lärmexposition und Alltagsgeräuschen. |
| `/de/artikel/db-und-dba-unterschied/` | Article | 14/7 | Article+BreadcrumbList | **dB und dBA: Was ist der Unterschied? \| dBcheck** · same H1 · A-Bewertung und präzisere Messgrößen. |
| `/de/artikel/dezibel-app-kalibrieren/` | Article | 4/8 | Article+BreadcrumbList | **Dezibel-App kalibrieren: So messen Sie genauer \| dBcheck** · same H1 · Referenzmessung, Korrekturwert und Grenzen. |
| `/de/artikel/dezibel-messen-mit-android-handy/` | Article | 12/8 | Article+BreadcrumbList | **Dezibel messen mit Android: Schritt für Schritt \| dBcheck** · same H1 · Position, Abstand, Dauer, Kalibrierung und Fehlerquellen. |
| `/de/artikel/laermexpositionsgrenzen-deutschland-eu/` | Article | 5/9 | Article+BreadcrumbList | **Lärmexpositionsgrenzen in Deutschland und der EU \| dBcheck** · same H1 · 80/85/87 dB(A), peaks, and resulting duties. |
| `/de/artikel/schallpegelmesser-app-vs-messgeraet/` | Article | 10/7 | Article+BreadcrumbList | **Handy-App vs Schallpegelmessgerät \| dBcheck** · same H1 · Accuracy, calibration, peaks, official use, cost, and applications. |
| `/de/artikel/sind-3-db-doppelt-so-laut/` | Article | 5/7 | Article+BreadcrumbList | **Sind 3 dB doppelt so laut? Energie vs Lautheit \| dBcheck** · same H1 · Energy versus perceived loudness. |
| `/de/artikel/sind-dezibel-apps-genau/` | Article | 13/10 | Article+BreadcrumbList | **Wie genau sind Dezibel-Apps? \| dBcheck** · same H1 · Device variance, calibration, and professional-meter boundary. |
| `/de/artikel/warum-dezibel-apps-unterschiedliche-werte-zeigen/` | Article | 4/9 | Article+BreadcrumbList | **Warum zeigen Dezibel-Apps unterschiedliche Werte? \| dBcheck** · same H1 · Microphone, weighting, averaging, processing, and hardware. |
| `/de/artikel/warum-ist-die-dezibelskala-logarithmisch/` | Article | 3/6 | Article+BreadcrumbList | **Warum ist die Dezibelskala logarithmisch? \| dBcheck** · same H1 · 3/6/10/20 dB relationships and logarithmic addition. |
| `/de/artikel/warum-sind-85-db-wichtig/` | Article | 7/11 | Article+BreadcrumbList | **Warum sind 85 dB wichtig? \| dBcheck** · same H1 · German upper action value and its limits. |
| `/de/artikel/was-ist-ein-dezibel/` | Article | 8/10 | Article+BreadcrumbList | **Was ist ein Dezibel? Schallpegel einfach erklärt \| dBcheck** · same H1 · Logarithmic relationship, dB/dB(A), and common changes. |
| `/de/artikel/was-ist-eine-laermdosis/` | Article | 6/10 | Article+BreadcrumbList | **Was ist eine Lärmdosis? \| dBcheck** · same H1 · Level + duration, 100%, and named model. |
| `/de/artikel/was-ist-schalldruckpegel/` | Article | 10/9 | Article+BreadcrumbList | **Was ist der Schalldruckpegel? SPL erklärt \| dBcheck** · same H1 · Pressure reference, formula, and hardware/context. |
| `/de/artikel/welcher-dezibelwert-ist-sicher/` | Article | 12/10 | Article+BreadcrumbList | **Welcher Dezibelwert ist sicher? \| dBcheck** · same H1 · No universal safe value; level, duration, and reference contexts. |
| `/de/artikel/wie-lange-85-db-hoeren/` | Article | 6/10 | Article+BreadcrumbList | **Wie lange können Sie 85 dB hören? \| dBcheck** · same H1 · WHO leisure time versus German occupational meaning. |
| `/de/alltagsgeraeusche/` | Sound index | 12/9 | — | **Alltagsgeräusche und Dezibelwerte \| dBcheck** · “Alltagsgeräusche auf einer nützlichen Skala.” · Typische Bereiche mit Abstand, Messgröße und Kontext. |
| `/de/alltagsgeraeusche/babygeschrei/` | Sound guide | 3/11 | Article+BreadcrumbList | **Wie laut ist Babygeschrei? \| dBcheck** · same H1 · Caregiving distance, close-range variation, phone limits. |
| `/de/alltagsgeraeusche/konzert/` | Sound guide | 3/13 | Article+BreadcrumbList | **Wie laut ist ein Konzert? \| dBcheck** · same H1 · Typical values, position, LAeq/maximum/peak/duration. |
| `/de/alltagsgeraeusche/normales-gespraech/` | Sound guide | 3/8 | Article+BreadcrumbList | **Wie laut ist ein normales Gespräch? \| dBcheck** · same H1 · Distance, vocal effort, and repeatable measurement. |
| `/de/alltagsgeraeusche/rasenmaeher/` | Sound guide | 3/14 | Article+BreadcrumbList | **Wie laut ist ein Rasenmäher? \| dBcheck** · same H1 · Operator position, variation, and protection. |
| `/de/alltagsgeraeusche/staubsauger/` | Sound guide | 3/11 | Article+BreadcrumbList | **Wie laut ist ein Staubsauger? \| dBcheck** · same H1 · Model, floor, room, distance, and comparison. |

### Route ledger: German tools

| Route | Type | In/Out | Schema | Title · H1 · Description |
|---|---|---:|---|---|
| `/de/werkzeuge/` | Tool index | 27/8 | — | **Kostenlose Schall-Rechner und Werkzeuge \| dBcheck** · “Nützliche Berechnungen ohne Konto.” · Expositionsdauer, Tages-Lärmexposition, Entfernung, Dezibeladdition, and common sounds. |
| `/de/werkzeuge/dezibel-addieren/` | Calculator | 3/4 | — | **Dezibel addieren \| dBcheck** · “Schallpegel werden als Energie addiert, nicht als gewöhnliche Zahlen.” · Independent compatible levels. |
| `/de/werkzeuge/expositionsdauer-rechner/` | Calculator | 2/4 | — | **Expositionsdauer-Rechner \| dBcheck** · “Pegel und Dauer teilen sich dieselbe Schallenergie.” · Time equivalent to the German upper action value. |
| `/de/werkzeuge/laermexpositionsrechner/` | Calculator | 9/4 | — | **Lärmexpositionsrechner \| dBcheck** · “Arbeitsabschnitte zu einem L_EX,8h-Wert zusammenfassen.” · Multi-period EU/German normalization. |
| `/de/werkzeuge/schallpegel-entfernung/` | Calculator | 3/4 | — | **Schallpegel-Entfernungsrechner \| dBcheck** · “Die Entfernung ändert den Pegel – die Umgebung ändert die Regel.” · Simplified free-field point-source estimate. |

### Non-HTML data, sections, redirects, and missing route classes

- `/search.json` and `/de/search.json` are locale-specific published-content/tool/page indexes. They are fetched locally by the search dialog and are intentionally absent from the sitemap.
- Pricing, features, hero, and launch are homepage sections (`/#pricing`, `/#features`, `/#hero`, `/#get`), not separate routes.
- Contact is currently only `mailto:contact@finnvek.com`; publisher identity links externally to `https://finnvek.com`.
- No privacy, legal/provider-information, terms, dedicated contact, or authored 404 route exists.
- Eight legacy routes return a single 301 to the intended 200 destination and are absent from the sitemap:

| Legacy route | Destination |
|---|---|
| `/sounds/normal-conversation-decibels/` | `/sounds/normal-conversation/` |
| `/sounds/vacuum-cleaner-decibels/` | `/sounds/vacuum-cleaner/` |
| `/sounds/lawn-mower-decibels/` | `/sounds/lawn-mower/` |
| `/sounds/concert-decibels/` | `/sounds/concert/` |
| `/sounds/whisper-decibels/` | `/sounds/` |
| `/sounds/busy-traffic-decibels/` | `/sounds/` |
| `/sounds/siren-decibels/` | `/sounds/` |
| `/sounds/fireworks-decibels/` | `/sounds/` |

## 5. Current strengths and KEEP AS IS decisions

1. **KEEP the URL and locale architecture.** English unprefixed routes and localized German segments are consistently implemented. Do not rename established slugs.
2. **KEEP canonicals, hreflang, and x-default.** All registered pairs are reciprocal and self-canonical. Do not redesign this strategy.
3. **KEEP the finite corpus.** The 15 English articles, 5 English sound guides, and faithful German counterparts cover distinct, intentional questions. Do not add articles, merge the clusters, mass delete, mass noindex, or pad word counts.
4. **KEEP publication/review dates as factual records.** All 40 pages were published on 2026-07-12 and reviewed on recorded dates from 2026-07-11 to 2026-07-15. Do not manufacture freshness.
5. **KEEP the answer-first editorial approach.** English introductions state the practical answer early and maintain distinctions between measurement, estimation, risk interpretation, and legal compliance.
6. **KEEP standard Sources/Quellen sections.** Corpus analysis found no exact repeated paragraph of 120+ normalized characters and no repeated article heading other than the legitimate shared Sources/Quellen heading.
7. **KEEP typical sound ranges as contextual ranges.** The shared explorer and guides disclose distance/environment/source/measurement variability; the range rail follows shared data.
8. **KEEP the current calculator models and caveats.** NIOSH, EU/German, distance, dose, and logarithmic-addition implementations produced the expected independent values and state their simplifying assumptions.
9. **KEEP Article + BreadcrumbList schema on editorial pages and WebSite schema on home.** Generic tool/page schema is not needed merely to increase schema volume.
10. **KEEP the internal-link architecture.** All 56 pages are reachable, no internal target or fragment is broken, and no indexable page is orphaned. Only the noise-dose calculator has a specific improvement below.
11. **KEEP drafts excluded and redirects narrow.** The eight legacy routes have correct single-hop permanent redirects.
12. **KEEP the hero's data-honesty behavior.** Standby shows no fabricated readings, the loop runs only while state changes, and the meter copy identifies the film as the demo source.
13. **KEEP reduced-motion and reduced-data behavior.** Reduced motion removes reveal transitions, hides the decorative exposure rail, and does not load the hero video automatically; `saveData` also blocks automatic video loading.
14. **KEEP search local.** Search queries filter static JSON in the browser and are not sent to a search service.
15. **KEEP the current security headers.** CSP, HSTS, frame denial, nosniff, permissions policy, and referrer policy are present. Adjust the CSP only as part of an intentional analytics/font change.
16. **KEEP disclaimers that already work.** Phone hardware/calibration limits, non-certified measurement, non-clinical hearing tracking, Health Connect opt-in, distance-model limitations, and occupational-model qualifications are generally careful and useful.

## 6. P0 findings

### P0-1 — GA4 runs before choice and there is no privacy/controller disclosure

- **Severity:** P0
- **Confidence:** high on observed behavior; medium on the owner's final jurisdiction-specific remedy
- **Exact evidence:** `src/layouts/Base.astro:38,71-79` loads Google Fonts, `gtag.js`, initializes `dataLayer`, and calls `gtag('config', ...)` on every page. A clean live Chromium visit set `_ga` and `_ga_9J90097M6J` immediately, loaded Google Tag Manager, and sent a GA page-view request. There is no privacy/legal route in `src/pages`. Google documents `_ga` as a user distinguisher and `_ga_<container-id>` as session-state storage with a default two-year expiry ([Google Analytics cookie documentation](https://support.google.com/analytics/answer/11397207?hl=en)). German TDDDG §25 requires informed consent for terminal storage/access unless a narrow necessity exception applies ([official text](https://www.gesetze-im-internet.de/ttdsg/__25.html)); GDPR Article 13 requires controller, purpose, legal basis, and related information when personal data are collected ([official text](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679)). The German commercial publication also warrants owner review against DDG §5 provider-information duties ([official text](https://www.gesetze-im-internet.de/ddg/BJNR0950B0024.html)).
- **Why it matters:** Visitors are tracked before receiving any site disclosure or choice; the site cannot explain controller identity, purposes, processors, retention, rights, or withdrawal. This is a live privacy/legal and trust risk.
- **Minimal recommended change:** Either remove GA4, or block every analytics script/config/request until an informed opt-in has been recorded. Publish owner-supplied privacy/controller information and the applicable provider/legal information in both publication languages. Disclose Google Fonts or self-host the existing font files to remove that third-party request. Do not invent owner/address/legal-basis facts.
- **Files likely affected:** `src/layouts/Base.astro`, `src/i18n/ui.ts`, `public/_headers`, new factual privacy/legal route files, and possibly local font assets/styles.
- **Risk of change:** medium; a flawed consent state can still leak requests, block analytics incorrectly, or create inaccessible controls. Legal wording requires owner review.
- **Acceptance criteria:** a clean browser profile sends no request to Google Tag Manager/Analytics and sets no `_ga*` cookie before affirmative opt-in; refusal is as easy as acceptance; withdrawal works; disclosures identify the real controller/provider and processing facts; English/German links are reachable from every page; CSP matches the chosen implementation.
- **Scope:** complete site, all locales

### P0-2 — “Without recording audio” misstates the app's live audio path

- **Severity:** P0
- **Confidence:** high
- **Exact evidence:** Homepage `src/pages/index.astro:41` says: “On-device YAMNet classification names what the meter hears ... **without recording audio**.” Current app code `AudioEngine.kt:267-301` reads PCM16 chunks through Android `AudioRecord` and passes them to `SoundDetectionWindowFanout`; `SoundDetectionEventEntity.kt:27-32` persists only session ID, timestamp, label, and confidence. Optional WAV writing is a separate Pro + opt-in path (`AudioEngine.kt:349-354`; current app `PROJECT.md:1995-2004`) and defaults off (`PROJECT.md:1023-1024`).
- **Why it matters:** In common Android/API language, `AudioRecord` is recording/capturing microphone audio even when samples are memory-only. The current sentence can lead privacy-sensitive users to believe no microphone audio is captured.
- **Minimal recommended change:** Replace only that sentence with a narrower factual claim, for example: “On-device YAMNet classification analyzes live microphone audio; classifier input is not saved, and optional WAV recording is a separate opt-in feature.” Keep the existing “raw audio is not uploaded” qualification.
- **Files likely affected:** `src/pages/index.astro`
- **Risk of change:** low; risk is limited to accidentally implying that no optional WAV path exists or that no audio ever leaves memory.
- **Acceptance criteria:** copy distinguishes capture, classifier persistence, optional WAV persistence, and upload; it matches current app code and `PROJECT.md`; no absolute “does not record audio” wording remains.
- **Scope:** homepage, English product copy

### P0-3 — “Real dosimeter” and “85 dB peak alerts” are materially inaccurate

- **Severity:** P0
- **Confidence:** high
- **Exact evidence:** `src/pages/index.astro:248-250` says: “A **real dosimeter** ... plus threshold and **85 dB peak alerts**.” Current app `NoiseAlertPolicy.kt:3-8` defines `PEAK_WARNING_DB = 120f`, while the configurable notification threshold defaults to 85 dB (`PROJECT.md:1011`). The app's dosimeter is a calculation over phone measurements under selectable NIOSH/OSHA policies (`PROJECT.md:627-628`), and current app limitations state uncalibrated results are not measurement-grade SPL (`PROJECT.md:1969-1976`). NIOSH's 85 dBA criterion is an 8-hour occupational average with a 3 dB exchange rate, not an 85 dB peak threshold ([CDC/NIOSH](https://www.cdc.gov/niosh/blogs/2016/noise.html)).
- **Why it matters:** The wording conflates an exposure boundary with an app peak-warning threshold and gives a phone-based estimator hardware/instrument authority it does not have. This can distort safety interpretation.
- **Minimal recommended change:** Use “dosimeter calculations” or “estimated dose under NIOSH REL / OSHA PEL models”; name threshold alerts separately; state the actual 120 dB peak-warning value only if product wants to market it and the metric/weighting is accurately named. Do not call the app a certified/personal dosimeter.
- **Files likely affected:** `src/pages/index.astro`
- **Risk of change:** low to medium; mixing LAeq/dBA/LCpeak again would preserve the defect. Review against the exact app UI labels.
- **Acceptance criteria:** no “real dosimeter”; no “85 dB peak alert”; the threshold, peak, dose, and projected-dose concepts are distinct; phone/calibration limitations remain nearby.
- **Scope:** homepage, English product copy

### P0-4 — “Hearing health status/companion” overstates an exposure summary

- **Severity:** P0
- **Confidence:** high
- **Exact evidence:** `src/pages/index.astro:24,106` and `src/i18n/ui.ts:6` use “hearing health status” and “hearing health companion.” Current `HearingHealthSummaryCalculator.kt:18-45` computes an energy-average weekly dB value from session samples and labels it SAFE/WARNING/DANGER against generic 70/85 dB bands. It does not measure hearing ability. The actual hearing-test thresholds are relative app tone-output/dBFS values, not calibrated dB HL, and are limited to personal tracking rather than diagnosis (`PROJECT.md:1969-1976`).
- **Why it matters:** A weekly sound-exposure aggregation can be useful, but naming it a person's hearing-health status suggests a medical/physiological conclusion that the implementation does not make.
- **Minimal recommended change:** Rename website references to “weekly noise-exposure summary/status” and “sound awareness and personal hearing-result tracking.” Preserve the already good non-clinical disclaimer.
- **Files likely affected:** `src/pages/index.astro`, `src/i18n/ui.ts`
- **Risk of change:** low; do not weaken the legitimate relative hearing-test description or imply that exposure and hearing-test results are one metric.
- **Acceptance criteria:** no website copy describes the weekly dB aggregate as hearing health; footer/product descriptors remain truthful; hearing-test copy continues to say personal baseline, non-clinical, non-diagnostic.
- **Scope:** homepage/footer, primarily English; shared footer template

### P0-5 — The launch bundle presents a v1.5 tinnitus feature as available at launch

- **Severity:** P0
- **Confidence:** high
- **Exact evidence:** `src/pages/index.astro:96-97,123` places “Tinnitus profile & ambient sounds” in the Pro feature presentation and `src/pages/index.astro:189` labels the Pro bundle “Unlocks in-app at launch.” Current app `PROJECT.md:1381-1390` says the tinnitus feature does **not** belong to v1.0 and is implemented as a constrained v1.5 feature. Ambient sound playback is separately in current v1 code.
- **Why it matters:** An implemented code path is not automatically a launch feature. Bundling tinnitus with ambient sounds makes the launch offer materially broader than the current release scope.
- **Minimal recommended change:** Remove tinnitus from the launch/price bundle until its intended release, or explicitly label it post-launch without promising a date. Keep ambient sounds if the launch scope still includes them.
- **Files likely affected:** `src/pages/index.astro`
- **Risk of change:** low; avoid accidentally removing the supported ambient-playback claim.
- **Acceptance criteria:** every “at launch”/Pro list matches the current v1.0 scope; tinnitus is not implied to ship at v1.0; app owner confirms release allocation.
- **Scope:** homepage, English product copy

## 7. P1 findings

### P1-1 — The shared tertiary text token fails small-text contrast

- **Severity:** P1
- **Confidence:** high
- **Exact evidence:** `src/layouts/Base.astro:344-358` defines `--tertiary: #5E5E5E`. Its measured contrast is 3.09:1 on `#080808`, 2.93:1 on `#101010`, 2.76:1 on `#171717`, and 2.51:1 on `#202020`. The token is used for meaningful 10–12 px metadata, source/context notes, footer labels, copyright, links, disclaimers, range labels, and article eyebrow text. Lighthouse independently failed five homepage footer nodes at 3.08:1. WCAG 2.2 SC 1.4.3 requires 4.5:1 for normal-size text ([W3C](https://www.w3.org/TR/WCAG22/#contrast-minimum)).
- **Why it matters:** Meaningful labels and safety/disclaimer text are difficult to read for low-vision users and fail the expected AA contrast threshold.
- **Minimal recommended change:** Adjust the shared semantic text token (or split decorative and meaningful tertiary roles) so all meaningful small text reaches at least 4.5:1 against every actual surface. Do not indiscriminately brighten decorative graphics that carry no information.
- **Files likely affected:** `src/layouts/Base.astro`; possibly component-local token usage if roles are split
- **Risk of change:** medium; one global token changes the visual hierarchy. Verify all four dark surfaces and disabled-control exceptions.
- **Acceptance criteria:** automated and manual checks show at least 4.5:1 for meaningful normal text; footer, metadata, disclaimers, range labels, and source labels remain visually subordinate but readable.
- **Scope:** complete site, all locales

### P1-2 — The search field suppresses the visible shared keyboard outline

- **Severity:** P1
- **Confidence:** high
- **Exact evidence:** `src/layouts/Base.astro:383` provides a 2 px high-contrast `:focus-visible` outline, but the more specific `#search-input { outline: none; }` at line 561 overrides it. Focus changes only to `rgba(247,247,247,.3)` at line 563, approximately 2.59:1 against `#101010`, below the 3:1 non-text/state contrast threshold. The dialog otherwise traps/returns focus correctly and closes with Escape when the native search field is empty. WCAG guidance requires meaningful UI state indicators to reach 3:1 ([W3C SC 1.4.11](https://www.w3.org/WAI/WCAG22/understanding/non-text-contrast.html)).
- **Why it matters:** Keyboard users can lose the most important focus indicator inside the site's search dialog.
- **Minimal recommended change:** Remove the `outline: none` override or replace it with a clearly visible 2 px `:focus-visible` indicator that meets contrast requirements.
- **Files likely affected:** `src/layouts/Base.astro`
- **Risk of change:** low; verify the outline is not clipped by the dialog/input container.
- **Acceptance criteria:** tabbing/opening search shows an unmistakable focus indicator at 3:1+; mouse focus does not cause an unwanted persistent ring if `:focus-visible` is used; close restores focus to Search/Suchen.
- **Scope:** shared search, all locales

### P1-3 — Fourteen German inline formulas render as raw source notation

- **Severity:** P1
- **Confidence:** high
- **Exact evidence:** 14 occurrences of `\(...\)` appear in `src/content/articles/de/db-und-dba-unterschied.md`, `was-ist-ein-dezibel.md`, and `was-ist-schalldruckpegel.md`. The configured `remark-math` path expects dollar-delimited inline math. Live/local rendered HTML shows strings such as `(L_{Aeq})` with literal underscores/braces and zero `.katex` nodes on the affected page. English equivalents render math correctly.
- **Why it matters:** Core acoustic symbols become visibly broken in the German publication, reducing comprehension and technical credibility.
- **Minimal recommended change:** Convert only the 14 affected inline expressions to the repository's working inline-math syntax; do not rewrite surrounding prose.
- **Files likely affected:** the three German Markdown files named above
- **Risk of change:** low; escaping errors could alter subscripts or punctuation.
- **Acceptance criteria:** all 14 expressions render as KaTeX, plain text contains no raw `_`, `{`, or `}` notation, and equations remain semantically identical to the English/current German wording.
- **Scope:** three German articles

### P1-4 — Long German headings create page-level horizontal scrolling at 360 px

- **Severity:** P1
- **Confidence:** high
- **Exact evidence:** Browser measurement at 360 px found 43 px document overflow on `/de/alltagsgeraeusche/` and 63 px on `/de/werkzeuge/laermexpositionsrechner/`; the same representative suite had no overflow at 768/1440. Computed layout showed `.page-head` constrained to 320 px while intrinsic child widths expanded to 383/403 px because “Geräuschbibliothek” and “Tages-Lärmexpositionspegel” could not wrap. Relevant CSS is `src/components/SoundIndexPage.astro:33` and `src/components/CalculatorPage.astro:40-43`.
- **Why it matters:** Users can accidentally pan the whole page, headings/text clip off-screen, and the defect is amplified under zoom.
- **Minimal recommended change:** Allow grid children/heading copy to shrink (`min-width: 0`) and apply a language-safe wrap rule to long German compounds where needed. Preserve the intentionally horizontally scrollable sound overview image.
- **Files likely affected:** `src/components/SoundIndexPage.astro`, `src/components/CalculatorPage.astro`
- **Risk of change:** low to medium; an overly broad `overflow-wrap:anywhere` can create unattractive breaks. Limit it to the page-head context.
- **Acceptance criteria:** no document-level horizontal overflow at 320/360/390 px or 200% zoom proxy; the sound overview's own scroll container remains scrollable; English layout is unchanged.
- **Scope:** two German routes, two shared templates

### P1-5 — Unknown live URLs return an empty 404 body

- **Severity:** P1
- **Confidence:** high
- **Exact evidence:** `https://dbcheck.app/not-a-real-page-audit-20260821/` returns HTTP 404 with `content-length: 0` and no content type/body. There is no `src/pages/404.astro`. Astro's local preview supplies a generic development 404, which is not what production users receive.
- **Why it matters:** A valid 404 status is good search hygiene, but an empty page gives users no explanation, navigation, search, language context, or recovery route and provides no accessible document.
- **Minimal recommended change:** Add one small branded static 404 page with a true 404 response, Home, Articles, Sounds, Tools, and Search recovery actions. Do not redirect unknown URLs to home and do not return 200.
- **Files likely affected:** new `src/pages/404.astro` and only the minimum shared UI copy needed
- **Risk of change:** low; Cloudflare static-asset fallback behavior must be tested after build/deploy preview.
- **Acceptance criteria:** a random unknown URL returns 404 plus useful HTML, title, H1, `lang`, skip/main landmarks, and crawlable recovery links; it is not in the sitemap and is not a soft 404.
- **Scope:** complete site error behavior

### P1-6 — Mobile hero LCP is poor in the lab and the video becomes the LCP element

- **Severity:** P1
- **Confidence:** medium-high
- **Exact evidence:** One Lighthouse mobile run on the production build scored performance 78 with LCP 4.5 s, total transfer 715 KiB, and identified `video#hero-video` as the LCP element. The LCP insight reported no high fetch priority and about 1.38 s element render delay. The mobile MP4 is 415,430 bytes; desktop is 993,738 bytes; the poster is only 13,338 bytes. Google Tag Manager transferred about 170 KiB and Google Fonts about 72 KiB in the same run. `src/pages/index.astro:145-157,1214-1263` has `preload="none"` but assigns/plays the video immediately on ordinary connections.
- **Why it matters:** The visual feature is worthwhile, but on simulated mobile the browser waits on/repaints the video as the largest element instead of completing a fast poster-based LCP. Third-party code adds avoidable network competition.
- **Minimal recommended change:** Preserve the film, but make the lightweight poster the stable high-priority LCP candidate and defer assigning/playing the MP4 until after the poster/first paint or a proportionate idle/user signal. Batch 1's analytics gating/removal should eliminate the 170 KiB third-party script from pre-consent load. Do not autoplay for reduced-motion/save-data users.
- **Files likely affected:** `src/pages/index.astro`, and `src/layouts/Base.astro` through P0-1
- **Risk of change:** medium; careless deferral can create a poster-to-video flash or break Listen/Mute/Web Audio initialization.
- **Acceptance criteria:** preserve the hero and controls; run at least three comparable mobile Lighthouse passes and use the median; target LCP ≤2.5 s on the local lab profile or document why not; no CLS regression; Listen/Mute, autoplay policy, reduced motion, and save-data behavior pass.
- **Scope:** homepage, all visitors

## 8. P2 findings

### P2-1 — The noise-dose article still calls the live calculator “planned” and does not link to it

- **Severity:** P2
- **Confidence:** high
- **Exact evidence:** `src/content/articles/en/what-is-noise-dose.md:225` says “The planned Noise Dose Calculator can combine...” while `/tools/noise-dose-calculator/` is live, indexable, tested, and listed in `src/data/tools.ts`. Link-graph analysis shows the calculator has only one unique indexable inbound route, the tools index; every other route has at least two.
- **Why it matters:** The stale sentence undermines product/content coherence and omits the most useful next step for a reader who has just learned the model.
- **Minimal recommended change:** Replace “planned” with a direct, descriptive link to the existing calculator. Do not add a generic CTA block or extra links elsewhere.
- **Files likely affected:** `src/content/articles/en/what-is-noise-dose.md`
- **Risk of change:** low.
- **Acceptance criteria:** the sentence describes the calculator as current, links to the canonical route, and retains the named-model/safety qualification.
- **Scope:** one English article and one calculator's discoverability

### P2-2 — “Final tuning before release” understates the remaining release gates

- **Severity:** P2
- **Confidence:** high
- **Exact evidence:** `src/pages/index.astro:471` says the app is “in final tuning before release.” Current app `PROJECT.md:23-30,2020-2041` records open device audio/permission/FGS, Billing, Play Console, signing, accessibility, acoustic/clinical documentation, TalkBack, test-purchase, and signed-AAB gates.
- **Why it matters:** “Final tuning” implies a narrower finishing phase than the authoritative release-readiness evidence supports.
- **Minimal recommended change:** Use neutral availability language such as “dBcheck for Android is being prepared for release” while retaining “coming soon” only if the owner still stands behind it. Do not invent a date.
- **Files likely affected:** `src/pages/index.astro`
- **Risk of change:** low.
- **Acceptance criteria:** wording distinguishes implemented features from release readiness and makes no unsupported timing promise.
- **Scope:** homepage

### P2-3 — KaTeX CSS is shipped to 32 editorial pages that render no math

- **Severity:** P2
- **Confidence:** high
- **Exact evidence:** `src/components/EditorialPage.astro:4` imports `katex/dist/katex.min.css` for every editorial route. The generated editorial stylesheet is 34,022 bytes. Of 40 indexable editorial pages, 8 contain rendered KaTeX and 32 do not.
- **Why it matters:** Most articles pay a stylesheet parse/download cost for a feature they do not use. The issue is bounded and not a reason to remove math.
- **Minimal recommended change:** Load the KaTeX stylesheet only for content that actually renders math, using a frontmatter/build-derived flag or the simplest existing Astro-compatible conditional. Avoid runtime detection.
- **Files likely affected:** `src/components/EditorialPage.astro`, possibly `src/content.config.ts` and only math-bearing frontmatter if no build-derived signal exists
- **Risk of change:** medium; missing one math page would produce unstyled equations.
- **Acceptance criteria:** all eight math pages retain correct KaTeX styling; a representative non-math article no longer requests/includes KaTeX CSS; build and all 40 route checks pass.
- **Scope:** editorial template, all locales

### P2-4 — Sound indexes expose an H1→H3 heading jump on mobile

- **Severity:** P2
- **Confidence:** high
- **Exact evidence:** At 360 px `/sounds/` has visible heading order H1 “Common sounds...” → H3 “Whisper” → H2 “5 complete guides...” because the desktop library H2 is hidden while `SoundExplorer.astro` retains an H3. The German sound index has the same template behavior.
- **Why it matters:** Screen-reader heading navigation receives an avoidable hierarchy jump at the start of the main interactive content.
- **Minimal recommended change:** Let `SoundExplorer` receive the appropriate detail-heading level for its context, or supply a real H2 before it on index pages. Preserve H3 when the explorer sits under the homepage's H2.
- **Files likely affected:** `src/components/SoundExplorer.astro`, `src/components/SoundIndexPage.astro`, `src/pages/index.astro` only if a heading-level prop is required there
- **Risk of change:** low to medium; changing the shared heading unconditionally would break the homepage hierarchy.
- **Acceptance criteria:** no heading-level jump on either sound index at mobile/desktop; homepage remains H2→H3; visual styling is unchanged.
- **Scope:** one shared component in two contexts, all locales

### P2-5 — The website contains a stale duplicate of the app truth document

- **Severity:** P2
- **Confidence:** high
- **Exact evidence:** Website root `PROJECT.md` says it was updated from a 2026-06-30 checkout and has SHA-256 `60ABE...02FE`; the current Android app `PROJECT.md` was updated 2026-08-07 and has SHA-256 `52DA...3AD5`. The newer document includes release-scope changes such as the v1.5 tinnitus gate and expanded release-readiness evidence. The website copy did not prevent the stale launch claim.
- **Why it matters:** Two large documents both present themselves as current app truth, making future product-copy review prone to drift.
- **Minimal recommended change:** After product-copy fixes, replace the duplicated website snapshot with a concise, dated pointer/process for consulting the current app checkout, or establish an explicit sync check. Do not copy historical plans into product truth.
- **Files likely affected:** website `PROJECT.md` and, if chosen, a small existing validation/documentation mechanism
- **Risk of change:** low to medium; a pointer is only useful if the app checkout path/process is available to maintainers.
- **Acceptance criteria:** the website has one unambiguous product-truth rule, last-verified app revision/date is explicit, and future claim review cannot silently rely on the June snapshot.
- **Scope:** repository maintainability

### P2-6 — Homepage line-break markup concatenates accessible heading text

- **Severity:** P2
- **Confidence:** high
- **Exact evidence:** `src/pages/index.astro:164,217,470-471` uses `<br/>` without a separating text space. Chromium's accessibility snapshot exposes “Understand the soundaround you.” and similarly concatenates words in the other headings/copy.
- **Why it matters:** Visual line breaks look correct, but screen readers and text extraction can pronounce/record joined words.
- **Minimal recommended change:** Add semantic whitespace around the decorative line breaks or use a CSS block span while preserving a correct text node/accessibility name.
- **Files likely affected:** `src/pages/index.astro`
- **Risk of change:** low; verify the visual wrapping remains unchanged.
- **Acceptance criteria:** accessibility snapshot and copied plain text contain “sound around,” “ears can’t,” and “ears already” with correct spaces; layout is visually identical.
- **Scope:** homepage

## 9. P3 optional refinements

### P3-1 — Primary navigation has no current-page indication

- **Severity:** P3
- **Confidence:** high
- **Exact evidence:** No primary navigation link in `Base.astro`/shared navigation receives `aria-current="page"` or a current-page visual state. Breadcrumbs and the language menu do use `aria-current` correctly.
- **Why it matters:** A small orientation cue would help keyboard/screen-reader users, but existing breadcrumbs and headings already make pages understandable.
- **Minimal recommended change:** Add route-aware `aria-current="page"` and a restrained existing-token visual state to the relevant primary nav link only.
- **Files likely affected:** `src/layouts/Base.astro` or its existing shared navigation data
- **Risk of change:** low; section anchors and homepage routes need exact matching to avoid false current states.
- **Acceptance criteria:** exactly one relevant primary nav item is current on index/detail pages where applicable; no item is falsely current for unrelated routes; mobile/desktop states match.
- **Scope:** shared navigation, all locales

## 10. Product claim matrix

| Claim area and current wording | Website evidence | Current app evidence | Status | Minimal action | Confidence |
|---|---|---|---|---|---|
| Android availability: “Coming soon to Google Play” | `index.astro:172,471-473` | App implemented but release gates open (`PROJECT.md:23-30,2020-2041`) | Implemented, not release-ready | Keep “coming soon” only if owner supports it; fix “final tuning” | High |
| Regional Pro prices and “charged in local currency on Google Play” | `prices.ts`; `index.astro:338` | Billing product ID `dbcheck_pro`; Play test purchase/open product setup remains | Accurate display intent, not Play-price verification | Keep fallback/qualification; verify in Play Console before launch | High |
| One-time purchase, no subscription | `index.astro` Pro card | Non-consumable Pro entitlement/product ID in current app | Accurate in code; store setup not release-verified | KEEP, recheck final Play product | High |
| Live dB meter, waveform, LAeq, LCpeak, session stats | homepage Free/features | `AudioEngine`, meter UI, current `PROJECT.md:607-614` | Accurate but phone-dependent | KEEP with current measurement disclaimer | High |
| Threshold/peak/dose alerts | `index.astro:20,248-250` | `NoiseAlertEvaluator`; peak 120 dB; threshold default 85; dose 100% | One phrase inaccurate | P0-3 | High |
| Passive monitoring: user-started five-minute samples | homepage | `PROJECT.md:615`, aggregate-only storage | Accurate | KEEP | High |
| Weekly exposure chart and “hearing health status” | `index.astro:24,106,207` | Weekly energy-average plus SAFE/WARNING/DANGER labels | Function exists; label overstates meaning | P0-4 | High |
| Seven-day Free history / unlimited Pro history | pricing list | `PROJECT.md:619-620` | Accurate | KEEP | High |
| Optional Health Connect session sync | homepage | ExerciseSessionRecord/HeartRateRecord path; explicit opt-in | Accurate but non-native noise record and optional | KEEP current qualification | High |
| PNG Free; PDF/CSV/WAV Pro | pricing/features | `PROJECT.md:631-639` | Accurate; WAV is opt-in and app-private | KEEP; fix audio wording | High |
| Dosimeter with NIOSH REL / OSHA PEL | Pro list/feature detail | `DosimeterCalculator`, selectable policy | Accurate as calculation, not as “real” instrument | P0-3 | High |
| Frequency weighting A/B/C/Z/ITU-R 468 | Pro list | `PROJECT.md:627` | Implemented; release validation separate | KEEP as implemented feature, not certified accuracy | High |
| Microphone calibration and octave offsets | Pro list | `PROJECT.md:626` | Implemented; calibration limits remain | KEEP | High |
| Live spectrum and octave RTA | Pro list | raw PCM live analysis; no persistence | Accurate | KEEP | High |
| On-device YAMNet and no raw upload | feature detail/privacy note | Live PCM inference; label/confidence optional persistence; no classifier raw persistence | “On-device/no upload” accurate; “without recording” inaccurate | P0-2 | High |
| Sleep Monitor shows notable event timing/intensity | feature detail | Sleep session and event/result paths | Accurate with existing causation limit | KEEP | High |
| Hearing test + recovery, Hughson-Westlake style, own baseline | feature detail | 10 dB down / 5 dB up procedure; relative dBFS; recovery against baseline | Accurate but non-clinical | KEEP narrow wording; P0-4 for broader “health status” | High |
| Tinnitus profile + ambient sounds at launch | Pro list/detail | Ambient in current v1; tinnitus explicitly v1.5 | Implemented code, wrong launch scope | P0-5 | High |
| Lock-screen meter and home widget | feature list | Current Pro implementations | Accurate in code, release validation separate | KEEP | High |
| No account required; local/on-device analysis | homepage privacy note | No account path; local app data; optional Health Connect/share/export | Accurate with stated opt-ins | KEEP | High |
| Raw audio is not uploaded for analysis | homepage privacy note | No cloud analysis; optional local WAV/share exists | Accurate as written | KEEP; keep separate from persistence claim | High |
| “Final tuning” launch state | homepage CTA | Multiple open release sign-offs | Overconfident | P2-2 | High |

## 11. Scientific and source-verification findings

### High-risk fact matrix

| Topic | Current implementation/content result | Authoritative check | Decision |
|---|---|---|---|
| NIOSH criterion and exchange rate | 85 dBA, 8 h, 3 dB; 100 dBA → 15 min | CDC/NIOSH states 85 dBA over 8 h and halves time for each 3 dB; its table gives 100 dBA → 15 min ([source](https://www.cdc.gov/niosh/blogs/2016/noise.html)) | Correct; KEEP caveat that this is occupational guidance, not an individual guarantee |
| OSHA comparison | Articles distinguish 90 dBA PEL/5 dB exchange from 85 dBA action level | Official OSHA/NIOSH material supports the distinction; the site does not present OSHA as German law | Correct; KEEP |
| EU occupational action values | German/EU content uses lower 80 dB(A), upper 85 dB(A), EU limit 87 dB(A); peaks 135/137/140 dB(C) in the correct roles | Directive 2003/10/EC gives 80/85/87 dB(A) and 112/140/200 Pa peaks ([EUR-Lex](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32003L0010)); German legal pages are linked directly in the articles/tools | Correct with current national/EU distinctions; KEEP |
| `L_EX,8h` formula | `L_Aeq,T + 10 log10(T/8h)` and energetic summation across periods | Matches EU/German model used by the cited directive/authorities | Correct; KEEP |
| WHO leisure reference | German/English content uses 85 dB → 12 h 30 min per week and distinguishes it from occupational rules | Current WHO Q&A gives that weekly value ([WHO](https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening)) | Correct; KEEP the context distinction |
| SPL reference | 20 µPa in air, RMS pressure ratio, logarithmic expression | Consistent with cited BIPM/NIST material | Correct; KEEP |
| Logarithmic addition | Independent compatible 80 + 80 dB → 83.0 dB; coherent/phase-dependent exception stated | Formula and caveat are technically appropriate | Correct; KEEP |
| Distance law | `L2 = L1 - 20 log10(r2/r1)` for ideal free-field point source | Formula is correct for the declared simplification; page names reflection, barriers, ground, source size, and directivity limits | Correct; KEEP |
| Average/max/peak | Editorial pages generally distinguish LAeq, maximum, and peak | Homepage's “85 dB peak alerts” conflicts with current app code | P0-3 only; do not rewrite the correct editorial explanations |
| Phone accuracy/calibration | Repeatedly says microphone, processing, model, range, and calibration matter; no claim of Class 1/2 status | Consistent with the primary studies and official guidance cited in the corpus | Correctly qualified; KEEP ranges rather than substituting a different defensible range |
| Hearing testing | Relative personal baseline, not diagnosis/dB HL | Current app limitations agree | KEEP narrow test copy; remove broader “hearing health status” label under P0-4 |
| Typical sounds | Every guide names a range and measurement context rather than a fixed universal value | Sources include government tables and original studies; distance/method variability is explicit | No disputed range requiring correction was proven |

### Citation implementation and link results

- All 40 editorial files have complete reference-definition integrity: no missing reference target and no unused numeric source definition.
- Sources are placed in the relevant paragraph/section and then listed in a standard Sources/Quellen section. The lists are functional, not decorative.
- The 76 unique outbound source URLs produced: 65 HTTP 200, 3 HTTP 202, 5 HTTP 203, and 3 automated 403 responses.
- The three 403 URLs are the official ISO 532-1/532-2 abstract pages and the Acta Acustica 2026 full-text page. Their domains and citation descriptions are appropriate; automated blocking is not evidence that the links are broken.
- No avoidable redirect loop or dead DOI was found.
- The safety/regulatory pages primarily use CDC/NIOSH, OSHA, WHO, EUR-Lex, BAuA, German official law, NIST/BIPM, standards pages, and peer-reviewed studies. No working primary source should be replaced merely for variety.
- No localized page was found presenting NIOSH or OSHA as German law. The German pages explicitly distinguish US occupational recommendations from German/EU action values.
- The only factual/content-to-tool drift proven in the editorial corpus is P2-1 (“planned” Noise Dose Calculator).

## 12. Content usefulness and corpus-variance findings

### English editorial intent and distinct value

| Page | Precise reader intent and unique value | Answer/qualification result | Decision |
|---|---|---|---|
| `/articles/what-is-a-decibel/` | Understand what a decibel represents and how to interpret changes | Defines the ratio immediately; distinguishes dB/dBA and reference quantity | KEEP |
| `/articles/why-is-the-decibel-scale-logarithmic/` | Understand why the scale is logarithmic | Uses physical ratios and practical 3/6/10/20 dB examples | KEEP |
| `/articles/what-is-sound-pressure-level/` | Understand SPL, RMS pressure, and 20 µPa | Formula and variables appear early; phone limits are separate | KEEP |
| `/articles/db-vs-dba/` | Choose/interpret dB versus dB(A) and named metrics | Direct distinction, weighting explanation, and cases needing other metrics | KEEP |
| `/articles/is-3-db-twice-as-loud/` | Separate energy doubling from perceived loudness | Answers “no” early; handles coherent-signal exception | KEEP |
| `/articles/why-does-85-db-matter/` | Understand why 85 dBA recurs in guidance | Separates criterion/action value from a universal danger line | KEEP |
| `/articles/how-long-can-you-listen-at-85-db/` | Calculate NIOSH reference duration and compare other contexts | Gives model/formula early and warns against personal-safety interpretation | KEEP |
| `/articles/what-is-a-safe-decibel-level/` | Decide whether one number can be called safe | Opens with “no universal safe value” and maps context-specific references | KEEP |
| `/articles/what-is-noise-dose/` | Understand percent dose and named standards | Explains accumulation and 100% correctly; end link is stale (P2-1) | Keep article; fix one sentence/link |
| `/articles/niosh-vs-osha-noise-exposure-limits/` | Compare two US occupational models and legal status | Clear criterion/exchange/dose/TWA comparison | KEEP |
| `/articles/are-decibel-meter-apps-accurate/` | Assess likely smartphone accuracy | Uses study-specific results without universalizing them | KEEP |
| `/articles/why-decibel-meter-apps-show-different-results/` | Diagnose disagreement between two apps | Focuses on weighting, averaging, calibration, processing, and hardware | KEEP; distinct from general accuracy page |
| `/articles/how-to-measure-decibels-with-android-phone/` | Perform a repeatable phone measurement | Actionable position/distance/duration workflow and failure modes | KEEP |
| `/articles/how-to-calibrate-a-decibel-meter-app/` | Align an app to a reference and know what offset cannot fix | Practical worked offset and multi-level verification | KEEP |
| `/articles/phone-sound-meter-vs-professional-meter/` | Choose phone comparison versus compliant instrument | Decision consequences, peaks, calibration, compliance, and cost | KEEP |
| `/sounds/baby-crying/` | Understand caregiving-distance ranges and close-range extremes | Range, distance, average/max limits, and non-health-assessment caveat | KEEP |
| `/sounds/concert/` | Interpret concert LAeq/max/peak and location | Separates metrics and duration; actionable positioning/protection context | KEEP |
| `/sounds/lawn-mower/` | Understand operator-position exposure | Identifies operating/load variability and protection context | KEEP |
| `/sounds/normal-conversation/` | Interpret the common 60 dB shorthand | Explains distance/vocal-effort variability and repeatable measurement | KEEP |
| `/sounds/vacuum-cleaner/` | Compare appliances/rooms consistently | Explains floor, room, model, and distance effects | KEEP |

No section was proven to exist only for length. Conclusions generally consolidate action or boundaries instead of merely restating introductions. Product links are usually contextual rather than inserted into every section.

### Corpus variance

- Exact-heading analysis across each language/content set found only the intentional `## Sources` / `## Quellen` repetition.
- No exact repeated normalized paragraph of 120+ characters was found across the 20 English pages.
- Introductions vary among definition, worked example, question, comparison, and scenario structures.
- Section sequences vary by intent: definitions use concept/formula/application; exposure pages use model/context/limits; smartphone pages use error-source/workflow/decision; sound guides use range/distance/measurement/exposure.
- Sound guides share a useful editorial contract, but their source-specific intros, measurement contexts, and conclusions are distinct. Consistency here is not evidence of mass-produced low-value content.
- All 40 pages sharing the same truthful publication date is not a defect and should not be “freshened.”
- No commercial AI-detector score was used. No rewrite is recommended merely to conceal AI assistance.

## 13. Search-intent overlap map

| Cluster | Pages that look adjacent | Why intent remains distinct | Action |
|---|---|---|---|
| Fundamentals | decibel definition; logarithmic scale; SPL; dB vs dBA; 3 dB loudness | Unit/reference, scale math, pressure quantity, weighting notation, and psychoacoustic misconception are different tasks | KEEP all; no merge/canonical change |
| Exposure | 85 dB importance; time at 85; safe level; noise dose; NIOSH vs OSHA | Threshold meaning, one-model duration, broad safety framing, cumulative percentage, and standards comparison are different decisions | KEEP all; fix only P2-1 direct tool handoff |
| Smartphone | accuracy; different readings; how to measure; calibration; phone vs professional | Reliability evidence, discrepancy diagnosis, procedure, correction workflow, and tool-selection consequence are distinct | KEEP all; current cross-links clarify progression |
| Common sounds | five source-specific sound guides | Each serves a separate sound query with different distance/source/exposure context | KEEP all; no consolidation |
| Tools vs articles | exposure time, dose, distance, addition, daily exposure | Tools answer a calculation task; articles explain concepts/limits | KEEP paired architecture; link only where the reader's task naturally continues |
| English/German pairs | 20 editorial pairs and 4 tool pairs | Locale alternatives, not competing duplicates; hreflang/canonical implementation is correct | KEEP locale routes and reciprocal pairing |

Titles and descriptions are unique across all indexable routes. No pair was found with substantially identical title, explanation, audience, and internal anchor text. Established URLs should not be changed.

## 14. Internal-link graph findings

- Graph size: 56 indexable nodes.
- Unique inbound-link range: 1–55; median 6.
- Unique outbound-link range: 4–23; median 9.
- All nodes are reachable from `/` through crawlable HTML.
- No indexable node has zero inbound or zero outbound links.
- The only node with one unique inbound is `/tools/noise-dose-calculator/`; P2-1 adds the single most relevant second inbound from `/articles/what-is-noise-dose/`.
- Breadcrumbs are crawlable and correctly keep locale context; editorial current-page crumbs use `aria-current="page"`.
- Related editorial links stay within the locale and are based on actual cluster/content relations.
- Tools link to model explanations/sources, and the tool indexes provide reliable discovery.
- Sound guides link back into the sound resource structure; the shared explorer uses real links for published guides.
- Search results are client-filtered but point to normal crawlable URLs; search is supplemental, not the only discovery path.
- No unfinished/nonexistent route appears in current generated internal links.

**Decision:** keep the information architecture. Add only the noise-dose article-to-tool link; do not impose a fixed link count on every page.

## 15. Localization findings by locale

### English (`en`)

- `<html lang="en">`, unprefixed canonicals, English navigation/search labels, English dates, and English decimal punctuation are correct.
- The homepage is intentionally English-only and is not paired with a fabricated `/de/` homepage.
- The 20 English editorial pages have distinct intents and appropriately cautious scientific/legal wording.
- P0 product-copy findings are concentrated on the English homepage and shared English footer label.

### German (`de`)

- `<html lang="de">` is correct on every German index/detail/tool route.
- Article and sound segments use `/de/artikel/` and `/de/alltagsgeraeusche/`; localized tool routes use `/de/werkzeuge/`. No fallback English segment leaks into canonical German URLs.
- Paired routes have reciprocal alternate links and `x-default` to English.
- Navigation, search labels, accessibility labels, titles, descriptions, dates, decimal commas, and calculator result messages are localized. Browser examples: `84,5 dB`, `−6,0 dB`, `85,0 dB(A)`, and `Gesamtdauer: 8,0 h`.
- Language switching from `/articles/` to `/de/artikel/` worked, and German search for “Konzert” returned the canonical German guide.
- Sampled prose consistently uses formal `Sie`, German quotation/punctuation conventions, and appropriate acoustic terms (`Schalldruckpegel`, `Tages-Lärmexpositionspegel`, `Auslösewert`).
- German safety/legal pages preserve the distinction among WHO leisure guidance, NIOSH/OSHA US occupational models, and German/EU law.
- P1-3 is a markup/rendering defect, not a translation rewrite request.
- P1-4 is a shared-layout response to long German compounds, not evidence that the wording should be shortened unnaturally.

No language-specific humanizer/validator artifact was available. No wholesale German rewrite is justified by the direct sample or corpus-level evidence.

## 16. Tools and calculator verification

### Independent reference calculations and browser results

| Tool | Independent calculation | Browser result | Validation/edge result | Decision |
|---|---|---|---|---|
| English NIOSH exposure time | `8 × 2^((85-L)/3)`; 85 → 8 h; 100 → 0.25 h | 85 dBA → 8 hours; 100 dBA → 15 minutes | Slider constrained 70–115; live status output; safety note present | KEEP |
| German exposure duration | `8 × 10^((85-L)/10)`; 85 → 8 h | 85 dBA → 8 Stunden | Uses upper action-value model and states lower 80 dB(A) value; not called safe time | KEEP |
| Distance | `90 - 20 log10(2/1) = 83.979...` | 84.0 dB; change −6.0 dB | Target 0 → `—` and a positive-distance error; range 0.01–100000 | KEEP |
| Add decibels | `10 log10(10^8 + 10^8) = 83.010...`; three equal 80s → 84.771... | 83.0 dB; after Add, 84.8 dB | Add/remove row works; empty value → `—` and clear error | KEEP |
| NIOSH dose | 4 h / 8 h at 85 + 2 h / 4 h at 88 = 100% | 100.0% | Combined duration >24 h → `—` and explicit error; add/remove works | KEEP; P2-1 link only |
| Daily `L_EX,8h` | 85 dB(A) × 8 h → 85.0; add 95 dB(A) × 0.5 h → about 87.1 | 85.0 then 87.1 dB(A) | >24 h → `—`; action-value category and combined hours update | KEEP |
| German distance/daily | Same formulas with locale formatting | 90.5 dB at 1→2 gives 84,5 dB; daily gives 85,0 dB(A) | German messages and decimal comma correct | KEEP |

### Input, semantics, and progressive enhancement

- Numeric min/max/step values match the declared model domains.
- Empty, zero/negative where invalid, extreme, and >24 h combined-duration paths produce bounded errors rather than `NaN`/infinite output.
- Multi-row calculators prevent removing the last required row and update row labels/control state after add/remove.
- Number controls, selects, range controls, increment/decrement buttons, add/remove buttons, and outputs have accessible labels/status semantics after script initialization.
- The calculators remain understandable without JavaScript through static examples/model explanations; JavaScript enhances live calculation rather than hiding the page.
- There is no reset/copy/share control. No such feature is promised, and adding one is not justified by current evidence.
- The distance and decibel-addition pages state the free-field/independent-signal simplifications. The exposure tools state that results are educational occupational estimates, not individual safety or compliant workplace measurements.

## 17. Technical search findings

### Passing evidence

- 56/56 sitemap URLs return live HTTP 200 and have matching normalized rendered text hashes in the fresh local production build.
- No live-only or local-only sitemap route was found.
- `robots.txt` allows crawling and points to the sitemap.
- Every indexable page has one self-canonical, one unique title, one unique description, one H1, and expected `lang`.
- Every registered language pair is reciprocal; the unpaired English noise-dose tool has no false hreflang.
- No accidental `noindex` appears on current content; redirect documents are correctly noindex and absent from the sitemap.
- No broken internal URL or anchor was found.
- All eight legacy redirects are one 301 hop to a 200 canonical target; no loop exists.
- `/tools` normalizes to `/tools/` with one 307 in the observed live behavior; HTTP normalizes to HTTPS with one 301. Query parameters leave the canonical at the clean URL. `/TOOLS/` returns 404 rather than creating a case duplicate.
- Article schema contains an organization author/publisher identity, headline/description, image, publication/review dates, language, and main entity; BreadcrumbList matches visible breadcrumbs.
- Schema is not added to calculators merely for volume. The current `Article`/`WebSite` scope is honest.
- Search and main content are present in rendered HTML/static JSON and do not depend on framework hydration.

### Action

- Implement P1-5 for useful hard-404 HTML while preserving status 404.
- Implement P2-4 and P2-6 for heading/accessibility semantics.
- Do not use this audit to explain the previous indexing event.

## 18. UX and accessibility findings

### Browser interactions that passed

- Mobile navigation opens/closes and preserves access to local tools/articles/search.
- Search opens as a dialog, receives focus, finds English/German content, closes via button/Escape, and returns focus to the trigger. When the search field contains text, the first Escape clears the native search field and the second closes the dialog; this is standard browser behavior, not elevated as a defect.
- Language menu opens, exposes the current locale, switches to the paired route, and supports keyboard focus.
- Hero Listen begins the film audio/Web Audio readout; Mute returns the video to muted state. The source note distinguishes the film demo from the phone measurement path.
- Sound Explorer selection updates the range/readout and exposes pressed state; its horizontal scale has an intentional local scroll container rather than page-level overflow.
- Calculator keyboard editing and row controls work.
- Reduced-motion mode produces opacity 1 / no transform / zero-duration reveal styles, hides the decorative exposure rail, and does not auto-load the video.
- Forced-colors smoke checks retained headings and interactive controls on home, add-decibels, and the German sound index.
- Skip navigation, `main`, navigation, footer, dialog labels, form labels, icon/button labels, and image alt/decorative treatment are present across the generated-route audit. No duplicate IDs or missing image `alt` were found.
- Touch controls observed in the interactive surfaces meet the WCAG 2.2 24 CSS px minimum or its spacing/context exceptions; no evidence supports a global target-size rewrite.

### Findings to act on

- P1-1: meaningful tertiary text contrast.
- P1-2: search input focus indicator.
- P1-3: raw German inline math.
- P1-4: German mobile page overflow.
- P1-5: empty production 404.
- P2-4: sound-index heading order.
- P2-6: concatenated homepage accessible text.
- P3-1: current-page navigation orientation.

Full screen-reader and real 200% browser-zoom sign-off should be part of implementation acceptance, especially after P1-1 through P1-4.

## 19. Performance and privacy findings

### Asset and runtime evidence

| Item | Evidence | Decision |
|---|---|---|
| Hero video | mobile 405.7 KiB; desktop 970.4 KiB; `preload="none"`; responsive source chosen in script | Preserve feature; improve LCP sequencing under P1-6 |
| Hero poster | 13.0 KiB WebP | Good lightweight candidate; KEEP asset |
| Homepage CSS/JS | generated CSS 25.0 KiB plus shared/component CSS; first-party JS split into small feature modules | Generally proportional; anime engine remains dynamic |
| Editorial CSS | 34,022-byte shared stylesheet including KaTeX | P2-3 on 32 non-math pages |
| Third parties | Lighthouse: GTM ~170 KiB; Google Fonts ~72 KiB; GA request; live `_ga*` cookies | P0-1; also a performance win |
| Lighthouse mobile | performance 78; FCP 2.8 s; LCP 4.5 s; TBT 130 ms; CLS 0.006; 715 KiB | P1-6; CLS/TBT are already reasonable |
| Images | WebP article/feature assets, largest non-video feature image ~89 KiB | KEEP; no evidence for broad image replacement |
| Motion | anime.js only for the defined meter/scroll/scramble paths; no idle RAF loop | KEEP |
| Search | static JSON fetched only when search opens | KEEP |
| Web Audio | initialized from hero video on user Listen; no microphone API/getUserMedia on website | KEEP |
| Local storage/forms | no local/session storage or contact form found | KEEP; disclose actual analytics cookies |

The local preview logs a 404 for `/cdn-cgi/trace` because Astro preview does not emulate Cloudflare. Live `/cdn-cgi/trace` returns 200, and no live failure was observed; this is not a production defect.

The site's privacy note correctly says app raw audio is not uploaded and optional Health Connect sharing requires user enablement. It does not cure the website analytics issue or the “without recording audio” wording.

## 20. Live-site versus local-build differences

| Check | Local production build | Live site | Assessment |
|---|---|---|---|
| Sitemap route set | 56 | 56 | Identical |
| Rendered route text | Fresh build | Current live | Matching normalized hashes for all 56 |
| Status for indexable routes | 200 | 200 | Identical |
| Redirects | 8 generated/noindex definitions | 8 single-hop 301s | Expected deployment representation |
| `/cdn-cgi/trace` | 404 in Astro preview | 200 | Expected Cloudflare-only endpoint |
| Unknown route | Generic Astro preview 404 HTML | Empty 404 body | Live-only usability defect P1-5 |
| GA4/cookies | Executes in browser preview | Executes and sets live `_ga*` cookies | Same underlying implementation; P0-1 |
| Product copy | Current checkout | Same rendered copy | No stale deployment difference; source itself needs corrections |

No stale-build or missing-deployment issue was proven.

## 21. Proposed implementation batches

### Batch 1: Tracking and legal-information baseline

- **Goal:** stop unchosen analytics storage/transmission and publish factual privacy/controller/provider information.
- **Included findings:** P0-1.
- **Exact files expected to change:** `src/layouts/Base.astro`, `src/i18n/ui.ts`, `public/_headers`; new privacy/legal route files whose final names and locale pairing reflect owner/legal decisions; possibly local font assets/styles.
- **Expected user benefit:** real control over tracking and a clear explanation of who operates the service and how data is handled.
- **Expected search or trust benefit:** materially stronger trust/compliance; removes unnecessary pre-consent third-party JS. No ranking promise.
- **Regression risk:** medium.
- **Required tests:** clean-profile network/cookie assertions before accept/refuse; consent persistence/withdrawal; keyboard/focus/contrast; English/German route metadata; CSP; build; live preview.
- **Rollback considerations:** removing GA is immediately reversible; do not roll back to pre-consent execution. Legal pages should be versioned and owner-approved.
- **Whether owner review is required before implementation:** **Yes.** Controller/provider facts, legal basis, retention, processors, address, and jurisdiction cannot be invented.

### Batch 2: High-risk product-claim corrections

- **Goal:** make launch, privacy, dosimeter/alert, hearing, and tinnitus claims match current app truth.
- **Included findings:** P0-2, P0-3, P0-4, P0-5, P2-2.
- **Exact files expected to change:** `src/pages/index.astro`, `src/i18n/ui.ts`.
- **Expected user benefit:** accurate expectations about microphone capture, measurement limits, release scope, and non-clinical tracking.
- **Expected search or trust benefit:** improved factual credibility; no keyword expansion.
- **Regression risk:** low to medium because terminology must preserve LAeq/LCpeak/dose distinctions.
- **Required tests:** app-claim matrix recheck against the current Android app `PROJECT.md` and named code constants; build; homepage browser/snapshot; metadata/social copy review.
- **Rollback considerations:** copy-only rollback is simple, but do not restore a disproven claim.
- **Whether owner review is required before implementation:** **Yes** for launch timing/tinnitus allocation; factual corrections themselves are source-backed.

### Batch 3: Shared contrast and focus

- **Goal:** meet normal-text and focus-indicator contrast while preserving the dark visual hierarchy.
- **Included findings:** P1-1, P1-2.
- **Exact files expected to change:** `src/layouts/Base.astro`; component files only if the tertiary semantic role must be split.
- **Expected user benefit:** readable metadata/disclaimers and reliable keyboard focus.
- **Expected search or trust benefit:** accessibility and perceived quality; no direct ranking claim.
- **Regression risk:** medium for broad token impact.
- **Required tests:** computed contrast on every surface, Lighthouse accessibility, keyboard search flow, forced colors, screenshots at four widths.
- **Rollback considerations:** keep old token values documented in Git; roll back only if a replacement still passes contrast.
- **Whether owner review is required before implementation:** recommended for visual tone, not for the accessibility threshold.

### Batch 4: German rendering and narrow-screen resilience

- **Goal:** render acoustic notation correctly and remove page-level mobile overflow.
- **Included findings:** P1-3, P1-4.
- **Exact files expected to change:** `src/content/articles/de/db-und-dba-unterschied.md`, `src/content/articles/de/was-ist-ein-dezibel.md`, `src/content/articles/de/was-ist-schalldruckpegel.md`, `src/components/SoundIndexPage.astro`, `src/components/CalculatorPage.astro`.
- **Expected user benefit:** readable symbols and stable 320–390 px German layouts.
- **Expected search or trust benefit:** better localized technical credibility.
- **Regression risk:** low to medium.
- **Required tests:** build; verify 14 KaTeX nodes/expressions; compare formulas with English source; browser 320/360/390/768/1440; 200% zoom; sound overview remains locally scrollable.
- **Rollback considerations:** formula conversion and CSS adjustment can be reverted independently.
- **Whether owner review is required before implementation:** no for the mechanical fixes; German editorial spot review recommended.

### Batch 5: Useful hard 404

- **Goal:** keep a true 404 while giving users a recovery path.
- **Included findings:** P1-5.
- **Exact files expected to change:** new `src/pages/404.astro`; minimal shared localized UI data only if required.
- **Expected user benefit:** explanation, navigation, and search instead of a blank page.
- **Expected search or trust benefit:** correct hard-404 behavior with better site quality; no soft redirect.
- **Regression risk:** low.
- **Required tests:** random path status/body locally and Cloudflare preview/live; no sitemap entry; title/H1/lang/landmarks/links; mobile/keyboard.
- **Rollback considerations:** retain 404 status even if the custom body is rolled back.
- **Whether owner review is required before implementation:** no, unless legal/footer content from Batch 1 is included.

### Batch 6: Hero LCP sequencing

- **Goal:** preserve the film while making the poster/first paint the stable mobile LCP.
- **Included findings:** P1-6.
- **Exact files expected to change:** `src/pages/index.astro`; analytics-related improvement is delivered separately by Batch 1.
- **Expected user benefit:** faster meaningful first view on constrained mobile networks.
- **Expected search or trust benefit:** improved performance quality; field benefit must be measured, not promised.
- **Regression risk:** medium.
- **Required tests:** three-run median Lighthouse at a fixed profile; film autoplay/loop; Listen/Mute/Web Audio; poster-to-video transition; reduced motion; save-data; CLS.
- **Rollback considerations:** poster-first sequencing should be isolated so it can revert without deleting media assets.
- **Whether owner review is required before implementation:** recommended for perceived hero timing.

### Batch 7: Editorial payload and direct task handoff

- **Goal:** remove irrelevant KaTeX CSS from non-math pages and connect the noise-dose explanation to its live calculator.
- **Included findings:** P2-1, P2-3.
- **Exact files expected to change:** `src/content/articles/en/what-is-noise-dose.md`, `src/components/EditorialPage.astro`, and only the minimum schema/frontmatter support if needed.
- **Expected user benefit:** one obvious next step and a smaller non-math article payload.
- **Expected search or trust benefit:** stronger content-tool relationship and leaner delivery; no new content.
- **Regression risk:** medium because conditional CSS must cover all eight math pages.
- **Required tests:** all 40 editorial pages; generated CSS requests; formula rendering; link graph; build.
- **Rollback considerations:** link and CSS work are separable.
- **Whether owner review is required before implementation:** no.

### Batch 8: Semantic polish and navigation orientation

- **Goal:** correct heading semantics/text extraction and add a modest current-page cue.
- **Included findings:** P2-4, P2-6, P3-1.
- **Exact files expected to change:** `src/components/SoundExplorer.astro`, `src/components/SoundIndexPage.astro`, `src/pages/index.astro`, `src/layouts/Base.astro` or existing navigation data.
- **Expected user benefit:** cleaner screen-reader navigation and page orientation.
- **Expected search or trust benefit:** limited; primarily accessibility/usability.
- **Regression risk:** low to medium for shared heading context.
- **Required tests:** accessibility snapshots, heading-order script at mobile/desktop, nav exact matching, homepage visual comparison.
- **Rollback considerations:** each semantic change can be reverted independently.
- **Whether owner review is required before implementation:** no.

### Batch 9: Product-truth maintenance seam

- **Goal:** prevent the website's app-document snapshot from silently drifting again.
- **Included findings:** P2-5.
- **Exact files expected to change:** root `PROJECT.md`; optionally one existing documentation/validation location if a sync check is chosen.
- **Expected user benefit:** indirect—future public claims remain accurate.
- **Expected search or trust benefit:** lower future factual-drift risk.
- **Regression risk:** low.
- **Required tests:** documentation links/paths resolve in the actual maintainer environment; a sample claim audit reaches the current app source.
- **Rollback considerations:** retain the last verified revision/date in Git history.
- **Whether owner review is required before implementation:** yes, to choose the durable cross-repository process.

## 22. Explicit DO NOT CHANGE list

- Do not change established URL slugs, trailing-slash policy, English default-locale prefixing, German localized segments, canonical strategy, hreflang strategy, or x-default behavior.
- Do not add a German homepage solely for symmetry.
- Do not add articles, topic clusters, publishing schedules, generic SEO paragraphs, author personas, fabricated credentials, tests, users, reviews, downloads, or results.
- Do not mass merge, delete, noindex, shorten, lengthen, or “humanize” the 40-page corpus.
- Do not change publication/review dates to create freshness.
- Do not replace working primary sources merely for link variety or because an automated client received a bot-block response.
- Do not rewrite typical sound ranges when different credible sources use different distances/metrics; keep the current contextual ranges unless a specific source mismatch is proven.
- Do not add generic schema to every calculator/index. Keep Article/Breadcrumb/WebSite schema aligned with visible content.
- Do not redirect unknown URLs to home or return a 200 soft 404.
- Do not call any calculator output a personal safety guarantee, permitted maximum, compliant measurement, diagnosis, or certified instrument result.
- Do not remove the hero film, Sound Explorer, motion identity, or calculator interactivity. Apply the proportional fixes in the findings.
- Do not introduce a heavy frontend framework for these fixes.
- Do not infer the previous indexing change was caused by AI writing, a Google update, crawl budget, domain authority, publishing rate, or backlink volume.
- Do not deploy, branch, commit, or open a pull request as part of this audit.

## 23. Validation commands and acceptance tests

### Repository commands confirmed from source

```powershell
npm run check
npm test
npm run build
npm run preview
```

Expected current baseline:

- `astro check`: 0 errors, 0 warnings; 18 hints until scheduled maintenance removes them.
- Node tests: 14 pass.
- Build: 56 pages plus 8 redirect outputs and sitemap generation.

### Required mechanical acceptance after any implementation batch

1. Run `npm run check`, `npm test`, and `npm run build` sequentially.
2. Assert all sitemap URLs return 200, each has exactly one non-empty title/description/H1/self-canonical, and every registered alternate is reciprocal.
3. Crawl generated internal links and fragments; require zero broken targets and zero orphaned indexable routes.
4. Recheck the eight redirects for one 301 hop and no sitemap inclusion.
5. Compare live deployment with the exact built artifact only after the owner separately authorizes deployment.

### Browser acceptance matrix

Use at least 360, 390, 768, and 1440 px and cover:

- `/`
- `/articles/`
- one fundamentals, exposure, smartphone, and common-sound editorial page
- `/sounds/`, `/sounds/concert/`, `/sounds/baby-crying/`
- `/tools/` and all five English calculators
- `/de/artikel/`, multiple German articles including all three formula-fixed pages
- `/de/alltagsgeraeusche/` and one German sound guide
- `/de/werkzeuge/` and all four German calculators
- privacy/legal routes after Batch 1
- a random 404 path after Batch 5

For each relevant batch, check console/network failures, overflow, 200% zoom, keyboard order, visible focus, search, language switch, form errors, add/remove controls, hero Listen/Mute, reduced motion, save-data, forced colors, and status/live-region output.

### Finding-specific gates

- **P0-1:** clean context has zero Google tracking request/cookie before opt-in; refusal/withdrawal verified.
- **P0-2–P0-5:** rerun the product claim matrix against current app code and `PROJECT.md`; owner confirms release allocation.
- **P1-1/P1-2:** WCAG contrast calculations plus Lighthouse/keyboard manual checks.
- **P1-3:** no raw `(L_{...})`/brace notation in rendered German text; KaTeX semantics preserved.
- **P1-4:** `documentElement.scrollWidth === clientWidth` at narrow widths, excluding the intentional nested sound scroller.
- **P1-5:** unknown path returns 404 plus non-empty usable HTML.
- **P1-6:** comparable three-run Lighthouse median, no hero interaction or motion-policy regression.
- **P2-3:** all eight math pages styled; representative non-math pages do not include KaTeX CSS.
- **P2-4/P2-6/P3-1:** accessibility snapshots show logical headings, correct spaces, and exact current-page state.

## 24. Final recommendation

Proceed with **Batch 1: Tracking and legal-information baseline**, then **Batch 2: High-risk product-claim corrections**. These two batches address every P0 without touching the sound-information corpus, URL architecture, or search strategy.

After those, implement accessibility/localization batches before performance polish. The current content and technical-search foundation should remain intact: it is internally coherent, crawlable, localized, sourced, and calculator-backed. The evidence supports targeted corrections, not a redesign or SEO/content campaign.

**Final priority counts:** P0 5 · P1 6 · P2 6 · P3 1.
