import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DataCommons = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('datasets');

  // Mock data for datasets
  const datasets = [
    {
      id: 1,
      title: "Global Disaster Response 2023",
      description: "Comprehensive dataset of disaster response efforts worldwide in 2023",
      size: "2.4 GB",
      format: "CSV, JSON",
      downloads: 12400,
      lastUpdated: "2024-03-15",
      sdg: ["SDG 1", "SDG 3", "SDG 11"]
    },
    {
      id: 2,
      title: "Climate Impact Metrics",
      description: "Climate data correlated with humanitarian impact measurements",
      size: "1.8 GB",
      format: "CSV, JSON, Parquet",
      downloads: 8900,
      lastUpdated: "2024-03-10",
      sdg: ["SDG 13", "SDG 15"]
    },
    {
      id: 3,
      title: "NGO Funding Transparency",
      description: "Verified funding data for humanitarian organizations",
      size: "850 MB",
      format: "CSV, JSON",
      downloads: 15600,
      lastUpdated: "2024-03-05",
      sdg: ["SDG 16", "SDG 17"]
    }
  ];

  // Mock data for API endpoints
  const apis = [
    { id: 1, name: "Disaster Events API", endpoints: 12, requests: "2.4M/month", status: "Active" },
    { id: 2, name: "Funding Transparency API", endpoints: 8, requests: "1.8M/month", status: "Active" },
    { id: 3, name: "Impact Metrics API", endpoints: 15, requests: "3.2M/month", status: "Active" }
  ];

  // Mock data for analytics tools
  const tools = [
    { id: 1, name: "Impact Correlation Analyzer", type: "Visualization", users: 1240 },
    { id: 2, name: "Resource Allocation Optimizer", type: "ML Model", users: 890 },
    { id: 3, name: "Disaster Prediction Dashboard", type: "Analytics", users: 2150 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            {t('dataCommons.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('dataCommons.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('datasets')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'datasets'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('dataCommons.datasets')}
              </button>
              <button
                onClick={() => setActiveTab('api')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'api'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('dataCommons.api')}
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('dataCommons.analytics')}
              </button>
              <button
                onClick={() => setActiveTab('standards')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'standards'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('dataCommons.standards')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'datasets' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('dataCommons.openDatasetPortal')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="lg:col-span-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t('dataCommons.searchDatasets')}
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                  </div>
                  {datasets.map((dataset) => (
                    <div key={dataset.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{dataset.title}</h3>
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                          {dataset.size}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{dataset.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {dataset.sdg.map((goal, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {goal}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
                        </svg>
                        <span>{dataset.format}</span>
                        <span className="mx-2">•</span>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>{dataset.lastUpdated}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                          </svg>
                          <span>{dataset.downloads.toLocaleString()} {t('dataCommons.downloads')}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                            {t('dataCommons.download')}
                          </button>
                          <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                            {t('dataCommons.preview')}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('dataCommons.contributeData')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('dataCommons.contributeDesc')}
                  </p>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    {t('dataCommons.submitDataset')}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('dataCommons.publicApi')}
                </h2>
                <div className="overflow-x-auto mb-8">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('dataCommons.apiName')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('dataCommons.endpoints')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('dataCommons.requests')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('dataCommons.status')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('dataCommons.actions')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {apis.map((api) => (
                        <tr key={api.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {api.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {api.endpoints}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {api.requests}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {api.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                              {t('dataCommons.viewDocs')}
                            </button>
                            <button className="text-indigo-600 hover:text-indigo-900">
                              {t('dataCommons.tryIt')}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('dataCommons.apiRateLimits')}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('dataCommons.anonymousAccess')}</span>
                        <span className="font-medium">100 req/hour</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('dataCommons.authenticatedAccess')}</span>
                        <span className="font-medium">10,000 req/hour</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('dataCommons.premiumAccess')}</span>
                        <span className="font-medium">100,000 req/hour</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('dataCommons.apiKeys')}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {t('dataCommons.apiKeyDesc')}
                    </p>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      {t('dataCommons.getApiKey')}
                    </button>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('dataCommons.apiDocumentation')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="font-medium text-gray-900 mb-2">{t('dataCommons.gettingStarted')}</div>
                      <div className="text-sm text-gray-600 mb-2">{t('dataCommons.quickStartGuide')}</div>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                        {t('dataCommons.viewGuide')}
                      </button>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="font-medium text-gray-900 mb-2">{t('dataCommons.endpoints')}</div>
                      <div className="text-sm text-gray-600 mb-2">{t('dataCommons.fullReference')}</div>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                        {t('dataCommons.viewReference')}
                      </button>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="font-medium text-gray-900 mb-2">{t('dataCommons.examples')}</div>
                      <div className="text-sm text-gray-600 mb-2">{t('dataCommons.codeSamples')}</div>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                        {t('dataCommons.viewExamples')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('dataCommons.integratedAnalytics')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {tools.map((tool) => (
                    <div key={tool.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {tool.type}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        <span>{tool.users.toLocaleString()} {t('dataCommons.users')}</span>
                      </div>
                      <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                        {t('dataCommons.launchTool')}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('dataCommons.visualizationGallery')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="h-32 bg-gray-200 border-2 border-dashed rounded-lg w-full mb-3" />
                      <div className="font-medium text-gray-900 text-sm">{t('dataCommons.disasterHeatmap')}</div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="h-32 bg-gray-200 border-2 border-dashed rounded-lg w-full mb-3" />
                      <div className="font-medium text-gray-900 text-sm">{t('dataCommons.fundingFlows')}</div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="h-32 bg-gray-200 border-2 border-dashed rounded-lg w-full mb-3" />
                      <div className="font-medium text-gray-900 text-sm">{t('dataCommons.impactCorrelations')}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('dataCommons.customAnalytics')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('dataCommons.customDesc')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="font-medium text-gray-900 mb-2">{t('dataCommons.queryBuilder')}</div>
                      <div className="text-sm text-gray-600 mb-2">{t('dataCommons.buildQueries')}</div>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                        {t('dataCommons.openBuilder')}
                      </button>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="font-medium text-gray-900 mb-2">{t('dataCommons.dashboardDesigner')}</div>
                      <div className="text-sm text-gray-600 mb-2">{t('dataCommons.createDashboards')}</div>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                        {t('dataCommons.openDesigner')}
                      </button>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="font-medium text-gray-900 mb-2">{t('dataCommons.exportData')}</div>
                      <div className="text-sm text-gray-600 mb-2">{t('dataCommons.exportFormats')}</div>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                        {t('dataCommons.exportOptions')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'standards' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('dataCommons.dataStandards')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('dataCommons.aiAssistedCleaning')}
                    </h3>
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        <div className="text-2xl font-bold text-gray-900">98.7%</div>
                        <div className="text-sm text-gray-600">{t('dataCommons.accuracy')}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>{t('dataCommons.cleaningProgress')}</span>
                          <span>98.7%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '98.7%' }}></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {t('dataCommons.cleaningDesc')}
                    </p>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      {t('dataCommons.cleanDataset')}
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('dataCommons.sdgMapping')}
                    </h3>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {['SDG 1', 'SDG 3', 'SDG 11', 'SDG 13', 'SDG 15', 'SDG 16'].map((goal, index) => (
                        <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                          <div className="font-medium text-gray-900 text-sm">{goal}</div>
                          <div className="text-xs text-gray-600 mt-1">85%</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">
                      {t('dataCommons.sdgDesc')}
                    </p>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      {t('dataCommons.mapDataset')}
                    </button>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('dataCommons.standardizationTools')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-indigo-200">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">{t('dataCommons.schemaValidation')}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-indigo-200">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">{t('dataCommons.metadataEnrichment')}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-indigo-200">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">{t('dataCommons.interoperability')}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-indigo-200">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">{t('dataCommons.qualityAssurance')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('dataCommons.compliance')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('dataCommons.gdprCompliant')}</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('dataCommons.openDataCertified')}</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('dataCommons.isoStandards')}</span>
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

export default DataCommons;