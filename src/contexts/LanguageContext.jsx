import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultLanguage, supportedLanguages, translations } from "../i18n";

const STORAGE_KEY = "pvm.language";

const LanguageContext = createContext(null);

const isSupported = (code) => supportedLanguages.some((l) => l.code === code);

const resolveInitialLanguage = () => {
  if (typeof window === "undefined") return defaultLanguage;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && isSupported(stored)) return stored;
  } catch {
    /* localStorage may be blocked (private mode, SSR) — fall back silently */
  }
  return defaultLanguage;
};

/**
 * Resolve a dotted key (e.g. "hero.greeting") against the active dictionary,
 * falling back to English and finally to the key itself so the UI never breaks.
 */
const resolveKey = (dict, key) => {
  return key
    .split(".")
    .reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), dict);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(resolveInitialLanguage);

  // Persist the selection and reflect it on <html lang="..."> for a11y / SEO.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* ignore storage errors */
    }
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", language);
    }
  }, [language]);

  const setLanguage = useCallback((code) => {
    if (!isSupported(code)) return;
    setLanguageState(code);
  }, []);

  const t = useCallback(
    (key) => {
      const active = translations[language] || translations[defaultLanguage];
      const value = resolveKey(active, key);
      if (value !== undefined) return value;
      // Fallback to English so the page never shows a raw key.
      const fallback = resolveKey(translations[defaultLanguage], key);
      return fallback !== undefined ? fallback : key;
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t, supportedLanguages }),
    [language, setLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
};
