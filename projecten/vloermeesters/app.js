// =========================================================
// Vloermeesters - prijsberekening
// =========================================================

// ---------- 1. Elementen uit de HTML ophalen ----------
// document.getElementById('...') zoekt in index.html het element met dat id.
// We bewaren elk element in een const, zodat we het verderop kunnen gebruiken.
const berekenKnop = document.getElementById('berekenKnop');   // knop "Bereken mijn prijs"
const naamInput = document.getElementById('naam');             // invoerveld naam
const lengteInput = document.getElementById('lengte');         // invoerveld lengte (meter)
const breedteInput = document.getElementById('breedte');       // invoerveld breedte (meter)
const voegdikteSelect = document.getElementById('voegdikte');  // keuzelijst voegdikte (waarde = prijs per m²: 4 of 6)
const voegkleurSelect = document.getElementById('voegkleur');  // keuzelijst voegkleur
const offerte = document.getElementById('offerte');            // het offerteblok (staat eerst verborgen)
const pdfKnop = document.getElementById('pdfKnop');            // knop "Download als PDF"

// ---------- 2. Klikken op "Bereken mijn prijs" ----------
// addEventListener('click', ...) voert de code tussen { } uit telkens er op de knop geklikt wordt.
berekenKnop.addEventListener('click', () => {

    // Waarden uit de velden lezen.
    // .value = wat de gebruiker heeft ingevuld (altijd tekst)
    // .trim() = spaties vooraan en achteraan weghalen
    // Number() = tekst omzetten naar een getal, zodat we ermee kunnen rekenen
    const naam = naamInput.value.trim();
    const lengte = Number(lengteInput.value.trim());
    const breedte = Number(breedteInput.value.trim());
    const voegprijs = Number(voegdikteSelect.value);
    const voegkleur = voegkleurSelect.value;

    // Controleren of alles correct is ingevuld:
    // een naam, lengte en breedte groter dan 0, en een gekozen voegdikte en voegkleur.
    // && betekent "en": alle voorwaarden moeten waar zijn.
    if (naam && lengte > 0 && breedte > 0 && voegprijs && voegkleur) {

        // ---------- Berekening ----------
        const oppervlakte = lengte * breedte;                 // oppervlakte in m²
        const plaatsingskosten = oppervlakte * 45;            // plaatsen van tegels: € 45 per m²
        const voegkosten = oppervlakte * voegprijs;           // voegafwerking: € 4 (dun) of € 6 (dik) per m²
        const prijsExclBtw = plaatsingskosten + voegkosten;   // totaal zonder btw
        const btw = prijsExclBtw * 0.21;                      // 21% btw
        const prijsInclBtw = prijsExclBtw + btw;              // totaal met btw (wat een particulier betaalt)

        // ---------- Offerte invullen ----------
        // .textContent = de tekst in dat HTML-element vervangen.
        // .toFixed(2) = afronden op 2 cijfers na de komma.
        // new Date().toLocaleDateString('nl-BE') = de datum van vandaag, bv. 21/10/2026.
        document.getElementById('offerteDatum').textContent = new Date().toLocaleDateString('nl-BE');
        document.getElementById('offerteNaam').textContent = naam;
        document.getElementById('offerteAfmetingen').textContent = `${lengte.toFixed(2)} m × ${breedte.toFixed(2)} m`;
        document.getElementById('offerteOppervlakte').textContent = `${oppervlakte.toFixed(2)} m²`;
        document.getElementById('offerteVoegkleur').textContent = voegkleur;
        document.getElementById('offerteVoegprijs').textContent = `(€ ${voegprijs.toFixed(2)}/m²)`;
        document.getElementById('offertePlaatsing').textContent = `€ ${plaatsingskosten.toFixed(2)}`;
        document.getElementById('offerteVoeg').textContent = `€ ${voegkosten.toFixed(2)}`;
        document.getElementById('offerteExcl').textContent = `€ ${prijsExclBtw.toFixed(2)}`;
        document.getElementById('offerteBtw').textContent = `€ ${btw.toFixed(2)}`;
        document.getElementById('offerteIncl').textContent = `€ ${prijsInclBtw.toFixed(2)}`;

        // Het offerteblok zichtbaar maken (in de HTML staat het op "hidden").
        offerte.hidden = false;

        // De invoervelden weer leegmaken.
        naamInput.value = '';
        lengteInput.value = '';
        breedteInput.value = '';

        // De prijs tonen in een alert.
        // Tussen backticks (` `) kan je met ${...} variabelen in de tekst zetten.
        alert(`Hallo, ${naam}!
Oppervlakte: ${oppervlakte.toFixed(2)} m²
Voegprijs: € ${voegprijs.toFixed(2)}/m²
Voegkleur: ${voegkleur}
Prijs excl. btw: € ${prijsExclBtw.toFixed(2)}
Prijs incl. btw: € ${prijsInclBtw.toFixed(2)}`);
    } else {
        // Niet alles (correct) ingevuld: melding tonen en niets berekenen.
        alert('Vul alle velden correct in.');
    }
});

// ---------- 3. Klikken op "Download als PDF" ----------
// window.print() opent het afdrukvenster van de browser.
// Kies daar "Opslaan als PDF". Door de @media print-regels in style.css
// wordt enkel de offerte afgedrukt, op 1 A4-pagina.
pdfKnop.addEventListener('click', () => {
    window.print();
});

// ---------- 4. Menu op gsm automatisch sluiten ----------
// querySelectorAll('.nav-link') haalt alle links uit het menu op (Home, Diensten, ...).
// Bij een klik op een link sluiten we het uitgeklapte menu met de Collapse-functie van Bootstrap.
// Op een groot scherm is het menu nooit uitgeklapt, dan gebeurt er niets.
const hoofdmenu = document.getElementById('hoofdmenu');   // het uitklapbare menu
const menuLinks = document.querySelectorAll('.nav-link');  // alle links in het menu

menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
        bootstrap.Collapse.getOrCreateInstance(hoofdmenu, { toggle: false }).hide();
    });
});
