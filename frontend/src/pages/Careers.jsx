import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Careers = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('openings');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    experience: '',
    message: ''
  });

  const jobOpenings = [
    {
      id: 1,
      title: t('careers.blockchainEngineer'),
      department: t('careers.engineering'),
      location: t('careers.remote'),
      type: t('careers.fullTime'),
      description: t('careers.blockchainEngineerDesc'),
      requirements: [
        t('careers.requirement1'),
        t('careers.requirement2'),
        t('careers.requirement3')
      ]
    },
    {
      id: 2,
      title: t('careers.aiResearcher'),
      department: t('careers.research'),
      location: t('careers.bangalore'),
      type: t('careers.fullTime'),
      description: t('careers.aiResearcherDesc'),
      requirements: [
        t('careers.requirement4'),
        t('careers.requirement5'),
        t('careers.requirement6')
      ]
    },
    {
      id: 3,
      title: t('careers.frontendDeveloper'),
      department: t('careers.engineering'),
      location: t('careers.remote'),
      type: t('careers.contract'),
      description: t('careers.frontendDeveloperDesc'),
      requirements: [
        t('careers.requirement7'),
        t('careers.requirement8'),
        t('careers.requirement9')
      ]
    },
    {
      id: 4,
      title: t('careers.communityManager'),
      department: t('careers.operations'),
      location: t('careers.remote'),
      type: t('careers.partTime'),
      description: t('careers.communityManagerDesc'),
      requirements: [
        t('careers.requirement10'),
        t('careers.requirement11'),
        t('careers.requirement12')
      ]
    }
  ];

  const benefits = [
    {
      id: 1,
      title: t('careers.flexibleWork'),
      description: t('careers.flexibleWorkDesc')
    },
    {
      id: 2,
      title: t('careers.healthInsurance'),
      description: t('careers.healthInsuranceDesc')
    },
    {
      id: 3,
      title: t('careers.learningBudget'),
      description: t('careers.learningBudgetDesc')
    },
    {
      id: 4,
      title: t('careers.impactfulWork'),
      description: t('careers.impactfulWorkDesc')
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would send the data to a server
    alert(t('careers.applicationSubmitted'));
    setFormData({
      name: '',
      email: '',
      position: '',
      experience: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            {t('careers.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('careers.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('openings')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'openings'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('careers.openPositions')}
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'benefits'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('careers.benefits')}
              </button>
              <button
                onClick={() => setActiveTab('apply')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'apply'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('careers.applyNow')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'openings' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('careers.joinOurTeam')}
                </h2>
                <div className="space-y-6">
                  {jobOpenings.map((job) => (
                    <div key={job.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                              {job.department}
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {job.location}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {job.type}
                            </span>
                          </div>
                        </div>
                        <button className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                          {t('careers.apply')}
                        </button>
                      </div>
                      <p className="text-gray-600 mb-4">{job.description}</p>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">{t('careers.requirements')}:</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('careers.whyWorkWithUs')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {benefits.map((benefit) => (
                    <div key={benefit.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('careers.culture')}</h3>
                  <p className="text-gray-600">
                    {t('careers.cultureDesc')}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'apply' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('careers.submitApplication')}
                </h2>
                <form onSubmit={handleSubmit} className="max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('careers.name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('careers.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('careers.position')}
                      </label>
                      <select
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">{t('careers.selectPosition')}</option>
                        {jobOpenings.map(job => (
                          <option key={job.id} value={job.title}>{job.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('careers.experience')}
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">{t('careers.selectExperience')}</option>
                        <option value="0-1">{t('careers.experience01')}</option>
                        <option value="1-3">{t('careers.experience13')}</option>
                        <option value="3-5">{t('careers.experience35')}</option>
                        <option value="5+">{t('careers.experience5')}</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('careers.coverLetter')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder={t('careers.coverLetterPlaceholder')}
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {t('careers.submitApplication')}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t('careers.internships')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('careers.researchInternships')}</h3>
              <p className="text-gray-600">{t('careers.researchInternshipsDesc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('careers.engineeringInternships')}</h3>
              <p className="text-gray-600">{t('careers.engineeringInternshipsDesc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('careers.communityInternships')}</h3>
              <p className="text-gray-600">{t('careers.communityInternshipsDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;