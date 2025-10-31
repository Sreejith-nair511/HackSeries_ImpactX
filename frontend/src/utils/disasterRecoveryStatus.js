/**
 * Disaster Recovery Status Utility
 * Provides functions for tracking and managing disaster recovery progress in India
 */

/**
 * Get recovery status for a region
 * @param {string} region - The region to check recovery status for
 * @returns {Object} Recovery status information
 */
export const getRecoveryStatus = (region) => {
  // In a real implementation, this would fetch from a database or API
  // For now, we'll return mock data based on the region
  const statusData = {
    'Kerala': {
      overallProgress: 78,
      phases: {
        immediate: { completed: true, progress: 100 },
        shortTerm: { completed: true, progress: 95 },
        mediumTerm: { completed: false, progress: 65 },
        longTerm: { completed: false, progress: 25 }
      },
      keyMetrics: {
        homesRebuilt: 185000,
        infrastructureRestored: 87,
        economicRecovery: 72,
        communityResilience: 85
      },
      lastUpdated: new Date().toISOString()
    },
    'Maharashtra': {
      overallProgress: 92,
      phases: {
        immediate: { completed: true, progress: 100 },
        shortTerm: { completed: true, progress: 100 },
        mediumTerm: { completed: true, progress: 85 },
        longTerm: { completed: false, progress: 45 }
      },
      keyMetrics: {
        homesRebuilt: 320000,
        infrastructureRestored: 95,
        economicRecovery: 88,
        communityResilience: 92
      },
      lastUpdated: new Date().toISOString()
    },
    'Odisha': {
      overallProgress: 65,
      phases: {
        immediate: { completed: true, progress: 100 },
        shortTerm: { completed: true, progress: 80 },
        mediumTerm: { completed: false, progress: 45 },
        longTerm: { completed: false, progress: 10 }
      },
      keyMetrics: {
        homesRebuilt: 95000,
        infrastructureRestored: 70,
        economicRecovery: 55,
        communityResilience: 75
      },
      lastUpdated: new Date().toISOString()
    }
  };

  return statusData[region] || statusData['Kerala'];
};

/**
 * Get recovery tasks for a region
 * @param {string} region - The region to get recovery tasks for
 * @returns {Array} Array of recovery tasks
 */
export const getRecoveryTasks = (region) => {
  const tasks = [
    {
      id: 1,
      title: 'Temporary Shelter Construction',
      description: 'Build temporary shelters for displaced families',
      priority: 'high',
      status: 'completed',
      progress: 100,
      assignedTo: 'Construction Team A',
      estimatedCompletion: '2025-06-15',
      actualCompletion: '2025-06-10'
    },
    {
      id: 2,
      title: 'Water Supply Restoration',
      description: 'Restore clean water supply to affected areas',
      priority: 'critical',
      status: 'completed',
      progress: 100,
      assignedTo: 'Utilities Team',
      estimatedCompletion: '2025-07-20',
      actualCompletion: '2025-07-15'
    },
    {
      id: 3,
      title: 'Medical Facility Reconstruction',
      description: 'Rebuild damaged medical facilities and clinics',
      priority: 'high',
      status: 'in-progress',
      progress: 75,
      assignedTo: 'Engineering Team B',
      estimatedCompletion: '2025-12-30',
      actualCompletion: null
    },
    {
      id: 4,
      title: 'Road Infrastructure Repair',
      description: 'Repair and rebuild damaged roads and bridges',
      priority: 'medium',
      status: 'in-progress',
      progress: 60,
      assignedTo: 'Civil Engineering Team',
      estimatedCompletion: '2026-03-15',
      actualCompletion: null
    },
    {
      id: 5,
      title: 'School Reopening',
      description: 'Reconstruct and reopen schools for children',
      priority: 'high',
      status: 'in-progress',
      progress: 40,
      assignedTo: 'Education Task Force',
      estimatedCompletion: '2026-05-20',
      actualCompletion: null
    },
    {
      id: 6,
      title: 'Economic Revitalization Program',
      description: 'Implement programs to restore local economy and employment',
      priority: 'medium',
      status: 'not-started',
      progress: 0,
      assignedTo: 'Economic Development Team',
      estimatedCompletion: '2026-12-31',
      actualCompletion: null
    }
  ];

  return tasks;
};

/**
 * Get recovery funding information
 * @param {string} region - The region to get funding information for
 * @returns {Object} Funding information
 */
export const getRecoveryFunding = (region) => {
  return {
    totalAllocated: 5000000000, // 500 Crore INR
    totalDisbursed: 3200000000, // 320 Crore INR
    totalUtilized: 2950000000, // 295 Crore INR
    remaining: 1800000000, // 180 Crore INR
    fundingSources: [
      {
        source: 'Central Government',
        amount: 2500000000, // 250 Crore INR
        percentage: 50
      },
      {
        source: 'State Government',
        amount: 1500000000, // 150 Crore INR
        percentage: 30
      },
      {
        source: 'International Aid',
        amount: 750000000, // 75 Crore INR
        percentage: 15
      },
      {
        source: 'NGO Contributions',
        amount: 250000000, // 25 Crore INR
        percentage: 5
      }
    ],
    lastUpdated: new Date().toISOString()
  };
};

/**
 * Get community recovery indicators
 * @param {string} region - The region to get indicators for
 * @returns {Object} Community recovery indicators
 */
export const getCommunityIndicators = (region) => {
  return {
    populationReturn: 85, // Percentage of displaced population that has returned
    employmentRate: 72, // Percentage of pre-disaster employment levels
    healthcareAccess: 90, // Percentage of pre-disaster healthcare access
    educationContinuity: 78, // Percentage of children back in school
    mentalHealthSupport: 65, // Percentage of population with access to mental health services
    communityEngagement: 80, // Level of community participation in recovery efforts
    lastUpdated: new Date().toISOString()
  };
};

/**
 * Get recovery timeline
 * @param {string} region - The region to get timeline for
 * @returns {Array} Recovery timeline events
 */
export const getRecoveryTimeline = (region) => {
  return [
    {
      date: '2025-06-01',
      event: 'Immediate Response Phase Completed',
      description: 'All emergency response activities concluded successfully',
      milestone: true
    },
    {
      date: '2025-08-15',
      event: 'Temporary Shelters Operational',
      description: '100% of temporary shelters completed and occupied',
      milestone: true
    },
    {
      date: '2025-09-30',
      event: 'Water Supply Restored',
      description: 'Clean water supply restored to 95% of affected areas',
      milestone: true
    },
    {
      date: '2025-11-20',
      event: 'Medical Facilities Partially Operational',
      description: '75% of medical facilities reopened with temporary structures',
      milestone: false
    },
    {
      date: '2026-02-15',
      event: 'Road Network 60% Restored',
      description: 'Major roads and bridges repaired, minor roads in progress',
      milestone: false
    },
    {
      date: '2026-06-30',
      event: 'Projected: Schools Fully Operational',
      description: 'All schools reconstructed and operational',
      milestone: true
    },
    {
      date: '2027-03-31',
      event: 'Projected: Full Economic Recovery',
      description: 'Local economy restored to pre-disaster levels',
      milestone: true
    }
  ];
};