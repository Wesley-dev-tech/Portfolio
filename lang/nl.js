// Nederlandse teksten van de site. Elke sleutel hoort bij een element met data-i18n (of
// data-i18n-alt, -aria-label, -title, -placeholder, -content, -src) in index.html, of bij een
// tekst die JavaScript zelf maakt (zie en.js). Ontbreekt hier een sleutel, dan blijft het Engels staan.
const TAAL_NL = {
    // Paginagegevens
    "meta.description": "Portfolio van Wesley Bogaerts uit Balen, student Full Stack &amp; AI Automation Developer aan SyntraPXL.",

    // Navigatie
    "nav.skip": "Ga naar de inhoud",
    "nav.label": "Hoofdnavigatie",
    "nav.about": "Over mij",
    "nav.education": "Opleiding",
    "nav.skills": "Vaardigheden",
    "nav.cv": "CV",
    "nav.projects": "Projecten",
    "nav.taal": "Taal",
    "thema.label": "Licht thema",
    "menu.open": "Menu openen",
    "menu.sluit": "Menu sluiten",
    "thema.naarDonker": "Wissel naar het donkere thema",
    "thema.naarLicht": "Wissel naar het lichte thema",
    "thema.sneltoets": " (sneltoets T)",

    // Intro
    "hero.avatarAlt": "Avatar van Wesley Bogaerts met zonnebril",
    "groet.ochtend": "Goeiemorgen, ik ben",
    "groet.middag": "Goeiemiddag, ik ben",
    "groet.avond": "Goeienavond, ik ben",
    "groet.nacht": "Nog wakker? Ik ben",
    "hero.intro": "Na meerdere jaren in de administratie en de boekhouding leer ik nu websites, "
        + "webapplicaties en software op maat bouwen. Hieronder staan de projecten uit mijn opleiding, "
        + "van mijn eerste Flexbox-pagina tot een prijscalculator die een pdf-offerte maakt. Heb je een "
        + "idee voor een website of een vraag over mijn code? Stuur me gerust een bericht.",
    "hero.projecten": "Bekijk mijn projecten",
    "hero.contact": "Neem contact op",
    "hero.opleiding": "Opleiding",
    "hero.opleidingWaarde": "SyntraPXL, voltijds",
    "hero.leren": "Nu aan het leren",
    "hero.locatie": "Locatie",
    "algemeen.locatie": "Balen, België",

    // Bewegende tekstbalk
    "marquee.opleiding": "Full Stack Developer in opleiding",
    "marquee.webdesign": "Webdesign",
    "marquee.webapps": "Webapplicaties",
    "marquee.software": "Software op maat",
    "marquee.ai": "AI-automatisering",

    // Over mij
    "about.titel": "Over mij",
    "about.posterAlt": "Poster Wesley Dev &amp; Tech: websites, webdesign, webapplicaties, software op maat en AI-automatisering",
    "about.posterOnderschrift": "Wat ik bouw, in één beeld",
    "about.label": "Mijn achtergrond",
    "about.kop": "Van boekhouding naar IT",
    "about.ondertitel": "Full Stack Developer in opleiding",
    "about.lead": "Na meerdere jaren ervaring in boekhouding en administratie maakte ik bewust de overstap "
        + "naar IT. In mijn vorige functies ontwikkelde ik een nauwkeurige en gestructureerde werkhouding. "
        + "Ik leerde deadlines bewaken, zorgvuldig omgaan met gevoelige informatie en problemen op een "
        + "analytische manier aanpakken.",
    "about.p1": "De afgelopen jaren groeide mijn interesse in IT en technologie. Ik werd steeds "
        + "nieuwsgieriger naar hoe websites en applicaties achter de schermen werken. Op een bepaald moment "
        + "wilde ik niet langer alleen gebruiker zijn, maar ook begrijpen hoe zulke toepassingen worden "
        + "gebouwd. Die nieuwsgierigheid gaf uiteindelijk de doorslag om me om te scholen tot developer.",
    "about.p2": "Wat mij aanspreekt in programmeren, is het zoeken naar oplossingen. Niet alles werkt "
        + "meteen zoals verwacht, en net dat maakt het interessant. Ik probeer te begrijpen waar iets fout "
        + "loopt, test verschillende mogelijkheden en pas mijn aanpak aan tot ik een oplossing vind. Mijn "
        + "ervaring in de boekhouding komt daarbij goed van pas, vooral wanneer het gaat om logisch "
        + "nadenken en aandacht voor details.",
    "about.p3": "De overstap naar IT is voor mij een bewuste keuze. Ik weet dat leren programmeren tijd "
        + "en doorzettingsvermogen vraagt, maar ik ben gemotiveerd om me hierin verder te ontwikkelen. Door "
        + "regelmatig te oefenen, feedback te verwerken en uit mijn fouten te leren, bouw ik stap voor "
        + "stap mijn kennis op.",
    "about.p4": "Ik wil mijn eerdere werkervaring combineren met mijn nieuwe technische vaardigheden om "
        + "toepassingen te ontwikkelen die niet alleen goed werken, maar ook praktisch en "
        + "gebruiksvriendelijk zijn.",
    "leesMeer": "Lees meer",
    "leesMinder": "Lees minder",

    // Mijn opleiding
    "education.titel": "Mijn opleiding",
    "education.label": "Momenteel student",
    "education.lead": "Ik volg de voltijdse dagopleiding Full Stack &amp; AI Automation Developer aan "
        + "SyntraPXL. Tijdens deze opleiding leer ik stap voor stap hoe ik zelf websites en applicaties "
        + "kan ontwikkelen.",
    "education.p1": "We zijn gestart met HTML en CSS. Daarbij leerde ik werken met Flexbox en responsive "
        + "design, zodat websites goed functioneren op verschillende schermformaten. Daarna kwamen "
        + "Bootstrap en Tailwind aan bod. Met Bootstrap Grid leerde ik pagina’s opbouwen met rijen en "
        + "kolommen. Met Tailwind oefende ik dan weer om elementen rechtstreeks via classes vorm te geven.",
    "education.p2": "Ook het visuele aspect van websites kwam uitgebreid aan bod. Zo leerde ik werken "
        + "met Google Fonts voor lettertypes, Font Awesome voor iconen en Coolors.co om kleurencombinaties "
        + "te kiezen die goed bij elkaar passen. Met die kennis heb ik ondertussen verschillende projecten "
        + "gemaakt, waaronder mijn eigen portfolio.",
    "education.p3": "Naast het bouwen en vormgeven van websites heb ik ook geleerd hoe relationele "
        + "databanken werken. In MySQL oefende ik met het opbouwen van tabellen, het normaliseren van "
        + "gegevens en het schrijven van SQL-queries. Momenteel zijn we bezig met JavaScript en API’s, "
        + "waarmee ik mijn programmeerkennis verder uitbreid.",
    "education.p4": "Tijdens de opleiding maakte ik ook kennis met Agile en Scrum. We oefenden onder "
        + "andere met het plannen van sprints, planning poker en het opvolgen van taken via een kanbanbord "
        + "in Trello. Daardoor kreeg ik een beter beeld van hoe developers binnen een team samenwerken en "
        + "hun werk organiseren.",
    "education.p5": "Mijn doel is om zelfstandig volledige webapplicaties te kunnen bouwen, van de "
        + "frontend tot de backend. Ik wil me verder verdiepen in JavaScript en TypeScript, leren werken "
        + "met API’s en ontdekken hoe ik AI kan inzetten om processen te automatiseren.",
    "education.p6": "Wat ik daarbij minstens even belangrijk vind, is dat ik de code die ik schrijf ook "
        + "echt begrijp. Ik wil niet zomaar code laten genereren door AI-agents zonder te weten wat die "
        + "precies doet. Ik wil zelf kunnen uitleggen hoe mijn code werkt, waarom bepaalde keuzes zijn "
        + "gemaakt en hoe ik fouten kan opsporen en oplossen. AI zie ik als een handig hulpmiddel om bij "
        + "te leren en efficiënter te werken, maar niet als een vervanging voor mijn eigen kennis en inzicht.",
    "education.posterAlt": "Poster Full Stack: de lagen van een webapplicatie, van interface, logica en "
        + "API-verbinding tot data en AI-automatisering",
    "education.posterOnderschrift": "Wat ik leer, laag per laag",

    // Mijn cv
    "cv.titel": "Mijn cv",
    "cv.label": "Curriculum vitae",
    "cv.kop": "Werkervaring en opleidingen",
    "cv.ondertitel": "Van administratie en finance naar IT",
    "cv.lead": "Leergierige en analytisch ingestelde student Full Stack &amp; AI Automation Developer "
        + "met een sterke professionele achtergrond in administratie en finance.",
    "cv.werk": "Werkervaring",
    "cv.werk1.datum": "<time datetime=\"2025-02\">Februari 2025</time> - <time datetime=\"2026-09\">september 2026</time>",
    "cv.werk1.functie": "Assistent accountant",
    "cv.werk1.taak1": "Valideren en verwerken van aankoopfacturen in SAP",
    "cv.werk1.taak2": "Opvolgen van leveranciersbalansen en crediteurenbeheer",
    "cv.werk1.taak3": "Verwerken en boeken van bankverrichtingen",
    "cv.werk1.taak4": "Ondersteunen en fungeren als back-up van collega’s",
    "cv.werk1.taak5": "Voorbereiden en ondersteunen bij audits",
    "cv.werk2.datum": "<time datetime=\"2022-08\">Augustus 2022</time> - <time datetime=\"2025-01\">januari 2025</time>",
    "cv.werk2.functie": "Finance assistent",
    "cv.werk2.taak1": "Debiteuren- en crediteurenbeheer",
    "cv.werk2.taak2": "Voorbereiden en indienen van de maandelijkse btw-, ICO- en Intrastat-aangiftes",
    "cv.werk2.taak3": "Verwerken van verkoop- en aankoopfacturen in SAP",
    "cv.werk2.taak4": "Verwerken en boeken van bankverrichtingen en klaarzetten van betalingen",
    "cv.werk2.taak5": "Ondersteunen bij maandafsluitingen en aanleveren van data voor externe audits",
    "cv.werk2.taak6": "Opvolgen van achterstallige betalingen en versturen van wekelijkse aanmaningen",
    "cv.werk2.taak7": "Uitvoeren van diverse financiële en administratieve taken",
    "cv.werk3.datum": "<time datetime=\"2021-10\">Oktober 2021</time> - <time datetime=\"2022-06\">juni 2022</time>",
    "cv.werk3.functie": "Medewerker boekhouding <span class=\"cv-note\">(tijdelijk project)</span>",
    "cv.werk3.taak1": "Verwerken van facturen en bankverrichtingen in WIC en BouwOffice",
    "cv.werk3.taak2": "Verantwoordelijke crediteurenbeheer",
    "cv.werk3.taak3": "Klaarzetten van betalingen in SEPA-betaallijsten",
    "cv.werk4.datum": "<time datetime=\"2021-08\">Augustus 2021</time> - <time datetime=\"2021-10\">oktober 2021</time>",
    "cv.werk4.functie": "Junior dossierbeheerder",
    "cv.werk4.taak1": "Verwerken van facturen en bankverrichtingen",
    "cv.werk4.taak2": "Verwerken van CODA-bestanden",
    "cv.werk4.taak3": "Verwerken van kas- en dagontvangsten",
    "cv.werk5.datum": "<time datetime=\"2021-02\">Februari 2021</time> - <time datetime=\"2021-05\">mei 2021</time>",
    "cv.werk5.functie": "Admin &amp; customer service",
    "cv.werk5.taak1": "Eindverantwoordelijke data-input Waste Management Online",
    "cv.werk5.taak2": "Customer service",
    "cv.werk5.taak3": "Sorteerinstructies op maat van de klant opstellen in PowerPoint",
    "cv.werk6.datum": "<time datetime=\"2010-01\">Januari 2010</time> - <time datetime=\"2020-03\">maart 2020</time>",
    "cv.werk6.functie": "Administratief bediende",
    "cv.werk6.taak1": "Eindverantwoordelijke voor het verwerken en verifiëren van orders",
    "cv.werk6.taak2": "Customer service en klachtenbehandeling",
    "cv.werk6.taak3": "Verantwoordelijke voor social media en folders",
    "cv.opleidingen": "Opleidingen",
    "cv.opl1.datum": "<time datetime=\"2026\">2026</time> - heden",
    "cv.opl2.titel": "Graduaat Accounting &amp; Administration",
    "cv.opl3.titel": "Boekhoudkundig bediende",
    "cv.opl4.titel": "Opleiding kleuteronderwijs",
    "cv.opl5.titel": "Bedrijfsbeheer",
    "cv.opl6.titel": "Administratief commercieel medewerker",
    "cv.profiel": "Profiel",
    "cv.itVaardigheden": "IT-vaardigheden",
    "skills.concepten": "Concepten &amp; methodologieën",
    "cv.talen": "Talenkennis",
    "cv.nederlands": "Nederlands",
    "cv.moedertaal": "Moedertaal",
    "cv.engels": "Engels",
    "cv.goedeKennis": "Goede kennis",
    "cv.kenmerken": "Persoonlijke kenmerken",
    "cv.leergierig": "Leergierig",
    "cv.analytisch": "Analytisch",
    "cv.probleemoplossend": "Probleemoplossend",
    "cv.nauwkeurig": "Nauwkeurig",
    "cv.zelfstandig": "Zelfstandig",
    "cv.nieuwsgierig": "Nieuwsgierig",
    "cv.pdf": "Download als pdf",
    "pdf.bestand": "Cv",
    "pdf.fout": "De pdf kon niet gemaakt worden. Controleer je internetverbinding en probeer opnieuw.",

    // Mijn vaardigheden
    "skills.titel": "Mijn vaardigheden",
    "skills.monday": "<strong>Monday</strong> — hierin plan ik mijn taken, volg ik op hoever een project "
        + "staat en stem ik het werk af wanneer we in team werken.",
    "skills.scrum": "<strong>Scrum</strong> — in de lessen werk ik in sprints: we schatten taken in met "
        + "planning poker, volgen ze op een kanbanbord in Trello en bespreken na elke sprint wat beter kan.",
    "skills.rest": "<strong>REST API</strong> — met JavaScript vraag ik gegevens op via HTTP-verzoeken en "
        + "toon ik het antwoord van de API op mijn pagina.",
    "skills.mcp": "<strong>MCP</strong> — hiermee koppel ik AI-assistenten aan mijn eigen tools, zoals "
        + "GitHub en Google Drive, zodat ze rechtstreeks met mijn bestanden en gegevens kunnen werken.",

    // Mijn projecten
    "projects.titel": "Mijn projecten",
    "projects.sorteren": "Sorteren",
    "projects.nieuwste": "Nieuwste eerst",
    "projects.oudste": "Oudste eerst",
    "projects.alfabetisch": "Alfabetisch (A-Z)",
    "projects.noscript": "Zet JavaScript aan om mijn projecten te zien, of bekijk ze op "
        + "<a class=\"text-decoration-underline\" href=\"https://github.com/Wesley-dev-tech\">GitHub</a>.",
    "projects.details": "Bekijk details",
    "projects.paginering": "Paginering projecten",
    "projects.vorigeLabel": "Vorige projectpagina",
    "projects.vorige": "Vorige",
    "projects.volgendeLabel": "Volgende projectpagina",
    "projects.volgende": "Volgende",
    "project.screenshot": "Screenshot van ",
    "modal.sluiten": "Sluiten",
    "modal.feedback": "Feedback van mijn docent",
    "modal.technologieen": "Gebruikte technologieën",
    "modal.demo": "Bekijk project",
    "modal.code": "Bekijk code",

    // Privacybeleid
    "privacy.titel": "Privacybeleid",
    "privacy.bijgewerkt": "Laatst bijgewerkt op 31 oktober 2026",
    "privacy.intro": "Dit is mijn persoonlijke portfolio. Ik vind privacy belangrijk en hou het daarom "
        + "eenvoudig: deze site verzamelt zelf geen persoonsgegevens.",
    "privacy.wieKop": "Wie is verantwoordelijk?",
    "privacy.wie": "Wesley Bogaerts, Balen (België). Vragen over privacy stel je via het "
        + "<a href=\"#contact\" class=\"privacy-close\">contactformulier</a> onderaan de pagina.",
    "privacy.nietKop": "Wat deze site niet doet",
    "privacy.niet1": "Geen eigen cookies. Alleen de ingesloten kaart van Google Maps kan cookies plaatsen "
        + "(zie <a href=\"#privacy-derden\" class=\"privacy-jump\">diensten van derden</a>).",
    "privacy.niet2": "Geen statistieken, analytics of tracking.",
    "privacy.niet3": "Geen advertenties en geen formulieren die gegevens opslaan.",
    "privacy.keuzeKop": "Je thema- en taalkeuze",
    "privacy.keuze": "Kies je het lichte of donkere thema, of Engels of Nederlands, dan onthoudt je "
        + "browser die keuze (onder de namen <strong>thema</strong> en <strong>taal</strong>) in de lokale "
        + "opslag van je toestel. Dat is geen cookie en het wordt nooit naar mij of naar iemand anders "
        + "gestuurd. Je wist het door de sitegegevens in je browser te verwijderen.",
    "privacy.derdenKop": "Diensten van derden",
    "privacy.derden": "Om de site te tonen, laadt je browser bestanden van deze diensten. Daarbij "
        + "ontvangen zij technische gegevens zoals je IP-adres en browsertype:",
    "privacy.github": "<strong>GitHub Pages</strong> host de site",
    "privacy.verklaring": "privacyverklaring",
    "privacy.beleid": "privacybeleid",
    "privacy.fonts": "<strong>Google Fonts</strong> levert de lettertypes",
    "privacy.maps": "<strong>Google Maps</strong> toont de kaart van Balen in de footer. Google kan "
        + "daarbij cookies plaatsen",
    "privacy.jsdelivr": "<strong>jsDelivr</strong> levert Bootstrap",
    "privacy.cdnjs": "<strong>cdnjs (Cloudflare)</strong> levert de iconen van Font Awesome en de "
        + "bibliotheek jsPDF voor de cv-pdf",
    "privacy.contactKop": "Als je contact opneemt",
    "privacy.contact": "Stuur je me een bericht via het contactformulier, een e-mail, bel je me of stuur "
        + "je een bericht via WhatsApp of Messenger, dan gebruik ik je naam, contactgegevens, bericht en "
        + "eventueel je bedrijfsnaam alleen om je te antwoorden. Ik deel ze met niemand en verwijder ze "
        + "zodra ze niet meer nodig zijn. Het contactformulier wordt verstuurd via "
        + "<a href=\"https://web3forms.com/privacy\" target=\"_blank\" rel=\"noopener noreferrer\">Web3Forms</a>, "
        + "dat je bericht doorstuurt naar mijn mailbox. WhatsApp en Messenger zijn diensten van Meta, met "
        + "een eigen <a href=\"https://www.facebook.com/privacy/policy/\" target=\"_blank\" "
        + "rel=\"noopener noreferrer\">privacybeleid</a>.",
    "privacy.linksKop": "Links naar andere sites",
    "privacy.links": "Links naar GitHub, LinkedIn, WhatsApp, Messenger en mijn projecten openen een "
        + "andere site. Daar geldt het privacybeleid van die site.",
    "privacy.rechtenKop": "Jouw rechten",
    "privacy.rechten": "Volgens de AVG (GDPR) mag je vragen welke gegevens ik van je heb, ze laten "
        + "verbeteren of laten verwijderen. Stuur me daarvoor een e-mail. Ben je niet tevreden over mijn "
        + "antwoord, dan kun je een klacht indienen bij de "
        + "<a href=\"https://www.gegevensbeschermingsautoriteit.be\" target=\"_blank\" "
        + "rel=\"noopener noreferrer\">Gegevensbeschermingsautoriteit</a>.",

    // Contact en footer
    "contact.titel": "Neem contact op",
    "contact.intro": "Een vraag over een project of over mijn code op GitHub? Stuur me gerust een "
        + "bericht of bel even, ik hoor graag van je.",
    "form.naam": "Naam",
    "form.bedrijf": "Bedrijfsnaam",
    "form.email": "E-mailadres",
    "form.telefoon": "Telefoonnummer",
    "form.bericht": "Bericht",
    "form.berichtPlaceholder": "Laat hier je boodschap achter",
    "form.bezig": "Bezig met versturen…",
    "form.verstuur": "Verstuur bericht",
    "form.gelukt": "Bedankt! Je bericht is verstuurd, ik antwoord zo snel mogelijk.",
    "form.mislukt": "Versturen lukte niet. Probeer het opnieuw of bel me even.",
    "form.verplicht": "Vul dit veld in.",
    "form.ongeldigEmail": "Vul een geldig e-mailadres in.",
    "footer.kaartTitel": "Balen op Google Maps",
    "footer.kaartSrc": "https://maps.google.com/maps?q=Balen,+Belgi%C3%AB&z=12&hl=nl&output=embed",
    "footer.rechten": "Alle rechten voorbehouden",
    "footer.bijgewerkt": "Laatst bijgewerkt op",
    "footer.naarBoven": "Terug naar boven",
    "datum.locale": "nl-BE"
};
