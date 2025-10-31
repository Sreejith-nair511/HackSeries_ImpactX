import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchWeatherData, analyzeWeatherRisk, getPreparednessRecommendations, formatWeatherData } from '../utils/weatherMonitoring';

const WeatherMonitor = () => {
  const { t } = useTranslation();
  const [city, setCity] = useState('Delhi');
  const [weatherData, setWeatherData] = useState(null);
  const [riskAssessment, setRiskAssessment] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const indianCities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata',
    'Hyderabad', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow',
    'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal'
  ];

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(city);
      if (data) {
        const formattedData = formatWeatherData(data);
        setWeatherData(formattedData);
        
        const risk = analyzeWeatherRisk(data);
        setRiskAssessment(risk);
        
        const recs = getPreparednessRecommendations(data);
        setRecommendations(recs);
      } else {
        setError(t('weather.data_not_available'));
      }
    } catch (err) {
      setError(t('weather.fetch_error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleRefresh = () => {
    fetchWeather();
  };

  const getRiskClass = (riskLevel) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="weather-monitor p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{t('weather.title')}</h2>
      
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <select
          value={city}
          onChange={handleCityChange}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {indianCities.map((indianCity) => (
            <option key={indianCity} value={indianCity}>
              {indianCity}
            </option>
          ))}
        </select>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? t('weather.loading') : t('weather.refresh')}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {weatherData && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{weatherData.location}</h3>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{weatherData.temperatureFormatted}</span>
                <span className="text-lg">{weatherData.condition}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{t('weather.conditions')}</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-600">{t('weather.humidity')}</p>
                  <p className="font-medium">{weatherData.humidityFormatted}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('weather.wind_speed')}</p>
                  <p className="font-medium">{weatherData.windSpeedFormatted}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('weather.pressure')}</p>
                  <p className="font-medium">{weatherData.pressureFormatted}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('weather.visibility')}</p>
                  <p className="font-medium">{weatherData.visibilityFormatted}</p>
                </div>
              </div>
            </div>
          </div>

          {riskAssessment && (
            <div className={`p-4 rounded-lg ${getRiskClass(riskAssessment.riskLevel)}`}>
              <h3 className="font-semibold text-lg mb-2">{t('weather.risk_assessment')}</h3>
              <p className="mb-2">
                <span className="font-medium">{t('weather.risk_level')}:</span>{' '}
                <span className="capitalize">{riskAssessment.riskLevel}</span>
              </p>
              {riskAssessment.alerts.length > 0 && (
                <div>
                  <p className="font-medium">{t('weather.alerts')}:</p>
                  <ul className="list-disc pl-5 mt-1">
                    {riskAssessment.alerts.map((alert, index) => (
                      <li key={index}>{alert}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{t('weather.preparedness_recommendations')}</h3>
              <ul className="list-disc pl-5 space-y-1">
                {recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}

          {weatherData.forecast && (
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{t('weather.forecast')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="border border-purple-200 rounded p-3">
                    <p className="font-medium">{day.day}</p>
                    <p>{day.condition}</p>
                    <p>{t('weather.high')}: {day.high}°C</p>
                    <p>{t('weather.low')}: {day.low}°C</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherMonitor;