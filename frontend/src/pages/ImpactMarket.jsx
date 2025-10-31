import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ImpactMarket = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedToken, setSelectedToken] = useState(null);

  // Mock data for impact tokens
  const impactTokens = [
    {
      id: 'IMPACT-001',
      name: 'Flood Relief Impact Token',
      project: 'Kerala Flood Relief 2023',
      impact: '1,250 people sheltered',
      value: 125000,
      status: 'Verified',
      owner: 'Donor Wallet #12345',
      issued: '2023-06-15'
    },
    {
      id: 'IMPACT-002',
      name: 'Medical Aid Impact Token',
      project: 'Assam Healthcare Initiative',
      impact: '500 medical camps conducted',
      value: 85000,
      status: 'Verified',
      owner: 'Donor Wallet #67890',
      issued: '2023-06-10'
    },
    {
      id: 'IMPACT-003',
      name: 'Education Support Token',
      project: 'Odisha School Reconstruction',
      impact: '15 schools rebuilt',
      value: 200000,
      status: 'Pending',
      owner: 'Donor Wallet #11111',
      issued: '2023-06-05'
    }
  ];

  // Mock data for marketplace listings
  const marketplaceListings = [
    {
      id: 1,
      tokenId: 'IMPACT-001',
      seller: 'Donor Wallet #12345',
      price: 0.5,
      currency: 'ALGO',
      listed: '2023-06-18'
    },
    {
      id: 2,
      tokenId: 'IMPACT-004',
      seller: 'Donor Wallet #22222',
      price: 0.75,
      currency: 'ALGO',
      listed: '2023-06-17'
    }
  ];

  // Mock wallet data
  const walletData = {
    address: 'ALGO123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    balance: 12.5,
    currency: 'ALGO',
    impactTokens: 3,
    totalValue: 410000
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('impactMarket.title')}</h1>
          <p className="mt-2 text-gray-600">{t('impactMarket.description')}</p>
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
              {t('impactMarket.dashboard')}
            </button>
            <button
              onClick={() => setActiveTab('tokens')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tokens'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('impactMarket.myTokens')}
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'marketplace'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('impactMarket.marketplace')}
            </button>
            <button
              onClick={() => setActiveTab('wallet')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'wallet'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('impactMarket.wallet')}
            </button>
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Wallet Summary */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('impactMarket.walletSummary')}</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('impactMarket.walletAddress')}</span>
                  <span className="font-mono text-sm">{walletData.address.substring(0, 6)}...{walletData.address.substring(walletData.address.length - 4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('impactMarket.balance')}</span>
                  <span className="font-medium">{walletData.balance} {walletData.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('impactMarket.impactTokens')}</span>
                  <span className="font-medium">{walletData.impactTokens}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('impactMarket.totalValue')}</span>
                  <span className="font-medium">₹{walletData.totalValue.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  {t('impactMarket.connectWallet')}
                </button>
              </div>
            </div>

            {/* Token Statistics */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('impactMarket.tokenStatistics')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-indigo-600">1,247</div>
                  <div className="text-gray-600">{t('impactMarket.totalTokens')}</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-600">₹85M</div>
                  <div className="text-gray-600">{t('impactMarket.totalValue')}</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600">94%</div>
                  <div className="text-gray-600">{t('impactMarket.verificationRate')}</div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3">{t('impactMarket.recentActivity')}</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">New Flood Relief Token minted</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                    <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Token traded on marketplace</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-100 p-2 rounded-full">
                    <svg className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Verification pending for Education Token</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Tokens */}
            <div className="lg:col-span-3 bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{t('impactMarket.featuredTokens')}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('impactMarket.tokenId')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('impactMarket.project')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('impactMarket.impact')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('impactMarket.value')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('impactMarket.status')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('impactMarket.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {impactTokens.map((token) => (
                      <tr key={token.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {token.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {token.project}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {token.impact}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{token.value.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            token.status === 'Verified' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {token.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => setSelectedToken(token)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            {t('impactMarket.viewDetails')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* My Tokens Tab */}
        {activeTab === 'tokens' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{t('impactMarket.myImpactTokens')}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('impactMarket.tokenId')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('impactMarket.name')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('impactMarket.project')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('impactMarket.impact')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('impactMarket.value')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('impactMarket.status')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('impactMarket.issued')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('impactMarket.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {impactTokens.map((token) => (
                    <tr key={token.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {token.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {token.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {token.project}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {token.impact}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{token.value.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          token.status === 'Verified' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {token.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {token.issued}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                          {t('impactMarket.transfer')}
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          {t('impactMarket.list')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Marketplace Listings */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{t('impactMarket.marketplaceListings')}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('impactMarket.tokenId')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('impactMarket.seller')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('impactMarket.price')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('impactMarket.listed')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('impactMarket.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {marketplaceListings.map((listing) => (
                      <tr key={listing.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {listing.tokenId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {listing.seller.substring(0, 6)}...{listing.seller.substring(listing.seller.length - 4)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {listing.price} {listing.currency}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {listing.listed}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
                            {t('impactMarket.buy')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Marketplace Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('impactMarket.marketStats')}</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-indigo-600">24</div>
                  <div className="text-gray-600">{t('impactMarket.activeListings')}</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-gray-600">{t('impactMarket.transactions24h')}</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">0.85 {t('impactMarket.algo')}</div>
                  <div className="text-gray-600">{t('impactMarket.avgPrice')}</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">₹4.2M</div>
                  <div className="text-gray-600">{t('impactMarket.volume24h')}</div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  {t('impactMarket.createListing')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Wallet Tab */}
        {activeTab === 'wallet' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Wallet Info */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('impactMarket.walletInfo')}</h2>
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{t('impactMarket.connectedWallet')}</h3>
                    <p className="font-mono text-sm text-gray-600 mt-1">{walletData.address}</p>
                  </div>
                  <div className="bg-green-100 p-2 rounded-full">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="text-3xl font-bold text-gray-900">{walletData.balance} {walletData.currency}</div>
                    <div className="text-gray-600">{t('impactMarket.walletBalance')}</div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="text-3xl font-bold text-gray-900">{walletData.impactTokens}</div>
                    <div className="text-gray-600">{t('impactMarket.ownedTokens')}</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mr-3">
                    {t('impactMarket.sendTokens')}
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    {t('impactMarket.receiveTokens')}
                  </button>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('impactMarket.transactionHistory')}</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-900">Received</span>
                      <span className="text-sm font-medium text-green-600">+1.25 ALGO</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">From: Donor Wallet #54321</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                    <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-900">Sent</span>
                      <span className="text-sm font-medium text-blue-600">-0.5 ALGO</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">To: Impact Market Fee</span>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-900">Received</span>
                      <span className="text-sm font-medium text-green-600">+0.75 ALGO</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">From: Marketplace Sale</span>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Token Detail Modal */}
      {selectedToken && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{selectedToken.name}</h3>
                <button
                  onClick={() => setSelectedToken(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('impactMarket.tokenDetails')}</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('impactMarket.tokenId')}:</span>
                      <span className="font-medium">{selectedToken.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('impactMarket.project')}:</span>
                      <span className="font-medium">{selectedToken.project}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('impactMarket.impact')}:</span>
                      <span className="font-medium">{selectedToken.impact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('impactMarket.value')}:</span>
                      <span className="font-medium">₹{selectedToken.value.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('impactMarket.verification')}</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('impactMarket.status')}:</span>
                      <span className="font-medium">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          selectedToken.status === 'Verified' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {selectedToken.status}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('impactMarket.owner')}:</span>
                      <span className="font-medium text-sm">{selectedToken.owner.substring(0, 6)}...{selectedToken.owner.substring(selectedToken.owner.length - 4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('impactMarket.issued')}:</span>
                      <span className="font-medium">{selectedToken.issued}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('impactMarket.verificationHash')}:</span>
                      <span className="font-medium text-sm">Qm...{selectedToken.id.substring(selectedToken.id.length - 4)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-2">{t('impactMarket.actions')}</h4>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    {t('impactMarket.transfer')}
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    {t('impactMarket.listMarketplace')}
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    {t('impactMarket.viewBlockchain')}
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

export default ImpactMarket;