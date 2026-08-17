# NetStudy — Network Study App

An offline-first study companion for network engineering, built from the actual textbooks and course material of a Swedish network-engineering education. Every flashcard, quiz question, lab and CLI command in the app is extracted from the course books — no generic decks that don't match the syllabus.

**Live app:** https://MEnglund92.github.io/netstudy

---

## Overview

NetStudy is a zero-dependency, vanilla-JavaScript single-page application that runs entirely in the browser and works offline. It ships as a progressive web app (PWA): install it to your home screen, open it without a connection, and keep your progress synced through your browser's local storage.

The content is organized around the courses of the program and includes a CCNA-aligned active-recall card bank, CLI command practice, higher-order labs and timed exams.

## Content at a glance

| Metric | Count |
|---|---|
| Study assets (cards, exercises) | 11,667 |
| CLI commands | 5,320 |
| Topics | 158 |
| Concept pages | 84 |
| Study modes | 15 |

## Features

| Mode | Description |
|---|---|
| 🏠 Home | Welcome page with stats, feature overview and a suggested study flow |
| 🔍 Browse | Search and filter every glossary term across all courses, 50 cards per page |
| 🃏 Flashcards | Flip through Q&A definition cards, optional TTS audio |
| ❓ Quiz | Multiple-choice quiz with instant scoring |
| 🎯 Match | Drag terms to their translations against the clock |
| 📖 Study | SM-2 spaced-repetition session across all card types |
| 🔁 Weak Words | Review exactly the cards with a low ease factor |
| 💻 CLI Lab | Real CLI command practice: fill-in, study mode, step-by-step typing with progressive hints |
| 🧪 Labs | Higher-order exercises: subnetting, matching, scenario MCQ, error spot, predict output, decision trees |
| 📚 Concepts | Deep-dive pages with text, diagrams and key takeaways per topic |
| 📎 Resources | Open or download PDFs, audio and links behind the content |
| 📝 Exam | Timed glossary exam per course or mixed, pass mark 85% |
| 🧠 Recall Exam | Timed recall exam over the full active-recall card bank |
| 📊 Compare | Side-by-side comparisons of protocols and standards |
| 🔧 Diagnosis | Symptom → command → fix tables, plus practice with explanations |
| 📈 Dashboard | SM-2 mastery stats, streaks, XP, levels and weakest topics |

Gamification (XP, levels, streaks) keeps the repetition habit going; all progress is stored locally per card.

## Tech stack

- **Vanilla JavaScript (ES5/ES6+)** — no frameworks, no build step, no runtime dependencies
- **PWA** — web app manifest + service worker with cache-first static assets and network-first data
- **localStorage** — SM-2 scheduling data, exam results, XP and stats
- **Web Speech API** — browser TTS fallback for flashcard audio
- **GitHub Pages** — static hosting from the `gh-pages` branch

## Repository structure

```
├── index.html            App shell, all tab panels (single page)
├── manifest.json         PWA manifest (installable, standalone display)
├── sw.js                 Service worker: cache-first assets, network-first data
├── css/
│   ├── style.css         Main theme (dark/light, layout, components)
│   └── recall.css        Study/recall-specific styling
├── js/
│   ├── app.js            Core app: tabs, browse, flashcards, quiz, match, resources, exams
│   ├── study.js          SM-2 engine, weak words, CLI lab, diagnosis, recall exam
│   ├── labs.js           Higher-order labs and behavioral decks
│   ├── statsbar.js       Gamification stats bar and resource rendering
│   └── sw-register.js    Service-worker registration
├── data/
│   ├── ccna_glossary_data.js     Course glossary (courses → categories → entries)
│   ├── ccna_concepts.js          Concept pages (84 deep-dive topics)
│   ├── cli_command_help.js       CLI command dictionary (5,320 commands)
│   ├── resources.js              Resources metadata (PDFs, audio, docs, links)
│   ├── ccna_active_recall.json   Active-recall card bank (45,903 cards, generated, minified)
│   ├── ccna_practice_labs.json   Practice lab exercises (generated, minified)
│   ├── behavioral_*.json         Behavioral bias/deception/cue-scrubber decks
│   └── audio/index.json          Audio index for TTS fallback (generated)
├── fonts/                Self-hosted webfonts (Inter, Playfair Display)
└── icons/                App icons (SVG source + 180/192/512 PNG)
```

## Data model

- **Glossary** (`ccna_glossary_data.js`) exposes `window.appData.courses` — a list of courses, each with categories and entries (term, translation, definition, audio references).
- **Active recall** (`ccna_active_recall.json`) is a flat list of 45,903 prompt/answer cards fetched lazily by `study.js`.
- **SM-2 scheduling** is stored per card under `localStorage` keys (`ar_sm2_*`, legacy keys migrated automatically). Each review updates the ease factor, interval and a history log; intervals grow exponentially with the ease factor.
- Progress is kept **per card, not per course** — switching courses never resets what you know.

## Getting started

The app must be served over HTTP (it fetches data with `fetch()`), so opening `index.html` directly from the filesystem will not work in most browsers.

### Local development

```bash
# Python 3
python -m http.server 8000

# or Node
npx serve .
```

Then open http://localhost:8000.

### Deploying updates

1. Make changes and commit on the `gh-pages` branch (GitHub Pages serves this branch directly).
2. **Bump the cache version in `sw.js`** (`const CACHE = 'netstudy-vNN'`) so installed clients fetch the new assets instead of serving stale cached files.
3. Push: `git push origin gh-pages`.

## Notes

- **Resources tab**: the PDFs, audio files and documents listed in `data/resources.js` are local study material and are not part of this repository, so those links resolve only when the app is served from a machine that has the files (or hosted locally). External website links always work.
- **Large data files** (`ccna_active_recall.json`, `ccna_practice_labs.json`, `audio/index.json`) are generated by extraction scripts and intentionally kept minified to keep payload size down; the service worker serves them network-first with offline caching.
- **License**: private project — all rights reserved. No license file is published.

## Roadmap

- Package as a native iOS app with Capacitor (reusing this codebase unchanged) — see `APP-PLAN.md` in the parent folder for the detailed plan.
- Android packaging afterwards via the same Capacitor project.