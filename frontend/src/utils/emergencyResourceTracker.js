/**
 * Emergency Resource Tracker Utility
 * Provides functions for tracking and managing emergency resources during disaster response
 */

/**
 * Get available emergency resources in a region
 * @param {string} region - The region to check for resources
 * @returns {Array} Array of available emergency resources
 */
export const getAvailableResources = (region) => {
  // In a real implementation, this would fetch from a database or API
  // For now, we'll return mock data based on the region
  const resources = [
    {
      id: 1,
      name: 'Emergency Medical Kits',
      type: 'medical',
      quantity: 150,
      unit: 'kits',
      location: 'Mumbai Medical Center',
      contact: '+91-22-1234-5678',
      availability: '24/7',
      region: 'Maharashtra'
    },
    {
      id: 2,
      name: 'Emergency Food Supplies',
      type: 'food',
      quantity: 5000,
      unit: 'packets',
      location: 'Delhi Food Distribution Center',
      contact: '+91-11-2345-6789',
      availability: '8:00 AM - 8:00 PM',
      region: 'Delhi'
    },
    {
      id: 3,
      name: 'Rescue Boats',
      type: 'rescue',
      quantity: 25,
      unit: 'boats',
      location: 'Kerala Flood Response Unit',
      contact: '+91-471-123-4567',
      availability: 'On Demand',
      region: 'Kerala'
    },
    {
      id: 4,
      name: 'Emergency Water Purification Units',
      type: 'water',
      quantity: 75,
      unit: 'units',
      location: 'Bengaluru Water Authority',
      contact: '+91-80-3456-7890',
      availability: '24/7',
      region: 'Karnataka'
    },
    {
      id: 5,
      name: 'Emergency Shelter Tents',
      type: 'shelter',
      quantity: 200,
      unit: 'tents',
      location: 'Hyderabad Relief Camp',
      contact: '+91-40-4567-8901',
      availability: '24/7',
      region: 'Telangana'
    }
  ];

  // Filter resources by region if provided
  if (region) {
    return resources.filter(resource => resource.region.toLowerCase() === region.toLowerCase());
  }
  
  return resources;
};

/**
 * Request emergency resources for a disaster
 * @param {Object} request - The resource request details
 * @returns {Object} Request confirmation
 */
export const requestEmergencyResources = (request) => {
  // In a real implementation, this would submit to a resource management system
  // For now, we'll return a mock confirmation
  return {
    requestId: 'REQ-' + Math.floor(Math.random() * 10000),
    status: 'submitted',
    timestamp: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    ...request
  };
};

/**
 * Get resource types and their categories
 * @returns {Array} Array of resource types with categories
 */
export const getResourceTypes = () => {
  return [
    { id: 'medical', name: 'Medical Supplies', icon: '🏥' },
    { id: 'food', name: 'Food & Water', icon: '🍎' },
    { id: 'rescue', name: 'Rescue Equipment', icon: '🚤' },
    { id: 'shelter', name: 'Shelter & Clothing', icon: '🏠' },
    { id: 'communication', name: 'Communication', icon: '📡' },
    { id: 'transport', name: 'Transportation', icon: '🚚' }
  ];
};

/**
 * Track resource request status
 * @param {string} requestId - The request ID to track
 * @returns {Object} Request status information
 */
export const trackResourceRequest = (requestId) => {
  // In a real implementation, this would fetch from a tracking system
  // For now, we'll return mock status
  const statuses = ['submitted', 'processing', 'dispatched', 'delivered'];
  const statusIndex = Math.floor(Math.random() * statuses.length);
  
  return {
    requestId,
    status: statuses[statusIndex],
    lastUpdated: new Date().toISOString(),
    location: statusIndex < 2 ? 'Processing Center' : statusIndex < 3 ? 'In Transit' : 'Destination'
  };
};

/**
 * Get resource allocation statistics
 * @returns {Object} Resource allocation statistics
 */
export const getResourceStatistics = () => {
  return {
    totalResources: 12000,
    allocatedResources: 8500,
    availableResources: 3500,
    pendingRequests: 42,
    fulfilledRequests: 158,
    responseRate: '92%'
  };
};