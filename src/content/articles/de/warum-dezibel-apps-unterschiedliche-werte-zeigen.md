---
title: "Warum zeigen Dezibel-Apps unterschiedliche Werte?"
description: "Warum Dezibel-Apps unterschiedliche Werte anzeigen und welche Rolle Mikrofon, Kalibrierung, Frequenzbewertung, Mittelung und Android-Verarbeitung spielen."
slug: "warum-dezibel-apps-unterschiedliche-werte-zeigen"
locale: "de"
translationKey: "why-decibel-meter-apps-show-different-results"
clusterKey: "smartphone"
primaryIntent: "Nutzer möchten verstehen, warum zwei Dezibel-Apps oder Smartphones bei derselben Geräuschquelle unterschiedliche Messwerte anzeigen."
contentCluster: "Schallmessung mit dem Smartphone"
researchSources:

- "Android Developers, AutomaticGainControl API reference"
- "Android Developers, MediaRecorder.AudioSource API reference"
- "Murphy and King, Testing the accuracy of smartphones and sound level meter applications"
- "Celestina, Kardous, and Trost, Evaluation of directional response"
- "McLennon et al., Evaluation of smartphone sound level meter applications"
- "Khan et al., Evaluating the Accuracy of Android Applications"
publishedAt: "2026-07-12"
lastReviewed: "2026-07-12"

---

68 dB(A) auf dem einen Display, 74 dB(A) auf dem anderen. Solche Unterschiede sind bei Smartphone-Messungen möglich, ohne dass eine der Apps zwingend defekt ist.

Mikrofon, Android-Audioquelle, Kalibrierung, Frequenzbewertung und Mittelungszeit können die Anzeige jeweils verschieben. Erst wenn Gerät, Position, Messdauer und Messgröße übereinstimmen, lässt sich beurteilen, ob zwei Apps wirklich voneinander abweichen. [Murphy und King][3]

[Wie genau sind Dezibel-Apps?](/de/artikel/sind-dezibel-apps-genau/)

## Die Apps messen möglicherweise nicht dieselbe Größe

Auf beiden Displays steht "dB". Hinter den Zahlen können trotzdem andere Berechnungen stecken.

Eine App zeigt beispielsweise einen momentanen A-bewerteten Schallpegel mit schneller Zeitbewertung an. Eine andere berechnet einen gleitenden RMS-Wert über mehrere Hundert Millisekunden. Eine dritte stellt den energieäquivalenten Dauerschallpegel über die gesamte Messung dar.

Für einen aussagekräftigen Wert sollten mindestens folgende Angaben bekannt sein:

* Frequenzbewertung, etwa A, C oder Z
* Zeitbewertung oder Länge des Mittelungsfensters
* Messgröße, etwa aktueller Wert, Mittelwert, Maximum oder Peak
* verwendete Kalibrierung

Fehlen diese Informationen, lassen sich zwei Zahlen auf dem Bildschirm kaum seriös miteinander vergleichen. Das ist einer der häufigsten Gründe, warum Dezibel-Apps verschiedene Ergebnisse liefern.

## A-, C- und Z-Bewertung führen zu anderen Ergebnissen

Die Frequenzbewertung bestimmt, wie stark tiefe, mittlere und hohe Frequenzen in den angezeigten Gesamtwert eingehen.

Die A-Bewertung schwächt vor allem tiefe Frequenzen stark ab. Sie wird häufig verwendet, wenn Geräuschbelastungen im Alltag, in der Umwelt oder am Arbeitsplatz beurteilt werden. Die C-Bewertung berücksichtigt tieffrequente Schallanteile stärker. Bei der Z-Bewertung erfolgt innerhalb des vorgesehenen Frequenzbereichs keine A- oder C-typische Anpassung.

Bei einem basslastigen Geräusch, etwa einer Musikanlage, einem vorbeifahrenden Lkw oder einer Lüftungsanlage, kann der Wert in dB(C) deshalb klar höher sein als in dB(A). Bei breitbandigem Schall ohne ausgeprägten Tieftonanteil fällt der Unterschied oft kleiner aus.

Ein A-bewerteter Messwert einer App darf nicht direkt mit einem C-bewerteten oder unbewerteten Wert einer anderen App verglichen werden.

[dB und dB(A): Was ist der Unterschied?](/de/artikel/db-und-dba-unterschied/)

## Die Zeitbewertung verändert die Anzeige

Geräusche bleiben selten konstant. Selbst ein scheinbar gleichmäßiges Lüfter- oder Verkehrsgeräusch schwankt fortlaufend. Jede App muss daher festlegen, wie schnell ihre Anzeige auf Veränderungen reagiert.

Eine schnelle Zeitbewertung folgt kurzen Pegeländerungen relativ direkt. Eine langsame Zeitbewertung glättet die Schwankungen und sorgt für eine ruhigere Anzeige. Manche Anwendungen orientieren sich an standardisierten Zeitbewertungen, andere verwenden eigene Mittelungsfenster oder eine zusätzliche visuelle Glättung.

Bei einem kurzen lauten Geräusch kann die schnellere App vorübergehend einen höheren Wert anzeigen. Eine stärker geglättete App reagiert später und erreicht möglicherweise einen niedrigeren Maximalwert. Beide Anzeigen können zur jeweils verwendeten Berechnung passen.

Auch die Bildwiederholrate der Anzeige ist nicht mit der eigentlichen Zeitbewertung gleichzusetzen. Eine App kann intern viele Werte pro Sekunde berechnen, die Zahl auf dem Display aber nur einige Male pro Sekunde aktualisieren.

## RMS, Mittelwert, Maximum und Peak sind nicht dasselbe

Ein weiterer häufiger Grund für eine dB-App-Abweichung ist die dargestellte Messgröße.

Ein RMS-Wert beschreibt die effektive Stärke eines schwankenden Signals innerhalb eines festgelegten Zeitraums. Ein aktueller Schallpegel basiert häufig auf einer solchen Effektivwertberechnung oder auf einer zeitbewerteten Variante davon.

Der energieäquivalente Dauerschallpegel, häufig als LAeq bezeichnet, fasst die Schallenergie über einen längeren Zeitraum zusammen. Er ist kein gewöhnlicher arithmetischer Mittelwert der sichtbaren dB-Zahlen.

Ein Maximum ist der höchste zeitbewertete Messwert innerhalb einer Messung. Das Ergebnis hängt davon ab, welche Frequenz- und Zeitbewertung verwendet wurde.

Ein Peak-Wert erfasst dagegen einen sehr kurzen Druckverlauf. Er kann weit über einem Maximum mit schneller oder langsamer Zeitbewertung liegen. Gerade bei solchen kurzen Spitzen sind Smartphone-Messungen besonders unsicher. Mikrofone und interne Signalverarbeitung können den Eingang komprimieren oder begrenzen, bevor die App den Peak berechnet.

Zeigt eine App den aktuellen RMS-Wert und eine andere das Maximum der gesamten Sitzung, können beide Zahlen korrekt berechnet sein und trotzdem weit auseinanderliegen.

[Was ist der Schalldruckpegel? SPL einfach erklärt](/de/artikel/was-ist-schalldruckpegel/)

## Unterschiedliche Kalibrierungen verschieben den Messwert

Ein Smartphone liefert der App zunächst nur einen digitalen Audiosignalpegel. Damit daraus ein geschätzter Schalldruckpegel in Dezibel wird, benötigt die Anwendung eine Umrechnung oder Kalibrierung.

Je nach App kann diese auf unterschiedlichen Grundlagen beruhen:

* einem allgemeinen Umrechnungswert
* einem Profil für bestimmte Smartphone-Modelle
* einem manuell eingestellten Korrekturwert
* einer gespeicherten Vergleichsmessung mit einem Referenzgerät
* keiner belastbaren akustischen Kalibrierung

Verwendet eine App beispielsweise einen Korrekturwert von plus 4 dB und eine andere keinen Offset, bleiben ihre Ergebnisse unter ähnlichen Bedingungen etwa 4 dB voneinander entfernt.

Ein gerätespezifisches Profil kann die Messung verbessern, garantiert aber nicht, dass jedes einzelne Exemplar eines Smartphone-Modells exakt der hinterlegten Korrektur entspricht. Fertigungstoleranzen, Verschmutzung, ein beschädigtes Mikrofon, eine Schutzhülle, ein Betriebssystem-Update oder eine geänderte Audioquelle können das Ergebnis beeinflussen.

Eine Einpunktkalibrierung behebt außerdem nicht automatisch frequenzabhängige Fehler. Eine App kann bei 1.000 Hz gut passen und bei tiefen oder hohen Frequenzen trotzdem stark abweichen.

[So kalibrieren Sie eine Dezibel-App](/de/artikel/dezibel-app-kalibrieren/)

## Android-Apps können verschiedene Mikrofonsignale erhalten

Auf Android können Apps unterschiedliche Audioquellen anfordern. Welches Signal tatsächlich geliefert wird, hängt sowohl von der Auswahl der App als auch von der Umsetzung des jeweiligen Smartphone-Herstellers ab.

Android beschreibt die automatische Verstärkungsregelung, Automatic Gain Control oder AGC, als eine Signalverarbeitung, die den Mikrofonpegel anhebt oder absenkt, um die Ausgangslautstärke annähernd konstant zu halten. Für Sprache und Telefonate ist das hilfreich. Für eine Schallpegelmessung kann es jedoch problematisch sein, weil die digitale Signalamplitude dann nicht mehr gleichmäßig mit dem realen Schalldruck ansteigt. [Android AGC][1]

Android bietet außerdem die Audioquelle `UNPROCESSED` an. Sie ist jedoch nicht auf jedem Gerät verfügbar. Laut offizieller Android-Dokumentation kann die Anfrage auf die Standardquelle zurückfallen, wenn das Smartphone keine unverarbeitete Audioaufnahme unterstützt. Die Auswahl von `UNPROCESSED` garantiert deshalb nicht auf jedem Modell ein vollständig unbearbeitetes Mikrofonsignal. [Android-Audioquelle][2]

Eine andere App kann eine für Sprachkommunikation vorgesehene Quelle verwenden, bei der Echo-Unterdrückung, Rauschunterdrückung oder automatische Pegelanpassung aktiv sind. Dadurch können selbst zwei Apps auf demselben Smartphone bereits unterschiedliche Signale erhalten, bevor ihre eigenen Berechnungen beginnen.

## Die automatische Verstärkung kann sich während der Messung verändern

AGC wirkt nicht unbedingt wie ein fester Kalibrierungsfehler. Die Verstärkung kann sich laufend an die Lautstärke anpassen.

Bei leisem Schall kann das System den Mikrofonpegel anheben. Bei lauten Geräuschen kann es die Verstärkung reduzieren oder das Signal komprimieren. Auf dem Display erscheint der Unterschied zwischen leisen und lauten Geräuschen dann kleiner, als er akustisch tatsächlich ist.

Das erklärt auch, warum zwei Apps bei einem moderaten Pegel nahezu dasselbe anzeigen, bei höheren Pegeln aber immer weiter auseinanderliegen. Eine Anwendung kann einen weniger stark bearbeiteten Eingang nutzen, während die andere ein Signal mit aktiver Verstärkungsregelung erhält.

Eine Kalibrierung bei nur einem Pegel kann eine dynamisch veränderte Verstärkung nicht korrigieren.

## Mikrofone unterscheiden sich von Smartphone zu Smartphone

Wer zwei Apps auf verschiedenen Geräten vergleicht, verändert gleichzeitig die Software und die Hardware. Die Mikrofon-Unterschiede beim Handy können erheblich sein.

Smartphone-Modelle unterscheiden sich unter anderem bei:

* Mikrofonempfindlichkeit
* Frequenzgang
* Form und Position der Mikrofonöffnung
* Auswahl des aktiven Mikrofons
* Eigenrauschen
* maximal verarbeitbarem Schalldruck
* analoger Vorverstärkung
* herstellerspezifischer Signalverarbeitung

In einer Untersuchung mit 100 Smartphones fanden Murphy und King große Unterschiede zwischen einzelnen Geräten. [Murphy und King][3]

Weitere Studien mit Android-Geräten zeigen, dass die Genauigkeit von App, Smartphone, Frequenz, Signalart und Schallpegel abhängt. Manche getesteten Anwendungen unterschätzten Pegel im Bereich von 90 dB(A). Eine App kann bei breitbandigem Rauschen vergleichsweise gut abschneiden und bei einzelnen Tönen wesentlich schlechter, während es bei einer anderen App umgekehrt sein kann. [McLennon et al.][5] [Khan et al.][6]

Ergebnisse eines einzelnen Modells lassen sich daher nicht auf alle Geräte derselben Marke übertragen.

## Bei hohen Pegeln stoßen Smartphone-Mikrofone an Grenzen

Smartphone-Mikrofone sind vor allem für Sprache, Telefonate und Videoaufnahmen ausgelegt. Sie sind keine kalibrierten Messmikrofone.

Bei vielen Geräten werden Messungen oberhalb von etwa 90 dB zunehmend unsicher. Der genaue Punkt hängt vom Smartphone, der verwendeten Audioquelle und der internen Signalverarbeitung ab. Das Mikrofon kann übersteuern, die Elektronik kann das Signal begrenzen oder eine automatische Verarbeitung kann laute Pegel komprimieren.

Eine Schallpegel-App kann ungenau wirken, obwohl das eigentliche Problem bereits im Eingangssignal entstanden ist. Sobald das Mikrofon übersteuert oder der Pegel begrenzt wurde, kann die App den ursprünglichen Schalldruck nicht mehr rekonstruieren.

Eine stabil angezeigte Zahl mit einer Nachkommastelle bedeutet deshalb nicht, dass der Wert auch auf 0,1 dB genau ist. Die Nachkommastelle beschreibt lediglich die Darstellung.

## Apps unterscheiden sich bei Abtastrate und Berechnung

Auch bei identischem Eingangssignal können die internen Rechenverfahren voneinander abweichen.

Mögliche Unterschiede betreffen:

* Abtastrate der Audioaufnahme
* Umrechnung zwischen verschiedenen Abtastraten
* Länge des RMS-Fensters
* Umsetzung der A-, C- oder Z-Filter
* Aktualisierungsintervall
* Glättung der Anzeige
* Behandlung sehr leiser Abschnitte
* Erkennung und Behandlung von Ausreißern
* Maximum-Hold-Funktion
* Erkennung von Übersteuerung
* Umrechnung vom digitalen Signalpegel zum geschätzten Schalldruckpegel

Untersuchungen zeigen, dass Unterschiede in den Berechnungsverfahren der Apps ebenso groß oder sogar größer sein können als die Unterschiede zwischen zwei Smartphones. [Murphy und King][3]

## Position und Ausrichtung beeinflussen die Messung

Selbst korrekt konfigurierte Apps liefern keine vergleichbaren Ergebnisse, wenn das Smartphone zwischen den Messungen anders positioniert wird.

Schon kleine Änderungen können das am Mikrofon ankommende Signal verändern:

* Das Gerät wird gedreht.
* Eine Hand verdeckt die Mikrofonöffnung.
* Die Schutzhülle dämpft oder reflektiert Schall.
* Das Smartphone liegt einmal auf einem Tisch und einmal auf einem weichen Sofa.
* Der Abstand zur Geräuschquelle verändert sich.
* Eine App wird mit der Unterkante, eine andere mit der Oberkante des Geräts zur Schallquelle getestet.

Studien zur Richtwirkung von Smartphone-Mikrofonen zeigen, dass Ausrichtung und Handhabung die Messung beeinflussen können. [Celestina et al.][4]

Wer die Apps nacheinander statt gleichzeitig testet, muss außerdem berücksichtigen, dass sich das Geräusch selbst verändert. Straßenverkehr, Gespräche, Musik, Haushaltsgeräte oder Aktivitäten in einem Raum sind selten über mehrere Minuten vollkommen konstant.

Viele Smartphones erlauben nicht, dass zwei Anwendungen gleichzeitig auf das Mikrofon zugreifen. Für einen nacheinander durchgeführten Vergleich ist daher eine möglichst gleichmäßige Schallquelle erforderlich.

## Kleine Abweichungen sind häufig normal

Eine Differenz von 1 oder 2 dB kann durch Rundung, Zeitbewertung, Kalibrierung, Positionierung oder gewöhnliche Pegelschwankungen entstehen. Sie kann kleiner sein als die Messunsicherheit beider Smartphone-Systeme.

Auch eine größere Abweichung verrät allein noch nicht, welche App näher am tatsächlichen Wert liegt. Zunächst sollten die Einstellungen und die Messbedingungen angeglichen werden.

Besondere Vorsicht ist geboten, wenn ein Wert in der Nähe einer arbeitsrechtlichen, behördlichen, rechtlichen oder gesundheitlich relevanten Grenze liegt. Eine nicht validierte Smartphone-App sollte nicht darüber entscheiden, ob ein Grenzwert eingehalten wurde. Das gilt auch dann, wenn zwei Apps zufällig denselben Wert anzeigen.

Für orientierende Messungen, Vergleiche am selben Ort oder das Erkennen klarer Veränderungen können Dezibel-Apps dennoch nützlich sein. Sie ersetzen jedoch kein kalibriertes Schallpegelmessgerät, wenn belastbare oder rechtlich verwertbare Ergebnisse erforderlich sind.

## So vergleichen Sie zwei Dezibel-Apps möglichst fair

Für einen brauchbaren Vergleich sollte der Versuchsaufbau möglichst konstant bleiben:

1. Verwenden Sie nach Möglichkeit dasselbe Smartphone für beide Apps.
2. Nutzen Sie ein gleichmäßiges, breitbandiges Geräusch statt Sprache oder einzelner kurzer Geräusche.
3. Befestigen Sie das Smartphone auf einem Ständer.
4. Verändern Sie Schutzhülle, Ausrichtung, Abstand und Raumposition nicht.
5. Stellen Sie in beiden Apps dieselbe Frequenzbewertung ein.
6. Verwenden Sie dieselbe Zeitbewertung oder Mittelungsdauer.
7. Vergleichen Sie dieselbe Messgröße, beispielsweise LAeq über 60 Sekunden.
8. Setzen Sie Maximum, Mittelwert und Sitzungsstatistik vor jedem Durchlauf zurück.
9. Notieren Sie vorhandene Kalibrierungswerte und die gewählte Audioquelle.
10. Wiederholen Sie den Test nach Möglichkeit bei mehreren Lautstärken.
11. Prüfen Sie, ob eine App Übersteuerung oder Clipping meldet.
12. Führen Sie mehrere Messdurchgänge durch. Ein einzelner Wert reicht nicht.

Wird ein genauer Referenzwert benötigt, sollten beide Apps mit einem korrekt kalibrierten Schallpegelmessgerät verglichen werden. Eine der beiden Smartphone-Apps als vermeintlich richtige Referenz festzulegen, führt leicht zu falschen Schlussfolgerungen.

## Erst die Einstellungen vergleichen, dann die Zahlen

Bei dBcheck sollten Smartphone-Position, Frequenzbewertung, Messdauer und Kalibrierungszustand dokumentiert werden. Beim Vergleich mit einer anderen App muss zuerst geklärt werden, ob beide Anwendungen tatsächlich dieselbe Messgröße berechnen.

Das Ziel besteht nicht darin, zwei Anzeigen unter allen Umständen auf denselben Wert zu bringen. Entscheidend ist, ob die Ergebnisse unter kontrollierten Bedingungen ausreichend nah beieinanderliegen, um eine begrenzte Orientierungs- oder Vergleichsaufgabe zu erfüllen.

## Quellen

1. Android Developers, *AutomaticGainControl API reference*. https://developer.android.com/reference/kotlin/android/media/audiofx/AutomaticGainControl
2. Android Developers, *MediaRecorder.AudioSource API reference*. https://developer.android.com/reference/kotlin/android/media/MediaRecorder.AudioSource
3. Murphy und King, *Testing the accuracy of smartphones and sound level meter applications for measuring environmental noise*. https://doi.org/10.1016/j.apacoust.2015.12.012
4. Celestina, Kardous und Trost, *Smartphone-based sound level measurement apps: Evaluation of directional response*. https://doi.org/10.1016/j.apacoust.2020.107673
5. McLennon et al., *Evaluation of smartphone sound level meter applications as a reliable tool for noise monitoring*. https://pubmed.ncbi.nlm.nih.gov/31356145/
6. Khan et al., *Evaluating the Accuracy of Android Applications in Monitoring Environmental Noise Levels*. https://doi.org/10.7759/cureus.81471

[1]: https://developer.android.com/reference/kotlin/android/media/audiofx/AutomaticGainControl
[2]: https://developer.android.com/reference/kotlin/android/media/MediaRecorder.AudioSource
[3]: https://doi.org/10.1016/j.apacoust.2015.12.012
[4]: https://doi.org/10.1016/j.apacoust.2020.107673
[5]: https://pubmed.ncbi.nlm.nih.gov/31356145/
[6]: https://doi.org/10.7759/cureus.81471
