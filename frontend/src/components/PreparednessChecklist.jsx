import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getPreparednessChecklist,
  getPriorityColor,
  getPriorityLabel
} from '../utils/preparednessChecklist';

const PreparednessChecklist = () => {
  const { t, i18n } = useTranslation();
  const [selectedDisaster, setSelectedDisaster] = useState('flood');
  const [checklist, setChecklist] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  // Disaster types for the selector
  const disasterTypes = [
    { id: 'flood', name: t('disasters.floods.title') || 'Floods' },
    { id: 'earthquake', name: t('disasters.earthquakes.title') || 'Earthquakes' },
    { id: 'cyclone', name: t('disasters.cyclones.title') || 'Cyclones' },
    { id: 'drought', name: t('disasters.droughts.title') || 'Droughts' },
    { id: 'landslide', name: t('disasters.landslides.title') || 'Landslides' }
  ];

  useEffect(() => {
    // Load checklist when disaster type or language changes
    const items = getPreparednessChecklist(selectedDisaster, i18n.language);
    setChecklist(items);
    setCompletedCount(items.filter(item => item.completed).length);
  }, [selectedDisaster, i18n.language]);

  const toggleItemCompletion = (itemId) => {
    setChecklist(prevChecklist => {
      const updatedChecklist = prevChecklist.map(item => {
        if (item.id === itemId) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });
      
      setCompletedCount(updatedChecklist.filter(item => item.completed).length);
      return updatedChecklist;
    });
  };

  const resetChecklist = () => {
    setChecklist(prevChecklist => 
      prevChecklist.map(item => ({ ...item, completed: false }))
    );
    setCompletedCount(0);
  };

  const completeAll = () => {
    setChecklist(prevChecklist => 
      prevChecklist.map(item => ({ ...item, completed: true }))
    );
    setCompletedCount(checklist.length);
  };

  const progressPercentage = checklist.length > 0 
    ? Math.round((completedCount / checklist.length) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          {t('preparednessChecklist.title') || 'Preparedness Checklist'}
        </h2>
        
        {/* Disaster Type Selector */}
        <div className="flex flex-wrap gap-2">
          <select
            value={selectedDisaster}
            onChange={(e) => setSelectedDisaster(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label={t('preparednessChecklist.selectDisaster') || 'Select Disaster Type'}
          >
            {disasterTypes.map((disaster) => (
              <option key={disaster.id} value={disaster.id}>
                {disaster.name}
              </option>
            ))}
          </select>
          
          <div className="flex gap-2">
            <button
              onClick={resetChecklist}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              {t('preparednessChecklist.reset') || 'Reset'}
            </button>
            <button
              onClick={completeAll}
              className="px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm"
            >
              {t('preparednessChecklist.completeAll') || 'Complete All'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {t('preparednessChecklist.progress') || 'Progress'}: {completedCount}/{checklist.length}
          </span>
          <span className="text-sm font-medium text-gray-700">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Checklist Items */}
      <div className="space-y-4">
        {checklist.map((item) => (
          <div 
            key={item.id} 
            className={`border rounded-lg p-4 transition-all duration-200 ${
              item.completed 
                ? 'bg-green-50 border-green-200' 
                : 'bg-white border-gray-200 hover:shadow-md'
            }`}
          >
            <div className="flex items-start">
              <button
                onClick={() => toggleItemCompletion(item.id)}
                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 mt-1 ${
                  item.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300 hover:border-green-500'
                }`}
                aria-label={item.completed 
                  ? t('preparednessChecklist.markIncomplete') || 'Mark as incomplete' 
                  : t('preparednessChecklist.markComplete') || 'Mark as complete'
                }
              >
                {item.completed && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </button>
              
              <div className="flex-1">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <h3 className={`font-medium ${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {item.title}
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                    {getPriorityLabel(item.priority, i18n.language)}
                  </span>
                </div>
                <p className={`mt-1 text-sm ${item.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Completion Message */}
      {completedCount === checklist.length && checklist.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="font-semibold text-green-800">
              {t('preparednessChecklist.completed') || 'Checklist Completed!'}
            </h3>
          </div>
          <p className="mt-1 text-green-700 text-sm">
            {t('preparednessChecklist.completedMessage') || 'Great job! You\'ve completed all the preparedness steps for this disaster type.'}
          </p>
        </div>
      )}
      
      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">
          {t('preparednessChecklist.tips') || 'Preparedness Tips'}
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-blue-700 text-sm">
          <li>{t('preparednessChecklist.tip1') || 'Review and update your checklist regularly'}</li>
          <li>{t('preparednessChecklist.tip2') || 'Involve all family members in the preparation process'}</li>
          <li>{t('preparednessChecklist.tip3') || 'Practice your emergency plans regularly'}</li>
          <li>{t('preparednessChecklist.tip4') || 'Keep important documents in a waterproof container'}</li>
        </ul>
      </div>
    </div>
  );
};

export default PreparednessChecklist;