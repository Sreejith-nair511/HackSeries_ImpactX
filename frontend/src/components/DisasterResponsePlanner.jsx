import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { generateResponsePlan } from '../utils/disasterResponsePlanner';

const DisasterResponsePlanner = () => {
  const { t } = useTranslation();
  const [disasterType, setDisasterType] = useState('flood');
  const [severity, setSeverity] = useState(3);
  const [region, setRegion] = useState('kerala');
  const [responsePlan, setResponsePlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (disasterType && region) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const factors = {
          severity: parseInt(severity),
          affectedArea: disasterType === 'flood' ? 1000 : 
                       disasterType === 'earthquake' ? 500 :
                       disasterType === 'cyclone' ? 2000 :
                       disasterType === 'drought' ? 5000 : 200,
          affectedPopulation: disasterType === 'flood' ? 500000 : 
                            disasterType === 'earthquake' ? 300000 :
                            disasterType === 'cyclone' ? 800000 :
                            disasterType === 'drought' ? 1000000 : 100000,
          region: region
        };
        
        const plan = generateResponsePlan(disasterType, factors);
        setResponsePlan(plan);
        setIsLoading(false);
      }, 800);
    }
  }, [disasterType, severity, region]);

  const disasterTypes = [
    { value: 'flood', label: t('common.disasterTypes.flood') },
    { value: 'earthquake', label: t('common.disasterTypes.earthquake') },
    { value: 'cyclone', label: t('common.disasterTypes.cyclone') },
    { value: 'drought', label: t('common.disasterTypes.drought') },
    { value: 'landslide', label: t('common.disasterTypes.landslide') }
  ];

  const regions = [
    { value: 'kerala', label: t('states.kerala') },
    { value: 'maharashtra', label: t('states.maharashtra') },
    { value: 'odisha', label: t('states.odisha') }
  ];

  const severityLevels = [
    { value: 1, label: t('responsePlanner.severity.minor') },
    { value: 2, label: t('responsePlanner.severity.moderate') },
    { value: 3, label: t('responsePlanner.severity.significant') },
    { value: 4, label: t('responsePlanner.severity.severe') },
    { value: 5, label: t('responsePlanner.severity.catastrophic') }
  ];

  const formatNumber = (number) => {
    if (number >= 1000000) {
      return `${(number / 1000000).toFixed(1)}M`;
    } else if (number >= 1000) {
      return `${(number / 1000).toFixed(1)}K`;
    } else {
      return number.toString();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('responsePlanner.title')}</h2>
      
      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('responsePlanner.disasterType')}
          </label>
          <select
            value={disasterType}
            onChange={(e) => setDisasterType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {disasterTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('responsePlanner.severityLevel')}
          </label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {severityLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('responsePlanner.region')}
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {regions.map(region => (
              <option key={region.value} value={region.value}>{region.label}</option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : responsePlan ? (
        <div className="space-y-6">
          {/* Disaster Information */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {t('responsePlanner.disasterInfo', { 
                disaster: t(`common.disasterTypes.${disasterType}`),
                region: t(`states.${region}`)
              })}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-gray-600">{t('responsePlanner.severityLevel')}</p>
                <p className="font-semibold">{t(`responsePlanner.severity.${disasterType === 'drought' ? 'moderate' : severity <= 2 ? 'minor' : severity <= 3 ? 'significant' : severity <= 4 ? 'severe' : 'catastrophic'}`)}</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm text-gray-600">{t('responsePlanner.affectedArea')}</p>
                <p className="font-semibold">{responsePlan.resourceAllocation.boats || responsePlan.resourceAllocation.heavyMachinery || responsePlan.resourceAllocation.emergencyVehicles || responsePlan.resourceAllocation.waterTankers || responsePlan.resourceAllocation.rescueTeams} km²</p>
              </div>
            </div>
          </div>

          {/* Immediate Actions */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('responsePlanner.immediateActions')}</h3>
            <ul className="space-y-2">
              {responsePlan.immediateActions.map((action, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mt-0.5">•</span>
                  <span className="ml-2 text-gray-700">{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Resource Allocation */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('responsePlanner.resourceAllocation')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">{t('responsePlanner.teams')}</h4>
                <div className="space-y-2">
                  {Object.entries(responsePlan.resourceAllocation)
                    .filter(([key]) => key.includes('Teams'))
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">{t('responsePlanner.equipmentAndSupplies')}</h4>
                <div className="space-y-2">
                  {Object.entries(responsePlan.resourceAllocation)
                    .filter(([key]) => !key.includes('Teams') && typeof value === 'number')
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-semibold">{formatNumber(value)}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('responsePlanner.timeline')}</h3>
            <div className="space-y-3">
              {Object.entries(responsePlan.timeline).map(([phase, description]) => (
                <div key={phase} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-800 capitalize">{t(`responsePlanner.phases.${phase}`)}</h4>
                    <p className="text-gray-600 text-sm">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coordination */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('responsePlanner.coordination')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {responsePlan.coordination.map((entity, index) => (
                <div key={index} className="flex items-center bg-gray-50 p-2 rounded">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-500">•</span>
                  <span className="ml-2 text-gray-700">{entity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special Considerations */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('responsePlanner.specialConsiderations')}</h3>
            <ul className="space-y-2">
              {responsePlan.specialConsiderations.map((consideration, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-yellow-500 mt-0.5">⚠️</span>
                  <span className="ml-2 text-gray-700">{consideration}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {t('responsePlanner.selectDisasterAndRegion')}
        </div>
      )}
    </div>
  );
};

export default DisasterResponsePlanner;