# dBcheck.app production deployment and live verification

Päiväys: 2026-08-21  
Tuotanto: `https://dbcheck.app/`  
Lähdebranch: `feat/mittariliike`  
Lähdecommit: `bdf690bb711e5c3208659f3dcd7d6f89b1475219`  
Cloudflare Version ID: `139f1592-5dbb-4f36-b26f-dd40cc6a832d`  
Cloudflare-version luotu: `2026-08-21T19:22:26.521Z` (`2026-08-21T22:22:26.521+03:00`)  
Tulos: hyväksytty paikallinen candidate julkaistiin ja live-sivusto vastaa sitä.

## 1. Task scope

Tehtävä julkaisi vain aiemmin hyväksytyn GA4-poiston sekä P0-2-, P0-3- ja P0-4-copy-korjaukset. Uutta auditointibatchia ei aloitettu. P0-5 ja P2-2 jätettiin omistajan päätöksen mukaisesti toteuttamatta. GA4:ää, korvaavaa analytiikkaa tai consent-järjestelmää ei lisätty.

Ennen Git- tai deployment-toimia luettiin kokonaan:

- `DBCHECK_SITE_IMPROVEMENT_AUDIT_2026-08-21.md`
- `docs/audits/dbcheck-post-ga4-and-batch-2-implementation-2026-08-21.md`

## 2. Pre-deployment Git status

Alkuperäinen tila:

```text
## feat/mittariliike...origin/feat/mittariliike
 M public/_headers
 M src/i18n/ui.ts
 M src/layouts/Base.astro
 M src/pages/index.astro
?? .codex-remote-attachments/
?? DBCHECK_SITE_IMPROVEMENT_AUDIT_2026-08-21.md
?? docs/
?? output/
?? test/analytics-removal.test.mjs
```

Alkuperäinen tracked-diff:

```text
public/_headers        |  2 +-
src/i18n/ui.ts         |  2 +-
src/layouts/Base.astro |  8 --------
src/pages/index.astro  | 28 ++++++++++++++++------------
4 files changed, 18 insertions(+), 22 deletions(-)
```

`git fetch origin` varmisti, ettei `origin/feat/mittariliike` ollut paikallista branchia edellä. Ennen committia divergence oli `0 0`. `main` jätettiin koskematta.

## 3. Intended deployment files

Deployattava ja commitoitu kokonaisuus rajattiin viiteen tiedostoon:

- `public/_headers`: GA/GTM-oikeudet pois CSP:stä, Google Fonts -oikeudet ennallaan.
- `src/layouts/Base.astro`: GA4 measurement ID, loader, `dataLayer`, `gtag()` ja config-kutsu pois.
- `src/pages/index.astro`: P0-2-, P0-3- ja P0-4-copy-korjaukset.
- `src/i18n/ui.ts`: footerin P0-4-copy.
- `test/analytics-removal.test.mjs`: kaksi negatiivista GA4-/consent-regressiotestiä.

## 4. Excluded dirty and generated files

Seuraavia ei staged, commitoitu tai deployattu lähdetiedostoina:

- `.codex-remote-attachments/`
- `DBCHECK_SITE_IMPROVEMENT_AUDIT_2026-08-21.md`
- `docs/audits/dbcheck-batch-1-consent-implementation-2026-08-21.md`
- `docs/audits/dbcheck-post-ga4-and-batch-2-implementation-2026-08-21.md`
- `docs/owner-input/dbcheck-remaining-website-legal-information-needed.md`
- `docs/owner-input/dbcheck-website-privacy-information-needed.md`
- `output/lighthouse/dbcheck-post-ga4/*.json`
- `output/playwright/dbcheck-batch-1/**`
- generoitu ja Git-ignored `dist/`
- olemassa oleva `.playwright-cli/`-aineisto

`git ls-files docs` ja `git ls-files output` olivat tyhjiä. Repossa ei siis ollut versionoitujen `docs/`- tai `output/`-tiedostojen käytäntöä, joten raportti- ja owner-input-tiedostot jätettiin commitoimatta. Tämän tehtävän vaadittu raportti luotiin silti tähän polkuun ja jätettiin untracked-tilaan.

Salaisuus-/credential-ehdokkaita tai `.env*`, private key- tai credential-tiedostoja ei löytynyt deployattavasta kokonaisuudesta.

## 5. Final staged diff

```text
public/_headers                 |  2 +-
src/i18n/ui.ts                  |  2 +-
src/layouts/Base.astro          |  8 --------
src/pages/index.astro           | 28 ++++++++++++++++------------
test/analytics-removal.test.mjs | 24 ++++++++++++++++++++++++
5 files changed, 42 insertions(+), 22 deletions(-)
```

`git diff --cached --check` läpäisi. Staged-listassa ei ollut ylimääräistä eikä yhtään odotettua tiedostoa puuttunut. Täydellinen staged-diff tarkastettiin ennen committia. Diffissä ei ollut artikkeli-, URL-, päivämäärä-, schema-, fontti-, dependency-, laskuri-, app-koodi- tai salaisuusmuutosta.

## 6. Commit hash and branch

- Branch: `feat/mittariliike`
- Commit: `bdf690bb711e5c3208659f3dcd7d6f89b1475219`
- Commit message: `Poista GA4 ja korjaa tuoteväitteet`
- Push: `origin/feat/mittariliike`, onnistui
- Pushin jälkeen paikallinen ja remote-branch olivat samassa commitissa; divergence `0 0`.

## 7. Deployment mechanism

Repositorion todettu tuotantopolku on Astro static build + Wrangler Workers static assets. `wrangler.jsonc` määrittää Worker-nimen `dbcheck-website`, asset-hakemiston `./dist` ja custom domainin `dbcheck.app`. GitHub-push ei yksin deployaa tuotantoon.

Käytetty Wrangler-versio oli repositorion `4.119.0`. Konfiguraatiota, Cloudflare-account-asetuksia, DNS:ää, domaineja, bindingeja, environment-muuttujia tai secrettejä ei muutettu.

## 8. Exact deployment command or workflow

```powershell
npm run check
npm test
npm run build
npx wrangler deploy --dry-run
npx wrangler deploy
```

Dry-run luki `dist`-assetit, raportoi `No bindings found` ja poistui onnistuneesti. Varsinainen deploy latasi 56 uutta tai muuttunutta staattista assetia ja käytti 112 jo olemassa ollutta assetia.

## 9. Deployment identifier

- Production URL: `https://dbcheck.app/`
- Worker: `dbcheck-website`
- Cloudflare Version ID: `139f1592-5dbb-4f36-b26f-dd40cc6a832d`
- Cloudflare Created: `2026-08-21T19:22:26.521Z`
- Source commit: `bdf690bb711e5c3208659f3dcd7d6f89b1475219`
- Build identifier: SHA-256-manifesti `295ad56cbcedb1cf6aa804624ffa5cd6ecc5388b212f80eb2b9bc750a53e1376`
- Deployment-komennon aikaväli: `2026-08-21T22:22:07.941+03:00` – `2026-08-21T22:22:42.202+03:00`

Manifestihash laskettiin tuoreen buildin 170 fyysisen tiedoston järjestetystä polku- ja SHA-256-listasta. Hash tarkastettiin uudelleen commitin jälkeen ennen deployta, eikä se muuttunut.

## 10. Pre-deployment check, test and build results

`npm run check`:

```text
Result (57 files):
- 0 errors
- 0 warnings
- 16 hints
```

Hintit olivat olemassa olevia Astro/Zod-deprecation- ja explicit-inline-huomautuksia. Komento päättyi exit code 0:lla.

`npm test`:

```text
tests 16
pass 16
fail 0
```

`npm run build`:

```text
Astro 7.1.6
56 page(s) built
Build complete
```

Tuoreesta `dist`-hakemistosta tai deployattavasta lähteestä ei löytynyt measurement ID:tä, GA/GTM-domainia, `gtag`-alustusta, `dataLayer`ia, `_ga`-implementaatiota, Consent Modea, analytics feature flagia tai analytics environment-outputia.

## 11. Final route and redirect counts

Paikallinen generated-output:

```text
HTML files: 64
Indexable HTML: 56
Redirect outputs: 8
Sitemap URLs: 56 (56 unique)
Unique titles: 56
Unique descriptions: 56
Orphaned indexable routes: 0
Failures: 0
```

Mekaaninen tarkistus kävi läpi 1 076 sisäistä linkkiä, 241 fragmenttilinkkiä ja 196 assettiviittausta. Rikkinäisiä linkkejä, fragmentteja tai assettiviittauksia ei löytynyt.

## 12. Final local browser verification

Puhdas Astro production preview ajettiin osoitteessa `http://127.0.0.1:4323`.

- Leveydet: 360, 390, 768 ja 1440 px.
- Reitit: kaikki tehtävässä nimetyt 11 reittiä.
- Navigointeja: 44.
- HTTP 200: 44/44.
- Document-level horizontal overflow: 0/44.
- H1: täsmälleen yksi jokaisella sivulla.
- Puuttuva lopullinen copy: 0.
- GA/GTM network request: 0.
- `_ga*`-evästeet: 0.
- local/session storage: tyhjät.
- `window.gtag` ja `window.dataLayer`: `undefined`.

Desktop- ja mobile-navigaatio, EN/DE-haku, kielenvaihto, hero-video, Listen/Mute, Sound Explorer, Add Decibels, NIOSH-altistuslaskuri, reduced motion ja save-data läpäisivät. Paikallisen previewn ainoa console-havainto oli hyväksytty `/cdn-cgi/trace`-404; preview ei emuloi Cloudflaren reittiä. Preview- ja Playwright-prosessit suljettiin.

## 13. Live GA/GTM network verification

Uusi selainkonteksti ilman dBcheck-evästeitä tai tallennusta navigoi kaikki 11 vaadittua live-reittiä. Se kirjasi 152 runtime-pyyntöä.

- `www.googletagmanager.com`: 0
- `www.google-analytics.com`: 0
- `region1.google-analytics.com`: 0
- muut GA collection -endpointit: 0
- `gtag.js`: 0
- GA page-view/event request: 0
- analytics beacon: 0

Lisäksi jokaisen 56 sitemap-reitin live-HTML haettiin ja tarkastettiin aktiivisten analytics-tunnisteiden varalta. Osumia oli 0.

## 14. Live cookie and browser-storage verification

Puhtaassa 11 reitin live-kontekstissa:

- kaikki cookies: 0
- `_ga`: 0
- `_ga_*`: 0
- local storage: tyhjä
- session storage: tyhjä
- analytics-/consent-tallenne: ei
- `window.gtag`: `undefined`
- `window.dataLayer`: `undefined`

Sama tila säilyi toiminnallisten smoke-testien jälkeen.

## 15. Live CSP and security-header verification

Kaikilla 11 tarkistetulla reitillä oli sama CSP:

```text
default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; media-src 'self'; connect-src 'self'; worker-src 'self'; upgrade-insecure-requests
```

CSP ei sisällä Google Tag Manageria, Google Analyticsia, region1 collectionia tai muuta analytics-spesifiä oikeutta. Google Fonts -oikeudet säilyivät tarkoituksella.

Muut vahvistetut headerit:

- `Strict-Transport-Security: max-age=7776000`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()`

## 16. Remaining third-party requests

Live-selain havaitsi vain seuraavat seitsemän kolmannen osapuolen runtime-pyyntöä:

1. `https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Instrument+Sans:wght@400..700&display=swap`
2. `https://fonts.gstatic.com/s/instrumentsans/v4/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr0SZe1Q.woff2`
3. `https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3pQPwlBFgg.woff2`
4. `https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1i8q1w.woff2`
5. `https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3vAOwlBFgg.woff2`
6. `https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJwlBFgg.woff2`
7. `https://fonts.gstatic.com/s/instrumentsans/v4/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr0She1YmV.woff2`

Muita kolmannen osapuolen runtime-pyyntöjä ei havaittu. Google Fontsia ei luokiteltu Google Analyticsiksi.

## 17. Google Fonts status

Google Fonts pysyy ulkoisesti hostattuna omistajan päätöksen mukaisesti. Fonttiperheitä, fonttilatausta, preconnecteja, Google Fonts -CSP-oikeuksia tai fonttiassetteja ei muutettu.

## 18. Live P0-2, P0-3 and P0-4 copy verification

Tuotannossa vahvistettiin:

- YAMNet analysoi live-mikrofoniaudiota.
- Classifier inputia ei tallenneta.
- Aggregate detection-event persistence on erillinen opt-in.
- Pro WAV -tallennus on erillinen ja oletuksena pois.
- Raw classifier audioa ei ladata cloud-analyysiin.
- Dosimeter kuvataan puhelinpohjaisina laskelmina/estimaatteina, ei aitona tai sertifioituna dosimetrina.
- 85 dB on configurable level threshold, ei peak warning.
- Erillinen peak warning on 120 dB.
- Weekly aggregate on noise-exposure summary, ei hearing-health status.
- Laajempi kuvaus käyttää sound awareness- ja personal hearing-result tracking -rajausta.

Vanhat ilmaukset `without recording audio`, `A real dosimeter`, `85 dB peak alerts`, `hearing health status` ja `hearing health companion` puuttuvat tuotantoetusivulta.

