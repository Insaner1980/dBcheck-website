---
title: "Wie genau sind Dezibel-Apps?"
description: "Wie genau Dezibel-Apps messen, warum Android-Ergebnisse schwanken, was Kalibrierung verbessert und wann ein professionelles Messgerät nötig ist."
slug: "sind-dezibel-apps-genau"
locale: "de"
translationKey: "are-decibel-meter-apps-accurate"
clusterKey: "smartphone"
primaryIntent: "Die Leserin oder der Leser möchte wissen, ob Dezibel-Apps verlässliche Schallpegelmessungen liefern."
contentCluster: "Schallmessung mit dem Smartphone"
researchSources:
  - "Android Developers, AutomaticGainControl API reference"
  - "Android Developers, MediaRecorder.AudioSource API reference"
  - "Kardous and Shaw, Evaluation of smartphone sound measurement applications"
  - "Murphy and King, Testing the accuracy of smartphones and sound level meter applications"
  - "Huyan et al., Assessing the Usefulness of Mobile Apps for Noise Management"
publishedAt: "2026-07-15"
lastReviewed: "2026-07-15"
---

Eine Dezibel-App liefert Schätzwerte, keine amtliche Messung. Unter günstigen Bedingungen kann sie erstaunlich nah an einem Referenzgerät liegen, doch ein normales Smartphone wird dadurch nicht zu einem geeichten Schallpegelmessgerät.

Die Software ist nur ein Teil der Messkette. Smartphone-Modell, Mikrofon, interne Signalverarbeitung, Betriebssystem, Kalibrierung, Schallart, Abstand und Raum beeinflussen gemeinsam, welcher Wert auf dem Display erscheint.

Bei einem gleichmäßigen Geräusch kann ein kalibriertes Gerät in einem begrenzten Pegelbereich brauchbare Ergebnisse liefern. Ein anderes, nicht kalibriertes Android-Handy liegt unter denselben Bedingungen mehrere Dezibel daneben. Bei hohen Pegeln kommt ein weiteres Problem hinzu: Das Mikrofon kann bereits übersteuern, obwohl die App weiterhin eine sauber formatierte Zahl anzeigt.

[Was ist ein Dezibel? Schallpegel einfach erklärt](/de/artikel/was-ist-ein-dezibel/)

[Dezibel mit einem Android-Handy messen](/de/artikel/dezibel-messen-mit-android-handy/)

## Wie genau sind Dezibel-Apps wirklich?

Die Aussage "Dezibel-Apps messen auf 2 dB genau" ist zu pauschal. Studien mit guten Ergebnissen untersuchten jeweils bestimmte Smartphones, App-Versionen, Einstellungen, Mikrofone und Testsignale unter kontrollierten Bedingungen.

Bei ausgewählten Kombinationen lagen die Abweichungen gegenüber einem Referenzsystem bei etwa 1 bis 2 dB. Das zeigt, was mit einem geeigneten und kalibrierten System möglich ist. Es bedeutet nicht, dass jede App auf jedem Smartphone dieselbe Genauigkeit erreicht.

Untersuchungen mit vielen verschiedenen Geräten fallen wesentlich uneinheitlicher aus. In einer Studie mit 100 Smartphones betrug die Standardabweichung zwischen den getesteten Systemen 6,81 dB. Einzelne Geräte lagen weit vom Referenzwert entfernt, obwohl der Durchschnitt zunächst günstiger wirkt.

Die Frage nach einer einzigen Genauigkeitszahl greift zu kurz. Für die Einordnung zählen vor allem:

* Welches Smartphone wird verwendet?
* Welche App verarbeitet das Audiosignal?
* Ist die App für dieses Gerät kalibriert?
* Welche Art von Geräusch wird gemessen?
* In welchem Lautstärkebereich findet die Messung statt?
* Wofür soll das Ergebnis verwendet werden?

Eine grobe Einschätzung des Straßenverkehrs vor dem Fenster stellt andere Anforderungen als eine Messung am Arbeitsplatz, eine bauakustische Prüfung oder die Bewertung eines kurzzeitigen Knalls.

## Die Schallpegel-App-Genauigkeit hängt stark vom Smartphone ab

Besonders bei Android unterscheiden sich die Geräte erheblich. Hersteller verwenden verschiedene Mikrofonkapseln, Mikrofonanordnungen, Vorverstärker, Analog-Digital-Wandler und Audiosignalprozessoren. Selbst zwei Smartphones derselben Preisklasse können beim gleichen Geräusch unterschiedliche Werte anzeigen.

Mögliche Unterschiede betreffen unter anderem:

* Empfindlichkeit und Frequenzgang des Mikrofons
* Eigenrauschen und maximal verarbeitbarer Schallpegel
* Anzahl und Position der eingebauten Mikrofone
* Auswahl des Mikrofons durch das Betriebssystem
* automatische Verstärkung
* Rauschunterdrückung und Sprachoptimierung
* Echounterdrückung und Beamforming
* Abtastrate und interne Signalumwandlung
* herstellerspezifische Firmware

Auch innerhalb einer Modellreihe sind Abweichungen möglich. Verschmutzte Mikrofonöffnungen, Feuchtigkeit, mechanische Schäden, eine Hülle oder eine Änderung der Audioverarbeitung durch ein Systemupdate können das Ergebnis beeinflussen.

Eine Lärm-App ist daher nicht pauschal "für Android" genau oder ungenau. Ihre Aussagekraft muss für die konkrete Kombination aus Gerät, App und Einstellungen beurteilt werden.

[Warum zeigen Dezibel-Apps unterschiedliche Werte an?](/de/artikel/warum-dezibel-apps-unterschiedliche-werte-zeigen/)

## Smartphone-Mikrofone sind nicht für absolute Schallmessungen gebaut

Die eingebauten Mikrofone eines Smartphones wurden in erster Linie für Telefonate, Sprachaufnahmen, Videos und Sprachassistenten entwickelt. Eine normgerechte Messung des absoluten Schalldruckpegels ist nicht ihre Hauptaufgabe.

Das führt zu mehreren Einschränkungen.

### Die absolute Mikrofonempfindlichkeit ist oft unbekannt

Eine App erhält zunächst digitale Audiodaten. Deren Amplitude entspricht nicht automatisch einem bekannten Schalldruckpegel in Dezibel. Damit daraus ein plausibler dB-Wert wird, benötigt die App einen passenden Gerätewert oder eine Kalibrierung.

Ist dieser Ausgangswert falsch, kann die gesamte Anzeige beispielsweise dauerhaft 4 oder 6 dB zu hoch oder zu niedrig liegen.

### Der Frequenzgang ist häufig auf Sprache optimiert

Smartphone-Mikrofone und die dahinterliegende Signalverarbeitung behandeln tiefe, mittlere und hohe Frequenzen nicht immer gleich. Sprachrelevante Frequenzen können hervorgehoben, tiefe Frequenzen abgeschwächt und Störgeräusche gefiltert werden.

Ein einzelner Kalibrierungswert kann eine konstante Abweichung korrigieren. Er kann jedoch keinen ungleichmäßigen Frequenzgang vollständig ausgleichen. Eine App kann bei gleichmäßigem Rauschen gut abschneiden und bei tiefem Motorgeräusch, Musik oder einem hohen Pfeifton viel stärker abweichen.

### Leise Räume werden durch das Eigenrauschen begrenzt

In einer sehr ruhigen Wohnung, einem gut gedämmten Schlafzimmer oder einem leeren Büro kann das Eigenrauschen des Smartphones einen erheblichen Teil der Anzeige ausmachen. Das Gerät zeigt dann möglicherweise weiterhin 30 oder 40 dB(A) an, obwohl der tatsächliche Umgebungspegel niedriger ist.

Bei einigen getesteten Smartphone-Systemen wurden Pegel unter 40 bis 50 dB(A) auch nach einer Kalibrierung überschätzt. Der genaue Bereich ist geräteabhängig.

### Hohe Pegel können das Mikrofon überfordern

Bei lauten Geräuschen kann die Eingangsstufe komprimieren oder clippen, auf Deutsch meist als Übersteuerung bezeichnet. Das Smartphone bildet dann einen weiteren Anstieg des realen Schallpegels nicht mehr linear ab.

Bei vielen Geräten steigt dieses Risiko ab etwa 90 dB. Manche Smartphones bleiben oberhalb dieses Bereichs noch brauchbar, andere komprimieren schon früher. Eine universelle Grenze gibt es nicht.

Das Display kann trotzdem beispielsweise 94,3 dB anzeigen. Die Nachkommastelle sagt jedoch nichts darüber aus, ob das Mikrofon den Schall noch korrekt erfasst.

## Automatische Verstärkung verfälscht den Zusammenhang

Automatic Gain Control, kurz AGC, passt die Mikrofonverstärkung automatisch an das Eingangssignal an. Für Telefonate ist das hilfreich: Leise Sprache wird angehoben, laute Sprache abgesenkt.

Für eine absolute Schallpegelmessung ist dieses Verhalten problematisch.

Wird ein Geräusch tatsächlich um 10 dB lauter, kann das Smartphone gleichzeitig die Verstärkung reduzieren. Die App registriert dann möglicherweise nur einen viel kleineren Anstieg. Umgekehrt kann ein leises Geräusch zu hoch dargestellt werden, weil die Verstärkung automatisch erhöht wird.

Android bietet für kompatible Geräte eine möglichst unverarbeitete Audioquelle an. Die offizielle Dokumentation weist jedoch darauf hin, dass nicht jedes Gerät einen wirklich unverarbeiteten Audiopfad bereitstellt. Eine App kann diesen Modus anfordern, ohne garantieren zu können, dass das Smartphone sämtliche Bearbeitung deaktiviert.

Auch die gewählte Audioquelle spielt eine Rolle. Ein für Sprachkommunikation vorgesehener Eingang kann andere Filter verwenden als ein Eingang für allgemeine Audioaufnahmen.

## In welchem Pegelbereich ist eine dB-Messung mit dem Handy genau genug?

Smartphones funktionieren häufig in einem mittleren Lautstärkebereich am besten. Bei sehr leisen und sehr lauten Geräuschen steigen die Unsicherheiten.

Unterhalb von 30 bis 40 dB(A) können Eigenrauschen und automatische Verarbeitung die Anzeige dominieren. Eine App eignet sich daher nur eingeschränkt, um beispielsweise besonders leise Lüfter, Schlafräume oder den Schallschutz einer Wohnung zu beurteilen.

Viele wissenschaftliche Untersuchungen konzentrieren sich auf Pegel zwischen etwa 40 und 85 dB(A). In diesem Bereich können ausgewählte und kalibrierte Systeme brauchbare Werte liefern. Eine Garantie für jedes Smartphone ist das dennoch nicht.

Zwischen etwa 85 und 95 dB(A) werden Unterschiede zwischen Geräten besonders relevant. Manche Android-Apps und Smartphones unterschätzen bereits einen Referenzpegel von 90 dB(A). Andere getestete Systeme bleiben in diesem Bereich näher am Referenzgerät.

Oberhalb von 90 bis 95 dB steigt bei vielen eingebauten Mikrofonen die Gefahr von Kompression und Übersteuerung. Eine Skala in der App, die bis 120 oder 130 dB reicht, beweist nicht, dass das Smartphone solche Pegel tatsächlich messen kann. Sie zeigt nur, welche Zahlen die Benutzeroberfläche darstellen kann.

## Durchschnittswerte sind leichter zu erfassen als kurze Spitzen

Eine App kann bei einem gleichmäßigen Geräusch einen brauchbaren Mittelwert anzeigen und trotzdem die lauteste Spitze verfehlen.

Kurze Schallereignisse stellen höhere Anforderungen an das Mikrofon, die Abtastrate und die Auswertung. Dazu gehören beispielsweise:

* ein platzender Luftballon
* Feuerwerk
* ein herunterfallender Metallgegenstand
* Hammerschläge
* eine Tür, die mit großer Kraft zuschlägt
* impulsartige Maschinen- oder Baustellengeräusche

Das Smartphone kann solche Spitzen glätten, komprimieren oder vollständig übersteuern. Ein angezeigter Maximalwert ist deshalb nicht automatisch ein korrekt gemessener Spitzenschalldruckpegel.

Auch die verwendete Messgröße muss klar sein. Ein zeitlicher Mittelwert wie LAeq, ein maximaler Wert mit schneller Zeitbewertung und ein C-bewerteter Spitzenpegel beschreiben unterschiedliche Eigenschaften eines Geräuschs.

[dB und dB(A): Was ist der Unterschied?](/de/artikel/db-und-dba-unterschied/)

## Wind, Hülle, Abstand und Raum beeinflussen das Ergebnis

Selbst eine gute App kann unplausible Werte liefern, wenn die Messbedingungen nicht kontrolliert werden.

### Smartphone-Hülle

Eine Hülle kann eine Mikrofonöffnung teilweise verdecken oder den Schall reflektieren. Besonders dicke Schutzhüllen und schlecht sitzende Cases können das Ergebnis verändern. Für vergleichbare Messungen sollte immer dieselbe Konfiguration verwendet werden.

### Wind

Wind erzeugt direkt an der Mikrofonöffnung starke Druckschwankungen. Schon ein mäßiger Luftzug kann die Anzeige stark erhöhen. Im Freien sollte das Smartphone windgeschützt gehalten werden. Ein improvisierter Schutz darf die Mikrofonöffnung jedoch nicht vollständig verdecken.

### Abstand

Der Schallpegel hängt stark vom Abstand zur Quelle ab. Eine Küchenmaschine direkt neben dem Smartphone ergibt einen anderen Wert als dieselbe Maschine aus zwei Metern Entfernung.

Bei Vergleichen muss deshalb immer derselbe Messabstand verwendet werden. Die Aussage "Ein Staubsauger hat 75 dB" bleibt ohne Entfernungsangabe unvollständig.

### Ausrichtung

Je nach Position der Mikrofone kann es einen Unterschied machen, ob die Unterkante, Rückseite oder Oberseite des Smartphones zur Schallquelle zeigt. Für wiederholte Messungen sollte die Ausrichtung gleich bleiben.

### Raumakustik

Wände, Fenster, Bodenflächen und Möbel reflektieren Schall. In einem gefliesten Badezimmer kann ein Gerät lauter erscheinen als in einem möblierten Wohnzimmer. Auch die Position nahe einer Wand oder in einer Raumecke erhöht häufig den gemessenen Pegel.

## Kalibrierung verbessert die Messung, löst aber nicht alle Probleme

Eine Kalibrierung ist besonders hilfreich, wenn das Smartphone einen relativ konstanten Fehler aufweist.

Zeigt ein kalibriertes Referenzgerät beispielsweise 74 dB(A) und das Smartphone unter denselben Bedingungen 70 dB(A), kann ein Korrekturwert von +4 dB die Übereinstimmung in der Nähe dieses Pegels verbessern.

Eine Einpunkt-Kalibrierung kann jedoch nicht alles korrigieren. Sie behebt nicht:

* einen ungleichmäßigen Frequenzgang
* wechselnde automatische Verstärkung
* Kompression und Übersteuerung
* das Eigenrauschen des Mikrofons
* verdeckte Mikrofonöffnungen
* falsche Frequenzbewertungen
* eine ungeeignete Zeitbewertung
* fehlende oder geglättete Spitzenwerte

Die Kalibrierung braucht außerdem eine vertrauenswürdige Referenz. Ein zweites unkalibriertes Smartphone ist keine geeignete Grundlage. Auch ein Testton aus einem YouTube-Video erzeugt am Mikrofon keinen bekannten Schalldruckpegel, da Lautsprecher, Lautstärkeeinstellung, Entfernung und Raumakustik das Ergebnis verändern.

Die beste Referenz ist ein kalibriertes Schallpegelmessgerät unter reproduzierbaren Bedingungen.

[Dezibel-App richtig kalibrieren](/de/artikel/dezibel-app-kalibrieren/)

## Verbessert ein externes Mikrofon die Genauigkeit?

Ein geeignetes externes Messmikrofon kann die Wiederholbarkeit und den nutzbaren Pegelbereich verbessern. Solche Mikrofone haben häufig:

* eine besser bekannte Empfindlichkeit
* einen gleichmäßigeren Frequenzgang
* eine höhere Übersteuerungsgrenze
* eine reproduzierbarere Bauform
* eine passende Form für einen akustischen Kalibrator

In Studien erreichten bestimmte Kombinationen aus Smartphone, App und externem Mikrofon eine gute Übereinstimmung mit Referenzsystemen. Teilweise erfüllte ein konkretes Gesamtsystem einen großen Teil der untersuchten Anforderungen an ein Schallpegelmessgerät der Klasse 2.

Das ist jedoch keine allgemeine Zertifizierung aller externen Smartphone-Mikrofone. Entscheidend bleibt die vollständige Kombination aus Mikrofon, Audioadapter, Smartphone, App, Einstellungen und Kalibrierung.

Auch USB- und Bluetooth-Mikrofone sind nicht automatisch besser. Bluetooth kann zusätzliche Signalverarbeitung und Kompression einsetzen. Für ernsthaftere Messungen ist eine kabelgebundene, dokumentierte Audiolösung meist die bessere Wahl.

## Wann reicht eine Lärm-App aus?

Eine Smartphone-App ist besonders nützlich, wenn die Folgen einer möglichen Messabweichung begrenzt sind. Sie eignet sich vor allem für Orientierung, Vergleiche und das Erkennen auffälliger Situationen.

Sinnvolle Anwendungen sind beispielsweise:

* dieselbe Schallquelle vor und nach einer Veränderung vergleichen
* verschiedene Räume einer Wohnung vergleichen
* feststellen, welche Strecke zur Arbeit wahrscheinlich lauter ist
* die Wirkung eines geschlossenen Fensters grob beurteilen
* erkennen, ob ein Restaurant, Konzert oder Fitnessstudio sehr laut wirkt
* wiederkehrende Messungen mit demselben Smartphone dokumentieren
* entscheiden, ob eine professionelle Messung sinnvoll sein könnte
* eine Lärmbeschwerde mit unverbindlichen Orientierungswerten ergänzen

Relative Vergleiche sind häufig aussagekräftiger als absolute Werte. Wenn dasselbe Smartphone am gleichen Ort und im gleichen Abstand nach einer Maßnahme 6 dB weniger anzeigt, ist die Veränderung wahrscheinlich relevant, selbst wenn der absolute Ausgangswert nicht perfekt war.

Große Abstände zu einer Entscheidungsgrenze lassen sich ebenfalls besser beurteilen. Zeigt das Smartphone in einer Werkstatt oder auf einer Veranstaltung etwa 98 dB(A), ist die Umgebung offensichtlich laut, auch wenn der tatsächliche Wert einige Dezibel abweicht.

Eine Anzeige von 84 statt 86 dB(A) sollte dagegen keine Grundlage für eine rechtliche, arbeitsmedizinische oder technische Entscheidung sein.

## Wann reicht eine Smartphone-App nicht aus?

Eine Dezibel-App ersetzt kein kalibriertes Schallpegelmessgerät der Klasse 1 oder Klasse 2, wenn das Ergebnis offiziell, sicherheitsrelevant oder technisch belastbar sein muss.

Professionelle Messtechnik und ein festgelegtes Messverfahren sind insbesondere erforderlich bei:

* Gefährdungsbeurteilungen am Arbeitsplatz
* Bewertungen nach der Lärm- und Vibrations-Arbeitsschutzverordnung
* behördlichen oder gerichtlichen Lärmbeschwerden
* bauakustischen Prüfungen
* Maschinen- und Produktmessungen
* Abnahme- und Zertifizierungsverfahren
* Messungen nahe gesetzlicher Grenz- oder Auslösewerte
* impulsartigen oder extrem lauten Geräuschen
* ausgeprägten tieffrequenten oder tonhaltigen Geräuschen
* wissenschaftlichen Untersuchungen mit rückführbaren Messdaten

Im betrieblichen Arbeitsschutz spielen neben dem angezeigten Pegel unter anderem Messdauer, Mikrofonposition, Tages-Lärmexpositionspegel, Spitzenpegel, Kalibrierkontrollen und die verwendete Frequenzbewertung eine Rolle. Eine Handy-App kann auf ein mögliches Problem hinweisen, aber keine fachkundige Arbeitsplatzmessung ersetzen.

[Smartphone-Schallpegelmesser oder professionelles Messgerät?](/de/artikel/schallpegelmesser-app-vs-messgeraet/)

## Woran lässt sich eine seriöse Dezibel-App erkennen?

Eine vertrauenswürdige App erklärt ihre Grenzen, statt eine unrealistische Messgenauigkeit zu versprechen.

Achten Sie darauf, ob die App folgende Informationen anzeigt:

* Messgröße, beispielsweise dB(A), LAeq, Maximum oder Peak
* verwendete Frequenzbewertung
* Zeitbewertung oder Mittelungsdauer
* Kalibrierungsstatus
* ausgewählter Mikrofoneingang
* mögliche Übersteuerung
* Messdauer
* Mindest-, Mittel- und Höchstwert
* deutlicher Hinweis auf eine Schätzung

Eine Nachkommastelle beweist keine Messgenauigkeit. "67,4 dB" bedeutet nicht, dass das Smartphone auf 0,1 dB genau misst.

Auch Bewertungen im App-Store, ein professionell wirkendes Design oder eine sehr große Pegelskala sagen wenig über die tatsächliche Messqualität aus. Entscheidend sind transparente Berechnung, vernünftige Geräteeinstellungen, Kalibrierungsmöglichkeiten und ehrliche Einschränkungen.

## So werden Smartphone-Messungen vergleichbarer

Für möglichst brauchbare Ergebnisse sollte die Messmethode konsequent gleich bleiben:

1. Verwenden Sie immer dasselbe Smartphone und dieselbe App.
2. Entfernen Sie eine Hülle, wenn sie die Mikrofonöffnung verdecken könnte.
3. Halten Sie das Smartphone bei jeder Messung in derselben Ausrichtung.
4. Messen Sie in einem festgelegten Abstand zur Schallquelle.
5. Vermeiden Sie Wind und direkte Berührung der Mikrofonöffnung.
6. Nutzen Sie für Vergleiche dieselbe Frequenzbewertung und Mittelungsdauer.
7. Kalibrieren Sie die App nach Möglichkeit mit einem kalibrierten Referenzgerät.
8. Verlassen Sie sich bei Pegeln oberhalb von etwa 90 dB nicht ungeprüft auf das eingebaute Mikrofon.
9. Bewerten Sie kurze Spitzen besonders vorsichtig.
10. Dokumentieren Sie Ort, Abstand, Gerät, App-Version und Einstellungen.

Diese Vorgehensweise macht aus dem Smartphone noch kein professionelles Messgerät. Sie reduziert aber vermeidbare Unterschiede und verbessert die Aussagekraft wiederholter Messungen.

## dBcheck als Schätz- und Vergleichswerkzeug verwenden

dBcheck ist dafür gedacht, Umgebungsgeräusche zu beobachten, Messsitzungen miteinander zu vergleichen und Werte wie MIN, AVG, MAX, Peak und den äquivalenten Sitzungspegel auszuwerten, soweit sie auf dem verwendeten Gerät verfügbar sind.

Für sinnvolle Vergleiche sollten Smartphone, Position, Abstand, Einstellungen und Kalibrierung möglichst unverändert bleiben. Die Ergebnisse sind als geschätzte Smartphone-Messungen zu verstehen.

dBcheck ist kein zertifiziertes Schallpegelmessgerät der Klasse 1 oder Klasse 2. Die App liefert keinen Nachweis über die Einhaltung gesetzlicher Vorgaben und ersetzt keine professionelle, arbeitsmedizinische, behördliche oder bauakustische Messung.

Gerade diese klare Abgrenzung ist wichtig: Eine ehrliche Schätzung ist nützlicher als eine scheinbar exakte Zahl, deren technische Grenzen verschwiegen werden.

## Quellen

1. Android Developers, *AutomaticGainControl API reference*. https://developer.android.com/reference/kotlin/android/media/audiofx/AutomaticGainControl
2. Android Developers, *MediaRecorder.AudioSource API reference*. https://developer.android.com/reference/kotlin/android/media/MediaRecorder.AudioSource
3. Kardous und Shaw, *Evaluation of smartphone sound measurement applications*. https://europepmc.org/article/MED/25236152
4. Murphy und King, *Testing the accuracy of smartphones and sound level meter applications for measuring environmental noise*. https://doi.org/10.1016/j.apacoust.2015.12.012
5. Kardous und Shaw, *Evaluation of smartphone sound measurement applications using external microphones: A follow-up study*. https://europepmc.org/article/MED/27794313
6. Celestina, Hrovat und Kardous, *Smartphone-based sound level measurement apps: Evaluation of compliance with international sound level meter standards*. https://doi.org/10.1016/j.apacoust.2018.04.011
7. Serpanos et al., *The Accuracy of Smartphone Sound Level Meter Applications in Measuring Sound Levels in Clinical Rooms*. https://europepmc.org/article/MED/33469901
8. Huyan et al., *Assessing the Usefulness of Mobile Apps for Noise Management in Occupational Health and Safety*. https://doi.org/10.2196/46846
9. McLennon et al., *Evaluation of smartphone sound level meter applications as a reliable tool for noise monitoring*. https://pubmed.ncbi.nlm.nih.gov/31356145/
10. Lee und Hampton, *Smartphone applications for measuring noise in the intensive care unit: A feasibility study*. https://doi.org/10.1016/j.jcrc.2023.154435
