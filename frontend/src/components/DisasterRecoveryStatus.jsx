import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  getRecoveryStatus, 
  getRecoveryTasks, 
  getRecoveryFunding, 
  getCommunityIndicators,
  getRecoveryTimeline
} from '../utils/disasterRecoveryStatus';

const DisasterRecoveryStatus = () => {
  const { t } = useTranslation();
  const [selectedRegion, setSelectedRegion] = useState('Kerala');
  const [recoveryStatus, setRecoveryStatus] = useState({});
  const [recoveryTasks, setRecoveryTasks] = useState([]);
  const [recoveryFunding, setRecoveryFunding] = useState({});
  const [communityIndicators, setCommunityIndicators] = useState({});
  const [recoveryTimeline, setRecoveryTimeline] = useState([]);

  useEffect(() => {
    loadRecoveryData();
  }, [selectedRegion]);

  const loadRecoveryData = () => {
    setRecoveryStatus(getRecoveryStatus(selectedRegion));
    setRecoveryTasks(getRecoveryTasks(selectedRegion));
    setRecoveryFunding(getRecoveryFunding(selectedRegion));
    setCommunityIndicators(getCommunityIndicators(selectedRegion));
    setRecoveryTimeline(getRecoveryTimeline(selectedRegion));
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'not-started': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const getPhaseStatus = (phase) => {
    if (phase.completed) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {t('disasterRecoveryStatus.completed')}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {phase.progress}% {t('disasterRecoveryStatus.complete')}
        </span>
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('disasterRecoveryStatus.title')}</h1>
      
      {/* Region Selector */}
      <div className="mb-8">
        <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
          {t('disasterRecoveryStatus.selectRegion')}
        </label>
        <select
          id="region"
          value={selectedRegion}
          onChange={handleRegionChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="Kerala">Kerala</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Odisha">Odisha</option>
        </select>
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('disasterRecoveryStatus.overallProgress')}</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="bg-blue-600 h-4 rounded-full" 
            style={{ width: `${recoveryStatus.overallProgress}%` }}
          ></div>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-700">{t('disasterRecoveryStatus.progress')}</span>
          <span className="text-sm font-medium text-gray-700">{recoveryStatus.overallProgress}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recovery Phases */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('disasterRecoveryStatus.recoveryPhases')}</h2>
          <div className="space-y-4">
            {recoveryStatus.phases && Object.entries(recoveryStatus.phases).map(([phaseKey, phase]) => (
              <div key={phaseKey} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">{t(`disasterRecoveryStatus.phases.${phaseKey}`)}</h3>
                  {getPhaseStatus(phase)}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${phase.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('disasterRecoveryStatus.keyMetrics')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recoveryStatus.keyMetrics && Object.entries(recoveryStatus.keyMetrics).map(([metricKey, value]) => (
              <div key={metricKey} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">{t(`disasterRecoveryStatus.metrics.${metricKey}`)}</h3>
                <p className="text-2xl font-bold text-gray-900">{value}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recovery Tasks */}
      <div className="bg-white rounded-lg shadow p-6 my-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('disasterRecoveryStatus.recoveryTasks')}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('disasterRecoveryStatus.task')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('disasterRecoveryStatus.priority')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('disasterRecoveryStatus.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('disasterRecoveryStatus.progress')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('disasterRecoveryStatus.assignedTo')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recoveryTasks.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    <div className="text-sm text-gray-500">{task.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                      {t(`disasterRecoveryStatus.priorityLevels.${task.priority}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{t(`disasterRecoveryStatus.statuses.${task.status}`)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`${getStatusColor(task.status)} h-2 rounded-full`} 
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{task.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.assignedTo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Funding Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('disasterRecoveryStatus.funding')}</h2>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{t('disasterRecoveryStatus.totalAllocated')}</span>
              <span className="text-sm font-medium text-gray-700">₹{recoveryFunding.totalAllocated?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{t('disasterRecoveryStatus.totalDisbursed')}</span>
              <span className="text-sm font-medium text-gray-700">₹{recoveryFunding.totalDisbursed?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{t('disasterRecoveryStatus.totalUtilized')}</span>
              <span className="text-sm font-medium text-gray-700">₹{recoveryFunding.totalUtilized?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">{t('disasterRecoveryStatus.remaining')}</span>
              <span className="text-sm font-medium text-gray-700">₹{recoveryFunding.remaining?.toLocaleString()}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-medium text-gray-800 mb-3">{t('disasterRecoveryStatus.fundingSources')}</h3>
          <div className="space-y-3">
            {recoveryFunding.fundingSources?.map((source, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{source.source}</span>
                  <span className="text-sm font-medium text-gray-700">{source.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-500 mt-1">
                  ₹{source.amount?.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Indicators */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('disasterRecoveryStatus.communityIndicators')}</h2>
          <div className="space-y-4">
            {communityIndicators && Object.entries(communityIndicators).map(([indicatorKey, value]) => (
              indicatorKey !== 'lastUpdated' && (
                <div key={indicatorKey}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{t(`disasterRecoveryStatus.indicators.${indicatorKey}`)}</span>
                    <span className="text-sm font-medium text-gray-700">{value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Recovery Timeline */}
      <div className="bg-white rounded-lg shadow p-6 my-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('disasterRecoveryStatus.timeline')}</h2>
        <div className="flow-root">
          <ul className="relative border-l border-gray-200 ml-3">
            {recoveryTimeline.map((event, index) => (
              <li key={index} className="mb-10 ml-6">
                <div className={`absolute w-3 h-3 rounded-full -left-1.5 border border-white ${event.milestone ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <time className="block mb-1 text-sm font-normal leading-none text-gray-400">
                  {new Date(event.date).toLocaleDateString()}
                </time>
                <h3 className={`text-lg font-semibold ${event.milestone ? 'text-blue-600' : 'text-gray-900'}`}>
                  {event.event}
                </h3>
                <p className="mb-4 text-base font-normal text-gray-500">
                  {event.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DisasterRecoveryStatus;