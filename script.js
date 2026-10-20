// Hamburgermenu
const menuKnop = document.querySelector(".menu-open");
const sluitKnop = document.querySelector(".menu-close");
const navigatie = document.querySelector(".site-nav");
const menuLinks = document.querySelectorAll(".nav-links a");

// Menu openen
menuKnop.addEventListener("click", function (event) {
    event.preventDefault();
    navigatie.classList.add("menu-actief");
});

// Menu sluiten
sluitKnop.addEventListener("click", function (event) {
    event.preventDefault();
    navigatie.classList.remove("menu-actief");
});

// Menu sluiten na het kiezen van een link
menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navigatie.classList.remove("menu-actief");
    });
});

// Vaardighedencarrousel
const skillKaarten = document.querySelectorAll("#skill-slides .skill-card");
const vorigeKnop = document.querySelector("#vorige-skill");
const volgendeKnop = document.querySelector("#volgende-skill");
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

    carrouselBedieningsknop.setAttribute("aria-pressed", carrouselActief);
    icoon.className = carrouselActief
        ? "fa-solid fa-pause"
        : "fa-solid fa-play";
    tekst.textContent = carrouselActief
        ? "Automatisch pauzeren"
        : "Automatisch starten";
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

// Secties en kaarten animeren wanneer ze in beeld komen
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
        "#projects .project-controls, #project-list > [data-project-order], " +
        ".footer .container > *"
    ).forEach(function (element) {
        element.classList.add("scroll-reveal");
        scrollObserver.observe(element);
    });
}

// Projectpaginering
const projectLijst = document.querySelector("#project-list");
const projectKaarten = Array.from(
    projectLijst.querySelectorAll(":scope > [data-project-order]")
);
const projectSortering = document.querySelector("#project-sort");
const projectPaginering = document.querySelector("#project-pagination");
const vorigeProjectpaginaKnop = document.querySelector("#vorige-projectpagina");
const volgendeProjectpaginaKnop = document.querySelector("#volgende-projectpagina");
const projectenPerPagina = 4;
let zichtbareProjecten = projectKaarten.slice();
let huidigeProjectpagina = 1;

function werkProjectenBij() {
    const sortering = projectSortering.value;

    zichtbareProjecten = projectKaarten.slice();

    zichtbareProjecten.sort(function (eerste, tweede) {
        if (sortering === "alphabetical") {
            return eerste.querySelector("h3").textContent.localeCompare(
                tweede.querySelector("h3").textContent,
                "nl"
            );
        }

        const verschil = Number(eerste.dataset.projectOrder)
            - Number(tweede.dataset.projectOrder);
        return sortering === "oldest" ? -verschil : verschil;
    });

    zichtbareProjecten.forEach(function (kaart) {
        projectLijst.appendChild(kaart);
    });

    toonProjectpagina(huidigeProjectpagina);
}

function toonProjectpagina(pagina) {
    const aantalProjectpaginas = Math.ceil(
        zichtbareProjecten.length / projectenPerPagina
    );
    huidigeProjectpagina = pagina;
    const eersteProject = (pagina - 1) * projectenPerPagina;
    const laatsteProject = eersteProject + projectenPerPagina;

    projectKaarten.forEach(function (kaart) {
        kaart.hidden = true;
    });

    zichtbareProjecten.forEach(function (kaart, index) {
        kaart.hidden = index < eersteProject || index >= laatsteProject;
    });

    projectPaginering.hidden = aantalProjectpaginas <= 1;
    vorigeProjectpaginaKnop.disabled = pagina <= 1;
    volgendeProjectpaginaKnop.disabled = pagina >= aantalProjectpaginas;
}

projectSortering.addEventListener("change", werkProjectenBij);
werkProjectenBij();

vorigeProjectpaginaKnop.addEventListener("click", function () {
    if (huidigeProjectpagina > 1) {
        toonProjectpagina(huidigeProjectpagina - 1);
    }
});

volgendeProjectpaginaKnop.addEventListener("click", function () {
    if (huidigeProjectpagina < Math.ceil(
        zichtbareProjecten.length / projectenPerPagina
    )) {
        toonProjectpagina(huidigeProjectpagina + 1);
    }
});

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