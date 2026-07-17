---
title: "Was ist ein Dezibel? Schallpegel einfach erklärt"
description: "Was Dezibel messen, warum die dB-Skala logarithmisch ist, wie sich dB und dB(A) unterscheiden und was typische Pegeländerungen bedeuten."
slug: "was-ist-ein-dezibel"
locale: "de"
translationKey: "what-is-a-decibel"
clusterKey: "fundamentals"
primaryIntent: "Die Leserin oder der Leser möchte verstehen, was ein Dezibel ist und wie Schallpegel richtig eingeordnet werden."
contentCluster: "Dezibel-Grundlagen"
researchSources:
  - "BIPM, The International System of Units (SI Brochure), 9th edition"
  - "Umweltbundesamt, Grundlagen der Akustik"
  - "Umweltbundesamt, Dezibel und Pegelsummation"
  - "NIST Guide to the SI, Chapter 8"
  - "IEC 61672-1:2013, offizielle Publikationsseite"
  - "BAuA, Lärm und LärmVibrationsArbSchV"
  - "BAuA, TRLV Lärm Teil 2: Messung von Lärm"
publishedAt: "2026-07-12"
lastReviewed: "2026-07-15"
---

Ein Dezibel, abgekürzt dB, ist keine eigenständige Menge wie ein Meter oder ein Kilogramm. Es beschreibt ein logarithmisches Verhältnis zwischen einem Messwert und einem festgelegten Bezugswert. Bei einem Schallpegelmesser ist damit meist der Schalldruckpegel in Luft gemeint, bezogen auf 20 Mikropascal. Ohne diese Information bleibt eine Angabe wie 70 dB unvollständig. [BIPM][1] [UBA Grundlagen][2]

Das erklärt mehrere scheinbare Widersprüche. 0 dB bedeutet nicht völlige Stille. Auch negative dB-Werte sind möglich. Und zwei Schallquellen mit jeweils 60 dB ergeben zusammen normalerweise nicht 120 dB.

[Warum ist die Dezibelskala logarithmisch?](/de/artikel/warum-ist-die-dezibelskala-logarithmisch/)

## Was ein Dezibel tatsächlich vergleicht

Ein Dezibel gibt ein Verhältnis an. Der gemessene Wert wird mit einer definierten Referenz verglichen und anschließend logarithmisch dargestellt.

Für leistungsähnliche Größen, etwa Schallintensität oder Schallenergie, gilt:

\[
L = 10\log_{10}\left(\frac{X}{X_0}\right)\ \mathrm{dB}
\]

Bei amplitudenähnlichen Größen wie dem Schalldruck lautet die Beziehung:

\[
L_p = 20\log_{10}\left(\frac{p}{p_0}\right)\ \mathrm{dB}
\]

Der Faktor 20 ist keine zweite Definition des Dezibels. Er entsteht, weil die Schallleistung unter vergleichbaren Bedingungen mit dem Quadrat des Schalldrucks zusammenhängt. [BIPM][1]

Die praktische Folge ist einfach: Ein Messgerät muss den Schalldruck nicht als sehr kleine oder sehr große Zahl in Pascal anzeigen. Es wandelt das Verhältnis in einen handlicheren Pegelwert um.

Dezibel werden deshalb auch außerhalb der Akustik verwendet, zum Beispiel in der Elektronik, Funktechnik und digitalen Audiotechnik. Dort gelten andere Bezugsgrößen. Die Schreibweise dB allein sagt noch nicht, welche physikalische Größe gemeint ist.

## Warum die Skala logarithmisch ist

Der nutzbare Schalldruckbereich umfasst viele Größenordnungen. Für Luftschall liegt der Bezugswert bei 20 Mikropascal. Ein Schalldruck von 2 Pascal entspricht 100 dB SPL, 20 Pascal entsprechen 120 dB SPL. Zwischen 20 Mikropascal und 20 Pascal liegt ein Druckverhältnis von eins zu einer Million, auf der Dezibelskala sind es 120 dB. [BIPM][1]

Eine lineare Anzeige wäre dafür unpraktisch. Die logarithmische Skala verdichtet den großen Wertebereich und macht Verhältnisse vergleichbar.

Sie verändert außerdem die Rechenregeln. Multiplikation auf der physikalischen Ebene wird zur Addition von Pegeldifferenzen. Genau deshalb lassen sich dB-Werte nicht wie gewöhnliche Zahlen addieren.

Das Umweltbundesamt nennt ein anschauliches Beispiel: Zwei gleich laute, voneinander unabhängige Schallquellen mit jeweils 50 dB ergeben zusammen etwa 53 dB, nicht 100 dB. [UBA Pegelsummation][3]

## Schalldruckpegel kurz erklärt

Schall in Luft besteht aus kleinen Druckschwankungen um den jeweiligen Luftdruck. Ein Mikrofon erfasst diese Schwankungen und wandelt sie in ein elektrisches Signal um.

Der Schalldruck wechselt dabei ständig zwischen positiven und negativen Werten. Ein einfacher arithmetischer Mittelwert würde deshalb gegen null gehen, selbst wenn ein deutliches Geräusch vorhanden ist. Für den Schalldruckpegel wird stattdessen ein Effektivwert verwendet, meist der quadratische Mittelwert mit anschließender Wurzelbildung.

Für Luftschall gilt:

\[
L_p = 20\log_{10}\left(\frac{p_{\mathrm{rms}}}{20\ \mu\mathrm{Pa}}\right)\ \mathrm{dB}
\]

0 dB SPL bedeutet, dass der Effektivwert des Schalldrucks dem Bezugswert von 20 Mikropascal entspricht. Das ist keine universelle biologische Hörgrenze. Die Hörschwelle hängt unter anderem von der Frequenz, den Messbedingungen und dem individuellen Gehör ab. [NIST SI Guide][4]

[Was ist der Schalldruckpegel? SPL erklärt](/de/artikel/was-ist-schalldruckpegel/)

## Warum dB und dB(A) nicht dasselbe sind

Zusätzliche Buchstaben zeigen, wie das Mikrofonsignal vor der Pegelberechnung bewertet wurde.

Die Schreibweisen dBA und dB(A) stehen für die A-Bewertung. Dieser standardisierte Frequenzfilter schwächt tiefe Frequenzen und Teile des sehr hohen Frequenzbereichs ab. A-bewertete Werte werden häufig für Umweltlärm und Lärmexposition am Arbeitsplatz verwendet. [BAuA Lärm][5] [IEC 61672][6]

Die A-Bewertung bildet das menschliche Hören nicht vollständig nach. Sie ist eine feste Kurve. Wahrgenommene Lautheit hängt zusätzlich vom Ausgangspegel, vom Frequenzspektrum, von der Dauer, vom zeitlichen Verlauf und vom Gehör der jeweiligen Person ab.

Die C-Bewertung lässt deutlich mehr tieffrequente Anteile in das Ergebnis einfließen und wird unter anderem für hohe Pegel und Spitzenpegel verwendet. Die Z-Bewertung verzichtet innerhalb des spezifizierten Frequenzbereichs weitgehend auf eine solche Frequenzformung. Dasselbe Geräusch kann daher unterschiedliche Werte in dB(A), dB(C) und dB(Z) liefern.

[dB und dBA: Was ist der Unterschied?](/de/artikel/db-und-dba-unterschied/)

## Was eine Änderung um 3 dB bedeutet

Eine Zunahme um ungefähr 3 dB entspricht unter vergleichbaren Bedingungen fast einer Verdopplung der akustischen Intensität beziehungsweise Energie. Exakt liegt die Verdopplung bei rund 3,01 dB.

Der Schalldruck selbst verdoppelt sich dabei nicht. Seine Amplitude steigt um den Faktor

\[
10^{3/20} \approx 1{,}41
\]

also um etwa 41 Prozent.

Auch die wahrgenommene Lautheit verdoppelt sich nicht. Ein Unterschied von 3 dB kann messbar und hörbar sein, wirkt für viele Hörerinnen und Hörer aber nur mäßig größer. Frequenzspektrum, Ausgangspegel und Art des Geräuschs verändern den Eindruck.

Zwei unabhängige Schallquellen mit gleichem Pegel erhöhen den Gesamtpegel meist um etwa 3 dB. Das gilt nicht ohne Einschränkung für kohärente Töne. Dort können Phase und Mikrofonposition zu stärkerer Addition oder zu Auslöschung führen.

## Was eine Änderung um 10 dB bedeutet

Eine Zunahme um 10 dB entspricht der zehnfachen akustischen Intensität beziehungsweise Energie. Die Schalldruckamplitude steigt um ungefähr den Faktor 3,16.

Als Faustregel wird ein Anstieg um 10 dB häufig als ungefähr doppelt so laut wahrgenommen. Die BAuA verwendet diese Einordnung in ihren Informationsmaterialien ebenfalls als Näherung. Sie ist keine exakte Umrechnung für jedes Geräusch und jede Person. [BAuA Gehörerhaltung][7]

Ein tieffrequentes Brummen, ein kurzer Ton, Musik und breitbandiger Maschinenlärm können trotz gleicher Pegeldifferenz unterschiedlich wirken. Eine feste Wahrnehmungsformel gibt es nicht.

[Sind 3 dB doppelt so laut? Schallenergie und Lautheit](/de/artikel/sind-3-db-doppelt-so-laut/)

## Warum die Dauer bei Lärmexposition zählt

Ein Schallpegel allein beschreibt nicht die gesamte Lärmexposition. Die Dauer gehört dazu, weil sich Schallenergie über die Zeit summiert.

Für Arbeitsplätze in Deutschland verwendet die LärmVibrationsArbSchV den auf acht Stunden bezogenen Tages-Lärmexpositionspegel \(L_{EX,8h}\). Die unteren und oberen Auslösewerte liegen bei 80 beziehungsweise 85 dB(A). Das sind rechtlich definierte Auslösewerte für Schutzmaßnahmen, keine allgemeingültige Trennlinie zwischen harmlos und gefährlich. [BAuA Lärm][5]

Die energetische Beziehung bleibt dabei entscheidend: Steigt ein gleichartiger Pegel um 3 dB, wird dieselbe Schallenergie in ungefähr der halben Zeit erreicht. Rechnerisch entsprechen 85 dB(A) über acht Stunden derselben Energie, die bei 88 dB(A) in vier Stunden und bei 91 dB(A) in zwei Stunden erreicht wird. Diese Beispiele zeigen gleiche Energie, keine pauschal zulässigen Aufenthaltszeiten. Die konkrete Gefährdungsbeurteilung folgt der LärmVibrationsArbSchV und den TRLV Lärm. [TRLV Lärm Teil 2][8]

[Wie laut ist zu laut? Schallpegel, Dauer und Gehörrisiko](/de/artikel/welcher-dezibelwert-ist-sicher/)

## Wie Schallpegel in der Praxis gemessen werden

Eine Messung besteht aus mehreren Schritten. Das Mikrofon erfasst die Druckschwankungen, die Software wendet gegebenenfalls eine Frequenzbewertung an und berechnet anschließend einen zeitbezogenen Pegel.

Typische Messgrößen sind:

- ein aktueller Pegel mit festgelegter Zeitbewertung
- ein energieäquivalenter Mittelungspegel über einen dokumentierten Zeitraum
- der höchste zeitbewertete Pegel innerhalb einer Messung
- ein Spitzenpegel für sehr kurze Druckereignisse

Diese Werte sind nicht austauschbar. Ein Maximum mit Zeitbewertung erfasst etwas anderes als ein physikalischer Spitzenpegel. IEC 61672 behandelt zeitbewertete, integrierende und weitere Messfunktionen deshalb getrennt. [IEC 61672][6]

Auch der Messort verändert das Ergebnis. Abstand, Ausrichtung, Reflexionen, Wind und die Position nahe einer Wand oder Tischplatte können den angezeigten Pegel verschieben.

Bei einem Smartphone kommen weitere Unsicherheiten hinzu: Mikrofonmodell, automatische Verstärkungsregelung, herstellerspezifische Signalverarbeitung, Gehäuse, Kalibrierung und mögliche Übersteuerung. Eine App kann für Orientierung und wiederholte Vergleiche nützlich sein. Sie wird dadurch aber nicht automatisch zu einem Schallpegelmessgerät der Klasse 1 oder Klasse 2.

## dB-Werte ohne Kontext führen schnell in die Irre

Eine Aussage wie "Im Zimmer wurden 68 dB gemessen" lässt zentrale Fragen offen. War der Wert A-bewertet? Handelte es sich um einen Mittelwert, ein zeitbewertetes Maximum oder einen kurzen Spitzenpegel? Wo lag das Mikrofon, wie lange dauerte die Messung und war das System kalibriert?

Aussagekräftiger wäre zum Beispiel ein A-bewerteter energieäquivalenter Pegel über 15 Minuten an einer dokumentierten Hörposition. Damit ist noch nicht jede Unsicherheit beseitigt, aber die Messung lässt sich nachvollziehen.

