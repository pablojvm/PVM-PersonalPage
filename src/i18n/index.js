import en from "./en.json";
import es from "./es.json";
import it from "./it.json";

/**
 * Registry of all available translation bundles.
 * Each key is the ISO 639-1 language code used in the UI selector.
 */
export const translations = { en, es, it };

/**
 * Ordered list of supported languages, used to render the selector dropdown.
 */
export const supportedLanguages = [
  { code: "es", label: "ES" },
  { code: "it", label: "IT" },
  { code: "en", label: "EN" },
];

export const defaultLanguage = "en";
