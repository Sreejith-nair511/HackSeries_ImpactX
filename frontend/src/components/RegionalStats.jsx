import { useTranslation } from 'react-i18next';

const RegionalStats = () => {
  const { t } = useTranslation();
  
  const regionalData = [
    {
      state: "Kerala",
      disasters: ["Floods", "Landslides"],
      affected: "5.4 million",
      funds: "₹1,200 Cr",
      color: "bg-blue-500"
    },
    {
      state: "Odisha",
      disasters: ["Cyclones", "Floods"],
      affected: "3.8 million",
      funds: "₹850 Cr",
      color: "bg-green-500"
    },
    {
      state: "Uttarakhand",
      disasters: ["Landslides", "Floods"],
      affected: "2.1 million",
      funds: "₹620 Cr",
      color: "bg-yellow-500"
    },
    {
      state: "Assam",
      disasters: ["Floods", "Erosion"],
      affected: "4.2 million",
      funds: "₹780 Cr",
      color: "bg-red-500"
    },
    {
      state: "Maharashtra",
      disasters: ["Droughts", "Floods"],
      affected: "3.5 million",
      funds: "₹950 Cr",
      color: "bg-purple-500"
    },
    {
      state: "Rajasthan",
      disasters: ["Droughts", "Heat Waves"],
      affected: "1.8 million",
      funds: "₹520 Cr",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t('home.regional_disaster_stats')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regionalData.map((region, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{region.state}</h3>
              <div className={`w-4 h-4 rounded-full ${region.color}`}></div>
            </div>
            
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">{t('home.common_disasters')}</h4>
              <div className="flex flex-wrap gap-1">
                {region.disasters.map((disaster, idx) => (
                  <span key={idx} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">
                    {disaster}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-3">
                <p className="text-xs text-blue-600 dark:text-blue-300">{t('home.people_affected')}</p>
                <p className="font-semibold text-blue-800 dark:text-blue-200">{region.affected}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900 rounded-lg p-3">
                <p className="text-xs text-green-600 dark:text-green-300">{t('home.funds_allocated')}</p>
                <p className="font-semibold text-green-800 dark:text-green-200">{region.funds}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
          {t('home.view_detailed_statistics')}
        </button>
      </div>
    </div>
  );
};

export default RegionalStats;