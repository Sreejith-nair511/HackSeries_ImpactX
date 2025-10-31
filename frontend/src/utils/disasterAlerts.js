/**
 * Disaster Alerts Utility
 * Provides functions for managing disaster alerts and notifications in India
 */

/**
 * Get active disaster alerts for a region
 * @param {string} region - The region to check for alerts
 * @returns {Array} Array of active disaster alerts
 */
export const getActiveAlerts = (region) => {
  // In a real implementation, this would fetch from an API
  // For now, we'll return mock data based on the region
  const alerts = [
    {
      id: 1,
      type: 'flood',
      title: 'Flood Warning',
      description: 'Heavy rainfall expected in the region. Avoid low-lying areas.',
      severity: 'moderate',
      issued: new Date().toISOString(),
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      region: 'Kerala',
      safetyTip: 'Stay informed about weather conditions in your area. Sign up for local weather alerts and have an emergency plan ready.'
    },
    {
      id: 2,
      type: 'cyclone',
      title: 'Cyclone Watch',
      description: 'Cyclonic conditions developing over the Arabian Sea.',
      severity: 'high',
      issued: new Date().toISOString(),
      expires: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      region: 'Gujarat',
      safetyTip: 'Secure outdoor furniture and decorations. Stay away from windows during high winds.'
    },
    {
      id: 3,
      type: 'heatwave',
      title: 'Heatwave Warning',
      description: 'Extreme heat conditions. Stay hydrated and avoid outdoor activities.',
      severity: 'moderate',
      issued: new Date().toISOString(),
      expires: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      region: 'Rajasthan',
      safetyTip: 'Wear lightweight, light-colored clothing. Avoid strenuous activities during peak sun hours.'
    }
  ];

  // Filter alerts by region if provided
  if (region) {
    return alerts.filter(alert => alert.region.toLowerCase() === region.toLowerCase());
  }
  
  return alerts;
};

/**
 * Get alert severity level
 * @param {string} severity - The severity string
 * @returns {number} Numeric severity level (1-3)
 */
export const getSeverityLevel = (severity) => {
  switch (severity.toLowerCase()) {
    case 'low':
      return 1;
    case 'moderate':
      return 2;
    case 'high':
    case 'severe':
      return 3;
    default:
      return 1;
  }
};

/**
 * Format alert for display
 * @param {Object} alert - The alert object
 * @returns {Object} Formatted alert object
 */
export const formatAlert = (alert) => {
  if (!alert) return null;
  
  return {
    ...alert,
    severityLevel: getSeverityLevel(alert.severity),
    issuedFormatted: new Date(alert.issued).toLocaleDateString(),
    expiresFormatted: new Date(alert.expires).toLocaleDateString(),
    timeRemaining: getTimeRemaining(alert.expires)
  };
};

/**
 * Get time remaining until alert expires
 * @param {string} expires - ISO date string of expiration time
 * @returns {string} Formatted time remaining
 */
export const getTimeRemaining = (expires) => {
  const now = new Date();
  const expiration = new Date(expires);
  const diffMs = expiration - now;
  
  if (diffMs <= 0) {
    return 'Expired';
  }
  
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffDays > 0) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
  } else {
    return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`;
  }
};

/**
 * Get alert color based on severity
 * @param {string} severity - The severity level
 * @returns {string} CSS color class
 */
export const getAlertColor = (severity) => {
  switch (severity.toLowerCase()) {
    case 'low':
      return 'bg-blue-100 text-blue-800';
    case 'moderate':
      return 'bg-yellow-100 text-yellow-800';
    case 'high':
    case 'severe':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * Subscribe to disaster alerts
 * @param {string} region - The region to subscribe to
 * @param {Function} callback - Function to call when alerts are updated
 * @returns {Function} Unsubscribe function
 */
export const subscribeToAlerts = (region, callback) => {
  // In a real implementation, this would set up a WebSocket connection or polling
  // For now, we'll simulate with periodic checks
  const interval = setInterval(() => {
    const alerts = getActiveAlerts(region);
    callback(alerts);
  }, 60000); // Check every minute
  
  // Return unsubscribe function
  return () => clearInterval(interval);
};

/**
 * Get historical disaster data for trend analysis
 * @param {string} region - The region to get data for
 * @param {number} months - Number of months of history to retrieve
 * @returns {Array} Historical disaster data
 */
export const getHistoricalDisasterData = (region, months = 12) => {
  // Mock historical data
  const disasters = [
    { type: 'flood', date: '2024-09-15', affected: 5000, region: 'Kerala' },
    { type: 'cyclone', date: '2024-08-22', affected: 12000, region: 'Odisha' },
    { type: 'heatwave', date: '2024-07-10', affected: 3000, region: 'Rajasthan' },
    { type: 'flood', date: '2024-06-05', affected: 8000, region: 'Assam' },
    { type: 'earthquake', date: '2024-05-18', affected: 2500, region: 'Gujarat' },
    { type: 'drought', date: '2024-04-30', affected: 15000, region: 'Maharashtra' },
    { type: 'flood', date: '2024-03-12', affected: 6500, region: 'Bihar' },
    { type: 'cyclone', date: '2024-02-28', affected: 9500, region: 'Tamil Nadu' },
    { type: 'landslide', date: '2024-01-20', affected: 1800, region: 'Uttarakhand' },
    { type: 'heatwave', date: '2023-12-15', affected: 4200, region: 'Telangana' }
  ];
  
  if (region) {
    return disasters.filter(disaster => disaster.region.toLowerCase() === region.toLowerCase());
  }
  
  return disasters;
};