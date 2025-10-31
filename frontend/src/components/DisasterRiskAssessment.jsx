import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  calculateFloodRisk,
  calculateEarthquakeRisk,
  calculateCycloneRisk,
  calculateDroughtRisk,
  calculateLandslideRisk,
  calculateOverallRiskIndex,
  getRiskLevelColor,
  getRiskLevelDescription
} from '../utils/disasterRiskCalculator';

const DisasterRiskAssessment = () => {
  const { t, i18n } = useTranslation();
  const [selectedRegion, setSelectedRegion] = useState('maharashtra');
  const [risks, setRisks] = useState({});
  const [overallRisk, setOverallRisk] = useState({});

  // Sample regional data for different Indian states
  const regionalData = {
    maharashtra: {
      name: t('states.maharashtra') || 'Maharashtra',
      factors: {
        flood: { rainfall: 7, topography: 6, drainage: 5, riverProximity: 8, historicalFloods: 7 },
        earthquake: { seismicZone: 6, soilType: 5, buildingCodes: 6, historicalQuakes: 5 },
        cyclone: { seaSurfaceTemp: 8, windPatterns: 7, coastalLocation: 9, historicalCyclones: 8 },
        drought: { precipitation: 4, temperature: 8, soilMoisture: 3, waterResources: 4 },
        landslide: { slopeStability: 6, vegetation: 5, rainfallIntensity: 7, seismicActivity: 5 }
      }
    },
    odisha: {
      name: t('states.odisha') || 'Odisha',
      factors: {
        flood: { rainfall: 8, topography: 7, drainage: 4, riverProximity: 9, historicalFloods: 8 },
        earthquake: { seismicZone: 5, soilType: 6, buildingCodes: 5, historicalQuakes: 4 },
        cyclone: { seaSurfaceTemp: 9, windPatterns: 8, coastalLocation: 10, historicalCyclones: 9 },
        drought: { precipitation: 3, temperature: 9, soilMoisture: 2, waterResources: 3 },
        landslide: { slopeStability: 7, vegetation: 4, rainfallIntensity: 8, seismicActivity: 4 }
      }
    },
    kerala: {
      name: t('states.kerala') || 'Kerala',
      factors: {
        flood: { rainfall: 9, topography: 8, drainage: 6, riverProximity: 7, historicalFloods: 9 },
        earthquake: { seismicZone: 4, soilType: 7, buildingCodes: 7, historicalQuakes: 3 },
        cyclone: { seaSurfaceTemp: 7, windPatterns: 6, coastalLocation: 8, historicalCyclones: 6 },
        drought: { precipitation: 6, temperature: 7, soilMoisture: 6, waterResources: 7 },
        landslide: { slopeStability: 5, vegetation: 8, rainfallIntensity: 9, seismicActivity: 3 }
      }
    }
  };

  useEffect(() => {
    // Calculate risks when region changes
    const regionData = regionalData[selectedRegion];
    if (regionData) {
      const floodRisk = calculateFloodRisk(regionData.factors.flood);
      const earthquakeRisk = calculateEarthquakeRisk(regionData.factors.earthquake);
      const cycloneRisk = calculateCycloneRisk(regionData.factors.cyclone);
      const droughtRisk = calculateDroughtRisk(regionData.factors.drought);
      const landslideRisk = calculateLandslideRisk(regionData.factors.landslide);
      
      const calculatedRisks = {
        flood: floodRisk,
        earthquake: earthquakeRisk,
        cyclone: cycloneRisk,
        drought: droughtRisk,
        landslide: landslideRisk
      };
      
      setRisks(calculatedRisks);
      setOverallRisk(calculateOverallRiskIndex(calculatedRisks));
    }
  }, [selectedRegion]);

  const getRiskBar = (riskScore) => {
    const percentage = riskScore;
    let color = 'bg-green-500';
    
    if (percentage >= 70) {
      color = 'bg-red-500';
    } else if (percentage >= 50) {
      color = 'bg-orange-500';
    } else if (percentage >= 30) {
      color = 'bg-yellow-500';
    }
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`${color} h-2.5 rounded-full`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  const regions = Object.keys(regionalData).map(key => ({
    id: key,
    name: regionalData[key].name
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {t('disasterRisk.title') || 'Disaster Risk Assessment'}
      </h2>
      
      {/* Region Selector */}
      <div className="mb-6">
        <label htmlFor="region-select" className="block text-sm font-medium text-gray-700 mb-2">
          {t('disasterRisk.selectRegion') || 'Select Region'}
        </label>
        <select
          id="region-select"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-label={t('disasterRisk.selectRegion') || 'Select Region'}
        >
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Overall Risk Index */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {t('disasterRisk.overallRisk') || 'Overall Risk Index'}
          </h3>
          <span 
            className="px-3 py-1 rounded-full text-white font-medium"
            style={{ backgroundColor: getRiskLevelColor(overallRisk.level) }}
          >
            {overallRisk.label}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3">
          {getRiskLevelDescription(overallRisk.level, i18n.language)}
        </p>
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="h-4 rounded-full"
              style={{ 
                width: `${overallRisk.index}%`,
                backgroundColor: getRiskLevelColor(overallRisk.level)
              }}
            ></div>
          </div>
          <span className="ml-3 text-gray-700 font-medium">{overallRisk.index}/100</span>
        </div>
      </div>
      
      {/* Individual Risk Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(risks).map(([disaster, riskScore]) => (
          <div key={disaster} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-800 capitalize">
                {t(`disasters.${disaster}.title`) || disaster}
              </h3>
              <span className="text-lg font-semibold text-gray-900">{riskScore}/100</span>
            </div>
            <div className="mb-2">
              {getRiskBar(riskScore)}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{t('disasterRisk.low') || 'Low'}</span>
              <span>{t('disasterRisk.high') || 'High'}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Risk Mitigation Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">
          {t('disasterRisk.mitigationTips') || 'Risk Mitigation Tips'}
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-blue-700 text-sm">
          <li>{t('disasterRisk.tip1') || 'Develop and practice emergency evacuation plans'}</li>
          <li>{t('disasterRisk.tip2') || 'Maintain emergency supply kits with essential items'}</li>
          <li>{t('disasterRisk.tip3') || 'Stay informed about local disaster risks and warnings'}</li>
          <li>{t('disasterRisk.tip4') || 'Invest in structural improvements to withstand disasters'}</li>
        </ul>
      </div>
    </div>
  );
};

export default DisasterRiskAssessment;