import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { predictDisasterRisk, getHistoricalData, getWeatherData } from '../utils/disasterPrediction';

const DisasterPrediction = () => {
  const { t } = useTranslation();
  const [selectedRegion, setSelectedRegion] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [riskLevel, setRiskLevel] = useState('low');
  const [activeTab, setActiveTab] = useState('predictions');
  const [alerts, setAlerts] = useState([]); // New state for alerts
  const [dismissedAlerts, setDismissedAlerts] = useState([]); // State for dismissed alerts
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true); // State for auto-refresh toggle

  // Sample regions for India
  const regions = [
    { id: 'maharashtra', name: 'Maharashtra', lat: 19.7515, lng: 75.7139 },
    { id: 'kerala', name: 'Kerala', lat: 10.8505, lng: 76.2711 },
    { id: 'uttarakhand', name: 'Uttarakhand', lat: 30.0668, lng: 79.0193 },
    { id: 'odisha', name: 'Odisha', lat: 20.9517, lng: 85.0985 },
    { id: 'assam', name: 'Assam', lat: 26.2006, lng: 92.9376 },
    { id: 'rajasthan', name: 'Rajasthan', lat: 27.0238, lng: 74.2179 }
  ];

  useEffect(() => {
    // Load initial data
    loadHistoricalData();
  }, []);

  const loadHistoricalData = () => {
    const data = getHistoricalData();
    setHistoricalData(data);
  };

  const loadWeatherData = (region) => {
    const data = getWeatherData(region);
    setWeatherData(data);
  };

  // Generate alerts based on predictions and weather data
  const generateAlerts = (predictions, weatherData) => {
    const newAlerts = [];
    
    // Check for high risk predictions
    predictions.forEach(prediction => {
      if (prediction.riskScore >= 80) {
        newAlerts.push({
          id: `risk-${Date.now()}-${prediction.type}`,
          type: 'danger',
          message: t('disasterPrediction.alerts.highRisk', { 
            disaster: t(`disasterTypes.${prediction.type}`),
            score: prediction.riskScore 
          }),
          timestamp: new Date().toISOString(),
          priority: 'high'
        });
      } else if (prediction.riskScore >= 60) {
        newAlerts.push({
          id: `risk-${Date.now()}-${prediction.type}`,
          type: 'warning',
          message: t('disasterPrediction.alerts.moderateRisk', { 
            disaster: t(`disasterTypes.${prediction.type}`),
            score: prediction.riskScore 
          }),
          timestamp: new Date().toISOString(),
          priority: 'medium'
        });
      }
    });
    
    // Check for extreme weather conditions
    if (weatherData) {
      if (weatherData.precipitation > 150) {
        newAlerts.push({
          id: `weather-${Date.now()}-precipitation`,
          type: 'warning',
          message: t('disasterPrediction.alerts.heavyRain', { 
            amount: weatherData.precipitation 
          }),
          timestamp: new Date().toISOString(),
          priority: 'medium'
        });
      }
      
      if (weatherData.windSpeed > 100) {
        newAlerts.push({
          id: `weather-${Date.now()}-wind`,
          type: 'danger',
          message: t('disasterPrediction.alerts.highWinds', { 
            speed: weatherData.windSpeed 
          }),
          timestamp: new Date().toISOString(),
          priority: 'high'
        });
      }
      
      // Check for extreme temperatures
      if (weatherData.temperature > 45) {
        newAlerts.push({
          id: `weather-${Date.now()}-heat`,
          type: 'danger',
          message: t('disasterPrediction.alerts.extremeHeat', { 
            temperature: weatherData.temperature 
          }),
          timestamp: new Date().toISOString(),
          priority: 'high'
        });
      } else if (weatherData.temperature < 5) {
        newAlerts.push({
          id: `weather-${Date.now()}-cold`,
          type: 'warning',
          message: t('disasterPrediction.alerts.extremeCold', { 
            temperature: weatherData.temperature 
          }),
          timestamp: new Date().toISOString(),
          priority: 'medium'
        });
      }
      
      // Check for extreme humidity
      if (weatherData.humidity > 90) {
        newAlerts.push({
          id: `weather-${Date.now()}-humidity`,
          type: 'warning',
          message: t('disasterPrediction.alerts.highHumidity', { 
            humidity: weatherData.humidity 
          }),
          timestamp: new Date().toISOString(),
          priority: 'medium'
        });
      }
      
      // Check for extreme pressure changes
      if (weatherData.pressure && weatherData.pressure < 980) {
        newAlerts.push({
          id: `weather-${Date.now()}-pressure`,
          type: 'warning',
          message: t('disasterPrediction.alerts.lowPressure', { 
            pressure: weatherData.pressure 
          }),
          timestamp: new Date().toISOString(),
          priority: 'medium'
        });
      }
    }
    
    return newAlerts;
  };

  const handleRegionChange = (e) => {
    const regionId = e.target.value;
    setSelectedRegion(regionId);
    
    if (regionId) {
      // Get predictions for the selected region
      const region = regions.find(r => r.id === regionId);
      const pred = predictDisasterRisk(region);
      setPredictions(pred);
      
      // Load weather data
      loadWeatherData(region);
      
      // Generate alerts
      const alerts = generateAlerts(pred, getWeatherData(region));
      // Filter out dismissed alerts
      const activeAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.id));
      setAlerts(activeAlerts);
      
      // Determine risk level based on predictions
      const maxRisk = Math.max(...pred.map(p => p.riskScore));
      if (maxRisk >= 80) {
        setRiskLevel('critical');
      } else if (maxRisk >= 60) {
        setRiskLevel('high');
      } else if (maxRisk >= 40) {
        setRiskLevel('moderate');
      } else {
        setRiskLevel('low');
      }
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'moderate': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getRiskLabel = (level) => {
    switch (level) {
      case 'critical': return t('disasterPrediction.risk.critical');
      case 'high': return t('disasterPrediction.risk.high');
      case 'moderate': return t('disasterPrediction.risk.moderate');
      default: return t('disasterPrediction.risk.low');
    }
  };

  // Get alert color based on type
  const getAlertColor = (type) => {
    switch (type) {
      case 'danger': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };
  
  // Get priority badge color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  // Dismiss an alert
  const dismissAlert = (alertId) => {
    setDismissedAlerts(prev => [...prev, alertId]);
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };
  
  // Refresh alerts
  const refreshAlerts = () => {
    if (selectedRegion) {
      const region = regions.find(r => r.id === selectedRegion);
      const pred = predictDisasterRisk(region);
      const alerts = generateAlerts(pred, getWeatherData(region));
      // Filter out dismissed alerts
      const activeAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.id));
      setAlerts(activeAlerts);
    }
  };
  
  // Clear all dismissed alerts
  const clearDismissedAlerts = () => {
    setDismissedAlerts([]);
  };
  
  // Toggle auto-refresh
  const toggleAutoRefresh = () => {
    setAutoRefreshEnabled(!autoRefreshEnabled);
  };
  
  // Auto-refresh alerts every 5 minutes
  useEffect(() => {
    let interval;
    if (selectedRegion && autoRefreshEnabled) {
      interval = setInterval(() => {
        refreshAlerts();
      }, 300000); // 5 minutes
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedRegion, dismissedAlerts, autoRefreshEnabled]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('disasterPrediction.title')}</h2>
      <p className="text-gray-600 mb-6">{t('disasterPrediction.description')}</p>
      
      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{t('disasterPrediction.alerts.title')}</h3>
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleAutoRefresh}
                className={`text-xs px-2 py-1 rounded ${autoRefreshEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
              >
                {autoRefreshEnabled ? t('disasterPrediction.autoRefreshOn') : t('disasterPrediction.autoRefreshOff')}
              </button>
              <button 
                onClick={refreshAlerts}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                aria-label={t('common.refresh')}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                {t('common.refresh')}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {alerts.map(alert => (
              <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)} relative`}>
                <div className="flex justify-between items-start">
                  <div>
                    <span>{alert.message}</span>
                    <div className="text-xs opacity-75 mt-1">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  <button 
                    onClick={() => dismissAlert(alert.id)}
                    className="text-gray-500 hover:text-gray-700 ml-2"
                    aria-label={t('common.dismiss')}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <div className="absolute top-0 right-0 -mt-1 -mr-1 flex">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)} text-white`}>
                    {t(`disasterPrediction.priority.${alert.priority}`)}
                  </span>
                </div>
                {alert.priority === 'high' && (
                  <div className="absolute top-0 left-0 -mt-1 -ml-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
          {dismissedAlerts.length > 0 && (
            <div className="mt-2 text-right">
              <button 
                onClick={clearDismissedAlerts}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                {t('disasterPrediction.clearDismissed')}
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Region Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('disasterPrediction.selectRegion')}
        </label>
        <select
          value={selectedRegion}
          onChange={handleRegionChange}
          className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">{t('disasterPrediction.selectRegion')}</option>
          {regions.map(region => (
            <option key={region.id} value={region.id}>{region.name}</option>
          ))}
        </select>
      </div>
      
      {/* Risk Level Indicator */}
      {selectedRegion && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded-full ${getRiskColor(riskLevel)} mr-2`}></div>
            <span className="font-medium">{t('disasterPrediction.currentRiskLevel')}:</span>
            <span className="ml-2 font-bold">{getRiskLabel(riskLevel)}</span>
          </div>
          {weatherData && (
            <div className="mt-2 text-sm text-gray-600">
              {t('disasterPrediction.currentWeather')}: {weatherData.temperature}°C, {weatherData.humidity}% humidity, {weatherData.precipitation}mm precipitation
            </div>
          )}
        </div>
      )}
      
      {/* Tab Navigation */}
      {selectedRegion && (
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('predictions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'predictions'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('disasterPrediction.tabs.predictions')}
            </button>
            <button
              onClick={() => setActiveTab('historical')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'historical'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('disasterPrediction.tabs.historical')}
            </button>
            <button
              onClick={() => setActiveTab('factors')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'factors'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('disasterPrediction.tabs.factors')}
            </button>
          </nav>
        </div>
      )}
      
      {/* Tab Content */}
      <div className="mt-6">
        {/* Predictions Tab */}
        {activeTab === 'predictions' && selectedRegion && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('disasterPrediction.predictions.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {predictions.map((prediction, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">{t(`disasterTypes.${prediction.type}`)}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      prediction.riskScore >= 80 ? 'bg-red-100 text-red-800' :
                      prediction.riskScore >= 60 ? 'bg-orange-100 text-orange-800' :
                      prediction.riskScore >= 40 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {prediction.riskScore}%
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {t('disasterPrediction.probability')}: {prediction.probability}%
                  </div>
                  <div className="mt-2 text-sm">
                    {t('disasterPrediction.expectedImpact')}: {prediction.impact}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {t('disasterPrediction.timeline')}: {prediction.timeline}
                  </div>
                  {prediction.recommendations && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="text-xs font-medium text-gray-700">{t('disasterPrediction.recommendations')}:</div>
                      <ul className="mt-1 text-xs text-gray-600 list-disc list-inside">
                        {prediction.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Historical Data Tab */}
        {activeTab === 'historical' && selectedRegion && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('disasterPrediction.historical.title')}</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('disasterPrediction.historical.year')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('disasterPrediction.historical.disasterType')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('disasterPrediction.historical.affected')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('disasterPrediction.historical.economicLoss')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {historicalData.map((record, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {record.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {t(`disasterTypes.${record.type}`)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.affected.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{(record.economicLoss / 10000000).toFixed(1)}Cr
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Risk Factors Tab */}
        {activeTab === 'factors' && selectedRegion && weatherData && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('disasterPrediction.factors.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-3">{t('disasterPrediction.factors.weather')}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterPrediction.factors.temperature')}:</span>
                    <span className="font-medium">{weatherData.temperature}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterPrediction.factors.humidity')}:</span>
                    <span className="font-medium">{weatherData.humidity}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterPrediction.factors.precipitation')}:</span>
                    <span className="font-medium">{weatherData.precipitation}mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterPrediction.factors.windSpeed')}:</span>
                    <span className="font-medium">{weatherData.windSpeed} km/h</span>
                  </div>
                  {weatherData.pressure && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('disasterPrediction.factors.pressure')}:</span>
                      <span className="font-medium">{weatherData.pressure} hPa</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-3">{t('disasterPrediction.factors.geographical')}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterPrediction.factors.elevation')}:</span>
                    <span className="font-medium">{weatherData.elevation}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterPrediction.factors.forestCover')}:</span>
                    <span className="font-medium">{weatherData.forestCover}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterPrediction.factors.riverProximity')}:</span>
                    <span className="font-medium">{weatherData.riverProximity} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterPrediction.factors.seismicActivity')}:</span>
                    <span className="font-medium">{weatherData.seismicActivity}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisasterPrediction;