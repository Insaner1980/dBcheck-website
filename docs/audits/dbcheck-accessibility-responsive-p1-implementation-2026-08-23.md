# dBcheck accessibility and responsive P1 implementation report

**Date:** 2026-08-23  
**Checkout:** `C:\Dev\dBcheck-website`  
**Branch:** `feat/mittariliike`  
**Production preview:** `http://127.0.0.1:4322` because an unrelated process already owned port 4321

## 1. Task scope

This batch implemented only the current, reproduced forms of main-audit findings P1-1, P1-2 and P1-4:

- meaningful small-text contrast;
- visible search-input keyboard focus;
- document-level narrow-screen overflow on the specified routes and reproducible equivalent shared layouts.

FACT-P1-001 was treated as approved owner work and verified, not edited. No 404, performance, link/fact P2, semantic P2, navigation P3, font, privacy, SEO, article, product, analytics, Android, deployment or publication work was performed.

## 2. Git working-tree baseline

Before editing, `git status --short --branch`, `git diff --stat` and the complete `git diff` were recorded. The branch was `feat/mittariliike...origin/feat/mittariliike`.

Existing modified owner work consisted of these nine German math articles:

- `src/content/articles/de/db-und-dba-unterschied.md`
- `src/content/articles/de/laermexpositionsgrenzen-deutschland-eu.md`
- `src/content/articles/de/sind-3-db-doppelt-so-laut.md`
- `src/content/articles/de/warum-ist-die-dezibelskala-logarithmisch.md`
- `src/content/articles/de/warum-sind-85-db-wichtig.md`
- `src/content/articles/de/was-ist-ein-dezibel.md`
- `src/content/articles/de/was-ist-eine-laermdosis.md`
- `src/content/articles/de/was-ist-schalldruckpegel.md`
- `src/content/articles/de/wie-lange-85-db-hoeren.md`

Their diffs contained the approved delimiter-only `\(...\)` / `\[...\]` to `$...$` / `$$...$$` changes. `test/i18n-build.test.mjs` already contained the associated math delimiter regression test. These changes were preserved.

The baseline also contained untracked `.codex-remote-attachments/`, `DBCHECK_SITE_IMPROVEMENT_AUDIT_2026-08-21.md`, `docs/` and `output/`. The existing link/fact audit, math implementation report and output evidence were preserved. No broad formatter or content rewrite was run.

Sequential baseline validation was:

- `npm run check`: exit 0, 0 errors, 0 warnings and 16 hints;
- `npm test`: 17 tests passed;
- `npm run build`: exit 0, 56 indexable pages and eight redirect outputs.

One initial test attempt was accidentally overlapped with the build. Because the build cleared `dist` while generated-HTML tests were reading it, that invalid attempt produced 11 passes and six failures. It was discarded as a harness-order error; the immediate sequential rerun after the build passed 17/17.

## 3. Issues reproduced before editing

P1-1 reproduced. Meaningful 9 to 12 px text using `--tertiary: #5E5E5E` measured only 2.513:1 to 3.089:1 on the actual dark surfaces. Baseline Lighthouse accessibility scored 0.97 and reported five contrast failures in the footer.

P1-2 reproduced. The dialog did move focus to `#search-input`, but the component rule had `outline: none`. Its remaining border change was approximately 2.59:1, below the 3:1 UI-state requirement.

Document-level overflow reproduced on six routes:

| Route | Widths | Baseline client/document/body widths | Rightmost responsible element and computed state |
|---|---:|---|---|
| `/tools/` | 320 | `320 / 329 / 329` | `.page-head` child, about 308.48 px wide from x=20 to x=328.48; `min-width:auto`, `white-space:normal`, `overflow-wrap:normal`; parent grid |
| `/de/alltagsgeraeusche/` | 320, 360, 390 | `320 / 403 / 403`, `360 / 403 / 403`, `390 / 403 / 403` | `.page-head` child, about 383.05 px wide from x=20 to x=403.05; auto minimum in the page-head grid |
| `/de/werkzeuge/` | 320 | `320 / 334 / 334` | the second `.tool-card` and its intrinsic `Lärmexpositionsrechner` child; card width 280 px but scroll extent about 313 px; grid child auto minimum |
| `/de/werkzeuge/laermexpositionsrechner/` | 320, 360, 390 | `320 / 423 / 423`, `360 / 423 / 423`, `390 / 423 / 423` | `.page-head` child, about 403.42 px wide from x=20 to x=423.42; grid child auto minimum |
| `/de/artikel/laermexpositionsgrenzen-deutschland-eu/` | 320, 360, 390 | `320 / 467 / 467`, `360 / 467 / 467`, `390 / 467 / 467` | `.editorial-head` child, about 447.48 px wide from x=20 to x=467.48; grid child auto minimum |
| `/de/artikel/was-ist-schalldruckpegel/` | 320, 360 | `320 / 366 / 366`, `360 / 366 / 366` | `.editorial-head` child, about 345.78 px intrinsic width; after that shared cause was removed, `h2#frequenzbewertungen-verändern-den-angezeigten-wert` still had a 306 px unbreakable word at 320 px, ending at x=326 |

The German calculator also exposed a second 320 px cause after its header was allowed to shrink: `.tool-calculator` contained form/result grid children about 313.55 px wide, and the `fieldset.entry-row` retained the user-agent `min-content` inline minimum.

## 4. Older findings no longer reproducible

None of the two older P1-4 route findings had gone stale. Both `/de/alltagsgeraeusche/` and `/de/werkzeuge/laermexpositionsrechner/` reproduced. Both routes named by the newer math report also reproduced. The five clean known routes were `/`, `/articles/`, `/sounds/`, `/de/artikel/` and all tested routes at 768 and 1440 px. `/tools/` and `/de/werkzeuge/` were newly confirmed equivalents of the same shared intrinsic-width problem.

The following apparent protrusions were correctly classified as non-defects:

- the 720 px overview image inside `.overview-scroll`;
- the Sound Explorer scale and markers inside `.sound-scale`;
- the 548.08 px table header inside a table with local `overflow-x:auto`;
- display math inside `.katex-display` with local scrolling;
- visually hidden one-pixel `.katex-mathml` whose semantic descendants have larger diagnostic rectangles;
- the off-canvas skip link while it is not focused.

## 5. Meaningful tertiary-text usage inventory

| Location | Classification | Treatment |
|---|---|---|
| Footer labels, copyright, owner link and qualification | meaningful metadata / limitation text | moved to `--muted-text` |
| Search scale and result-kind labels | meaningful supporting copy / metadata | moved to `--muted-text` |
| Hero HUD min/avg/max and film source note | meaningful data / source-context label | moved to `--muted-text`; source note also received a local opaque `--bg` backing because the video below it varied from measured RGB 20 to 88 |
| Article index publication dates | meaningful metadata | moved to `--muted-text` |
| Editorial eyebrow and sound-summary labels | meaningful metadata / source context | moved to `--muted-text` |
| Exposure calculator scale, model note and no-script note | meaningful data labels / limitation text | moved to `--muted-text` |
| Sound Explorer scale, category, range key and disclaimer | meaningful data labels / disclaimer | moved to `--muted-text` |
| Pricing notes, tool explanations, search label/empty text and normal explanatory copy | meaningful text already using `--secondary` or `--on-surface-v` | unchanged; existing combinations passed |
| Breadcrumb separators and why-card plus sign | non-text decoration | retained `--tertiary` |
| Hero record dot | non-text status decoration with a separately named textual state | retained `--tertiary` |
| ExposureRail labels/ticks | decorative graphic inside an `aria-hidden` component | retained `--tertiary` |
| Tool sequence numbers | decorative and `aria-hidden` | retained `--tertiary` |
| Disabled number-stepper buttons | disabled controls | retained `--tertiary` plus existing disabled opacity |

No component-local duplicate of `#5E5E5E` was found. Decorative and meaningful uses did prove that one semantic split was necessary; no larger token system was added.

## 6. Contrast ratios before changes

WCAG relative-luminance calculations for `#5E5E5E` were:

| Foreground / background | Ratio |
|---|---:|
| `#5E5E5E` / `#080808` | 3.089:1 |
| `#5E5E5E` / `#101010` | 2.935:1 |
| `#5E5E5E` / `#171717` | 2.765:1 |
| `#5E5E5E` / `#202020` | 2.513:1 |

None meets 4.5:1 for the rendered normal-size text. Lighthouse independently measured the footer pair as 3.08:1 and reported five failing nodes.

## 7. Exact contrast implementation

`src/layouts/Base.astro` now defines `--muted-text: #888888`. Only proven meaningful uses were redirected to it. `--tertiary: #5E5E5E` remains the decorative/disabled role.

The hero film source label needed one additional local rule: `background: var(--bg)`. Without it, the semitransparent HUD placed the 9 px meaningful source text over a moving backdrop with measured pixels up to RGB 88, so no single subordinate gray could guarantee 4.5:1. The HUD/card background, film, typography and decorative graphics were not changed.

## 8. Contrast ratios after changes

| Foreground / actual defined meaningful surface | Ratio |
|---|---:|
| `#888888` / `#080808` | 5.650:1 |
| `#888888` / `#101010` | 5.368:1 |
| `#888888` / `#171717` | 5.057:1 |
| `#888888` / `#202020` | 4.596:1 |

`#2A2A2A` would be 4.049:1, so it was not accepted as a meaningful muted-text surface; the browser inventory found no such use. The hero source note now computes to `rgb(136,136,136)` on `rgb(8,8,8)`, or 5.650:1.

After Lighthouse accessibility scored 1.00 with zero failing accessibility audits and a passing color-contrast audit. Heading-order and one-main-landmark audits remained passing.

## 9. Search focus defect and correction

The more specific `#search-input { outline:none; }` was removed. The existing shared rule now applies a 2 px solid `#F5F5F5` focus-visible outline with a 4 px offset. Its contrast is 17.453:1 against input `#101010` and 16.444:1 against panel `#171717`. At 390 px the input and its four-pixel-offset outline remained inside the panel and were not clipped.

No permanent border, dialog redesign or Escape-handler change was introduced.

## 10. Search keyboard-flow results

English and German passed the same keyboard-only flow at 390 px:

1. Tab reached the Search/Suchen trigger and Enter opened the dialog.
2. Focus moved to `#search-input`.
3. Typing `sound` produced 12 English results; typing `Lärm` produced nine German results.
4. Result links and the Close search/Suche schließen control were reachable by Tab.
5. The first Escape with non-empty native search input cleared it and left the dialog open.
6. The second Escape closed the dialog.
7. Focus returned to `#search-open` with the localized accessible label.
8. Activating the close control with Enter also closed the dialog and returned focus.

The same focus movement, visible outline and return passed in the 200% reflow-equivalent check.

## 11. Routes with reproduced page-level overflow

Page-level overflow was reproduced on:

- `/tools/`
- `/de/alltagsgeraeusche/`
- `/de/werkzeuge/`
- `/de/werkzeuge/laermexpositionsrechner/`
- `/de/artikel/laermexpositionsgrenzen-deutschland-eu/`
- `/de/artikel/was-ist-schalldruckpegel/`

The first five known routes listed in section 4 remained clean before editing.

## 12. Exact overflowing element and root cause per route

The baseline rectangles and computed ownership are in section 3. The root causes were:

- `.page-head` and `.editorial-head` grid children kept the default `min-width:auto`, so German and one English long heading established a wider intrinsic grid track;
- `.tool-card` children had the same auto-minimum behavior;
- the daily calculator's direct grid children and `fieldset.entry-row` retained min-content minimums after the outer heading was fixed;
- one prose `h2` contained `Frequenzbewertungen`, which ordinary German line breaking could not split at 280 px content width.

All responsible text had `white-space:normal` and `overflow-wrap:normal` before the correction. No fixed viewport-width value, formula, table or editorial link was the root cause.

## 13. Exact responsive correction per route

`Base.astro` now gives `.page-head`, `.editorial-head`, `.tool-card` and their direct children `min-width:0`. Kicker, heading, paragraph and tool-link text inside those contexts use `overflow-wrap:break-word`.

`CalculatorPage.astro` gives `.tool-calculator > *` and `.entry-row` `min-width:0`, allowing the existing responsive one-column grids to shrink naturally.

`EditorialPage.astro` gives prose `h2` and `h3` `overflow-wrap:break-word`. No `overflow-wrap:anywhere`, `word-break`, manual hyphen, smaller type, document clipping or body overflow hiding was used.

These shared, narrow rules correct every route in section 11 without route-specific copy changes.

## 14. Routes tested and viewport matrix

Each cell is `documentElement.clientWidth / documentElement.scrollWidth / body.scrollWidth` after the changes.

| Route | 320 | 360 | 390 | 768 | 1440 |
|---|---|---|---|---|---|
| `/` | `320/320/320` | `360/360/360` | `390/390/390` | `768/768/768` | `1440/1440/1440` |
| `/articles/` | `320/320/320` | `360/360/360` | `390/390/390` | `768/768/768` | `1440/1440/1440` |
| `/articles/what-is-sound-pressure-level/` | `320/320/320` | `360/360/360` | `390/390/390` | `768/768/768` | `1440/1440/1440` |
| `/sounds/` | `320/320/320` | `360/360/360` | `390/390/390` | `768/768/768` | `1440/1440/1440` |
| `/tools/` | `320/320/320` | `360/360/360` | `390/390/390` | `768/768/768` | `1440/1440/1440` |
| `/de/artikel/` | `320/320/320` | `360/360/360` | `390/390/390` | `768/768/768` | `1440/1440/1440` |
| `/de/alltagsgeraeusche/` | `320/320/320` | `360/360/360` | `390/390/390` | `768/768/768` | `1440/1440/1440` |
| `/de/werkzeuge/` | `320/320/320` | `360/360/360` | `390/390/390` | `768/768/768` | `1440/1440/1440` |
| `/de/werkzeuge/laermexpositionsrechner/` | `320/320/320` | `360/360/360` | `390/390/390` | `768/768/768` | `1440/1440/1440` |
| `/de/artikel/laermexpositionsgrenzen-deutschland-eu/` | `320/320/320` | `360/360/360` | `390/390/390` | `768/768/768` | `1440/1440/1440` |
| `/de/artikel/was-ist-schalldruckpegel/` | `320/320/320` | `360/360/360` | `390/390/390` | `768/768/768` | `1440/1440/1440` |

At 320 px, the intended overview image remained x=21 to x=741 in a local scroller with client/scroll widths 278/720. The intended German table remained x=20.5 to x=568.58 in a local table scroller with client/scroll widths 280/549. Sound Explorer and KaTeX local behavior also remained functional.

Browser interactions additionally passed for desktop/mobile navigation, Sound Explorer selection, the German calculator and the hero Listen to the film / Mute the film toggle.

## 15. 200 percent zoom results

Headless Chromium does not expose browser-chrome zoom through Playwright keyboard input. Reflow was therefore tested at the mathematically equivalent CSS viewports:

- physical 768 px at 200%: 384 CSS px;
- physical 1440 px at 200%: 720 CSS px.

All ten required routes measured exact client/document/body widths of 384/384/384 and 720/720/720 respectively. English and German search at the 384 px equivalent retained an unclipped 2 px focus outline and returned focus after close. No control or document-level overflow was observed. This is a reflow-equivalent automation result, not an independent test of Chrome's browser-chrome zoom UI.

## 16. Forced-colors results

Playwright's Chromium forced-colors emulation passed in both languages. The input retained a solid 2 px system outline, computed as `rgb(55,0,110)` on a white system input/panel, 15.134:1. `forced-color-adjust:auto` remained in effect, the outline was not clipped, and focus returned to the localized trigger. This is an emulation smoke test, not coverage of every Windows high-contrast theme.

Reduced-motion emulation also passed: the search panel animation computed to `none`, root scrolling to `auto`, focus still moved correctly and the dialog closed normally.

## 17. German math regression verification

The nine owner-modified files still contain 17 inline and 21 display expressions, total 38. Current source contains zero unsupported `\(`, `\)`, `\[` or `\]` delimiters.

Every formula body was compared in order against the HEAD version after removing only old/new delimiters; all 38 bodies are identical. The final production build contains exactly:

- 38 source expressions;
- 38 KaTeX roots;
- 38 MathML `<math>` representations;
- 38 `application/x-tex` annotations.

The existing `.katex-display` local-scroll rule remains unchanged. No math source file was edited in this batch.

## 18. Source files changed in this batch

- `src/layouts/Base.astro`
- `src/pages/index.astro`
- `src/components/ArticleIndexPage.astro`
- `src/components/CalculatorPage.astro`
- `src/components/EditorialPage.astro`
- `src/components/ExposureCalculator.astro`
- `src/components/SoundExplorer.astro`

The nine math articles and `test/i18n-build.test.mjs` were pre-existing owner changes and were not changed by this batch.

Validation evidence was generated under `output/lighthouse/dbcheck-p1/` and `output/playwright/dbcheck-p1/`; those parent output paths were already untracked at baseline.

## 19. Tests changed or added

Added `test/accessibility-responsive-p1.test.mjs` with three focused tests covering:

- `--muted-text` contrast against all defined meaningful dark surfaces plus the hero source-label backing;
- the search input retaining the shared visible focus-visible outline and not declaring `outline:none`;
- shared heading/card shrink/wrap behavior, calculator fieldset shrinking and prose-heading wrapping.

The pre-existing German math delimiter test in `test/i18n-build.test.mjs` was preserved.

## 20. `npm run check` result

Final exit code 0. Astro reported 62 files, 0 errors, 0 warnings and 16 existing hints. The hints are the existing Astro content `z` deprecation messages and the existing inline JSON-LD script hint.

## 21. `npm test` result

Final exit code 0: 20 tests passed, 0 failed, 0 skipped, 0 cancelled. Duration was 714.6477 ms. The total increased from 17 to 20 because this batch added three focused tests.

## 22. `npm run build` result

Final exit code 0. Astro built 56 pages in 3.07 seconds and generated `sitemap-index.xml`. The output audit found 64 `index.html` files: 56 indexable pages and eight legacy redirect documents.

## 23. Route, redirect, canonical, hreflang, sitemap and schema results

Final generated-output and preview checks found:

- all 56 sitemap routes returned HTTP 200 from the local production preview;
- exactly 56 unique canonical URLs;
- exactly 56 sitemap URLs, with the same set as the canonicals;
- exactly eight existing redirect outputs and no added redirect;
- 54 `en-GB`, 54 `de-DE` and 54 `x-default` alternate entries, matching the existing 27 paired routes;
- unchanged schema type totals: 40 `Article`, 40 `BreadcrumbList` and one `WebSite`;
- every indexable output retained one title, one description, one H1 and one canonical;
- no route was added or removed.

## 24. Content and metadata preservation

Diff inspection found no batch change to article text, formula body, frontmatter, date, internal link, source link, URL, route registry, canonical, hreflang, sitemap configuration, schema or calculator formula. Dedicated searches found no added/removed source URL, Markdown link or frontmatter field in the nine owner-modified math files. GA4 remains absent, and the existing product-copy and launch-scope decisions remain unchanged.

## 25. Remaining P1 findings not implemented

P1-3 / FACT-P1-001 was already completed and only verified here. Main-audit P1-5, the production 404 body, and P1-6, mobile hero LCP/video performance, remain intentionally unimplemented and out of scope.

## 26. Remaining P2 and P3 findings not implemented

All main-audit P2 findings remain untouched: stale Noise Dose wording/link, `in final tuning before release`, conditional KaTeX loading, sound-index heading order, stale root `PROJECT.md` and homepage `<br>` accessibility spacing. P3 navigation `aria-current` remains untouched.

All link/fact audit follow-ups remain untouched: LNK-P2-001, LNK-P2-002, LNK-P2-003, EXT-P2-001, FACT-P2-001, FACT-P2-002 and EXT-P3-001. No privacy, font, analytics, SEO, article, product, Android or deployment work was performed.

## 27. Limitations and uncertainties

- No real screen reader was used, so this report does not claim full screen-reader compliance.
- The 200% result uses exact reflow-equivalent CSS viewports because headless Playwright cannot alter browser-chrome zoom; actual browser UI zoom was not independently exercised.
- Forced colors used Chromium's emulated default forced-color palette, not every user-configurable Windows theme.
- Lighthouse was run on the homepage in headless Chromium. The baseline report was valid, but its CLI process initially returned a Windows temporary-directory cleanup `EPERM`; the saved report still parsed and contained the stated measurements. The final Lighthouse run exited 0.
- Local preview requests `/cdn-cgi/trace` for regional pricing and receives the same expected local 404 seen at baseline because the Cloudflare endpoint is absent locally. This was the only console error. There were no page errors, failed requests, or failed font/KaTeX asset requests.
- No live deployment comparison was required or performed.

## 28. Publication confirmation

Nothing was deployed, committed, pushed, merged or branched. No pull request was created. The temporary Playwright browser and local preview used for this report were stopped after validation.
