import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Analytics = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('fraudDetection');
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data for charts
  const fraudDetectionData = [
    { date: '2023-10-18', legitimate: 120, suspicious: 8, fraudulent: 2 },
    { date: '2023-10-19', legitimate: 135, suspicious: 12, fraudulent: 3 },
    { date: '2023-10-20', legitimate: 110, suspicious: 15, fraudulent: 5 },
    { date: '2023-10-21', legitimate: 145, suspicious: 7, fraudulent: 1 },
    { date: '2023-10-22', legitimate: 125, suspicious: 10, fraudulent: 3 },
    { date: '2023-10-23', legitimate: 140, suspicious: 9, fraudulent: 2 },
    { date: '2023-10-24', legitimate: 130, suspicious: 11, fraudulent: 4 }
  ];

  const anomalyDetectionData = [
    { type: 'Transaction Amount', anomalies: 42 },
    { type: 'Geographic Location', anomalies: 28 },
    { type: 'Timing Patterns', anomalies: 35 },
    { type: 'User Behavior', anomalies: 19 },
    { type: 'Device Fingerprint', anomalies: 23 }
  ];

  const verificationChecksData = [
    { name: 'NGO Reports', pass: 85, fail: 15 },
    { name: 'IoT Sensors', pass: 92, fail: 8 },
    { name: 'Drone Imagery', pass: 78, fail: 22 },
    { name: 'Satellite Data', pass: 88, fail: 12 },
    { name: 'Community Reports', pass: 76, fail: 24 }
  ];

  const mlModelPerformanceData = [
    { model: 'Fraud Detection', accuracy: 94.2, precision: 92.8, recall: 89.5 },
    { model: 'Anomaly Detection', accuracy: 88.7, precision: 85.3, recall: 91.2 },
    { model: 'Verification Engine', accuracy: 96.1, precision: 95.4, recall: 93.7 },
    { model: 'Risk Assessment', accuracy: 91.5, precision: 89.9, recall: 87.3 }
  ];

  const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="analytics-container">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{t('analytics.title')}</h1>
        <p className="text-gray-600 mb-8">{t('analytics.subtitle')}</p>

        {/* Time Range Selector */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            {['24h', '7d', '30d', '90d'].map(range => (
              <button
                key={range}
                type="button"
                className={`px-4 py-2 text-sm font-medium ${
                  timeRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } border border-gray-200 rounded-md transition duration-300`}
                onClick={() => setTimeRange(range)}
              >
                {t(`analytics.${range}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b">
          <nav className="flex space-x-8">
            <button
              className={`py-2 px-1 font-medium text-sm ${activeTab === 'fraudDetection' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('fraudDetection')}
            >
              {t('analytics.fraudDetection')}
            </button>
            <button
              className={`py-2 px-1 font-medium text-sm ${activeTab === 'anomalyDetection' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('anomalyDetection')}
            >
              {t('analytics.anomalyDetection')}
            </button>
            <button
              className={`py-2 px-1 font-medium text-sm ${activeTab === 'verification' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('verification')}
            >
              {t('analytics.verificationChecks')}
            </button>
            <button
              className={`py-2 px-1 font-medium text-sm ${activeTab === 'mlWorkflow' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('mlWorkflow')}
            >
              {t('analytics.mlWorkflow')}
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'fraudDetection' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('analytics.fraudDetectionTitle')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 rounded-lg p-5">
                  <div className="text-3xl font-bold text-green-600">92.4%</div>
                  <div className="text-gray-700">{t('analytics.accuracyRate')}</div>
                  <div className="text-sm text-gray-500 mt-1">{t('analytics.accuracyDescription')}</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-5">
                  <div className="text-3xl font-bold text-yellow-600">3.2%</div>
                  <div className="text-gray-700">{t('analytics.falsePositiveRate')}</div>
                  <div className="text-sm text-gray-500 mt-1">{t('analytics.falsePositiveDescription')}</div>
                </div>
                <div className="bg-red-50 rounded-lg p-5">
                  <div className="text-3xl font-bold text-red-600">0.8%</div>
                  <div className="text-gray-700">{t('analytics.missedFraudRate')}</div>
                  <div className="text-sm text-gray-500 mt-1">{t('analytics.missedFraudDescription')}</div>
                </div>
              </div>

              <div className="h-80 mb-8">
                <h3 className="text-lg font-medium mb-4">{t('analytics.fraudTrend')}</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={fraudDetectionData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="legitimate" stackId="1" stroke="#10B981" fill="#10B981" name={t('analytics.legitimate')} />
                    <Area type="monotone" dataKey="suspicious" stackId="1" stroke="#F59E0B" fill="#F59E0B" name={t('analytics.suspicious')} />
                    <Area type="monotone" dataKey="fraudulent" stackId="1" stroke="#EF4444" fill="#EF4444" name={t('analytics.fraudulent')} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-xl font-medium mt-6 mb-3">{t('analytics.mlApproach')}</h3>
                <p>{t('analytics.mlApproachDescription')}</p>
                
                <h4 className="text-lg font-medium mt-4 mb-2">{t('analytics.keyFeatures')}</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('analytics.featureRealTime')}</li>
                  <li>{t('analytics.featureMultiSource')}</li>
                  <li>{t('analytics.featureBehavioral')}</li>
                  <li>{t('analytics.featureGraph')}</li>
                  <li>{t('analytics.featureExplainable')}</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'anomalyDetection' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('analytics.anomalyDetectionTitle')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-5">
                  <div className="text-3xl font-bold text-blue-600">147</div>
                  <div className="text-gray-700">{t('analytics.anomaliesDetected')}</div>
                  <div className="text-sm text-gray-500 mt-1">{t('analytics.anomaliesDescription')}</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-5">
                  <div className="text-3xl font-bold text-purple-600">89.3%</div>
                  <div className="text-gray-700">{t('analytics.investigationRate')}</div>
                  <div className="text-sm text-gray-500 mt-1">{t('analytics.investigationDescription')}</div>
                </div>
                <div className="bg-indigo-50 rounded-lg p-5">
                  <div className="text-3xl font-bold text-indigo-600">76.8%</div>
                  <div className="text-gray-700">{t('analytics.resolutionRate')}</div>
                  <div className="text-sm text-gray-500 mt-1">{t('analytics.resolutionDescription')}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-80">
                  <h3 className="text-lg font-medium mb-4">{t('analytics.anomalyByType')}</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={anomalyDetectionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="anomalies" name={t('analytics.anomalies')}>
                        {anomalyDetectionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">{t('analytics.anomalyBreakdown')}</h3>
                  <div className="space-y-4">
                    {anomalyDetectionData.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">{item.type}</span>
                            <span>{item.anomalies}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${(item.anomalies / Math.max(...anomalyDetectionData.map(d => d.anomalies))) * 100}%`,
                                backgroundColor: COLORS[index % COLORS.length]
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="prose max-w-none mt-8">
                <h3 className="text-xl font-medium mt-6 mb-3">{t('analytics.detectionMethodology')}</h3>
                <p>{t('analytics.detectionMethodologyDescription')}</p>
                
                <h4 className="text-lg font-medium mt-4 mb-2">{t('analytics.detectionTechniques')}</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('analytics.techniqueStatistical')}</li>
                  <li>{t('analytics.techniqueClustering')}</li>
                  <li>{t('analytics.techniqueIsolation')}</li>
                  <li>{t('analytics.techniqueAutoencoders')}</li>
                  <li>{t('analytics.techniqueLSTM')}</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'verification' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('analytics.verificationTitle')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 rounded-lg p-5">
                  <div className="text-3xl font-bold text-green-600">91.7%</div>
                  <div className="text-gray-700">{t('analytics.verificationSuccess')}</div>
                  <div className="text-sm text-gray-500 mt-1">{t('analytics.verificationDescription')}</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-5">
                  <div className="text-3xl font-bold text-blue-600">3.8%</div>
                  <div className="text-gray-700">{t('analytics.manualReview')}</div>
                  <div className="text-sm text-gray-500 mt-1">{t('analytics.manualDescription')}</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-5">
                  <div className="text-3xl font-bold text-yellow-600">4.5%</div>
                  <div className="text-gray-700">{t('analytics.rejected')}</div>
                  <div className="text-sm text-gray-500 mt-1">{t('analytics.rejectedDescription')}</div>
                </div>
              </div>

              <div className="h-80 mb-8">
                <h3 className="text-lg font-medium mb-4">{t('analytics.verificationBySource')}</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={verificationChecksData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pass" name={t('analytics.passed')} fill="#10B981" />
                    <Bar dataKey="fail" name={t('analytics.failed')} fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-xl font-medium mt-6 mb-3">{t('analytics.verificationProcess')}</h3>
                <p>{t('analytics.verificationProcessDescription')}</p>
                
                <h4 className="text-lg font-medium mt-4 mb-2">{t('analytics.verificationSteps')}</h4>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>{t('analytics.stepDataCollection')}</li>
                  <li>{t('analytics.stepPreprocessing')}</li>
                  <li>{t('analytics.stepFeatureExtraction')}</li>
                  <li>{t('analytics.stepModelEvaluation')}</li>
                  <li>{t('analytics.stepConsensus')}</li>
                  <li>{t('analytics.stepDecision')}</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'mlWorkflow' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('analytics.mlWorkflowTitle')}</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">{t('analytics.modelPerformance')}</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('analytics.model')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('analytics.accuracy')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('analytics.precision')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('analytics.recall')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mlModelPerformanceData.map((model, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {model.model}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {model.accuracy}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {model.precision}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {model.recall}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="border rounded-lg p-5">
                  <h3 className="text-lg font-medium mb-3">{t('analytics.dataPipeline')}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-800">1</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{t('analytics.pipelineCollection')}</p>
                        <p className="text-xs text-gray-500">{t('analytics.pipelineCollectionDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-800">2</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{t('analytics.pipelineProcessing')}</p>
                        <p className="text-xs text-gray-500">{t('analytics.pipelineProcessingDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-800">3</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{t('analytics.pipelineTraining')}</p>
                        <p className="text-xs text-gray-500">{t('analytics.pipelineTrainingDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-800">4</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{t('analytics.pipelineDeployment')}</p>
                        <p className="text-xs text-gray-500">{t('analytics.pipelineDeploymentDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-800">5</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{t('analytics.pipelineMonitoring')}</p>
                        <p className="text-xs text-gray-500">{t('analytics.pipelineMonitoringDesc')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-5">
                  <h3 className="text-lg font-medium mb-3">{t('analytics.mlArchitecture')}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{t('analytics.dataSources')}</h4>
                      <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
                        <li>{t('analytics.sourceBlockchain')}</li>
                        <li>{t('analytics.sourceIoT')}</li>
                        <li>{t('analytics.sourceSatellite')}</li>
                        <li>{t('analytics.sourceReports')}</li>
                        <li>{t('analytics.sourceSocial')}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{t('analytics.mlTechniques')}</h4>
                      <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
                        <li>{t('analytics.techniqueSupervised')}</li>
                        <li>{t('analytics.techniqueUnsupervised')}</li>
                        <li>{t('analytics.techniqueDeepLearning')}</li>
                        <li>{t('analytics.techniqueEnsemble')}</li>
                        <li>{t('analytics.techniqueReinforcement')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-xl font-medium mt-6 mb-3">{t('analytics.continuousLearning')}</h3>
                <p>{t('analytics.continuousLearningDescription')}</p>
                
                <h4 className="text-lg font-medium mt-4 mb-2">{t('analytics.learningComponents')}</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('analytics.componentFeedback')}</li>
                  <li>{t('analytics.componentRetraining')}</li>
                  <li>{t('analytics.componentAblation')}</li>
                  <li>{t('analytics.componentFederation')}</li>
                  <li>{t('analytics.componentExplainability')}</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;