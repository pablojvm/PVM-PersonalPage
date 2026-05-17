# PVM Personal Page

Personal portfolio of **Pablo Villar** — Full Stack & Automation Developer.

Built with **React 19**, **Vite 6** and **Tailwind CSS v4**.

## ✨ Features

- Animated canvas background with floating particles.
- Marquee tech‑stack carousel.
- Project gallery + anonymised automation case studies.
- **Internationalisation (EN · ES · IT)** with a minimal top‑right selector
  and `localStorage` persistence.
- **Light / dark theme toggle** matching the site's glassmorphism style,
  honouring the OS preference on the first visit.

See [`CHANGES.md`](./CHANGES.md) for the full architecture of the i18n and
theme systems and instructions on how to add a new language.

## 🛠️ Scripts

```bash
npm install      # install dependencies
npm run dev      # start the Vite dev server on http://localhost:5173 (or 3000)
npm run build    # production build into dist/
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## 🌍 Adding a language

1. Add `src/i18n/<code>.json` mirroring `en.json`.
2. Register it in `src/i18n/index.js` (`translations` + `supportedLanguages`).

The selector will pick it up automatically.

---

Original template: [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react).
