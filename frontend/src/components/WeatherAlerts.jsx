import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const WeatherAlerts = () => {
  const { t, i18n } = useTranslation();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock weather alerts data
  const mockAlerts = [
    {
      id: 1,
      type: 'flood',
      severity: 'high',
      title: t('weatherAlerts.floodWarning') || 'Flood Warning',
      description: t('weatherAlerts.floodWarningDesc') || 'Heavy rainfall expected in the region. Avoid low-lying areas.',
      issued: '2023-08-15T08:30:00Z',
      expires: '2023-08-16T08:30:00Z',
      region: 'Maharashtra'
    },
    {
      id: 2,
      type: 'cyclone',
      severity: 'medium',
      title: t('weatherAlerts.cycloneWatch') || 'Cyclone Watch',
      description: t('weatherAlerts.cycloneWatchDesc') || 'Cyclonic conditions developing over the Arabian Sea.',
      issued: '2023-08-14T14:15:00Z',
      expires: '2023-08-17T14:15:00Z',
      region: 'Gujarat'
    },
    {
      id: 3,
      type: 'heatwave',
      severity: 'high',
      title: t('weatherAlerts.heatwaveWarning') || 'Heatwave Warning',
      description: t('weatherAlerts.heatwaveWarningDesc') || 'Extreme heat conditions. Stay hydrated and avoid outdoor activities.',
      issued: '2023-08-15T06:00:00Z',
      expires: '2023-08-16T18:00:00Z',
      region: 'Rajasthan'
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch weather alerts
    const fetchAlerts = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAlerts(mockAlerts);
      setLoading(false);
    };

    fetchAlerts();
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 border-red-500 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'low': return 'bg-green-100 border-green-500 text-green-800';
      default: return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'flood':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
          </svg>
        );
      case 'cyclone':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'heatwave':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'earthquake':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {t('weatherAlerts.title') || 'Weather Alerts'}
        </h2>
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">{t('weatherAlerts.loading') || 'Loading weather alerts...'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {t('weatherAlerts.title') || 'Weather Alerts'}
        </h2>
        <button 
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          onClick={() => setAlerts(mockAlerts)}
        >
          {t('weatherAlerts.refresh') || 'Refresh'}
        </button>
      </div>
      
      {alerts.length === 0 ? (
        <div className="text-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            {t('weatherAlerts.noAlerts') || 'No Active Alerts'}
          </h3>
          <p className="mt-1 text-gray-500">
            {t('weatherAlerts.noAlertsDesc') || 'There are currently no weather alerts for your region.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`border-l-4 p-4 rounded-r-lg ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                      {alert.title}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize">
                      {alert.severity}
                    </span>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>{alert.description}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs">
                    <div>
                      <span className="font-medium">{t('weatherAlerts.issued')}:</span> {formatDate(alert.issued)}
                    </div>
                    <div>
                      <span className="font-medium">{t('weatherAlerts.expires')}:</span> {formatDate(alert.expires)}
                    </div>
                    <div>
                      <span className="font-medium">{t('weatherAlerts.region')}:</span> {alert.region}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">
          {t('weatherAlerts.safetyTip') || 'Safety Tip'}
        </h3>
        <p className="text-blue-700 text-sm">
          {t('weatherAlerts.safetyTipDesc') || 'Stay informed about weather conditions in your area. Sign up for local weather alerts and have an emergency plan ready.'}
        </p>
      </div>
    </div>
  );
};

export default WeatherAlerts;