import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CommunityPortal = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('discussions');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Mock community posts
  const communityPosts = [
    {
      id: 1,
      title: 'Best practices for flood preparedness in Kerala',
      author: 'Dr. Priya Sharma',
      role: 'Disaster Management Expert',
      content: 'Based on my experience working in flood-prone areas of Kerala, I\'d like to share some key preparedness strategies that have proven effective...',
      tags: ['Floods', 'Kerala', 'Preparedness'],
      likes: 24,
      comments: 8,
      timestamp: '2023-06-15T14:30:00Z',
      category: 'Discussion'
    },
    {
      id: 2,
      title: 'New volunteer training program starting next month',
      author: 'Rajesh Kumar',
      role: 'Volunteer Coordinator',
      content: 'We\'re excited to announce a new comprehensive training program for volunteers starting July 1st. This program will cover first aid, emergency response, and community engagement...',
      tags: ['Volunteers', 'Training', 'Announcement'],
      likes: 42,
      comments: 15,
      timestamp: '2023-06-14T09:15:00Z',
      category: 'Announcement'
    },
    {
      id: 3,
      title: 'Request for drone operators in Assam flood response',
      author: 'Helping Hands Foundation',
      role: 'NGO Coordinator',
      content: 'We\'re currently responding to severe flooding in Assam and need volunteer drone operators to help with damage assessment and rescue operations...',
      tags: ['Assam', 'Drones', 'Volunteers Needed'],
      likes: 18,
      comments: 12,
      timestamp: '2023-06-13T16:45:00Z',
      category: 'Request'
    },
    {
      id: 4,
      title: 'Success story: Community-led disaster resilience in Odisha',
      author: 'Community Resilience Network',
      role: 'Community Leader',
      content: 'I\'m proud to share how our community in Odisha successfully implemented a disaster resilience program that helped us minimize damage during the recent cyclone season...',
      tags: ['Odisha', 'Success Story', 'Community'],
      likes: 56,
      comments: 22,
      timestamp: '2023-06-12T11:20:00Z',
      category: 'Success Story'
    }
  ];

  // Mock leaderboard data
  const leaderboard = [
    {
      id: 1,
      name: 'Helping Hands Foundation',
      type: 'NGO',
      verifiedProjects: 12,
      volunteers: 142,
      impact: '5,200 people helped'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      type: 'Volunteer',
      verifiedProjects: 8,
      volunteers: 0,
      impact: '1,800 hours contributed'
    },
    {
      id: 3,
      name: 'Disaster Response Team',
      type: 'NGO',
      verifiedProjects: 7,
      volunteers: 89,
      impact: '3,400 people helped'
    },
    {
      id: 4,
      name: 'Priya Sharma',
      type: 'Volunteer',
      verifiedProjects: 6,
      volunteers: 0,
      impact: '1,200 hours contributed'
    },
    {
      id: 5,
      name: 'Community Resilience Network',
      type: 'NGO',
      verifiedProjects: 5,
      volunteers: 67,
      impact: '2,100 people helped'
    }
  ];

  // Mock events
  const events = [
    {
      id: 1,
      title: 'Disaster Response Workshop',
      date: '2023-07-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Online',
      description: 'Comprehensive workshop on disaster response techniques and coordination strategies',
      attendees: 120,
      type: 'Workshop'
    },
    {
      id: 2,
      title: 'Volunteer Orientation Session',
      date: '2023-07-20',
      time: '2:00 PM - 5:00 PM',
      location: 'Delhi Community Center',
      description: 'Orientation for new volunteers joining our disaster response network',
      attendees: 45,
      type: 'Orientation'
    },
    {
      id: 3,
      title: 'Monthly Community Call',
      date: '2023-07-25',
      time: '6:00 PM - 7:30 PM',
      location: 'Online',
      description: 'Monthly community call to discuss ongoing projects and upcoming initiatives',
      attendees: 85,
      type: 'Community Call'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('communityPortal.title')}</h1>
          <p className="mt-2 text-gray-600">{t('communityPortal.description')}</p>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex space-x-3">
            <button
              onClick={() => setShowCreatePost(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {t('communityPortal.createPost')}
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              {t('communityPortal.joinCommunity')}
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder={t('communityPortal.searchCommunity')}
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
              onClick={() => setActiveTab('discussions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'discussions'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('communityPortal.discussions')}
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'leaderboard'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('communityPortal.leaderboard')}
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'events'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('communityPortal.events')}
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'resources'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('communityPortal.resources')}
            </button>
          </nav>
        </div>

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {communityPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          post.category === 'Announcement' 
                            ? 'bg-blue-100 text-blue-800' 
                            : post.category === 'Request' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : post.category === 'Success Story' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-indigo-100 text-indigo-800'
                        }`}>
                          {post.category}
                        </span>
                        <h3 className="mt-2 text-xl font-semibold text-gray-900 cursor-pointer hover:text-indigo-600" onClick={() => setSelectedPost(post)}>
                          {post.title}
                        </h3>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="ml-1">{post.likes}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-indigo-800 font-medium">
                            {post.author.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{post.author}</p>
                        <p className="text-sm text-gray-500">{post.role}</p>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">
                        {new Date(post.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <p className="mt-3 text-gray-600 line-clamp-2">{post.content}</p>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex items-center">
                      <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="ml-1">{post.comments} {t('communityPortal.comments')}</span>
                      </button>
                      <button className="ml-4 flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        <span className="ml-1">{t('communityPortal.share')}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('communityPortal.popularTags')}</h3>
                <div className="flex flex-wrap gap-2">
                  {['Floods', 'Volunteers', 'Training', 'Kerala', 'Assam', 'Odisha', 'Drones', 'Preparedness'].map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('communityPortal.communityStats')}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('communityPortal.totalMembers')}</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('communityPortal.activeDiscussions')}</span>
                    <span className="font-medium">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('communityPortal.eventsThisMonth')}</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('communityPortal.newMembers')}</span>
                    <span className="font-medium">42</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{t('communityPortal.communityLeaderboard')}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('communityPortal.rank')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('communityPortal.name')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('communityPortal.type')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('communityPortal.verifiedProjects')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('communityPortal.volunteers')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('communityPortal.impact')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leaderboard.map((entry, index) => (
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                              index === 0 ? 'bg-yellow-100' : 
                              index === 1 ? 'bg-gray-100' : 
                              index === 2 ? 'bg-orange-100' : 'bg-gray-50'
                            }`}>
                              <span className={`font-medium ${
                                index === 0 ? 'text-yellow-800' : 
                                index === 1 ? 'text-gray-800' : 
                                index === 2 ? 'text-orange-800' : 'text-gray-600'
                              }`}>
                                {index + 1}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-indigo-800 font-medium">
                                {entry.name.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{entry.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            entry.type === 'NGO' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {entry.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.verifiedProjects}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.volunteers || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.impact}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('communityPortal.achievements')}</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{t('communityPortal.topContributor')}</p>
                      <p className="text-sm text-gray-500">Helping Hands Foundation</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{t('communityPortal.fastestResponder')}</p>
                      <p className="text-sm text-gray-500">Rajesh Kumar</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{t('communityPortal.communityBuilder')}</p>
                      <p className="text-sm text-gray-500">Community Resilience Network</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('communityPortal.monthlyChallenges')}</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">{t('communityPortal.volunteerHours')}</h4>
                    <div className="mt-2 flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">65/100</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{t('communityPortal.currentProgress')}</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">{t('communityPortal.communityPosts')}</h4>
                    <div className="mt-2 flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">40/100</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{t('communityPortal.currentProgress')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between">
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.type === 'Workshop' 
                            ? 'bg-purple-100 text-purple-800' 
                            : event.type === 'Orientation' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {event.type}
                        </span>
                        <h3 className="mt-2 text-xl font-semibold text-gray-900">{event.title}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-medium text-gray-900">{event.date}</div>
                        <div className="text-sm text-gray-500">{event.time}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="ml-1">{event.location}</span>
                    </div>
                    
                    <p className="mt-3 text-gray-600">{event.description}</p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="ml-1">{event.attendees} {t('communityPortal.attendees')}</span>
                      </div>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
                        {t('communityPortal.register')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{t('communityPortal.createEvent')}</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="event-title" className="block text-sm font-medium text-gray-700">
                    {t('communityPortal.eventTitle')}
                  </label>
                  <input
                    type="text"
                    id="event-title"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={t('communityPortal.enterEventTitle')}
                  />
                </div>
                
                <div>
                  <label htmlFor="event-date" className="block text-sm font-medium text-gray-700">
                    {t('communityPortal.eventDate')}
                  </label>
                  <input
                    type="date"
                    id="event-date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="event-time" className="block text-sm font-medium text-gray-700">
                    {t('communityPortal.eventTime')}
                  </label>
                  <input
                    type="text"
                    id="event-time"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="10:00 AM - 4:00 PM"
                  />
                </div>
                
                <div>
                  <label htmlFor="event-location" className="block text-sm font-medium text-gray-700">
                    {t('communityPortal.location')}
                  </label>
                  <input
                    type="text"
                    id="event-location"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={t('communityPortal.enterLocation')}
                  />
                </div>
                
                <div>
                  <label htmlFor="event-description" className="block text-sm font-medium text-gray-700">
                    {t('communityPortal.description')}
                  </label>
                  <textarea
                    id="event-description"
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={t('communityPortal.enterDescription')}
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="event-type" className="block text-sm font-medium text-gray-700">
                    {t('communityPortal.eventType')}
                  </label>
                  <select
                    id="event-type"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="Workshop">{t('communityPortal.workshop')}</option>
                    <option value="Orientation">{t('communityPortal.orientation')}</option>
                    <option value="Community Call">{t('communityPortal.communityCall')}</option>
                    <option value="Training">{t('communityPortal.training')}</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {t('communityPortal.createEvent')}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">{t('communityPortal.resourceLibrary')}</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('communityPortal.resource')}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('communityPortal.category')}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('communityPortal.uploadedBy')}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('communityPortal.date')}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('communityPortal.actions')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Disaster Response Manual</div>
                              <div className="text-sm text-gray-500">PDF Document</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Training
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Disaster Management Authority
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2023-06-01
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            {t('communityPortal.download')}
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-md flex items-center justify-center">
                              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                              </svg>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">First Aid Training Videos</div>
                              <div className="text-sm text-gray-500">Video Collection</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Education
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Medical Foundation
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2023-05-15
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            {t('communityPortal.view')}
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-md flex items-center justify-center">
                              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                              </svg>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Community Preparedness Guide</div>
                              <div className="text-sm text-gray-500">eBook</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Preparedness
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Community Resilience Network
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2023-04-22
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            {t('communityPortal.download')}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('communityPortal.uploadResource')}</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="resource-title" className="block text-sm font-medium text-gray-700">
                      {t('communityPortal.title')}
                    </label>
                    <input
                      type="text"
                      id="resource-title"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder={t('communityPortal.enterTitle')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="resource-category" className="block text-sm font-medium text-gray-700">
                      {t('communityPortal.category')}
                    </label>
                    <select
                      id="resource-category"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="Training">{t('communityPortal.training')}</option>
                      <option value="Education">{t('communityPortal.education')}</option>
                      <option value="Preparedness">{t('communityPortal.preparedness')}</option>
                      <option value="Response">{t('communityPortal.response')}</option>
                      <option value="Recovery">{t('communityPortal.recovery')}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="resource-file" className="block text-sm font-medium text-gray-700">
                      {t('communityPortal.file')}
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="resource-file" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                            <span>{t('communityPortal.uploadFile')}</span>
                            <input id="resource-file" name="resource-file" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">{t('communityPortal.orDragDrop')}</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {t('communityPortal.fileTypes')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    {t('communityPortal.upload')}
                  </button>
                </form>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('communityPortal.resourceStats')}</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-indigo-600">142</div>
                    <div className="text-gray-600">{t('communityPortal.totalResources')}</div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">1,247</div>
                    <div className="text-gray-600">{t('communityPortal.downloads')}</div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">89</div>
                    <div className="text-gray-600">{t('communityPortal.contributors')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{selectedPost.title}</h3>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-800 font-medium">
                      {selectedPost.author.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{selectedPost.author}</p>
                  <p className="text-sm text-gray-500">{selectedPost.role}</p>
                </div>
                <div className="ml-auto text-sm text-gray-500">
                  {new Date(selectedPost.timestamp).toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPost.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700">{selectedPost.content}</p>
              </div>
              
              <div className="mt-6 flex items-center">
                <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="ml-1">{selectedPost.likes} {t('communityPortal.likes')}</span>
                </button>
                <button className="ml-4 flex items-center text-sm text-gray-500 hover:text-gray-700">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="ml-1">{selectedPost.comments} {t('communityPortal.comments')}</span>
                </button>
                <button className="ml-4 flex items-center text-sm text-gray-500 hover:text-gray-700">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span className="ml-1">{t('communityPortal.share')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{t('communityPortal.createPost')}</h3>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="post-title" className="block text-sm font-medium text-gray-700">
                    {t('communityPortal.postTitle')}
                  </label>
                  <input
                    type="text"
                    id="post-title"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={t('communityPortal.enterTitle')}
                  />
                </div>
                
                <div>
                  <label htmlFor="post-category" className="block text-sm font-medium text-gray-700">
                    {t('communityPortal.category')}
                  </label>
                  <select
                    id="post-category"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="Discussion">{t('communityPortal.discussion')}</option>
                    <option value="Announcement">{t('communityPortal.announcement')}</option>
                    <option value="Request">{t('communityPortal.request')}</option>
                    <option value="Success Story">{t('communityPortal.successStory')}</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="post-content" className="block text-sm font-medium text-gray-700">
                    {t('communityPortal.content')}
                  </label>
                  <textarea
                    id="post-content"
                    rows={6}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={t('communityPortal.enterContent')}
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="post-tags" className="block text-sm font-medium text-gray-700">
                    {t('communityPortal.tags')}
                  </label>
                  <input
                    type="text"
                    id="post-tags"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={t('communityPortal.enterTags')}
                  />
                  <p className="mt-1 text-sm text-gray-500">{t('communityPortal.tagsHelp')}</p>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreatePost(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {t('communityPortal.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    {t('communityPortal.publishPost')}
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

export default CommunityPortal;