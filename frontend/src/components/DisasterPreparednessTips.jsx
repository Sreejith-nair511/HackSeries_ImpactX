import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DisasterPreparednessTips = () => {
  const { t, i18n } = useTranslation();
  const [expandedTip, setExpandedTip] = useState(null);
  const [bookmarkedTips, setBookmarkedTips] = useState([]);

  // Disaster preparedness tips data
  const tipsData = [
    {
      id: 1,
      title: t('disasters.preparednessTips.tip1'),
      description: t('disasters.preparednessTips.tip1Desc') || t('disasters.preparednessTips.tip1'),
      category: 'general',
      importance: 'high'
    },
    {
      id: 2,
      title: t('disasters.preparednessTips.tip2'),
      description: t('disasters.preparednessTips.tip2Desc') || t('disasters.preparednessTips.tip2'),
      category: 'information',
      importance: 'high'
    },
    {
      id: 3,
      title: t('disasters.preparednessTips.tip3'),
      description: t('disasters.preparednessTips.tip3Desc') || t('disasters.preparednessTips.tip3'),
      category: 'planning',
      importance: 'high'
    },
    {
      id: 4,
      title: t('disasters.preparednessTips.tip4'),
      description: t('disasters.preparednessTips.tip4Desc') || t('disasters.preparednessTips.tip4'),
      category: 'location',
      importance: 'medium'
    }
  ];

  const toggleTip = (id) => {
    setExpandedTip(expandedTip === id ? null : id);
  };

  const toggleBookmark = (id) => {
    if (bookmarkedTips.includes(id)) {
      setBookmarkedTips(bookmarkedTips.filter(tipId => tipId !== id));
    } else {
      setBookmarkedTips([...bookmarkedTips, id]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {t('disasters.preparednessTips.title')}
      </h2>
      
      <div className="space-y-4">
        {tipsData.map((tip) => (
          <div 
            key={tip.id} 
            className={`border border-gray-200 rounded-lg p-4 transition-all duration-300 ${
              expandedTip === tip.id ? 'bg-blue-50 border-blue-300' : 'hover:shadow-md'
            }`}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-800">{tip.title}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleBookmark(tip.id)}
                  className={`p-1 rounded-full ${
                    bookmarkedTips.includes(tip.id) 
                      ? 'text-yellow-500 bg-yellow-100' 
                      : 'text-gray-400 hover:text-yellow-500'
                  }`}
                  aria-label={bookmarkedTips.includes(tip.id) ? t('common.removeBookmark') : t('common.addBookmark')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                </button>
                <button
                  onClick={() => toggleTip(tip.id)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600"
                  aria-label={expandedTip === tip.id ? t('common.collapse') : t('common.expand')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            {expandedTip === tip.id && (
              <div className="mt-3 text-gray-700">
                <p>{tip.description}</p>
                <div className="mt-2 flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    tip.importance === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></span>
                  <span className="text-sm text-gray-600">
                    {tip.importance === 'high' 
                      ? t('disasters.preparednessTips.highPriority') || 'High Priority' 
                      : t('disasters.preparednessTips.mediumPriority') || 'Medium Priority'}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {bookmarkedTips.length > 0 && (
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="font-semibold text-yellow-800 mb-2">
            {t('disasters.preparednessTips.bookmarkedTips') || 'Bookmarked Tips'}
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-yellow-700">
            {tipsData
              .filter(tip => bookmarkedTips.includes(tip.id))
              .map(tip => (
                <li key={tip.id}>{tip.title}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DisasterPreparednessTips;