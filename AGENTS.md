# dBcheck-verkkosivuston ohjeet

## Arkkitehtuuri

- Sivusto on Astro 7 -staattinen sivusto. Älä lisää raskasta frontend-kehystä kevyitä vuorovaikutuksia varten.
- Astro i18n käyttää localeja `en` ja `de`: englanti säilyy ilman etuliitettä ja saksa käyttää `/de/`-reittejä. Etusivua ei lokalisoida eikä `/de/`-etusivua generoida; kaikkien kieliversioiden logo ja Startseite/Home-breadcrumb johtavat englanninkieliselle `/`-etusivulle. `src/i18n/config.ts` omistaa localet, `src/i18n/ui.ts` yhteisen UI-copyn ja `src/i18n/routes.ts` aidot en–de-reittiparit, lokalisoidut reittisegmentit sekä hreflangit. Saksan sisältöreitit ovat `/de/artikel/` ja `/de/alltagsgeraeusche/`; englanninkielisiä segmenttejä ei käytetä lokalisoitujen sivujen URL:eissa. Lokalisoidut sisältö- ja työkalusivut käyttävät samoja komponentteja, rakennetta ja elementtipaikkoja kuin englanninkieliset vastineensa; vain tekstit ja URL:t lokalisoidaan. Lokalisoitujen sivujen yläpalkissa näkyvät vain paikalliset työkalut, artikkelit ja haku eikä näkyvää kielivalitsinta ole. Uusi kieli lisätään näiden tiedostojen suomenkielisen ohjeen mukaan, ei kopioimalla yhteisiä sivupohjia.
- `src/layouts/Base.astro` omistaa yhteisen navigaation, haun, footerin, design tokenit, sivunvaihto-motionin, laskuritulosten yhteisen motion-palautteen sekä sivukohtaisista propseista muodostuvat metatiedot. Kaiken koristeellisen liikkeen pitää kunnioittaa `prefers-reduced-motion`-asetusta.
- `src/data/sounds.ts` on molempien localejen Common Sounds Explorerin ja julkaistujen sound-yhteenvetojen ainoa rakenteisen datan lähde. Tekniset arvot ja järjestys määritellään kerran; locale-kohtaiset tekstit ja slugit liitetään niihin.
- `src/data/tools.ts` on locale-kohtaisten Tools/Werkzeuge-indeksien ja haun työkalumetadatan ainoa lähde. Englannin ja saksan listat saavat olla eripituisia. Expositionsdauer/Exposure Time -sivupari käyttää yhteistä `src/components/SafeExposureTimePage.astro`-rakennetta ja `src/components/ExposureCalculator.astro`-käyttöliittymää; puhdas NIOSH- ja EU/Saksa-laskenta kuuluu `src/lib/exposure-time.ts`:lle. Muiden laskureiden yhteinen sivurakenne ja lomaketyylit kuuluvat `src/components/CalculatorPage.astro`:lle, numerokenttien yhteinen rakenne `src/components/NumberField.astro`:lle ja monikenttälaskureiden yhteinen asiakaslogiikka `src/scripts/tool-calculators.ts`:lle.
- `src/data/prices.ts` on Free- ja Pro-hintojen alueellisen esitysmuodon ainoa lähde. Etusivun hintakortit käyttävät samaa maatunnistusta ja säilyttävät staattisen EUR-hinnan varavaihtoehtona.
- Tavalliset artikkelit kuuluvat `src/content/articles/{locale}`-hakemistoihin ja common sound -artikkelit `src/content/sounds/{locale}`-hakemistoihin. Yhteinen frontmatter sisältää `locale`, `translationKey`, `clusterKey` ja lokalisoidun `slug`-reittitunnisteen.
- `src/components/EditorialPage.astro` omistaa molempien sisältötyyppien yhteisen artikkelirakenteen, breadcrumbit, related-linkit, CTA:n ja structured datan. Sound-sivujen summary card saa faktansa `src/data/sounds.ts`:stä.
- Draft-artikkelit eivät saa näkyä reiteissä, indekseissä, etusivulla tai haussa.
- `src/i18n/search.ts` kokoaa `/search.json`- ja `/de/search.json`-indeksit vain kyseisen localen julkaistuista sisällöistä, soundeista, työkaluista ja sivuista. `@astrojs/sitemap` saa lokalisoidut slug-parit `src/i18n/routes.ts`:stä.
- `src/lib/daily-noise-exposure.mjs` omistaa englannin ja saksan EU/Saksa-työkalun puhtaan `L_EX,8h`-laskennan. Se ei käsittele C-painotettua peak-arvoa, vähennä kuulonsuojainten vaimennusta tai korvaa pätevää työpaikkamittausta.
- `src/components/SoundExplorer.astro` ja `src/components/ExposureCalculator.astro` ovat uudelleenkäytettäviä, progressiivisesti paranevia komponentteja. Säilytä niiden HTML-perusnäkymä ymmärrettävänä ilman JavaScriptiä.

## Sisältö- ja turvallisuusrajat

- Älä kuvaa dBcheckiä sertifioiduksi Class 1- tai Class 2 -mittariksi.
- Kerro, että puhelinmittaukset riippuvat mikrofonista, prosessoinnista ja kalibroinnista.
- Kuulotesti on käyttäjän omaan baselineen suhteutettua seurantaa, ei kliininen testi tai diagnoosi.
- Sleep Monitor näyttää huomattavien melutapahtumien ajankohdan ja voimakkuuden; se ei tunnista varmasti heräämisen syytä.
- NIOSH-laskuri käyttää työperäistä 85 dBA / 8 h / 3 dB -mallia. Tulosta ei saa kutsua yksilölliseksi turvallisuustakuuksi.
- Saksan Expositionsdauer-Rechner käyttää BAuA:n `L_EX,8h = L_Aeq,T + 10 lg(T / 8 h)` -mallia ja laskee ajan 85 dB(A):n ylempään Auslösewert-arvoon. Tulosta ei saa kutsua turvalliseksi ajaksi, sallituksi enimmäisajaksi tai viranomaismittaukseksi; 80 dB(A):n alempi Auslösewert on kerrottava.
- Decibel Distance Calculator käyttää vain yksinkertaistettua vapaan kentän pistelähdemallia; kerro aina, että heijastukset, esteet, maanpinta, lähteen koko ja suuntaavuus voivat muuttaa todellista tulosta.
- Add Decibels Calculator summaa yhteensopivia riippumattomia tasoja logaritmisesti. Älä esitä sitä koherenttien vaiheeseen sidottujen signaalien tai keskenään eri mittareiden yleisenä summauksena.
- Älä käytä ehdotonta cloud-free-väitettä, koska käyttäjä voi ottaa valinnaisen Health Connect -jaon käyttöön.
- Tyypilliset sound-tasot ovat vaihteluvälejä, joihin etäisyys, ympäristö, lähde ja mittaustapa vaikuttavat.

## Varmistus

- Aja muutosten jälkeen `npm run build`.
- Tarkista desktop- ja mobile-navigaatio, haku, Sound Explorer, laskuri ja hero-videon Listen/Mute-vuorovaikutus oikeassa selaimessa.
- Varmista, että jokaisella julkisella reitillä on oma title, description ja canonical-URL.
