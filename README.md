# Wesley Bogaerts — Developer Portfolio

My personal developer portfolio showcasing my education, skills and projects. Built with HTML, CSS, JavaScript, Bootstrap, Flexbox and Font Awesome icons.

The portfolio content describes my background, coursework and current skills.

**Live:** [wesley-dev-tech.github.io/Portfolio](https://wesley-dev-tech.github.io/Portfolio/)

[View the color palette on Coolors](https://coolors.co/0b1120-0f172a-182234-2dd4bf-a78bfa).

The CSS and JavaScript URLs in `index.html` share one version query string (`?v=18`). Raise both numbers together after a change so browsers load the new files.

## How to View

Open `index.html` in a browser. An internet connection is required to load Bootstrap, Font Awesome and the font.

## Skills

HTML, CSS, database normalization, MySQL, Agile & Scrum, and beginner JavaScript. Coursework includes sprint planning, planning poker, and a Kanban board in Trello.

## Features

- Mobile navigation as a side panel that slides in from the right, with an active link that follows the current section.
- A scroll progress bar and a continuously scrolling text bar (marquee) below the intro, built with CSS only.
- "Lees meer" toggles that collapse the longer about and education texts.
- Skills and projects paginated per four on desktop and swipeable with CSS Scroll Snap on mobile, sharing one pagination function.
- Project cards as short, playful teasers. Clicking a card opens a detail modal with a screenshot, description, technologies and links to the live demo and the code.
- A footer with one clear e-mail button, phone, location and social links.
- Open Graph tags with a preview image (`images/og-image.jpg`) for sharing on LinkedIn, WhatsApp and other platforms.
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

- `index.html`: the portfolio page.
- `style.css`: responsive styling.
- `script.js`: mobile navigation and active link, scroll progress bar, read-more toggles, scroll animations, shared pagination for skills and projects, project sorting and detail modal, and scroll-to-top interactions. The project cards are generated from the `projecten` list in this file. To add a project, put it at the bottom of that list with a short `teaser` for the card, a longer `beschrijving` for the modal, and a screenshot in `images/`.
- `images/`: screenshots of each project for the detail modal, plus the social preview image `og-image.jpg`.
- `favicon.ico`: the site icon.

The Tailwind product page is a visual demo with sample product information and no purchase or payment functionality. It loads Tailwind through a CDN script.

The crossword puzzle is a static layout exercise with no input fields or answer validation.

The Halloween registration page is a static frontend demo and does not send or store registrations.

The Vloermeesters price calculator is a static frontend demo for a fictional company with fictional rates; nothing is sent or stored.

The Polestar demo is an educational project, not an official website or a working pre-order system.

All projects except this portfolio are fictional course exercises; the cards and the modal say so.
