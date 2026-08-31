# dBcheck post-GA4 and Batch 2 implementation audit

Päiväys: 2026-08-21  
Tarkastettu: website checkout
Android-lähde: Android checkout
Tila: paikallinen lähde, tuotantobuild ja tuotantoesikatselu ovat GA4-vapaat; julkinen `https://dbcheck.app/` palveli tarkastushetkellä vielä vanhaa GA4-versiota. Tässä työssä ei julkaistu mitään.

Omistajan myöhempi päätös 2026-08-21: P0-5- ja P2-2-muutoksia ei oteta käyttöön. Tinnitus pitch profile säilyy suunniteltuna julkaisuominaisuutena, koska omistaja ei julkaise tuotetta ennen suunnitellun kokonaisuuden valmistumista. Julkaisuvaiheen teksti `in final tuning before release` säilyy, koska sisäisen valmistumisasteen yksityiskohtia ei haluta avata julkisesti. Nämä kaksi omistajan päätöstä korvaavat tämän raportin alkuperäisen auditointirajauksen.

## 1. Alkuperäinen tehtävärajaus

Työ rajattiin kahteen osaan:

1. Google Analytics 4:n poistamisen lähde-, konfiguraatio-, build-, selain-, verkko-, eväste-, tallennus-, otsake-, testi- ja dokumentaatiotarkastus.
2. Auditoinnin kohtien P0-2, P0-3, P0-4, P0-5 ja P2-2 faktakorjaukset julkisille copy-pinnoille.

Työn valmistumisen jälkeen omistaja perui P0-5- ja P2-2-copy-muutokset edellä kirjatulla tuote- ja viestintäpäätöksellä. P0-2, P0-3 ja P0-4 jäivät voimaan.

Saavutettavuus-, saksan renderöinti-, 404-, hero-suorituskyky-, KaTeX-, semantiikka-, navigaatio-, artikkeli- ja muu product-truth-ylläpito jätettiin aloittamatta. Mitään ei julkaistu, commitoitu, pushattu eikä siirretty uuteen branchiin.

## 2. Git-työpuun lähtötilanne

Ennen ensimmäistä muutosta tallennettu `git status --short --branch`:

```text
## feat/mittariliike...origin/feat/mittariliike
 M public/_headers
 M src/layouts/Base.astro
?? .codex-remote-attachments/
?? DBCHECK_SITE_IMPROVEMENT_AUDIT_2026-08-21.md
?? docs/
?? output/
?? test/analytics-removal.test.mjs
```

Lähtötilanteen tracked-diff osoitti, että omistajan keskeneräinen GA4-poisto oli:

- `src/layouts/Base.astro`: measurement ID, `gtag.js`, `dataLayer`, `gtag()` ja config-kutsu oli poistettu.
- `public/_headers`: GA/GTM-domainit oli poistettu CSP:stä, mutta Google Fonts -domainit oli tarkoituksella säilytetty.

Lähtötilanteessa olivat lisäksi omistajan untracked-tiedostoina auditointi, Batch 1 -raportti, privacy-inventaario, kaksi analytics-removal-testiä, Playwright-output sekä remote attachment. Niitä ei palautettu, muotoiltu laajasti tai ylikirjoitettu. `.codex-remote-attachments/` ja aiempi `output/playwright/` jätettiin koskematta.

## 3. GA4-poiston tarkastustulos

Paikallisessa checkoutissa poisto on täydellinen ja teknisesti puhdas:

- aktiivinen sivustolähde ei lataa GA:ta tai GTM:ää;
- `dataLayer`- tai `gtag`-alustusta ei ole;
- sivunäkymä- tai tapahtumakutsuja ei ole;
- analytics consent -tilaa, consent UI:ta, consent cookiea tai feature flagia ei ole;
- analytics-ID:tä ei injektoida ympäristö- tai build-muuttujalla;
- Astro-, Wrangler-, CI-, deploy-, metadata-, helper- tai generated-data-polku ei lisää analytiikkaa;
- tuotantobuildissa ei ole GA4-remnanttia;
- puhtaassa paikallisessa selainkontekstissa ei ole GA/GTM-pyyntöä, GA-evästettä tai analytics-tallennetta.

Julkisen sivuston poisto ei kuitenkaan ole vielä valmis: `https://dbcheck.app/` latasi 2026-08-21 edelleen measurement ID:n `G-9J90097M6J`, teki GA4 page-view -pyynnön ja asetti `_ga`-evästeet. Live-version CSP sisälsi myös vanhat GA/GTM-domainit. Tämä on paikallisen, julkaisemattoman checkoutin ja julkisen version välinen deploy-ero. Julkaisu oli nimenomaisesti tämän tehtävän ulkopuolella.

## 4. Tarkastetut analytics-hakutermit ja -pinnat

Repositorio haettiin `rg --hidden` -haulla (pois lukien `.git`, `node_modules` ja erikseen tarkastettu generated output) seuraaville termeille ja varianteille:

- `G-9J90097M6J`
- muut measurement ID:t muodossa `G-...`
- `gtag`
- `gtag.js`
- `googletagmanager`
- `google-analytics`
- `dataLayer`
- `_ga`
- `_ga_*`
- `analytics_storage`
- `Consent Mode`
- `GA4`
- `analytics`
- analytics-alustushelperit, analytics-ympäristömuuttujat, build-time-muuttujat, feature flagit, kommentit, dokumentaatio, testit, CSP-domainit, preconnect/DNS-prefetch, paketit ja deployment-konfiguraatio.

Tarkastettuja tiedostoluokkia olivat `package.json`, `package-lock.json`, `astro.config.mjs`, `wrangler.jsonc`, hidden-konfiguraatioehdokkaat, environment-esimerkit, workflowt, deploy-skriptit, `public/_headers`, `public/_redirects`, layoutit, sivupohjat, selain-skriptit, metadata/JSON-LD, datahelperit ja testit. Repositoriossa ei ollut `.env`-esimerkkiä, CI-workflowta tai erillistä deploy-skriptiä, joka olisi voinut injektoida analytiikkaa.

## 5. Löydetyt lähderemnantit

Aktivisessa verkkosivuston lähteessä tai konfiguraatiossa ei löytynyt analytics-remnanttia.

Hakujen ei-aktiiviset tai asiaan kuulumattomat osumat:

- `DBCHECK_SITE_IMPROVEMENT_AUDIT_2026-08-21.md` ja `docs/audits/dbcheck-batch-1-consent-implementation-2026-08-21.md`: historiallista auditointievidenssiä.
- `test/analytics-removal.test.mjs`: negatiiviset guardit measurement ID:lle, GA-domaineille ja `gtag`-kutsulle.
- tämä raportti ja owner-input-inventaariot: tarkastushavaintojen dokumentaatio.
- verkkosivuston stale `PROJECT.md`, `UI-SPEC.md`, kaksi artikkelia ja etusivun yksi lause käyttävät sanaa “analytics” tuotteen exposure analytics -merkityksessä, eivät sivustoseurantana. Artikkelitekstiä ei muutettu.
- `package-lock.json`-tiedoston merkkijono `GA4` esiintyi vain base64-integrity-hashin satunnaisena osana.
- `package-lock.json` sisältää Astron transitivisen `@astrojs/telemetry`-build-työkalupaketin sekä transitivisen `cookie`-paketin. Kumpikaan ei muodosta sivuston vierailijoille toimitettavaa analytics-implementaatiota. Package lockia tai riippuvuuksia ei muutettu.

Googleen liittyviä fonttidomaineja ei luokiteltu analytiikaksi eikä poistettu.

## 6. Generated-build-remnantit

Puhdas `npm run build` regeneroi `dist`-hakemiston. HTML-, JavaScript-, CSS-, JSON-, sitemap-, redirect- ja headers-artefakteista haettiin:

`G-9J90097M6J`, muut `G-...` ID:t, `googletagmanager.com`, `google-analytics.com`, `gtag`, `dataLayer`, `_ga`, `analytics_storage`, `Consent Mode` sekä analytics-ympäristömuuttujan output.

Osumia ei löytynyt. Generated HTML ei sisällä analytiikan consent-käyttöliittymää tai consent-tilaa. P0-2:n, P0-3:n ja P0-4:n negatiiviset claim-haut olivat puhtaat. Tinnitus launch -copy ja `final tuning before release` ovat omistajan myöhemmän päätöksen vuoksi tarkoituksella mukana lopullisessa buildissa; niitä koskevat alkuperäiset negatiiviset tarkistukset eivät enää kuulu hyväksymiskriteereihin.

## 7. Selainverkon tulokset

Paikallinen tuotantoesikatselu ajettiin osoitteessa `http://127.0.0.1:4323` uudessa selainkontekstissa. Tarkastetut reitit:

- `/`
- `/articles/`
- `/articles/what-is-a-decibel/`
- `/sounds/`
- `/sounds/concert/`
- `/tools/`
- `/tools/add-decibels/`
- `/de/artikel/`
- `/de/artikel/was-ist-ein-dezibel/`
- `/de/werkzeuge/`
- `/de/werkzeuge/dezibel-addieren/`

Kaikki palauttivat HTTP 200. Yhdelläkään reitillä ei havaittu `www.googletagmanager.com`-, `www.google-analytics.com`-, alueellista GA collection-, analytics beacon- tai page-view-pyyntöä. `window.gtag` puuttui ja `window.dataLayer` puuttui. Analyticsiin liittyviä failed requesteja, console-virheitä tai puuttuvasta `gtag`/`dataLayer`-muuttujasta johtuvia poikkeuksia ei ollut.

Julkisella `https://dbcheck.app/`-etusivulla havaittiin sen sijaan:

- `https://www.googletagmanager.com/gtag/js?id=G-9J90097M6J`
- `https://region1.google-analytics.com/g/collect?...tid=G-9J90097M6J...en=page_view...`

Tämä todistaa, ettei nykyinen julkinen julkaisu vielä vastaa paikallista GA4-poistoa.

## 8. Evästeet, local storage ja session storage

Paikallisessa GA4-vapaassa tuotantoesikatselussa kaikilla yhdellätoista reitillä:

- cookies: tyhjä
- local storage: tyhjä
- session storage: tyhjä
- analytics consent -tallenne: ei havaittu
- `window.gtag`: ei määritelty
- `window.dataLayer`: ei määritelty

Julkisella etusivulla local storage ja session storage olivat tyhjiä, mutta cookies sisälsi `_ga`- ja `_ga_9J90097M6J`-evästeet. Live-evästeet ovat vanhan julkaisun tila, eivät paikallisen buildin tila.

## 9. CSP- ja preconnect-havainnot

Paikallinen `public/_headers` sallii vain saman originin skriptit ja connectionit. GA/GTM-domainit on poistettu `script-src`-, `img-src`- ja `connect-src`-direktiiveistä. Google Fonts on edelleen sallittu `style-src`- ja `font-src`-direktiiveissä.

`src/layouts/Base.astro` sisältää vain Google Fontsin preconnectit:

- `https://fonts.googleapis.com`
- `https://fonts.gstatic.com`

Analytics-spesifiä preconnectia tai DNS-prefetchiä ei ole. Julkisen sivuston response header sisälsi vielä vanhan GA/GTM-CSP:n, mikä on jälleen deploy-ero. Cloudflaren NEL-header ilmoitti `a.nel.cloudflare.com`-raportointiosoitteen, mutta selainajossa ei havaittu siihen lähtevää pyyntöä.

## 10. Tässä passissa poistettu analytics-koodi tai -konfiguraatio

Tämän passin aikana ei poistettu lisää analytics-koodia, koska aktiivista poistettavaa ei enää löytynyt. Keinotekoista diffiä ei tehty.

Omistajan lähtötilanteessa jo tekemät ja säilytetyt poistot olivat:

- GA4 measurement ID, loader, `dataLayer`, `gtag()` ja config-kutsu `src/layouts/Base.astro`-tiedostosta;
- GA/GTM-domainit `public/_headers`-tiedoston CSP:stä.

Google Fonts -konfiguraatio säilytettiin. Consent banneria, analytics privacy choice -kontrollia tai korvaavaa analytiikka-, telemetry-, tracking-, fingerprinting-, heatmap-, advertising-, session-recording- tai monitoring-palvelua ei lisätty.

## 11. Jäljellä olevat kolmannen osapuolen pyynnöt

Paikallisessa GA4-vapaassa runtime-ajossa havaittiin vain:

| Kolmas osapuoli | Pyynnöt | Luokitus |
| --- | --- | --- |
| Google Fonts | `fonts.googleapis.com` CSS | ulkoinen fonttityyli |
| Google Fonts | `fonts.gstatic.com` WOFF2-tiedostot | ulkoiset Instrument Sans- ja IBM Plex Mono -fontit |

Cloudflare toimittaa julkisen sivuston oman originin kautta. `/cdn-cgi/trace` on saman originin Cloudflare-resurssi alueellisen hintamuodon maatunnusta varten. Ulkoiset lähde- ja Finnvek-linkit eivät lähettäneet pyyntöä ilman käyttäjän navigointia. Hero-video ja sen ääni ovat saman originin tiedostoja.

Nykyisellä julkisella versiolla jäljellä oleviin ulkoisiin pyyntöihin kuuluvat edellä mainittujen fonttien lisäksi GTM-loader ja region1 GA4 collection -pyyntö.

## 12. Google Fonts -tila

Google Fonts pysyy ulkoisena. Fonttilatausta, fontteja, fonttien CSP-sallintoja tai preconnecteja ei muutettu. Lighthouse mittasi Google Fonts -siirroksi 71 691 tavua jokaisessa ajossa.

## 13. Jäljellä oleva privacy/provider-information-inventaario

Varsinaista production privacy-, Impressum-, legal- tai provider-information-sivua ei luotu, koska hyväksyttyjä omistajatietoja ei ole riittävästi. Vaadittu tekninen inventaario luotiin tiedostoon:

`docs/owner-input/dbcheck-remaining-website-legal-information-needed.md`

Se kattaa Cloudflare-toimituksen, `/cdn-cgi/trace`-hintalokalisaation, Google Fontsin, paikallisen haun ja laskurit, `mailto:`-kontaktin, ulkoiset linkit, evästeet ja selaintallennukset, browser permissionit, Web Audion, mikrofonin puuttumisen, saman originin videon sekä visitor-dataa lähettävien sivustolomakkeiden puuttumisen. Julkisen version GA4-poikkeama on kirjattu erikseen.

## 14. Omistajalta vielä vaaditut tiedot

Omistajan tai lakiasiantuntijan on vielä vahvistettava:

- julkaistava operaattorin ja mahdollisen rekisterinpitäjän virallinen nimi;
- sovellettavan lain edellyttämä julkaistava osoite;
- oikeushenkilömuoto sekä yritys-, rekisteri- tai VAT-tunniste vain, jos ne ovat olemassa ja kuuluvat julkaista;
- Cloudflare-tilin tosiasialliset lokitus-, turvallisuus-, jakelu- ja säilytysasetukset;
- yhteyssähköpostiin saapuvien viestien omistaja, tarkoitus ja säilytys;
- hyväksytyt tarkoitus-, oikeusperuste-, retention-, processor-, transfer-, rights-, valvontaviranomais- ja jurisdiction-tiedot;
- GA4-vapaan version myöhempi julkaisu ja sen jälkeinen live-verifiointi.

Mitään näistä ei arvattu.

## 15. Toteutetut Batch 2 -löydökset

| ID | Toteutus |
| --- | --- |
| P0-2 | YAMNet kuvataan live-mikrofoniaudion laitteensisäisenä analyysinä. Classifier inputin tallentamattomuus, aggregate-eventtien erillinen opt-in, erillinen oletuksena pois oleva Pro WAV -tallennus ja raw classifier audion cloud-uploadin puuttuminen sanotaan suoraan. |
| P0-3 | “Real dosimeter” ja “85 dB peak alerts” poistettiin. Copy erottaa puhelinpohjaisen estimaatin, NIOSH/OSHA-mallit, 85 dB:n configurable level thresholdin, extended-exposure-, dose- ja projected-dose-alertit sekä erillisen 120 dB peak warningin. |
| P0-4 | Viikon aggregate muutettiin weekly noise-exposure summaryksi. Footerin umbrella-copy muutettiin sound awareness- ja personal hearing-result tracking -tasolle. Oikea hearing test/recovery -toiminnallisuus ja disclaimerit säilyivät. |
| P0-5 | Ei toteutettu lopulliseen versioon. Omistaja vahvisti, että tinnitus pitch profile kuuluu suunniteltuun julkaistavaan kokonaisuuteen ja säilyy feature- sekä Pro-plan-pinnoilla yhdessä ambient sounds -ominaisuuden kanssa. |
| P2-2 | Ei toteutettu lopulliseen versioon. Omistaja päätti säilyttää `in final tuning before release` -tekstin eikä halua avata sisäistä julkaisuvaihetta julkiselle sivulle tarkemmin. |

## 16. Tarkat ennen- ja jälkeen-tekstit

| Kohta | Ennen | Jälkeen |
| --- | --- | --- |
| P0-2, YAMNet | `On-device YAMNet classification names what the meter hears (speech, music, traffic) without recording audio.` | `On-device YAMNet analyzes live microphone audio. Classifier input is not saved; optional aggregate detection events are stored only when their separate persistence opt-in is enabled.` |
| P0-2, privacy | `Raw audio is not uploaded for analysis.` | `Optional Pro WAV recording is a separate opt-in feature and is off by default. Raw classifier audio is not uploaded for cloud analysis.` |
| P0-3, card title | `Noise dosimeter` | `Dosimeter estimates` |
| P0-3, card body | `NIOSH REL and OSHA PEL models. Live dose, projected dose and an estimated remaining exposure time while you measure.` | `Phone-based NIOSH REL and OSHA PEL calculations show actual accumulated dose, projected dose and estimated remaining exposure time while you measure.` |
| P0-3, alert card | `Threshold and peak alerts on your own schedule, plus user-started 5-minute passive samples of your surroundings.` | `Configurable level-threshold alerts (85 dB by default), extended-exposure, dose and projected-dose alerts, and a separate 120 dB peak warning on your schedule. Passive monitoring uses user-started 5-minute samples.` |
| P0-3, tech detail | `A real dosimeter with NIOSH REL and OSHA PEL standards: TWA, live dose, projected dose and estimated remaining exposure time, plus threshold and 85 dB peak alerts on your own schedule.` | `Phone-based dosimeter estimates under NIOSH REL and OSHA PEL: TWA, actual accumulated dose, projected dose and estimated remaining exposure time. A configurable level threshold defaults to 85 dB; extended-exposure, dose and projected-dose alerts remain distinct from the separate 120 dB peak warning.` |
| P0-3, Pro list | `Dosimeter with NIOSH REL / OSHA PEL` | `Dosimeter calculations with NIOSH REL / OSHA PEL` |
| P0-4, weekly feature | `Weekly exposure analytics` / `An energy-average exposure chart and hearing health status built from your last seven days of sessions.` | `Weekly exposure summary` / `A weekly energy-average noise-exposure summary built from your last seven days of sessions.` |
| P0-4, Free list | `Weekly exposure chart & hearing health status` | `Weekly noise-exposure summary` |
| P0-4, footer | `Sound level meter & hearing health companion for Android.` | `Sound awareness and personal hearing-result tracking for Android.` |
| P0-5, feature | `Tinnitus profile & ambient sounds` / `Build a personal tinnitus pitch profile and use ambient sounds when you want a steadier sound environment.` | Säilytetty muuttamattomana omistajan päätöksellä. |
| P0-5, Pro list | `Tinnitus pitch profile & ambient sounds` | Säilytetty muuttamattomana omistajan päätöksellä. |
| P2-2 | `dBcheck for Android is in final tuning before release.` / `The observatory opens soon on Google Play.` | Säilytetty muuttamattomana omistajan päätöksellä. |

## 17. Korjauksissa käytetty nykyisen app-checkoutin evidenssi

Website-repositorion stale `PROJECT.md` ei ohjannut claim-korjauksia. Evidenssihierarkia alkoi nykyisestä Android-checkoutista:

| Kohta | Android-evidenssi |
| --- | --- |
| P0-2 | `PROJECT.md:730-754` kuvaa YAMNet-ikkunat, live-only raw-audio fanoutin, raw-audion tallentamattomuuden ja vain opt-in aggregate-eventit. `AudioEngine.kt:267-301` lukee `AudioRecord` PCM16-dataa ja syöttää sen fanoutiin. `SoundDetectionEventEntity.kt:27-32` sisältää vain id/session/timestamp/label/confidence-kentät. `UserPreferenceDefaults.kt:38-41` asettaa detectionin, persistence-opt-inin ja WAV:n oletuksena pois. `PROJECT.md:639` erottaa Pro+opt-in WAV:n. Appin production-lähteestä ei löytynyt raw classifier audioa cloudiin lähettävää HTTP-client- tai upload-polkuja. |
| P0-3 | `PROJECT.md:614` erottaa threshold-, dose-, projected-dose- ja peak-eventit; `PROJECT.md:628` vahvistaa NIOSH REL / OSHA PEL -mallit. `UserPreferenceDefaults.kt:16-20,27` antaa exposure-alert-oletuksen, erillisen peak-oletuksen, 85 dB thresholdin ja NIOSH-oletuksen. `NoiseAlertPolicy.kt:3-10` antaa 30 min, 120 dB ja 100 % dose/projected-dose -rajat. `NoiseAlertEvaluator.kt:9-23,95-114` toteuttaa erilliset eventit. `PROJECT.md:1969-1976` säilyttää puhelin-, mikrofoni- ja kalibrointirajat. |
| P0-4 | `HearingHealthSummaryCalculator.kt:18-45` laskee viikon energia-average-arvon sessionäytteistä; se ei mittaa fysiologiaa. `PROJECT.md:1198-1211` ja `1969-1976` määrittävät hearing test -tulokset suhteellisiksi dBFS-arvoiksi, eivät dB HL -audiometriaksi tai diagnoosiksi. |
| P0-5 | Checkoutissa on toteutettu tinnitus pitch matcher. Vaikka `PROJECT.md:1381-1400` käyttää aiempaa v1.0/v1.5-rajausta, omistaja vahvisti myöhemmin, ettei tuotetta julkaista ennen suunnitellun ominaisuuskokonaisuuden valmistumista eikä julkisessa sivussa käytetä tätä versionumerorajausta. Omistajan ajantasainen tuoterajaus ohittaa dokumentin aiemman launch-jaon. |
| P2-2 | `PROJECT.md:23-30` ja `2018-2041` kirjaavat sisäiset release-portit, mutta omistaja päätti, ettei niiden tilaa tarvitse avata julkisessa copyssa. `Final tuning` säilytetään omistajan viestintäpäätöksenä, ei teknisenä todistuksena yksittäisten porttien valmistumisesta. |

Omistajan myöhempi päätös korvaa dokumentoidun v1.0/v1.5-jaon verkkosivuston julkaisucopyn osalta: tinnitus pitch profile säilyy sivulla suunniteltuna ominaisuutena.

## 18. Muutetut lähde- ja artefaktitiedostot

Tässä passissa muutettiin tai luotiin:

- `src/pages/index.astro` — P0-2, P0-3 ja P0-4; P0-5- ja P2-2-kohdat palautettiin omistajan päätöksellä alkuperäiseen muotoon.
- `src/i18n/ui.ts` — P0-4 footer-copy.
- `docs/owner-input/dbcheck-remaining-website-legal-information-needed.md` — vaadittu faktoihin rajattu owner-inventaario.
- `docs/audits/dbcheck-post-ga4-and-batch-2-implementation-2026-08-21.md` — tämä raportti.
- `output/lighthouse/dbcheck-post-ga4/run-1.json`
- `output/lighthouse/dbcheck-post-ga4/run-2.json`
- `output/lighthouse/dbcheck-post-ga4/run-3.json`

Lähtötilanteessa jo muutettuina olleet `src/layouts/Base.astro`, `public/_headers` ja untracked `test/analytics-removal.test.mjs` säilytettiin omistajan GA4-poistona. Niitä ei muokattu tässä passissa. Muu lähtötilanteen dirty work säilytettiin.

## 19. Lisätyt tai muutetut testit

Tässä passissa ei lisätty tai muutettu testitiedostoja. Lähtötilanteessa jo ollut `test/analytics-removal.test.mjs` sisältää kaksi negatiivista testiä:

1. production sourcessa ei ole measurement ID:tä, GA-domaineja tai `gtag`-kutsua;
2. hylätty analytics consent -interface ei renderöidy.

Testimäärä nousi auditin alkuperäisestä 14:stä 16:een juuri näiden kahden lähtötilanteessa olleen testin vuoksi.

## 20. `npm run check`

Tulos: exit code 0.

```text
Result (57 files):
- 0 errors
- 0 warnings
- 16 hints
```

Auditin baseline oli 0 errors, 0 warnings, 18 hints. Hinttejä on kaksi vähemmän; ero vastaa GA4-inline-scriptien poistumista. Uusia varoituksia ei syntynyt.

## 21. `npm test`

Tulos: exit code 0.

```text
tests 16
pass 16
fail 0
```

Auditin baseline oli 14/14. Kaksi lisää ovat edellä kuvatut GA4-removal-guardit.

## 22. `npm run build`

Tulos: exit code 0. Astro 7.1.6 generoi 56 sivua ja sitemapin. Buildissa ei ollut puuttuvia reittejä tai redirecttejä.

## 23. Reitti-, redirect-, canonical-, hreflang-, sitemap- ja schema-regressio

Generated output tarkastettiin HTML-parserilla:

```text
HTML files: 64
Indexable HTML: 56
Sitemap URLs: 56 (56 unique)
Redirect outputs: 8
Unique titles: 56
Unique descriptions: 56
Schema types: Article 40, BreadcrumbList 40, WebSite 1
Failures: 0
```

- kaikki 56 tarkoitettua indexable-reittiä ovat tallella;
- kaikki kahdeksan legacy-redirectiä ovat suoria single-hop 301 -redirecttejä ja sitemapin ulkopuolella;
- uusia indexable-reittejä ei syntynyt eikä reittejä kadonnut;
- jokaisella indexable-sivulla on yksi H1, uniikki title, uniikki description ja oikea self-canonical;
- en/de-hreflangit ovat vastavuoroiset ja x-default johtaa englanninkieliseen versioon;
- sitemap membership on ennallaan;
- schemaa ei lisätty tai poistettu;
- `git diff --name-only -- src/content` oli tyhjä, joten artikkelijulkaisun tai review-päivän muutoksia ei ollut.

## 24. Selain- ja responsive-tulokset

Yhdentoista edellä luetellun reitin matriisi ajettiin leveyksillä 360, 390, 768 ja 1440 px eli 44 navigointina. Uutta vaakaylivuotoa, tekstin clippingiä, puuttuvaa H1:tä tai copy-muutosten layout-regressiota ei havaittu.

Matriisi ajettiin ennen omistajan myöhempää P0-5/P2-2-palautusta. Palautetut tekstit ovat sivun alkuperäisiä tekstejä eikä rakennetta muutettu, mutta koko 44 navigoinnin matriisia ei ajettu palautuksen jälkeen uudelleen.

Toiminnalliset smoke-testit:

- desktop- ja mobile-navigaatio toimivat;
- haku `concert` palautti `/sounds/concert/`-tuloksen;
- Sound Explorer valitsi Concertin ja näytti 85–105 dB vaihteluvälin;
- Add Decibels laski kaksi 80 dB lähdettä 83.0 dB:ksi ja kolme 84.8 dB:ksi;
- englanti–saksa-kielenvaihto avasi `/de/werkzeuge/dezibel-addieren/`-reitin;
- saksan mobile menu avautui;
- hero-video toimi; `Listen` käynnisti äänen ja vaihtoi kontrollin `Mute the film` -tilaan, `Mute` mykisti sen ja palautti `Listen to the film` -tilan;
- reduced motion -kontekstissa hero-videon src:tä ei asetettu, exposure rail oli piilotettu eikä reveal-transformia jäänyt;
- save-data-kontekstissa hero-videon src:tä ei asetettu ja poster säilyi;
- homepage metadata sekä OG- ja Twitter-description sisälsivät jo oikean `personal sound awareness and hearing-result tracking` -rajauksen; JSON-LD:n schema- ja kuvausstrategia säilyi.

Appin JavaScript-poikkeuksia ei havaittu. Astro preview palautti odotetun 404:n Cloudflare-only `/cdn-cgi/trace`-reitille, mikä tuotti paikallisen console-virheen mutta ei rikkonut EUR-fallback-hintaa. Yhdessä en–de-siirtymässä Chromium kirjoitti selaimen oman `Transition was skipped` -viestin; se ei ollut analytics-virhe eikä sivun JavaScript-poikkeus. Näitä ei korjattu, koska Cloudflare-preview ja navigation-batch ovat tehtävärajauksen ulkopuolella.

## 25. Post-GA4 Lighthouse

Työkaluna oli Lighthouse 13.4.1, default mobile performance -profiili, paikallinen production preview ja kolme peräkkäistä ajoa. Aiemman auditin tarkkaa Lighthouse-versiota ja komentoprofiilia ei ollut kirjattu, joten vertailu on vain suuntaa-antava.

Lighthouse-ajot tehtiin ennen omistajan myöhempää P0-5/P2-2-copy-palautusta. Palautus ei muuttanut rakennetta, mediaa tai latauslogiikkaa, mutta mittausta ei ajettu sen jälkeen uudelleen.

| Ajo | Performance | FCP | LCP | TBT | CLS | Total bytes | Third-party bytes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 91 | 2.829 s | 2.829 s | 0 ms | 0.000287 | 561,783 | 71,691 |
| 2 | 91 | 2.819 s | 2.819 s | 0 ms | 0.005615 | 561,783 | 71,691 |
| 3 | 90 | 2.821 s | 2.821 s | 0 ms | 0.005615 | 561,783 | 71,691 |
| **Mediaani** | **91** | **2.821 s** | **2.821 s** | **0 ms** | **0.005615** | **561,783 (548.6 KiB)** | **71,691 (70.0 KiB)** |

Kaikissa ajoissa LCP-elementti oli `main#main > section#hero > div.hero-media > video#hero-video`. Third-party-siirto oli kokonaan Google Fontsia.

Aiempi yksittäinen paikallinen tulos oli performance 78, FCP 2.8 s, LCP 4.5 s, TBT 130 ms, CLS 0.006 ja 715 KiB. Uusi mediaani on parempi pisteissä, LCP:ssä, TBT:ssä ja siirtomäärässä, mutta kolmen synteettisen ajon ja tuntemattoman aiemman profiilin perusteella eroa ei pidetä tilastollisesti merkitsevänä. Hero loadingia ei muutettu.

Ensimmäinen ja kolmas Lighthouse-prosessi kirjoittivat valmiin, parsittavan JSON-raportin mutta palauttivat sen jälkeen Windows `EPERM` -virheen oman temp-profiilinsa poistossa. Toinen ajo poistui exit code 0:lla. Yhtään Lighthouse- tai Chrome-taustaprosessia ei jäänyt käyntiin.

## 26. Toteuttamatta jätetyt auditointilöydökset

P0-5 ja P2-2 jätettiin toteuttamatta omistajan nimenomaisella päätöksellä. Kaikki muu auditin työ jätettiin ennalleen ja aloittamatta: saavutettavuus, saksan formula/rendering ja mobile overflow, 404, hero LCP/performance, conditional KaTeX, semantiikka ja `aria-current`, navigaatio, artikkeli- ja product-truth-maintenance sekä muut Batch 2:n ulkopuoliset löydökset.

## 27. Rajoitukset ja epävarmuudet

- Julkaisua ei tehty, joten live-sivusto on edelleen vanha GA4-versio.
- Cloudflare-dashboardia, sopimuksia, ordinary edge loggingia tai retention-asetuksia ei voitu todentaa tästä repositoriosta. Aiemman owner-input-dokumentin dashboard-väitteitä ei käsitelty tässä live-varmennuksena.
- Paikallinen Astro preview ei toteuta Cloudflaren `/cdn-cgi/trace`-reittiä.
- Aiemman Lighthouse-ajon tarkka tool/profile ei ole tiedossa, ja uusi otos on vain kolme synteettistä ajoa.
- Lighthouse 1 ja 3 saivat raportin jälkeen Windows-temp-cleanup-virheen, vaikka JSON-raportit olivat ehjät.
- Oikeudellisia johtopäätöksiä ei tehty eikä puuttuvia omistajatietoja arvattu.

## 28. GA4:n poissaolon vahvistus

GA4 on täysin poissa nykyisestä paikallisesta sivustolähteestä, konfiguraatiosta, tuotantobuildista ja paikallisesta selainruntimesta. Aktiivista source- tai generated-remnanttia ei löytynyt.

GA4 ei vielä ole poissa nykyisestä julkisesta `dBcheck.app`-versiosta: live-sivu teki GTM/GA4-pyynnöt ja asetti `_ga*`-evästeet. End-to-end-poisto voidaan vahvistaa vasta erikseen valtuutetun julkaisun ja sen jälkeisen live-verifioinnin jälkeen.

## 29. Consent- ja korvaavan analytiikan vahvistus

Analytics consent banneria, privacy-choice-kontrollia, consent cookiea, Consent Mode -helperiä tai renderöintiä viivästyttävää consent-tilaa ei lisätty tai jätetty paikalliseen tuotantoversioon. GA4:ää ei palautettu eikä sitä korvattu millään analytiikka-, telemetry-, tracking-, fingerprinting-, heatmap-, advertising-, session-recording- tai monitoring-palvelulla.

## 30. Säilytettyjen rajojen vahvistus

Artikkeleita, artikkelitekstejä, päivämääriä, sound guide -tekstejä, URL:eja tai slugeja, canonical-, hreflang-, x-default-, sitemap-, redirect-, schema- tai internal-link-strategiaa, laskurikaavoja, sound rangeja tai lähteitä ei muutettu. Hero-filmiä, Sound Exploreria, animation identityä, Google Fontseja tai fonttilatausta, hinnoittelumallia, Android-appin koodia, app-repositoriota, analytiikkaan liittymättömiä riippuvuuksia tai deployment-konfiguraatiota ei muutettu. Mitään ei deployattu, commitoitu, pushattu eikä PR:ää tai branchia luotu.
