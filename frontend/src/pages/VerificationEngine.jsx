import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const VerificationEngine = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('oracles');

  // Mock data for multi-source oracles
  const oracles = [
    { id: 1, name: "NGO Reports", type: "Human", trustScore: 92, status: "Active" },
    { id: 2, name: "IoT Sensors", type: "Device", trustScore: 88, status: "Active" },
    { id: 3, name: "Drone Imagery", type: "Satellite", trustScore: 95, status: "Active" },
    { id: 4, name: "Satellite Data", type: "Satellite", trustScore: 90, status: "Active" },
    { id: 5, name: "On-ground Agents", type: "Human", trustScore: 85, status: "Active" }
  ];

  // Mock data for false report detection
  const detections = [
    { id: 1, project: "Kerala Flood Relief", reporter: "NGO-124", confidence: 96, status: "Flagged" },
    { id: 2, project: "Earthquake Response", reporter: "IoT-87", confidence: 88, status: "Verified" },
    { id: 3, project: "Drought Mitigation", reporter: "Sat-45", confidence: 92, status: "Flagged" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            {t('verificationEngine.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('verificationEngine.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('oracles')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'oracles'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('verificationEngine.multiSourceOracles')}
              </button>
              <button
                onClick={() => setActiveTab('registry')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'registry'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('verificationEngine.oracleRegistry')}
              </button>
              <button
                onClick={() => setActiveTab('detection')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'detection'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('verificationEngine.fraudDetection')}
              </button>
              <button
                onClick={() => setActiveTab('scoring')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'scoring'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('verificationEngine.trustScoring')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'oracles' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('verificationEngine.multiSourceOracles')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {oracles.map((oracle) => (
                    <div key={oracle.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{oracle.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          oracle.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {oracle.status}
                        </span>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>{t('verificationEngine.trustScore')}</span>
                          <span>{oracle.trustScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full" 
                            style={{ width: `${oracle.trustScore}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                        </svg>
                        <span>{oracle.type} {t('verificationEngine.oracle')}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('verificationEngine.oracleIntegration')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-indigo-200">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">{t('verificationEngine.ngoData')}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-indigo-200">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">{t('verificationEngine.iotDevices')}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-indigo-200">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">{t('verificationEngine.drones')}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-indigo-200">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 22V12h6v10"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">{t('verificationEngine.satellites')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'registry' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('verificationEngine.decentralizedOracleRegistry')}
                </h2>
                <div className="overflow-x-auto mb-8">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('verificationEngine.oracleName')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('verificationEngine.type')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('verificationEngine.validator')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('verificationEngine.trustScore')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('verificationEngine.status')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {oracles.map((oracle) => (
                        <tr key={oracle.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {oracle.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {oracle.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Community
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{oracle.trustScore}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              oracle.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {oracle.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('verificationEngine.communityValidation')}
                  </h3>
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <div className="text-2xl font-bold text-gray-900">94.2%</div>
                      <div className="text-sm text-gray-600">{t('verificationEngine.validationRate')}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{t('verificationEngine.communityParticipation')}</span>
                        <span>94.2%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '94.2%' }}></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {t('verificationEngine.validationDesc')}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'detection' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('verificationEngine.fraudDetectionEngine')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('verificationEngine.mlDetectionModel')}
                    </h3>
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        <div className="text-2xl font-bold text-gray-900">97.8%</div>
                        <div className="text-sm text-gray-600">{t('verificationEngine.accuracy')}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>{t('verificationEngine.modelPerformance')}</span>
                          <span>97.8%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '97.8%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('verificationEngine.falsePositives')}</span>
                        <span className="font-medium">1.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('verificationEngine.falseNegatives')}</span>
                        <span className="font-medium">0.9%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('verificationEngine.processingSpeed')}</span>
                        <span className="font-medium">2.3ms</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('verificationEngine.flaggedReports')}
                    </h3>
                    <div className="space-y-4">
                      {detections.map((detection) => (
                        <div key={detection.id} className="flex justify-between items-center pb-3 border-b border-gray-200">
                          <div>
                            <div className="font-medium text-gray-900">{detection.project}</div>
                            <div className="text-sm text-gray-600">{detection.reporter}</div>
                          </div>
                          <div className="text-right">
                            <div className={`font-medium ${
                              detection.status === 'Flagged' ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {detection.confidence}%
                            </div>
                            <div className="text-sm text-gray-600">{detection.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('verificationEngine.detectionFeatures')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('verificationEngine.feature1')}</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('verificationEngine.feature2')}</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('verificationEngine.feature3')}</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('verificationEngine.feature4')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'scoring' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('verificationEngine.trustScoringSystem')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="text-3xl font-bold mb-2">87.5</div>
                    <div className="text-sm opacity-90">{t('verificationEngine.averageTrustScore')}</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-6 text-white">
                    <div className="text-3xl font-bold mb-2">92.3</div>
                    <div className="text-sm opacity-90">{t('verificationEngine.highestScore')}</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white">
                    <div className="text-3xl font-bold mb-2">76.8</div>
                    <div className="text-sm opacity-90">{t('verificationEngine.lowestScore')}</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('verificationEngine.trustFactors')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">{t('verificationEngine.dataConsistency')}</span>
                        <span className="text-gray-900 font-medium">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">{t('verificationEngine.historicalAccuracy')}</span>
                        <span className="text-gray-900 font-medium">88%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">{t('verificationEngine.communityFeedback')}</span>
                        <span className="text-gray-900 font-medium">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">{t('verificationEngine.timeliness')}</span>
                        <span className="text-gray-900 font-medium">90%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('verificationEngine.scoringMethodology')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('verificationEngine.methodologyDesc')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="text-indigo-600 font-bold mb-1">30%</div>
                      <div className="text-sm text-gray-600">{t('verificationEngine.dataQuality')}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="text-indigo-600 font-bold mb-1">25%</div>
                      <div className="text-sm text-gray-600">{t('verificationEngine.consistency')}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="text-indigo-600 font-bold mb-1">20%</div>
                      <div className="text-sm text-gray-600">{t('verificationEngine.community')}</div>
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

export default VerificationEngine;