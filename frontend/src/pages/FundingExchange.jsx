import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FundingExchange = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('escrow');

  // Mock data for multi-chain escrow
  const escrowStats = {
    totalFunds: "$124.8M",
    activeProjects: 142,
    chains: [
      { name: "Algorand", funds: "$78.2M", percentage: 62.8 },
      { name: "Polygon", funds: "$32.1M", percentage: 25.7 },
      { name: "Stellar", funds: "$14.5M", percentage: 11.5 }
    ]
  };

  // Mock data for impact tokens
  const impactTokens = [
    { id: 1, name: "ImpactX Token", symbol: "IMPX", price: "$2.45", change: "+5.2%", supply: "10M" },
    { id: 2, name: "Relief Token", symbol: "REL", price: "$1.87", change: "+2.1%", supply: "15M" },
    { id: 3, name: "Carbon Credit", symbol: "CARB", price: "$8.32", change: "-1.3%", supply: "2M" }
  ];

  // Mock data for liquidity
  const liquidityPools = [
    { id: 1, pair: "IMPX/USDC", tvl: "$12.4M", apr: "12.5%" },
    { id: 2, pair: "REL/USDC", tvl: "$8.7M", apr: "8.7%" },
    { id: 3, pair: "CARB/USDC", tvl: "$5.3M", apr: "15.2%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            {t('fundingExchange.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('fundingExchange.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('escrow')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'escrow'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('fundingExchange.multiChainEscrow')}
              </button>
              <button
                onClick={() => setActiveTab('tokens')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'tokens'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('fundingExchange.impactTokens')}
              </button>
              <button
                onClick={() => setActiveTab('liquidity')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'liquidity'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('fundingExchange.liquidity')}
              </button>
              <button
                onClick={() => setActiveTab('transparency')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'transparency'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('fundingExchange.transparency')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'escrow' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('fundingExchange.multiChainEscrowSystem')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="text-3xl font-bold mb-2">{escrowStats.totalFunds}</div>
                    <div className="text-sm opacity-90">{t('fundingExchange.totalFundsLocked')}</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-6 text-white">
                    <div className="text-3xl font-bold mb-2">{escrowStats.activeProjects}</div>
                    <div className="text-sm opacity-90">{t('fundingExchange.activeProjects')}</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white">
                    <div className="text-3xl font-bold mb-2">99.9%</div>
                    <div className="text-sm opacity-90">{t('fundingExchange.transparencyRate')}</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('fundingExchange.chainDistribution')}</h3>
                  <div className="space-y-4">
                    {escrowStats.chains.map((chain, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">{chain.name}</span>
                          <span className="text-gray-900 font-medium">{chain.funds}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${
                              index === 0 ? 'bg-indigo-600' : 
                              index === 1 ? 'bg-blue-500' : 'bg-green-500'
                            }`} 
                            style={{ width: `${chain.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tokens' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('fundingExchange.impactTokenSystem')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {impactTokens.map((token) => (
                    <div key={token.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{token.name}</h3>
                          <p className="text-gray-600">{token.symbol}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          token.change.startsWith('+') 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {token.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">{token.price}</div>
                      <div className="text-sm text-gray-600 mb-4">
                        {t('fundingExchange.totalSupply')}: {token.supply}
                      </div>
                      <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        {t('fundingExchange.stakeTokens')}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('fundingExchange.rewardSystem')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('fundingExchange.rewardSystemDesc')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="text-indigo-600 font-bold mb-1">5 IMPX</div>
                      <div className="text-sm text-gray-600">{t('fundingExchange.forDonation')}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="text-indigo-600 font-bold mb-1">10 IMPX</div>
                      <div className="text-sm text-gray-600">{t('fundingExchange.forVerification')}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="text-indigo-600 font-bold mb-1">15 IMPX</div>
                      <div className="text-sm text-gray-600">{t('fundingExchange.forReporting')}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'liquidity' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('fundingExchange.liquidityBalancing')}
                </h2>
                <div className="overflow-x-auto mb-8">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('fundingExchange.pool')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('fundingExchange.tvl')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('fundingExchange.apr')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('fundingExchange.action')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {liquidityPools.map((pool) => (
                        <tr key={pool.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {pool.pair}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {pool.tvl}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              {pool.apr}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                              {t('fundingExchange.addLiquidity')}
                            </button>
                            <button className="text-indigo-600 hover:text-indigo-900">
                              {t('fundingExchange.removeLiquidity')}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('fundingExchange.automatedBalancing')}
                  </h3>
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <div className="text-2xl font-bold text-gray-900">98.7%</div>
                      <div className="text-sm text-gray-600">{t('fundingExchange.efficiency')}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{t('fundingExchange.optimization')}</span>
                        <span>98.7%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '98.7%' }}></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {t('fundingExchange.balancingDesc')}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'transparency' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('fundingExchange.realTimeTransparency')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('fundingExchange.fundFlows')}
                    </h3>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                          </svg>
                        </div>
                        <p className="text-gray-600">{t('fundingExchange.fundFlowChart')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('fundingExchange.transactionHistory')}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <div>
                          <div className="font-medium text-gray-900">Donation #12489</div>
                          <div className="text-sm text-gray-600">Kerala Flood Relief</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-600">+ $2,500</div>
                          <div className="text-sm text-gray-600">2 min ago</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <div>
                          <div className="font-medium text-gray-900">Fund Release #987</div>
                          <div className="text-sm text-gray-600">NGO Verification Complete</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-blue-600">- $1,800</div>
                          <div className="text-sm text-gray-600">15 min ago</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900">Staking Reward</div>
                          <div className="text-sm text-gray-600">IMPX Token Rewards</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-600">+ $42.50</div>
                          <div className="text-sm text-gray-600">1 hour ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('fundingExchange.transparencyFeatures')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('fundingExchange.feature1')}</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('fundingExchange.feature2')}</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('fundingExchange.feature3')}</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('fundingExchange.feature4')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingExchange;