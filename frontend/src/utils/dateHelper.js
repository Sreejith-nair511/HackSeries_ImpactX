/**
 * Date Helper Functions
 * 
 * This file contains utility functions for working with dates
 * in the ImpactX application.
 */

/**
 * Formats a date according to the specified locale
 * @param {Date} date - The date to format
 * @param {string} locale - The locale to use for formatting
 * @returns {string} - The formatted date string
 */
export function formatDate(date, locale = 'en-US') {
  if (!date) return '';
  
  try {
    // Create a new Date object if a string or number is passed
    const dateObj = new Date(date);
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    // Format the date according to the locale
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

/**
 * Formats a date and time according to the specified locale
 * @param {Date} date - The date to format
 * @param {string} locale - The locale to use for formatting
 * @returns {string} - The formatted date and time string
 */
export function formatDateTime(date, locale = 'en-US') {
  if (!date) return '';
  
  try {
    // Create a new Date object if a string or number is passed
    const dateObj = new Date(date);
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    // Format the date and time according to the locale
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(dateObj);
  } catch (error) {
    console.error('Error formatting date and time:', error);
    return '';
  }
}

/**
 * Gets the relative time string for a date
 * @param {Date} date - The date to format
 * @param {string} locale - The locale to use for formatting
 * @returns {string} - The relative time string
 */
export function getRelativeTime(date, locale = 'en-US') {
  if (!date) return '';
  
  try {
    // Create a new Date object if a string or number is passed
    const dateObj = new Date(date);
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    // Calculate the time difference
    const now = new Date();
    const diffMs = now - dateObj;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    // Return appropriate relative time string
    if (diffSeconds < 60) {
      return 'just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      // For older dates, use the formatDate function
      return formatDate(dateObj, locale);
    }
  } catch (error) {
    console.error('Error getting relative time:', error);
    return '';
  }
}

/**
 * Adds days to a date
 * @param {Date} date - The date to add days to
 * @param {number} days - The number of days to add
 * @returns {Date} - The new date
 */
export function addDays(date, days) {
  if (!date) return null;
  
  try {
    // Create a new Date object if a string or number is passed
    const dateObj = new Date(date);
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return null;
    }
    
    // Add the days
    dateObj.setDate(dateObj.getDate() + days);
    
    return dateObj;
  } catch (error) {
    console.error('Error adding days to date:', error);
    return null;
  }
}

/**
 * Gets the start of the day for a date
 * @param {Date} date - The date to get the start of day for
 * @returns {Date} - The start of the day
 */
export function startOfDay(date) {
  if (!date) return null;
  
  try {
    // Create a new Date object if a string or number is passed
    const dateObj = new Date(date);
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return null;
    }
    
    // Set to start of day
    dateObj.setHours(0, 0, 0, 0);
    
    return dateObj;
  } catch (error) {
    console.error('Error getting start of day:', error);
    return null;
  }
}

/**
 * Gets the end of the day for a date
 * @param {Date} date - The date to get the end of day for
 * @returns {Date} - The end of the day
 */
export function endOfDay(date) {
  if (!date) return null;
  
  try {
    // Create a new Date object if a string or number is passed
    const dateObj = new Date(date);
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return null;
    }
    
    // Set to end of day
    dateObj.setHours(23, 59, 59, 999);
    
    return dateObj;
  } catch (error) {
    console.error('Error getting end of day:', error);
    return null;
  }
}

export default {
  formatDate,
  formatDateTime,
  getRelativeTime,
  addDays,
  startOfDay,
  endOfDay
};