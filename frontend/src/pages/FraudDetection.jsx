import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FraudDetection = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Mock fraud detection data
  const fraudTransactions = [
    {
      id: 'TXN001',
      ngo: 'Global Relief Foundation',
      amount: 50000,
      date: '2023-06-15',
      status: 'Flagged',
      riskScore: 87,
      reason: 'Unusual spending pattern',
      flaggedBy: 'AI System'
    },
    {
      id: 'TXN002',
      ngo: 'Emergency Aid Network',
      amount: 125000,
      date: '2023-06-18',
      status: 'Verified',
      riskScore: 23,
      reason: 'Normal spending pattern',
      flaggedBy: 'None'
    },
    {
      id: 'TXN003',
      ngo: 'Community Support Org',
      amount: 75000,
      date: '2023-06-20',
      status: 'Under Review',
      riskScore: 65,
      reason: 'Geographic mismatch',
      flaggedBy: 'Manual Review'
    },
    {
      id: 'TXN004',
      ngo: 'Disaster Response Team',
      amount: 200000,
      date: '2023-06-22',
      status: 'Flagged',
      riskScore: 92,
      reason: 'Duplicate transaction pattern',
      flaggedBy: 'AI System'
    }
  ];

  const fraudMetrics = {
    totalTransactions: 1247,
    flaggedTransactions: 23,
    verifiedTransactions: 1189,
    underReview: 35,
    fraudRate: '1.8%'
  };

  const anomalyPatterns = [
    {
      pattern: 'Unusual Spending',
      count: 12,
      percentage: 52.2
    },
    {
      pattern: 'Geographic Mismatch',
      count: 5,
      percentage: 21.7
    },
    {
      pattern: 'Duplicate Transactions',
      count: 4,
      percentage: 17.4
    },
    {
      pattern: 'Timing Anomalies',
      count: 2,
      percentage: 8.7
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('fraudDetection.title')}</h1>
          <p className="mt-2 text-gray-600">{t('fraudDetection.description')}</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('fraudDetection.dashboard')}
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'transactions'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('fraudDetection.transactions')}
            </button>
            <button
              onClick={() => setActiveTab('patterns')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'patterns'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('fraudDetection.patterns')}
            </button>
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Fraud Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">{t('fraudDetection.totalTransactions')}</h3>
                    <p className="text-2xl font-semibold text-gray-900">{fraudMetrics.totalTransactions.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-red-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">{t('fraudDetection.flaggedTransactions')}</h3>
                    <p className="text-2xl font-semibold text-gray-900">{fraudMetrics.flaggedTransactions}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">{t('fraudDetection.verifiedTransactions')}</h3>
                    <p className="text-2xl font-semibold text-gray-900">{fraudMetrics.verifiedTransactions}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">{t('fraudDetection.underReview')}</h3>
                    <p className="text-2xl font-semibold text-gray-900">{fraudMetrics.underReview}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">{t('fraudDetection.fraudRate')}</h3>
                    <p className="text-2xl font-semibold text-gray-900">{fraudMetrics.fraudRate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fraud Detection Chart */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('fraudDetection.fraudTrend')}</h2>
              <div className="h-64 flex items-end space-x-2">
                {[12, 8, 15, 7, 20, 9, 18, 11, 14, 6, 16, 10].map((count, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="text-xs text-gray-600 mb-1">Jun {index + 1}</div>
                    <div 
                      className="w-full bg-red-500 rounded-t hover:bg-red-600 transition-colors"
                      style={{ height: `${(count / 20) * 100}%` }}
                    ></div>
                    <div className="text-xs mt-1">{count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Flagged Transactions */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{t('fraudDetection.recentFlagged')}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('fraudDetection.transactionId')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('fraudDetection.ngo')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('fraudDetection.amount')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('fraudDetection.date')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('fraudDetection.riskScore')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('fraudDetection.status')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {fraudTransactions.filter(txn => txn.status === 'Flagged').map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedTransaction(transaction)}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transaction.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.ngo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{transaction.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="mr-2 text-sm">{transaction.riskScore}%</span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-red-600 h-2 rounded-full" 
                                style={{ width: `${transaction.riskScore}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
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

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{t('fraudDetection.allTransactions')}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('fraudDetection.transactionId')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('fraudDetection.ngo')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('fraudDetection.amount')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('fraudDetection.date')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('fraudDetection.riskScore')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('fraudDetection.flaggedBy')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('fraudDetection.status')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fraudTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedTransaction(transaction)}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.ngo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{transaction.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="mr-2 text-sm">{transaction.riskScore}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                transaction.riskScore > 80 
                                  ? 'bg-red-600' 
                                  : transaction.riskScore > 60 
                                    ? 'bg-orange-600' 
                                    : transaction.riskScore > 40 
                                      ? 'bg-yellow-600' 
                                      : 'bg-green-600'
                              }`} 
                              style={{ width: `${transaction.riskScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.flaggedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === 'Flagged' 
                            ? 'bg-red-100 text-red-800' 
                            : transaction.status === 'Verified' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
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
        )}

        {/* Patterns Tab */}
        {activeTab === 'patterns' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('fraudDetection.anomalyPatterns')}</h2>
              <div className="space-y-6">
                {anomalyPatterns.map((pattern, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-base font-medium text-gray-700">{pattern.pattern}</span>
                      <span className="text-sm font-medium text-gray-700">{pattern.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{ width: `${pattern.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {pattern.count} {t('fraudDetection.transactions')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('fraudDetection.aiExplanation')}</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="font-medium text-gray-900">{t('fraudDetection.patternRecognition')}</h3>
                  <p className="text-gray-600 mt-1">{t('fraudDetection.patternRecognitionDesc')}</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-medium text-gray-900">{t('fraudDetection.behavioralAnalysis')}</h3>
                  <p className="text-gray-600 mt-1">{t('fraudDetection.behavioralAnalysisDesc')}</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-medium text-gray-900">{t('fraudDetection.networkAnalysis')}</h3>
                  <p className="text-gray-600 mt-1">{t('fraudDetection.networkAnalysisDesc')}</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-medium text-gray-900">{t('fraudDetection.realTimeMonitoring')}</h3>
                  <p className="text-gray-600 mt-1">{t('fraudDetection.realTimeMonitoringDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{t('fraudDetection.transactionDetails')}</h3>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('fraudDetection.transactionInfo')}</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('fraudDetection.transactionId')}:</span>
                      <span className="font-medium">{selectedTransaction.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('fraudDetection.ngo')}:</span>
                      <span className="font-medium">{selectedTransaction.ngo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('fraudDetection.amount')}:</span>
                      <span className="font-medium">₹{selectedTransaction.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('fraudDetection.date')}:</span>
                      <span className="font-medium">{selectedTransaction.date}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('fraudDetection.fraudAnalysis')}</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('fraudDetection.riskScore')}:</span>
                      <span className="font-medium">{selectedTransaction.riskScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('fraudDetection.flaggedBy')}:</span>
                      <span className="font-medium">{selectedTransaction.flaggedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('fraudDetection.reason')}:</span>
                      <span className="font-medium">{selectedTransaction.reason}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('fraudDetection.status')}:</span>
                      <span className="font-medium">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          selectedTransaction.status === 'Flagged' 
                            ? 'bg-red-100 text-red-800' 
                            : selectedTransaction.status === 'Verified' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {selectedTransaction.status}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-2">{t('fraudDetection.actions')}</h4>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    {t('fraudDetection.markVerified')}
                  </button>
                  <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
                    {t('fraudDetection.requestReview')}
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    {t('fraudDetection.blockTransaction')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FraudDetection;