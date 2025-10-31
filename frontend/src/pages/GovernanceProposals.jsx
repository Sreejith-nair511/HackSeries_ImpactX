import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const GovernanceProposals = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('active');
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Mock proposals data
  const proposals = [
    {
      id: 'PROP-001',
      title: 'Emergency Flood Relief for Kerala',
      description: 'Request for immediate funding to provide emergency relief to flood-affected communities in Kerala. This proposal includes allocation of resources for food, shelter, and medical aid.',
      category: 'Disaster Response',
      proposer: 'Helping Hands Foundation',
      requestedAmount: 2500000,
      status: 'Active',
      votes: {
        yes: 42,
        no: 8,
        abstain: 3
      },
      deadline: '2023-07-15',
      createdAt: '2023-06-15',
      impact: '1,250 people sheltered'
    },
    {
      id: 'PROP-002',
      title: 'School Reconstruction in Odisha',
      description: 'Funding request for rebuilding schools damaged by cyclone in Odisha. The project aims to reconstruct 15 schools with improved disaster resilience.',
      category: 'Education',
      proposer: 'Education for All NGO',
      requestedAmount: 1800000,
      status: 'Voting',
      votes: {
        yes: 35,
        no: 12,
        abstain: 5
      },
      deadline: '2023-07-10',
      createdAt: '2023-06-10',
      impact: '15 schools rebuilt'
    },
    {
      id: 'PROP-003',
      title: 'Medical Camp Initiative in Assam',
      description: 'Proposal to set up mobile medical camps in remote areas of Assam to provide healthcare services to underserved communities affected by recent floods.',
      category: 'Healthcare',
      proposer: 'Healthcare Without Borders',
      requestedAmount: 1200000,
      status: 'Approved',
      votes: {
        yes: 51,
        no: 4,
        abstain: 2
      },
      deadline: '2023-06-30',
      createdAt: '2023-06-01',
      impact: '500 medical camps conducted'
    },
    {
      id: 'PROP-004',
      title: 'Disaster Preparedness Training',
      description: 'Request for funding community disaster preparedness training programs to educate communities on emergency response procedures and evacuation plans.',
      category: 'Training',
      proposer: 'Community Resilience Network',
      requestedAmount: 800000,
      status: 'Rejected',
      votes: {
        yes: 18,
        no: 35,
        abstain: 4
      },
      deadline: '2023-06-25',
      createdAt: '2023-06-05',
      impact: 'N/A'
    },
    {
      id: 'PROP-005',
      title: 'Early Warning System Implementation',
      description: 'Proposal to implement an advanced early warning system using IoT sensors and satellite data to predict and alert communities about potential disasters.',
      category: 'Technology',
      proposer: 'Tech for Good Initiative',
      requestedAmount: 3000000,
      status: 'Draft',
      votes: {
        yes: 0,
        no: 0,
        abstain: 0
      },
      deadline: '2023-08-01',
      createdAt: '2023-06-20',
      impact: 'N/A'
    }
  ];

  // Categories for filtering
  const categories = [
    'All',
    'Disaster Response',
    'Education',
    'Healthcare',
    'Training',
    'Technology',
    'Infrastructure',
    'Community Development'
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter proposals based on active tab and category
  const filteredProposals = proposals.filter(proposal => {
    const statusMatch = activeTab === 'all' || 
                       (activeTab === 'active' && (proposal.status === 'Active' || proposal.status === 'Voting')) ||
                       (activeTab === 'approved' && proposal.status === 'Approved') ||
                       (activeTab === 'rejected' && proposal.status === 'Rejected') ||
                       (activeTab === 'draft' && proposal.status === 'Draft');
    
    const categoryMatch = selectedCategory === 'All' || proposal.category === selectedCategory;
    
    return statusMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('governanceProposals.title')}</h1>
          <p className="mt-2 text-gray-600">{t('governanceProposals.description')}</p>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex space-x-3">
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {t('governanceProposals.createProposal')}
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              {t('governanceProposals.myProposals')}
            </button>
          </div>
          
          <div className="flex items-center">
            <label htmlFor="category-filter" className="mr-2 text-sm text-gray-700">
              {t('governanceProposals.filterBy')}:
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('active')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'active'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('governanceProposals.active')}
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'approved'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('governanceProposals.approved')}
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rejected'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('governanceProposals.rejected')}
            </button>
            <button
              onClick={() => setActiveTab('draft')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'draft'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('governanceProposals.draft')}
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('governanceProposals.all')}
            </button>
          </nav>
        </div>

        {/* Proposals List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('governanceProposals.proposal')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('governanceProposals.category')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('governanceProposals.proposer')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('governanceProposals.requestedAmount')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('governanceProposals.votes')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('governanceProposals.deadline')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('governanceProposals.status')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProposals.map((proposal) => (
                  <tr key={proposal.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedProposal(proposal)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{proposal.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{proposal.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {proposal.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {proposal.proposer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{proposal.requestedAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className="mr-2 text-green-600">{proposal.votes.yes}Y</span>
                        <span className="mr-2 text-red-600">{proposal.votes.no}N</span>
                        <span className="text-gray-600">{proposal.votes.abstain}A</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {proposal.deadline}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        proposal.status === 'Active' 
                          ? 'bg-blue-100 text-blue-800' 
                          : proposal.status === 'Voting' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : proposal.status === 'Approved' 
                              ? 'bg-green-100 text-green-800' 
                              : proposal.status === 'Rejected' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-gray-100 text-gray-800'
                      }`}>
                        {proposal.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{t('governanceProposals.proposalDetails')}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('governanceProposals.proposalId')}:</span>
                        <span className="font-medium">{selectedProposal.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('governanceProposals.proposer')}:</span>
                        <span className="font-medium">{selectedProposal.proposer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('governanceProposals.category')}:</span>
                        <span className="font-medium">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {selectedProposal.category}
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('governanceProposals.requestedAmount')}:</span>
                        <span className="font-medium">₹{selectedProposal.requestedAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('governanceProposals.createdAt')}:</span>
                        <span className="font-medium">{selectedProposal.createdAt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('governanceProposals.deadline')}:</span>
                        <span className="font-medium">{selectedProposal.deadline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('governanceProposals.status')}:</span>
                        <span className="font-medium">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            selectedProposal.status === 'Active' 
                              ? 'bg-blue-100 text-blue-800' 
                              : selectedProposal.status === 'Voting' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : selectedProposal.status === 'Approved' 
                                  ? 'bg-green-100 text-green-800' 
                                  : selectedProposal.status === 'Rejected' 
                                    ? 'bg-red-100 text-red-800' 
                                    : 'bg-gray-100 text-gray-800'
                          }`}>
                            {selectedProposal.status}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{t('governanceProposals.votingResults')}</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-green-700">{t('governanceProposals.yesVotes')}</span>
                          <span className="text-sm font-medium text-gray-700">{selectedProposal.votes.yes}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(selectedProposal.votes.yes / (selectedProposal.votes.yes + selectedProposal.votes.no + selectedProposal.votes.abstain)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-red-700">{t('governanceProposals.noVotes')}</span>
                          <span className="text-sm font-medium text-gray-700">{selectedProposal.votes.no}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full" 
                            style={{ width: `${(selectedProposal.votes.no / (selectedProposal.votes.yes + selectedProposal.votes.no + selectedProposal.votes.abstain)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{t('governanceProposals.abstainVotes')}</span>
                          <span className="text-sm font-medium text-gray-700">{selectedProposal.votes.abstain}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gray-600 h-2 rounded-full" 
                            style={{ width: `${(selectedProposal.votes.abstain / (selectedProposal.votes.yes + selectedProposal.votes.no + selectedProposal.votes.abstain)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">{t('governanceProposals.totalVotes')}</span>
                          <span className="text-sm font-medium text-gray-700">
                            {selectedProposal.votes.yes + selectedProposal.votes.no + selectedProposal.votes.abstain}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{t('governanceProposals.description')}</h4>
                  <p className="text-gray-600">{selectedProposal.description}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{t('governanceProposals.impact')}</h4>
                  <p className="text-gray-600">{selectedProposal.impact}</p>
                </div>
                
                {selectedProposal.status === 'Voting' && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{t('governanceProposals.castVote')}</h4>
                    <div className="flex space-x-3">
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        {t('governanceProposals.voteYes')}
                      </button>
                      <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                        {t('governanceProposals.voteNo')}
                      </button>
                      <button className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                        {t('governanceProposals.abstain')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Proposal Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{t('governanceProposals.createProposal')}</h3>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    {t('governanceProposals.proposalTitle')}
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={t('governanceProposals.enterTitle')}
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    {t('governanceProposals.category')}
                  </label>
                  <select
                    id="category"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {categories.filter(cat => cat !== 'All').map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    {t('governanceProposals.requestedAmount')}
                  </label>
                  <input
                    type="number"
                    id="amount"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={t('governanceProposals.enterAmount')}
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    {t('governanceProposals.description')}
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={t('governanceProposals.enterDescription')}
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                    {t('governanceProposals.votingDeadline')}
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {t('governanceProposals.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    {t('governanceProposals.submitProposal')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernanceProposals;