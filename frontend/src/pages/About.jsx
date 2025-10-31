import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      id: 1,
      name: "Goodwell Sreejith S",
      role: t('about.founder'),
      bio: t('about.goodwellBio'),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      id: 2,
      name: "Vasudha",
      role: t('about.techLead'),
      bio: t('about.vasudhaBio'),
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      id: 3,
      name: "Nikhil",
      role: t('about.productManager'),
      bio: t('about.nikhilBio'),
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
    }
  ];

  const values = [
    {
      id: 1,
      title: t('about.transparency'),
      description: t('about.transparencyDesc'),
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
      )
    },
    {
      id: 2,
      title: t('about.accountability'),
      description: t('about.accountabilityDesc'),
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      )
    },
    {
      id: 3,
      title: t('about.innovation'),
      description: t('about.innovationDesc'),
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
      )
    },
    {
      id: 4,
      title: t('about.collaboration'),
      description: t('about.collaborationDesc'),
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            {t('about.subtitle')}
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                <div className="bg-indigo-100 rounded-full p-4">
                  <svg className="w-16 h-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div className="md:w-2/3 md:pl-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('about.missionTitle')}</h2>
                <p className="text-gray-600 text-lg">
                  {t('about.missionDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t('about.ourValues')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.id} className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t('about.meetTheTeam')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="mx-auto mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-indigo-100"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-indigo-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100 text-center">
            <p className="text-indigo-800 font-medium">
              {t('about.teamAttribution')} Goodwell Sreejith S, Vasudha, and Nikhil
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t('about.builtOnAlgorand')}
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 flex justify-center">
              <div className="bg-gray-100 rounded-lg p-4">
                <img 
                  src="https://algorand.com/assets/img/logos/algorand-full-logo.svg" 
                  alt="Algorand" 
                  className="h-16"
                />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <p className="text-gray-600 mb-4">
                {t('about.algorandDesc1')}
              </p>
              <p className="text-gray-600">
                {t('about.algorandDesc2')}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  {t('about.instantTransactions')}
                </span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  {t('about.zeroFees')}
                </span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  {t('about.ecoFriendly')}
                </span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  {t('about.scalable')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t('about.achievements')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">50+</div>
              <div className="text-gray-600">{t('about.countries')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">$25M+</div>
              <div className="text-gray-600">{t('about.aidDistributed')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">100K+</div>
              <div className="text-gray-600">{t('about.users')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">99.9%</div>
              <div className="text-gray-600">{t('about.transparency')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;    </div>
  );
};

export default About;