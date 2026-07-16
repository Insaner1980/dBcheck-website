---
title: "Sind 3 dB doppelt so laut? Energie vs Lautheit"
description: "Warum 3 dB mehr die Schallenergie ungefähr verdoppeln, aber keine zweifache Lautheit bedeuten, und was Änderungen um 10 dB sowie gleiche Schallquellen aussagen."
slug: "sind-3-db-doppelt-so-laut"
locale: "de"
translationKey: "is-3-db-twice-as-loud"
clusterKey: "fundamentals"
primaryIntent: "Die Leserin oder der Leser möchte wissen, ob ein Pegelanstieg von 3 dB als doppelte Lautheit wahrgenommen wird."
contentCluster: "Dezibel-Grundlagen"
researchSources:
  - "Umweltbundesamt, Dezibel und Pegelsummation"
  - "BAuA, Safe and Sound, Ratgeber zur Gehörerhaltung in der Musik"
  - "BAuA, Lärm und LärmVibrationsArbSchV"
  - "BAuA, TRLV Lärm Teil 2: Messung von Lärm"
  - "ISO 532-1, offizielle Kurzbeschreibung"
  - "ISO 532-2:2017, offizielle Kurzbeschreibung"
  - "Moore, Glasberg and Varathanathan, A Loudness Model for Time-Varying Sounds"
publishedAt: "2026-07-15"
lastReviewed: "2026-07-15"
---

Zwei unabhängige Maschinen erzeugen am Messpunkt jeweils 80 dB. Laufen beide gleichzeitig, zeigt ein Schallpegelmesser bei ansonsten gleichen Messbedingungen ungefähr 83 dB. Die Schallenergie hat sich damit etwa verdoppelt. Das Ergebnis wirkt normalerweise nicht wie eine Verdopplung. [UBA Pegelsummation][1]

Die kurze Antwort lautet also: Nein. Ein 3-dB-Anstieg beschreibt eine physikalische Verdopplung der Intensität oder Energie, keine zweimal so große wahrgenommene Lautheit.

[Was ist ein Dezibel? Schallpegel einfach erklärt](/de/artikel/was-ist-ein-dezibel/)

## Was sich bei 3 dB verdoppelt

Für Intensität, Leistung oder Schallenergie gilt:

\[
\frac{E_2}{E_1} = 10^{\Delta L/10}
\]

Bei 3 dB ergibt sich:

\[
10^{3/10} \approx 1{,}995
\]

Die exakte Pegelerhöhung für die doppelte Energie beträgt ungefähr 3,01 dB. Die übliche Aussage "3 dB mehr sind doppelte Energie" ist daher eine sinnvolle Rundung.

Beim Schalldruck gilt eine andere Beziehung:

\[
\frac{p_2}{p_1} = 10^{\Delta L/20}
\]

Bei 3 dB steigt die Schalldruckamplitude auf ungefähr das 1,41-Fache. Das sind rund 41 Prozent mehr, nicht 100 Prozent.

Beide Aussagen passen zusammen. Die akustische Energie hängt bei gleicher Messsituation vom Quadrat des Schalldrucks ab.

## Warum doppelte Energie nicht doppelte Lautheit ist

Lautheit ist eine Wahrnehmungsgröße. Ein Messgerät erfasst Schalldruck und berechnet daraus einen Pegel. Das Gehör verarbeitet den Schall anschließend abhängig von Frequenz, Zeitverlauf und vielen weiteren Faktoren.

Eine Pegeländerung von 3 dB kann deutlich messbar sein. Für viele Menschen klingt sie eher mäßig lauter als zuvor. Die genaue Wirkung hängt unter anderem ab von:

- Frequenz und Spektrum
- Ausgangspegel
- Dauer und zeitlichem Verlauf
- Ton, Sprache, Musik oder breitbandigem Geräusch
- freiem Schallfeld, Raum oder Kopfhörerwiedergabe
- Alter und Hörvermögen
- Maskierung und Gewöhnung

Normen zur Lautheitsberechnung verwenden deshalb komplexere Modelle als eine einzelne dB-Differenz. ISO 532-1 und ISO 532-2 beschreiben unterschiedliche standardisierte Verfahren für stationäre und zeitlich veränderliche Schalle. [ISO 532-1][2] [ISO 532-2][3]

## Welche physikalische Wirkung 10 dB haben

Eine Pegelzunahme von 10 dB bedeutet die zehnfache Intensität, Leistung oder Energie:

\[
10^{10/10} = 10
\]

Die Schalldruckamplitude steigt auf ungefähr das 3,16-Fache:

\[
10^{10/20} \approx 3{,}162
\]

Bei 10 dB Pegelzunahme wird dies als Faustregel häufig als annähernde Verdopplung des Lautheitseindrucks empfunden. Die BAuA verwendet diese Einordnung ebenfalls, weist aber auf den Unterschied zwischen wahrgenommener Lautheit und physikalischer Schallenergie hin. [BAuA Gehörerhaltung][4]

