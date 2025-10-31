import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CICDPipeline = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [pipelineData, setPipelineData] = useState(null);

  // Mock pipeline data
  const mockPipelineData = {
    overview: {
      status: 'success',
      lastRun: '2024-03-22T14:30:00Z',
      duration: '12m 34s',
      triggeredBy: 'GitHub Push (main branch)',
      builds: [
        { name: 'Frontend Build', status: 'success', duration: '4m 12s' },
        { name: 'Smart Contract Compile', status: 'success', duration: '2m 5s' },
        { name: 'Unit Tests', status: 'success', duration: '3m 45s' },
        { name: 'Integration Tests', status: 'success', duration: '2m 32s' }
      ]
    },
    workflows: [
      {
        id: 'wf-001',
        name: 'Main Deployment Pipeline',
        description: 'Full deployment pipeline for production releases',
        trigger: 'Push to main branch',
        status: 'active',
        lastRun: '2024-03-22T14:30:00Z',
        runs: [
          { id: 'run-101', status: 'success', duration: '12m 34s', timestamp: '2024-03-22T14:30:00Z' },
          { id: 'run-102', status: 'success', duration: '11m 52s', timestamp: '2024-03-21T09:15:00Z' },
          { id: 'run-103', status: 'failed', duration: '8m 41s', timestamp: '2024-03-20T16:45:00Z' }
        ]
      },
      {
        id: 'wf-002',
        name: 'Pull Request Validation',
        description: 'Validation pipeline for pull requests',
        trigger: 'Pull request opened/updated',
        status: 'active',
        lastRun: '2024-03-22T11:20:00Z',
        runs: [
          { id: 'run-201', status: 'success', duration: '8m 17s', timestamp: '2024-03-22T11:20:00Z' },
          { id: 'run-202', status: 'success', duration: '9m 5s', timestamp: '2024-03-22T08:30:00Z' }
        ]
      },
      {
        id: 'wf-003',
        name: 'Security Audit',
        description: 'Automated security scanning for dependencies',
        trigger: 'Scheduled (daily)',
        status: 'active',
        lastRun: '2024-03-22T02:00:00Z',
        runs: [
          { id: 'run-301', status: 'success', duration: '15m 23s', timestamp: '2024-03-22T02:00:00Z' },
          { id: 'run-302', status: 'warning', duration: '16m 8s', timestamp: '2024-03-21T02:00:00Z' }
        ]
      }
    ],
    transparencyLogs: [
      {
        id: 'log-001',
        timestamp: '2024-03-22T14:35:22Z',
        message: 'Smart contract verification completed successfully',
        type: 'info',
        details: {
          contract: 'DonationManager',
          verificationScore: '98.7%',
          validator: 'AI Verification Engine v2.1'
        }
      },
      {
        id: 'log-002',
        timestamp: '2024-03-22T14:32:15Z',
        message: 'Funds allocated to verified NGO projects',
        type: 'info',
        details: {
          amount: '25,000 ALGO',
          recipients: 5,
          projects: ['Disaster Relief PH', 'Flood Response ID', 'Earthquake Aid NP', 'Hurricane Recovery BR', 'Drought Support KE']
        }
      },
      {
        id: 'log-003',
        timestamp: '2024-03-22T14:30:45Z',
        message: 'Deployment to production environment initiated',
        type: 'info',
        details: {
          version: 'v2.4.1',
          environment: 'production',
          initiator: 'ci-cd-bot'
        }
      },
      {
        id: 'log-004',
        timestamp: '2024-03-22T14:28:33Z',
        message: 'All tests passed successfully',
        type: 'info',
        details: {
          unitTests: '127/127 passed',
          integrationTests: '24/24 passed',
          coverage: '94.2%'
        }
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPipelineData(mockPipelineData);
    }, 500);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (!pipelineData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('pipeline.title')}</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('pipeline.description')}
          </p>
        </div>

        {/* Status Banner */}
        <div className={`rounded-xl p-6 mb-8 text-center ${pipelineData.overview.status === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-center justify-center">
            <div className={`mr-4 rounded-full p-2 ${pipelineData.overview.status === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
              {pipelineData.overview.status === 'success' ? (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {pipelineData.overview.status === 'success' 
                  ? t('pipeline.status.success') 
                  : t('pipeline.status.failed')}
              </h2>
              <p className="text-gray-600 mt-1">
                {t('pipeline.lastRun')}: {formatTime(pipelineData.overview.lastRun)} • 
                {t('pipeline.duration')}: {pipelineData.overview.duration}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('pipeline.tabs.overview')}
              </button>
              <button
                onClick={() => setActiveTab('workflows')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'workflows'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('pipeline.tabs.workflows')}
              </button>
              <button
                onClick={() => setActiveTab('transparency')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'transparency'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('pipeline.tabs.transparency')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('pipeline.overview.buildStages')}</h2>
                <div className="space-y-4">
                  {pipelineData.overview.builds.map((build, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className={`mr-4 rounded-full p-2 ${build.status === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                          {build.status === 'success' ? (
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{build.name}</h3>
                          <p className="text-gray-500 text-sm">{formatTime(pipelineData.overview.lastRun)}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(build.status)}`}>
                        {build.duration}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('pipeline.overview.metrics')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                      <div className="text-3xl font-bold text-blue-700 mb-2">98.7%</div>
                      <div className="text-blue-900 font-medium">{t('pipeline.overview.successRate')}</div>
                      <p className="text-blue-700 text-sm mt-1">{t('pipeline.overview.successRateDesc')}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-5 border border-green-100">
                      <div className="text-3xl font-bold text-green-700 mb-2">12.4m</div>
                      <div className="text-green-900 font-medium">{t('pipeline.overview.avgDuration')}</div>
                      <p className="text-green-700 text-sm mt-1">{t('pipeline.overview.avgDurationDesc')}</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
                      <div className="text-3xl font-bold text-purple-700 mb-2">24/7</div>
                      <div className="text-purple-900 font-medium">{t('pipeline.overview.monitoring')}</div>
                      <p className="text-purple-700 text-sm mt-1">{t('pipeline.overview.monitoringDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Workflows Tab */}
            {activeTab === 'workflows' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('pipeline.workflows.title')}</h2>
                <div className="grid grid-cols-1 gap-6">
                  {pipelineData.workflows.map((workflow) => (
                    <div key={workflow.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{workflow.name}</h3>
                          <p className="text-gray-600 mt-1">{workflow.description}</p>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            {t('pipeline.workflows.trigger')}: {workflow.trigger}
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(workflow.status)}`}>
                          {workflow.status}
                        </span>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium text-gray-900 mb-3">{t('pipeline.workflows.recentRuns')}</h4>
                        <div className="space-y-3">
                          {workflow.runs.map((run) => (
                            <div key={run.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center">
                                <div className={`mr-3 rounded-full p-1 ${run.status === 'success' ? 'bg-green-100' : run.status === 'failed' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                                  {run.status === 'success' ? (
                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  ) : run.status === 'failed' ? (
                                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  ) : (
                                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                  )}
                                </div>
                                <span className="font-mono text-sm">{run.id}</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500">{formatTime(run.timestamp)}</span>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(run.status)}`}>
                                  {run.duration}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transparency Logs Tab */}
            {activeTab === 'transparency' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('pipeline.transparency.title')}</h2>
                <div className="space-y-4">
                  {pipelineData.transparencyLogs.map((log) => (
                    <div key={log.id} className="border border-gray-200 rounded-lg p-5">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className={`mr-4 rounded-full p-2 ${log.type === 'info' ? 'bg-blue-100' : log.type === 'warning' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                            {log.type === 'info' ? (
                              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            ) : log.type === 'warning' ? (
                              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{log.message}</h3>
                            <p className="text-gray-500 text-sm mt-1">{formatTime(log.timestamp)}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${log.type === 'info' ? 'bg-blue-100 text-blue-800' : log.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {log.type}
                        </span>
                      </div>
                      
                      <div className="mt-4 ml-12 pl-4 border-l-2 border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {Object.entries(log.details).map(([key, value]) => (
                            <div key={key} className="flex">
                              <span className="text-gray-500 w-32">{key}:</span>
                              <span className="text-gray-900">
                                {Array.isArray(value) ? (
                                  <ul className="list-disc list-inside">
                                    {value.map((item, idx) => (
                                      <li key={idx}>{item}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  value
                                )}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    {t('pipeline.transparency.loadMore')}
                    <svg className="ml-2 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('pipeline.documentation')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('pipeline.docs.pipeline')}</h3>
              <p className="text-gray-600 mb-4">{t('pipeline.docs.pipelineDesc')}</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('pipeline.readMore')}
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('pipeline.docs.security')}</h3>
              <p className="text-gray-600 mb-4">{t('pipeline.docs.securityDesc')}</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('pipeline.learn')}
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('pipeline.docs.contributing')}</h3>
              <p className="text-gray-600 mb-4">{t('pipeline.docs.contributingDesc')}</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('pipeline.contribute')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CICDPipeline;