# Sprachtrainer

Kostenlose statische Web-App mit Sprachauswahl und 50 polnischen Vokabeln. Öffne `index.html` zum Ausprobieren. Für GitHub Pages alle Dateien und den Dateien ins Hauptverzeichnis eines öffentlichen Repositorys hochladen; unter Settings → Pages → Deploy from a branch → main → /(root) aktivieren.

Neue Sprache ergänzen: `xx.js` anlegen, mit `window.VOCAB=window.VOCAB||{}; window.VOCAB.xx=[{de:'Haus',target:'...',category:'Wohnen'}, ...];` befüllen (mindestens vier Einträge), dann `{id:'xx',name:'Sprachname',file:'xx.js'}` in `data/languages.js` ergänzen. Die Dateinamen und IDs müssen übereinstimmen.

Antworten werden gemischt; falsch beantwortete Wörter erscheinen nach einigen Fragen erneut. Der Lernstand gilt für die aktuelle Sitzung. Eine dauerhafte Speicherung und Aussprache sind für spätere Versionen vorgesehen.
