import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const VolunteerCoordination = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Mock volunteer data
  const volunteers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      skills: ['First Aid', 'Search and Rescue', 'Translation'],
      availability: 'Weekends',
      location: 'Delhi',
      rating: 4.8,
      completedTasks: 12,
      hoursContributed: 48
    },
    {
      id: 2,
      name: 'Priya Sharma',
      skills: ['Medical', 'Counseling', 'Logistics'],
      availability: 'Evenings',
      location: 'Mumbai',
      rating: 4.9,
      completedTasks: 18,
      hoursContributed: 72
    },
    {
      id: 3,
      name: 'Amit Patel',
      skills: ['Drone Operation', 'Mapping', 'Communication'],
      availability: 'Flexible',
      location: 'Ahmedabad',
      rating: 4.7,
      completedTasks: 9,
      hoursContributed: 36
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      skills: ['Teaching', 'Community Outreach', 'Translation'],
      availability: 'Weekdays',
      location: 'Hyderabad',
      rating: 4.6,
      completedTasks: 15,
      hoursContributed: 60
    }
  ];

  // Mock tasks data
  const tasks = [
    {
      id: 1,
      title: 'Flood Relief Distribution',
      description: 'Help distribute relief materials to flood-affected families in Kerala',
      location: 'Kerala',
      requiredSkills: ['Logistics', 'Communication'],
      urgency: 'High',
      status: 'Open',
      volunteersNeeded: 5,
      volunteersAssigned: 3,
      startDate: '2023-07-01',
      endDate: '2023-07-05'
    },
    {
      id: 2,
      title: 'Medical Camp Setup',
      description: 'Assist in setting up and running a medical camp in rural Assam',
      location: 'Assam',
      requiredSkills: ['Medical', 'Setup'],
      urgency: 'Medium',
      status: 'In Progress',
      volunteersNeeded: 8,
      volunteersAssigned: 6,
      startDate: '2023-06-25',
      endDate: '2023-07-10'
    },
    {
      id: 3,
      title: 'Community Preparedness Training',
      description: 'Conduct disaster preparedness training sessions for local communities',
      location: 'Odisha',
      requiredSkills: ['Teaching', 'Communication'],
      urgency: 'Low',
      status: 'Completed',
      volunteersNeeded: 4,
      volunteersAssigned: 4,
      startDate: '2023-06-10',
      endDate: '2023-06-20'
    },
    {
      id: 4,
      title: 'Drone Survey for Damage Assessment',
      description: 'Operate drones to survey flood damage in remote areas of Bihar',
      location: 'Bihar',
      requiredSkills: ['Drone Operation', 'Mapping'],
      urgency: 'High',
      status: 'Open',
      volunteersNeeded: 2,
      volunteersAssigned: 0,
      startDate: '2023-07-02',
      endDate: '2023-07-04'
    }
  ];

  // Mock messages
  const messages = [
    {
      id: 1,
      sender: 'Coordinator Team',
      subject: 'Urgent: Additional volunteers needed for Kerala flood response',
      content: 'We need 3 more volunteers with logistics experience for the Kerala flood relief distribution scheduled for July 1-5.',
      timestamp: '2023-06-20T09:30:00Z',
      unread: true
    },
    {
      id: 2,
      sender: 'Dr. Priya Sharma',
      subject: 'Medical camp schedule confirmation',
      content: 'Confirming my availability for the Assam medical camp from June 25-July 10. Looking forward to working with the team.',
      timestamp: '2023-06-19T14:15:00Z',
      unread: false
    },
    {
      id: 3,
      sender: 'Rajesh Kumar',
      subject: 'Task completion report - Community training',
      content: 'The community preparedness training in Odisha has been successfully completed. All participants received certificates.',
      timestamp: '2023-06-21T11:45:00Z',
      unread: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('volunteerCoordination.title')}</h1>
          <p className="mt-2 text-gray-600">{t('volunteerCoordination.description')}</p>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex space-x-3">
            <button
              onClick={() => setShowTaskForm(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {t('volunteerCoordination.createTask')}
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              {t('volunteerCoordination.volunteerSignup')}
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder={t('volunteerCoordination.searchTasks')}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('volunteerCoordination.dashboard')}
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tasks'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('volunteerCoordination.tasks')}
            </button>
            <button
              onClick={() => setActiveTab('volunteers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'volunteers'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('volunteerCoordination.volunteers')}
            </button>
            <button
              onClick={() => setActiveTab('messaging')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'messaging'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('volunteerCoordination.messaging')}
            </button>
            <button
              onClick={() => setActiveTab('scheduling')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'scheduling'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('volunteerCoordination.scheduling')}
            </button>
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats Cards */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">{t('volunteerCoordination.totalVolunteers')}</h3>
                    <p className="text-2xl font-semibold text-gray-900">1,247</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">{t('volunteerCoordination.activeTasks')}</h3>
                    <p className="text-2xl font-semibold text-gray-900">24</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">{t('volunteerCoordination.volunteerHours')}</h3>
                    <p className="text-2xl font-semibold text-gray-900">8,450</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">{t('volunteerCoordination.completedTasks')}</h3>
                    <p className="text-2xl font-semibold text-gray-900">156</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('volunteerCoordination.recentActivity')}</h2>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">Rajesh Kumar</span> completed the flood relief distribution task
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">Priya Sharma</span> was assigned to the medical camp setup task
                    </p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">
                      New task created: <span className="font-medium text-gray-900">Drone Survey for Damage Assessment</span>
                    </p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-purple-500 mt-2"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">Amit Patel</span> updated availability to flexible
                    </p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-indigo-500 mt-2"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">Sneha Reddy</span> completed community training session
                    </p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Upcoming Tasks */}
            <div className="lg:col-span-3 bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{t('volunteerCoordination.upcomingTasks')}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('volunteerCoordination.task')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('volunteerCoordination.location')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('volunteerCoordination.startDate')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('volunteerCoordination.volunteers')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('volunteerCoordination.status')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.filter(task => task.status !== 'Completed').map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedTask(task)}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{task.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{task.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {task.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {task.startDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {task.volunteersAssigned}/{task.volunteersNeeded}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            task.urgency === 'High' 
                              ? 'bg-red-100 text-red-800' 
                              : task.urgency === 'Medium' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {task.urgency}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{t('volunteerCoordination.allTasks')}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('volunteerCoordination.task')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('volunteerCoordination.location')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('volunteerCoordination.requiredSkills')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('volunteerCoordination.startDate')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('volunteerCoordination.volunteers')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('volunteerCoordination.status')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('volunteerCoordination.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{task.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {task.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {task.requiredSkills.map((skill, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {task.startDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {task.volunteersAssigned}/{task.volunteersNeeded}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          task.status === 'Open' 
                            ? 'bg-green-100 text-green-800' 
                            : task.status === 'In Progress' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => setSelectedTask(task)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {t('volunteerCoordination.viewDetails')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Volunteers Tab */}
        {activeTab === 'volunteers' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{t('volunteerCoordination.volunteerDirectory')}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('volunteerCoordination.volunteer')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('volunteerCoordination.skills')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('volunteerCoordination.availability')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('volunteerCoordination.location')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('volunteerCoordination.rating')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {volunteers.map((volunteer) => (
                      <tr key={volunteer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-indigo-800 font-medium">
                                {volunteer.name.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{volunteer.name}</div>
                              <div className="text-sm text-gray-500">{volunteer.completedTasks} {t('volunteerCoordination.tasksCompleted')}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {volunteer.skills.slice(0, 2).map((skill, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                {skill}
                              </span>
                            ))}
                            {volunteer.skills.length > 2 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                +{volunteer.skills.length - 2} {t('volunteerCoordination.more')}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {volunteer.availability}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {volunteer.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 text-sm text-gray-900">{volunteer.rating}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('volunteerCoordination.skillDistribution')}</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">First Aid</span>
                      <span className="text-sm font-medium text-gray-700">24%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Medical</span>
                      <span className="text-sm font-medium text-gray-700">18%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Logistics</span>
                      <span className="text-sm font-medium text-gray-700">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Communication</span>
                      <span className="text-sm font-medium text-gray-700">12%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('volunteerCoordination.geographicDistribution')}</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-100 p-2 rounded-full">
                      <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Delhi</p>
                      <p className="text-sm text-gray-500">142 volunteers</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Mumbai</p>
                      <p className="text-sm text-gray-500">98 volunteers</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                      <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Bangalore</p>
                      <p className="text-sm text-gray-500">87 volunteers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messaging Tab */}
        {activeTab === 'messaging' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{t('volunteerCoordination.conversations')}</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-indigo-50 rounded-lg cursor-pointer">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-800 font-medium">CT</span>
                    </div>
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Coordinator Team</p>
                    <p className="text-sm text-gray-500 truncate">Urgent: Additional volunteers...</p>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500">
                      <span className="text-xs font-medium text-white">1</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-800 font-medium">PS</span>
                    </div>
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Dr. Priya Sharma</p>
                    <p className="text-sm text-gray-500 truncate">Medical camp schedule...</p>
                  </div>
                </div>
                <div className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-800 font-medium">RK</span>
                    </div>
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Rajesh Kumar</p>
                    <p className="text-sm text-gray-500 truncate">Task completion report...</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3 bg-white rounded-lg shadow flex flex-col">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-800 font-medium">CT</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Coordinator Team</h3>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-100">
                      <p className="text-sm text-gray-700">Urgent: Additional volunteers needed for Kerala flood response. We need 3 more volunteers with logistics experience for the Kerala flood relief distribution scheduled for July 1-5.</p>
                      <p className="mt-1 text-xs text-gray-500">9:30 AM</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-indigo-100">
                      <p className="text-sm text-gray-700">I'm available for this task. I have logistics experience and can start immediately.</p>
                      <p className="mt-1 text-xs text-gray-500">9:35 AM</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-100">
                      <p className="text-sm text-gray-700">Great! Please coordinate with Rajesh Kumar who is leading this effort. He'll provide you with the details.</p>
                      <p className="mt-1 text-xs text-gray-500">9:40 AM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder={t('volunteerCoordination.typeMessage')}
                  />
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {t('volunteerCoordination.send')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scheduling Tab */}
        {activeTab === 'scheduling' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('volunteerCoordination.schedule')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <div key={day} className="border border-gray-200 rounded-lg">
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">{day}</h3>
                  </div>
                  <div className="p-2 space-y-2">
                    {index === 1 && (
                      <div className="p-2 bg-indigo-100 rounded text-xs">
                        <div className="font-medium text-indigo-800">Flood Relief</div>
                        <div className="text-indigo-600">10:00 AM</div>
                      </div>
                    )}
                    {index === 3 && (
                      <div className="p-2 bg-green-100 rounded text-xs">
                        <div className="font-medium text-green-800">Medical Camp</div>
                        <div className="text-green-600">2:00 PM</div>
                      </div>
                    )}
                    {index === 5 && (
                      <div className="p-2 bg-blue-100 rounded text-xs">
                        <div className="font-medium text-blue-800">Training</div>
                        <div className="text-blue-600">4:00 PM</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{t('volunteerCoordination.availability')}</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('volunteerCoordination.selectDays')}
                  </label>
                  <div className="mt-2 grid grid-cols-7 gap-3">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                      <div key={day} className="flex items-center">
                        <input
                          id={`day-${index}`}
                          name="days"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`day-${index}`} className="ml-2 block text-sm text-gray-900">
                          {day}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('volunteerCoordination.selectTime')}
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="start-time" className="block text-sm text-gray-700">
                        {t('volunteerCoordination.startTime')}
                      </label>
                      <select
                        id="start-time"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>9:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                        <option>1:00 PM</option>
                        <option>2:00 PM</option>
                        <option>3:00 PM</option>
                        <option>4:00 PM</option>
                        <option>5:00 PM</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="end-time" className="block text-sm text-gray-700">
                        {t('volunteerCoordination.endTime')}
                      </label>
                      <select
                        id="end-time"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                        <option>1:00 PM</option>
                        <option>2:00 PM</option>
                        <option>3:00 PM</option>
                        <option>4:00 PM</option>
                        <option>5:00 PM</option>
                        <option>6:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {t('volunteerCoordination.updateAvailability')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{selectedTask.title}</h3>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{t('volunteerCoordination.taskDetails')}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('volunteerCoordination.description')}:</span>
                      <span className="font-medium text-right">{selectedTask.description}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('volunteerCoordination.location')}:</span>
                      <span className="font-medium">{selectedTask.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('volunteerCoordination.startDate')}:</span>
                      <span className="font-medium">{selectedTask.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('volunteerCoordination.endDate')}:</span>
                      <span className="font-medium">{selectedTask.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('volunteerCoordination.status')}:</span>
                      <span className="font-medium">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          selectedTask.status === 'Open' 
                            ? 'bg-green-100 text-green-800' 
                            : selectedTask.status === 'In Progress' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedTask.status}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('volunteerCoordination.urgency')}:</span>
                      <span className="font-medium">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          selectedTask.urgency === 'High' 
                            ? 'bg-red-100 text-red-800' 
                            : selectedTask.urgency === 'Medium' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {selectedTask.urgency}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{t('volunteerCoordination.requiredSkills')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.requiredSkills.map((skill, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{t('volunteerCoordination.volunteerAssignment')}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      {selectedTask.volunteersAssigned} {t('volunteerCoordination.of')} {selectedTask.volunteersNeeded} {t('volunteerCoordination.volunteersAssigned')}
                    </span>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${(selectedTask.volunteersAssigned / selectedTask.volunteersNeeded) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                      {t('volunteerCoordination.assignVolunteers')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{t('volunteerCoordination.createTask')}</h3>
                <button
                  onClick={() => setShowTaskForm(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="task-title" className="block text-sm font-medium text-gray-700">
                    {t('volunteerCoordination.taskTitle')}
                  </label>
                  <input
                    type="text"
                    id="task-title"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={t('volunteerCoordination.enterTaskTitle')}
                  />
                </div>
                
                <div>
                  <label htmlFor="task-description" className="block text-sm font-medium text-gray-700">
                    {t('volunteerCoordination.description')}
                  </label>
                  <textarea
                    id="task-description"
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={t('volunteerCoordination.enterDescription')}
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="task-location" className="block text-sm font-medium text-gray-700">
                      {t('volunteerCoordination.location')}
                    </label>
                    <input
                      type="text"
                      id="task-location"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder={t('volunteerCoordination.enterLocation')}
                    />
                  </div>
                  <div>
                    <label htmlFor="task-urgency" className="block text-sm font-medium text-gray-700">
                      {t('volunteerCoordination.urgency')}
                    </label>
                    <select
                      id="task-urgency"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="Low">{t('volunteerCoordination.low')}</option>
                      <option value="Medium">{t('volunteerCoordination.medium')}</option>
                      <option value="High">{t('volunteerCoordination.high')}</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="task-start-date" className="block text-sm font-medium text-gray-700">
                      {t('volunteerCoordination.startDate')}
                    </label>
                    <input
                      type="date"
                      id="task-start-date"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="task-end-date" className="block text-sm font-medium text-gray-700">
                      {t('volunteerCoordination.endDate')}
                    </label>
                    <input
                      type="date"
                      id="task-end-date"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="task-volunteers" className="block text-sm font-medium text-gray-700">
                    {t('volunteerCoordination.volunteersNeeded')}
                  </label>
                  <input
                    type="number"
                    id="task-volunteers"
                    min="1"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="5"
                  />
                </div>
                
                <div>
                  <label htmlFor="task-skills" className="block text-sm font-medium text-gray-700">
                    {t('volunteerCoordination.requiredSkills')}
                  </label>
                  <input
                    type="text"
                    id="task-skills"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={t('volunteerCoordination.enterSkills')}
                  />
                  <p className="mt-1 text-sm text-gray-500">{t('volunteerCoordination.skillsHelp')}</p>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowTaskForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {t('volunteerCoordination.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    {t('volunteerCoordination.createTask')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerCoordination;