/**
 * Translation Configuration
 * 
 * This file contains configuration settings for translation management
 * in the ImpactX application.
 */

// Supported languages with their codes and names
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', localName: 'English' },
  { code: 'hi', name: 'Hindi', localName: 'हिंदी' },
  { code: 'ta', name: 'Tamil', localName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', localName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', localName: 'मराठी' },
  { code: 'bn', name: 'Bengali', localName: 'বাংলা' },
  { code: 'gu', name: 'Gujarati', localName: 'ગુજરાતી' }
];

// Default language
export const DEFAULT_LANGUAGE = 'en';

// Fallback language if translation is missing
export const FALLBACK_LANGUAGE = 'en';

// Path to locales directory
export const LOCALES_PATH = 'frontend/src/locales';

// Validation settings
export const VALIDATION_SETTINGS = {
  // Whether to check for missing keys
  checkMissingKeys: true,
  
  // Whether to check for extra keys
  checkExtraKeys: true,
  
  // Maximum number of missing keys to report
  maxMissingKeysToReport: 50,
  
  // Maximum number of extra keys to report
  maxExtraKeysToReport: 50
};

// Export all settings as a single object
export default {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  FALLBACK_LANGUAGE,
  LOCALES_PATH,
  VALIDATION_SETTINGS
};