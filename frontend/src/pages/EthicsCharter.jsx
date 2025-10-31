import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const EthicsCharter = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('mission');
  const [expandedPrinciple, setExpandedPrinciple] = useState(null);

  // Core principles data
  const corePrinciples = [
    {
      id: 'principle-1',
      title: 'Transparency',
      description: 'We maintain complete openness in all our operations, funding allocation, and impact reporting.',
      details: `1. Open Source Code
All our platform code is open source and available for public review to ensure integrity and security.

2. Financial Transparency
Every transaction is recorded on the blockchain and can be verified through our Transparency Ledger.

3. Impact Reporting
We publish detailed quarterly impact reports showing how funds were used and what outcomes were achieved.

4. Decision Making
All governance decisions are documented and publicly accessible, showing how and why decisions were made.`
    },
    {
      id: 'principle-2',
      title: 'Accountability',
      description: 'We are responsible for our actions and their consequences in achieving our humanitarian mission.',
      details: `1. Responsibility
We take full responsibility for the outcomes of our programs and initiatives.

2. Answerability
We provide clear answers to stakeholders about our actions and decisions.

3. Liability
We accept liability for our mistakes and work to correct them promptly.

4. Enforcement
We have mechanisms in place to ensure accountability is maintained at all levels of our organization.`
    },
    {
      id: 'principle-3',
      title: 'Inclusivity',
      description: 'We ensure that all voices are heard and that our platform serves all communities equitably.',
      details: `1. Equal Access
Our platform is accessible to all humanitarian organizations regardless of size or resources.

2. Cultural Sensitivity
We respect and accommodate cultural differences in all our operations.

3. Community Engagement
We actively engage with communities to understand their needs and priorities.

4. Non-Discrimination
We do not discriminate based on race, gender, religion, nationality, or any other characteristic.`
    },
    {
      id: 'principle-4',
      title: 'Integrity',
      description: 'We act with honesty and uphold the highest ethical standards in all our activities.',
      details: `1. Honesty
We are truthful in all our communications and representations.

2. Ethical Conduct
We adhere to the highest ethical standards in all our operations.

3. Conflict of Interest
We avoid conflicts of interest and disclose any potential conflicts transparently.

4. Professionalism
We maintain professional standards in all our interactions and activities.`
    },
    {
      id: 'principle-5',
      title: 'Impact Focus',
      description: 'We prioritize measurable, positive impact for communities affected by disasters.',
      details: `1. Evidence-Based
All our interventions are based on evidence and best practices.

2. Measurable Outcomes
We set clear, measurable goals and track our progress toward achieving them.

3. Sustainable Impact
We focus on creating long-term, sustainable impact rather than short-term relief.

4. Community-Centered
Our impact focus is centered on the needs and priorities of affected communities.`
    }
  ];

  // Governance structure data
  const governanceStructure = [
    {
      role: 'DAO Members',
      count: '1,247',
      responsibility: 'Participate in governance decisions, vote on proposals, and oversee platform operations.',
      election: 'Elected annually by token holders'
    },
    {
      role: 'Governance Council',
      count: '15',
      responsibility: 'Oversee day-to-day governance, propose policy changes, and mediate disputes.',
      election: 'Elected by DAO members'
    },
    {
      role: 'Technical Committee',
      count: '8',
      responsibility: 'Manage technical development, security audits, and infrastructure maintenance.',
      election: 'Appointed by Governance Council'
    },
    {
      role: 'Ethics Board',
      count: '7',
      responsibility: 'Ensure adherence to ethical principles and investigate violations.',
      election: 'Appointed by DAO members'
    }
  ];

  // Decision making process
  const decisionProcess = [
    {
      step: 1,
      title: 'Proposal Submission',
      description: 'Any DAO member can submit a proposal for consideration.',
      timeframe: 'Ongoing'
    },
    {
      step: 2,
      title: 'Community Review',
      description: 'Proposals are reviewed and discussed by the community for 7 days.',
      timeframe: '7 days'
    },
    {
      step: 3,
      title: 'Governance Council Review',
      description: 'The Governance Council evaluates the proposal and provides recommendations.',
      timeframe: '3 days'
    },
    {
      step: 4,
      title: 'Voting Period',
      description: 'DAO members vote on the proposal for 5 days.',
      timeframe: '5 days'
    },
    {
      step: 5,
      title: 'Implementation',
      description: 'Approved proposals are implemented according to the specified timeline.',
      timeframe: 'As specified'
    }
  ];

  const togglePrinciple = (principleId) => {
    setExpandedPrinciple(expandedPrinciple === principleId ? null : principleId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('charter.title')}</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('charter.description')}
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl shadow-lg p-8 mb-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{t('charter.mission.title')}</h2>
            <p className="text-xl mb-6">{t('charter.mission.statement')}</p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-medium">{t('charter.mission.commitment')}:</span> {t('charter.mission.commitmentValue')}
              </div>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-medium">{t('charter.mission.vision')}:</span> {t('charter.mission.visionValue')}
              </div>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-medium">{t('charter.mission.approach')}:</span> {t('charter.mission.approachValue')}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap -mb-px">
              <button
                onClick={() => setActiveSection('mission')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeSection === 'mission'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('charter.sections.mission')}
              </button>
              <button
                onClick={() => setActiveSection('principles')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeSection === 'principles'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('charter.sections.principles')}
              </button>
              <button
                onClick={() => setActiveSection('governance')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeSection === 'governance'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('charter.sections.governance')}
              </button>
              <button
                onClick={() => setActiveSection('process')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeSection === 'process'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('charter.sections.process')}
              </button>
              <button
                onClick={() => setActiveSection('responsibilities')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeSection === 'responsibilities'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('charter.sections.responsibilities')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Mission Section */}
            {activeSection === 'mission' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('charter.mission.coreValues')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                  {corePrinciples.map((principle) => (
                    <div key={principle.id} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{principle.title}</h3>
                      <p className="text-gray-600 text-sm">{principle.description}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        {t('charter.mission.note')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('charter.mission.ethicalStandards')}</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.mission.standard1')}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.mission.standard2')}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.mission.standard3')}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.mission.standard4')}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('charter.mission.commitments')}</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-indigo-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.mission.commitment1')}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-indigo-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.mission.commitment2')}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-indigo-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.mission.commitment3')}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-indigo-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.mission.commitment4')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Principles Section */}
            {activeSection === 'principles' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('charter.principles.title')}</h2>
                <div className="space-y-4">
                  {corePrinciples.map((principle) => (
                    <div key={principle.id} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => togglePrinciple(principle.id)}
                        className="w-full flex justify-between items-center p-5 text-left"
                      >
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{principle.title}</h3>
                          <p className="text-gray-600 mt-1">{principle.description}</p>
                        </div>
                        <svg 
                          className={`w-5 h-5 text-gray-500 transform transition-transform ${expandedPrinciple === principle.id ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {expandedPrinciple === principle.id && (
                        <div className="px-5 pb-5 border-t border-gray-200 pt-4">
                          <pre className="whitespace-pre-wrap text-sm text-gray-700">
                            {principle.details}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Governance Section */}
            {activeSection === 'governance' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('charter.governance.title')}</h2>
                <div className="mb-8">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">{t('charter.governance.structure')}</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('charter.governance.role')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('charter.governance.count')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('charter.governance.responsibility')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('charter.governance.election')}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {governanceStructure.map((role, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {role.role}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {role.count}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {role.responsibility}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {role.election}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-medium text-gray-900 mb-4">{t('charter.governance.participation')}</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.governance.participation1')}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.governance.participation2')}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.governance.participation3')}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-medium text-gray-900 mb-4">{t('charter.governance.transparency')}</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.governance.transparency1')}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.governance.transparency2')}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.governance.transparency3')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Process Section */}
            {activeSection === 'process' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('charter.process.title')}</h2>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 transform translate-x-1/2"></div>
                  
                  <div className="space-y-8 pl-12">
                    {decisionProcess.map((step) => (
                      <div key={step.step} className="relative">
                        {/* Step number circle */}
                        <div className="absolute left-[-34px] top-0 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                          {step.step}
                        </div>
                        
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-medium text-gray-900">{step.title}</h3>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              {step.timeframe}
                            </span>
                          </div>
                          <p className="mt-2 text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Responsibilities Section */}
            {activeSection === 'responsibilities' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('charter.responsibilities.title')}</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-lg p-6">
                    <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {t('charter.responsibilities.community')}
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-indigo-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.responsibilities.community1')}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-indigo-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.responsibilities.community2')}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-indigo-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.responsibilities.community3')}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-100 rounded-lg p-6">
                    <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      {t('charter.responsibilities.security')}
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.responsibilities.security1')}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.responsibilities.security2')}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{t('charter.responsibilities.security3')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    {t('charter.responsibilities.innovation')}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-purple-500 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-3 text-gray-700">{t('charter.responsibilities.innovation1')}</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-purple-500 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-3 text-gray-700">{t('charter.responsibilities.innovation2')}</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-purple-500 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-3 text-gray-700">{t('charter.responsibilities.innovation3')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('charter.documentation')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('charter.docs.charter')}</h3>
              <p className="text-gray-600 mb-4">{t('charter.docs.charterDesc')}</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('charter.download')}
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('charter.docs.governance')}</h3>
              <p className="text-gray-600 mb-4">{t('charter.docs.governanceDesc')}</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('charter.read')}
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('charter.docs.ethics')}</h3>
              <p className="text-gray-600 mb-4">{t('charter.docs.ethicsDesc')}</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('charter.explore')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthicsCharter;