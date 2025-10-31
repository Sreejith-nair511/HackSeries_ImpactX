import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CollaborativeLab = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('api');

  // Mock data for API marketplace
  const apis = [
    { id: 1, name: "Disaster Data API", provider: "ImpactX", endpoints: 12, rating: 4.8 },
    { id: 2, name: "Verification Engine API", provider: "ImpactX", endpoints: 8, rating: 4.9 },
    { id: 3, name: "Satellite Analytics API", provider: "NASA", endpoints: 15, rating: 4.7 },
    { id: 4, name: "Weather Forecast API", provider: "OpenWeather", endpoints: 6, rating: 4.6 }
  ];

  // Mock data for AI models
  const models = [
    { id: 1, name: "Disaster Prediction Model", type: "ML", accuracy: "94.2%", status: "Published" },
    { id: 2, name: "Fraud Detection Model", type: "DL", accuracy: "97.8%", status: "Published" },
    { id: 3, name: "Resource Allocation Model", type: "RL", accuracy: "89.5%", status: "Testing" },
    { id: 4, name: "Impact Assessment Model", type: "NLP", accuracy: "92.1%", status: "Development" }
  ];

  // Mock data for hackathons
  const hackathons = [
    { id: 1, name: "Climate Resilience Hackathon", date: "2024-04-15", participants: 120, prize: "$25K" },
    { id: 2, name: "Blockchain for Good", date: "2024-05-20", participants: 85, prize: "$15K" },
    { id: 3, name: "AI for Disaster Response", date: "2024-06-10", participants: 95, prize: "$20K" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            {t('collabLab.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('collabLab.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('api')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'api'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('collabLab.apiMarketplace')}
              </button>
              <button
                onClick={() => setActiveTab('models')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'models'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('collabLab.aiModels')}
              </button>
              <button
                onClick={() => setActiveTab('hackathons')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'hackathons'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('collabLab.hackathons')}
              </button>
              <button
                onClick={() => setActiveTab('challenges')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'challenges'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('collabLab.challenges')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'api' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('collabLab.openApiMarketplace')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {apis.map((api) => (
                    <div key={api.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{api.name}</h3>
                          <p className="text-indigo-600">{api.provider}</p>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <span className="text-gray-900 font-medium">{api.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        <span>{api.endpoints} {t('collabLab.endpoints')}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                          {t('collabLab.viewDocs')}
                        </button>
                        <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('collabLab.publishYourApi')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('collabLab.apiPublishDesc')}
                  </p>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    {t('collabLab.createApi')}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'models' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('collabLab.aiModelRegistry')}
                </h2>
                <div className="overflow-x-auto mb-8">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('collabLab.modelName')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('collabLab.type')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('collabLab.accuracy')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('collabLab.status')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('collabLab.actions')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {models.map((model) => (
                        <tr key={model.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {model.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {model.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {model.accuracy}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              model.status === 'Published' 
                                ? 'bg-green-100 text-green-800' 
                                : model.status === 'Testing' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-blue-100 text-blue-800'
                            }`}>
                              {model.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                              {t('collabLab.view')}
                            </button>
                            <button className="text-indigo-600 hover:text-indigo-900">
                              {t('collabLab.use')}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('collabLab.submitModel')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('collabLab.modelSubmitDesc')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="font-medium text-gray-900 mb-2">{t('collabLab.documentation')}</div>
                      <div className="text-sm text-gray-600">{t('collabLab.docRequirement')}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="font-medium text-gray-900 mb-2">{t('collabLab.testing')}</div>
                      <div className="text-sm text-gray-600">{t('collabLab.testRequirement')}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="font-medium text-gray-900 mb-2">{t('collabLab.licensing')}</div>
                      <div className="text-sm text-gray-600">{t('collabLab.licenseRequirement')}</div>
                    </div>
                  </div>
                  <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    {t('collabLab.submitModel')}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'hackathons' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('collabLab.hackathonInfrastructure')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {hackathons.map((hackathon) => (
                    <div key={hackathon.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{hackathon.name}</h3>
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                          {t('collabLab.upcoming')}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>{hackathon.date}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                          <span>{hackathon.participants} {t('collabLab.participants')}</span>
                        </div>
                        <div className="text-lg font-bold text-indigo-600">{hackathon.prize}</div>
                      </div>
                      <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        {t('collabLab.register')}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('collabLab.hostHackathon')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('collabLab.hackathonHostDesc')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-indigo-200">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">{t('collabLab.infrastructure')}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-indigo-200">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">{t('collabLab.security')}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-indigo-200">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">{t('collabLab.community')}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-indigo-200">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">{t('collabLab.funding')}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    {t('collabLab.hostEvent')}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'challenges' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('collabLab.communityChallenges')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('collabLab.activeChallenges')}
                    </h3>
                    <div className="space-y-4">
                      <div className="pb-4 border-b border-gray-200">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium text-gray-900">{t('collabLab.disasterPrediction')}</div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {t('collabLab.active')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {t('collabLab.disasterPredictionDesc')}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            {t('collabLab.prize')}: $5,000
                          </div>
                          <button className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 transition-colors text-sm">
                            {t('collabLab.join')}
                          </button>
                        </div>
                      </div>
                      <div className="pb-4 border-b border-gray-200">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium text-gray-900">{t('collabLab.verificationSystem')}</div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {t('collabLab.active')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {t('collabLab.verificationSystemDesc')}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            {t('collabLab.prize')}: $7,500
                          </div>
                          <button className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 transition-colors text-sm">
                            {t('collabLab.join')}
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <div className="font-medium text-gray-900">{t('collabLab.resourceOptimization')}</div>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            {t('collabLab.upcoming')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {t('collabLab.resourceOptimizationDesc')}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            {t('collabLab.starts')}: Apr 15
                          </div>
                          <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm" disabled>
                            {t('collabLab.comingSoon')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('collabLab.submissionGuidelines')}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">1</span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-700">{t('collabLab.guideline1')}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">2</span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-700">{t('collabLab.guideline2')}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">3</span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-700">{t('collabLab.guideline3')}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">4</span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-700">{t('collabLab.guideline4')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('collabLab.proposeChallenge')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('collabLab.challengeProposeDesc')}
                  </p>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    {t('collabLab.submitIdea')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeLab;