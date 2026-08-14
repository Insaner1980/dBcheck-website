# dBcheck-verkkosivuston ohjeet

## Arkkitehtuuri

- Sivusto on Astro 7 -staattinen sivusto. Älä lisää raskasta frontend-kehystä kevyitä vuorovaikutuksia varten. Ainoa selainpuolen riippuvuus on anime.js (mittariliike); artikkelisivut eivät lataa sitä lainkaan.
- Astro i18n käyttää localeja `en` ja `de`: englanti säilyy ilman etuliitettä ja saksa käyttää `/de/`-reittejä. Etusivua ei lokalisoida eikä `/de/`-etusivua generoida; kaikkien kieliversioiden logo ja Startseite/Home-breadcrumb johtavat englanninkieliselle `/`-etusivulle. `src/i18n/config.ts` omistaa localet, `src/i18n/ui.ts` yhteisen UI-copyn ja `src/i18n/routes.ts` aidot en–de-reittiparit, lokalisoidut reittisegmentit sekä hreflangit. Saksan sisältöreitit ovat `/de/artikel/` ja `/de/alltagsgeraeusche/`; englanninkielisiä segmenttejä ei käytetä lokalisoitujen sivujen URL:eissa. Lokalisoidut sisältö- ja työkalusivut käyttävät samoja komponentteja, rakennetta ja elementtipaikkoja kuin englanninkieliset vastineensa; vain tekstit ja URL:t lokalisoidaan. Lokalisoitujen sivujen yläpalkissa näkyvät vain paikalliset työkalut, artikkelit ja haku eikä näkyvää kielivalitsinta ole. Uusi kieli lisätään näiden tiedostojen suomenkielisen ohjeen mukaan, ei kopioimalla yhteisiä sivupohjia.
- `src/layouts/Base.astro` omistaa yhteisen navigaation, haun, footerin, design tokenit, sivunvaihto-motionin, scroll-reveal-järjestelmän, laskuritulosten yhteisen motion-palautteen sekä sivukohtaisista propseista muodostuvat metatiedot. Kaiken koristeellisen liikkeen pitää kunnioittaa `prefers-reduced-motion`-asetusta.
- Laskurien tulokset päivittyvät suoraan `textContent`-kirjoituksella; Basen `MutationObserver` antaa niille lyhyen `result-updated`-välähdyksen. Älä laita scramblea arvoihin jotka päivittyvät joka näppäinpainalluksella tai liukusäätimen vedosta — se lukee levottomana.
- Mittarimaisen liikkeen ainoa lähde on `src/scripts/motion.ts`: se omistaa scramble-profiilit, `prefers-reduced-motion`-tarkistuksen sekä `scrambleValue`- ja `scrambleReading`-rajapinnat. Scramble kuuluu vain kertaluonteisiin hetkiin: hero-mittarin kalibrointiin, hintojen lokalisointiin ja Sound Explorerin valintaan. `scrambleReading` kirjoittaa lopullisen arvon heti elementtiin ja animoi erillistä aria-hidden-kopiota, jottei aria-live-alue lue välitiloja.
- `src/scripts/scramble-engine.ts` on ainoa anime.js:ää käyttävä osa motion-ketjusta ja ladataan dynaamisesti vasta ensimmäisestä arvonvaihdosta. Käytä nimettyjä tuonteja (`import { animate } from 'animejs'`), älä namespace- tai dynaamista koko paketin tuontia — muuten tree-shaking hajoaa ja bundle kolminkertaistuu.
- `src/lib/display-scale.ts` omistaa 0–130 dB -näyttöasteikon rajat, merkkiviivat ja tasoluokat. Hero-mittari ja altistumiskisko lukevat kynnysarvonsa täältä; älä toista lukuja komponenteissa.
- `src/components/ExposureRail.astro` on etusivun Why-osion koristeellinen, selaukseen sidottu dB-kisko (anime.js `onScroll`). Se on `aria-hidden`, piilotetaan alle 900 px:n näytöillä ja `prefers-reduced-motion`-asetuksella, eikä se saa esittää tietoa jota ei kerrota muualla tekstinä.
- `src/data/sounds.ts` on molempien localejen Common Sounds Explorerin ja julkaistujen sound-yhteenvetojen ainoa rakenteisen datan lähde. Tekniset arvot ja järjestys määritellään kerran; locale-kohtaiset tekstit ja slugit liitetään niihin.
- `src/data/tools.ts` on locale-kohtaisten Tools/Werkzeuge-indeksien ja haun työkalumetadatan ainoa lähde. Englannin ja saksan listat saavat olla eripituisia. Expositionsdauer/Exposure Time -sivupari käyttää yhteistä `src/components/SafeExposureTimePage.astro`-rakennetta ja `src/components/ExposureCalculator.astro`-käyttöliittymää; puhdas NIOSH- ja EU/Saksa-laskenta kuuluu `src/lib/exposure-time.ts`:lle. Muiden laskureiden yhteinen sivurakenne ja lomaketyylit kuuluvat `src/components/CalculatorPage.astro`:lle, numerokenttien yhteinen rakenne `src/components/NumberField.astro`:lle ja monikenttälaskureiden yhteinen asiakaslogiikka `src/scripts/tool-calculators.ts`:lle.
- `src/data/prices.ts` on Free- ja Pro-hintojen alueellisen esitysmuodon ainoa lähde. Etusivun hintakortit käyttävät samaa maatunnistusta ja säilyttävät staattisen EUR-hinnan varavaihtoehtona.
- Tavalliset artikkelit kuuluvat `src/content/articles/{locale}`-hakemistoihin ja common sound -artikkelit `src/content/sounds/{locale}`-hakemistoihin. Yhteinen frontmatter sisältää `locale`, `translationKey`, `clusterKey` ja lokalisoidun `slug`-reittitunnisteen.
- `src/components/EditorialPage.astro` omistaa molempien sisältötyyppien yhteisen artikkelirakenteen, breadcrumbit, related-linkit, CTA:n ja structured datan. Sound-sivujen summary card saa faktansa `src/data/sounds.ts`:stä.
- Draft-artikkelit eivät saa näkyä reiteissä, indekseissä, etusivulla tai haussa.
- `src/i18n/search.ts` kokoaa `/search.json`- ja `/de/search.json`-indeksit vain kyseisen localen julkaistuista sisällöistä, soundeista, työkaluista ja sivuista. `@astrojs/sitemap` saa lokalisoidut slug-parit `src/i18n/routes.ts`:stä.
- `src/lib/daily-noise-exposure.mjs` omistaa englannin ja saksan EU/Saksa-työkalun puhtaan `L_EX,8h`-laskennan. Se ei käsittele C-painotettua peak-arvoa, vähennä kuulonsuojainten vaimennusta tai korvaa pätevää työpaikkamittausta.
- `src/components/SoundExplorer.astro` ja `src/components/ExposureCalculator.astro` ovat uudelleenkäytettäviä, progressiivisesti paranevia komponentteja. Säilytä niiden HTML-perusnäkymä ymmärrettävänä ilman JavaScriptiä.

## Liike ja datan rehellisyys

- **Mittarinäkymässä ei saa esittää keksittyä dataa.** Jos signaalia ei ole, näkymän pitää näyttää aito nollataso — ei koristeltua kohinapohjaa, sykkiviä palkkeja tai esimerkkilukemia. Hero-HUD:n spektri piirtää valmiustilassa kaistat minimikorkeudella juuri tästä syystä. Sama koskee kaikkea uutta: animaatio saa näyttää mittaamisen tavan, ei tekaistua tulosta.
- Ruutusilmukka pyörii vain kun jokin todella muuttuu (mittaus, käynnistyssekvenssi, neulan pysähtyminen). Älä jätä `requestAnimationFrame`-silmukkaa pyörimään valmiustilassa.
- `Base.astro`:n `revealSelectors`-lista on ainoa sisääntuloliikkeen määrittely. Kun sivupohjan luokkanimiä muutetaan, päivitä lista samalla: kuollut valitsin ei riko mitään, mutta puuttuva jättää kokonaisen sivutyypin ilman liikettä. Sama koskee sivunvaihdon otsikkomorffauksen korttivalitsinta samassa tiedostossa.
- **`transition` on yksi ominaisuus, ei lisäys.** Jos revealoituvalle elementille määritellään oma `transition`, siihen on sisällytettävä myös `opacity` ja `translate` — muuten reveal-siirtymä katoaa ja elementti ilmestyy nytkähtäen. Korttien hover-nosto käyttää siksi `transform`ia, ei `translate`a, ja niiden yhteinen siirtymämäärittely on `Base.astro`:ssa.
- Artikkelisivujen lukemisen edistymisviiva tulee `Base.astro`:n `readingProgress`-propista ja käyttää CSS:n scroll-aikajanaa (`animation-timeline: scroll(root block)`, ei JavaScriptiä). Ilman selaintukea viiva jää näkymättömiin. Se on suora lukema vierityskohdasta, joten se säilyy myös `prefers-reduced-motion`-asetuksella.
- Asteikon numerot sijoitetaan todellisille kohdilleen `src/lib/display-scale.ts`:n prosenttiosuuksien mukaan, ei tasavälein. Sound Explorerin `.scale-track` elää `.sound-markers`-koordinaatistossa, jotta numerot, merkkipisteet ja vaihteluvälipalkki osuvat samoille kohdille myös vaakavieritettäessä.
- Sound Explorerin vaihteluvälipalkki näyttää valitun äänen typical-min–max-alueen asteikolla. Se on tiedollinen elementti, ei koriste: jos dataa muutetaan, palkin pitää seurata.

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
