# Sprachtrainer

Originaltrainer: https://chj22.github.io/Sprachtrainer/
Separate Testumgebung: https://chj22.github.io/Sprachtrainer-Test/

## Upload
Alle 25 Dateien aus dem entpackten Ordner Sprachtrainer direkt in das Stammverzeichnis des bestehenden Repository Sprachtrainer hochladen und vorhandene Dateien ersetzen. Nicht den Ordner selbst oder die ZIP-Datei hochladen. styles.css und dialogues.js gehören dazu. GitHub Pages verwendet weiterhin main und / (root). Nach der Veröffentlichung die Seite neu laden.

## Übernommene Änderungen
Professionelles Layout mit kompakten Kontoeinstellungen und hervorgehobenem Lernbereich. Lernstand mit eigenen Karten für Wörter, Sätze, Grammatik und Dialoge; große Fehlerzahlen und bernsteinfarbene Markierung bei offenen Fehlern. Alle sechs Menü- und Basissprachen, freie Sprachpaare, Vorlesen nach Antippen, Fehlerwiederholung und gespeicherter Lernstand. Zehn Dialoge mit je sechs Schritten je Sprache, Antwortauswahl und Gesprächsverlauf. Kein Hinweis auf eine Testversion im Originaltrainer.

## Bestehende Datenbank
Der Originaltrainer verwendet die bereits eingerichtete Supabase-Verbindung und dieselben Tabellen wie die Testversion: trainer_attempts_test und trainer_dialog_attempts_test. Die Tabellennamen bleiben erhalten, damit vorhandene Antworten und Lernstände weiter geladen werden. Kein erneutes SQL und keine neue Datenbank erforderlich. Die zuvor ausgeführte Dialog-Erweiterung muss vorhanden sein. config.js enthält ausschließlich die öffentliche Projekt-URL und den Publishable Key.

Site URL: https://chj22.github.io/Sprachtrainer/
Zugelassene Redirect URLs: Originaltrainer und Testumgebung, jeweils mit abschließendem Schrägstrich. Diese Einstellungen wurden bereits vorbereitet.

Ergebnisse werden pro Benutzer und Basis-/Lernsprache gespeichert. Als Gast bleibt das Training nutzbar; Gastantworten werden nicht in die Datenbank übernommen. Fehlerzahlen zählen zuletzt falsch beantwortete Aufgaben je Richtung, nicht alle bisherigen falschen Versuche und nicht noch unbeantwortete Aufgaben.

Die Testumgebung bleibt separat für weitere Änderungen bestehen; beide Seiten nutzen denselben gespeicherten Lernstand.

## Prüfung
Automatisierte Simulationen prüfen alle Sprachpaare, Navigation, Dialoge, Fehlerwiederholung, Lernstand, Offline-Wiederholung und Kontotrennung. Nach dem Upload im Originaltrainer anmelden und den vorhandenen Lernstand prüfen. Eine Prüfung mit zwei echten Supabase-Benutzern steht weiterhin aus. Grammatik-Erklärungen sind weiterhin deutsch; einzelne Grammatikübersetzungen fehlen in manchen Sprachpaaren.
