# Information Dashboard – Web Component / Lit

## Ziel des Vorhabens

Dieses Projekt untersucht einen alternativen Ansatz für kleine, informative Micro Apps bzw. Dashboard-Komponenten.

Der ursprüngliche Prototyp wurde als Standalone-Anwendung mit HTML, CSS und JavaScript umgesetzt. Dieser Ansatz eignet sich gut für einen schnellen Proof of Concept, soll für eine produktive Weiterentwicklung jedoch bewusst nicht fortgeführt werden.

Stattdessen soll das Dashboard als **independently deployable Web Component** umgesetzt werden.

Die zentrale Idee:

> Das Dashboard ist keine eigenständige Anwendung, sondern eine eigenständig deploybare UI-Komponente, die in bestehende Webportale integriert werden kann.

Die Komponente soll dabei möglichst unabhängig vom verwendeten Frontend-Framework des jeweiligen Host-Portals sein.

Beispielsweise:

```text
                    Information Dashboard
                            │
                   Web Component / Lit
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼
          React           Angular       anderes Portal
          Portal           Portal          / CMS
```


Warum Web Components / Lit?

Web Components stellen einen browsernahen Standard für wiederverwendbare UI-Komponenten dar. Lit vereinfacht die Entwicklung solcher Web Components und bietet ein deklaratives Komponentenmodell, reaktive Properties, Templates und Styling.

Die Architektur trennt dabei bewusst:

- Web Component → Integrations- und Auslieferungsmodell
- Lit → Technologie zur Implementierung der Komponente
- Vite → Build- und Packaging-Tool
- Bun → Package Manager / Runtime für Entwicklung und Build

Die resultierende Komponente kann beispielsweise so verwendet werden:

```
<script
  type="module"
  src="https://frontend.example.com/information-dashboard/1.0.0/information-dashboard.js">
</script>

<information-dashboard
  title="Production Status">
</information-dashboard>
```

Der Host muss dabei nicht wissen, dass die Komponente intern mit Lit implementiert wurde.


Zielarchitektur

Die gewünschte Architektur ist ungefähr:

```
┌─────────────────────────────────────────────┐
│ Information Dashboard Repository            │
│                                             │
│ TypeScript                                  │
│ Lit                                         │
│ Vite                                        │
│ Tests                                       │
└──────────────────────┬──────────────────────┘
                       │
                       │ CI/CD
                       ▼
              ┌─────────────────┐
              │ Vite Build      │
              └────────┬────────┘
                       │
                       ▼
              information-dashboard.js
                       │
                       │ Deployment
                       ▼
              ┌─────────────────┐
              │ Static Hosting  │
              │ / CDN           │
              └────────┬────────┘
                       │
             ┌─────────┼─────────┐
             ▼         ▼         ▼
          Portal A  Portal B  Portal C
           React     Angular    CMS/etc.
```

Es wird kein eigener Backend-Service benötigt, sofern das Dashboard ausschließlich vorhandene APIs oder vom Host bereitgestellte Daten verwendet.


Aktueller Stand

Das Projekt wurde mit Vite und TypeScript initialisiert und verwendet Lit für die Web Component.

Aktuelle Struktur:

```
information-dashboard/
├── src/
│   ├── information-dashboard.ts
│   └── main.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

Alle anderen noch vorhanden Daten kommen aus Vite Template/Installation.


## Ziel: Vite als Library konfigurieren

Für die produktive Auslieferung soll nicht die komplette Vite-Demo-Anwendung verteilt werden. Stattdessen soll die eigentliche Web Component als Library gebaut werden.

```
src/information-dashboard.ts
             │
             ▼
          Vite Build
             │
             ▼
dist/
└── information-dashboard.js
```

Die Komponente kann anschließend beispielsweise über eine statische Hosting-Plattform oder ein internes CDN ausgeliefert werden.

### Independently Deployable Component testen
Ein wichtiger Proof of Concept ist die tatsächliche Integration in einen fremden Host.


## Ziel des Proof of Concept

Der Proof of Concept sollte nicht primär zeigen, dass Lit technisch funktioniert. Er sollte zeigen, dass folgende Architektur funktioniert:

```
             Independently Deployable
                    Web Component
                         │
                         ▼
                information-dashboard.js
                         │
             ┌───────────┼───────────┐
             ▼           ▼           ▼
          React       Angular     anderes
          Portal       Portal       Portal
```


Die entscheidende Frage lautet: Kann eine kleine, schlanke Informations-Micro-App unabhängig entwickelt, getestet, versioniert und deployed werden und gleichzeitig ohne starke Kopplung an das Frontend-Framework des Host-Portals integriert werden?

Wenn dieser Proof gelingt, kann anschließend entschieden werden, ob die Architektur für weitere Micro Apps bzw. UI-Komponenten innerhalb der Organisation geeignet ist.
