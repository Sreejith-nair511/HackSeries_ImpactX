import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const StateDisasterStats = () => {
  const { t, i18n } = useTranslation();
  const [selectedState, setSelectedState] = useState('all');
  const [disasterData, setDisasterData] = useState([]);

  // Sample disaster data for Indian states
  const disasterStats = [
    { state: 'Maharashtra', floods: 120, cyclones: 5, earthquakes: 2, droughts: 8, total: 135 },
    { state: 'West Bengal', floods: 95, cyclones: 12, earthquakes: 1, droughts: 5, total: 113 },
    { state: 'Odisha', floods: 80, cyclones: 15, earthquakes: 0, droughts: 6, total: 101 },
    { state: 'Andhra Pradesh', floods: 70, cyclones: 8, earthquakes: 1, droughts: 9, total: 88 },
    { state: 'Tamil Nadu', floods: 65, cyclones: 7, earthquakes: 3, droughts: 7, total: 82 },
    { state: 'Uttar Pradesh', floods: 90, cyclones: 2, earthquakes: 4, droughts: 10, total: 106 },
    { state: 'Bihar', floods: 85, cyclones: 1, earthquakes: 2, droughts: 6, total: 94 },
    { state: 'Gujarat', floods: 55, cyclones: 6, earthquakes: 5, droughts: 12, total: 78 },
    { state: 'Kerala', floods: 60, cyclones: 3, earthquakes: 1, droughts: 4, total: 68 },
    { state: 'Assam', floods: 110, cyclones: 2, earthquakes: 3, droughts: 5, total: 120 },
  ];

  useEffect(() => {
    setDisasterData(disasterStats);
  }, []);

  const filteredData = selectedState === 'all' 
    ? disasterData 
    : disasterData.filter(item => item.state === selectedState);

  const getStateOptions = () => {
    return [
      { value: 'all', label: t('common.all_states') },
      ...disasterStats.map(state => ({
        value: state.state,
        label: state.state
      }))
    ];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('disaster_stats.title')}</h2>
      
      <div className="mb-6">
        <label htmlFor="state-select" className="block text-sm font-medium text-gray-700 mb-2">
          {t('disaster_stats.select_state')}
        </label>
        <select
          id="state-select"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          {getStateOptions().map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('disaster_stats.state')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('disaster_stats.floods')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('disaster_stats.cyclones')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('disaster_stats.earthquakes')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('disaster_stats.droughts')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('disaster_stats.total')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((state, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {state.state}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {state.floods}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {state.cyclones}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {state.earthquakes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {state.droughts}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">
                  {state.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">{t('disaster_stats.disclaimer')}</h3>
        <p className="text-sm text-blue-600">
          {t('disaster_stats.disclaimer_text')}
        </p>
      </div>
    </div>
  );
};

export default StateDisasterStats;