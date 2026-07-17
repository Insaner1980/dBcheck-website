---
title: "Dezibel messen mit Android: Schritt für Schritt"
description: "So messen Sie Umgebungsgeräusche mit einem Android-Handy: Position, Abstand, Messdauer, Kalibrierung und typische Fehlerquellen verständlich erklärt."
slug: "dezibel-messen-mit-android-handy"
locale: "de"
translationKey: "how-to-measure-decibels-with-android-phone"
clusterKey: "smartphone"
primaryIntent: "Nutzer möchten Umgebungsgeräusche mit einem Android-Handy möglichst nachvollziehbar messen."
contentCluster: "Schallmessung mit dem Smartphone"
researchSources:

- "Lärm- und Vibrations-Arbeitsschutzverordnung, § 6"
- "Deutsche Gesetzliche Unfallversicherung, Grundlagen zur Lärmmessung"
- "Android Developers, AutomaticGainControl API reference"
- "Android Developers, MediaRecorder.AudioSource API reference"
- "Celestina, Kardous und Trost, Evaluation of directional response"
publishedAt: "2026-07-12"
lastReviewed: "2026-07-15"

---

Wie lässt sich mit einem Android-Handy Dezibel messen, ohne dass der Aufbau das Ergebnis verfälscht? Der wichtigste Schritt passiert vor dem Startknopf: Messpunkt, Abstand, Ausrichtung und Dauer müssen feststehen.

Eine App eignet sich gut für kontrollierte Vergleiche, etwa zwischen geöffnetem und geschlossenem Fenster oder zwischen zwei Leistungsstufen eines Haushaltsgeräts. Die Werte bleiben Schätzungen. Handymodell, Mikrofon, Audioverarbeitung und Kalibrierung wirken sich auf die Anzeige aus, und oberhalb von etwa 90 dB können viele Smartphone-Mikrofone bereits komprimieren oder übersteuern.

[Wie genau sind Dezibel-Apps?](/de/artikel/sind-dezibel-apps-genau/)

## 1. Legen Sie zuerst das Messziel fest

Bevor Sie eine App öffnen, sollte klar sein, was genau gemessen werden soll. Eine brauchbare Messung braucht eine bestimmte Schallquelle, einen festen Messpunkt und einen passenden Zeitraum.

Mögliche Fragestellungen sind:

* Wie hoch ist der durchschnittliche Geräuschpegel am Schreibtisch während einer Arbeitsstunde?
* Welche Leistungsstufe des Staubsaugers ist bei gleichem Abstand leiser?
* Wie laut ist es während einer typischen Fahrt mit der S-Bahn?
* Wie stark sinkt der Schallpegel im Schlafzimmer, wenn das Fenster geschlossen wird?
* Welche Position im Raum ist für ein Lüftungsgerät am günstigsten?

Eine Frage wie "Wie laut ist dieses Gebäude?" ist zu ungenau. Besser ist eine Formulierung, die eine andere Person mit denselben Bedingungen wiederholen könnte.

Geht es um Arbeitsschutz, behördliche Nachweise, Nachbarschaftslärm oder die Einhaltung rechtlicher Anforderungen, reicht eine Handy-App nicht aus. Dafür sind ein geeignetes Messgerät, ein festgelegtes Messverfahren und fachkundige Auswertung erforderlich.

## 2. Wählen Sie eine App mit nachvollziehbaren Messwerten

Eine gute App sollte erklären, was die angezeigte Zahl bedeutet. Achten Sie insbesondere auf folgende Angaben:

* Frequenzbewertung, beispielsweise dB(A)
* aktueller Messwert
* Mittelwert oder äquivalenter Dauerschallpegel
* Minimal- und Maximalwert
* Messdauer
* Reaktionszeit oder zeitliche Mittelung
* Kalibrierstatus

Steht auf dem Display nur "dB", fehlt eine wichtige Angabe. Für viele Alltags- und Umgebungsmessungen wird eine A-Bewertung verwendet. Das Ergebnis wird dann als dB(A) oder LA angegeben. Diese Bewertung berücksichtigt, dass das menschliche Gehör tiefe und sehr hohe Frequenzen weniger empfindlich wahrnimmt.

Manche Apps zeigen zusätzlich einen äquivalenten Dauerschallpegel wie LAeq, einen zeitbewerteten Maximalwert oder einen geschätzten Spitzenwert an. Diese Größen dürfen nicht miteinander verwechselt werden.

[dB vs. dB(A): Wo liegt der Unterschied?](/de/artikel/db-und-dba-unterschied/)

Prüfen Sie auch den Kalibrierstatus. Ein unkalibriertes Ergebnis sollte grundsätzlich als ungefährer Wert behandelt werden. Ein gespeicherter Korrekturwert gilt nur für die Kombination aus genau diesem Handy, dieser App, dem verwendeten Mikrofoneingang und den gewählten Einstellungen.

## 3. Finden Sie die Mikrofonöffnungen des Handys

Android-Smartphones besitzen häufig mehrere Mikrofone. Sie können sich an der Unterkante, an der Oberseite, neben den Kameras oder an anderen Stellen des Gehäuses befinden. Verschiedene Mikrofone werden beispielsweise für Telefongespräche, Videoaufnahmen, Geräuschunterdrückung oder Stereoaufnahmen verwendet.

Sehen Sie im Gerätehandbuch oder in der schematischen Darstellung des Herstellers nach. Stecken Sie keine Nadel und keinen anderen Gegenstand in eine vermeintliche Mikrofonöffnung.

Am Gehäuse lässt sich nicht immer erkennen, welches Mikrofon die App tatsächlich nutzt. Android stellt unterschiedliche Audioquellen bereit, die je nach Gerät und Anwendung mit einer bestimmten Aufnahmeverarbeitung oder Mikrofonroute verbunden sein können.

Ein vorsichtiger Test kann Hinweise geben: Wird eine mögliche Mikrofonöffnung kurz mit dem Finger verdeckt und verändert sich der Messwert deutlich, könnte sie aktiv sein. Das ist jedoch keine zuverlässige technische Prüfung. Das Betriebssystem oder die App kann unter bestimmten Bedingungen auch auf einen anderen Eingang umschalten.

## 4. Entfernen Sie mögliche Hindernisse

Nehmen Sie das Handy aus der Tasche oder aus einer Hülle, die eine Mikrofonöffnung verdecken könnte. Halten Sie Finger, Kleidung und andere Gegenstände von allen wahrscheinlichen Mikrofonpositionen fern.

Eine Schutzhülle kann den Schallweg verändern oder eine Öffnung teilweise abdecken. Für reproduzierbare Messungen sollte die Hülle bei der Kalibrierung und bei späteren Messungen gleich behandelt werden. Soll die Hülle dauerhaft am Gerät bleiben, muss sie bei allen Vergleichsmessungen identisch angebracht sein.

Legen Sie das Handy nicht flach auf einen Tisch, sofern diese Position nicht ausdrücklich Teil des Versuchs ist. Die Unterlage kann ein Mikrofon verdecken und zusätzliche Reflexionen erzeugen. Ein kleiner Handyhalter oder ein Stativ sorgt meist für stabilere Bedingungen.

## 5. Halten Sie Position und Abstand konstant

Stellen Sie das Smartphone an dem Punkt auf, an dem der Schallpegel beurteilt werden soll. Notieren Sie bei Bedarf den Abstand zur Quelle und die Höhe über dem Boden.

Der Abstand verändert den Schalldruckpegel am Messpunkt stark. Im Freien kann der Pegel bei einer punktförmigen Schallquelle um ungefähr 6 dB sinken, wenn der Abstand verdoppelt wird. In Räumen fällt die Abnahme wegen Reflexionen an Wänden, Boden und Decke häufig geringer aus.

Eine reproduzierbare Notiz könnte beispielsweise so aussehen:

> Smartphone auf einem Stativ, Unterkante zum Gerät ausgerichtet, 1 Meter Abstand zur Vorderseite, 1,2 Meter über dem Boden, Schutzhülle entfernt.

Gehen Sie nicht näher an eine laute Quelle heran, nur um einen höheren Zahlenwert zu erhalten. Ein größerer Abstand reduziert sowohl die persönliche Belastung als auch das Risiko, dass das Mikrofon übersteuert.

## 6. Behalten Sie die Ausrichtung des Smartphones bei

Das Gehäuse und die Position der Mikrofone beeinflussen, aus welcher Richtung Schall besonders gut aufgenommen wird. Wird das Smartphone gedreht, kann sich der Messwert verändern. Das gilt vor allem für höhere Frequenzen.

Untersuchungen zur Richtwirkung smartphonebasierter Schallpegelmesser zeigen, dass die Ausrichtung des Geräts eine relevante Messbedingung ist. Ein Ergebnis mit einem geprüften Gerät lässt sich deshalb nicht auf beliebige Handymodelle, Apps und Aufnahmepositionen übertragen.

Legen Sie für eine Messreihe eine Ausrichtung fest und behalten Sie diese bei. Bei Vergleichen an verschiedenen Tagen hilft ein Foto des Aufbaus.

Halten Sie das Smartphone nicht unmittelbar vor den Körper. Der Körper kann Schall abschirmen oder reflektieren. Stellen Sie sich auch nicht zwischen die Schallquelle und das Handy.

## 7. Vermeiden Sie Wind und starke Luftströmungen

Wind erzeugt an kleinen Mikrofonöffnungen Turbulenzen. Die App kann diese als tieffrequentes Geräusch erfassen und dadurch einen zu hohen oder stark schwankenden Wert anzeigen.

Dasselbe Problem kann auftreten:

* vor einem Ventilator
* neben einem Lüftungsauslass
* im Fahrtwind
* beim schnellen Bewegen des Handys
* beim Ausatmen direkt auf das Mikrofon

Messen Sie im Freien möglichst bei ruhigem Wetter und notieren Sie die Windbedingungen. Das eingebaute Smartphone-Mikrofon lässt sich nur schwer mit einem geeigneten Windschutz versehen, ohne die Schallaufnahme zusätzlich zu verändern.

Ein externer Messmikrofon-Windschutz kann Windgeräusche reduzieren. Er behebt jedoch weder eine fehlende Kalibrierung noch andere Einschränkungen des Smartphones.

## 8. Berücksichtigen Sie den Raum

In Innenräumen erreicht direkter und reflektierter Schall das Mikrofon. Wände, Fenster, Decken, Böden und Möbel werfen einen Teil der Schallenergie zurück. Dadurch können bereits kleine Positionsänderungen andere Messwerte ergeben.

Besonders bei gleichmäßigen oder tonalen Geräuschen kann sich der Pegel innerhalb weniger Zentimeter verändern. Positionen direkt in einer Ecke oder dicht an einer Wand können bestimmte Frequenzen verstärken.

Für einen sinnvollen Vergleich sollten möglichst unverändert bleiben:

* Standort und Ausrichtung der Schallquelle
* Position des Smartphones
* Türen und Fenster
* Möbel und Vorhänge
* Betriebsstufe des Geräts
* Anzahl der Personen im Raum
* andere gleichzeitig laufende Geräte

Ein Geschirrspüler erzeugt beim Einlaufen, Spülen, Abpumpen und Trocknen unterschiedliche Geräusche. Ein einzelner Momentanwert beschreibt daher nicht den gesamten Spülgang.

## 9. Stimmen Sie die Einstellungen auf die Fragestellung ab

Verwenden Sie für eine Messreihe immer dieselbe Frequenzbewertung und dieselbe zeitliche Einstellung.

Eine schnelle Anzeige reagiert deutlicher auf kurze Veränderungen. Eine langsamere Mittelung liefert einen ruhigeren Wert. Die genaue Umsetzung kann sich von App zu App unterscheiden, auch wenn beide dieselben Begriffe verwenden.

Für schwankende Umgebungen ist ein äquivalenter Dauerschallpegel wie LAeq oft aussagekräftiger als ein einzelner Momentanwert. Er fasst die Schallenergie über den festgelegten Messzeitraum zusammen.

Der Maximalwert bezeichnet normalerweise den höchsten Wert, den die gewählte Frequenz- und Zeitbewertung während der Messung geliefert hat. Ein Spitzenwert erfasst dagegen einen sehr kurzen Druckverlauf. "MAX" und "Peak" sind daher nicht dasselbe.

