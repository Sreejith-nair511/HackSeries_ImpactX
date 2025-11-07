import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getAvailableResources, requestEmergencyResources, trackResourceRequest, getResourceTypes, getResourceStatistics } from '../utils/emergencyResourceTracker';

const EmergencyResourceTracker = () => {
  const { t } = useTranslation();
  const [selectedRegion, setSelectedRegion] = useState('');
  const [resources, setResources] = useState([]);
  const [requestForm, setRequestForm] = useState({
    resourceType: '',
    quantity: '',
    urgency: 'normal',
    location: '',
    contact: ''
  });
  const [requestStatus, setRequestStatus] = useState(null);
  const [statistics, setStatistics] = useState({});
  const [resourceTypes, setResourceTypes] = useState([]);
  const [sortBy, setSortBy] = useState('name'); // New state for sorting
  const [filterByType, setFilterByType] = useState(''); // New state for filtering by type
  const [allocationData, setAllocationData] = useState([]); // New state for resource allocation visualization
  const [historicalData, setHistoricalData] = useState([]); // New state for historical resource usage
  const [showResourceForm, setShowResourceForm] = useState(false); // New state for showing resource addition form
  const [newResource, setNewResource] = useState({
    name: '',
    type: '',
    quantity: '',
    unit: '',
    location: '',
    contact: '',
    availability: '24/7',
    region: ''
  }); // New state for adding new resources

  useEffect(() => {
    // Load resource types
    setResourceTypes(getResourceTypes());
    
    // Load statistics
    setStatistics(getResourceStatistics());
    
    // Load initial resources
    loadResources();
    
    // Load historical data
    loadHistoricalData();
  }, []);

  const loadResources = () => {
    const data = getAvailableResources(selectedRegion);
    setResources(data);
  };

  const loadHistoricalData = () => {
    // Sample historical data - in a real app this would come from the backend
    const sampleHistoricalData = [
      { month: 'Jan', medical: 120, food: 8000, rescue: 20, shelter: 150, communication: 15, transport: 30 },
      { month: 'Feb', medical: 90, food: 6500, rescue: 15, shelter: 120, communication: 12, transport: 25 },
      { month: 'Mar', medical: 200, food: 12000, rescue: 35, shelter: 250, communication: 25, transport: 45 },
      { month: 'Apr', medical: 150, food: 9000, rescue: 25, shelter: 180, communication: 20, transport: 35 },
      { month: 'May', medical: 300, food: 15000, rescue: 50, shelter: 320, communication: 40, transport: 60 }
    ];
    setHistoricalData(sampleHistoricalData);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
    const data = getAvailableResources(e.target.value);
    setResources(data);
  };

  const handleRequestChange = (e) => {
    setRequestForm({
      ...requestForm,
      [e.target.name]: e.target.value
    });
  };

  const handleNewResourceChange = (e) => {
    setNewResource({
      ...newResource,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    const request = requestEmergencyResources(requestForm);
    setRequestStatus(request);
    
    // Reset form
    setRequestForm({
      resourceType: '',
      quantity: '',
      urgency: 'normal',
      location: '',
      contact: ''
    });
  };

  const handleSubmitNewResource = (e) => {
    e.preventDefault();
    // In a real app, this would submit to the backend
    console.log('New resource submitted:', newResource);
    setShowResourceForm(false);
    setNewResource({
      name: '',
      type: '',
      quantity: '',
      unit: '',
      location: '',
      contact: '',
      availability: '24/7',
      region: ''
    });
    // Refresh resources
    loadResources();
  };

  const handleTrackRequest = () => {
    if (requestStatus && requestStatus.requestId) {
      const status = trackResourceRequest(requestStatus.requestId);
      setRequestStatus({ ...requestStatus, ...status });
    }
  };

  // Initialize allocation data for visualization
  useEffect(() => {
    // Sample allocation data - in a real app this would come from the backend
    const sampleAllocationData = [
      { type: 'medical', allocated: 45, available: 55, total: 100 },
      { type: 'food', allocated: 70, available: 30, total: 100 },
      { type: 'rescue', allocated: 30, available: 70, total: 100 },
      { type: 'shelter', allocated: 60, available: 40, total: 100 },
      { type: 'communication', allocated: 20, available: 80, total: 100 },
      { type: 'transport', allocated: 40, available: 60, total: 100 }
    ];
    setAllocationData(sampleAllocationData);
  }, []);

  // Get color based on allocation percentage
  const getAllocationColor = (percentage) => {
    if (percentage >= 80) return 'bg-red-500';
    if (percentage >= 60) return 'bg-orange-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter and sort resources
  const filteredAndSortedResources = resources
    .filter(resource => {
      if (filterByType && resource.type !== filterByType) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'quantity') {
        return b.quantity - a.quantity;
      } else if (sortBy === 'availability') {
        return a.availability.localeCompare(b.availability);
      }
      return 0;
    });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('emergencyResourceTracker.title')}</h1>
      
      {/* Resource Allocation Visualization */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{t('emergencyResourceTracker.allocation.title')}</h2>
          <button 
            onClick={() => setShowResourceForm(!showResourceForm)}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {showResourceForm ? t('emergencyResourceTracker.hideForm') : t('emergencyResourceTracker.addResource')}
          </button>
        </div>
        
        {/* Add Resource Form */}
        {showResourceForm && (
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">{t('emergencyResourceTracker.addResource')}</h3>
            <form onSubmit={handleSubmitNewResource} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('emergencyResourceTracker.resourceName')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newResource.name}
                  onChange={handleNewResourceChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('emergencyResourceTracker.resourceType')}
                </label>
                <select
                  id="type"
                  name="type"
                  value={newResource.type}
                  onChange={handleNewResourceChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">{t('emergencyResourceTracker.selectType')}</option>
                  {resourceTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.icon} {type.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('emergencyResourceTracker.quantity')}
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={newResource.quantity}
                  onChange={handleNewResourceChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('emergencyResourceTracker.unit')}
                </label>
                <input
                  type="text"
                  id="unit"
                  name="unit"
                  value={newResource.unit}
                  onChange={handleNewResourceChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder={t('emergencyResourceTracker.enterUnit')}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('emergencyResourceTracker.region')}
                </label>
                <select
                  id="region"
                  name="region"
                  value={newResource.region}
                  onChange={handleNewResourceChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">{t('emergencyResourceTracker.selectRegion')}</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Telangana">Telangana</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('emergencyResourceTracker.location')}
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={newResource.location}
                  onChange={handleNewResourceChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder={t('emergencyResourceTracker.enterLocation')}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('emergencyResourceTracker.contact')}
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={newResource.contact}
                  onChange={handleNewResourceChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder={t('emergencyResourceTracker.enterContact')}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('emergencyResourceTracker.availability')}
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={newResource.availability}
                  onChange={handleNewResourceChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="24/7">24/7</option>
                  <option value="8:00 AM - 8:00 PM">8:00 AM - 8:00 PM</option>
                  <option value="On Demand">On Demand</option>
                </select>
              </div>
              
              <div className="md:col-span-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowResourceForm(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t('emergencyResourceTracker.cancel')}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t('emergencyResourceTracker.addResource')}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Allocation Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {allocationData.map((item, index) => {
            const allocatedPercentage = (item.allocated / item.total) * 100;
            const availablePercentage = (item.available / item.total) * 100;
            const resourceType = resourceTypes.find(type => type.id === item.type);
            
            return (
              <div key={index} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-700">
                    {resourceType ? `${resourceType.icon} ${resourceType.name}` : item.type}
                  </h3>
                  <span className="text-sm font-medium text-gray-500">
                    {item.allocated}/{item.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full ${getAllocationColor(allocatedPercentage)}`}
                    style={{ width: `${allocatedPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{t('emergencyResourceTracker.allocation.allocated')}: {allocatedPercentage.toFixed(0)}%</span>
                  <span>{t('emergencyResourceTracker.allocation.available')}: {availablePercentage.toFixed(0)}%</span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Historical Usage Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('emergencyResourceTracker.historicalUsage')}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('emergencyResourceTracker.month')}
                  </th>
                  {resourceTypes.map((type) => (
                    <th key={type.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {type.icon} {type.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {historicalData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.month}
                    </td>
                    {resourceTypes.map((type) => (
                      <td key={type.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data[type.id] || 0}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">{t('emergencyResourceTracker.totalResources')}</h3>
          <p className="text-2xl font-bold text-blue-600">{statistics.totalResources?.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">{t('emergencyResourceTracker.availableResources')}</h3>
          <p className="text-2xl font-bold text-green-600">{statistics.availableResources?.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">{t('emergencyResourceTracker.responseRate')}</h3>
          <p className="text-2xl font-bold text-purple-600">{statistics.responseRate}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Resource List */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 md:mb-0">{t('emergencyResourceTracker.availableResources')}</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={filterByType}
                onChange={(e) => setFilterByType(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="">{t('emergencyResourceTracker.allTypes')}</option>
                {resourceTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.icon} {type.name}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="name">{t('emergencyResourceTracker.sort.name')}</option>
                <option value="quantity">{t('emergencyResourceTracker.sort.quantity')}</option>
                <option value="availability">{t('emergencyResourceTracker.sort.availability')}</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div>
              <label htmlFor="region" className="mr-2 text-gray-700">{t('emergencyResourceTracker.region')}</label>
              <select
                id="region"
                value={selectedRegion}
                onChange={handleRegionChange}
                className="border rounded px-2 py-1"
              >
                <option value="">{t('emergencyResourceTracker.allRegions')}</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Kerala">Kerala</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Telangana">Telangana</option>
              </select>
            </div>
            <button
              onClick={loadResources}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('emergencyResourceTracker.refresh')}
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('emergencyResourceTracker.resource')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('emergencyResourceTracker.quantity')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('emergencyResourceTracker.location')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('emergencyResourceTracker.availability')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedResources.map((resource) => (
                  <tr key={resource.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{getResourceTypes().find(t => t.id === resource.type)?.icon || '📦'}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{resource.name}</div>
                          <div className="text-sm text-gray-500">{resource.region}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {resource.quantity} {resource.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {resource.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {resource.availability}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Request Form */}
        <div>
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('emergencyResourceTracker.requestResources')}</h2>
            <form onSubmit={handleSubmitRequest}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="resourceType" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('emergencyResourceTracker.resourceType')}
                  </label>
                  <select
                    id="resourceType"
                    name="resourceType"
                    value={requestForm.resourceType}
                    onChange={handleRequestChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  >
                    <option value="">{t('emergencyResourceTracker.selectType')}</option>
                    {resourceTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.icon} {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('emergencyResourceTracker.quantity')}
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={requestForm.quantity}
                    onChange={handleRequestChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('emergencyResourceTracker.urgency')}
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={requestForm.urgency}
                    onChange={handleRequestChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="normal">{t('emergencyResourceTracker.normal')}</option>
                    <option value="high">{t('emergencyResourceTracker.high')}</option>
                    <option value="critical">{t('emergencyResourceTracker.critical')}</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('emergencyResourceTracker.location')}
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={requestForm.location}
                    onChange={handleRequestChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder={t('emergencyResourceTracker.enterLocation')}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('emergencyResourceTracker.contact')}
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={requestForm.contact}
                  onChange={handleRequestChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder={t('emergencyResourceTracker.enterContact')}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              >
                {t('emergencyResourceTracker.submitRequest')}
              </button>
            </form>
          </div>

          {/* Request Status */}
          {requestStatus && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{t('emergencyResourceTracker.requestStatus')}</h2>
                <button
                  onClick={handleTrackRequest}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t('emergencyResourceTracker.refreshStatus')}
                </button>
              </div>
              <div className="border rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{t('emergencyResourceTracker.requestId')}:</span>
                  <span className="font-mono">{requestStatus.requestId}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{t('emergencyResourceTracker.status')}:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getUrgencyColor(requestStatus.status)}`}>
                    {requestStatus.status}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{t('emergencyResourceTracker.submitted')}:</span>
                  <span>{new Date(requestStatus.timestamp).toLocaleString()}</span>
                </div>
                {requestStatus.estimatedDelivery && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{t('emergencyResourceTracker.estimatedDelivery')}:</span>
                    <span>{new Date(requestStatus.estimatedDelivery).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyResourceTracker;