# dBcheck Cloudflare 404 implementation

Date: 2026-08-24  
Scope: original P1-5 and LNK-P2-003 only

## 1. Task scope

This task implemented and verified one branded static error document for arbitrary missing URLs. It did not implement any other P1, P2 or P3 finding. Nothing was deployed, committed, pushed, merged or branched.

## 2. Git working-tree baseline

The required pre-edit commands were run: `git status --short --branch`, `git diff --stat` and `git diff`. The branch was `feat/mittariliike...origin/feat/mittariliike`. The tracked baseline contained 17 modified files with 104 insertions and 74 deletions.

The baseline groups were kept separate as follows:

- German math: nine owner-approved article changes under `src/content/articles/de/` (`db-und-dba-unterschied.md`, `laermexpositionsgrenzen-deutschland-eu.md`, `sind-3-db-doppelt-so-laut.md`, `warum-ist-die-dezibelskala-logarithmisch.md`, `warum-sind-85-db-wichtig.md`, `was-ist-ein-dezibel.md`, `was-ist-eine-laermdosis.md`, `was-ist-schalldruckpegel.md`, `wie-lange-85-db-hoeren.md`).
- German math test: `test/i18n-build.test.mjs`.
- Accessibility and responsive source changes: `src/layouts/Base.astro`, `src/pages/index.astro`, `src/components/ArticleIndexPage.astro`, `src/components/CalculatorPage.astro`, `src/components/EditorialPage.astro`, `src/components/ExposureCalculator.astro` and `src/components/SoundExplorer.astro`.
- Accessibility test: untracked `test/accessibility-responsive-p1.test.mjs`.
- GA4 removal: already part of the branch baseline rather than a current dirty diff. Its current source/test files are `src/layouts/Base.astro`, `public/_headers` and `test/analytics-removal.test.mjs`; GA4 remained absent.
- Product-copy corrections: already part of the branch baseline rather than a current dirty diff. Their current files are `src/pages/index.astro` and `src/i18n/ui.ts`; this task did not alter their copy.
- Audit and owner-input documents: untracked root audit plus `docs/audits/` and `docs/owner-input/`, including the four reports named in the task and the two owner-input inventories.
- Generated and browser artifacts: ignored `dist/` and untracked `.codex-remote-attachments/` and `output/`. Existing attachments, Lighthouse output, Playwright output and screenshots were not edited or staged. `dist/` was regenerated only by the required build commands.
- Unrelated owner work: no additional source change could be identified beyond the approved groups above. The opaque remote attachments were preserved without inspection.

No broad formatter was run. The existing dirty work was not staged, restored or overwritten.

## 3. Current live 404 evidence

The unique request `https://dbcheck.app/__dbcheck-404-check-20260824/` returned before implementation/deployment comparison:

- status: `404 Not Found`;
- `Content-Length: 0`;
- no `Content-Type` header;
- empty body;
- no `Location` header and therefore no redirect;
- no navigation or recovery content;
- Cloudflare response headers included `Server: cloudflare`, `CF-RAY`, CSP, Permissions Policy, Referrer Policy, X-Content-Type-Options and X-Frame-Options;
- `CF-Cache-Status` was not present in the live response.

The task did not change or redeploy this public response.

## 4. Current Astro-preview behavior

Before the change, a fresh 56-page build had no `dist/404.html`. `npm run preview` nevertheless returned status 404 with a 4,323-byte generic Astro document titled `404: Not Found`. That HTML came from the preview server, not from the deployable static output.

After the change, Astro preview returned status 404, `Content-Type: text/html`, `Content-Length: 8832` and the custom `Page not found | dBcheck` body. This remains a secondary check; it does not apply Wrangler static-asset routing.

## 5. Current Cloudflare-compatible local behavior

Before the change, repository Wrangler 4.119.0 with the checked-in `wrangler.jsonc` returned `404 Not Found`, `Content-Length: 0` and an empty body for the same path. It parsed eight redirect rules and one header rule.

After the change, `npx wrangler dev --ip 127.0.0.1 --port 8787 --local` returned:

- status: `404 Not Found`;
- `Content-Type: text/html; charset=utf-8`;
- 8,832-byte custom body;
- `Cache-Control: public, max-age=0, must-revalidate`;
- an ETag;
- `CF-Cache-Status: HIT` in the local runtime;
- no `Location` header;
- the custom dBcheck H1, explanation and recovery links;
- no canonical, hreflang, JSON-LD or analytics output.

Wrangler logged that the request contained `Sec-Fetch-Mode: navigate` and used `not_found_handling` behavior. Both the unprefixed path and `/de/__dbcheck-404-check-20260824/` returned the same 404 status and byte-identical body.

## 6. Root cause of the empty production body

The site is a purely static Astro build served by Cloudflare Workers Static Assets. The current configuration had only `assets.directory: ./dist`, no Worker `main`, no `404.html` and no `assets.not_found_handling`. Astro preview substituted its own generic development response, while the actual Workers Static Assets runtime used its default unmatched-asset behavior and returned a null body. The pre-change local Wrangler result reproduced the public response exactly.

Adding `src/pages/404.astro` alone would only create a file. Workers requires the explicit `404-page` not-found mode to serve that file as the body of an arbitrary missing request while retaining HTTP 404.

## 7. Official Astro and Cloudflare documentation used

Only official implementation documentation was used:

- [Astro custom 404 error page](https://docs.astro.build/en/basics/astro-pages/#custom-404-error-page): `src/pages/404.astro` builds to `404.html`.
- [Cloudflare Astro custom 404 pages](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/#custom-404-pages): a static Astro site adds `assets.not_found_handling: "404-page"` to Wrangler configuration.
- [Cloudflare SSG and custom 404 pages](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/#custom-404-pages): unmatched assets use the nearest `404.html` and retain `404 Not Found`.
- [Wrangler assets configuration](https://developers.cloudflare.com/workers/wrangler/configuration/#assets): `not_found_handling` supports `none`, `single-page-application` and `404-page`, and defaults to `none`.

## 8. Chosen 404 architecture

The smallest verified architecture is:

1. Astro generates one root `dist/404.html` from `src/pages/404.astro`.
2. `wrangler.jsonc` sets `assets.not_found_handling` to `404-page` while keeping `assets.directory`, the custom domain and all other routing unchanged.
3. The page reuses `Base.astro` navigation, search, footer, tokens, focus treatment and responsive behavior.
4. `Base.astro` has one default-off `errorDocument` option. It adds `noindex` and omits route-specific canonical, hreflang, Open Graph/Twitter URL metadata and JSON-LD only for the error document.

No Astro adapter, Worker script, runtime framework, redirect or new dependency was added.

## 9. Why alternative approaches were rejected

- `src/pages/404.astro` without Wrangler configuration was rejected because pre-change Wrangler reproduced the empty body.
- `single-page-application` fallback was rejected because it would return `index.html` with HTTP 200 and create a soft 404.
- Redirecting missing requests to `/` or `/404` was rejected because it would discard the requested URL and violate the true-404 contract.
- A standalone hand-written `public/404.html` was rejected because it would duplicate the shared navigation, focus, typography and metadata behavior.
- A Worker solely for locale detection was rejected as disproportionate runtime architecture.
- A second nested `/de/404.html` was rejected because it would add another directly addressable locale-specific error asset and duplicate the error document. One bilingual body is sufficient and remains non-indexable.
- An `astro.config.mjs` sitemap filter was unnecessary: Astro's special 404 output was already absent from the generated sitemap, and the regression test locks that result.

## 10. Every source and configuration file changed

This task changed only:

- `src/layouts/Base.astro` — default-off error-document metadata behavior;
- `src/pages/404.astro` — new bilingual branded recovery document;
- `wrangler.jsonc` — `assets.not_found_handling: "404-page"`;
- `test/cloudflare-404.test.mjs` — focused source/build/routing regressions;
- `docs/audits/dbcheck-cloudflare-404-implementation-2026-08-24.md` — this report.

No dependency, lockfile, `astro.config.mjs`, `_headers`, `_redirects`, route registry, content or product-copy file was changed by this task.

## 11. 404 metadata behavior

Generated `404.html` has one non-empty title, one description, `lang="en"`, one H1, one main landmark and `<meta name="robots" content="noindex">`. It emits no canonical, hreflang, x-default, Open Graph/Twitter route URL, Article schema, BreadcrumbList schema, WebSite schema or any other JSON-LD. It contains no publication or review date.

The pre-change and post-change metadata manifests for all 56 normal sitemap pages were identical: title, description, canonical, hreflang set and JSON-LD. Normal schema remained 81 blocks: one WebSite plus two blocks on each of 40 editorial pages.

## 12. English and German handling

Static root fallback serves one byte-identical document for both ordinary and `/de/` missing paths. The document language is English and the German H1 fragment, explanatory paragraph and German recovery group carry `lang="de"`. It links to the required English homepage/articles/sounds/tools routes and also to the existing German articles, common-sounds and tools indexes.

Cloudflare can choose the nearest nested `404.html`, but the root fallback does not inject the original path or locale into the generated HTML. Locale-specific bodies would therefore require another error asset or runtime code. That extra architecture was not justified for this task.

## 13. Accessibility decisions

The page uses the existing skip link, header, search, main and footer. It has one H1, logical source order, ordinary anchors, no focus trap, no automatic focus movement, no countdown and no redirect. Recovery controls are at least 44 CSS px high. Text uses existing passing `--on-surface`, `--on-surface-v` and `--muted-text` tokens. Link focus uses the existing 2 px outline. Forced colors adds a system-color border to recovery controls. Reduced motion removes their only transition. The page remains complete without JavaScript.

Measured contrast ratios were 18.37:1 for the H1, 10.10:1 for English/German body copy using `--on-surface-v`, 5.65:1 for muted German recovery text, 18.69:1 for the primary recovery control and 14.94:1 for the secondary controls.

## 14. Test added or changed

`test/cloudflare-404.test.mjs` adds three focused tests. They verify the Wrangler fallback, asset existence/non-empty output, title/H1/main counts, required crawlable links, noindex and metadata/schema safety, GA4 absence from the error HTML, 56 unique sitemap URLs, exclusion from both search JSON files, 56 indexable HTML pages, exactly 65 total HTML files, and the exact eight legacy redirect definitions and outputs.

The existing German math test and the three existing accessibility/responsive tests remained separate and passed as part of the complete 23-test suite. Tests do not assert exact explanatory paragraph wording.

## 15. Cloudflare-compatible status verification

The required arbitrary missing request returned 404 with non-empty branded HTML in local Wrangler. It did not redirect, did not return 200, did not canonicalize to the homepage and did not load analytics. The direct static asset URL `/404` is addressable as a 200 asset under default HTML handling, but its document is `noindex` and absent from sitemap and search. Arbitrary missing requests remain on their original URL and receive 404.

## 16. Generated-output results

Final build output:

- 65 HTML files total;
- 56 indexable normal HTML pages;
- eight noindex redirect HTML outputs;
- one 8,832-byte noindex `dist/404.html`;
- 56 unique sitemap canonical URLs;
- 81 normal-page JSON-LD blocks;
- 38 KaTeX and 38 MathML formula outputs across the nine corrected German articles, with zero raw unsupported delimiter matches;
- zero active GA4 source/config matches;
- no new dependency or third-party runtime service.

The 404 page loaded the existing Base CSS, Base script, logo and existing Google Fonts successfully. It did not request KaTeX, `/cdn-cgi/trace`, analytics or another service.

## 17. Sitemap and search-index exclusion

The 404 document is absent from `sitemap-0.xml`, `search.json` and `de/search.json`. The final hashes remained identical to the pre-change fresh build:

- `search.json`: `00642E05E0FB5FE1C731DBFBE40F1773C91398F7B40389A59933AC66AA96B158`;
- `de/search.json`: `38E93C1141EDC16EEF2157CD1D1DE80A1EA8327EE3417759E01B44E578A06742`;
- `sitemap-0.xml`: `98B459733C8BEC978BB8AF8B26E41A9101C68FA5ABB3FB268AF1CB7052DEBC22`.

## 18. Existing route and redirect regression results

Wrangler returned 200 with HTML for `/`, `/articles/`, `/sounds/`, `/tools/`, `/de/artikel/`, `/de/alltagsgeraeusche/`, `/de/werkzeuge/`, one English article, one German article, one English calculator and one German calculator.

All eight legacy paths returned a single 301 to their unchanged targets. Wrangler parsed exactly eight valid redirect rules. No valid route was captured by the error fallback.

## 19. Browser viewport results

Playwright used Chromium against local Wrangler at 320, 360, 390, 768 and 1440 px. At every width `scrollWidth` equalled `clientWidth`; the H1 and every recovery control stayed within the viewport. Recovery controls measured 44 px high at normal zoom. Visual smoke review at 320 and 1440 px showed no clipped heading, control or page-level overflow, and the page matched the current black/dark-gray dBcheck visual language.

## 20. Keyboard, forced-colors, reduced-motion and 200 percent reflow results

- Keyboard: first Tab focused the skip link with a 2 px outline; Enter navigated to `#main`. The normal tab order reached header navigation, search and every recovery link. Enter on the recovery Articles link opened `/articles/` successfully.
- Search: keyboard activation moved focus to the existing search input; a `sound` query returned 12 results; keyboard close returned focus to the search trigger.
- Mobile navigation: at 320 px keyboard activation changed the menu to `aria-expanded="true"`, exposed a 210 px navigation area, and a second activation closed it without overflow.
- Forced colors: emulation was active; recovery controls retained a 1 px system border and the focused link retained a 2 px outline.
- Reduced motion: emulation was active; recovery-link transition duration was `0s` with no transition property.
- 200 percent reflow proxy: CSS zoom 2 at a 640 px viewport produced a 320 px-equivalent layout with no horizontal overflow or clipping.
- JavaScript disabled: the request remained 404 and retained title, one H1, one main, four primary recovery links and no horizontal overflow.
- Console/network: the only console error was Chromium's expected top-level `Failed to load resource` entry for the intentional 404 response. There was no JavaScript exception or warning. All subordinate CSS, JavaScript, logo and font requests returned 200/304; no page asset or font failed.

## 21. npm run check result

Passed: 0 errors, 0 warnings and 16 existing Astro hints. The hints are 15 `astro:content` `z` deprecation notices and one existing inline JSON-LD script notice.

## 22. npm test result

Passed: 23 tests, 0 failed, 0 skipped. This includes three new 404 tests, the German math delimiter regression, three accessibility/responsive regressions and two analytics-removal regressions.

## 23. npm run build result

Passed. Astro reported 57 built pages because it now includes `/404.html`; the indexable route set remains 56. Image optimization reused all ten cache entries and the sitemap integration completed successfully.

## 24. Remaining difference between local verification and public production

Local Astro preview and local Wrangler now serve the custom body. Public `https://dbcheck.app/` still serves the previously deployed empty 404 body because this task did not deploy. Local Wrangler applies the checked-in static-asset configuration faithfully, but it is not proof that a not-yet-deployed public version has changed.

No remote non-production preview was created. No Cloudflare account, custom-domain, DNS or dashboard setting was changed.

## 25. Exact production step still required

After separate production-deployment authorization:

1. rebuild the approved checkout with `npm run build`;
2. deploy the resulting `dist/` and checked-in `wrangler.jsonc` with `npx wrangler deploy`;
3. request a new unique missing production URL and verify 404 status, non-empty custom HTML, `Content-Type: text/html`, no redirect, no homepage canonical, no analytics and unchanged valid routes/redirects.

The production step was deliberately not run in this task.

## 26. Limitations and uncertainties

- Public production behavior remains unchanged until an authorized deployment and post-deployment live check.
- The root static fallback cannot vary its HTML by the original `/de/` prefix; one bilingual document is served everywhere.
- Direct `/404` is a 200 static-asset address under Cloudflare's default HTML handling, although it is noindex and excluded from sitemap/search. Arbitrary missing requests correctly remain 404.
- Forced colors was a Playwright emulation smoke test, not a native Windows High Contrast or screen-reader certification.
- The 200 percent check used the same CSS-zoom reflow proxy as the prior audit; it is not a full assistive-technology sign-off.
- Chromium reports the intentional top-level 404 response as a failed-resource console entry. No subordinate asset failed and no JavaScript exception occurred.
- Existing Google Fonts remain third-party font requests by prior design. No new third-party request or runtime dependency was introduced.

## 27. Confirmation that no P2/P3 follow-up was implemented

Confirmed. No hero-video, KaTeX-loading, heading-order, homepage line-break, `aria-current`, calculator wording/validation, CTA, source-title, sound-range, OSHA URL, privacy/legal, font-hosting, article, internal-link, product-copy, launch-scope, pricing, schema or Android change was implemented.

## 28. Confirmation that nothing was deployed, committed, pushed, merged or branched

Confirmed. No production or preview deployment was created. No commit, push, merge, branch or pull request was created. Temporary Astro, Wrangler and browser processes were stopped. The local `.wrangler/` state created by verification was removed from the workspace; existing owner output and attachments were preserved.
