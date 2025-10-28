import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import hiTranslation from './locales/hi/translation.json';
import taTranslation from './locales/ta/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  hi: {
    translation: hiTranslation
  },
  ta: {
    translation: taTranslation
  }
};

// Initialize i18n with the configured resources
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

// Export the configured i18n instance
export default i18n;