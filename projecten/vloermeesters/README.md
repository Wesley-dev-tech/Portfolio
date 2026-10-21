# Vloermeesters — Tile Installation Price Calculator

A course project during my developer training: a website for a fictional tiling company, with a price calculator for private customers and a printable quote.

## The Assignment

Build an application for a floor tiler (someone who lays tiles in your home):

- Add a name.
- Add the room dimensions.
- Do the calculation.
- Show the price in an alert, for private customers.
- Use `Number()` to convert the input.
- Round prices to two decimal places.

The layout was free to choose, but had to use Bootstrap, Bootstrap Grid, Flexbox, Google Fonts, Font Awesome icons, responsive design and a colour palette from Coolors.co. No other frameworks were allowed.

## Technologies Used

- HTML for the page content and the price form.
- CSS for the house style, using a Coolors.co colour palette stored as CSS variables.
- JavaScript for reading the form, calculating the price and filling in the quote.
- Bootstrap 5.3.3 for the responsive grid, cards, tables and the collapsible navigation.
- Flexbox for aligning content inside the grid columns.
- Google Fonts: Montserrat for headings and Plus Jakarta Sans for body text.
- Font Awesome 6.5.2 for the icons.

## Features

- A responsive one-page website with a hero, services, price calculator and contact section.
- A price form with name, length, width, joint thickness and joint colour.
- Input validation with an alert when a field is missing or invalid.
- Price calculation: area × € 45/m² for installation, plus € 4 or € 6/m² for the joints, plus 21% VAT.
- An alert with the price excluding and including VAT, rounded to two decimals.
- A branded quote with the customer's name, date, project details and price breakdown.
- A "Download als PDF" button that prints only the quote on a single A4 page, so it can be saved as PDF.
- A mobile menu that closes automatically after choosing a section.

## What I Practised

Selecting elements with `getElementById`, handling click events, reading and converting form input, writing calculations with `if`/`else` validation, using template literals, rounding with `toFixed(2)`, updating the page with `textContent`, and writing print styles with `@media print`.

## How to View

Download the files and open `index.html` in a browser. No installation or build step is required. An internet connection is needed to load Bootstrap, Google Fonts and Font Awesome.

To save a quote as PDF: calculate a price, click **Download als PDF** and choose **Save as PDF** in the print dialog.

## Project Structure

- `index.html`: the page structure and the quote template.
- `style.css`: the house style, layout details and print styles.
- `app.js`: the price calculation, quote and mobile menu.
- `README.md`: project documentation.

## About This Version

Vloermeesters is a fictional company created for a school assignment, and the rates are fictional. The price is an indication only: tiles, extra materials and preparation work are not included. This is a static frontend demo; nothing is sent or stored.
