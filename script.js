// Meteen laten weten dat JavaScript werkt, nog voor de pagina getekend wordt. style.css klapt
// dan de lange teksten al in en toont de knoppen, zodat er bij het laden niets verspringt.
document.documentElement.classList.add("js");

// Licht of donker thema, meteen toegepast zodra dit script in de head geladen wordt,
// zodat de pagina nooit eerst in het verkeerde thema verschijnt.
// Een eerder gekozen thema wint, anders start de site altijd in het donkere thema.
const themaKleur = document.querySelector('meta[name="theme-color"]');

// De kleur van de browserbalk komt uit style.css, zodat de kleuren maar op één plek staan.
// Het script staat na de stylesheet in de head, dus die is op dit moment al geladen.
function pasThemaToe(thema) {
    document.documentElement.dataset.theme = thema;
    themaKleur.setAttribute("content",
        getComputedStyle(document.documentElement).getPropertyValue("--bg-primary").trim());
}

let opgeslagenThema = null;

try {
    opgeslagenThema = localStorage.getItem("thema");
} catch (fout) {
    // Opslag geblokkeerd (bv. privévenster): dan gewoon het donkere thema
}

pasThemaToe(opgeslagenThema === "light" ? "light" : "dark");

// De rest werkt met de elementen op de pagina en wacht dus tot de HTML geladen is
document.addEventListener("DOMContentLoaded", function () {
    // Bezoekers die minder beweging willen: geen scroll-animaties en direct springen
    const voorkeurMinderBeweging = window.matchMedia("(prefers-reduced-motion: reduce)");

    function scrollGedrag() {
        return voorkeurMinderBeweging.matches ? "auto" : "smooth";
    }

    // Hamburgermenu
    const menuKnop = document.querySelector(".menu-button");
    const menuIcoon = menuKnop.querySelector("i");
    const navigatie = document.querySelector(".site-nav");
    const menuLinks = document.querySelectorAll(".nav-links a");

    // Menu openen of sluiten en de knop mee laten veranderen
    function zetMenu(open) {
        navigatie.classList.toggle("menu-is-open", open);
        menuKnop.setAttribute("aria-expanded", open);
        menuKnop.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
        menuIcoon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    }

    menuKnop.addEventListener("click", function () {
        const open = !navigatie.classList.contains("menu-is-open");

        zetMenu(open);

        // De links staan in de HTML vóór de knop; zo kan je met Tab meteen verder in het menu
        if (open) {
            menuLinks[0].focus();
        }
    });

    // Menu sluiten na het kiezen van een link
    menuLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            zetMenu(false);
        });
    });

    // Menu sluiten bij een klik naast het menupaneel
    document.addEventListener("click", function (event) {
        if (navigatie.classList.contains("menu-is-open")
            && !event.target.closest(".nav-links, .menu-button")) {
            zetMenu(false);
        }
    });

    // Menu sluiten met de Escape-toets
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && navigatie.classList.contains("menu-is-open")) {
            zetMenu(false);
            menuKnop.focus();
        }
    });

    // Themaschakelaar. Het thema zelf staat al (zie bovenaan); hier komt alleen de knop bij om te wisselen.
    // style.css schuift het bolletje mee; hier alleen de stand voor schermlezers en de tooltip.
    const themaKnop = document.querySelector(".theme-toggle");

    function zetThema(thema) {
        const licht = thema === "light";

        pasThemaToe(thema);
        themaKnop.setAttribute("aria-checked", licht);
        themaKnop.title = (licht ? "Wissel naar het donkere thema" : "Wissel naar het lichte thema")
            + " (sneltoets T)";
    }

    themaKnop.addEventListener("click", function () {
        const nieuwThema = document.documentElement.dataset.theme === "light" ? "dark" : "light";

        zetThema(nieuwThema);

        // De keuze onthouden voor een volgend bezoek; lukt dat niet, dan geldt ze alleen nu
        try {
            localStorage.setItem("thema", nieuwThema);
        } catch (fout) {
            // Opslag geblokkeerd, bv. in een privévenster
        }
    });

    zetThema(document.documentElement.dataset.theme);

    // Sneltoets T wisselt het thema, behalve tijdens het typen in een veld
    // of samen met Ctrl, Alt of Cmd (zodat bv. Ctrl+T gewoon een nieuw tabblad opent)
    document.addEventListener("keydown", function (event) {
        const typtInVeld = event.target.closest("input, textarea, select, [contenteditable]");
        const metToets = event.ctrlKey || event.altKey || event.metaKey;

        if (event.key.toLowerCase() === "t" && !typtInVeld && !metToets && !event.repeat) {
            themaKnop.click();
        }
    });

    // Begroeting in de intro volgens het uur van de bezoeker; zonder JavaScript blijft "Hallo"
    const begroeting = document.querySelector(".hero-greeting");
    const uur = new Date().getHours();

    if (uur >= 5 && uur < 12) {
        begroeting.textContent = "Goeiemorgen, ik ben";
    } else if (uur >= 12 && uur < 18) {
        begroeting.textContent = "Goeiemiddag, ik ben";
    } else if (uur >= 18 && uur < 23) {
        begroeting.textContent = "Goeienavond, ik ben";
    } else {
        begroeting.textContent = "Nog wakker? Ik ben";
    }

    // Actieve link in de navigatie
    const secties = document.querySelectorAll("main section[id], footer[id]");

    // Actief is de laatste sectie die al tot het bovenste derde van het scherm gescrold is
    function werkActieveLinkBij() {
        let actieveSectie = secties[0];

        secties.forEach(function (sectie) {
            if (sectie.getBoundingClientRect().top <= window.innerHeight / 3) {
                actieveSectie = sectie;
            }
        });

        // Helemaal onderaan geraakt de contactsectie dat punt soms niet,
        // dus dan is die sowieso actief.
        const onderaanPagina = window.innerHeight + window.scrollY
            >= document.documentElement.scrollHeight - 2;

        if (onderaanPagina) {
            actieveSectie = secties[secties.length - 1];
        }

        menuLinks.forEach(function (link) {
            if (link.getAttribute("href") === "#" + actieveSectie.id) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    // Lees meer: style.css toont de tekst al ingeklapt zolang de klasse is-open ontbreekt.
    // Zonder JavaScript blijft alle tekst gewoon zichtbaar.
    document.querySelectorAll(".read-more-toggle").forEach(function (knop) {
        const tekst = document.getElementById(knop.getAttribute("aria-controls"));
        const label = knop.querySelector("span");

        // Alleen na een klik op "Lees minder" de knop terug in beeld brengen
        let ingeklaptDoorBezoeker = false;

        // Na het inklappen staat de knop soms onder de header of erboven; dan terug in beeld brengen
        function brengKnopInBeeld() {
            ingeklaptDoorBezoeker = false;
            if (knop.getBoundingClientRect().top < navigatie.offsetHeight) {
                knop.scrollIntoView({ block: "center" });
            }
        }

        knop.addEventListener("click", function () {
            const open = tekst.classList.toggle("is-open");

            ingeklaptDoorBezoeker = !open;
            knop.setAttribute("aria-expanded", open);
            label.textContent = open ? "Lees minder" : "Lees meer";

            // De opleiding op desktop klapt zonder overgang in (style.css); dan meteen controleren
            if (ingeklaptDoorBezoeker && tekst.getAnimations().length === 0) {
                brengKnopInBeeld();
            }
        });

        tekst.addEventListener("transitionend", function (event) {
            if (event.propertyName === "grid-template-rows" && ingeklaptDoorBezoeker) {
                brengKnopInBeeld();
            }
        });
    });

    // Paginering per vier kaarten, gedeeld door vaardigheden en projecten.
    // Onder deze breedte worden beide een veegbare carrousel zonder paginering.
    const mobieleWeergave = window.matchMedia("(max-width: 991.98px)");
    const kaartenPerPagina = 4;

    function toonPagina(lijst, kaarten, pagina, vorigeKnop, volgendeKnop) {
        const aantalPaginas = Math.ceil(kaarten.length / kaartenPerPagina);
        const eersteKaart = (pagina - 1) * kaartenPerPagina;

        // Op mobiel staan alle kaarten naast elkaar in de carrousel
        lijst.classList.toggle("is-swipeable", mobieleWeergave.matches);
        kaarten.forEach(function (kaart, index) {
            kaart.hidden = !mobieleWeergave.matches
                && (index < eersteKaart || index >= eersteKaart + kaartenPerPagina);
        });

        vorigeKnop.disabled = pagina <= 1;
        volgendeKnop.disabled = pagina >= aantalPaginas;

        return aantalPaginas;
    }

    // Vaardigheden
    const skillSlides = document.querySelector("#skill-slides");
    const skillKaarten = Array.from(skillSlides.querySelectorAll(".skill-card"));
    const vorigeKnop = document.querySelector("#skill-prev");
    const volgendeKnop = document.querySelector("#skill-next");
    let huidigeSkillpagina = 1;

    function toonSkillpagina(pagina) {
        huidigeSkillpagina = pagina;
        toonPagina(skillSlides, skillKaarten, pagina, vorigeKnop, volgendeKnop);
    }

    // Uitgeschakelde knoppen sturen geen klik, dus de grenzen bewaken zichzelf
    vorigeKnop.addEventListener("click", function () {
        toonSkillpagina(huidigeSkillpagina - 1);
    });

    volgendeKnop.addEventListener("click", function () {
        toonSkillpagina(huidigeSkillpagina + 1);
    });

    // Pijltjestoetsen bladeren op desktop; op mobiel scrollen ze de rij al vanzelf
    skillSlides.addEventListener("keydown", function (event) {
        const knop = { ArrowLeft: vorigeKnop, ArrowRight: volgendeKnop }[event.key];

        if (knop && !mobieleWeergave.matches) {
            event.preventDefault();
            knop.click();
        }
    });

    toonSkillpagina(1);

    // Projecten, van oud naar nieuw. Een nieuw project zet je gewoon onderaan de lijst,
    // met een korte teaser voor de kaart en een screenshot in images/ voor het detailvenster.
    // Heeft een project ook een lichte versie, zet die dan in afbeeldingLicht (en demoLicht).
    const projecten = [
        {
            titel: "Polestar 6",
            teaser: "Een fictieve preorder voor een roadster cabrio met drone. Kopen kan niet, dromen wel.",
            icoon: "fa-car-side",
            beschrijving: "Een fictieve preorderpagina voor de Polestar 6, en meteen mijn allereerste "
                + "opleidingsproject. Hier leerden Flexbox en ik elkaar kennen. Een mobiele versie? "
                + "Die staat nog in de backlog.",
            tags: ["HTML", "CSS", "Flexbox"],
            demo: "https://wesley-dev-tech.github.io/Polestar/",
            afbeelding: "images/polestar.webp",
            code: "https://github.com/Wesley-dev-tech/Polestar"
        },
        {
            titel: "Halloween inschrijvingspagina",
            teaser: "Een fictieve Halloweentocht op 31 oktober. Kies je tijdslot en vergeet je kostuum niet.",
            icoon: "fa-ghost",
            beschrijving: "Een inschrijvingspagina voor een fictieve Halloweentocht, met tijdsloten tot "
                + "middernacht. Het lettertype Creepster zorgt voor de rillingen. Bootstrap Grid houdt "
                + "de spoken op hun plek, ook op je smartphone.",
            tags: ["HTML", "CSS", "Bootstrap Grid"],
            demo: "https://wesley-dev-tech.github.io/Halloween/",
            afbeelding: "images/halloween.webp",
            code: "https://github.com/Wesley-dev-tech/Halloween"
        },
        {
            titel: "Kruiswoordraadsel",
            teaser: "Een fictief kruiswoordraadsel waarop je nooit vastloopt. Invullen kan namelijk niet.",
            icoon: "fa-table-cells",
            beschrijving: "Een fictief kruiswoordraadsel van 15 rijen, waarin elk vakje een kolom van "
                + "Bootstrap Grid is. Het ziet eruit als een puzzel, maar werkt als een screenshot. "
                + "Read-only, zeg maar.",
            tags: ["HTML", "CSS", "Bootstrap Grid"],
            demo: "https://wesley-dev-tech.github.io/Crossword_puzzle/",
            afbeelding: "images/kruiswoordraadsel.webp",
            code: "https://github.com/Wesley-dev-tech/Crossword_puzzle"
        },
        {
            titel: "Productpagina met Tailwind",
            teaser: "Een fictieve productkaart voor AirPods Pro 3. Zo eerlijk dat ze zelfs de nadelen opsomt.",
            icoon: "fa-headphones",
            beschrijving: "Een fictieve productkaart voor de AirPods Pro 3, eerlijk tot en met de nadelen. "
                + "De knop Koop nu heeft geen event listener, dus je portemonnee is veilig. De opmaak is "
                + "een flinke stapel utility-classes van Tailwind.",
            tags: ["HTML", "Tailwind", "Flexbox"],
            demo: "https://wesley-dev-tech.github.io/Tailwind_product_page/",
            afbeelding: "images/tailwind-productpagina.webp",
            code: "https://github.com/Wesley-dev-tech/Tailwind_product_page"
        },
        {
            titel: "Geanimeerde browsermock-up",
            teaser: "Een fictieve browser met een cursor die zijn eigen gang gaat. En dat zonder één regel JavaScript.",
            icoon: "fa-window-maximize",
            beschrijving: "Een fictief browservenster met een cursor die rondzweeft en een pagina die "
                + "vanzelf scrolt. Nul regels JavaScript, alleen HTML en CSS die hun best doen. Vink "
                + "Animatie afspelen uit en de cursor gaat in slaapstand. Vink Thema wisselen aan en "
                + "het hele venster gaat mee.",
            tags: ["HTML", "CSS"],
            demo: "https://wesley-dev-tech.github.io/Animated_browser_mockup/?v=3",
            demoLicht: "https://wesley-dev-tech.github.io/Animated_browser_mockup/?v=3#licht",
            afbeelding: "images/browsermockup-dark.webp",
            afbeeldingLicht: "images/browsermockup-light.webp",
            code: "https://github.com/Wesley-dev-tech/Animated_browser_mockup"
        },
        {
            titel: "Portfolio",
            teaser: "Het enige project hier dat niet fictief is, want je zit er middenin. Klik op Bekijk details en kijk achter de schermen.",
            icoon: "fa-laptop-code",
            beschrijving: "Geen fictie deze keer, dit is mijn eigen portfolio, gebouwd met HTML, CSS, Bootstrap "
                + "en JavaScript. Je zit er middenin, dus dit venster is eigenlijk ook een project. "
                + "Werkt op mijn smartphone en desktop, en hopelijk ook op de jouwe.",
            tags: ["HTML", "CSS", "JavaScript", "Flexbox", "Bootstrap"],
            afbeelding: "images/portfolio-dark.webp",
            afbeeldingLicht: "images/portfolio-light.webp",
            code: "https://github.com/Wesley-dev-tech/Portfolio"
        },
        {
            titel: "Vloermeesters tegelprijs calculator",
            teaser: "Een fictief tegelbedrijf. Je offerte rolt er als PDF uit, alleen belt er nooit een tegelzetter aan.",
            icoon: "fa-calculator",
            beschrijving: "Een rekentool voor Vloermeesters, een fictief tegelbedrijf. Geef de afmetingen "
                + "van je ruimte in, kies een tegel en een voeg, en de richtprijs rolt eruit als PDF-offerte. "
                + "Alleen de tegelzetter is nooit gedeployd.",
            tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
            demo: "https://wesley-dev-tech.github.io/Flooring_price_calculator/",
            afbeelding: "images/vloermeesters.webp",
            code: "https://github.com/Wesley-dev-tech/Flooring_price_calculator"
        },
    ];

    const projectLijst = document.querySelector("#project-list");
    const projectSjabloon = document.querySelector("#project-template");
    const projectSortering = document.querySelector("#project-sort");
    const projectPaginering = document.querySelector("#project-pagination");
    const vorigeProjectpaginaKnop = document.querySelector("#project-prev");
    const volgendeProjectpaginaKnop = document.querySelector("#project-next");

    // Technologieën als labels; gedeeld door de projectkaart en het detailvenster
    function vulTags(element, project) {
        const tags = element.querySelector(".project-tags");

        tags.replaceChildren();
        project.tags.forEach(function (tag) {
            const label = document.createElement("li");
            label.textContent = tag;
            tags.appendChild(label);
        });
    }

    // Een kopie van het sjabloon invullen met de teaser van één project
    function maakProjectkaart(project, index) {
        const kaart = projectSjabloon.content.firstElementChild.cloneNode(true);

        // Hoe hoger het nummer, hoe nieuwer het project
        kaart.dataset.order = index;
        kaart.querySelector(".project-icon i").classList.add(project.icoon);
        kaart.querySelector(".project-open").textContent = project.titel;
        kaart.querySelector("p").textContent = project.teaser;
        vulTags(kaart, project);

        return kaart;
    }

    const projectKaarten = projecten.map(maakProjectkaart);
    let huidigeProjectpagina = 1;

    function werkProjectenBij() {
        const sortering = projectSortering.value;

        projectKaarten.sort(function (eerste, tweede) {
            if (sortering === "alphabetical") {
                return eerste.querySelector("h3").textContent.localeCompare(
                    tweede.querySelector("h3").textContent,
                    "nl"
                );
            }

            const verschil = Number(eerste.dataset.order) - Number(tweede.dataset.order);
            return sortering === "oldest" ? verschil : -verschil;
        });

        projectKaarten.forEach(function (kaart) {
            projectLijst.appendChild(kaart);
        });

        // Na een nieuwe sortering terug naar de eerste pagina (of het eerste project)
        projectLijst.scrollLeft = 0;
        toonProjectpagina(1);
    }

    function toonProjectpagina(pagina) {
        huidigeProjectpagina = pagina;
        const aantalPaginas = toonPagina(projectLijst, projectKaarten, pagina,
            vorigeProjectpaginaKnop, volgendeProjectpaginaKnop);

        projectPaginering.hidden = mobieleWeergave.matches || aantalPaginas <= 1;
    }

    projectSortering.addEventListener("change", werkProjectenBij);
    werkProjectenBij();

    vorigeProjectpaginaKnop.addEventListener("click", function () {
        toonProjectpagina(huidigeProjectpagina - 1);
    });

    volgendeProjectpaginaKnop.addEventListener("click", function () {
        toonProjectpagina(huidigeProjectpagina + 1);
    });

    // Bij de wissel tussen carrousel en paginering beide lijsten opnieuw tonen
    mobieleWeergave.addEventListener("change", function () {
        toonSkillpagina(huidigeSkillpagina);
        toonProjectpagina(huidigeProjectpagina);
    });

    // Elke kaart even hoog als de hoogste in dezelfde lijst, ook op een andere pagina.
    // Verborgen kaarten worden heel even getoond om ze te kunnen meten.
    function maakKaartenEvenHoog(kaarten) {
        const verborgenKaarten = kaarten.filter(function (kaart) {
            return kaart.hidden;
        });

        kaarten.forEach(function (kaart) {
            kaart.style.removeProperty("--kaart-hoogte");
            kaart.hidden = false;
        });

        const hoogste = Math.max(...kaarten.map(function (kaart) {
            return kaart.offsetHeight;
        }));

        verborgenKaarten.forEach(function (kaart) {
            kaart.hidden = true;
        });
        // Alleen de gemeten waarde; style.css gebruikt ze als min-height
        kaarten.forEach(function (kaart) {
            kaart.style.setProperty("--kaart-hoogte", hoogste + "px");
        });
    }

    // Over mij op desktop: ingeklapt rekt style.css de poster zelf uit tot de hoogte van de
    // tekstkolom. Die hoogte wordt hier bewaard, zodat de poster na "Lees meer" niet meegroeit.
    // Bij de opleiding bepaalt de poster zelf de hoogte; daar valt niets te meten.
    const desktopWeergave = window.matchMedia("(min-width: 1200px)");
    const artikelIndelingen = document.querySelectorAll(".article-layout:not(.article-layout-reverse)");

    function maakPosterEvenHoog(indeling) {
        const tekst = indeling.querySelector(".article-text");

        if (!desktopWeergave.matches) {
            indeling.style.removeProperty("--tekst-hoogte");
        } else if (!tekst.querySelector(".read-more").classList.contains("is-open")) {
            indeling.style.setProperty("--tekst-hoogte", tekst.offsetHeight + "px");
        }
    }

    function maakAlleKaartenEvenHoog() {
        maakKaartenEvenHoog(skillKaarten);
        maakKaartenEvenHoog(projectKaarten);
        artikelIndelingen.forEach(maakPosterEvenHoog);
    }

    // Opnieuw meten zodra het lettertype geladen is en bij een andere schermbreedte
    document.fonts.ready.then(maakAlleKaartenEvenHoog);
    window.addEventListener("resize", maakAlleKaartenEvenHoog);
    maakAlleKaartenEvenHoog();

    // Vensters (projectdetail en privacybeleid): openen, sluiten en de focus terugzetten
    let vensterOpener = null;

    // showModal zet de focus op de sluitknop, met een koperen focusring rond het kruisje als gevolg.
    // Daarom krijgt het venster zelf de focus (tabindex="-1" in de HTML); Tab gaat dan naar het kruisje.
    // Na het sluiten gaat de focus terug naar de opener.
    function openVenster(venster, opener) {
        vensterOpener = opener;
        document.documentElement.classList.add("modal-is-open");
        venster.showModal();
        venster.focus();
    }

    document.querySelectorAll(".dialog").forEach(function (venster) {
        const sluitKnop = venster.querySelector(".dialog-close");

        sluitKnop.addEventListener("click", function () {
            venster.close();
        });

        // Lege touch-listener: zonder zet Safari op iPhone :active niet, en dat geeft het hover-effect op gsm
        sluitKnop.addEventListener("touchstart", function () {}, { passive: true });

        // Een klik op de donkere achtergrond valt op het dialog-element zelf
        venster.addEventListener("click", function (event) {
            if (event.target === venster) {
                venster.close();
            }
        });

        // Escape sluit het venster al vanzelf; ook dan opruimen
        venster.addEventListener("close", function () {
            document.documentElement.classList.remove("modal-is-open");

            if (vensterOpener) {
                vensterOpener.focus({ preventScroll: true });
            }
        });
    });

    // Privacybeleid in de footer
    const privacyKnop = document.querySelector(".privacy-open");

    privacyKnop.addEventListener("click", function () {
        openVenster(document.querySelector("#privacy-modal"), privacyKnop);
    });

    // Link naar het contactformulier: eerst het venster sluiten, daarna springt de link naar de footer
    document.querySelectorAll(".privacy-close").forEach(function (link) {
        link.addEventListener("click", function () {
            link.closest("dialog").close();
        });
    });

    // Links binnen het privacybeleid scrollen in het venster zelf naar het juiste stukje,
    // zonder het adres in de adresbalk te veranderen
    document.querySelectorAll(".privacy-jump").forEach(function (link) {
        link.addEventListener("click", function (gebeurtenis) {
            const doel = document.querySelector(link.getAttribute("href"));

            if (!doel) {
                return;
            }

            gebeurtenis.preventDefault();
            doel.scrollIntoView({
                behavior: scrollGedrag(),
                block: "start"
            });
        });
    });

    // Detailvenster van een project
    const projectModal = document.querySelector("#project-modal");
    const projectModalAfbeelding = projectModal.querySelector(".project-modal-image");

    function openProjectModal(kaart) {
        const project = projecten[Number(kaart.dataset.order)];

        projectModal.querySelector(".project-icon i").className = "fa-solid " + project.icoon;
        projectModal.querySelector("#project-modal-title").textContent = project.titel;
        projectModal.querySelector(".project-modal-description").textContent = project.beschrijving;
        // Screenshot en demo in het thema dat nu actief is, als het project er een lichte versie van heeft
        const lichtThema = document.documentElement.dataset.theme === "light";

        function inThema(donker, licht) {
            return lichtThema && licht ? licht : donker;
        }

        projectModalAfbeelding.src = inThema(project.afbeelding, project.afbeeldingLicht);
        projectModalAfbeelding.alt = "Screenshot van " + project.titel;
        vulTags(projectModal, project);

        // Zonder live demo geen knop die nergens naartoe gaat
        const demoLink = projectModal.querySelector(".project-demo");
        demoLink.hidden = !project.demo;
        if (project.demo) {
            demoLink.href = inThema(project.demo, project.demoLicht);
        }
        projectModal.querySelector(".project-code").href = project.code;

        openVenster(projectModal, kaart.querySelector(".project-open"));
    }

    // De hele kaart is klikbaar; de titelknop zorgt voor de toetsenbordbediening
    projectLijst.addEventListener("click", function (event) {
        const kaart = event.target.closest("#project-list > *");

        if (kaart) {
            openProjectModal(kaart);
        }
    });

    // Secties en kaarten animeren wanneer ze in beeld komen.
    // De kolom met de Google Maps-kaart doet niet mee: Safari en de ingebouwde browser van
    // Facebook tonen een iframe in een element met transform of opacity soms helemaal leeg.
    // Dit staat onderaan, zodat de projectkaarten al bestaan.
    if ("IntersectionObserver" in window && !voorkeurMinderBeweging.matches) {
        const scrollObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll(
            "#about .about-card, #education .education-card, #cv .cv-card, " +
            "#skills .skills-carousel, #projects .section-head-row, " +
            "#project-list > *, .footer-grid > :not(.footer-details)"
        ).forEach(function (element) {
            element.classList.add("scroll-reveal");
            scrollObserver.observe(element);
        });
    }

    // Terug-naar-boven-knop
    const terugNaarBovenKnop = document.querySelector("#back-to-top");

    function werkTerugNaarBovenKnopBij() {
        terugNaarBovenKnop.hidden = window.scrollY < 400;
    }

    terugNaarBovenKnop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: scrollGedrag() });
    });

    // Voortgangsbalk onder de header
    const voortgangsbalk = document.querySelector("#scroll-progress");

    function werkVoortgangsbalkBij() {
        const scrollbareHoogte = document.documentElement.scrollHeight - window.innerHeight;
        let voortgang = scrollbareHoogte > 0 ? window.scrollY / scrollbareHoogte : 0;

        // Op iPhones kan je even voorbij de rand scrollen, dus tussen 0 en 1 houden
        voortgang = Math.min(Math.max(voortgang, 0), 1);
        // Alleen de waarde; style.css zet ze om in de breedte van de balk
        voortgangsbalk.style.setProperty("--voortgang", voortgang);
    }

    // Alles wat meebeweegt met de scrollpositie, in één listener
    function werkScrollpositieBij() {
        werkActieveLinkBij();
        werkTerugNaarBovenKnopBij();
        werkVoortgangsbalkBij();
    }

    window.addEventListener("scroll", werkScrollpositieBij, { passive: true });
    window.addEventListener("resize", werkScrollpositieBij);
    werkScrollpositieBij();

    // Jaartal in de footer altijd actueel houden
    document.querySelector("#copyright-year").textContent = new Date().getFullYear();

    // Laatst bijgewerkt: GitHub Pages geeft de datum van de laatste publicatie mee,
    // dus die hoeft niemand met de hand aan te passen
    const bijgewerkt = document.querySelector("#last-updated");
    const publicatieDatum = new Date(document.lastModified);

    if (!isNaN(publicatieDatum)) {
        bijgewerkt.textContent = publicatieDatum.toLocaleDateString("nl-BE", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
        bijgewerkt.setAttribute("datetime", publicatieDatum.toISOString().slice(0, 10));
    }

    // Afdrukken met Ctrl+P: style.css toont op papier alleen het cv (zoals de pdf's in cv/).
    // De titel wordt de voorgestelde bestandsnaam bij "Opslaan als pdf".
    const paginaTitel = document.title;

    window.addEventListener("beforeprint", function () {
        document.title = "Cv Wesley Bogaerts";
    });

    window.addEventListener("afterprint", function () {
        document.title = paginaTitel;
    });

    // Contactformulier: versturen zonder de pagina te verlaten.
    // Zonder JavaScript post het formulier gewoon naar Web3Forms en komt de bezoeker terug.
    const contactFormulier = document.querySelector("#contact-form");
    const contactStatus = document.querySelector("#contact-status");

    // Berichtveld op touchscreens laten meegroeien, voor browsers die field-sizing (style.css) niet kennen
    const berichtVeld = document.querySelector("#contact-bericht");
    const groeitZelf = !CSS.supports("field-sizing", "content")
        && window.matchMedia("(pointer: coarse)").matches;

    function pasBerichtHoogteAan() {
        if (!groeitZelf) {
            return;
        }

        // Eerst terug naar de minimumhoogte, zodat het veld ook weer kan krimpen.
        // Alleen de gemeten waarde; style.css gebruikt ze als hoogte.
        berichtVeld.style.removeProperty("--bericht-hoogte");
        const rand = berichtVeld.offsetHeight - berichtVeld.clientHeight;
        berichtVeld.style.setProperty("--bericht-hoogte", berichtVeld.scrollHeight + rand + "px");
    }

    berichtVeld.addEventListener("input", pasBerichtHoogteAan);

    function toonContactStatus(tekst, gelukt) {
        contactStatus.textContent = tekst;
        contactStatus.classList.toggle("is-ok", gelukt);
        contactStatus.classList.toggle("is-fout", !gelukt);
    }

    contactFormulier.addEventListener("submit", async function (gebeurtenis) {
        gebeurtenis.preventDefault();

        const verstuurKnop = contactFormulier.querySelector('button[type="submit"]');
        const knopTekst = verstuurKnop.querySelector("span");

        verstuurKnop.disabled = true;
        knopTekst.textContent = "Bezig met versturen…";
        toonContactStatus("", true);

        // Na 20 seconden zonder antwoord breken we af, zodat de knop nooit blijft hangen
        const afbreker = new AbortController();
        const wachtTimer = setTimeout(function () {
            afbreker.abort();
        }, 20000);

        try {
            // Web3Forms staat verzoeken van andere websites toe en antwoordt altijd met JSON
            const antwoord = await fetch(contactFormulier.action, {
                method: "POST",
                headers: { Accept: "application/json" },
                body: new FormData(contactFormulier),
                signal: afbreker.signal
            });
            const resultaat = await antwoord.json().catch(function () { return {}; });

            if (!antwoord.ok || resultaat.success !== true) {
                throw new Error(resultaat.message || "Versturen mislukt");
            }

            contactFormulier.reset();
            pasBerichtHoogteAan();
            toonContactStatus("Bedankt! Je bericht is verstuurd, ik antwoord zo snel mogelijk.", true);
        } catch (fout) {
            toonContactStatus("Versturen lukte niet. Probeer het opnieuw of bel me even.", false);
        } finally {
            clearTimeout(wachtTimer);
            verstuurKnop.disabled = false;
            knopTekst.textContent = "Verstuur bericht";
        }
    });
});
