# dBcheck.app KaTeX font CSP correction — 2026-08-24

## 1. Task scope

This production correction was limited to preventing Vite from inlining fonts resolved from `node_modules/katex/dist/fonts/`. The exact validated static candidate was then deployed to the existing `dbcheck-website` Cloudflare project and verified at `https://dbcheck.app/`.

No other audit finding, content correction, component change, dependency update, analytics change, Cloudflare architecture change, DNS change, or Android change was implemented.

## 2. Owner decision accepting the 404 `text/html` response

The owner accepts the existing Cloudflare custom-404 response header `Content-Type: text/html` without an explicit `charset=utf-8` parameter when the document itself passes the required UTF-8 and metadata checks. This report records that decision as `ACCEPTED_NO_CHANGE`.

The historical report `docs/audits/dbcheck-production-deployment-verification-2026-08-24.md` was not rewritten. No Worker, Transform Rule, global content-type rule, locale-specific 404, or 404 architecture change was introduced. Direct `/404` remains the accepted noindex HTTP 200 asset.

## 3. 404 UTF-8 and first-1,024-byte verification

The generated file, local Wrangler result, and post-deployment production response passed the same checks:

- arbitrary unique missing path: HTTP 404, no `Location`, non-empty custom body;
- production `Content-Type`: `text/html` (`ACCEPTED_NO_CHANGE`);
- body: 8,832 bytes;
- strict fatal UTF-8 decode: pass;
- replacement character U+FFFD: absent;
- `<meta charset="utf-8">`: exactly one;
- complete meta serialization ends at byte 59, within the first 1,024 bytes;
- German text, including `Alltagsgeräusche` and `Werkzeuge`: correct;
- one H1 and one main landmark in the custom document;
- `noindex`: present;
- canonical, hreflang, and JSON-LD: absent;
- `/404`: HTTP 200 and noindex;
- 404 route: absent from the sitemap, `/search.json`, and `/de/search.json`.

Verdict: `ACCEPTED_NO_CHANGE`. The missing HTTP charset parameter is not an unresolved defect.

## 4. Git and production baseline

- Branch: `feat/mittariliike` tracking `origin/feat/mittariliike`.
- Source HEAD: `bdf690bb711e5c3208659f3dcd7d6f89b1475219`.
- Previous production version: `0cb49559-9e5f-4c60-b8a4-b319d440ae53`.
- Pre-edit `git diff --check`: exit 0; only existing LF-to-CRLF working-copy notices.
- The repository already contained 18 tracked modified files from the approved production candidate: six shared Astro component/layout/page files, nine German article files, `test/i18n-build.test.mjs`, and `wrangler.jsonc`.
- Approved untracked production files already present included `src/pages/404.astro`, `test/accessibility-responsive-p1.test.mjs`, and `test/cloudflare-404.test.mjs`.
- Existing audit documents, owner-input documents, Lighthouse JSON, Playwright screenshots/scripts, `.codex-remote-attachments/`, and the root improvement audit were preserved and were not treated as new production source for this correction.
- `dist/` was rebuilt and deployed as the configured generated asset directory. It was not treated as source or staged.
- No branch was created or switched, and nothing was staged.

Inspected installed versions:

- Astro 7.1.6;
- Vite 8.1.4;
- KaTeX 0.17.0;
- Wrangler 4.119.0.

Before this task, `astro.config.mjs` had no `vite` block. `EditorialPage.astro` imported the current KaTeX CSS through the established Markdown/rehype path and did not require modification.

## 5. Original KaTeX CSP violation

A fresh production browser context reproduced the defect on `/de/artikel/was-ist-schalldruckpegel/` before editing:

- violated directive: `font-src 'self' https://fonts.gstatic.com`;
- blocked URL type: `data:font/woff2;base64,...`;
- font family: `KaTeX_Size3`;
- CSS source: `https://dbcheck.app/_astro/EditorialPage.Bg9jC2yE.css`;
- console/resource-policy result: the data-font load was blocked by CSP;
- the browser then requested the declaration's same-origin WOFF alternative, `KaTeX_Size3-Regular.CTq5MqoE.woff`, with HTTP 200, so the KaTeX family was supplied by the secondary source;
- two inspected `.delimsizing.size3` parentheses used `KaTeX_Size3`; their measured geometry was approximately 15.1406 by 50 CSS pixels;
- no visible geometry difference was detected in that inspection, but visual inspection was not used as the defect proof. The console, CSP, and network evidence established the failure.

The production CSP itself was correct and intentionally remained narrow.

## 6. Exact inlined font and source path

The inlined source was:

- package file: `node_modules/katex/dist/fonts/KaTeX_Size3-Regular.woff2`;
- size: 3,624 bytes;
- SHA-256: `73D591271B1604960CB10BB90FEE021670AF7297017E0E98480B332D11F51995`;
- base64 payload length: 4,832 characters;
- baseline CSS: `dist/_astro/EditorialPage.Bg9jC2yE.css`, 34,076 bytes.

The complete declaration structure was:

```css
@font-face{font-display:block;font-family:KaTeX_Size3;font-style:normal;font-weight:400;src:url(data:font/woff2;base64,<4,832-character payload matching the SHA-256 above>)format("woff2"),url(/_astro/KaTeX_Size3-Regular.CTq5MqoE.woff)format("woff"),url(/_astro/KaTeX_Size3-Regular.DgpXs0kz.ttf)format("truetype")}
```

The digest, decoded byte length, and byte-for-byte comparison tied the recorded payload to the exact package source. The baseline output had 59 emitted KaTeX font files: WOFF and TTF for all 20 KaTeX families, and WOFF2 for 19 of them. `KaTeX_Size3-Regular.woff2` was the sole missing emitted WOFF2 because it was the only generated data URL. No other inlined URL was found across generated HTML, CSS, JavaScript, or SVG.

The 20 families were AMS Regular; Caligraphic Bold/Regular; Fraktur Bold/Regular; Main Bold/BoldItalic/Italic/Regular; Math BoldItalic/Italic; SansSerif Bold/Italic/Regular; Script Regular; Size1/Size2/Size3/Size4 Regular; and Typewriter Regular.

## 7. Chosen Vite configuration

`astro.config.mjs` now preserves all existing Astro configuration and adds only:

```js
vite: {
  build: {
    assetsInlineLimit(filePath) {
      const normalizedPath = filePath.replaceAll('\\', '/');
      if (/\/node_modules\/katex\/dist\/fonts\/[^/]+\.(?:woff2?|ttf|otf)$/i.test(normalizedPath)) {
        return false;
      }
      return undefined;
    },
  },
},
```

The installed Vite 8.1.4 type declares the callback as `(filePath, content) => boolean | undefined`. Its installed implementation calls the callback for the resolved asset and applies normal default behavior when the result is nullish. A deliberately failing test proved the callback path controlled the KaTeX CSS font reference: before the configuration change the new test failed on the inlined data font; after the change it passed and the WOFF2 was emitted.

The match normalizes Windows paths and requires both the KaTeX package font directory and a font extension. It does not rely on the substring `Size3`. Returning `undefined` for every unrelated asset retains Vite's default inlining behavior.

## 8. Why global inlining changes and CSP broadening were rejected

The change does not set `assetsInlineLimit: 0`, affect all images/icons/videos/fonts, add `data:`, `blob:`, a wildcard, or another font origin to CSP, patch `node_modules`, copy fonts to `public/`, duplicate KaTeX CSS, or change the 404 system. Those alternatives would broaden behavior beyond the demonstrated defect. The supported per-file callback resolves the defect without those changes.

## 9. Exact files changed

Persistent task files:

1. `astro.config.mjs` — targeted KaTeX font `assetsInlineLimit` callback.
2. `test/katex-font-assets.test.mjs` — one focused generated-output regression test.
3. `docs/audits/dbcheck-katex-font-csp-correction-2026-08-24.md` — this non-public audit report.

No content or component file was changed by this task. Temporary verification scripts, Playwright session artifacts, and the task-created `.wrangler/` directory were removed after use.

## 10. Before and after generated CSS behavior

Before:

- editorial CSS: `EditorialPage.Bg9jC2yE.css`, 34,076 bytes;
- KaTeX data-font references: 1;
- Size3 WOFF2: embedded as `data:font/woff2;base64,...`;
- WOFF and TTF alternatives: emitted same-origin assets.

After:

- editorial CSS: `EditorialPage.Blae9niM.css`, 29,263 bytes;
- KaTeX data-font references: 0;
- all generated data URLs: 0;
- Size3 declaration:

```css
@font-face{font-display:block;font-family:KaTeX_Size3;font-style:normal;font-weight:400;src:url(/_astro/KaTeX_Size3-Regular.gV2CO0n9.woff2)format("woff2"),url(/_astro/KaTeX_Size3-Regular.CTq5MqoE.woff)format("woff"),url(/_astro/KaTeX_Size3-Regular.DgpXs0kz.ttf)format("truetype")}
```

Every KaTeX font URL resolved inside `dist/` to a real non-empty file. No absolute filesystem path, `file:` URL, malformed encoding, missing format declaration, duplicate font-content copy, or font-family change was found.

## 11. Before and after asset counts and sizes

| Measure | Before | After | Difference |
|---|---:|---:|---:|
| Editorial CSS | 34,076 bytes | 29,263 bytes | -4,813 bytes |
| Extracted Size3 WOFF2 | in CSS, decoded 3,624 bytes | 3,624-byte asset | one requestable file |
| Emitted KaTeX font files | 59 | 60 | +1 |
| CSS data-font references | 1 | 0 | -1 |
| `dist/` files | 171 | 172 | +1 |
| `dist/` total size | 4,889,055 bytes | 4,887,866 bytes | -1,189 bytes |
| `dist/_astro/` files | 90 | 91 | +1 |
| `dist/_astro/` size | 1,822,100 bytes | 1,820,911 bytes | -1,189 bytes |

The build consequence was one additional 3,624-byte same-origin WOFF2 request and a smaller CSS file. No performance-regression claim is made from that measured change.

## 12. Regression test

`test/katex-font-assets.test.mjs` verifies from a fresh `dist/` that:

- no `data:font/`, `data:application/font`, or KaTeX `url(data:...)` remains;
- KaTeX WOFF2, WOFF, and TrueType URLs resolve to same-origin paths contained by `dist/`;
- every referenced file exists and is non-empty;
- exactly one generated Size3 WOFF2 exists, without hard-coding its hash, and is byte-for-byte equal to the package source;
- `_headers` retains exactly `font-src 'self' https://fonts.gstatic.com` without `data:`;
- all nine German routes retain 38 KaTeX roots, 38 MathML representations, 38 TeX annotations, and zero unsupported raw delimiters.

Red/green evidence:

- before configuration: 0/1 passed; the test failed specifically because generated CSS contained an inlined font data URI;
- after configuration and fresh build: 1/1 passed;
- full final repository suite: 24/24 passed.

## 13. Check, test, and build results

Commands were run sequentially against the final candidate:

1. `npm run check`: exit 0; 65 files, 0 errors, 0 warnings, 16 hints.
2. `npm test`: exit 0; 24 tests passed, 0 failed, 0 skipped, 0 cancelled, 0 todo; duration 247.6274 ms.
3. `npm run build`: exit 0; 57 Astro pages built in 1.91 s.

After the final build, the focused KaTeX and Cloudflare 404 tests passed 4/4 against that stable output. The deployment candidate contained 172 files totaling 4,887,866 bytes. Its path/size/SHA-256 manifest digest was `DFF8835222FA014C32ECE1F100B68C4BD44FB3CE4D80C3363D451487D914CF73`. No rebuild occurred between locking that candidate and deployment.

## 14. Local font-network and CSP verification

Local Wrangler served the exact fresh `dist/` on `127.0.0.1:8787` with the repository's redirect and header rules.

- Size3 URL: `/_astro/KaTeX_Size3-Regular.gV2CO0n9.woff2`;
- response: HTTP 200, `Content-Type: font/woff2`, 3,624 bytes;
- no WOFF or TTF Size3 fallback request was needed;
- no KaTeX CSP violation, blocked font, failed font request, page error, or unexpected console exception;
- CSP `font-src`: exactly `'self' https://fonts.gstatic.com`, with no `data:`.

The inspected Size3 parentheses used `KaTeX_Size3`, `document.fonts.check(...)` returned true, and their geometry remained approximately 15.1406 by 50 CSS pixels. This established that the browser loaded and applied the extracted font rather than merely finding a file on disk.

## 15. Formula verification on all nine routes

