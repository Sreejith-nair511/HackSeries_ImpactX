import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchWeatherData, analyzeWeatherRisk, getPreparednessRecommendations, formatWeatherData } from '../utils/weatherMonitoring';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeatherMonitor = () => {
  const { t } = useTranslation();
  const [city, setCity] = useState('Delhi');
  const [weatherData, setWeatherData] = useState(null);
  const [riskAssessment, setRiskAssessment] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [timeRange, setTimeRange] = useState('week');
  const [showTrends, setShowTrends] = useState(false);

  const indianCities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata',
    'Hyderabad', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow',
    'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal'
  ];

  // Generate mock historical data
  const generateHistoricalData = (days) => {
    const data = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        temperature: Math.floor(Math.random() * 40),
        humidity: Math.floor(Math.random() * 100),
        windSpeed: Math.floor(Math.random() * 50),
        pressure: 1000 + Math.floor(Math.random() * 50),
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Stormy'][Math.floor(Math.random() * 4)]
      });
    }
    
    return data;
  };

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
        
        // Generate historical data based on time range
        let days = 7;
        if (timeRange === 'month') days = 30;
        if (timeRange === 'year') days = 365;
        
        const history = generateHistoricalData(days);
        setHistoricalData(history);
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
  }, [timeRange]);

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

  // Calculate trends from historical data
  const calculateTrends = () => {
    if (historicalData.length < 2) return {};
    
    const first = historicalData[0];
    const last = historicalData[historicalData.length - 1];
    
    return {
      temperature: last.temperature - first.temperature,
      humidity: last.humidity - first.humidity,
      windSpeed: last.windSpeed - first.windSpeed,
      pressure: last.pressure - first.pressure
    };
  };

  const trends = calculateTrends();

  // Get trend indicator
  const getTrendIndicator = (value) => {
    if (value > 0) return '↑';
    if (value < 0) return '↓';
    return '→';
  };

  // Get trend color
  const getTrendColor = (value) => {
    if (value > 0) return 'text-red-500';
    if (value < 0) return 'text-green-500';
    return 'text-gray-500';
  };

  return (
    <div className="weather-monitor p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          {t('weather.title')}
        </h2>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowTrends(!showTrends)}
            className={`px-3 py-1 rounded-full text-sm ${
              showTrends 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {showTrends ? t('weather.hide_trends') : t('weather.show_trends')}
          </button>
          
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">{t('weather.time_range.week')}</option>
            <option value="month">{t('weather.time_range.month')}</option>
            <option value="year">{t('weather.time_range.year')}</option>
          </select>
        </div>
      </div>
      
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
        <div className="space-y-6">
          {/* Current Weather */}
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

          {/* Trends Analysis */}
          {showTrends && historicalData.length > 0 && (
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-4">{t('weather.trend_analysis')}</h3>
              
              {/* Trend Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">{t('weather.temperature')}</p>
                  <div className="flex items-center">
                    <span className="text-xl font-bold">{weatherData.temperature}°C</span>
                    <span className={`ml-2 text-lg ${getTrendColor(trends.temperature)}`}>
                      {getTrendIndicator(trends.temperature)}
                    </span>
                  </div>
                  <p className={`text-sm ${getTrendColor(trends.temperature)}`}>
                    {trends.temperature > 0 
                      ? t('weather.trend.increasing', { value: trends.temperature }) 
                      : trends.temperature < 0 
                        ? t('weather.trend.decreasing', { value: Math.abs(trends.temperature) }) 
                        : t('weather.trend.stable')}
                  </p>
                </div>
                
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">{t('weather.humidity')}</p>
                  <div className="flex items-center">
                    <span className="text-xl font-bold">{weatherData.humidity}%</span>
                    <span className={`ml-2 text-lg ${getTrendColor(trends.humidity)}`}>
                      {getTrendIndicator(trends.humidity)}
                    </span>
                  </div>
                  <p className={`text-sm ${getTrendColor(trends.humidity)}`}>
                    {trends.humidity > 0 
                      ? t('weather.trend.increasing', { value: trends.humidity }) 
                      : trends.humidity < 0 
                        ? t('weather.trend.decreasing', { value: Math.abs(trends.humidity) }) 
                        : t('weather.trend.stable')}
                  </p>
                </div>
                
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">{t('weather.wind_speed')}</p>
                  <div className="flex items-center">
                    <span className="text-xl font-bold">{weatherData.windSpeed} km/h</span>
                    <span className={`ml-2 text-lg ${getTrendColor(trends.windSpeed)}`}>
                      {getTrendIndicator(trends.windSpeed)}
                    </span>
                  </div>
                  <p className={`text-sm ${getTrendColor(trends.windSpeed)}`}>
                    {trends.windSpeed > 0 
                      ? t('weather.trend.increasing', { value: trends.windSpeed }) 
                      : trends.windSpeed < 0 
                        ? t('weather.trend.decreasing', { value: Math.abs(trends.windSpeed) }) 
                        : t('weather.trend.stable')}
                  </p>
                </div>
                
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">{t('weather.pressure')}</p>
                  <div className="flex items-center">
                    <span className="text-xl font-bold">{weatherData.pressure} hPa</span>
                    <span className={`ml-2 text-lg ${getTrendColor(trends.pressure)}`}>
                      {getTrendIndicator(trends.pressure)}
                    </span>
                  </div>
                  <p className={`text-sm ${getTrendColor(trends.pressure)}`}>
                    {trends.pressure > 0 
                      ? t('weather.trend.increasing', { value: trends.pressure }) 
                      : trends.pressure < 0 
                        ? t('weather.trend.decreasing', { value: Math.abs(trends.pressure) }) 
                        : t('weather.trend.stable')}
                  </p>
                </div>
              </div>
              
              {/* Temperature Trend Chart */}
              <div className="h-64 mb-6">
                <h4 className="font-medium mb-2">{t('weather.temperature_trend')}</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={historicalData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="temperature" 
                      name={t('weather.temperature')} 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Weather Conditions Distribution */}
              <div className="h-64">
                <h4 className="font-medium mb-2">{t('weather.condition_distribution')}</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: t('weather.conditions.sunny'), count: historicalData.filter(d => d.condition === 'Sunny').length },
                      { name: t('weather.conditions.cloudy'), count: historicalData.filter(d => d.condition === 'Cloudy').length },
                      { name: t('weather.conditions.rainy'), count: historicalData.filter(d => d.condition === 'Rainy').length },
                      { name: t('weather.conditions.stormy'), count: historicalData.filter(d => d.condition === 'Stormy').length }
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name={t('weather.days')} fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Risk Assessment */}
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

          {/* Preparedness Recommendations */}
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

          {/* Forecast */}
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