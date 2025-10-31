import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ImpactGovernanceDAO = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('proposals');

  // Mock data for proposals
  const proposals = [
    {
      id: 1,
      title: "Flood Relief Funding for Bangladesh",
      proposer: "Goodwell Sreejith S",
      status: "Active",
      votes: { yes: 1240, no: 85, abstain: 42 },
      deadline: "2024-04-15",
      funding: "$50,000"
    },
    {
      id: 2,
      title: "Earthquake Recovery in Turkey",
      proposer: "Vasudha",
      status: "Passed",
      votes: { yes: 2150, no: 120, abstain: 65 },
      deadline: "2024-03-20",
      funding: "$75,000"
    },
    {
      id: 3,
      title: "Drought Mitigation in Kenya",
      proposer: "Nikhil",
      status: "Rejected",
      votes: { yes: 890, no: 1420, abstain: 75 },
      deadline: "2024-03-10",
      funding: "$30,000"
    }
  ];

  // Mock data for treasury
  const treasury = {
    total: "$2.4M",
    disbursed: "$1.8M",
    locked: "$600K",
    chains: [
      { name: "Algorand", amount: "$1.5M", percentage: 62.5 },
      { name: "Polygon", amount: "$600K", percentage: 25 },
      { name: "Stellar", amount: "$300K", percentage: 12.5 }
    ]
  };

  // Mock data for reputation system
  const reputation = [
    { id: 1, name: "Goodwell Sreejith S", score: 95, role: "Founder", contributions: 142 },
    { id: 2, name: "Vasudha", score: 92, role: "Tech Lead", contributions: 128 },
    { id: 3, name: "Nikhil", score: 88, role: "Product Manager", contributions: 115 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            {t('governance.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('governance.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('proposals')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'proposals'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('governance.proposals')}
              </button>
              <button
                onClick={() => setActiveTab('treasury')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'treasury'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('governance.treasury')}
              </button>
              <button
                onClick={() => setActiveTab('voting')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'voting'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('governance.voting')}
              </button>
              <button
                onClick={() => setActiveTab('reputation')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'reputation'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('governance.reputation')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'proposals' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('governance.proposalGovernance')}
                </h2>
                <div className="space-y-6 mb-8">
                  {proposals.map((proposal) => (
                    <div key={proposal.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{proposal.title}</h3>
                          <p className="text-indigo-600">{t('governance.proposedBy')} {proposal.proposer}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          proposal.status === 'Active' 
                            ? 'bg-blue-100 text-blue-800' 
                            : proposal.status === 'Passed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {proposal.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>{t('governance.deadline')}: {proposal.deadline}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>{t('governance.funding')}: {proposal.funding}</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>{t('governance.votes')}: {proposal.votes.yes + proposal.votes.no + proposal.votes.abstain}</span>
                          <span>
                            {proposal.votes.yes} {t('governance.yes')} • {proposal.votes.no} {t('governance.no')} • {proposal.votes.abstain} {t('governance.abstain')}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-l-full" 
                            style={{ width: `${(proposal.votes.yes / (proposal.votes.yes + proposal.votes.no + proposal.votes.abstain)) * 100}%` }}
                          ></div>
                          <div 
                            className="bg-red-600 h-2 -mt-2" 
                            style={{ 
                              width: `${(proposal.votes.no / (proposal.votes.yes + proposal.votes.no + proposal.votes.abstain)) * 100}%`,
                              marginLeft: `${(proposal.votes.yes / (proposal.votes.yes + proposal.votes.no + proposal.votes.abstain)) * 100}%`
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                          {t('governance.viewDetails')}
                        </button>
                        {proposal.status === 'Active' && (
                          <>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                              {t('governance.voteYes')}
                            </button>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                              {t('governance.voteNo')}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('governance.createProposal')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('governance.proposalDesc')}
                  </p>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    {t('governance.newProposal')}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'treasury' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('governance.treasuryDashboard')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="text-3xl font-bold mb-2">{treasury.total}</div>
                    <div className="text-sm opacity-90">{t('governance.totalFunds')}</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-6 text-white">
                    <div className="text-3xl font-bold mb-2">{treasury.disbursed}</div>
                    <div className="text-sm opacity-90">{t('governance.disbursed')}</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white">
                    <div className="text-3xl font-bold mb-2">{treasury.locked}</div>
                    <div className="text-sm opacity-90">{t('governance.locked')}</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('governance.chainDistribution')}
                  </h3>
                  <div className="space-y-4">
                    {treasury.chains.map((chain, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">{chain.name}</span>
                          <span className="text-gray-900 font-medium">{chain.amount}</span>
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

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('governance.fundManagement')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="font-medium text-gray-900 mb-2">{t('governance.proposalFunding')}</div>
                      <div className="text-sm text-gray-600 mb-2">{t('governance.allocateFunds')}</div>
                      <button className="w-full py-1 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 transition-colors text-sm">
                        {t('governance.manage')}
                      </button>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="font-medium text-gray-900 mb-2">{t('governance.auditTrail')}</div>
                      <div className="text-sm text-gray-600 mb-2">{t('governance.transactionHistory')}</div>
                      <button className="w-full py-1 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 transition-colors text-sm">
                        {t('governance.view')}
                      </button>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="font-medium text-gray-900 mb-2">{t('governance.smartContracts')}</div>
                      <div className="text-sm text-gray-600 mb-2">{t('governance.contractManagement')}</div>
                      <button className="w-full py-1 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 transition-colors text-sm">
                        {t('governance.review')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'voting' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('governance.votingDashboard')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('governance.currentVotes')}
                    </h3>
                    <div className="space-y-4">
                      <div className="pb-4 border-b border-gray-200">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium text-gray-900">{t('governance.bangladeshFlood')}</div>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {t('governance.active')}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>{t('governance.deadline')}: 5 days</span>
                          <span>65% {t('governance.voted')}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                          {t('governance.voteNow')}
                        </button>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <div className="font-medium text-gray-900">{t('governance.refugeeSupport')}</div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {t('governance.passed')}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>{t('governance.votingEnded')}</span>
                          <span>82% {t('governance.approval')}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                        </div>
                        <button className="w-full py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm" disabled>
                          {t('governance.votingClosed')}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('governance.votingPower')}
                    </h3>
                    <div className="flex items-center mb-6">
                      <div className="mr-4">
                        <div className="text-2xl font-bold text-gray-900">1,240</div>
                        <div className="text-sm text-gray-600">{t('governance.yourVotes')}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>{t('governance.votingParticipation')}</span>
                          <span>78%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">{t('governance.eligibility')}</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{t('governance.holdTokens')}</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{t('governance.activeParticipation')}</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{t('governance.reputationScore')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('governance.votingMechanics')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-indigo-200">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">{t('governance.quadraticVoting')}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-indigo-200">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">{t('governance.delegation')}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-indigo-200">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                          </svg>
                      </div>
                      <p className="text-sm text-gray-700">{t('governance.transparency')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reputation' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('governance.smartReputationSystem')}
                </h2>
                <div className="overflow-x-auto mb-8">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('governance.member')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('governance.role')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('governance.reputationScore')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('governance.contributions')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('governance.actions')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reputation.map((member) => (
                        <tr key={member.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {member.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {member.role}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm text-gray-900 font-medium">{member.score}</div>
                              <div className="ml-2 w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-indigo-600 h-2 rounded-full" 
                                  style={{ width: `${member.score}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {member.contributions}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              {t('governance.viewProfile')}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('governance.reputationFactors')}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">{t('governance.proposalQuality')}</span>
                          <span className="text-gray-900 font-medium">25%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">{t('governance.votingParticipation')}</span>
                          <span className="text-gray-900 font-medium">30%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">{t('governance.communityEngagement')}</span>
                          <span className="text-gray-900 font-medium">20%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">{t('governance.verificationActivity')}</span>
                          <span className="text-gray-900 font-medium">25%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('governance.improveReputation')}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{t('governance.submitQualityProposals')}</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{t('governance.participateInVoting')}</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{t('governance.verifyProjects')}</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{t('governance.contributeToCommunity')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('governance.reputationBenefits')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="font-medium text-gray-900 mb-2">{t('governance.increasedVotingPower')}</div>
                      <div className="text-sm text-gray-600">{t('governance.higherReputation')}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="font-medium text-gray-900 mb-2">{t('governance.proposalPriority')}</div>
                      <div className="text-sm text-gray-600">{t('governance.priorityReview')}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="font-medium text-gray-900 mb-2">{t('governance.communityRecognition')}</div>
                      <div className="text-sm text-gray-600">{t('governance.recognitionBadges')}</div>
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

export default ImpactGovernanceDAO;