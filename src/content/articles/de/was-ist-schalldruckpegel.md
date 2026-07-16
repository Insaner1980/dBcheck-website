---
title: "Was ist der Schalldruckpegel? SPL erklärt"
description: "Was Schalldruckpegel bedeutet, warum 20 Mikropascal als Bezug dienen, wie die SPL-Formel funktioniert und wie Position und Hardware das Ergebnis beeinflussen."
slug: "was-ist-schalldruckpegel"
locale: "de"
translationKey: "what-is-sound-pressure-level"
clusterKey: "fundamentals"
primaryIntent: "Die Leserin oder der Leser möchte den Schalldruckpegel verstehen und wissen, wie Schalldruck in Dezibel angegeben wird."
contentCluster: "Dezibel-Grundlagen"
researchSources:
  - "NIST Guide to the SI, Chapter 8"
  - "BIPM, The International System of Units (SI Brochure), 9th edition"
  - "Umweltbundesamt, Grundlagen der Akustik"
  - "Umweltbundesamt, Messgrößen und Pegel"
  - "IEC 61672-1:2013, offizielle Publikationsseite"
  - "BAuA, TRLV Lärm Teil 2: Messung von Lärm"
publishedAt: "2026-07-15"
lastReviewed: "2026-07-15"
---

Was misst ein Schallpegelmesser eigentlich? Er erfasst kleine Druckschwankungen in der Luft und setzt ihren Effektivwert ins Verhältnis zu einem Bezugsdruck. Dieses Verhältnis heißt Schalldruckpegel, auf Englisch Sound Pressure Level oder kurz SPL. Für Luftschall beträgt der Bezugsdruck 20 Mikropascal. [NIST SI Guide][1]

Der Wert wird in Dezibel angegeben, weil der relevante Schalldruckbereich über viele Größenordnungen reicht.

[Was ist ein Dezibel? Schallpegel einfach erklärt](/de/artikel/was-ist-ein-dezibel/)

## Schall verändert den Luftdruck

Eine Schallwelle verursacht kleine Druckschwankungen um den örtlichen Luftdruck. Während die Welle vorbeiläuft, liegt der momentane Schalldruck abwechselnd über und unter diesem Umgebungswert.

Ein Mikrofon wandelt die Schwankungen in ein elektrisches Signal um. Danach kann ein Messgerät oder eine App das Signal filtern, mitteln und als Pegel anzeigen.

Der zeitliche Mittelwert der rohen Druckkurve wäre dafür ungeeignet. Positive und negative Ausschläge heben sich weitgehend auf. Deshalb wird meist der Effektivwert verwendet, also der Root-Mean-Square-Wert, kurz RMS. Er bildet die wirksame Größe der Druckschwankung ab.

## Die SPL-Formel

Für Luftschall wird der Schalldruckpegel so berechnet:

\[
L_p = 20\log_{10}\left(\frac{p_{\mathrm{rms}}}{p_0}\right)\ \mathrm{dB}
\]

Dabei gilt:

- \(L_p\) ist der Schalldruckpegel
- \(p_{\mathrm{rms}}\) ist der Effektivwert des Schalldrucks innerhalb des festgelegten Zeitraums und Frequenzbereichs
- \(p_0\) ist der Bezugsdruck von 20 Mikropascal in Luft

Eine gleichwertige Schreibweise verwendet zehnmal den Logarithmus des Verhältnisses der mittleren Schalldruckquadrate. Beide Formen beschreiben denselben physikalischen Zusammenhang. [BIPM][2]

Warum steht in der Druckformel 20 statt 10? Die akustische Leistung ist unter den entsprechenden Bedingungen proportional zum Quadrat des Schalldrucks. Aus dem Quadrat entsteht beim Logarithmieren der Faktor 2.

## Warum 0 dB nicht Stille bedeutet

Bei 0 dB SPL entspricht der Effektivwert des Schalldrucks genau dem Bezugswert von 20 Mikropascal. Das Signal ist also nicht verschwunden.

Auch negative Werte sind möglich. Ein Schalldruck unterhalb des Bezugswerts ergibt einen negativen Pegel. Ob ein solcher Ton hörbar ist, hängt von Frequenz, Dauer, Messbedingungen und dem individuellen Gehör ab.

0 dB SPL ist deshalb keine starre Grenze des menschlichen Hörens.

## Der Schalldruckpegel gehört immer zu einem Ort

Ein Mikrofon misst den Schalldruck an seiner Position. Schon wenige Zentimeter können bei kleinen Quellen, stehenden Wellen oder Reflexionen einen Unterschied machen.

