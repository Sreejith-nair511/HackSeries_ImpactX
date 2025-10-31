import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  generateRecoveryTimeline, 
  calculateRecoveryResources, 
  identifyRecoveryStakeholders,
  generateRecoveryActionPlan,
  assessRecoveryProgress
} from '../utils/disasterRecoveryPlanner';

const DisasterRecoveryPlanner = () => {
  const { t, i18n } = useTranslation();
  
  const [plannerData, setPlannerData] = useState({
    disasterType: '',
    severity: 3,
    affectedPopulation: '',
    region: ''
  });
  
  const [recoveryPlan, setRecoveryPlan] = useState(null);
  const [activeTab, setActiveTab] = useState('timeline');
  const [progressData, setProgressData] = useState({
    immediate: { completed: 0, total: 5 },
    shortTerm: { completed: 0, total: 5 },
    mediumTerm: { completed: 0, total: 5 },
    longTerm: { completed: 0, total: 5 }
  });

  // Disaster types for the dropdown
  const disasterTypes = [
    { value: 'flood', label: t('disasterTypes.flood') },
    { value: 'earthquake', label: t('disasterTypes.earthquake') },
    { value: 'cyclone', label: t('disasterTypes.cyclone') },
    { value: 'drought', label: t('disasterTypes.drought') },
    { value: 'landslide', label: t('disasterTypes.landslide') }
  ];

  // Indian states for the dropdown
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlannerData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle severity change
  const handleSeverityChange = (level) => {
    setPlannerData(prev => ({
      ...prev,
      severity: level
    }));
  };

  // Generate recovery plan
  const generatePlan = () => {
    if (!plannerData.disasterType || !plannerData.region || !plannerData.affectedPopulation) {
      alert(t('recoveryPlanner.fillAllFields'));
      return;
    }

    const affectedPopulation = parseInt(plannerData.affectedPopulation);
    
    const timeline = generateRecoveryTimeline(
      plannerData.disasterType, 
      plannerData.severity, 
      plannerData.region
    );
    
    const resources = calculateRecoveryResources(
      plannerData.disasterType, 
      affectedPopulation, 
      plannerData.severity
    );
    
    const stakeholders = identifyRecoveryStakeholders(
      plannerData.disasterType, 
      plannerData.region
    );
    
    const actionPlan = generateRecoveryActionPlan(
      plannerData.disasterType, 
      plannerData.severity, 
      affectedPopulation
    );
    
    setRecoveryPlan({
      timeline,
      resources,
      stakeholders,
      actionPlan
    });
  };

  // Update task progress
  const updateTaskProgress = (phase, completed) => {
    setProgressData(prev => ({
      ...prev,
      [phase]: {
        ...prev[phase],
        completed
      }
    }));
  };

  // Get progress assessment
  const progressAssessment = assessRecoveryProgress(progressData);

  // Format number for Indian numbering system
  const formatIndianNumber = (num) => {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(2) + ' Cr';
    } else if (num >= 100000) {
      return (num / 100000).toFixed(2) + ' Lakh';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + ' K';
    }
    return num.toString();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('recoveryPlanner.title')}</h2>
      <p className="text-gray-600 mb-6">{t('recoveryPlanner.description')}</p>
      
      {/* Input Form */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Disaster Type */}
          <div>
            <label htmlFor="disasterType" className="block text-sm font-medium text-gray-700 mb-1">
              {t('recoveryPlanner.disasterType')}
            </label>
            <select
              id="disasterType"
              name="disasterType"
              value={plannerData.disasterType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t('recoveryPlanner.selectDisaster')}</option>
              {disasterTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Region */}
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
              {t('recoveryPlanner.region')}
            </label>
            <select
              id="region"
              name="region"
              value={plannerData.region}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t('recoveryPlanner.selectRegion')}</option>
              {indianStates.map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          
          {/* Affected Population */}
          <div>
            <label htmlFor="affectedPopulation" className="block text-sm font-medium text-gray-700 mb-1">
              {t('recoveryPlanner.affectedPopulation')}
            </label>
            <input
              type="number"
              id="affectedPopulation"
              name="affectedPopulation"
              value={plannerData.affectedPopulation}
              onChange={handleInputChange}
              placeholder={t('recoveryPlanner.populationPlaceholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Severity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('recoveryPlanner.severity')}
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleSeverityChange(level)}
                  className={`flex-1 py-2 rounded text-sm transition-colors ${
                    plannerData.severity === level
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
          </div>
        </div>
        
        <button
          onClick={generatePlan}
          className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {t('recoveryPlanner.generatePlan')}
        </button>
      </div>
      
      {/* Progress Overview */}
      {recoveryPlan && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('recoveryPlanner.progressOverview')}</h3>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{t('recoveryPlanner.overallProgress')}</span>
              <span className="text-sm font-bold text-blue-700">{progressAssessment.metrics.overall}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${progressAssessment.metrics.overall}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {t('recoveryPlanner.status')}: <span className="font-medium">{progressAssessment.status}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Recovery Plan Tabs */}
      {recoveryPlan && (
        <div>
          <div className="border-b border-gray-200 mb-4">
            <nav className="flex space-x-8">
              {['timeline', 'resources', 'stakeholders', 'actionPlan'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {t(`recoveryPlanner.tabs.${tab}`)}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="bg-gray-50 rounded-lg p-4">
            {activeTab === 'timeline' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('recoveryPlanner.timeline.title')}</h3>
                <div className="space-y-4">
                  {Object.entries(recoveryPlan.timeline).map(([phase, details]) => (
                    <div key={phase} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">{t(`recoveryPlanner.timeline.phases.${phase}`)}</h4>
                          <p className="text-sm text-gray-600 mt-1">{details.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">{details.duration}</div>
                          <div className="text-sm text-gray-500">{details.unit}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'resources' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('recoveryPlanner.resources.title')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Personnel */}
                  <div className="bg-white rounded-lg p-4 shadow">
                    <h4 className="font-medium text-gray-800 mb-3">{t('recoveryPlanner.resources.personnel')}</h4>
                    <ul className="space-y-2">
                      {Object.entries(recoveryPlan.resources.personnel).map(([role, count]) => (
                        <li key={role} className="flex justify-between text-sm">
                          <span className="text-gray-600">{t(`recoveryPlanner.resources.roles.${role}`)}</span>
                          <span className="font-medium">{count}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Supplies */}
                  <div className="bg-white rounded-lg p-4 shadow">
                    <h4 className="font-medium text-gray-800 mb-3">{t('recoveryPlanner.resources.supplies')}</h4>
                    <ul className="space-y-2">
                      {Object.entries(recoveryPlan.resources.supplies).map(([item, quantity]) => (
                        <li key={item} className="flex justify-between text-sm">
                          <span className="text-gray-600">{t(`recoveryPlanner.resources.items.${item}`)}</span>
                          <span className="font-medium">
                            {item === 'water' ? `${formatIndianNumber(quantity)} L` : 
                             item === 'food' ? `${formatIndianNumber(quantity)} meals` : 
                             formatIndianNumber(quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Financial */}
                  <div className="bg-white rounded-lg p-4 shadow">
                    <h4 className="font-medium text-gray-800 mb-3">{t('recoveryPlanner.resources.financial')}</h4>
                    <ul className="space-y-2">
                      {Object.entries(recoveryPlan.resources.financial).map(([phase, amount]) => (
                        <li key={phase} className="flex justify-between text-sm">
                          <span className="text-gray-600">{t(`recoveryPlanner.timeline.phases.${phase}`)}</span>
                          <span className="font-medium">₹{formatIndianNumber(amount)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'stakeholders' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('recoveryPlanner.stakeholders.title')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recoveryPlan.stakeholders.map((stakeholder, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-800">{stakeholder.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          stakeholder.priority === 'high' ? 'bg-red-100 text-red-800' :
                          stakeholder.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {t(`recoveryPlanner.priority.${stakeholder.priority}`)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{stakeholder.role}</p>
                      <p className="text-sm text-blue-600 mt-1">{stakeholder.contact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'actionPlan' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('recoveryPlanner.actionPlan.title')}</h3>
                <div className="space-y-6">
                  {Object.entries(recoveryPlan.actionPlan).map(([phase, details]) => (
                    <div key={phase} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-800">{t(`recoveryPlanner.timeline.phases.${phase}`)}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{t('recoveryPlanner.completedTasks')}</span>
                          <input
                            type="number"
                            min="0"
                            max={details.tasks.length}
                            value={progressData[phase].completed}
                            onChange={(e) => updateTaskProgress(phase, parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-600">/ {details.tasks.length}</span>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {details.tasks.map((task, index) => (
                          <li key={index} className="flex items-start">
                            <input
                              type="checkbox"
                              className="mt-1 mr-2 h-4 w-4 text-blue-600 rounded"
                            />
                            <span className="text-sm text-gray-700">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DisasterRecoveryPlanner;