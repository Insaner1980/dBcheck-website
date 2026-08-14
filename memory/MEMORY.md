# dBcheck website memory

Päivitetty: 2026-08-14

## Nykyinen rakenne

- Astro 7, staattinen build, julkinen perus-URL `https://dbcheck.app`.
- Natiivi Astro i18n: englanti oletuslocalena ilman etuliitettä, saksa `/de/`-etuliitteellä. Locale/UI/reittirekisteri ovat `src/i18n/config.ts`, `src/i18n/ui.ts` ja `src/i18n/routes.ts`.
- Yhteinen shell: `src/layouts/Base.astro`; se omistaa myös natiivin MPA-sivunvaihdon, haun motionin, scroll-revealin ja laskuritulosten `result-updated`-välähdyksen. Koristeellinen liike poistuu `prefers-reduced-motion`-asetuksella.
- Selainpuolen ainoa riippuvuus: anime.js 4.5 (MIT). Mittariliikkeen rajapinta on `src/scripts/motion.ts` (scramble-profiilit, `scrambleValue`, `scrambleReading`); anime.js:ää käyttää vain `src/scripts/scramble-engine.ts`, joka ladataan dynaamisesti ensimmäisestä arvonvaihdosta. Artikkeli- ja työkalusivut eivät lataa anime.js:ää lainkaan.
- Näyttöasteikon (0–130 dB) rajat, merkkiviivat ja tasoluokat: `src/lib/display-scale.ts`.
- Etusivu: `src/pages/index.astro`; alkuperäinen hero-video ja Web Audio -mittari on säilytetty. Hero-mittarin neulan omistaa yksi anime.js-`createAnimatable`, ja käynnistyssekvenssi on `createTimeline`-aikajana (kalibrointiviiva, täysi asteikkopyyhkäisy, lukeman scramble).
- Etusivun Why-osion koristeellinen selaukseen sidottu dB-kisko: `src/components/ExposureRail.astro` (anime.js `onScroll`, aria-hidden, piilossa alle 900 px ja reduced motion).
- Etusivun CTA:ssa aaltomuoto piirtyy kerran ja tasoittuu keskiviivaksi (anime.js `svg.createDrawable` + scaleY, IntersectionObserver, painikkeiden alapuolella).
- Sound Explorerin asteikko: numerot ovat todellisilla kohdillaan ja `.scale-track` on `.sound-markers`-elementin sisällä, joten numerot, merkkipisteet ja vaihteluvälipalkki jakavat saman koordinaatiston. Valitun äänen typical-min–max näkyy asteikolla liukuvana palkkina (pelkkä CSS-siirtymä, ei anime.js:ää).
- Common sounds -tietojen ainoa lähde: `src/data/sounds.ts`.
- Tools-indeksin ja haun työkalumetadatan ainoa lähde: `src/data/tools.ts`; kaikki viisi työkalua ovat julkaistuja linkkejä ilman status-badgeja.
- Uusien laskurisivujen yhteinen shell ja lomaketyylit: `src/components/CalculatorPage.astro`; numerokenttien yhteinen saavutettava askellussäädin: `src/components/NumberField.astro`; Noise Dose-, Distance- ja Add Decibels -laskentojen asiakaslogiikka: `src/scripts/tool-calculators.ts`.
- Etusivun Free- ja Pro-hintojen alueellisen esitysmuodon lähde: `src/data/prices.ts`; molemmat kortit lokalisoidaan samalla Cloudflare-maatunnistuksella ja staattinen EUR-esitys toimii varavaihtoehtona.
- Uudelleenkäytettävä sound-käyttöliittymä: `src/components/SoundExplorer.astro`.
- Uudelleenkäytettävä NIOSH-laskuri: `src/components/ExposureCalculator.astro`.
- Tavalliset Markdown-artikkelit: `src/content/articles/{en,de}`; common sound -artikkelit: `src/content/sounds/{en,de}`. Molemmissa on 20 täydellistä `translationKey`-paria yhteensä.
- Frontmatterin `locale`, `translationKey`, `clusterKey` ja lokalisoitu `slug` muodostavat sisältö- ja reittisopimuksen.
- Yhteinen artikkelirenderöinti: `src/components/EditorialPage.astro`; se omistaa breadcrumbit, typografian, related-linkit, CTA:n sekä Article- ja BreadcrumbList-structured datan.
- Sound-yhteenvetojen ja Explorerin rakenteisen datan lähde: `src/data/sounds.ts`.
- Draftit suodatetaan reiteistä, indekseistä, etusivulta ja hausta.

## Reitit

- `/sounds/` ja julkaistuille Markdown-sound-artikkeleille `/sounds/[slug]/`.
- `/tools/`.
- `/tools/safe-listening-time-calculator/`.
- `/tools/noise-dose-calculator/`.
- `/tools/decibel-distance/`.
- `/tools/add-decibels/`.
- `/tools/daily-noise-exposure-level-calculator/` käyttää EU:n kahdeksaan tuntiin normalisoitua `L_EX,8h`-mallia.
- `/sounds/` toimii myös Tools-indeksin Common Sounds Explorer -kohteena; erillistä `/tools/common-sounds/`-reittiä ei ole.
- `/articles/` ja julkaistuille Markdown-artikkeleille `/articles/[slug]/`.
- `/search.json` indeksoi sivut, työkalut sekä vain julkaistut article- ja sound-kokoelmat.
- Saksankieliset pääreitit ovat `/de/artikel/`, `/de/alltagsgeraeusche/` ja `/de/werkzeuge/`; `/de/`-etusivua ei ole. Saksan työkalut ovat Expositionsdauer-Rechner, Lärmexpositionsrechner, etäisyyslaskuri ja Dezibel addieren sekä Alltagsgeräusche Explorer. `/de/search.json` sisältää vain saksankielisiä kohteita.
- `src/i18n/routes.ts` omistaa aidot en–de-vastineet. Base käyttää niitä canonical-, hreflang- ja `x-default`-linkeissä ja sitemap käyttää samoja pareja. Etusivua ei lokalisoida eikä `/de/`-etusivua ole; lokalisoitujen sivujen logo ja Startseite-breadcrumb johtavat englanninkieliselle `/`-etusivulle. Lokalisoidut sisältö- ja työkalusivut säilyttävät englanninkielisten vastineidensa komponentit, rakenteen ja elementtipaikat. Yläpalkissa ovat vain paikalliset työkalut, artikkelit ja haku eikä näkyvää kielivalitsinta ole.
- `@astrojs/sitemap` muodostaa sitemapin kanonisista julkisista reiteistä; legacy-sound-slugit ohjataan uusiin kanonisiin slugeihin tai `/sounds/`-indeksiin.

## Tuotefaktat

- Android-sovellus ei ole sertifioitu Class 1- tai Class 2 -mittari.
- `0–130 dB` kuvataan näyttöasteikkona, ei kaikilla laitteilla todennettuna mittausalueena.
- Audioanalyysi on laitteessa ja tiliä ei tarvita; valinnainen Health Connect voi jakaa tuettua sessiodataa käyttäjän luvalla.
- Hearing Test ja recovery check ovat henkilökohtaista suhteellista baseline-seurantaa, eivät kliinistä diagnostiikkaa.
- Sleep Monitor näyttää huomattavat melutapahtumat ja niiden voimakkuuden, ei varmaa heräämisen syytä.
- Web-laskuri käyttää NIOSH REL -mallia 85 dBA / 8 h / 3 dB ja esittää tuloksen työperäisenä koulutuksellisena arviona.
- Tools-indeksi linkittää Safe Exposure Time-, Noise Dose-, Decibel Distance- ja Add Decibels -laskureihin sekä `/sounds/`-reitillä toimivaan Common Sounds Exploreriin. Erillistä Concert-laskuria ei ole.
- Noise Dose Calculator yhdistää useita vakioidun tason ja keston jaksoja NIOSH 85 dBA / 8 h / 3 dB -viiteannokseen.
- Decibel Distance Calculator käyttää vapaan kentän pistelähteen `−20 log10(r2/r1)`-mallia ja kertoo näkyvästi sen reaalimaailman rajoista.
- Add Decibels Calculator käyttää riippumattomille yhteensopiville tasoille kaavaa `10 log10(Σ10^(Li/10))` ja rajaa koherentit signaalit mallin ulkopuolelle.
- Daily Noise Exposure Level Calculator käyttää kaavaa `10 log10(Σ[(Ti/8 h) × 10^(LAeq,i/10)])`, luokittelee 80/85 dB(A) Auslösewerte -tasot ja kertoo 87 dB(A):n EU-raja-arvon erillisestä kuulonsuojainkäsittelystä.

## Varmistettu 2026-08-14

- anime.js 4.5.0 lisätty ainoana selainpuolen riippuvuutena kolmea liikettä varten: numeroiden scramble, selaukseen sidottu dB-kisko ja hero-mittarin aikajana + jousineula.
- Scramble kokeiltiin myös laskurien tuloksiin ja **peruttiin käyttäjän palautteesta**: joka näppäinpainalluksella laukeava merkkiarvonta näytti levottomalta ja arpoi myös yksikön ("98.4%" → "6080 96"). Laskurit palasivat suoraan `textContent`-kirjoitukseen ja Basen `result-updated`-välähdykseen. Scramble jäi vain kertaluonteisiin hetkiin: hero-kalibrointi, hintojen lokalisointi, Sound Explorerin valinta.
- Poistettu tarpeettomana: hero-HUD:n `is-booting`-CSS-keyframet ja `setTimeout`-pohjainen boot, hero-skriptin oma `levelFor` ja käsin viritetty vaimennus sekä kaksi erillistä rAF-silmukkaa (yhdistetty yhdeksi).
- Bundlekoot gzipattuna: jaettu anime-ydin 13 kt, etusivu yhteensä n. 25 kt, työkalu- ja artikkelisivut 0 kt anime.js:ää. Namespace-tuonti `import('animejs')` nostaisi ytimen 40 kt:een — käytä nimettyjä tuonteja.
- Selaintarkistus 1440 px ja 820 px: hero-käynnistyssekvenssi, Listen/Mute-mittaus jousineulalla, kiskon 0–130 dB -pyyhkäisy tasoväreineen, laskurin scramble myös nopeassa kirjoituksessa. Ei konsolivirheitä (paitsi odotettu `/cdn-cgi/trace` 404 preview-palvelimella). `npm run check` 0 virhettä, `npm run build` 56 sivua.
- Prettier alustaa koko tiedoston, eikä repoa ole formatoitu sillä. Älä aja `prettier --write` olemassa oleviin tiedostoihin — diff paisuu tuhansiin riveihin.
- Toinen kierros samana päivänä: hero-HUD:n synteettinen idle-spektri poistettiin (se näytti mittausdatalta mittaamatta mitään) ja korvattiin aidolla nollatasolla; ruutusilmukka pysähtyy nyt kun neula on levossa. Sound Exploreriin lisättiin valitun äänen vaihteluvälipalkki, ja samalla korjattiin asteikon numeroiden sijainti: ne oli ladottu tasavälein (`justify-content: space-between`) vaikka 0/40/70/85/100/130 eivät ole tasavälisiä, joten numerot eivät osuneet merkkipisteiden kanssa samoille kohdille. CTA:han tuli kerran piirtyvä ja tasoittuva aaltomuoto, Pro-kuviin clip-path-pyyhkäisy.
- **Sisältösivujen liike korjattu.** `revealSelectors`-listassa oli kuusi valitsinta (`.article-card`, `.article-list li`, `.feature-row`, `.feature-group-head`, `.strip-inner`, `.stat-tile`) joita ei ole missään sivupohjassa, ja artikkelisivut jäivät kokonaan ilman sisääntuloa. Buildista mitattuna `/articles/[slug]/` sai 0 reveal-kohdetta ja `/articles/` vain `.page-head`. Lista päivitettiin todellisiin luokkiin (`.editorial-head`, `.sound-summary`, `.related`, `.article-cta`, `.article-group > header`, `.article-group li`, `.free-feature-item`, `.feature-tier-head`, `.pro-feature-showcase`). Samalla korjattiin sivunvaihdon otsikkomorffaus: se etsi `.article-card`-luokkaa jota ei ole, joten se toimi vain työkalukorteista — nyt `.article-group li, .tool-card` ja otsikkohaku `h2, h3, strong`.
- Artikkelisivuille lisättiin lukemisen edistymisviiva (`Base.astro`:n `readingProgress`-propsi, CSS scroll-aikajana, 0 kt JS). Huom: `animation`-lyhenne nollaa keston, joten scroll-aikajanalla on käytettävä `animation-duration: auto` erikseen — muuten palkki ei liiku lainkaan.
- Etusivun `<details>`-avautuminen animoituu `::details-content` + `interpolate-size: allow-keywords` -yhdistelmällä. Ilman selaintukea koko sääntö hylätään ja avautuminen on entinen välitön.
- **Korjattu CSS-bugi:** `.why-card, .article-card, .plan, .stat-tile` määritteli `transition`-ominaisuuden uudelleen hover-nostoa varten, mikä pyyhki revealin opacity-siirtymän kokonaan. Nuo kortit ilmestyivät siis nytkähtäen (opacity 0→1 ilman siirtymää) ja liukuivat 26 px 250 ms:ssä 700 ms:n sijaan. Nyt kaikki siirtymät ovat yhdessä määrittelyssä ja hover käyttää `transform`ia jottei se kilpaile revealin `translate`n kanssa. **Jos lisäät `transition`-määrittelyn revealoituvalle elementille, sisällytä siihen myös opacity ja translate** — muuten reveal katoaa. Hintakortti paljastuu lisäksi paikallaan (ei 26 px siirtymää, se lukisi 14" näytöllä nytkähdyksenä) ja sen sisältö kokoontuu porrastettuna.
- `/cdn-cgi/trace` palauttaa 404 paikallisessa previewissä, joten hintojen lokalisointi ja niiden scramble eivät koskaan aja localhostissa — ne näkyvät vasta Cloudflaressa. Älä etsi sitä animaatiota preview-palvelimelta.
- Pro-välilehtien vaihto uusittiin: paneelit ovat päällekkäin samassa gridi-solussa, joten aiempi 160 ms:n ristihäivytys teki vaihdosta töksähtävän ja peitti clip-path-pyyhkäisyn (pyyhkäisyn paljastamaton alue näytti edellisen paneelin kuvaa). Nyt vaihto on välitön näkyvyyden vaihto, ja liike tulee sekvenssistä: kuva pyyhkäistään 620 ms:ssä mittausviivan kanssa, otsikko ja lista tulevat porrastettuna, kuvateksti viimeisenä 240 ms:n viiveellä. **Älä palauta paneelien ristihäivytystä** — päällekkäisillä paneeleilla se sotkee kaiken muun liikkeen.
- Varmistettu selaimessa 1440/820/600 px sekä `/de/alltagsgeraeusche/`: `.scale-track` ja `.sound-markers` ovat pikselilleen kohdakkain kaikissa leveyksissä, palkki seuraa valintaa (myös 120–150 dB rajautuu oikein 130:een), CTA-aalto laukeaa kerran painikkeiden alapuolella eikä leikkaa tekstiä.

## Varmistettu 2026-07-15

- Saksa-vaiheen i18n-arkkitehtuuri toteutettu: 15+15 tavallista artikkelia, 5+5 sound-artikkelia, locale-kohtaiset indeksit, haku, navigaatio, footer, Sound Explorer ja neljä saksankielistä laskuria. Expositionsdauer-Rechner käyttää BAuA:n L_EX,8h-kaavaa 85 dB(A):n ylempään Auslösewert-arvoon; se jakaa sivurakenteen englannin NIOSH-laskurin kanssa mutta ei esitä tulosta turvallisena aikana.
- Englannin vanhat sisältö- ja työkalureitit säilyvät; uusi englanninkielinen EU-laskuri muodostaa aidon hreflang-parin saksan Lärmexpositionsrechnerille.
- Verkkosivun Pro-hinnan EUR-varavaihtoehto on 12,99 euroa; tuetuille maille näytetään `src/data/prices.ts`:n alueellinen Google Play -hinta.

## Varmistettu 2026-07-14

- Free- ja Pro-kortit käyttävät samaa alueellista valuuttamuotoa: FI `0 €` / `12,99 €`, US `$0` / `$14.99`. Molempien korttien hintatypografia säilyy yhtenäisenä lokalisoinnin jälkeen.
- Noise Dose-, Decibel Distance- ja Add Decibels -laskureiden numerokentät käyttävät yhteistä `NumberField.astro`-askellussäädintä. Säädin noudattaa search-scrollin tummaa, kapeaa ulkoasua, käyttää kentän omaa `step`-arvoa ja säilyttää natiivin säätimen ilman JavaScriptiä.
- Desktop 1440 px ja mobile 390 px: askellus, dynaamisesti lisättyjen rivien säätimet ja laskentatulosten päivitys toimivat ilman vaakasuuntaista ylivuotoa. `npm run build` onnistui, 28 staattista sivua.

## Varmistettu 2026-07-13

- Tools-indeksi käyttää viiden toimivan linkkikortin yhteistä `src/data/tools.ts`-metadataa ilman Planned- tai Available now -badgeja.
- Concert Noise Exposure Calculator poistettiin erillisenä työkaluna; `/sounds/concert/` ja yhteinen sound-data säilyivät.
- Noise Dose-, Decibel Distance- ja Add Decibels -laskurit julkaistiin omille reiteilleen. Haku ja sitemap sisältävät kaikki kolme uutta reittiä.
- `npm run build`: onnistui, 28 staattista sivua. Desktop 1440 px ja mobile 390 px: Tools-ruudukko, navigaatio ja kaikkien kolmen uuden laskurin lomakkeet, live-tulokset sekä dynaamisten rivien lisäys ja poisto toimivat ilman selainkonsolin virheitä.
- Varmistetut laskentaesimerkit: Noise Dose 4 h @ 85 dBA + 2 h @ 88 dBA = 100%; Distance 90 dB etäisyyksillä 1 -> 2 = 84.0 dB ja 1 -> 4 = 78.0 dB; Add Decibels 80 + 80 = 83.0 dB ja kolme 90 dB tasoa = 94.8 dB.

## Varmistettu 2026-07-12

- Integroitu 15 tavallista artikkelia ja 5 common sound -artikkelia.
- `npm run build`: onnistui, 25 kanonista julkista sivua ja 8 redirectiä.
- Sitemapissa 25 kanonista URL:ia; haussa 33 kohdetta.
- Kaikilla 20 sisältösivulla yksi H1, yksilöllinen title ja description, canonical, Open Graph, breadcrumbit sekä validi Article/BreadcrumbList-JSON-LD.
- Kaikki generoidut sisäiset reitti- ja asset-linkit ratkesivat; lähde-URL-tarkistuksessa 46 onnistui, 5 estyi julkaisijan 403-suojaukseen ja 0 palautti 404:n.
- Desktop 1440 px ja mobile 390 px: navigaatio, haku, Sound Explorer, artikkelitaulukot ja KaTeX, laskuri sekä hero Listen/Mute toimivat ilman konsolivirheitä.
- Yhteinen sisältöauditointi: `dbcheck-article-audit.md`; baseline 0 Critical, 9 Important ja 5 Minor.
- Hyväksytyt audit-korjaukset on toteutettu: NIOSH exposure-time -sivun intentio ja title rajattu, pitkät descriptionit lyhennetty, `researchSources` yhtenäistetty, medical copy rajattu NIDCD:n tukeen, sound-sivuille lisätty kontekstuaaliset inbound-linkit ja CTA:t eriytetty sisältöklustereittain.
- Auditista ei jäänyt avointa Critical- tai Important-sivustovirhettä. Neljä erillistä sisältöaihetta on dokumentoitu backlogiin raportissa; viisi 403-suojattua lähde-URL:ia odottaa vain valinnaista manuaalitarkistusta.

## Aiemmin varmistettu 2026-07-11

- `npm run build`: onnistui, 13 staattista sivua.
- Desktop 1440 px ja mobile 390 px selaintarkistus.
- Hero Listen/Mute, Sound Explorer, haku ja NIOSH-laskuri toimivat.
- 85 dBA -> 8 tuntia ja 100 dBA -> 15 minuuttia.
- Generoiduissa sivuissa ei ollut selainkonsolin virheitä tai varoituksia.
- Kaikki generoidut sisäiset reittilinkit ratkesivat olemassa oleviin kohteisiin.
