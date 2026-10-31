// Cv als pdf, getekend met jsPDF
// De inhoud komt uit het cv in index.html en de kleuren uit style.css, dus de pdf volgt vanzelf
// elke wijziging aan het cv, de gekozen taal en het thema dat de bezoeker gekozen heeft
// pdf.save() maakt het bestand in de browser, zodat het meteen in de map Downloads komt
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".cv-pdf").addEventListener("click", maakCvPdf);
});

// A4 in millimeter, met dezelfde verhouding tussen de kolommen als op de site (18 : 13)
const PAGINA_BREEDTE = 210;
const PAGINA_HOOGTE = 297;
const MARGE = 12;
const INHOUD_BREEDTE = PAGINA_BREEDTE - MARGE * 2;
const KOLOM_RUIMTE = 4;
const LINKER_KOLOM = (INHOUD_BREEDTE - KOLOM_RUIMTE) * 18 / 31;
const PT = 0.3528; // 1 punt in millimeter

// Tekst van een element, met de witruimte uit de HTML samengevoegd tot één spatie
function tekstVan(element) {
    return element ? element.textContent.replace(/\s+/g, " ").trim() : "";
}

// Hoogte van één regel tekst in millimeter
function regelHoogte(grootte) {
    return grootte * PT * 1.4;
}

// Afstand van de bovenkant van een regel tot het midden van de letters,
// om bolletjes en streepjes mooi naast de tekst te zetten
function tekstMidden(grootte) {
    return grootte * PT * 0.55;
}

// jsPDF kan geen svg tekenen: het logo eerst op een canvas zetten en als png bewaren.
// Het logo van het actieve thema, net als op de site.
function logoAlsPng(item) {
    const licht = document.documentElement.dataset.theme === "light";
    const logo = item.querySelector(licht ? "img:not(.theme-dark-only)" : "img:not(.theme-light-only)");
    const canvas = document.createElement("canvas");

    canvas.width = 128;
    canvas.height = 128;
    canvas.getContext("2d").drawImage(logo, 0, 0, 128, 128);
    return canvas.toDataURL("image/png");
}

// Het cv uit index.html lezen: dezelfde tekst als op de site
function leesCv() {
    const cv = document.querySelector("#cv");
    const panelen = cv.querySelectorAll(".cv-panel");
    const profiel = panelen[2];

    function leesTijdlijn(paneel) {
        return Array.from(paneel.querySelectorAll(".cv-item")).map(function (item) {
            const titel = item.querySelector("h5");
            const noot = tekstVan(titel.querySelector(".cv-note"));

            return {
                datum: tekstVan(item.querySelector(".cv-date")).toUpperCase(),
                titel: tekstVan(titel).replace(noot, "").trim(),
                noot: noot,
                plaats: tekstVan(item.querySelector(".cv-place")),
                taken: Array.from(item.querySelectorAll(".cv-tasks li")).map(tekstVan),
                lopend: item.classList.contains("is-current")
            };
        });
    }

    return {
        naam: tekstVan(cv.querySelector(".cv-print-name")),
        rol: tekstVan(cv.querySelector(".cv-print-role")),
        contact: Array.from(cv.querySelectorAll(".cv-print-contact li")).map(tekstVan),
        intro: tekstVan(cv.querySelector(".lead-text")),
        werkTitel: tekstVan(panelen[0].querySelector(".cv-panel-title")),
        werk: leesTijdlijn(panelen[0]),
        opleidingTitel: tekstVan(panelen[1].querySelector(".cv-panel-title")),
        opleidingen: leesTijdlijn(panelen[1]),
        profielTitel: tekstVan(profiel.querySelector(".cv-panel-title")),
        kopjes: Array.from(profiel.querySelectorAll(".cv-subhead")).map(tekstVan),
        // Per groep (Frontend, Backend, ...) de logo's, of de namen bij een groep zonder logo's
        // (de concepten). De lijst staat telkens net onder het kopje van de groep.
        vaardigheden: Array.from(profiel.querySelectorAll(".cv-category")).map(function (groep) {
            const items = Array.from(groep.nextElementSibling.children);
            const metLogos = groep.nextElementSibling.classList.contains("skill-icons");
            let logos = [];

            // Geopend als bestand (file://) blokkeert de browser het canvas; dan de namen als tags
            if (metLogos) {
                try {
                    logos = items.map(logoAlsPng);
                } catch (fout) {
                    logos = [];
                }
            }

            return {
                titel: tekstVan(groep),
                logos: logos,
                namen: items.map(tekstVan)
            };
        }),
        talen: Array.from(profiel.querySelectorAll(".cv-languages div")).map(function (taal) {
            return [tekstVan(taal.querySelector("dt")), tekstVan(taal.querySelector("dd"))];
        }),
        kenmerken: Array.from(profiel.querySelectorAll(".cv-traits li")).map(tekstVan)
    };
}

// De kleuren van het actieve thema, rechtstreeks uit de variabelen in style.css
function leesKleuren() {
    const stijl = getComputedStyle(document.documentElement);

    function kleur(naam) {
        return stijl.getPropertyValue(naam).trim();
    }

    return {
        pagina: kleur("--bg-card"),
        vlak: kleur("--bg-primary"),
        tekst: kleur("--text-color"),
        gedempt: kleur("--text-muted"),
        accent: kleur("--accent"),
        rand: kleur("--border-color"),
        randSterk: kleur("--border-strong")
    };
}

function maakCvPdf() {
    if (!window.jspdf) {
        alert(t("pdf.fout"));
        return;
    }

    const pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4" });
    const cv = leesCv();
    const kleuren = leesKleuren();

    // Kolombreedte: dezelfde als op de site. Alleen als de werkervaring duidelijk (10 mm) korter is
    // (bijvoorbeeld met tags in plaats van logo's), de rechterkolom millimeter per millimeter
    // breder maken en de breedte houden waarbij het cv het kortst is: daar eindigen beide
    // kolommen het meest gelijk. tekenCv bewaart in cv.werkRuimte hoeveel korter links is.
    // De werkervaring blijft wel minstens 54% van de breedte, zodat de verhouding klopt.
    cv.linkerKolom = LINKER_KOLOM;
    let kortste = tekenCv(pdf, cv, kleuren, 1, false, 0);
    const smalste = cv.werkRuimte > 10 ? INHOUD_BREEDTE * 0.54 : LINKER_KOLOM;

    for (let breedte = LINKER_KOLOM - 1; breedte >= smalste; breedte -= 1) {
        const linkerKolom = cv.linkerKolom;

        cv.linkerKolom = breedte;
        const hoogteNu = tekenCv(pdf, cv, kleuren, 1, false, 0);

        if (hoogteNu < kortste - 0.5) {
            kortste = hoogteNu;
        } else {
            cv.linkerKolom = linkerKolom;
        }
    }

    // Eerst meten: past het niet op één pagina, dan alles een beetje kleiner maken
    let schaal = 1;
    let hoogte = tekenCv(pdf, cv, kleuren, schaal, false, 0);

    while (hoogte > PAGINA_HOOGTE - MARGE * 2 && schaal > 0.7) {
        schaal -= 0.02;
        hoogte = tekenCv(pdf, cv, kleuren, schaal, false, 0);
    }

    // Dan tekenen, verticaal in het midden van de pagina
    tekenCv(pdf, cv, kleuren, schaal, true, (PAGINA_HOOGTE - hoogte) / 2);

    // Bestandsnaam in de actieve taal: "Resume Wesley Bogaerts.pdf" of "Cv Wesley Bogaerts.pdf"
    pdf.setProperties({ title: t("pdf.bestand") + " " + cv.naam, author: cv.naam });
    pdf.save(t("pdf.bestand") + " " + cv.naam + ".pdf");
}

// Tekent het hele cv vanaf hoogte boven en geeft de totale hoogte terug.
// Met teken = false wordt er alleen gemeten; zo weten we vooraf hoe hoog alles wordt.
function tekenCv(pdf, cv, k, s, teken, boven) {
    // Hulpfuncties: lettertype instellen mag altijd (nodig om te meten), tekenen alleen als teken = true
    function letter(familie, stijl, grootte, kleur) {
        pdf.setFont(familie, stijl);
        pdf.setFontSize(grootte * s);
        pdf.setTextColor(kleur);
    }

    function schrijf(tekst, x, y, opties) {
        if (teken) {
            pdf.text(tekst, x, y, Object.assign({ baseline: "top" }, opties));
        }
    }

    function lijn(x1, y1, x2, y2, kleur, dikte) {
        if (teken) {
            pdf.setDrawColor(kleur);
            pdf.setLineWidth(dikte);
            pdf.line(x1, y1, x2, y2);
        }
    }

    function vlak(x, y, breedte, hoogte, straal, vulling, rand) {
        if (teken) {
            pdf.setFillColor(vulling);
            pdf.setDrawColor(rand);
            pdf.setLineWidth(0.25);
            pdf.roundedRect(x, y, breedte, hoogte, straal, straal, "FD");
        }
    }

    function bolletje(x, y, straal, vulling, rand) {
        if (teken) {
            pdf.setFillColor(vulling);
            pdf.setDrawColor(rand);
            pdf.setLineWidth(0.45 * s);
            pdf.circle(x, y, straal, "FD");
        }
    }

    // Titel van een vlak: koperen blokje, titel en een dunne lijn eronder
    function paneelTitel(titel, x, y, breedte) {
        const binnen = 4.5 * s;

        if (teken) {
            pdf.setFillColor(k.accent);
            pdf.roundedRect(x + binnen, y + 1.2 * s, 2.4 * s, 2.4 * s, 0.4, 0.4, "F");
        }

        letter("helvetica", "bold", 10.5, k.tekst);
        schrijf(titel, x + binnen + 4.5 * s, y);
        y += regelHoogte(10.5 * s) + 2.5 * s;
        lijn(x + binnen, y, x + breedte - binnen, y, k.rand, 0.25);

        return y + 3.5 * s;
    }

    // Vlak met een tijdlijn: werkervaring of opleidingen. Geeft de hoogte terug.
    // Met extra komt er voor elke taak en tussen elke twee items evenveel ruimte bij
    // (zie onderaan tekenCv), zodat die ruimte gelijk over de hele kolom verdeeld is.
    function tijdlijn(titel, items, x, y, breedte, extra = 0) {
        const begin = y;
        const binnen = 4.5 * s;
        const bolX = x + binnen + 1.3 * s;
        const tekstX = x + binnen + 6 * s;
        const tekstBreedte = breedte - binnen * 2 - 6 * s;
        const bolletjes = [];

        y = paneelTitel(titel, x, y + 4 * s, breedte);

        items.forEach(function (item, index) {
            bolletjes.push({ y: y + tekstMidden(6.5 * s), lopend: item.lopend });

            letter("courier", "bold", 6.5, k.accent);
            schrijf(item.datum, tekstX, y);
            y += regelHoogte(6.5 * s) + 0.6 * s;

            // Functie in het vet; een noot zoals "(tijdelijk project)" er gewoon achter, als dat past
            letter("helvetica", "bold", 9, k.tekst);
            const titelRegels = pdf.splitTextToSize(item.titel, tekstBreedte);
            schrijf(titelRegels, tekstX, y);

            if (item.noot) {
                const laatste = titelRegels[titelRegels.length - 1];
                const naTitel = pdf.getTextWidth(laatste + " ");

                letter("helvetica", "normal", 9, k.gedempt);
                if (naTitel + pdf.getTextWidth(item.noot) <= tekstBreedte) {
                    schrijf(item.noot, tekstX + naTitel, y + (titelRegels.length - 1) * regelHoogte(9 * s));
                } else {
                    titelRegels.push(item.noot);
                    schrijf(item.noot, tekstX, y + (titelRegels.length - 1) * regelHoogte(9 * s));
                }
            }

            y += titelRegels.length * regelHoogte(9 * s);

            letter("helvetica", "normal", 7.5, k.tekst);
            const plaatsRegels = pdf.splitTextToSize(item.plaats, tekstBreedte);
            schrijf(plaatsRegels, tekstX, y);
            y += plaatsRegels.length * regelHoogte(7.5 * s);

            // Taken als lijstje met kleine bolletjes
            if (item.taken.length > 0) {
                y += 1.2 * s;
                letter("helvetica", "normal", 7.5, k.gedempt);

                item.taken.forEach(function (taak) {
                    const regels = pdf.splitTextToSize(taak, tekstBreedte - 3.5 * s);

                    y += extra;

                    if (teken) {
                        pdf.setDrawColor(k.randSterk);
                        pdf.setLineWidth(0.25);
                        pdf.circle(tekstX + 1 * s, y + tekstMidden(7.5 * s), 0.5 * s, "S");
                    }

                    schrijf(regels, tekstX + 3.5 * s, y);
                    y += regels.length * regelHoogte(7.5 * s) + 0.4 * s;
                });
            }

            if (index < items.length - 1) {
                y += 3.2 * s + extra;
            }
        });

        // Lijn tussen de bolletjes, daarna de bolletjes erbovenop (lopend = gevuld)
        bolletjes.forEach(function (bol, index) {
            if (index < bolletjes.length - 1) {
                lijn(bolX, bol.y, bolX, bolletjes[index + 1].y, k.randSterk, 0.25);
            }
        });

        bolletjes.forEach(function (bol) {
            bolletje(bolX, bol.y, 1.1 * s, bol.lopend ? k.accent : k.vlak, k.accent);
        });

        return y + 4 * s - begin;
    }

    // Vlak met het profiel. De extra ruimte (om samen met de werkervaring te eindigen)
    // wordt in kleine stukjes over het hele profiel verdeeld.
    function profiel(x, y, breedte, extra) {
        const begin = y;
        const binnen = 4.5 * s;
        const links = x + binnen;
        const rechts = x + breedte - binnen;
        // De extra ruimte gaat in kleine stukjes naar elke plek tussen de groepen en onderdelen
        // en onder elke taal, zodat niets zichtbaar uitgerekt wordt
        const stukje = extra / (cv.vaardigheden.length - 1 + 2 + cv.talen.length);
        const tussen = 3.5 * s + stukje;

        function kopje(tekst) {
            letter("courier", "bold", 6.5, k.gedempt);
            schrijf(tekst, links, y);
            y += regelHoogte(6.5 * s) + 2 * s;
        }

        y = paneelTitel(cv.profielTitel, x, y + 4 * s, breedte);

        // IT-vaardigheden per groep: een vet kopje en daaronder de logo's (of de namen als tags),
        // die naar de volgende regel gaan als ze niet meer passen
        kopje(cv.kopjes[0]);

        const tagHoogte = regelHoogte(5.5 * s) + 1 * s;
        // Zo klein dat de dertien frontendlogo's op één rij passen
        const logoMaat = 4 * s;

        cv.vaardigheden.forEach(function (groep, index) {
            if (index > 0) {
                y += 3.5 * s + stukje;
            }

            letter("helvetica", "bold", 7, k.tekst);
            schrijf(groep.titel, links, y);
            y += regelHoogte(7 * s) + 1.2 * s;

            let logoX = links;

            groep.logos.forEach(function (logo) {
                if (logoX + logoMaat > rechts) {
                    logoX = links;
                    y += logoMaat + 1 * s;
                }

                if (teken) {
                    // "FAST" comprimeert het logo, anders wordt de pdf enkele megabytes groot
                    pdf.addImage(logo, "PNG", logoX, y, logoMaat, logoMaat, undefined, "FAST");
                }
                logoX += logoMaat + 1 * s;
            });

            if (groep.logos.length > 0) {
                y += logoMaat;
                return;
            }

            // Compacte tags, zodat ook de namen (zonder logo's) ongeveer even veel plaats innemen
            letter("courier", "normal", 5.5, k.gedempt);
            let tagX = links;

            groep.namen.forEach(function (tag) {
                const tagBreedte = pdf.getTextWidth(tag) + 2.5 * s;

                if (tagX + tagBreedte > rechts) {
                    tagX = links;
                    y += tagHoogte + 0.8 * s;
                }

                vlak(tagX, y, tagBreedte, tagHoogte, 0.6, k.vlak, k.rand);
                schrijf(tag, tagX + 1.25 * s, y + 0.5 * s);
                tagX += tagBreedte + 0.8 * s;
            });

            y += tagHoogte;
        });

        y += tussen;

        // Talen en kenmerken in 7 pt: zo groot tegenover de tags als op de site (ongeveer 1,3 keer).
        // Beide in dezelfde twee kolommen, met een koperen streepje ervoor. De eerste kolom is zo
        // breed als het langste kenmerk; past de tweede er dan niet meer naast, dan staat alles in één kolom.
        letter("helvetica", "normal", 7, k.gedempt);

        const streepje = 4.5 * s;

        function langsteVan(kolom) {
            return Math.max.apply(null, cv.kenmerken.filter(function (kenmerk, index) {
                return index % 2 === kolom;
            }).map(function (kenmerk) {
                return pdf.getTextWidth(kenmerk);
            }));
        }

        const kolomBreedte = Math.max((rechts - links) / 2, streepje + langsteVan(0) + 3 * s);
        const kolommen = kolomBreedte + streepje + langsteVan(1) <= rechts - links ? 2 : 1;
        const rij = regelHoogte(7 * s) + 1 * s;

        function streepjeVoor(sx, sy) {
            lijn(sx, sy + tekstMidden(7 * s), sx + 2 * s, sy + tekstMidden(7 * s), k.accent, 0.6 * s);
        }

        // Talen: de taal in de eerste kolom, het niveau in de tweede (onder de kenmerken),
        // allebei met een streepje ervoor. Is er maar één kolom, dan staat het niveau eronder.
        kopje(cv.kopjes[1]);
        letter("helvetica", "normal", 7, k.gedempt);

        cv.talen.forEach(function (taal) {
            streepjeVoor(links, y);
            schrijf(taal[0], links + streepje, y);

            if (kolommen === 1) {
                y += rij;
            }

            const nx = links + (kolommen - 1) * kolomBreedte;

            streepjeVoor(nx, y);
            schrijf(taal[1], nx + streepje, y);
            y += rij + stukje;
        });

        y += tussen;

        // Kenmerken in twee kolommen
        kopje(cv.kopjes[2]);
        letter("helvetica", "normal", 7, k.gedempt);

        cv.kenmerken.forEach(function (kenmerk, index) {
            const kx = links + (index % kolommen) * kolomBreedte;
            const ky = y + Math.floor(index / kolommen) * rij;

            streepjeVoor(kx, ky);
            schrijf(kenmerk, kx + streepje, ky);
        });

        y += Math.ceil(cv.kenmerken.length / kolommen) * rij;

        return y + 4 * s - begin;
    }

    let y = boven;

    // Achtergrond in de kaarttint van het thema, tot aan de rand van het papier
    if (teken) {
        pdf.setFillColor(k.pagina);
        pdf.rect(0, 0, PAGINA_BREEDTE, PAGINA_HOOGTE, "F");
    }

    // Kop: monogram, naam en opleiding links, contactgegevens rechts
    const monogram = 15 * s;
    const contactRegel = regelHoogte(7.5 * s) + 0.8 * s;
    const kopHoogte = Math.max(monogram, cv.contact.length * contactRegel);
    const naamHoogte = regelHoogte(22 * s) * 0.85 + 1 * s + regelHoogte(8.5 * s);

    vlak(MARGE, y + (kopHoogte - monogram) / 2, monogram, monogram, 2, k.pagina, k.randSterk);
    letter("courier", "bold", 13, k.tekst);
    schrijf("WB", MARGE + monogram / 2, y + kopHoogte / 2, { align: "center", baseline: "middle" });

    const naamX = MARGE + monogram + 4 * s;
    const naamY = y + (kopHoogte - naamHoogte) / 2;

    letter("helvetica", "bold", 22, k.tekst);
    schrijf(cv.naam, naamX, naamY);
    letter("courier", "bold", 8.5, k.accent);
    schrijf(cv.rol, naamX, naamY + regelHoogte(22 * s) * 0.85 + 1 * s);

    // Contact rechts uitgelijnd als blok: de langste regel eindigt op de rechtermarge
    letter("helvetica", "normal", 7.5, k.gedempt);

    const langste = Math.max.apply(null, cv.contact.map(function (regel) {
        return pdf.getTextWidth(regel);
    }));
    const contactX = PAGINA_BREEDTE - MARGE - langste;
    const contactY = y + (kopHoogte - cv.contact.length * contactRegel) / 2;

    cv.contact.forEach(function (regel, index) {
        const ry = contactY + index * contactRegel;

        bolletje(contactX - 2.5 * s, ry + tekstMidden(7.5 * s), 0.7 * s, k.accent, k.accent);
        schrijf(regel, contactX, ry);
    });

    y += kopHoogte + 4 * s;
    lijn(MARGE, y, PAGINA_BREEDTE - MARGE, y, k.accent, 0.6);
    y += 4 * s;

    // Korte voorstelling over de volle breedte
    letter("helvetica", "normal", 10, k.tekst);
    const intro = pdf.splitTextToSize(cv.intro, INHOUD_BREEDTE);
    schrijf(intro, MARGE, y);
    y += intro.length * regelHoogte(10 * s) + 4 * s;

    // Werkervaring links, opleidingen en profiel rechts; eerst meten, dan de vlakken en de inhoud
    const linksX = MARGE;
    const rechtsX = MARGE + cv.linkerKolom + KOLOM_RUIMTE;
    const rechtsBreedte = INHOUD_BREEDTE - cv.linkerKolom - KOLOM_RUIMTE;
    const nuTekenen = teken;

    teken = false;
    const werkHoogte = tijdlijn(cv.werkTitel, cv.werk, linksX, y, cv.linkerKolom);
    const opleidingHoogte = tijdlijn(cv.opleidingTitel, cv.opleidingen, rechtsX, y, rechtsBreedte);
    const profielHoogte = profiel(rechtsX, y, rechtsBreedte, 0);
    teken = nuTekenen;

    // Beide kolommen eindigen samen. Is de werkervaring korter, dan gaat de extra ruimte in
    // kleine stukjes naar elke taak en elke plek tussen de functies, zodat er geen grote
    // tussenruimtes of een leeg vlak onderaan ontstaan. Is de rechterkolom korter, dan rekt
    // het profiel mee.
    const kolomHoogte = Math.max(werkHoogte, opleidingHoogte + KOLOM_RUIMTE + profielHoogte);
    let aantalTaken = 0;

    cv.werk.forEach(function (functie) {
        aantalTaken += functie.taken.length;
    });
    const werkExtra = (kolomHoogte - werkHoogte) / (aantalTaken + cv.werk.length - 1);
    cv.werkRuimte = kolomHoogte - werkHoogte;
    const profielY = y + opleidingHoogte + KOLOM_RUIMTE;
    const profielExtra = kolomHoogte - (opleidingHoogte + KOLOM_RUIMTE + profielHoogte);

    vlak(linksX, y, cv.linkerKolom, kolomHoogte, 2, k.vlak, k.rand);
    tijdlijn(cv.werkTitel, cv.werk, linksX, y, cv.linkerKolom, werkExtra);

    vlak(rechtsX, y, rechtsBreedte, opleidingHoogte, 2, k.vlak, k.rand);
    tijdlijn(cv.opleidingTitel, cv.opleidingen, rechtsX, y, rechtsBreedte);

    vlak(rechtsX, profielY, rechtsBreedte, profielHoogte + profielExtra, 2, k.vlak, k.rand);
    profiel(rechtsX, profielY, rechtsBreedte, profielExtra);

    return y + kolomHoogte - boven;
}
