import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DisasterRecoveryTracker = () => {
  const { t } = useTranslation();
  const [selectedRegion, setSelectedRegion] = useState('kerala');
  const [recoveryData, setRecoveryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock recovery data for different regions
  const mockRecoveryData = {
    kerala: {
      region: 'Kerala',
      disasterType: 'Flood',
      startDate: '2023-07-15',
      endDate: '2024-07-15',
      overallProgress: 78,
      milestones: [
        { id: 1, name: t('recoveryTracker.milestones.housing'), progress: 92, targetDate: '2023-12-31', actualDate: '2023-11-15', status: 'completed' },
        { id: 2, name: t('recoveryTracker.milestones.infrastructure'), progress: 85, targetDate: '2024-03-31', actualDate: null, status: 'in-progress' },
        { id: 3, name: t('recoveryTracker.milestones.healthcare'), progress: 75, targetDate: '2024-01-31', actualDate: '2024-02-10', status: 'completed' },
        { id: 4, name: t('recoveryTracker.milestones.education'), progress: 68, targetDate: '2024-05-31', actualDate: null, status: 'in-progress' },
        { id: 5, name: t('recoveryTracker.milestones.livelihood'), progress: 60, targetDate: '2024-07-31', actualDate: null, status: 'in-progress' },
        { id: 6, name: t('recoveryTracker.milestones.environment'), progress: 45, targetDate: '2024-12-31', actualDate: null, status: 'not-started' }
      ],
      progressHistory: [
        { date: '2023-08', progress: 15 },
        { date: '2023-09', progress: 28 },
        { date: '2023-10', progress: 35 },
        { date: '2023-11', progress: 52 },
        { date: '2023-12', progress: 65 },
        { date: '2024-01', progress: 70 },
        { date: '2024-02', progress: 72 },
        { date: '2024-03', progress: 75 },
        { date: '2024-04', progress: 76 },
        { date: '2024-05', progress: 77 },
        { date: '2024-06', progress: 78 }
      ],
      resourceAllocation: [
        { category: t('recoveryTracker.resources.housing'), allocated: 45, spent: 42 },
        { category: t('recoveryTracker.resources.infrastructure'), allocated: 30, spent: 25 },
        { category: t('recoveryTracker.resources.healthcare'), allocated: 10, spent: 8 },
        { category: t('recoveryTracker.resources.education'), allocated: 8, spent: 5 },
        { category: t('recoveryTracker.resources.livelihood'), allocated: 5, spent: 3 },
        { category: t('recoveryTracker.resources.admin'), allocated: 2, spent: 2 }
      ],
      challenges: [
        { id: 1, issue: t('recoveryTracker.challenges.funding'), severity: 'high', resolved: false },
        { id: 2, issue: t('recoveryTracker.challenges.logistics'), severity: 'medium', resolved: true },
        { id: 3, issue: t('recoveryTracker.challenges.coordination'), severity: 'medium', resolved: false },
        { id: 4, issue: t('recoveryTracker.challenges.community'), severity: 'low', resolved: false }
      ]
    },
    maharashtra: {
      region: 'Maharashtra',
      disasterType: 'Cyclone',
      startDate: '2023-06-01',
      endDate: '2024-06-01',
      overallProgress: 65,
      milestones: [
        { id: 1, name: t('recoveryTracker.milestones.housing'), progress: 80, targetDate: '2023-12-31', actualDate: null, status: 'in-progress' },
        { id: 2, name: t('recoveryTracker.milestones.infrastructure'), progress: 70, targetDate: '2024-02-28', actualDate: null, status: 'in-progress' },
        { id: 3, name: t('recoveryTracker.milestones.healthcare'), progress: 85, targetDate: '2023-10-31', actualDate: '2023-10-15', status: 'completed' },
        { id: 4, name: t('recoveryTracker.milestones.education'), progress: 55, targetDate: '2024-04-30', actualDate: null, status: 'in-progress' },
        { id: 5, name: t('recoveryTracker.milestones.livelihood'), progress: 45, targetDate: '2024-06-30', actualDate: null, status: 'in-progress' },
        { id: 6, name: t('recoveryTracker.milestones.environment'), progress: 30, targetDate: '2024-12-31', actualDate: null, status: 'not-started' }
      ],
      progressHistory: [
        { date: '2023-07', progress: 20 },
        { date: '2023-08', progress: 32 },
        { date: '2023-09', progress: 40 },
        { date: '2023-10', progress: 50 },
        { date: '2023-11', progress: 55 },
        { date: '2023-12', progress: 60 },
        { date: '2024-01', progress: 62 },
        { date: '2024-02', progress: 63 },
        { date: '2024-03', progress: 64 },
        { date: '2024-04', progress: 65 }
      ],
      resourceAllocation: [
        { category: t('recoveryTracker.resources.housing'), allocated: 40, spent: 35 },
        { category: t('recoveryTracker.resources.infrastructure'), allocated: 35, spent: 28 },
        { category: t('recoveryTracker.resources.healthcare'), allocated: 12, spent: 11 },
        { category: t('recoveryTracker.resources.education'), allocated: 7, spent: 4 },
        { category: t('recoveryTracker.resources.livelihood'), allocated: 4, spent: 2 },
        { category: t('recoveryTracker.resources.admin'), allocated: 2, spent: 2 }
      ],
      challenges: [
        { id: 1, issue: t('recoveryTracker.challenges.funding'), severity: 'medium', resolved: false },
        { id: 2, issue: t('recoveryTracker.challenges.logistics'), severity: 'high', resolved: false },
        { id: 3, issue: t('recoveryTracker.challenges.coordination'), severity: 'low', resolved: true }
      ]
    }
  };

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRecoveryData(mockRecoveryData[selectedRegion]);
      setIsLoading(false);
    }, 500);
  }, [selectedRegion]);

  const regions = [
    { value: 'kerala', label: t('states.kerala') },
    { value: 'maharashtra', label: t('states.maharashtra') }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'not-started': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatProgress = (progress) => {
    return `${progress}%`;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!recoveryData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="text-center py-8 text-gray-500">
          {t('recoveryTracker.noData')}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          {t('recoveryTracker.title')}
        </h2>
        
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('recoveryTracker.selectRegion')}
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {regions.map(region => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <h3 className="text-sm font-medium text-blue-800 mb-1">{t('recoveryTracker.disasterType')}</h3>
          <p className="text-2xl font-bold text-blue-900">{recoveryData.disasterType}</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
          <h3 className="text-sm font-medium text-green-800 mb-1">{t('recoveryTracker.startDate')}</h3>
          <p className="text-2xl font-bold text-green-900">{new Date(recoveryData.startDate).toLocaleDateString()}</p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <h3 className="text-sm font-medium text-purple-800 mb-1">{t('recoveryTracker.endDate')}</h3>
          <p className="text-2xl font-bold text-purple-900">{new Date(recoveryData.endDate).toLocaleDateString()}</p>
        </div>
        
        <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
          <h3 className="text-sm font-medium text-indigo-800 mb-1">{t('recoveryTracker.overallProgress')}</h3>
          <p className="text-2xl font-bold text-indigo-900">{formatProgress(recoveryData.overallProgress)}</p>
        </div>
      </div>

      {/* Progress Visualization */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('recoveryTracker.progressTrend')}</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={recoveryData.progressHistory}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} tickFormatter={formatProgress} />
              <Tooltip formatter={(value) => [`${value}%`, t('recoveryTracker.progress')]} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="progress" 
                name={t('recoveryTracker.progress')} 
                stroke="#4f46e5" 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Milestones */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('recoveryTracker.milestones.title')}</h3>
        <div className="space-y-4">
          {recoveryData.milestones.map(milestone => (
            <div key={milestone.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h4 className="font-medium text-gray-800">{milestone.name}</h4>
                <div className="flex items-center space-x-3 mt-2 md:mt-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                    {t(`recoveryTracker.status.${milestone.status}`)}
                  </span>
                  <span className="text-lg font-semibold text-gray-900">{formatProgress(milestone.progress)}</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${milestone.progress}%` }}
                ></div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-600">
                <div>
                  {milestone.targetDate && (
                    <span>
                      {t('recoveryTracker.targetDate')}: {new Date(milestone.targetDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div>
                  {milestone.actualDate && (
                    <span>
                      {t('recoveryTracker.actualDate')}: {new Date(milestone.actualDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('recoveryTracker.resourceAllocation')}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={recoveryData.resourceAllocation}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} tickFormatter={formatProgress} />
                <YAxis dataKey="category" type="category" width={80} />
                <Tooltip formatter={(value) => [`${value}%`, t('recoveryTracker.percentage')]} />
                <Legend />
                <Bar dataKey="allocated" name={t('recoveryTracker.allocated')} fill="#8884d8" />
                <Bar dataKey="spent" name={t('recoveryTracker.spent')} fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('recoveryTracker.resourceBreakdown')}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={recoveryData.resourceAllocation}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="allocated"
                  nameKey="category"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {recoveryData.resourceAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'][index % 6]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, t('recoveryTracker.percentage')]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Challenges */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('recoveryTracker.challenges.title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recoveryData.challenges.map(challenge => (
            <div key={challenge.id} className={`p-4 rounded-lg border ${
              challenge.resolved 
                ? 'bg-green-50 border-green-200' 
                : getSeverityColor(challenge.severity).includes('red') 
                  ? 'bg-red-50 border-red-200' 
                  : getSeverityColor(challenge.severity).includes('yellow') 
                    ? 'bg-yellow-50 border-yellow-200' 
                    : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">{challenge.issue}</h4>
                {challenge.resolved ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    {t('recoveryTracker.challenges.resolved')}
                  </span>
                ) : (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(challenge.severity)}`}>
                    {t(`recoveryTracker.severity.${challenge.severity}`)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisasterRecoveryTracker;