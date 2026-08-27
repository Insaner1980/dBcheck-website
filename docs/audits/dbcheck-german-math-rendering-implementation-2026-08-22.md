# dBcheck German math rendering implementation — 2026-08-22

Tämä raportti dokumentoi 23.8.2026 toteutetun, 22.8.2026 päivättyyn auditiin perustuvan FACT-P1-001-korjauksen.

## 1. Task scope

Tehtävä rajattiin löydökseen FACT-P1-001: yhdeksän saksankielisen artikkelin tukemattomat Markdown-matematiikan `\(...\)`- ja `\[...\]`-erottimet muutettiin nykyisen Astro-, `remark-math`- ja KaTeX-putken tukemiksi `$...$`- ja `$$...$$`-erottimiksi. P2- tai P3-löydöksiä ei toteutettu.

## 2. Git working-tree baseline

Ennen muokkauksia haara oli `feat/mittariliike`, joka seurasi `origin/feat/mittariliike`-haaraa. `git diff --stat` ja `git diff` olivat tyhjät, joten valmiiksi muokattuja seurattuja tiedostoja ei ollut.

Valmiiksi seuraamattomia kohteita olivat:

- `.codex-remote-attachments/`
- `DBCHECK_SITE_IMPROVEMENT_AUDIT_2026-08-21.md`
- `docs/`, mukaan lukien tehtävän auditointiaineisto
- `output/`

Nämä omistajan olemassa olevat tiedostot säilytettiin. Vaadittu toteutusraportti lisättiin jo ennestään seuraamattomaan `docs/audits/`-hakemistoon.

## 3. Audit evidence used

Luettiin FACT-P1-001 kokonaisuudessaan tiedostosta `docs/audits/dbcheck-links-and-facts-audit-2026-08-22.md`, kaikki löydökseen liittyvät rivit tiedostosta `docs/audits/dbcheck-fact-ledger-2026-08-22.csv` sekä yhdeksään reittiin liittyvät 317 linkkiriviä tiedostosta `docs/audits/dbcheck-link-ledger-2026-08-22.csv`.

Lisäksi tarkastettiin kaikki yhdeksän saksankielistä artikkelia, niiden englanninkieliset vastineet, vähintään kaksi toimivaa englanninkielistä matematiikkasivua, saksankielinen `$$...$$`-esimerkki, `astro.config.mjs`, `package.json` ja nykyiset testit. Nykyinen kokoonpano käyttää `remark-math` 6.0.0:aa ja `rehype-katex` 7.0.1:tä. Parseri- tai KaTeX-asetuksia ei muutettu.

## 4. Number of raw expressions found before editing

Nykyisestä checkoutista löytyi täsmälleen 38 vahvistettua raakaa matematiikkaerotinta. Määrä täsmäsi uusimpaan auditiin, joten auditin jälkeen tapahtuneesta lähdemuutoksesta ei löytynyt näyttöä. Faktaledgerissä oli 28 löydösriviä, joista osa sisälsi useamman kuin yhden lausekkeen.

## 5. Per-file expression count before editing

| German source file | Inline | Display | Total |
| --- | ---: | ---: | ---: |
| `db-und-dba-unterschied.md` | 7 | 0 | 7 |
| `laermexpositionsgrenzen-deutschland-eu.md` | 0 | 1 | 1 |
| `sind-3-db-doppelt-so-laut.md` | 0 | 6 | 6 |
| `warum-ist-die-dezibelskala-logarithmisch.md` | 0 | 4 | 4 |
| `warum-sind-85-db-wichtig.md` | 0 | 1 | 1 |
| `was-ist-ein-dezibel.md` | 1 | 4 | 5 |
| `was-ist-eine-laermdosis.md` | 0 | 3 | 3 |
| `was-ist-schalldruckpegel.md` | 9 | 1 | 10 |
| `wie-lange-85-db-hoeren.md` | 0 | 1 | 1 |
| **Total** | **17** | **21** | **38** |

## 6. Delimiter conversion method

Ennen muokkausta muodostettiin sisäinen inventaario, joka sisälsi lähdetiedoston, rivin, erotintyypin, täydellisen sisäisen LaTeX-lausekkeen, inline/display-lajin, englanninkielisen vastineen ja tavoite-erottimen. Inline-erottimet muutettiin muodosta `\(...\)` muotoon `$...$`; display-erottimien omat `\[`- ja `\]`-rivit muutettiin `$$`-riveiksi. Kaavarunkoja tai ympäröivää tekstiä ei normalisoitu.

## 7. Confirmation that every inner mathematical expression was preserved

HEAD-version ja muokatun version kaikki 38 lauseketta poimittiin ja verrattiin järjestyksessä. Jokaisen sisäinen LaTeX-merkkijono oli identtinen. Lisäksi yhdeksän tiedoston normalisoitu ennen–jälkeen-vertailu, jossa vain vanhat ja uudet erottimet poistettiin, osoitti, ettei mikään muu tavu muuttunut rivinvaihtojen LF-normalisoinnin jälkeen. Arvot, yksiköt, muuttujat, ala- ja yläindeksit, logaritmien kannat, operaattorit, sulut, murtoluvut ja eksponentit säilyivät.

## 8. Exact files changed

Tuotantosisältö:

- `src/content/articles/de/db-und-dba-unterschied.md`
- `src/content/articles/de/laermexpositionsgrenzen-deutschland-eu.md`
- `src/content/articles/de/sind-3-db-doppelt-so-laut.md`
- `src/content/articles/de/warum-ist-die-dezibelskala-logarithmisch.md`
- `src/content/articles/de/warum-sind-85-db-wichtig.md`
- `src/content/articles/de/was-ist-ein-dezibel.md`
- `src/content/articles/de/was-ist-eine-laermdosis.md`
- `src/content/articles/de/was-ist-schalldruckpegel.md`
- `src/content/articles/de/wie-lange-85-db-hoeren.md`

Testi ja raportti:

- `test/i18n-build.test.mjs`
- `docs/audits/dbcheck-german-math-rendering-implementation-2026-08-22.md`

CSS-, kokoonpano- tai riippuvuustiedostoja ei muutettu.

## 9. Regression test added or extended

Olemassa olevaa `test/i18n-build.test.mjs`-testiä laajennettiin yhdellä kohdistetulla testillä. Se varmistaa kaikkien yhdeksän odotetun artikkelitiedoston olemassaolon ja hylkää julkaistusta Markdownista parilliset `\(...\)`- tai `\[...\]`-erottimet. Ennen tarkistusta testi poistaa aidatut koodilohkot ja inline-koodin, joten koodiesimerkit eivät aiheuta vääriä positiivisia tuloksia.

## 10. Source-level unsupported-delimiter result

Kaikkien yhdeksän tiedoston lähdetarkistus antoi tuloksen `UNSUPPORTED_DELIMITERS=0`. Auditoidussa rajauksessa ei jäänyt tukemattomia matemaattisia `\(...\)`- tai `\[...\]`-erottimia.

## 11. Generated KaTeX result for every affected route

Jokainen 38 lähdelausekkeesta tuotti paikallisen tuotantobuildin HTML:ään yhden KaTeX-solmun, yhden semanttisen MathML-esityksen ja yhden `application/x-tex`-annotaation. Generoidussa HTML:ssä ei ollut raakaa `\(`-, `\)`-, `\[`- tai `\]`-merkintää, epäonnistuneen renderöinnin näkyviä LaTeX-komentoja, päällekkäisiä kaavoja eikä sisäkkäisiä KaTeX-rakenteita.

## 12. Per-route rendered-expression count

| Route | Inline | Display | KaTeX | MathML |
| --- | ---: | ---: | ---: | ---: |
| `/de/artikel/db-und-dba-unterschied/` | 7 | 0 | 7 | 7 |
| `/de/artikel/laermexpositionsgrenzen-deutschland-eu/` | 0 | 1 | 1 | 1 |
| `/de/artikel/sind-3-db-doppelt-so-laut/` | 0 | 6 | 6 | 6 |
| `/de/artikel/warum-ist-die-dezibelskala-logarithmisch/` | 0 | 4 | 4 | 4 |
| `/de/artikel/warum-sind-85-db-wichtig/` | 0 | 1 | 1 | 1 |
| `/de/artikel/was-ist-ein-dezibel/` | 1 | 4 | 5 | 5 |
| `/de/artikel/was-ist-eine-laermdosis/` | 0 | 3 | 3 | 3 |
| `/de/artikel/was-ist-schalldruckpegel/` | 9 | 1 | 10 | 10 |
| `/de/artikel/wie-lange-85-db-hoeren/` | 0 | 1 | 1 | 1 |
| **Total** | **17** | **21** | **38** | **38** |

## 13. Mobile and desktop browser results

Paikallisessa tuotantopreview'ssa tarkastettiin kaikki yhdeksän reittiä 320, 360, 390, 768 ja 1440 pikselin leveydellä, yhteensä 45 reitti–leveys-yhdistelmää. Jokaisessa yhdistelmässä KaTeX- ja MathML-määrät täsmäsivät lähteeseen, kaavat olivat luettavia, inline-kaavat pysyivät tekstin yhteydessä, display-kaavat säilyivät oikeassa kappalepaikassa, saksan merkit ja välimerkit näkyivät oikein sekä lähde- ja navigointilinkit säilyivät. Breadcrumb-navigointi testattiin kaikilla yhdeksällä reitillä.

Selainkonsoli- tai sivuvirheitä ei tullut. Epäonnistuneita verkkopyyntöjä, HTTP-virhevastauksia tai KaTeX-resurssipyyntöjä ei havaittu.

## 14. 200 percent zoom result

Kaikki samat 45 reitti–leveys-yhdistelmää tarkastettiin selainmoottorin 200 prosentin sivuskaalauksella. Toteutunut skaala varmistettiin arvoksi 2. Kaavojen määrä, rakenne, näkyvyys, asemointi ja paikallinen vieritettävyys säilyivät ilman kaavakohtaisia virheitä.

## 15. Horizontal-overflow result

