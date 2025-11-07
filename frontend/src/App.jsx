import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from './components/Navigation';
import ThemeSwitcher from './components/ThemeSwitcher';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import Donate from './pages/Donate';
import NGODashboard from './pages/NGODashboard';
import AdminDashboard from './pages/AdminDashboard';
import DonationDemo from './components/DonationDemo';
import AuthTest from './pages/AuthTest';
import IVRSystem from './pages/IVRSystem'; // Added IVR System import
import DisasterStatisticsPage from './pages/DisasterStatisticsPage'; // Added Disaster Statistics Page import
import DisasterPredictionPage from './pages/DisasterPredictionPage'; // Added Disaster Prediction Page import
import DisasterRecoveryTrackerPage from './pages/DisasterRecoveryTrackerPage'; // Added Disaster Recovery Tracker Page import
import CommunityFeedbackPage from './pages/CommunityFeedbackPage'; // Added Community Feedback Page import
import ResourceDeploymentTrackerPage from './pages/ResourceDeploymentTrackerPage'; // Added Resource Deployment Tracker Page import
import VolunteerRecognitionPage from './pages/VolunteerRecognitionPage'; // Added Volunteer Recognition Page import

function App() {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16); // Base font size in pixels
  const [highContrast, setHighContrast] = useState(false);

  // Check for saved dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    
    // Apply dark mode class to body
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Check for saved font size preference
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
      document.documentElement.style.fontSize = `${savedFontSize}px`;
    }
  }, []);

  // Check for saved high contrast preference
  useEffect(() => {
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    setHighContrast(savedHighContrast);
    
    // Apply high contrast class to body
    if (savedHighContrast) {
      document.documentElement.classList.add('high-contrast');
    }
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

  // Increase font size
  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 2, 24); // Max 24px
    setFontSize(newSize);
    localStorage.setItem('fontSize', newSize.toString());
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  // Decrease font size
  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 2, 12); // Min 12px
    setFontSize(newSize);
    localStorage.setItem('fontSize', newSize.toString());
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  // Toggle high contrast mode
  const toggleHighContrast = () => {
    const newHighContrast = !highContrast;
    setHighContrast(newHighContrast);
    localStorage.setItem('highContrast', newHighContrast.toString());
    
    // Apply high contrast class to body
    if (newHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  // Change language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-blue-600 focus:text-white focus:z-50 focus:ring-2 focus:ring-white"
          aria-label={t('accessibility.skip_to_main_content')}
        >
          {t('accessibility.skip_to_main_content')}
        </a>
        
        <Navigation 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          increaseFontSize={increaseFontSize}
          decreaseFontSize={decreaseFontSize}
          highContrast={highContrast}
          toggleHighContrast={toggleHighContrast}
          changeLanguage={changeLanguage}
        />
        
        <main id="main-content" className="container mx-auto px-4 py-8" role="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/ngo" element={<NGODashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/demo" element={<DonationDemo />} />
            <Route path="/authtest" element={<AuthTest />} />
            <Route path="/ivr" element={<IVRSystem />} /> {/* Added IVR System route */}
            <Route path="/stats" element={<DisasterStatisticsPage />} /> {/* Added Disaster Statistics route */}
            <Route path="/prediction" element={<DisasterPredictionPage />} /> {/* Added Disaster Prediction route */}
            <Route path="/recovery" element={<DisasterRecoveryTrackerPage />} /> {/* Added Disaster Recovery Tracker route */}
            <Route path="/feedback" element={<CommunityFeedbackPage />} /> {/* Added Community Feedback route */}
            <Route path="/resources" element={<ResourceDeploymentTrackerPage />} /> {/* Added Resource Deployment Tracker route */}
            <Route path="/volunteer-recognition" element={<VolunteerRecognitionPage />} /> {/* Added Volunteer Recognition route */}
          </Routes>
        </main>
        
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12" role="contentinfo">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="bg-white text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">₹</span>
                  ImpactX
                </h3>
                <p className="text-gray-400">
                  {t('home.title')}
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                  <li><a href="/campaigns" className="text-gray-400 hover:text-white transition-colors">Campaigns</a></li>
                  <li><a href="/donate" className="text-gray-400 hover:text-white transition-colors">Donate</a></li>
                  <li><a href="/ngo" className="text-gray-400 hover:text-white transition-colors">NGO Dashboard</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    contact@impactx.org
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    +91 98765 43210
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 ImpactX. {t('home.title')}. Made with ❤️ for India.</p>
              {/* Team attribution */}
              <p className="mt-2 text-sm">Developed by Goodwell Sreejith S, Vasudha, and Nikhil</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;