/**
 * Weather Monitoring Utilities
 * Provides functions for fetching, processing, and analyzing weather data for disaster preparedness in India
 */

/**
 * Fetch weather data from API
 * @param {string} city - City name to fetch weather for
 * @returns {Promise<Object>} Weather data object
 */
export const fetchWeatherData = async (city) => {
  try {
    // In a real implementation, this would connect to a weather API
    // For now, we'll return mock data
    return {
      location: city,
      temperature: Math.floor(Math.random() * 40),
      humidity: Math.floor(Math.random() * 100),
      windSpeed: Math.floor(Math.random() * 50),
      pressure: 1000 + Math.floor(Math.random() * 50),
      visibility: Math.floor(Math.random() * 10),
      condition: ['Sunny', 'Cloudy', 'Rainy', 'Stormy'][Math.floor(Math.random() * 4)],
      forecast: [
        {
          day: 'Today',
          high: Math.floor(Math.random() * 40),
          low: Math.floor(Math.random() * 20),
          condition: ['Sunny', 'Cloudy', 'Rainy', 'Stormy'][Math.floor(Math.random() * 4)]
        },
        {
          day: 'Tomorrow',
          high: Math.floor(Math.random() * 40),
          low: Math.floor(Math.random() * 20),
          condition: ['Sunny', 'Cloudy', 'Rainy', 'Stormy'][Math.floor(Math.random() * 4)]
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

/**
 * Analyze weather conditions for disaster risk
 * @param {Object} weatherData - Weather data object
 * @returns {Object} Risk assessment
 */
export const analyzeWeatherRisk = (weatherData) => {
  if (!weatherData) return { riskLevel: 'unknown', alerts: [] };

  const alerts = [];
  let riskLevel = 'low';

  // Check for extreme temperatures
  if (weatherData.temperature > 40) {
    alerts.push('Extreme heat warning');
    riskLevel = riskLevel === 'low' ? 'moderate' : riskLevel;
  } else if (weatherData.temperature < 5) {
    alerts.push('Extreme cold warning');
    riskLevel = riskLevel === 'low' ? 'moderate' : riskLevel;
  }

  // Check for high wind speeds
  if (weatherData.windSpeed > 40) {
    alerts.push('High wind warning');
    riskLevel = riskLevel === 'high' ? riskLevel : 'high';
  }

  // Check for low visibility
  if (weatherData.visibility < 2) {
    alerts.push('Low visibility warning');
    riskLevel = riskLevel === 'high' ? riskLevel : 'high';
  }

  // Check for stormy conditions
  if (weatherData.condition === 'Stormy') {
    alerts.push('Severe weather alert');
    riskLevel = 'high';
  }

  return { riskLevel, alerts };
};

/**
 * Get weather-based preparedness recommendations
 * @param {Object} weatherData - Weather data object
 * @returns {Array} Recommendations array
 */
export const getPreparednessRecommendations = (weatherData) => {
  if (!weatherData) return [];

  const recommendations = [];

  // Temperature-based recommendations
  if (weatherData.temperature > 35) {
    recommendations.push('Stay hydrated and avoid prolonged sun exposure');
    recommendations.push('Wear light-colored, loose-fitting clothing');
  } else if (weatherData.temperature < 10) {
    recommendations.push('Dress warmly in layers');
    recommendations.push('Ensure heating systems are functioning properly');
  }

  // Wind-based recommendations
  if (weatherData.windSpeed > 30) {
    recommendations.push('Secure outdoor furniture and decorations');
    recommendations.push('Avoid using umbrellas in windy conditions');
  }

  // Visibility-based recommendations
  if (weatherData.visibility < 3) {
    recommendations.push('Use caution when driving, use headlights');
    recommendations.push('Postpone non-essential travel');
  }

  // Condition-based recommendations
  switch (weatherData.condition) {
    case 'Rainy':
      recommendations.push('Ensure drainage systems are clear');
      recommendations.push('Avoid walking through flooded areas');
      break;
    case 'Stormy':
      recommendations.push('Stay indoors away from windows');
      recommendations.push('Keep emergency kit accessible');
      break;
    default:
      recommendations.push('Monitor weather conditions regularly');
  }

  return recommendations;
};

/**
 * Format weather data for display
 * @param {Object} weatherData - Raw weather data
 * @returns {Object} Formatted weather data
 */
export const formatWeatherData = (weatherData) => {
  if (!weatherData) return null;

  return {
    ...weatherData,
    temperatureFormatted: `${weatherData.temperature}°C`,
    windSpeedFormatted: `${weatherData.windSpeed} km/h`,
    pressureFormatted: `${weatherData.pressure} hPa`,
    visibilityFormatted: `${weatherData.visibility} km`,
    humidityFormatted: `${weatherData.humidity}%`
  };
};