Yksikään korjattu kaava ei aiheuttanut uutta dokumenttitason vaakavieritystä tai leikkautumista. Kahdeksan kapean näkymän display-kaavatapausta hyödynsi sivuston olemassa olevaa paikallisesti vieritettävää `.katex-display`-käyttäytymistä ja pysyi oman säiliönsä sisällä.

Kaksi tehtävään kuulumatonta, jo ennen korjausta sisältörakenteessa ollutta mobiiliylivuotoa havaittiin ja jätettiin rajauksen mukaisesti ennalleen:

- `/de/artikel/laermexpositionsgrenzen-deutschland-eu/`: 320, 360 ja 390 px; lähteinä muuttumaton editorial header/H1/lede ja leveä taulukko
- `/de/artikel/was-ist-schalldruckpegel/`: 320 ja 360 px; lähteenä muuttumaton editorial header/H1/lede

Näissäkin korjatut kaavat olivat näkyviä tai paikallisesti hallittuja eivätkä olleet dokumenttiylivuodon lähde. CSS-muutosta ei tarvittu.

## 16. npm run check result

`npm run check` päättyi koodilla 0. Astro tarkasti 57 tiedostoa: 0 virhettä, 0 varoitusta ja 16 hint-tasoista ilmoitusta. Uusia virheitä tai varoituksia ei tullut.

## 17. npm test result

`npm test` päättyi koodilla 0. Testejä oli uuden kohdistetun regression jälkeen 17: 17 läpäisi, 0 epäonnistui, 0 ohitettiin ja 0 peruttiin. Aiempi auditointibaseline oli 16 testiä.

## 18. npm run build result

`npm run build` päättyi koodilla 0. Astro rakensi 56 indeksoitavaa sivua ja kahdeksan legacy-uudelleenohjausta. Rakennus valmistui noin 3,49 sekunnissa.

## 19. Route, redirect, canonical, hreflang, sitemap and schema regression results

Mekaaninen `dist`-tarkistus varmisti:

- 64 `index.html`-tulostetta: 56 indeksoitavaa reittiä ja 8 redirect-tulostetta
- 56 yksilöllistä canonical-URL:ia
- sitemapissa samat 56 yksilöllistä URL:ia kuin canonical-joukossa
- jokaisen yhdeksän saksalaisen reitin self-canonicalin
- vastavuoroiset `en-GB`, `de-DE` ja `x-default` hreflangit englanninkielisten vastinreittien kanssa
- ettei yhdellekään reitille tullut `noindex`-merkintää
- muuttumattomat title- ja description-arvot
- täsmälleen yhden H1:n jokaisella reitillä
- olemassa olevat sisäiset linkkikohteet
- kaksi JSON-LD-lohkoa per sivu, tyyppeinä ennallaan `Article` ja `BreadcrumbList`
- muuttumattoman `mainEntityOfPage`-URL:n, `de-DE`-kielen ja frontmatteriin perustuvat julkaisu- ja muokkauspäivät

## 20. Confirmation that article frontmatter, dates, wording, facts, links and sources were unchanged

Mekaaninen ennen–jälkeen-vertailu varmisti, että yhdeksän artikkelin ainoat muutokset olivat matematiikkaerottimet. Frontmatter, title, description, published- ja reviewed-päivät, otsikot, saksankielinen teksti, välimerkit, faktat, lähde-URL:t, sisäiset ja related-linkit, product wording sekä oikeudellinen ja sääntelysanasto säilyivät identtisinä. Ulkoisia lähteitä ei auditointiohjeen mukaisesti tarkastettu uudelleen, koska erotinmuutos ei vaikuttanut viitteisiin.

## 21. Remaining P2 and P3 findings not implemented

LNK-P2-001, LNK-P2-002, LNK-P2-003, EXT-P2-001, FACT-P2-001, FACT-P2-002 ja EXT-P3-001 jäivät toteuttamatta. Samoin kaikki muut tehtävässä erikseen poissuljetut saavutettavuus-, ulkoasu-, SEO-, schema-, suorituskyky-, analytiikka-, hinnoittelu-, laki-, sisältö-, julkaisu- ja Android-muutokset jäivät koskematta.

## 22. Limitations or uncertainty

- Tarkistus tehtiin paikallisesta tuotantobuildista ja tuotantopreview'sta, ei deployatusta ympäristöstä.
- Kahden reitin edellä dokumentoidut, kaavoista riippumattomat kapean näkymän ylivuodot jäivät tarkoituksella ennalleen.
- Ulkoisia lähteitä ei re-auditoitu; muuttumattomuus varmistettiin lähde-URL:ien ennen–jälkeen-vertailulla ja olemassa olevalla linkkiledgerillä.
- `npm run check` raportoi 16 olemassa olevaa hint-tason ilmoitusta mutta ei virheitä eikä varoituksia.

Muita epävarmuuksia FACT-P1-001:n toteutuksessa ei havaittu.

## 23. No deployment or Git publication actions

Deployausta, commitia, pushia, uutta haaraa, mergeä tai pull requestia ei tehty eikä avattu. Työ pysäytettiin FACT-P1-001:n jälkeen.
