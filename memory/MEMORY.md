# dBcheck website memory

Päivitetty: 2026-07-14

## Nykyinen rakenne

- Astro 7, staattinen build, julkinen perus-URL `https://dbcheck.app`.
- Yhteinen shell: `src/layouts/Base.astro`.
- Etusivu: `src/pages/index.astro`; alkuperäinen hero-video ja Web Audio -mittari on säilytetty.
- Common sounds -tietojen ainoa lähde: `src/data/sounds.ts`.
- Tools-indeksin ja haun työkalumetadatan ainoa lähde: `src/data/tools.ts`; kaikki viisi työkalua ovat julkaistuja linkkejä ilman status-badgeja.
- Uusien laskurisivujen yhteinen shell ja lomaketyylit: `src/components/CalculatorPage.astro`; numerokenttien yhteinen saavutettava askellussäädin: `src/components/NumberField.astro`; Noise Dose-, Distance- ja Add Decibels -laskentojen asiakaslogiikka: `src/scripts/tool-calculators.ts`.
- Etusivun Free- ja Pro-hintojen alueellisen esitysmuodon lähde: `src/data/prices.ts`; molemmat kortit lokalisoidaan samalla Cloudflare-maatunnistuksella ja staattinen EUR-esitys toimii varavaihtoehtona.
- Uudelleenkäytettävä sound-käyttöliittymä: `src/components/SoundExplorer.astro`.
- Uudelleenkäytettävä NIOSH-laskuri: `src/components/ExposureCalculator.astro`.
- Tavalliset Markdown-artikkelit: `src/content/articles`; common sound -artikkelit: `src/content/sounds`.
- Molemmat sisältökokoelmat käyttävät `src/content.config.ts`:n yhteistä frontmatter-skeemaa ja frontmatterin `slug`-arvoa reittitunnisteena.
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
- `/sounds/` toimii myös Tools-indeksin Common Sounds Explorer -kohteena; erillistä `/tools/common-sounds/`-reittiä ei ole.
- `/articles/` ja julkaistuille Markdown-artikkeleille `/articles/[slug]/`.
- `/search.json` indeksoi sivut, työkalut sekä vain julkaistut article- ja sound-kokoelmat.
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
