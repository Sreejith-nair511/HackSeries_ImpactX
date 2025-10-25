import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Map from '../components/Map';

const Home = () => {
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
      title: "Flood Relief in Kerala",
      description: "Help families affected by monsoon floods rebuild their lives",
      image: "https://images.unsplash.com/photo-1593062091233-5450f1b5c3c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      progress: 75
    },
    {
      title: "Education for Tribal Children",
      description: "Support education initiatives in remote tribal areas of India",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      progress: 45
    },
    {
      title: "Drought Relief in Rajasthan",
      description: "Provide water and food security for drought-affected communities",
      image: "https://images.unsplash.com/photo-1591228391010-0a6a3c7b4c1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      progress: 30
    }
  ];

  const features = [
    {
      icon: "🔒",
      title: "Blockchain Transparency",
      description: "All donations and fund releases are recorded on the Algorand blockchain for complete transparency."
    },
    {
      icon: "✅",
      title: "Multi-Oracle Verification",
      description: "Proof of aid delivery verified by multiple oracles (drones, satellites, IoT) with weighted voting."
    },
    {
      icon: "📁",
      title: "IPFS Storage",
      description: "Proof documents stored securely on IPFS with hashes anchored to the blockchain."
    },
    {
      icon: "🇮🇳",
      title: "India-Focused",
      description: "Specifically designed for Indian disaster relief scenarios with local language support."
    }
  ];

  const stats = [
    { value: "₹2.5Cr", label: "Funds Distributed" },
    { value: "15K+", label: "Beneficiaries" },
    { value: "42", label: "Active Campaigns" },
    { value: "98%", label: "Transparency Rating" }
  ];

  const partners = [
    { name: "National Disaster Response Force", logo: "NDRF", description: "India's premier disaster response organization" },
    { name: "Ministry of Home Affairs", logo: "MHA", description: "Government of India disaster management" },
    { name: "Indian Red Cross Society", logo: "IRCS", description: "Humanitarian aid and disaster response" },
    { name: "UNICEF India", logo: "UNICEF", description: "Children's welfare and emergency response" }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Dark mode toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${
            darkMode 
              ? 'bg-gray-700 text-yellow-300' 
              : 'bg-gray-200 text-gray-700'
          }`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>

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
                        <span>Funds Raised</span>
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
                        Donate Now
                      </Link>
                      <Link 
                        to="/campaigns" 
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full transition duration-300 border border-white/30"
                      >
                        View Campaigns
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
              aria-label={`Go to slide ${index + 1}`}
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
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Why ImpactX?</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Our platform ensures every rupee reaches those who need it most through transparent, verifiable processes
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

      {/* India Map Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Disaster Relief Across India</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          View active campaigns and relief efforts across different regions of India
        </p>
        
        <Map darkMode={darkMode} />
        
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300">Active Campaigns</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300">Completed Campaigns</span>
          </div>
        </div>
      </div>

      {/* Government Partners */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Government & NGO Partners</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Collaborating with national organizations for effective disaster response
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
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">How It Works</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Our 4-step process ensures transparency and accountability in every donation
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: 1, title: "Create Campaign", description: "NGOs create disaster relief campaigns with detailed information" },
            { step: 2, title: "Donate", description: "Donors contribute funds to secure blockchain escrow" },
            { step: 3, title: "Verify", description: "Oracles verify proof of aid delivery using multiple sources" },
            { step: 4, title: "Release", description: "Funds released to NGO upon successful verification" }
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of donors who trust ImpactX to ensure their contributions reach those in need
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/donate" 
            className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-full transition duration-300 shadow-lg transform hover:scale-105"
          >
            Start Donating
          </Link>
          <Link 
            to="/campaigns" 
            className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-4 px-8 rounded-full transition duration-300"
          >
            Explore Campaigns
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;