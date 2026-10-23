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
    zetMenu(!navigatie.classList.contains("menu-is-open"));
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

// Lees meer: zonder JavaScript blijft alle tekst gewoon zichtbaar
document.querySelectorAll(".read-more-toggle").forEach(function (knop) {
    const tekst = document.getElementById(knop.getAttribute("aria-controls"));
    const label = knop.querySelector("span");

    tekst.classList.add("is-collapsed");
    knop.hidden = false;

    knop.addEventListener("click", function () {
        const open = tekst.classList.toggle("is-collapsed") === false;

        knop.setAttribute("aria-expanded", open);
        label.textContent = open ? "Lees minder" : "Lees meer";
    });

    // Na het inklappen staat de knop soms onder de header of erboven; dan terug in beeld brengen
    tekst.addEventListener("transitionend", function (event) {
        if (event.propertyName === "grid-template-rows"
            && tekst.classList.contains("is-collapsed")
            && knop.getBoundingClientRect().top < navigatie.offsetHeight) {
            knop.scrollIntoView({ block: "center" });
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

mobieleWeergave.addEventListener("change", function () {
    toonSkillpagina(huidigeSkillpagina);
});

toonSkillpagina(1);

// Projecten, van oud naar nieuw. Een nieuw project zet je gewoon onderaan de lijst,
// met een korte teaser voor de kaart en een screenshot in images/ voor het detailvenster.
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
            + "Animatie afspelen uit en de cursor gaat in slaapstand.",
        tags: ["HTML", "CSS"],
        demo: "https://wesley-dev-tech.github.io/Animated_browser_mockup/",
        afbeelding: "images/browsermockup.webp",
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
        afbeelding: "images/portfolio.webp",
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

mobieleWeergave.addEventListener("change", function () {
    toonProjectpagina(huidigeProjectpagina);
});

// Detailvenster van een project
const projectModal = document.querySelector("#project-modal");
const projectModalAfbeelding = projectModal.querySelector(".project-modal-image");
let projectModalOpener = null;

function openProjectModal(kaart) {
    const project = projecten[Number(kaart.dataset.order)];

    projectModal.querySelector(".project-icon i").className = "fa-solid " + project.icoon;
    projectModal.querySelector("#project-modal-title").textContent = project.titel;
    projectModal.querySelector(".project-modal-description").textContent = project.beschrijving;
    projectModalAfbeelding.src = project.afbeelding;
    projectModalAfbeelding.alt = "Screenshot van " + project.titel;
    vulTags(projectModal, project);

    // Zonder live demo geen knop die nergens naartoe gaat
    const demoLink = projectModal.querySelector(".project-demo");
    demoLink.hidden = !project.demo;
    if (project.demo) {
        demoLink.href = project.demo;
    }
    projectModal.querySelector(".project-code").href = project.code;

    // showModal zet de focus op de sluitknop; na het sluiten gaat ze terug naar deze kaart
    projectModalOpener = kaart.querySelector(".project-open");
    document.documentElement.classList.add("modal-is-open");
    projectModal.showModal();
}

// De hele kaart is klikbaar; de titelknop zorgt voor de toetsenbordbediening
projectLijst.addEventListener("click", function (event) {
    const kaart = event.target.closest("#project-list > *");

    if (kaart) {
        openProjectModal(kaart);
    }
});

projectModal.querySelector(".project-modal-close").addEventListener("click", function () {
    projectModal.close();
});

// Een klik op de donkere achtergrond valt op het dialog-element zelf
projectModal.addEventListener("click", function (event) {
    if (event.target === projectModal) {
        projectModal.close();
    }
});

// Escape sluit het venster al vanzelf; ook dan opruimen
projectModal.addEventListener("close", function () {
    document.documentElement.classList.remove("modal-is-open");

    if (projectModalOpener) {
        projectModalOpener.focus({ preventScroll: true });
    }
});

// Secties en kaarten animeren wanneer ze in beeld komen.
// Dit staat onderaan, zodat de projectkaarten al bestaan.
const voorkeurMinderBeweging = window.matchMedia("(prefers-reduced-motion: reduce)");

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
        "#about .container > *, #education .education-card, " +
        "#skills .skills-carousel, #projects .section-title, " +
        "#projects .project-controls, #project-list > *, " +
        ".footer .container > *"
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
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Voortgangsbalk onder de header
const voortgangsbalk = document.querySelector("#scroll-progress");

function werkVoortgangsbalkBij() {
    const scrollbareHoogte = document.documentElement.scrollHeight - window.innerHeight;
    let voortgang = scrollbareHoogte > 0 ? window.scrollY / scrollbareHoogte : 0;

    // Op iPhones kan je even voorbij de rand scrollen, dus tussen 0 en 1 houden
    voortgang = Math.min(Math.max(voortgang, 0), 1);
    voortgangsbalk.style.transform = "scaleX(" + voortgang + ")";
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
