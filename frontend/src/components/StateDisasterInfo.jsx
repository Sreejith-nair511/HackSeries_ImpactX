import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const StateDisasterInfo = () => {
  const { t, i18n } = useTranslation();
  const [selectedState, setSelectedState] = useState('maharashtra');

  // Disaster data for Indian states
  const disasterData = {
    maharashtra: {
      floods: {
        frequency: t('disasters.floods.frequency.high'),
        affectedPopulation: '50,000',
        lastIncident: '2023-07-26',
        preparednessLevel: 'Medium'
      },
      cyclones: {
        frequency: t('disasters.cyclones.frequency.low'),
        affectedPopulation: '5,000',
        lastIncident: '2022-05-15',
        preparednessLevel: 'High'
      },
      earthquakes: {
        frequency: t('disasters.earthquakes.frequency.moderate'),
        affectedPopulation: '15,000',
        lastIncident: '2020-11-30',
        preparednessLevel: 'Medium'
      }
    },
    odisha: {
      floods: {
        frequency: t('disasters.floods.frequency.high'),
        affectedPopulation: '80,000',
        lastIncident: '2023-08-10',
        preparednessLevel: 'High'
      },
      cyclones: {
        frequency: t('disasters.cyclones.frequency.high'),
        affectedPopulation: '150,000',
        lastIncident: '2023-05-29',
        preparednessLevel: 'High'
      },
      droughts: {
        frequency: t('disasters.droughts.frequency.moderate'),
        affectedPopulation: '200,000',
        lastIncident: '2022-04-18',
        preparednessLevel: 'Low'
      }
    },
    kerala: {
      floods: {
        frequency: t('disasters.floods.frequency.high'),
        affectedPopulation: '120,000',
        lastIncident: '2023-08-05',
        preparednessLevel: 'Medium'
      },
      landslides: {
        frequency: t('disasters.landslides.frequency.moderate'),
        affectedPopulation: '25,000',
        lastIncident: '2023-07-28',
        preparednessLevel: 'Medium'
      },
      droughts: {
        frequency: t('disasters.droughts.frequency.low'),
        affectedPopulation: '30,000',
        lastIncident: '2021-03-22',
        preparednessLevel: 'Medium'
      }
    }
  };

  const states = [
    { id: 'maharashtra', name: t('states.maharashtra') },
    { id: 'odisha', name: t('states.odisha') },
    { id: 'kerala', name: t('states.kerala') }
  ];

  const disasters = Object.keys(disasterData[selectedState] || {});

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{t('disasters.stateInfo.title')}</h2>
      
      {/* State Selector */}
      <div className="mb-6">
        <label htmlFor="state-select" className="block text-sm font-medium text-gray-700 mb-2">
          {t('disasters.stateInfo.selectState')}
        </label>
        <select
          id="state-select"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-label={t('disasters.stateInfo.selectState')}
        >
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* Disaster Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {disasters.map((disaster) => (
          <div key={disaster} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 capitalize mb-2">
              {t(`disasters.${disaster}.title`)}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('disasters.info.frequency')}:</span>
                <span className="font-medium">{disasterData[selectedState][disaster].frequency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('disasters.info.affectedPopulation')}:</span>
                <span className="font-medium">{disasterData[selectedState][disaster].affectedPopulation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('disasters.info.lastIncident')}:</span>
                <span className="font-medium">{disasterData[selectedState][disaster].lastIncident}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('disasters.info.preparednessLevel')}:</span>
                <span className={`font-medium ${
                  disasterData[selectedState][disaster].preparednessLevel === 'High' ? 'text-green-600' :
                  disasterData[selectedState][disaster].preparednessLevel === 'Medium' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {disasterData[selectedState][disaster].preparednessLevel}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preparedness Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {t('disasters.preparednessTips.title')}
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>{t('disasters.preparednessTips.tip1')}</li>
          <li>{t('disasters.preparednessTips.tip2')}</li>
          <li>{t('disasters.preparednessTips.tip3')}</li>
          <li>{t('disasters.preparednessTips.tip4')}</li>
        </ul>
      </div>
    </div>
  );
};

export default StateDisasterInfo;