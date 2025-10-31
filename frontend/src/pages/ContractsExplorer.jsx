import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ContractsExplorer = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('deployed');
  
  // Mock data for deployed contracts
  const deployedContracts = [
    {
      id: 'C1',
      name: 'DonationManager',
      description: 'Handles donation processing and fund allocation',
      status: 'Active',
      address: 'X7BHK3NPOQJ9RSTU4VWYZ2AF8GME6DL5CUKHF0QX1P3WY9RA',
      createdAt: '2024-01-15',
      lastUpdated: '2024-03-22'
    },
    {
      id: 'C2',
      name: 'VerificationEngine',
      description: 'Validates NGO claims using satellite imagery and IoT data',
      status: 'Active',
      address: 'Y8CIL4OPRK0ASTV5WXZA3BG9HNF7EM6DVLEIG1RY2Q4XZ0SB',
      createdAt: '2024-02-10',
      lastUpdated: '2024-03-18'
    },
    {
      id: 'C3',
      name: 'ImpactTracker',
      description: 'Records and verifies impact metrics for funded projects',
      status: 'Testing',
      address: 'Z9DJM5PQLS1BTUW6XYAB4CH0IOG8FN7EWMFJH2SZ3R5YA1TC',
      createdAt: '2024-03-05',
      lastUpdated: '2024-03-20'
    }
  ];

  const contractStates = [
    {
      contract: 'DonationManager',
      stateVars: [
        { name: 'totalDonations', value: '1,250,000.00 ALGO', type: 'uint64' },
        { name: 'activeProjects', value: '42', type: 'uint32' },
        { name: 'verifiedNGOs', value: '18', type: 'uint16' },
        { name: 'adminAddress', value: 'X7BHK3NPOQJ9RSTU4VWYZ2AF8GME6DL5CUKHF0QX1P3WY9RA', type: 'address' }
      ]
    }
  ];

  const codeSnippets = [
    {
      title: 'Donation Processing Logic',
      language: 'teal',
      code: `#pragma version 8
txn ApplicationID
int 0
==
bnz create_logic

// Handle donation
txn OnCompletion
int NoOp
==
bnz handle_donation

handle_donation:
// Verify sender is approved NGO
callsub check_approved_ngo
bz donation_error

// Validate donation amount
txn Amount
int 1000000  // Minimum 1 ALGO
>=
bz donation_error

// Update total donations
load 0
int 1
+
store 0

b donation_success

check_approved_ngo:
// Implementation to check if sender is approved
retsub

donation_success:
int 1
return

donation_error:
err

create_logic:
// Initialization logic
int 1
return`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('contracts.title')}</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('contracts.description')}
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('deployed')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'deployed'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('contracts.tabs.deployed')}
              </button>
              <button
                onClick={() => setActiveTab('states')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'states'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('contracts.tabs.states')}
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'code'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('contracts.tabs.code')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Deployed Contracts Tab */}
            {activeTab === 'deployed' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {deployedContracts.map((contract) => (
                    <div key={contract.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{contract.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          contract.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {contract.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{contract.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">ID:</span>
                          <span className="font-mono text-sm">{contract.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Address:</span>
                          <span className="font-mono text-xs truncate ml-2">{contract.address}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Created:</span>
                          <span>{contract.createdAt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Updated:</span>
                          <span>{contract.lastUpdated}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-3">
                        <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
                          {t('contracts.viewDetails')}
                        </button>
                        <button className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition">
                          {t('contracts.interact')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contract States Tab */}
            {activeTab === 'states' && (
              <div>
                <div className="space-y-8">
                  {contractStates.map((contractState, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{contractState.contract}</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t('contracts.state.variable')}
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t('contracts.state.value')}
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t('contracts.state.type')}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {contractState.stateVars.map((variable, idx) => (
                              <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {variable.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                  {variable.value}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {variable.type}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Snippets Tab */}
            {activeTab === 'code' && (
              <div>
                <div className="space-y-6">
                  {codeSnippets.map((snippet, index) => (
                    <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
                      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                        <h4 className="text-lg font-medium text-white">{snippet.title}</h4>
                        <span className="text-xs text-gray-400">{snippet.language}</span>
                      </div>
                      <pre className="p-4 text-sm text-gray-200 overflow-x-auto">
                        <code>{snippet.code}</code>
                      </pre>
                      <div className="bg-gray-800 px-4 py-3">
                        <button className="text-indigo-300 hover:text-indigo-100 text-sm">
                          {t('contracts.copyCode')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('contracts.documentation')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('contracts.devGuide')}</h3>
              <p className="text-gray-600 mb-4">{t('contracts.devGuideDesc')}</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('contracts.readMore')}
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('contracts.auditReports')}</h3>
              <p className="text-gray-600 mb-4">{t('contracts.auditReportsDesc')}</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('contracts.download')}
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('contracts.apiDocs')}</h3>
              <p className="text-gray-600 mb-4">{t('contracts.apiDocsDesc')}</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('contracts.explore')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractsExplorer;