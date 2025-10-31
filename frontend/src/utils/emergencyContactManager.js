/**
 * Emergency Contact Management Utility
 * Manages emergency contacts for different regions and disaster types in India
 */

/**
 * Get emergency contacts for a specific state and disaster type
 * @param {string} state - The Indian state
 * @param {string} disasterType - Type of disaster (optional)
 * @returns {Array} Array of emergency contacts
 */
export const getEmergencyContacts = (state, disasterType = null) => {
  const emergencyContacts = {
    'Andhra Pradesh': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0866-2454010', type: 'disaster' }
    ],
    'Arunachal Pradesh': [
      { name: 'State Emergency Operations Center', phone: '0360-2214111', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0360-2213911', type: 'disaster' }
    ],
    'Assam': [
      { name: 'State Emergency Operations Center', phone: '0361-2234747', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0361-2234747', type: 'disaster' }
    ],
    'Bihar': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0612-2218261', type: 'disaster' }
    ],
    'Chhattisgarh': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0771-2423111', type: 'disaster' }
    ],
    'Goa': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0832-2420777', type: 'disaster' }
    ],
    'Gujarat': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '079-23252365', type: 'disaster' }
    ],
    'Haryana': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0172-2540001', type: 'disaster' }
    ],
    'Himachal Pradesh': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0177-2623071', type: 'disaster' }
    ],
    'Jharkhand': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0651-2282266', type: 'disaster' }
    ],
    'Karnataka': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '080-22212960', type: 'disaster' }
    ],
    'Kerala': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0471-2309250', type: 'disaster' }
    ],
    'Madhya Pradesh': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0755-2420047', type: 'disaster' }
    ],
    'Maharashtra': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '022-22022752', type: 'disaster' }
    ],
    'Manipur': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0385-2451777', type: 'disaster' }
    ],
    'Meghalaya': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0364-2223030', type: 'disaster' }
    ],
    'Mizoram': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0389-2322244', type: 'disaster' }
    ],
    'Nagaland': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0370-2222333', type: 'disaster' }
    ],
    'Odisha': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0674-2504111', type: 'disaster' }
    ],
    'Punjab': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0172-2214000', type: 'disaster' }
    ],
    'Rajasthan': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0141-2226273', type: 'disaster' }
    ],
    'Sikkim': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '03592-202333', type: 'disaster' }
    ],
    'Tamil Nadu': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '044-28531111', type: 'disaster' }
    ],
    'Telangana': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '040-23234567', type: 'disaster' }
    ],
    'Tripura': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0381-2321414', type: 'disaster' }
    ],
    'Uttar Pradesh': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0522-2202275', type: 'disaster' }
    ],
    'Uttarakhand': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '0135-2630220', type: 'disaster' }
    ],
    'West Bengal': [
      { name: 'State Emergency Operations Center', phone: '1070', type: 'general' },
      { name: 'Fire & Rescue Services', phone: '101', type: 'fire' },
      { name: 'Police Emergency', phone: '100', type: 'police' },
      { name: 'Ambulance Services', phone: '102', type: 'medical' },
      { name: 'Disaster Management Authority', phone: '033-22141111', type: 'disaster' }
    ]
  };

  // Filter by state
  const stateContacts = emergencyContacts[state] || [];

  // If disaster type is specified, prioritize those contacts
  if (disasterType && stateContacts.length > 0) {
    const disasterSpecificContacts = stateContacts.filter(contact => contact.type === 'disaster');
    if (disasterSpecificContacts.length > 0) {
      return disasterSpecificContacts;
    }
  }

  return stateContacts;
};

/**
 * Validate emergency contact information
 * @param {Object} contact - Emergency contact object
 * @returns {Object} Validation result
 */
export const validateEmergencyContact = (contact) => {
  const errors = [];
  
  if (!contact.name || contact.name.trim() === '') {
    errors.push('Contact name is required');
  }
  
  if (!contact.phone || contact.phone.trim() === '') {
    errors.push('Phone number is required');
  } else if (!/^[0-9\-\+\(\)\s]+$/.test(contact.phone)) {
    errors.push('Invalid phone number format');
  }
  
  if (!contact.type || contact.type.trim() === '') {
    errors.push('Contact type is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Format phone number for display
 * @param {string} phoneNumber - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  // Remove all non-digit characters except +
  const cleaned = phoneNumber.replace(/[^\d+]/g, '');
  
  // Handle different formats
  if (cleaned.startsWith('+91')) {
    // Indian international format
    const national = cleaned.substring(3);
    if (national.length === 10) {
      return `+91 ${national.substring(0, 5)} ${national.substring(5)}`;
    }
  } else if (cleaned.startsWith('91') && cleaned.length === 12) {
    // Without + but with country code
    const national = cleaned.substring(2);
    return `+91 ${national.substring(0, 5)} ${national.substring(5)}`;
  } else if (cleaned.length === 10) {
    // Standard 10-digit format
    return `${cleaned.substring(0, 5)} ${cleaned.substring(5)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('0')) {
    // With leading zero
    const national = cleaned.substring(1);
    return `${national.substring(0, 5)} ${national.substring(5)}`;
  }
  
  // Return original if no pattern matches
  return phoneNumber;
};

/**
 * Search emergency contacts by keyword
 * @param {Array} contacts - Array of emergency contacts
 * @param {string} keyword - Search keyword
 * @returns {Array} Filtered contacts
 */
export const searchEmergencyContacts = (contacts, keyword) => {
  if (!keyword || keyword.trim() === '') {
    return contacts;
  }
  
  const lowerKeyword = keyword.toLowerCase();
  return contacts.filter(contact => 
    contact.name.toLowerCase().includes(lowerKeyword) ||
    contact.phone.includes(keyword) ||
    (contact.type && contact.type.toLowerCase().includes(lowerKeyword))
  );
};

/**
 * Get disaster-specific helplines
 * @param {string} disasterType - Type of disaster
 * @returns {Array} Array of helplines
 */
export const getDisasterHelplines = (disasterType) => {
  const helplines = {
    flood: [
      { name: 'National Flood Commission', phone: '011-23733123', type: 'flood' },
      { name: 'Central Water Commission', phone: '011-23712675', type: 'flood' }
    ],
    earthquake: [
      { name: 'National Centre for Seismology', phone: '011-26524111', type: 'earthquake' },
      { name: 'Indian Institute of Geomagnetism', phone: '022-27581944', type: 'earthquake' }
    ],
    cyclone: [
      { name: 'India Meteorological Department', phone: '011-23722222', type: 'cyclone' },
      { name: 'National Cyclone Risk Mitigation Project', phone: '011-26701234', type: 'cyclone' }
    ],
    landslide: [
      { name: 'Geological Survey of India', phone: '011-26524111', type: 'landslide' },
      { name: 'National Institute of Rock Mechanics', phone: '0836-2494141', type: 'landslide' }
    ],
    drought: [
      { name: 'Ministry of Jal Shakti', phone: '011-23722222', type: 'drought' },
      { name: 'Central Ground Water Board', phone: '011-26701234', type: 'drought' }
    ],
    wildfire: [
      { name: 'Forest Survey of India', phone: '011-26701234', type: 'wildfire' },
      { name: 'Wildlife Crime Control Bureau', phone: '011-23712675', type: 'wildfire' }
    ]
  };
  
  return helplines[disasterType] || [];
};