| Route | KaTeX | MathML | TeX annotations |
|---|---:|---:|---:|
| `/de/artikel/db-und-dba-unterschied/` | 7 | 7 | 7 |
| `/de/artikel/laermexpositionsgrenzen-deutschland-eu/` | 1 | 1 | 1 |
| `/de/artikel/sind-3-db-doppelt-so-laut/` | 6 | 6 | 6 |
| `/de/artikel/warum-ist-die-dezibelskala-logarithmisch/` | 4 | 4 | 4 |
| `/de/artikel/warum-sind-85-db-wichtig/` | 1 | 1 | 1 |
| `/de/artikel/was-ist-ein-dezibel/` | 5 | 5 | 5 |
| `/de/artikel/was-ist-eine-laermdosis/` | 3 | 3 | 3 |
| `/de/artikel/was-ist-schalldruckpegel/` | 10 | 10 | 10 |
| `/de/artikel/wie-lange-85-db-hoeren/` | 1 | 1 | 1 |
| **Total** | **38** | **38** | **38** |

Locally and in fresh production contexts, every route returned 200, formula bodies were unchanged, unsupported raw delimiters were absent, and KaTeX font requests succeeded. At 320, 360, 390, 768, and 1,440 CSS pixels, no document-level horizontal overflow occurred. Intended KaTeX scrollers remained local. Reflow-equivalent 384- and 720-pixel checks passed. No new console or page error occurred.

## 16. Route, redirect, sitemap, canonical, hreflang, schema, and date regression results

Mechanical final-output and production checks passed:

- 56 indexable routes, all HTTP 200, each with one H1;
- eight legacy paths, each one direct HTTP 301 to the established target;
- one non-indexable custom `404.html`;
- 56 unique sitemap canonical URLs; sitemap set equals the indexable canonical set;
- 404 and redirects absent from the sitemap;
- 404 absent from both search indexes;
- unique titles: 56; unique descriptions: 56;
- hreflang link counts: 54 `en-GB`, 54 `de-DE`, and 54 `x-default`, preserving reciprocal registered pairs;
- schema totals unchanged: 40 `Article`, 40 `BreadcrumbList`, and one `WebSite`;
- normalized visible text, title, description, canonical, hreflang, anchors, and JSON-LD matched the validated source output;
- article content, publication/review dates, internal links, and external links were unchanged;
- no valid route was captured by the 404 fallback;
- GA4 and all other analytics remained absent.

Local-versus-live comparison after deployment found zero structural mismatches and zero byte mismatches across all 56 indexable HTML responses. The sitemap and both search JSON responses were also byte-identical to the candidate.

Smoke tests passed for the homepage, an English non-math article, an English math article, English and German search, the custom 404, all eight redirects, and all six formerly overflowing routes at all five required widths. Search focus was visibly 2 px solid with a 4 px offset; search opened, accepted input, closed, and restored focus. The meaningful muted color remained `#888`.

## 17. Deployment command and version

- Confirmed target: existing `dbcheck-website` project, existing `dbcheck.app` custom domain, `./dist` assets.
- Command: `npx wrangler deploy`.
- Start: `2026-08-24T08:23:12.3004545Z`.
- Finish: `2026-08-24T08:23:34.9554445Z`.
- Previous version: `0cb49559-9e5f-4c60-b8a4-b319d440ae53`.
- New version: `c3ba1e5d-24e5-40ee-bde7-80c7858885fd`.
- Result: exit 0; deployment history confirms the new version at 100%.
- Wrangler read 239 asset paths, uploaded 42 new or modified assets, and reused 128 already-uploaded assets. The 42 direct consequences were the new WOFF2, new editorial CSS, and 40 editorial HTML files whose CSS hash reference changed.
- Reported upload: 0.31 KiB, 0.22 KiB gzip; asset upload 2.63 s; Worker upload 12.40 s; triggers 6.86 s.
- Production URL: `https://dbcheck.app/`.
- Warning: Wrangler 4.125.0 was available. Wrangler remained at 4.119.0 as required.

No Cloudflare account, DNS, domain, binding, secret, environment, compatibility setting, cache policy, or Worker entry point was changed.

## 18. Production font-network result

Fresh production browser contexts verified all nine German formula routes. The Size3 font was requested from:

`https://dbcheck.app/_astro/KaTeX_Size3-Regular.gV2CO0n9.woff2`

It returned HTTP 200 with `Content-Type: font/woff2` and 3,624 bytes. The browser applied `KaTeX_Size3` to an expression using `.delimsizing.size3`; `document.fonts.check(...)` was true. No secondary Size3 WOFF/TTF response, failed request, blocked font, or visual fallback caused by a missing Size3 font was observed.

## 19. Production CSP result

Production CSP after deployment is:

```text
default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; media-src 'self'; connect-src 'self'; worker-src 'self'; upgrade-insecure-requests
```

`font-src` remains exactly:

```text
'self' https://fonts.gstatic.com
```

No `data:`, `blob:`, wildcard, extra font origin, or weakened default policy was added. No KaTeX-related CSP violation or other CSP console message was observed in the required live route set.

## 20. Production formula result

Production retained 38 KaTeX roots, 38 MathML representations, and 38 TeX annotations across the nine routes, with zero unsupported raw delimiters and no formula-body change. All required widths and reflow-equivalent checks passed without document-level formula overflow; intentional local KaTeX overflow behavior remained local. No page error, new console exception, or failed production font asset occurred.

## 21. Production 404 result and accepted charset status

A fresh unique arbitrary path returned HTTP 404, `Content-Type: text/html`, no redirect, and the non-empty bilingual custom document. Strict UTF-8 decoding, the single meta charset ending at byte 59, German characters, no replacement characters, noindex, metadata exclusions, and sitemap/search exclusions all passed. Direct `/404` remained the accepted noindex HTTP 200 asset.

Status: `ACCEPTED_NO_CHANGE`. `Content-Type: text/html` without an HTTP charset parameter is accepted by the owner and is not recorded as a remaining defect.

## 22. GA4 absence verification

Fresh live browser state and generated-output searches found:

- no Google Analytics or Google Tag Manager request or collection endpoint;
- no analytics beacon or page view;
- no `_ga` or `_ga_*` cookie;
- no analytics local-storage or session-storage record;
- `window.gtag` undefined;
- `window.dataLayer` undefined;
- no GA4 runtime implementation in generated output.

No analytics or consent system was added.

## 23. Remaining third-party requests

The only remaining third-party runtime origins observed were:

- `https://fonts.googleapis.com` for the existing Google Fonts stylesheet;
- `https://fonts.gstatic.com` for existing Google Fonts resources.

Google Fonts remain externally hosted by owner decision. The extracted KaTeX fonts are first-party requests to `https://dbcheck.app/`. No claim is made that the site has zero third-party requests.

## 24. Limitations

- Direct `/404` remains the accepted noindex HTTP 200 static asset.
- Unknown English and `/de/` paths receive the same accepted bilingual static 404 document.
- The production 404 HTTP header remains `Content-Type: text/html` without an explicit charset; this is accepted after the strict document checks and is not a defect.
- Google Fonts remain external.
- Responsive checks used CSS viewport widths and reflow-equivalent viewports; they are not a full native browser-zoom or assistive-technology certification.
- A full screen-reader certification was outside this task.
- Wrangler reported a newer version, but no update was made.

No unresolved KaTeX font, CSP, route, metadata, analytics, or deployment mismatch remains.

## 25. No unrelated audit batch

No P2/P3 implementation, conditional KaTeX loading, article CSS splitting, calculator change, source-title correction, sound-range work, internal-link wording, German CTA change, OSHA URL change, navigation accessibility change, heading restructure, homepage semantics change, video optimization, privacy/legal page, Google Fonts self-hosting, content edit, product-copy edit, pricing change, dependency update, or Android change was implemented.

## 26. No Git publication action

Nothing was committed, pushed, merged, staged, branched, or opened as a pull request. The existing branch and all unrelated or previously approved dirty-tree work were preserved.

## 27. Final production acceptance verdict

**PASS — targeted correction deployed and verified.**

The installed Vite callback worked as intended. No KaTeX data font remains, the former Size3 WOFF2 is a same-origin hashed asset that loads and is applied in production, the CSP remains unchanged, all 38 formulas and all established route/metadata/accessibility invariants remain passing, and the accepted 404 behavior is unchanged. Production version `c3ba1e5d-24e5-40ee-bde7-80c7858885fd` is active at `https://dbcheck.app/`.
