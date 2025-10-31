/**
 * Disaster Response Planner Utility
 * Generates comprehensive disaster response plans based on disaster type and severity
 */

/**
 * Generate response plan for flood disaster
 * @param {Object} factors - Factors affecting flood response
 * @param {number} factors.severity - Severity level (1-5)
 * @param {number} factors.affectedArea - Area affected in square kilometers
 * @param {number} factors.affectedPopulation - Number of people affected
 * @param {string} factors.region - Region name
 * @returns {Object} Flood response plan
 */
export const generateFloodResponsePlan = (factors) => {
  const { severity = 3, affectedArea = 1000, affectedPopulation = 500000, region = "Default" } = factors;
  
  // Base resources needed
  const baseRescueTeams = Math.ceil(affectedArea / 50);
  const baseMedicalTeams = Math.ceil(affectedPopulation / 10000);
  const baseLogisticsTeams = Math.ceil(affectedArea / 30);
  
  // Scale based on severity
  const severityMultiplier = 0.5 + (severity * 0.3); // 0.8 to 2.0
  
  const responsePlan = {
    disasterType: "flood",
    region,
    severity,
    immediateActions: [
      "Activate emergency response teams",
      "Deploy rescue boats and water rescue equipment",
      "Establish emergency communication channels",
      "Set up temporary shelters in safe locations",
      "Coordinate with local authorities for evacuation"
    ],
    resourceAllocation: {
      rescueTeams: Math.ceil(baseRescueTeams * severityMultiplier),
      medicalTeams: Math.ceil(baseMedicalTeams * severityMultiplier),
      logisticsTeams: Math.ceil(baseLogisticsTeams * severityMultiplier),
      boats: Math.ceil(affectedArea / 10 * severityMultiplier),
      waterPumps: Math.ceil(affectedArea / 20 * severityMultiplier),
      emergencySupplies: {
        food: Math.ceil(affectedPopulation * 2 * 3), // 2 meals per person for 3 days
        water: Math.ceil(affectedPopulation * 3 * 3), // 3 liters per person per day for 3 days
        medicalKits: Math.ceil(affectedPopulation * 0.1),
        blankets: Math.ceil(affectedPopulation * 0.5)
      }
    },
    timeline: {
      immediate: "0-2 hours: Emergency response activation",
      shortTerm: "2-24 hours: Rescue operations and shelter setup",
      mediumTerm: "1-7 days: Recovery and rehabilitation",
      longTerm: "1-6 months: Reconstruction and restoration"
    },
    coordination: [
      "State Disaster Management Authority",
      "National Disaster Response Force",
      "Local Police and Emergency Services",
      "Military (if required)",
      "NGOs and Volunteer Organizations"
    ],
    specialConsiderations: [
      "Ensure water purification and disease prevention measures",
      "Monitor dam and reservoir levels",
      "Coordinate with meteorological department for weather updates",
      "Establish evacuation routes away from flood-prone areas"
    ]
  };
  
  return responsePlan;
};

/**
 * Generate response plan for earthquake disaster
 * @param {Object} factors - Factors affecting earthquake response
 * @param {number} factors.severity - Severity level (1-5)
 * @param {number} factors.affectedArea - Area affected in square kilometers
 * @param {number} factors.affectedPopulation - Number of people affected
 * @param {string} factors.region - Region name
 * @returns {Object} Earthquake response plan
 */
export const generateEarthquakeResponsePlan = (factors) => {
  const { severity = 3, affectedArea = 500, affectedPopulation = 300000, region = "Default" } = factors;
  
  // Base resources needed
  const baseRescueTeams = Math.ceil(affectedArea / 20);
  const baseMedicalTeams = Math.ceil(affectedPopulation / 5000);
  const baseLogisticsTeams = Math.ceil(affectedArea / 15);
  
  // Scale based on severity
  const severityMultiplier = 0.5 + (severity * 0.3); // 0.8 to 2.0
  
  const responsePlan = {
    disasterType: "earthquake",
    region,
    severity,
    immediateActions: [
      "Activate search and rescue operations",
      "Assess structural damage to buildings",
      "Establish emergency medical facilities",
      "Set up communication centers",
      "Coordinate evacuation of damaged areas"
    ],
    resourceAllocation: {
      rescueTeams: Math.ceil(baseRescueTeams * severityMultiplier),
      medicalTeams: Math.ceil(baseMedicalTeams * severityMultiplier),
      logisticsTeams: Math.ceil(baseLogisticsTeams * severityMultiplier),
      heavyMachinery: Math.ceil(affectedArea / 5 * severityMultiplier),
      medicalSupplies: {
        traumaKits: Math.ceil(affectedPopulation * 0.05),
        surgicalSupplies: Math.ceil(affectedPopulation * 0.02),
        medications: Math.ceil(affectedPopulation * 0.1),
        stretchers: Math.ceil(affectedPopulation * 0.01)
      }
    },
    timeline: {
      immediate: "0-1 hour: Emergency response activation",
      shortTerm: "1-24 hours: Search and rescue operations",
      mediumTerm: "1-14 days: Medical care and temporary shelter",
      longTerm: "3-12 months: Reconstruction and infrastructure repair"
    },
    coordination: [
      "State Disaster Management Authority",
      "National Disaster Response Force",
      "Structural engineers and building inspectors",
      "Military (if required)",
      "International aid organizations (for severe cases)"
    ],
    specialConsiderations: [
      "Aftershock monitoring and preparedness",
      "Hazardous material spill response",
      "Psychological trauma counseling",
      "Infrastructure stability assessment",
      "Utility line safety checks"
    ]
  };
  
  return responsePlan;
};

/**
 * Generate response plan for cyclone disaster
 * @param {Object} factors - Factors affecting cyclone response
 * @param {number} factors.severity - Severity level (1-5)
 * @param {number} factors.affectedArea - Area affected in square kilometers
 * @param {number} factors.affectedPopulation - Number of people affected
 * @param {string} factors.region - Region name
 * @returns {Object} Cyclone response plan
 */
export const generateCycloneResponsePlan = (factors) => {
  const { severity = 3, affectedArea = 2000, affectedPopulation = 800000, region = "Default" } = factors;
  
  // Base resources needed
  const baseRescueTeams = Math.ceil(affectedArea / 40);
  const baseMedicalTeams = Math.ceil(affectedPopulation / 15000);
  const baseLogisticsTeams = Math.ceil(affectedArea / 25);
  
  // Scale based on severity
  const severityMultiplier = 0.5 + (severity * 0.3); // 0.8 to 2.0
  
  const responsePlan = {
    disasterType: "cyclone",
    region,
    severity,
    immediateActions: [
      "Activate cyclone warning systems",
      "Evacuate coastal and low-lying areas",
      "Secure emergency shelters",
      "Deploy disaster response teams",
      "Coordinate with meteorological services"
    ],
    resourceAllocation: {
      rescueTeams: Math.ceil(baseRescueTeams * severityMultiplier),
      medicalTeams: Math.ceil(baseMedicalTeams * severityMultiplier),
      logisticsTeams: Math.ceil(baseLogisticsTeams * severityMultiplier),
      emergencyVehicles: Math.ceil(affectedArea / 8 * severityMultiplier),
      communicationEquipment: Math.ceil(affectedArea / 10 * severityMultiplier),
      emergencySupplies: {
        food: Math.ceil(affectedPopulation * 2 * 5), // 2 meals per person for 5 days
        water: Math.ceil(affectedPopulation * 3 * 5), // 3 liters per person per day for 5 days
        emergencyKits: Math.ceil(affectedPopulation * 0.3),
        tarpaulins: Math.ceil(affectedArea * 10)
      }
    },
    timeline: {
      immediate: "0-6 hours: Pre-landfall preparations",
      shortTerm: "6-48 hours: Post-landfall response",
      mediumTerm: "2-30 days: Recovery operations",
      longTerm: "1-12 months: Rebuilding and restoration"
    },
    coordination: [
      "State Disaster Management Authority",
      "India Meteorological Department",
      "Coast Guard and Navy",
      "National Disaster Response Force",
      "Local Administration"
    ],
    specialConsiderations: [
      "Storm surge preparedness",
      "Power line and communication tower safety",
      "Marine and fishing community evacuation",
      "Agricultural damage assessment",
      "Coastal erosion monitoring"
    ]
  };
  
  return responsePlan;
};

/**
 * Generate response plan for drought disaster
 * @param {Object} factors - Factors affecting drought response
 * @param {number} factors.severity - Severity level (1-5)
 * @param {number} factors.affectedArea - Area affected in square kilometers
 * @param {number} factors.affectedPopulation - Number of people affected
 * @param {string} factors.region - Region name
 * @returns {Object} Drought response plan
 */
export const generateDroughtResponsePlan = (factors) => {
  const { severity = 3, affectedArea = 5000, affectedPopulation = 1000000, region = "Default" } = factors;
  
  // Base resources needed
  const baseAgriculturalTeams = Math.ceil(affectedArea / 100);
  const baseMedicalTeams = Math.ceil(affectedPopulation / 20000);
  const baseWaterManagementTeams = Math.ceil(affectedArea / 50);
  
  // Scale based on severity
  const severityMultiplier = 0.5 + (severity * 0.3); // 0.8 to 2.0
  
  const responsePlan = {
    disasterType: "drought",
    region,
    severity,
    immediateActions: [
      "Assess water scarcity levels",
      "Implement water rationing measures",
      "Distribute water through tankers",
      "Provide drought-resistant seeds to farmers",
      "Monitor health impacts of water scarcity"
    ],
    resourceAllocation: {
      agriculturalTeams: Math.ceil(baseAgriculturalTeams * severityMultiplier),
      medicalTeams: Math.ceil(baseMedicalTeams * severityMultiplier),
      waterManagementTeams: Math.ceil(baseWaterManagementTeams * severityMultiplier),
      waterTankers: Math.ceil(affectedArea / 20 * severityMultiplier),
      droughtReliefKits: Math.ceil(affectedPopulation * 0.2),
      waterPurificationUnits: Math.ceil(affectedArea / 100 * severityMultiplier)
    },
    timeline: {
      immediate: "0-1 week: Assessment and initial response",
      shortTerm: "1-3 months: Water distribution and relief",
      mediumTerm: "3-12 months: Agricultural support and recovery",
      longTerm: "1-3 years: Sustainable water management"
    },
    coordination: [
      "State Water Resources Department",
      "Agricultural Department",
      "Public Health Department",
      "Revenue Department",
      "NGOs and Community Organizations"
    ],
    specialConsiderations: [
      "Groundwater level monitoring",
      "Crop insurance and compensation",
      "Livestock support programs",
      "Migration prevention measures",
      "Long-term water conservation strategies"
    ]
  };
  
  return responsePlan;
};

/**
 * Generate response plan for landslide disaster
 * @param {Object} factors - Factors affecting landslide response
 * @param {number} factors.severity - Severity level (1-5)
 * @param {number} factors.affectedArea - Area affected in square kilometers
 * @param {number} factors.affectedPopulation - Number of people affected
 * @param {string} factors.region - Region name
 * @returns {Object} Landslide response plan
 */
export const generateLandslideResponsePlan = (factors) => {
  const { severity = 3, affectedArea = 200, affectedPopulation = 100000, region = "Default" } = factors;
  
  // Base resources needed
  const baseRescueTeams = Math.ceil(affectedArea / 10);
  const baseMedicalTeams = Math.ceil(affectedPopulation / 5000);
  const baseGeologicalTeams = Math.ceil(affectedArea / 20);
  
  // Scale based on severity
  const severityMultiplier = 0.5 + (severity * 0.3); // 0.8 to 2.0
  
  const responsePlan = {
    disasterType: "landslide",
    region,
    severity,
    immediateActions: [
      "Evacuate affected areas immediately",
      "Deploy search and rescue teams",
      "Establish emergency medical posts",
      "Assess slope stability and risks",
      "Set up early warning systems"
    ],
    resourceAllocation: {
      rescueTeams: Math.ceil(baseRescueTeams * severityMultiplier),
      medicalTeams: Math.ceil(baseMedicalTeams * severityMultiplier),
      geologicalTeams: Math.ceil(baseGeologicalTeams * severityMultiplier),
      heavyRescueEquipment: Math.ceil(affectedArea / 5 * severityMultiplier),
      temporaryShelters: Math.ceil(affectedPopulation * 0.1),
      slopeMonitoringDevices: Math.ceil(affectedArea * 2)
    },
    timeline: {
      immediate: "0-4 hours: Emergency evacuation and rescue",
      shortTerm: "4-72 hours: Search and medical assistance",
      mediumTerm: "3-30 days: Risk assessment and temporary solutions",
      longTerm: "1-24 months: Slope stabilization and reconstruction"
    },
    coordination: [
      "State Disaster Management Authority",
      "Geological Survey of India",
      "Forest Department",
      "Public Works Department",
      "Mountain Rescue Teams"
    ],
    specialConsiderations: [
      "Rainfall and seismic activity monitoring",
      "Vegetation and erosion control measures",
      "Road and infrastructure stability checks",
      "Wildlife corridor protection",
      "Community awareness on landslide risks"
    ]
  };
  
  return responsePlan;
};

/**
 * Generate comprehensive disaster response plan based on disaster type
 * @param {string} disasterType - Type of disaster
 * @param {Object} factors - Factors affecting response
 * @returns {Object} Comprehensive response plan
 */
export const generateResponsePlan = (disasterType, factors) => {
  const planGenerators = {
    flood: generateFloodResponsePlan,
    earthquake: generateEarthquakeResponsePlan,
    cyclone: generateCycloneResponsePlan,
    drought: generateDroughtResponsePlan,
    landslide: generateLandslideResponsePlan
  };
  
  const generator = planGenerators[disasterType] || generateFloodResponsePlan;
  return generator(factors);
};