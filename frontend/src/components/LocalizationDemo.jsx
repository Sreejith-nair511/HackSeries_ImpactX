import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency, formatNumber, formatDate, formatPercentage, formatLargeNumber } from '../utils/localizationUtils';

const LocalizationDemo = () => {
  const { t, i18n } = useTranslation();
  const [currentLocale, setCurrentLocale] = useState(i18n.language);
  const [sampleData] = useState({
    amount: 12500000,
    population: 1380000000,
    date: new Date(),
    percentage: 75.5,
    largeNumber: 57800000
  });

  // Update locale when i18n language changes
  useEffect(() => {
    setCurrentLocale(i18n.language);
  }, [i18n.language]);

  // Format data based on current locale
  const formattedData = {
    currency: formatCurrency(sampleData.amount, currentLocale),
    population: formatNumber(sampleData.population, currentLocale),
    date: formatDate(sampleData.date, currentLocale),
    percentage: formatPercentage(sampleData.percentage, currentLocale),
    largeNumber: formatLargeNumber(sampleData.largeNumber, currentLocale)
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {t('home.localization_demo')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            {t('home.currency_formatting')}
          </h3>
          <p className="text-blue-700 dark:text-blue-300">
            {formattedData.currency}
          </p>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            {t('home.number_formatting')}
          </h3>
          <p className="text-green-700 dark:text-green-300">
            {formattedData.population}
          </p>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            {t('home.date_formatting')}
          </h3>
          <p className="text-yellow-700 dark:text-yellow-300">
            {formattedData.date}
          </p>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4">
          <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
            {t('home.percentage_formatting')}
          </h3>
          <p className="text-purple-700 dark:text-purple-300">
            {formattedData.percentage}
          </p>
        </div>
      </div>
      
      <div className="bg-indigo-50 dark:bg-indigo-900 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
          {t('home.large_number_formatting')}
        </h3>
        <p className="text-indigo-700 dark:text-indigo-300">
          {formattedData.largeNumber}
        </p>
      </div>
      
      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {t('home.current_locale')}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          {currentLocale}
        </p>
      </div>
    </div>
  );
};

export default LocalizationDemo;