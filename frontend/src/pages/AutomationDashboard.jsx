import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AutomationDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [recentTransactions, setRecentTransactions] = useState([]);

  // Mock data for oracles
  const oracles = [
    {
      id: 1,
      name: 'Satellite Imagery Oracle',
      type: 'Satellite',
      status: 'Active',
      lastUpdate: '2 minutes ago',
      accuracy: 95
    },
    {
      id: 2,
      name: 'IoT Sensor Network',
      type: 'IoT',
      status: 'Active',
      lastUpdate: '5 minutes ago',
      accuracy: 88
    },
    {
      id: 3,
      name: 'Drone Surveillance',
      type: 'Drone',
      status: 'Active',
      lastUpdate: '10 minutes ago',
      accuracy: 92
    },
    {
      id: 4,
      name: 'Community Reports',
      type: 'Human',
      status: 'Active',
      lastUpdate: '15 minutes ago',
      accuracy: 85
    }
  ];

  // Mock data for smart contracts
  const smartContracts = [
    {
      id: 'SC001',
      name: 'Flood Relief Fund',
      status: 'Active',
      balance: 5000000,
      deployed: '2023-01-15',
      triggers: 12
    },
    {
      id: 'SC002',
      name: 'Emergency Shelter Construction',
      status: 'Active',
      balance: 2500000,
      deployed: '2023-02-20',
      triggers: 8
    },
    {
      id: 'SC003',
      name: 'Medical Aid Distribution',
      status: 'Paused',
      balance: 1800000,
      deployed: '2023-03-10',
      triggers: 5
    }
  ];

  // Mock data for automated triggers
  const automatedTriggers = [
    {
      id: 1,
      name: 'Rainfall Threshold Alert',
      condition: 'Rainfall > 100mm in 24h',
      action: 'Release 10% of flood fund',
      status: 'Active',
      lastTriggered: '2023-06-15'
    },
    {
      id: 2,
      name: 'Satellite Damage Detection',
      condition: 'Building damage > 30% in area',
      action: 'Deploy emergency shelter team',
      status: 'Active',
      lastTriggered: '2023-05-22'
    },
    {
      id: 3,
      name: 'IoT Water Level Monitor',
      condition: 'Water level > 5m above normal',
      action: 'Send evacuation alert',
      status: 'Active',
      lastTriggered: '2023-06-01'
    }
  ];

  // Generate mock recent transactions
  useEffect(() => {
    const mockTransactions = [
      {
        id: 'TXN1001',
        contract: 'Flood Relief Fund',
        amount: 50000,
        status: 'Completed',
        timestamp: '2023-06-20 14:30:22',
        trigger: 'Rainfall Threshold Alert'
      },
      {
        id: 'TXN1002',
        contract: 'Emergency Shelter Construction',
        amount: 125000,
        status: 'Pending',
        timestamp: '2023-06-20 13:45:17',
        trigger: 'Satellite Damage Detection'
      },
      {
        id: 'TXN1003',
        contract: 'Medical Aid Distribution',
        amount: 75000,
        status: 'Completed',
        timestamp: '2023-06-20 12:15:44',
        trigger: 'IoT Water Level Monitor'
      },
      {
        id: 'TXN1004',
        contract: 'Flood Relief Fund',
        amount: 200000,
        status: 'Processing',
        timestamp: '2023-06-20 11:30:05',
        trigger: 'Rainfall Threshold Alert'
      }
    ];
    setRecentTransactions(mockTransactions);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('automationDashboard.title')}</h1>
          <p className="mt-2 text-gray-600">{t('automationDashboard.description')}</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('automationDashboard.overview')}
            </button>
            <button
              onClick={() => setActiveTab('oracles')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'oracles'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('automationDashboard.oracles')}
            </button>
            <button
              onClick={() => setActiveTab('contracts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'contracts'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('automationDashboard.contracts')}
            </button>
            <button
              onClick={() => setActiveTab('triggers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'triggers'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('automationDashboard.triggers')}
            </button>
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* System Status */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('automationDashboard.systemStatus')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">{t('automationDashboard.activeOracles')}</h3>
                      <p className="text-2xl font-semibold text-gray-900">4/4</p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">{t('automationDashboard.activeContracts')}</h3>
                      <p className="text-2xl font-semibold text-gray-900">2/3</p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">{t('automationDashboard.activeTriggers')}</h3>
                      <p className="text-2xl font-semibold text-gray-900">3/3</p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">{t('automationDashboard.uptime')}</h3>
                      <p className="text-2xl font-semibold text-gray-900">99.8%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('automationDashboard.recentActivity')}</h2>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Rainfall threshold alert triggered</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Satellite oracle updated damage assessment</p>
                    <p className="text-xs text-gray-500">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">IoT sensor network maintenance scheduled</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Flood relief fund released</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="lg:col-span-3 bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{t('automationDashboard.recentTransactions')}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('automationDashboard.transactionId')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('automationDashboard.contract')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('automationDashboard.amount')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('automationDashboard.timestamp')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('automationDashboard.trigger')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('automationDashboard.status')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transaction.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.contract}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{transaction.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.trigger}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : transaction.status === 'Pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-blue-100 text-blue-800'
                          }`}>
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Oracles Tab */}
        {activeTab === 'oracles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {oracles.map((oracle) => (
              <div key={oracle.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{oracle.name}</h3>
                    <p className="text-sm text-gray-500">{oracle.type} {t('automationDashboard.oracle')}</p>
                  </div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    oracle.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {oracle.status}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('automationDashboard.lastUpdate')}:</span>
                    <span className="text-sm">{oracle.lastUpdate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('automationDashboard.accuracy')}:</span>
                    <span className="text-sm font-medium">{oracle.accuracy}%</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{t('automationDashboard.dataQuality')}</span>
                    <span className="text-sm font-medium text-gray-700">{oracle.accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${oracle.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contracts Tab */}
        {activeTab === 'contracts' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{t('automationDashboard.smartContracts')}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('automationDashboard.contractId')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('automationDashboard.name')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('automationDashboard.balance')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('automationDashboard.deployed')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('automationDashboard.triggers')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('automationDashboard.status')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {smartContracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {contract.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contract.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{contract.balance.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contract.deployed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contract.triggers}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          contract.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : contract.status === 'Paused' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {contract.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Triggers Tab */}
        {activeTab === 'triggers' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {automatedTriggers.map((trigger) => (
              <div key={trigger.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{trigger.name}</h3>
                  </div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    trigger.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {trigger.status}
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t('automationDashboard.condition')}</p>
                    <p className="text-sm text-gray-600">{trigger.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t('automationDashboard.action')}</p>
                    <p className="text-sm text-gray-600">{trigger.action}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t('automationDashboard.lastTriggered')}</p>
                    <p className="text-sm text-gray-600">{trigger.lastTriggered}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    {t('automationDashboard.testTrigger')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutomationDashboard;