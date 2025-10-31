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

  useEffect(() => {
    // Load resource types
    setResourceTypes(getResourceTypes());
    
    // Load statistics
    setStatistics(getResourceStatistics());
    
    // Load initial resources
    loadResources();
  }, []);

  const loadResources = () => {
    const data = getAvailableResources(selectedRegion);
    setResources(data);
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

  const handleTrackRequest = () => {
    if (requestStatus && requestStatus.requestId) {
      const status = trackResourceRequest(requestStatus.requestId);
      setRequestStatus({ ...requestStatus, ...status });
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('emergencyResourceTracker.title')}</h1>
      
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{t('emergencyResourceTracker.availableResources')}</h2>
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
                {resources.map((resource) => (
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
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('emergencyResourceTracker.requestStatus')}</h2>
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
                <button
                  onClick={handleTrackRequest}
                  className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
                >
                  {t('emergencyResourceTracker.refreshStatus')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyResourceTracker;