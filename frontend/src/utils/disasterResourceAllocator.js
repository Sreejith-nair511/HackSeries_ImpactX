/**
 * Disaster Resource Allocator Utility
 * Allocates emergency resources based on disaster type, severity, and affected population
 */

/**
 * Calculate required emergency supplies based on disaster type and affected population
 * @param {string} disasterType - Type of disaster (flood, earthquake, cyclone, etc.)
 * @param {number} affectedPopulation - Number of people affected
 * @param {number} severityLevel - Severity level (1-5)
 * @returns {Object} Required supplies with quantities
 */
export const calculateEmergencySupplies = (disasterType, affectedPopulation, severityLevel) => {
  // Base quantities per person for different disaster types
  const baseSupplies = {
    flood: {
      water: 3, // liters per person per day
      food: 2, // meals per person per day
      medicalKits: 0.1, // kits per person
      blankets: 0.5, // blankets per person
      hygieneKits: 0.3 // kits per person
    },
    earthquake: {
      water: 4,
      food: 2,
      medicalKits: 0.2,
      blankets: 0.7,
      hygieneKits: 0.4
    },
    cyclone: {
      water: 3.5,
      food: 2,
      medicalKits: 0.15,
      blankets: 0.8,
      hygieneKits: 0.35
    },
    drought: {
      water: 5,
      food: 1.5,
      medicalKits: 0.05,
      blankets: 0.2,
      hygieneKits: 0.2
    },
    landslide: {
      water: 3,
      food: 2,
      medicalKits: 0.25,
      blankets: 0.6,
      hygieneKits: 0.3
    }
  };

  // Get base supplies for disaster type or default to flood
  const supplies = baseSupplies[disasterType] || baseSupplies.flood;
  
  // Adjust for severity (higher severity needs more resources)
  const severityMultiplier = 0.8 + (severityLevel * 0.2); // 1.0 to 1.8
  
  // Calculate total quantities
  const totalSupplies = {
    water: Math.ceil(affectedPopulation * supplies.water * severityMultiplier),
    food: Math.ceil(affectedPopulation * supplies.food * severityMultiplier),
    medicalKits: Math.ceil(affectedPopulation * supplies.medicalKits * severityMultiplier),
    blankets: Math.ceil(affectedPopulation * supplies.blankets * severityMultiplier),
    hygieneKits: Math.ceil(affectedPopulation * supplies.hygieneKits * severityMultiplier)
  };

  return totalSupplies;
};

/**
 * Calculate required personnel based on disaster type and affected area
 * @param {string} disasterType - Type of disaster
 * @param {number} affectedArea - Area affected in square kilometers
 * @param {number} affectedPopulation - Number of people affected
 * @returns {Object} Required personnel counts
 */
export const calculateRequiredPersonnel = (disasterType, affectedArea, affectedPopulation) => {
  // Personnel requirements per disaster type
  const personnelRatios = {
    flood: {
      rescueTeams: { ratio: 0.0005, min: 2, max: 50 },
      medicalTeams: { ratio: 0.0003, min: 1, max: 30 },
      logisticsTeams: { ratio: 0.0004, min: 2, max: 40 }
    },
    earthquake: {
      rescueTeams: { ratio: 0.0008, min: 3, max: 80 },
      medicalTeams: { ratio: 0.0005, min: 2, max: 50 },
      logisticsTeams: { ratio: 0.0006, min: 3, max: 60 }
    },
    cyclone: {
      rescueTeams: { ratio: 0.0006, min: 2, max: 60 },
      medicalTeams: { ratio: 0.0004, min: 2, max: 40 },
      logisticsTeams: { ratio: 0.0005, min: 2, max: 50 }
    },
    drought: {
      rescueTeams: { ratio: 0.0002, min: 1, max: 20 },
      medicalTeams: { ratio: 0.0003, min: 1, max: 25 },
      logisticsTeams: { ratio: 0.0004, min: 2, max: 30 }
    },
    landslide: {
      rescueTeams: { ratio: 0.0007, min: 2, max: 40 },
      medicalTeams: { ratio: 0.0004, min: 1, max: 35 },
      logisticsTeams: { ratio: 0.0005, min: 2, max: 45 }
    }
  };

  // Get ratios for disaster type or default to flood
  const ratios = personnelRatios[disasterType] || personnelRatios.flood;
  
  // Calculate personnel needs
  const rescueTeams = Math.min(
    Math.max(Math.ceil(affectedArea * ratios.rescueTeams.ratio), ratios.rescueTeams.min),
    ratios.rescueTeams.max
  );
  
  const medicalTeams = Math.min(
    Math.max(Math.ceil(affectedPopulation / 1000 * ratios.medicalTeams.ratio), ratios.medicalTeams.min),
    ratios.medicalTeams.max
  );
  
  const logisticsTeams = Math.min(
    Math.max(Math.ceil((affectedArea + affectedPopulation / 1000) * ratios.logisticsTeams.ratio), ratios.logisticsTeams.min),
    ratios.logisticsTeams.max
  );

  return {
    rescueTeams,
    medicalTeams,
    logisticsTeams,
    totalTeams: rescueTeams + medicalTeams + logisticsTeams
  };
};

/**
 * Calculate evacuation capacity based on transportation resources
 * @param {Array} vehicles - Array of vehicle objects with type and capacity
 * @param {number} evacuationTime - Available time for evacuation in hours
 * @returns {Object} Evacuation capacity metrics
 */
export const calculateEvacuationCapacity = (vehicles, evacuationTime) => {
  // Vehicle capacities (people per trip)
  const vehicleCapacities = {
    bus: 50,
    truck: 30,
    van: 15,
    boat: 25,
    helicopter: 12
  };

  // Average speeds in km/h
  const vehicleSpeeds = {
    bus: 40,
    truck: 35,
    van: 45,
    boat: 20,
    helicopter: 150
  };

  // Calculate total capacity
  let totalCapacity = 0;
  let totalVehicles = 0;
  
  const vehicleBreakdown = {};
  
  vehicles.forEach(vehicle => {
    const capacity = vehicleCapacities[vehicle.type] || 20;
    const speed = vehicleSpeeds[vehicle.type] || 30;
    // Estimate trips possible in evacuation time
    const trips = Math.max(1, Math.floor(evacuationTime * speed / 100)); // Simplified distance assumption
    const vehicleTotalCapacity = vehicle.count * capacity * trips;
    
    totalCapacity += vehicleTotalCapacity;
    totalVehicles += vehicle.count;
    
    vehicleBreakdown[vehicle.type] = {
      count: vehicle.count,
      capacity: capacity,
      trips: trips,
      totalCapacity: vehicleTotalCapacity
    };
  });

  return {
    totalCapacity,
    totalVehicles,
    vehicleBreakdown,
    timeToEvacuate: totalCapacity > 0 ? "Depends on population" : "Insufficient capacity"
  };
};

/**
 * Allocate shelter capacity based on disaster type and affected population
 * @param {string} disasterType - Type of disaster
 * @param {number} affectedPopulation - Number of people affected
 * @param {Array} availableShelters - Array of shelter objects with capacity and facilities
 * @returns {Object} Shelter allocation plan
 */
export const allocateShelterCapacity = (disasterType, affectedPopulation, availableShelters) => {
  // Priority factors for different disaster types
  const shelterPriorities = {
    flood: ['elevated', 'waterproof', 'large'],
    earthquake: ['structurallySound', 'openArea', 'medicalFacility'],
    cyclone: ['stormProof', 'reinforced', 'large'],
    drought: ['waterSource', 'storage', 'medicalFacility'],
    landslide: ['stableGround', 'accessible', 'medicalFacility']
  };

  // Get priorities for disaster type or default to flood
  const priorities = shelterPriorities[disasterType] || shelterPriorities.flood;
  
  // Sort shelters by priority and capacity
  const sortedShelters = [...availableShelters].sort((a, b) => {
    // Priority scoring
    let scoreA = 0;
    let scoreB = 0;
    
    priorities.forEach(priority => {
      if (a.facilities && a.facilities.includes(priority)) scoreA += 2;
      if (b.facilities && b.facilities.includes(priority)) scoreB += 2;
    });
    
    // Capacity factor (larger is better but not dominant)
    scoreA += a.capacity / 1000;
    scoreB += b.capacity / 1000;
    
    return scoreB - scoreA; // Descending order
  });
  
  // Allocate population to shelters
  let remainingPopulation = affectedPopulation;
  const allocation = [];
  
  for (const shelter of sortedShelters) {
    if (remainingPopulation <= 0) break;
    
    const allocated = Math.min(shelter.capacity, remainingPopulation);
    allocation.push({
      shelterId: shelter.id,
      shelterName: shelter.name,
      allocatedPopulation: allocated,
      remainingCapacity: shelter.capacity - allocated
    });
    
    remainingPopulation -= allocated;
  }
  
  return {
    allocation,
    unshelteredPopulation: remainingPopulation,
    totalSheltered: affectedPopulation - remainingPopulation,
    utilizationRate: ((affectedPopulation - remainingPopulation) / affectedPopulation * 100).toFixed(1)
  };
};