import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const InteroperabilityBridge = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('blockchains');

  const blockchains = [
    {
      id: 1,
      name: "Ethereum",
      status: "Planned",
      description: "Integration with Ethereum ecosystem for broader DeFi interoperability",
      logo: "ETH"
    },
    {
      id: 2,
      name: "Solana",
      status: "Research",
      description: "Exploring high-throughput transaction capabilities",
      logo: "SOL"
    },
    {
      id: 3,
      name: "Polkadot",
      status: "Evaluation",
      description: "Cross-chain communication protocols",
      logo: "DOT"
    },
    {
      id: 4,
      name: "Cosmos",
      status: "Planned",
      description: "IBC protocol integration for multi-chain ecosystem",
      logo: "ATOM"
    }
  ];

  const cbdcIntegrations = [
    {
      id: 1,
      country: "India",
      status: "Pilot",
      description: "Integration with RBI Digital Rupee for government aid distribution"
    },
    {
      id: 2,
      country: "Singapore",
      status: "Research",
      description: "Collaboration with MAS for cross-border humanitarian aid"
    },
    {
      id: 3,
      country: "EU",
      status: "Evaluation",
      description: "Compliance with ECB digital euro framework"
    }
  ];

  const transactionFlow = [
    { step: 1, title: "Initiate Cross-Chain Transfer", description: "User requests transfer from Algorand to another chain" },
    { step: 2, title: "Verification & Validation", description: "Smart contracts verify transaction legitimacy" },
    { step: 3, title: "Bridge Processing", description: "Cross-chain bridge processes the transaction" },
    { step: 4, title: "Confirmation", description: "Transaction confirmed on destination chain" },
    { step: 5, title: "Notification", description: "User receives confirmation of successful transfer" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            {t('interoperability.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('interoperability.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('blockchains')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'blockchains'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('interoperability.blockchains')}
              </button>
              <button
                onClick={() => setActiveTab('cbdc')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'cbdc'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('interoperability.cbdc')}
              </button>
              <button
                onClick={() => setActiveTab('visualization')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'visualization'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('interoperability.visualization')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'blockchains' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('interoperability.blockchainIntegration')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blockchains.map((chain) => (
                    <div key={chain.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                            <span className="font-bold text-indigo-700">{chain.logo}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">{chain.name}</h3>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          chain.status === 'Planned' 
                            ? 'bg-blue-100 text-blue-800' 
                            : chain.status === 'Research' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {chain.status}
                        </span>
                      </div>
                      <p className="text-gray-600">{chain.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'cbdc' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('interoperability.cbdcIntegration')}
                </h2>
                <div className="space-y-6">
                  {cbdcIntegrations.map((integration) => (
                    <div key={integration.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{integration.country}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          integration.status === 'Pilot' 
                            ? 'bg-green-100 text-green-800' 
                            : integration.status === 'Research' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {integration.status}
                        </span>
                      </div>
                      <p className="text-gray-600">{integration.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'visualization' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('interoperability.transactionFlow')}
                </h2>
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-indigo-200 transform translate-x-1/2"></div>
                  <div className="space-y-8">
                    {transactionFlow.map((step, index) => (
                      <div key={step.step} className="relative flex items-start">
                        <div className="absolute left-6 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center z-10">
                          <span className="text-white text-sm font-bold">{step.step}</span>
                        </div>
                        <div className="ml-16 bg-gray-50 rounded-lg p-6 border border-gray-200 w-full">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('interoperability.technicalSpecs')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('interoperability.security')}</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t('interoperability.securityPoint1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t('interoperability.securityPoint2')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t('interoperability.securityPoint3')}</span>
                </li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('interoperability.scalability')}</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t('interoperability.scalabilityPoint1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t('interoperability.scalabilityPoint2')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t('interoperability.scalabilityPoint3')}</span>
                </li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('interoperability.compatibility')}</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t('interoperability.compatibilityPoint1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t('interoperability.compatibilityPoint2')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t('interoperability.compatibilityPoint3')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteroperabilityBridge;