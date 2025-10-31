import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getActiveAlerts, formatAlert, getAlertColor } from '../utils/disasterAlerts';

const DisasterAlerts = () => {
  const { t } = useTranslation();
  const [region, setRegion] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const activeAlerts = getActiveAlerts(region);
      const formattedAlerts = activeAlerts.map(alert => formatAlert(alert));
      setAlerts(formattedAlerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [region]);

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const handleRefresh = () => {
    fetchAlerts();
  };

  return (
    <div className="disaster-alerts p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{t('weatherAlerts.title')}</h2>
      
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <select
          value={region}
          onChange={handleRegionChange}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{t('disasterRisk.selectRegion')}</option>
          {indianStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? t('weatherAlerts.loading') : t('weatherAlerts.refresh')}
        </button>
      </div>

      {alerts.length === 0 && !loading && (
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('weatherAlerts.noAlerts')}</h3>
          <p className="text-gray-500">{t('weatherAlerts.noAlertsDesc')}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <p>{t('weatherAlerts.loading')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.severity)}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{t(`weatherAlerts.${alert.type}Warning`) || alert.title}</h3>
                  <p className="mt-1">{alert.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-sm">
                    <span className="bg-white bg-opacity-50 px-2 py-1 rounded">
                      {t('weatherAlerts.issued')}: {alert.issuedFormatted}
                    </span>
                    <span className="bg-white bg-opacity-50 px-2 py-1 rounded">
                      {t('weatherAlerts.expires')}: {alert.expiresFormatted}
                    </span>
                    <span className="bg-white bg-opacity-50 px-2 py-1 rounded">
                      {alert.timeRemaining} {t('weatherAlerts.remaining')}
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getAlertColor(alert.severity)}`}>
                  {alert.severity}
                </span>
              </div>
              
              {alert.safetyTip && (
                <div className="mt-3 p-3 bg-white bg-opacity-50 rounded">
                  <h4 className="font-medium flex items-center">
                    <span className="mr-2">⚠️</span>
                    {t('weatherAlerts.safetyTip')}
                  </h4>
                  <p className="mt-1 text-sm">{alert.safetyTip}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {alerts.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium flex items-center">
            <span className="mr-2">💡</span>
            {t('weatherAlerts.safetyTip')}
          </h3>
          <p className="mt-1 text-sm">{t('weatherAlerts.safetyTipDesc')}</p>
        </div>
      )}
    </div>
  );
};

export default DisasterAlerts;