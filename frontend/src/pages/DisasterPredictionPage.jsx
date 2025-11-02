import React from 'react';
import { useTranslation } from 'react-i18next';
import DisasterPrediction from '../components/DisasterPrediction';

const DisasterPredictionPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {t('disasterPrediction.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {t('disasterPrediction.description')}
        </p>
      </div>
      
      <DisasterPrediction />
      
      <div className="mt-8 bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
          {t('disasterPrediction.about.title')}
        </h2>
        <p className="text-blue-700 dark:text-blue-300 mb-4">
          {t('disasterPrediction.about.description')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-medium text-gray-800 dark:text-white mb-2">
              {t('disasterPrediction.about.howItWorks')}
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm space-y-1">
              <li>{t('disasterPrediction.about.step1')}</li>
              <li>{t('disasterPrediction.about.step2')}</li>
              <li>{t('disasterPrediction.about.step3')}</li>
              <li>{t('disasterPrediction.about.step4')}</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-medium text-gray-800 dark:text-white mb-2">
              {t('disasterPrediction.about.benefits')}
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm space-y-1">
              <li>{t('disasterPrediction.about.benefit1')}</li>
              <li>{t('disasterPrediction.about.benefit2')}</li>
              <li>{t('disasterPrediction.about.benefit3')}</li>
              <li>{t('disasterPrediction.about.benefit4')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterPredictionPage;