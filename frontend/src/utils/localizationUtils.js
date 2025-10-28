/**
 * Localization utilities for the ImpactX application
 * Combines date, currency, and number formatting with locale-specific features
 */

import { formatLocaleDate, formatLocaleCurrency, formatLocaleNumber } from './dateFormatter';
import { formatIndianCurrency, formatIndianNumber } from './indianNumberFormatter';

/**
 * Format currency based on locale with Indian-specific formatting
 * @param {number} amount - Amount to format
 * @param {string} locale - Locale code
 * @param {string} currency - Currency code
 * @param {boolean} useIndianFormat - Whether to use Indian numbering system
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, locale = 'en', currency = 'INR', useIndianFormat = true) => {
  if (useIndianFormat && currency === 'INR') {
    // Use Indian formatting for INR
    return formatIndianCurrency(amount, locale);
  } else {
    // Use standard international formatting
    return formatLocaleCurrency(amount, locale, currency);
  }
};

/**
 * Format number based on locale with Indian-specific formatting
 * @param {number} number - Number to format
 * @param {string} locale - Locale code
 * @param {boolean} useIndianFormat - Whether to use Indian numbering system
 * @returns {string} Formatted number string
 */
export const formatNumber = (number, locale = 'en', useIndianFormat = true) => {
  if (useIndianFormat) {
    // Use Indian formatting
    return formatIndianNumber(number);
  } else {
    // Use standard international formatting
    return formatLocaleNumber(number, locale);
  }
};

/**
 * Format date based on locale
 * @param {Date} date - Date to format
 * @param {string} locale - Locale code
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = 'en') => {
  return formatLocaleDate(date, locale);
};

/**
 * Get locale-specific messages
 * @param {string} key - Message key
 * @param {string} locale - Locale code
 * @param {Object} params - Parameters to replace in message
 * @returns {string} Localized message
 */
export const getLocalizedMessage = (key, locale = 'en', params = {}) => {
  // This would typically fetch from a translation file
  // For now, we'll return a placeholder
  return `{{${key}}}`;
};

/**
 * Get locale-specific number formatting preferences
 * @param {string} locale - Locale code
 * @returns {Object} Formatting preferences
 */
export const getLocalePreferences = (locale = 'en') => {
  const preferences = {
    en: {
      useIndianNumbering: true,
      dateFormat: 'dd/MM/yyyy',
      currencySymbol: '₹',
      useCurrencyUnits: true
    },
    hi: {
      useIndianNumbering: true,
      dateFormat: 'dd/MM/yyyy',
      currencySymbol: '₹',
      useCurrencyUnits: true
    },
    ta: {
      useIndianNumbering: true,
      dateFormat: 'dd/MM/yyyy',
      currencySymbol: '₹',
      useCurrencyUnits: true
    },
    te: {
      useIndianNumbering: true,
      dateFormat: 'dd/MM/yyyy',
      currencySymbol: '₹',
      useCurrencyUnits: true
    },
    mr: {
      useIndianNumbering: true,
      dateFormat: 'dd/MM/yyyy',
      currencySymbol: '₹',
      useCurrencyUnits: true
    },
    bn: {
      useIndianNumbering: true,
      dateFormat: 'dd/MM/yyyy',
      currencySymbol: '₹',
      useCurrencyUnits: true
    },
    gu: {
      useIndianNumbering: true,
      dateFormat: 'dd/MM/yyyy',
      currencySymbol: '₹',
      useCurrencyUnits: true
    }
  };
  
  return preferences[locale] || preferences.en;
};

/**
 * Format percentage
 * @param {number} value - Percentage value (0-100)
 * @param {string} locale - Locale code
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, locale = 'en') => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value / 100);
  } catch (error) {
    console.warn('Error formatting percentage:', error);
    return `${value}%`;
  }
};

/**
 * Format large numbers with appropriate units
 * @param {number} number - Number to format
 * @param {string} locale - Locale code
 * @returns {string} Formatted number with units
 */
export const formatLargeNumber = (number, locale = 'en') => {
  const absNumber = Math.abs(number);
  
  if (absNumber >= 10000000) {
    // Crores
    const crores = number / 10000000;
    return `${formatNumber(crores, locale, true)} ${getUnitTranslation('crore', locale)}`;
  } else if (absNumber >= 100000) {
    // Lakhs
    const lakhs = number / 100000;
    return `${formatNumber(lakhs, locale, true)} ${getUnitTranslation('lakh', locale)}`;
  } else if (absNumber >= 1000) {
    // Thousands
    const thousands = number / 1000;
    return `${formatNumber(thousands, locale, true)} ${getUnitTranslation('thousand', locale)}`;
  } else {
    // Less than 1000
    return formatNumber(number, locale, true);
  }
};

/**
 * Get localized unit translations
 * @param {string} unit - Unit name
 * @param {string} locale - Locale code
 * @returns {string} Localized unit
 */
const getUnitTranslation = (unit, locale) => {
  const translations = {
    crore: {
      en: 'Cr',
      hi: 'करोड़',
      ta: 'கோடி',
      te: 'కోటి',
      mr: 'कोटी',
      bn: 'কোটি',
      gu: 'કરોડ'
    },
    lakh: {
      en: 'L',
      hi: 'लाख',
      ta: 'இலட்சம்',
      te: 'లక్ష',
      mr: 'लाख',
      bn: 'লক্ষ',
      gu: 'લાખ'
    },
    thousand: {
      en: 'K',
      hi: 'हजार',
      ta: 'ஆயிரம்',
      te: 'వేల',
      mr: 'हजार',
      bn: 'হাজার',
      gu: 'હજાર'
    }
  };
  
  return translations[unit]?.[locale] || translations[unit]?.en || unit;
};

export default {
  formatCurrency,
  formatNumber,
  formatDate,
  getLocalizedMessage,
  getLocalePreferences,
  formatPercentage,
  formatLargeNumber
};