import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const VerificationEngine = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClaim, setSelectedClaim] = useState(null);

  // Mock data for NGO claims
  const ngoClaims = [
    {
      id: 1,
      ngo: 'Helping Hands Foundation',
      project: 'Flood Relief Distribution',
      location: 'Kerala',
      status: 'Verified',
      verificationScore: 92,
      beforeImage: '/images/before-flood.jpg',
      afterImage: '/images/after-relief.jpg'
    },
    {
      id: 2,
      ngo: 'Disaster Response Team',
      project: 'Emergency Shelter Construction',
      location: 'Assam',
      status: 'Pending',
      verificationScore: 75,
      beforeImage: '/images/before-shelter.jpg',
      afterImage: '/images/after-shelter.jpg'
    },
    {
      id: 3,
      ngo: 'Community Aid Network',
      project: 'Medical Camp Setup',
      location: 'Uttarakhand',
      status: 'Flagged',
      verificationScore: 45,
      beforeImage: '/images/before-medical.jpg',
      afterImage: '/images/after-medical.jpg'
    }
  ];

  const verificationMethods = [
    {
      name: t('verificationEngine.satelliteImagery'),
      description: t('verificationEngine.satelliteDescription'),
      accuracy: '95%'
    },
    {
      name: t('verificationEngine.droneSurveillance'),
      description: t('verificationEngine.droneDescription'),
      accuracy: '92%'
    },
    {
      name: t('verificationEngine.iotSensors'),
      description: t('verificationEngine.iotDescription'),
      accuracy: '88%'
    },
    {
      name: t('verificationEngine.communityReports'),
      description: t('verificationEngine.communityDescription'),
      accuracy: '85%'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('verificationEngine.title')}</h1>
          <p className="mt-2 text-gray-600">{t('verificationEngine.description')}</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('verificationEngine.overview')}
            </button>
            <button
              onClick={() => setActiveTab('claims')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'claims'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('verificationEngine.claims')}
            </button>
            <button
              onClick={() => setActiveTab('methods')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'methods'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('verificationEngine.methods')}
            </button>
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('verificationEngine.howItWorks')}</h2>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      1
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{t('verificationEngine.dataCollection')}</h3>
                    <p className="mt-2 text-gray-600">{t('verificationEngine.dataCollectionDesc')}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      2
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{t('verificationEngine.aiAnalysis')}</h3>
                    <p className="mt-2 text-gray-600">{t('verificationEngine.aiAnalysisDesc')}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      3
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{t('verificationEngine.verification')}</h3>
                    <p className="mt-2 text-gray-600">{t('verificationEngine.verificationDesc')}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      4
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{t('verificationEngine.fundingRelease')}</h3>
                    <p className="mt-2 text-gray-600">{t('verificationEngine.fundingReleaseDesc')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('verificationEngine.accuracyMetrics')}</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-gray-700">{t('verificationEngine.overallAccuracy')}</span>
                    <span className="text-sm font-medium text-gray-700">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-gray-700">{t('verificationEngine.falsePositives')}</span>
                    <span className="text-sm font-medium text-gray-700">3%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '3%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-gray-700">{t('verificationEngine.processingSpeed')}</span>
                    <span className="text-sm font-medium text-gray-700">2.5s/image</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Claims Tab */}
        {activeTab === 'claims' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{t('verificationEngine.ngoClaims')}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('verificationEngine.ngo')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('verificationEngine.project')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('verificationEngine.location')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('verificationEngine.status')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('verificationEngine.score')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('verificationEngine.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {ngoClaims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {claim.ngo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {claim.project}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {claim.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          claim.status === 'Verified' 
                            ? 'bg-green-100 text-green-800' 
                            : claim.status === 'Flagged' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {claim.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <span className="mr-2">{claim.verificationScore}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                claim.verificationScore > 80 
                                  ? 'bg-green-600' 
                                  : claim.verificationScore > 60 
                                    ? 'bg-yellow-600' 
                                    : 'bg-red-600'
                              }`} 
                              style={{ width: `${claim.verificationScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => setSelectedClaim(claim)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {t('verificationEngine.viewDetails')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Methods Tab */}
        {activeTab === 'methods' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {verificationMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{method.name}</h3>
                    <p className="text-sm text-gray-500">{method.accuracy} {t('verificationEngine.accuracy')}</p>
                  </div>
                </div>
                <p className="text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Claim Detail Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{selectedClaim.project}</h3>
                <button
                  onClick={() => setSelectedClaim(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('verificationEngine.before')}</h4>
                  <img 
                    src={selectedClaim.beforeImage} 
                    alt="Before" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('verificationEngine.after')}</h4>
                  <img 
                    src={selectedClaim.afterImage} 
                    alt="After" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">{t('verificationEngine.ngo')}</p>
                    <p className="font-medium">{selectedClaim.ngo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t('verificationEngine.location')}</p>
                    <p className="font-medium">{selectedClaim.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t('verificationEngine.verificationScore')}</p>
                    <p className="font-medium">{selectedClaim.verificationScore}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t('verificationEngine.status')}</p>
                    <p className="font-medium">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        selectedClaim.status === 'Verified' 
                          ? 'bg-green-100 text-green-800' 
                          : selectedClaim.status === 'Flagged' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedClaim.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationEngine;