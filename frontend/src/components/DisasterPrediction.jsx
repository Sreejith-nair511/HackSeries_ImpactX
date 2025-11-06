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
          timestamp: new Date().toISOString()
        });
      } else if (prediction.riskScore >= 60) {
        newAlerts.push({
          id: `risk-${Date.now()}-${prediction.type}`,
          type: 'warning',
          message: t('disasterPrediction.alerts.moderateRisk', { 
            disaster: t(`disasterTypes.${prediction.type}`),
            score: prediction.riskScore 
          }),
          timestamp: new Date().toISOString()
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
          timestamp: new Date().toISOString()
        });
      }
      
      if (weatherData.windSpeed > 100) {
        newAlerts.push({
          id: `weather-${Date.now()}-wind`,
          type: 'danger',
          message: t('disasterPrediction.alerts.highWinds', { 
            speed: weatherData.windSpeed 
          }),
          timestamp: new Date().toISOString()
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
      setAlerts(alerts);
      
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('disasterPrediction.title')}</h2>
      <p className="text-gray-600 mb-6">{t('disasterPrediction.description')}</p>
      
      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('disasterPrediction.alerts.title')}</h3>
          <div className="space-y-2">
            {alerts.map(alert => (
              <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                <div className="flex justify-between items-start">
                  <span>{alert.message}</span>
                  <span className="text-xs opacity-75">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
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