import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { matchVolunteersToNeeds, assignVolunteersToTasks, generateCommunicationPlan, trackVolunteerHours, scheduleVolunteerShifts } from '../utils/volunteerCoordinator';

const VolunteerCoordinator = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('matching');
  const [disasterInfo, setDisasterInfo] = useState({
    type: 'flood',
    location: { lat: 19.0760, lng: 72.8777 }, // Mumbai coordinates as default
    severity: 3
  });
  const [volunteers, setVolunteers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [volunteerHours, setVolunteerHours] = useState([]);
  const [matchedVolunteers, setMatchedVolunteers] = useState([]);
  const [taskAssignments, setTaskAssignments] = useState([]);
  const [communicationPlan, setCommunicationPlan] = useState(null);
  const [volunteerStats, setVolunteerStats] = useState(null);
  const [scheduledShifts, setScheduledShifts] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search
  const [sortBy, setSortBy] = useState('suitability'); // New state for sorting
  const [performanceMetrics, setPerformanceMetrics] = useState(null); // New state for performance metrics
  const [volunteerEngagement, setVolunteerEngagement] = useState(null); // New state for engagement metrics
  const [skillUtilization, setSkillUtilization] = useState(null); // New state for skill utilization metrics

  // Initialize sample data for demonstration purposes
  // This would typically come from an API in a real application
  useEffect(() => {
    // Sample volunteers
    const sampleVolunteers = [
      {
        id: 'v1',
        name: 'Rajesh Kumar',
        skills: ['waterRescue', 'firstAid', 'logistics'],
        location: { lat: 19.0760, lng: 72.8777 },
        experience: { disasterResponse: 5 },
        availability: { immediate: true, days: [0, 1, 2, 3, 4, 5, 6], timeRanges: [{ start: 8, end: 20 }] },
        communicationPreferences: { emergency: true, taskUpdates: true },
        contact: { phone: '9876543210', email: 'rajesh@example.com' },
        role: 'Rescue Team Leader'
      },
      {
        id: 'v2',
        name: 'Priya Sharma',
        skills: ['medical', 'firstAid', 'counseling'],
        location: { lat: 19.1500, lng: 72.8600 },
        experience: { disasterResponse: 3 },
        availability: { immediate: true, days: [0, 1, 2, 3, 4], timeRanges: [{ start: 9, end: 18 }] },
        communicationPreferences: { emergency: true, taskUpdates: false },
        contact: { phone: '9876543211', email: 'priya@example.com' },
        role: 'Medical Coordinator'
      },
      {
        id: 'v3',
        name: 'Amit Patel',
        skills: ['logistics', 'communications', 'driving'],
        location: { lat: 19.2000, lng: 72.8500 },
        experience: { disasterResponse: 2 },
        availability: { immediate: false, days: [1, 2, 3, 4, 5], timeRanges: [{ start: 10, end: 17 }] },
        communicationPreferences: { emergency: false, taskUpdates: true },
        contact: { phone: '9876543212', email: 'amit@example.com' },
        role: 'Logistics Coordinator'
      }
    ];

    // Sample tasks
    const sampleTasks = [
      {
        id: 't1',
        name: 'Water Rescue Operations',
        requiredSkills: ['waterRescue', 'firstAid'],
        requiredVolunteers: 3,
        priority: 5
      },
      {
        id: 't2',
        name: 'Medical Aid Stations',
        requiredSkills: ['medical', 'firstAid'],
        requiredVolunteers: 2,
        priority: 4
      },
      {
        id: 't3',
        name: 'Food Distribution',
        requiredSkills: ['logistics', 'communications'],
        requiredVolunteers: 4,
        priority: 3
      }
    ];

    // Sample shifts
    const sampleShifts = [
      {
        id: 's1',
        name: 'Morning Rescue Shift',
        startTime: new Date(Date.now() + 86400000).setHours(8, 0, 0, 0),
        endTime: new Date(Date.now() + 86400000).setHours(14, 0, 0, 0),
        requiredSkills: ['waterRescue'],
        requiredVolunteers: 2,
        priority: 5,
        role: 'Rescue Team'
      },
      {
        id: 's2',
        name: 'Afternoon Medical Shift',
        startTime: new Date(Date.now() + 86400000).setHours(12, 0, 0, 0),
        endTime: new Date(Date.now() + 86400000).setHours(18, 0, 0, 0),
        requiredSkills: ['medical'],
        requiredVolunteers: 2,
        priority: 4,
        role: 'Medical Team'
      }
    ];

    // Sample volunteer hours
    const sampleVolunteerHours = [
      { volunteerId: 'v1', volunteerName: 'Rajesh Kumar', hours: 15, taskName: 'Water Rescue', date: '2023-10-01' },
      { volunteerId: 'v1', volunteerName: 'Rajesh Kumar', hours: 12, taskName: 'Evacuation', date: '2023-10-02' },
      { volunteerId: 'v2', volunteerName: 'Priya Sharma', hours: 20, taskName: 'Medical Aid', date: '2023-10-01' },
      { volunteerId: 'v2', volunteerName: 'Priya Sharma', hours: 18, taskName: 'Medical Aid', date: '2023-10-02' },
      { volunteerId: 'v3', volunteerName: 'Amit Patel', hours: 10, taskName: 'Logistics', date: '2023-10-01' }
    ];

    setVolunteers(sampleVolunteers);
    setTasks(sampleTasks);
    setShifts(sampleShifts);
    setVolunteerHours(sampleVolunteerHours);
  }, []);

  // Calculate volunteer matches when disaster information or volunteer data changes
  // This updates the matchedVolunteers state with suitability scores
  useEffect(() => {
    if (volunteers.length > 0) {
      const matches = matchVolunteersToNeeds(volunteers, disasterInfo);
      setMatchedVolunteers(matches);
    }
  }, [disasterInfo, volunteers]);

  /**
   * Assign volunteers to tasks based on their skills and suitability scores
   * Also generates a communication plan for the assigned volunteers
   */
  const handleAssignVolunteers = () => {
    if (volunteers.length > 0 && tasks.length > 0) {
      const assignments = assignVolunteersToTasks(matchedVolunteers, tasks);
      setTaskAssignments(assignments);
      
      // Generate communication plan
      const commPlan = generateCommunicationPlan(matchedVolunteers, disasterInfo);
      setCommunicationPlan(commPlan);
    }
  };

  /**
   * Track volunteer hours and generate statistics for recognition
   * Calculates total hours, recognition levels, and top contributors
   */
  const handleTrackHours = () => {
    if (volunteerHours.length > 0) {
      const stats = trackVolunteerHours(volunteerHours);
      setVolunteerStats(stats);
    }
  };

  /**
   * Schedule volunteer shifts based on availability and required skills
   * Balances workload across volunteers and tracks utilization
   */
  const handleScheduleShifts = () => {
    if (volunteers.length > 0 && shifts.length > 0) {
      const scheduled = scheduleVolunteerShifts(volunteers, shifts);
      setScheduledShifts(scheduled);
    }
  };

  // Initialize all volunteer coordination functions on component mount
  // This sets up task assignments, hour tracking, and shift scheduling
  useEffect(() => {
    handleAssignVolunteers();
    handleTrackHours();
    handleScheduleShifts();
  }, [volunteers, tasks, shifts, volunteerHours]);

  const disasterTypes = [
    { value: 'flood', label: t('disasterTypes.flood') },
    { value: 'earthquake', label: t('disasterTypes.earthquake') },
    { value: 'cyclone', label: t('disasterTypes.cyclone') },
    { value: 'drought', label: t('disasterTypes.drought') },
    { value: 'landslide', label: t('disasterTypes.landslide') }
  ];

  // Filter and sort volunteers based on search and sort criteria
  const filteredAndSortedVolunteers = matchedVolunteers
    .filter(volunteer => 
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.matchedSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'suitability') {
        return b.suitabilityScore - a.suitabilityScore;
      } else if (sortBy === 'distance') {
        return a.distanceFromDisaster - b.distanceFromDisaster;
      } else if (sortBy === 'experience') {
        return (b.experience?.disasterResponse || 0) - (a.experience?.disasterResponse || 0);
      }
      return 0;
    });

  // Calculate performance metrics
  useEffect(() => {
    if (volunteers.length > 0 && taskAssignments.length > 0) {
      // Calculate volunteer utilization rate
      const assignedVolunteers = new Set(taskAssignments.map(a => a.volunteerId));
      const utilizationRate = (assignedVolunteers.size / volunteers.length) * 100;
      
      // Calculate average suitability score of assigned volunteers
      const assignedVolunteerScores = taskAssignments.map(assignment => {
        const volunteer = matchedVolunteers.find(v => v.id === assignment.volunteerId);
        return volunteer ? volunteer.suitabilityScore : 0;
      });
      const avgSuitabilityScore = assignedVolunteerScores.length > 0 
        ? assignedVolunteerScores.reduce((sum, score) => sum + score, 0) / assignedVolunteerScores.length 
        : 0;
      
      // Calculate shift coverage
      const shiftCoverage = scheduledShifts 
        ? (scheduledShifts.filledShifts / scheduledShifts.totalShifts) * 100 
        : 0;
      
      // Calculate volunteer engagement metrics
      const totalVolunteerHours = volunteerHours.reduce((sum, record) => sum + record.hours, 0);
      const avgHoursPerVolunteer = totalVolunteerHours / volunteers.length;
      
      // Calculate skill utilization
      const allRequiredSkills = tasks.flatMap(task => task.requiredSkills);
      const allVolunteerSkills = volunteers.flatMap(volunteer => volunteer.skills);
      const skillMatchCount = allVolunteerSkills.filter(skill => allRequiredSkills.includes(skill)).length;
      const skillUtilizationRate = allRequiredSkills.length > 0 
        ? (skillMatchCount / allRequiredSkills.length) * 100 
        : 0;
      
      setPerformanceMetrics({
        utilizationRate: Math.round(utilizationRate),
        avgSuitabilityScore: Math.round(avgSuitabilityScore),
        shiftCoverage: Math.round(shiftCoverage),
        totalVolunteers: volunteers.length,
        assignedVolunteers: assignedVolunteers.size,
        totalVolunteerHours,
        avgHoursPerVolunteer: Math.round(avgHoursPerVolunteer * 10) / 10,
        skillUtilizationRate: Math.round(skillUtilizationRate)
      });
      
      // Calculate volunteer engagement metrics
      const engagementMetrics = {
        totalVolunteers: volunteers.length,
        activeVolunteers: assignedVolunteers.size,
        inactiveVolunteers: volunteers.length - assignedVolunteers.size,
        avgEngagementScore: Math.round(avgSuitabilityScore),
        highEngagementVolunteers: matchedVolunteers.filter(v => v.suitabilityScore >= 80).length,
        mediumEngagementVolunteers: matchedVolunteers.filter(v => v.suitabilityScore >= 50 && v.suitabilityScore < 80).length,
        lowEngagementVolunteers: matchedVolunteers.filter(v => v.suitabilityScore < 50).length
      };
      
      setVolunteerEngagement(engagementMetrics);
      
      // Calculate skill utilization metrics
      const skillCounts = {};
      allVolunteerSkills.forEach(skill => {
        skillCounts[skill] = (skillCounts[skill] || 0) + 1;
      });
      
      const requiredSkillCounts = {};
      allRequiredSkills.forEach(skill => {
        requiredSkillCounts[skill] = (requiredSkillCounts[skill] || 0) + 1;
      });
      
      const skillUtilizationData = Object.keys(requiredSkillCounts).map(skill => ({
        skill,
        required: requiredSkillCounts[skill],
        available: skillCounts[skill] || 0,
        utilization: requiredSkillCounts[skill] > 0 
          ? Math.round(((skillCounts[skill] || 0) / requiredSkillCounts[skill]) * 100)
          : 0
      }));
      
      setSkillUtilization(skillUtilizationData);
    }
  }, [volunteers, taskAssignments, matchedVolunteers, scheduledShifts, volunteerHours]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('volunteerCoordinator.title')}</h2>
      <p className="text-gray-600 mb-6">{t('volunteerCoordinator.description')}</p>
      
      {/* Performance Metrics Dashboard */}
      {performanceMetrics && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('volunteerCoordinator.performance.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">{performanceMetrics.utilizationRate}%</div>
              <div className="text-sm text-blue-600">{t('volunteerCoordinator.performance.utilization')}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-700">{performanceMetrics.avgSuitabilityScore}%</div>
              <div className="text-sm text-green-600">{t('volunteerCoordinator.performance.avgSuitability')}</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-700">{performanceMetrics.shiftCoverage}%</div>
              <div className="text-sm text-yellow-600">{t('volunteerCoordinator.performance.shiftCoverage')}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">
                {performanceMetrics.assignedVolunteers}/{performanceMetrics.totalVolunteers}
              </div>
              <div className="text-sm text-purple-600">{t('volunteerCoordinator.performance.assigned')}</div>
            </div>
          </div>
          
          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-indigo-700">{performanceMetrics.totalVolunteerHours}h</div>
              <div className="text-sm text-indigo-600">{t('volunteerCoordinator.totalHours')}</div>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-pink-700">{performanceMetrics.skillUtilizationRate}%</div>
              <div className="text-sm text-pink-600">{t('volunteerCoordinator.skillUtilization')}</div>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-teal-700">{performanceMetrics.avgHoursPerVolunteer}h</div>
              <div className="text-sm text-teal-600">{t('volunteerCoordinator.avgHoursPerVolunteer')}</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Volunteer Engagement Dashboard */}
      {volunteerEngagement && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('volunteerCoordinator.engagement.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">{volunteerEngagement.totalVolunteers}</div>
              <div className="text-sm text-blue-600">{t('volunteerCoordinator.totalVolunteers')}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-700">{volunteerEngagement.activeVolunteers}</div>
              <div className="text-sm text-green-600">{t('volunteerCoordinator.engagement.active')}</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-700">{volunteerEngagement.inactiveVolunteers}</div>
              <div className="text-sm text-yellow-600">{t('volunteerCoordinator.engagement.inactive')}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">{volunteerEngagement.avgEngagementScore}%</div>
              <div className="text-sm text-purple-600">{t('volunteerCoordinator.engagement.averageScore')}</div>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-pink-700">{volunteerEngagement.highEngagementVolunteers}</div>
              <div className="text-sm text-pink-600">{t('volunteerCoordinator.engagement.high')}</div>
            </div>
          </div>
          
          {/* Engagement Distribution Chart */}
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-3">{t('volunteerCoordinator.engagement.distribution')}</h4>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-green-500 h-4 rounded-full" 
                  style={{ width: `${(volunteerEngagement.highEngagementVolunteers / volunteerEngagement.totalVolunteers) * 100}%` }}
                  title={`${volunteerEngagement.highEngagementVolunteers} High Engagement`}
                ></div>
                <div 
                  className="bg-yellow-500 h-4 rounded-full" 
                  style={{ width: `${(volunteerEngagement.mediumEngagementVolunteers / volunteerEngagement.totalVolunteers) * 100}%` }}
                  title={`${volunteerEngagement.mediumEngagementVolunteers} Medium Engagement`}
                ></div>
                <div 
                  className="bg-red-500 h-4 rounded-full" 
                  style={{ width: `${(volunteerEngagement.lowEngagementVolunteers / volunteerEngagement.totalVolunteers) * 100}%` }}
                  title={`${volunteerEngagement.lowEngagementVolunteers} Low Engagement`}
                ></div>
              </div>
              <div className="ml-4 flex space-x-4 text-sm">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                  {t('volunteerCoordinator.engagement.high')}
                </span>
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                  {t('volunteerCoordinator.engagement.medium')}
                </span>
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                  {t('volunteerCoordinator.engagement.low')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Skill Utilization Dashboard */}
      {skillUtilization && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('volunteerCoordinator.skillUtilizationTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillUtilization.map((skillData, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">{skillData.skill}</h4>
                  <span className="text-sm font-medium text-gray-700">{skillData.utilization}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${Math.min(skillData.utilization, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {skillData.available}/{skillData.required} {t('volunteerCoordinator.skillAvailability')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('matching')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'matching'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('volunteerCoordinator.tabs.matching')}
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'assignments'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('volunteerCoordinator.tabs.assignments')}
          </button>
          <button
            onClick={() => setActiveTab('communication')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'communication'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('volunteerCoordinator.tabs.communication')}
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tracking'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('volunteerCoordinator.tabs.tracking')}
          </button>
          <button
            onClick={() => setActiveTab('scheduling')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'scheduling'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('volunteerCoordinator.tabs.scheduling')}
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {/* Disaster Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('volunteerCoordinator.disasterType')}
            </label>
            <select
              value={disasterInfo.type}
              onChange={(e) => setDisasterInfo({...disasterInfo, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              {disasterTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('volunteerCoordinator.latitude')}
            </label>
            <input
              type="number"
              step="0.0001"
              value={disasterInfo.location.lat}
              onChange={(e) => setDisasterInfo({
                ...disasterInfo, 
                location: {...disasterInfo.location, lat: parseFloat(e.target.value)}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('volunteerCoordinator.longitude')}
            </label>
            <input
              type="number"
              step="0.0001"
              value={disasterInfo.location.lng}
              onChange={(e) => setDisasterInfo({
                ...disasterInfo, 
                location: {...disasterInfo.location, lng: parseFloat(e.target.value)}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Matching Tab */}
        {activeTab === 'matching' && (
          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">{t('volunteerCoordinator.matching.title')}</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('volunteerCoordinator.search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="suitability">{t('volunteerCoordinator.sort.suitability')}</option>
                  <option value="distance">{t('volunteerCoordinator.sort.distance')}</option>
                  <option value="experience">{t('volunteerCoordinator.sort.experience')}</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('volunteerCoordinator.volunteer')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('volunteerCoordinator.skills')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('volunteerCoordinator.distance')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('volunteerCoordinator.suitability')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('volunteerCoordinator.experience')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedVolunteers.map((volunteer) => (
                    <tr key={volunteer.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{volunteer.name}</div>
                        <div className="text-sm text-gray-500">{volunteer.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {volunteer.matchedSkills.join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {volunteer.distanceFromDisaster} km
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${Math.min(volunteer.suitabilityScore, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {volunteer.suitabilityScore}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {volunteer.experience?.disasterResponse || 0} {t('volunteerCoordinator.years')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{t('volunteerCoordinator.assignments.title')}</h3>
              <button
                onClick={handleAssignVolunteers}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('volunteerCoordinator.reassign')}
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-3">{t('volunteerCoordinator.tasks')}</h4>
                <div className="space-y-3">
                  {tasks.map(task => (
                    <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between">
                        <h5 className="font-medium text-gray-900">{task.name}</h5>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {t('volunteerCoordinator.priority')}: {task.priority}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        {t('volunteerCoordinator.requiredSkills')}: {task.requiredSkills.join(', ')}
                      </div>
                      <div className="mt-2 text-sm">
                        {t('volunteerCoordinator.requiredVolunteers')}: {task.requiredVolunteers}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-3">{t('volunteerCoordinator.assignments')}</h4>
                <div className="space-y-3">
                  {taskAssignments.map(assignment => (
                    <div key={`${assignment.taskId}-${assignment.volunteerId}`} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between">
                        <h5 className="font-medium text-gray-900">{assignment.taskName}</h5>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        {t('volunteerCoordinator.assignedTo')}: {assignment.volunteerName}
                      </div>
                      <div className="mt-1 text-xs text-gray-400">
                        {t('volunteerCoordinator.assignedAt')}: {new Date(assignment.assignedAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Communication Tab */}
        {activeTab === 'communication' && communicationPlan && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{t('volunteerCoordinator.communication.title')}</h3>
              <button
                onClick={() => generateCommunicationPlan(matchedVolunteers, disasterInfo)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('volunteerCoordinator.regenerate')}
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-3">{t('volunteerCoordinator.communication.channels')}</h4>
                <div className="space-y-4">
                  {Object.entries(communicationPlan.channels).map(([key, channel]) => (
                    <div key={key} className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900">{channel.name}</h5>
                      <p className="text-sm text-gray-500 mt-1">{channel.description}</p>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">{t('volunteerCoordinator.frequency')}:</span> {channel.frequency}
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">{t('volunteerCoordinator.volunteers')}: </span>
                        {channel.volunteers.length}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-3">{t('volunteerCoordinator.contactList')}</h4>
                <div className="border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <div className="space-y-3">
                    {communicationPlan.contactList.map(contact => (
                      <div key={contact.id} className="flex justify-between items-center p-2 hover:bg-gray-50">
                        <div>
                          <div className="font-medium text-gray-900">{contact.name}</div>
                          <div className="text-sm text-gray-500">{contact.role}</div>
                        </div>
                        <div className="text-right text-sm">
                          <div>{contact.phone}</div>
                          <div className="text-gray-500">{contact.email}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tracking Tab */}
        {activeTab === 'tracking' && volunteerStats && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{t('volunteerCoordinator.tracking.title')}</h3>
              <button
                onClick={handleTrackHours}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('volunteerCoordinator.refresh')}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">{volunteerStats.totalVolunteers}</div>
                <div className="text-sm text-blue-600">{t('volunteerCoordinator.totalVolunteers')}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-700">{volunteerStats.totalVolunteerHours}</div>
                <div className="text-sm text-green-600">{t('volunteerCoordinator.totalHours')}</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-700">{volunteerStats.topContributors.length}</div>
                <div className="text-sm text-yellow-600">{t('volunteerCoordinator.topContributors')}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-700">
                  {volunteerStats.recognitionDistribution.gold + volunteerStats.recognitionDistribution.platinum}
                </div>
                <div className="text-sm text-purple-600">{t('volunteerCoordinator.recognitionAwards')}</div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">{t('volunteerCoordinator.recognitionDistribution')}</h4>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-yellow-500 h-4 rounded-full" 
                    style={{ width: `${(volunteerStats.recognitionDistribution.bronze / volunteerStats.totalVolunteers) * 100}%` }}
                    title={`${volunteerStats.recognitionDistribution.bronze} Bronze`}
                  ></div>
                  <div 
                    className="bg-gray-400 h-4 rounded-full" 
                    style={{ width: `${(volunteerStats.recognitionDistribution.silver / volunteerStats.totalVolunteers) * 100}%` }}
                    title={`${volunteerStats.recognitionDistribution.silver} Silver`}
                  ></div>
                  <div 
                    className="bg-yellow-300 h-4 rounded-full" 
                    style={{ width: `${(volunteerStats.recognitionDistribution.gold / volunteerStats.totalVolunteers) * 100}%` }}
                    title={`${volunteerStats.recognitionDistribution.gold} Gold`}
                  ></div>
                  <div 
                    className="bg-yellow-700 h-4 rounded-full" 
                    style={{ width: `${(volunteerStats.recognitionDistribution.platinum / volunteerStats.totalVolunteers) * 100}%` }}
                    title={`${volunteerStats.recognitionDistribution.platinum} Platinum`}
                  ></div>
                </div>
                <div className="ml-4 flex space-x-4 text-sm">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                    {t('volunteerCoordinator.bronze')}
                  </span>
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-gray-400 rounded-full mr-1"></span>
                    {t('volunteerCoordinator.silver')}
                  </span>
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-300 rounded-full mr-1"></span>
                    {t('volunteerCoordinator.gold')}
                  </span>
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-700 rounded-full mr-1"></span>
                    {t('volunteerCoordinator.platinum')}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-3">{t('volunteerCoordinator.topContributors')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {volunteerStats.topContributors.map((volunteer, index) => (
                  <div key={volunteer.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between">
                      <h5 className="font-medium text-gray-900">#{index + 1} {volunteer.name}</h5>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {volunteer.totalHours} {t('volunteerCoordinator.hours')}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      {t('volunteerCoordinator.recognitionLevel')}: {t(`volunteerCoordinator.${volunteer.recognitionLevel}`)}
                    </div>
                    <div className="mt-2 text-sm">
                      {t('volunteerCoordinator.tasks')}: {volunteer.tasks.length}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scheduling Tab */}
        {activeTab === 'scheduling' && scheduledShifts && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{t('volunteerCoordinator.scheduling.title')}</h3>
              <button
                onClick={handleScheduleShifts}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('volunteerCoordinator.reschedule')}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">{scheduledShifts.totalShifts}</div>
                <div className="text-sm text-blue-600">{t('volunteerCoordinator.totalShifts')}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-700">{scheduledShifts.filledShifts}</div>
                <div className="text-sm text-green-600">{t('volunteerCoordinator.filledShifts')}</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-700">
                  {Math.round((scheduledShifts.filledShifts / scheduledShifts.totalShifts) * 100)}%
                </div>
                <div className="text-sm text-yellow-600">{t('volunteerCoordinator.coverage')}</div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('volunteerCoordinator.shift')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('volunteerCoordinator.volunteer')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('volunteerCoordinator.time')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('volunteerCoordinator.duration')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {scheduledShifts.scheduledShifts.map((shift) => (
                    <tr key={`${shift.shiftId}-${shift.volunteerId}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{shift.shiftName}</div>
                        <div className="text-sm text-gray-500">{shift.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {shift.volunteerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(shift.startTime).toLocaleString()} - {new Date(shift.endTime).toLocaleTimeString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shift.durationHours} {t('volunteerCoordinator.hours')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-gray-700 mb-3">{t('volunteerCoordinator.volunteerUtilization')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {scheduledShifts.volunteerUtilization.map(volunteer => (
                  <div key={volunteer.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between">
                      <h5 className="font-medium text-gray-900">{volunteer.name}</h5>
                      <span className="text-sm font-medium text-gray-900">{volunteer.assignedHours}h</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t('volunteerCoordinator.utilization')}</span>
                        <span>{volunteer.utilization}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${Math.min(volunteer.utilization, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerCoordinator;