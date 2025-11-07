import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { calculateDisasterStatistics, analyzeDisasterTrends, calculateRegionalRiskIndices, compareDisasterTypes } from '../utils/disasterStatistics';

const DisasterStatistics = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [disasterData, setDisasterData] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [trends, setTrends] = useState(null);
  const [riskIndices, setRiskIndices] = useState([]);
  const [comparison, setComparison] = useState(null);
  const [comparisonTypes, setComparisonTypes] = useState({ type1: 'flood', type2: 'earthquake' });
  const [dateRange, setDateRange] = useState({ start: '', end: '' }); // New state for date filtering
  const [selectedRegion, setSelectedRegion] = useState(''); // New state for region filtering

  // Sample data for demonstration
  useEffect(() => {
    // Sample disaster data
    const sampleDisasterData = [
      {
        id: 'd1',
        type: 'flood',
        region: 'Kerala',
        date: '2023-07-15',
        affected: 1500000,
        economicLoss: 2500000000,
        severity: 4
      },
      {
        id: 'd2',
        type: 'earthquake',
        region: 'Gujarat',
        date: '2023-01-22',
        affected: 500000,
        economicLoss: 1800000000,
        severity: 5
      },
      {
        id: 'd3',
        type: 'cyclone',
        region: 'Odisha',
        date: '2023-10-10',
        affected: 800000,
        economicLoss: 1200000000,
        severity: 3
      },
      {
        id: 'd4',
        type: 'flood',
        region: 'Assam',
        date: '2023-06-30',
        affected: 2000000,
        economicLoss: 3000000000,
        severity: 4
      },
      {
        id: 'd5',
        type: 'drought',
        region: 'Rajasthan',
        date: '2023-04-18',
        affected: 3000000,
        economicLoss: 2000000000,
        severity: 3
      }
    ];

    // Sample region data
    const sampleRegionData = [
      {
        name: 'Kerala',
        population: 34000000,
        area: 38863,
        gdp: 150000000000,
        infrastructureQuality: 8,
        disasterPreparedness: 7
      },
      {
        name: 'Gujarat',
        population: 62000000,
        area: 196024,
        gdp: 180000000000,
        infrastructureQuality: 7,
        disasterPreparedness: 6
      },
      {
        name: 'Odisha',
        population: 43000000,
        area: 155707,
        gdp: 110000000000,
        infrastructureQuality: 6,
        disasterPreparedness: 8
      },
      {
        name: 'Assam',
        population: 33000000,
        area: 78438,
        gdp: 50000000000,
        infrastructureQuality: 5,
        disasterPreparedness: 5
      },
      {
        name: 'Rajasthan',
        population: 77000000,
        area: 342239,
        gdp: 120000000000,
        infrastructureQuality: 6,
        disasterPreparedness: 6
      }
    ];

    setDisasterData(sampleDisasterData);
    setRegionData(sampleRegionData);
  }, []);

  // Filter disaster data based on date range and selected region
  const filterDisasterData = () => {
    let filteredData = [...disasterData];
    
    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      filteredData = filteredData.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= startDate && eventDate <= endDate;
      });
    }
    
    // Apply region filter
    if (selectedRegion) {
      filteredData = filteredData.filter(event => event.region === selectedRegion);
    }
    
    return filteredData;
  };
  
  // Export data as CSV
  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) return;
    
    // Create CSV content
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => 
      Object.values(obj).map(value => 
        typeof value === 'string' ? `"${value}"` : value
      ).join(',')
    ).join('\n');
    
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const encodedUri = encodeURI(csvContent);
    
    // Create download link
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Export data as JSON
  const exportToJSON = (data, filename) => {
    if (!data) return;
    
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Calculate statistics when data or filters change
  useEffect(() => {
    const filteredData = filterDisasterData();
    
    if (filteredData.length > 0) {
      const stats = calculateDisasterStatistics(filteredData);
      setStatistics(stats);
      
      const trendData = analyzeDisasterTrends(filteredData);
      setTrends(trendData);
      
      if (regionData.length > 0) {
        const riskData = calculateRegionalRiskIndices(filteredData, regionData);
        setRiskIndices(riskData);
      }
    }
  }, [disasterData, regionData, dateRange, selectedRegion]);

  // Handle comparison
  const handleCompare = () => {
    if (disasterData.length > 0) {
      const comparisonData = compareDisasterTypes(
        disasterData, 
        comparisonTypes.type1, 
        comparisonTypes.type2
      );
      setComparison(comparisonData);
    }
  };

  // Initialize comparison on component mount
  useEffect(() => {
    handleCompare();
  }, [disasterData, comparisonTypes]);

  const disasterTypes = [
    { value: 'flood', label: t('disasterTypes.flood') },
    { value: 'earthquake', label: t('disasterTypes.earthquake') },
    { value: 'cyclone', label: t('disasterTypes.cyclone') },
    { value: 'drought', label: t('disasterTypes.drought') },
    { value: 'landslide', label: t('disasterTypes.landslide') }
  ];

  const regions = [...new Set(disasterData.map(event => event.region))];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('disasterStatistics.title')}</h2>
      <p className="text-gray-600 mb-6">{t('disasterStatistics.description')}</p>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('disasterStatistics.startDate')}
          </label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('disasterStatistics.endDate')}
          </label>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('disasterStatistics.region')}
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">{t('disasterStatistics.allRegions')}</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('disasterStatistics.tabs.overview')}
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'trends'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('disasterStatistics.tabs.trends')}
          </button>
          <button
            onClick={() => setActiveTab('regional')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'regional'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('disasterStatistics.tabs.regional')}
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'comparison'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('disasterStatistics.tabs.comparison')}
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && statistics && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{t('disasterStatistics.overview.title')}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const filteredData = filterDisasterData();
                    exportToCSV(filteredData, 'disaster_statistics_overview');
                  }}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t('disasterStatistics.export')}
                </button>
                <button
                  onClick={() => {
                    setDateRange({ start: '', end: '' });
                    setSelectedRegion('');
                  }}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t('disasterStatistics.resetFilters')}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">{statistics.totalEvents}</div>
                <div className="text-sm text-blue-600">{t('disasterStatistics.overview.totalEvents')}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-700">
                  {statistics.impact.totalAffected.toLocaleString()}
                </div>
                <div className="text-sm text-green-600">{t('disasterStatistics.overview.totalAffected')}</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-700">
                  ₹{(statistics.impact.totalEconomicLoss / 10000000).toFixed(1)}Cr
                </div>
                <div className="text-sm text-yellow-600">{t('disasterStatistics.overview.totalEconomicLoss')}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-700">
                  {statistics.impact.averageAffected.toLocaleString()}
                </div>
                <div className="text-sm text-purple-600">{t('disasterStatistics.overview.averageAffected')}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-3">{t('disasterStatistics.byType')}</h4>
                <div className="space-y-3">
                  {Object.entries(statistics.byType).map(([type, data]) => (
                    <div key={type} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between">
                        <h5 className="font-medium text-gray-900">{t(`disasterTypes.${type}`)}</h5>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {data.count} {t('disasterStatistics.events')}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        {t('disasterStatistics.affected')}: {data.affected.toLocaleString()}
                      </div>
                      <div className="mt-1 text-sm">
                        {t('disasterStatistics.economicLoss')}: ₹{(data.economicLoss / 10000000).toFixed(1)}Cr
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-3">{t('disasterStatistics.byRegion')}</h4>
                <div className="space-y-3">
                  {Object.entries(statistics.byRegion).map(([region, data]) => (
                    <div key={region} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between">
                        <h5 className="font-medium text-gray-900">{region}</h5>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {data.count} {t('disasterStatistics.events')}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        {t('disasterStatistics.affected')}: {data.affected.toLocaleString()}
                      </div>
                      <div className="mt-1 text-sm">
                        {t('disasterStatistics.economicLoss')}: ₹{(data.economicLoss / 10000000).toFixed(1)}Cr
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trends Tab */}
        {activeTab === 'trends' && trends && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{t('disasterStatistics.trends.title')}</h3>
              <button
                onClick={() => {
                  exportToCSV(trends.yearlyTrends, 'disaster_statistics_trends');
                }}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('disasterStatistics.export')}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">{trends.yearlyTrends.length}</div>
                <div className="text-sm text-blue-600">{t('disasterStatistics.trends.yearsCovered')}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-700">
                  {trends.growthRate > 0 ? '+' : ''}{trends.growthRate}%
                </div>
                <div className="text-sm text-green-600">{t('disasterStatistics.trends.annualGrowth')}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                {trends.mostIncreasingType && (
                  <>
                    <div className="text-lg font-bold text-purple-700">
                      {t(`disasterTypes.${trends.mostIncreasingType.type}`)}
                    </div>
                    <div className="text-sm text-purple-600">{t('disasterStatistics.trends.mostIncreasing')}</div>
                  </>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-3">{t('disasterStatistics.trends.yearlyBreakdown')}</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('disasterStatistics.trends.year')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('disasterStatistics.events')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('disasterStatistics.affected')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('disasterStatistics.economicLoss')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {trends.yearlyTrends.map((yearData) => (
                      <tr key={yearData.year}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {yearData.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {yearData.count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {yearData.affected.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{(yearData.economicLoss / 10000000).toFixed(1)}Cr
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Regional Tab */}
        {activeTab === 'regional' && riskIndices.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{t('disasterStatistics.regional.title')}</h3>
              <button
                onClick={() => {
                  exportToCSV(riskIndices, 'disaster_statistics_regional');
                }}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('disasterStatistics.export')}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('disasterStatistics.regional.region')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('disasterStatistics.regional.riskIndex')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('disasterStatistics.events')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('disasterStatistics.affected')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('disasterStatistics.economicLoss')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {riskIndices.map((region) => (
                    <tr key={region.region}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{region.region}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-red-600 h-2 rounded-full" 
                              style={{ width: `${region.riskIndex}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {region.riskIndex}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {region.totalEvents}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {region.totalAffected.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{(region.totalEconomicLoss / 10000000).toFixed(1)}Cr
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Comparison Tab */}
        {activeTab === 'comparison' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{t('disasterStatistics.comparison.title')}</h3>
              <button
                onClick={() => {
                  exportToJSON(comparison, 'disaster_statistics_comparison');
                }}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('disasterStatistics.export')}
              </button>
            </div>
            
            {/* Comparison Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('disasterStatistics.comparison.firstType')}
                </label>
                <select
                  value={comparisonTypes.type1}
                  onChange={(e) => setComparisonTypes({...comparisonTypes, type1: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {disasterTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('disasterStatistics.comparison.secondType')}
                </label>
                <select
                  value={comparisonTypes.type2}
                  onChange={(e) => setComparisonTypes({...comparisonTypes, type2: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {disasterTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={handleCompare}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t('disasterStatistics.comparison.compare')}
                </button>
              </div>
            </div>
            
            {/* Comparison Results */}
            {comparison && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    {t(`disasterTypes.${comparisonTypes.type1}`)}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('disasterStatistics.events')}:</span>
                      <span className="font-medium">{comparison[comparisonTypes.type1].count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('disasterStatistics.affected')}:</span>
                      <span className="font-medium">{comparison[comparisonTypes.type1].affected.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('disasterStatistics.economicLoss')}:</span>
                      <span className="font-medium">
                        ₹{(comparison[comparisonTypes.type1].economicLoss / 10000000).toFixed(1)}Cr
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('disasterStatistics.comparison.averageAffected')}:</span>
                      <span className="font-medium">
                        {comparison[comparisonTypes.type1].averageAffected.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('disasterStatistics.comparison.averageEconomicLoss')}:</span>
                      <span className="font-medium">
                        ₹{(comparison[comparisonTypes.type1].averageEconomicLoss / 10000000).toFixed(1)}Cr
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    {t(`disasterTypes.${comparisonTypes.type2}`)}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('disasterStatistics.events')}:</span>
                      <span className="font-medium">{comparison[comparisonTypes.type2].count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('disasterStatistics.affected')}:</span>
                      <span className="font-medium">{comparison[comparisonTypes.type2].affected.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('disasterStatistics.economicLoss')}:</span>
                      <span className="font-medium">
                        ₹{(comparison[comparisonTypes.type2].economicLoss / 10000000).toFixed(1)}Cr
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('disasterStatistics.comparison.averageAffected')}:</span>
                      <span className="font-medium">
                        {comparison[comparisonTypes.type2].averageAffected.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('disasterStatistics.comparison.averageEconomicLoss')}:</span>
                      <span className="font-medium">
                        ₹{(comparison[comparisonTypes.type2].averageEconomicLoss / 10000000).toFixed(1)}Cr
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisasterStatistics;