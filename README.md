# Sprachtrainer – freie Sprachpaare

Stand: 2. Oktober 2026. Die Menü- und Basissprache kann Deutsch, Englisch, Französisch, Spanisch, Italienisch oder Polnisch sein. Die Lernsprache wird unabhängig davon gewählt. Eine Sprache kann nicht mit sich selbst kombiniert werden: Es gibt 30 Sprachpaare, jeweils mit beiden Übungsrichtungen.

## Umfang

- 300 Wörter und 120 Sätze pro Sprachpaar. Die vorhandenen Sprachdateien werden anhand der gemeinsamen deutschen Einträge verbunden. Dadurch bleiben die bereits gepflegten Übersetzungen erhalten.
- Sätze: 20 je Situation für Einkaufen, Im Café, Unterwegs, Im Hotel, Familie & Alltag und Gesundheit.
- 60 Grammatikaufgaben in der Sprache, auf die die gewählte Richtung zeigt. Englisch → Polnisch übt polnische Grammatik; Polnisch → Englisch übt englische Grammatik. Deutsch ist ebenfalls als Lernsprache verfügbar und hat 60 eigene Grammatikaufgaben.
- Menü, Kategorien, Buttons, Rückmeldungen und Fehlerauswertung in allen sechs Sprachen.
- Zwei Sprachbuttons bei Wörtern und Sätzen; vor der Antwort ist nur die Frage hörbar, danach beide Sprachen. Keine automatische Sprachausgabe.
- Grammatik: vorhandene vollständige Beispielsätze werden in beiden Sprachen angezeigt, wenn die entsprechende Übersetzung bereits in den Datensätzen vorhanden ist. Fehlt eine Übersetzung, wird ausschließlich der vorhandene vollständige Satz gezeigt und vorgelesen. Die Grammatikaufgabe selbst bleibt vollständig verfügbar. Die ausführlichen Grammatik-Erklärungen bleiben vorerst deutsch.
- Fehlerliste und gezielte Wiederholung innerhalb einer Runde.

## Sprache wechseln

Die Menü- und Basissprache wird lokal auf dem Gerät gespeichert, sofern der Browser Speicherung erlaubt. Die Sprache der Tonwiedergabe richtet sich nach dem jeweiligen Inhalt. Ein Wechsel der Basis beendet die aktuelle Runde und führt zurück zur Sprachauswahl; Punktestand und Fehlerliste der alten Runde werden zurückgesetzt.

## Dieses Update hochladen

ZIP entpacken und die fünf Dateien im Hauptverzeichnis des bestehenden Repositorys `ChJ22/Sprachtrainer` hochladen:

- `index.html`
- `app.js`
- `interface.js`
- `german-grammar.js`
- `README.md`

Anschließend **Commit changes** wählen. Gleichnamige Dateien werden ersetzt. Keine Dateien löschen oder manuell bearbeiten. Alle vorhandenen Wort-, Satz- und Grammatikdateien sowie `languages.js` werden weiterhin benötigt. GitHub Pages bleibt auf `main` und `/(root)` eingestellt. Nach der Veröffentlichung den Trainer neu öffnen.

## Beispiele

- English als Basis, Polski als Lernsprache: English → Polish oder Polish → English.
- Français als Basis, Deutsch als Lernsprache: Français → Allemand oder Allemand → Français.
- Deutsch als Basis, Italiano als Lernsprache: Deutsch → Italienisch oder Italienisch → Deutsch.

## Prüfung und nächster Schritt

JavaScript-Funktionstests prüfen alle 30 Sprachpaare, alle drei Übungsarten und beide Richtungen, die Zuordnung Englisch–Polnisch, Sprachkennungen für die Tonwiedergabe, Deutsch als Lernsprache, Fehlerwiederholung und Rücksetzung beim Basiswechsel. Dies ersetzt keinen Hörtest auf dem iPhone; Stimmen und Aussprache hängen weiterhin vom Gerät ab.

Ein Nutzerkonto und die dauerhafte Speicherung des Lernstands sind in diesem Paket noch nicht enthalten. Dafür wird separat ein Supabase-Testprojekt eingerichtet; die vorbereitete Konten-Testversion muss vor der Verbindung auf diesen aktuellen Stand gebracht werden.
