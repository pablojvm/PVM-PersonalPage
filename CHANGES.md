# Internationalisation (i18n) + Light/Dark theme

This change adds:

1. A minimalist **language selector** in the top‑right corner (English, Spanish, Italian).
2. A lightweight **i18n system** with one JSON dictionary per language.
3. Full translations of every visible string in the portfolio.
4. **`localStorage` persistence** for both language and theme.
5. A **light / dark theme toggle** sitting next to the language selector, styled
   to match the existing glassmorphism aesthetic.

No third‑party libraries were added — everything is implemented with React
Context and the existing Tailwind v4 setup.

---

## File map

```
src/
├── App.jsx                          (refactored to consume translations + theme)
├── main.jsx                         (wraps the app in ThemeProvider + LanguageProvider)
├── index.css                        (added `theme-light` / `theme-dark` custom variants)
├── components/
│   ├── TopBar.jsx                   (fixed top‑right cluster, z-50)
│   ├── LanguageSelector.jsx         (the "EN ›" pill + dropdown)
│   └── ThemeToggle.jsx              (sun/moon round button)
├── contexts/
│   ├── LanguageContext.jsx          (language state, `t(key)` helper, localStorage)
│   └── ThemeContext.jsx             (theme state, toggle, localStorage)
└── i18n/
    ├── index.js                     (registry + supported languages)
    ├── en.json                      (default, English)
    ├── es.json                      (Spanish)
    └── it.json                      (Italian)
```

## How the i18n system works

- A single dictionary per language is loaded synchronously (small footprint —
  3 × ~5 KB JSON files, no bundle splitting needed).
- The `useLanguage()` hook returns `{ language, setLanguage, t }`.
- `t("a.b.c")` walks a dotted path through the active dictionary. If the key
  is missing it falls back to English, and if it is missing there too it
  returns the key itself — so the UI never shows a raw key.
- The selection is persisted in `localStorage` under `pvm.language`. The
  provider also mirrors the active language to `<html lang="...">` for
  accessibility and SEO.

### Adding a new language

1. Drop a `xx.json` file in `src/i18n/` that mirrors the structure of
   `en.json`.
2. Register it in `src/i18n/index.js`:

   ```js
   import xx from "./xx.json";
   export const translations = { en, es, it, xx };
   export const supportedLanguages = [
     { code: "es", label: "ES" },
     { code: "it", label: "IT" },
     { code: "xx", label: "XX" },
     { code: "en", label: "EN" },
   ];
   ```
3. That's it — the dropdown picks it up automatically.

## How the theme system works

- `<html data-theme="light|dark">` is the single source of truth. The provider
  toggles this attribute on every change.
- Tailwind v4 lets us register custom variants in CSS. `src/index.css` defines:

  ```css
  @custom-variant theme-light (&:where([data-theme="light"], [data-theme="light"] *));
  @custom-variant theme-dark  (&:where([data-theme="dark"],  [data-theme="dark"]  *));
  ```

  This means any utility can be prefixed with `theme-light:` to react to the
  light theme — `bg-white/10 theme-light:bg-white` for example.
- The dark theme is the original brand experience (gradient `slate-800` →
  `indigo-900` with the animated canvas particles).
- The light theme keeps the same accent palette (purple/pink gradients,
  green/blue/yellow highlight spans) on top of a `slate-50` surface with white
  cards.
- The canvas animation uses softer indigo particles in light mode so the
  background stays subtle.
- The user's first visit honours `prefers-color-scheme`. After that the
  explicit choice (stored in `localStorage` under `pvm.theme`) wins.

## Visual placement

Both controls live inside a `fixed top-4 right-4 z-50` flex row so they sit
above the canvas without intercepting clicks elsewhere on the page. The
language selector matches the rest of the site visually (white/10 background,
subtle border, `backdrop-blur`, hover lift) and shows the current code
followed by a `›` chevron that rotates 90° when open.

## Quality gates

- `npm run lint` → clean.
- `npm run build` → succeeds (≈242 KB JS, ≈53 KB CSS).
- Verified manually in the browser: EN ↔ ES ↔ IT switch, theme toggle,
  localStorage persistence across hard reloads.
