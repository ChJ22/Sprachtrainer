# Sprachtrainer

Hauptversion: https://chj22.github.io/Sprachtrainer/
Testumgebung: https://chj22.github.io/Sprachtrainer-Test/

## Angebot
Sechs Menü- und Basissprachen: Deutsch, Englisch, Französisch, Spanisch, Italienisch und Polnisch. Jede kann mit einer anderen kombiniert werden. Je Sprachpaar 300 Wörter, 120 Sätze in sechs Situationen und 60 Grammatikaufgaben je Lernrichtung. Vorlesen nur nach Antippen. Aufgaben und Antworten sind größer dargestellt; Einstellungen und Konto sind kompakter.

## Benutzerkonten und Lernstand
Mit E-Mail und Passwort registrieren, Bestätigungslink öffnen und anmelden. Das Gasttraining bleibt verfügbar; Gastantworten werden nicht nachträglich dem Konto zugeordnet. Angemeldete Antworten werden mit Benutzer-ID, Basissprache, Lernsprache, Übungsart, Richtung und Datum gespeichert.

Lernstand und offene Fehler zeigen nur das ausgewählte Sprachpaar. Gespeicherte Fehler lassen sich in der Übungsauswahl wiederholen. Eine richtige Wiederholung löst den betreffenden offenen Fehler. Historische Antworten bleiben erhalten. Alle Menü- und Kontotexte folgen der gewählten Menüsprache.

Nicht übertragene Antworten bleiben pro Benutzer auf dem Gerät vorgemerkt. Synchronisieren überträgt sie erneut. Eine laufende Runde wird beim Kontowechsel zurückgesetzt; ein exaktes Fortsetzen einer Runde ist nicht enthalten. Grammatik-Erklärungen sind weiterhin deutsch; einzelne Übersetzungen von Grammatikbeispielen fehlen in manchen Sprachpaaren.

## Übernahme in den Haupttrainer
1. In Supabase unter Authentication → URL Configuration die Site URL auf https://chj22.github.io/Sprachtrainer/ setzen und speichern.
2. Unter Redirect URLs zusätzlich genau https://chj22.github.io/Sprachtrainer/ hinzufügen. Die vorhandene Testadresse behalten.
3. Die Dateien dieses Ordners direkt ins Stammverzeichnis des GitHub-Repository Sprachtrainer hochladen und committen. Keine Dateien löschen oder manuell bearbeiten.
4. Nach Veröffentlichung den Haupttrainer neu laden, anmelden und den vorhandenen Lernstand prüfen. Zwei getrennte Konten prüfen: Nach einem Kontowechsel dürfen nur die jeweiligen eigenen Antworten erscheinen.

Die vorhandene Datenbank, Benutzerkonten, Ergebnisse und Zugriffsschutzregeln werden weiterverwendet. Kein SQL erneut ausführen, keine Tabelle neu anlegen oder umbenennen. Der technische Tabellenname trainer_attempts_test und der bisherige lokale Speicher-Schlüssel bleiben unverändert, damit bestehende Ergebnisse und noch nicht übertragene Antworten erhalten bleiben. config.js enthält nur Projekt-URL und öffentlichen Publishable Key.

## Testumgebung
Sprachtrainer-Test bleibt als eigene Website bestehen. Solange beide Versionen denselben Supabase-Zugang und dieselbe Tabelle verwenden, greifen sie auf dieselben Benutzerkonten und Lernstände zu. Vor Änderungen an Datenstruktur oder Speicherung die Testdaten vom Hauptbetrieb trennen.

## Prüfungen
Automatisierte Funktionsprüfungen mit simulierter Datenbank: alle 30 Sprachpaare, beide Richtungen, alle drei Übungsarten, gespeicherte Fehler, Offline-Warteschlange, Kontowechsel, Paginierung und sechs Menüsprachen. Speicherung wurde vom Nutzer in der Testseite bestätigt. Der reale Test mit zwei Benutzerkonten ist noch nicht bestätigt. Die neue Hauptadresse muss nach dem Upload geprüft werden.
