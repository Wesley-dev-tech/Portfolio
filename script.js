const menuKnop = document.querySelector(".menu-open");
const sluitKnop = document.querySelector(".menu-close");
const navigatie = document.querySelector(".site-nav");

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

const menuLinks = document.querySelectorAll(".nav-links a");

menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navigatie.classList.remove("menu-actief");
    });
});