/**
 * Community Disaster Reporting Utilities
 * Provides functions for managing community disaster reports in India
 */

/**
 * Validate community disaster report data
 * @param {Object} reportData - The disaster report data to validate
 * @returns {Object} Validation result with isValid flag and errors array
 */
export const validateCommunityReport = (reportData) => {
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
  
  // Media validation (max 5 files)
  if (reportData.media && reportData.media.length > 5) {
    errors.push('Maximum 5 media files allowed');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Format community report for display
 * @param {Object} reportData - The raw report data
 * @returns {Object} Formatted report data
 */
export const formatCommunityReport = (reportData) => {
  const formattedReport = { ...reportData };
  
  // Format date if it exists
  if (reportData.timestamp) {
    formattedReport.formattedDate = new Date(reportData.timestamp).toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
  
  // Format location
  if (reportData.latitude && reportData.longitude) {
    formattedReport.formattedLocation = `${reportData.latitude.toFixed(4)}, ${reportData.longitude.toFixed(4)}`;
  } else if (reportData.location) {
    formattedReport.formattedLocation = reportData.location;
  }
  
  // Format severity
  if (reportData.severity) {
    const severityLabels = {
      1: 'Low',
      2: 'Moderate',
      3: 'High',
      4: 'Severe',
      5: 'Critical'
    };
    formattedReport.formattedSeverity = severityLabels[reportData.severity] || reportData.severity;
  }
  
  return formattedReport;
};

/**
 * Calculate priority level for a community report
 * @param {Object} reportData - The report data
 * @returns {string} Priority level (low, medium, high, critical)
 */
export const calculateReportPriority = (reportData) => {
  let priorityScore = 0;
  
  // Base score from severity (1-5)
  if (reportData.severity) {
    priorityScore += reportData.severity;
  }
  
  // Add points for affected people
  if (reportData.affectedPeople) {
    if (reportData.affectedPeople >= 1000) {
      priorityScore += 5;
    } else if (reportData.affectedPeople >= 100) {
      priorityScore += 3;
    } else if (reportData.affectedPeople >= 10) {
      priorityScore += 1;
    }
  }
  
  // Add points for disaster type
  const criticalDisasters = ['flood', 'earthquake', 'cyclone'];
  const highDisasters = ['landslide', 'drought', 'fire'];
  
  if (reportData.disasterType) {
    const type = reportData.disasterType.toLowerCase();
    if (criticalDisasters.includes(type)) {
      priorityScore += 4;
    } else if (highDisasters.includes(type)) {
      priorityScore += 2;
    } else {
      priorityScore += 1;
    }
  }
  
  // Determine priority level
  if (priorityScore >= 10) {
    return 'critical';
  } else if (priorityScore >= 7) {
    return 'high';
  } else if (priorityScore >= 4) {
    return 'medium';
  } else {
    return 'low';
  }
};

/**
 * Categorize disaster report by type
 * @param {string} disasterType - The disaster type
 * @returns {string} Category (natural, industrial, health, other)
 */
export const categorizeDisasterReport = (disasterType) => {
  const naturalDisasters = [
    'flood', 'earthquake', 'cyclone', 'drought', 'landslide', 
    'tsunami', 'avalanche', 'storm', 'hailstorm', 'lightning'
  ];
  
  const industrialDisasters = [
    'chemical', 'nuclear', 'explosion', 'fire', 'gas leak',
    'oil spill', 'mine collapse', 'factory accident'
  ];
  
  const healthDisasters = [
    'epidemic', 'pandemic', 'outbreak', 'disease', 'health crisis'
  ];
  
  const lowerType = disasterType.toLowerCase();
  
  if (naturalDisasters.includes(lowerType)) {
    return 'natural';
  } else if (industrialDisasters.includes(lowerType)) {
    return 'industrial';
  } else if (healthDisasters.includes(lowerType)) {
    return 'health';
  } else {
    return 'other';
  }
};

/**
 * Estimate required resources based on report
 * @param {Object} reportData - The report data
 * @returns {Object} Estimated resources
 */
export const estimateRequiredResources = (reportData) => {
  const resources = {
    personnel: 0,
    water: 0, // liters
    food: 0, // meals
    medical: 0, // first aid kits
    shelter: 0 // people accommodated
  };
  
  // Base calculations
  if (reportData.affectedPeople) {
    resources.personnel = Math.ceil(reportData.affectedPeople / 50);
    resources.water = reportData.affectedPeople * 3; // 3 liters per person
    resources.food = reportData.affectedPeople * 2; // 2 meals per person
    resources.medical = Math.ceil(reportData.affectedPeople / 20);
    resources.shelter = Math.ceil(reportData.affectedPeople * 1.2); // 20% buffer
  }
  
  // Adjust based on disaster type
  if (reportData.disasterType) {
    const type = reportData.disasterType.toLowerCase();
    
    if (type === 'flood') {
      resources.water *= 1.5; // More water needed
      resources.shelter *= 1.3; // More shelter needed
    } else if (type === 'earthquake') {
      resources.medical *= 2; // More medical needed
      resources.personnel *= 1.5; // More personnel needed
    } else if (type === 'cyclone') {
      resources.shelter *= 1.5; // More shelter needed
      resources.food *= 1.2; // More food needed
    } else if (type === 'drought') {
      resources.water *= 3; // Much more water needed
      resources.food *= 1.5; // More food needed
    } else if (type === 'landslide') {
      resources.medical *= 1.5; // More medical needed
      resources.personnel *= 1.3; // More personnel needed
    }
  }
  
  return resources;
};

/**
 * Generate report summary for quick overview
 * @param {Object} reportData - The report data
 * @returns {Object} Summary information
 */
export const generateReportSummary = (reportData) => {
  return {
    id: reportData.id || Date.now(),
    disasterType: reportData.disasterType,
    location: reportData.location,
    severity: reportData.severity,
    affectedPeople: reportData.affectedPeople || 0,
    priority: calculateReportPriority(reportData),
    category: categorizeDisasterReport(reportData.disasterType),
    timestamp: reportData.timestamp || new Date().toISOString(),
    status: reportData.status || 'reported'
  };
};