## Verwandte Grundlagen

- [Warum ist die Dezibelskala logarithmisch?](/de/artikel/warum-ist-die-dezibelskala-logarithmisch/)
- [Was ist der Schalldruckpegel? SPL erklärt](/de/artikel/was-ist-schalldruckpegel/)
- [dB und dBA: Was ist der Unterschied?](/de/artikel/db-und-dba-unterschied/)
- [Sind 3 dB doppelt so laut? Schallenergie und Lautheit](/de/artikel/sind-3-db-doppelt-so-laut/)

## Mit dBcheck kontrolliert vergleichen

Mit dBcheck lassen sich geschätzte Schallpegel bei verschiedenen Abständen, Raumpositionen oder Betriebszuständen vergleichen. Für belastbare Vergleiche sollten Ausrichtung, Abstand und Messdauer gleich bleiben. Smartphone-Messungen eignen sich vor allem zur Orientierung und für relative Veränderungen, nicht als Nachweis gegenüber Behörden oder als Ersatz für ein geprüftes professionelles Messsystem.

## Quellen

1. BIPM, *The International System of Units (SI Brochure), 9th edition*. [https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf](https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf)
2. Umweltbundesamt, *Grundlagen der Akustik*. [https://www.umweltbundesamt.de/themen/laerm/verbraucherservice-laerm/grundlagen-der-akustik](https://www.umweltbundesamt.de/themen/laerm/verbraucherservice-laerm/grundlagen-der-akustik)
3. Umweltbundesamt, *Dezibel und Pegelsummation*. [https://www.umweltbundesamt.de/dezibel-pegelsummation](https://www.umweltbundesamt.de/dezibel-pegelsummation)
4. NIST, *Guide to the SI, Chapter 8*. [https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-8](https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-8)
5. Bundesanstalt für Arbeitsschutz und Arbeitsmedizin, *Lärm*. [https://www.baua.de/DE/Themen/Arbeitsgestaltung/Gefaehrdungsbeurteilung/Handbuch-Gefaehrdungsbeurteilung/Expertenwissen/Physikalische-Einwirkungen/Laerm/Laerm_dossier](https://www.baua.de/DE/Themen/Arbeitsgestaltung/Gefaehrdungsbeurteilung/Handbuch-Gefaehrdungsbeurteilung/Expertenwissen/Physikalische-Einwirkungen/Laerm/Laerm_dossier)
6. IEC 61672-1:2013, offizielle Publikationsseite. [https://webstore.iec.ch/en/publication/5708](https://webstore.iec.ch/en/publication/5708)
7. Bundesanstalt für Arbeitsschutz und Arbeitsmedizin, *Safe and Sound, Ratgeber zur Gehörerhaltung in der Musik*. [https://www.baua.de/DE/Angebote/Publikationen/Praxis/A87.pdf?__blob=publicationFile&v=2](https://www.baua.de/DE/Angebote/Publikationen/Praxis/A87.pdf?__blob=publicationFile&v=2)
8. Bundesanstalt für Arbeitsschutz und Arbeitsmedizin, *TRLV Lärm, Teil 2: Messung von Lärm*. [https://www.baua.de/DE/Angebote/Regelwerk/TRLV/pdf/TRLV-Laerm-Teil-2.pdf?__blob=publicationFile](https://www.baua.de/DE/Angebote/Regelwerk/TRLV/pdf/TRLV-Laerm-Teil-2.pdf?__blob=publicationFile)

[1]: https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf
[2]: https://www.umweltbundesamt.de/themen/laerm/verbraucherservice-laerm/grundlagen-der-akustik
[3]: https://www.umweltbundesamt.de/dezibel-pegelsummation
[4]: https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-8
[5]: https://www.baua.de/DE/Themen/Arbeitsgestaltung/Gefaehrdungsbeurteilung/Handbuch-Gefaehrdungsbeurteilung/Expertenwissen/Physikalische-Einwirkungen/Laerm/Laerm_dossier
[6]: https://webstore.iec.ch/en/publication/5708
[7]: https://www.baua.de/DE/Angebote/Publikationen/Praxis/A87.pdf?__blob=publicationFile&v=2
[8]: https://www.baua.de/DE/Angebote/Regelwerk/TRLV/pdf/TRLV-Laerm-Teil-2.pdf?__blob=publicationFile
