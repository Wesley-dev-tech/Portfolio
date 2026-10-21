// =========================================================
// Vloermeesters - prijsberekening
// =========================================================

// ---------- 1. Elementen uit de HTML ophalen ----------
// document.getElementById('...') zoekt in index.html het element met dat id.
// We bewaren elk element in een const, zodat we het verderop kunnen gebruiken.
const prijsFormulier = document.getElementById('prijsFormulier'); // het formulier (voor de knop "Velden wissen")
const berekenKnop = document.getElementById('berekenKnop');   // knop "Bereken mijn prijs"
const achternaamInput = document.getElementById('achternaam'); // invoerveld achternaam
const voornaamInput = document.getElementById('voornaam');     // invoerveld voornaam
const emailInput = document.getElementById('email');           // invoerveld e-mailadres
const telefoonInput = document.getElementById('telefoon');     // invoerveld telefoonnummer
const straatInput = document.getElementById('straat');         // invoerveld straat en huisnummer
const postcodeInput = document.getElementById('postcode');     // invoerveld postcode
const gemeenteInput = document.getElementById('gemeente');     // invoerveld gemeente
const lengteInput = document.getElementById('lengte');         // invoerveld lengte (meter)
const breedteInput = document.getElementById('breedte');       // invoerveld breedte (meter)
const tegelSelect = document.getElementById('tegels');          // keuzelijst tegels (waarde = prijs per m², 0 = eigen tegels)
const voegdikteSelect = document.getElementById('voegdikte');  // keuzelijst soort voeg (waarde = prijs per m²)
const voegkleurSelect = document.getElementById('voegkleur');  // keuzelijst voegkleur
const offerte = document.getElementById('offerte');            // het offerteblok (staat eerst verborgen)
const pdfKnop = document.getElementById('pdfKnop');            // knop "Download als PDF"
const getalFormatter = new Intl.NumberFormat('nl-BE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const formatteerGetal = (waarde) => getalFormatter.format(waarde);

// Telefoonnummer controleren. Toegelaten: 0470 12 34 56, 0470/12.34.56, +32 470 12 34 56, 0032 (0)470-123456 ...
// - enkel cijfers, spaties en de tekens / . - ( ), met eventueel één + helemaal vooraan (landnummer)
// - in totaal 9 tot 15 cijfers (15 is het internationale maximum, landnummer inbegrepen)
const telefoonCorrect = (telefoon) => {
    const aantalCijfers = telefoon.replace(/\D/g, '').length;   // \D = alles wat geen cijfer is
    return /^\+?[\d\s\/.()-]+$/.test(telefoon) && aantalCijfers >= 9 && aantalCijfers <= 15;
};

// Hier bewaren we de laatste berekening, zodat de PDF dezelfde gegevens kan gebruiken.
let laatsteBerekening = null;

// ---------- 2. Klikken op "Bereken mijn prijs" ----------
// addEventListener('click', ...) voert de code tussen { } uit telkens er op de knop geklikt wordt.
berekenKnop.addEventListener('click', () => {

    // Waarden uit de velden lezen.
    // .value = wat de gebruiker heeft ingevuld (altijd tekst)
    // .trim() = spaties vooraan en achteraan weghalen
    // Number() = tekst omzetten naar een getal, zodat we ermee kunnen rekenen
    const achternaam = achternaamInput.value.trim();
    const voornaam = voornaamInput.value.trim();
    const naam = `${voornaam} ${achternaam}`;   // volledige naam voor de offerte, bv. "Wesley Peeters"
    const email = emailInput.value.trim();
    const telefoon = telefoonInput.value.trim();
    const straat = straatInput.value.trim();
    const postcode = postcodeInput.value.trim();
    const gemeente = gemeenteInput.value.trim();
    const lengte = Number(lengteInput.value.trim());
    const breedte = Number(breedteInput.value.trim());
    const tegelGekozen = tegelSelect.value !== '';   // "eigen tegels" heeft waarde 0, dus apart controleren
    const tegelprijs = Number(tegelSelect.value);
    const voegprijs = Number(voegdikteSelect.value);
    const voegkleur = voegkleurSelect.value;

    // Elk veld controleren: [veld, is het correct ingevuld?]
    const controles = [
        [voornaamInput, voornaam !== ''],
        [achternaamInput, achternaam !== ''],
        [emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)],      // tekst@tekst.tekst
        [telefoonInput, telefoonCorrect(telefoon)],
        [straatInput, straat !== ''],
        [postcodeInput, /^\d{4}$/.test(postcode)],                    // Belgische postcode: 4 cijfers
        [gemeenteInput, gemeente !== ''],
        [lengteInput, lengte > 0],
        [breedteInput, breedte > 0],
        [tegelSelect, tegelGekozen],
        [voegdikteSelect, voegprijs > 0],
        [voegkleurSelect, voegkleur !== '']
    ];

    // Foute velden krijgen de Bootstrap-klasse "is-invalid": rode rand + foutmelding uit de HTML.
    controles.forEach(([veld, correct]) => veld.classList.toggle('is-invalid', !correct));
    const fouteVelden = controles.filter(([, correct]) => !correct).map(([veld]) => veld);

    if (fouteVelden.length === 0) {

        // ---------- Berekening ----------
        const oppervlakte = lengte * breedte;                 // oppervlakte in m²
        const tegelOppervlakte = oppervlakte * 1.1;           // tegels: 10% extra voor snijverlies
        const tegelkosten = tegelOppervlakte * tegelprijs;    // tegels: prijs per m² (0 bij eigen tegels)
        const plaatsingskosten = oppervlakte * 45;            // plaatsen van tegels: € 45 per m²
        const voegkosten = oppervlakte * voegprijs;           // voegafwerking: € 8 tot € 20 per m², volgens soort voeg
        const prijsExclBtw = tegelkosten + plaatsingskosten + voegkosten;   // totaal zonder btw
        const btw = prijsExclBtw * 0.21;                      // 21% btw
        const prijsInclBtw = prijsExclBtw + btw;              // totaal met btw (wat een particulier betaalt)

        // De gekozen tegel en voeg als tekst, bv. "Porseleinen tegel 60 × 60 cm" en "Fijne voeg (2 mm)".
        const tegeltype = tegelSelect.options[tegelSelect.selectedIndex].text;
        const voegtype = voegdikteSelect.options[voegdikteSelect.selectedIndex].text;

        laatsteBerekening = {
            naam, email, telefoon, straat, postcode, gemeente, lengte, breedte, oppervlakte, tegelprijs, tegeltype, tegelOppervlakte, voegprijs, voegtype, voegkleur,
            tegelkosten, plaatsingskosten, voegkosten, prijsExclBtw, btw, prijsInclBtw,
            datum: new Date()
        };

        // ---------- Offerte invullen ----------
        // .textContent = de tekst in dat HTML-element vervangen.
        // Intl.NumberFormat gebruikt Belgische getalnotatie met twee decimalen.
        document.getElementById('offerteDatum').textContent = new Date().toLocaleDateString('nl-BE');
        document.getElementById('offerteNaam').textContent = naam;
        document.getElementById('offerteStraat').textContent = straat;
        document.getElementById('offerteGemeente').textContent = `${postcode} ${gemeente}`;
        document.getElementById('offerteTelefoon').textContent = telefoon;
        document.getElementById('offerteEmail').textContent = email;
        document.getElementById('offerteAfmetingen').textContent = `${formatteerGetal(lengte)} m × ${formatteerGetal(breedte)} m`;
        document.getElementById('offerteOppervlakte').textContent = `${formatteerGetal(oppervlakte)} m²`;
        document.getElementById('offerteTegeltype').textContent = tegeltype;
        document.getElementById('offerteVoegkleur').textContent = voegkleur;
        document.getElementById('offerteTegelprijs').textContent =
            `(${formatteerGetal(tegelOppervlakte)} m² × € ${formatteerGetal(tegelprijs)}/m², incl. 10% snijverlies)`;
        document.getElementById('offerteTegels').textContent = `€ ${formatteerGetal(tegelkosten)}`;

        // Bij eigen tegels is er geen tegelregel nodig in het prijsoverzicht.
        document.getElementById('offerteTegelRij').classList.toggle('offerte-verborgen', tegelprijs === 0);
        document.getElementById('offerteVoegprijs').textContent = `(€ ${formatteerGetal(voegprijs)}/m²)`;
        document.getElementById('offertePlaatsing').textContent = `€ ${formatteerGetal(plaatsingskosten)}`;
        document.getElementById('offerteVoeg').textContent = `€ ${formatteerGetal(voegkosten)}`;
        document.getElementById('offerteExcl').textContent = `€ ${formatteerGetal(prijsExclBtw)}`;
        document.getElementById('offerteBtw').textContent = `€ ${formatteerGetal(btw)}`;
        document.getElementById('offerteIncl').textContent = `€ ${formatteerGetal(prijsInclBtw)}`;

        // Het offerteblok zichtbaar maken door de CSS-klasse "offerte-verborgen" weg te halen.
        offerte.classList.remove('offerte-verborgen');

        // De invoervelden weer leegmaken.
        achternaamInput.value = '';
        voornaamInput.value = '';
        emailInput.value = '';
        telefoonInput.value = '';
        straatInput.value = '';
        postcodeInput.value = '';
        gemeenteInput.value = '';
        lengteInput.value = '';
        breedteInput.value = '';

        // De prijs tonen in een alert.
        // Tussen backticks (` `) kan je met ${...} variabelen in de tekst zetten.
        alert(`Hallo, ${voornaam}!
Oppervlakte: ${formatteerGetal(oppervlakte)} m²
Tegels: ${tegeltype}
Tegelkosten: € ${formatteerGetal(tegelkosten)}
Voegprijs: € ${formatteerGetal(voegprijs)}/m²
Voegkleur: ${voegkleur}
Prijs excl. btw: € ${formatteerGetal(prijsExclBtw)}
Prijs incl. btw: € ${formatteerGetal(prijsInclBtw)}`);

        // Na het sluiten van de pop-up naar de offerte scrollen.
        offerte.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        // Niet alles (correct) ingevuld: de foute velden opsommen en niets berekenen.
        // De naam van elk veld halen we uit zijn <label> in de HTML.
        const veldnamen = fouteVelden.map((veld) => `- ${document.querySelector(`label[for="${veld.id}"]`).textContent}`);
        alert(`Deze velden zijn niet correct ingevuld:\n${veldnamen.join('\n')}`);

        // De cursor in het eerste foute veld zetten.
        fouteVelden[0].focus();
    }
});

// Zodra de gebruiker een fout veld aanpast, verdwijnt de foutmelding van dat veld.
const alleVelden = [achternaamInput, voornaamInput, emailInput, telefoonInput, straatInput, postcodeInput, gemeenteInput,
    lengteInput, breedteInput, tegelSelect, voegdikteSelect, voegkleurSelect];
alleVelden.forEach((veld) => {
    veld.addEventListener('input', () => veld.classList.remove('is-invalid'));
});

// Knop "Velden wissen": de HTML (type="reset") maakt de velden zelf leeg,
// hier halen we ook alle foutmeldingen weg.
prijsFormulier.addEventListener('reset', () => {
    alleVelden.forEach((veld) => veld.classList.remove('is-invalid'));
});

// ---------- 3. Klikken op "Download als PDF" ----------
pdfKnop.addEventListener('click', () => {
    if (!window.jspdf) {
        alert('De PDF-functie is niet beschikbaar. Controleer je internetverbinding en probeer opnieuw.');
        return;
    }

    if (!laatsteBerekening) {
        return;
    }

    const b = laatsteBerekening;
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: 'mm', format: 'a4' });

    // Afmetingen van de pagina (in mm) en vaste kleuren in de huisstijl.
    const marge = 18;
    const paginabreedte = pdf.internal.pageSize.getWidth();
    const paginahoogte = pdf.internal.pageSize.getHeight();
    const rechts = paginabreedte - marge;
    const inhoudbreedte = paginabreedte - marge * 2;
    const wit = [255, 255, 255];
    const lichtgrijs = [215, 215, 215];
    const donker = [47, 58, 64];
    const accent = [176, 90, 42];
    const tekst = [30, 34, 37];
    const grijs = [110, 110, 110];
    const lijn = [225, 220, 214];
    const lichtvlak = [247, 243, 238];

    const euro = (waarde) => `€ ${formatteerGetal(waarde)}`;
    const tweeCijfers = (getal) => String(getal).padStart(2, '0');

    // Hulpfunctie: lettertype, grootte en kleur in één keer instellen.
    const stijl = (grootte, vet = false, kleur = tekst) => {
        pdf.setFont('helvetica', vet ? 'bold' : 'normal');
        pdf.setFontSize(grootte);
        pdf.setTextColor(...kleur);
    };

    // Datum, geldigheid (30 dagen) en een uniek nummer voor deze offerte.
    const datum = b.datum;
    const geldigTot = new Date(datum);
    geldigTot.setDate(geldigTot.getDate() + 30);
    const nummer = `OF-${datum.getFullYear()}${tweeCijfers(datum.getMonth() + 1)}${tweeCijfers(datum.getDate())}-${tweeCijfers(datum.getHours())}${tweeCijfers(datum.getMinutes())}`;

    // ---------- Kop ----------
    pdf.setFillColor(...donker);
    pdf.rect(0, 0, paginabreedte, 36, 'F');
    pdf.setFillColor(...accent);
    pdf.rect(0, 36, paginabreedte, 1.5, 'F');

    stijl(22, true, wit);
    pdf.text('Vloermeesters', marge, 18);
    stijl(10, false, lichtgrijs);
    pdf.text('Vakmanschap, tegel voor tegel.', marge, 26);

    stijl(15, true, wit);
    pdf.text('OFFERTE', rechts, 18, { align: 'right' });
    stijl(9, false, lichtgrijs);
    pdf.text(`Nr. ${nummer}`, rechts, 26, { align: 'right' });

    // ---------- Van / Voor / Gegevens ----------
    let y = 52;
    const kolom2 = marge + 62;
    const kolom3 = marge + 118;

    stijl(8.5, true, accent);
    pdf.text('VAN', marge, y);
    pdf.text('VOOR', kolom2, y);
    pdf.text('GEGEVENS', kolom3, y);

    stijl(11, true);
    pdf.text('Vloermeesters', marge, y + 7);
    pdf.text(pdf.splitTextToSize(b.naam, 52)[0], kolom2, y + 7);

    stijl(9.5, false, grijs);
    pdf.text('Tegelwerken voor particulieren', marge, y + 13);
    pdf.text('België', marge, y + 18);
    // Adres en contactgegevens van de klant onder elkaar.
    [b.straat, `${b.postcode} ${b.gemeente}`, b.telefoon, b.email].forEach((regel, i) => {
        pdf.text(pdf.splitTextToSize(regel, 52)[0], kolom2, y + 13 + i * 5);
    });

    const gegevens = [
        ['Datum', datum.toLocaleDateString('nl-BE')],
        ['Geldig tot', geldigTot.toLocaleDateString('nl-BE')],
        ['Nummer', nummer]
    ];
    gegevens.forEach(([label, waarde], i) => {
        stijl(9.5, false, grijs);
        pdf.text(label, kolom3, y + 7 + i * 5.5);
        stijl(9.5, true);
        pdf.text(waarde, rechts, y + 7 + i * 5.5, { align: 'right' });
    });

    // ---------- Projectgegevens ----------
    y = 92;
    stijl(8.5, true, accent);
    pdf.text('PROJECTGEGEVENS', marge, y);

    y += 4;
    pdf.setFillColor(...lichtvlak);
    pdf.roundedRect(marge, y, inhoudbreedte, 22, 2, 2, 'F');

    const project = [
        ['Afmetingen', `${formatteerGetal(b.lengte)} m × ${formatteerGetal(b.breedte)} m`],
        ['Oppervlakte', `${formatteerGetal(b.oppervlakte)} m²`],
        ['Tegels', b.tegeltype],
        ['Voeg', `${b.voegtype}, ${b.voegkleur}`]
    ];
    const vakbreedte = inhoudbreedte / project.length;
    project.forEach(([label, waarde], i) => {
        const x = marge + 5 + i * vakbreedte;
        stijl(8.5, false, grijs);
        pdf.text(label, x, y + 7);
        stijl(10, true);
        // Lange waarden lopen over maximaal twee regels.
        pdf.text(pdf.splitTextToSize(waarde, vakbreedte - 7).slice(0, 2), x, y + 13);
    });

    // ---------- Prijstabel ----------
    y = 128;
    const kolomAantal = marge + 108;
    const kolomPrijs = marge + 140;

    pdf.setFillColor(...donker);
    pdf.rect(marge, y, inhoudbreedte, 9, 'F');
    stijl(9, true, wit);
    pdf.text('Omschrijving', marge + 4, y + 6);
    pdf.text('Hoeveelheid', kolomAantal, y + 6, { align: 'right' });
    pdf.text('Eenheidsprijs', kolomPrijs, y + 6, { align: 'right' });
    pdf.text('Bedrag', rechts - 4, y + 6, { align: 'right' });
    y += 9;

    // Elke regel: titel, omschrijving, hoeveelheid (m²), eenheidsprijs en bedrag.
    const regels = [
        ['Plaatsen vloertegels', 'Leggen van de tegels in het gekozen legpatroon', b.oppervlakte, 45, b.plaatsingskosten],
        ['Voegafwerking', `${b.voegtype}, kleur ${b.voegkleur}`, b.oppervlakte, b.voegprijs, b.voegkosten]
    ];
    // Tegels enkel toevoegen als de klant ze bij ons bestelt (niet bij eigen tegels).
    if (b.tegelprijs > 0) {
        regels.unshift(['Tegels', `${b.tegeltype}, incl. 10% snijverlies`, b.tegelOppervlakte, b.tegelprijs, b.tegelkosten]);
    }
    regels.forEach(([titel, omschrijving, hoeveelheid, eenheidsprijs, bedrag]) => {
        stijl(10, true);
        pdf.text(titel, marge + 4, y + 7);
        stijl(8.5, false, grijs);
        pdf.text(omschrijving, marge + 4, y + 12);

        stijl(10);
        pdf.text(`${formatteerGetal(hoeveelheid)} m²`, kolomAantal, y + 9, { align: 'right' });
        pdf.text(euro(eenheidsprijs), kolomPrijs, y + 9, { align: 'right' });
        stijl(10, true);
        pdf.text(euro(bedrag), rechts - 4, y + 9, { align: 'right' });

        y += 16;
        pdf.setDrawColor(...lijn);
        pdf.setLineWidth(0.3);
        pdf.line(marge, y, rechts, y);
    });

    // ---------- Totalen ----------
    y += 9;
    const totaalLinks = marge + 96;

    const totaalRij = (label, waarde) => {
        stijl(10, false, grijs);
        pdf.text(label, totaalLinks + 4, y);
        stijl(10, true);
        pdf.text(waarde, rechts - 4, y, { align: 'right' });
        y += 7;
    };
    totaalRij('Subtotaal excl. btw', euro(b.prijsExclBtw));
    totaalRij('Btw (21%)', euro(b.btw));

    y -= 2;
    pdf.setFillColor(...accent);
    pdf.roundedRect(totaalLinks, y, rechts - totaalLinks, 13, 2, 2, 'F');
    stijl(11, true, wit);
    pdf.text('Totaal incl. btw', totaalLinks + 4, y + 8.5);
    stijl(13, true, wit);
    pdf.text(euro(b.prijsInclBtw), rechts - 4, y + 8.5, { align: 'right' });

    // ---------- Voorwaarden ----------
    y += 30;
    stijl(8.5, true, accent);
    pdf.text('VOORWAARDEN', marge, y);
    y += 6;

    const voorwaarden = [
        'Deze offerte is vrijblijvend en 30 dagen geldig vanaf de opmaakdatum.',
        b.tegelprijs > 0
            ? 'Bijkomende materialen, voorbereidende werkzaamheden en extra kosten zijn niet inbegrepen.'
            : 'De prijs omvat het plaatsen van de vloertegels en de voegafwerking. De tegels levert de klant zelf aan. Bijkomende materialen, voorbereidende werkzaamheden en extra kosten zijn niet inbegrepen.',
        'Voor een definitieve offerte bekijken we je project graag ter plaatse.'
    ];
    stijl(9);
    voorwaarden.forEach((zin) => {
        const zinRegels = pdf.splitTextToSize(zin, inhoudbreedte - 5);
        pdf.text('•', marge, y);
        pdf.text(zinRegels, marge + 5, y);
        y += zinRegels.length * 4.5 + 1.5;
    });

    // ---------- Voet ----------
    const voetY = paginahoogte - 15;
    pdf.setDrawColor(...lijn);
    pdf.setLineWidth(0.3);
    pdf.line(marge, voetY - 5, rechts, voetY - 5);
    stijl(8, false, grijs);
    pdf.text('Vloermeesters - Vakmanschap, tegel voor tegel.', marge, voetY);
    pdf.text('Fictief bedrijf, bedacht voor een schoolopdracht', rechts, voetY, { align: 'right' });

    // Het PDF-bestand rechtstreeks downloaden.
    pdf.save('offerte-vloermeesters.pdf');
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
