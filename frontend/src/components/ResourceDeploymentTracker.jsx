import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ResourceDeploymentTracker = () => {
  const { t } = useTranslation();
  const [deployments, setDeployments] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedResource, setSelectedResource] = useState('all');
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(true);

  // Mock data for resource deployments
  const mockDeployments = [
    { id: 1, resource: 'Water Purification Units', region: 'Kerala', status: 'deployed', quantity: 50, deployedAt: '2025-10-15', expectedReturn: '2025-11-15', team: 'Team Alpha' },
    { id: 2, resource: 'Medical Kits', region: 'Odisha', status: 'in-transit', quantity: 100, deployedAt: '2025-10-18', expectedReturn: '2025-10-20', team: 'Team Beta' },
    { id: 3, resource: 'Emergency Shelters', region: 'Maharashtra', status: 'deployed', quantity: 25, deployedAt: '2025-10-10', expectedReturn: '2025-12-10', team: 'Team Gamma' },
    { id: 4, resource: 'Food Supplies', region: 'Kerala', status: 'deployed', quantity: 500, deployedAt: '2025-10-12', expectedReturn: '2025-11-12', team: 'Team Delta' },
    { id: 5, resource: 'Communication Equipment', region: 'Rajasthan', status: 'requested', quantity: 15, deployedAt: '2025-10-20', expectedReturn: '2025-10-25', team: 'Team Epsilon' },
    { id: 6, resource: 'Rescue Boats', region: 'Assam', status: 'deployed', quantity: 10, deployedAt: '2025-10-05', expectedReturn: '2025-11-05', team: 'Team Zeta' },
    { id: 7, resource: 'Power Generators', region: 'Uttarakhand', status: 'in-transit', quantity: 8, deployedAt: '2025-10-19', expectedReturn: '2025-10-22', team: 'Team Eta' },
  ];

  // Mock data for status distribution
  const statusData = [
    { name: t('resourceDeployment.status.deployed'), value: 4 },
    { name: t('resourceDeployment.status.inTransit'), value: 2 },
    { name: t('resourceDeployment.status.requested'), value: 1 }
  ];

  // Mock data for deployment timeline
  const timelineData = [
    { date: '2025-10-01', deployed: 2, inTransit: 1, requested: 0 },
    { date: '2025-10-08', deployed: 5, inTransit: 2, requested: 1 },
    { date: '2025-10-15', deployed: 8, inTransit: 3, requested: 2 },
    { date: '2025-10-22', deployed: 10, inTransit: 2, requested: 1 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const regions = ['all', 'Kerala', 'Odisha', 'Maharashtra', 'Rajasthan', 'Assam', 'Uttarakhand'];
  const resources = ['all', 'Water Purification Units', 'Medical Kits', 'Emergency Shelters', 'Food Supplies', 'Communication Equipment', 'Rescue Boats', 'Power Generators'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDeployments(mockDeployments);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'deployed':
        return 'bg-green-100 text-green-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'requested':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDeployments = deployments.filter(deployment => {
    const regionMatch = selectedRegion === 'all' || deployment.region === selectedRegion;
    const resourceMatch = selectedResource === 'all' || deployment.resource === selectedResource;
    return regionMatch && resourceMatch;
  });

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
        {t('resourceDeployment.title')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('resourceDeployment.region')}
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {regions.map(region => (
              <option key={region} value={region}>
                {region === 'all' ? t('resourceDeployment.allRegions') : region}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('resourceDeployment.resource')}
          </label>
          <select
            value={selectedResource}
            onChange={(e) => setSelectedResource(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {resources.map(resource => (
              <option key={resource} value={resource}>
                {resource === 'all' ? t('resourceDeployment.allResources') : resource}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('resourceDeployment.timeRange')}
          </label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="week">{t('resourceDeployment.timeRangeOptions.week')}</option>
            <option value="month">{t('resourceDeployment.timeRangeOptions.month')}</option>
            <option value="quarter">{t('resourceDeployment.timeRangeOptions.quarter')}</option>
          </select>
        </div>
        
        <div className="flex items-end">
          <button
            onClick={() => {
              setSelectedRegion('all');
              setSelectedResource('all');
              setTimeRange('week');
            }}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            {t('resourceDeployment.resetFilters')}
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-800">{deployments.length}</div>
          <div className="text-sm text-blue-600">{t('resourceDeployment.totalDeployments')}</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-800">
            {deployments.filter(d => d.status === 'deployed').length}
          </div>
          <div className="text-sm text-green-600">{t('resourceDeployment.deployed')}</div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-800">
            {deployments.filter(d => d.status === 'in-transit').length}
          </div>
          <div className="text-sm text-yellow-600">{t('resourceDeployment.inTransit')}</div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-800">
            {deployments.filter(d => d.status === 'requested').length}
          </div>
          <div className="text-sm text-purple-600">{t('resourceDeployment.requested')}</div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t('resourceDeployment.statusDistribution')}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t('resourceDeployment.deploymentTimeline')}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="deployed" 
                stroke="#10B981" 
                activeDot={{ r: 8 }} 
                name={t('resourceDeployment.status.deployed')}
              />
              <Line 
                type="monotone" 
                dataKey="inTransit" 
                stroke="#3B82F6" 
                name={t('resourceDeployment.status.inTransit')}
              />
              <Line 
                type="monotone" 
                dataKey="requested" 
                stroke="#F59E0B" 
                name={t('resourceDeployment.status.requested')}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Deployments Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('resourceDeployment.resource')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('resourceDeployment.region')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('resourceDeployment.quantity')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('resourceDeployment.status')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('resourceDeployment.team')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('resourceDeployment.deployedAt')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('resourceDeployment.expectedReturn')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDeployments.map((deployment) => (
              <tr key={deployment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {deployment.resource}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {deployment.region}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {deployment.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(deployment.status)}`}>
                    {t(`resourceDeployment.status.${deployment.status}`)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {deployment.team}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {deployment.deployedAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {deployment.expectedReturn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResourceDeploymentTracker;