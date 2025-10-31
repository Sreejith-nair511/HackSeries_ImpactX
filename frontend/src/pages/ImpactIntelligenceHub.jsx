import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ImpactIntelligenceHub = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('map');

  // Mock data for the global project map
  const projects = [
    { id: 1, name: "Flood Relief - Kerala", lat: 10.8505, lng: 76.2711, impactScore: 92, status: "Active" },
    { id: 2, name: "Earthquake Response - Turkey", lat: 39.9334, lng: 32.8597, impactScore: 88, status: "Active" },
    { id: 3, name: "Drought Mitigation - Kenya", lat: -0.0236, lng: 37.9062, impactScore: 76, status: "Planning" },
    { id: 4, name: "Refugee Support - Bangladesh", lat: 23.6850, lng: 90.3563, impactScore: 95, status: "Active" },
    { id: 5, name: "Forest Fire Recovery - Australia", lat: -25.2744, lng: 133.7751, impactScore: 81, status: "Completed" }
  ];

  // Mock data for AI insights
  const insights = [
    { id: 1, title: "Monsoon Patterns Shift", description: "AI predicts 15% increase in extreme rainfall events in South Asia", severity: "High" },
    { id: 2, title: "Supply Chain Disruption", description: "Potential delays in aid delivery to conflict zones", severity: "Medium" },
    { id: 3, title: "Resource Optimization", description: "Recommend reallocating 20% of funds to high-impact regions", severity: "Low" }
  ];

  // Mock data for predictive modeling
  const predictions = [
    { id: 1, region: "Southeast Asia", disaster: "Flooding", probability: "85%", timeframe: "Next 30 days" },
    { id: 2, region: "Horn of Africa", disaster: "Drought", probability: "72%", timeframe: "Next 90 days" },
    { id: 3, region: "Caribbean", disaster: "Hurricane", probability: "68%", timeframe: "Next 180 days" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            {t('intelligenceHub.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('intelligenceHub.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('map')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'map'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('intelligenceHub.globalMap')}
              </button>
              <button
                onClick={() => setActiveTab('insights')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'insights'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('intelligenceHub.aiInsights')}
              </button>
              <button
                onClick={() => setActiveTab('predictions')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'predictions'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('intelligenceHub.predictiveModeling')}
              </button>
              <button
                onClick={() => setActiveTab('health')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'health'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('intelligenceHub.impactHealth')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'map' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('intelligenceHub.globalProjectMap')}
                </h2>
                <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('intelligenceHub.interactiveMap')}</h3>
                    <p className="text-gray-600">{t('intelligenceHub.mapDescription')}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          project.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : project.status === 'Planning' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-blue-100 text-blue-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="text-gray-600 mr-2">{t('intelligenceHub.impactScore')}:</span>
                        <span className="font-semibold text-indigo-600">{project.impactScore}/100</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>Lat: {project.lat}, Lng: {project.lng}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('intelligenceHub.aiDrivenInsights')}
                </h2>
                <div className="space-y-6">
                  {insights.map((insight) => (
                    <div key={insight.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{insight.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          insight.severity === 'High' 
                            ? 'bg-red-100 text-red-800' 
                            : insight.severity === 'Medium' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {insight.severity}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{insight.description}</p>
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                        {t('intelligenceHub.viewDetails')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'predictions' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('intelligenceHub.predictiveDisasterModeling')}
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('intelligenceHub.region')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('intelligenceHub.disasterType')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('intelligenceHub.probability')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('intelligenceHub.timeframe')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('intelligenceHub.action')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {predictions.map((prediction) => (
                        <tr key={prediction.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {prediction.region}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {prediction.disaster}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                              {prediction.probability}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {prediction.timeframe}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              {t('intelligenceHub.prepare')}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'health' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('intelligenceHub.impactHealthScore')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg p-6 text-white">
                    <div className="text-3xl font-bold mb-2">87.5</div>
                    <div className="text-sm opacity-90">{t('intelligenceHub.overallHealth')}</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-6 text-white">
                    <div className="text-3xl font-bold mb-2">92.3</div>
                    <div className="text-sm opacity-90">{t('intelligenceHub.fundingEfficiency')}</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg p-6 text-white">
                    <div className="text-3xl font-bold mb-2">81.7</div>
                    <div className="text-sm opacity-90">{t('intelligenceHub.carbonImpact')}</div>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-6 text-white">
                    <div className="text-3xl font-bold mb-2">89.2</div>
                    <div className="text-sm opacity-90">{t('intelligenceHub.reliefOutcomes')}</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('intelligenceHub.healthMetricsBreakdown')}</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">{t('intelligenceHub.transparencyScore')}</span>
                        <span className="text-gray-900 font-medium">94%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">{t('intelligenceHub.verificationRate')}</span>
                        <span className="text-gray-900 font-medium">88%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">{t('intelligenceHub.communityEngagement')}</span>
                        <span className="text-gray-900 font-medium">79%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '79%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">{t('intelligenceHub.sustainabilityIndex')}</span>
                        <span className="text-gray-900 font-medium">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
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

export default ImpactIntelligenceHub;