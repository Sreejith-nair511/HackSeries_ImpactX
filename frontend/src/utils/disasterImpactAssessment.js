/**
 * Disaster Impact Assessment Utility
 * Calculates the overall impact of disasters on communities and infrastructure
 */

/**
 * Calculate economic impact of a disaster
 * @param {Object} factors - Factors affecting economic impact
 * @param {number} factors.affectedPopulation - Number of people affected
 * @param {number} factors.gdpPerCapita - GDP per capita in the region
 * @param {number} factors.infrastructureDamage - Damage to infrastructure (0-1 scale)
 * @param {number} factors.businessDisruption - Business disruption duration in days
 * @param {number} factors.agriculturalLoss - Agricultural loss percentage (0-100)
 * @returns {Object} Economic impact metrics
 */
export const calculateEconomicImpact = (factors) => {
  const {
    affectedPopulation = 0,
    gdpPerCapita = 2000,
    infrastructureDamage = 0,
    businessDisruption = 0,
    agriculturalLoss = 0
  } = factors;

  // Calculate direct economic losses
  const populationLoss = affectedPopulation * gdpPerCapita * 0.1; // Assuming 10% of annual GDP per person loss
  const infrastructureLoss = infrastructureDamage * 500000000; // Assuming base infrastructure value
  const businessLoss = businessDisruption * affectedPopulation * 100; // Assuming ₹100 loss per person per day
  const agriculturalLossValue = (agriculturalLoss / 100) * 1000000000; // Assuming base agricultural value

  const totalEconomicLoss = populationLoss + infrastructureLoss + businessLoss + agriculturalLossValue;

  return {
    populationLoss: Math.round(populationLoss),
    infrastructureLoss: Math.round(infrastructureLoss),
    businessLoss: Math.round(businessLoss),
    agriculturalLoss: Math.round(agriculturalLossValue),
    totalEconomicLoss: Math.round(totalEconomicLoss),
    recoveryEstimate: Math.round(totalEconomicLoss * 1.5) // Estimated recovery cost
  };
};

/**
 * Calculate social impact of a disaster
 * @param {Object} factors - Factors affecting social impact
 * @param {number} factors.affectedPopulation - Number of people affected
 * @param {number} factors.displacedPopulation - Number of displaced people
 * @param {number} factors.casualties - Number of casualties
 * @param {number} factors.healthcareCapacity - Healthcare system capacity reduction (0-1 scale)
 * @param {number} factors.educationDisruption - Education disruption duration in months
 * @returns {Object} Social impact metrics
 */
export const calculateSocialImpact = (factors) => {
  const {
    affectedPopulation = 0,
    displacedPopulation = 0,
    casualties = 0,
    healthcareCapacity = 0,
    educationDisruption = 0
  } = factors;

  // Calculate social impact scores
  const displacementRate = displacedPopulation / affectedPopulation || 0;
  const casualtyRate = casualties / affectedPopulation || 0;
  const healthcareImpact = healthcareCapacity;
  const educationImpact = educationDisruption * 0.1; // Weighting factor

  // Overall social impact score (0-100)
  const socialImpactScore = (
    (displacementRate * 30) +
    (casualtyRate * 100 * 25) +
    (healthcareImpact * 20) +
    (educationImpact * 25)
  );

  return {
    displacementRate: (displacementRate * 100).toFixed(2),
    casualtyRate: (casualtyRate * 100).toFixed(2),
    healthcareImpact: (healthcareImpact * 100).toFixed(2),
    educationImpact: (educationImpact * 100).toFixed(2),
    socialImpactScore: Math.min(100, Math.round(socialImpactScore)),
    affectedFamilies: Math.round(affectedPopulation / 5), // Assuming 5 people per family
    childrenAffected: Math.round(affectedPopulation * 0.3) // Assuming 30% are children
  };
};

/**
 * Calculate environmental impact of a disaster
 * @param {Object} factors - Factors affecting environmental impact
 * @param {number} factors.areaAffected - Area affected in square kilometers
 * @param {number} factors.forestDamage - Forest damage percentage (0-100)
 * @param {number} factors.waterContamination - Water contamination level (0-10 scale)
 * @param {number} factors.airQualityDegradation - Air quality degradation (0-10 scale)
 * @param {number} factors.wildlifeImpact - Wildlife impact level (0-10 scale)
 * @returns {Object} Environmental impact metrics
 */
export const calculateEnvironmentalImpact = (factors) => {
  const {
    areaAffected = 0,
    forestDamage = 0,
    waterContamination = 0,
    airQualityDegradation = 0,
    wildlifeImpact = 0
  } = factors;

  // Calculate environmental impact scores
  const forestLoss = (forestDamage / 100) * areaAffected * 0.4; // Assuming 40% of affected area is forest
  const waterImpact = waterContamination * 10; // Weighting factor
  const airImpact = airQualityDegradation * 10; // Weighting factor
  const wildlifeLoss = wildlifeImpact * 10; // Weighting factor

  // Overall environmental impact score (0-100)
  const environmentalImpactScore = (
    (forestLoss * 0.3) +
    (waterImpact * 0.25) +
    (airImpact * 0.25) +
    (wildlifeLoss * 0.2)
  );

  return {
    forestLoss: Math.round(forestLoss),
    waterImpact: Math.round(waterImpact),
    airImpact: Math.round(airImpact),
    wildlifeLoss: Math.round(wildlifeLoss),
    environmentalImpactScore: Math.min(100, Math.round(environmentalImpactScore)),
    co2Emissions: Math.round(areaAffected * 500), // Estimated CO2 emissions from disaster
    biodiversityLoss: Math.round(areaAffected * 0.05) // Estimated species affected
  };
};

/**
 * Calculate overall disaster impact index
 * @param {Object} economicImpact - Economic impact metrics
 * @param {Object} socialImpact - Social impact metrics
 * @param {Object} environmentalImpact - Environmental impact metrics
 * @returns {Object} Overall impact assessment
 */
export const calculateOverallImpact = (economicImpact, socialImpact, environmentalImpact) => {
  // Weighted overall impact score (0-100)
  const overallImpactScore = (
    (economicImpact.totalEconomicLoss / 1000000000 * 0.4) + // Normalized economic impact
    (socialImpact.socialImpactScore * 0.4) +
    (environmentalImpact.environmentalImpactScore * 0.2)
  );

  // Determine impact level
  let impactLevel = "Low";
  if (overallImpactScore >= 70) {
    impactLevel = "Catastrophic";
  } else if (overallImpactScore >= 50) {
    impactLevel = "Severe";
  } else if (overallImpactScore >= 30) {
    impactLevel = "Moderate";
  } else if (overallImpactScore >= 10) {
    impactLevel = "Minor";
  }

  return {
    overallImpactScore: Math.min(100, Math.round(overallImpactScore)),
    impactLevel,
    recoveryTime: Math.round(overallImpactScore * 1.2), // Estimated recovery time in months
    priorityLevel: impactLevel === "Catastrophic" ? "Immediate" : 
                  impactLevel === "Severe" ? "High" : 
                  impactLevel === "Moderate" ? "Medium" : "Low"
  };
};

/**
 * Generate comprehensive disaster impact report
 * @param {Object} disasterData - All disaster-related data
 * @returns {Object} Complete impact assessment report
 */
export const generateImpactReport = (disasterData) => {
  const economicImpact = calculateEconomicImpact(disasterData.economicFactors);
  const socialImpact = calculateSocialImpact(disasterData.socialFactors);
  const environmentalImpact = calculateEnvironmentalImpact(disasterData.environmentalFactors);
  const overallImpact = calculateOverallImpact(economicImpact, socialImpact, environmentalImpact);

  return {
    economicImpact,
    socialImpact,
    environmentalImpact,
    overallImpact,
    timestamp: new Date().toISOString(),
    recommendations: generateRecommendations(overallImpact.impactLevel)
  };
};

/**
 * Generate recommendations based on impact level
 * @param {string} impactLevel - The overall impact level
 * @returns {Array} List of recommendations
 */
const generateRecommendations = (impactLevel) => {
  const recommendations = {
    "Catastrophic": [
      "Immediate deployment of national disaster response teams",
      "Activation of international aid mechanisms",
      "Establishment of emergency shelters for displaced populations",
      "Coordination with military for large-scale rescue operations",
      "Implementation of emergency food and water distribution systems"
    ],
    "Severe": [
      "Deployment of state-level disaster response teams",
      "Activation of regional emergency coordination centers",
      "Establishment of temporary medical facilities",
      "Coordination with NGOs for relief distribution",
      "Implementation of evacuation procedures for high-risk areas"
    ],
    "Moderate": [
      "Deployment of local emergency services",
      "Activation of community response teams",
      "Establishment of first aid stations",
      "Coordination with local authorities for damage assessment",
      "Implementation of public awareness campaigns"
    ],
    "Minor": [
      "Monitoring of situation by local authorities",
      "Preparation of emergency response resources",
      "Public information dissemination",
      "Coordination with local healthcare facilities",
      "Assessment of potential escalation risks"
    ],
    "Low": [
      "Routine monitoring of weather and geological conditions",
      "Maintenance of emergency preparedness resources",
      "Community education on disaster preparedness",
      "Regular review of emergency response plans",
      "Coordination with regional monitoring systems"
    ]
  };

  return recommendations[impactLevel] || recommendations["Low"];
};