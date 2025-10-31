/**
 * Volunteer Coordinator Component
 * Provides a comprehensive interface for managing volunteers during disaster response and recovery
 * Includes volunteer matching, task assignment, communication planning, hour tracking, and shift scheduling
 */
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('volunteerCoordinator.title')}</h2>
      <p className="text-gray-600 mb-6">{t('volunteerCoordinator.description')}</p>
      
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('volunteerCoordinator.matching.title')}</h3>
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {matchedVolunteers.map((volunteer) => (
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('volunteerCoordinator.assignments.title')}</h3>
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('volunteerCoordinator.communication.title')}</h3>
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('volunteerCoordinator.tracking.title')}</h3>
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('volunteerCoordinator.scheduling.title')}</h3>
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