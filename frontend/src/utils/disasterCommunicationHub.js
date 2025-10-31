/**
 * Disaster Communication Hub Utility
 * Provides functions for managing communication during disaster response in India
 */

/**
 * Get communication channels for a region
 * @param {string} region - The region to get communication channels for
 * @returns {Array} Array of communication channels
 */
export const getCommunicationChannels = (region) => {
  // In a real implementation, this would fetch from a database or API
  // For now, we'll return mock data based on the region
  const channels = [
    {
      id: 1,
      name: 'State Emergency Operations Center',
      type: 'radio',
      frequency: '162.550 MHz',
      coverage: 'Statewide',
      status: 'active',
      contact: '+91-11-2345-6789',
      region: 'All'
    },
    {
      id: 2,
      name: 'District Disaster Management Authority',
      type: 'phone',
      frequency: 'N/A',
      coverage: 'District',
      status: 'active',
      contact: '+91-22-3456-7890',
      region: 'Maharashtra'
    },
    {
      id: 3,
      name: 'Emergency Radio Network',
      type: 'radio',
      frequency: '162.400 MHz',
      coverage: 'Regional',
      status: 'active',
      contact: '+91-44-5678-9012',
      region: 'Tamil Nadu'
    },
    {
      id: 4,
      name: 'Coastal Warning System',
      type: 'radio',
      frequency: '162.500 MHz',
      coverage: 'Coastal Areas',
      status: 'active',
      contact: '+91-40-6789-0123',
      region: 'Andhra Pradesh'
    },
    {
      id: 5,
      name: 'Mountain Rescue Communication',
      type: 'radio',
      frequency: '162.450 MHz',
      coverage: 'Hill Areas',
      status: 'active',
      contact: '+91-141-7890-1234',
      region: 'Rajasthan'
    },
    {
      id: 6,
      name: 'Flood Response Network',
      type: 'radio',
      frequency: '162.425 MHz',
      coverage: 'Flood Prone Areas',
      status: 'active',
      contact: '+91-79-8901-2345',
      region: 'Gujarat'
    }
  ];

  // Filter channels by region if provided
  if (region && region !== 'All') {
    return channels.filter(channel => 
      channel.region === region || channel.region === 'All'
    );
  }
  
  return channels;
};

/**
 * Get emergency broadcast information
 * @param {string} region - The region to get broadcast information for
 * @returns {Object} Emergency broadcast information
 */
export const getEmergencyBroadcastInfo = (region) => {
  return {
    tvChannels: [
      {
        id: 1,
        name: 'DD National Emergency Broadcast',
        language: 'Hindi',
        transmission: '24/7',
        coverage: 'National',
        contact: '+91-11-2345-6789'
      },
      {
        id: 2,
        name: 'DD Regional Emergency Broadcast',
        language: 'Regional',
        transmission: '24/7',
        coverage: 'Regional',
        contact: '+91-22-3456-7890'
      }
    ],
    radioStations: [
      {
        id: 1,
        name: 'All India Radio Emergency Network',
        frequency: '162.550 MHz',
        transmission: '24/7',
        coverage: 'National',
        contact: '+91-44-5678-9012'
      },
      {
        id: 2,
        name: 'Local Emergency Radio',
        frequency: '162.400 MHz',
        transmission: '24/7',
        coverage: 'Local',
        contact: '+91-80-6789-0123'
      }
    ],
    smsAlerts: {
      service: 'National Emergency Alert System',
      shortcode: '144',
      provider: 'Government of India',
      coverage: 'All Networks'
    },
    lastUpdated: new Date().toISOString()
  };
};

/**
 * Get communication equipment availability
 * @param {string} region - The region to check equipment availability for
 * @returns {Array} Array of available communication equipment
 */
export const getCommunicationEquipment = (region) => {
  return [
    {
      id: 1,
      name: 'Satellite Phones',
      type: 'communication',
      quantity: 50,
      available: 35,
      location: 'State Emergency Warehouse',
      contact: '+91-11-1234-5678',
      region: 'All'
    },
    {
      id: 2,
      name: 'Emergency Radios',
      type: 'communication',
      quantity: 1000,
      available: 750,
      location: 'District Office',
      contact: '+91-22-2345-6789',
      region: 'Maharashtra'
    },
    {
      id: 3,
      name: 'Mobile Communication Units',
      type: 'communication',
      quantity: 25,
      available: 20,
      location: 'Regional Headquarters',
      contact: '+91-44-3456-7890',
      region: 'Tamil Nadu'
    },
    {
      id: 4,
      name: 'HF Radio Systems',
      type: 'communication',
      quantity: 15,
      available: 12,
      location: 'Coastal Station',
      contact: '+91-40-4567-8901',
      region: 'Andhra Pradesh'
    },
    {
      id: 5,
      name: 'VHF Radio Handhelds',
      type: 'communication',
      quantity: 200,
      available: 150,
      location: 'Mountain Rescue Base',
      contact: '+91-141-5678-9012',
      region: 'Rajasthan'
    }
  ];
};

/**
 * Get communication protocols for different disaster types
 * @param {string} disasterType - The type of disaster
 * @returns {Object} Communication protocols
 */
export const getCommunicationProtocols = (disasterType) => {
  const protocols = {
    flood: {
      immediate: [
        'Activate flood warning system',
        'Broadcast evacuation orders',
        'Establish emergency communication channels',
        'Deploy mobile communication units'
      ],
      shortTerm: [
        'Set up temporary communication centers',
        'Coordinate with relief agencies',
        'Maintain regular situation updates',
        'Establish contact with affected communities'
      ],
      longTerm: [
        'Restore permanent communication infrastructure',
        'Implement improved flood communication systems',
        'Train personnel on flood communication protocols',
        'Conduct post-flood communication review'
      ]
    },
    earthquake: {
      immediate: [
        'Activate earthquake emergency network',
        'Broadcast safety instructions',
        'Establish emergency communication with rescue teams',
        'Coordinate with medical facilities'
      ],
      shortTerm: [
        'Set up field communication centers',
        'Coordinate search and rescue operations',
        'Maintain communication with relief agencies',
        'Establish contact with trapped survivors'
      ],
      longTerm: [
        'Restore damaged communication infrastructure',
        'Implement earthquake-resistant communication systems',
        'Train personnel on earthquake communication protocols',
        'Conduct post-earthquake communication review'
      ]
    },
    cyclone: {
      immediate: [
        'Activate cyclone warning system',
        'Broadcast evacuation orders',
        'Establish emergency communication channels',
        'Coordinate with coastal authorities'
      ],
      shortTerm: [
        'Set up temporary communication centers',
        'Coordinate with relief agencies',
        'Maintain regular situation updates',
        'Establish contact with affected communities'
      ],
      longTerm: [
        'Restore permanent communication infrastructure',
        'Implement improved cyclone communication systems',
        'Train personnel on cyclone communication protocols',
        'Conduct post-cyclone communication review'
      ]
    }
  };

  return protocols[disasterType] || protocols.flood;
};

/**
 * Get emergency contact information for different agencies
 * @param {string} region - The region to get emergency contacts for
 * @returns {Array} Array of emergency contacts
 */
export const getEmergencyContacts = (region) => {
  const contacts = [
    {
      id: 1,
      name: 'National Emergency Response Center',
      phone: '112',
      type: 'emergency',
      availability: '24/7',
      region: 'All'
    },
    {
      id: 2,
      name: 'State Disaster Management Authority',
      phone: '+91-22-1234-5678',
      type: 'government',
      availability: '24/7',
      region: 'Maharashtra'
    },
    {
      id: 3,
      name: 'District Collector Office',
      phone: '+91-44-2345-6789',
      type: 'government',
      availability: '24/7',
      region: 'Tamil Nadu'
    },
    {
      id: 4,
      name: 'Local Police Station',
      phone: '100',
      type: 'police',
      availability: '24/7',
      region: 'All'
    },
    {
      id: 5,
      name: 'Fire & Rescue Services',
      phone: '101',
      type: 'fire',
      availability: '24/7',
      region: 'All'
    },
    {
      id: 6,
      name: 'Ambulance Services',
      phone: '102',
      type: 'medical',
      availability: '24/7',
      region: 'All'
    }
  ];

  // Filter contacts by region if provided
  if (region && region !== 'All') {
    return contacts.filter(contact => 
      contact.region === region || contact.region === 'All'
    );
  }
  
  return contacts;
};