[Was ist der Schalldruckpegel? SPL einfach erklärt](/de/artikel/was-ist-schalldruckpegel/)

## 10. Wählen Sie eine repräsentative Messdauer

Wählen Sie keinen einzelnen Moment aus, nur weil er zum erwarteten Ergebnis passt. Der Zeitraum muss die typischen Schwankungen der Schallquelle erfassen.

Für einen gleichmäßig laufenden Ventilator können 30 bis 60 Sekunden für einen praktischen Vergleich genügen. Für einen Geschirrspüler, eine Bahnreise, ein Restaurant, einen Arbeitsplatz oder die nächtliche Geräuschsituation ist meist ein längerer Zeitraum erforderlich.

Eine allgemeingültige Messdauer gibt es nicht. Sie hängt davon ab, welche Frage beantwortet werden soll und wie stark das Geräusch schwankt.

Lassen Sie die Anzeige vor Beginn einer Vergleichsmessung kurz stabilisieren. Sprechen Sie während der Messung nicht, berühren Sie das Handy nicht und vermeiden Sie Erschütterungen des Stativs.

Wiederholen Sie die Messung nach Möglichkeit mehrmals. Mehrere ähnliche Ergebnisse sind aussagekräftiger als ein einzelner Wert. Große Unterschiede zwischen Wiederholungen können auf wechselnde Betriebsbedingungen, eine veränderte Position, Raumreflexionen oder interne Audioverarbeitung hinweisen.

## 11. Unterscheiden Sie Momentanwert, Mittelwert, Maximum und Peak

Der aktuelle Messwert zeigt, was die App in diesem Moment erfasst. Bei einem schwankenden Geräusch kann dieser Wert wenige Sekunden später ganz anders aussehen.

Ein Mittelwert oder äquivalenter Pegel fasst einen Zeitraum zusammen. Prüfen Sie, ob die App einen energetischen Mittelwert wie LAeq berechnet. Ein einfacher arithmetischer Durchschnitt der sichtbaren Dezibelzahlen ist physikalisch nicht gleichwertig, da die Dezibelskala logarithmisch ist.

Der Maximalwert ist der höchste zeitbewertete Messwert innerhalb der Sitzung. Er hängt sowohl von der gewählten Reaktionszeit als auch von der Länge der Messung ab.

Ein Peak-Wert soll sehr kurze Druckspitzen erfassen. Smartphone-Mikrofone und die interne Signalverarbeitung können solche Ereignisse jedoch abschwächen, komprimieren oder vollständig verpassen. Ergebnisse bei Feuerwerk, Knallgeräuschen, Sirenen, platzenden Luftballons oder Hammerschlägen sind deshalb besonders vorsichtig zu interpretieren.

## 12. Achten Sie auf Übersteuerung und automatische Verarbeitung

Bei hohen Schallpegeln kann das Mikrofon oder die Eingangselektronik den linearen Arbeitsbereich verlassen. Typische Hinweise sind:

* Der Wert steigt trotz hörbar lauterer Quelle nicht weiter.
* Mehrere sehr unterschiedliche Schallquellen enden bei fast demselben Maximalwert.
* Die Anzeige springt ungewöhnlich oder bleibt auf einem Wert stehen.
* Ein lauter Impuls erscheint niedriger als erwartet.
* Der Peak-Wert ist kaum höher als der normale Maximalwert.

Bei vielen Smartphones werden Messungen oberhalb von etwa 90 dB zunehmend unsicher. Die genaue Grenze unterscheidet sich jedoch erheblich zwischen Geräten. Die Skala einer App beweist nicht, dass das Handy den gesamten angezeigten Bereich korrekt erfasst.

Zusätzlich kann eine automatische Verstärkungsregelung den Eingangspegel verändern. Android beschreibt Automatic Gain Control als Vorverarbeitung, die das Mikrofonsignal anhebt oder absenkt, damit der aufgezeichnete Ausgangspegel möglichst konstant bleibt. Das ist für Sprachaufnahmen nützlich, kann eine Schallpegelmessung jedoch verfälschen.

Gehen Sie bei unangenehm lauten Geräuschen auf Abstand. Versuchen Sie nicht, die Belastungsgrenze des Mikrofons durch Annäherung an die Quelle zu testen.

## 13. Dokumentieren Sie die Messbedingungen

Ein Screenshot mit einer großen Dezibelzahl wirkt präzise, sagt ohne Kontext aber wenig aus. Notieren Sie deshalb mindestens:

* Datum und Uhrzeit
* Smartphone-Modell
* Android-Version
* Name und Version der App
* eingebautes oder externes Mikrofon
* Kalibrierstatus und Kalibrierdatum
* Frequenzbewertung
* Reaktionszeit oder Mittelungsdauer
* Schallquelle und Betriebszustand
* Abstand, Höhe und Ausrichtung
* Raum- oder Außenbedingungen
* Windbedingungen
* verwendete Schutzhülle
* Messdauer
* MIN, Mittelwert oder LAeq, MAX und gegebenenfalls Peak
* mögliche Anzeichen einer Übersteuerung

Für häufig wiederholte Messungen empfiehlt sich eine feste Vorlage. So lässt sich später erkennen, ob sich der Geräuschpegel tatsächlich verändert hat oder lediglich der Aufbau anders war.

## 14. Ordnen Sie das Ergebnis innerhalb der Smartphone-Grenzen ein

Mit dem Handy lassen sich Umgebungsgeräusche beobachten, grob einschätzen und unter kontrollierten Bedingungen vergleichen. Kleine Unterschiede sollten jedoch nicht überbewertet werden.

Eine Kalibrierung kann die Übereinstimmung mit einem Referenzgerät verbessern. Sie beseitigt aber nicht automatisch Fehler durch:

* ungleichmäßigen Frequenzgang
* automatische Verstärkung
* Geräuschunterdrückung
* Kompression
* Übersteuerung
* Eigenrauschen
* Richtwirkung
* abweichende App-Berechnungen

Besondere Vorsicht ist bei rechtlichen oder gesundheitlichen Schwellenwerten erforderlich. Der in der deutschen Lärm- und Vibrations-Arbeitsschutzverordnung genannte obere Auslösewert von 85 dB(A) bezieht sich auf den Tages-Lärmexpositionspegel. Er ist nicht mit einem beliebigen kurzen Momentanwert einer Handy-App gleichzusetzen. Die Verordnung nennt außerdem einen unteren Auslösewert von 80 dB(A).

Eine professionelle Messung ist erforderlich, wenn das Ergebnis für eine Gefährdungsbeurteilung, eine behördliche Bewertung, eine technische Abnahme, einen gerichtlichen Streitfall oder eine andere sicherheitsrelevante Entscheidung verwendet werden soll.

[Smartphone-Schallpegelmesser vs. professionelles Schallpegelmessgerät](/de/artikel/schallpegelmesser-app-vs-messgeraet/)

## Eine nachvollziehbare Messung mit dBcheck durchführen

Für eine nachvollziehbare Messung sollte die App mehr als einen einzelnen dB-Wert anzeigen. Hilfreich sind eine klar benannte Frequenzbewertung, eine sichtbare Messdauer sowie getrennte Angaben für MIN, Mittelwert, MAX, Peak und den äquivalenten Pegel.

dBcheck ist für solche nachvollziehbaren Messsitzungen und kontrollierten Vergleiche ausgelegt. Halten Sie Position, Abstand, Ausrichtung, Bewertung und Messdauer konstant und dokumentieren Sie die Bedingungen. Auch bei sorgfältiger Anwendung bleibt das Ergebnis eine Schätzung auf Grundlage des verwendeten Android-Smartphones.

## Quellen

1. Bundesministerium der Justiz, *Lärm- und Vibrations-Arbeitsschutzverordnung, § 6: Auslösewerte bei Lärm*.
2. Deutsche Gesetzliche Unfallversicherung, *Lärmprävention: Schallpegel und Abstand zur Schallquelle*.
3. Android Developers, *AutomaticGainControl API reference*.
4. Android Developers, *MediaRecorder.AudioSource API reference*.
5. Celestina, Kardous und Trost, *Smartphone-based sound level measurement apps: Evaluation of directional response*, Applied Acoustics 171, 2021.
