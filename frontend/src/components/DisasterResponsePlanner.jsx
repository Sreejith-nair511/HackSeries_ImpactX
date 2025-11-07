import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { generateResponsePlan } from '../utils/disasterResponsePlanner';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DisasterResponsePlanner = () => {
  const { t } = useTranslation();
  const [disasterType, setDisasterType] = useState('flood');
  const [severity, setSeverity] = useState(3);
  const [region, setRegion] = useState('kerala');
  const [responsePlan, setResponsePlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customScenario, setCustomScenario] = useState(false);
  const [customFactors, setCustomFactors] = useState({
    affectedArea: 1000,
    affectedPopulation: 500000
  });
  const [savedPlans, setSavedPlans] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonPlans, setComparisonPlans] = useState([]);

  // Refs for export functionality
  const planRef = useRef();

  useEffect(() => {
    if ((disasterType && region) || customScenario) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const factors = customScenario ? {
          severity: parseInt(severity),
          affectedArea: parseInt(customFactors.affectedArea),
          affectedPopulation: parseInt(customFactors.affectedPopulation),
          region: region
        } : {
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
  }, [disasterType, severity, region, customScenario, customFactors]);

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

  // Export plan as JSON
  const exportAsJSON = () => {
    if (!responsePlan) return;
    
    const dataStr = JSON.stringify(responsePlan, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `disaster-response-plan-${disasterType}-${region}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Export plan as CSV
  const exportAsCSV = () => {
    if (!responsePlan) return;
    
    let csvContent = "Disaster Response Plan\n";
    csvContent += `Disaster Type,${t(`common.disasterTypes.${disasterType}`)}\n`;
    csvContent += `Region,${t(`states.${region}`)}\n`;
    csvContent += `Severity,${severity}\n\n`;
    
    csvContent += "Resource Allocation\n";
    csvContent += "Resource,Quantity\n";
    
    Object.entries(responsePlan.resourceAllocation).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          csvContent += `${key}.${subKey},${subValue}\n`;
        });
      } else {
        csvContent += `${key.replace(/([A-Z])/g, ' $1').trim()},${value}\n`;
      }
    });
    
    csvContent += "\nImmediate Actions\n";
    responsePlan.immediateActions.forEach((action, index) => {
      csvContent += `${index + 1},"${action}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `disaster-response-plan-${disasterType}-${region}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save current plan
  const saveCurrentPlan = () => {
    if (!responsePlan) return;
    
    const planToSave = {
      id: Date.now(),
      disasterType,
      region,
      severity,
      plan: responsePlan,
      timestamp: new Date().toISOString()
    };
    
    setSavedPlans(prev => [...prev, planToSave]);
  };

  // Compare with saved plans
  const compareWithSavedPlans = () => {
    if (savedPlans.length === 0) {
      alert(t('responsePlanner.noSavedPlans'));
      return;
    }
    
    setComparisonPlans([responsePlan, ...savedPlans.slice(0, 2).map(p => p.plan)]);
    setShowComparison(true);
  };

  // Prepare data for resource charts
  const getResourceChartData = () => {
    if (!responsePlan) return [];
    
    const data = [];
    
    Object.entries(responsePlan.resourceAllocation).forEach(([key, value]) => {
      if (typeof value === 'number') {
        data.push({
          name: key.replace(/([A-Z])/g, ' $1').trim(),
          value: value
        });
      } else if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          data.push({
            name: `${key.replace(/([A-Z])/g, ' $1').trim()} - ${subKey}`,
            value: subValue
          });
        });
      }
    });
    
    return data;
  };

  // Prepare data for team allocation chart
  const getTeamChartData = () => {
    if (!responsePlan) return [];
    
    const teamData = Object.entries(responsePlan.resourceAllocation)
      .filter(([key]) => key.includes('Teams'))
      .map(([key, value]) => ({
        name: key.replace(/([A-Z])/g, ' $1').trim(),
        value: value
      }));
    
    return teamData;
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{t('responsePlanner.title')}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setCustomScenario(!customScenario)}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
          >
            {customScenario ? t('responsePlanner.useStandard') : t('responsePlanner.customScenario')}
          </button>
          {responsePlan && (
            <>
              <button
                onClick={saveCurrentPlan}
                className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
              >
                {t('responsePlanner.savePlan')}
              </button>
              <button
                onClick={compareWithSavedPlans}
                className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
              >
                {t('responsePlanner.comparePlans')}
              </button>
              <div className="relative group">
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  {t('responsePlanner.export')}
                </button>
                <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-10">
                  <button
                    onClick={exportAsJSON}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {t('responsePlanner.exportJSON')}
                  </button>
                  <button
                    onClick={exportAsCSV}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {t('responsePlanner.exportCSV')}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
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
      
      {/* Custom Scenario Inputs */}
      {customScenario && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('responsePlanner.affectedArea')} (km²)
            </label>
            <input
              type="number"
              value={customFactors.affectedArea}
              onChange={(e) => setCustomFactors(prev => ({
                ...prev,
                affectedArea: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              min="1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('responsePlanner.affectedPopulation')}
            </label>
            <input
              type="number"
              value={customFactors.affectedPopulation}
              onChange={(e) => setCustomFactors(prev => ({
                ...prev,
                affectedPopulation: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              min="1"
            />
          </div>
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : responsePlan ? (
        <div className="space-y-6" ref={planRef}>
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
                <p className="font-semibold">{customScenario ? customFactors.affectedArea : (disasterType === 'flood' ? 1000 : 
                       disasterType === 'earthquake' ? 500 :
                       disasterType === 'cyclone' ? 2000 :
                       disasterType === 'drought' ? 5000 : 200)} km²</p>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
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
                
                <h4 className="font-medium text-gray-700 mb-2 mt-4">{t('responsePlanner.equipmentAndSupplies')}</h4>
                <div className="space-y-2">
                  {Object.entries(responsePlan.resourceAllocation)
                    .filter(([key]) => !key.includes('Teams') && typeof responsePlan.resourceAllocation[key] === 'number')
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-semibold">{formatNumber(value)}</span>
                      </div>
                    ))}
                </div>
                
                {/* Sub-items for complex resources */}
                {Object.entries(responsePlan.resourceAllocation)
                  .filter(([key, value]) => typeof value === 'object' && value !== null)
                  .map(([key, value]) => (
                    <div key={key}>
                      <h4 className="font-medium text-gray-700 mb-2 mt-4 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                      <div className="space-y-2">
                        {Object.entries(value).map(([subKey, subValue]) => (
                          <div key={subKey} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                            <span className="capitalize">{subKey}</span>
                            <span className="font-semibold">{formatNumber(subValue)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
              
              {/* Resource Allocation Charts */}
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64">
                  <h4 className="font-medium text-gray-700 mb-2">{t('responsePlanner.resourceDistribution')}</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getResourceChartData()}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {getResourceChartData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [formatNumber(value), t('responsePlanner.quantity')]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="h-64">
                  <h4 className="font-medium text-gray-700 mb-2">{t('responsePlanner.teamAllocation')}</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getTeamChartData()}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [value, t('responsePlanner.teams')]} />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" name={t('responsePlanner.numberOfTeams')} />
                    </BarChart>
                  </ResponsiveContainer>
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
      
      {/* Plan Comparison */}
      {showComparison && comparisonPlans.length > 0 && (
        <div className="mt-8 border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{t('responsePlanner.planComparison')}</h3>
            <button
              onClick={() => setShowComparison(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisonPlans.map((plan, index) => (
              <div key={index} className="border border-gray-200 rounded p-3">
                <h4 className="font-medium text-gray-800 mb-2">
                  {index === 0 ? t('responsePlanner.currentPlan') : `${t('responsePlanner.savedPlan')} ${index}`}
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('responsePlanner.totalResources')}:</span>
                    <span className="font-medium">
                      {Object.values(plan.resourceAllocation)
                        .reduce((total, value) => {
                          if (typeof value === 'number') {
                            return total + value;
                          } else if (typeof value === 'object') {
                            return total + Object.values(value).reduce((subTotal, subValue) => subTotal + subValue, 0);
                          }
                          return total;
                        }, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('responsePlanner.teams')}:</span>
                    <span className="font-medium">
                      {Object.entries(plan.resourceAllocation)
                        .filter(([key]) => key.includes('Teams'))
                        .reduce((total, [, value]) => total + value, 0)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DisasterResponsePlanner;