Im idealen freien Schallfeld sinkt der Pegel einer punktförmigen Quelle bei einer Verdopplung des Abstands um ungefähr 6 dB. Für eine idealisierte linienförmige Quelle, etwa eine lange Straße, nennt das Umweltbundesamt ungefähr 3 dB. [UBA Messgrößen][3]

In einem Wohnzimmer, Treppenhaus oder Büro funktioniert diese Faustregel nur eingeschränkt. Wände und Decken werfen Schall zurück. Möbel dämpfen bestimmte Frequenzen, andere Flächen verstärken Reflexionen. Auch die Richtung der Quelle und die Position nahe einer Ecke beeinflussen das Ergebnis.

Eine feste Abstandskorrektur für jede Innenraummessung gibt es nicht.

[Wie beeinflusst der Abstand den Schallpegel? Die 6-dB-Regel](/de/werkzeuge/schallpegel-entfernung/)

## Schalldruck, Schallintensität und Lautheit sind nicht dasselbe

Die Begriffe hängen zusammen, beschreiben aber verschiedene Dinge.

### Schalldruck

Schalldruck ist die lokale Druckschwankung, die ein Mikrofon erfasst. Der Schalldruckpegel setzt ihren Effektivwert ins Verhältnis zu 20 Mikropascal.

### Schallintensität

Die Schallintensität beschreibt, wie viel akustische Leistung durch eine bestimmte Fläche fließt. In einem einfachen freien Schallfeld besteht ein enger Zusammenhang zwischen Schalldruck und Intensität. In Räumen können Reflexionen, Interferenzen und Richtungsanteile diesen Zusammenhang komplizierter machen.

Eine Erhöhung um etwa 3 dB bedeutet unter vergleichbaren Bedingungen fast die doppelte Intensität oder Energie. Die Schalldruckamplitude steigt dabei nur um ungefähr 41 Prozent.

### Wahrgenommene Lautheit

Lautheit ist eine Empfindungsgröße. Sie hängt vom Pegel ab, aber auch von Frequenzspektrum, Dauer, zeitlichem Verlauf, Hörumgebung und individuellem Gehör.

Ein Anstieg um 10 dB wird oft als ungefähr doppelt so laut beschrieben. Das ist eine Faustregel. Ein tiefer Brummton und ein breitbandiges Geräusch folgen bei gleichem SPL nicht zwingend derselben Wahrnehmung.

[Sind 3 dB doppelt so laut? Schallenergie und Lautheit](/de/artikel/sind-3-db-doppelt-so-laut/)

## Frequenzbewertungen verändern den angezeigten Wert

Der Schalldruck am Mikrofon kann vor der Pegelberechnung frequenzabhängig bewertet werden.

Die A-Bewertung schwächt tiefe Frequenzen und Teile des sehr hohen Frequenzbereichs ab. Sie wird häufig bei Umwelt- und Arbeitsplatzlärm verwendet. Die C-Bewertung lässt mehr tieffrequente Energie in das Ergebnis einfließen. Die Z-Bewertung ist innerhalb des festgelegten Gerätebereichs annähernd ungefiltert. [IEC 61672][4]

Das physikalische Schallereignis bleibt gleich. Der Zahlenwert ändert sich, weil die Frequenzen unterschiedlich gewichtet werden.

Bezeichnungen wie \(L_{Aeq}\), \(L_{AFmax}\) und \(L_{Cpeak}\) liefern mehr Information als dB allein:

- \(L_{Aeq}\) ist ein A-bewerteter energieäquivalenter Mittelungspegel
- \(L_{AFmax}\) ist der höchste A-bewertete Pegel mit Fast-Zeitbewertung
- \(L_{Cpeak}\) ist ein C-bewerteter Spitzenpegel

Sie beantworten verschiedene Fragen.

[dB und dBA: Was ist der Unterschied?](/de/artikel/db-und-dba-unterschied/)

## Eine Live-Anzeige ist kein einzelner Druckwert

Ein Mikrofon liefert sehr viele Abtastwerte pro Sekunde. Die sichtbare dB-Anzeige basiert normalerweise auf einem RMS-Fenster oder einer definierten Zeitbewertung. Sie ist nicht der Dezibelwert einer einzelnen Probe.

Professionelle Schallpegelmessgeräte verwenden unter anderem die Zeitbewertungen Fast und Slow. Apps können stattdessen kurze gleitende Fenster, zusätzliche Glättung oder herstellerspezifische Audioverarbeitung einsetzen. Zwei Anzeigen können daher unterschiedlich reagieren, obwohl sie dasselbe Mikrofonsignal erhalten.

Die Bildschirmaktualisierung ist ebenfalls etwas anderes als die interne Abtastrate. Eine App kann das Signal mit 44,1 kHz erfassen, den Pegel über ein längeres Zeitfenster berechnen und den sichtbaren Wert nur einige Male pro Sekunde erneuern.

## Warum ein Smartphone nicht automatisch normgerechten SPL misst

Die Bezeichnung "SPL" auf dem Bildschirm weist keine Messgenauigkeit nach. Für ein belastbares Ergebnis muss das komplette Messsystem betrachtet werden.

Bei einem Smartphone können unter anderem diese Faktoren eine Abweichung verursachen:

- Mikrofontyp und Frequenzgang des Geräts
- automatische Verstärkungsregelung und Signalverarbeitung
- fehlende oder unpassende Kalibrierung
- Position und Ausrichtung des Telefons
- Hülle, Staub oder eine verdeckte Mikrofonöffnung
- Wind und Reflexionen
- Kompression oder Übersteuerung bei hohen Pegeln
- Frequenzbewertung, Mittelungsfenster und Zeitbewertung der App

Oberhalb von ungefähr 90 dB können viele Smartphone-Mikrofone und Eingangsstufen an ihre Grenzen kommen. Der genaue Übersteuerungspunkt ist modellabhängig. Ein scheinbar stabiler Höchstwert kann daher bedeuten, dass die Elektronik komprimiert oder begrenzt, nicht dass der reale Schallpegel unverändert bleibt.

Normgerechte Schallpegelmessgeräte werden als vollständige Systeme geprüft. IEC 61672 unterscheidet unter anderem Geräte der Klasse 1 und Klasse 2. Eine sorgfältige Messmethode verbessert die Wiederholbarkeit eines Smartphones, ersetzt aber keine Geräteprüfung. [IEC 61672][4] [TRLV Lärm Teil 2][5]

## Was zu einer nachvollziehbaren SPL-Angabe gehört

Ein einzelner Zahlenwert reicht selten aus. Eine brauchbare Dokumentation nennt mindestens:

- Frequenzbewertung
- Mittelungsart oder Zeitbewertung
- Messdauer
- Mikrofonposition und Abstand
- Kalibrierungsstatus
- mögliche Übersteuerung

"68 dB im Raum" ist schwer einzuordnen. Ein A-bewerteter energieäquivalenter Pegel über 15 Minuten an einer festgelegten Sitzposition beschreibt die Messung deutlich genauer.

Bei amtlichen, arbeitsrechtlichen oder sicherheitskritischen Fragestellungen gelten zusätzlich die jeweils vorgeschriebenen Messverfahren und Anforderungen an das Messgerät. Smartphone-Werte sind dafür ohne validierte Gesamtkette nicht ausreichend.

## Mit dBcheck an einer festen Position messen

dBcheck kann geschätzte Schalldruckpegel und Veränderungen sichtbar machen. Für Vergleiche sollte das Telefon immer gleich ausgerichtet sein, die Mikrofonöffnung frei bleiben und der Abstand zur Quelle dokumentiert werden. Die Messdauer und Frequenzbewertung sollten ebenfalls übereinstimmen. Ohne validierte Hardware und Kalibrierung bleibt der absolute Wert ein Näherungswert.

## Quellen

1. NIST, *Guide to the SI, Chapter 8*. [https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-8](https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-8)
2. BIPM, *The International System of Units (SI Brochure), 9th edition*. [https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf](https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf)
3. Umweltbundesamt, *Messgrößen und Pegel*. [https://www.umweltbundesamt.de/messgroessen-pegel](https://www.umweltbundesamt.de/messgroessen-pegel)
4. IEC 61672-1:2013, offizielle Publikationsseite. [https://webstore.iec.ch/en/publication/5708](https://webstore.iec.ch/en/publication/5708)
5. Bundesanstalt für Arbeitsschutz und Arbeitsmedizin, *TRLV Lärm, Teil 2: Messung von Lärm*. [https://www.baua.de/DE/Angebote/Regelwerk/TRLV/pdf/TRLV-Laerm-Teil-2.pdf?__blob=publicationFile](https://www.baua.de/DE/Angebote/Regelwerk/TRLV/pdf/TRLV-Laerm-Teil-2.pdf?__blob=publicationFile)

[1]: https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-8
[2]: https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf
[3]: https://www.umweltbundesamt.de/messgroessen-pegel
[4]: https://webstore.iec.ch/en/publication/5708
[5]: https://www.baua.de/DE/Angebote/Regelwerk/TRLV/pdf/TRLV-Laerm-Teil-2.pdf?__blob=publicationFile
