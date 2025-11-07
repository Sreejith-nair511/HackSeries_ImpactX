import React from 'react';
import { useTranslation } from 'react-i18next';
import DisasterRecoveryTracker from '../components/DisasterRecoveryTracker';

const DisasterRecoveryTrackerPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('recoveryTracker.pageTitle')}
          </h1>
          <p className="text-gray-600">
            {t('recoveryTracker.pageDescription')}
          </p>
        </div>
        
        <DisasterRecoveryTracker />
        
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">
            {t('recoveryTracker.aboutTitle')}
          </h2>
          <p className="text-blue-700 mb-3">
            {t('recoveryTracker.aboutDescription')}
          </p>
          <ul className="list-disc pl-5 text-blue-700 space-y-1">
            <li>{t('recoveryTracker.benefit1')}</li>
            <li>{t('recoveryTracker.benefit2')}</li>
            <li>{t('recoveryTracker.benefit3')}</li>
            <li>{t('recoveryTracker.benefit4')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DisasterRecoveryTrackerPage;