/**
 * Community Disaster Reporting Utility
 * Enables community members to report disaster-related incidents and share information
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
  
  // Location coordinates validation (if provided)
  if (reportData.latitude !== undefined && reportData.longitude !== undefined) {
    if (isNaN(reportData.latitude) || reportData.latitude < -90 || reportData.latitude > 90) {
      errors.push('Invalid latitude value');
    }
    
    if (isNaN(reportData.longitude) || reportData.longitude < -180 || reportData.longitude > 180) {
      errors.push('Invalid longitude value');
    }
  }
  
  // Severity validation
  if (reportData.severity !== undefined && (reportData.severity < 1 || reportData.severity > 5)) {
    errors.push('Severity must be between 1 and 5');
  }
  
  // Affected people validation
  if (reportData.affectedPeople !== undefined && reportData.affectedPeople < 0) {
    errors.push('Affected people count cannot be negative');
  }
  
  // Media validation (if provided)
  if (reportData.media && reportData.media.length > 5) {
    errors.push('Maximum 5 media files allowed');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Format disaster report for submission
 * @param {Object} reportData - The raw disaster report data
 * @returns {Object} Formatted disaster report ready for submission
 */
export const formatDisasterReport = (reportData) => {
  const formattedReport = {
    id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    disasterType: reportData.disasterType?.trim() || '',
    location: reportData.location?.trim() || '',
    description: reportData.description?.trim() || '',
    severity: reportData.severity ? parseInt(reportData.severity) : 3,
    affectedPeople: reportData.affectedPeople ? parseInt(reportData.affectedPeople) : 0,
    timestamp: new Date().toISOString(),
    status: 'pending_verification',
    reporter: {
      name: reportData.reporterName?.trim() || 'Anonymous',
      contact: reportData.reporterContact?.trim() || '',
      anonymous: !reportData.reporterName || reportData.reporterName.trim() === ''
    }
  };
  
  // Add optional fields if provided
  if (reportData.latitude !== undefined && reportData.longitude !== undefined) {
    formattedReport.locationCoordinates = {
      latitude: parseFloat(reportData.latitude),
      longitude: parseFloat(reportData.longitude)
    };
  }
  
  if (reportData.media && Array.isArray(reportData.media)) {
    formattedReport.media = reportData.media.slice(0, 5); // Limit to 5 media files
  }
  
  if (reportData.additionalInfo) {
    formattedReport.additionalInfo = reportData.additionalInfo;
  }
  
  return formattedReport;
};

/**
 * Calculate priority score for disaster report
 * @param {Object} reportData - The disaster report data
 * @returns {number} Priority score (1-100)
 */
export const calculateReportPriority = (reportData) => {
  let score = 0;
  
  // Base score from severity (1-5 mapped to 20-100)
  score += (reportData.severity || 3) * 20;
  
  // Affected people factor (up to 30 points)
  if (reportData.affectedPeople > 1000) {
    score += 30;
  } else if (reportData.affectedPeople > 100) {
    score += 20;
  } else if (reportData.affectedPeople > 10) {
    score += 10;
  }
  
  // Disaster type factor
  const highPriorityDisasters = ['earthquake', 'flood', 'cyclone'];
  if (highPriorityDisasters.includes(reportData.disasterType)) {
    score += 15;
  }
  
  // Media evidence factor (up to 10 points)
  if (reportData.media && reportData.media.length > 0) {
    score += Math.min(reportData.media.length * 2, 10);
  }
  
  // Reporter verification factor (up to 10 points)
  if (reportData.reporter && !reportData.reporter.anonymous) {
    score += 5;
  }
  
  // Cap score at 100
  return Math.min(100, Math.max(1, Math.round(score)));
};

/**
 * Categorize disaster report
 * @param {Object} reportData - The disaster report data
 * @returns {string} Category of the report
 */
export const categorizeDisasterReport = (reportData) => {
  const categories = {
    immediate_response: ['earthquake', 'flood', 'cyclone', 'landslide'],
    health_concern: ['disease_outbreak', 'water_contamination', 'food_shortage'],
    infrastructure: ['road_damage', 'building_collapse', 'power_outage'],
    environmental: ['forest_fire', 'chemical_spill', 'oil_spill'],
    social: ['displacement', 'missing_person', 'rescue_needed']
  };
  
  // Check for immediate response category
  if (categories.immediate_response.includes(reportData.disasterType)) {
    return 'immediate_response';
  }
  
  // Check for health concern category
  if (categories.health_concern.includes(reportData.disasterType)) {
    return 'health_concern';
  }
  
  // Check for infrastructure category
  if (categories.infrastructure.includes(reportData.disasterType)) {
    return 'infrastructure';
  }
  
  // Check for environmental category
  if (categories.environmental.includes(reportData.disasterType)) {
    return 'environmental';
  }
  
  // Check for social category
  if (categories.social.includes(reportData.disasterType)) {
    return 'social';
  }
  
  // Default to general category
  return 'general';
};

/**
 * Generate report summary
 * @param {Object} reportData - The disaster report data
 * @returns {Object} Summary information about the report
 */
export const generateReportSummary = (reportData) => {
  const priorityScore = calculateReportPriority(reportData);
  const category = categorizeDisasterReport(reportData);
  
  let priorityLevel = 'low';
  if (priorityScore >= 80) {
    priorityLevel = 'critical';
  } else if (priorityScore >= 60) {
    priorityLevel = 'high';
  } else if (priorityScore >= 40) {
    priorityLevel = 'medium';
  }
  
  return {
    priorityScore,
    priorityLevel,
    category,
    estimatedAffectedArea: calculateAffectedArea(reportData),
    responseTimeEstimate: estimateResponseTime(priorityScore),
    requiredResources: estimateRequiredResources(reportData)
  };
};

/**
 * Calculate estimated affected area based on report data
 * @param {Object} reportData - The disaster report data
 * @returns {string} Estimated affected area description
 */
const calculateAffectedArea = (reportData) => {
  if (reportData.affectedPeople > 10000) {
    return 'large_area';
  } else if (reportData.affectedPeople > 1000) {
    return 'medium_area';
  } else if (reportData.affectedPeople > 100) {
    return 'small_area';
  } else {
    return 'localized';
  }
};

/**
 * Estimate response time based on priority score
 * @param {number} priorityScore - The priority score of the report
 * @returns {string} Estimated response time
 */
const estimateResponseTime = (priorityScore) => {
  if (priorityScore >= 80) {
    return 'immediate'; // 0-2 hours
  } else if (priorityScore >= 60) {
    return 'urgent'; // 2-6 hours
  } else if (priorityScore >= 40) {
    return 'standard'; // 6-24 hours
  } else {
    return 'routine'; // 1-3 days
  }
};

/**
 * Estimate required resources based on report data
 * @param {Object} reportData - The disaster report data
 * @returns {Object} Estimated resources needed
 */
const estimateRequiredResources = (reportData) => {
  const resources = {
    personnel: 0,
    equipment: [],
    supplies: []
  };
  
  // Estimate personnel needs based on affected people
  if (reportData.affectedPeople > 1000) {
    resources.personnel = Math.ceil(reportData.affectedPeople / 100);
  } else if (reportData.affectedPeople > 100) {
    resources.personnel = Math.ceil(reportData.affectedPeople / 50);
  } else {
    resources.personnel = 1;
  }
  
  // Estimate equipment needs based on disaster type
  switch (reportData.disasterType) {
    case 'flood':
      resources.equipment = ['boats', 'water_pumps', 'rescue_equipment'];
      resources.supplies = ['food', 'water', 'blankets'];
      break;
    case 'earthquake':
      resources.equipment = ['heavy_machinery', 'medical_equipment', 'communication_devices'];
      resources.supplies = ['medical_supplies', 'food', 'water'];
      break;
    case 'cyclone':
      resources.equipment = ['emergency_vehicles', 'communication_equipment', 'shelter_materials'];
      resources.supplies = ['food', 'water', 'emergency_kits'];
      break;
    case 'drought':
      resources.equipment = ['water_tankers', 'water_purification_units'];
      resources.supplies = ['water', 'food'];
      break;
    case 'landslide':
      resources.equipment = ['rescue_equipment', 'heavy_machinery'];
      resources.supplies = ['food', 'water', 'medical_supplies'];
      break;
    default:
      resources.equipment = ['basic_rescue_equipment'];
      resources.supplies = ['food', 'water'];
  }
  
  return resources;
};

/**
 * Process community disaster report
 * @param {Object} reportData - The raw disaster report data
 * @returns {Object} Processed report with validation and formatting
 */
export const processCommunityDisasterReport = (reportData) => {
  // Validate the report
  const validation = validateDisasterReport(reportData);
  
  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors
    };
  }
  
  // Format the report
  const formattedReport = formatDisasterReport(reportData);
  
  // Generate summary
  const summary = generateReportSummary(formattedReport);
  
  return {
    success: true,
    report: formattedReport,
    summary
  };
};