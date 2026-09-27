# Sprachtrainer

Kostenlose Web-App zum Üben von Polnisch und Deutsch: [Trainer öffnen](https://chj22.github.io/Sprachtrainer/).

## Aktueller Stand

- **300 polnisch-deutsche Wörter** in `pl.js`.
- **120 Beispielsätze** in `sentences.js`: je 20 für Einkaufen, Im Café, Unterwegs, Im Hotel, Familie & Alltag und Gesundheit. Bei Sätzen lässt sich eine Situation oder „Alle Situationen“ auswählen.
- Ablauf: zuerst **Sprache**, dann **Wörter oder Sätze**, danach Übungsrichtung und Start. **Grammatik** bietet 60 Lückenaufgaben: je 20 zu Verbformen, Fällen und Adjektivformen. Hier wählt man ein Thema und erhält nach jeder Antwort eine kurze Erklärung samt Beispielsatz.
- Das Quiz zeigt vier gemischte Antwortmöglichkeiten und zählt richtige Antworten. Falsch beantwortete Einträge kommen nach einigen Aufgaben erneut. Nach dem Ende der Liste beginnt eine neue Runde.
- Separate Buttons zum Anhören auf **Deutsch** und **Polnisch**. Die Aussprache startet nur nach einem Klick. Bei Wörtern und Sätzen ist vor dem Beantworten nur die Sprache der sichtbaren Frage hörbar; nach der Antwort sind beide Buttons verfügbar. Bei Grammatikaufgaben werden beide Buttons erst nach der Antwort für den vollständigen Beispielsatz angezeigt.
- Die Sprachausgabe verwendet die Stimmen des jeweiligen Geräts und Browsers. Die Aussprache kann daher unterschiedlich klingen. Ein dauerhaft gespeicherter Lernstand ist noch nicht eingebaut; die Zählung beginnt beim Start einer neuen Übung wieder bei null.

## Dateien

| Datei | Aufgabe |
| --- | --- |
| `index.html` | Darstellung und Auswahlbildschirme |
| `app.js` | Navigation, Quiz und Sprachbuttons |
| `languages.js` | Verfügbare Sprachen |
| `pl.js` | Polnische Wörter und deutsche Übersetzungen |
| `sentences.js` | Polnische und deutsche Sätze mit Situationskategorien |
| `grammar.js` | Grammatikaufgaben mit Antworten, Erklärungen und Beispielsätzen |
| `README.md` | Projektbeschreibung |

## Weitere Inhalte ergänzen

Ein Wort in `pl.js` hat die Form `['Haus','dom','Wohnen']`: deutsche Bezeichnung, polnische Übersetzung, Kategorie. Ein Satz in `sentences.js` folgt demselben Muster, zum Beispiel `['Ich brauche Hilfe.','Potrzebuję pomocy.','Gesundheit']`. Neue Situationen erscheinen nach dem Laden der Satzdatei automatisch in der Auswahl. Möglichst keine identischen deutschen oder polnischen Quizantworten mehrfach eintragen, damit jede Aufgabe eindeutig bleibt.

Für weitere Sprachen reichen neue Vokabeldateien allein nicht aus: Die Sprachliste und gegebenenfalls die Sprachausgabe und Satzdaten müssen ebenfalls ergänzt werden.

## Auf GitHub Pages veröffentlichen

Die Dateien liegen im Hauptverzeichnis des öffentlichen Repositorys `ChJ22/Sprachtrainer`. Unter **Settings → Pages** ist **Deploy from a branch → main → /(root)** eingerichtet. Für Änderungen gleichnamige Dateien im Hauptverzeichnis hochladen und **Commit changes** wählen. Das kann einige Minuten dauern; bei einer alten Ansicht die Trainerseite neu öffnen.

## Als Nächstes

Grammatikübungen ausbauen, den Wortschatz erweitern und die polnische Aussprache problematischer Wörter für alle Nutzer verbessern.
