/**
 * Disaster Statistics Utility
 * Provides functions for calculating and analyzing disaster statistics in India
 */

/**
 * Calculate disaster frequency and impact statistics
 * @param {Array} disasterData - Array of disaster event data
 * @returns {Object} Statistical analysis of disaster data
 */
export const calculateDisasterStatistics = (disasterData) => {
  if (!disasterData || disasterData.length === 0) {
    return {
      totalEvents: 0,
      byType: {},
      byRegion: {},
      frequency: {},
      impact: {
        totalAffected: 0,
        averageAffected: 0,
        totalEconomicLoss: 0,
        averageEconomicLoss: 0
      }
    };
  }

  // Initialize statistics objects
  const stats = {
    totalEvents: disasterData.length,
    byType: {},
    byRegion: {},
    frequency: {},
    impact: {
      totalAffected: 0,
      averageAffected: 0,
      totalEconomicLoss: 0,
      averageEconomicLoss: 0
    }
  };

  // Process each disaster event
  disasterData.forEach(event => {
    // Count by type
    if (!stats.byType[event.type]) {
      stats.byType[event.type] = {
        count: 0,
        affected: 0,
        economicLoss: 0
      };
    }
    stats.byType[event.type].count++;
    stats.byType[event.type].affected += event.affected || 0;
    stats.byType[event.type].economicLoss += event.economicLoss || 0;

    // Count by region
    if (!stats.byRegion[event.region]) {
      stats.byRegion[event.region] = {
        count: 0,
        affected: 0,
        economicLoss: 0
      };
    }
    stats.byRegion[event.region].count++;
    stats.byRegion[event.region].affected += event.affected || 0;
    stats.byRegion[event.region].economicLoss += event.economicLoss || 0;

    // Add to totals
    stats.impact.totalAffected += event.affected || 0;
    stats.impact.totalEconomicLoss += event.economicLoss || 0;
  });

  // Calculate averages
  stats.impact.averageAffected = stats.totalEvents > 0 ? 
    Math.round(stats.impact.totalAffected / stats.totalEvents) : 0;
  stats.impact.averageEconomicLoss = stats.totalEvents > 0 ? 
    Math.round(stats.impact.totalEconomicLoss / stats.totalEvents) : 0;

  // Calculate frequency by type (events per year)
  const years = [...new Set(disasterData.map(event => new Date(event.date).getFullYear()))];
  const yearCount = years.length || 1;
  
  Object.keys(stats.byType).forEach(type => {
    stats.frequency[type] = Math.round((stats.byType[type].count / yearCount) * 10) / 10;
  });

  return stats;
};

/**
 * Generate disaster trend analysis
 * @param {Array} disasterData - Array of disaster event data over time
 * @returns {Object} Trend analysis with year-over-year comparisons
 */
export const analyzeDisasterTrends = (disasterData) => {
  if (!disasterData || disasterData.length === 0) {
    return {
      yearlyTrends: [],
      growthRate: 0,
      mostIncreasingType: null,
      mostDecreasingType: null
    };
  }

  // Group by year
  const byYear = {};
  disasterData.forEach(event => {
    const year = new Date(event.date).getFullYear();
    if (!byYear[year]) {
      byYear[year] = {
        count: 0,
        affected: 0,
        economicLoss: 0,
        byType: {}
      };
    }
    byYear[year].count++;
    byYear[year].affected += event.affected || 0;
    byYear[year].economicLoss += event.economicLoss || 0;
    
    if (!byYear[year].byType[event.type]) {
      byYear[year].byType[event.type] = 0;
    }
    byYear[year].byType[event.type]++;
  });

  // Convert to array and sort by year
  const yearlyTrends = Object.keys(byYear)
    .map(year => ({
      year: parseInt(year),
      ...byYear[year]
    }))
    .sort((a, b) => a.year - b.year);

  // Calculate growth rate
  let growthRate = 0;
  if (yearlyTrends.length > 1) {
    const firstYear = yearlyTrends[0].count;
    const lastYear = yearlyTrends[yearlyTrends.length - 1].count;
    const yearsDiff = yearlyTrends.length - 1;
    growthRate = yearsDiff > 0 ? 
      Math.round(((lastYear - firstYear) / firstYear / yearsDiff) * 100 * 10) / 10 : 0;
  }

  // Find most increasing and decreasing disaster types
  let mostIncreasingType = null;
  let mostDecreasingType = null;
  let maxIncrease = -Infinity;
  let maxDecrease = Infinity;

  // Get all disaster types
  const allTypes = [...new Set(disasterData.map(event => event.type))];
  
  allTypes.forEach(type => {
    const typeData = yearlyTrends
      .filter(year => year.byType[type])
      .map(year => ({ year: year.year, count: year.byType[type] || 0 }));
    
    if (typeData.length > 1) {
      const first = typeData[0].count;
      const last = typeData[typeData.length - 1].count;
      const change = last - first;
      
      if (change > maxIncrease) {
        maxIncrease = change;
        mostIncreasingType = { type, change };
      }
      
      if (change < maxDecrease) {
        maxDecrease = change;
        mostDecreasingType = { type, change };
      }
    }
  });

  return {
    yearlyTrends,
    growthRate,
    mostIncreasingType,
    mostDecreasingType
  };
};

/**
 * Calculate regional disaster risk indices
 * @param {Array} disasterData - Array of disaster event data
 * @param {Array} regionData - Array of regional vulnerability data
 * @returns {Array} Risk indices for each region
 */
export const calculateRegionalRiskIndices = (disasterData, regionData) => {
  if (!disasterData || !regionData) {
    return [];
  }

  // Calculate base statistics
  const stats = calculateDisasterStatistics(disasterData);
  
  // Calculate risk index for each region
  const riskIndices = regionData.map(region => {
    const regionEvents = disasterData.filter(event => event.region === region.name);
    const regionStats = calculateDisasterStatistics(regionEvents);
    
    // Base risk factors
    const frequencyRisk = regionStats.totalEvents / (region.population / 1000000); // Events per million people
    const impactRisk = regionStats.impact.totalAffected / region.population; // Affected ratio
    const economicRisk = regionStats.impact.totalEconomicLoss / (region.gdp || 1); // Economic loss ratio
    
    // Vulnerability factors
    const populationDensity = region.population / (region.area || 1);
    const infrastructureScore = region.infrastructureQuality || 5; // 1-10 scale
    const preparednessScore = region.disasterPreparedness || 5; // 1-10 scale
    
    // Calculate composite risk index (0-100 scale)
    const riskIndex = Math.min(100, Math.round(
      (frequencyRisk * 20) +
      (impactRisk * 30) +
      (economicRisk * 20) +
      (populationDensity / 1000) +
      ((10 - infrastructureScore) * 5) +
      ((10 - preparednessScore) * 5)
    ));
    
    return {
      region: region.name,
      riskIndex,
      frequencyRisk: Math.round(frequencyRisk * 100) / 100,
      impactRisk: Math.round(impactRisk * 10000) / 100,
      economicRisk: Math.round(economicRisk * 10000) / 100,
      populationDensity: Math.round(populationDensity * 100) / 100,
      infrastructureScore,
      preparednessScore,
      totalEvents: regionStats.totalEvents,
      totalAffected: regionStats.impact.totalAffected,
      totalEconomicLoss: regionStats.impact.totalEconomicLoss
    };
  });
  
  // Sort by risk index (highest first)
  return riskIndices.sort((a, b) => b.riskIndex - a.riskIndex);
};

/**
 * Generate disaster comparison data
 * @param {Array} disasterData - Array of disaster event data
 * @param {string} type1 - First disaster type to compare
 * @param {string} type2 - Second disaster type to compare
 * @returns {Object} Comparison data between two disaster types
 */
export const compareDisasterTypes = (disasterData, type1, type2) => {
  if (!disasterData || !type1 || !type2) {
    return null;
  }

  const type1Data = disasterData.filter(event => event.type === type1);
  const type2Data = disasterData.filter(event => event.type === type2);
  
  const type1Stats = calculateDisasterStatistics(type1Data);
  const type2Stats = calculateDisasterStatistics(type2Data);
  
  return {
    [type1]: {
      count: type1Stats.byType[type1]?.count || 0,
      affected: type1Stats.byType[type1]?.affected || 0,
      economicLoss: type1Stats.byType[type1]?.economicLoss || 0,
      averageAffected: type1Stats.byType[type1]?.count > 0 ? 
        Math.round((type1Stats.byType[type1]?.affected || 0) / type1Stats.byType[type1]?.count) : 0,
      averageEconomicLoss: type1Stats.byType[type1]?.count > 0 ? 
        Math.round((type1Stats.byType[type1]?.economicLoss || 0) / type1Stats.byType[type1]?.count) : 0
    },
    [type2]: {
      count: type2Stats.byType[type2]?.count || 0,
      affected: type2Stats.byType[type2]?.affected || 0,
      economicLoss: type2Stats.byType[type2]?.economicLoss || 0,
      averageAffected: type2Stats.byType[type2]?.count > 0 ? 
        Math.round((type2Stats.byType[type2]?.affected || 0) / type2Stats.byType[type2]?.count) : 0,
      averageEconomicLoss: type2Stats.byType[type2]?.count > 0 ? 
        Math.round((type2Stats.byType[type2]?.economicLoss || 0) / type2Stats.byType[type2]?.count) : 0
    }
  };
};