# Sprachtrainer

Kostenlose Web-App zum Üben von Polnisch, Englisch oder Spanisch mit deutscher Ausgangssprache: [Trainer öffnen](https://chj22.github.io/Sprachtrainer/).

## Aktueller Stand

- Je **300 Wörter** für Polnisch (`pl.js`), Englisch (`en.js`) und Spanisch (`es.js`) mit deutscher Übersetzung.
- Je **120 Beispielsätze** für Polnisch (`sentences.js`), Englisch (`en-sentences.js`) und Spanisch (`es-sentences.js`): je 20 für Einkaufen, Im Café, Unterwegs, Im Hotel, Familie & Alltag und Gesundheit. Bei Sätzen lässt sich eine Situation oder „Alle Situationen“ auswählen.
- Ablauf: zuerst **Sprache**, dann **Wörter oder Sätze**, danach Übungsrichtung und Start. **Grammatik** bietet je Sprache 60 Lückenaufgaben. Polnisch behandelt Verbformen, Fälle und Adjektivformen; Englisch behandelt Verbformen, Zeitformen sowie Artikel und Präpositionen; Spanisch behandelt Verbformen, Vergangenheit sowie Artikel und Präpositionen. Hier wählt man ein Thema und erhält nach jeder Antwort eine kurze Erklärung samt Beispielsatz.
- Das Quiz zeigt vier gemischte Antwortmöglichkeiten und zählt richtige Antworten. Falsch beantwortete Einträge kommen nach einigen Aufgaben erneut. Nach dem Ende der Liste beginnt eine neue Runde. Über **„Runde beenden · Fehler ansehen“** öffnet sich eine Liste aller in dieser Runde falsch beantworteten Aufgaben mit der richtigen Lösung und der gewählten falschen Antwort. **„Fehler wiederholen“** startet diese Aufgaben erneut; **„Neue Runde“** setzt die Auswertung zurück.
- Separate Buttons zum Anhören auf **Deutsch** und der gewählten Sprache (**Polnisch**, **Englisch** oder **Spanisch**). Die Aussprache startet nur nach einem Klick. Bei Wörtern und Sätzen ist vor dem Beantworten nur die Sprache der sichtbaren Frage hörbar; nach der Antwort sind beide Buttons verfügbar. Bei Grammatikaufgaben werden beide Buttons erst nach der Antwort für den vollständigen Beispielsatz angezeigt.
- Die Sprachausgabe verwendet die Stimmen des jeweiligen Geräts und Browsers. Die Aussprache kann daher unterschiedlich klingen. Ein dauerhaft gespeicherter Lernstand ist noch nicht eingebaut; die Zählung beginnt beim Start einer neuen Übung wieder bei null.

## Dateien

| Datei | Aufgabe |
| --- | --- |
| `index.html` | Darstellung und Auswahlbildschirme |
| `app.js` | Navigation, Quiz und Sprachbuttons |
| `languages.js` | Verfügbare Sprachen |
| `pl.js`, `en.js`, `es.js` | Wörter mit deutscher Übersetzung |
| `sentences.js`, `en-sentences.js`, `es-sentences.js` | Sätze mit Situationskategorien |
| `grammar.js`, `en-grammar.js`, `es-grammar.js` | Grammatikaufgaben mit Antworten, Erklärungen und Beispielsätzen |
| `README.md` | Projektbeschreibung |

## Weitere Inhalte ergänzen

Ein Wort in `pl.js` hat die Form `['Haus','dom','Wohnen']`: deutsche Bezeichnung, polnische Übersetzung, Kategorie. Ein Satz in `sentences.js` folgt demselben Muster, zum Beispiel `['Ich brauche Hilfe.','Potrzebuję pomocy.','Gesundheit']`. Neue Situationen erscheinen nach dem Laden der Satzdatei automatisch in der Auswahl. Möglichst keine identischen Quizantworten innerhalb einer Sprache mehrfach eintragen, damit jede Aufgabe eindeutig bleibt.

Für weitere Sprachen werden eigene Vokabel-, Satz- und Grammatikdateien sowie ein Eintrag mit Dateinamen und Sprachkennung in `languages.js` benötigt.

## Auf GitHub Pages veröffentlichen

Die Dateien liegen im Hauptverzeichnis des öffentlichen Repositorys `ChJ22/Sprachtrainer`. Unter **Settings → Pages** ist **Deploy from a branch → main → /(root)** eingerichtet. Für Änderungen gleichnamige Dateien im Hauptverzeichnis hochladen und **Commit changes** wählen. Das kann einige Minuten dauern; bei einer alten Ansicht die Trainerseite neu öffnen.

## Als Nächstes

Grammatikübungen ausbauen, den Wortschatz erweitern und die polnische Aussprache problematischer Wörter für alle Nutzer verbessern.
