/**
 * Disaster Recovery Planning Utilities
 * Provides functions for creating and managing disaster recovery plans in India
 */

/**
 * Generate recovery timeline based on disaster type and severity
 * @param {string} disasterType - Type of disaster
 * @param {number} severity - Severity level (1-5)
 * @param {string} region - Region affected
 * @returns {Object} Recovery timeline with phases and durations
 */
export const generateRecoveryTimeline = (disasterType, severity, region) => {
  // Base timeline in days
  const timeline = {
    immediate: { duration: 2, unit: 'hours', description: 'Immediate response and life saving' },
    shortTerm: { duration: 14, unit: 'days', description: 'Emergency relief and basic needs' },
    mediumTerm: { duration: 90, unit: 'days', description: 'Rehabilitation and restoration' },
    longTerm: { duration: 365, unit: 'days', description: 'Reconstruction and development' }
  };
  
  // Adjust timeline based on disaster type
  switch (disasterType.toLowerCase()) {
    case 'earthquake':
      timeline.immediate.duration = 4; // hours
      timeline.shortTerm.duration = 21; // days
      timeline.mediumTerm.duration = 180; // days
      timeline.longTerm.duration = 730; // days
      break;
      
    case 'flood':
      timeline.immediate.duration = 2; // hours
      timeline.shortTerm.duration = 30; // days
      timeline.mediumTerm.duration = 120; // days
      timeline.longTerm.duration = 548; // days
      break;
      
    case 'cyclone':
      timeline.immediate.duration = 6; // hours
      timeline.shortTerm.duration = 21; // days
      timeline.mediumTerm.duration = 90; // days
      timeline.longTerm.duration = 365; // days
      break;
      
    case 'drought':
      timeline.immediate.duration = 168; // hours (1 week)
      timeline.shortTerm.duration = 180; // days
      timeline.mediumTerm.duration = 365; // days
      timeline.longTerm.duration = 1095; // days (3 years)
      break;
      
    case 'landslide':
      timeline.immediate.duration = 8; // hours
      timeline.shortTerm.duration = 30; // days
      timeline.mediumTerm.duration = 120; // days
      timeline.longTerm.duration = 365; // days
      break;
      
    default:
      // Keep base timeline
      break;
  }
  
  // Adjust based on severity (1-5)
  const severityMultiplier = severity / 3; // Base is 3 (moderate)
  
  timeline.shortTerm.duration = Math.round(timeline.shortTerm.duration * severityMultiplier);
  timeline.mediumTerm.duration = Math.round(timeline.mediumTerm.duration * severityMultiplier);
  timeline.longTerm.duration = Math.round(timeline.longTerm.duration * severityMultiplier);
  
  // Ensure minimum durations
  timeline.shortTerm.duration = Math.max(timeline.shortTerm.duration, 7);
  timeline.mediumTerm.duration = Math.max(timeline.mediumTerm.duration, 30);
  timeline.longTerm.duration = Math.max(timeline.longTerm.duration, 180);
  
  return timeline;
};

/**
 * Calculate required resources for recovery
 * @param {string} disasterType - Type of disaster
 * @param {number} affectedPopulation - Number of people affected
 * @param {number} severity - Severity level (1-5)
 * @returns {Object} Resource requirements
 */
export const calculateRecoveryResources = (disasterType, affectedPopulation, severity) => {
  const resources = {
    personnel: {
      emergencyResponders: 0,
      medicalStaff: 0,
      engineers: 0,
      logistics: 0
    },
    supplies: {
      water: 0, // liters
      food: 0, // meals
      medical: 0, // kits
      shelter: 0 // units
    },
    equipment: {
      vehicles: 0,
      generators: 0,
      communication: 0,
      construction: 0
    },
    financial: {
      immediate: 0, // INR
      shortTerm: 0, // INR
      longTerm: 0 // INR
    }
  };
  
  // Base calculations per 1000 people
  const baseMultiplier = affectedPopulation / 1000;
  
  // Personnel requirements
  resources.personnel.emergencyResponders = Math.ceil(5 * baseMultiplier * (severity / 3));
  resources.personnel.medicalStaff = Math.ceil(3 * baseMultiplier * (severity / 3));
  resources.personnel.engineers = Math.ceil(2 * baseMultiplier * (severity / 3));
  resources.personnel.logistics = Math.ceil(4 * baseMultiplier * (severity / 3));
  
  // Supplies
  resources.supplies.water = Math.ceil(10000 * baseMultiplier * (severity / 3)); // 10 liters per person per day for 3 days
  resources.supplies.food = Math.ceil(3000 * baseMultiplier * (severity / 3)); // 3 meals per person per day for 1 day
  resources.supplies.medical = Math.ceil(50 * baseMultiplier * (severity / 3)); // 1 kit per 20 people
  resources.supplies.shelter = Math.ceil(100 * baseMultiplier * (severity / 3)); // 1 shelter unit per 10 people
  
  // Equipment
  resources.equipment.vehicles = Math.ceil(2 * baseMultiplier * (severity / 3));
  resources.equipment.generators = Math.ceil(1 * baseMultiplier * (severity / 3));
  resources.equipment.communication = Math.ceil(3 * baseMultiplier * (severity / 3));
  resources.equipment.construction = Math.ceil(1 * baseMultiplier * (severity / 3));
  
  // Financial estimates (in INR)
  const baseCostPerPerson = 5000; // Base cost per person for immediate relief
  resources.financial.immediate = Math.ceil(affectedPopulation * baseCostPerPerson * (severity / 3));
  resources.financial.shortTerm = resources.financial.immediate * 3;
  resources.financial.longTerm = resources.financial.immediate * 10;
  
  // Adjust based on disaster type
  switch (disasterType.toLowerCase()) {
    case 'earthquake':
      // More construction equipment and engineers needed
      resources.personnel.engineers *= 2;
      resources.equipment.construction *= 3;
      resources.financial.longTerm *= 2;
      break;
      
    case 'flood':
      // More water purification and disease prevention needed
      resources.supplies.water *= 2;
      resources.medical *= 1.5;
      resources.financial.immediate *= 1.3;
      break;
      
    case 'cyclone':
      // More shelter and communication equipment needed
      resources.supplies.shelter *= 2;
      resources.equipment.communication *= 2;
      resources.financial.shortTerm *= 1.4;
      break;
      
    case 'drought':
      // More water and long-term agricultural support needed
      resources.supplies.water *= 5;
      resources.financial.longTerm *= 3;
      break;
      
    case 'landslide':
      // More heavy machinery and search/rescue personnel needed
      resources.personnel.emergencyResponders *= 1.5;
      resources.equipment.construction *= 2;
      resources.financial.immediate *= 1.2;
      break;
  }
  
  return resources;
};

/**
 * Identify key stakeholders for recovery process
 * @param {string} disasterType - Type of disaster
 * @param {string} region - Region affected
 * @returns {Array} List of stakeholders
 */
export const identifyRecoveryStakeholders = (disasterType, region) => {
  const stakeholders = [
    {
      name: 'National Disaster Response Force (NDRF)',
      role: 'Primary emergency response',
      contact: '011-24363260',
      priority: 'high'
    },
    {
      name: 'State Disaster Response Force (SDRF)',
      role: 'State-level emergency response',
      contact: `SDRF ${region} Office`,
      priority: 'high'
    },
    {
      name: 'District Administration',
      role: 'Local coordination and implementation',
      contact: `${region} Collector Office`,
      priority: 'high'
    },
    {
      name: 'Indian Red Cross Society',
      role: 'Humanitarian assistance',
      contact: '011-23713000',
      priority: 'medium'
    },
    {
      name: 'National Institute of Disaster Management',
      role: 'Training and capacity building',
      contact: '011-26701234',
      priority: 'medium'
    }
  ];
  
  // Add disaster-specific stakeholders
  switch (disasterType.toLowerCase()) {
    case 'flood':
      stakeholders.push({
        name: 'Central Water Commission',
        role: 'Flood forecasting and monitoring',
        contact: '011-23712675',
        priority: 'high'
      });
      break;
      
    case 'earthquake':
      stakeholders.push({
        name: 'National Centre for Seismology',
        role: 'Earthquake monitoring and research',
        contact: '011-26524111',
        priority: 'high'
      });
      break;
      
    case 'cyclone':
      stakeholders.push({
        name: 'India Meteorological Department',
        role: 'Weather forecasting and alerts',
        contact: '011-23722222',
        priority: 'high'
      });
      break;
      
    case 'drought':
      stakeholders.push({
        name: 'Ministry of Jal Shakti',
        role: 'Water resource management',
        contact: '011-23722222',
        priority: 'high'
      });
      break;
  }
  
  return stakeholders;
};

/**
 * Generate recovery action plan
 * @param {string} disasterType - Type of disaster
 * @param {number} severity - Severity level (1-5)
 * @param {number} affectedPopulation - Number of people affected
 * @returns {Object} Action plan with priorities and tasks
 */
export const generateRecoveryActionPlan = (disasterType, severity, affectedPopulation) => {
  const actionPlan = {
    immediate: {
      priority: 'critical',
      tasks: [
        'Search and rescue operations',
        'Medical assistance and triage',
        'Emergency shelter provision',
        'Water and food distribution',
        'Communication restoration'
      ]
    },
    shortTerm: {
      priority: 'high',
      tasks: [
        'Damage assessment and needs analysis',
        'Temporary housing arrangements',
        'Healthcare facility restoration',
        'Infrastructure repair (roads, bridges)',
        'Livelihood restoration support'
      ]
    },
    mediumTerm: {
      priority: 'medium',
      tasks: [
        'School and hospital reconstruction',
        'Community infrastructure rebuilding',
        'Psychosocial support programs',
        'Economic recovery initiatives',
        'Capacity building workshops'
      ]
    },
    longTerm: {
      priority: 'low',
      tasks: [
        'Complete infrastructure reconstruction',
        'Hazard-resistant building codes implementation',
        'Disaster risk reduction measures',
        'Sustainable development programs',
        'Community resilience building'
      ]
    }
  };
  
  // Customize based on disaster type
  switch (disasterType.toLowerCase()) {
    case 'earthquake':
      actionPlan.immediate.tasks.push('Structural safety assessment');
      actionPlan.mediumTerm.tasks.push('Retrofitting of existing buildings');
      actionPlan.longTerm.tasks.push('Seismic zone development planning');
      break;
      
    case 'flood':
      actionPlan.immediate.tasks.push('Evacuation from flood-prone areas');
      actionPlan.mediumTerm.tasks.push('Drainage system improvement');
      actionPlan.longTerm.tasks.push('Flood-resistant infrastructure development');
      break;
      
    case 'cyclone':
      actionPlan.immediate.tasks.push('Evacuation to cyclone shelters');
      actionPlan.mediumTerm.tasks.push('Early warning system enhancement');
      actionPlan.longTerm.tasks.push('Coastal protection measures');
      break;
      
    case 'drought':
      actionPlan.immediate.tasks.push('Water rationing and distribution');
      actionPlan.shortTerm.tasks.push('Drought-resistant crop promotion');
      actionPlan.longTerm.tasks.push('Water conservation infrastructure');
      break;
      
    case 'landslide':
      actionPlan.immediate.tasks.push('Area stabilization measures');
      actionPlan.mediumTerm.tasks.push('Slope protection systems');
      actionPlan.longTerm.tasks.push('Geological hazard mapping');
      break;
  }
  
  return actionPlan;
};

/**
 * Assess recovery progress
 * @param {Object} recoveryData - Current recovery status data
 * @returns {Object} Progress assessment with metrics
 */
export const assessRecoveryProgress = (recoveryData) => {
  const metrics = {
    overall: 0,
    immediate: 0,
    shortTerm: 0,
    mediumTerm: 0,
    longTerm: 0
  };
  
  // Calculate progress percentages for each phase
  if (recoveryData.immediate && recoveryData.immediate.completed && recoveryData.immediate.total) {
    metrics.immediate = Math.round((recoveryData.immediate.completed / recoveryData.immediate.total) * 100);
  }
  
  if (recoveryData.shortTerm && recoveryData.shortTerm.completed && recoveryData.shortTerm.total) {
    metrics.shortTerm = Math.round((recoveryData.shortTerm.completed / recoveryData.shortTerm.total) * 100);
  }
  
  if (recoveryData.mediumTerm && recoveryData.mediumTerm.completed && recoveryData.mediumTerm.total) {
    metrics.mediumTerm = Math.round((recoveryData.mediumTerm.completed / recoveryData.mediumTerm.total) * 100);
  }
  
  if (recoveryData.longTerm && recoveryData.longTerm.completed && recoveryData.longTerm.total) {
    metrics.longTerm = Math.round((recoveryData.longTerm.completed / recoveryData.longTerm.total) * 100);
  }
  
  // Calculate overall progress (weighted average)
  metrics.overall = Math.round(
    (metrics.immediate * 0.2) + 
    (metrics.shortTerm * 0.3) + 
    (metrics.mediumTerm * 0.3) + 
    (metrics.longTerm * 0.2)
  );
  
  // Determine status based on overall progress
  let status = 'not_started';
  if (metrics.overall >= 90) {
    status = 'completed';
  } else if (metrics.overall >= 70) {
    status = 'advanced';
  } else if (metrics.overall >= 50) {
    status = 'moderate';
  } else if (metrics.overall >= 20) {
    status = 'initial';
  } else if (metrics.overall > 0) {
    status = 'started';
  }
  
  return {
    metrics,
    status,
    lastUpdated: new Date().toISOString()
  };
};