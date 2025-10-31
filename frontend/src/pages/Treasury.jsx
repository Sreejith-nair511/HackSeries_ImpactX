import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Treasury = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProposal, setSelectedProposal] = useState(null);

  // Mock treasury data
  const treasuryData = {
    totalFunds: 15000000,
    disbursed: 9500000,
    locked: 3500000,
    available: 2000000,
    currency: 'ALGO'
  };

  // Mock proposals data
  const proposals = [
    {
      id: 'PROP-001',
      title: 'Emergency Flood Relief for Kerala',
      description: 'Request for immediate funding to provide emergency relief to flood-affected communities in Kerala',
      requestedAmount: 2500000,
      status: 'Active',
      votes: {
        yes: 42,
        no: 8,
        abstain: 3
      },
      deadline: '2023-07-15',
      proposer: 'Helping Hands Foundation'
    },
    {
      id: 'PROP-002',
      title: 'School Reconstruction in Odisha',
      description: 'Funding request for rebuilding schools damaged by cyclone in Odisha',
      requestedAmount: 1800000,
      status: 'Voting',
      votes: {
        yes: 35,
        no: 12,
        abstain: 5
      },
      deadline: '2023-07-10',
      proposer: 'Education for All NGO'
    },
    {
      id: 'PROP-003',
      title: 'Medical Camp Initiative in Assam',
      description: 'Proposal to set up mobile medical camps in remote areas of Assam',
      requestedAmount: 1200000,
      status: 'Approved',
      votes: {
        yes: 51,
        no: 4,
        abstain: 2
      },
      deadline: '2023-06-30',
      proposer: 'Healthcare Without Borders'
    },
    {
      id: 'PROP-004',
      title: 'Disaster Preparedness Training',
      description: 'Request for funding community disaster preparedness training programs',
      requestedAmount: 800000,
      status: 'Rejected',
      votes: {
        yes: 18,
        no: 35,
        abstain: 4
      },
      deadline: '2023-06-25',
      proposer: 'Community Resilience Network'
    }
  ];

  // Mock recent transactions
  const recentTransactions = [
    {
      id: 'TXN-1001',
      type: 'Disbursement',
      amount: 500000,
      to: 'Kerala Flood Relief Fund',
      date: '2023-06-20',
      status: 'Completed'
    },
    {
      id: 'TXN-1002',
      type: 'Deposit',
      amount: 2000000,
      from: 'Global Giving Foundation',
      date: '2023-06-18',
      status: 'Completed'
    },
    {
      id: 'TXN-1003',
      type: 'Disbursement',
      amount: 300000,
      to: 'Odisha School Reconstruction',
      date: '2023-06-15',
      status: 'Completed'
    },
    {
      id: 'TXN-1004',
      type: 'Locked',
      amount: 1000000,
      purpose: 'Pending Proposal Approval',
      date: '2023-06-12',
      status: 'Locked'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('treasury.title')}</h1>
          <p className="mt-2 text-gray-600">{t('treasury.description')}</p>
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
              {t('treasury.overview')}
            </button>
            <button
              onClick={() => setActiveTab('proposals')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'proposals'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('treasury.proposals')}
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'transactions'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('treasury.transactions')}
            </button>
            <button
              onClick={() => setActiveTab('voting')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'voting'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('treasury.voting')}
            </button>
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Treasury Summary */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('treasury.treasurySummary')}</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900">₹{treasuryData.totalFunds.toLocaleString()}</div>
                  <div className="text-gray-600">{t('treasury.totalFunds')}</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">₹{treasuryData.disbursed.toLocaleString()}</div>
                  <div className="text-gray-600">{t('treasury.disbursed')}</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-600">₹{treasuryData.locked.toLocaleString()}</div>
                  <div className="text-gray-600">{t('treasury.locked')}</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">₹{treasuryData.available.toLocaleString()}</div>
                  <div className="text-gray-600">{t('treasury.available')}</div>
                </div>
              </div>
            </div>

            {/* Fund Distribution */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('treasury.fundDistribution')}</h2>
              <div className="h-64 flex items-end space-x-2 justify-center">
                <div className="flex flex-col items-center">
                  <div 
                    className="w-16 bg-green-500 rounded-t hover:bg-green-600 transition-colors"
                    style={{ height: '60%' }}
                  ></div>
                  <div className="text-xs mt-2 text-center">
                    <div className="font-medium">63%</div>
                    <div className="text-gray-600">{t('treasury.disbursed')}</div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div 
                    className="w-16 bg-yellow-500 rounded-t hover:bg-yellow-600 transition-colors"
                    style={{ height: '23%' }}
                  ></div>
                  <div className="text-xs mt-2 text-center">
                    <div className="font-medium">23%</div>
                    <div className="text-gray-600">{t('treasury.locked')}</div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div 
                    className="w-16 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                    style={{ height: '14%' }}
                  ></div>
                  <div className="text-xs mt-2 text-center">
                    <div className="font-medium">14%</div>
                    <div className="text-gray-600">{t('treasury.available')}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-3">{t('treasury.recentActivity')}</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-600">₹500,000 disbursed to Kerala Flood Relief</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                      <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-600">₹2,000,000 deposited from Global Giving</p>
                      <p className="text-xs text-gray-500">4 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-100 p-2 rounded-full">
                      <svg className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-600">₹1,000,000 locked for pending proposals</p>
                      <p className="text-xs text-gray-500">1 week ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Proposals */}
            <div className="lg:col-span-3 bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{t('treasury.topProposals')}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('treasury.proposal')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('treasury.requestedAmount')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('treasury.status')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('treasury.votes')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('treasury.deadline')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {proposals.slice(0, 3).map((proposal) => (
                      <tr key={proposal.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{proposal.title}</div>
                          <div className="text-sm text-gray-500">{proposal.proposer}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{proposal.requestedAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            proposal.status === 'Active' 
                              ? 'bg-blue-100 text-blue-800' 
                              : proposal.status === 'Voting' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : proposal.status === 'Approved' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                          }`}>
                            {proposal.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <span className="mr-2">{proposal.votes.yes}Y</span>
                            <span className="mr-2">{proposal.votes.no}N</span>
                            <span>{proposal.votes.abstain}A</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {proposal.deadline}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Proposals Tab */}
        {activeTab === 'proposals' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{t('treasury.allProposals')}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('treasury.proposalId')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('treasury.title')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('treasury.requestedAmount')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('treasury.proposer')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('treasury.status')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('treasury.deadline')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('treasury.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {proposals.map((proposal) => (
                    <tr key={proposal.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {proposal.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{proposal.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{proposal.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{proposal.requestedAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {proposal.proposer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          proposal.status === 'Active' 
                            ? 'bg-blue-100 text-blue-800' 
                            : proposal.status === 'Voting' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : proposal.status === 'Approved' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                        }`}>
                          {proposal.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {proposal.deadline}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => setSelectedProposal(proposal)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {t('treasury.viewDetails')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{t('treasury.transactionHistory')}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('treasury.transactionId')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('treasury.type')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('treasury.amount')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('treasury.party')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('treasury.date')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('treasury.status')}
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
                        {transaction.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{transaction.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.to || transaction.from || transaction.purpose}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : transaction.status === 'Locked' 
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
        )}

        {/* Voting Tab */}
        {activeTab === 'voting' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Voting */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{t('treasury.activeVoting')}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('treasury.proposal')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('treasury.requestedAmount')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('treasury.votes')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('treasury.deadline')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('treasury.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {proposals.filter(p => p.status === 'Voting').map((proposal) => (
                      <tr key={proposal.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{proposal.title}</div>
                          <div className="text-sm text-gray-500">{proposal.proposer}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{proposal.requestedAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="mr-2 text-green-600">{proposal.votes.yes}Y</span>
                            <span className="mr-2 text-red-600">{proposal.votes.no}N</span>
                            <span className="text-gray-600">{proposal.votes.abstain}A</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {proposal.deadline}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => setSelectedProposal(proposal)}
                            className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                          >
                            {t('treasury.vote')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Voting Statistics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('treasury.votingStats')}</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-indigo-600">24</div>
                  <div className="text-gray-600">{t('treasury.totalVotes')}</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">18</div>
                  <div className="text-gray-600">{t('treasury.approvedProposals')}</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-600">4</div>
                  <div className="text-gray-600">{t('treasury.rejectedProposals')}</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">85%</div>
                  <div className="text-gray-600">{t('treasury.voterParticipation')}</div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  {t('treasury.createProposal')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Proposal Detail Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{selectedProposal.title}</h3>
                <button
                  onClick={() => setSelectedProposal(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{t('treasury.proposalDetails')}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('treasury.proposalId')}:</span>
                      <span className="font-medium">{selectedProposal.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('treasury.proposer')}:</span>
                      <span className="font-medium">{selectedProposal.proposer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('treasury.requestedAmount')}:</span>
                      <span className="font-medium">₹{selectedProposal.requestedAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('treasury.deadline')}:</span>
                      <span className="font-medium">{selectedProposal.deadline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('treasury.status')}:</span>
                      <span className="font-medium">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          selectedProposal.status === 'Active' 
                            ? 'bg-blue-100 text-blue-800' 
                            : selectedProposal.status === 'Voting' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : selectedProposal.status === 'Approved' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedProposal.status}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{t('treasury.description')}</h4>
                  <p className="text-gray-600">{selectedProposal.description}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{t('treasury.currentVotes')}</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedProposal.votes.yes}</div>
                      <div className="text-gray-600">{t('treasury.yesVotes')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{selectedProposal.votes.no}</div>
                      <div className="text-gray-600">{t('treasury.noVotes')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600">{selectedProposal.votes.abstain}</div>
                      <div className="text-gray-600">{t('treasury.abstainVotes')}</div>
                    </div>
                  </div>
                </div>
                
                {selectedProposal.status === 'Voting' && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{t('treasury.castVote')}</h4>
                    <div className="flex space-x-3">
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        {t('treasury.voteYes')}
                      </button>
                      <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                        {t('treasury.voteNo')}
                      </button>
                      <button className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                        {t('treasury.abstain')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Treasury;