## 19. P0-5 and P2-2 remain intentionally unimplemented

Tuotannossa säilyivät omistajan päätöksen mukaisesti:

- `Tinnitus profile & ambient sounds`
- `Tinnitus pitch profile & ambient sounds`
- tinnitus pitch profile ja ambient sounds kuvataan erillisinä toimintoina saman feature-ryhmän tekstissä
- `in final tuning before release`

Hylättyjä P0-5- tai P2-2-muutoksia ei palautunut deployhin.

## 20. Live metadata and JSON-LD verification

Etusivun live-metadata:

- title: `dBcheck: sound information, tools and an Android sound meter`
- description, Open Graph description ja Twitter description: `Explore common sound levels, free educational tools and dBcheck for Android: a personal sound awareness and hearing-result tracking app.`
- WebSite JSON-LD description: `dBcheck is an Android sound awareness app with educational sound tools.`

Kaikki 56 live-HTML-runkoa olivat tavutasolla identtisiä validoidun paikallisen buildin kanssa. Schema-tyypit pysyivät:

- `WebSite`: 1
- `Article`: 40
- `Organization`: 40
- `BreadcrumbList`: 40
- `ListItem`: 120

## 21. Live route, canonical, hreflang, sitemap, robots and redirect verification

- 56/56 indexoitavaa reittiä: HTTP 200.
- Live-sitemap: 56 URL:ia, kaikki uniikkeja ja täsmälleen sama setti kuin paikallisesti.
- Self-canonical: 56/56.
- Uniikki title: 56/56.
- Uniikki description: 56/56.
- Yksi H1: 56/56.
- Accidental `noindex`: 0.
- Hreflang: 54 paritettua sivua, vastavuoroiset `en-GB`, `de-DE` ja `x-default`.
- Tarkoituksella parittomat sivut: `/` ja `/tools/noise-dose-calculator/`.
- `robots.txt`: HTTP 200 ja oikea sitemap-direktiivi.
- Kahdeksan legacy-redirectiä: jokainen yhden hypyn HTTP 301 oikeaan HTTP 200 -kohteeseen.
- Redirecttejä sitemapissa: 0.
- Orphaned indexable routes: 0.
- Rikkinäiset sisäiset linkit tai fragmentit: 0 paikallisessa täsmälleen vastaavassa outputissa.

Artikkelilähteitä, `publishedAt`-/`lastReviewed`-päiviä, reittirekisteriä tai schema-strategiaa ei muutettu. Live-HTML:n täydellinen yhtäsuuruus paikalliseen buildiin vahvistaa, ettei deploy muokannut niitä.

## 22. Live functional smoke-test results

Kaikki seuraavat läpäisivät tuotannossa:

- desktop navigation
- English mobile navigation
- German mobile navigation
- English search (`concert` → `/sounds/concert/`)
- German search (`Konzert` → `/de/alltagsgeraeusche/konzert/`)
- locale switch English → German
- hero-video: desktop MP4, ready state 4 ja autoplay käynnissä mykistettynä
- Listen: ääni päälle ja `Mute the film`
- Mute: ääni pois ja `Listen to the film`
- Sound Explorer: Concert → `85–105 dB`
- Add Decibels: 80 + 80 = 83.0 dB; kolmas 80 = 84.8 dB
- NIOSH exposure calculator: 85 dBA = 8 hours
- reduced motion: video ei lataudu, exposure rail piilossa ja reveal-duration 0 s
- save-data: video ei lataudu ja poster säilyy
- failed HTTP asset request: 0

## 23. Unknown-route 404 result

`https://dbcheck.app/not-a-real-page-deploy-20260821/` palautti:

- status: HTTP 404
- body: 0 tavua
- content type: puuttuu

Tuntemattoman reitin oikea 404-status säilyi, mutta tunnettu P1-havainto tyhjästä body-rungosta on edelleen avoin. Sivua ei redirectattu etusivulle eikä soft-404:ksi.

## 24. Local-versus-production comparison

Vertailu tehtiin validoidun `dist`-buildin ja live-tuotannon välillä:

- 56/56 HTML-bodya tavutasolla identtisiä.
- 56/56 normalized visible text -vertailua identtisiä.
- title, description, canonical, hreflang, JSON-LD ja asset references identtisiä.
- `/search.json`: HTTP 200, 33 entryä, tavutasolla identtinen.
- `/de/search.json`: HTTP 200, 31 entryä, tavutasolla identtinen.
- sitemap-setit identtiset.
- live-CSP vastaa `public/_headers`-candidatea ja on analytics-domainiton.
- lopullinen P0-2/P0-3/P0-4-copy, tinnitus-copy ja release-copy identtisiä.

Wrong branch-, wrong artifact-, failed deploy-, stale deployment-, cache- tai external injection -eroa ei havaittu. Cache purgea ei tehty.

## 25. Every file changed during this task

Tämän tehtävän aikana ei tehty uusia lähdekoodimuutoksia hyväksyttyyn dirty workiin. Seuraavat aiemmin hyväksytyt tiedostot staged, commitoitiin, pushattiin ja deployattiin:

- `public/_headers`
- `src/i18n/ui.ts`
- `src/layouts/Base.astro`
- `src/pages/index.astro`
- `test/analytics-removal.test.mjs`

Tämän tehtävän uusi tiedosto:

- `docs/audits/dbcheck-production-deployment-verification-2026-08-21.md` — tämä raportti, untracked.

`npm run build` regeneroi Git-ignored `dist/`-hakemiston. Playwright CLI loi viisi tämän ajon väliaikaista `.playwright-cli`-logi-/snapshot-tiedostoa; ne poistettiin tehtävän lopussa täsmäpoluilla. Hakemiston aiempi aineisto jätettiin koskematta.

## 26. Deployment limitations or unresolved differences

Deploymentin ja paikallisen candidaten välillä ei ole ratkaisemattomia sisältö-, route-, metadata-, schema-, CSP- tai asset-eroja.

Jäljellä olevat rajaukset/havainnot:

1. Tuotannon tuntematon reitti palauttaa edelleen tyhjän 404-rungon. Tämä tunnettu P1 jäi tarkoituksella korjaamatta.
2. KaTeXia käyttävillä tarkistetuilla sisältösivuilla Chromium raportoi olemassa olevan CSP:n estämän inline-`data:font/woff2`-fontin. `font-src 'self' https://fonts.gstatic.com` oli täsmälleen sama ennen tätä tehtävää; diff poisti vain GA/GTM-oikeudet. Havainto ei aiheuttanut HTTP-assetin epäonnistumista tai JavaScript-poikkeusta, eikä CSP:tä laajennettu tämän tehtävän ulkopuolella.
3. Google Fonts pysyy ulkoisena ja muodostaa kaikki havaitut kolmannen osapuolen runtime-pyynnöt.
4. Raportti ja aiemmat auditointi-/owner-input-dokumentit jäivät untracked-tilaan, koska repossa ei ole versionoitua `docs/`-käytäntöä.

## 27. GA4 remains absent locally

Kyllä. GA4 on poissa deployattavasta lähteestä, CSP:stä, tuoreesta production buildista, paikallisesta tuotantopreviewsta, selainverkosta, evästeistä ja selaintallennuksista. Negatiiviset regressiotestit läpäisevät.

## 28. GA4 is now absent from production

Kyllä. Live-tuotannossa ei havaittu GA- tai GTM-loaderia, requestia, collectionia, beaconia, measurement ID:tä, `_ga*`-evästettä, analytics-tallennusta, `window.gtag`-muuttujaa tai `window.dataLayer`-muuttujaa. Live-CSP ei salli analytics-domaineja.

## 29. No replacement analytics or consent system was added

Vahvistettu. GA4:ää ei korvattu analytics-, tracking-, telemetry-, heatmap-, session-recording-, advertising-, fingerprinting- tai monitoring-palvelulla. Analytics consent banneria, Consent Modea, consent cookiea, privacy-choice-kontrollia tai analytics feature flagia ei lisätty.

## 30. Preserved boundaries

Tässä työssä ei muutettu artikkelikorpusta, artikkelitekstejä, artikkelipäiviä, sound guide -tekstejä, URL:eja, slugeja, canonicaleja, hreflangeja, x-defaultia, sitemap-strategiaa, redirect-strategiaa, schema-strategiaa, sisäisiä linkkejä, laskurikaavoja, laskuri-UI:ta, sound rangeja, lähteitä, Google Fonts -asetusta, fontteja, hero-mediaa, Android-appin koodia, app-repositoriota, riippuvuuksia, lockfilea, Cloudflare-account-asetuksia, DNS:ää, domainia, secrettejä, environment-muuttujia tai mitään muuta ominaisuutta.

Työ päättyy tähän tuotantodeploymentiin ja live-verifiointiin. Uutta improvement batchia ei aloitettu.
