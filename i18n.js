// 🔹 IMPORT ALL LANGUAGES
import en from "./locales/en.json";
import az from "./locales/az.json";
import ru from "./locales/ru.json";
import de from "./locales/de.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";
import it from "./locales/it.json";
import pt from "./locales/pt.json";
import nl from "./locales/nl.json";
import pl from "./locales/pl.json";
import tr from "./locales/tr.json";
import ar from "./locales/ar.json";
import hi from "./locales/hi.json";
import zh from "./locales/zh.json";
import ja from "./locales/ja.json";
import ko from "./locales/ko.json";

// 🔹 TRANSLATIONS MAP
const translations = {
  en,
  az,
  ru,
  de,
  fr,
  es,
  it,
  pt,
  nl,
  pl,
  tr,
  ar,
  hi,
  zh,
  ja,
  ko,
};

// 🔹 CURRENT LANGUAGE (localStorage)
let currentLanguage = localStorage.getItem("lang") || "en";

// 🔹 TRANSLATE FUNCTION
export const t = (key) => {
  return translations[currentLanguage]?.[key] || key;
};

// 🔹 CHANGE LANGUAGE
export const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLanguage = lang;
    localStorage.setItem("lang", lang);
  }
};
