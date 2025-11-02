import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StateDisasterStats from '../components/StateDisasterStats';
import DisasterStatsChart from '../components/DisasterStatsChart';
import RegionalStats from '../components/RegionalStats';

const DisasterStatisticsPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('state-stats');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {t('disasterStatistics.title')}
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          {t('disasterStatistics.description')}
        </p>
      </div>

      <div className="mb-8 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('state-stats')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'state-stats'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('disasterStatistics.tabs.overview')}
          </button>
          <button
            onClick={() => setActiveTab('charts')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'charts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('disasterStatistics.tabs.trends')}
          </button>
          <button
            onClick={() => setActiveTab('regional')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'regional'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('disasterStatistics.tabs.regional')}
          </button>
        </nav>
      </div>

      <div className="mb-8">
        {activeTab === 'state-stats' && (
          <div className="space-y-8">
            <StateDisasterStats />
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                {t('disasterStatistics.overview.title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                  <div className="text-gray-600">{t('disasterStatistics.overview.totalEvents')}</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-blue-600">45.2 {t('common.lakh')}</div>
                  <div className="text-gray-600">{t('disasterStatistics.overview.totalAffected')}</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-blue-600">₹1,842 {t('common.crore')}</div>
                  <div className="text-gray-600">{t('disasterStatistics.overview.totalEconomicLoss')}</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-blue-600">36,200</div>
                  <div className="text-gray-600">{t('disasterStatistics.overview.averageAffected')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'charts' && (
          <div className="space-y-8">
            <DisasterStatsChart />
          </div>
        )}

        {activeTab === 'regional' && (
          <div className="space-y-8">
            <RegionalStats />
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {t('disasterStatistics.insights')}
        </h2>
        <p className="text-gray-600 mb-4">
          {t('disasterStatistics.desc')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">{t('disasterTypes.flood')}</h3>
            <p className="text-sm text-blue-600">
              {t('common.flood_desc_insight')}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">{t('disasterTypes.drought')}</h3>
            <p className="text-sm text-green-600">
              {t('common.drought_desc_insight')}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">{t('disasterTypes.earthquake')}</h3>
            <p className="text-sm text-red-600">
              {t('common.earthquake_desc_insight')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterStatisticsPage;