# dBcheck-verkkosivuston ohjeet

## Arkkitehtuuri

- Sivusto on Astro 7 -staattinen sivusto. Älä lisää raskasta frontend-kehystä kevyitä vuorovaikutuksia varten.
- `src/layouts/Base.astro` omistaa yhteisen navigaation, haun, footerin, design tokenit ja sivukohtaisista propseista muodostuvat metatiedot.
- `src/data/sounds.ts` on Common Sounds Explorerin ja julkaistujen sound-yhteenvetojen ainoa rakenteisen datan lähde. Etusivu, `/sounds`, sound-sivut ja Explorer käyttävät samaa dataa.
- `src/data/tools.ts` on Tools-indeksin ja haun työkalumetadatan ainoa lähde. Kaikki viisi työkalua ovat julkaistuja linkkejä; laskureiden yhteinen sivurakenne ja lomaketyylit kuuluvat `src/components/CalculatorPage.astro`:lle ja kolmen monikenttälaskurin yhteinen asiakaslogiikka `src/scripts/tool-calculators.ts`:lle.
- Tavalliset artikkelit kuuluvat `src/content/articles`-kokoelmaan ja common sound -artikkelit `src/content/sounds`-kokoelmaan. Molemmat käyttävät `src/content.config.ts`:n yhteistä frontmatter-skeemaa, ja frontmatterin `slug` on reitin tunniste.
- `src/components/EditorialPage.astro` omistaa molempien sisältötyyppien yhteisen artikkelirakenteen, breadcrumbit, related-linkit, CTA:n ja structured datan. Sound-sivujen summary card saa faktansa `src/data/sounds.ts`:stä.
- Draft-artikkelit eivät saa näkyä reiteissä, indekseissä, etusivulla tai haussa.
- `src/pages/search.json.js` kokoaa haun julkaistuista article- ja sound-kokoelmista, kaikista `src/data/tools.ts`-työkaluista sekä muista julkisista sivuista. `@astrojs/sitemap` muodostaa sitemapin vain kanonisista julkisista reiteistä.
- `src/components/SoundExplorer.astro` ja `src/components/ExposureCalculator.astro` ovat uudelleenkäytettäviä, progressiivisesti paranevia komponentteja. Säilytä niiden HTML-perusnäkymä ymmärrettävänä ilman JavaScriptiä.

## Sisältö- ja turvallisuusrajat

- Älä kuvaa dBcheckiä sertifioiduksi Class 1- tai Class 2 -mittariksi.
- Kerro, että puhelinmittaukset riippuvat mikrofonista, prosessoinnista ja kalibroinnista.
- Kuulotesti on käyttäjän omaan baselineen suhteutettua seurantaa, ei kliininen testi tai diagnoosi.
- Sleep Monitor näyttää huomattavien melutapahtumien ajankohdan ja voimakkuuden; se ei tunnista varmasti heräämisen syytä.
- NIOSH-laskuri käyttää työperäistä 85 dBA / 8 h / 3 dB -mallia. Tulosta ei saa kutsua yksilölliseksi turvallisuustakuuksi.
- Decibel Distance Calculator käyttää vain yksinkertaistettua vapaan kentän pistelähdemallia; kerro aina, että heijastukset, esteet, maanpinta, lähteen koko ja suuntaavuus voivat muuttaa todellista tulosta.
- Add Decibels Calculator summaa yhteensopivia riippumattomia tasoja logaritmisesti. Älä esitä sitä koherenttien vaiheeseen sidottujen signaalien tai keskenään eri mittareiden yleisenä summauksena.
- Älä käytä ehdotonta cloud-free-väitettä, koska käyttäjä voi ottaa valinnaisen Health Connect -jaon käyttöön.
- Tyypilliset sound-tasot ovat vaihteluvälejä, joihin etäisyys, ympäristö, lähde ja mittaustapa vaikuttavat.

## Varmistus

- Aja muutosten jälkeen `npm run build`.
- Tarkista desktop- ja mobile-navigaatio, haku, Sound Explorer, laskuri ja hero-videon Listen/Mute-vuorovaikutus oikeassa selaimessa.
- Varmista, että jokaisella julkisella reitillä on oma title, description ja canonical-URL.
