/**
 * Disaster Risk Calculator Utility
 * Calculates risk scores for different types of disasters based on various factors
 */

/**
 * Calculate flood risk score based on multiple factors
 * @param {Object} factors - Factors affecting flood risk
 * @param {number} factors.rainfall - Rainfall intensity (0-10 scale)
 * @param {number} factors.topography - Topography factor (0-10 scale)
 * @param {number} factors.drainage - Drainage system quality (0-10 scale)
 * @param {number} factors.riverProximity - Proximity to rivers (0-10 scale)
 * @param {number} factors.historicalFloods - Historical flood frequency (0-10 scale)
 * @returns {number} Flood risk score (0-100)
 */
export const calculateFloodRisk = (factors) => {
  const {
    rainfall = 5,
    topography = 5,
    drainage = 5,
    riverProximity = 5,
    historicalFloods = 5
  } = factors;

  // Weighted calculation
  const riskScore = (
    (rainfall * 0.3) +
    (topography * 0.25) +
    (drainage * 0.2) +
    (riverProximity * 0.15) +
    (historicalFloods * 0.1)
  ) * 10;

  return Math.min(100, Math.max(0, Math.round(riskScore)));
};

/**
 * Calculate earthquake risk score based on geological factors
 * @param {Object} factors - Factors affecting earthquake risk
 * @param {number} factors.seismicZone - Seismic zone classification (0-10 scale)
 * @param {number} factors.soilType - Soil type stability (0-10 scale)
 * @param {number} factors.buildingCodes - Building code compliance (0-10 scale)
 * @param {number} factors.historicalQuakes - Historical earthquake frequency (0-10 scale)
 * @returns {number} Earthquake risk score (0-100)
 */
export const calculateEarthquakeRisk = (factors) => {
  const {
    seismicZone = 5,
    soilType = 5,
    buildingCodes = 5,
    historicalQuakes = 5
  } = factors;

  // Weighted calculation
  const riskScore = (
    (seismicZone * 0.4) +
    (soilType * 0.25) +
    (buildingCodes * 0.2) +
    (historicalQuakes * 0.15)
  ) * 10;

  return Math.min(100, Math.max(0, Math.round(riskScore)));
};

/**
 * Calculate cyclone risk score based on meteorological factors
 * @param {Object} factors - Factors affecting cyclone risk
 * @param {number} factors.seaSurfaceTemp - Sea surface temperature (0-10 scale)
 * @param {number} factors.windPatterns - Wind pattern stability (0-10 scale)
 * @param {number} factors.coastalLocation - Coastal proximity (0-10 scale)
 * @param {number} factors.historicalCyclones - Historical cyclone frequency (0-10 scale)
 * @returns {number} Cyclone risk score (0-100)
 */
export const calculateCycloneRisk = (factors) => {
  const {
    seaSurfaceTemp = 5,
    windPatterns = 5,
    coastalLocation = 5,
    historicalCyclones = 5
  } = factors;

  // Weighted calculation
  const riskScore = (
    (seaSurfaceTemp * 0.35) +
    (windPatterns * 0.3) +
    (coastalLocation * 0.2) +
    (historicalCyclones * 0.15)
  ) * 10;

  return Math.min(100, Math.max(0, Math.round(riskScore)));
};

/**
 * Calculate drought risk score based on climatic factors
 * @param {Object} factors - Factors affecting drought risk
 * @param {number} factors.precipitation - Precipitation levels (0-10 scale)
 * @param {number} factors.temperature - Temperature trends (0-10 scale)
 * @param {number} factors.soilMoisture - Soil moisture content (0-10 scale)
 * @param {number} factors.waterResources - Water resource availability (0-10 scale)
 * @returns {number} Drought risk score (0-100)
 */
export const calculateDroughtRisk = (factors) => {
  const {
    precipitation = 5,
    temperature = 5,
    soilMoisture = 5,
    waterResources = 5
  } = factors;

  // Weighted calculation
  const riskScore = (
    ((10 - precipitation) * 0.3) + // Lower precipitation increases risk
    (temperature * 0.3) +
    ((10 - soilMoisture) * 0.25) + // Lower moisture increases risk
    ((10 - waterResources) * 0.15) // Lower water resources increases risk
  ) * 10;

  return Math.min(100, Math.max(0, Math.round(riskScore)));
};

/**
 * Calculate landslide risk score based on geological and environmental factors
 * @param {Object} factors - Factors affecting landslide risk
 * @param {number} factors.slopeStability - Slope stability (0-10 scale)
 * @param {number} factors.vegetation - Vegetation coverage (0-10 scale)
 * @param {number} factors.rainfallIntensity - Rainfall intensity (0-10 scale)
 * @param {number} factors.seismicActivity - Seismic activity level (0-10 scale)
 * @returns {number} Landslide risk score (0-100)
 */
export const calculateLandslideRisk = (factors) => {
  const {
    slopeStability = 5,
    vegetation = 5,
    rainfallIntensity = 5,
    seismicActivity = 5
  } = factors;

  // Weighted calculation
  const riskScore = (
    ((10 - slopeStability) * 0.35) + // Lower stability increases risk
    ((10 - vegetation) * 0.25) + // Lower vegetation increases risk
    (rainfallIntensity * 0.25) +
    (seismicActivity * 0.15)
  ) * 10;

  return Math.min(100, Math.max(0, Math.round(riskScore)));
};

/**
 * Calculate overall disaster risk index for a region
 * @param {Object} risks - Individual disaster risks
 * @param {number} risks.flood - Flood risk score
 * @param {number} risks.earthquake - Earthquake risk score
 * @param {number} risks.cyclone - Cyclone risk score
 * @param {number} risks.drought - Drought risk score
 * @param {number} risks.landslide - Landslide risk score
 * @returns {Object} Overall risk assessment with index and risk level
 */
export const calculateOverallRiskIndex = (risks) => {
  const {
    flood = 0,
    earthquake = 0,
    cyclone = 0,
    drought = 0,
    landslide = 0
  } = risks;

  // Calculate weighted average
  const riskIndex = (
    (flood * 0.3) +
    (earthquake * 0.25) +
    (cyclone * 0.2) +
    (drought * 0.15) +
    (landslide * 0.1)
  );

  // Determine risk level
  let riskLevel = 'low';
  let riskLabel = 'Low';
  
  if (riskIndex >= 70) {
    riskLevel = 'critical';
    riskLabel = 'Critical';
  } else if (riskIndex >= 50) {
    riskLevel = 'high';
    riskLabel = 'High';
  } else if (riskIndex >= 30) {
    riskLevel = 'moderate';
    riskLabel = 'Moderate';
  }

  return {
    index: Math.round(riskIndex),
    level: riskLevel,
    label: riskLabel
  };
};

/**
 * Get risk level color for visualization
 * @param {string} level - Risk level (low, moderate, high, critical)
 * @returns {string} Color code for the risk level
 */
export const getRiskLevelColor = (level) => {
  switch (level) {
    case 'critical': return '#dc2626'; // red-600
    case 'high': return '#ea580c'; // orange-600
    case 'moderate': return '#ca8a04'; // yellow-600
    case 'low': return '#16a34a'; // green-600
    default: return '#64748b'; // slate-500
  }
};

/**
 * Get risk level description
 * @param {string} level - Risk level (low, moderate, high, critical)
 * @param {string} language - Language code for localization
 * @returns {string} Description of the risk level
 */
export const getRiskLevelDescription = (level, language = 'en') => {
  const descriptions = {
    en: {
      low: 'Low risk - Minimal threat to life and property',
      moderate: 'Moderate risk - Some threat to life and property',
      high: 'High risk - Significant threat to life and property',
      critical: 'Critical risk - Severe threat to life and property'
    },
    hi: {
      low: 'कम जोखिम - जान और संपत्ति के लिए न्यूनतम खतरा',
      moderate: 'मामूली जोखिम - जान और संपत्ति के लिए कुछ खतरा',
      high: 'उच्च जोखिम - जान और संपत्ति के लिए महत्वपूर्ण खतरा',
      critical: 'गंभीर जोखिम - जान और संपत्ति के लिए गंभीर खतरा'
    },
    ta: {
      low: 'குறைந்த ஆபத்து - வாழ்வு மற்றும் சொத்துக்கு குறைந்த தாக்கம்',
      moderate: 'மிதமான ஆபத்து - வாழ்வு மற்றும் சொத்துக்கு சில தாக்கம்',
      high: 'அதிக ஆபத்து - வாழ்வு மற்றும் சொத்துக்கு கணிசமான தாக்கம்',
      critical: 'மிகவும் ஆபத்தான - வாழ்வு மற்றும் சொத்துக்கு கடுமையான தாக்கம்'
    }
  };

  return descriptions[language]?.[level] || descriptions.en[level];
};

export default {
  calculateFloodRisk,
  calculateEarthquakeRisk,
  calculateCycloneRisk,
  calculateDroughtRisk,
  calculateLandslideRisk,
  calculateOverallRiskIndex,
  getRiskLevelColor,
  getRiskLevelDescription
};