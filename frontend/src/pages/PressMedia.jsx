import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const PressMedia = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('news');

  const newsArticles = [
    {
      id: 1,
      title: t('press.featuredInTechCrunch'),
      source: "TechCrunch",
      date: "2024-03-15",
      excerpt: t('press.techCrunchExcerpt'),
      link: "#"
    },
    {
      id: 2,
      title: t('press.blockchainForGoodAward'),
      source: "Forbes",
      date: "2024-02-28",
      excerpt: t('press.forbesExcerpt'),
      link: "#"
    },
    {
      id: 3,
      title: t('press.unPartnershipAnnounced'),
      source: "UN News",
      date: "2024-01-10",
      excerpt: t('press.unExcerpt'),
      link: "#"
    }
  ];

  const mediaAssets = [
    {
      id: 1,
      title: t('press.logoPackage'),
      format: "ZIP",
      size: "2.4 MB",
      description: t('press.logoPackageDesc'),
      link: "#"
    },
    {
      id: 2,
      title: t('press.brandGuidelines'),
      format: "PDF",
      size: "1.8 MB",
      description: t('press.brandGuidelinesDesc'),
      link: "#"
    },
    {
      id: 3,
      title: t('press.productScreenshots'),
      format: "ZIP",
      size: "15.2 MB",
      description: t('press.screenshotsDesc'),
      link: "#"
    },
    {
      id: 4,
      title: t('press.foundersPhotos'),
      format: "ZIP",
      size: "8.7 MB",
      description: t('press.foundersPhotosDesc'),
      link: "#"
    }
  ];

  const pressContacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: t('press.pressLead'),
      email: "press@impactx.org",
      phone: "+1 (555) 123-4567"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: t('press.communicationsManager'),
      email: "media@impactx.org",
      phone: "+1 (555) 987-6543"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            {t('press.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('press.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('news')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'news'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('press.news')}
              </button>
              <button
                onClick={() => setActiveTab('assets')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'assets'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('press.mediaAssets')}
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'contact'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('press.contact')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'news' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('press.latestNews')}
                </h2>
                <div className="space-y-6">
                  {newsArticles.map((article) => (
                    <div key={article.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 md:mb-0">{article.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                            {article.source}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                            {article.date}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <a 
                        href={article.link} 
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        {t('press.readFullArticle')}
                        <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'assets' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('press.downloadAssets')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mediaAssets.map((asset) => (
                    <div key={asset.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{asset.title}</h3>
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                          {asset.format}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{asset.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-500">{asset.size}</span>
                        <a 
                          href={asset.link} 
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                        >
                          {t('press.download')}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('press.pressInquiries')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {pressContacts.map((contact) => (
                    <div key={contact.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{contact.name}</h3>
                      <p className="text-indigo-600 mb-3">{contact.role}</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                          <span className="text-gray-600">{contact.email}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                          <span className="text-gray-600">{contact.phone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('press.pressKitRequest')}
                  </h3>
                  <form className="max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="mediaName" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('press.mediaOutlet')}
                        </label>
                        <input
                          type="text"
                          id="mediaName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder={t('press.mediaOutletPlaceholder')}
                        />
                      </div>
                      <div>
                        <label htmlFor="journalistName" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('press.journalistName')}
                        </label>
                        <input
                          type="text"
                          id="journalistName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder={t('press.journalistNamePlaceholder')}
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('press.inquiryDetails')}
                      </label>
                      <textarea
                        id="message"
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder={t('press.inquiryDetailsPlaceholder')}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      {t('press.requestPressKit')}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t('press.brandUsage')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('press.brandGuidelines')}</h3>
              <p className="text-gray-600 mb-4">{t('press.brandGuidelinesInfo')}</p>
              <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('press.viewGuidelines')}
              </a>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('press.correctUsage')}</h3>
              <p className="text-gray-600 mb-4">{t('press.correctUsageInfo')}</p>
              <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('press.seeExamples')}
              </a>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('press.incorrectUsage')}</h3>
              <p className="text-gray-600 mb-4">{t('press.incorrectUsageInfo')}</p>
              <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('press.avoidExamples')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressMedia;