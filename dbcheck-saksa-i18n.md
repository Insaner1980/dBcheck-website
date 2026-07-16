# dBcheck-sivuston Saksa-vaiheen kattava i18n-toteutussuunnitelma

## 1. Tavoite ja lukitut ratkaisut

Sivusto muutetaan Astro 7:n natiivilla i18n-reitityksellä kaksikieliseksi siten, että englanti säilyy oletuskielenä ilman URL-etuliitettä ja saksa julkaistaan `/de/`-polun alla.

Lukitut periaatteet:

- Käytetään vain Astron omaa `i18n`-konfiguraatiota ja `astro:i18n`-apureita.
- Sivusto säilyy täysin staattisena SSG-sivustona Cloudflare Pagesille.
- Kaikki nykyiset englanninkieliset URL:t, slugit, sisältö ja toiminta säilyvät.
- Saksa-vaihe kattaa:
  - 15 tavallista artikkelia;
  - 5 sound-artikkelia;
  - lokalisoidun sounds-sivun ja Sound Explorerin;
  - saksankielisen työkaluindeksin;
  - EU/Saksa-mallisen melualtistuslaskurin;
  - saksankieliset etäisyys- ja desibelien summauslaskurit;
  - saksankielisen haun, navigaation, footerin ja sisältösivujen käyttöliittymätekstit.
- Englanninkielistä markkinointietusivua ei lokalisoida eikä `/de/`-etusivua generoida. Logo ja saksankielisten sisältösivujen Startseite-breadcrumb johtavat `/`-etusivulle.
- Lokalisoidut sisältö- ja työkalusivut käyttävät samoja komponentteja, rakennetta ja elementtipaikkoja kuin englanninkieliset vastineensa. Vain tekstit ja URL:t lokalisoidaan.
- Molempia nykyisiä NIOSH-laskureita ei käännetä saksaksi. Saksassa ne korvaa yksi EU/Saksa-mallin mukainen `L_EX,8h`-laskuri.
- Uudesta EU-laskurista tehdään myös englanninkielinen versio, jotta sillä on aito en–de-hreflang-pari.
- Ranskaa, portugalia, espanjaa tai italiaa ei vielä lisätä Astron `locales`-taulukkoon eikä niille luoda reittejä.

## 2. I18n-arkkitehtuuri

### Konfiguraatio ja locale-paketti

Viimeistellään jo aloitettu i18n-konfiguraatio:

```ts
defaultLocale: 'en'
locales: ['en', 'de']
routing: {
  prefixDefaultLocale: false
}
```

Luodaan pieni, tyypitetty locale-kerros ilman ulkoista i18n-kirjastoa:

- `Locale = 'en' | 'de'`
- `defaultLocale`
- `locales`
- `isLocale()`
- locale-kohtaiset käyttöliittymätekstit
- locale-kohtaiset työkalumäärittelyt
- locale-kohtainen sound-data
- staattisten vastinesivujen reittirekisteri
- sisältöjen `translationKey`–slug-parit sitemapia ja validointia varten

Yhden locale-paketin tulee sisältää kaikki kielikohtainen data, jota yhteiset sivupohjat tarvitsevat. Uuden kielen lisääminen ei saa vaatia uusien Astro-sivupohjien kopioimista.

Pakettiin lisätään suomenkielinen kommenttiohje:

1. lisää locale `locales`-taulukkoon;
2. lisää locale-paketti käyttöliittymä-, työkalu- ja sound-teksteineen;
3. luo `src/content/articles/{locale}/` ja `src/content/sounds/{locale}/`;
4. lisää `locale`, `translationKey`, `clusterKey` ja lokalisoitu `slug`;
5. lisää slug-parit reittirekisteriin;
6. aja build ja i18n-varmennus.

### Reittien muodostus

Englannin nykyiset sivut säilytetään nykyisissä juurireiteissä. Niiden `getStaticPaths()` muutetaan suodattamaan vain `locale === 'en'`.

Muille kielille käytetään dynaamista locale-parametria, esimerkiksi:

- `[locale]/index.astro`
- `[locale]/articles/index.astro`
- `[locale]/articles/[slug].astro`
- `[locale]/sounds/index.astro`
- `[locale]/sounds/[slug].astro`
- `[locale]/[toolsSegment]/index.astro`
- `[locale]/[toolsSegment]/[slug].astro`
- `[locale]/search.json.js`

`getStaticPaths()` tuottaa vain konfiguroidut ei-oletuslocalet ja käyttää sisällön omaa `data.slug`-arvoa. `entry.id`:tä ei käytetä julkisen URL:n slugina.

Kaikki ohjelmalliset linkit muodostetaan `getRelativeLocaleUrl()`- tai `getAbsoluteLocaleUrl()`-apureilla. Apurille annetaan locale-etuliitteetön sisäinen polku, jotta `/de/de/...`-tyyppistä kaksoisprefiksiä ei voi syntyä.

### Lokalisoidut rakennepolut

Alkuperäisen i18n-ohjeen mukaisesti artikkeli- ja sounds-polut säilyvät rakenteeltaan samoina:

- `/articles/` ↔ `/de/artikel/`
- `/sounds/` ↔ `/de/alltagsgeraeusche/`

Työkalujen rakennepolku lokalisoidaan:

- `/tools/` ↔ `/de/werkzeuge/`

Staattisten sivujen reittirekisteri käsittelee myös eri kielillä eri rakennepolut. Reittejä ei muodosteta käsin merkkijonoja yhdistelemällä komponenttien sisällä.

## 3. Sisältökokoelmat ja 20 artikkeliparia

### Hakemistorakenne

Nykyiset sisällöt järjestetään näin:

```text
src/content/articles/en/*.md
src/content/articles/de/*.md
src/content/sounds/en/*.md
src/content/sounds/de/*.md
```

Saksankielisten latauskansion epäselvät tiedostonimet, kuten `(4)(1)`, poistetaan. Tiedostonimi vastaa lokalisoitua frontmatter-slugia.

### Frontmatter-sopimus

Yhteiseen editorial-skeemaan lisätään:

```ts
locale: z.enum(locales)
translationKey: z.string()
clusterKey: z.enum([
  'fundamentals',
  'exposure',
  'smartphone',
  'common-sounds'
])
```

Kenttien tarkoitus:

- `locale`: sisältöversion kieli;
- `translationKey`: sama vakaa tunniste kaikissa saman sisällön kieliversioissa;
- `clusterKey`: kielestä riippumaton ryhmittelytunniste;
- `contentCluster`: säilyy lokalisoituna käyttäjälle näkyvänä nimenä;
- `slug`: kyseisen kieliversion oma julkinen slug.

Collection-ID muodostetaan muodossa `{locale}/{slug}`, jolloin samannimiset slugit eivät törmää tulevilla kielillä.

`translationKey` on englanninkielinen alkuperäinen slug, koska saksalaisessa frontmatterissa ei ole valmista alkuperäistunnistetta.

### Päätetty en–de-paritus

| translationKey | Saksankielinen slug | Kokoelma |
|---|---|---|
| `are-decibel-meter-apps-accurate` | `sind-dezibel-apps-genau` | articles |
| `db-vs-dba` | `db-und-dba-unterschied` | articles |
| `how-long-can-you-listen-at-85-db` | `wie-lange-85-db-hoeren` | articles |
| `how-to-calibrate-a-decibel-meter-app` | `dezibel-app-kalibrieren` | articles |
| `how-to-measure-decibels-with-android-phone` | `dezibel-messen-mit-android-handy` | articles |
| `is-3-db-twice-as-loud` | `sind-3-db-doppelt-so-laut` | articles |
| `niosh-vs-osha-noise-exposure-limits` | `laermexpositionsgrenzen-deutschland-eu` | articles |
| `phone-sound-meter-vs-professional-meter` | `schallpegelmesser-app-vs-messgeraet` | articles |
| `what-is-a-decibel` | `was-ist-ein-dezibel` | articles |
| `what-is-a-safe-decibel-level` | `welcher-dezibelwert-ist-sicher` | articles |
| `what-is-noise-dose` | `was-ist-eine-laermdosis` | articles |
| `what-is-sound-pressure-level` | `was-ist-schalldruckpegel` | articles |
| `why-decibel-meter-apps-show-different-results` | `warum-dezibel-apps-unterschiedliche-werte-zeigen` | articles |
| `why-does-85-db-matter` | `warum-sind-85-db-wichtig` | articles |
| `why-is-the-decibel-scale-logarithmic` | `warum-ist-die-dezibelskala-logarithmisch` | articles |
| `baby-crying` | `babygeschrei` | sounds |
| `concert` | `konzert` | sounds |
| `lawn-mower` | `rasenmaeher` | sounds |
| `normal-conversation` | `normales-gespraech` | sounds |
| `vacuum-cleaner` | `staubsauger` | sounds |

`niosh-vs-osha-noise-exposure-limits` ↔ `laermexpositionsgrenzen-deutschland-eu` on tietoinen alueellinen sisältöadaptio, mutta niillä on sama tiedollinen tarkoitus ja ne käsitellään kieliversioina.

Build-validointi varmistaa:

- jokaisella `translationKey`:llä on en-versio;
- tässä vaiheessa kaikilla 20 avaimella on täsmälleen yksi de-versio;
- locale–slug-yhdistelmät ovat yksilöllisiä;
- reittirekisterin slugit vastaavat frontmatteria;
- draft-versioita ei julkaista eikä käytetä hreflangeissa.

## 4. Saksankieliset sisältösivut

### Etusivu

Etusivu säilyy vain englanninkielisenä reitillä `/`. `/de/`-reittiä, saksankielistä landing pagea tai etusivun en–de-hreflang-paria ei muodosteta.

### Artikkeli-indeksi

`/de/artikel/` näyttää kaikki 20 saksankielistä opasta neljässä ryhmässä:

- Dezibel-Grundlagen
- Lärmexposition und Gehörschutz
- Schallmessung mit dem Smartphone
- Alltagsgeräusche

Ryhmittely käyttää vakaata `clusterKey`-kenttää, ei lokalisoitujen `contentCluster`-tekstien vertailua.

Sivun otsikot, kuvaukset, lukumäärät ja päivämäärät lokalisoidaan. Päivämäärät muotoillaan `de-DE`-localella.

### EditorialPage

Yhteistä artikkelipohjaa ei kopioida. Se saa nykyisen localen ja käyttää locale-paketista:

- breadcrumb-tekstit;
- tarkistuspäivän muodon;
- sound summary -kenttien nimet;
- related articles -otsikot;
- CTA-tekstit;
- sisältöryhmien nimet;
- structured datan kielitiedot.

Related-linkit lasketaan vain saman localen julkaistuista sisällöistä. Saksankielinen artikkeli ei saa vahingossa englanninkielisiä related-kortteja.

Structured dataan lisätään:

- `inLanguage`;
- lokalisoidut breadcrumb-nimet;
- kyseisen kieliversion canonical;
- kyseisen kieliversion `mainEntityOfPage`.

## 5. Saksankieliset sisälinkit

Kaikki 104 `[Interner Link geplant: ...]` -paikkamerkintää korvataan tavallisilla Markdown-linkeillä.

Linkit ryhmitellään niiden tarkoittaman `translationKey`:n mukaan, jotta saman otsikon kirjoitusvariantit osoittavat samaan kohteeseen. Linkkiteksti säilytetään luontevana saksana.

Päätetyt poikkeukset:

- `Dezibelwerte addieren und mitteln`  
  → `/de/werkzeuge/dezibel-addieren/`
- `Rechner für sichere Expositionszeit`  
  → linkkiteksti muutetaan täsmällisemmäksi, esimerkiksi `Lärmexpositionspegel berechnen`  
  → `/de/werkzeuge/laermexpositionsrechner/`
- `Wie beeinflusst der Abstand den Schallpegel? Die 6-dB-Regel`  
  → `/de/werkzeuge/schallpegel-entfernung/`
- `Gehörschutz bei Konzerten: Lärmexposition bei Live-Events reduzieren`  
  → `/de/artikel/welcher-dezibelwert-ist-sicher/`
- `Wie laut ist zu laut? Schallpegel, Dauer und Gehörrisiko`  
  → `/de/artikel/welcher-dezibelwert-ist-sicher/`
- `Common Sounds Explorer` ja vastaavat otsikkovariantit  
  → `/de/alltagsgeraeusche/`

Varmennus etsii sekä tarkan `[Interner Link geplant` -tekstin että kaikki saksalaisten Markdown-tiedostojen juureen osoittavat englanninkieliset `/articles/`, `/sounds/` ja `/tools/`-sisälinkit.

## 6. Sound-data ja Sound Explorer

### Data

Nykyinen sound-data jaetaan locale-kohtaisiin moduuleihin tai locale-avaimella indeksoituun rakenteeseen.

Jokaisella soundilla on:

- vakaa `translationKey`;
- locale-kohtainen `slug`;
- lokalisoitu nimi, kategoria, mittausetäisyys, äänityyppi, kuvaus ja altistushuomautus;
- samat numeroarvot ja tekniset näyttöarvot kaikissa kielissä.

Kaikkien yhdeksän soundin seuraavien kenttien on oltava bittitasolla samat en- ja de-datassa:

- `typicalMinDb`
- `typicalMaxDb`
- `riskLevel`
- `markerLane`
- järjestys

Viidelle julkaistulle sound-oppaalle reitti ratkaistaan julkaistusta content entrystä. `articleRoute`a ei kovakoodata saksalaiseen dataan irrallisena URL:na.

### Saksankielinen sounds-sivu

`/de/alltagsgeraeusche/` lokalisoidaan kokonaan:

- sivun metadata;
- otsikot ja kuvaukset;
- Explorerin kontrollit;
- kategoriat;
- `Read guide` / `Explorer only` -tekstit;
- mittausrajoitukset;
- puhelinmittausten vastuuvapaustekstit.

Sävy on neutraali ja asiallinen. Käyttäjää puhutellaan tarvittaessa muodollisesti `Sie`-muodossa. Englanninkielisen datan näkyviä tekstejä ei muuteta.

Sound Explorer säilyttää ymmärrettävän HTML-perusnäkymän ilman JavaScriptiä.

## 7. Työkalut ja uusi EU/Saksa-laskuri

### Julkiset työkalureitit

Englanti:

- nykyiset `/tools/...`-reitit säilyvät;
- lisätään `/tools/daily-noise-exposure-level-calculator/`.

Saksa:

- `/de/werkzeuge/`
- `/de/werkzeuge/expositionsdauer-rechner/`
- `/de/werkzeuge/laermexpositionsrechner/`
- `/de/werkzeuge/schallpegel-entfernung/`
- `/de/werkzeuge/dezibel-addieren/`
- Sound Explorer säilyy `/de/alltagsgeraeusche/`-reitillä.

Saksaksi ei luoda NIOSH Noise Dose -sivua. Englannin Safe Exposure Time -sivun saksankielinen vastine on Expositionsdauer-Rechner, joka käyttää NIOSH-mallin sijasta BAuA:n L_EX,8h-kaavaa ja 85 dB(A):n ylempää Auslösewert-arvoa.

Englannin nykyinen NIOSH-laskuri, NIOSH-annoslaskuri ja etusivun NIOSH-widget säilyvät muuttumattomina.

### Työkaludata

`ToolDefinition` muutetaan locale-tietoiseksi. Se sisältää vähintään:

- vakaan ID:n;
- mahdollisen `translationKey`:n hreflang-paritusta varten;
- lokalisoidun otsikon, kuvauksen, CTA:n ja hakusanat;
- locale-kohtaisen reittitunnisteen;
- kategorian ja järjestyksen.

Englannin ja saksan työkalulistat saavat olla eripituisia. Työkaluindeksi ei oleta, että jokaisella englannin työkalulla on käännös.

Hreflang-parit:

- tools index ↔ Werkzeuge index;
- Safe Exposure Time ↔ Expositionsdauer-Rechner (yhteinen sivurakenne, locale-kohtainen laskentamalli);
- Add Decibels ↔ Dezibel addieren;
- Decibel Distance ↔ Schallpegel bei unterschiedlicher Entfernung;
- uusi English EU calculator ↔ Lärmexpositionsrechner.

Englannin Noise Dose -työkalu on en-only-sivu.

### EU/Saksa-laskurin laskentamalli

Laskuri laskee useasta likimäärin vakiona pysyvästä jaksosta päivän kahdeksaan tuntiin normalisoidun tason:

```text
L_EX,8h = 10 × log10(
  Σ[(T_i / 8 h) × 10^(L_Aeq,i / 10)]
)
```

Syötteet:

- jakson A-painotettu taso `dB(A)`;
- kesto;
- yksikkö `min` tai `h`;
- 1–12 jaksoa;
- kokonaiskesto enintään 24 tuntia.

Tulokset:

- `L_EX,8h` yhden desimaalin tarkkuudella;
- jaksojen yhteenlaskettu kesto;
- selitetty luokitus:
  - alle 80 dB(A): alempi toimintaraja ei ylity;
  - 80–alle 85 dB(A): alempi toimintaraja saavutetaan;
  - vähintään 85 dB(A): ylempi toimintaraja saavutetaan;
- erillinen huomautus 87 dB(A):n EU-raja-arvosta ja kuulonsuojainten vaimennuksen erillisestä käsittelystä.

Laskuri ei:

- kutsu tulosta turvalliseksi ajaksi;
- anna yksilöllistä terveys- tai kuuloturvallisuustakuuta;
- käsittele C-painotettua peak-arvoa;
- vähennä kuulonsuojainten nimellisvaimennusta;
- väitä korvaavansa pätevää työpaikkamittausta;
- käytä puhelinlukemaa säädöstenmukaisena mittauksena.

Viralliset lähteet esitetään sivulla:

- [LärmVibrationsArbSchV §6](https://www.gesetze-im-internet.de/l_rmvibrationsarbschv/__6.html)
- [EU-direktiivi 2003/10/EY](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32003L0010)
- [IFA-Lärmexpositionsrechner](https://laermexposition.ifa.dguv.de/)
- BAuA:n asiaankuuluva Lärm-ohjeistus

Laskennan puhdas funktio erotetaan DOM-koodista ja jaetaan englannin ja saksan sivujen kesken.

### Laskurin esimerkkitapaukset

Vähintään seuraavat tulokset lukitaan testeillä:

- 85 dB(A), 8 h → 85,0 dB(A)
- 88 dB(A), 4 h → 85,0 dB(A)
- 85 dB(A), 4 h + 88 dB(A), 2 h → 85,0 dB(A)
- 80 dB(A), 8 h → 80,0 dB(A)
- jaksojen järjestys ei muuta tulosta
- nolla, negatiivinen kesto, puuttuva arvo tai yli 24 tunnin summa näyttää lokalisoidun virheen eikä numeroa

Englanninkielinen tulos käyttää desimaalipistettä ja saksankielinen desimaalipilkkua.

### Nykyisten laskurikomponenttien lokalisointi

Yhteiset komponentit säilyvät yhteisinä:

- CalculatorPage
- NumberField
- DistanceCalculator
- AddDecibelsCalculator
- uusi DailyNoiseExposureCalculator

Komponentit saavat locale-kohtaiset copy-propsit tai tyypitetyn copy-olion. Laskentalogiikkaa ei kopioida.

Nykyisen client scriptin englanniksi kovakoodatut:

- validointiviestit;
- dynaamiset legendat;
- add/remove-painikkeet;
- tulosselitteet;
- stepperien aria-labelit

siirretään renderöityihin locale-kohtaisiin arvoihin. JavaScript lukee ne komponentin datasta eikä ylläpidä toista irrallista käännössanastoa.

Regressiotapaukset:

- 80 dB + 80 dB → 83,0 dB;
- 90 dB yhden yksikön etäisyydellä → noin 84,0 dB kaksinkertaisella etäisyydellä;
- kaikki nykyiset englanninkieliset tekstit ja oletusarvot säilyvät.

## 8. Yhteinen sivukehys, haku ja kieliversiot

### Base.astro

`<html lang="en">` korvataan:

```astro
<html lang={Astro.currentLocale ?? defaultLocale}>
```

Locale-paketti lokalisoi saksalaisilla sivuilla:

- skip linkin;
- päävalikon;
- mobiilivalikon;
- haun;
- footerin;
- yhteiset turvallisuusrajaukset;
- aria-labelit;
- Open Graph localen.

Saksan navigaatio:

- Rechner und Werkzeuge
- Artikel
- haku

Saksalainen ja myöhemmin lisättävät muut lokalisoidut sivustot näyttävät yläpalkissa vain paikalliset työkalut, artikkelit ja haun. Etusivulle pääsee logosta. Päävalikko ei sisällä erillisiä etusivu-, sound-, kieli-, `Features`-, `Pricing`- tai sovellusesittelylinkkejä.

### Haku

Englannin `/search.json` suodatetaan vain englanninkieliseen sisältöön.

Saksalle generoidaan `/de/search.json`, joka sisältää:

- 20 saksankielistä opasta;
- saksankieliset sound-nimet ja kuvaukset;
- saksankieliset työkalut;
- saksankieliset sisältöindeksit;
- vain olemassa olevat saksankieliset URL:t.

German Base hakee `/de/search.json`-indeksin. Hakukentän placeholderit, tulostyypit, empty state ja aria-tekstit lokalisoidaan.

### Kieliversioiden löydettävyys

Myöhemmän käyttöliittymäpäätöksen mukaisesti yläpalkkiin ei lisätä näkyvää kielivalitsinta. Kieliversiot löytyvät omista reiteistään, ja hakukoneille vastineet ilmoitetaan hreflang- ja sitemap-tiedoissa. Näin uusien kielten lisääminen ei kasvata päävalikkoa.

## 9. Canonical, hreflang ja sitemap

### Sivukohtaiset alternates

Base saa tyypitetyn `alternates`-propin, joka sisältää vain aidot vastinesivut.

Jokaisella HTML-sivulla:

- canonical osoittaa nykyiseen locale-URL:iin;
- mukana on self-hreflang;
- mukana ovat vain olemassa olevat vastinesivut;
- jos en-versio on olemassa, `hreflang="x-default"` osoittaa siihen;
- draft- tai puuttuville käännöksille ei muodosteta linkkiä.

Kaikilla tässä vaiheessa julkaistavilla saksankielisillä HTML-sivuilla on englanninkielinen vastinesivu:

- `/de/` ↔ `/`
- article- ja sound-indeksit;
- kaikki 20 sisältösivua;
- työkaluhakemistot;
- kolme julkaistavaa saksankielistä laskuria.

Hreflang-parien on oltava vastavuoroisia.

### Sitemap

`@astrojs/sitemap` säilytetään.

Integraation tavallinen i18n-mekanismi ei yksin riitä, koska se yhdistää vain saman loppupolun locale-versiot. Lokalisoidut slugit ja `/tools/` ↔ `/de/werkzeuge/` vaativat oman parituksen.

Ratkaisu:

- sitemapille annetaan en/de-i18n-konfiguraatio;
- `serialize()` korvaa tai täydentää automaattiset `links`-kentät reittirekisterin `translationKey`-pareilla;
- jokaiselle täydelle parille kirjoitetaan `en`, `de` ja `x-default`;
- en-only NIOSH-sivuille ei keksitä saksalaista vastinetta;
- sitemap ei sisällä draft-reittejä, hakupäätepisteitä tai olemattomia locale-URL:eja.

Build-varmennus lukee tuotetun sitemapin ja tarkistaa:

- kaikki julkaistut en/de-sivut ovat mukana;
- jokainen sitemap-hreflang vastaa oikeaa lokalisoitua slugia;
- vastavuoroisuus toteutuu;
- `x-default` on englanninkielinen URL;
- sitemapissa ei ole `/de/artikel/{english-slug}/`, `/de/alltagsgeraeusche/{english-slug}/`, `/de/tools/` tai `/de/de/`-virhereittejä.

## 10. Julkiset rajapinnat ja tyypit

Toteutus lisää tai muuttaa seuraavat sisäiset sopimukset:

```ts
type Locale = 'en' | 'de';

interface AlternateLink {
  locale: Locale;
  href: string;
}

interface EditorialFrontmatter {
  locale: Locale;
  translationKey: string;
  clusterKey:
    | 'fundamentals'
    | 'exposure'
    | 'smartphone'
    | 'common-sounds';
  slug: string;
  // nykyiset kentät säilyvät
}

interface LocalizedToolDefinition {
  id: string;
  translationKey?: string;
  locale: Locale;
  title: string;
  description: string;
  href: string;
  actionLabel: string;
  category: 'calculator' | 'explorer';
  order: number;
  searchTags: string[];
}

interface LocalizedCommonSound {
  translationKey: string;
  slug: string;
  // nykyiset teksti- ja numerokentät
}
```

Keskeiset apurit:

- nykyisen localen turvallinen ratkaiseminen;
- locale-kohtaisen reitin luominen `astro:i18n`-apureilla;
- content entryn julkinen route;
- `translationKey`-parien haku;
- hreflang-listan muodostus;
- locale-paketin nouto;
- locale-kohtaisen tool- ja sound-datan nouto.

## 11. Toteutusjärjestys

1. Tallenna nykyisestä `dist`-hakemistosta englannin julkisten URL:ien baseline-lista.
2. Viimeistele locale-konfiguraatio, tyypit ja Astro i18n.
3. Päivitä collection-skeema ja siirrä englannin sisällöt locale-hakemistoihin.
4. Kopioi ja nimeä 20 saksankielistä tiedostoa, lisää frontmatter-kentät ja varmista paritus.
5. Toteuta yhteiset locale-reitti- ja translationKey-apurit.
6. Päivitä englannin reitit käyttämään uutta collection-ID:tä rikkomatta URL:eja.
7. Lisää dynaamiset saksankieliset article-, sound- ja indeksireitit.
8. Lokalisoidaan Base, EditorialPage, SoundExplorer, CalculatorPage ja NumberField.
9. Lisätään saksankielinen sound-data ja data-pariteetin tarkistus.
10. Toteutetaan englannin ja saksan EU-laskuri ja sen puhdas laskentafunktio.
11. Lokalisoidaan etäisyys- ja summauslaskurit.
12. Lisätään `/de/werkzeuge/`, `/de/` ja saksankielinen haku.
13. Korvataan kaikki saksalaisten artikkelien sisälinkkipaikat.
14. Lisätään hreflangit ja translationKey-pohjainen sitemap ilman näkyvää kielivalitsinta.
15. Päivitetään projektin `AGENTS.md` kuvaamaan locale-paketit, content-rakenne, EU-laskuri, reittirekisteri ja uuden kielen lisääminen.
16. Ajetaan koko varmennusmatriisi ja korjataan vain havaittavat regressiot.

## 12. Testaus ja hyväksymiskriteerit

### Automaattiset tarkistukset

Ajetaan vähintään:

```text
npm run build
node --test
```

Lisätään kevyt Node-pohjainen i18n/build-varmennus ilman uutta raskasta testikehystä.

Sen tulee tarkistaa:

- 15 en + 15 de article-entryä;
- 5 en + 5 de sound-entryä;
- 20 täydellistä translationKey-paria;
- ei duplicate locale–slug-yhdistelmiä;
- ei `[Interner Link geplant` -tekstiä;
- kaikki saksankieliset sisälinkit osoittavat olemassa olevaan build-reittiin;
- yläpalkissa ei ole kielimäärän mukana kasvavaa kielivalitsinta;
- sound-datan kaikki numerot ja tekniset kentät ovat identtiset;
- kaikki English baseline -URL:t ovat edelleen buildissa;
- yksikään nykyinen englannin canonical ei ole muuttunut;
- kaikki suunnitellut `/de/`-reitit ovat buildissa;
- kaikki hreflang-parit ovat vastavuoroisia;
- kaikki `x-default`-linkit osoittavat englanninkieliseen vastineeseen;
- sitemapissa ei ole olemattomia locale-reittejä.

### Selaintarkistus

Tarkistetaan oikeassa selaimessa desktopilla ja mobiilissa:

- englannin ja saksan navigaatio;
- mobiilivalikko;
- englannin ja saksan haku;
- article- ja sound-indeksit;
- yksi tavallinen artikkelipari;
- yksi sound-artikkelipari;
- Sound Explorer ilman ja JavaScriptin kanssa;
- kaikki neljä saksankielistä laskuria;
- uuden EU-laskurin englanninkielinen sivu;
- syöterivien lisäys ja poisto;
- näppäimistökäyttö, focus states ja live result -palaute;
- reduced-motion-käyttäytyminen;
- canonical-, lang- ja hreflang-elementit renderöidystä HTML:stä.

### Lopullinen hyväksyntä

Työ on valmis vasta, kun:

- build onnistuu staattisena;
- englannin vanhat URL:t ja slugit ovat ennallaan;
- kaikki 20 saksankielistä opasta avautuvat omilla slugeillaan;
- `/de/artikel/`, `/de/alltagsgeraeusche/` ja `/de/werkzeuge/` toimivat, mutta `/de/`-etusivua ei muodostu;
- saksalaiset laskurit toimivat ja käyttävät oikeita malleja;
- yksikään saksankielinen sivu ei linkitä 404:ään;
- sisälinkkipaikkoja ei ole jäljellä;
- `lang`, canonical, hreflang ja sitemap ovat keskenään yhdenmukaisia;
- yläpalkin rakenne ei muutu uusia localeja lisättäessä;
- englannin sivusto toimii kuten ennen, lukuun ottamatta uuden EU-laskurin ja sen työkalukortin tarkoituksellista lisäystä.

## 13. Rajaukset myöhemmille kielille

Tässä vaiheessa ei:

- lisätä fr/pt/es/it-localeja konfiguraatioon;
- luoda tyhjiä fallback-sivuja;
- konekäännetä puuttuvia sisältöjä;
- oteta käyttöön TMS:ää tai ulkoista i18n-kirjastoa;
- siirrytä SSR:ään;
- lokalisoida koko pitkää markkinointietusivua;
- tehdä saksankielisiä NIOSH-laskurisivuja;
- väitetä EU-laskurin antavan henkilökohtaisen turvallisuustakuun.

Seuraava kieli voidaan toteuttaa samalla rakenteella lisäämällä locale-paketti, content-hakemistot, translationKeyt, lokalisoidut slugit sekä sound- ja työkalutekstit ilman reittiarkkitehtuurin uudelleenrakentamista.
