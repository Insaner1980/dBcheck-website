# dBcheck-verkkosivusto: toteutus- ja tarkistusviite

Päivitetty 30.8.2026. Dokumentti kuvaa tämän repositorion paikallista toteutusta, ei tavoitetilaa eikä erillisen Android-sovelluksen arkkitehtuuria. Tarkistuksen lähtöcommit oli `a2fc23f` (28.8.2026). Tiedostopolut ovat tämän repositorion juureen suhteutettuja, ellei toisin sanota.

Käytä tätä dokumenttia karttana koodintarkistuksiin, UI-muutoksiin, artikkelityöhön, lokalisointiin ja julkaisutarkistuksiin. Varsinainen todiste toiminnasta on aina nykyinen lähdekoodi, tuore rakennettu sivu tai nimenomaisesti ajettu testi. Historiallinen auditointi, suunnitelma tai tämä tilannekuva ei yksin todista nykyisen tuotantojulkaisun käyttäytymistä.

## Sisältö

1. Projektin rajaus ja tärkeimmät lähtökohdat
2. Lähdekoodin omistajuuskartta
3. Tekniikkapino, konfiguraatio ja komennot
4. Julkiset reitit ja kieliparit
5. Lokalisointi, navigaatio ja haku
6. Yhteinen UI, typografia ja responsiivisuus
7. Etusivu, video, mittaridemo ja ominaisuusesittely
8. Sound Explorer ja yhteinen äänidata
9. Laskurit, kaavat ja syötevalidointi
10. Artikkelijärjestelmä ja toimituksellinen työ
11. Metadata, structured data ja resurssit
12. Verkkopyynnöt, tietosuoja ja julkaisu
13. Testit ja todentamisen rajat
14. Muutoskohtaiset tarkistuslistat
15. Nykyiset poikkeukset ja dokumenttien asema
16. Tämän dokumentin ylläpito

## 1. Projektin rajaus ja tärkeimmät lähtökohdat

Sivusto on Astro 7:llä rakennettava staattinen monisivusivusto. Se yhdistää englanninkielisen dBcheck Android -sovelluksen esittelysivun, englannin- ja saksankieliset tietosisällöt, Common Sounds Explorerin sekä maksuttomat selaimessa toimivat laskurit.

Keskeiset rajat:

- Sivustossa ei ole Android-/Compose-/Room-/Hilt-toteutusta, käyttäjätilejä, sovelluksen entitlement-tarkistusta, maksamista tai mittaussessioiden tietokantaa.
- Etusivun Free/Pro-listat ja hinnat ovat markkinointisisältöä. Ne eivät toteuta tai todista Android-sovelluksen ominaisuusportteja.
- Kaikki verkkotyökalut ovat maksuttomia, eikä niitä ole sidottu dBcheck Prohon.
- Hero-mittari käsittelee hero-videon ääntä Web Audiolla. Se ei mittaa huoneen ääntä, käytä mikrofonia eikä anna kalibroitua SPL-/dBA-tulosta.
- Englanti on oletuskieli ilman URL-etuliitettä. Saksa käyttää `/de/`-alkuisia sisältöreittejä.
- Etusivu on vain englanniksi. `/de/`-etusivua ei generoida.
- Tässä repositoriossa toteutettu käyttöliittymä on tumma. Etusivun Android-ominaisuuslistan `Dark / light theme` ei tarkoita verkkosivuston teemavalitsinta.
- Sivuston lähteessä ei ole GA4-lataajaa tai analytiikan suostumuspaneelia. Hosting-tilin asetuksia ei voi päätellä tästä.
- Sivuston build, Git-push ja tuotantojulkaisu ovat eri tapahtumia.

Nykyisen sisältökannan laajuus:

| Kohde | Englanti | Saksa | Yhteensä |
| --- | ---: | ---: | ---: |
| Tavalliset artikkelit | 15 | 15 | 30 |
| Sound-artikkelit | 5 | 5 | 10 |
| Explorerin äänivertailut | 9 | 9 | Samat 9 teknistä tietuetta |
| Työkaluhakemiston kohteet | 6 | 5 | 11 paikallista esitystä |
| Varsinaiset laskurisivut | 5 | 4 | 9 |
| Indeksoitavat HTML-sivut | 29 | 27 | 56 |

Kaikki nykyiset 40 Markdown-sisältöä ovat julkaistavia, eivät `draft: true` -sisältöjä. Rakennuksen odotettu HTML-kokonaisuus on 56 indeksoitavaa sivua, 8 legacy-uudelleenohjausdokumenttia sekä englannin `404.html` ja saksan `de/404.html`, yhteensä 66. Hakua palvelee lisäksi kaksi JSON-tiedostoa. Määrät ovat nykytilan testibaseline, eivät arkkitehtuurin yleinen rajoitus.

## 2. Lähdekoodin omistajuuskartta

### 2.1 Mistä aloittaa

| Kysymys tai muutos | Ensisijaiset lähteet |
| --- | --- |
| Sivun yhteinen ulkoasu, fontit, header, footer, haku, metadata | `src/layouts/Base.astro` |
| Etusivun tekstit, hinnoittelukortit, Pro-esittely, Web Audio -demo | `src/pages/index.astro` |
| Locale, päivämääräkieli ja Open Graph -locale | `src/i18n/config.ts` |
| Yhteiset käännetyt tekstit ja artikkeliryhmien nimet | `src/i18n/ui.ts` |
| Slugit, en–de-parit ja hreflangit | `src/i18n/routes.ts` |
| Hakutulosten muodostus | `src/i18n/search.ts` |
| Kielivalitsimen toiminta ja saavutettavuus | `src/components/LanguageSwitcher.astro` |
| Sisältöskeema ja kokoelmien ID:t | `src/content.config.ts` |
| Artikkelin rakenne, CTA, related-lista ja Article-schema | `src/components/EditorialPage.astro` |
| Artikkeli-indeksin ryhmittely ja järjestys | `src/components/ArticleIndexPage.astro` |
| Sound-arvot, lähteet, järjestys ja lokalisoidut tekstit | `src/data/sounds.ts` |
| Explorerin valinta, vaihteluvälipalkki ja mobiiliesitys | `src/components/SoundExplorer.astro` |
| Työkalujen nimet, järjestys ja hakumetadata | `src/data/tools.ts` |
| Laskurien yhteinen sivurakenne ja lomaketyylit | `src/components/CalculatorPage.astro` |
| Monikenttälaskurit, rivien lisäys ja numerostepperit | `src/scripts/tool-calculators.ts` |
| Alueelliset Free-/Pro-hinnat | `src/data/prices.ts`, `src/scripts/localized-price.ts` |
| Scramble-liike | `src/scripts/motion.ts`, `src/scripts/scramble-engine.ts` |
| Kaavojen käsittely, sitemap, legacy-reitit | `astro.config.mjs` |
| HTTP-suojaus, HTTP-uudelleenohjaukset ja Cloudflare-kohde | `public/_headers`, `public/_redirects`, `wrangler.jsonc` |
| Tuoreen buildin sopimukset ja regressiot | `test/` |
| Otsikoiden ja linkkien oikea selainrivitys | `scripts/text-wrapping.browser.mjs` |

### 2.2 Hakemistot ja suoritusympäristöt

| Polku | Vastuu |
| --- | --- |
| `src/pages/` | Astro-reitit. Useimmat ovat ohuita yhteisten sivukomponenttien kääreitä. |
| `src/components/` | 16 Astro-komponenttia: yhteiset sivut, laskurien HTML, Explorer, kielivalitsin, 404-rakenne ja koristekisko. |
| `src/layouts/` | Yksi yhteinen `Base.astro`. |
| `src/content/articles/en/`, `src/content/articles/de/` | Tavalliset artikkelit. |
| `src/content/sounds/en/`, `src/content/sounds/de/` | Viisi sound-opasta kummallakin kielellä. |
| `src/i18n/` | Locale-konfiguraatio, yhteinen UI-copy, reittirekisteri ja hakudatan rakentaja. |
| `src/data/` | Äänet, työkalut, hinnat ja sosiaalisten jakojen kuvavalinnat. |
| `src/lib/` | Puhtaat laskennat, näyttöasteikko sekä build-assetien, editorial-reittien ja Markdownin turvallisuusguardit. |
| `src/scripts/` | Selaimen yhteinen laskuri-, hinta- ja scramble-logiikka. |
| `src/assets/` | Astro-putken kautta käsiteltävät artikkeli- ja ominaisuuskuvat. |
| `public/` | Suoraan buildiin kopioitavat videot, logo, OG-kuvat, robots ja hosting-tiedostot. |
| `test/` | Node-testit lähdetiedostoille, puhtaille funktioille ja valmiille HTML/CSS/JSON/XML-tiedostoille. |
| `scripts/` | Build-wrapper ja sen tuoreusvartija sekä oikean selaimen rivitys- ja vuorovaikutusharness. |
| `docs/audits/`, `docs/owner-input/` | Päivättyä evidenssiä ja omistajalta tarvittavia tietoja. |
| `output/` | Aikaisempia selain-/Lighthouse-artefakteja; ei sivuston runtime-lähde. |
| `dist/`, `.astro/`, `node_modules/` | Generoitu tuotos, Astro-tyypit/välimuisti ja asennetut riippuvuudet. |

Build-vaiheessa Astro lukee Markdownin ja datan, generoi reitit ja HTML:n sekä rakentaa selainassetit, hakuindeksit ja sitemapin. Selaimessa suoritetaan vain sivuihin liitetyt scriptit. `astro:content`-kyselyt eivät ole selainpuolen API-pyyntöjä.

Tyypillinen sisältöketju:

```text
Markdown + content.config.ts
  -> Astro-kokoelma (locale/slug-ID)
  -> getStaticPaths: julkaistu sisältö + locale
  -> EditorialPage -> Base -> dist/HTML

Sama kokoelma
  -> ArticleIndexPage
  -> buildSearchIndex -> search.json

routes.ts
  -> URL:t + kieliparit
  -> Base-hreflangit + kielivalitsin
  -> sitemapin kielilinkit
```

## 3. Tekniikkapino, konfiguraatio ja komennot

### 3.1 Riippuvuudet

Alla ovat `package-lock.json`-tiedoston ratkaistut versiot. `package.json` sallii osassa paketeista caret-päivityksiä; lockfile määrää toistettavan asennuksen.

| Paketti | Lockfile-versio | Käyttö |
| --- | --- | --- |
| `astro` | 7.1.6 | Staattinen sivusto, reitit, komponentit ja build. |
| `@astrojs/markdown-remark` | 7.2.2 | Markdown-prosessori; myös testien frontmatter-luenta. |
| `@astrojs/sitemap` | 3.7.3 | Sitemap ja rekisteröityjen kieliparien linkit. |
| `animejs` | 4.5.0 | Hero-mittari, kisko, CTA-aalto ja scramble-moottori. |
| `katex` | 0.17.0 | Kaavojen generoitu esitys ja fontti-/CSS-resurssit. |
| `rehype-katex` | 7.0.1 | Matematiikkasolmujen renderöinti buildissa. |
| `remark-math` | 6.0.0 | Matematiikan tunnistus Markdownissa. |
| `@astrojs/check` | 0.9.10 | Erillinen Astro-/TypeScript-tarkistus. |
| `typescript` | 6.0.3 | Tyyppitarkistus. |
| `prettier` | 3.9.6 | Muotoilutyökalu. |
| `prettier-plugin-astro` | 0.14.1 | Astro-tiedostojen Prettier-parseri. |
| `wrangler` | 4.125.0 | Cloudflare-kehitys- ja julkaisutyökalu. |

Paketti on `dbcheck-website`, versio `0.1.0`, `type: module`, `private: true`. Tämä npm-versio ei ole Android-sovelluksen release-versio.

Juuripaketin `engines` vaatii Node-version `>=22.12.0`. Tämän tarkistuksen paikallinen ympäristö: Node `24.19.0`, npm `11.17.0`.

Ei Reactia, Vuea, Tailwindia, raskasta frontend-kehystä tai erillistä asiakaspuolen tilakirjastoa. KaTeX suoritetaan sisällön build-putkessa; artikkelin matematiikka ei vaadi selaimessa ajettavaa KaTeX-renderöijää. `parse5` on testien suora dev-riippuvuus.

### 3.2 Konfiguraation vastuut

- `astro.config.mjs`: `site: https://dbcheck.app`, i18n, sitemapin serialisointi, Markdown-pluginit, KaTeX-fonttien inline-estot ja 8 legacy-reittiä. SSR-adapteria tai palvelinpuolen sovelluslogiikkaa ei ole konfiguroitu.
- `tsconfig.json`: laajentaa `astro/tsconfigs/base`-asetusta, ottaa mukaan `.astro/types.d.ts`-tiedoston ja sulkee `dist`-hakemiston pois. Se ei käytä Astro strict -presetiä.
- `.prettierrc`: Astro-plugin ja `*.astro`-parseriohitus. `.prettierignore` sulkee mm. buildin, työkaluvälimuistit, `output`-hakemiston ja lockfilen pois.
- `.gitignore`: mm. `node_modules/`, `dist/`, `.astro/`, `.playwright-cli/` ja npm-debug-lokit.
- `package.json`: kehitys-, check-, build-, preview-, Node-testi-, selain-, dry-run- ja deploy-scriptit. Lint-, format-, coverage- tai watch-testiscriptiä ei ole.
- Repositorion `.github/workflows/`-hakemistoa ei ole. Paikallinen lähde ei siten todista GitHub Actions -buildia tai automaattista julkaisua.

### 3.3 Komennot

```powershell
npm ci
npm run dev
npm run check
npm run build
npm test
npm run test:browser
npm run preview
npm run test:text-wrapping
npm run deploy:dry-run
npm run deploy
git diff --check
```

| Komento | Tarkoitus ja raja |
| --- | --- |
| `npm ci` | Asentaa lockfilen mukaiset riippuvuudet. Ei tarpeen jokaisen dokumenttimuutoksen yhteydessä. |
| `npm run dev` | Astro-kehityspalvelin; jää käyntiin, kunnes se pysäytetään. |
| `npm run check` | Tyyppi-/Astro-diagnostiikka ilman tuotantobuildia. Sama tarkistus sisältyy myös `build`-scriptiin. |
| `npm run build` | Poistaa vanhan `dist/`-hakemiston ja tuoreusmarkkerin, pakottaa Astron content-syncin, ajaa Astro-checkin, rakentaa sivuston sekä kirjoittaa lähde- ja tuotoshasheihin sidotun `.astro/build-freshness.json`-markkerin. |
| `npm test` | Ajaa ensin `npm run build` ja sitten koko Node `node --test` -kokonaisuuden. |
| `npm run preview` | Tarjoilee buildin paikallisesti. Ei jäljittele kaikkia Cloudflaren HTTP-ominaisuuksia. |
| `npm run test:browser` | Rakentaa sivuston ja ajaa responsiivisuus-, navigaatio-, haku- ja keskeiset vuorovaikutuspolut omassa headless-selaimessa. Käynnistää ja siivoaa preview-palvelimen sekä selainprofiilin itse. |
| `npm run test:text-wrapping` | Yhteensopivuusalias komennolle `npm run test:browser`. |
| `npm run deploy:dry-run` | Rakentaa sivuston ja ajaa Wrangler dry-runin; ei julkaise tuotantoon. |
| `npm run deploy` | Rakentaa ja julkaisee Wranglerin konfiguraatiolla. Ajetaan vain erillisellä julkaisuluvalla. |
| `node --test test/exposure-time.test.mjs` | Esimerkki kohdistetusta puhtaasta laskentatestistä. |
| `git diff --check` | Tarkistaa diffiin tulleet whitespace-virheet; ei toiminnallisuutta. |

Kehitys- tai preview-palvelinta ei jätetä tarpeettomasti käyntiin. `CHROME_BIN` on tekstinrivitysscriptin valinnainen selainpolku, ei sivuston runtime-asetus. Sivuston omassa `src/`-koodissa ei ole vaadittua ympäristömuuttujakonfiguraatiota.

## 4. Julkiset reitit ja kieliparit

### 4.1 Staattiset sivut ja työkalut

| Englanti | Saksa | Toteutus |
| --- | --- | --- |
| `/` | Ei vastinetta | `src/pages/index.astro` |
| `/articles/` | `/de/artikel/` | `ArticleIndexPage.astro` |
| `/sounds/` | `/de/alltagsgeraeusche/` | `SoundIndexPage.astro` |
| `/tools/` | `/de/werkzeuge/` | `ToolsIndexPage.astro` |
| `/tools/safe-listening-time-calculator/` | `/de/werkzeuge/expositionsdauer-rechner/` | `SafeExposureTimePage.astro` ja `ExposureCalculator.astro`; eri laskentamallit. |
| `/tools/noise-dose-calculator/` | Ei vastinetta | `NoiseDoseCalculator.astro` |
| `/tools/daily-noise-exposure-level-calculator/` | `/de/werkzeuge/laermexpositionsrechner/` | `DailyNoiseExposureCalculator.astro` |
| `/tools/decibel-distance/` | `/de/werkzeuge/schallpegel-entfernung/` | `DistanceCalculator.astro` |
| `/tools/add-decibels/` | `/de/werkzeuge/dezibel-addieren/` | `AddDecibelsCalculator.astro` |
| `/search.json` | `/de/search.json` | Prerenderöidyt GET-reitit, `buildSearchIndex`. |
| `/404.html` | `/de/404.html` | Englannin `src/pages/404.astro` ja saksan `src/pages/de/404.astro`; build siirtää saksan dokumentin Cloudflaren polkuun. |

Englannin työkalut ovat omia tiedostojaan `src/pages/tools/`-hakemistossa. Saksan neljä laskurireittiä luetellaan eksplisiittisesti tiedoston `src/pages/[locale]/[toolsSegment]/[slug].astro` `getStaticPaths()`-funktiossa. Saksan työkaluindeksin ja hakuindeksin reitit ovat myös eksplisiittisesti rajattuja. Dynaamiset hakemistojen nimet eivät tarkoita automaattista tukea mille tahansa localelle tai työkalulle.

### 4.2 Tavallisten artikkelien kaikki kieliparit

Englannin täydellinen reitti on `/articles/<en-slug>/`, saksan `/de/artikel/<de-slug>/`. Näiden 15 parin `translationKey` on englannin slug.

| Klusteri | Englannin slug | Saksan slug |
| --- | --- | --- |
| fundamentals | `what-is-a-decibel` | `was-ist-ein-dezibel` |
| fundamentals | `db-vs-dba` | `db-und-dba-unterschied` |
| fundamentals | `what-is-sound-pressure-level` | `was-ist-schalldruckpegel` |
| fundamentals | `is-3-db-twice-as-loud` | `sind-3-db-doppelt-so-laut` |
| fundamentals | `why-is-the-decibel-scale-logarithmic` | `warum-ist-die-dezibelskala-logarithmisch` |
| exposure | `what-is-a-safe-decibel-level` | `welcher-dezibelwert-ist-sicher` |
| exposure | `how-long-can-you-listen-at-85-db` | `wie-lange-85-db-hoeren` |
| exposure | `why-does-85-db-matter` | `warum-sind-85-db-wichtig` |
| exposure | `what-is-noise-dose` | `was-ist-eine-laermdosis` |
| exposure | `niosh-vs-osha-noise-exposure-limits` | `laermexpositionsgrenzen-deutschland-eu` |
| smartphone | `are-decibel-meter-apps-accurate` | `sind-dezibel-apps-genau` |
| smartphone | `how-to-calibrate-a-decibel-meter-app` | `dezibel-app-kalibrieren` |
| smartphone | `how-to-measure-decibels-with-android-phone` | `dezibel-messen-mit-android-handy` |
| smartphone | `why-decibel-meter-apps-show-different-results` | `warum-dezibel-apps-unterschiedliche-werte-zeigen` |
| smartphone | `phone-sound-meter-vs-professional-meter` | `schallpegelmesser-app-vs-messgeraet` |

`niosh-vs-osha-noise-exposure-limits`-pari on tarkoituksella paikalliseen kontekstiin sovitettu: saksankielinen artikkeli käsittelee Saksaa ja EU:ta. Saman `translationKey`-arvon ei tarvitse tarkoittaa sanasta sanaan samaa sääntelysisältöä.

### 4.3 Sound-artikkelien kaikki kieliparit

Englannin reitti on `/sounds/<en-slug>/`, saksan `/de/alltagsgeraeusche/<de-slug>/`. Kaikkien klusteri on `common-sounds`.

| translationKey / englannin slug | Saksan slug |
| --- | --- |
| `normal-conversation` | `normales-gespraech` |
| `vacuum-cleaner` | `staubsauger` |
| `lawn-mower` | `rasenmaeher` |
| `concert` | `konzert` |
| `baby-crying` | `babygeschrei` |

### 4.4 Legacy-uudelleenohjaukset

`astro.config.mjs` tuottaa staattiset redirect-dokumentit. `public/_redirects` määrittelee vastaavat Cloudflaren 301-ohjaukset sekä slashittomalle että trailing slash -muodolle.

| Vanha reitti | Kohde |
| --- | --- |
| `/sounds/normal-conversation-decibels/` | `/sounds/normal-conversation/` |
| `/sounds/vacuum-cleaner-decibels/` | `/sounds/vacuum-cleaner/` |
| `/sounds/lawn-mower-decibels/` | `/sounds/lawn-mower/` |
| `/sounds/concert-decibels/` | `/sounds/concert/` |
| `/sounds/whisper-decibels/` | `/sounds/` |
| `/sounds/busy-traffic-decibels/` | `/sounds/` |
| `/sounds/siren-decibels/` | `/sounds/` |
| `/sounds/fireworks-decibels/` | `/sounds/` |

Redirect-HTML käyttää meta refresh -ohjausta ja `noindex`-merkintää. Paikallinen Astro preview ei yksin todista hostingin HTTP 301 -vastauksia.

## 5. Lokalisointi, navigaatio ja haku

### 5.1 Locale- ja reittisopimus

`src/i18n/config.ts` määrittelee:

- `defaultLocale = 'en'`, `locales = ['en', 'de']` ja näistä johdetun `Locale`-tyypin.
- `localeTags`: `en-GB` ja `de-DE` päivämäärille, Article-scheman kielelle ja HTML-headin hreflangeille.
- `openGraphLocales`: `en_GB` ja `de_DE`.
- `isLocale`-tyyppitarkistuksen.

`src/i18n/routes.ts` omistaa `contentTranslations`-rekisterin, `routePairs`-listan, `routeForContent`-URL-rakentajan, `findRoutePair`-, `alternatesForPath`- ja `translationFor`-haut. Rekisterissä on 20 sisältöparia ja 7 staattista paria.

`routeForContent` rakentaa polun, mutta ei todista sisältötiedoston olemassaoloa tai julkaisutilaa. `routePairs` ei lue `draft`-kenttää. Sisältö, rekisteri ja generoitu tuotos pitää siksi tarkistaa yhdessä.

Uuden kielen lisääminen ei onnistu vain `locales`-taulukkoa muuttamalla: useissa komponenteissa on suora en/de-haara, reittiparien tyyppi sisältää en/de-kentät ja dynaamisten sivujen `getStaticPaths` luettelee saksan erikseen. Myös tekstit, metadata, reititys ja testit on laajennettava.

### 5.2 Header ja footer

`Base.astro` päättelee kielen ensin `locale`-propista, muuten `Astro.currentLocale`-arvosta ja lopuksi oletuskielestä. Logo johtaa aina `/`-etusivulle.

- Englannin päälinkit: Tools, Features, Pricing, Articles.
- Saksan päälinkit: Rechner und Werkzeuge sekä Artikel. Ei englannin etusivun Features-/Pricing-linkkejä.
- Työkalu- ja artikkeliosion aktiivisuus määräytyy polun `startsWith`-vertailusta; linkki saa `aria-current="page"`.
- Etusivulla wordmark saa `aria-current="page"`. Sound-sivuilla mikään päälinkki ei ole nykyisenä osiona.
- Leveydellä enintään 900 px päälinkit avataan `#menu-toggle`-painikkeella. `aria-expanded` ja `#primary-links.open` päivittyvät yhdessä. Linkin valinta sulkee valikon.
- Enintään 520 px:n leveydellä valikon näkyvä tekstilabel piilotetaan visuaalisesti; saavutettava nimi säilyy.
- Englannin footerissa ovat Explore- ja App-sarakkeet. Saksassa Explore-sarake ja yhteystieto; App-saraketta ei renderöidä.
- Julkinen yhteysosoite on `contact@finnvek.com`. Finnvek-linkki johtaa `https://finnvek.com`-osoitteeseen.
- Footerin vuosi tuotetaan buildin aikaisesta `new Date().getFullYear()`-arvosta, ei erillisestä vuosivakiosta.

### 5.3 Lokalisoidun yläpalkin rajaus

Saksankielisillä lokalisoiduilla sivuilla yläpalkissa näkyvät vain paikalliset Rechner und Werkzeuge- ja Artikel-linkit sekä haku niillä osioilla, joilla haku on käytössä. Näkyvää kielivalitsinta ei renderöidä.
- Nuoli alas/ylös avaa valikon ja siirtää fokuksen; valikossa nuolet kiertävät, Home/End siirtyvät ääripäihin ja Escape sulkee sekä palauttaa fokuksen triggeriin.
- Ulkopuolinen pointer-painallus ja fokuksen poistuminen sulkevat valikon.
- Endonyymisanakirjan fr/es/it/pt-nimet eivät tarkoita, että nämä kielet olisivat käytössä.

### 5.4 Haku

Haku renderöidään vain työkalujen ja tavallisten artikkelien reiteille, indekseihin ja niiden alasivuille. Se ei näy etusivulla, sound-indekseissä, sound-artikkeleissa tai 404-sivulla.

`buildSearchIndex(locale)` muodostaa seuraavat kentät: `kind`, `title`, `description`, `tags`, `url`. Järjestys on äänet, artikkelit, työkalut, staattiset kohteet.

- Artikkelit ja sound-artikkelien metadata suodatetaan `!draft && locale`-ehdolla.
- Jokainen 9 äänestä muodostaa tuloksen. Julkaistun oppaan metadata korvaa lyhyen Explorer-tekstin, jos vastaava sisältö löytyy.
- Ääni ilman oppaalle määriteltyä `articleRoute`-arvoa johtaa paikallisen sound-indeksin `#library-explorer`-ankkuriin.
- Työkalut tulevat `getTools(locale)`-listasta; Explorer näkyy siten myös työkalukohteena.
- Englannissa staattisia kohteita on 3, saksassa 2.
- Nykyinen indeksikoko: englanti 33, saksa 31. Saman aihealueen useat hakutulokset ovat mahdollisia.
- Artikkelin koko leipätekstiä ei indeksoida; haku ei ole kokotekstihaku.

Selaintoiminta:

1. `#search-open` tai `/`-näppäin avaa natiivin `dialog`-elementin. Näppäinoikotie ohittaa input- ja textarea-kentät.
2. Kieli-indeksi ladataan saman originin JSON-tiedostosta ja pidetään sivun elinkaaren ajan muistissa.
3. Hakusana trimmataan ja muutetaan pienaakkosiksi. Osumat etsitään `includes`-vertailulla otsikosta, kuvauksesta ja tageista.
4. Näytetään enintään 12 osumaa indeksin järjestyksessä; ei erillistä relevanssipisteytystä.
5. Osumien tekstit rakennetaan `createElement`-/`textContent`-kutsuilla. Tulossäiliön `innerHTML = ''` vain tyhjentää aiemman listan.
6. Sulkeminen onnistuu ESC-painikkeella, Escape-näppäimellä tai paneelin ulkopuolelta. Sulkeminen palauttaa fokuksen avaajaan.

Hakutermiä ei lähetetä palvelimelle. Hakudatan latausvirhe näyttää lokalisoidun virheen ja retry-painikkeen. Suljettu tai uudemman pyynnön korvaama hakusessio jättää myöhäisen vastauksen huomiotta. Tämä ei silti tee hausta offline-varmaa.

## 6. Yhteinen UI, typografia ja responsiivisuus

### 6.1 Design tokenit

Verkkosivuston todellinen token-lähde on `Base.astro`, ei Androidia kuvaava `UI-SPEC.md`.

| Token | Arvo |
| --- | --- |
| `--bg` | `#080808` |
| `--surface` | `#101010` |
| `--surface-c` | `#171717` |
| `--surface-ch` | `#202020` |
| `--surface-chh` | `#2A2A2A` |
| `--on-surface` | `#F5F5F5` |
| `--on-surface-v` | `#B8B8B8` |
| `--primary` / `--primary-dim` | `#F7F7F7` / `#CFCFCF` |
| `--secondary` / `--tertiary` | `#8F8F8F` / `#5E5E5E` |
| `--muted-text` | `#888888` |
| `--outline-v` | `#8C8C8C` |
| `--ghost` | `rgba(140, 140, 140, 0.15)` |
| `--error` / `--warning` / `--success` | `#E07A7A` / `#C9A24D` / `#8EA58E` |
| `--result-border-color` | `var(--on-surface)` |
| `--radius-card` / `--radius-tile` | `24px` / `14px` |
| `--max-w` | `1120px` |
| `--font-size-page-title` | `clamp(2.625rem, 7vw, 4.125rem)` |

Leipätekstin fontti on Instrument Sans, data-/otsikkofontti IBM Plex Mono. Molemmat ladataan Google Fontsista. Body on 16 px / 1.5. `.kicker` käyttää 12 px:n monospaced-fonttia, isoja kirjaimia ja `0.14em`-kirjainväliä.

Artikkelin `h1` käyttää omaa `clamp(36px, 7vw, 64px)`-määritystä, lede 19 px / 1.6 ja leipäteksti 17 px / 1.75. Kaikki otsikot eivät siis ole saman sivuotsikkotokenin käyttäjiä. Tavallisen artikkelisisällön enimmäisleveys on 820 px.

Nykyisessä UI:ssa on hillittyjä neutraaleja reunuksia ja pinnanvaihtoja. Uusiin muutoksiin ei lisätä värillisiä korttireunoja, sivuraitoja tai koristekehyksiä. Värillinen mittausluokitus ja tiedollinen vaihteluvälipalkki eivät ole yleinen lupa korostaa kaikkia kortteja.

### 6.2 Tekstin rivityssopimus

- Otsikot: `word-break: normal`, `overflow-wrap: normal`, `hyphens: auto`.
- Sivun oikea `lang` ohjaa kielikohtaista tavutusta. Pelkkä CSS ei takaa selaimen tavutussanakirjan saatavuutta.
- `code`, `kbd`, `samp`, `var` ja `.katex`: `hyphens: none`.
- Pitkiä otsikoita ei yleisesti katkaista `break-all`-/`anywhere`-säännöllä eikä typistetä ellipsillä.
- Artikkelin raakaa HTTP(S)-URL:ia näyttävä linkki merkitään buildissa `data-raw-url`-attribuutilla vain, jos linkin koko tekstisisältö on täsmälleen sama kuin `href`.
- Vain nämä raw-URL-linkit saavat `overflow-wrap: anywhere`-säännön. Tavalliset linkkitekstit säilyttävät normaalin rivityksen.
- Artikkelitaulukot ja `.katex-display` vierivät tarvittaessa paikallisesti vaakasuunnassa; ne eivät saa leventää koko sivua.
- Hakutuloksen `.hit-desc` käyttää tarkoituksella yksirivistä ellipsiä. Mobiilin `.mobile-sound-name` saa rivittyä.
- Etusivun tarkoituksellisten `br`-vaihtojen yhteydessä on eksplisiittinen välilyönti. Tekstisisältö ei saa muuttua yhteen kirjoitetuiksi sanoiksi.

### 6.3 Keskeiset breakpointit

| Leveys/ehto | Vaikutus |
| --- | --- |
| Enintään 900 px | Headerin mobiilivalikko; footer yhteen sarakkeeseen; Why-osion ExposureRail-kisko piiloon; työkaluindeksin kortit kahteen sarakkeeseen. |
| Enintään 850 px | Laskurien pääsisältö ja referenssiruudukko yhteen sarakkeeseen; monikenttälaskurin tulospaneeli ei enää sticky. |
| Enintään 700 px | Artikkeli-indeksin ryhmät/kortit yhteen sarakkeeseen; täysi Sound Explorer natiiveiksi details-riveiksi; hero-videolle mobiilitiedosto. |
| Enintään 650 px | Monikenttälaskurin syöterivit yhteen sarakkeeseen; ulompi laskuripinta reunoihin asti. |
| Enintään 620 px | Työkalukortit yhteen sarakkeeseen; artikkelin summary ja related-lista yhteen sarakkeeseen. |
| Enintään 560 px | ExposureCalculator reunoihin asti, valitun tason otsikko/lukema päällekkäin. |
| Enintään 520 px | Headerin menu-label visuaalisesti piiloon, valikkolinkit yhteen sarakkeeseen. |
| Enintään 420 px | Kielivalitsimen triggeri tiiviimmäksi. |

Etusivulla on lisäksi omat 1080/900/820/620/560 px -säännöt. Näitä ei pidä korvata oletetulla yhden breakpoint-järjestelmän abstraktiolla tutkimatta sivun paikallista CSS:ää.

### 6.4 Liike ja saavutettavuus

`Base.astro` omistaa dokumenttien välisen CSS View Transition -liikkeen, `page-heading`-nimen, `revealSelectors`-listan ja laskurin tulosvälähdyksen.

- View Transition on natiivi monisivunavigaatio (`@view-transition { navigation: auto; }`), ei Astro ClientRouter-/SPA-navigaatio.
- Otsikkonimi siirretään klikattuun artikkelikortin tai työkalukortin otsikkoon.
- Reveal käyttää IntersectionObserveria, kynnystä 0.1 ja `rootMargin: 0px 0px -48px 0px`. Sisarukset porrastetaan 80 ms välein, enintään seitsemän portaan verran.
- Observerin puuttuessa tai reduced motion -tilassa sisältö näytetään heti.
- `.reveal` lisätään JavaScriptissä: ilman scriptiä normaali sisältö ei jää reveal-piilotukseen.
- Reveal käyttää `translate`-ominaisuutta, kortin hover `transform`-ominaisuutta. Oman `transition`-määrityksen tulee säilyttää myös opacity/translate-siirtymät.
- `.calculator-result strong`-muutoksia tarkkaileva MutationObserver lisää `result-updated`-luokan. Tuloksen animointi ei muuta sen laskentaa.
- Artikkelien lukemisviiva käyttää CSS `animation-timeline: scroll(root block)`-aikajanaa. Ilman tukea viiva pysyy näkymättömänä; reduced motion ei poista suoraa vieritystilalukemaa.
- Skip-link, näkyvät focus-kehykset, natiivi dialog, details-rivit, labelit, status-alueet ja forced-colors-aktiivilinkin alleviivaus ovat osa nykyistä rakennetta.
- Reduced motion tarkistetaan kutsuhetkellä, ja asetuksen vaihtumiseen kesken avoimen sivun reagoivat aktiiviset/odottavat scramblet, `ExposureRail` sekä etusivun käynnistys- ja CTA-liike. Reduce-tilaan siirtyminen viimeistelee tai purkaa nämä liikkeet vakaaseen lopputilaan; asetuksen palauttaminen ei toista jo valmistuneita reveal- tai CTA-sisääntuloja.

`motion.ts` omistaa `ScrambleProfile`-tyypin, profiilit sekä `prefersReducedMotion()`-, `cancelScramble()`-, `setReadingValue()`-, `scrambleValue()`- ja `scrambleReading()`-rajapinnat. `scramble-engine.ts` tekee nimetyt `animate`-, `scrambleText`- ja `utils`-tuonnit.

`scrambleValue` kirjoittaa lopullisen tekstin heti ja animoi sitten elementin. `scrambleReading` käyttää erillistä ID:töntä, `aria-hidden`-kopiota ja palauttaa alkuperäisen elementin näkyviin animaation jälkeen. Runtime-vaihto reduced motion -tilaan katkaisee myös kesken olevan tai moottorin latausta odottavan scramblen lopulliseen tekstiin. Nopeasti vaihtuvien lukemien ruudunlukijakäyttäytyminen on tarkistettava selaimessa; pelkkä apufunktion nimi ei todista live-alueen toimintaa.

Scramblea käytetään hinnan paikallistamiseen, hero-käynnistykseen/tilanvaihtoon ja Explorerin klikkaukseen. Jatkuvasti päivittyvien laskuriarvojen päivitys käyttää `textContent`-kirjoitusta, ei scramblea.

## 7. Etusivu, video, mittaridemo ja ominaisuusesittely

### 7.1 Osioiden nykyinen järjestys

`src/pages/index.astro` renderöi järjestyksessä:

1. `#hero`: englannin intro, tulossa oleva Google Play -CTA, työkalulinkki, video ja HUD.
2. `#why`: neljä kysymyskorttia ja niiden natiivit tekniset details-osiot sekä koristeellinen `ExposureRail`.
3. `#sounds`: kompakti `SoundExplorer` ja linkki sound-kirjastoon.
4. `#pricing`: Free-/Pro-listat ja yhteisellä maatunnistuksella paikallistettavat hinnat.
5. `#features`: neljä Free-ominaisuusryhmää, neljä Pro-kategoriaa ja privacy-rajausteksti.
6. `#get`: julkaisuun valmistautumisen CTA ja koristeellinen aalto.

Etusivulla ei tällä hetkellä ole erillistä artikkelifeediä eikä upotettua ExposureCalculatoria.

### 7.2 Video ja Web Audio -polku

Videon staattinen HTML käyttää `muted`, `loop`, `playsinline`, `preload="none"` ja poster-kuvaa. Varsinainen `src` asetetaan scriptissä:

- enintään 700 px: `/dBcheck-hero-mobile.mp4`;
- leveämpi: `/dBcheck-hero-desktop.mp4`;
- poster: `/images/hero-poster.webp`.

Normaalissa tilassa video yritetään käynnistää mykistettynä. Reduced motion tai selaimen `saveData` estää automaattisen lähteen asettamisen/toiston. Käyttäjän Listen-valinta saa silti ladata ja käynnistää videon. Kun 700 px:n media query vaihtuu jo ladatulla videolla, lähde vaihdetaan ja nykyinen toistoaika, mykistys sekä toistointentio säilytetään vain, jos käyttäjän ohjaustila ja sivun elinkaari eivät ole vaihtuneet kesken asynkronisen vaihdon.

Ääniketju alkaa `HTMLVideoElement -> MediaElementAudioSourceNode`; lähdesolmu syöttää sekä `AudioContext.destination`-ulostuloa että erillistä `AnalyserNode`-haaraa. AudioContext luodaan käyttäjän painalluksesta. FFT-koko on 4096 ja smoothingTimeConstant 0.6.

Näytön laskenta:

```text
rms = sqrt(sum(sample²) / sampleCount)
dbfs = 20 * log10(max(rms, 1e-7))
displayDb = clamp(dbfs + 90, 0, 130)
```

Offset `+90` on demomuunnos. Se ei ole selaimen äänenvoimakkuudesta ympäristön SPL:ään tehty kalibrointi. Sivun näkyvä huomautus kertoo lähteeksi hero-filmin ja erottaa demon puhelimen mittauspolusta.

- Spektri piirtää 24 logaritmisesti jaettua kaistaa välillä 20 Hz–20 kHz.
- Ilman aktiivista analyysiä kaistat jäävät minimikorkeuteen; niihin ei generoida satunnaista kohinaa.
- Session min/max ja energiaan perustuva keskiarvo lasketaan havaituista demoarvoista, kun arvo ylittää 1 dB:n näyttöarvon.
- Keskiarvo on `10 log10(mean(10^(displayDb/10)))`. Näytteet kertyvät ruutukierroksista, eivät Androidin väitetystä tallennuskadenssista.
- Uusi Listen-session käynnistys nollaa tilastojen kertymän.
- Mute mykistää videon ja vie lukeman `--`-/STANDBY-tilaan. Se ei pysäytä taustavideota eikä tyhjennä viimeksi näytettyjä tilastotekstejä.
- Tavallinen mittarisilmukka jatkuu vain kuuntelun, käynnistyssekvenssin tai neulan nollaan asettumisen ajan. Nollassa alle 0.05:n toleranssilla se lopettaa uusien requestAnimationFrame-kutsujen tekemisen.
- Web Audio -virheessä toiminta yrittää pudota pelkkään videon mykistyksen vaihtoon; mittausta ei tällöin väitetä toimivaksi.
- `pagehide` pysäyttää videon ja ruutusilmukan, suspendoi reititetyn AudioContextin sekä palauttaa mittarin ja spektrin nollatilaan. Ohjaus- ja elinkaarirevisiot estävät aiemmin käynnistettyä `resume()`-, `play()`-, autoplay- tai lähteenvaihtopyyntöä herättämästä mediaa sivulta poistumisen jälkeen.

`display-scale.ts` omistaa 0–130 dB -näyttöasteikon:

| Raja | `levelForDb`-luokka |
| --- | --- |
| alle 55 | `quiet` |
| 55–alle 70 | `normal` |
| 70–alle 85 | `elevated` |
| vähintään 85 | `dangerous` |

Tickit ovat `[0, 40, 70, 85, 100, 130]`. `scalePercent` rajaa syötteen 0–130-välille ja muuntaa sen prosentiksi. Nämä ovat näyttöluokkia, eivät henkilökohtaisia turvallisuusluokituksia.

### 7.3 Pro-esittely ja markkinointidatan rajat

Pro-kategoriat ovat Measurement & analysis, Protection & monitoring, History & access sekä Hearing & recovery. Ne käyttävät neljää `src/assets/features/`-WebP-kuvaa.

- Kategoriat ovat ARIA-tablist/tab/tabpanel-rakenne.
- Vain valittu tab on normaalissa tab-järjestyksessä; nuolet vasen/oikea sekä Home/End vaihtavat kategoriaa.
- Epäaktiiviset paneelit ovat `aria-hidden` ja `inert`.
- Kategorian sisäiset ominaisuuspainikkeet käyttävät `aria-pressed`-tilaa ja päivittävät otsikon/kuvauksen `textContent`-kirjoituksella.
- Ominaisuuskuvat ovat koristeellisia (`alt=""`); tekstiesitys kantaa tiedon.

Sivun Free-lista mainitsee muun muassa live-mittarin, hälytykset, viikkoyhteenvedon, 7 päivän historian, passiiviset näytteet, valinnaisen Health Connectin ja PNG-jaon. Pro-lista mainitsee rajattoman historian, kuulotestin/recovery-checkin, dosimetrian, painotukset, kalibroinnin, spektrin, tunnistuksen, sleep monitorin, viennit, tinnitusprofiilin, ambient-äänet ja widgetin.

Näiden toteutus on vahvistettava Android-repositoriosta ennen tuotelupausten muuttamista. Sivuston oma koodi todistaa vain, että tämä copy renderöidään. Google Play -CTA on edelleen Coming soon; `#get` sisältää disabled-esityksen, ei toimivaa osto- tai asennuslinkkiä.

### 7.4 Hinnat

`DEFAULT_PRO_PRICE` on `12,99 €`. Free-hinta johdetaan saman maan Pro-esityksen valuuttaetuliitteestä/-jälkiliitteestä korvaamalla summa nollalla.

| Maa/ryhmä | Konfiguroitu Pro-esitys |
| --- | --- |
| EUR-oletus ja tiedoston euroaluekoodit | `12,99 €` |
| US / GB | `$14.99` / `£10.99` |
| SE / NO / DK | `149 kr` / `149 kr` / `99 kr` |
| CH / PL / CZ | `CHF 12.90` / `54,99 zł` / `299 Kč` |
| HU | `4 490 Ft` |
| CA / AU / NZ | `CA$19.99` / `A$21.99` / `NZ$24.99` |
| JP | `¥2 400` |

Nämä ovat lähdekoodin esityshintoja, eivät tästä dokumentista vahvistettavia tämänhetkisiä Play-hintoja.

`localized-price.ts` tekee yhden `fetch('/cdn-cgi/trace', { cache: 'no-store' })` -pyynnön, kun molemmat hintaelementit löytyvät. `parseCloudflareTraceCountry` poimii `loc=XX`-rivin ja normalisoi koodin isoiksi kirjaimiksi. Virheessä, tuntemattomalla maalla tai ilman JavaScriptiä EUR-esitys säilyy. Maatunnusta ei tallenneta selaimen pysyvään tallennustilaan.

## 8. Sound Explorer ja yhteinen äänidata

### 8.1 Tietomalli ja julkaisu

`src/data/sounds.ts` yhdistää yhden `technical`-järjestyksen ja `text.en`-/`text.de`-tekstipaketit. `getCommonSounds(locale)` palauttaa `LocalizedCommonSound[]`-listan. `CommonSound` on sen tyyppialias, `commonSounds` englannin valmis lista ja `findCommonSound(slug, locale)` lokalisoitu slug-haku.

Tietueen kentät: `translationKey`, `locale`, `slug`, `name`, `category`, `typicalMinDb`, `typicalMaxDb`, `measurementDistance`, `soundType`, `shortDescription`, `exposureNote`, `riskLevel`, `markerLane`, valinnainen `rangeReference` ja valinnainen `articleRoute`.

| Järjestys / avain | Näyttöalue | Riskityyli | Lane | Julkaistu opas |
| --- | --- | --- | --- | --- |
| `whisper-decibels` | 25–30 | everyday | low | Ei |
| `normal-conversation` | 55–75 | everyday | top | Kyllä |
| `vacuum-cleaner` | 65–85 | everyday | low | Kyllä |
| `busy-traffic-decibels` | 73–83 | warning | middle | Ei |
| `lawn-mower` | 86–96 | warning | low | Kyllä |
| `concert` | 85–105 | danger | middle | Kyllä |
| `baby-crying` | 75–100 | warning | top | Kyllä |
| `siren-decibels` | 110–129 | danger | middle | Ei |
| `fireworks-decibels` | 100–115 | danger | low | Ei |

Taulukko kertoo tämän sivuston datan, ei yleispäteviä mittaustuloksia. Explorerin `riskLevel` on toimituksellinen tyylikenttä, eikä sitä lasketa automaattisesti hero-mittarin `levelForDb`-funktiolla.

`publishedKeys` sisältää täsmälleen viisi oppaallista ääntä. `articleRoute` syntyy vain, jos avain on tässä joukossa ja käännösrekisteristä löytyy slug. Sound-artikkelin summary hakee tietueen lokalisoidulla slugilla.

Julkaisuun liittyy kaksi erillistä porttia: Markdownin `draft` ja datan `publishedKeys`. `publishedKeys` ei automaattisesti seuraa `draft`-tilaa. Oppaan poistossa tai draftiksi palautuksessa myös Explorerin/hakudatan linkitys ja reittipari on tarkistettava.

### 8.2 Lähteistetyt vertailualueet

Neljä ääntä ilman täyttä opasta saa suoran `rangeReference`-lähteen:

| Ääni | Rekisteriavain | Kontekstin erityisraja |
| --- | --- | --- |
| Whisper | `whisperUsGs` | USGS-kooste; 1.5–5 metrin etäisyys. |
| Busy traffic | `busyTrafficBangkok` | Bangkokin tienvarsitutkimus; raportoitu minimi 72.8, näytetty minimi pyöristetty 73. |
| Siren | `emergencySirenNidcd` | NIDCD/NIH:n opastava alue; etäisyyttä ja keskiarvoistusaikaa ei lähteessä eritellä. |
| Fireworks | `aerialFireworksTanaka` | Yhden ilotulituksen A-painotettu Fast-lukema noin 100 metristä, ei todellisen impulssihuipun alue. |

`SoundRangeSource` säilyttää tekijä-/julkaisijatiedot, otsikon, julkaisu-/päivityspäivän, URL:n, tuetut avaimet, raportoidut min/max-arvot, näyttöarvot ja `metric: 'dBA'`-kentän. Lokalisoitu konteksti on tietueessa erikseen.

Explorer renderöi nämä lähteet tavalliseen HTML `details`-osioon sekä etusivulla että kummassakin sound-indeksissä. Pelkkä lähteen URL:n olemassaolo ei todista alueen oikeellisuutta: lähteen tarkka mittari, etäisyys, aikavakio ja tutkimuskonteksti on tarkastettava muutettaessa väitettä.

### 8.3 Desktop ja mobiili

`SoundExplorer`-propsit: pakolliset `sounds` ja `id` sekä valinnaiset `compact = false`, `locale = 'en'` ja `detailHeadingLevel = 3` (sallitut arvot 2 tai 3). Tyhjä lista tuottaa lokalisoidun status-tekstin; ei-tyhjän listan ensimmäinen tietue on alkuvalinta.

Desktop-esityksessä:

- Markkeri asetetaan vaihteluvälin keskipisteeseen ja lane-kentän mukaiseen korkeuteen.
- Tickit, markkerit ja vaihteluvälipalkki käyttävät samaa `.sound-markers`-koordinaatistoa ja `scalePercent`-muunnosta.
- Markkerialueen vähimmäisleveys on 720 px; tarvittaessa vieritys on Explorerin sisäinen.
- Valinta päivittää nimen, alueen, kuvauksen, altistumishuomautuksen, oppaan linkin sekä palkin alun/leveyden ja riskityylin.
- Klikkaus käyttää scramblea ja valintaliikettä. Ei-touch-pointerin hover vaihtaa tiedon ilman scramblea.
- Markkerit ovat painikkeita ja ilmaisevat valinnan `aria-pressed`-attribuutilla. Detail-alue on `aria-live="polite"`.

Enintään 700 px:n leveydellä täysi, ei-kompakti Explorer näyttää natiivit `details/summary`-rivit ja piilottaa desktop-asteikon/detailin. Nämä rivit sisältävät valmiiksi kaikki tekstit, aluepalkit ja mahdolliset opaslinkit sekä toimivat ilman JavaScriptiä. Yhteinen `name` ryhmittelee avautuvat details-elementit.

Etusivun `compact`-Explorer säilyttää desktop-tyyppisen vaakavieritettävän asteikon myös mobiilissa. Koko sivun mobiiliesitystä ei siis voi päätellä pelkästä yhteisestä komponentista.

`SoundIndexPage` omistaa lisäksi en/de-overview-kuvan, opas-/vertailumäärät, erillisen sound-listan ja mittauksen rajausosion. Enintään 700 px:n leveydellä erillinen library-head ja sound-list piilotetaan, koska Explorerin mobiilirivit kattavat vertailut.

## 9. Laskurit, kaavat ja syötevalidointi

### 9.1 Yhteinen rakenne

`CalculatorPage` saa propsit `title`, `description`, `kicker`, `heading`, `intro`, `socialImage` ja valinnaisen `locale`. Se renderöi sivuotsikon, paluulinkin, oletusslotin laskurille ja `references`-slotin. Se myös lataa `tool-calculators.ts`-scriptin.

Exposure Time käyttää erillistä `SafeExposureTimePage`-sivukomponenttia ja omaa `ExposureCalculator`-scriptiä; sitä ei alusteta monikenttälaskurien scriptillä.

`NumberField` omistaa numeroinputin labelin ja stepper-painikkeiden HTML:n. Propsit ovat `id`, `label`, `inputAttributes`, `locale`.

`tool-calculators.ts`:

- alustaa vain DOMista löytyvät laskuriperheet data-attribuuttien perusteella;
- estää formien submitin ja päivittää tulokset syötemuutoksista;
- käyttää `form.checkValidity()`-porttia kaikissa neljässä laskuriperheessä;
- antaa kloonatuille numerokentille uudet ID:t ja päivittää labelien `for`-arvot;
- käyttää inputin natiiveja `stepUp()`-/`stepDown()`-kutsuja ja lähettää kuplivan input-eventin;
- näyttää mukautetut stepperit vasta `number-steppers-ready`-luokan jälkeen;
- pitää viimeisen altistusrivin ja kaksi viimeistä summattavaa tasoa poistamattomina;
- siirtää fokuksen uuden rivin ensimmäiseen inputiin;
- näyttää virheellisellä syötteellä `—`-tuloksen ja selitetekstin.

HTML:ssä olevat oletustulokset ovat nimettyjen esimerkkisyötteiden tuloksia. `noscript` selittää, ettei muokattujen arvojen live-laskenta toimi ilman JavaScriptiä.

### 9.2 Kaavat ja rajat

| Laskuri | Laskenta | UI-syöterajat ja oletus |
| --- | --- | --- |
| Englannin Exposure Time | `T = 8 * 2^((85-L)/3)` tuntia | Slider 70–115 dBA, askel 1; oletus 94 dBA -> 1 hour. |
| Saksan Expositionsdauer | `T = 8 * 10^((85-L)/10)` tuntia | Sama slider; tulos on aika ylempään `L_EX,8h = 85 dB(A)` -arvoon. |
| Noise Dose | `D = sum(100 * hours_i / T_i)`, NIOSH 3 dB -malli | 1–12 jaksoa, 70–115 dBA, askel 0.1; oletus 4 h @85 ja 2 h @88 -> 100 %. |
| Daily Noise Exposure | `L_EX,8h = 10 log10(sum((hours_i/8) * 10^(L_i/10)))` | 1–12 jaksoa, 0–200 dB(A), askel 0.1; oletus 8 h @85 -> 85.0 / 85,0 dB(A). |
| Distance | `L2 = L1 - 20 log10(r2/r1)` | Referenssitaso 0–200, etäisyydet 0.01–100000; oletus 90 dB, 1 -> 2 -> noin 84.0 dB. |
| Add Decibels | `Lmax + 10 log10(sum(10^((Li-Lmax)/10)))` | 2–12 tasoa, −100–200 dB, askel 0.1; oletus 80 + 80 -> noin 83.0 dB. |

Aikajaksoissa duration on vähintään 0.01 valittua yksikköä, askel 0.01. Tuntikentän maksimi on 24 ja minuuttikentän 1440. Kokonaiskesto ei saa ylittää 24 tuntia.

Saksan energiapohjainen aikamalli ja NIOSH:n täsmälleen 3 dB:n vaihtosuhde eivät ole numeerisesti identtisiä. Esimerkiksi 94 dBA:n saksalainen aika on noin 1.007 tuntia, jonka UI esittää yhtenä tuntina. Kaavoja ei saa yhdistää yhden yhteisen vakion alle vain siksi, että tavalliset vertailupisteet pyöristyvät samoiksi.

### 9.3 Puhtaiden funktioiden sopimukset

`src/lib/exposure-time.ts`:

- `ExposureTimeModel = 'niosh' | 'eu-upper-action'`.
- `calculateExposureHours(levelDb, model)` palauttaa tuntimäärän; funktio ei itse validoi sliderin vaihteluväliä.
- `formatExposureTime(hours, locale)` valitsee päivät, tunnit, minuutit tai sekunnit ja paikallistaa luvun.
- Epäkelpo kesto saa `invalid-duration`-virheen; sekunneiksi muunnettaessa ylivuotava äärellinen kesto saa `unrepresentable-duration`-virheen eikä `Infinity`-tekstiä.
- Vähintään 24 h esitetään päivinä, vähintään 2 h pyöristetään kokonaisiksi tunneiksi; pienemmillä arvoilla on omat tunti-/minuutti-/sekuntihaaransa.
- UI:n aikateksti ei ole täydellä tarkkuudella esitetty matemaattinen tulos.

`src/lib/daily-noise-exposure.mjs`:

- Vie `MAX_PERIODS = 12` ja `calculateDailyNoiseExposure(periods)`.
- Hyväksyy 1–12 oliota, joissa `level` on äärellinen välillä 0–200 dB, `hours` on äärellinen ja kesto positiivinen.
- Hylkää yli 24 tunnin summan `RangeError('duration-over-24h')`-virheellä.
- Muut virheavaimet ovat `period-count`, `invalid-period` ja epäesitettävälle laskentatulokselle `unrepresentable-exposure`.
- Palauttaa `{ lex8h, totalHours, category }`.
- `lex8h` säilyttää laskentatarkkuuden, mutta `category` ratkaistaan yhden desimaalin pyöristyksen jälkeen: alle 80 -> `below-lower`, 80–alle 85 -> `lower`, vähintään 85 -> `upper`.
- Puhdas funktio ja HTML-validointi testataan erillisinä kerroksina, vaikka niiden tasorajat ovat samat.
- Monikenttäscripin `MAX_ROWS` johdetaan samasta `MAX_PERIODS`-vakiosta.

`src/lib/noise-dose.ts` omistaa Noise Dose -kaavan, käyttää samaa NIOSH-aikamallia ja 24 tunnin rajaa sekä hylkää epäesitettävän äärellisyys-/alivuototuloksen `unrepresentable-dose`-virheellä. DOM-ohjain delegoi siihen ja puhdas funktio testataan suoraan. Distance- ja Add Decibels -kaavat sijaitsevat edelleen DOM-ohjaimen sisällä, joten niille ei pidä väittää samaa suoraa yksikkötestikattavuutta.

### 9.4 Sisällölliset turvallisuusrajat

Nämä ovat sivuston nykyiset copy- ja laskentamallirajat, eivät henkilökohtaisia terveys- tai oikeudellisia ohjeita:

- NIOSH-tulos tarkoittaa työperäistä 85 dBA / 8 h / 3 dB -vertailumallia, ei henkilökohtaista turvallisuustakuuta.
- Saksan aikareitti kertoo myös 80 dB(A):n alemman arvon; 85 dB(A):n saavuttamiseen laskettua aikaa ei nimetä sallituksi enimmäisajaksi tai turvalliseksi kuunteluajaksi.
- Päivätason EU-laskuri ei käsittele C-painotettuja huippuja eikä vähennä nimellistä kuulonsuojainvaimennusta.
- 87 dB(A):n EU-vertailu on mukana selitetekstissä, mutta laskuri ei tee tästä yksilöllistä kuulonsuojainten jälkeistä luokitusta.
- Distance olettaa vapaan kentän pistelähteen. Heijastukset, esteet, maanpinta, lähteen koko/suuntaavuus, sää ja absorptio voivat muuttaa tulosta.
- Add Decibels olettaa riippumattomat ja yhteensopivilla mittareilla/painotuksilla ilmaistut tasot. Se ei ole koherenttien vaiheeseen sidottujen signaalien yleissumma.
- Mittauksen epävarmuus ei poistu laskemalla.
- Verkkosivustolla ei ole OSHA-mallin valittavaa laskuria, vaikka Android-markkinointiteksti ja artikkelit käsittelevät OSHAa.

## 10. Artikkelijärjestelmä ja toimituksellinen työ

### 10.1 Kokoelmat ja frontmatter

`src/content.config.ts` määrittelee `articles`- ja `sounds`-kokoelmat. Molemmat käyttävät `glob({ pattern: '**/*.md' })`-lataajaa ja samaa Zod-skeemaa.

| Kenttä | Tyyppi / oletus | Käyttö |
| --- | --- | --- |
| `title` | string, pakollinen | H1, sivun title, kortit, haku, Article-headline. |
| `description` | string, pakollinen | Lede, meta description, OG/Twitter, kortit, haku. |
| `slug` | string, pakollinen | Paikallinen julkinen reitti ja kokoelman ID. |
| `locale` | en tai de | Suodatus, UI, polut ja muotoilu. |
| `translationKey` | string, pakollinen | Sisältöparin pysyvä yhteinen avain; sound-datan yhdistäminen. |
| `clusterKey` | fundamentals / exposure / smartphone / common-sounds | Indeksiryhmä, OG-kuva ja osa CTA-logiikasta. |
| `primaryIntent` | string, pakollinen | Toimituksellinen hakuintentti ja hakutagi. |
| `contentCluster` | string, pakollinen | Näkyvä kategoria ja hakutagi. |
| `researchSources` | string[], pakollinen | Lähdetyön metadata; ei automaattinen näkyvä lähdeluettelo. |
| `publishedAt` | dateksi muunnettava arvo | Näkyvä julkaisupäivä ja Article.datePublished. |
| `lastReviewed` | dateksi muunnettava arvo | Article.dateModified-laskenta; ei erillinen näkyvä reviewed-päivä artikkelissa. |
| `draft` | boolean, oletus false | Sulkee sisällön reittien ja kokoelmapohjaisten indeksien ulkopuolelle. |

ID muodostetaan `locale/slug`-muodossa, kun molemmat kentät ovat merkkijonoja; muussa tapauksessa lataaja käyttää tiedostopolkua ilman `.md`-päätettä, minkä jälkeen skeemavalidointi edelleen pätee. Julkinen URL perustuu frontmatterin slugiin, ei suoraan tiedoston basenameen.

Skeema ei aseta otsikon/kuvauksen pituuksia, vaadi ei-tyhjää lähdelistaa, varmista lähteiden URL-tyyppiä, tarkista kieliparien olemassaoloa eikä todista väitteiden totuutta. Tyyppivalidoinnin läpäisy ei yksin tarkoita julkaisukelpoisuutta.

Nykyisessä kannassa julkaisuajat ovat 12.7.2026; reviewed-ajankohdat eivät aina ole samat. Näitä ei nosteta automaattisesti dokumentti- tai build-päivään.

### 10.2 Artikkelin renderöinti

`EditorialPage` saa `entry`, `kind: 'article' | 'sound'` ja valinnaisen `sound`-tietueen.

Renderöity järjestys:

1. Breadcrumb: englannin etusivu, paikallinen artikkeli-/sound-indeksi, nykyinen otsikko.
2. Kategoria, dBcheck-julkaisija ja lokalisoitu julkaisupäivä.
3. Yksi H1 ja description-lede.
4. Sound-sivulla summary, jos vastaava datatietue löytyi: alue dBA, etäisyys, äänityyppi, altistumiskonteksti.
5. Markdownista renderöity `.prose`.
6. Related-lista vain, jos linkkien perusteella löytyi sopivia muita julkaistuja sisältöjä.
7. Kontekstikohtainen CTA.

Sisältö käyttää tavallista Markdownia, ei MDX-komponentteja. `<Content />` tuodaan `render(entry)`-kutsusta. Yhteinen template omistaa varsinaisen H1:n; artikkelirunkoon ei lisätä toista H1:tä.

Related-lista ei ole klusterisuositusmoottori. `remarkEditorialSafety` kerää Markdown-AST:stä inline-, fragmentti- ja reference-tyylisten root-relative-linkkien normalisoidut reitit dokumenttijärjestyksessä. `EditorialPage.astro` poistaa duplikaatit, rajaa julkaistuihin saman kielen sisältöihin, poistaa nykyisen artikkelin ja ottaa ensimmäiset neljä.

Buildin publication-integrity-portti käyttää samaa AST-metadataa ja estää myös reference-style-linkin `draft: true` -kohteeseen; fenced code ei muodosta linkkiä. Sound-oppaalla Explorer-datan localen, `translationKey`n, lokalisoidun slugin ja `articleRoute`n on vastattava julkaistua Markdownia.

### 10.3 CTA-logiikka

| Tyyppi | Englanti | Saksa |
| --- | --- | --- |
| Sound-opas | `/sounds/` | `/de/alltagsgeraeusche/` |
| Exposure-artikkeli | NIOSH Exposure Time -laskuri | EU/Saksa `laermexpositionsrechner` |
| Smartphone-artikkeli | `/#features` | Android-mittausopas; itse mittausopas ohjaa kalibrointioppaaseen. |
| Fundamentals / muu | `/sounds/` | `/de/alltagsgeraeusche/` |

Molempien kielten exposure-/smartphone-haarat käyttävät vakaata `clusterKey`-arvoa. Saksan Android-mittausoppaalla on lisäksi slug-poikkeus, joka ohjaa kalibrointioppaaseen.

### 10.4 Matematiikka ja pitkät lähde-URL:t

Markdown-putki määritellään `astro.config.mjs`-tiedostossa:

1. `remarkValidateLocalImages` tarkistaa paikalliset kuvat.
2. `remarkEditorialSafety` estää kielletyt rakenteet ja julkaisee related-linkkien `linkedRoutes`-metadatan.
3. `remarkMath` tunnistaa matematiikan.
4. Paikallinen `remarkMathPresence` käy AST:n läpi ja asettaa `file.data.astro.frontmatter.hasMath`-lipun.
5. `rehypeKatex` tuottaa valmiin kaavaesityksen.
6. `rehypeRawUrls` merkitsee tarkasti rajatut raw-URL-linkit.

Käytä tuettua dollaridelimiterimuotoa: inline-kaava `$...$`, lohkokaava `$$...$$`. Nykyisissä artikkeleissa on myös usealle riville kirjoitettuja yksittäisten dollarimerkkien pareja. Älä oleta `\(...\)`-/`\[...\]`-muotojen toimivan; saksan sisällöille on tätä koskeva testi.

`EditorialPage` liittää `katex.min.css?url`-tyylitiedoston Baseen vain, jos `remarkPluginFrontmatter.hasMath === true`. Nykyisistä 40 editorial-sivusta 17 sisältää KaTeX-matematiikkaa ja 23 ei. Kaavat tuottavat myös MathML:n ja TeX-annotaation.

KaTeX-fontit emittoidaan saman originin tiedostoiksi. `vite.build.assetsInlineLimit` palauttaa niille `false`, jotta fontteja ei siirretä CSP:n kieltämiin data-URL:eihin. Tätä ei korjata löysentämällä `font-src`-politiikkaa.

Näkyvä lähdeluettelo kirjoitetaan Markdown-runkoon. Nykyinen muoto sisältää lähteen nimen, näkyvän linkin ja tarvittaessa numeroidun viiteavaimen määrittelyn. `researchSources` ei renderöi tai päivitä näitä automaattisesti.

### 10.5 Artikkelin lisääminen tai päivittäminen

1. Valitse oikea kokoelma, locale, pysyvä `translationKey` ja tuettu klusteri.
2. Kirjoita sisältö paikalliseen Markdown-hakemistoon ja täytä kaikki skeeman kentät. Uusi keskeneräinen teksti merkitään `draft: true`; puuttuva draft-kenttä tarkoittaa julkaistavaa.
3. Tarkista lähde suoraan: tukeeko se juuri väitettä, lukua, mittaria ja kohderyhmää? Publisherin auktoriteetti tai HTTP 200 ei yksin riitä.
4. Pidä lähteet ja viittaukset runkotekstissä ajan tasalla; päivitä `researchSources` erikseen.
5. Käytä saksassa paikallisia sisältösegmenttejä ja paikallista sääntelykontekstia. Englannin etusivulle johtavat logo/Home-linkit ovat tarkoituksellinen poikkeus.
6. Lisää todellinen julkaistava kielipari `contentTranslations`-rekisteriin. Älä luo olemattoman käännöksen hreflangia.
7. Jos kyse on sound-oppaasta, tarkista myös tekninen tietue, tekstipaketit, `publishedKeys` ja slug-haku.
8. Tarkista mahdolliset runkoon kirjoitetut taulukot, kuvat ja vertailuluvut erikseen. Ne eivät automaattisesti päivity `sounds.ts`-datan mukana.
9. Jos slug vaihtuu, päivitä sisälinkit ja reittiparit sekä harkitse nykyisen redirect-mallin mukaista ohjausta. Pelkkä tiedoston uudelleennimeäminen ei muuta frontmatter-slugia.
10. Aja build ja relevantit testit. Tarkista renderöity H1, kuvaus, lähdelinkit, matemaattiset esitykset, CTA, mobiilirivitys ja molemmat kielet.
11. Päivitä testien lukumäärä-/kaavabaselinet vain, kun muutos on tarkoituksellinen ja nykyinen sisältö vahvistaa uuden määrän.

Artikkeli-indeksin intro sanoo tällä hetkellä kummallakin kielellä 20 opasta tekstivakiona. Ryhmäkohtaiset lukumäärät lasketaan datasta. Uusi artikkeli ei päivitä introa automaattisesti.

### 10.6 Tuote-, terveys- ja mittausväitteet

Säilytä seuraavat rajaukset:

- dBcheckiä ei nimetä sertifioiduksi Class 1-/Class 2 -mittariksi.
- Puhelinmittaukseen vaikuttavat mikrofoni, käsittely, asento, ympäristö ja kalibrointi.
- Kuulotesti ja recovery-check ovat omaan baselineen suhteutettua seurantaa, eivät kliininen testi tai diagnoosi.
- Sleep Monitor näyttää melutapahtumia, ei varmista heräämisen syytä.
- Äänialueet ovat kontekstisidonnaisia. Erota dB, dBA, dB(A), LAeq, LCpeak, Fast-lukema, todellinen huippu ja LWA.
- NIOSH-/OSHA-/EU-malleja ei sekoiteta keskenään eikä työperäistä vertailua kuvata yleiseksi vapaa-ajan turvarajaksi.
- dBcheckin valinnainen Health Connect estää ehdottoman cloud-free-/ei-koskaan-jakoa-väitteen.
- Valinnainen Pro WAV -tallennus ja äänenluokittelijan syötteen käsittely ovat eri asioita.
- Tekninen sisältö- tai lähdetarkistus ei ole juridinen tai kliininen hyväksyntä.

## 11. Metadata, structured data ja resurssit

### 11.1 Base-propsit ja oletukset

`Base.astro`-propsit:

| Prop | Oletus / merkitys |
| --- | --- |
| `title` | Pakollinen. |
| `description` | Oletuskuvaus olemassa, mutta julkisilla sisältösivuilla tulee olla oma kuvaus. |
| `ogType` | `website`; editorial-sivut käyttävät `article`. |
| `jsonLd` | Tyhjä taulukko. |
| `socialImage` | Sovelluksen oletuskuva `socialImages.app`. |
| `locale` | Props -> Astro.currentLocale -> en. |
| `alternates` | Muuten reittirekisteristä; `errorDocument` poistaa head-alternatesit. |
| `errorDocument` | false; true kytkee virhedokumentin indeksointi-/jakometadatan rajoitukset. |
| `readingProgress` | false; editorial-sivuilla true. |
| `stylesheet` | Valinnainen saman originin sivukohtainen CSS. |

Canonical muodostetaan `new URL(Astro.url.pathname, Astro.site)`-kutsulla ilman hakukyselyä. Tavalliset sivut saavat title/description-, canonical-, OG- ja Twitter-metatiedot. OG-kuvan tiedot sisältävät tyypin image/webp, koon 1200×630 ja alt-tekstin.

Headin vastinkielet ovat `en-GB`, `de-DE` ja todellisen englannin vastineen tapauksessa `x-default`. Sitemap käyttää samoja rekisteröityjä URL-pareja, mutta kielikoodeja `en`, `de` ja `x-default`.

JSON-LD serialisoidaan `JSON.stringify`-kutsulla ja kaikki `<`-merkit muutetaan `\u003c`-esitykseksi ennen `set:html`-kirjoitusta.

### 11.2 Structured data

- Etusivu: yksi `WebSite`.
- Jokainen 40 sisältösivusta: yksi `Article` ja yksi `BreadcrumbList`.
- Article-author on Organization `dBcheck`, URL `/`.
- `datePublished` tulee frontmatterista.
- `dateModified` on myöhempi arvoista `publishedAt` ja `lastReviewed`, jotta se ei edellä julkaisua.
- `mainEntityOfPage` käyttää sisältösivun URL:ia ja `inLanguage` localeTags-arvoa.
- Työkaluille ei nykyisin generoida SoftwareApplication-, Product-, Offer- tai FAQ-schemaa.

404 on tarkoituksellinen poikkeus normaaliin metadatasopimukseen: title ja description ovat olemassa, mutta headissa ei ole canonicalia, hreflang-linkkejä, OG/Twitter-jakometadataa tai JSON-LD:tä. Se saa `noindex`-merkinnän. Näkyvän kielivalitsimen linkit eivät ole head-hreflangeja.

### 11.3 Kuva- ja mediatiedostot

`src/data/social.ts` valitsee viidestä `public/images/og/`-WebP-kuvasta:

- `dbcheck-app.webp`: oletus ja sovellusesittely.
- `decibel-guides.webp`: fundamentals.
- `phone-measurement.webp`: smartphone.
- `noise-exposure.webp`: exposure.
- `common-sounds.webp`: sound-sivut.

`socialImageForEditorial(kind, clusterKey)` tekee valinnan. Nämä OG-kuvat eivät automaattisesti ole artikkelin runkokuva. Rekisteri sisältää locale-kohtaiset englannin- ja saksankieliset alt-tekstit, joista `Base.astro` valitsee sivun localen mukaisen arvon.

Artikkelien kuvat ovat `src/assets/articles/`-hakemistossa. Sound-indeksi käyttää `astro:assets`-Image-komponenttia, widths-arvoja `720, 1120, 1672` ja locale-kohtaista overview-kuvaa. Pro-esittelykuvat tuodaan `src/assets/features/`-hakemistosta ja renderöidään img-elementteinä lazy/async-asetuksilla.

Juurihakemiston alkuperäisiä PNG-kuvia ja `dBcheck-hero.mp4`-tiedostoa ei pidä sekoittaa selaimelle tarjoiltaviin `src/assets`-/`public`-versioihin. `dist/_astro/`-tiedostojen hash-nimiä ei kovakoodata sisältöön.

Favicon on `/dbcheck-logo.svg?v=2`; logoa käytetään myös headerissa/footerissa. `robots.txt` sallii crawlauksen ja viittaa `https://dbcheck.app/sitemap-index.xml`-osoitteeseen.

## 12. Verkkopyynnöt, tietosuoja ja julkaisu

### 12.1 Sovelluskoodin verkkopinta

| Pyyntö/toiminto | Käyttö |
| --- | --- |
| Oman originin HTML, CSS, JavaScript, kuvat ja videot | Sivuston toimitus. |
| `/search.json`, `/de/search.json` | Koko paikallinen hakuindeksi; hakusana käsitellään selaimessa. |
| `/cdn-cgi/trace` | Etusivun hintojen maatunnus. |
| `fonts.googleapis.com`, `fonts.gstatic.com` | Ulkoiset Google Fonts -tyylit/fontit. |
| `mailto:contact@finnvek.com` | Avaa käyttäjän sähköpostisovelluksen; ei sivuston lomakelähetystä. |
| Ulkoiset lähde- ja Finnvek-linkit | Tavallisia käyttäjän avaamia navigaatioita. |

Sivuston omassa koodissa ei ole evästeiden, localStoragen tai sessionStoragen kirjoitusta, mikrofonilupapyyntöä, `getUserMedia`-kutsua, palvelimelle lähetettävää yhteydenottolomaketta tai käyttäjätilin rekisteröintiä.

Tämä ei ole lupaus siitä, ettei hosting/CDN käsittele IP-osoitetta, lokita pyyntöjä tai käytä omia suojaustoimintojaan. Cloudflare-asetukset, säilytysajat, sopimukset ja ulkoisten fonttipyyntöjen oikeudellinen kuvaus tarvitsevat erillisen vahvistuksen.

### 12.2 HTTP-suojaus

`public/_headers` asettaa kaikille reiteille:

- CSP:n oletuksen `default-src 'self'`.
- `base-uri 'self'`, `object-src 'none'`, `frame-ancestors 'none'`, `form-action 'self'`.
- `script-src 'self' 'unsafe-inline'` ja `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`.
- `font-src 'self' https://fonts.gstatic.com`, ei fonttien data-URL-lupaa.
- `img-src 'self'`, `media-src 'self'`, `connect-src 'self'`, `worker-src 'self'`.
- `upgrade-insecure-requests`.
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.
- Permissions-Policy estää accelerometer/camera/geolocation/gyroscope/magnetometer/microphone/payment/usb-ominaisuudet.

CSP ei ole nonce-/hash-pohjainen strict CSP, koska inline-script/style sallitaan. Tätä ei pidä raportoida vahvempana suojauksena kuin se on.

HSTS ei ole tämän tiedoston asetus; kommentti viittaa Cloudflaren Edge Certificates -asetuksiin. Niiden nykytilaa ei vahvisteta lähdekoodista. Mikrofonin estävä Permissions-Policy sopii hero-videodemoon, koska se ei käytä käyttäjän mikrofonia.

### 12.3 Cloudflare ja 404

`wrangler.jsonc` määrittelee:

- Worker-nimen `dbcheck-website`.
- `compatibility_date: 2026-07-12`.
- `workers_dev: false`.
- Staattiset assetit `./dist`-hakemistosta.
- `assets.not_found_handling: '404-page'`.
- Custom domain -reitin `dbcheck.app`.

Omaa Worker-entrypointia tai backend-handleria ei ole. Astro tuottaa englannin `404.html`- ja saksan `de/404.html` -dokumentit. Virheellisen polun tulee hostingissa saada oikea HTTP 404 ja localeen sopiva palautumissivu, ei etusivun 200-fallback.

Julkaisupolku tarvittaessa ja erikseen valtuutettuna:

```powershell
npm test
npm run deploy:dry-run
npm run deploy
```

Molemmat deploy-scriptit tekevät puhtaan buildin juuri ennen Wrangler-vaihetta ja käyttävät eksplisiittisesti repositorion `wrangler.jsonc`-tiedostoa. `deploy` on tuotantoa muuttava komento. Sitä ei ajeta pelkän dokumentointi-, tarkistus- tai Git-push-pyynnön perusteella. Dry run ei julkaise eikä todista live-HTTP-otsakkeita.

Julkaisun jälkeen erikseen tarkistettavia asioita ovat oikea asset-versio, HTTP-otsakkeet, 404-status, 301-ohjaukset, sitemap, hakudata, latautuvat fontit ja mahdollinen hostingin injektoima analytiikka. Tässä repositoriossa ei ole omaa rollback-automaatioscriptiä.

### 12.4 Omistajan hyväksyntää vaativat tiedot

Sivuston reiteissä ei ole toteutettua privacy-/Impressum-/provider-information-sivua. `docs/owner-input/` sisältää näiden valmisteluun tarvittavia tietoja ja avoimia hyväksyntöjä.

Omistajan henkilöllisyyttä, osoitetta, oikeushenkilömuotoa, rekisteritunnuksia, oikeusperusteita tai säilytysaikoja ei saa keksiä eikä julkaista muista lähteistä ilman hyväksyntää. Tiedostojen vanhat live- ja analytiikkahavainnot on luettava päivämäärän kanssa; ne eivät ole tämänhetkisen tuotantojulkaisun lausuntoja.

## 13. Testit ja todentamisen rajat

### 13.1 Node-testikokonaisuus

Node-testit sijaitsevat `test/*.test.mjs`-tiedostoissa ja käyttävät `node:test`- sekä `node:assert/strict`-rajapintoja. Ei Vitest-/Jest-konfiguraatiota eikä asetettua coverage-prosenttirajaa. Alla on keskeiset testiryhmät, ei hauras lukumääräbaseline.

| Tiedosto | Mitä se tarkistaa |
| --- | --- |
| `test/exposure-time.test.mjs` | Saksan energiapohjaiset ajat, englannin NIOSH-mallin säilyminen ja aikamuotoilu. |
| `test/daily-noise-exposure.test.mjs` | Edustavat L_EX,8h-tulokset, pyöristysrajojen luokat, järjestysriippumattomuus ja virheelliset kestot. |
| `test/i18n-build.test.mjs` | Sisältömäärät, kieliparit, saksan sisälinkit, yhtäläinen sound-data, reitit, jaettu sivurakenne, header, kielivalitsin ja sitemap. |
| `test/conditional-katex-css.test.mjs` | Kaavamäärät, ehdollinen KaTeX-CSS, MathML/TeX, fonttipolut, head-metatiedot, skeemat sekä sivumäärät. |
| `test/katex-font-assets.test.mjs` | KaTeX-fonttien same-origin-tiedostot, ei data-fontteja, valitun fontin tavut ja CSP-yhteensopivuus. |
| `test/cloudflare-404.test.mjs` | Wrangler-fallback, generoitu 404-rakenne/metat, ei 404:ää indeksissä sekä 8 legacy-ohjausta. |
| `test/analytics-removal.test.mjs` | Ei GA-lataajaa määritellyissä lähteissä eikä vanhaa suostumus-UI:ta Basessa. |
| `test/accessibility-responsive-p1.test.mjs` | Valittujen muted-tekstien kontrastilaskenta, focus-säännöt, shrink-ehdot ja raw-URL-merkintä lähteessä/buildissa. |
| `test/semantic-accessibility-navigation.test.mjs` | Etusivun välilyönnit, Explorerin otsikkotasot, aktiivinen nav, haun sivurajaus ja forced-colors-sääntö. |
| `test/p2-content-calculator-corrections.test.mjs` | Kaikkien neljän monikenttäperheen validity-portti lähteessä, määrätyt sisältölinkit, saksan CTA ja lähdeotsikot. |
| `test/sound-explorer-range-sources.test.mjs` | Neljän lähteen metadata, alueet, en/de-yhtäläisyys, crawlattava lähde-HTML sekä oppaattomien äänten reittirajat. |
| `test/build-asset-validation.test.mjs`, `test/build-output-cleanup.test.mjs`, `test/content-route-collision-validation.test.mjs` | Build-assetit, pakotettu content-sync, tuoreusmarkkeri, epäonnistuneen buildin puhdistus sekä sisältöreittien, käännösavainten ja julkaisulinkkien eheys. |
| `test/editorial-markdown-safety.test.mjs`, `test/editorial-date.test.mjs` | Markdown-rakenteen turvallisuus, related-linkkimetadata ja toimituksellisten päivämäärien normalisointi. |
| `test/noise-dose.test.mjs`, `test/prices.test.mjs`, `test/tool-calculator-formatting.test.mjs`, `test/tools-data-safety.test.mjs` | Puhtaat laskenta-, hinta-, muotoilu- ja työkaludatasopimukset. |
| `test/google-font-loading.test.mjs` | Lähdemerkinnän ja tuoreen buildin Google Fonts -latausmalli sekä paikalliset fallbackit. |

Generoitua `dist/`-tuotosta lukevat testit kutsuvat ensin yhteistä `assertFreshBuild`-vartijaa. Se vertaa nykyisten build-syötteiden ja koko `dist`-puun SHA-256-hasheja onnistuneen buildin markkeriin. Suora yksittäinen testi keskeytyy selkeään build-pyyntöön, jos markkeri puuttuu tai lähde/tuotos on muuttunut; se ei rakenna sivustoa itse. `npm test` rakentaa edelleen kerran ennen testikokonaisuutta.

Osassa testeistä on tarkoituksellisesti täsmällisiä HTML-/CSS-tekstivertailuja. Niiden läpäisy todistaa kyseisen sopimuksen, ei kaikkia käyttäjän klikkauspolkuja tai kaikkien värien saavutettavuutta.

### 13.2 Selaimen responsiivisuus- ja vuorovaikutustesti

`npm run test:browser` (`npm run test:text-wrapping` on alias):

