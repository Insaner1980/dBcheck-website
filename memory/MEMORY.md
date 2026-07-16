# dBcheck website memory

Päivitetty: 2026-07-15

## Nykyinen rakenne

- Astro 7, staattinen build, julkinen perus-URL `https://dbcheck.app`.
- Natiivi Astro i18n: englanti oletuslocalena ilman etuliitettä, saksa `/de/`-etuliitteellä. Locale/UI/reittirekisteri ovat `src/i18n/config.ts`, `src/i18n/ui.ts` ja `src/i18n/routes.ts`.
- Yhteinen shell: `src/layouts/Base.astro`; se omistaa myös natiivin MPA-sivunvaihdon, haun motionin ja laskuritulosten yhteisen päivitysanimaation. Koristeellinen liike poistuu `prefers-reduced-motion`-asetuksella.
- Etusivu: `src/pages/index.astro`; alkuperäinen hero-video ja Web Audio -mittari on säilytetty.
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
