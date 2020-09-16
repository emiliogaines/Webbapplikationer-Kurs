# Webbapplikationer-Kurs
### Projektet
Projektet kallas för "Mio's Seminarie Finder" då jag ej kom på ett bättre namn.
Projektet bygger på en stabil bas av jQuery och Bootstrap.

### Dynamik
Hemsidan är väldigt dynamisk och laddar in "fake"-datan (som är lånad från https://liu.se/) när sidan laddas.
Elementen på sidan svarar med animation och popups för att göra det trevligare för användaren.
![GIF av hemsidan](showcase.gif)

### Data
Det är byggt på ett sådant sätt att det är superenkelt att lägga till ny data.
Skapa ett Seminarie-objekt med datan ni önskar och för in det i arrayen så är det klart.
Se exempel nedan:
```
const seminarieLista = [
    ...
    new Seminare("Titel", "Beskrivning")
];
```