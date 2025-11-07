import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { validateCommunityReport, formatCommunityReport, calculateReportPriority } from '../utils/communityReportingUtils';

const CommunityDisasterReporter = () => {
  const { t, i18n } = useTranslation();
  
  const [reportData, setReportData] = useState({
    disasterType: '',
    location: '',
    description: '',
    latitude: '',
    longitude: '',
    severity: 3,
    affectedPeople: '',
    media: []
  });
  
  const [errors, setErrors] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [mediaPreviews, setMediaPreviews] = useState([]);

  // Disaster types for the dropdown
  const disasterTypes = [
    { value: 'flood', label: t('communityReporting.disasterTypes.flood') },
    { value: 'earthquake', label: t('communityReporting.disasterTypes.earthquake') },
    { value: 'cyclone', label: t('communityReporting.disasterTypes.cyclone') },
    { value: 'drought', label: t('communityReporting.disasterTypes.drought') },
    { value: 'landslide', label: t('communityReporting.disasterTypes.landslide') },
    { value: 'fire', label: t('communityReporting.disasterTypes.fire') },
    { value: 'epidemic', label: t('communityReporting.disasterTypes.epidemic') },
    { value: 'chemical', label: t('communityReporting.disasterTypes.chemical') },
    { value: 'other', label: t('communityReporting.disasterTypes.other') }
  ];

  // Real-time validation
  const validateField = (name, value) => {
    const newFieldErrors = { ...fieldErrors };
    
    switch (name) {
      case 'disasterType':
        if (!value || value.trim() === '') {
          newFieldErrors.disasterType = t('communityReporting.validation.disasterTypeRequired');
        } else {
          delete newFieldErrors.disasterType;
        }
        break;
      case 'location':
        if (!value || value.trim() === '') {
          newFieldErrors.location = t('communityReporting.validation.locationRequired');
        } else {
          delete newFieldErrors.location;
        }
        break;
      case 'description':
        if (!value || value.trim() === '') {
          newFieldErrors.description = t('communityReporting.validation.descriptionRequired');
        } else if (value.length < 10) {
          newFieldErrors.description = t('communityReporting.validation.descriptionTooShort');
        } else {
          delete newFieldErrors.description;
        }
        break;
      case 'latitude':
        if (value && (isNaN(value) || parseFloat(value) < -90 || parseFloat(value) > 90)) {
          newFieldErrors.latitude = t('communityReporting.validation.invalidLatitude');
        } else {
          delete newFieldErrors.latitude;
        }
        break;
      case 'longitude':
        if (value && (isNaN(value) || parseFloat(value) < -180 || parseFloat(value) > 180)) {
          newFieldErrors.longitude = t('communityReporting.validation.invalidLongitude');
        } else {
          delete newFieldErrors.longitude;
        }
        break;
      case 'affectedPeople':
        if (value && (isNaN(value) || parseInt(value) < 0)) {
          newFieldErrors.affectedPeople = t('communityReporting.validation.invalidAffectedPeople');
        } else {
          delete newFieldErrors.affectedPeople;
        }
        break;
      default:
        break;
    }
    
    setFieldErrors(newFieldErrors);
  };

  // Handle input changes with real-time validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate the field in real-time
    validateField(name, value);
  };

  // Handle severity change
  const handleSeverityChange = (level) => {
    setReportData(prev => ({
      ...prev,
      severity: level
    }));
  };

  // Get current location with enhanced error handling
  const getCurrentLocation = () => {
    setLocationError('');
    
    if (!navigator.geolocation) {
      setLocationError(t('communityReporting.locationNotSupported'));
      return;
    }
    
    // Show loading state
    setLocationError(t('communityReporting.detectingLocation'));
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setReportData(prev => ({
          ...prev,
          latitude: latitude.toFixed(6),
          longitude: longitude.toFixed(6)
        }));
        setCurrentLocation({ latitude, longitude });
        setLocationError('');
      },
      (error) => {
        let errorMessage = '';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = t('communityReporting.locationPermissionDenied');
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = t('communityReporting.locationUnavailable');
            break;
          case error.TIMEOUT:
            errorMessage = t('communityReporting.locationTimeout');
            break;
          default:
            errorMessage = t('communityReporting.locationError');
            break;
        }
        setLocationError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  // Handle media file selection with preview
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + reportData.media.length > 5) {
      alert(t('communityReporting.maxMediaFiles'));
      return;
    }
    
    const newMedia = [];
    const newPreviews = [...mediaPreviews];
    
    files.forEach((file, index) => {
      newMedia.push({
        name: file.name,
        size: file.size,
        type: file.type,
        fileObject: file
      });
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push({
            name: file.name,
            url: e.target.result,
            type: 'image'
          });
          setMediaPreviews([...newPreviews]);
        };
        reader.readAsDataURL(file);
      } else {
        newPreviews.push({
          name: file.name,
          type: 'file'
        });
        setMediaPreviews([...newPreviews]);
      }
    });
    
    setReportData(prev => ({
      ...prev,
      media: [...prev.media, ...newMedia]
    }));
  };

  // Remove media file
  const removeMediaFile = (index) => {
    setReportData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
    
    setMediaPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Validate and submit report
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert string values to numbers where appropriate
    const processedData = {
      ...reportData,
      latitude: reportData.latitude ? parseFloat(reportData.latitude) : undefined,
      longitude: reportData.longitude ? parseFloat(reportData.longitude) : undefined,
      affectedPeople: reportData.affectedPeople ? parseInt(reportData.affectedPeople) : undefined,
      timestamp: new Date().toISOString()
    };
    
    // Validate report
    const validation = validateCommunityReport(processedData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setErrors([]);
    setIsSubmitting(true);
    
    try {
      // In a real application, this would send the data to a backend API
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      // Reset form after successful submission
      setReportData({
        disasterType: '',
        location: '',
        description: '',
        latitude: '',
        longitude: '',
        severity: 3,
        affectedPeople: '',
        media: []
      });
      setMediaPreviews([]);
      setFieldErrors({});
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setErrors([t('communityReporting.submissionError')]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('communityReporting.title')}</h2>
      <p className="text-gray-600 mb-6">{t('communityReporting.description')}</p>
      
      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          {t('communityReporting.successMessage')}
        </div>
      )}
      
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <ul className="list-disc pl-5">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Disaster Type */}
        <div>
          <label htmlFor="disasterType" className="block text-sm font-medium text-gray-700 mb-2">
            {t('communityReporting.disasterType')}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="disasterType"
            name="disasterType"
            value={reportData.disasterType}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              fieldErrors.disasterType ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          >
            <option value="">{t('communityReporting.selectDisasterType')}</option>
            {disasterTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {fieldErrors.disasterType && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.disasterType}</p>
          )}
        </div>
        
        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            {t('communityReporting.location')}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="location"
              name="location"
              value={reportData.location}
              onChange={handleInputChange}
              placeholder={t('communityReporting.locationPlaceholder')}
              className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                fieldErrors.location ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            <button
              type="button"
              onClick={getCurrentLocation}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={locationError === t('communityReporting.detectingLocation')}
            >
              {locationError === t('communityReporting.detectingLocation') ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('communityReporting.detecting')}
                </span>
              ) : (
                t('communityReporting.useCurrentLocation')
              )}
            </button>
          </div>
          {locationError && (
            <p className="mt-1 text-sm text-red-600">{locationError}</p>
          )}
          
          {/* Coordinates (optional) */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label htmlFor="latitude" className="block text-xs text-gray-500 mb-1">
                {t('communityReporting.latitude')}
              </label>
              <input
                type="text"
                id="latitude"
                name="latitude"
                value={reportData.latitude}
                onChange={handleInputChange}
                placeholder="28.6139"
                className={`w-full px-3 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  fieldErrors.latitude ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {fieldErrors.latitude && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.latitude}</p>
              )}
            </div>
            <div>
              <label htmlFor="longitude" className="block text-xs text-gray-500 mb-1">
                {t('communityReporting.longitude')}
              </label>
              <input
                type="text"
                id="longitude"
                name="longitude"
                value={reportData.longitude}
                onChange={handleInputChange}
                placeholder="77.2090"
                className={`w-full px-3 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  fieldErrors.longitude ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {fieldErrors.longitude && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.longitude}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            {t('communityReporting.description')}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={reportData.description}
            onChange={handleInputChange}
            rows={4}
            placeholder={t('communityReporting.descriptionPlaceholder')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              fieldErrors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {fieldErrors.description && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.description}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {t('communityReporting.descriptionHelp')}
          </p>
        </div>
        
        {/* Severity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('communityReporting.severity')}
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map(level => (
              <button
                key={level}
                type="button"
                onClick={() => handleSeverityChange(level)}
                className={`flex-1 py-2 rounded-lg transition-colors ${
                  reportData.severity === level
                    ? level <= 2 
                      ? 'bg-green-500 text-white' 
                      : level <= 3 
                        ? 'bg-yellow-500 text-white' 
                        : level <= 4 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{t('communityReporting.low')}</span>
            <span>{t('communityReporting.high')}</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {t('communityReporting.severityHelp')}
          </p>
        </div>
        
        {/* Affected People */}
        <div>
          <label htmlFor="affectedPeople" className="block text-sm font-medium text-gray-700 mb-2">
            {t('communityReporting.affectedPeople')}
          </label>
          <input
            type="number"
            id="affectedPeople"
            name="affectedPeople"
            value={reportData.affectedPeople}
            onChange={handleInputChange}
            min="0"
            placeholder="0"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              fieldErrors.affectedPeople ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {fieldErrors.affectedPeople && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.affectedPeople}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {t('communityReporting.affectedPeopleHelp')}
          </p>
        </div>
        
        {/* Media Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('communityReporting.media')}
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input
              type="file"
              id="media"
              multiple
              accept="image/*,video/*"
              onChange={handleMediaChange}
              className="hidden"
            />
            <label htmlFor="media" className="cursor-pointer">
              <div className="text-gray-500">
                <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-2">{t('communityReporting.uploadMedia')}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {t('communityReporting.mediaLimit')}
                </p>
              </div>
            </label>
          </div>
          
          {/* Preview selected media */}
          {mediaPreviews.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {mediaPreviews.map((preview, index) => (
                <div key={index} className="relative">
                  {preview.type === 'image' ? (
                    <div className="bg-gray-100 border border-gray-300 rounded-lg overflow-hidden">
                      <img 
                        src={preview.url} 
                        alt={preview.name} 
                        className="w-full h-24 object-cover"
                      />
                      <div className="p-1 text-xs truncate bg-white">
                        {preview.name}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-center">
                      <div className="text-xs truncate">{preview.name}</div>
                      <div className="text-xs text-gray-500">
                        {Math.round(reportData.media[index]?.size / 1024)} KB
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeMediaFile(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
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
    </div>
  );
};

export default CommunityDisasterReporter;