/**
 * Date formatting utility for different locales
 */

// Date format options for different locales
const localeDateOptions = {
  en: {
    dateStyle: 'long',
    timeStyle: 'short'
  },
  hi: {
    dateStyle: 'long',
    timeStyle: 'short'
  },
  ta: {
    dateStyle: 'long',
    timeStyle: 'short'
  },
  te: {
    dateStyle: 'long',
    timeStyle: 'short'
  },
  mr: {
    dateStyle: 'long',
    timeStyle: 'short'
  },
  bn: {
    dateStyle: 'long',
    timeStyle: 'short'
  },
  gu: {
    dateStyle: 'long',
    timeStyle: 'short'
  }
};

/**
 * Format date according to locale
 * @param {Date} date - Date to format
 * @param {string} locale - Locale code (en, hi, ta, etc.)
 * @returns {string} Formatted date string
 */
export const formatLocaleDate = (date, locale = 'en') => {
  try {
    // Ensure we have a valid Date object
    const validDate = new Date(date);
    if (isNaN(validDate.getTime())) {
      throw new Error('Invalid date');
    }
    
    // Get formatting options for the locale
    const options = localeDateOptions[locale] || localeDateOptions.en;
    
    // Format the date
    return new Intl.DateTimeFormat(locale, options).format(validDate);
  } catch (error) {
    console.warn('Error formatting date:', error);
    // Fallback to simple date string
    return date.toString();
  }
};

/**
 * Format currency according to locale
 * @param {number} amount - Amount to format
 * @param {string} locale - Locale code (en, hi, ta, etc.)
 * @param {string} currency - Currency code (INR, USD, etc.)
 * @returns {string} Formatted currency string
 */
export const formatLocaleCurrency = (amount, locale = 'en', currency = 'INR') => {
  try {
    // Format currency according to locale
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  } catch (error) {
    console.warn('Error formatting currency:', error);
    // Fallback to simple formatting
    return `${currency} ${amount.toLocaleString(locale)}`;
  }
};

/**
 * Format number according to locale
 * @param {number} number - Number to format
 * @param {string} locale - Locale code (en, hi, ta, etc.)
 * @returns {string} Formatted number string
 */
export const formatLocaleNumber = (number, locale = 'en') => {
  try {
    return new Intl.NumberFormat(locale).format(number);
  } catch (error) {
    console.warn('Error formatting number:', error);
    // Fallback to simple formatting
    return number.toLocaleString(locale);
  }
};

/**
 * Get locale-specific number formatting info
 * @param {string} locale - Locale code (en, hi, ta, etc.)
 * @returns {Object} Number formatting information
 */
export const getNumberFormatInfo = (locale = 'en') => {
  try {
    const formatter = new Intl.NumberFormat(locale);
    const parts = formatter.formatToParts(1234.5);
    
    // Find decimal and thousands separators
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
    const thousandsSeparator = parts.find(part => part.type === 'group')?.value || ',';
    
    return {
      decimalSeparator,
      thousandsSeparator
    };
  } catch (error) {
    console.warn('Error getting number format info:', error);
    return {
      decimalSeparator: '.',
      thousandsSeparator: ','
    };
  }
};

export default {
  formatLocaleDate,
  formatLocaleCurrency,
  formatLocaleNumber,
  getNumberFormatInfo
};