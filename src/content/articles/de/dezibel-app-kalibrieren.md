---
title: "Dezibel-App kalibrieren: So messen Sie genauer"
description: "So kalibrieren Sie eine Dezibel-App mit Referenzmessgerät oder Messmikrofon, berechnen den Korrekturwert und erkennen die Grenzen der Smartphone-Messung."
slug: "dezibel-app-kalibrieren"
locale: "de"
translationKey: "how-to-calibrate-a-decibel-meter-app"
clusterKey: "smartphone"
primaryIntent: "Praktische Anleitung zur Verbesserung der Messgenauigkeit einer Schallpegelmesser-App."
contentCluster: "Schallmessung mit dem Smartphone"
researchSources:

- "BAuA, TRLV Lärm Teil 2: Messung von Lärm"
- "PTB, Leistungsmerkmale für Schallpegelmesser nach DIN EN 61672"
- "Kardous und Shaw, Evaluation using external microphones"
- "Celestina, Hrovat und Kardous, Evaluation of compliance with standards"
- "Serpanos et al., Accuracy in clinical rooms"
publishedAt: "2026-07-15"
lastReviewed: "2026-07-15"

---

Das Referenzgerät zeigt 74,0 dB(A), die Smartphone-App 70,5 dB(A). Unter denselben Bedingungen ergibt sich daraus ein Korrekturwert von +3,5 dB. Genau darin besteht die praktische Kalibrierung einer Dezibel-App: Die Anzeige wird an einen bekannten Wert angeglichen.

Ein solcher Offset kann einen konstanten Pegelfehler verkleinern. Er korrigiert aber weder automatische Verstärkung noch Eigenrauschen, einen ungleichmäßigen Frequenzgang oder Übersteuerung. Die Verbesserung gilt deshalb für die getestete Kombination aus Smartphone, App, Audioeingang und Pegelbereich, nicht automatisch für jede spätere Messung.

[Wie genau sind Dezibel-Apps?](/de/artikel/sind-dezibel-apps-genau/)

## Was bedeutet Kalibrieren bei einer Dezibel-App?

Im streng messtechnischen Sinn bedeutet Kalibrieren zunächst, die Anzeige eines Messgeräts unter festgelegten Bedingungen mit einem rückführbaren Referenzwert zu vergleichen und die Abweichung zu dokumentieren. Wird anschließend ein Korrekturwert in der App eingestellt, handelt es sich technisch eher um eine Justierung oder Pegelkorrektur.

In Smartphone-Apps wird trotzdem meist allgemein von Kalibrierung gesprochen.

Das Smartphone nimmt über sein Mikrofon ein digitales Audiosignal auf. Aus dessen Amplitude berechnet die App einen geschätzten Schalldruckpegel. Ohne einen bekannten akustischen Bezugspunkt kann die App jedoch nicht sicher bestimmen, welchem realen Schalldruck die digitale Signalstärke entspricht.

Zeigt das Referenzgerät beispielsweise 72 dB(A), während das Smartphone unter denselben Bedingungen 68 dB(A) anzeigt, beträgt die Abweichung 4 dB. Ein positiver Korrekturwert von 4 dB kann die Anzeigen in diesem Messbereich näher zusammenbringen.

Das ist eine Pegelanpassung, keine vollständige Prüfung des Messsystems. Bei normgerechten Schallpegelmessern werden unter anderem Frequenzbewertung, Pegellinearität, Zeitbewertung, Richtwirkung, Eigenrauschen, Übersteuerungsverhalten und Spitzenschallmessung geprüft. Die DIN EN 61672 unterscheidet dabei Schallpegelmesser der Genauigkeitsklassen 1 und 2.

## Was ein einfacher Korrekturwert verbessern kann

Ein fester Offset hilft vor allem dann, wenn die Mikrofonempfindlichkeit einen gleichbleibenden Fehler verursacht.

Liegt die App beispielsweise bei mehreren Vergleichsmessungen konstant etwa 3 dB unter dem Referenzgerät, kann eine Korrektur von +3 dB die Handy-dB-Messung innerhalb dieses geprüften Bereichs verbessern.

Ein einzelner Korrekturwert behebt dagegen nicht:

* einen Mikrofonfrequenzgang, der tiefe Töne zu niedrig und hohe Töne zu hoch bewertet
* eine automatische Verstärkungsregelung, die ihre Einstellung mit dem Schallpegel verändert
* Kompression oder Übersteuerung bei lauten Geräuschen
* erhöhtes Eigenrauschen bei sehr leisen Umgebungen
* eine fehlerhafte oder unvollständige A-, C- oder Z-Bewertung
* unterschiedliche Zeitbewertungen oder Mittelungsverfahren
* ein verdecktes oder verschmutztes Mikrofon
* kurze Impulse, Knallgeräusche oder unzureichende Spitzenwerterfassung

Die Kalibrierungsfunktion sollte daher als Korrektur für eine klar definierte Gerätekombination verstanden werden, nicht als allgemeiner Genauigkeitsnachweis.

## Welche Referenz eignet sich zur Kalibrierung?

Die Qualität der Referenz entscheidet darüber, wie aussagekräftig das Ergebnis ist.

Für eine verlässliche Kalibrierung kommen vor allem zwei Verfahren infrage:

1. Ein kompatibles externes Messmikrofon wird mit einem passenden Schallkalibrator geprüft.
2. Das eingebaute Smartphone-Mikrofon wird gleichzeitig mit einem kalibrierten Schallpegelmesser der Klasse 1 oder 2 verglichen.

Eine andere, ebenfalls unkalibrierte Lärm-App ist keine geeignete Referenz. Zwei Smartphones können nahezu denselben Wert anzeigen und trotzdem beide mehrere Dezibel vom tatsächlichen Pegel abweichen.

Auch ein YouTube-Testton, eine Audiodatei mit der Bezeichnung "94 dB" oder ein Bluetooth-Lautsprecher liefert am Messpunkt keinen bekannten Schalldruckpegel. Der tatsächliche Pegel hängt unter anderem von Lautsprecher, Lautstärkeeinstellung, Abstand, Raumakustik, Ausrichtung und Frequenzgang ab.

## Methode 1: Eingebautes Mikrofon mit einem Referenzgerät vergleichen

Ein internes Smartphone-Mikrofon lässt sich normalerweise nicht fachgerecht an einen Schallkalibrator ankoppeln. Der gleichzeitige Vergleich mit einem kalibrierten Schallpegelmesser ist deshalb die praktischere Methode.

### 1. Ein möglichst gleichmäßiges Schallfeld erzeugen

Verwenden Sie ein kontinuierliches, stabiles Geräusch in einem kontrollierbaren Raum. Breitbandiges Rauschen ist für einen allgemeinen Pegelabgleich meist besser geeignet als ein einzelner Sinuston, da ein einzelner Ton nur einen sehr kleinen Teil des Frequenzbereichs prüft.

Ungeeignet sind unter anderem:

* Sprache
* Musik mit starken Lautstärkeschwankungen
* vorbeifahrende Fahrzeuge
* Haushaltsgeräte mit wechselnden Betriebsphasen
* Türen, Schläge und andere kurze Impulse

Die Schallquelle sollte während der gesamten Vergleichsmessung unverändert bleiben.

### 2. Frequenz- und Zeitbewertung angleichen

Beide Geräte müssen dieselbe Frequenzbewertung verwenden. Zeigt die App dB(A) an, muss auch das Referenzgerät A-bewertet messen.

Auch die Zeitbewertung muss vergleichbar sein. Ein momentaner Fast-Wert der App sollte nicht mit einem Slow-Wert des Referenzgeräts verglichen werden.

Besonders geeignet ist ein zeitgleich bestimmter Mittelungspegel, beispielsweise der LAeq über 30 oder 60 Sekunden. Dadurch wirken sich kleine kurzfristige Schwankungen weniger stark aus.

[dB und dB(A): Was ist der Unterschied?](/de/artikel/db-und-dba-unterschied/)

### 3. Beide Mikrofone richtig positionieren

Platzieren Sie das aktive Smartphone-Mikrofon und das Mikrofon des Referenzgeräts so nah wie möglich nebeneinander. Dabei darf keines der Geräte das andere verdecken oder einen akustischen Schatten erzeugen.

Achten Sie auf:

* gleiche Höhe
* möglichst gleichen Abstand zur Schallquelle
* gleiche Ausrichtung
* freie Mikrofonöffnungen
* unveränderte Position der Schallquelle
* unveränderte Smartphone-Hülle
* ausreichenden Abstand zu Wänden und großen reflektierenden Flächen

Legen Sie die Geräte nicht hintereinander. Schon wenige Zentimeter Positionsunterschied können in einem Raum mit starken Reflexionen zu abweichenden Messwerten führen.

### 4. Abweichung und Offset berechnen

Starten Sie beide Messungen gleichzeitig und verwenden Sie dasselbe Zeitintervall. Wiederholen Sie den Vergleich mindestens zwei- oder dreimal, um zu prüfen, ob die Differenz stabil bleibt.

Der Korrekturwert wird folgendermaßen berechnet:

$$
\text{Korrekturwert} = L_{\text{Referenz}} - L_{\text{Smartphone}}
$$

Zeigt das Referenzgerät 74,0 dB(A) und die App 70,5 dB(A), ergibt sich:

$$
74{,}0 - 70{,}5 = +3{,}5\ \mathrm{dB}
$$

In diesem Beispiel wäre ein positiver Offset von 3,5 dB einzutragen. Prüfen Sie danach mit einer weiteren Messung, ob die App den Korrekturwert tatsächlich in der erwarteten Richtung anwendet.

Manche Apps verwenden eine umgekehrte Vorzeichenlogik. Kontrollieren Sie deshalb immer das Ergebnis, statt sich allein auf die Beschriftung des Reglers zu verlassen.

### 5. Mehrere Pegelbereiche überprüfen

Eine App kann bei 65 dB(A) gut mit dem Referenzgerät übereinstimmen und bei 85 dB(A) schon merklich abweichen. Ursache können automatische Verstärkungsregelung, Kompression oder ein nichtlinearer Audioeingang sein.

Prüfen Sie nach Möglichkeit mehrere sichere Pegel, beispielsweise:

* etwa 50 dB(A)
* etwa 70 dB(A)
* etwa 85 dB(A)

Erzeugen Sie für einen Test keine gesundheitsgefährdenden Schallpegel. Oberhalb von etwa 90 dB können viele Smartphone-Mikrofone bereits komprimieren oder übersteuern. Der genaue Grenzbereich unterscheidet sich erheblich zwischen den Gerätemodellen.

Benötigt die App bei unterschiedlichen Pegeln stark abweichende Korrekturwerte, lässt sich der Fehler nicht mit einem einzigen Offset beheben. Dokumentieren Sie dann den Bereich, in dem die Messwerte noch ausreichend übereinstimmen.

### 6. Unterschiedliche Geräuscharten vergleichen

Ein guter Wert bei rosa Rauschen garantiert nicht, dass die App auch bei tieffrequentem Maschinenbrummen, hohen Pfeiftönen oder impulshaltigen Geräuschen korrekt misst.

Smartphone-Mikrofone und ihre Schutzmembranen sind meist für Sprache und Telefonie optimiert. Der Frequenzgang kann je nach Tonhöhe stark variieren.

Eine echte Frequenzgangkorrektur sollte nicht aus beiläufigen Messungen in einem Wohnraum abgeleitet werden. Raumreflexionen, Lautsprecherfrequenzgang und Mikrofonposition können sonst fälschlich als Mikrofonfehler interpretiert werden.


## Methode 2: Externes Messmikrofon mit Schallkalibrator

Diese Methode bietet die kontrolliertesten Bedingungen, sofern die Schallpegelmesser-App ein geeignetes externes Mikrofon unterstützt.

### 1. Ein geeignetes Messmikrofon verwenden

Verwenden Sie ein Mikrofon, das für akustische Messungen vorgesehen ist und zu einem Schallkalibrator passt. Je nach Gerät erfolgt die Verbindung über USB, ein Audiointerface oder einen geeigneten Adapter.

Mikrofon, Adapter und Audiointerface müssen bei der späteren Messung dieselben bleiben. Schon ein Wechsel des USB-Adapters kann den Eingangspegel oder die interne Signalverarbeitung verändern.

Ein gewöhnliches Headset-Mikrofon ist nicht automatisch genauer als das eingebaute Smartphone-Mikrofon. Häufig fehlen Angaben zur Empfindlichkeit, zum Frequenzgang und zum maximal verarbeitbaren Schalldruckpegel.

### 2. Die späteren Messeinstellungen auswählen

Stellen Sie vor der Kalibrierung alle Optionen so ein, wie sie auch bei den späteren Messungen verwendet werden sollen:

* verwendeter Audioeingang
* Frequenzbewertung, beispielsweise A oder C
* Zeitbewertung oder Mittelungsverfahren
* Abtastrate, sofern auswählbar
* Kalibrierungsprofil
* externe Adapter oder Audiointerfaces

Wird anschließend eine dieser Komponenten geändert, sollte die Schallpegelmesser-App erneut kalibriert werden.

### 3. Den Schallkalibrator korrekt aufsetzen

Setzen Sie den Kalibrator mit dem vorgesehenen Kuppler luftdicht und mechanisch stabil auf das Messmikrofon. Beachten Sie dabei die Anleitung des Mikrofon- und Kalibratorherstellers.

Viele Schallkalibratoren erzeugen bei 1 kHz einen definierten Pegel von 94 oder 114 dB. Maßgeblich ist jedoch ausschließlich der für das konkrete Gerät angegebene Wert. Mögliche Korrekturen für Luftdruck oder andere Umgebungsbedingungen müssen ebenfalls der Gerätedokumentation entnommen werden.

Versuchen Sie nicht, das Smartphone selbst gegen die Öffnung eines Schallkalibrators zu drücken. Die Kupplung ist für Messmikrofone mit festgelegter Geometrie konstruiert. Das interne Smartphone-Mikrofon sitzt dagegen hinter einer kleinen Gehäuseöffnung und lässt sich auf diese Weise nicht kontrolliert beschallen.

### 4. Den Korrekturwert einstellen

Schalten Sie den Kalibrator ein und warten Sie, bis sich die Anzeige stabilisiert hat. Passen Sie anschließend den Kalibrierungswert der App an, bis der vorgegebene Pegel angezeigt wird.

Dokumentieren Sie mindestens:

* Hersteller und Modell des Mikrofons
* verwendetes Interface oder Adaptermodell
* Hersteller, Modell und Seriennummer des Kalibrators
* Ausgangspegel des Kalibrators
* Smartphone-Modell
* Betriebssystemversion
* App-Version
* Frequenz- und Zeitbewertung
* eingestellten Korrekturwert
* Datum der Kalibrierung

### 5. Vor und nach wichtigen Messungen kontrollieren

Bei professionellen Lärmmessungen wird die Messkette üblicherweise vor und nach der Messung kontrolliert. So lässt sich feststellen, ob sich Empfindlichkeit, Verbindung oder Einstellungen während des Einsatzes verändert haben.

Weicht die Kontrollmessung nach dem Einsatz klar vom ursprünglichen Wert ab, sollten Mikrofon, Adapter, Stromversorgung, Audioeingang und App-Einstellungen geprüft werden.

Eine erfolgreiche Kontrolle mit einem Kalibrator bestätigt dennoch nicht automatisch die vollständige Einhaltung der Anforderungen der Klasse 1 oder 2. Die Genauigkeitsklasse bezieht sich auf das gesamte geprüfte Messsystem, nicht allein auf das Mikrofon oder einen einzelnen Anzeigewert.

## Warum eine gespeicherte Kalibrierung später nicht mehr stimmen kann

Der Aufnahmeweg eines Smartphones kann sich durch Software- oder Hardwareänderungen verändern. Dazu gehören:

* Betriebssystem-Updates
* App-Updates
* geänderte Audioquellen
* USB-Mikrofone oder neue Adapter
* angeschlossene Headsets
* Bluetooth-Audioverbindungen
* Reparaturen oder Sturzschäden
* Feuchtigkeit oder Schmutz an einer Mikrofonöffnung
* eine neue oder anders sitzende Schutzhülle

Android-Geräte können außerdem herstellerspezifische Audioverarbeitung einsetzen. Selbst wenn eine App denselben Audioeingang anfordert, muss das auf verschiedenen Smartphone-Modellen nicht zum gleichen unbearbeiteten Signal führen.

Überprüfen Sie die Kalibrierung nach jeder größeren Änderung sowie dann, wenn wiederholte Messungen plötzlich ungewöhnlich stark voneinander abweichen.

## Verbessert ein externes Mikrofon die Messung?

Ein geeignetes externes Messmikrofon kann mehrere Vorteile bieten:

* gleichmäßigere Empfindlichkeit
* besser dokumentierten Frequenzgang
* höhere maximal verarbeitbare Pegel
* kontrollierbare Positionierung
* geeigneten Windschutz
* Anschlussmöglichkeit an einen Schallkalibrator
* separates Kalibrierungsprofil

Studien mit ausgewählten App-, Smartphone- und Mikrofonkombinationen zeigen, dass kalibrierte externe Messmikrofone die Übereinstimmung mit professionellen Referenzgeräten verbessern können. Einzelne geprüfte Gesamtsysteme erfüllten einen großen Teil der untersuchten Anforderungen für Schallpegelmesser der Klasse 2. Diese Ergebnisse gelten jedoch immer nur für die konkret getestete Kombination.

Auch mit einem hochwertigen Mikrofon bleiben mögliche Fehlerquellen bestehen. Das Audiointerface kann den Pegel verändern, das Signal neu abtasten oder übersteuern. Ebenso können Frequenzbewertung, Mittelung und Spitzenwertberechnung der App fehlerhaft umgesetzt sein.

Ein externes Mikrofon allein macht aus dem Smartphone daher noch kein normgerechtes Schallmessgerät.

## Kalibrierung behebt weder Eigenrauschen noch Übersteuerung

Bei sehr leisen Geräuschen kann das Eigenrauschen von Mikrofon und Elektronik höher sein als der tatsächliche Umgebungsschall. Die App zeigt dann beispielsweise 35 dB(A) an, obwohl der reale Pegel niedriger liegt.

Ein positiver oder negativer Offset beseitigt dieses Rauschen nicht. Er verschiebt lediglich den angezeigten Wert.

Auch bei hohen Pegeln kann eine Korrektur verlorene Informationen nicht wiederherstellen. Sobald das Mikrofon oder der Audioeingang komprimiert oder übersteuert, werden Pegelspitzen abgeschnitten. Die App kann dann trotz steigender Lautstärke nahezu denselben Wert anzeigen oder den tatsächlichen Pegel deutlich unterschätzen.

Eine korrekte Kalibrierung bei 70 dB(A) beweist deshalb nicht, dass auch Messungen bei 30 dB(A), über 90 dB(A) oder bei kurzen Knallgeräuschen zuverlässig sind.

## Kalibrierungsprofil vollständig dokumentieren

Wenn Sie regelmäßig eine Lärm App kalibrieren oder mehrere Mikrofone verwenden, sollten Sie für jede Konfiguration ein eigenes Profil anlegen.

Ein sinnvolles Profil enthält:

* Smartphone-Hersteller und Modell
* konkretes Gerät, falls mehrere identische Modelle verwendet werden
* Betriebssystemversion
* App-Version
* internes oder externes Mikrofon
* Adapter oder Audiointerface
* verwendete Smartphone-Hülle
* Frequenzbewertung
* Zeitbewertung oder Mittelungsverfahren
* Referenzgerät oder Schallkalibrator
* Referenzpegel und verwendetes Geräusch
* eingestellten Offset
* geprüften Pegelbereich
* Kalibrierungsdatum

Verwenden Sie ein Profil nicht weiter, wenn sich der aktive Audioeingang geändert hat. Für unterschiedliche externe Mikrofone oder Adapter sollten getrennte Profile gespeichert werden.

## Kalibrierung in dBcheck verwenden

In dBcheck lässt sich ein Kalibrierungsprofil für die getestete Kombination aus Smartphone, Mikrofon und Audioeingang speichern. Vergleichen Sie die App mit einem möglichst verlässlichen Referenzgerät und überprüfen Sie den eingestellten Wert nach größeren Software- oder Hardwareänderungen erneut.

Das Profil kann die Wiederholbarkeit verbessern und einen gleichbleibenden Pegelfehler reduzieren. Es zertifiziert jedoch weder dBcheck noch das Smartphone als Schallpegelmesser der Klasse 1 oder 2.

Für orientierende Messungen im Alltag kann eine sorgfältig kalibrierte Smartphone-App nützlich sein. Für behördliche Nachweise, Gutachten oder Lärmmessungen im Rahmen einer betrieblichen Gefährdungsbeurteilung gelten weitergehende Anforderungen an Messgeräte, Messunsicherheit, Durchführung und Dokumentation. Die TRLV Lärm, Teil 2 beschreibt diese Anforderungen für Arbeitsplatzmessungen in Deutschland.

[Smartphone-Schallpegelmesser oder professionelles Messgerät?](/de/artikel/schallpegelmesser-app-vs-messgeraet/)

## Quellen

1. Bundesanstalt für Arbeitsschutz und Arbeitsmedizin, *TRLV Lärm, Teil 2: Messung von Lärm*.
2. Physikalisch-Technische Bundesanstalt, *Leistungsmerkmale für Schallpegelmesser nach DIN EN 61672*.
3. Kardous und Shaw, *Evaluation of smartphone sound measurement applications using external microphones: A follow-up study*.
4. Celestina, Hrovat und Kardous, *Smartphone-based sound level measurement apps: Evaluation of compliance with international sound level meter standards*.
5. Serpanos et al., *The Accuracy of Smartphone Sound Level Meter Applications in Measuring Sound Levels in Clinical Rooms*.
