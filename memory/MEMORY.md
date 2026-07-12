# dBcheck website memory

Päivitetty: 2026-07-12

## Nykyinen rakenne

- Astro 7, staattinen build, julkinen perus-URL `https://dbcheck.app`.
- Yhteinen shell: `src/layouts/Base.astro`.
- Etusivu: `src/pages/index.astro`; alkuperäinen hero-video ja Web Audio -mittari on säilytetty.
- Common sounds -tietojen ainoa lähde: `src/data/sounds.ts`.
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
- Nykyinen verkkosivun Pro-hinta 12.99 euroa säilytettiin, koska `PROJECT.md` ei vahvistanut muuta hintaa.

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
