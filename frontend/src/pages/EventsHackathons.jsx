import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const EventsHackathons = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('events');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  // Mock events data
  const events = [
    {
      id: 1,
      title: 'ImpactTech Global Summit 2023',
      description: 'Join the world\'s leading experts in humanitarian technology for three days of workshops, panels, and networking.',
      date: '2023-09-15',
      time: '9:00 AM - 6:00 PM',
      location: 'New Delhi, India',
      type: 'Conference',
      attendees: 500,
      status: 'Upcoming',
      registrationDeadline: '2023-09-10',
      imageUrl: '/images/summit-2023.jpg'
    },
    {
      id: 2,
      title: 'Blockchain for Good Hackathon',
      description: '48-hour hackathon focused on building blockchain solutions for social impact challenges.',
      date: '2023-08-20',
      time: '10:00 AM - 2:00 PM',
      location: 'Online',
      type: 'Hackathon',
      attendees: 120,
      status: 'Registration Open',
      registrationDeadline: '2023-08-18',
      imageUrl: '/images/hackathon-blockchain.jpg'
    },
    {
      id: 3,
      title: 'Disaster Response Workshop',
      description: 'Hands-on training workshop for volunteers and NGOs on effective disaster response strategies.',
      date: '2023-07-25',
      time: '2:00 PM - 5:00 PM',
      location: 'Mumbai, India',
      type: 'Workshop',
      attendees: 80,
      status: 'Completed',
      registrationDeadline: '2023-07-20',
      imageUrl: '/images/disaster-workshop.jpg'
    },
    {
      id: 4,
      title: 'ImpactX Community Meetup',
      description: 'Monthly community gathering to share updates, success stories, and collaborate on new initiatives.',
      date: '2023-08-05',
      time: '6:00 PM - 9:00 PM',
      location: 'Bangalore, India',
      type: 'Meetup',
      attendees: 45,
      status: 'Registration Open',
      registrationDeadline: '2023-08-03',
      imageUrl: '/images/community-meetup.jpg'
    }
  ];

  // Mock calendar events
  const calendarEvents = [
    { id: 1, title: 'ImpactTech Summit', start: '2023-09-15', end: '2023-09-17', type: 'conference' },
    { id: 2, title: 'Blockchain Hackathon', start: '2023-08-20', end: '2023-08-21', type: 'hackathon' },
    { id: 3, title: 'Monthly Meetup', start: '2023-08-05', end: '2023-08-05', type: 'meetup' },
    { id: 4, title: 'Webinar: AI in Humanitarian Work', start: '2023-07-28', end: '2023-07-28', type: 'webinar' }
  ];

  // Mock challenges
  const challenges = [
    {
      id: 1,
      title: 'Flood Prediction Challenge',
      description: 'Develop an AI model to predict flood risks using satellite data and weather patterns.',
      prize: '₹500,000',
      participants: 87,
      deadline: '2023-09-30',
      status: 'Active',
      category: 'AI/ML'
    },
    {
      id: 2,
      title: 'Supply Chain Transparency',
      description: 'Create a blockchain solution to track humanitarian aid from donor to recipient.',
      prize: '₹300,000',
      participants: 42,
      deadline: '2023-10-15',
      status: 'Active',
      category: 'Blockchain'
    },
    {
      id: 3,
      title: 'Community Resilience App',
      description: 'Build a mobile app to help communities prepare for and respond to disasters.',
      prize: '₹200,000',
      participants: 65,
      deadline: '2023-08-30',
      status: 'Ending Soon',
      category: 'Mobile Development'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('eventsHackathons.title')}</h1>
          <p className="mt-2 text-gray-600">{t('eventsHackathons.description')}</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('events')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'events'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('eventsHackathons.events')}
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'calendar'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('eventsHackathons.calendar')}
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'challenges'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('eventsHackathons.challenges')}
            </button>
            <button
              onClick={() => setActiveTab('pastEvents')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pastEvents'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('eventsHackathons.pastEvents')}
            </button>
          </nav>
        </div>

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {events.filter(event => event.status !== 'Completed').map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="w-full h-full bg-indigo-100 flex items-center justify-center"><svg class="h-12 w-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.type === 'Conference' 
                            ? 'bg-purple-100 text-purple-800' 
                            : event.type === 'Hackathon' 
                              ? 'bg-green-100 text-green-800' 
                              : event.type === 'Workshop' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-yellow-100 text-yellow-800'
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
                    
                    <p className="mt-3 text-gray-600">{event.description}</p>
                    
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="ml-1">{event.location}</span>
                    </div>
                    
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="ml-1">{event.attendees} {t('eventsHackathons.attendees')}</span>
                    </div>
                    
                    <div className="mt-6 flex justify-between items-center">
                      <div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          event.status === 'Upcoming' 
                            ? 'bg-blue-100 text-blue-800' 
                            : event.status === 'Registration Open' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {t('eventsHackathons.registrationDeadline')}: {event.registrationDeadline}
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowRegistrationForm(true);
                        }}
                        className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        {t('eventsHackathons.register')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('eventsHackathons.upcomingEvents')}</h3>
                <div className="space-y-4">
                  {events.filter(event => event.status !== 'Completed').slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-md bg-indigo-100 flex items-center justify-center">
                          <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('eventsHackathons.eventStats')}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('eventsHackathons.totalEvents')}</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('eventsHackathons.upcomingEvents')}</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('eventsHackathons.totalAttendees')}</span>
                    <span className="font-medium">2,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('eventsHackathons.countriesRepresented')}</span>
                    <span className="font-medium">15</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('eventsHackathons.eventCalendar')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-medium text-gray-900 py-2">
                  {day}
                </div>
              ))}
              
              {/* Calendar days - simplified for demo */}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 4; // Adjust for starting day
                const isCurrentMonth = day > 0 && day <= 31;
                const dateString = `2023-08-${day < 10 ? '0' + day : day}`;
                const dayEvents = calendarEvents.filter(event => event.start === dateString);
                
                return (
                  <div 
                    key={i} 
                    className={`min-h-24 p-2 border border-gray-200 ${
                      isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    {isCurrentMonth && (
                      <>
                        <div className="font-medium">{day}</div>
                        <div className="mt-1 space-y-1">
                          {dayEvents.map((event) => (
                            <div 
                              key={event.id} 
                              className={`text-xs p-1 rounded truncate cursor-pointer ${
                                event.type === 'conference' 
                                  ? 'bg-purple-100 text-purple-800' 
                                  : event.type === 'hackathon' 
                                    ? 'bg-green-100 text-green-800' 
                                    : event.type === 'meetup' 
                                      ? 'bg-blue-100 text-blue-800' 
                                      : 'bg-yellow-100 text-yellow-800'
                              }`}
                              onClick={() => setSelectedEvent(events.find(e => e.title.includes(event.title)))}
                            >
                              {event.title}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        challenge.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {challenge.status}
                      </span>
                      <h3 className="mt-2 text-xl font-semibold text-gray-900">{challenge.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-indigo-600">{challenge.prize}</div>
                      <div className="text-sm text-gray-500">{t('eventsHackathons.prize')}</div>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-gray-600">{challenge.description}</p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {challenge.category}
                    </span>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="ml-1">{challenge.participants} {t('eventsHackathons.participants')}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {t('eventsHackathons.deadline')}: {challenge.deadline}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                      {t('eventsHackathons.joinChallenge')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('eventsHackathons.createChallenge')}</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="challenge-title" className="block text-sm font-medium text-gray-700">
                      {t('eventsHackathons.challengeTitle')}
                    </label>
                    <input
                      type="text"
                      id="challenge-title"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder={t('eventsHackathons.enterTitle')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="challenge-description" className="block text-sm font-medium text-gray-700">
                      {t('eventsHackathons.description')}
                    </label>
                    <textarea
                      id="challenge-description"
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder={t('eventsHackathons.enterDescription')}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="challenge-category" className="block text-sm font-medium text-gray-700">
                      {t('eventsHackathons.category')}
                    </label>
                    <select
                      id="challenge-category"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="AI/ML">AI/ML</option>
                      <option value="Blockchain">Blockchain</option>
                      <option value="Mobile Development">Mobile Development</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Data Science">Data Science</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="challenge-prize" className="block text-sm font-medium text-gray-700">
                      {t('eventsHackathons.prize')}
                    </label>
                    <input
                      type="text"
                      id="challenge-prize"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="₹100,000"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="challenge-deadline" className="block text-sm font-medium text-gray-700">
                      {t('eventsHackathons.deadline')}
                    </label>
                    <input
                      type="date"
                      id="challenge-deadline"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    {t('eventsHackathons.createChallenge')}
                  </button>
                </form>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('eventsHackathons.challengeStats')}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('eventsHackathons.activeChallenges')}</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('eventsHackathons.totalParticipants')}</span>
                    <span className="font-medium">847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('eventsHackathons.totalPrizePool')}</span>
                    <span className="font-medium">₹2,450,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('eventsHackathons.solutionsSubmitted')}</span>
                    <span className="font-medium">324</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Past Events Tab */}
        {activeTab === 'pastEvents' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.filter(event => event.status === 'Completed').map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="h-40 bg-gray-200">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gray-100 flex items-center justify-center"><svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg></div>';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        event.type === 'Conference' 
                          ? 'bg-purple-100 text-purple-800' 
                          : event.type === 'Hackathon' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                      }`}>
                        {event.type}
                      </span>
                      <h3 className="mt-2 text-lg font-medium text-gray-900">{event.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{event.date}</div>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-sm text-gray-500 line-clamp-2">{event.description}</p>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="ml-1">{event.location}</span>
                  </div>
                  
                  <div className="mt-4">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {t('eventsHackathons.completed')}
                    </span>
                  </div>
                  
                  <div className="mt-4 flex space-x-3">
                    <button className="flex-1 px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      {t('eventsHackathons.viewGallery')}
                    </button>
                    <button className="flex-1 px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      {t('eventsHackathons.viewReport')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Event Registration Modal */}
      {showRegistrationForm && selectedEvent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{t('eventsHackathons.registerFor')} {selectedEvent.title}</h3>
                <button
                  onClick={() => {
                    setShowRegistrationForm(false);
                    setSelectedEvent(null);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      {t('eventsHackathons.firstName')}
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder={t('eventsHackathons.enterFirstName')}
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      {t('eventsHackathons.lastName')}
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder={t('eventsHackathons.enterLastName')}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t('eventsHackathons.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={t('eventsHackathons.enterEmail')}
                  />
                </div>
                
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                    {t('eventsHackathons.organization')}
                  </label>
                  <input
                    type="text"
                    id="organization"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={t('eventsHackathons.enterOrganization')}
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    {t('eventsHackathons.role')}
                  </label>
                  <select
                    id="role"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">{t('eventsHackathons.selectRole')}</option>
                    <option value="developer">{t('eventsHackathons.developer')}</option>
                    <option value="designer">{t('eventsHackathons.designer')}</option>
                    <option value="projectManager">{t('eventsHackathons.projectManager')}</option>
                    <option value="volunteer">{t('eventsHackathons.volunteer')}</option>
                    <option value="ngo">{t('eventsHackathons.ngoRepresentative')}</option>
                    <option value="student">{t('eventsHackathons.student')}</option>
                    <option value="other">{t('eventsHackathons.other')}</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('eventsHackathons.attendanceType')}
                  </label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        id="in-person"
                        name="attendance-type"
                        type="radio"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        defaultChecked
                      />
                      <label htmlFor="in-person" className="ml-3 block text-sm text-gray-700">
                        {t('eventsHackathons.inPerson')} ({selectedEvent.location})
                      </label>
                    </div>
                    {selectedEvent.type === 'Conference' && (
                      <div className="flex items-center">
                        <input
                          id="virtual"
                          name="attendance-type"
                          type="radio"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <label htmlFor="virtual" className="ml-3 block text-sm text-gray-700">
                          {t('eventsHackathons.virtual')}
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="dietary" className="block text-sm font-medium text-gray-700">
                    {t('eventsHackathons.dietaryRestrictions')}
                  </label>
                  <input
                    type="text"
                    id="dietary"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={t('eventsHackathons.enterDietaryRestrictions')}
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowRegistrationForm(false);
                      setSelectedEvent(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {t('eventsHackathons.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    {t('eventsHackathons.submitRegistration')}
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

export default EventsHackathons;