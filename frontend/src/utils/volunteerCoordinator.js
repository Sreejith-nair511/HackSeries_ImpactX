/**
 * Volunteer Coordinator Utility
 * Manages volunteer coordination for disaster response and recovery efforts in India
 */

/**
 * Match volunteers with disaster response needs based on skills and location
 * @param {Array} volunteers - Array of volunteer objects with skills and location
 * @param {Object} disasterInfo - Disaster information including type, location, and needs
 * @returns {Array} Matched volunteers with suitability scores
 */
export const matchVolunteersToNeeds = (volunteers, disasterInfo) => {
  // Skill requirements for different disaster types
  const disasterSkillRequirements = {
    flood: ['waterRescue', 'firstAid', 'logistics', 'medical'],
    earthquake: ['searchAndRescue', 'medical', 'structuralEngineering', 'firstAid'],
    cyclone: ['firstAid', 'shelterManagement', 'logistics', 'communications'],
    drought: ['waterManagement', 'agriculture', 'healthcare', 'communityOutreach'],
    landslide: ['searchAndRescue', 'medical', 'geology', 'firstAid'],
    fire: ['firefighting', 'evacuation', 'firstAid', 'hazardousMaterials']
  };

  // Get required skills for this disaster type
  const requiredSkills = disasterSkillRequirements[disasterInfo.type] || ['generalSupport'];

  // Calculate suitability scores for each volunteer
  const matchedVolunteers = volunteers.map(volunteer => {
    let score = 0;
    const matchedSkills = [];

    // Skill matching (40% of score)
    requiredSkills.forEach(skill => {
      if (volunteer.skills.includes(skill)) {
        score += 40 / requiredSkills.length;
        matchedSkills.push(skill);
      }
    });

    // Location proximity (30% of score)
    const distance = calculateDistance(
      volunteer.location.lat, volunteer.location.lng,
      disasterInfo.location.lat, disasterInfo.location.lng
    );
    
    // Closer volunteers get higher scores (within 100km)
    if (distance <= 100) {
      score += 30 * (1 - distance / 100);
    }

    // Experience factor (20% of score)
    if (volunteer.experience && volunteer.experience.disasterResponse) {
      score += 20 * Math.min(volunteer.experience.disasterResponse / 10, 1); // Cap at 10 years
    }

    // Availability (10% of score)
    if (volunteer.availability && volunteer.availability.immediate) {
      score += 10;
    }

    return {
      ...volunteer,
      suitabilityScore: Math.round(score * 100) / 100,
      matchedSkills,
      distanceFromDisaster: Math.round(distance * 100) / 100
    };
  });

  // Sort by suitability score (descending)
  return matchedVolunteers.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
};

/**
 * Calculate distance between two geographical points (Haversine formula)
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lon1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lon2 - Longitude of point 2
 * @returns {number} Distance in kilometers
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

/**
 * Assign volunteers to specific tasks based on their skills and the task requirements
 * @param {Array} volunteers - Array of volunteer objects
 * @param {Array} tasks - Array of task objects with required skills
 * @returns {Array} Task assignments with volunteer allocations
 */
export const assignVolunteersToTasks = (volunteers, tasks) => {
  const assignments = [];
  const assignedVolunteers = new Set();

  // Sort tasks by priority (assuming priority is a numeric value)
  const sortedTasks = [...tasks].sort((a, b) => (b.priority || 0) - (a.priority || 0));

  sortedTasks.forEach(task => {
    const suitableVolunteers = volunteers
      .filter(volunteer => 
        !assignedVolunteers.has(volunteer.id) && 
        task.requiredSkills.every(skill => volunteer.skills.includes(skill))
      )
      .sort((a, b) => b.suitabilityScore - a.suitabilityScore);

    // Assign required number of volunteers (default to 1 if not specified)
    const requiredVolunteers = task.requiredVolunteers || 1;
    const assigned = suitableVolunteers.slice(0, requiredVolunteers);

    assigned.forEach(volunteer => {
      assignedVolunteers.add(volunteer.id);
      assignments.push({
        taskId: task.id,
        taskName: task.name,
        volunteerId: volunteer.id,
        volunteerName: volunteer.name,
        assignedAt: new Date().toISOString()
      });
    });
  });

  return assignments;
};

/**
 * Generate volunteer communication plan for a disaster response
 * @param {Array} volunteers - Array of assigned volunteers
 * @param {Object} disasterInfo - Disaster information
 * @returns {Object} Communication plan with contact groups and schedules
 */
export const generateCommunicationPlan = (volunteers, disasterInfo) => {
  // Group volunteers by location for regional coordination
  const locationGroups = {};
  volunteers.forEach(volunteer => {
    const key = `${Math.round(volunteer.location.lat * 100)},${Math.round(volunteer.location.lng * 100)}`;
    if (!locationGroups[key]) {
      locationGroups[key] = {
        location: volunteer.location,
        volunteers: []
      };
    }
    locationGroups[key].volunteers.push(volunteer);
  });

  // Create communication channels
  const channels = {
    emergency: {
      name: 'Emergency Coordination',
      description: 'For critical updates and emergency communications',
      frequency: 'As needed',
      volunteers: volunteers.filter(v => v.communicationPreferences.emergency)
    },
    dailyBriefing: {
      name: 'Daily Briefing',
      description: 'Daily updates on response progress and priorities',
      frequency: 'Once daily at 08:00 AM',
      volunteers: volunteers
    },
    taskUpdates: {
      name: 'Task Updates',
      description: 'Real-time updates on task progress and changes',
      frequency: 'As needed',
      volunteers: volunteers.filter(v => v.communicationPreferences.taskUpdates)
    }
  };

  // Generate contact list
  const contactList = volunteers.map(volunteer => ({
    id: volunteer.id,
    name: volunteer.name,
    phone: volunteer.contact.phone,
    email: volunteer.contact.email,
    role: volunteer.role,
    skills: volunteer.skills,
    location: volunteer.location
  }));

  return {
    disaster: disasterInfo,
    locationGroups: Object.values(locationGroups),
    channels,
    contactList,
    startDate: new Date().toISOString(),
    coordinatorContacts: [
      {
        name: 'Disaster Response Coordinator',
        phone: disasterInfo.coordinatorPhone || '1070',
        email: disasterInfo.coordinatorEmail || 'coordinator@disaster.gov.in'
      }
    ]
  };
};

/**
 * Track volunteer hours and generate reports for recognition
 * @param {Array} volunteerHours - Array of volunteer hour records
 * @returns {Object} Volunteer statistics and recognition reports
 */
export const trackVolunteerHours = (volunteerHours) => {
  // Group by volunteer
  const volunteerStats = {};
  
  volunteerHours.forEach(record => {
    if (!volunteerStats[record.volunteerId]) {
      volunteerStats[record.volunteerId] = {
        id: record.volunteerId,
        name: record.volunteerName,
        totalHours: 0,
        dailyHours: {},
        tasks: new Set()
      };
    }
    
    volunteerStats[record.volunteerId].totalHours += record.hours;
    volunteerStats[record.volunteerId].tasks.add(record.taskName);
    
    const date = record.date || new Date().toISOString().split('T')[0];
    if (!volunteerStats[record.volunteerId].dailyHours[date]) {
      volunteerStats[record.volunteerId].dailyHours[date] = 0;
    }
    volunteerStats[record.volunteerId].dailyHours[date] += record.hours;
  });

  // Convert to array and calculate recognition levels
  const statsArray = Object.values(volunteerStats).map(volunteer => {
    const recognitionLevel = getRecognitionLevel(volunteer.totalHours);
    return {
      ...volunteer,
      tasks: Array.from(volunteer.tasks),
      recognitionLevel,
      dailyHours: Object.entries(volunteer.dailyHours).map(([date, hours]) => ({ date, hours }))
    };
  });

  // Sort by total hours
  statsArray.sort((a, b) => b.totalHours - a.totalHours);

  return {
    volunteers: statsArray,
    totalVolunteerHours: statsArray.reduce((sum, v) => sum + v.totalHours, 0),
    totalVolunteers: statsArray.length,
    topContributors: statsArray.slice(0, 5),
    recognitionDistribution: {
      bronze: statsArray.filter(v => v.recognitionLevel === 'bronze').length,
      silver: statsArray.filter(v => v.recognitionLevel === 'silver').length,
      gold: statsArray.filter(v => v.recognitionLevel === 'gold').length,
      platinum: statsArray.filter(v => v.recognitionLevel === 'platinum').length
    }
  };
};

/**
 * Determine recognition level based on volunteer hours
 * @param {number} hours - Total volunteer hours
 * @returns {string} Recognition level (bronze, silver, gold, platinum)
 */
const getRecognitionLevel = (hours) => {
  if (hours >= 100) return 'platinum';
  if (hours >= 50) return 'gold';
  if (hours >= 20) return 'silver';
  return 'bronze';
};

/**
 * Schedule volunteer shifts for ongoing disaster response
 * @param {Array} volunteers - Array of available volunteers
 * @param {Array} shifts - Array of shift requirements
 * @returns {Array} Scheduled shifts with volunteer assignments
 */
export const scheduleVolunteerShifts = (volunteers, shifts) => {
  const scheduledShifts = [];
  const volunteerAvailability = {};

  // Initialize volunteer availability tracking
  volunteers.forEach(volunteer => {
    volunteerAvailability[volunteer.id] = {
      ...volunteer,
      assignedHours: 0
    };
  });

  // Sort shifts by priority and start time
  const sortedShifts = [...shifts].sort((a, b) => {
    // Higher priority first
    if (b.priority !== a.priority) {
      return (b.priority || 0) - (a.priority || 0);
    }
    // Earlier start time first
    return new Date(a.startTime) - new Date(b.startTime);
  });

  sortedShifts.forEach(shift => {
    // Calculate shift duration in hours
    const startTime = new Date(shift.startTime);
    const endTime = new Date(shift.endTime);
    const durationHours = (endTime - startTime) / (1000 * 60 * 60);
    
    // Find suitable volunteers for this shift
    const suitableVolunteers = volunteers
      .filter(volunteer => {
        // Check if volunteer is available for this shift
        if (!isAvailableForShift(volunteer, shift)) return false;
        
        // Check if volunteer has required skills
        if (shift.requiredSkills) {
          return shift.requiredSkills.every(skill => volunteer.skills.includes(skill));
        }
        return true;
      })
      .sort((a, b) => {
        // Prioritize volunteers with less assigned hours (for balanced distribution)
        const hoursDiff = volunteerAvailability[a.id].assignedHours - volunteerAvailability[b.id].assignedHours;
        if (hoursDiff !== 0) return hoursDiff;
        
        // Then by suitability score
        return (b.suitabilityScore || 0) - (a.suitabilityScore || 0);
      });

    // Assign required number of volunteers
    const requiredVolunteers = shift.requiredVolunteers || 1;
    const assignedVolunteers = suitableVolunteers.slice(0, requiredVolunteers);

    assignedVolunteers.forEach(volunteer => {
      scheduledShifts.push({
        shiftId: shift.id,
        shiftName: shift.name,
        volunteerId: volunteer.id,
        volunteerName: volunteer.name,
        startTime: shift.startTime,
        endTime: shift.endTime,
        durationHours: Math.round(durationHours * 100) / 100,
        role: shift.role || 'General Support'
      });

      // Update volunteer availability
      volunteerAvailability[volunteer.id].assignedHours += durationHours;
    });
  });

  return {
    scheduledShifts,
    totalShifts: shifts.length,
    filledShifts: scheduledShifts.length,
    unfilledShifts: shifts.length - (scheduledShifts.length / (shifts[0]?.requiredVolunteers || 1)),
    volunteerUtilization: Object.values(volunteerAvailability)
      .map(v => ({
        id: v.id,
        name: v.name,
        assignedHours: Math.round(v.assignedHours * 100) / 100,
        utilization: Math.round((v.assignedHours / 40) * 100) // Assuming 40hr work week
      }))
      .sort((a, b) => b.assignedHours - a.assignedHours)
  };
};

/**
 * Check if a volunteer is available for a specific shift
 * @param {Object} volunteer - Volunteer object
 * @param {Object} shift - Shift object
 * @returns {boolean} Whether volunteer is available
 */
const isAvailableForShift = (volunteer, shift) => {
  // Check basic availability
  if (!volunteer.availability) return true;
  
  const shiftStart = new Date(shift.startTime);
  const shiftEnd = new Date(shift.endTime);
  const shiftDay = shiftStart.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Check day availability
  if (volunteer.availability.days && !volunteer.availability.days.includes(shiftDay)) {
    return false;
  }
  
  // Check time availability
  if (volunteer.availability.timeRanges) {
    const shiftStartHour = shiftStart.getHours() + shiftStart.getMinutes() / 60;
    const shiftEndHour = shiftEnd.getHours() + shiftEnd.getMinutes() / 60;
    
    return volunteer.availability.timeRanges.some(range => 
      shiftStartHour >= range.start && shiftEndHour <= range.end
    );
  }
  
  return true;
};