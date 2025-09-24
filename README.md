# Discovery Piscine – Web Track

## Overview
This repository collects my work from the Fun With Coding discovery piscine (20–25 Sep 2025). Each "cell" directory contains daily HTML/CSS/JavaScript exercises, while the `rush` folder holds the end-of-week duo project: a small portfolio hub for Te and Finn. Everything is built with vanilla tooling so it is easy to open, inspect, and iterate on without extra setup.

## Repository Layout
```
.
├── cell00 … first steps with HTML structure and content
├── cell01 … introductory CSS styling drills
├── cell02 … layout, positioning, and component practice
├── cell03 … interactive widgets with JavaScript
├── rush   … joint portfolio project (landing page + two sub-sites)
└── README.md
```
Each exercise directory (`ex00`, `ex01`, …) is self-contained. Open the main HTML file in a browser to inspect the solution, and tweak assets in place.

## Getting Started
1. Clone or download the repository.
2. Pick any exercise folder and open the included HTML file directly in your browser, or run a quick static server:
   - `python3 -m http.server`
   - `npx serve`
3. Edit with your preferred IDE; the project was created with simple filesystem access in mind (no build step required).

## Rush Portfolio Highlights
- Tailwind CDN for rapid styling and responsive layouts.
- Scroll-spy navigation powered by a small jQuery helper (`rush/js/script.js`).
- Accessible tweaks such as descriptive alt text, consistent language metadata, and secure external links.

## Tips & Resources
- When stuck, revisit the piscine PDFs and Discord discussions rather than copying code—solving problems independently is part of the challenge.
- The original intra link for the opening shell warm-up is archived here for convenience: https://projects.intra.42.fr/projects/cellule0-0-shell

## Contributing & Feedback
This repo reflects personal learning progress, but suggestions are welcome. Open an issue or reach out on the piscine Discord if you notice bugs, accessibility problems, or have improvement ideas.
