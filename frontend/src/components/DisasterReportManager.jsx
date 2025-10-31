import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { validateDisasterReport, formatDisasterReport, calculateReportPriority, categorizeDisasterReport, estimateRequiredResources } from '../utils/disasterReportingUtils';

const DisasterReportManager = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('create');
  const [reportData, setReportData] = useState({
    disasterType: 'flood',
    location: '',
    description: '',
    severity: 3,
    affectedPeople: '',
    latitude: '',
    longitude: '',
    media: []
  });
  const [validationResult, setValidationResult] = useState(null);
  const [formattedReport, setFormattedReport] = useState(null);
  const [priority, setPriority] = useState(null);
  const [category, setCategory] = useState(null);
  const [resources, setResources] = useState(null);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setReportData({
      ...reportData,
      [field]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate report
    const validation = validateDisasterReport(reportData);
    setValidationResult(validation);
    
    if (validation.isValid) {
      // Format report
      const formatted = formatDisasterReport(reportData);
      setFormattedReport(formatted);
      
      // Calculate priority
      const priorityLevel = calculateReportPriority(reportData);
      setPriority(priorityLevel);
      
      // Categorize report
      const reportCategory = categorizeDisasterReport(reportData);
      setCategory(reportCategory);
      
      // Estimate resources
      const resourceEstimate = estimateRequiredResources(reportData);
      setResources(resourceEstimate);
      
      // Switch to results tab
      setActiveTab('results');
    }
  };

  // Reset form
  const handleReset = () => {
    setReportData({
      disasterType: 'flood',
      location: '',
      description: '',
      severity: 3,
      affectedPeople: '',
      latitude: '',
      longitude: '',
      media: []
    });
    setValidationResult(null);
    setFormattedReport(null);
    setPriority(null);
    setCategory(null);
    setResources(null);
  };

  const disasterTypes = [
    { value: 'flood', label: t('disasterTypes.flood') },
    { value: 'earthquake', label: t('disasterTypes.earthquake') },
    { value: 'cyclone', label: t('disasterTypes.cyclone') },
    { value: 'drought', label: t('disasterTypes.drought') },
    { value: 'landslide', label: t('disasterTypes.landslide') },
    { value: 'fire', label: t('disasterReporting.disasterTypes.fire') },
    { value: 'epidemic', label: t('disasterReporting.disasterTypes.epidemic') },
    { value: 'chemical', label: t('disasterReporting.disasterTypes.chemical') },
    { value: 'other', label: t('disasterReporting.disasterTypes.other') }
  ];

  const priorityColors = {
    critical: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('disasterReporting.title')}</h2>
      <p className="text-gray-600 mb-6">{t('disasterReporting.description')}</p>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('create')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'create'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('disasterReporting.tabs.create')}
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'results'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('disasterReporting.tabs.results')}
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {/* Create Report Tab */}
        {activeTab === 'create' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('disasterReporting.create.title')}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Disaster Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('disasterReporting.disasterType')}
                  </label>
                  <select
                    value={reportData.disasterType}
                    onChange={(e) => handleInputChange('disasterType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {disasterTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                {/* Severity Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('disasterReporting.severity')}
                  </label>
                  <select
                    value={reportData.severity}
                    onChange={(e) => handleInputChange('severity', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {[1, 2, 3, 4, 5].map(level => (
                      <option key={level} value={level}>{level} - {t(`disasterReporting.severityLevels.${level}`)}</option>
                    ))}
                  </select>
                </div>
                
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('disasterReporting.location')}
                  </label>
                  <input
                    type="text"
                    value={reportData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder={t('disasterReporting.locationPlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                {/* Affected People */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('disasterReporting.affectedPeople')}
                  </label>
                  <input
                    type="number"
                    value={reportData.affectedPeople}
                    onChange={(e) => handleInputChange('affectedPeople', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    min="0"
                  />
                </div>
                
                {/* Latitude */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('disasterReporting.latitude')}
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={reportData.latitude}
                    onChange={(e) => handleInputChange('latitude', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                {/* Longitude */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('disasterReporting.longitude')}
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={reportData.longitude}
                    onChange={(e) => handleInputChange('longitude', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('disasterReporting.description')}
                </label>
                <textarea
                  value={reportData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder={t('disasterReporting.descriptionPlaceholder')}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              
              {/* Form Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t('disasterReporting.reset')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t('disasterReporting.submit')}
                </button>
              </div>
              
              {/* Validation Errors */}
              {validationResult && !validationResult.isValid && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        {t('disasterReporting.validationErrors')}
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <ul className="list-disc pl-5 space-y-1">
                          {validationResult.errors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && validationResult && validationResult.isValid && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('disasterReporting.results.title')}</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Report Summary */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-700 mb-4">{t('disasterReporting.results.summary')}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterReporting.disasterType')}:</span>
                    <span className="font-medium">{t(`disasterTypes.${reportData.disasterType}`)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterReporting.location')}:</span>
                    <span className="font-medium">{reportData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterReporting.severity')}:</span>
                    <span className="font-medium">{reportData.severity} - {t(`disasterReporting.severityLevels.${reportData.severity}`)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterReporting.affectedPeople')}:</span>
                    <span className="font-medium">{reportData.affectedPeople || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterReporting.priority')}:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[priority]}`}>
                      {t(`disasterReporting.priorityLevels.${priority}`)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Resource Estimate */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-700 mb-4">{t('disasterReporting.results.resources')}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterReporting.resources.personnel')}:</span>
                    <span className="font-medium">{resources?.personnel || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterReporting.resources.equipment')}:</span>
                    <span className="font-medium">{resources?.equipment || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterReporting.resources.supplies')}:</span>
                    <span className="font-medium">{resources?.supplies || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterReporting.resources.evacuation')}:</span>
                    <span className="font-medium">{resources?.evacuation || 0}</span>
                  </div>
                </div>
              </div>
              
              {/* Category Information */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-700 mb-4">{t('disasterReporting.results.category')}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterReporting.category.type')}:</span>
                    <span className="font-medium">{t(`disasterReporting.categoryTypes.${category?.category}`)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('disasterReporting.category.impact')}:</span>
                    <span className="font-medium">{t(`disasterReporting.impactLevels.${category?.impactLevel}`)}</span>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-700 mb-4">{t('disasterReporting.description')}</h4>
                <p className="text-gray-600">{reportData.description}</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setActiveTab('create')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('disasterReporting.edit')}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('disasterReporting.createNew')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisasterReportManager;