# dBcheck production deployment and verification — 2026-08-24

## 1. Task scope

The complete owner-approved local dBcheck.app candidate was built, validated, deployed to the existing Cloudflare Workers Static Assets project and custom domain, and compared with production. No P1, P2 or P3 implementation batch was started.

The Cloudflare deployment itself succeeded and the exact local candidate is live. Strict production acceptance is **not fully complete**, however, because live verification found two narrow mismatches that were not authorized for correction in this task:

1. Cloudflare serves the custom 404 as `Content-Type: text/html`, without the required explicit `charset=utf-8` parameter. Local Wrangler served `text/html; charset=utf-8`.
2. The generated editorial CSS contains one inlined `KaTeX_Size3` `data:font/woff2` source. The intentionally narrow production CSP blocks that data font. All 38 formulas still produce KaTeX and MathML DOM, but the requirement of no failed/blocked KaTeX resource is not met.

No rollback or source/configuration correction was made.

## 2. Owner decisions preserved

- GA4, GTM and the prior measurement ID remain absent.
- No replacement analytics, telemetry, tracking, advertising, fingerprinting, heatmap or session-recording service was added.
- No analytics consent banner or Consent Mode implementation was added.
- Google Fonts remain externally hosted.
- Tinnitus pitch profile remains in the planned launch presentation.
- `in final tuning before release` remains unchanged.
- No article was added, deleted, merged, rewritten or noindexed.
- Article publication and review dates remain unchanged.
- URL, canonical, hreflang, x-default, sitemap and schema strategies remain unchanged.
- All eight legacy redirects remain unchanged.
- Calculator formulas and sources remain unchanged.
- The 404 remains one bilingual static fallback; no Worker entry point was added.
- Direct `/404` remains the accepted noindex HTTP 200 asset.
- No Android checkout was accessed or modified.

## 3. Pre-deployment Git status and HEAD

- Branch: `feat/mittariliike`, tracking `origin/feat/mittariliike`.
- HEAD: `bdf690bb711e5c3208659f3dcd7d6f89b1475219`.
- Tracked diff: 18 files, 131 insertions and 94 deletions.
- `git diff --check`: exit 0; no whitespace error. Git printed only its existing LF-to-CRLF working-copy notices.

Tracked modifications before deployment:

- `src/components/ArticleIndexPage.astro`
- `src/components/CalculatorPage.astro`
- `src/components/EditorialPage.astro`
- `src/components/ExposureCalculator.astro`
- `src/components/SoundExplorer.astro`
- `src/content/articles/de/db-und-dba-unterschied.md`
- `src/content/articles/de/laermexpositionsgrenzen-deutschland-eu.md`
- `src/content/articles/de/sind-3-db-doppelt-so-laut.md`
- `src/content/articles/de/warum-ist-die-dezibelskala-logarithmisch.md`
- `src/content/articles/de/warum-sind-85-db-wichtig.md`
- `src/content/articles/de/was-ist-ein-dezibel.md`
- `src/content/articles/de/was-ist-eine-laermdosis.md`
- `src/content/articles/de/was-ist-schalldruckpegel.md`
- `src/content/articles/de/wie-lange-85-db-hoeren.md`
- `src/layouts/Base.astro`
- `src/pages/index.astro`
- `test/i18n-build.test.mjs`
- `wrangler.jsonc`

Pre-existing untracked files were enumerated with `git status --short --branch --untracked-files=all`:

- `.codex-remote-attachments/01a00091-4df5-7160-a986-637c8a887d1d/90d7d58b-9d8e-4199-851b-4f87c23873a7/1-Photo-1.jpg`
- `DBCHECK_SITE_IMPROVEMENT_AUDIT_2026-08-21.md`
- `docs/audits/dbcheck-accessibility-responsive-p1-implementation-2026-08-23.md`
- `docs/audits/dbcheck-batch-1-consent-implementation-2026-08-21.md`
- `docs/audits/dbcheck-cloudflare-404-implementation-2026-08-24.md`
- `docs/audits/dbcheck-fact-ledger-2026-08-22.csv`
- `docs/audits/dbcheck-german-math-rendering-implementation-2026-08-22.md`
- `docs/audits/dbcheck-link-ledger-2026-08-22.csv`
- `docs/audits/dbcheck-links-and-facts-audit-2026-08-22.md`
- `docs/audits/dbcheck-post-ga4-and-batch-2-implementation-2026-08-21.md`
- `docs/audits/dbcheck-production-deployment-verification-2026-08-21.md`
- `docs/owner-input/dbcheck-remaining-website-legal-information-needed.md`
- `docs/owner-input/dbcheck-website-privacy-information-needed.md`
- `output/lighthouse/dbcheck-p1/after.json`
- `output/lighthouse/dbcheck-p1/before.json`
- `output/lighthouse/dbcheck-post-ga4/run-1.json`
- `output/lighthouse/dbcheck-post-ga4/run-2.json`
- `output/lighthouse/dbcheck-post-ga4/run-3.json`
- `output/playwright/dbcheck-batch-1/after/after-first-visit-de-mobile-390.png`
- `output/playwright/dbcheck-batch-1/after/after-first-visit-desktop-1440.png`
- `output/playwright/dbcheck-batch-1/after/after-first-visit-mobile-390.png`
- `output/playwright/dbcheck-batch-1/after/after-settings-accepted-desktop-1440.png`
- `output/playwright/dbcheck-batch-1/before/before-desktop-1440.png`
- `output/playwright/dbcheck-batch-1/before/before-mobile-390.png`
- `output/playwright/dbcheck-p1/home-after.png`
- `output/playwright/dbcheck-p1/home-note-background.png`
- `output/playwright/dbcheck-p1/overflow-audit.js`
- `output/playwright/dbcheck-p1/overflow-diagnostics.js`
- `output/playwright/dbcheck-p1/site-invariants.mjs`
- `output/playwright/dbcheck-p1/tertiary-audit.js`
- `src/pages/404.astro`
- `test/accessibility-responsive-p1.test.mjs`
- `test/cloudflare-404.test.mjs`

## 4. Approved source files included

The deployed `dist/` was generated from the current HEAD plus the approved local working tree. Approved dirty production groups were:

- nine German delimiter-only article changes;
- `test/i18n-build.test.mjs` German math regression;
- accessibility/responsive source changes in the five shared components, `Base.astro` and `index.astro`;
- `test/accessibility-responsive-p1.test.mjs`;
- `Base.astro`, `src/pages/404.astro`, `wrangler.jsonc` and `test/cloudflare-404.test.mjs` for the static 404;
- GA4 removal and approved product copy already present in the branch baseline through `public/_headers`, `Base.astro`, `index.astro`, `src/i18n/ui.ts` and `test/analytics-removal.test.mjs`.

No active source/config match was found for the specified GA/GTM terms. Matches under `docs/` were historical text, and matches in `test/analytics-removal.test.mjs` were negative assertions.

## 5. Temporary and unrelated files excluded

- Cloudflare uploaded only the configured `assets.directory: ./dist`.
- `.codex-remote-attachments/`, `output/`, `.wrangler/`, audit/owner documents, editor material and local browser evidence were not inside `dist` and were not uploaded.
- The opaque JPEG attachment was preserved as unrelated owner work and was not inspected.
- `dist/` was regenerated and used as deployment output only; it was not staged or committed.
- No `.env*`, credential-named or secret-named repository file was found.
- The fresh output audit found zero `docs/` files under `dist` and no public docs route.

Candidate lock immediately before deployment:

- 171 physical files under `dist/`;
- 4,889,055 total bytes;
- ordered SHA-256 manifest: `A9E7C0E756FFF4C95116315584B4BE4BAA43B07043F7F884CC8747AE879C7A1E`.

Wrangler separately reported 238 asset paths after its routing/HTML handling and 169 physical upload/reuse assets (`63` uploaded plus `106` already uploaded).

## 6. Pre-deployment production baseline

Captured 2026-08-24 at 06:58 UTC before deployment:

- Current production version: `139f1592-5dbb-4f36-b26f-dd40cc6a832d`.
- Homepage: HTTP 200, `Content-Type: text/html`, 51,964-byte body.
- Homepage CSP was already free of GA/GTM domains.
- Fresh browser context: no GA/GTM request, no `_ga*` cookie, empty local/session storage, `window.gtag` undefined and `window.dataLayer` undefined.
- Third-party browser requests were Google Fonts only; `/cdn-cgi/trace` was same-origin.
- Unique `/__predeploy-404-check-20260824-unique/`: HTTP 404, empty body, no Content-Type and no Location.
- Sitemap: 56 URLs, 56 unique, no 404.
- Eight legacy routes: eight direct 301 responses to the existing targets.
- The approved YAMNet, dosimeter/threshold/peak, weekly summary, sound-awareness, tinnitus and final-tuning wording was already visible in production.

## 7. Check result

`npm run check` completed with exit code 0:

```text
Result (64 files):
- 0 errors
- 0 warnings
- 16 hints
```

The 16 hints are the existing 15 `astro:content` `z` deprecation hints and one inline JSON-LD script hint.

## 8. Test result

`npm test` completed with exit code 0:

```text
tests 23
pass 23
fail 0
cancelled 0
skipped 0
todo 0
duration_ms 430.6705
```

This includes analytics-removal, German math, accessibility/responsive and Cloudflare 404 regressions.

## 9. Build result

`npm run build` completed with exit code 0:

- Astro 7 built 57 pages in 3.47 seconds, including `/404.html`;
- 65 HTML files total;
- 56 indexable normal pages;
- eight noindex redirect outputs;
- one 8,832-byte noindex `404.html`;
- 56 unique sitemap canonical URLs;
- 81 normal JSON-LD blocks;
- 38 KaTeX roots, 38 MathML representations and 38 TeX annotations;
- zero raw unsupported German delimiter matches;
- zero specified GA/GTM term matches in generated output.

The build that passed these checks was deployed without another build.

## 10. Local Wrangler 404 result

Command:

```powershell
npx wrangler dev --ip 127.0.0.1 --port 8787 --local
```

Both `/__local-predeploy-404-check-20260824-a/` and `/de/__local-predeploy-404-check-20260824-b/` returned:

- HTTP 404;
- `Content-Type: text/html; charset=utf-8`;
- 8,832-byte non-empty custom HTML;
- identical SHA-256 `01B067460C670B009C798E8519B03EEFDC33B3901C35D3857538DF432CAD2EFD`;
- no Location header;
- one H1 and one main landmark;
- all English and German recovery links;
- no canonical, hreflang, JSON-LD or analytics term.

Local `/404` returned HTTP 200 with the same safe metadata state. Twelve representative valid routes returned 200 and all eight legacy routes returned their expected 301. Wrangler parsed eight redirect rules and one header rule. The server was stopped before deployment.

## 11. Deployment command

Repository evidence (`package.json`, `wrangler.jsonc`, the latest 404 report and the prior authorized deployment record) confirmed the existing production command:

```powershell
npx wrangler deploy
```

It targeted Worker `dbcheck-website`, static assets `./dist`, `workers_dev: false` and existing custom domain `dbcheck.app`. No environment override was used.

## 12. Deployment timestamp

- Command start: `2026-08-24T07:05:46.1654414Z` (`10:05:46` Europe/Helsinki).
- Command finish: `2026-08-24T07:06:12.1567597Z` (`10:06:12` Europe/Helsinki).
- Cloudflare deployment created: `2026-08-24T07:06:00.291Z`.
- Version created: `2026-08-24T07:05:58.664Z`.

## 13. Deployment ID or version

Current production version after deployment:

`0cb49559-9e5f-4c60-b8a4-b319d440ae53`

Wrangler deployment history confirmed this version at 100% after the previous `139f1592-5dbb-4f36-b26f-dd40cc6a832d` deployment.

## 14. Wrangler deployment result

- Wrangler 4.119.0 exit code: 0.
- Read: 238 asset paths from `dist`.
- Uploaded: 63 new or modified static assets.
- Reused: 106 already uploaded assets.
- Upload duration: 2.31 seconds.
- Worker upload duration: 11.96 seconds.
- Trigger deployment duration: 9.07 seconds.
- Custom domain: `dbcheck.app`.
- Production URL: `https://dbcheck.app/`.
- Warning: Wrangler 4.125.0 was available. No dependency update was made.

## 15. Production 404 results for unprefixed and `/de/` paths

Tested:

- `https://dbcheck.app/__postdeploy-404-check-20260824-a/`
- `https://dbcheck.app/de/__postdeploy-404-check-20260824-b/`

Both returned:

- HTTP 404;
- no Location header and no redirect;
- 8,832-byte non-empty body;
- byte-identical local `dist/404.html`;
- identical body SHA-256 `01B067460C670B009C798E8519B03EEFDC33B3901C35D3857538DF432CAD2EFD`;
- the same bilingual static dBcheck document;
- one H1 and one main landmark;
- all expected recovery links;
- noindex;
- no canonical, hreflang, JSON-LD or analytics term.

The primary recovery link was keyboard-focusable with a visible 2 px outline and navigated from a fresh 404 to `https://dbcheck.app/` with HTTP 200.

Mismatch: raw curl, Node Fetch, PowerShell and browser Response API consistently reported `Content-Type: text/html`, not the required `text/html; charset=utf-8`. The document itself contains `<meta charset="utf-8">`, but that does not satisfy the explicit response-header criterion.

## 16. Direct `/404` result

`https://dbcheck.app/404` returned HTTP 200 with the same 8,832-byte document. It remains:

- noindex;
- absent from sitemap;
- absent from both search indexes;
- without canonical, hreflang or JSON-LD;
- byte-identical to local `dist/404.html`.

The accepted direct-asset limitation remains unchanged.

## 17. Live GA4/GTM network result

Fresh isolated Chromium contexts tested 14 routes:

- `/`
- `/articles/`
- `/articles/what-is-a-decibel/`
- `/sounds/`
- `/sounds/concert/`
- `/tools/`
- `/tools/add-decibels/`
- `/de/artikel/`
- `/de/artikel/was-ist-ein-dezibel/`
- `/de/alltagsgeraeusche/`
- `/de/alltagsgeraeusche/konzert/`
- `/de/werkzeuge/`
- `/de/werkzeuge/dezibel-addieren/`
- `/__postdeploy-browser-404-check-20260824-c/`

Every context found:

- zero `googletagmanager.com` requests;
- zero `google-analytics.com` or regional GA requests;
- zero `/g/collect` requests;
- zero analytics beacons or ping requests;
- `window.gtag` undefined;
- `window.dataLayer` undefined.

All 56 live indexable HTML bodies and the production 404 were also searched for the specified analytics terms; no active match was found.

## 18. Live cookie and browser-storage result

For all 14 fresh route contexts:

- `_ga` cookies: 0;
- `_ga_*` cookies: 0;
- all cookies: 0;
- local storage: empty;
- session storage: empty;
- analytics/gtag/GA/consent storage keys: 0.

## 19. Live CSP and security-header result

Live CSP exactly matched `public/_headers` and contains no Google Analytics or Google Tag Manager domain:

```text
default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; media-src 'self'; connect-src 'self'; worker-src 'self'; upgrade-insecure-requests
```

Present headers:

- `Content-Security-Policy`
- `Strict-Transport-Security: max-age=7776000`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()`

The CSP remains intentionally narrow. That same policy exposes the separate KaTeX inline-font mismatch documented below.

## 20. Remaining third-party requests

The only third-party runtime origins observed in the 14-route fresh-browser matrix were:

- `https://fonts.googleapis.com` — Google Fonts stylesheet;
- `https://fonts.gstatic.com` — Google Fonts WOFF2 files.

The homepage also requests same-origin `/cdn-cgi/trace` for regional pricing and same-origin CSS, JavaScript, images and hero video. Cloudflare NEL/Report-To response metadata references `a.nel.cloudflare.com`, but no browser request to that origin was observed. The site is therefore not described as third-party-request-free.

## 21. Live product-copy verification

Normalized visible production text contains all approved statements:

- YAMNet analyzes live microphone audio on-device.
- Classifier input is not saved.
- Aggregate detection-event persistence requires its separate opt-in.
- Optional Pro WAV recording is separate and off by default.
- Raw classifier audio is not uploaded for cloud analysis.
- Phone-based NIOSH REL and OSHA PEL calculations/estimates are used.
- A configurable level threshold defaults to 85 dB.
- Extended-exposure, dose and projected-dose alerts remain distinct from the separate 120 dB peak warning.
- `Weekly noise-exposure summary` is present.
- `Sound awareness and personal hearing-result tracking for Android.` is present.
- `Tinnitus pitch profile & ambient sounds` remains in the launch presentation.
- `dBcheck for Android is in final tuning before release.` remains present.
- The site says it is not a certified sound level meter or clinical diagnostic tool.

The rejected positive strings `A real dosimeter with NIOSH REL and OSHA PEL standards`, `85 dB peak alerts`, `Weekly exposure chart & hearing health status` and `Weekly exposure analytics` are absent from normalized visible production text.

Production homepage bytes, normalized visible text, title, description, canonical, hreflang, JSON-LD and asset references exactly match local output.

## 22. Live German math verification

All nine affected German production routes returned HTTP 200 and produced the expected per-route totals:

| Route | KaTeX | MathML |
| --- | ---: | ---: |
| `/de/artikel/db-und-dba-unterschied/` | 7 | 7 |
| `/de/artikel/laermexpositionsgrenzen-deutschland-eu/` | 1 | 1 |
| `/de/artikel/sind-3-db-doppelt-so-laut/` | 6 | 6 |
| `/de/artikel/warum-ist-die-dezibelskala-logarithmisch/` | 4 | 4 |
| `/de/artikel/warum-sind-85-db-wichtig/` | 1 | 1 |
| `/de/artikel/was-ist-ein-dezibel/` | 5 | 5 |
| `/de/artikel/was-ist-eine-laermdosis/` | 3 | 3 |
| `/de/artikel/was-ist-schalldruckpegel/` | 10 | 10 |
| `/de/artikel/wie-lange-85-db-hoeren/` | 1 | 1 |
| **Total** | **38** | **38** |

Additional results:

- 17 inline plus 21 display source expressions remain represented by 38 TeX annotations;
- raw unsupported delimiter matches: 0;
- formula-body changes: 0, as locked by the delimiter regression and source diff;
- document-level formula overflow: 0 at 320 and 1440 px across all nine routes;
- intended table and KaTeX scrollers remained local.

Unresolved KaTeX resource mismatch:

- `dist/_astro/EditorialPage.Bg9jC2yE.css` contains an inlined `KaTeX_Size3` `data:font/woff2` source;
- live CSP `font-src 'self' https://fonts.gstatic.com` blocks it;
- Chromium logged `CSP_BLOCKED_DATA_FONT` on editorial pages;
- no ordinary HTTP asset request failed and no JavaScript page exception occurred, but the stricter “no failed/blocked KaTeX resource” criterion is not met.

Because the task prohibited broadening CSP and did not authorize another correction batch, no source or CSP change was made.

## 23. Live accessibility and responsive verification

The six formerly overflowing routes were tested in production at 320, 360, 390, 768 and 1440 px:

- `/tools/`
- `/de/alltagsgeraeusche/`
- `/de/werkzeuge/`
- `/de/werkzeuge/laermexpositionsrechner/`
- `/de/artikel/laermexpositionsgrenzen-deutschland-eu/`
- `/de/artikel/was-ist-schalldruckpegel/`

All 30 combinations had `documentElement.scrollWidth === clientWidth` and `body.scrollWidth === clientWidth`. Local scrollers remained local, including the 720 px overview, the Sound Explorer track, wide tables and narrow KaTeX display formulas.

Live interaction results:

- English search at 390 px: keyboard opened the dialog, focused the input, returned 12 results for `sound`, first Escape cleared the query, second Escape closed, and focus returned to `#search-open`.
- German search at 390 px: the same flow returned nine results for `Lärm`.
- Search focus outline: 2 px solid `rgb(245,245,245)`, 4 px offset, not clipped by the panel.
- 404 primary recovery link: keyboard focus produced a visible 2 px outline.
- Mobile German navigation at 320 px: keyboard open set `aria-expanded=true`, exposed a 116 px link area without overflow, and keyboard close restored `false`.
- Desktop navigation at 1440 px exposed the four expected English links.
- Sound Explorer selection: Concert became pressed and showed `85–105 dB`.
- Add Decibels: 80 dB plus 70 dB produced `80.4 dB`.
- Hero: `Listen to the film` changed to `Mute the film`, unmuted and entered `Measuring`; the second activation restored mute, `Listen to the film` and `Standby`.
- Meaningful muted text uses the live `#888` token; footer labels/meta and the hero source note computed to `rgb(136,136,136)`, with the hero note on `rgb(8,8,8)`. The fresh contrast regression passed the defined dark surfaces.
- Browser page exceptions: 0.
- Ordinary failed network requests: 0.

The editorial CSP-blocked data font is an unresolved console/resource policy error, not a JavaScript exception. The intentional top-level 404 produced Chromium's expected `Failed to load resource: 404` console entry.

No real screen-reader certification was performed. The result is Chromium keyboard, focus, responsive and DOM verification, not a full assistive-technology certification.

## 24. Live route count

- Intended indexable routes: 56.
- Production HTTP 200: 56/56.
- Missing valid routes: 0.
- Accidental indexable routes: 0.
- Every live indexable body was byte-identical to its local generated file.

## 25. Live redirect count

- Legacy redirects: 8/8 direct 301.
- Redirect chains: 0.
- Redirect target changes: 0.
- Redirect URLs in sitemap: 0.
- No valid route was captured by the 404 fallback.

## 26. Sitemap, canonical and hreflang result

- `sitemap-0.xml`: HTTP 200, 56 URLs, 56 unique.
- Sitemap URL set exactly equals local output and the 56 canonical set.
- Normal self-canonical failures: 0.
- Reciprocal locale pairs: 27.
- Paired routes: 54.
- Unpaired intended routes: 2.
- Each paired route has `en-GB`, `de-DE` and `x-default`; `x-default` equals the English route.
- Reciprocal hreflang failures: 0.
- Unique titles: 56.
- Unique descriptions: 56.
- H1-count failures: 0.
- Schema totals: 40 `Article`, 40 `BreadcrumbList`, one `WebSite`.
- Article frontmatter/date diff from the candidate source: 0.

## 27. Search-index and 404 exclusion result

- `/search.json`: HTTP 200, byte-identical to local, no `/404`.
- `/de/search.json`: HTTP 200, byte-identical to local, no `/404`.
- Sitemap contains no 404 route.
- Direct `/404` and arbitrary fallback output remain noindex.
- `robots.txt`: HTTP 200, byte-identical to local and references the sitemap index.

## 28. Local-versus-live comparison

The following live outputs are byte- or structure-identical to the exact validated local candidate:

- all 56 indexable HTML files;
- normalized visible homepage text;
- homepage title and description;
- all canonical and hreflang sets;
- all JSON-LD blocks and schema type counts;
- all key `_astro` asset references;
- sitemap URL set and sitemap bytes;
- both search JSON files;
- approved YAMNet, dosimeter/threshold/peak and weekly/hearing product copy;
- representative English article `/articles/what-is-a-decibel/`;
- representative German article `/de/artikel/was-ist-ein-dezibel/`;
- representative calculator `/tools/add-decibels/`;
- custom `404.html`.

The live CSP exactly matches the local checked-in header source. The two unresolved issues are therefore not evidence of a wrong Cloudflare project, wrong environment, stale artifact, cache, working directory error, failed asset upload or old domain binding:

- missing response-header charset is a local-Wrangler versus production-edge behavior difference;
- blocked KaTeX data font is already present in the exact candidate CSS and conflicts with the exact candidate CSP.

## 29. Every file changed during this deployment task

Persistent repository change created by this task:

- `docs/audits/dbcheck-production-deployment-verification-2026-08-24.md` — this report.

Generated deployment output:

- all 171 physical files under ignored/untracked `dist/` were regenerated by the required `npm run build`; the locked manifest is recorded in section 5. They remain generated output, not source.

Transient local verification files created and removed during this task:

- `output/playwright/dbcheck-p1/deployment-verification-browser.mjs`;
- ten `.playwright-cli/page-*.yml` snapshots created by fresh CLI sessions at `06:58:31`, `06:59:21`, `07:10:15`, `07:11:12`, `07:11:58`, `07:13:07`, `07:13:47`, `07:14:08`, `07:14:43` and `07:15:18` UTC;
- six Miniflare SQLite files under `.wrangler/state/v3/cache/miniflare-CacheObject/` and `.wrangler/state/v3/observability/miniflare-wobs-trace-store/`.

The transient Playwright files created by this task and the task-created `.wrangler/` directory were deleted after verification. The pre-existing `.playwright-cli/` directory and its older evidence were preserved. No pre-existing `output/` evidence was deleted or overwritten.

No approved production source file was edited during deployment or live verification.

## 30. Limitations and unresolved mismatches

1. **404 response Content-Type mismatch:** production returns `Content-Type: text/html`; strict acceptance required `text/html; charset=utf-8`. Body encoding is also declared by `<meta charset="utf-8">`, but the response-header requirement remains unmet. Smallest next action: separately authorize a Cloudflare-compatible response-header investigation/correction for arbitrary static-404 fallback paths, then redeploy and reverify. No Worker or global header change should be assumed without proving its scope.
2. **KaTeX data-font CSP block:** the generated editorial CSS inlines `KaTeX_Size3` as a `data:` font while CSP permits only same-origin and Google Fonts. Smallest next action: separately authorize a narrow build correction that emits this font as a same-origin asset while preserving the current CSP, then rebuild, redeploy and reverify all editorial pages. Broadening CSP was not authorized.
3. Direct `/404` remains an accepted noindex HTTP 200 asset.
4. The bilingual fallback cannot vary by original locale without additional architecture; this is accepted.
5. Existing Google Fonts remain third-party runtime requests by owner decision.
6. Wrangler 4.125.0 is available; no dependency update was authorized.
7. No real screen-reader, native Windows High Contrast matrix or browser-chrome 200% zoom certification was performed.

No rollback was performed because the deployed candidate is otherwise exact, replaces the empty production 404 with the approved non-empty body, and no rollback was authorized.

## 31. Public deployment completion status

- **Artifact deployment:** complete and live at `https://dbcheck.app/` on version `0cb49559-9e5f-4c60-b8a4-b319d440ae53`.
- **Strict requested production verification:** **not fully complete** because the explicit charset response-header criterion and no-blocked-KaTeX-resource criterion do not pass.
- **Custom 404 outcome:** the former empty production body is fixed; arbitrary missing paths retain HTTP 404 and receive the approved non-empty custom body.

The deployment must not be reported as fully successful against every requested acceptance criterion until the two separately authorized corrections are completed and verified.

## 32. Git publication confirmation

Nothing was staged, committed, pushed, merged or branched. No pull request was created or opened. Git history and the Android checkout were untouched.
