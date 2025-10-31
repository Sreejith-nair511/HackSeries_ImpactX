/**
 * Disaster Preparedness Checklist Utility
 * Generates checklists for different types of disasters
 */

/**
 * Get disaster preparedness checklist items
 * @param {string} disasterType - Type of disaster (flood, earthquake, cyclone, drought, landslide)
 * @param {string} language - Language code for localization
 * @returns {Array} Array of checklist items
 */
export const getPreparednessChecklist = (disasterType, language = 'en') => {
  const checklists = {
    en: {
      flood: [
        {
          id: 'flood1',
          title: 'Emergency Kit',
          description: 'Prepare an emergency kit with water, non-perishable food, flashlights, batteries, first aid supplies, medications, and important documents.',
          priority: 'high',
          completed: false
        },
        {
          id: 'flood2',
          title: 'Evacuation Plan',
          description: 'Create a family evacuation plan that includes multiple escape routes, meeting points, and communication strategies.',
          priority: 'high',
          completed: false
        },
        {
          id: 'flood3',
          title: 'Home Protection',
          description: 'Elevate electrical systems, appliances, and valuable items above potential flood levels.',
          priority: 'medium',
          completed: false
        },
        {
          id: 'flood4',
          title: 'Insurance',
          description: 'Review flood insurance policies and ensure adequate coverage for your property.',
          priority: 'medium',
          completed: false
        },
        {
          id: 'flood5',
          title: 'Stay Informed',
          description: 'Monitor weather forecasts and emergency alerts. Sign up for local warning systems.',
          priority: 'high',
          completed: false
        }
      ],
      earthquake: [
        {
          id: 'quake1',
          title: 'Secure Furniture',
          description: 'Anchor heavy furniture, appliances, and objects to walls to prevent them from falling during shaking.',
          priority: 'high',
          completed: false
        },
        {
          id: 'quake2',
          title: 'Emergency Supplies',
          description: 'Maintain emergency supplies including water, food, first aid kit, flashlight, battery-powered radio, and whistle.',
          priority: 'high',
          completed: false
        },
        {
          id: 'quake3',
          title: 'Safe Spots',
          description: 'Identify safe spots in each room of your home (under sturdy tables, against interior walls).',
          priority: 'high',
          completed: false
        },
        {
          id: 'quake4',
          title: 'Utility Shut-Off',
          description: 'Learn how to turn off gas, water, and electricity in case of damage.',
          priority: 'medium',
          completed: false
        },
        {
          id: 'quake5',
          title: 'Communication Plan',
          description: 'Establish a family communication plan with out-of-area contact person.',
          priority: 'medium',
          completed: false
        }
      ],
      cyclone: [
        {
          id: 'cyclone1',
          title: 'Home Reinforcement',
          description: 'Reinforce doors and windows with storm shutters or plywood. Trim trees and remove dead branches.',
          priority: 'high',
          completed: false
        },
        {
          id: 'cyclone2',
          title: 'Emergency Kit',
          description: 'Prepare an emergency kit with water, non-perishable food, flashlights, batteries, first aid supplies, medications, and important documents.',
          priority: 'high',
          completed: false
        },
        {
          id: 'cyclone3',
          title: 'Evacuation Route',
          description: 'Identify evacuation routes and shelters. Keep a battery-powered radio for emergency broadcasts.',
          priority: 'high',
          completed: false
        },
        {
          id: 'cyclone4',
          title: 'Secure Outdoor Items',
          description: 'Secure or bring inside outdoor furniture, decorations, and other items that could become projectiles.',
          priority: 'medium',
          completed: false
        },
        {
          id: 'cyclone5',
          title: 'Insurance Review',
          description: 'Review insurance policies to ensure adequate coverage for wind and flood damage.',
          priority: 'medium',
          completed: false
        }
      ],
      drought: [
        {
          id: 'drought1',
          title: 'Water Conservation',
          description: 'Install water-efficient appliances and fixtures. Fix leaks promptly.',
          priority: 'high',
          completed: false
        },
        {
          id: 'drought2',
          title: 'Drought-Resistant Plants',
          description: 'Plant drought-resistant crops and vegetation. Use mulch to retain soil moisture.',
          priority: 'high',
          completed: false
        },
        {
          id: 'drought3',
          title: 'Water Storage',
          description: 'Store water in clean containers for emergency use. Rotate stored water every six months.',
          priority: 'medium',
          completed: false
        },
        {
          id: 'drought4',
          title: 'Rainwater Harvesting',
          description: 'Install rainwater harvesting systems to collect and store rainwater.',
          priority: 'medium',
          completed: false
        },
        {
          id: 'drought5',
          title: 'Stay Informed',
          description: 'Monitor drought conditions and water restrictions in your area.',
          priority: 'high',
          completed: false
        }
      ],
      landslide: [
        {
          id: 'landslide1',
          title: 'Site Assessment',
          description: 'Avoid building on steep slopes and unstable terrain. Consult geological surveys.',
          priority: 'high',
          completed: false
        },
        {
          id: 'landslide2',
          title: 'Drainage Systems',
          description: 'Install proper drainage systems around your property to divert water away from slopes.',
          priority: 'high',
          completed: false
        },
        {
          id: 'landslide3',
          title: 'Vegetation Management',
          description: 'Maintain vegetation on slopes as it helps stabilize soil. Avoid overwatering near slopes.',
          priority: 'medium',
          completed: false
        },
        {
          id: 'landslide4',
          title: 'Warning Signs',
          description: 'Learn to recognize warning signs such as cracks in walls, tilting trees, or unusual sounds.',
          priority: 'high',
          completed: false
        },
        {
          id: 'landslide5',
          title: 'Evacuation Plan',
          description: 'Develop an evacuation plan with multiple escape routes from landslide-prone areas.',
          priority: 'high',
          completed: false
        }
      ]
    },
    hi: {
      flood: [
        {
          id: 'flood1',
          title: 'आपातकालीन किट',
          description: 'पानी, गैर-खराब होने वाले भोजन, टॉर्च, बैटरी, प्रथम सहायता आपूर्ति, दवाएं और महत्वपूर्ण दस्तावेजों के साथ एक आपातकालीन किट तैयार करें।',
          priority: 'high',
          completed: false
        },
        {
          id: 'flood2',
          title: 'खाली करने की योजना',
          description: 'एक परिवार खाली करने की योजना बनाएं जिसमें कई निकास मार्ग, मीटिंग बिंदु और संचार रणनीतियां शामिल हों।',
          priority: 'high',
          completed: false
        },
        {
          id: 'flood3',
          title: 'घर की रक्षा',
          description: 'संभावित बाढ़ स्तर से ऊपर विद्युत प्रणाली, उपकरण और मूल्यवान वस्तुओं को उठाएं।',
          priority: 'medium',
          completed: false
        },
        {
          id: 'flood4',
          title: 'बीमा',
          description: 'बाढ़ बीमा नीतियों की समीक्षा करें और सुनिश्चित करें कि आपकी संपत्ति के लिए पर्याप्त कवरेज है।',
          priority: 'medium',
          completed: false
        },
        {
          id: 'flood5',
          title: 'सूचित रहें',
          description: 'मौसम पूर्वानुमान और आपातकालीन चेतावनियों की निगरानी करें। स्थानीय चेतावनी प्रणालियों के लिए साइन अप करें।',
          priority: 'high',
          completed: false
        }
      ],
      earthquake: [
        {
          id: 'quake1',
          title: 'फर्नीचर सुरक्षित करें',
          description: 'भारी फर्नीचर, उपकरण और वस्तुओं को दीवारों से जोड़ें ताकि कंपन के दौरान वे गिर न सकें।',
          priority: 'high',
          completed: false
        },
        {
          id: 'quake2',
          title: 'आपातकालीन आपूर्ति',
          description: 'पानी, भोजन, प्रथम सहायता किट, टॉर्च, बैटरी संचालित रेडियो और सीटी के साथ आपातकालीन आपूर्ति बनाए रखें।',
          priority: 'high',
          completed: false
        },
        {
          id: 'quake3',
          title: 'सुरक्षित स्थान',
          description: 'अपने घर के प्रत्येक कमरे में सुरक्षित स्थानों की पहचान करें (मजबूत मेजों के नीचे, आंतरिक दीवारों के साथ)।',
          priority: 'high',
          completed: false
        },
        {
          id: 'quake4',
          title: 'उपयोगिता बंद करना',
          description: 'क्षति की स्थिति में गैस, पानी और बिजली को बंद करना सीखें।',
          priority: 'medium',
          completed: false
        },
        {
          id: 'quake5',
          title: 'संचार योजना',
          description: 'क्षेत्र के बाहर संपर्क व्यक्ति के साथ परिवार संचार योजना स्थापित करें।',
          priority: 'medium',
          completed: false
        }
      ],
      cyclone: [
        {
          id: 'cyclone1',
          title: 'घर को मजबूत करना',
          description: 'तूफान के शटर या प्लाईवुड के साथ दरवाजे और खिड़कियों को मजबूत करें। पेड़ों को काटें और मृत शाखाओं को हटा दें।',
          priority: 'high',
          completed: false
        },
        {
          id: 'cyclone2',
          title: 'आपातकालीन किट',
          description: 'पानी, गैर-खराब होने वाले भोजन, टॉर्च, बैटरी, प्रथम सहायता आपूर्ति, दवाएं और महत्वपूर्ण दस्तावेजों के साथ एक आपातकालीन किट तैयार करें।',
          priority: 'high',
          completed: false
        },
        {
          id: 'cyclone3',
          title: 'खाली करने का मार्ग',
          description: 'खाली करने के मार्ग और शरण स्थलों की पहचान करें। आपातकालीन प्रसारण के लिए बैटरी-संचालित रेडियो रखें।',
          priority: 'high',
          completed: false
        },
        {
          id: 'cyclone4',
          title: 'बाहरी वस्तुओं को सुरक्षित करें',
          description: 'बाहरी फर्नीचर, सजावट और अन्य वस्तुओं को सुरक्षित करें या अंदर लाएं जो प्रक्षेप्य बन सकती हैं।',
          priority: 'medium',
          completed: false
        },
        {
          id: 'cyclone5',
          title: 'बीमा समीक्षा',
          description: 'हवा और बाढ़ क्षति के लिए पर्याप्त कवरेज सुनिश्चित करने के लिए बीमा नीतियों की समीक्षा करें।',
          priority: 'medium',
          completed: false
        }
      ],
      drought: [
        {
          id: 'drought1',
          title: 'जल संरक्षण',
          description: 'जल-कुशल उपकरण और फिटिंग स्थापित करें। रिसाव को तुरंत ठीक करें।',
          priority: 'high',
          completed: false
        },
        {
          id: 'drought2',
          title: 'सूखा-प्रतिरोधी पौधे',
          description: 'सूखा-प्रतिरोधी फसल और वनस्पति लगाएं। मिट्टी की नमी बनाए रखने के लिए मल्च का उपयोग करें।',
          priority: 'high',
          completed: false
        },
        {
          id: 'drought3',
          title: 'जल भंडारण',
          description: 'आपातकालीन उपयोग के लिए स्वच्छ कंटेनरों में पानी संग्रहीत करें। हर छह महीने में संग्रहीत पानी को घुमाएं।',
          priority: 'medium',
          completed: false
        },
        {
          id: 'drought4',
          title: 'वर्षा जल संग्रहण',
          description: 'वर्षा जल एकत्र करने और संग्रहीत करने के लिए वर्षा जल संग्रहण प्रणाली स्थापित करें।',
          priority: 'medium',
          completed: false
        },
        {
          id: 'drought5',
          title: 'सूचित रहें',
          description: 'अपने क्षेत्र में सूखे की स्थिति और जल प्रतिबंधों की निगरानी करें।',
          priority: 'high',
          completed: false
        }
      ],
      landslide: [
        {
          id: 'landslide1',
          title: 'स्थल मूल्यांकन',
          description: 'तीव्र ढलानों और अस्थिर भूभाग पर निर्माण से बचें। भूवैज्ञानिक सर्वेक्षण का परामर्श लें।',
          priority: 'high',
          completed: false
        },
        {
          id: 'landslide2',
          title: 'निकास प्रणाली',
          description: 'ढलानों से पानी को दूर करने के लिए अपनी संपत्ति के चारों ओर उचित निकास प्रणाली स्थापित करें।',
          priority: 'high',
          completed: false
        },
        {
          id: 'landslide3',
          title: 'वनस्पति प्रबंधन',
          description: 'ढलानों पर वनस्पति को बनाए रखें क्योंकि यह मिट्टी को स्थिर करने में मदद करती है। ढलानों के पास अत्यधिक जल न दें।',
          priority: 'medium',
          completed: false
        },
        {
          id: 'landslide4',
          title: 'चेतावनी संकेत',
          description: 'चेतावनी संकेतों को पहचानना सीखें जैसे दीवारों में दरारें, झुकते हुए पेड़, या असामान्य ध्वनियां।',
          priority: 'high',
          completed: false
        },
        {
          id: 'landslide5',
          title: 'खाली करने की योजना',
          description: 'भूस्खलन-प्रभावित क्षेत्रों से बाहर निकलने के लिए कई निकास मार्गों के साथ एक खाली करने की योजना विकसित करें।',
          priority: 'high',
          completed: false
        }
      ]
    }
  };

  return checklists[language]?.[disasterType] || checklists.en[disasterType];
};

/**
 * Get priority level color
 * @param {string} priority - Priority level (low, medium, high)
 * @returns {string} Color code for the priority level
 */
export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'bg-red-100 border-red-500 text-red-800';
    case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
    case 'low': return 'bg-green-100 border-green-500 text-green-800';
    default: return 'bg-gray-100 border-gray-500 text-gray-800';
  }
};

/**
 * Get priority level label
 * @param {string} priority - Priority level (low, medium, high)
 * @param {string} language - Language code for localization
 * @returns {string} Label for the priority level
 */
export const getPriorityLabel = (priority, language = 'en') => {
  const labels = {
    en: {
      high: 'High Priority',
      medium: 'Medium Priority',
      low: 'Low Priority'
    },
    hi: {
      high: 'उच्च प्राथमिकता',
      medium: 'मध्यम प्राथमिकता',
      low: 'कम प्राथमिकता'
    }
  };

  return labels[language]?.[priority] || labels.en[priority];
};

export default {
  getPreparednessChecklist,
  getPriorityColor,
  getPriorityLabel
};