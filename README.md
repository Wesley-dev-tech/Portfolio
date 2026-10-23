# Wesley Bogaerts — Developer Portfolio

My personal developer portfolio showcasing my education, skills and projects. Built with HTML, CSS, JavaScript, Bootstrap, Flexbox and Font Awesome icons.

The portfolio content describes my background, coursework and current skills.

**Live:** [wesley-dev-tech.github.io/Portfolio](https://wesley-dev-tech.github.io/Portfolio/)

## Design

An editorial look in two themes, dark and light. Visitors switch with the button in the header.

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

The light theme uses warm off-white "paper" tones, near-black text and a deeper copper so the accent stays readable on light backgrounds; every text color meets WCAG AA here too. The choice is saved in `localStorage`; without a saved choice the site follows the device setting.

[View the light color palette on Coolors](https://coolors.co/f7f4ee-efe9df-1f1d1a-5c574e-9c4b26):

| Role | HEX |
| --- | --- |
| Background | `#F7F4EE` |
| Alternating sections | `#EFE9DF` |
| Text | `#1F1D1A` |
| Muted text | `#5C574E` |
| Accent | `#9C4B26` |

All colors, radii and spacing live as CSS variables at the top of `style.css`. Type is set in Schibsted Grotesk, with IBM Plex Mono for small technical details such as section numbers, labels and the scrolling text bar.

The CSS and JavaScript URLs in `index.html` share one version query string (`?v=62`). Raise both numbers together after a change so browsers load the new files.

## How to View

Open `index.html` in a browser. An internet connection is required to load Bootstrap, Font Awesome and the font.

## Skills

HTML, CSS, database normalization, MySQL, Agile & Scrum, and JavaScript (currently learning). Coursework includes sprint planning, planning poker, and a Kanban board in Trello.

## Features

- An intro with a round profile photo next to the greeting on desktop. On phones and tablets the intro is centered, with the photo on top. The original `wesley-bogaerts.png` stays untouched; `srcset` serves the 360px or 720px webp version so phones load about 25 KB instead of 2.5 MB, while retina screens stay sharp.
- Mobile navigation as a side panel that slides in from the right, with an active link that follows the current section.
- A scroll progress bar and a continuously scrolling text bar (marquee) below the intro, built with CSS only.
- "Lees meer" toggles that collapse the longer about and education texts.
- Skills and projects paginated per four on desktop and swipeable with CSS Scroll Snap on mobile, sharing one pagination function. An incomplete last page is centered.
- Cards in the same section are equally tall on every page, so icons, titles, dividers and links line up across cards. A small script measures the tallest card and repeats this after the font loads and on resize.
- Project cards as short, playful teasers with a large icon, title, teaser, technologies and "Bekijk details", all centered. Clicking a card opens a detail modal with the icon, title, a screenshot, description, technologies and links to the live demo and the code.
- A footer with one clear e-mail button, phone, location, social links and a short privacy note (no cookies, no personal data collected).
- Open Graph tags with a preview image (`images/og-image.jpg`) for sharing on LinkedIn, WhatsApp and other platforms.
- A light and a dark theme with a toggle button in the header (next to the menu button on phones and tablets). The choice is remembered, and the browser bar color follows the theme.
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

HTML, CSS and JavaScript are strictly separated: no inline scripts or styles.

- `index.html`: the portfolio page.
- `style.css`: responsive styling, with the dark theme on `:root` and the light theme on `:root[data-theme="light"]`.
- `script.js`: loaded in the `<head>` so the saved or device theme is applied before the page is drawn (no flash); everything else waits for `DOMContentLoaded`. Also handles the theme toggle, mobile navigation and active link, scroll progress bar, read-more toggles, scroll animations, shared pagination for skills and projects, project sorting and detail modal, and scroll-to-top interactions. The project cards are generated from the `projecten` list in this file. To add a project, put it at the bottom of that list with a short `teaser` for the card, a longer `beschrijving` for the modal, and a screenshot in `images/`.
- `images/`: screenshots of each project for the detail modal, the profile photo `wesley-bogaerts.png` with its webp versions `-360` and `-720`, and the social preview image `og-image.jpg`.
- `favicon.ico` and `apple-touch-icon.png`: the site icon (a "WB" monogram in the site colors) at 16, 32, 48 and 180 px.

The Tailwind product page is a visual demo with sample product information and no purchase or payment functionality. It loads Tailwind through a CDN script.

The crossword puzzle is a static layout exercise with no input fields or answer validation.

The Halloween registration page is a static frontend demo and does not send or store registrations.

The Vloermeesters price calculator is a static frontend demo for a fictional company with fictional rates; nothing is sent or stored.

The Polestar demo is an educational project, not an official website or a working pre-order system.

All projects except this portfolio are fictional course exercises; the cards and the modal say so.
