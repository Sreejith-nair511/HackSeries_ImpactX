import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const VolunteerRecognitionSystem = () => {
  const { t } = useTranslation();
  const [volunteers, setVolunteers] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data for volunteers
  const mockVolunteers = [
    { id: 1, name: 'Rajesh Kumar', region: 'Kerala', hours: 120, contributions: 15, recognitionLevel: 'gold', badges: ['Flood Relief', 'Community Leader'] },
    { id: 2, name: 'Priya Sharma', region: 'Odisha', hours: 95, contributions: 12, recognitionLevel: 'silver', badges: ['Cyclone Response', 'Medical Support'] },
    { id: 3, name: 'Amit Patel', region: 'Maharashtra', hours: 80, contributions: 10, recognitionLevel: 'silver', badges: ['Earthquake Relief', 'Logistics'] },
    { id: 4, name: 'Sunita Devi', region: 'Kerala', hours: 150, contributions: 20, recognitionLevel: 'platinum', badges: ['Flood Relief', 'Community Leader', 'Fundraising'] },
    { id: 5, name: 'Vikram Singh', region: 'Rajasthan', hours: 60, contributions: 8, recognitionLevel: 'bronze', badges: ['Drought Response'] },
    { id: 6, name: 'Anjali Rao', region: 'Odisha', hours: 110, contributions: 14, recognitionLevel: 'gold', badges: ['Cyclone Response', 'Education'] },
    { id: 7, name: 'Deepak Nair', region: 'Kerala', hours: 90, contributions: 11, recognitionLevel: 'silver', badges: ['Flood Relief', 'Technical Support'] },
    { id: 8, name: 'Meera Reddy', region: 'Assam', hours: 130, contributions: 16, recognitionLevel: 'gold', badges: ['Flood Relief', 'Medical Support'] }
  ];

  // Recognition level colors
  const recognitionColors = {
    platinum: '#E5E4E2',
    gold: '#FFD700',
    silver: '#C0C0C0',
    bronze: '#CD7F32'
  };

  const periods = [
    { value: 'week', label: t('volunteerRecognition.periods.week') },
    { value: 'month', label: t('volunteerRecognition.periods.month') },
    { value: 'quarter', label: t('volunteerRecognition.periods.quarter') },
    { value: 'year', label: t('volunteerRecognition.periods.year') }
  ];

  const regions = ['all', 'Kerala', 'Odisha', 'Maharashtra', 'Rajasthan', 'Assam'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setVolunteers(mockVolunteers);
      setLoading(false);
    }, 1000);
  }, []);

  const getRecognitionLevel = (hours) => {
    if (hours >= 120) return 'platinum';
    if (hours >= 100) return 'gold';
    if (hours >= 80) return 'silver';
    return 'bronze';
  };

  const filteredVolunteers = volunteers.filter(volunteer => {
    const regionMatch = selectedRegion === 'all' || volunteer.region === selectedRegion;
    return regionMatch;
  });

  const recognitionData = [
    { name: t('volunteerRecognition.levels.platinum'), value: volunteers.filter(v => v.recognitionLevel === 'platinum').length },
    { name: t('volunteerRecognition.levels.gold'), value: volunteers.filter(v => v.recognitionLevel === 'gold').length },
    { name: t('volunteerRecognition.levels.silver'), value: volunteers.filter(v => v.recognitionLevel === 'silver').length },
    { name: t('volunteerRecognition.levels.bronze'), value: volunteers.filter(v => v.recognitionLevel === 'bronze').length }
  ];

  const hoursData = volunteers.map(volunteer => ({
    name: volunteer.name,
    hours: volunteer.hours
  }));

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {t('volunteerRecognition.title')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('volunteerRecognition.period')}
          </label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('volunteerRecognition.region')}
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {regions.map(region => (
              <option key={region} value={region}>
                {region === 'all' ? t('volunteerRecognition.allRegions') : region}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end">
          <button
            onClick={() => {
              setSelectedPeriod('month');
              setSelectedRegion('all');
            }}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            {t('volunteerRecognition.resetFilters')}
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-800">{volunteers.length}</div>
          <div className="text-sm text-blue-600">{t('volunteerRecognition.totalVolunteers')}</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-800">
            {volunteers.reduce((sum, volunteer) => sum + volunteer.hours, 0)}
          </div>
          <div className="text-sm text-green-600">{t('volunteerRecognition.totalHours')}</div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-800">
            {volunteers.length > 0 ? Math.round(volunteers.reduce((sum, volunteer) => sum + volunteer.hours, 0) / volunteers.length) : 0}
          </div>
          <div className="text-sm text-yellow-600">{t('volunteerRecognition.avgHoursPerVolunteer')}</div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-800">
            {volunteers.filter(v => v.recognitionLevel === 'platinum').length}
          </div>
          <div className="text-sm text-purple-600">{t('volunteerRecognition.platinumAwards')}</div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t('volunteerRecognition.recognitionDistribution')}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={recognitionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {recognitionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={Object.values(recognitionColors)[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t('volunteerRecognition.volunteerHours')}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hoursData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="hours" 
                name={t('volunteerRecognition.hours')} 
                fill="#8884d8" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Volunteers Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('volunteerRecognition.volunteer')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('volunteerRecognition.region')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('volunteerRecognition.hours')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('volunteerRecognition.contributions')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('volunteerRecognition.recognitionLevel')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('volunteerRecognition.badges')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredVolunteers.map((volunteer) => (
              <tr key={volunteer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {volunteer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {volunteer.region}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {volunteer.hours}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {volunteer.contributions}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    volunteer.recognitionLevel === 'platinum' ? 'bg-gray-200 text-gray-800' :
                    volunteer.recognitionLevel === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                    volunteer.recognitionLevel === 'silver' ? 'bg-gray-300 text-gray-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {t(`volunteerRecognition.levels.${volunteer.recognitionLevel}`)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex flex-wrap gap-1">
                    {volunteer.badges.map((badge, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Recognition Certificate Section */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {t('volunteerRecognition.certificateTitle')}
        </h3>
        <p className="text-gray-600 mb-4">
          {t('volunteerRecognition.certificateDescription')}
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          {t('volunteerRecognition.generateCertificates')}
        </button>
      </div>
    </div>
  );
};

export default VolunteerRecognitionSystem;