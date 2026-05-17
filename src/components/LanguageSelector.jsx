import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

/**
 * Minimal language selector.
 *
 * Renders a small pill that shows the active language code followed by ">".
 * Clicking it toggles a dropdown listing ES / IT / EN (in that order). The
 * selection is persisted via the LanguageContext (which uses localStorage).
 *
 * Visual language matches the rest of the site: glassmorphism panel
 * (white/10 + backdrop-blur), subtle border and the same purple/pink accents
 * used by the hero CTA. It adapts to the light/dark theme via Tailwind
 * `dark:` classes that are activated by the `data-theme` attribute set in
 * ThemeContext.
 */
const LanguageSelector = () => {
  const { language, setLanguage, supportedLanguages, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const activeLabel = (supportedLanguages.find((l) => l.code === language) || { label: language.toUpperCase() }).label;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("nav.language")}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium tracking-wide rounded-full
                   bg-white/10 backdrop-blur-md border border-white/20 text-white
                   hover:bg-white/20 hover:border-white/30 transition-all duration-200
                   theme-light:bg-black/5 theme-light:border-black/15 theme-light:text-slate-800
                   theme-light:hover:bg-black/10"
      >
        <span>{activeLabel}</span>
        <span
          className={`inline-block transition-transform duration-200 ${
            open ? "rotate-90" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          ›
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("nav.language")}
          className="absolute right-0 mt-2 min-w-[5.5rem] py-1 rounded-xl
                     bg-slate-900/90 backdrop-blur-md border border-white/20 shadow-xl
                     theme-light:bg-white/95 theme-light:border-black/10
                     overflow-hidden z-50"
        >
          {supportedLanguages.map((lang) => {
            const selected = lang.code === language;
            return (
              <li key={lang.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-1.5 text-sm transition-colors duration-150
                              ${
                                selected
                                  ? "text-purple-300 theme-light:text-purple-700 font-semibold"
                                  : "text-white/90 theme-light:text-slate-700 hover:bg-white/10 theme-light:hover:bg-black/5"
                              }`}
                >
                  {lang.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