- löytää asennetun Chrome/Chromium-yhteensopivan selaimen; `CHROME_BIN` ohittaa löydön;
- Windowsissa etsii mm. Chromea, Edgeä ja Bravea tavallisista asennuspaikoista;
- ei lataa omaa selainta eikä edellytä erillistä Playwright-riippuvuutta;
- tarvitsee verkon Google Fontsille ja selaimen allekirjoitetuille en/de-tavutussanakirjoille;
- käynnistää oman Astro-previewn satunnaisporttiin ja oman tilapäisen selainprofiilin;
- ajaa reduced motion -tilassa 22 kohdistettua rivitystapausta;
- tarkistaa 58 ei-redirect-sivua leveyksillä 320/360/375/393/412/768/1440: yhteensä 406 yhdistelmää;
- tarkistaa lisäksi 6 navigaatio-/hakutilaa;
- vaihtaa vuorovaikutusosioon normaalin motion-asetuksen ja ajaa 6 ryhmää: kielivalikko, haku, Pro-välilehdet, Sound Explorer, laskurit ja hero Listen/Mute; haku-, rail- ja scramble-ryhmissä asetusta vaihdetaan myös ajonaikaisesti ja hero-ryhmä tarkistaa responsiivisen lähteenvaihdon sekä `pagehide`-/`resume()`-/`play()`-/autoplay-kilpatilanteet;
- siivoaa oman selaimen, previewn ja tilapäisprofiilin `finally`-polussa.

Tarkistus käsittelee oikeita fontteja, otsikoiden laatikoita ja tekstialueita, rivityssemantiikkaa, irrallista loppupistettä, `L_EX,8h`-tunnisteen katkeamattomuutta, linkkejä, taulukoiden/kaavojen paikallista vieritystä sekä tarkoituksellista ellipsiä.

DOM-rivit ja computed `hyphens` eivät todista näkyvän tavutusmerkin maalausta. Typografiamuutoksissa splitWords-havainnot pitää tarkistaa myös kuvasta. Selainajo kattaa nimetyt pääpolut, ei kaikkia media- tai laskurirajatilanteita, screen reader -käyttöä eikä tuotantohostingia.

### 13.3 Mitä tarkistusten läpäisy ei tarkoita

- Build sisältää Astro-tyyppi-/diagnostiikkatarkistuksen, mutta ei selaintestiä tai sisältöväitteiden faktantarkistusta.
- Node-testit eivät tee ammattimaista akustista kalibrointia.
- Lähdetekstin `checkValidity`-vertailu ei suorita kaikkia syöttö-/poistorivipolkuja selaimessa.
- Kaava-/fonttiassetin olemassaolo ei yksin todista, että fontti latautuu tuotannon CSP:n läpi.
- Hreflang-/canonical-testi ei todista hakukoneen indeksointia.
- 404-konfiguraatiotesti ei yksin todista tuotannon HTTP-statusta.
- GA4:n poissaolo lähteestä ei todista hosting-tilin nykyisiä asetuksia.
- Vanha Lighthouse-raportti tai kuvakaappaus ei ole nykyversion suorituskyky- tai UI-hyväksyntä.
- Tässä dokumentissa ei vahvisteta erillisen Android-sovelluksen käyttöoikeuksia, tietomallia, Google Play -julkaisua tai maksamista.

## 14. Muutoskohtaiset tarkistuslistat

### 14.1 Yhteinen UI tai header

- Tarkista `Base.astro` sekä muokattavan komponentin paikallinen CSS.
- Säilytä en/de-rakenne, navigaation aktiivisuus ja tarkoituksellinen haun sivurajaus.
- Testaa desktop ja mobiili, näppäimistö, dialogin sulkeminen ja fokuksen palautus.
- Tarkista kielivalitsimen aito vastine ja parittoman sivun indeksifallback.
- Otsikko-/korttiluokan muuttuessa tarkista `revealSelectors` ja heading-transitionin korttivalitsin.
- Älä korvaa reveal-siirtymää vahingossa omalla `transition`-säännöllä.
- Tarkista tavutus, pitkät saksan sanat, fonttien lataus, forced colors ja reduced motion.
- Erota tietoa kantava väri yleisestä koristelusta; älä lisää koristeellisia värireunoja.

### 14.2 Laskurin logiikka tai lomake

- Nimeä muutettava malli: NIOSH-aika, NIOSH-annos, EU-aika, EU L_EX,8h, etäisyys tai logaritminen summa.
- Tarkista kaava, yksikkö, rajat, tarkkuus ja näkyvä pyöristys.
- Testaa tyhjä, nolla, negatiivinen, rajan ylittävä ja desimaalinen arvo sekä natiivi stepMismatch.
- Jaksolaskureissa testaa tunti/minuutti, 24 tunnin kokonaisraja, minimi-/maksimirivit, lisäys/poisto ja stepperien ID/label-yhteys.
- Säilytä viimeisen kelvollisen tuloksen sijasta näkyvä virhetila, kun nykyinen syöte on epäkelpo.
- Tarkista en/de-formaatit ja status-alueen ilmoitus; älä lisää scramblea joka input-eventiin.
- Pidä oletus-HTML, noscript-esimerkki ja laskettu oletustulos yhtäpitävinä.
- Aja puhtaat laskentatestit ja tarvittaessa oikea selaimen syöttöpolku.

### 14.3 Sound-alue tai opaslinkitys

- Muuta tekninen arvo yhteisessä datassa, älä kopioi eri numeroita kielipaketteihin.
- Tarkista lähteen tarkka luku, painotus, mittaustapa, etäisyys ja ajan määritelmä.
- Päivitä tarvittaessa raportoitu arvo, näytön pyöristys ja lähdekonteksti yhdessä.
- Tarkista Explorerin palkki/markkeri, mobiilirivi, search.json, sound-summary, runkoteksti ja mahdollinen kuva.
- `publishedKeys`, Markdownin draft ja reittipari ovat erillisiä tarkistuspisteitä.
- Säilytä oppaattomien äänten käyttökelpoiset Explorer-/hakukohteet ilman olemattomia opasreittejä.

### 14.4 Artikkeli, käännös tai metadata

- Tarkista schema, slug, translationKey, clusterKey, description ja päiväykset.
- Varmista väite suoraan lähteestä; erota nykyfakta aiemmasta auditointiväitteestä.
- Tarkista näkyvä lähdeluettelo ja viiteavaimet, ei pelkkä researchSources.
- Säilytä paikalliset sisälinkit ja aluekohtainen sääntely.
- Tarkista CTA:n todellinen valintaehto ja related-poiminnan nykyiset rajoitukset.
- Tarkista yksi H1, otsikon rivitys, taulukot, kuvat, lähde-URL:t ja kaavat oikeasta HTML:stä.
- Tarkista canonical, vastavuoroiset hreflangit, sitemap ja paikallinen hakuindeksi.
- Sisältömäärän/kaavojen muuttuessa päivitä vain tarkoituksellisesti muuttuneet testibaselinet ja mahdolliset copy-vakiot.

### 14.5 Julkaisu tai riippuvuuspäivitys

- Paikallinen lähde on lähtökohta; älä korvaa käyttäjän työtä etärepositorion versiolla.
- Tarkista diff ja salaisuudet sekä tarvittaessa odottamaton remote-ahead-ero ennen pushia.
- Riippuvuuspäivityksessä tarkista ratkaistu lockfile ja build-putken API-yhteensopivuus.
- Aja check, build ja relevantit testit; build- ja hosting-ongelmia ei pidä nimetä toistensa todisteiksi.
- Git-push ei ole lupa Cloudflare-deployhin.
- Älä luo, avaa, lähetä tai yhdistä pull requestia; käyttäjä tekee sen itse.
- Älä force-pushaa ilman erillistä pyyntöä.
- Pysäytä vain tätä tehtävää varten käynnistetyt tilapäisprosessit.
- Dokumentoi lopuksi erikseen paikallinen tarkistus, mahdollinen push ja mahdollinen tuotantojulkaisu.

## 15. Nykyiset poikkeukset ja dokumenttien asema

| Asia | Nykyinen tulkinta |
| --- | --- |
| Vanhan PROJECT.md:n Android-arkkitehtuuri | Ei kuvaa tätä repositoriota. Tämän tiedoston tarkoitus on verkkosivuston toteutusviite. |
| `UI-SPEC.md` | Kuvaa Compose-sovellusta, Manrope/Space Grotesk -fontteja ja Android-teemoja. Verkkosivun CSS/fontit tarkistetaan lähteestä. |
| AGENTS-maininta näkymättömästä kielivalitsimesta | Eri asia kuin nykyinen toteutus: valitsin näkyy etusivun ulkopuolella, ja testit vaativat sen. |
| Draft-suojaus | Kokoelmasuodatus on olemassa; reittiparit ja publishedKeys ovat erillisiä käsin ylläpidettäviä rekistereitä. |
| Uuden kielen lisääminen | En/de-kovakoodauksia on konfiguraation lisäksi route-generoinnissa, komponenteissa ja testeissä. |
| Kaikille sivuille canonical | Ei koske todellista 404-dokumenttia eikä samoin käsiteltäviä legacy-redirect-HTML:iä. |
| Täysi JS-riippumattomuus | Artikkelit ja mobiilin details-toiminnot toimivat HTML:nä; mobiilivalikko, haku, live-laskenta ja Pro-tab-vaihto vaativat scriptin. |
| Selainkäyttöinen anime.js | Hero ja kisko tuovat nimetyt osansa suoraan; scramble-polku lataa moottorin dynaamisesti. Artikkelin sisältötemplate ei tuo anime.js:ää. |
| Tietosuoja-/provider-sivut | Eivät ole nykyisiä reittejä; omistajan hyväksyntää vaativat tiedot ovat erillisissä muistioissa. |
| Sovellusjulkaisu ja hinnat | Sivuston copy/config, ei tässä vahvistettu Google Play -tilanne. |
| Historiallinen tuotantotodiste | Pätee dokumentoituun versioon ja päivään, ei automaattisesti nykyiseen lähteeseen tai live-julkaisuun. |

Muiden dokumenttien käyttötarkoitukset:

- `AGENTS.md`: työskentelyn ja sivuston rajaukset; ristiriita nykyiseen toteutukseen tehdään näkyväksi.
- `dbcheck-content-plan.md`: sisältöstrategia ja suunniteltuja aiheita. Sen laajempi artikkelimäärä ei ole julkaistun sisältökannan määrä.
- `dbcheck-saksa-i18n.md`: lokalisoinnin suunnittelu-/toteutusviite; nykyiset reitit tarkistetaan koodista.
- `dbcheck-article-audit.md`: aikaisempi sisältöauditointi.
- `DBCHECK_SITE_IMPROVEMENT_AUDIT_2026-08-21.md`: päivätty sivustoauditointi.
- `docs/audits/`: päivättyjä linkki-, fakta-, käyttöliittymä-, fontti-, 404- ja julkaisutarkistuksia.
- `docs/owner-input/`: julkaistavaksi hyväksyttäviä omistaja-/tietosuojatietoja, ei automaattisesti julkaistava sivuteksti.
- `url-osoitteet.md` ja `dBcheck-url-osoitteet.md`: apuluetteloita; `src/pages`, sisältö ja reittirekisteri ratkaisevat todelliset reitit.
- `memory/MEMORY.md`: projektihistoriaa, ei tuotannon ajantasaisuustodiste.

Tässä dokumentointitehtävässä yllä mainittuja lähdekoodin poikkeuksia ei korjata eikä muita dokumentteja päivitetä.

## 16. Tämän dokumentin ylläpito

Päivitä tätä tiedostoa, kun arkkitehtuuri, sisältöskeema, reittiparit, näkyvyysportit, laskentamalli, UI-tokenit, verkkopyynnöt tai testien suorituspolku muuttuvat.

Pidä ylläpidossa kolme asiaa erillään:

1. **Toteutus:** mitä nykyinen lähde oikeasti tekee ja missä vastuu sijaitsee.
2. **Sopimus:** mitä pitää säilyttää tai todentaa muutoksessa.
3. **Todiste:** mikä komento, selainpolku tai julkaisu tarkistettiin ja milloin.

Älä lisää dokumenttiin oletettuja tiedostoja, automaattisesti toimimattomia komentoja, tekemättömiä testiajoja tai hyväksymättömiä tuote-/oikeudellisia lupauksia. Uusi build tai dokumenttipäivä ei yksin päivitä artikkelien reviewed-päivämääriä eikä todista tuotannon tilaa.
