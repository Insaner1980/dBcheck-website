# dBcheck-verkkosivuston jäljellä olevat omistaja- ja lakitiedot

Päiväys: 2026-08-21

Tämä asiakirja on tekninen inventaario, ei oikeudellinen arvio tai oikeudellinen neuvonta. Siihen ei ole arvattu omistaja-, rekisteri-, sopimus- tai käsittelytietoja.

## 1. GA4-poiston jälkeen jäljelle jäävä verkkosivuston toiminta

- Cloudflare toimittaa sivuston ja soveltaa tavallisia jakelu- ja suojaustoimintoja. Repositorion perusteella ei voida vahvistaa Cloudflare-tilin sopimus-, lokitus-, säilytys- tai siirtotietoja.
- Alueellisten hintojen selainkoodi pyytää saman originin `/cdn-cgi/trace`-resurssia ja käyttää vastauksen maatunnusta hinnan esitysmuodon valintaan. Sivuston koodi ei tallenna maatunnusta selaimen tallennustiloihin.
- Google Fonts ladataan ulkoisesti osoitteista `fonts.googleapis.com` ja `fonts.gstatic.com`.
- Sivustohaku lataa saman originin `/search.json`- tai `/de/search.json`-indeksin ja käsittelee hakusanan selaimessa.
- Laskurit toimivat selaimessa. Niiden lomakkeilla ei ole palvelimelle lähettävää `action`-osoitetta.
- `mailto:contact@finnvek.com` avaa käyttäjän oman sähköpostiohjelman. Käyttäjän mahdollisesti lähettämän viestin käsittely ei tapahdu sivuston lomakkeella.
- Ulkoiset lähde- ja Finnvek-linkit latautuvat vasta käyttäjän siirtyessä niihin.
- Etusivun Web Audio -koodi käsittelee käyttäjän käynnistämän, saman originin hero-videon ääntä mittarinäytöstä varten. Verkkosivusto ei pyydä mikrofonilupaa eikä käytä `getUserMedia`-rajapintaa.
- GA4-vapaassa paikallisessa tuotantoversiossa ei havaittu sivuston asettamia evästeitä, local storage- tai session storage -arvoja, analytiikan suostumustilaa eikä muuta selaintunnistetta.
- Sivustolla ei ole vierailijan henkilötietoja palvelimelle lähettävää yhteydenotto-, rekisteröitymis- tai muuta lomaketta.

Julkinen `https://dbcheck.app/` palveli 2026-08-21 tarkastushetkellä vielä vanhaa versiota, joka latasi GA4:n ja asetti `_ga`-evästeet. Siksi GA4 on nykyisen julkisen version tosiasiallista käsittelyä siihen asti, kunnes erikseen valtuutettu julkaisu korvaa sen tarkastetulla GA4-vapaalla artefaktilla. Tässä työssä ei julkaistu muutoksia.

## 2. Jäljellä olevat kolmannen osapuolen pyynnöt

Paikallisessa GA4-vapaassa tuotantoesikatselussa havaittiin vain nämä ulkoiset runtime-pyynnöt:

- `https://fonts.googleapis.com/...` — Google Fonts -tyylitiedosto
- `https://fonts.gstatic.com/...` — Instrument Sans- ja IBM Plex Mono -fonttitiedostot

Cloudflare on julkisen sivuston toimituspalvelu, vaikka selaimen sivupyyntö kohdistuu dBcheckin omaan originiin. Julkisen vastauksen NEL-otsake ilmoitti Cloudflaren raportointiosoitteen `a.nel.cloudflare.com`, mutta tarkastetussa selausajossa siihen ei havaittu pyyntöä.

Nykyinen julkinen versio teki lisäksi pyynnöt `www.googletagmanager.com`- ja `region1.google-analytics.com`-osoitteisiin. Ne eivät olleet mukana paikallisessa lähteessä tai tuotantobuildissa, vaan osoittavat, että julkinen julkaisu on jäljessä paikallisesta GA4-poistosta.

## 3. Löydetyt operaattori- ja yhteystiedot

- Tuotteen nimi `dBcheck`: `src/layouts/Base.astro` ja sivuston julkinen sisältö.
- Footerissa näkyvä nimi ja linkki `Finnvek` / `https://finnvek.com`: `src/layouts/Base.astro`.
- Yhteyssähköposti `contact@finnvek.com`: `src/layouts/Base.astro`.
- Tekijänoikeusrivi `© [vuosi] dBcheck` ja Finnvek-linkki: `src/layouts/Base.astro`.
- Aiempi omistajan toimittama inventaario `docs/owner-input/dbcheck-website-privacy-information-needed.md` sanoo, että Finnvek on brändi eikä erillinen oikeushenkilö. Sama tiedosto ei anna julkaistavaksi hyväksyttyä rekisteröidyn omistajan tai rekisterinpitäjän nimeä eikä täydellistä osoitetta.

## 4. Täsmälliset omistajatiedot, jotka vielä puuttuvat

| Puuttuva vahvistus | Mihin mahdolliseen sivuun tai ilmoitukseen se vaikuttaa |
| --- | --- |
| Julkaistavaksi hyväksytty sivuston operaattorin ja mahdollisen rekisterinpitäjän virallinen nimi | Provider information / Impressum / privacy disclosure |
| Julkaistavaksi hyväksytty maantieteellinen tai muu sovellettavan lain vaatima tiedoksianto-osoite | Provider information / Impressum |
| Oikeushenkilömuoto vain, jos sellainen todella on olemassa ja tieto kuuluu julkaista | Provider information / Impressum |
| Rekisteri-, yritys-, VAT- tai vastaava tunniste vain, jos sellainen todella on olemassa ja tieto kuuluu julkaista | Provider information / Impressum |
| Cloudflare-tilin tosiasialliset käytössä olevat lokitus-, turvallisuus- ja jakelutoiminnot sekä niiden säilytysasetukset | Privacy disclosure |
| Omistajan tai lakiasiantuntijan hyväksymät tarkoitukset, oikeusperusteet, säilytysajat, käsittelijä- ja siirtotiedot sekä rekisteröidyn oikeuksia koskevat tiedot | Privacy disclosure |
| Omistajan tai lakiasiantuntijan vahvistama sovellettava lainkäyttöalue ja mahdollinen valvontaviranomainen | Privacy disclosure / provider information |
| Yhteyssähköpostiin saapuvien viestien omistaja, käsittelytarkoitus ja säilytyskäytäntö | Contact/privacy disclosure |

## 5. Tietojen vaikutus mahdollisiin sivuihin

- Provider information- tai Impressum-sivu edellyttää ainakin hyväksyttyä operaattorin identiteettiä ja sovellettavan lain vaatimia osoite- ja rekisteritietoja.
- Privacy disclosure edellyttää vahvistettuja Cloudflare-, Google Fonts- ja yhteyssähköpostin käsittelytietoja sekä omistajan tai lakiasiantuntijan hyväksymää oikeudellista kuvausta.
- GA4:ää koskevat tiedot voidaan jättää pois vasta, kun julkinen versio on todistetusti GA4-vapaa. Nykyinen live-havainto ei vielä mahdollista tätä johtopäätöstä.

## 6. Omistajan tai lakiasiantuntijan ratkaistavat kysymykset

1. Kuka tai mikä taho on sivuston julkaistavaksi nimettävä operaattori ja mahdollinen rekisterinpitäjä?
2. Mitkä osoite-, rekisteri- tai verotunnistetiedot sovellettava laki edellyttää julkaistavaksi, jos niitä on olemassa?
3. Mitkä Cloudflare-toiminnot ovat tuotantotilillä tosiasiallisesti käytössä, mitä tietoja niissä käsitellään ja kuinka kauan niitä säilytetään?
4. Miten Google Fonts -pyynnöt ja Cloudflare-toimitus kuvataan hyväksytyssä privacy disclosure -tekstissä?
5. Kuka käsittelee `contact@finnvek.com`-viestit, mihin tarkoitukseen ja millä säilytyskäytännöllä?
6. Mitkä oikeusperuste-, siirto-, oikeus- ja valvontaviranomaistiedot ovat juuri tälle operaattorille ja lainkäyttöalueelle oikeita?
7. Milloin GA4-vapaa tuotantobuild julkaistaan ja millä tavalla live-verkon, evästeiden ja otsakkeiden poisto todennetaan julkaisun jälkeen?

## 7. Vahvistus

Tähän inventaarioon ei ole arvattu omistajan nimeä, oikeushenkilömuotoa, postiosoitetta, yritys- tai VAT-tunnusta, rekisterinpitäjää, oikeusperustetta, säilytysaikaa, käsittelijäsuhdetta, kansainvälistä siirtoa, hosting-sopimusta, valvontaviranomaista tai lainkäyttöaluetta.
