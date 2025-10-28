import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Map from '../components/Map';
import DisasterInfo from '../components/DisasterInfo';
import RegionalStats from '../components/RegionalStats';

const Home = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  
  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Check for saved dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    // Apply dark mode class to body
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const heroSlides = [
    {
      title: t('home.hero_title_1'),
      description: t('home.hero_description_1'),
      image: "https://images.unsplash.com/photo-1593062091233-5450f1b5c3c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      progress: 75
    },
    {
      title: t('home.hero_title_2'),
      description: t('home.hero_description_2'),
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      progress: 45
    },
    {
      title: t('home.hero_title_3'),
      description: t('home.hero_description_3'),
      image: "https://images.unsplash.com/photo-1591228391010-0a6a3c7b4c1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      progress: 30
    }
  ];

  const features = [
    {
      icon: "🔒",
      title: t('home.feature_transparency'),
      description: t('home.feature_transparency_desc')
    },
    {
      icon: "✅",
      title: t('home.feature_verification'),
      description: t('home.feature_verification_desc')
    },
    {
      icon: "📁",
      title: t('home.feature_storage'),
      description: t('home.feature_storage_desc')
    },
    {
      icon: "🇮🇳",
      title: t('home.feature_india'),
      description: t('home.feature_india_desc')
    }
  ];

  const stats = [
    { value: t('home.stats_funds'), label: t('home.stats_funds_label') },
    { value: t('home.stats_beneficiaries'), label: t('home.stats_beneficiaries_label') },
    { value: t('home.stats_campaigns'), label: t('home.stats_campaigns_label') },
    { value: t('home.stats_transparency'), label: t('home.stats_transparency_label') }
  ];

  const partners = [
    { name: "National Disaster Response Force", logo: "NDRF", description: "India's premier disaster response organization" },
    { name: "Ministry of Home Affairs", logo: "MHA", description: "Government of India disaster management" },
    { name: "Indian Red Cross Society", logo: "IRCS", description: "Humanitarian aid and disaster response" },
    { name: "UNICEF India", logo: "UNICEF", description: "Children's welfare and emergency response" }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section with Carousel */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12 h-96 md:h-[500px]">
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6 md:px-12">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                    <p className="text-xl mb-6">{slide.description}</p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t('home.funds_raised')}</span>
                        <span>{slide.progress}%</span>
                      </div>
                      <div className="h-3 bg-gray-300 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full" 
                          style={{ width: `${slide.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link 
                        to="/donate" 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg transform hover:scale-105"
                      >
                        {t('common.donate')}
                      </Link>
                      <Link 
                        to="/campaigns" 
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full transition duration-300 border border-white/30"
                      >
                        {t('common.campaigns')}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`${t('home.go_to_slide')} ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="text-3xl md:text-4xl font-bold text-blue-700 dark:text-blue-400 mb-2">{stat.value}</div>
            <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">{t('home.why_impactx')}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          {t('home.why_impactx_desc')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disaster Information Section - India Specific */}
      <DisasterInfo />
      
      {/* Regional Statistics Section - India Specific */}
      <RegionalStats />

      {/* India Map Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">{t('home.disaster_relief')}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          {t('home.disaster_relief_desc')}
        </p>
        
        <Map darkMode={darkMode} />
        
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300">{t('home.active_campaigns')}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300">{t('home.completed_campaigns')}</span>
          </div>
        </div>
      </div>

      {/* Government Partners */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">{t('home.partners')}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          {t('home.partners_desc')}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-center hover:shadow-xl transition-shadow">
              <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                {partner.logo}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{partner.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">{t('home.how_it_works')}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          {t('home.how_it_works_desc')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: 1, title: t('home.step_create'), description: t('home.step_create_desc') },
            { step: 2, title: t('home.step_donate'), description: t('home.step_donate_desc') },
            { step: 3, title: t('home.step_verify'), description: t('home.step_verify_desc') },
            { step: 4, title: t('home.step_release'), description: t('home.step_release_desc') }
          ].map((item, index) => (
            <div key={index} className="text-center relative">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              
              {index < 3 && (
                <div className="hidden lg:block absolute top-8 -right-4 text-blue-400 dark:text-blue-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-12 text-center text-white mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.cta_title')}</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          {t('home.cta_desc')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/donate" 
            className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-full transition duration-300 shadow-lg transform hover:scale-105"
          >
            {t('home.cta_button_donate')}
          </Link>
          <Link 
            to="/campaigns" 
            className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-4 px-8 rounded-full transition duration-300"
          >
            {t('home.cta_button_explore')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;