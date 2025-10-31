import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { processCommunityDisasterReport } from '../utils/communityDisasterReporting';

const CommunityDisasterReporting = () => {
  const { t } = useTranslation();
  const [reportData, setReportData] = useState({
    disasterType: '',
    location: '',
    description: '',
    severity: 3,
    affectedPeople: '',
    latitude: '',
    longitude: '',
    reporterName: '',
    reporterContact: '',
    anonymous: false,
    media: []
  });
  const [submittedReport, setSubmittedReport] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const disasterTypes = [
    { value: '', label: t('communityReporting.selectDisasterType') },
    { value: 'flood', label: t('common.disasterTypes.flood') },
    { value: 'earthquake', label: t('common.disasterTypes.earthquake') },
    { value: 'cyclone', label: t('common.disasterTypes.cyclone') },
    { value: 'drought', label: t('common.disasterTypes.drought') },
    { value: 'landslide', label: t('common.disasterTypes.landslide') },
    { value: 'forest_fire', label: t('communityReporting.disasterTypes.forest_fire') },
    { value: 'building_collapse', label: t('communityReporting.disasterTypes.building_collapse') },
    { value: 'road_damage', label: t('communityReporting.disasterTypes.road_damage') },
    { value: 'power_outage', label: t('communityReporting.disasterTypes.power_outage') },
    { value: 'water_contamination', label: t('communityReporting.disasterTypes.water_contamination') },
    { value: 'disease_outbreak', label: t('communityReporting.disasterTypes.disease_outbreak') }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setReportData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setReportData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setErrors([t('communityReporting.mediaLimitError')]);
      return;
    }
    setReportData(prev => ({
      ...prev,
      media: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);
    
    try {
      // Process the report
      const result = processCommunityDisasterReport(reportData);
      
      if (result.success) {
        setSubmittedReport(result);
        // Reset form
        setReportData({
          disasterType: '',
          location: '',
          description: '',
          severity: 3,
          affectedPeople: '',
          latitude: '',
          longitude: '',
          reporterName: '',
          reporterContact: '',
          anonymous: false,
          media: []
        });
      } else {
        setErrors(result.errors);
      }
    } catch (error) {
      setErrors([t('communityReporting.submissionError')]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityColor = (priorityLevel) => {
    switch (priorityLevel) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('communityReporting.title')}</h2>
      <p className="text-gray-600 mb-6">{t('communityReporting.description')}</p>
      
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="text-red-800 font-medium mb-2">{t('communityReporting.errors')}</h3>
          <ul className="list-disc list-inside text-red-700">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      {submittedReport ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-green-800">{t('communityReporting.submissionSuccess')}</h3>
              <p className="text-sm text-green-700">{t('communityReporting.reportId')}: {submittedReport.report.id}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-medium text-gray-700 mb-2">{t('communityReporting.priority')}</h4>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${getPriorityColor(submittedReport.summary.priorityLevel)} mr-2`}></div>
                <span className="font-semibold capitalize">{submittedReport.summary.priorityLevel}</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {t('communityReporting.score')}: {submittedReport.summary.priorityScore}/100
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-medium text-gray-700 mb-2">{t('communityReporting.category')}</h4>
              <p className="font-semibold capitalize">{submittedReport.summary.category.replace('_', ' ')}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-medium text-gray-700 mb-2">{t('communityReporting.estimatedResponseTime')}</h4>
              <p className="font-semibold capitalize">{submittedReport.summary.responseTimeEstimate.replace('_', ' ')}</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-medium text-gray-700 mb-2">{t('communityReporting.requiredResources')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">{t('communityReporting.personnel')}</p>
                <p className="font-semibold">{submittedReport.summary.requiredResources.personnel} {t('communityReporting.people')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('communityReporting.equipment')}</p>
                <p className="font-semibold">{submittedReport.summary.requiredResources.equipment.join(', ')}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setSubmittedReport(null)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {t('communityReporting.submitAnotherReport')}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('communityReporting.disasterType')} <span className="text-red-500">*</span>
              </label>
              <select
                name="disasterType"
                value={reportData.disasterType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                {disasterTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('communityReporting.location')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={reportData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={t('communityReporting.enterLocation')}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('communityReporting.description')} <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={reportData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={t('communityReporting.enterDescription')}
              required
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('communityReporting.severity')} ({t('communityReporting.scale')}: 1-5)
              </label>
              <select
                name="severity"
                value={reportData.severity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                {[1, 2, 3, 4, 5].map(level => (
                  <option key={level} value={level}>
                    {level} - {t(`communityReporting.severityLevels.${level}`)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('communityReporting.affectedPeople')}
              </label>
              <input
                type="number"
                name="affectedPeople"
                value={reportData.affectedPeople}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={t('communityReporting.enterAffectedPeople')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('communityReporting.media')} ({t('communityReporting.maxFiles')}: 5)
              </label>
              <input
                type="file"
                onChange={handleMediaChange}
                multiple
                accept="image/*,video/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('communityReporting.latitude')}
              </label>
              <input
                type="number"
                name="latitude"
                value={reportData.latitude}
                onChange={handleInputChange}
                step="any"
                min="-90"
                max="90"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={t('communityReporting.enterLatitude')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('communityReporting.longitude')}
              </label>
              <input
                type="number"
                name="longitude"
                value={reportData.longitude}
                onChange={handleInputChange}
                step="any"
                min="-180"
                max="180"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={t('communityReporting.enterLongitude')}
              />
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{t('communityReporting.reporterInfo')}</h3>
            
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="anonymous"
                checked={reportData.anonymous}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                {t('communityReporting.submitAnonymously')}
              </label>
            </div>
            
            {!reportData.anonymous && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('communityReporting.reporterName')}
                  </label>
                  <input
                    type="text"
                    name="reporterName"
                    value={reportData.reporterName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder={t('communityReporting.enterReporterName')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('communityReporting.reporterContact')}
                  </label>
                  <input
                    type="text"
                    name="reporterContact"
                    value={reportData.reporterContact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder={t('communityReporting.enterReporterContact')}
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('communityReporting.submitting')}
                </span>
              ) : (
                t('communityReporting.submitReport')
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommunityDisasterReporting;