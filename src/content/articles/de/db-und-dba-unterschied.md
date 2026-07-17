---
title: "dB und dBA: Was ist der Unterschied?"
description: "Der praktische Unterschied zwischen dB und dBA, die Wirkung der A-Bewertung und die Frage, wann dB(C), dB(Z) oder eine genauere Messgröße nötig ist."
slug: "db-und-dba-unterschied"
locale: "de"
translationKey: "db-vs-dba"
clusterKey: "fundamentals"
primaryIntent: "Die Leserin oder der Leser möchte den praktischen Unterschied zwischen dB und dBA verstehen."
contentCluster: "Dezibel-Grundlagen"
researchSources:
  - "BIPM, The International System of Units (SI Brochure), 9th edition"
  - "IEC 61672-1:2013, offizielle Publikationsseite"
  - "BAuA, Lärm und LärmVibrationsArbSchV"
  - "BAuA, TRLV Lärm Teil 2: Messung von Lärm"
  - "Umweltbundesamt, Messgrößen und Pegel"
  - "Umweltbundesamt, tieffrequente Geräusche"
publishedAt: "2026-07-12"
lastReviewed: "2026-07-15"
---

dB und dBA sind nicht austauschbar. dB bezeichnet allgemein ein logarithmisches Verhältnis. dBA, formaler meist dB(A), zeigt zusätzlich, dass das Schallsignal mit der standardisierten A-Bewertung gefiltert wurde. Ein Wert in dB(A) enthält daher mehr Information als eine bloße dB-Angabe. [BIPM][1] [IEC 61672][2]

Für die Praxis ist noch etwas wichtig: Auch dB(A) beschreibt eine Messung nicht vollständig. Zeitbewertung, Mittelungsdauer, Messposition und verwendete Messgröße gehören ebenfalls dazu.

[Was ist ein Dezibel? Schallpegel einfach erklärt](/de/artikel/was-ist-ein-dezibel/)

## Warum dB allein zu wenig sagt

Dezibel werden für verschiedene physikalische und technische Größen verwendet. Schalldruckpegel, Schallleistungspegel, elektrische Leistung, Spannungsverhältnisse und digitale Signalpegel können alle in dB angegeben werden, verwenden aber nicht dieselbe Bezugsgröße.

Auch innerhalb der Akustik bleiben bei "70 dB" mehrere Fragen offen:

- Ist ein Schalldruckpegel oder Schallleistungspegel gemeint?
- Wurde mit A-, C- oder Z-Bewertung gemessen?
- Handelt es sich um einen aktuellen Wert, einen Mittelungspegel, ein Maximum oder einen Spitzenpegel?
- Wie lange wurde gemessen, und wo befand sich das Mikrofon?

Ohne diesen Kontext lässt sich die Zahl nur grob einordnen.

## Was die A-Bewertung verändert

Die A-Bewertung ist ein festgelegter Frequenzfilter. Tiefe Frequenzen werden stark abgeschwächt, sehr hohe Frequenzen ebenfalls. Anschließend wird aus dem gefilterten Signal ein Gesamtpegel berechnet. [IEC 61672][2]

Das Ergebnis wird häufig als dBA geschrieben. In technischen Texten ist dB(A) gebräuchlich. Noch genauer sind Formelzeichen wie \(L_{Aeq}\) oder \(L_{AFmax}\), weil sie neben der A-Bewertung auch die Art der Zeitverarbeitung benennen.

A-Bewertung wird oft mit der Empfindlichkeit des menschlichen Gehörs erklärt. Das ist als Einstieg brauchbar, aber unvollständig. Sie ist nur eine feste Kurve. Das Gehör reagiert je nach Pegel, Frequenzspektrum, Dauer und individueller Hörfähigkeit unterschiedlich. Tonhaltigkeit, Impulsivität, Maskierung und räumliches Hören bildet ein einzelner A-bewerteter Gesamtwert nicht vollständig ab.

Die sachlichere Einordnung lautet daher: Dieses Bewertungsverfahren ist standardisiert, das für viele Umwelt- und Arbeitsplatzmessungen eine vergleichbare Einzahlangabe liefert.

## Warum dB(A) häufig verwendet wird

In Deutschland beziehen sich zahlreiche Mess- und Bewertungsverfahren auf A-bewertete Größen. Bei Lärm am Arbeitsplatz verwendet die LärmVibrationsArbSchV den Tages-Lärmexpositionspegel \(L_{EX,8h}\), der A-bewertet ist. Die unteren und oberen Auslösewerte liegen bei 80 und 85 dB(A). Für impulsförmige Ereignisse kommen C-bewertete Spitzenschalldruckpegel hinzu. [BAuA Lärm][3]

Diese Werte sind an einen bestimmten Rechts- und Messkontext gebunden. Ein beliebiger Live-Wert aus einer Smartphone-App lässt sich nicht direkt damit gleichsetzen.

Auch zwei A-bewertete Angaben können etwas Verschiedenes meinen:

- \(L_{Aeq,15min}\) ist der energieäquivalente A-bewertete Pegel über 15 Minuten.
- \(L_{AFmax}\) ist der höchste A-bewertete Pegel mit Fast-Zeitbewertung innerhalb des Beobachtungszeitraums.

Beide werden in dB angegeben, beantworten aber nicht dieselbe Frage.

## Wie sich die C-Bewertung unterscheidet

Die C-Bewertung verläuft über einen großen Teil des hörbaren Frequenzbereichs flacher als die A-Bewertung. Tiefe Frequenzen tragen deshalb stärker zum Gesamtwert bei.

Das ist besonders relevant bei hohen Schallpegeln, impulshaltigen Ereignissen und Geräuschen mit viel tieffrequenter Energie. Ein typisches Formelzeichen ist \(L_{Cpeak}\), der C-bewertete Spitzenpegel.

Ein Beispiel: Bei bassbetonter Musik, einer Lüftungsanlage oder tieffrequentem Maschinenbrummen kann der dB(C)-Wert erheblich über dem dB(A)-Wert liegen. Bei breitbandigem Schall mit wenig Tiefton fällt der Abstand oft kleiner aus. Der Abstand folgt aus der spektralen Verteilung des Schalls; der Gesamtpegel allein erklärt ihn nicht.

Das Umweltbundesamt weist bei tieffrequenten Geräuschen ausdrücklich darauf hin, dass eine reine A-Bewertung relevante Anteile schwach abbilden kann und für spezielle Beurteilungen weitere Verfahren nötig sind. [UBA Tieffrequenz][4]

C-Bewertung ist nicht die "genauere" A-Bewertung. Sie dient einem anderen Zweck.

## Was dB(Z) bedeutet

Z steht für Zero Frequency Weighting. Innerhalb des festgelegten Frequenzbereichs des Messgeräts wird keine A- oder C-Formung angewendet. Der Frequenzgang soll dort annähernd flach sein.

"Unbewertet" bedeutet trotzdem nicht, dass jedes Gerät das Eingangssignal perfekt unverändert erfasst. Mikrofon, Vorverstärker, Wandler, Bandbreite und Fertigungstoleranzen bleiben Teil der Messkette. dB(Z) ist eine standardisierte Bewertungsart, kein Qualitätsnachweis für die gesamte Hardware.

## Warum dasselbe Geräusch verschiedene Werte liefert

Ein tieffrequentes Brummen kann beispielsweise 65 dB(A), aber einen wesentlich höheren Wert in dB(C) anzeigen. Der Unterschied entsteht nicht durch zwei verschiedene Schallereignisse, sondern durch die unterschiedliche Gewichtung der Frequenzanteile.

Bei zwei Apps können zusätzlich weitere Ursachen hinzukommen:

- unterschiedliche Frequenzbewertung
- abweichende Kalibrierung
- verschiedene Mittelungsfenster
- Fast-, Slow- oder nicht standardisierte Glättung
- automatische Verstärkungsregelung des Smartphones
- herstellerspezifische Mikrofonverarbeitung
- Übersteuerung bei hohen Pegeln

Deshalb ist der Vergleich einer A-bewerteten Anzeige mit einer C-bewerteten Anzeige wenig aussagekräftig. Selbst zwei Anzeigen mit derselben Beschriftung können abweichen, wenn die Apps intern anders rechnen.

[Warum zeigen zwei Dezibel-Apps unterschiedliche Werte?](/de/artikel/warum-dezibel-apps-unterschiedliche-werte-zeigen/)

## Wann dB(A) sinnvoll ist

A-bewertete Werte sind sinnvoll, wenn eine Richtlinie, Verordnung, Studie oder Vergleichsmessung ausdrücklich A-Bewertung verlangt. Dazu gehören viele Verfahren für Umwelt- und Arbeitsplatzlärm.

Für wiederholte Vergleiche kann dB(A) ebenfalls nützlich sein. Wenn Gerät, App, Position, Ausrichtung, Dauer und Kalibrierungszustand gleich bleiben, lässt sich eine Veränderung oft erkennen, auch wenn der absolute Smartphone-Wert nicht messgerätetauglich ist.

## Wann ein A-bewerteter Einzelwert nicht reicht

Ein dB(A)-Wert kann wichtige Eigenschaften eines Geräuschs verdecken.

Tieffrequente Anteile erscheinen schwächer. Kurze impulsförmige Ereignisse benötigen gegebenenfalls einen Spitzenpegel wie \(L_{Cpeak}\). Bei tonal auffälligem oder stark schwankendem Schall können Oktav- oder Terzbandanalysen sinnvoll sein. Für bestimmte behördliche oder arbeitsrechtliche Messungen gelten verbindliche Verfahren, die eine Smartphone-Anzeige nicht ersetzt. [TRLV Lärm Teil 2][5]

Auch Lautheit lässt sich nicht direkt aus dB(A) ablesen. Zwei Geräusche mit demselben A-bewerteten Pegel können sich in Frequenzspektrum, Dauer und Charakter stark unterscheiden.

## Die Messgröße muss zur Frage passen

Es gibt keine universell beste Bewertung.

A-Bewertung passt zu Verfahren, die A-bewertete Umwelt- oder Expositionswerte verlangen. C-Bewertung kann bei Spitzenpegeln, hohen Pegeln oder tieffrequenten Anteilen erforderlich sein. Z-Bewertung eignet sich, wenn ein annähernd flacher standardisierter Frequenzgang gebraucht wird und das Messsystem dafür geeignet ist.

Nennen Sie neben der Frequenzbewertung auch die Zeitkennzeichnung und den Messkontext. Erst dann wird aus einer Zahl eine nachvollziehbare Messangabe.

## Bewertungsarten mit dBcheck vergleichen

Mit dBcheck können verfügbare Frequenzbewertungen am selben Smartphone und an derselben Position verglichen werden. Ein größerer Abstand zwischen dB(A) und dB(C) kann auf einen starken tieffrequenten Anteil hinweisen. Das Ergebnis bleibt eine Schätzung, weil Mikrofon, Kalibrierung, Signalverarbeitung und Übersteuerungsgrenze des Telefons die Messung beeinflussen.

## Quellen

1. BIPM, *The International System of Units (SI Brochure), 9th edition*. [https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf](https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf)
2. IEC 61672-1:2013, offizielle Publikationsseite. [https://webstore.iec.ch/en/publication/5708](https://webstore.iec.ch/en/publication/5708)
3. Bundesanstalt für Arbeitsschutz und Arbeitsmedizin, *Lärm*. [https://www.baua.de/DE/Themen/Arbeitsgestaltung/Gefaehrdungsbeurteilung/Handbuch-Gefaehrdungsbeurteilung/Expertenwissen/Physikalische-Einwirkungen/Laerm/Laerm_dossier](https://www.baua.de/DE/Themen/Arbeitsgestaltung/Gefaehrdungsbeurteilung/Handbuch-Gefaehrdungsbeurteilung/Expertenwissen/Physikalische-Einwirkungen/Laerm/Laerm_dossier)
4. Umweltbundesamt, *Tieffrequente Geräusche*. [https://www.umweltbundesamt.de/themen/laerm/laermwirkungen/tieffrequente-geraeusche](https://www.umweltbundesamt.de/themen/laerm/laermwirkungen/tieffrequente-geraeusche)
5. Bundesanstalt für Arbeitsschutz und Arbeitsmedizin, *TRLV Lärm, Teil 2: Messung von Lärm*. [https://www.baua.de/DE/Angebote/Regelwerk/TRLV/pdf/TRLV-Laerm-Teil-2.pdf?__blob=publicationFile](https://www.baua.de/DE/Angebote/Regelwerk/TRLV/pdf/TRLV-Laerm-Teil-2.pdf?__blob=publicationFile)

[1]: https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf
[2]: https://webstore.iec.ch/en/publication/5708
[3]: https://www.baua.de/DE/Themen/Arbeitsgestaltung/Gefaehrdungsbeurteilung/Handbuch-Gefaehrdungsbeurteilung/Expertenwissen/Physikalische-Einwirkungen/Laerm/Laerm_dossier
[4]: https://www.umweltbundesamt.de/themen/laerm/laermwirkungen/tieffrequente-geraeusche
[5]: https://www.baua.de/DE/Angebote/Regelwerk/TRLV/pdf/TRLV-Laerm-Teil-2.pdf?__blob=publicationFile
