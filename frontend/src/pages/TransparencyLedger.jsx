import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const TransparencyLedger = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('transactions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Mock transaction data
  const transactions = [
    {
      id: 'TXN001',
      hash: 'TXNJKL987FDS321POI098KJHGFDSA1234567890QWERTYUIOP',
      timestamp: '2024-03-22T14:30:00Z',
      amount: 5000,
      currency: 'ALGO',
      donor: 'Anonymous Donor',
      recipient: 'Disaster Relief Philippines',
      project: 'Typhoon Recovery Fund',
      status: 'confirmed',
      explorerLink: 'https://algoexplorer.io/tx/TXNJKL987FDS321POI098KJHGFDSA1234567890QWERTYUIOP'
    },
    {
      id: 'TXN002',
      hash: 'TXNMLK765HGF543REW210LKJHGFDSA0987654321ZXCVBNMQW',
      timestamp: '2024-03-22T11:15:00Z',
      amount: 2500,
      currency: 'ALGO',
      donor: 'Climate Action Foundation',
      recipient: 'Flood Response Indonesia',
      project: 'Jakarta Flood Mitigation',
      status: 'confirmed',
      explorerLink: 'https://algoexplorer.io/tx/TXNMLK765HGF543REW210LKJHGFDSA0987654321ZXCVBNMQW'
    },
    {
      id: 'TXN003',
      hash: 'TXNMNB876JHG654TRE321POIUYTREWQASDFGHJKL123456789',
      timestamp: '2024-03-21T16:45:00Z',
      amount: 10000,
      currency: 'ALGO',
      donor: 'Blockchain for Good Initiative',
      recipient: 'Earthquake Aid Nepal',
      project: 'Kathmandu Reconstruction',
      status: 'confirmed',
      explorerLink: 'https://algoexplorer.io/tx/TXNMNB876JHG654TRE321POIUYTREWQASDFGHJKL123456789'
    },
    {
      id: 'TXN004',
      hash: 'TXNVCX987YTR432QWE109MNBVCXZLKJHGFDSA0987654321AS',
      timestamp: '2024-03-21T09:30:00Z',
      amount: 7500,
      currency: 'ALGO',
      donor: 'Anonymous Donor',
      recipient: 'Hurricane Recovery Brazil',
      project: 'Amazon Region Support',
      status: 'confirmed',
      explorerLink: 'https://algoexplorer.io/tx/TXNVCX987YTR432QWE109MNBVCXZLKJHGFDSA0987654321AS'
    },
    {
      id: 'TXN005',
      hash: 'TXNBVC876YTR543WQE210LKJHGFDSA0987654321ZXCVBNMQW',
      timestamp: '2024-03-20T14:20:00Z',
      amount: 3000,
      currency: 'ALGO',
      donor: 'Global Impact Network',
      recipient: 'Drought Support Kenya',
      project: 'Water Infrastructure Development',
      status: 'confirmed',
      explorerLink: 'https://algoexplorer.io/tx/TXNBVC876YTR543WQE210LKJHGFDSA0987654321ZXCVBNMQW'
    }
  ];

  // Mock verification data
  const verifications = [
    {
      id: 'VER001',
      transactionId: 'TXN001',
      ngo: 'Disaster Relief Philippines',
      project: 'Typhoon Recovery Fund',
      verificationDate: '2024-03-23T10:00:00Z',
      method: 'Satellite Imagery + IoT Sensors',
      score: 97.5,
      status: 'verified',
      evidence: [
        { type: 'satellite', url: '#', description: 'Before/After satellite images' },
        { type: 'iot', url: '#', description: 'Water level sensors data' },
        { type: 'report', url: '#', description: 'Field assessment report' }
      ]
    },
    {
      id: 'VER002',
      transactionId: 'TXN002',
      ngo: 'Flood Response Indonesia',
      project: 'Jakarta Flood Mitigation',
      verificationDate: '2024-03-23T09:30:00Z',
      method: 'Drone Footage + Community Reports',
      score: 94.2,
      status: 'verified',
      evidence: [
        { type: 'drone', url: '#', description: 'Drone survey footage' },
        { type: 'community', url: '#', description: 'Community feedback reports' },
        { type: 'report', url: '#', description: 'Impact assessment report' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'verified': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatHash = (hash) => {
    if (hash.length <= 20) return hash;
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 10)}`;
  };

  const filteredTransactions = transactions.filter(txn => 
    txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.donor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('ledger.title')}</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('ledger.description')}
          </p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-indigo-700">24,850</div>
            <div className="text-gray-600 mt-1">{t('ledger.stats.transactions')}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600">1,250,000</div>
            <div className="text-gray-600 mt-1">{t('ledger.stats.total')} (ALGO)</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">142</div>
            <div className="text-gray-600 mt-1">{t('ledger.stats.projects')}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">98.7%</div>
            <div className="text-gray-600 mt-1">{t('ledger.stats.verified')}</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 md:mb-0">{t('ledger.transactions.title')}</h2>
            <div className="relative">
              <input
                type="text"
                placeholder={t('ledger.search')}
                className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('transactions')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'transactions'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('ledger.tabs.transactions')}
              </button>
              <button
                onClick={() => setActiveTab('verifications')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'verifications'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('ledger.tabs.verifications')}
              </button>
              <button
                onClick={() => setActiveTab('verifier')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'verifier'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('ledger.tabs.verifier')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('ledger.transactions.id')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('ledger.transactions.timestamp')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('ledger.transactions.amount')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('ledger.transactions.parties')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('ledger.transactions.project')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('ledger.transactions.status')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('ledger.transactions.actions')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                            <div className="text-sm text-gray-500 font-mono">{formatHash(transaction.hash)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatTime(transaction.timestamp)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {transaction.amount.toLocaleString()} {transaction.currency}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{transaction.donor}</div>
                            <div className="text-sm text-gray-500">→ {transaction.recipient}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.project}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => setSelectedTransaction(transaction)}
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                            >
                              {t('ledger.transactions.view')}
                            </button>
                            <a
                              href={transaction.explorerLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-900"
                            >
                              {t('ledger.transactions.explorer')}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredTransactions.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">{t('ledger.transactions.noResults')}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {t('ledger.transactions.noResultsDesc')}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Verifications Tab */}
            {activeTab === 'verifications' && (
              <div>
                <div className="grid grid-cols-1 gap-6">
                  {verifications.map((verification) => (
                    <div key={verification.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{verification.project}</h3>
                          <p className="text-gray-600">{verification.ngo}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(verification.status)}`}>
                          {verification.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-500">{t('ledger.verifications.verificationDate')}</div>
                          <div className="font-medium">{formatTime(verification.verificationDate)}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-500">{t('ledger.verifications.method')}</div>
                          <div className="font-medium">{verification.method}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-500">{t('ledger.verifications.score')}</div>
                          <div className="font-medium">
                            <span className="text-2xl text-green-600">{verification.score}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">{t('ledger.verifications.evidence')}</h4>
                        <div className="flex flex-wrap gap-3">
                          {verification.evidence.map((evidence, idx) => (
                            <button
                              key={idx}
                              className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm rounded-full text-gray-700 bg-white hover:bg-gray-50"
                            >
                              {evidence.type.charAt(0).toUpperCase() + evidence.type.slice(1)}
                              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          {t('ledger.verifications.viewReport')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verifier Tab */}
            {activeTab === 'verifier' && (
              <div>
                <div className="text-center mb-8">
                  <div className="mx-auto bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{t('ledger.verifier.title')}</h2>
                  <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                    {t('ledger.verifier.description')}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">{t('ledger.verifier.verifyTransaction')}</h3>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder={t('ledger.verifier.enterHash')}
                      className="flex-1 min-w-0 block w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      {t('ledger.verifier.verify')}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-5">
                    <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t('ledger.verifier.howItWorks')}</h3>
                    <p className="text-gray-600 mb-4">{t('ledger.verifier.howItWorksDesc')}</p>
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                      {t('ledger.verifier.learnMore')}
                    </button>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-5">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t('ledger.verifier.transparency')}</h3>
                    <p className="text-gray-600 mb-4">{t('ledger.verifier.transparencyDesc')}</p>
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                      {t('ledger.verifier.readDocs')}
                    </button>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-5">
                    <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t('ledger.verifier.security')}</h3>
                    <p className="text-gray-600 mb-4">{t('ledger.verifier.securityDesc')}</p>
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                      {t('ledger.verifier.audit')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('ledger.documentation')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('ledger.docs.transparency')}</h3>
              <p className="text-gray-600 mb-4">{t('ledger.docs.transparencyDesc')}</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('ledger.readMore')}
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('ledger.docs.blockchain')}</h3>
              <p className="text-gray-600 mb-4">{t('ledger.docs.blockchainDesc')}</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('ledger.explore')}
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('ledger.docs.audit')}</h3>
              <p className="text-gray-600 mb-4">{t('ledger.docs.auditDesc')}</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('ledger.download')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl leading-6 font-medium text-gray-900 mb-4">
                  {t('ledger.transactions.details')}
                </h3>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-2 px-7 py-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-500">{t('ledger.transactions.id')}</div>
                    <div className="font-medium">{selectedTransaction.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{t('ledger.transactions.timestamp')}</div>
                    <div className="font-medium">{formatTime(selectedTransaction.timestamp)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{t('ledger.transactions.amount')}</div>
                    <div className="font-medium text-lg">
                      {selectedTransaction.amount.toLocaleString()} {selectedTransaction.currency}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{t('ledger.transactions.status')}</div>
                    <div>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedTransaction.status)}`}>
                        {selectedTransaction.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm text-gray-500">{t('ledger.transactions.parties')}</div>
                  <div className="font-medium">{selectedTransaction.donor}</div>
                  <div className="text-gray-500">→</div>
                  <div className="font-medium">{selectedTransaction.recipient}</div>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm text-gray-500">{t('ledger.transactions.project')}</div>
                  <div className="font-medium">{selectedTransaction.project}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-2">{t('ledger.transactions.hash')}</div>
                  <div className="font-mono text-sm bg-gray-50 p-3 rounded-lg break-words">
                    {selectedTransaction.hash}
                  </div>
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <a
                  href={selectedTransaction.explorerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t('ledger.transactions.viewExplorer')}
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransparencyLedger;