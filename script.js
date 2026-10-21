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

// Menu sluiten met de Escape-toets
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navigatie.classList.contains("menu-is-open")) {
        zetMenu(false);
        menuKnop.focus();
    }
});

// Vaardighedencarrousel
const skillSlides = document.querySelector("#skill-slides");
const skillKaarten = skillSlides.querySelectorAll(".skill-card");
const vorigeKnop = document.querySelector("#skill-prev");
const volgendeKnop = document.querySelector("#skill-next");
const carrouselBedieningsknop = document.querySelector("#skill-carousel-toggle");
const voorkeurMinderBeweging = window.matchMedia("(prefers-reduced-motion: reduce)");

let huidigeSkill = 0;
let carrouselActief = !voorkeurMinderBeweging.matches;
let carrouselTimer = null;

// Alleen de gekozen kaart tonen
function toonSkill() {
    skillKaarten.forEach(function (kaart) {
        kaart.hidden = true;
    });

    skillKaarten[huidigeSkill].hidden = false;
}

function werkCarrouselBedieningBij() {
    const icoon = carrouselBedieningsknop.querySelector("i");
    const tekst = carrouselBedieningsknop.querySelector("span");

    icoon.className = carrouselActief
        ? "fa-solid fa-pause"
        : "fa-solid fa-play";
    tekst.textContent = carrouselActief
        ? "Automatisch pauzeren"
        : "Automatisch starten";

    // Een screenreader leest een nieuwe kaart alleen voor als de carrousel stilstaat,
    // anders zou die om de 3 seconden onderbroken worden.
    skillSlides.setAttribute("aria-live", carrouselActief ? "off" : "polite");
}

function werkCarrouselTimerBij() {
    if (carrouselTimer !== null) {
        clearInterval(carrouselTimer);
        carrouselTimer = null;
    }

    if (carrouselActief && !document.hidden) {
        carrouselTimer = setInterval(volgendeSkill, 3000);
    }

    werkCarrouselBedieningBij();
}

// Naar de volgende kaart gaan
function volgendeSkill() {
    huidigeSkill = huidigeSkill + 1;

    if (huidigeSkill >= skillKaarten.length) {
        huidigeSkill = 0;
    }

    toonSkill();
}

// Naar de vorige kaart gaan
function vorigeSkill() {
    huidigeSkill = huidigeSkill - 1;

    if (huidigeSkill < 0) {
        huidigeSkill = skillKaarten.length - 1;
    }

    toonSkill();
}

toonSkill();
werkCarrouselTimerBij();

// Knop Volgende
volgendeKnop.addEventListener("click", function () {
    volgendeSkill();
    werkCarrouselTimerBij();
});

// Knop Vorige
vorigeKnop.addEventListener("click", function () {
    vorigeSkill();
    werkCarrouselTimerBij();
});

carrouselBedieningsknop.addEventListener("click", function () {
    carrouselActief = !carrouselActief;
    werkCarrouselTimerBij();
});

document.addEventListener("visibilitychange", werkCarrouselTimerBij);

voorkeurMinderBeweging.addEventListener("change", function (event) {
    if (event.matches) {
        carrouselActief = false;
        werkCarrouselTimerBij();
    }
});

// Projecten, van oud naar nieuw. Een nieuw project zet je gewoon onderaan de lijst.
const projecten = [
    {
        titel: "Polestar 6",
        icoon: "fa-car-side",
        beschrijving: "Mijn eerste opleidingsproject: een fictieve Polestar-pagina "
            + "namaken met HTML en CSS. Daarbij oefende ik met Flexbox en het "
            + "positioneren van afbeeldingen. De pagina is nog niet aangepast "
            + "voor mobiele apparaten.",
        tags: ["HTML", "CSS", "Flexbox"],
        demo: "projecten/polestar/index.html",
        code: "https://github.com/Wesley-dev-tech/polestar"
    },
    {
        titel: "Halloween inschrijvingspagina",
        icoon: "fa-ghost",
        beschrijving: "Een inschrijvingspagina voor een Halloweentocht. Ik oefende "
            + "met Bootstrap Grid, Google Fonts, Font Awesome-iconen en een "
            + "formulier met invoervelden. De lay-out werkt op zowel "
            + "desktopcomputers als mobiele apparaten.",
        tags: ["HTML", "CSS", "Bootstrap Grid"],
        demo: "projecten/halloween/index.html",
        code: "https://github.com/Wesley-dev-tech/halloween"
    },
    {
        titel: "Kruiswoordraadsel",
        icoon: "fa-table-cells",
        beschrijving: "Een visuele uitwerking van een kruiswoordraadsel met "
            + "Bootstrap Grid. Met rijen, kolommen en CSS bouwde ik een raster "
            + "met genummerde vakjes. De puzzel is niet interactief.",
        tags: ["HTML", "CSS", "Bootstrap Grid"],
        demo: "projecten/kruiswoordraadsel/index.html",
        code: "https://github.com/Wesley-dev-tech/crossword-puzzle"
    },
    {
        titel: "Productpagina met Tailwind",
        icoon: "fa-headphones",
        beschrijving: "Een AirPods-productpagina vormgegeven met Tailwind CSS. Ik "
            + "oefende met utility-classes voor de lay-out, kleuren, typografie "
            + "en de opmaak van de productkaart.",
        tags: ["HTML", "Tailwind", "Flexbox"],
        demo: "projecten/tailwind/index.html",
        code: "https://github.com/Wesley-dev-tech/tailwind-product-page"
    },
    {
        titel: "Geanimeerde browsermock-up",
        icoon: "fa-window-maximize",
        beschrijving: "Een geanimeerd browservenster met een bewegende cursor en "
            + "een scrollende voorbeeldpagina. Dit project laat zien hoe je met "
            + "HTML en CSS een animatie kunt maken zonder JavaScript.",
        tags: ["HTML", "CSS"],
        demo: "projecten/browser-mockup/index.html",
        code: "https://github.com/Wesley-dev-tech/animated-browser-mockup"
    },
    {
        titel: "Portfolio",
        icoon: "fa-laptop-code",
        beschrijving: "Mijn eigen portfoliowebsite, opgebouwd met HTML, CSS, "
            + "JavaScript, Flexbox en Bootstrap. De lay-out werkt op zowel "
            + "desktopcomputers als mobiele apparaten.",
        tags: ["HTML", "CSS", "JavaScript", "Flexbox", "Bootstrap"],
        code: "https://github.com/Wesley-dev-tech/portfolio"
    }
];

const projectLijst = document.querySelector("#project-list");
const projectSjabloon = document.querySelector("#project-template");
const projectSortering = document.querySelector("#project-sort");
const projectPaginering = document.querySelector("#project-pagination");
const vorigeProjectpaginaKnop = document.querySelector("#project-prev");
const volgendeProjectpaginaKnop = document.querySelector("#project-next");
const projectenPerPagina = 4;

// Een kopie van het sjabloon invullen met de gegevens van één project
function maakProjectkaart(project, index) {
    const kaart = projectSjabloon.content.firstElementChild.cloneNode(true);
    const tags = kaart.querySelector(".project-tags");
    const demoLink = kaart.querySelector(".project-demo");

    // Hoe hoger het nummer, hoe nieuwer het project
    kaart.dataset.order = index;
    kaart.querySelector(".project-icon i").classList.add(project.icoon);
    kaart.querySelector("h3").textContent = project.titel;
    kaart.querySelector("p").textContent = project.beschrijving;

    project.tags.forEach(function (tag) {
        const label = document.createElement("span");
        label.textContent = tag;
        tags.appendChild(label);
    });

    if (project.demo) {
        demoLink.href = project.demo;
    } else {
        demoLink.remove();
    }

    kaart.querySelector(".project-code").href = project.code;

    return kaart;
}

const projectKaarten = projecten.map(maakProjectkaart);
let huidigeProjectpagina = 1;

function aantalProjectpaginas() {
    return Math.ceil(projectKaarten.length / projectenPerPagina);
}

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

    // Na een nieuwe sortering terug naar de eerste pagina
    toonProjectpagina(1);
}

function toonProjectpagina(pagina) {
    huidigeProjectpagina = pagina;
    const eersteProject = (pagina - 1) * projectenPerPagina;
    const laatsteProject = eersteProject + projectenPerPagina;

    projectKaarten.forEach(function (kaart, index) {
        kaart.hidden = index < eersteProject || index >= laatsteProject;
    });

    projectPaginering.hidden = aantalProjectpaginas() <= 1;
    vorigeProjectpaginaKnop.disabled = pagina <= 1;
    volgendeProjectpaginaKnop.disabled = pagina >= aantalProjectpaginas();
}

projectSortering.addEventListener("change", werkProjectenBij);
werkProjectenBij();

vorigeProjectpaginaKnop.addEventListener("click", function () {
    if (huidigeProjectpagina > 1) {
        toonProjectpagina(huidigeProjectpagina - 1);
    }
});

volgendeProjectpaginaKnop.addEventListener("click", function () {
    if (huidigeProjectpagina < aantalProjectpaginas()) {
        toonProjectpagina(huidigeProjectpagina + 1);
    }
});

// Secties en kaarten animeren wanneer ze in beeld komen.
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

window.addEventListener("scroll", werkTerugNaarBovenKnopBij, { passive: true });

terugNaarBovenKnop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

werkTerugNaarBovenKnopBij();

// Jaartal in de footer altijd actueel houden
document.querySelector("#copyright-year").textContent = new Date().getFullYear();
