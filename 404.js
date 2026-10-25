// Het thema dat de bezoeker op het portfolio koos, meteen toegepast zodra dit script in de
// head geladen wordt (zelfde opslag als script.js). Anders blijft de pagina donker.
// De kleur van de browserbalk komt uit 404.css, zodat de kleuren maar op één plek staan.
try {
    if (localStorage.getItem("thema") === "light") {
        document.documentElement.dataset.theme = "light";
        document.querySelector('meta[name="theme-color"]').setAttribute("content",
            getComputedStyle(document.documentElement).getPropertyValue("--bg-primary").trim());
    }
} catch (fout) {
    // Opslag geblokkeerd, bv. in een privévenster: dan gewoon het donkere thema
}
