import React from 'react';
import { useTranslation } from 'react-i18next';
import ResourceDeploymentTracker from '../components/ResourceDeploymentTracker';

const ResourceDeploymentTrackerPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('resourceDeployment.pageTitle')}
        </h1>
        <p className="text-gray-600">
          {t('resourceDeployment.pageDescription')}
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {t('resourceDeployment.aboutTitle')}
        </h2>
        <p className="text-gray-600 mb-4">
          {t('resourceDeployment.aboutDescription')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2">
              {t('resourceDeployment.benefit1Title')}
            </h3>
            <p className="text-blue-600 text-sm">
              {t('resourceDeployment.benefit1')}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-medium text-green-800 mb-2">
              {t('resourceDeployment.benefit2Title')}
            </h3>
            <p className="text-green-600 text-sm">
              {t('resourceDeployment.benefit2')}
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-medium text-yellow-800 mb-2">
              {t('resourceDeployment.benefit3Title')}
            </h3>
            <p className="text-yellow-600 text-sm">
              {t('resourceDeployment.benefit3')}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-medium text-purple-800 mb-2">
              {t('resourceDeployment.benefit4Title')}
            </h3>
            <p className="text-purple-600 text-sm">
              {t('resourceDeployment.benefit4')}
            </p>
          </div>
        </div>
      </div>
      
      <ResourceDeploymentTracker />
    </div>
  );
};

export default ResourceDeploymentTrackerPage;