# dBcheck.app linkki-, lähde- ja fakta-auditointi 2026-08-22

## 1. Executive assessment

Nykyinen 56 sivun julkaisu on teknisesti hyvin linkitetty: yhtään rikkinäistä sisäistä URL:ia tai fragmenttia, orpoa sivua, dead end -sivua tai aidosti rikkinäistä ulkoista HTTP-linkkiä ei löytynyt. Paikallinen tuotantobuildi ja live-sivusto olivat kaikilla 56 indeksoitavalla reitillä tavutasolla samat. Auditointi löysi kahdeksan juurisyytason korjauskohdetta: 1 × P1, 6 × P2 ja 1 × P3. P0-löydöksiä ei ole.

Merkittävin korjaus on yhdeksän saksankielisen artikkelin 38 raakatekstinä näkyvää matemaattista lauseketta. Tieteellisten, altistus-, kuulo-, turvallisuus- ja sääntelyväitteiden sisältö oli muutoin lähteiden puitteissa oikea tai asianmukaisesti rajattu. Yksikään tarkistettu viitelähde ei osoittautunut sisällöllisesti vääräksi tueksi viereiselle olennaiselle väitteelle.

Tämä oli vain auditointi. Tuotantokoodia, sisältöä, konfiguraatiota, Android-sovellusta tai julkaisua ei muutettu.

| Finding category | P0 | P1 | P2 | P3 |
|---|---:|---:|---:|---:|
| Internal links / route recovery | 0 | 0 | 3 | 0 |
| External links / citation metadata | 0 | 0 | 1 | 1 |
| Facts / localization / calculator behavior | 0 | 1 | 2 | 0 |
| **Total** | **0** | **1** | **6** | **1** |

## 2. Scope and limitations

Tarkistus kattoi kaikki tuoreesta `dist`-buildista löydetyt julkiset HTML-reitit, redirect-outputit, search JSON -indeksit, sitemapit, robots.txt:n, lähdekoodin julkaistun ja draft-sisällön linkkivuodot, renderöidyt ankkurit, runtime- ja JSON-LD-URL:t, 40 julkaistua editorial Markdown -tiedostoa, 1 211 materiaalista faktariviä, tuotteen julkiset väitteet sekä kaikki nykyiset laskurimallit.

Verkko tarkistettiin 2026-08-22 GET-pyynnöillä ja tarvittaessa normaalilla Chromium-selainkontekstilla. Kolme virallista sivua esti automatisoidun HTTP-tarkistuksen (Acta Acustica ja kaksi ISO-sivua), mutta ne tarkistettiin selaimessa. Maksullisten ISO-standardien varsinaista normitekstiä ei väitetä tarkistetuksi: vain virallinen abstract/status. PDF-binäärien paikallista sivurasterointia ei voitu tehdä, koska työtilassa ei ollut `pdftotext`-, `pdftoppm`- tai `pdfplumber`-työkalua; relevantit kohdat tarkistettiin virallisen tekstiesityksen ja selaimen kautta. Play Consoleen ei ollut pääsyä, joten alueelliset myymälähinnat ovat `UNVERIFIABLE` eivätkä virheellisiä.

## 3. Current Git and repository state

- Website branch ennen auditointitiedostoja: `feat/mittariliike...origin/feat/mittariliike`; HEAD `bdf690bb711e5c3208659f3dcd7d6f89b1475219`.
- Tracked modifications before audit: none (`git diff --stat` and `git diff` empty).
- Pre-existing untracked owner work: `.codex-remote-attachments/`, `DBCHECK_SITE_IMPROVEMENT_AUDIT_2026-08-21.md`, existing `docs/audits/*2026-08-21.md`, `docs/owner-input/` and `output/`. These were preserved.
- Audit created permanently only this Markdown report and the two required CSV ledgers.
- Android source-of-truth checkout `C:\Dev\dBcheck`: branch `codex/paivita-riippuvuudet-20260803`, HEAD `1e85e35b3b918092addb1efe3e1fa16a59042aa7`, remote behind by 3; pre-existing modifications in four workflow files and `PROJECT.md`. No Android file was changed.

## 4. Current route and locale inventory

Fresh build produced 64 HTML outputs: 56 sitemap-indexable pages and 8 redirect outputs. Indexable pages: 29 English and 27 German. Page-type counts: homepage 1, article indexes 2, articles 30, sound indexes 2, sound guides 10, tool indexes 2 and calculators 9. Lisäksi julkaisu sisältää `/search.json`, `/de/search.json`, `/robots.txt`, `/sitemap-index.xml` ja `/sitemap-0.xml`.

| Route | Locale | Internal-link result | External-link result | Fact result | Findings | Highest | Overall verdict |
|---|---:|---|---|---|---:|---:|---|
| `/` | en | PASS | PASS | NEEDS_CORRECTION | 1 | P2 | NEEDS_CORRECTION |
| `/articles/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/articles/are-decibel-meter-apps-accurate/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/articles/db-vs-dba/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/articles/how-long-can-you-listen-at-85-db/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/articles/how-to-calibrate-a-decibel-meter-app/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/articles/how-to-measure-decibels-with-android-phone/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/articles/is-3-db-twice-as-loud/` | en | PASS | PASS_WITH_NOTES | PASS | 0 | — | PASS_WITH_NOTES |
| `/articles/niosh-vs-osha-noise-exposure-limits/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/articles/phone-sound-meter-vs-professional-meter/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/articles/what-is-a-decibel/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/articles/what-is-a-safe-decibel-level/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/articles/what-is-noise-dose/` | en | NEEDS_CORRECTION | PASS | PASS | 1 | P2 | NEEDS_CORRECTION |
| `/articles/what-is-sound-pressure-level/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/articles/why-decibel-meter-apps-show-different-results/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/articles/why-does-85-db-matter/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/articles/why-is-the-decibel-scale-logarithmic/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/de/alltagsgeraeusche/` | de | PASS | PASS | NEEDS_CORRECTION | 1 | P2 | NEEDS_CORRECTION |
| `/de/alltagsgeraeusche/babygeschrei/` | de | PASS | PASS | PASS | 0 | — | PASS |
| `/de/alltagsgeraeusche/konzert/` | de | PASS | NEEDS_CORRECTION | NEEDS_CORRECTION | 1 | P2 | NEEDS_CORRECTION |
| `/de/alltagsgeraeusche/normales-gespraech/` | de | PASS | PASS | PASS | 0 | — | PASS |
| `/de/alltagsgeraeusche/rasenmaeher/` | de | PASS | NEEDS_CORRECTION | NEEDS_CORRECTION | 1 | P2 | NEEDS_CORRECTION |
| `/de/alltagsgeraeusche/staubsauger/` | de | PASS | PASS | PASS | 0 | — | PASS |
| `/de/artikel/` | de | PASS | PASS | PASS | 0 | — | PASS |
| `/de/artikel/db-und-dba-unterschied/` | de | PASS | PASS | NEEDS_CORRECTION | 1 | P1 | NEEDS_CORRECTION |
| `/de/artikel/dezibel-app-kalibrieren/` | de | PASS | PASS | PASS | 0 | — | PASS |
| `/de/artikel/dezibel-messen-mit-android-handy/` | de | NEEDS_CORRECTION | PASS | PASS | 1 | P2 | NEEDS_CORRECTION |
| `/de/artikel/laermexpositionsgrenzen-deutschland-eu/` | de | PASS | PASS | NEEDS_CORRECTION | 1 | P1 | NEEDS_CORRECTION |
| `/de/artikel/schallpegelmesser-app-vs-messgeraet/` | de | PASS | PASS | PASS | 0 | — | PASS |
| `/de/artikel/sind-3-db-doppelt-so-laut/` | de | PASS | PASS_WITH_NOTES | NEEDS_CORRECTION | 1 | P1 | NEEDS_CORRECTION |
| `/de/artikel/sind-dezibel-apps-genau/` | de | PASS | PASS | PASS | 0 | — | PASS |
| `/de/artikel/warum-dezibel-apps-unterschiedliche-werte-zeigen/` | de | PASS | PASS | PASS | 0 | — | PASS |
| `/de/artikel/warum-ist-die-dezibelskala-logarithmisch/` | de | PASS | PASS | NEEDS_CORRECTION | 1 | P1 | NEEDS_CORRECTION |
| `/de/artikel/warum-sind-85-db-wichtig/` | de | PASS | PASS | NEEDS_CORRECTION | 1 | P1 | NEEDS_CORRECTION |
| `/de/artikel/was-ist-ein-dezibel/` | de | PASS | PASS | NEEDS_CORRECTION | 1 | P1 | NEEDS_CORRECTION |
| `/de/artikel/was-ist-eine-laermdosis/` | de | PASS | PASS | NEEDS_CORRECTION | 1 | P1 | NEEDS_CORRECTION |
| `/de/artikel/was-ist-schalldruckpegel/` | de | PASS | PASS | NEEDS_CORRECTION | 1 | P1 | NEEDS_CORRECTION |
| `/de/artikel/welcher-dezibelwert-ist-sicher/` | de | PASS | PASS | PASS | 0 | — | PASS |
| `/de/artikel/wie-lange-85-db-hoeren/` | de | PASS | PASS | NEEDS_CORRECTION | 1 | P1 | NEEDS_CORRECTION |
| `/de/werkzeuge/` | de | PASS | PASS | PASS | 0 | — | PASS |
| `/de/werkzeuge/dezibel-addieren/` | de | PASS | PASS | NEEDS_CORRECTION | 1 | P2 | NEEDS_CORRECTION |
| `/de/werkzeuge/expositionsdauer-rechner/` | de | PASS | PASS | PASS | 0 | — | PASS |
| `/de/werkzeuge/laermexpositionsrechner/` | de | PASS | PASS | NEEDS_CORRECTION | 1 | P2 | NEEDS_CORRECTION |
| `/de/werkzeuge/schallpegel-entfernung/` | de | PASS | PASS | NEEDS_CORRECTION | 1 | P2 | NEEDS_CORRECTION |
| `/sounds/` | en | PASS | PASS | NEEDS_CORRECTION | 1 | P2 | NEEDS_CORRECTION |
| `/sounds/baby-crying/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/sounds/concert/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/sounds/lawn-mower/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/sounds/normal-conversation/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/sounds/vacuum-cleaner/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/tools/` | en | PASS | PASS | PASS | 0 | — | PASS |
| `/tools/add-decibels/` | en | PASS | PASS_WITH_NOTES | NEEDS_CORRECTION | 2 | P2 | NEEDS_CORRECTION |
| `/tools/daily-noise-exposure-level-calculator/` | en | PASS | PASS | NEEDS_CORRECTION | 1 | P2 | NEEDS_CORRECTION |
| `/tools/decibel-distance/` | en | PASS | PASS | NEEDS_CORRECTION | 1 | P2 | NEEDS_CORRECTION |
| `/tools/noise-dose-calculator/` | en | PASS | PASS | NEEDS_CORRECTION | 1 | P2 | NEEDS_CORRECTION |
| `/tools/safe-listening-time-calculator/` | en | PASS | PASS | PASS | 0 | — | PASS |

## 5. Local versus live differences

Kaikki 56 indeksoitavaa reittiä palauttivat paikallisesti ja livessä 200. Jokaisen HTML-rungon tavut ja normalisoitu näkyvä teksti olivat samat. Myös molemmat search JSON -tiedostot, robots.txt ja sitemap-tiedostot palauttivat 200 ja olivat tavutasolla samat.

Ainoa julkaisuero oli tuntemattoman reitin 404-runko: paikallinen Astro preview antoi HTML-rungon, Cloudflare-live tyhjän rungon. Redirectit ovat paikallisessa staattisessa previewssa 200 + meta refresh, mutta livessä suoria 301-vastauksia; tämä on ympäristöjen odotettu toteutusero, ei redirect-vika.

## 6. Internal-link graph summary

| Metric | Result |
|---|---:|
| Node count | 56 |
| Edge count (unique, self-links excluded) | 519 |
| Inbound min / median / max | 1 / 6 / 55 |
| Outbound min / median / max | 4 / 9 / 23 |
| Orphan count | 0 |
| Dead-end count | 0 |
| Low-inbound count | 1 |
| Maximum homepage click depth | 3 |
| Locale-leak count | 0 |

Kaikki sivut ovat saavutettavissa etusivulta enintään kolmella klikkauksella. Search- tai sitemap-only-solmuja ja vahvasti eristyneitä klustereita ei löytynyt.

## 7. Broken internal links and fragments

Renderöidystä HTML:stä löytyi 1 084 sisäistä ankkuriesiintymää ja search JSON -indekseistä 64 sisäistä kohde-esiintymää, yhteensä 1 148. Uniikkeja kohteita fragmentteineen oli 117. Rikkinäisiä URL:eja, puuttuvia fragmentteja, draft-kohteita, soft 404 -kohteita, local-only/live-only-kohteita tai JavaScript-only navigaatiota: **0**. `KEEP AS IS`.

## 8. Internal redirects and normalization

Kahdeksan legacy-reittiä ohjautuu yhden hypyn jälkeen kanoniseen kohteeseen; ketjuja ja looppeja ei ole. Nykyinen sisäinen linkitys ei osoita yhteenkään redirect-outputiin.

| Legacy route | Final route | Live |
|---|---|---:|
| `/sounds/busy-traffic-decibels/` | `/sounds/` | 301 |
| `/sounds/concert-decibels/` | `/sounds/concert/` | 301 |
| `/sounds/fireworks-decibels/` | `/sounds/` | 301 |
| `/sounds/lawn-mower-decibels/` | `/sounds/lawn-mower/` | 301 |
| `/sounds/normal-conversation-decibels/` | `/sounds/normal-conversation/` | 301 |
| `/sounds/siren-decibels/` | `/sounds/` | 301 |
| `/sounds/vacuum-cleaner-decibels/` | `/sounds/vacuum-cleaner/` | 301 |
| `/sounds/whisper-decibels/` | `/sounds/` | 301 |

Trailing slash, kirjainkoko, HTTPS, canonical ja locale normalisoituvat nykyisissä linkeissä oikein. `KEEP AS IS`.

## 9. Weak or semantically poor internal links

Kaksi rajattua löydöstä: stale “planned Noise Dose Calculator” (LNK-P2-001) ja saksalainen kontekstuaalinen self-CTA (LNK-P2-002). Muut toistetut linkit ovat pääosin header/footer/breadcrumb/source-list/CTA-rakenteen tarkoituksellisia esiintymiä. Kiinteää linkkimäärää per artikkeli ei suositella.

## 10. Orphan, dead-end and low-inbound pages

Orpoja 0, dead end -sivuja 0, sitemap/search-only-sivuja 0. Ainoa yhden uniikin inbound-lähteen sivu on `/tools/noise-dose-calculator/` (outbound 4, homepage depth 2). Se ei ole teknisesti eristetty, mutta LNK-P2-001 korjaa samalla aidon semanttisen puutteen.

## 11. Unresolved placeholders and planned-link markers

Julkaistussa HTML:ssä tai julkaisukelpoisissa source pinnoissa ei ollut `Internal link planned`-, TODO-, TBD-, tyhjä href-, `href="#"`- tai placeholder-reittivuotoja. Yksi luonnollisen kielen “planned” on stale tuotetila, ei tekninen marker (LNK-P2-001). Draftit eivät vuoda reitteihin, indekseihin, etusivulle tai hakuun.

## 12. External-link summary

| Metric | Result |
|---|---:|
| Internal link occurrences | 1,148 (1,084 HTML + 64 search) |
| Unique internal targets | 117 |
| External HTTP URL occurrences | 902 (629 clickable + 192 runtime + 81 JSON-LD) |
| Unique external HTTP targets | 86 overall; 82 clickable |
| Direct successes (unique clickable) | 72 |
| Redirected successes | 7 |
| Automation-blocked | 3 |
| Rate-limited | 0 |
| Broken | 0 |
| Wrong target | 0 |
| Source mismatch against adjacent substantive claim | 0 |
| Unresolved HTTP targets | 0 |

Lisäksi oli 56 `mailto:`-esiintymää. Niiden syntaksi tarkistettiin, mutta sähköpostin toimitusta ei testattu. Runtime-ryhmässä ovat erikseen esimerkiksi font stylesheet ja preconnect-originit; preconnect-origineille itsenäinen dokumentti-GET ei ole mielekäs saatavuustesti.

## 13. Broken external links

Aitoja `BROKEN_4XX`, `BROKEN_5XX`, DNS/TLS-, väärä dokumentti- tai väärä kieli -tuloksia: **0**. Automaation 403-vastauksia ei luokiteltu rikkinäisiksi.

## 14. Redirected or deprecated external links

Seitsemän linkkiä ohjautui oikeaan tarkoitettuun dokumenttiin: kuusi DOI-linkkiä ja yksi BAuA:n virallinen TRLV-polku. Redirectit ovat yhdenmukaisia ja harmittomia; `KEEP AS IS`. EUR-Lex-linkkien ELI-kanoniset vastineet eivät tee nykyisistä locale-/query-linkeistä virheellisiä.

Yksi OSHA OBIS -URL toimii mutta on vanha (EXT-P3-001). Se ei ole rikkinäinen eikä kiireellinen.

## 15. Automation-blocked and manually verified links

Acta Acustica -artikkeli sekä ISO 532-1:2017- ja ISO 532-2:2017-sivut palauttivat automatisoidulle GET:lle 403. Normaali Chromium varmisti oikeat dokumentit. ISO-sivujen status oli published/current, review confirmed 2022, ja molemmat on merkitty myöhemmin revisioitaviksi. Tämä ei tee nykyisistä viittauksista vanhentuneita. Acta-artikkelin bibliografinen otsikko vaatii kahdessa saksalaisessa lähdeluettelossa korjauksen (EXT-P2-001).

## 16. DOI, PDF, standards and journal-link findings

- DOI-kohteet ratkesivat tarkoitettuihin dokumentteihin (JMIR:n lopullinen 202 hyväksyttiin toimivana julkaisuvastauksena).
- BIPM SI Brochure, 9th edition: relevantti desibeliesitys tarkistettiin Table 8:n yhteydestä, s. 146.
- NIST SP 811: relevantti logaritmisen yksikön ohje tarkistettiin § 8.7:stä.
- WHO Global Standard for Safe Listening Venues and Events: käytetty 100 dB LAeq,15min -kohta tarkistettiin Feature 1 / reference position -kohdasta.
- NIOSH 98-126: kriteeri- ja exchange-rate-kohdat tarkistettiin Table 1-1:n yhteydestä.
- OSHA OTM: altistusmalli ja lähteiden yhdistämisen rajat tarkistettiin Section III, Chapter 5, Appendix A / Table G-16A -yhteydestä.
- EU Directive 2003/10/EC: määritelmät ja action/limit values tarkistettiin Articles 2–3.
- ISO: vain virallinen abstract/status tarkistettiin; maksullisia clause-kohtia ei keksitty.

## 17. Citation metadata errors

Kaksi sivuesiintymää jakaa yhden juurisyyn: saksankielisten konsertti- ja ruohonleikkurioppaiden Acta Acustica -otsikko ei vastaa julkaistua nimeä (EXT-P2-001). DOI, URL, tekijäyhteys ja väitteen tuki ovat oikein. Muita organisaatio-, direktiivi-, DOI-, statute- tai edition-mismatch-virheitä ei löydetty.

## 18. Source-to-claim mismatches

Yksikään tarkistettu cited source ei epäonnistunut siihen liitetyn olennaisen väitteen tukemisessa. Ledgerin kaksi `SOURCE_DOES_NOT_SUPPORT_CLAIM`-riviä eivät ole bibliografisia source failure -tapauksia: ne kuvaavat stale “planned” -tilaa ja laskureiden UI-validoinnin vastaista runtime-käytöstä. Bibliografinen title mismatch käsitellään erillään kohdassa 17.

| Fact summary metric | Count |
|---|---:|
| Material claims checked | 1,211 |
| Verified | 777 |
| Verified with qualification | 427 |
| Incorrect | 2 |
| Outdated | 1 |
| Unsupported | 0 |
| Source mismatch (citation metadata occurrences) | 2 |
| Missing source | 4 |
| Product-truth conflict | 0 |
| Localization drift | 28 |
| Unverified | 1 |

Support-statukset ovat toisensa poissulkevia riveillä: 777 + 427 + 2 + 4 + 1 = 1 211. Outdated, citation metadata ja localization drift ovat läpileikkaavia korjausluokkia, joten niitä ei pidä summata uudelleen kokonaismäärään. Yhteensä 1 204 väitteen asiasisältö varmistui; 36 ledger-riviä tarvitsee jonkin korjauksen, joista 30:n asiasisältö on silti tuettu (28 math-renderöintiä ja 2 citation-titleä).

## 19. Missing or insufficient citations

Neljä shared-data-väitettä on `MISSING_SOURCE`: whisper 25–35, busy traffic 75–85, siren 105–120 ja fireworks 120–150 dB (FACT-P2-001). Rajaukset etäisyydestä, ympäristöstä, lähteestä ja mittaustavasta ovat muuten näkyvästi asianmukaiset. En löytänyt perustetta korvata arvoja toisilla vain lähteiden vaihtelun vuoksi.

## 20. Verified scientific facts and KEEP AS IS decisions

`KEEP AS IS` koskee muun muassa seuraavia tarkistettuja kokonaisuuksia:

- desibeli logaritmisena suhdelukuna; pressure/power-suhteiden 20/10-kertoimet; 20 µPa reference pressure;
- 3 dB energy ratio, 6 dB pressure/distance context, 10 dB energy ratio ja kuuluvuuden psykoakustiset kvalifikaatiot;
- A/C/Z-weighting-, LAeq-, LAFmax- ja LCpeak-erottelut;
- vapaan kentän pistelähdemallin 20 log10(r1/r2) ja näkyvät heijastus/este/maanpinta/lähdekoko/suuntaavuusrajat;
- riippumattomien yhteensopivien tasojen 10 log10(Σ10^(Li/10)) ja coherent-signal -rajaus;
- mikrofonin, prosessoinnin, AGC:n, overload/clippingin ja kalibroinnin puhelinmallikohtaiset rajoitukset;
- Class 1/Class 2 -varovaisuus: sivusto ei kuvaa puhelinta sertifioiduksi mittariksi.

## 21. Incorrect, outdated or unsupported scientific claims

Sisällöllisesti väärää tiedekaavaa tai turvallisuusrajaa ei löytynyt. Korjausta vaativat scientific-copy-pinnat ovat esitystason FACT-P1-001, lähdepolun FACT-P2-001 ja runtime-validoinnin FACT-P2-002. Yksi tekstin tuotetilaa koskeva lause on vanhentunut (LNK-P2-001). Unsupported science claims: 0.

## 22. Exposure, hearing and safety findings

NIOSH 85 dBA / 8 h / 3 dB, OSHA 90 dBA PEL / 85 dBA action level / 5 dB, WHO venue guidance ja EU/Saksa-malli pidetään erillään. Occupational-arvoja ei esitetä henkilökohtaisina turvallisuustakuina. Dose ei ole “prosentti kuulovauriosta”; phone result ei ole compliance measurement; hearing test on henkilökohtaisen baselinen seuranta eikä kliininen diagnoosi; weekly aggregate on noise-exposure summary eikä kuuloterveyden suora mittaus. `KEEP AS IS`.

## 23. Legal and regulatory findings

Directive 2003/10/EC:n daily/weekly exposure, 80/85 dB(A) action values ja 137/140 dB(C) peak action values sekä 87 dB(A)/140 dB(C) exposure limit on esitetty oikeassa EU-työympäristökontekstissa ja attenuation-rajaus säilyy. BAuA:n `L_EX,8h = L_Aeq,T + 10 lg(T/8 h)` -malli ja Saksan ylempi/alempi action value eivät sekoitu NIOSH/OSHA-kehyksiin. Ei oikeudellista löydöstä; tämä on lähdetarkistus, ei oikeudellinen neuvonta.

## 24. Typical-sound-range findings

Julkaistujen viiden EN/DE sound-guide-parin tekniset arvot ja järjestys ovat shared `sounds.ts`-datasta, eivätkä käännökset driftanneet. Oppaat kertovat etäisyyden/position, operating state -vaihtelun, ympäristön ja mittausmenetelmän vaikutuksen. Neljä ilman omaa opasta näkyvää rangea tarvitsee jäljitettävän lähdepolun (FACT-P2-001). Muut ranges: `KEEP AS IS`.

## 25. Product claim matrix

| Exact public wording | Route / website source | Current app evidence | Owner-decision evidence | Status | Confidence | Minimal correction |
|---|---|---|---|---|---|---|
| Use dBcheck's dosimeter, history, and exposure analytics to track estimated dose across measured sessions under a named standard. The planned Noise Dose Calculator can combine several level and duration pairs. Treat the result as a comparison with the selected guideline, and keep actual dose separate from any projected value. | `/articles/what-is-noise-dose/` / `src/content/articles/en/what-is-noise-dose.md:225` | src/data/tools.ts:19 and generated /tools/noise-dose-calculator/ | — | STALE | high | Replace planned with a direct descriptive link to /tools/noise-dose-calculator/; keep the model and safety qualification. |
| Live sound level meter with waveform, LAeq, LCpeak and session statistics; free for everyone. | `/` / `src/pages/index.astro:15` | PROJECT.md:614-628; AudioEngine.kt and Meter routes | — | IMPLEMENTED_NOT_RELEASE_VERIFIED | high | KEEP AS IS |
| Configurable level threshold alerts (85 dB default), distinct exposure/dose/projected-dose alerts and separate 120 dB peak warning; passive monitoring is a user-started 5-minute sample. | `/` / `src/pages/index.astro:20` | UserPreferenceDefaults.kt:16-20; NoiseAlertPolicy.kt:3-8; NoiseAlertEvaluator.kt; PROJECT.md:615 | Owner decision 5 | IMPLEMENTED_NOT_RELEASE_VERIFIED | high | KEEP AS IS |
| Weekly energy-average noise-exposure summary from the last seven days of sessions. | `/` / `src/pages/index.astro:24` | HearingHealthSummaryCalculator.kt:21-35; DecibelMath.kt:7-31; AnalyticsViewModel.kt:320 | Owner decision 6 | ACCURATE_WITH_QUALIFICATION | high | KEEP AS IS |
| PNG session sharing and optional Health Connect sync are included for every user. | `/` / `src/pages/index.astro:28` | PROJECT.md:622,632; Session Detail and HealthConnectManager code | — | IMPLEMENTED_NOT_RELEASE_VERIFIED | high | KEEP AS IS |
| On-device YAMNet analyzes live microphone audio; classifier input is not saved; optional aggregate detection events require a separate opt-in. | `/` / `src/pages/index.astro:41` | MediaPipeSoundClassifier.kt:16-92; AudioSessionManager.kt:1068-1157; UserPreferenceDefaults.kt:38-39 | Owner decision 4 | ACCURATE | high | KEEP AS IS |
| 24-band live spectrum, spectrogram and IEC/ANSI octave-band RTA. | `/` / `src/pages/index.astro:45` | PROJECT.md:626; analytics spectral components and RtaCalculator | — | IMPLEMENTED_NOT_RELEASE_VERIFIED | high | KEEP AS IS |
| PDF reports, CSV/WAV export, unlimited history, A/B/C/Z/ITU-R 468 weighting and microphone calibration. | `/` / `src/pages/index.astro:49` | PROJECT.md:626-639 and feature table | — | IMPLEMENTED_NOT_RELEASE_VERIFIED | high | KEEP AS IS |
| Phone-based NIOSH REL and OSHA PEL estimates show accumulated dose, projected dose and remaining time. | `/` / `src/pages/index.astro:61` | DosimeterCalculator.kt:16-80; PROJECT.md:628,1140-1145 | Owner decision 5 | ACCURATE_WITH_QUALIFICATION | high | KEEP AS IS |
| Sleep Monitor records a sleep session and shows notable event timing/intensity without identifying the cause of waking. | `/` / `src/pages/index.astro:65` | PROJECT.md:536,1322-1333; Sleep session code | — | ACCURATE_WITH_QUALIFICATION | high | KEEP AS IS |
| Session history and tags with Free/Pro retention allocation. | `/` / `src/pages/index.astro:77` | PROJECT.md feature table and history repositories | — | IMPLEMENTED_NOT_RELEASE_VERIFIED | high | KEEP AS IS |
| Lock-screen live meter and home-screen widget. | `/` / `src/pages/index.astro:81` | PROJECT.md:631,634 and lockscreen/widget components | — | IMPLEMENTED_NOT_RELEASE_VERIFIED | high | KEEP AS IS |
| Hughson-Westlake style threshold test plus 1/4/8 kHz recovery check against the user baseline; not clinical diagnosis. | `/` / `src/pages/index.astro:93` | PROJECT.md:538-540,636 and hearingtest domain | — | ACCURATE_WITH_QUALIFICATION | high | KEEP AS IS |
| Personal tinnitus pitch profile and ambient sounds are in planned launch scope. | `/` / `src/pages/index.astro:97` | PROJECT.md:542-543,646 and implemented tinnitus/ambient routes; owner prompt supersedes old v1.5 allocation | Owner decisions 7–8 | OWNER_APPROVED_LAUNCH_SCOPE | high | KEEP AS IS |
| Free plan feature allocation. | `/` / `src/pages/index.astro:104` | PROJECT.md:614-624 feature table | — | IMPLEMENTED_NOT_RELEASE_VERIFIED | high | KEEP AS IS |
| Pro plan feature allocation. | `/` / `src/pages/index.astro:116` | PROJECT.md:626-646 feature table plus owner tinnitus launch decision | Owner decisions 7–8 | OWNER_APPROVED_LAUNCH_SCOPE | high | KEEP AS IS |
| Android sound awareness and personal hearing-result tracking app. | `/` / `src/pages/index.astro:132` | Android app checkout plus owner weekly/hearing positioning decision | Owner decision 6 | ACCURATE | high | KEEP AS IS |
| Android app measures everyday sound, follows exposure and compares personal checks to own baseline. | `/` / `src/pages/index.astro:166` | AudioEngine, analytics, hearingtest and repository code | — | IMPLEMENTED_NOT_RELEASE_VERIFIED | high | KEEP AS IS |
| 44.1 kHz sampling, RMS-to-dB, LAeq energy averaging, one-second persistence and weekly analytics. | `/` / `src/pages/index.astro:231` | AudioProcessingConfig/AudioEngine, DecibelCalculator, repositories and DecibelMath | — | IMPLEMENTED_NOT_RELEASE_VERIFIED | high | KEEP AS IS |
| Phone-based NIOSH/OSHA estimates, not a certified dosimeter. | `/` / `src/pages/index.astro:248` | DosimeterCalculator.kt and owner decision | Owner decision 5 | ACCURATE_WITH_QUALIFICATION | high | KEEP AS IS |
| Sleep Monitor shows notable event timing and loudness, not what woke the user. | `/` / `src/pages/index.astro:263` | Sleep results/insights code and owner safety boundary | — | ACCURATE_WITH_QUALIFICATION | high | KEEP AS IS |
| Personal threshold/recovery tracking is relative to own baseline and not a clinical hearing test or diagnosis. | `/` / `src/pages/index.astro:280` | hearingtest domain and PROJECT.md:538-540 | Owner hearing-test boundary | ACCURATE_WITH_QUALIFICATION | high | KEEP AS IS |
| Pro is intended as a single one-time purchase with no subscription. | `/` / `src/pages/index.astro:339` | BillingManager.kt:52,117,166-167 uses INAPP product dbcheck_pro; Play Console not accessible | — | ACCURATE_WITH_QUALIFICATION | high | KEEP AS IS |
| Regional website prices and Google Play local-currency final charge. | `/` / `src/pages/index.astro:340` | src/data/prices.ts; Play Console regional configuration unavailable | — | UNVERIFIABLE | medium | KEEP AS IS |
| Audio analysis and app data are on-device; no account is required. | `/` / `src/pages/index.astro:450` | Manifest has no INTERNET permission or auth/account component; app repositories are local | — | ACCURATE | high | KEEP AS IS |
| Health Connect shares only supported session data when explicitly enabled. | `/` / `src/pages/index.astro:451` | UserPreferenceDefaults.kt:34-35; HealthConnectManager and disclosure activity | — | IMPLEMENTED_NOT_RELEASE_VERIFIED | high | KEEP AS IS |
| Optional Pro WAV recording is a separate opt-in and off by default. | `/` / `src/pages/index.astro:452` | UserPreferenceDefaults.kt:41; AudioSessionManager.kt:145,1165-1197; AudioEngine.kt:134-152 | Owner decision 4 | ACCURATE | high | KEEP AS IS |
| Raw classifier audio is not uploaded for cloud analysis. | `/` / `src/pages/index.astro:453` | MediaPipeSoundClassifier local inference; no classifier upload path; no INTERNET permission | Owner decision 4 | ACCURATE | high | KEEP AS IS |
| dBcheck for Android is in final tuning before release. | `/` / `src/pages/index.astro:475` | Explicit owner public-communication decision | Owner decisions 9–10 | OWNER_APPROVED_LAUNCH_SCOPE | high | KEEP AS IS |
| dBcheck supports education, awareness and personal relative tracking; it is not a certified sound level meter or clinical diagnostic tool. | `sitewide` / `src/layouts/Base.astro:151` | current Android app has no Class 1/2 certification or clinical audiometry claim | Owner safety/product boundaries | ACCURATE_WITH_QUALIFICATION | high | KEEP AS IS |

Matriisi käyttää app checkoutia eikä website-repon vanhaa root PROJECT.md:tä. “Implemented not release verified” ei tarkoita copy-virhettä; se erottaa koodinäytön Play-release-todennuksesta. Omistajan tinnitus- ja release-stage-päätöksiä ei tulkittu uudelleen.

## 26. Pricing and availability findings

Website-price data, EUR fallback ja yhden kerran Pro-tuotemalli ovat sisäisesti johdonmukaisia appin billing-tyypin kanssa. Play Console regional configuration ei ollut saatavilla, joten yhtä ledger-riviä merkitään `SOURCE_UNAVAILABLE_FOR_VERIFICATION` / `UNVERIFIABLE`. Tämä ei ole löydös eikä osoitus väärästä hinnasta. “In final tuning before release” ja launch scope säilyvät owner-approved päätöksinä.

## 27. Calculator and formula verification

| Calculator/model | Independent checks | Result |
|---|---|---|
| NIOSH exposure time | 70 dBA = 256 h; 85 = 8 h; 94 = 1 h; 115 = 0.0078125 h | Correct |
| EU/German exposure time | 70 = 252.9822 h; 85 = 8 h; 94 = 1.00714 h; 115 = 0.008 h; DE 94 renders “1 Stunde” | Correct |
| Logarithmic addition | 80+80 = 83.0103; 80+70 = 80.4139; 80.5+80.5 = 83.5103; −100+−100 = −96.9897 | Correct |
| Distance attenuation | 90 dB at 1→2 m = 83.9794; 1→0.5 m = 96.0206; same distance = 90; decimal case = 82.5412 | Correct |
| NIOSH multi-period dose | default = 100%; 94 dBA/1 h = 100%; decimal case = 17.5385%; declared extreme 115/24 h = 307200% | Correct |
| EU/German L_EX,8h | 85/8 = 85; 85/4 + 88/2 = 84.99485 (display 85.0); decimal = 72.438 | Correct |

Empty/non-numeric input sekä nonpositive duration/distance hylättiin. Decimal formatting toimi englanniksi ja saksaksi (esim. 83.5 / 83,5). Safe-listening slider ei kärsi löydöksestä. Neljä script-perhettä kuitenkin ohittaa HTML min/max validityn äärellisille arvoille (FACT-P2-002). Kaavojen selitykset ja authoritative model sources vastaavat koodia.

## 28. Localization and translation-drift findings

Numerot, yksiköt, source links, legal status, turvallisuus- ja lääketieteelliset rajaukset sekä internal targets säilyivät EN/DE-pareissa. Rekisteröidyt hreflang-parit olivat reciprocal; tahatonta cross-locale-linkitystä oli 0 (nimenomaiset “English”-kielenvaihdot rajattiin oikein). Saksalaisia reittisegmenttejä käytetään ohjeiden mukaisesti eikä `/de/`-etusivua ole keksitty.

Ledgerissä 28 claim-riviä on `UNTRANSLATED_FRAGMENT` yhden yhteisen P1-ongelman vuoksi; ne kattavat 38 renderöitymätöntä kaavailmaisua (FACT-P1-001), eivät numeerista tai oikeudellista driftia. Kaksi `WRONG_SOURCE`-riviä ovat citation-title metadata, eivät väärä väitetuki.

## 29. Metadata and structured-data facts

Kaikilla 56 indeksoitavalla sivulla oli täsmälleen yksi H1, uniikki title ja description, oma self-canonical ja sitemap-jäsenyys. Hreflangit vastasivat rekisteröityjä EN/DE-pareja. Open Graph-, Twitter-, search JSON- ja 81 JSON-LD-URL-esiintymää vastasivat visible page/locale/route -tilaa. Unsupported ratings-, certification-, medical-device-, fabricated author- tai väärä availability -väitteitä ei löytynyt. Lisää schemaa ei suositella.

## 30. Owner-approved decisions that were preserved

- GA4 on poistettu; sitä, korvaavaa analytiikkaa tai consent banneria ei suositella palautettavaksi.
- YAMNet/live input, classifier persistence, opt-in event storage, separate Pro WAV ja no raw cloud analysis -rajat säilytettiin.
- Phone-based dosimeter estimate, default 85 dB threshold, separate 120 dB peak warning ja event-type-erot säilytettiin.
- Weekly exposure summary pidettiin erillään direct hearing-health measurement -väitteestä.
- Tinnitus pitch profile säilyi launch presentationissa eikä vanhaa v1.5-merkintää käytetty vastaväitteenä.
- “In final tuning before release” säilyi tarkoituksellisena viestintäpäätöksenä.

## 31. Prioritized implementation batches

### Batch 1 — yksi P1-juurisyy

Korjaa vain FACT-P1-001:n 38 matikkadelimiteriä yhdeksässä saksankielisessä artikkelissa. Tämä on pieni, matalariskinen ja näkyvästi rikkoutunutta tiedollista sisältöä korjaava batch. Älä muuta kaavojen arvoja tai muuta copya.

### Batch 2 — rajatut P2-korjaukset

1. LNK-P2-001 ja LNK-P2-002 (kaksi semanttista internal-link-korjausta).
2. EXT-P2-001 (kaksi Acta-title-stringiä).
3. FACT-P2-001 (source-backed Explorer ranges) ja FACT-P2-002 (validity gate + focused tests).
4. LNK-P2-003 vasta Cloudflare 404 asset -käytöksen täsmällisen toteutustavan varmistuksen jälkeen.

### Batch 3 — valinnainen P3

EXT-P3-001:n legacy OSHA URL voidaan päivittää nykyiseen official canonicaliin, mutta toimivaa lähdettä ei tarvitse vaihtaa kiireellisenä työnä.

### Täydet löydökset


### FACT-P1-001 — Saksan matemaattiset lausekkeet näkyvät raakatekstinä

1. **ID:** FACT-P1-001
2. **Severity:** P1
3. **Confidence:** high
4. **Exact route:** yhdeksän saksankielistä artikkelireittiä: `/de/artikel/db-und-dba-unterschied/`, `/de/artikel/laermexpositionsgrenzen-deutschland-eu/`, `/de/artikel/sind-3-db-doppelt-so-laut/`, `/de/artikel/warum-ist-die-dezibelskala-logarithmisch/`, `/de/artikel/warum-sind-85-db-wichtig/`, `/de/artikel/was-ist-ein-dezibel/`, `/de/artikel/was-ist-eine-laermdosis/`, `/de/artikel/was-ist-schalldruckpegel/` ja `/de/artikel/wie-lange-85-db-hoeren/`.
5. **Exact source file and line:** vastaavat Markdown-tiedostot; ensimmäiset osoittavat rivit 44, 45, 32, 50, 35, 34, 33, 39 ja 82.
6. **Exact wording or link:** 38 `\(...\)`- tai `\[...\]`-rajattua matemaattista lauseketta.
7. **Link status:** N/A.
8. **Source used:** paikallinen tuotantorenderöinti ja vastaavat englanninkieliset artikkelit.
9. **Exact source location:** affected pages contain 0 KaTeX nodes; working English math output contains 96 KaTeX nodes.
10. **Why incorrect:** Astro-konfiguraatio käsittelee `$...$`/`$$...$$`-syntaksin, mutta saksalaiset delimiters eivät mene remark-math-käsittelyyn. Itse kaavat ovat sisällöllisesti oikein.
11. **Minimal correction:** muuta vain 38 delimiteriä projektissa toimivaan Markdown-matikkasyntaksiin; älä muuta kaavojen sisältöä.
12. **Files likely affected:** yllä luetellut yhdeksän `src/content/articles/de/*.md`-tiedostoa.
13. **Risk of correction:** low.
14. **Acceptance criteria:** kaikki 38 lauseketta renderöityvät KaTeXina; raakadelimitereitä ei näy; build ja parity-tarkistus läpäisevät.
15. **Scope:** one locale.

### LNK-P2-001 — Julkaistu laskuri kuvataan edelleen suunnitelluksi

1. **ID:** LNK-P2-001
2. **Severity:** P2
3. **Confidence:** high
4. **Exact route:** `/articles/what-is-noise-dose/`.
5. **Exact source file and line:** `src/content/articles/en/what-is-noise-dose.md:225`.
6. **Exact wording or link:** “The planned Noise Dose Calculator can combine several level and duration pairs.”
7. **Link status:** target `/tools/noise-dose-calculator/` is live locally and productionissa (200), but the sentence has no link.
8. **Source used:** current route inventory and generated page.
9. **Exact source location:** calculator route; the page is the graph's only node with one inbound edge.
10. **Why incorrect:** “planned” is stale and omits the most useful task continuation.
11. **Minimal correction:** remove “planned” and link the calculator name directly to the live canonical route.
12. **Files likely affected:** only the Markdown file above.
13. **Risk of correction:** low.
14. **Acceptance criteria:** wording no longer says planned; direct locale-correct link returns 200 without redirect.
15. **Scope:** one occurrence.

### LNK-P2-002 — Saksankielinen artikkeli tarjoaa kontekstuaalisen linkin itseensä

1. **ID:** LNK-P2-002
2. **Severity:** P2
3. **Confidence:** high
4. **Exact route:** `/de/artikel/dezibel-messen-mit-android-handy/`.
5. **Exact source file and line:** `src/components/EditorialPage.astro:83-85`.
6. **Exact wording or link:** “Messanleitung lesen” → sama reitti.
7. **Link status:** 200 direct, mutta self-link.
8. **Source used:** generated internal-link graph and shared CTA logic.
9. **Exact source location:** German measurement CTA branch.
10. **Why incorrect:** CTA lupaa seuraavan ohjeen mutta palauttaa nykyiselle sivulle.
11. **Minimal correction:** estä tämä CTA tällä reitillä tai valitse olemassa oleva, täsmällinen saksankielinen seuraava askel.
12. **Files likely affected:** `src/components/EditorialPage.astro`.
13. **Risk of correction:** low.
14. **Acceptance criteria:** nykyisellä reitillä ei ole kontekstuaalista self-CTA:ta; muiden sivujen CTA:t säilyvät.
15. **Scope:** one template.

### LNK-P2-003 — Productionin tuntematon reitti palauttaa tyhjän 404-rungon

1. **ID:** LNK-P2-003
2. **Severity:** P2
3. **Confidence:** high
4. **Exact route:** satunnainen olematon reitti, esimerkiksi `/__dbcheck-audit-missing-20260822/`.
5. **Exact source file and line:** deployment assets configuration `wrangler.jsonc:7-15`; varsinaista omaa 404-sivua ei ole.
6. **Exact wording or link:** live status 404 with empty response body; local Astro preview returned an HTML 404 body.
7. **Link status:** 404 as expected; recovery body differs.
8. **Source used:** local/live GET comparison 2026-08-22.
9. **Exact source location:** Cloudflare custom-domain static asset behavior.
10. **Why incorrect:** status is right, but production gives users and crawlers no navigable recovery page. No current internal link points there.
11. **Minimal correction:** provide one static navigable 404 document while retaining HTTP 404; verify Cloudflare's exact asset fallback behavior first.
12. **Files likely affected:** one new 404 route/asset and possibly `wrangler.jsonc` depending on verified runtime configuration.
13. **Risk of correction:** medium.
14. **Acceptance criteria:** arbitrary unknown URL returns status 404, non-empty localized-or-neutral HTML and a link to `/`; existing routes unchanged.
15. **Scope:** complete site.

### FACT-P2-001 — Neljän Explorer-only-äänialueen numeerista lähdepolkua ei näytetä

1. **ID:** FACT-P2-001
2. **Severity:** P2
3. **Confidence:** high
4. **Exact route:** `/`, `/sounds/` ja `/de/alltagsgeraeusche/`.
5. **Exact source file and line:** `src/data/sounds.ts:27,30,34-35`.
6. **Exact wording or link:** whisper 25–35 dB, busy traffic 75–85 dB, siren 105–120 dB, fireworks 120–150 dB.
7. **Link status:** N/A.
8. **Source used:** current structured data, rendered indexes and NIDCD official examples as a comparison source.
9. **Exact source location:** NIDCD lists approximate examples but does not establish these exact four ranges under the site's stated conditions.
10. **Why incorrect:** ranges may be defensible, and surrounding caveats are good, but the audit cannot trace the exact endpoints to a visible authoritative basis.
11. **Minimal correction:** add a visible source path that supports each exact contextual range, or adjust only the endpoints/context that the chosen source actually establishes.
12. **Files likely affected:** `src/data/sounds.ts` and the smallest shared source-rendering surface.
13. **Risk of correction:** medium.
14. **Acceptance criteria:** every displayed Explorer-only range maps to a source with metric/condition/distance context; both locales remain numerically identical.
15. **Scope:** all locales.

### EXT-P2-001 — Kahdessa saksankielisessä lähdeviitteessä on väärä tutkimuksen nimi

1. **ID:** EXT-P2-001
2. **Severity:** P2
3. **Confidence:** high
4. **Exact route:** `/de/alltagsgeraeusche/konzert/` ja `/de/alltagsgeraeusche/rasenmaeher/`.
5. **Exact source file and line:** `src/content/sounds/de/konzert.md:16,142`; `src/content/sounds/de/rasenmaeher.md:16,132`.
6. **Exact wording or link:** “Comparison between Android applications and Class-I sound level meter under free-field conditions”.
7. **Link status:** AUTOMATION_BLOCKED (403), manually verified in a normal browser.
8. **Source used:** Acta Acustica article and DOI 10.1051/aacus/2026001.
9. **Exact source location:** published title, 11 March 2026: “Comparison between android applications and Class-I sound level meters in SPL measurement performance”.
10. **Why incorrect:** URL and research support are appropriate, but displayed bibliographic title is not the published title.
11. **Minimal correction:** replace only the two title strings (frontmatter and visible source list); retain URL and adjacent claims.
12. **Files likely affected:** the two German sound Markdown files.
13. **Risk of correction:** low.
14. **Acceptance criteria:** rendered title exactly matches the journal metadata; DOI/URL unchanged.
15. **Scope:** one locale.

### FACT-P2-002 — Neljä laskuriperhettä laskee HTML-rajojen ulkopuolisia arvoja

1. **ID:** FACT-P2-002
2. **Severity:** P2
3. **Confidence:** high
4. **Exact route:** noise dose, daily exposure, decibel distance and add-decibels routes in their published EN/DE variants (7 routes).
5. **Exact source file and line:** `src/scripts/tool-calculators.ts:85,147,188,249-260`.
6. **Exact wording or link:** browser inputs become `validity.valid=false`, yet the input handler still emits a numeric result.
7. **Link status:** N/A.
8. **Source used:** direct browser boundary tests and source inspection.
9. **Exact source location:** examples: 69 dBA noise dose → 0.31%; 201 dB addition → 201.0 dB; −1 dB(A) daily exposure → −1.0 dB(A); −5 dB reference level → −11.0 dB.
10. **Why incorrect:** arithmetic remains finite, but the scripts do not consistently enforce their own HTML `min`/`max` constraints before displaying a result.
11. **Minimal correction:** reject any participating input whose `validity.valid` is false before calculation; preserve existing domain formulas.
12. **Files likely affected:** `src/scripts/tool-calculators.ts` and focused calculator tests.
13. **Risk of correction:** low.
14. **Acceptance criteria:** all four calculator families show the existing invalid state for below-min/above-max input in both locales; valid/boundary calculations remain unchanged.
15. **Scope:** one template/script across all locales.

### EXT-P3-001 — Yksi OSHA-linkki käyttää toimivaa vanhaa URL-rakennetta

1. **ID:** EXT-P3-001
2. **Severity:** P3
3. **Confidence:** high
4. **Exact route:** `/tools/add-decibels/`.
5. **Exact source file and line:** `src/pages/tools/add-decibels.astro:31`.
6. **Exact wording or link:** `https://obis.osha.gov/dts/osta/otm/new_noise/`.
7. **Link status:** OK_BUT_DEPRECATED_URL; returns the intended legacy official page.
8. **Source used:** live GET and current OSHA OTM canonical.
9. **Exact source location:** `https://www.osha.gov/otm/section-3-health-hazards/chapter-5`.
10. **Why incorrect:** not broken or wrong; the current official canonical is more stable.
11. **Minimal correction:** optionally replace only the URL after confirming the destination section still supports the nearby addition caveat.
12. **Files likely affected:** only `src/pages/tools/add-decibels.astro`.
13. **Risk of correction:** low.
14. **Acceptance criteria:** exact intended OSHA guidance opens directly and adjacent claim support is preserved.
15. **Scope:** one occurrence.


## 32. Explicit DO NOT CHANGE list

- Älä muuta nykyisiä canonicaleja, hreflangeja, sitemap-logiikkaa, locale-reittejä tai kahdeksaa legacy redirectiä tämän auditin perusteella.
- Älä korvaa toimivia primary source -linkkejä vain redirectin poistamiseksi tai automaation 403:n vuoksi.
- Älä muuta oikein rajattuja acoustic-, exposure-, hearing-, legal- tai calculator-formula -tekstejä.
- Älä kuvaa puhelinta Class 1/Class 2- tai certified dosimeter -laitteeksi.
- Älä poista tinnitus launch scopea tai muuta “in final tuning before release” -viestiä.
- Älä palauta GA4:ää, lisää analytiikkaa tai consent banneria.
- Älä muuta Google Fonts -toteutusta, hintaa, Google Play -tilaa tai Android-koodia tämän raportin perusteella.
- Älä lisää linkkejä täyttääksesi keinotekoista per-page quota -määrää.

## 33. Validation commands and exact results

- `npm run check`: success; 57 files, 0 errors, 0 warnings, 16 informational hints (Astro `z` deprecation and inline-script hints).
- `npm test`: 16 tests passed, 0 failed.
- `npm run build`: success; 56 indexable routes and 8 redirect outputs generated.
- Production preview: Astro selected `http://127.0.0.1:4322` because port 4321 belonged to an unrelated existing process; all 56 indexable routes returned 200.
- Live crawl: all 56 indexable routes returned 200; all 56 byte-identical and visible-text-identical to local.
- Aux endpoints: 5/5 local/live 200 and byte-identical (two search indexes, robots, sitemap index, sitemap file).
- Internal crawl: 1,148 occurrences; 117 unique targets; 0 broken URLs/fragments.
- External clickable GET audit: 82 unique; 72 direct, 7 redirected, 3 automation-blocked/manual-verified, 0 broken/rate-limited/auth-required/unresolved.
- Browser: desktop navigation/search, Sound Explorer, hero Listen/Mute; mobile German navigation/search/language switch; calculator normal/boundary/empty/invalid/decimal/negative/extreme/rounding/localization paths.
- Editorial reference integrity: 40 Markdown files, 229 reference definitions, 229 used IDs, 0 missing and 0 unused.

## 34. All unresolved uncertainties

1. Play Consolein live regional pricing/product availability was not accessible: store state remains `UNVERIFIABLE`.
2. ISO 532-1/532-2 full paid standard text was not accessible; only official abstracts/status were used and no clause-level claim was invented.
3. Three automation-blocked official pages were verified in browser, but their scripted reachability may vary by anti-bot policy.
4. PDF page rendering was unavailable locally; relevant authoritative locations were verified through official text/browser access, not visual page-layout comparison.
5. The four Explorer-only ranges need a traceable exact source before choosing whether any numeric endpoint should change.
6. Cloudflare's precise preferred 404-asset configuration must be reproduced before implementing LNK-P2-003; the observed live behavior itself is confirmed.
7. `mailto:` syntax was checked, but end-to-end mail delivery was not tested.

## 35. Final recommendation

Hyväksy nykyinen linkki- ja faktapohja muutoin sellaisenaan. Ensimmäinen toteutusbatch on ainoastaan FACT-P1-001:n matikkadelimiterien korjaus ja sen renderöintivarmistus. Sen jälkeen käsittele kuusi P2-juurisyytä pieninä, toisistaan eroteltuina korjauksina. P3 OSHA URL on valinnainen. Tuotantoon ei pidä tehdä muita auditista johdettuja sisältö-, route-, SEO-, product-scope- tai analytics-muutoksia.
