import React from 'react';
import { useTranslation } from 'react-i18next';
import IVRSimulator from '../components/IVRSimulator';

const IVRSystem = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            {t('ivrSystem.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('ivrSystem.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <IVRSimulator />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('ivrSystem.features')}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-500 text-white">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{t('ivrSystem.feature1Title')}</h3>
                      <p className="mt-2 text-gray-600">
                        {t('ivrSystem.feature1Desc')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-500 text-white">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{t('ivrSystem.feature2Title')}</h3>
                      <p className="mt-2 text-gray-600">
                        {t('ivrSystem.feature2Desc')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-500 text-white">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{t('ivrSystem.feature3Title')}</h3>
                      <p className="mt-2 text-gray-600">
                        {t('ivrSystem.feature3Desc')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-500 text-white">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{t('ivrSystem.feature4Title')}</h3>
                      <p className="mt-2 text-gray-600">
                        {t('ivrSystem.feature4Desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-indigo-50 rounded-lg p-6 border border-indigo-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('ivrSystem.technicalOverview')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('ivrSystem.technicalDesc')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h3 className="font-semibold text-gray-900 mb-2">{t('ivrSystem.integration')}</h3>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>{t('ivrSystem.integration1')}</li>
                    <li>{t('ivrSystem.integration2')}</li>
                    <li>{t('ivrSystem.integration3')}</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h3 className="font-semibold text-gray-900 mb-2">{t('ivrSystem.scalability')}</h3>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>{t('ivrSystem.scalability1')}</li>
                    <li>{t('ivrSystem.scalability2')}</li>
                    <li>{t('ivrSystem.scalability3')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IVRSystem;import React from 'react';
import { useTranslation } from 'react-i18next';
import IVRSimulator from '../components/IVRSimulator';

const IVRSystem = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            {t('ivrSystem.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('ivrSystem.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <IVRSimulator />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('ivrSystem.features')}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-500 text-white">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{t('ivrSystem.feature1Title')}</h3>
                      <p className="mt-2 text-gray-600">
                        {t('ivrSystem.feature1Desc')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-500 text-white">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{t('ivrSystem.feature2Title')}</h3>
                      <p className="mt-2 text-gray-600">
                        {t('ivrSystem.feature2Desc')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-500 text-white">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{t('ivrSystem.feature3Title')}</h3>
                      <p className="mt-2 text-gray-600">
                        {t('ivrSystem.feature3Desc')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-500 text-white">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{t('ivrSystem.feature4Title')}</h3>
                      <p className="mt-2 text-gray-600">
                        {t('ivrSystem.feature4Desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-indigo-50 rounded-lg p-6 border border-indigo-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('ivrSystem.technicalOverview')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('ivrSystem.technicalDesc')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h3 className="font-semibold text-gray-900 mb-2">{t('ivrSystem.integration')}</h3>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>{t('ivrSystem.integration1')}</li>
                    <li>{t('ivrSystem.integration2')}</li>
                    <li>{t('ivrSystem.integration3')}</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h3 className="font-semibold text-gray-900 mb-2">{t('ivrSystem.scalability')}</h3>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>{t('ivrSystem.scalability1')}</li>
                    <li>{t('ivrSystem.scalability2')}</li>
                    <li>{t('ivrSystem.scalability3')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IVRSystem;