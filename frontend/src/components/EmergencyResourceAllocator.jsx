import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { calculateEmergencySupplies, calculateRequiredPersonnel, calculateEvacuationCapacity, allocateShelterCapacity } from '../utils/disasterResourceAllocator';

const EmergencyResourceAllocator = () => {
  const { t } = useTranslation();
  const [disasterType, setDisasterType] = useState('flood');
  const [affectedPopulation, setAffectedPopulation] = useState(10000);
  const [severityLevel, setSeverityLevel] = useState(3);
  const [affectedArea, setAffectedArea] = useState(50);
  const [supplies, setSupplies] = useState(null);
  const [personnel, setPersonnel] = useState(null);
  const [evacuation, setEvacuation] = useState(null);
  const [shelter, setShelter] = useState(null);

  // Sample data for demonstration
  const sampleVehicles = [
    { type: 'bus', count: 10 },
    { type: 'truck', count: 5 },
    { type: 'van', count: 8 }
  ];

  const sampleShelters = [
    { id: 1, name: t('resourceAllocator.shelter1'), capacity: 2000, facilities: ['elevated', 'waterproof', 'medicalFacility'] },
    { id: 2, name: t('resourceAllocator.shelter2'), capacity: 1500, facilities: ['structurallySound', 'openArea'] },
    { id: 3, name: t('resourceAllocator.shelter3'), capacity: 3000, facilities: ['stormProof', 'reinforced', 'medicalFacility'] }
  ];

  useEffect(() => {
    // Calculate all resources when inputs change
    const calculatedSupplies = calculateEmergencySupplies(disasterType, affectedPopulation, severityLevel);
    setSupplies(calculatedSupplies);

    const calculatedPersonnel = calculateRequiredPersonnel(disasterType, affectedArea, affectedPopulation);
    setPersonnel(calculatedPersonnel);

    const calculatedEvacuation = calculateEvacuationCapacity(sampleVehicles, 24); // 24 hours
    setEvacuation(calculatedEvacuation);

    const allocatedShelter = allocateShelterCapacity(disasterType, affectedPopulation, sampleShelters);
    setShelter(allocatedShelter);
  }, [disasterType, affectedPopulation, severityLevel, affectedArea]);

  const disasterTypes = [
    { value: 'flood', label: t('common.disasterTypes.flood') },
    { value: 'earthquake', label: t('common.disasterTypes.earthquake') },
    { value: 'cyclone', label: t('common.disasterTypes.cyclone') },
    { value: 'drought', label: t('common.disasterTypes.drought') },
    { value: 'landslide', label: t('common.disasterTypes.landslide') }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('resourceAllocator.title')}</h2>
      
      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('resourceAllocator.disasterType')}
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
            {t('resourceAllocator.affectedPopulation')} ({t('common.people')})
          </label>
          <input
            type="number"
            value={affectedPopulation}
            onChange={(e) => setAffectedPopulation(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            min="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('resourceAllocator.severityLevel')}
          </label>
          <select
            value={severityLevel}
            onChange={(e) => setSeverityLevel(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {[1, 2, 3, 4, 5].map(level => (
              <option key={level} value={level}>{level} - {t(`resourceAllocator.severity.${level}`)}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('resourceAllocator.affectedArea')} (km²)
          </label>
          <input
            type="number"
            value={affectedArea}
            onChange={(e) => setAffectedArea(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            min="0"
          />
        </div>
      </div>

      {/* Results Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergency Supplies */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('resourceAllocator.emergencySupplies')}</h3>
          {supplies && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-gray-600">{t('resourceAllocator.water')}</p>
                <p className="font-semibold">{supplies.water.toLocaleString()} {t('resourceAllocator.liters')}</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm text-gray-600">{t('resourceAllocator.food')}</p>
                <p className="font-semibold">{supplies.food.toLocaleString()} {t('resourceAllocator.meals')}</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded">
                <p className="text-sm text-gray-600">{t('resourceAllocator.medicalKits')}</p>
                <p className="font-semibold">{supplies.medicalKits.toLocaleString()}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">{t('resourceAllocator.blankets')}</p>
                <p className="font-semibold">{supplies.blankets.toLocaleString()}</p>
              </div>
              <div className="bg-red-50 p-3 rounded">
                <p className="text-sm text-gray-600">{t('resourceAllocator.hygieneKits')}</p>
                <p className="font-semibold">{supplies.hygieneKits.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>

        {/* Personnel Requirements */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('resourceAllocator.personnelRequirements')}</h3>
          {personnel && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-indigo-50 p-3 rounded text-center">
                <p className="text-sm text-gray-600">{t('resourceAllocator.rescueTeams')}</p>
                <p className="text-2xl font-bold text-indigo-700">{personnel.rescueTeams}</p>
              </div>
              <div className="bg-teal-50 p-3 rounded text-center">
                <p className="text-sm text-gray-600">{t('resourceAllocator.medicalTeams')}</p>
                <p className="text-2xl font-bold text-teal-700">{personnel.medicalTeams}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded text-center">
                <p className="text-sm text-gray-600">{t('resourceAllocator.logisticsTeams')}</p>
                <p className="text-2xl font-bold text-orange-700">{personnel.logisticsTeams}</p>
              </div>
              <div className="col-span-3 bg-gray-50 p-3 rounded mt-2">
                <p className="text-sm text-gray-600">{t('resourceAllocator.totalTeams')}</p>
                <p className="text-xl font-bold">{personnel.totalTeams}</p>
              </div>
            </div>
          )}
        </div>

        {/* Evacuation Capacity */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('resourceAllocator.evacuationCapacity')}</h3>
          {evacuation && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm text-gray-600">{t('resourceAllocator.totalCapacity')}</p>
                  <p className="text-xl font-bold">{evacuation.totalCapacity.toLocaleString()} {t('common.people')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('resourceAllocator.totalVehicles')}</p>
                  <p className="text-xl font-bold">{evacuation.totalVehicles}</p>
                </div>
              </div>
              
              <h4 className="font-medium text-gray-700 mb-2">{t('resourceAllocator.vehicleBreakdown')}</h4>
              <div className="space-y-2">
                {Object.entries(evacuation.vehicleBreakdown).map(([type, details]) => (
                  <div key={type} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span className="capitalize">{type}</span>
                    <span>{details.count} × {details.capacity} × {details.trips} = {details.totalCapacity.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Shelter Allocation */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('resourceAllocator.shelterAllocation')}</h3>
          {shelter && (
            <div>
              <div className="mb-3">
                <div className="flex justify-between">
                  <span>{t('resourceAllocator.totalSheltered')}</span>
                  <span className="font-semibold">{shelter.totalSheltered.toLocaleString()} ({shelter.utilizationRate}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${shelter.utilizationRate}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-red-600">
                  <span>{t('resourceAllocator.unshelteredPopulation')}</span>
                  <span className="font-semibold">{shelter.unshelteredPopulation.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-red-600 h-2 rounded-full" 
                    style={{ width: `${(shelter.unshelteredPopulation / (shelter.totalSheltered + shelter.unshelteredPopulation)) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <h4 className="font-medium text-gray-700 mb-2">{t('resourceAllocator.allocationDetails')}</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {shelter.allocation.map(allocation => (
                  <div key={allocation.shelterId} className="bg-gray-50 p-2 rounded">
                    <div className="flex justify-between">
                      <span className="font-medium">{allocation.shelterName}</span>
                      <span>{allocation.allocatedPopulation.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {t('resourceAllocator.remainingCapacity')}: {allocation.remainingCapacity.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        <p>{t('resourceAllocator.note')}</p>
      </div>
    </div>
  );
};

export default EmergencyResourceAllocator;