import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const InnovationLab = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('experiments');

  const experiments = [
    {
      id: 1,
      title: "AI Ethics Framework",
      description: "Developing ethical guidelines for AI-driven disaster response decision making",
      status: "Active",
      progress: 75
    },
    {
      id: 2,
      title: "Advanced IoT Sensors",
      description: "Testing next-generation environmental sensors for early warning systems",
      status: "Pilot",
      progress: 40
    },
    {
      id: 3,
      title: "Drone Swarm Coordination",
      description: "Researching autonomous drone formations for rapid damage assessment",
      status: "Research",
      progress: 20
    }
  ];

  const publications = [
    {
      id: 1,
      title: "Blockchain-Based Transparency in Disaster Relief",
      authors: "Team ImpactX",
      journal: "Journal of Humanitarian Technology",
      date: "2024",
      link: "#"
    },
    {
      id: 2,
      title: "AI-Powered Risk Assessment Models",
      authors: "Team ImpactX, MIT Disaster Research Group",
      journal: "AI for Social Good",
      date: "2024",
      link: "#"
    },
    {
      id: 3,
      title: "Decentralized Verification Systems",
      authors: "Team ImpactX, Stanford Blockchain Lab",
      journal: "Distributed Systems Review",
      date: "2023",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            {t('innovationLab.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('innovationLab.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('experiments')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'experiments'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('innovationLab.experiments')}
              </button>
              <button
                onClick={() => setActiveTab('publications')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'publications'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('innovationLab.publications')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'experiments' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('innovationLab.currentExperiments')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {experiments.map((experiment) => (
                    <div key={experiment.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{experiment.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          experiment.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : experiment.status === 'Pilot' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-blue-100 text-blue-800'
                        }`}>
                          {experiment.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{experiment.description}</p>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>{t('innovationLab.progress')}</span>
                          <span>{experiment.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full" 
                            style={{ width: `${experiment.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'publications' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('innovationLab.researchPublications')}
                </h2>
                <div className="space-y-6">
                  {publications.map((publication) => (
                    <div key={publication.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{publication.title}</h3>
                      <p className="text-gray-600 mb-2">{publication.authors}</p>
                      <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
                        <span className="mr-4">{publication.journal}</span>
                        <span>{publication.date}</span>
                      </div>
                      <a 
                        href={publication.link} 
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        {t('innovationLab.readPaper')}
                        <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('innovationLab.collaboration')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('innovationLab.researchPartners')}</h3>
              <p className="text-gray-600">{t('innovationLab.researchPartnersDesc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('innovationLab.ethicsBoard')}</h3>
              <p className="text-gray-600">{t('innovationLab.ethicsBoardDesc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('innovationLab.openSource')}</h3>
              <p className="text-gray-600">{t('innovationLab.openSourceDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationLab;