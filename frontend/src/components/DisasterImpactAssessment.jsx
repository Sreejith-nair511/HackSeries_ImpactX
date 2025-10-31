import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { generateImpactReport } from '../utils/disasterImpactAssessment';

const DisasterImpactAssessment = () => {
  const { t } = useTranslation();
  const [disasterType, setDisasterType] = useState('flood');
  const [region, setRegion] = useState('kerala');
  const [impactReport, setImpactReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sample disaster data for different regions and disaster types
  const disasterData = {
    flood: {
      economicFactors: {
        affectedPopulation: 500000,
        gdpPerCapita: 250000,
        infrastructureDamage: 0.6,
        businessDisruption: 30,
        agriculturalLoss: 40
      },
      socialFactors: {
        affectedPopulation: 500000,
        displacedPopulation: 150000,
        casualties: 200,
        healthcareCapacity: 0.4,
        educationDisruption: 3
      },
      environmentalFactors: {
        areaAffected: 2500,
        forestDamage: 20,
        waterContamination: 7,
        airQualityDegradation: 3,
        wildlifeImpact: 5
      }
    },
    earthquake: {
      economicFactors: {
        affectedPopulation: 300000,
        gdpPerCapita: 300000,
        infrastructureDamage: 0.8,
        businessDisruption: 60,
        agriculturalLoss: 15
      },
      socialFactors: {
        affectedPopulation: 300000,
        displacedPopulation: 100000,
        casualties: 500,
        healthcareCapacity: 0.6,
        educationDisruption: 6
      },
      environmentalFactors: {
        areaAffected: 1500,
        forestDamage: 5,
        waterContamination: 4,
        airQualityDegradation: 2,
        wildlifeImpact: 3
      }
    },
    cyclone: {
      economicFactors: {
        affectedPopulation: 800000,
        gdpPerCapita: 200000,
        infrastructureDamage: 0.7,
        businessDisruption: 45,
        agriculturalLoss: 60
      },
      socialFactors: {
        affectedPopulation: 800000,
        displacedPopulation: 300000,
        casualties: 300,
        healthcareCapacity: 0.5,
        educationDisruption: 4
      },
      environmentalFactors: {
        areaAffected: 5000,
        forestDamage: 35,
        waterContamination: 6,
        airQualityDegradation: 4,
        wildlifeImpact: 7
      }
    }
  };

  useEffect(() => {
    if (disasterType && region) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const data = disasterData[disasterType];
        const report = generateImpactReport(data);
        setImpactReport(report);
        setIsLoading(false);
      }, 800);
    }
  }, [disasterType, region]);

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

  const getImpactColor = (score) => {
    if (score >= 70) return 'bg-red-500';
    if (score >= 50) return 'bg-orange-500';
    if (score >= 30) return 'bg-yellow-500';
    if (score >= 10) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} ${t('common.crore')}`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} ${t('common.lakh')}`;
    } else {
      return `₹${amount.toLocaleString()}`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('impactAssessment.title')}</h2>
      
      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('impactAssessment.disasterType')}
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
            {t('impactAssessment.region')}
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
      ) : impactReport ? (
        <div className="space-y-6">
          {/* Overall Impact */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('impactAssessment.overallImpact')}</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-800">
                  {impactReport.overallImpact.overallImpactScore}/100
                </div>
                <div className="text-sm text-gray-600">
                  {t(`impactAssessment.impactLevels.${impactReport.overallImpact.impactLevel.toLowerCase()}`)}
                </div>
              </div>
              <div className="w-24 h-24 relative">
                <svg viewBox="0 0 36 36" className="w-24 h-24">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={getImpactColor(impactReport.overallImpact.overallImpactScore)}
                    strokeWidth="3"
                    strokeDasharray={`${impactReport.overallImpact.overallImpactScore}, 100`}
                  />
                  <text x="18" y="20.5" textAnchor="middle" fill="#333" fontSize="8">
                    {impactReport.overallImpact.overallImpactScore}
                  </text>
                </svg>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">{t('impactAssessment.recoveryTime')}</p>
                <p className="font-semibold">{impactReport.overallImpact.recoveryTime} {t('impactAssessment.months')}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">{t('impactAssessment.priorityLevel')}</p>
                <p className="font-semibold">{t(`impactAssessment.priority.${impactReport.overallImpact.priorityLevel.toLowerCase()}`)}</p>
              </div>
            </div>
          </div>

          {/* Economic Impact */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('impactAssessment.economicImpact')}</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>{t('impactAssessment.totalEconomicLoss')}</span>
                <span className="font-semibold">{formatCurrency(impactReport.economicImpact.totalEconomicLoss)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{t('impactAssessment.infrastructureLoss')}</span>
                <span className="font-semibold">{formatCurrency(impactReport.economicImpact.infrastructureLoss)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{t('impactAssessment.agriculturalLoss')}</span>
                <span className="font-semibold">{formatCurrency(impactReport.economicImpact.agriculturalLoss)}</span>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span>{t('impactAssessment.recoveryEstimate')}</span>
                  <span className="font-semibold text-indigo-600">{formatCurrency(impactReport.economicImpact.recoveryEstimate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Impact */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('impactAssessment.socialImpact')}</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-gray-600">{t('impactAssessment.affectedFamilies')}</p>
                <p className="text-xl font-bold">{impactReport.socialImpact.affectedFamilies.toLocaleString()}</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm text-gray-600">{t('impactAssessment.childrenAffected')}</p>
                <p className="text-xl font-bold">{impactReport.socialImpact.childrenAffected.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded">
                <p className="text-sm text-gray-600">{t('impactAssessment.displacementRate')}</p>
                <p className="text-xl font-bold">{impactReport.socialImpact.displacementRate}%</p>
              </div>
              <div className="bg-red-50 p-3 rounded">
                <p className="text-sm text-gray-600">{t('impactAssessment.casualtyRate')}</p>
                <p className="text-xl font-bold">{impactReport.socialImpact.casualtyRate}%</p>
              </div>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('impactAssessment.environmentalImpact')}</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>{t('impactAssessment.forestLoss')}</span>
                <span className="font-semibold">{impactReport.environmentalImpact.forestLoss} km²</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{t('impactAssessment.co2Emissions')}</span>
                <span className="font-semibold">{impactReport.environmentalImpact.co2Emissions.toLocaleString()} tons</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{t('impactAssessment.biodiversityLoss')}</span>
                <span className="font-semibold">{impactReport.environmentalImpact.biodiversityLoss} {t('impactAssessment.species')}</span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('impactAssessment.recommendations')}</h3>
            <ul className="space-y-2">
              {impactReport.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-500">•</span>
                  <span className="ml-2 text-gray-700">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {t('impactAssessment.selectDisasterAndRegion')}
        </div>
      )}
    </div>
  );
};

export default DisasterImpactAssessment;