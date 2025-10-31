/**
 * Translation Helper Functions
 * 
 * This file contains utility functions for working with translations
 * in the ImpactX application.
 */

/**
 * Flattens a nested object into a single level object with dot notation keys
 * @param {Object} obj - The object to flatten
 * @param {string} prefix - The prefix to use for keys
 * @returns {Object} - The flattened object
 */
export function flattenObject(obj, prefix = '') {
  const flattened = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const prefixedKey = prefix ? `${prefix}.${key}` : key;
      
      if (
        typeof obj[key] === 'object' && 
        obj[key] !== null && 
        !Array.isArray(obj[key])
      ) {
        Object.assign(flattened, flattenObject(obj[key], prefixedKey));
      } else {
        flattened[prefixedKey] = obj[key];
      }
    }
  }
  
  return flattened;
}

/**
 * Gets all keys from a translation object
 * @param {Object} translationObj - The translation object
 * @returns {Array} - Array of all keys
 */
export function getTranslationKeys(translationObj) {
  const flattened = flattenObject(translationObj);
  return Object.keys(flattened);
}

/**
 * Finds missing keys in a translation object compared to a reference
 * @param {Object} reference - The reference translation object
 * @param {Object} translation - The translation object to check
 * @returns {Array} - Array of missing keys
 */
export function findMissingKeys(reference, translation) {
  const referenceKeys = new Set(getTranslationKeys(reference));
  const translationKeys = new Set(getTranslationKeys(translation));
  
  return [...referenceKeys].filter(key => !translationKeys.has(key));
}

/**
 * Finds extra keys in a translation object compared to a reference
 * @param {Object} reference - The reference translation object
 * @param {Object} translation - The translation object to check
 * @returns {Array} - Array of extra keys
 */
export function findExtraKeys(reference, translation) {
  const referenceKeys = new Set(getTranslationKeys(reference));
  const translationKeys = new Set(getTranslationKeys(translation));
  
  return [...translationKeys].filter(key => !referenceKeys.has(key));
}

/**
 * Validates a translation object against a reference
 * @param {Object} reference - The reference translation object
 * @param {Object} translation - The translation object to validate
 * @returns {Object} - Validation results
 */
export function validateTranslation(reference, translation) {
  const missingKeys = findMissingKeys(reference, translation);
  const extraKeys = findExtraKeys(reference, translation);
  
  return {
    isValid: missingKeys.length === 0 && extraKeys.length === 0,
    missingKeys,
    extraKeys
  };
}

export default {
  flattenObject,
  getTranslationKeys,
  findMissingKeys,
  findExtraKeys,
  validateTranslation
};