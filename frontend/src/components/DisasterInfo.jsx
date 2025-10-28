import { useTranslation } from 'react-i18next';

const DisasterInfo = () => {
  const { t } = useTranslation();
  
  const disasterInfo = [
    {
      type: t('home.disaster_flood'),
      icon: "🌊",
      description: t('home.disaster_flood_desc'),
      regions: ["Kerala", "Assam", "Bihar", "Uttar Pradesh"],
      frequency: t('home.disaster_high'),
      impact: t('home.disaster_severe')
    },
    {
      type: t('home.disaster_earthquake'),
      icon: " earthqua ke",
      description: t('home.disaster_earthquake_desc'),
      regions: ["Himalayan Region", "North-East", "Gujarat", "Bihar"],
      frequency: t('home.disaster_medium'),
      impact: t('home.disaster_severe')
    },
    {
      type: t('home.disaster_cyclone'),
      icon: "🌀",
      description: t('home.disaster_cyclone_desc'),
      regions: ["Odisha", "West Bengal", "Andhra Pradesh", "Tamil Nadu"],
      frequency: t('home.disaster_high'),
      impact: t('home.disaster_severe')
    },
    {
      type: t('home.disaster_drought'),
      icon: "🏜️",
      description: t('home.disaster_drought_desc'),
      regions: ["Rajasthan", "Maharashtra", "Karnataka", "Andhra Pradesh"],
      frequency: t('home.disaster_medium'),
      impact: t('home.disaster_moderate')
    },
    {
      type: t('home.disaster_landslide'),
      icon: "⛰️",
      description: t('home.disaster_landslide_desc'),
      regions: ["Himalayan Region", "Western Ghats", "North-East"],
      frequency: t('home.disaster_low'),
      impact: t('home.disaster_moderate')
    },
    {
      type: t('home.disaster_fire'),
      icon: "🔥",
      description: t('home.disaster_fire_desc'),
      regions: ["Himachal Pradesh", "Uttarakhand", "Madhya Pradesh", "Odisha"],
      frequency: t('home.disaster_medium'),
      impact: t('home.disaster_moderate')
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t('home.india_disaster_info')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {disasterInfo.map((disaster, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <span className="text-3xl mr-3">{disaster.icon}</span>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{disaster.type}</h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{disaster.description}</p>
            
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">{t('home.disaster_affected_regions')}</h4>
              <div className="flex flex-wrap gap-1">
                {disaster.regions.map((region, idx) => (
                  <span key={idx} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                    {region}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">{t('home.disaster_frequency')}:</span>
                <span className="ml-1 font-medium text-gray-800 dark:text-white">{disaster.frequency}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">{t('home.disaster_impact')}:</span>
                <span className="ml-1 font-medium text-gray-800 dark:text-white">{disaster.impact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">{t('home.disaster_preparedness_tip')}</h3>
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          {t('home.disaster_preparedness_desc')}
        </p>
      </div>
    </div>
  );
};

export default DisasterInfo;