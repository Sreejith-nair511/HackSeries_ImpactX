/**
 * Indian number formatting utility
 * Formats numbers according to the Indian numbering system (lakhs, crores)
 */

/**
 * Format number in Indian style (1,00,000 for 1 lakh)
 * @param {number} number - Number to format
 * @returns {string} Formatted number string
 */
export const formatIndianNumber = (number) => {
  if (isNaN(number)) return '0';
  
  // Convert to string and split by decimal point
  const [integerPart, decimalPart] = number.toString().split('.');
  
  // Handle negative numbers
  const isNegative = integerPart.startsWith('-');
  const absoluteInteger = isNegative ? integerPart.slice(1) : integerPart;
  
  // Format the integer part according to Indian system
  let formattedInteger = '';
  
  if (absoluteInteger.length <= 3) {
    // Less than 1000 - no commas needed
    formattedInteger = absoluteInteger;
  } else if (absoluteInteger.length <= 5) {
    // Thousands (1,000 to 99,999)
    const lastThree = absoluteInteger.slice(-3);
    const remaining = absoluteInteger.slice(0, -3);
    formattedInteger = `${remaining},${lastThree}`;
  } else {
    // Lakhs and above
    const lastThree = absoluteInteger.slice(-3);
    const beforeLastThree = absoluteInteger.slice(0, -3);
    
    // Add commas for every two digits from right to left
    let formattedBefore = '';
    for (let i = beforeLastThree.length; i > 0; i -= 2) {
      const start = Math.max(0, i - 2);
      const part = beforeLastThree.slice(start, i);
      formattedBefore = (formattedBefore ? `${part},${formattedBefore}` : part);
    }
    
    formattedInteger = `${formattedBefore},${lastThree}`;
  }
  
  // Add negative sign if needed
  if (isNegative) {
    formattedInteger = `-${formattedInteger}`;
  }
  
  // Add decimal part if it exists
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

/**
 * Format currency in Indian style with proper units
 * @param {number} amount - Amount to format
 * @param {string} locale - Locale for currency symbol (en-IN, hi-IN, etc.)
 * @param {boolean} useUnits - Whether to use lakh/crore units
 * @returns {string} Formatted currency string
 */
export const formatIndianCurrency = (amount, locale = 'en-IN', useUnits = true) => {
  if (isNaN(amount)) return '₹0';
  
  const absoluteAmount = Math.abs(amount);
  const isNegative = amount < 0;
  
  // Format with Indian numbering system
  if (!useUnits || absoluteAmount < 100000) {
    // Less than 1 lakh, show as is
    const formattedNumber = formatIndianNumber(absoluteAmount);
    return `${isNegative ? '-' : ''}₹${formattedNumber}`;
  } else if (absoluteAmount < 10000000) {
    // Lakhs (1 lakh to 99.99 lakh)
    const lakhs = absoluteAmount / 100000;
    const formattedLakhs = formatIndianNumber(Math.round(lakhs * 100) / 100);
    return `${isNegative ? '-' : ''}₹${formattedLakhs} ${getLocaleString('lakh', locale)}`;
  } else {
    // Crores (1 crore and above)
    const crores = absoluteAmount / 10000000;
    const formattedCrores = formatIndianNumber(Math.round(crores * 100) / 100);
    return `${isNegative ? '-' : ''}₹${formattedCrores} ${getLocaleString('crore', locale)}`;
  }
};

/**
 * Get locale-specific strings for Indian units
 * @param {string} unit - Unit name (lakh, crore)
 * @param {string} locale - Locale code
 * @returns {string} Localized unit string
 */
const getLocaleString = (unit, locale) => {
  const translations = {
    lakh: {
      'en-IN': 'Lakh',
      'en': 'Lakh',
      'hi-IN': 'लाख',
      'hi': 'लाख',
      'ta-IN': 'இலட்சம்',
      'ta': 'இலட்சம்',
      'te-IN': 'లక్ష',
      'te': 'లక్ష',
      'mr-IN': 'लाख',
      'mr': 'लाख',
      'bn-IN': 'লক্ষ',
      'bn': 'লক্ষ',
      'gu-IN': 'લાખ',
      'gu': 'લાખ'
    },
    crore: {
      'en-IN': 'Crore',
      'en': 'Crore',
      'hi-IN': 'करोड़',
      'hi': 'करोड़',
      'ta-IN': 'கோடி',
      'ta': 'கோடி',
      'te-IN': 'కోటి',
      'te': 'కోటి',
      'mr-IN': 'कोटी',
      'mr': 'कोटी',
      'bn-IN': 'কোটি',
      'bn': 'কোটি',
      'gu-IN': 'કરોડ',
      'gu': 'કરોડ'
    }
  };
  
  return translations[unit]?.[locale] || translations[unit]?.['en'] || unit;
};

/**
 * Parse Indian formatted number string back to number
 * @param {string} formattedNumber - Formatted number string
 * @returns {number} Parsed number
 */
export const parseIndianNumber = (formattedNumber) => {
  if (!formattedNumber) return 0;
  
  // Remove currency symbols and spaces
  const cleanNumber = formattedNumber
    .replace(/[₹$€£¥]/g, '')
    .replace(/\s/g, '')
    .replace(/,/g, '');
  
  // Parse the number
  const parsed = parseFloat(cleanNumber);
  return isNaN(parsed) ? 0 : parsed;
};

export default {
  formatIndianNumber,
  formatIndianCurrency,
  parseIndianNumber
};