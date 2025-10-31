import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FutureRoadmap = () => {
  const { t } = useTranslation();
  const [activeYear, setActiveYear] = useState('2025');

  const roadmapData = {
    '2025': [
      {
        id: 1,
        quarter: "Q1",
        title: "AI Verification Enhancement",
        description: "Improve satellite imagery analysis accuracy and integrate drone verification",
        status: "In Progress",
        progress: 65
      },
      {
        id: 2,
        quarter: "Q1",
        title: "Mobile App Launch",
        description: "Release iOS and Android applications for field workers",
        status: "Planning",
        progress: 20
      },
      {
        id: 3,
        quarter: "Q2",
        title: "CBDC Integration",
        description: "Pilot program with RBI Digital Rupee for government aid",
        status: "Research",
        progress: 10
      },
      {
        id: 4,
        quarter: "Q2",
        title: "IoT Sensor Network",
        description: "Deploy environmental sensors in high-risk regions",
        status: "Planning",
        progress: 5
      },
      {
        id: 5,
        quarter: "Q3",
        title: "Cross-Chain Bridge",
        description: "Enable interoperability with Ethereum and Solana",
        status: "Research",
        progress: 15
      },
      {
        id: 6,
        quarter: "Q4",
        title: "Governance 2.0",
        description: "Advanced DAO features with quadratic voting",
        status: "Planning",
        progress: 0
      }
    ],
    '2026': [
      {
        id: 7,
        quarter: "Q1",
        title: "Predictive Analytics",
        description: "ML models for disaster prediction and resource allocation",
        status: "Planning",
        progress: 0
      },
      {
        id: 8,
        quarter: "Q2",
        title: "AR Damage Assessment",
        description: "Augmented reality tools for field assessment",
        status: "Research",
        progress: 0
      },
      {
        id: 9,
        quarter: "Q3",
        title: "Autonomous Aid Delivery",
        description: "Drone-based delivery systems for remote areas",
        status: "Research",
        progress: 0
      },
      {
        id: 10,
        quarter: "Q4",
        title: "Global Expansion",
        description: "Launch in 10 additional countries",
        status: "Planning",
        progress: 0
      }
    ],
    '2027': [
      {
        id: 11,
        quarter: "Q2",
        title: "Neural Interface Pilot",
        description: "Brain-computer interface for disabled disaster victims",
        status: "Concept",
        progress: 0
      },
      {
        id: 12,
        quarter: "Q4",
        title: "Quantum Verification",
        description: "Quantum computing for fraud detection",
        status: "Research",
        progress: 0
      }
    ]
  };

  const milestones = [
    {
      id: 1,
      title: "1M Users",
      description: "Reach 1 million registered users across all platforms",
      targetDate: "Q2 2025",
      achieved: false
    },
    {
      id: 2,
      title: "100M Aid Distributed",
      description: "Distribute $100 million in verified aid",
      targetDate: "Q4 2025",
      achieved: false
    },
    {
      id: 3,
      title: "50 Countries",
      description: "Operate in 50 countries worldwide",
      targetDate: "Q3 2026",
      achieved: false
    },
    {
      id: 4,
      title: "Zero Fraud",
      description: "Achieve zero verified fraud cases through AI detection",
      targetDate: "Q1 2027",
      achieved: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            {t('roadmap.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('roadmap.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.keys(roadmapData).map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-6 py-3 rounded-full font-medium ${
                  activeYear === year
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-indigo-200 transform translate-x-1/2"></div>
            
            <div className="space-y-12">
              {roadmapData[activeYear].map((item, index) => (
                <div key={item.id} className="relative flex items-start">
                  <div className="absolute left-6 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center z-10">
                    <span className="text-white text-sm font-bold">{item.quarter}</span>
                  </div>
                  <div className="ml-16 bg-gray-50 rounded-lg p-6 border border-gray-200 w-full">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.status === 'In Progress' 
                          ? 'bg-blue-100 text-blue-800' 
                          : item.status === 'Planning' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : item.status === 'Research' 
                              ? 'bg-purple-100 text-purple-800' 
                              : item.status === 'Concept' 
                                ? 'bg-gray-100 text-gray-800' 
                                : 'bg-green-100 text-green-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{t('roadmap.progress')}</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t('roadmap.keyMilestones')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="border border-gray-200 rounded-lg p-6 text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  milestone.achieved ? 'bg-green-100' : 'bg-indigo-100'
                }`}>
                  {milestone.achieved ? (
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                <p className="text-gray-600 mb-4">{milestone.description}</p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  milestone.achieved 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {milestone.targetDate}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t('roadmap.communityInvolvement')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('roadmap.feedback')}</h3>
              <p className="text-gray-600">{t('roadmap.feedbackDesc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('roadmap.contributions')}</h3>
              <p className="text-gray-600">{t('roadmap.contributionsDesc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('roadmap.voting')}</h3>
              <p className="text-gray-600">{t('roadmap.votingDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureRoadmap;