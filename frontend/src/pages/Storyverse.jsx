import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Storyverse = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('stories');

  // Mock data for immersive stories
  const stories = [
    {
      id: 1,
      title: "Kerala Flood Relief Journey",
      location: "Kerala, India",
      impact: "12,500 lives affected",
      status: "Verified",
      image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Earthquake Recovery in Turkey",
      location: "Turkey",
      impact: "2,300 homes rebuilt",
      status: "Verified",
      image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Drought Mitigation in Kenya",
      location: "Kenya",
      impact: "5,000 farmers supported",
      status: "Verified",
      image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Mock data for satellite comparisons
  const comparisons = [
    {
      id: 1,
      title: "Before/After Flood Relief",
      location: "Kerala, India",
      date: "2023-08-15",
      beforeImage: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Earthquake Damage Assessment",
      location: "Turkey",
      date: "2023-02-06",
      beforeImage: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Mock data for impact maps
  const impactMaps = [
    {
      id: 1,
      title: "Global Flood Response 2023",
      regions: 12,
      people: "2.4M",
      status: "Active"
    },
    {
      id: 2,
      title: "Earthquake Recovery Dashboard",
      regions: 5,
      people: "850K",
      status: "Ongoing"
    },
    {
      id: 3,
      title: "Drought Mitigation Tracker",
      regions: 8,
      people: "1.2M",
      status: "Active"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            {t('storyverse.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('storyverse.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('stories')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'stories'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('storyverse.stories')}
              </button>
              <button
                onClick={() => setActiveTab('comparisons')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'comparisons'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('storyverse.satellite')}
              </button>
              <button
                onClick={() => setActiveTab('maps')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'maps'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('storyverse.impactMaps')}
              </button>
              <button
                onClick={() => setActiveTab('cinematic')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'cinematic'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('storyverse.cinematic')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'stories' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('storyverse.immersiveStories')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {stories.map((story) => (
                    <div key={story.id} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                      <div className="h-48 bg-gray-200 border-2 border-dashed w-full" />
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">{story.title}</h3>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {story.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {story.location}
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                          {t('storyverse.impact')}: {story.impact}
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                            {t('storyverse.explore')}
                          </button>
                          <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('storyverse.createStory')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('storyverse.storyCreateDesc')}
                  </p>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    {t('storyverse.startStory')}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'comparisons' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('storyverse.satelliteComparisons')}
                </h2>
                <div className="space-y-8">
                  {comparisons.map((comparison) => (
                    <div key={comparison.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{comparison.title}</h3>
                          <p className="text-gray-600">{comparison.location} • {comparison.date}</p>
                        </div>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                          {t('storyverse.analyze')}
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">{t('storyverse.before')}</h4>
                          <div className="h-64 bg-gray-200 border-2 border-dashed rounded-lg w-full" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">{t('storyverse.after')}</h4>
                          <div className="h-64 bg-gray-200 border-2 border-dashed rounded-lg w-full" />
                        </div>
                      </div>
                      <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">{t('storyverse.analysis')}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-600">87%</div>
                            <div className="text-sm text-gray-600">{t('storyverse.recovery')}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-600">12.4K</div>
                            <div className="text-sm text-gray-600">{t('storyverse.structures')}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-600">92%</div>
                            <div className="text-sm text-gray-600">{t('storyverse.accuracy')}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'maps' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('storyverse.dynamicImpactMaps')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('storyverse.interactiveMap')}
                    </h3>
                    <div className="h-80 bg-gray-200 border-2 border-dashed rounded-lg w-full mb-4" />
                    <div className="flex justify-between">
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                        {t('storyverse.zoomIn')}
                      </button>
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                        {t('storyverse.export')}
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('storyverse.impactData')}
                    </h3>
                    <div className="space-y-4">
                      {impactMaps.map((map) => (
                        <div key={map.id} className="flex justify-between items-center pb-3 border-b border-gray-200">
                          <div>
                            <div className="font-medium text-gray-900">{map.title}</div>
                            <div className="text-sm text-gray-600">
                              {map.regions} {t('storyverse.regions')} • {map.people} {t('storyverse.people')}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              map.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {map.status}
                            </span>
                            <div className="mt-1">
                              <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                                {t('storyverse.view')}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('storyverse.mapLayers')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded" defaultChecked />
                      <span className="ml-2 text-gray-700">{t('storyverse.funding')}</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded" defaultChecked />
                      <span className="ml-2 text-gray-700">{t('storyverse.population')}</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded" />
                      <span className="ml-2 text-gray-700">{t('storyverse.infrastructure')}</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded" defaultChecked />
                      <span className="ml-2 text-gray-700">{t('storyverse.verification')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cinematic' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('storyverse.cinematicStorytelling')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <div className="lg:col-span-2 bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('storyverse.featuredStory')}
                    </h3>
                    <div className="h-96 bg-gray-200 border-2 border-dashed rounded-lg w-full mb-4" />
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">{t('storyverse.keralaFlood')}</div>
                        <div className="text-sm text-gray-600">{t('storyverse.india')}</div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                          {t('storyverse.watch')}
                        </button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                          {t('storyverse.share')}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('storyverse.storyGallery')}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900 text-sm">{t('storyverse.turkeyEarthquake')}</div>
                          <div className="text-xs text-gray-600">{t('storyverse.turkey')}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900 text-sm">{t('storyverse.kenyaDrought')}</div>
                          <div className="text-xs text-gray-600">{t('storyverse.kenya')}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900 text-sm">{t('storyverse.bangladeshCyclone')}</div>
                          <div className="text-xs text-gray-600">{t('storyverse.bangladesh')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('storyverse.storyCreationTools')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">{t('storyverse.videoEditing')}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">{t('storyverse.arLayers')}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">{t('storyverse.aiNarration')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storyverse;