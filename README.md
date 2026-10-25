# Wesley Bogaerts — Developer Portfolio

My personal developer portfolio showcasing my education, skills and projects. Built with HTML, CSS, JavaScript, Bootstrap, Flexbox and Font Awesome icons.

The portfolio content describes my background, coursework and current skills.

**Live:** [wesley-dev-tech.github.io/Portfolio](https://wesley-dev-tech.github.io/Portfolio/)

## Design

An editorial look in two themes, dark and light. Visitors switch with the switch in the header; the dark theme is the default.

### Dark theme

Warm near-black backgrounds, off-white text and one copper accent. Depth comes from small steps between four dark shades (page, alternating sections, cards and footer) rather than from glow effects or gradients. Every text color meets WCAG AA contrast.

[View the dark color palette on Coolors](https://coolors.co/161513-1f1d1a-ece7dd-a39d91-d4895f):

| Role | HEX |
| --- | --- |
| Background | `#161513` |
| Alternating sections | `#1F1D1A` |
| Text | `#ECE7DD` |
| Muted text | `#A39D91` |
| Accent | `#D4895F` |

### Light theme

The light theme uses warm off-white "paper" tones, near-black text and a deeper copper so the accent stays readable on light backgrounds; every text color meets WCAG AA here too. The choice is saved in `localStorage`; without a saved choice the site always starts in the dark theme.

[View the light color palette on Coolors](https://coolors.co/f7f4ee-efe9df-1f1d1a-5c574e-9c4b26):

| Role | HEX |
| --- | --- |
| Background | `#F7F4EE` |
| Alternating sections | `#EFE9DF` |
| Text | `#1F1D1A` |
| Muted text | `#5C574E` |
| Accent | `#9C4B26` |

All colors, radii and spacing live as CSS variables at the top of `style.css`. Type is set in Schibsted Grotesk, with IBM Plex Mono for small technical details such as section numbers, labels and the scrolling text bar.

The CSS and JavaScript URLs in `index.html` share one version query string (`?v=86`). Raise both numbers together after a change so browsers load the new files.

## How to View

Open `index.html` in a browser. An internet connection is required to load Bootstrap, Font Awesome and the font.

## Skills

HTML, CSS, database normalization, MySQL, Agile & Scrum, and JavaScript (currently learning). Coursework includes sprint planning, planning poker, and a Kanban board in Trello.

## Features

- An intro with a round profile photo next to the greeting on desktop (up to 420px). On phones the intro is centered with the photo on top; the photo grows with the screen (70% of the width, between 220px and 300px, so 273px on an iPhone 15). On tablets (260px) it sits next to the text. There is a dark and a light version of the photo, matching the theme: CSS shows the right one, and the hidden one is lazy-loaded so it only downloads after switching themes. The original PNGs stay untouched; `srcset` serves the 420px or 840px webp version, so a phone loads about 90 to 100 KB instead of 2.3 MB and retina screens stay sharp.
- The about and education sections use the same card, with the same header (icon, label, title and subtitle; shared `.card-header` classes), over the full column next to the section title. Inside both cards, one shared flexbox layout (`.article-layout`, `.article-poster` and `.article-text`) places the content like an article: a large poster with a caption next to the card header and all text, including the expanded "Lees meer" part. Each poster has a dark and a light version. In "Over mij" the "Wesley Dev & Tech" poster is on the left. In "Mijn opleiding" the "Full Stack" poster is on the right (`.article-layout-reverse`; the poster comes after the text in the HTML). On desktop each poster is top-aligned with the section title, and "Lees meer" lines up with the bottom of the poster. In "Over mij" the collapsed text column sets the height: flexbox stretches the poster to that height from the first paint, the image starts at height 0 so only the text counts, and `object-fit: cover` crops the right side of the poster where needed. When that text is expanded, the poster keeps the collapsed height that `script.js` stores in `--tekst-hoogte`. In "Mijn opleiding" it works the other way around: the full, uncropped poster sets the height, the text column stretches along, and the collapsed text fills the free space with "Lees meer" at the bottom. That poster takes 50% of the card instead of 46%, so it is still tall enough next to the narrow text column between 1200 and 1399px. Both sections open with a larger first paragraph (`.lead-text`). Because that card collapses without a transition, `script.js` brings the button back into view right after "Lees minder" instead of waiting for `transitionend`. Both posters are sticky, so they stay in view while reading the expanded text. Below 1200px (the same breakpoint as the hamburger menu), header, poster and text stack in that order in both cards: `.article-text` gets `display: contents` so the header and poster can move to the top with flexbox `order`. Stacked, the poster is exactly as wide as the text below it. The project screenshot in the detail dialog is likewise exactly as wide as the description below it.
- A "Mijn cv" section (03, between education and skills, "CV" in the navigation) with the content of my CV, in the same card as the about and education sections: the section title on the left, and in the card the shared header, a larger first paragraph and a "Lees meer" toggle. Behind "Lees meer" are three panels: work experience as a timeline with dates, roles, companies and tasks, education as a second timeline (the current course has a filled dot), and a profile with IT skills as tags, languages and personal traits. From 1400px the work experience is on the left and education and profile on the right, like the paper CV. The column ratio (8fr to 5fr) was measured so both columns are naturally almost the same height; the profile panel stretches the last few pixels so they start and end together, without stretched gaps. Collapsed, the start of both columns stays visible and fades out. Below 1400px the three panels stack, because the right column gets too narrow. Home address and year of birth are left out on purpose; the footer already has the contact details.
- Mobile navigation as a side panel that slides in from the right, with an active link that follows the current section.
- A scroll progress bar and a continuously scrolling text bar (marquee) below the intro, built with CSS only.
- "Lees meer" toggles that collapse the longer about and education texts. The first line of `script.js` adds a `js` class to `<html>` before the page is drawn, so the texts are collapsed and the JavaScript-only buttons are in place from the first paint: nothing jumps on load. Without JavaScript all text stays visible and those buttons are hidden.
- Skills and projects paginated per four on desktop and swipeable with CSS Scroll Snap on mobile, sharing one pagination function. An incomplete last page is centered.
- Cards in the same section are equally tall on every page, so icons, titles, dividers and links line up across cards. A small script measures the tallest card and repeats this after the font loads and on resize.
- Project cards as short, playful teasers with a large icon, title, teaser, technologies and "Bekijk details", all centered. Clicking a card opens a detail modal with the icon, title, a screenshot (for this portfolio in the active theme), description, technologies and links to the live demo and the code.
- A footer with a contact form (name, e-mail, message), phone, an embedded Google Maps map of my location with rounded corners (`.footer-map`; the iframe is absolutely positioned inside it so it always fills the card, it is not lazy-loaded and its column skips the scroll-reveal animation, because Safari and the Facebook in-app browser can leave an iframe blank in those cases; on phones the map has 40px space above and below; Google Maps has no dark embed, so in the dark theme a CSS `filter: invert() hue-rotate(180deg)` turns it dark while the pin stays red), (the address itself is not shown as text; the map opens it in Google Maps). From 992px the right column is as tall as the form column: the map grows to fill it, and the column is pushed down by the height of the "06" label (`--section-index-size × 1.65 + 10px`) plus the title's half-leading (both sizes are shared custom properties on `:root`, also used by `.section-index` and `.section-title`, so they cannot drift apart); all desktop rules for the footer live in one media query after its base rules, so the top of the map lines up with the "Neem contact op" title and the social links end level with the send button; on phones the map keeps a 4:3 ratio — the phone row has a line above and below it and 12px padding on both sides, so the icon and text sit centered between the dividing lines, social links (GitHub, LinkedIn, WhatsApp and Messenger) and a "Privacybeleid" button. The Messenger icon (`fa-facebook-messenger`) links to `https://m.me/wesley.bogaerts`, which opens a conversation with me directly in Messenger, just like the `wa.me` link does for WhatsApp. The form posts to [FormSubmit](https://formsubmit.co/) with `fetch`, so it also works in the in-app browsers of Facebook, Messenger and Instagram, where `mailto:` and `tel:` links often do nothing. A hidden honeypot field stops spam bots, a status line confirms the message was sent, and without JavaScript the form falls back to a normal POST. The empty status line takes no space (`:empty`), so the send button sits 40px above the contact details on phones and lines up with the social links on desktop; the copyright line follows at 40 to 56px. It opens a privacy policy in a dialog: no own cookies or tracking (only the embedded Google Maps map may set cookies), with a link that scrolls inside the dialog to the "Diensten van derden" part (`.privacy-jump`), the theme choice stored in `localStorage`, the third-party services that load files (GitHub Pages, Google Fonts, Google Maps, jsDelivr, cdnjs), what happens when you get in touch (including FormSubmit, WhatsApp and Messenger), and your GDPR rights.
- The project details and the privacy policy share one dialog setup (`.dialog` in `style.css`, `openVenster` in `script.js`). The class is deliberately not called `.modal`, because Bootstrap hides that class.
- Open Graph tags with a preview image (`images/og-image.jpg`) for sharing on LinkedIn, WhatsApp and other platforms.
- A light and a dark theme with a switch in the header (next to the menu button on phones and tablets). The moon and the sun are always visible side by side, and a copper thumb slides under the active theme, so visitors see there are two options; on hover the other icon lights up. It is a `role="switch"` button with `aria-checked`, and its position follows from `data-theme` in CSS. The dark theme is the default; the choice is remembered, and the browser bar color follows the theme.
- Animations respect the reduced-motion setting, and everything works with the keyboard.

## Projects

- Personal portfolio website.
- Polestar 6: my first course assignment, accessible through its project card.
- Halloween registration page: my second course project, built with Bootstrap Grid, Google Fonts and Font Awesome icons.
- Crossword puzzle: my third course project, a static layout built with Bootstrap Grid.
- Tailwind product page: my fourth course project, an AirPods product card styled with Tailwind CSS.
- Animated browser mockup featuring a CSS cursor and scrolling animation.
- Vloermeesters tile price calculator: a course project for a fictional tiling company, with JavaScript price calculations and printable PDF quotes.

Each project has its own GitHub repository. The detail modal of each project links to the live demo on GitHub Pages (`https://wesley-dev-tech.github.io/<repo>/`) and to the code on GitHub.

## Files

HTML, CSS and JavaScript are strictly separated: no inline scripts or styles, no HTML strings in JavaScript, and no style rules set from JavaScript. Where a value can only be measured in the browser, `script.js` passes just that number as a CSS variable (`--kaart-hoogte` for equal card heights, `--tekst-hoogte` for the poster, `--voortgang` for the scroll progress bar), and `style.css` decides what to do with it.

- `index.html`: the portfolio page.
- `style.css`: responsive styling, with the dark theme on `:root` and the light theme on `:root[data-theme="light"]`.
- `script.js`: loaded in the `<head>` so the saved theme (or the default dark theme) is applied before the page is drawn (no flash); everything else waits for `DOMContentLoaded`. Also handles the theme toggle, mobile navigation and active link, scroll progress bar, read-more toggles, scroll animations, shared pagination for skills and projects, project sorting, the project and privacy dialogs, and scroll-to-top interactions. The project cards are generated from the `projecten` list in this file. To add a project, put it at the bottom of that list with a short `teaser` for the card, a longer `beschrijving` for the modal, and a screenshot in `images/`. Add an optional `afbeeldingLicht` for a light-theme screenshot.
- `images/`: screenshots of each project for the detail modal, `portfolio-dark.webp` and `portfolio-light.webp` for this portfolio, the posters `poster-dark.png` and `poster-light.png` (about) and `poster-opleiding-dark.png` and `poster-opleiding-light.png` (education) with their webp versions `-400` and `-800`, the profile photos `wesley-bogaerts-dark.png` and `wesley-bogaerts-light.png` with their webp versions `-420` and `-840`, and the social preview image `og-image.jpg` (dark theme).
- `favicon.ico` and `apple-touch-icon.png`: the site icon (a "WB" monogram in the site colors) at 16, 32, 48 and 180 px.

The Tailwind product page is a visual demo with sample product information and no purchase or payment functionality. It loads Tailwind through a CDN script.

The crossword puzzle is a static layout exercise with no input fields or answer validation.

The Halloween registration page is a static frontend demo and does not send or store registrations.

The Vloermeesters price calculator is a static frontend demo for a fictional company with fictional rates; nothing is sent or stored.

The Polestar demo is an educational project, not an official website or a working pre-order system.

All projects except this portfolio are fictional course exercises; the cards and the modal say so.
