import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Governance = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('proposals');
  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: 'Increase Funding for Flood Relief Operations',
      description: 'Proposal to allocate additional funds for flood response in affected regions',
      status: 'active',
      votesFor: 12450,
      votesAgainst: 3200,
      endDate: '2023-11-15',
      proposer: 'Disaster Response Committee',
      quorum: 75,
      participation: 68
    },
    {
      id: 2,
      title: 'Add New Regional Coordinator for Southern India',
      description: 'Proposal to appoint a new regional coordinator to manage operations in Southern India',
      status: 'passed',
      votesFor: 8900,
      votesAgainst: 1200,
      endDate: '2023-10-30',
      proposer: 'Governance Council',
      quorum: 75,
      participation: 82
    },
    {
      id: 3,
      title: 'Update Volunteer Verification Process',
      description: 'Proposal to implement a new verification system for volunteers',
      status: 'rejected',
      votesFor: 4200,
      votesAgainst: 6800,
      endDate: '2023-10-25',
      proposer: 'Volunteer Coordination Team',
      quorum: 75,
      participation: 55
    }
  ]);
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    duration: 7
  });

  const handleProposalChange = (e) => {
    const { name, value } = e.target;
    setNewProposal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProposalSubmit = (e) => {
    e.preventDefault();
    const proposal = {
      id: proposals.length + 1,
      title: newProposal.title,
      description: newProposal.description,
      status: 'active',
      votesFor: 0,
      votesAgainst: 0,
      endDate: new Date(Date.now() + newProposal.duration * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      proposer: 'You',
      quorum: 75,
      participation: 0
    };
    setProposals([proposal, ...proposals]);
    setNewProposal({ title: '', description: '', duration: 7 });
    alert(t('governance.proposalSubmitted'));
  };

  const handleVote = (proposalId, vote) => {
    setProposals(proposals.map(proposal => {
      if (proposal.id === proposalId) {
        return {
          ...proposal,
          votesFor: vote === 'for' ? proposal.votesFor + 1 : proposal.votesFor,
          votesAgainst: vote === 'against' ? proposal.votesAgainst + 1 : proposal.votesAgainst
        };
      }
      return proposal;
    }));
    alert(t('governance.voteRecorded'));
  };

  return (
    <div className="governance-container">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{t('governance.title')}</h1>
        <p className="text-gray-600 mb-8">{t('governance.subtitle')}</p>

        {/* Governance Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('governance.howItWorks')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-5">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">{t('governance.proposeTitle')}</h3>
              <p className="text-gray-600">{t('governance.proposeDescription')}</p>
            </div>
            <div className="border rounded-lg p-5">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">{t('governance.voteTitle')}</h3>
              <p className="text-gray-600">{t('governance.voteDescription')}</p>
            </div>
            <div className="border rounded-lg p-5">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">{t('governance.executeTitle')}</h3>
              <p className="text-gray-600">{t('governance.executeDescription')}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b">
          <nav className="flex space-x-8">
            <button
              className={`py-2 px-1 font-medium text-sm ${activeTab === 'proposals' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('proposals')}
            >
              {t('governance.proposals')}
            </button>
            <button
              className={`py-2 px-1 font-medium text-sm ${activeTab === 'create' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('create')}
            >
              {t('governance.createProposal')}
            </button>
            <button
              className={`py-2 px-1 font-medium text-sm ${activeTab === 'info' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('info')}
            >
              {t('governance.governanceInfo')}
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'proposals' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('governance.activeProposals')}</h2>
              <div className="space-y-6">
                {proposals.map(proposal => (
                  <div key={proposal.id} className="border border-gray-200 rounded-lg p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-medium">{proposal.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{t('governance.proposedBy')} {proposal.proposer}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        proposal.status === 'passed' ? 'bg-green-100 text-green-800' :
                        proposal.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {proposal.status === 'passed' ? t('governance.passed') :
                         proposal.status === 'rejected' ? t('governance.rejected') :
                         t('governance.active')}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{proposal.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t('governance.votesFor')}</span>
                          <span>{proposal.votesFor.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100 || 0}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t('governance.votesAgainst')}</span>
                          <span>{proposal.votesAgainst.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full" 
                            style={{ width: `${(proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst)) * 100 || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-between">
                      <div className="text-sm text-gray-600 mb-2 md:mb-0">
                        <span>{t('governance.endDate')}: {proposal.endDate}</span>
                        <span className="mx-2">•</span>
                        <span>{t('governance.participation')}: {proposal.participation}%</span>
                        <span className="mx-2">•</span>
                        <span>{t('governance.quorum')}: {proposal.quorum}%</span>
                      </div>
                      
                      {proposal.status === 'active' && (
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => handleVote(proposal.id, 'for')}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                          >
                            {t('governance.voteFor')}
                          </button>
                          <button 
                            onClick={() => handleVote(proposal.id, 'against')}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                          >
                            {t('governance.voteAgainst')}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('governance.createNewProposal')}</h2>
              <form onSubmit={handleProposalSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('governance.proposalTitle')}
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newProposal.title}
                    onChange={handleProposalChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('governance.proposalDescription')}
                  </label>
                  <textarea
                    name="description"
                    value={newProposal.description}
                    onChange={handleProposalChange}
                    rows="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('governance.votingDuration')}
                  </label>
                  <select
                    name="duration"
                    value={newProposal.duration}
                    onChange={handleProposalChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="3">{t('governance.days', { count: 3 })}</option>
                    <option value="7">{t('governance.days', { count: 7 })}</option>
                    <option value="14">{t('governance.days', { count: 14 })}</option>
                    <option value="30">{t('governance.days', { count: 30 })}</option>
                  </select>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                  >
                    {t('governance.submitProposal')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'info' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('governance.decentralizedGovernance')}</h2>
              <div className="prose max-w-none">
                <h3 className="text-xl font-medium mt-6 mb-3">{t('governance.principlesTitle')}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('governance.principleTransparency')}</li>
                  <li>{t('governance.principleParticipation')}</li>
                  <li>{t('governance.principleAccountability')}</li>
                  <li>{t('governance.principleInclusivity')}</li>
                  <li>{t('governance.principleEffectiveness')}</li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-3">{t('governance.votingMechanismTitle')}</h3>
                <p>{t('governance.votingMechanismDescription')}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{t('governance.tokenBasedVoting')}</h4>
                    <p className="text-sm text-gray-600">{t('governance.tokenBasedVotingDescription')}</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{t('governance.quadraticVoting')}</h4>
                    <p className="text-sm text-gray-600">{t('governance.quadraticVotingDescription')}</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{t('governance.delegatedVoting')}</h4>
                    <p className="text-sm text-gray-600">{t('governance.delegatedVotingDescription')}</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{t('governance.timeWeightedVoting')}</h4>
                    <p className="text-sm text-gray-600">{t('governance.timeWeightedVotingDescription')}</p>
                  </div>
                </div>

                <h3 className="text-xl font-medium mt-6 mb-3">{t('governance.proposalCategoriesTitle')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{t('governance.fundingProposals')}</h4>
                    <p className="text-sm text-gray-600">{t('governance.fundingProposalsDescription')}</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{t('governance.governanceProposals')}</h4>
                    <p className="text-sm text-gray-600">{t('governance.governanceProposalsDescription')}</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{t('governance.parameterProposals')}</h4>
                    <p className="text-sm text-gray-600">{t('governance.parameterProposalsDescription')}</p>
                  </div>
                </div>

                <h3 className="text-xl font-medium mt-6 mb-3">{t('governance.governanceStructureTitle')}</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">{t('governance.tokenHolders')}</h4>
                    <p className="text-sm text-gray-600">{t('governance.tokenHoldersDescription')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">{t('governance.governanceCouncil')}</h4>
                    <p className="text-sm text-gray-600">{t('governance.governanceCouncilDescription')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">{t('governance.advisoryBoard')}</h4>
                    <p className="text-sm text-gray-600">{t('governance.advisoryBoardDescription')}</p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">{t('governance.getInvolvedTitle')}</h4>
                  <p className="text-blue-700">{t('governance.getInvolvedDescription')}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href="#" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                      {t('governance.joinCommunity')}
                    </a>
                    <a href="#" className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition duration-300">
                      {t('governance.readWhitepaper')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Governance;