import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const DataInsights = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [analyticsData, setAnalyticsData] = useState({
    aidEfficiency: 87,
    deliveryTime: 2.3,
    corruptionIndex: 0.15,
    impactROI: 3.7
  });

  // Mock data for charts
  const mockChartData = {
    aidEfficiency: [
      { month: 'Jan', value: 78 },
      { month: 'Feb', value: 82 },
      { month: 'Mar', value: 85 },
      { month: 'Apr', value: 87 },
      { month: 'May', value: 89 },
      { month: 'Jun', value: 87 }
    ],
    deliveryTime: [
      { month: 'Jan', days: 3.2 },
      { month: 'Feb', days: 2.8 },
      { month: 'Mar', days: 2.5 },
      { month: 'Apr', days: 2.4 },
      { month: 'May', days: 2.3 },
      { month: 'Jun', days: 2.3 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('dataInsights.title')}</h1>
          <p className="mt-2 text-gray-600">{t('dataInsights.description')}</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('dataInsights.dashboard')}
            </button>
            <button
              onClick={() => setActiveTab('prediction')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'prediction'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('dataInsights.prediction')}
            </button>
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Aid Efficiency Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">{t('dataInsights.aidEfficiency')}</h3>
                  <p className="text-2xl font-semibold text-gray-900">{analyticsData.aidEfficiency}%</p>
                </div>
              </div>
            </div>

            {/* Delivery Time Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">{t('dataInsights.deliveryTime')}</h3>
                  <p className="text-2xl font-semibold text-gray-900">{analyticsData.deliveryTime} {t('dataInsights.days')}</p>
                </div>
              </div>
            </div>

            {/* Corruption Index Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-full">
                  <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">{t('dataInsights.corruptionIndex')}</h3>
                  <p className="text-2xl font-semibold text-gray-900">{analyticsData.corruptionIndex}</p>
                </div>
              </div>
            </div>

            {/* Impact ROI Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">{t('dataInsights.impactROI')}</h3>
                  <p className="text-2xl font-semibold text-gray-900">{analyticsData.impactROI}:1</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prediction Tab */}
        {activeTab === 'prediction' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dataInsights.predictionTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">{t('dataInsights.highRiskZones')}</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Western Ghats</span>
                    <span className="text-red-600 font-medium">85% Risk</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Brahmaputra Valley</span>
                    <span className="text-orange-600 font-medium">72% Risk</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Eastern Coast</span>
                    <span className="text-yellow-600 font-medium">65% Risk</span>
                  </li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">{t('dataInsights.fundingRecommendations')}</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Flood Preparedness</span>
                    <span className="text-green-600 font-medium">₹45M</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Early Warning Systems</span>
                    <span className="text-green-600 font-medium">₹32M</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Evacuation Infrastructure</span>
                    <span className="text-green-600 font-medium">₹28M</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataInsights;