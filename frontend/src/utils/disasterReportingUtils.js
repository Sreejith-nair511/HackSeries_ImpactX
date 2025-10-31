/**
 * Disaster Reporting Utilities
 * Provides functions for managing disaster reports and incident tracking in India
 */

/**
 * Validate disaster report data
 * @param {Object} reportData - The disaster report data to validate
 * @returns {Object} Validation result with isValid flag and errors array
 */
export const validateDisasterReport = (reportData) => {
  const errors = [];
  
  // Required fields validation
  if (!reportData.disasterType || reportData.disasterType.trim() === '') {
    errors.push('Disaster type is required');
  }
  
  if (!reportData.location || reportData.location.trim() === '') {
    errors.push('Location is required');
  }
  
  if (!reportData.description || reportData.description.trim() === '') {
    errors.push('Description is required');
  }
  
  // Optional fields validation
  if (reportData.latitude !== undefined) {
    if (isNaN(reportData.latitude) || reportData.latitude < -90 || reportData.latitude > 90) {
      errors.push('Invalid latitude value');
    }
  }
  
  if (reportData.longitude !== undefined) {
    if (isNaN(reportData.longitude) || reportData.longitude < -180 || reportData.longitude > 180) {
      errors.push('Invalid longitude value');
    }
  }
  
  // Severity validation (1-5 scale)
  if (reportData.severity !== undefined) {
    if (isNaN(reportData.severity) || reportData.severity < 1 || reportData.severity > 5) {
      errors.push('Severity must be between 1 and 5');
    }
  }
  
  // Affected people validation
  if (reportData.affectedPeople !== undefined) {
    if (isNaN(reportData.affectedPeople) || reportData.affectedPeople < 0) {
      errors.push('Affected people count cannot be negative');
    }
  }
  
  // Media validation (max 10 files)
  if (reportData.media && reportData.media.length > 10) {
    errors.push('Maximum 10 media files allowed');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Format disaster report for submission
 * @param {Object} reportData - The disaster report data to format
 * @returns {Object} Formatted report data ready for submission
 */
export const formatDisasterReport = (reportData) => {
  // Create a clean copy of the report data
  const formattedReport = {
    ...reportData,
    timestamp: reportData.timestamp || new Date().toISOString(),
    status: reportData.status || 'pending'
  };
  
  // Format location data
  if (reportData.latitude !== undefined && reportData.longitude !== undefined) {
    formattedReport.locationData = {
      type: 'Point',
      coordinates: [parseFloat(reportData.longitude), parseFloat(reportData.latitude)]
    };
  }
  
  // Format severity
  if (reportData.severity !== undefined) {
    formattedReport.severity = parseInt(reportData.severity);
  }
  
  // Format affected people count
  if (reportData.affectedPeople !== undefined) {
    formattedReport.affectedPeople = parseInt(reportData.affectedPeople);
  }
  
  // Format media files
  if (reportData.media && Array.isArray(reportData.media)) {
    formattedReport.media = reportData.media.map((file, index) => ({
      id: `${reportData.id || 'report'}-media-${index}`,
      name: file.name || `media-${index}`,
      type: file.type || 'unknown',
      size: file.size || 0,
      url: file.url || ''
    }));
  }
  
  return formattedReport;
};

/**
 * Calculate priority level for disaster report
 * @param {Object} reportData - The disaster report data
 * @returns {string} Priority level (low, medium, high, critical)
 */
export const calculateReportPriority = (reportData) => {
  let score = 0;
  
  // Severity scoring (1-5)
  if (reportData.severity) {
    score += reportData.severity * 10;
  }
  
  // Affected people scoring
  if (reportData.affectedPeople) {
    if (reportData.affectedPeople >= 10000) {
      score += 40;
    } else if (reportData.affectedPeople >= 1000) {
      score += 30;
    } else if (reportData.affectedPeople >= 100) {
      score += 20;
    } else if (reportData.affectedPeople > 0) {
      score += 10;
    }
  }
  
  // Disaster type scoring
  const criticalDisasters = ['earthquake', 'cyclone', 'flood'];
  const highDisasters = ['landslide', 'fire'];
  const mediumDisasters = ['drought'];
  
  if (reportData.disasterType) {
    if (criticalDisasters.includes(reportData.disasterType)) {
      score += 25;
    } else if (highDisasters.includes(reportData.disasterType)) {
      score += 15;
    } else if (mediumDisasters.includes(reportData.disasterType)) {
      score += 10;
    }
  }
  
  // Critical infrastructure affected
  if (reportData.affectedInfrastructure) {
    score += reportData.affectedInfrastructure.length * 5;
  }
  
  // Determine priority level based on score
  if (score >= 70) {
    return 'critical';
  } else if (score >= 50) {
    return 'high';
  } else if (score >= 30) {
    return 'medium';
  } else {
    return 'low';
  }
};

/**
 * Categorize disaster report by type and impact
 * @param {Object} reportData - The disaster report data
 * @returns {Object} Categorized report with type and impact classification
 */
export const categorizeDisasterReport = (reportData) => {
  const categories = {
    natural: ['flood', 'earthquake', 'cyclone', 'drought', 'landslide'],
    manMade: ['fire', 'chemical', 'industrial'],
    health: ['epidemic', 'pandemic'],
    other: ['other']
  };
  
  const impactLevels = {
    localized: { min: 0, max: 50 },
    regional: { min: 51, max: 500 },
    widespread: { min: 501, max: 5000 },
    catastrophic: { min: 5001, max: Infinity }
  };
  
  // Determine category
  let category = 'other';
  for (const [cat, types] of Object.entries(categories)) {
    if (types.includes(reportData.disasterType)) {
      category = cat;
      break;
    }
  }
  
  // Determine impact level
  let impactLevel = 'localized';
  const affected = reportData.affectedPeople || 0;
  
  for (const [level, range] of Object.entries(impactLevels)) {
    if (affected >= range.min && affected <= range.max) {
      impactLevel = level;
      break;
    }
  }
  
  return {
    category,
    impactLevel,
    disasterType: reportData.disasterType,
    affectedPeople: affected
  };
};

/**
 * Estimate required resources based on disaster report
 * @param {Object} reportData - The disaster report data
 * @returns {Object} Estimated resources needed
 */
export const estimateRequiredResources = (reportData) => {
  const resources = {
    personnel: 0,
    equipment: 0,
    supplies: 0,
    evacuation: 0
  };
  
  // Base calculations
  const affected = reportData.affectedPeople || 0;
  const severity = reportData.severity || 1;
  
  // Personnel estimate (1 personnel per 100 affected people, adjusted by severity)
  resources.personnel = Math.ceil((affected / 100) * (severity / 3));
  
  // Equipment estimate (1 unit per 500 affected people)
  resources.equipment = Math.ceil(affected / 500);
  
  // Supplies estimate (1 unit per 10 affected people)
  resources.supplies = Math.ceil(affected / 10);
  
  // Evacuation estimate (1 unit per 200 affected people)
  resources.evacuation = Math.ceil(affected / 200);
  
  // Adjust based on disaster type
  const multipliers = {
    flood: 1.5,
    earthquake: 2.0,
    cyclone: 1.8,
    drought: 1.2,
    landslide: 1.4,
    fire: 1.3,
    epidemic: 1.6,
    chemical: 1.7
  };
  
  const multiplier = multipliers[reportData.disasterType] || 1.0;
  
  resources.personnel = Math.ceil(resources.personnel * multiplier);
  resources.equipment = Math.ceil(resources.equipment * multiplier);
  resources.supplies = Math.ceil(resources.supplies * multiplier);
  resources.evacuation = Math.ceil(resources.evacuation * multiplier);
  
  return resources;
};