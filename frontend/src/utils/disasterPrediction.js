/**
 * Disaster Prediction Utility
 * Provides functions for predicting disaster risks and analyzing historical data
 */

/**
 * Predict disaster risk for a specific region
 * @param {Object} region - The region to analyze
 * @returns {Array} Array of disaster risk predictions
 */
export const predictDisasterRisk = (region) => {
  // In a real implementation, this would use ML models and real-time data
  // For now, we'll return mock predictions based on the region
  
  const predictions = [];
  
  // Different regions have different disaster risks
  switch (region.id) {
    case 'kerala':
      predictions.push({
        type: 'flood',
        probability: 75,
        riskScore: 82,
        impact: 'High',
        timeline: 'Next 3-5 days',
        recommendations: [
          'Prepare emergency kits',
          'Identify evacuation routes',
          'Secure important documents'
        ]
      });
      predictions.push({
        type: 'landslide',
        probability: 45,
        riskScore: 65,
        impact: 'Moderate',
        timeline: 'Next 1-2 weeks',
        recommendations: [
          'Avoid hillside areas',
          'Stay alert for warning signs',
          'Prepare for possible evacuation'
        ]
      });
      break;
      
    case 'maharashtra':
      predictions.push({
        type: 'flood',
        probability: 60,
        riskScore: 70,
        impact: 'Moderate',
        timeline: 'Next 1-2 weeks',
        recommendations: [
          'Check drainage systems',
          'Prepare sandbags if needed',
          'Stay informed about weather updates'
        ]
      });
      break;
      
    case 'uttarakhand':
      predictions.push({
        type: 'earthquake',
        probability: 35,
        riskScore: 55,
        impact: 'High',
        timeline: 'Next 1-3 months',
        recommendations: [
          'Secure heavy furniture',
          'Prepare emergency supplies',
          'Know evacuation procedures'
        ]
      });
      predictions.push({
        type: 'landslide',
        probability: 55,
        riskScore: 72,
        impact: 'High',
        timeline: 'Next 2-4 weeks',
        recommendations: [
          'Avoid construction on slopes',
          'Monitor for crack patterns',
          'Prepare for possible evacuation'
        ]
      });
      break;
      
    case 'odisha':
      predictions.push({
        type: 'cyclone',
        probability: 80,
        riskScore: 88,
        impact: 'Very High',
        timeline: 'Next 5-10 days',
        recommendations: [
          'Reinforce roofs and windows',
          'Prepare emergency supplies',
          'Identify shelter locations'
        ]
      });
      break;
      
    case 'assam':
      predictions.push({
        type: 'flood',
        probability: 70,
        riskScore: 78,
        impact: 'High',
        timeline: 'Next 1-2 weeks',
        recommendations: [
          'Elevate important items',
          'Prepare for evacuation',
          'Stay informed about water levels'
        ]
      });
      break;
      
    case 'rajasthan':
      predictions.push({
        type: 'drought',
        probability: 65,
        riskScore: 72,
        impact: 'Moderate',
        timeline: 'Next 2-3 months',
        recommendations: [
          'Conserve water usage',
          'Implement water harvesting',
          'Plan for alternative water sources'
        ]
      });
      break;
      
    default:
      predictions.push({
        type: 'flood',
        probability: 30,
        riskScore: 40,
        impact: 'Low',
        timeline: 'Next 1-2 weeks',
        recommendations: [
          'Stay informed about weather',
          'Check local advisories'
        ]
      });
  }
  
  return predictions;
};

/**
 * Get historical disaster data
 * @returns {Array} Array of historical disaster records
 */
export const getHistoricalData = () => {
  // In a real implementation, this would fetch from a database
  // For now, we'll return mock data
  
  return [
    {
      year: 2023,
      type: 'flood',
      affected: 1500000,
      economicLoss: 2500000000,
      region: 'Kerala'
    },
    {
      year: 2022,
      type: 'cyclone',
      affected: 800000,
      economicLoss: 1800000000,
      region: 'Odisha'
    },
    {
      year: 2021,
      type: 'earthquake',
      affected: 500000,
      economicLoss: 1200000000,
      region: 'Uttarakhand'
    },
    {
      year: 2020,
      type: 'flood',
      affected: 2000000,
      economicLoss: 3000000000,
      region: 'Assam'
    },
    {
      year: 2019,
      type: 'drought',
      affected: 3000000,
      economicLoss: 2000000000,
      region: 'Rajasthan'
    },
    {
      year: 2018,
      type: 'cyclone',
      affected: 1200000,
      economicLoss: 2200000000,
      region: 'Odisha'
    }
  ];
};

/**
 * Get current weather data for a region
 * @param {Object} region - The region to get weather data for
 * @returns {Object} Weather data
 */
export const getWeatherData = (region) => {
  // In a real implementation, this would fetch from a weather API
  // For now, we'll return mock data based on the region
  
  const weatherData = {
    kerala: {
      temperature: 28,
      humidity: 85,
      precipitation: 120,
      windSpeed: 15,
      elevation: 50,
      forestCover: 35,
      riverProximity: 2,
      seismicActivity: 'Low'
    },
    maharashtra: {
      temperature: 32,
      humidity: 70,
      precipitation: 80,
      windSpeed: 12,
      elevation: 300,
      forestCover: 20,
      riverProximity: 5,
      seismicActivity: 'Moderate'
    },
    uttarakhand: {
      temperature: 22,
      humidity: 65,
      precipitation: 60,
      windSpeed: 10,
      elevation: 1500,
      forestCover: 50,
      riverProximity: 1,
      seismicActivity: 'High'
    },
    odisha: {
      temperature: 30,
      humidity: 75,
      precipitation: 150,
      windSpeed: 25,
      elevation: 25,
      forestCover: 30,
      riverProximity: 1,
      seismicActivity: 'Low'
    },
    assam: {
      temperature: 29,
      humidity: 80,
      precipitation: 180,
      windSpeed: 18,
      elevation: 75,
      forestCover: 40,
      riverProximity: 0.5,
      seismicActivity: 'Moderate'
    },
    rajasthan: {
      temperature: 38,
      humidity: 30,
      precipitation: 10,
      windSpeed: 20,
      elevation: 400,
      forestCover: 5,
      riverProximity: 15,
      seismicActivity: 'Low'
    }
  };
  
  return weatherData[region.id] || weatherData.kerala;
};

/**
 * Generate disaster alerts based on predictions and weather data
 * @param {Array} predictions - Disaster predictions
 * @param {Object} weatherData - Current weather data
 * @returns {Array} Array of alert objects
 */
export const generateDisasterAlerts = (predictions, weatherData) => {
  const alerts = [];
  
  // Check for high risk predictions
  predictions.forEach(prediction => {
    if (prediction.riskScore >= 80) {
      alerts.push({
        id: `risk-${Date.now()}-${prediction.type}`,
        type: 'danger',
        message: `High risk of ${prediction.type} detected (${prediction.riskScore}% probability)`,
        timestamp: new Date().toISOString()
      });
    } else if (prediction.riskScore >= 60) {
      alerts.push({
        id: `risk-${Date.now()}-${prediction.type}`,
        type: 'warning',
        message: `Moderate risk of ${prediction.type} detected (${prediction.riskScore}% probability)`,
        timestamp: new Date().toISOString()
      });
    }
  });
  
  // Check for extreme weather conditions
  if (weatherData) {
    if (weatherData.precipitation > 150) {
      alerts.push({
        id: `weather-${Date.now()}-precipitation`,
        type: 'warning',
        message: `Heavy rainfall expected (${weatherData.precipitation}mm)`,
        timestamp: new Date().toISOString()
      });
    }
    
    if (weatherData.windSpeed > 100) {
      alerts.push({
        id: `weather-${Date.now()}-wind`,
        type: 'danger',
        message: `High wind speeds detected (${weatherData.windSpeed} km/h)`,
        timestamp: new Date().toISOString()
      });
    }
  }
  
  return alerts;
};

/**
 * Get risk level based on risk score
 * @param {number} riskScore - The risk score (0-100)
 * @returns {string} Risk level (low, moderate, high, critical)
 */
export const getRiskLevel = (riskScore) => {
  if (riskScore >= 80) return 'critical';
  if (riskScore >= 60) return 'high';
  if (riskScore >= 40) return 'moderate';
  return 'low';
};