Das Wort "ungefähr" ist entscheidend. Ein 10-dB-Unterschied bei zwei gleichartigen, stationären Geräuschen lässt sich nicht ohne Weiteres auf einen kurzen Ton, bassbetonte Musik oder impulsförmigen Schall übertragen. Forschungsmodelle zur Lautheit berücksichtigen deshalb Pegel, Spektrum und zeitliche Entwicklung gemeinsam. [Moore et al.][5]

## Ein Vergleich mit 70, 73 und 80 dB

Nehmen Sie zwei stationäre Geräusche, die mit demselben Verfahren gemessen werden:

- Geräusch A: 70 dB
- Geräusch B: 73 dB

Geräusch B enthält etwa zweimal so viel Schallenergie oder Intensität wie Geräusch A. Der Lautheitseindruck verdoppelt sich normalerweise nicht.

Beim Vergleich von 70 und 80 dB ist die Intensität des 80-dB-Geräuschs zehnmal so groß. Viele Menschen empfinden es unter passenden Bedingungen als annähernde Verdopplung der Lautheit. Die Wahrnehmung bleibt jedoch abhängig vom Schall und von der hörenden Person.

Ein fester dB-Unterschied erzeugt daher kein universelles Lautheitsverhältnis.

## Warum zwei gleiche Quellen meist 3 dB ergeben

Bei zwei unabhängigen Schallquellen mit gleichem Pegel addieren sich die mittleren Schallenergien. Der Gesamtpegel steigt um:

\[
10\log_{10}(2) \approx 3{,}01\ \mathrm{dB}
\]

Zwei unabhängige Geräte mit jeweils 80 dB ergeben gemeinsam ungefähr 83 dB. Vier gleichartige Quellen ergeben gegenüber einer einzelnen Quelle ungefähr 6 dB mehr, weil die Energie viermal so groß ist.

Das gilt nicht für jede denkbare Signalkombination. Kohärente Töne können sich abhängig von ihrer Phase und der Position des Mikrofons verstärken oder auslöschen. Zwei perfekt gleichphasige Schalldrucksignale können an einem Punkt die Druckamplitude verdoppeln. Das entspricht dort bis zu 6 dB. Bei Gegenphase kann der Pegel dagegen sinken.

[Dezibelwerte addieren und mitteln](/de/werkzeuge/dezibel-addieren/)

## Warum sich bei einem Anstieg um 3 dB die Expositionszeit halbiert

Die gleiche energetische Beziehung wird bei der Beurteilung von Lärmexposition verwendet. Liegt ein gleichartiger Pegel 3 dB höher, trifft pro Zeiteinheit etwa zweimal so viel Schallenergie auf das Gehör. Für dieselbe Energiedosis reicht dann etwa die halbe Zeit.

Für Arbeitsplätze in Deutschland bezieht die LärmVibrationsArbSchV den Tages-Lärmexpositionspegel auf acht Stunden. Die Auslösewerte liegen bei 80 und 85 dB(A). [BAuA Lärm][6]

Ein rein energetisches Vergleichsbeispiel lautet:

| A-bewerteter Pegel | Dauer für ungefähr gleiche Schallenergie |
|---:|---:|
| 85 dB(A) | 8 Stunden |
| 88 dB(A) | 4 Stunden |
| 91 dB(A) | 2 Stunden |
| 94 dB(A) | 1 Stunde |

Diese Tabelle beschreibt gleiche Energie. Sie legt keine pauschal "sicheren" Aufenthaltszeiten fest und ersetzt keine Gefährdungsbeurteilung. Impulsschall, Spitzenpegel, Gehörschutz, Messunsicherheit und individuelle Voraussetzungen müssen getrennt berücksichtigt werden. Die TRLV Lärm regeln die Messung und Bewertung im deutschen Arbeitsschutzkontext. [TRLV Lärm Teil 2][7]

Smartphone-Werte erhöhen die Unsicherheit zusätzlich. Fehlende Kalibrierung, automatische Signalverarbeitung oder Übersteuerung können die Berechnung der Exposition verfälschen.

## Warum die Art des Schalls eine Rolle spielt

Ein reiner Ton, dessen Pegel 10 dB höher liegt, wird nicht zwingend genauso wahrgenommen wie breitbandiges Rauschen mit derselben Pegeländerung. Tieffrequentes Brummen, Sprache, Musik und Maschinenlärm haben unterschiedliche Spektren und zeitliche Muster.

Auch die Dauer verändert die Einordnung. Ein sehr kurzer Impuls kann einen hohen Spitzenpegel besitzen, aber zu einem längeren energieäquivalenten Mittelungspegel vergleichsweise wenig beitragen. Ein gleichmäßiges Geräusch kann ohne auffällige Spitze eine erhebliche Gesamtexposition erzeugen.

Die Frequenzbewertung muss ebenfalls gleich bleiben. A-Bewertung schwächt tiefe Frequenzen stärker, C-Bewertung lässt sie deutlicher in den Gesamtwert einfließen. Ein Vergleich zwischen dB(A) und dB(C) beantwortet daher nicht dieselbe Frage.

## Was eine Änderung um 3 dB tatsächlich aussagt

Ein Anstieg von 3 dB bedeutet bei ansonsten gleichen Voraussetzungen ungefähr doppelte Intensität oder Energie. Sie bedeuten keine zweifache Lautheit und bestimmen allein auch kein Gehörrisiko.

10 dB Pegelzunahme bedeuten die zehnfache Intensität. "Rund doppelte Lautheit" ist dafür eine brauchbare Wahrnehmungsfaustregel, solange sie nicht als exakte Umrechnung dargestellt wird.

Schallpegel, Lautheit und Exposition hängen zusammen. Gleichsetzen darf man sie nicht.

## Zwei Bedingungen mit dBcheck vergleichen

Mit dBcheck lassen sich geschätzte Pegeländerungen zwischen zwei kontrollierten Bedingungen beobachten, etwa zwischen zwei Stufen eines Haushaltsgeräts oder zwei festen Messpositionen. Telefon, Abstand, Ausrichtung, Frequenzbewertung und Messdauer sollten gleich bleiben. Relative Unterschiede können nützlich sein, auch wenn der absolute Smartphone-Wert unsicher ist. Für amtliche oder sicherheitskritische Entscheidungen ist ein validiertes Schallpegelmessgerät erforderlich.

## Quellen

1. Umweltbundesamt, *Dezibel und Pegelsummation*. [https://www.umweltbundesamt.de/dezibel-pegelsummation](https://www.umweltbundesamt.de/dezibel-pegelsummation)
2. ISO 532-1, offizielle Kurzbeschreibung. [https://www.iso.org/standard/63077.html](https://www.iso.org/standard/63077.html)
3. ISO 532-2:2017, offizielle Kurzbeschreibung. [https://www.iso.org/standard/63078.html](https://www.iso.org/standard/63078.html)
4. Bundesanstalt für Arbeitsschutz und Arbeitsmedizin, *Safe and Sound, Ratgeber zur Gehörerhaltung in der Musik*. [https://www.baua.de/DE/Angebote/Publikationen/Praxis/A87.pdf?__blob=publicationFile&v=2](https://www.baua.de/DE/Angebote/Publikationen/Praxis/A87.pdf?__blob=publicationFile&v=2)
5. Moore, Glasberg und Varathanathan, *A Loudness Model for Time-Varying Sounds*. [https://pmc.ncbi.nlm.nih.gov/articles/PMC5318944/](https://pmc.ncbi.nlm.nih.gov/articles/PMC5318944/)
6. Bundesanstalt für Arbeitsschutz und Arbeitsmedizin, *Lärm*. [https://www.baua.de/DE/Themen/Arbeitsgestaltung/Gefaehrdungsbeurteilung/Handbuch-Gefaehrdungsbeurteilung/Expertenwissen/Physikalische-Einwirkungen/Laerm/Laerm_dossier](https://www.baua.de/DE/Themen/Arbeitsgestaltung/Gefaehrdungsbeurteilung/Handbuch-Gefaehrdungsbeurteilung/Expertenwissen/Physikalische-Einwirkungen/Laerm/Laerm_dossier)
7. Bundesanstalt für Arbeitsschutz und Arbeitsmedizin, *TRLV Lärm, Teil 2: Messung von Lärm*. [https://www.baua.de/DE/Angebote/Regelwerk/TRLV/pdf/TRLV-Laerm-Teil-2.pdf?__blob=publicationFile](https://www.baua.de/DE/Angebote/Regelwerk/TRLV/pdf/TRLV-Laerm-Teil-2.pdf?__blob=publicationFile)

[1]: https://www.umweltbundesamt.de/dezibel-pegelsummation
[2]: https://www.iso.org/standard/63077.html
[3]: https://www.iso.org/standard/63078.html
[4]: https://www.baua.de/DE/Angebote/Publikationen/Praxis/A87.pdf?__blob=publicationFile&v=2
[5]: https://pmc.ncbi.nlm.nih.gov/articles/PMC5318944/
[6]: https://www.baua.de/DE/Themen/Arbeitsgestaltung/Gefaehrdungsbeurteilung/Handbuch-Gefaehrdungsbeurteilung/Expertenwissen/Physikalische-Einwirkungen/Laerm/Laerm_dossier
[7]: https://www.baua.de/DE/Angebote/Regelwerk/TRLV/pdf/TRLV-Laerm-Teil-2.pdf?__blob=publicationFile
