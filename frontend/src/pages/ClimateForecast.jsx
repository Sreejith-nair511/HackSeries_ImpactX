import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ClimateForecast = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('forecast');
  const [weatherData, setWeatherData] = useState({
    temperature: 32,
    humidity: 78,
    windSpeed: 12,
    pressure: 1013,
    condition: 'Partly Cloudy'
  });

  // Mock disaster hotspots data
  const disasterHotspots = [
    { region: 'Kerala', risk: 85, disasterType: 'Floods', priority: 'High' },
    { region: 'Assam', risk: 78, disasterType: 'Floods', priority: 'High' },
    { region: 'Odisha', risk: 72, disasterType: 'Cyclones', priority: 'Medium' },
    { region: 'Uttarakhand', risk: 68, disasterType: 'Landslides', priority: 'Medium' },
    { region: 'Maharashtra', risk: 65, disasterType: 'Drought', priority: 'Low' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('climateForecast.title')}</h1>
          <p className="mt-2 text-gray-600">{t('climateForecast.description')}</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('forecast')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'forecast'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('climateForecast.forecast')}
            </button>
            <button
              onClick={() => setActiveTab('hotspots')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'hotspots'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('climateForecast.hotspots')}
            </button>
          </nav>
        </div>

        {/* Forecast Tab */}
        {activeTab === 'forecast' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Weather Card */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('climateForecast.currentWeather')}</h2>
              <div className="flex items-center mb-6">
                <div className="text-5xl font-bold text-gray-900">{weatherData.temperature}°C</div>
                <div className="ml-4">
                  <div className="text-lg text-gray-900">{weatherData.condition}</div>
                  <div className="text-gray-600">New Delhi</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('climateForecast.humidity')}</span>
                  <span className="font-medium">{weatherData.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('climateForecast.windSpeed')}</span>
                  <span className="font-medium">{weatherData.windSpeed} km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('climateForecast.pressure')}</span>
                  <span className="font-medium">{weatherData.pressure} hPa</span>
                </div>
              </div>
            </div>

            {/* Weather Forecast Chart */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('climateForecast.sevenDayForecast')}</h2>
              <div className="flex items-end h-64 space-x-2">
                {[32, 34, 31, 29, 33, 35, 30].map((temp, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="text-sm text-gray-600 mb-2">Day {index + 1}</div>
                    <div 
                      className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                      style={{ height: `${(temp / 40) * 100}%` }}
                    ></div>
                    <div className="text-sm font-medium mt-2">{temp}°</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hotspots Tab */}
        {activeTab === 'hotspots' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{t('climateForecast.disasterHotspots')}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('climateForecast.region')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('climateForecast.disasterType')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('climateForecast.riskLevel')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('climateForecast.fundingPriority')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {disasterHotspots.map((hotspot, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {hotspot.region}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {hotspot.disasterType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          hotspot.risk > 80 
                            ? 'bg-red-100 text-red-800' 
                            : hotspot.risk > 60 
                              ? 'bg-orange-100 text-orange-800' 
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {hotspot.risk}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          hotspot.priority === 'High' 
                            ? 'bg-red-100 text-red-800' 
                            : hotspot.priority === 'Medium' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {hotspot.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClimateForecast;