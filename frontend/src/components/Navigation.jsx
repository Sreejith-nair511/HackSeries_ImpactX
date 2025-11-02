import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import IndianFlag from './IndianFlag';
import ReadingAssistance from './ReadingAssistance';
import ThemeSwitcher from './ThemeSwitcher'; // Added ThemeSwitcher import

const Navigation = ({ 
  darkMode, 
  toggleDarkMode,
  increaseFontSize,
  decreaseFontSize,
  highContrast,
  toggleHighContrast,
  changeLanguage
}) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isReadingAssistanceOpen, setIsReadingAssistanceOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // New state for search
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsAccessibilityOpen(false);
        setIsLanguageOpen(false);
        setIsReadingAssistanceOpen(false);
        setIsSearchOpen(false); // Close search on Escape
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // New function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would navigate to search results
      console.log('Searching for:', searchQuery);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navItems = [
    { path: '/', label: t('common.home') },
    { path: '/campaigns', label: t('common.campaigns') },
    { path: '/donate', label: t('common.donate') },
    { path: '/ngo', label: t('common.ngo_dashboard') },
    { path: '/admin', label: t('common.admin') },
    { path: '/demo', label: t('common.demo') },
    { path: '/authtest', label: t('common.auth_test') },
    { path: '/ivr', label: 'IVR System' },
    { path: '/stats', label: t('common.statistics') }, // New stats page
  ];

  const languages = [
    { code: 'en', name: t('common.english') },
    { code: 'hi', name: t('common.hindi') },
    { code: 'ta', name: t('common.tamil') },
    { code: 'te', name: t('common.telugu') },
    { code: 'mr', name: t('common.marathi') },
    { code: 'bn', name: t('common.bengali') },
    { code: 'gu', name: t('common.gujarati') }
  ];

  const currentLanguage = i18n.language;

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold flex items-center" aria-label="ImpactX Home">
            <span className="bg-white text-blue-700 rounded-full w-8 h-8 flex items-center justify-center mr-2">₹</span>
            {t('common.app_name')}
            <span className="ml-2">
              <IndianFlag />
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-white text-blue-700 shadow-md'
                    : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                }`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Search Bar for Desktop */}
            <div className="relative mx-2">
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('common.search')}
                  className="px-3 py-1 rounded-l-lg text-gray-700 text-sm focus:outline-none w-32 focus:w-48 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-r-lg text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </form>
            </div>
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLanguageOpen(!isLanguageOpen);
                  setIsAccessibilityOpen(false);
                }}
                className="p-2 rounded-full ml-2 flex items-center text-sm"
                aria-label={t('common.language')}
                aria-expanded={isLanguageOpen}
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                </svg>
                {languages.find(lang => lang.code === currentLanguage)?.name || 'EN'}
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50" role="menu">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setIsLanguageOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        currentLanguage === lang.code
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      role="menuitem"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Accessibility Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsAccessibilityOpen(!isAccessibilityOpen);
                  setIsLanguageOpen(false);
                }}
                className="p-2 rounded-full ml-2"
                aria-label={t('accessibility.accessibility_options')}
                aria-expanded={isAccessibilityOpen}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </button>
              
              {isAccessibilityOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50" role="menu">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800">{t('accessibility.accessibility_options')}</h3>
                  </div>
                  <button
                    onClick={increaseFontSize}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    {t('accessibility.increase_font_size')}
                  </button>
                  <button
                    onClick={decreaseFontSize}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    {t('accessibility.decrease_font_size')}
                  </button>
                  <button
                    onClick={toggleHighContrast}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    {t('accessibility.high_contrast')}
                  </button>
                  <button
                    onClick={() => {
                      setIsReadingAssistanceOpen(true);
                      setIsAccessibilityOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    {t('accessibility.reading_assistance')}
                  </button>
                </div>
              )}
            </div>
            
            {/* Theme Switcher for desktop */}
            <div className="ml-2">
              <ThemeSwitcher />
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            {/* Search Icon for Mobile */}
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setIsMenuOpen(false);
                setIsLanguageOpen(false);
                setIsAccessibilityOpen(false);
              }}
              className="p-2 rounded-full mr-2"
              aria-label={t('common.search')}
              aria-expanded={isSearchOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
            
            {/* Language Selector for mobile */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLanguageOpen(!isLanguageOpen);
                  setIsMenuOpen(false);
                  setIsAccessibilityOpen(false);
                }}
                className="p-2 rounded-full mr-2 flex items-center text-sm"
                aria-label={t('common.language')}
                aria-expanded={isLanguageOpen}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                </svg>
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50" role="menu">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setIsLanguageOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        currentLanguage === lang.code
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      role="menuitem"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Accessibility Menu for mobile */}
            <button
              onClick={() => {
                setIsAccessibilityOpen(!isAccessibilityOpen);
                setIsMenuOpen(false);
                setIsLanguageOpen(false);
              }}
              className="p-2 rounded-full mr-2"
              aria-label={t('accessibility.accessibility_options')}
              aria-expanded={isAccessibilityOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
            </button>
            
            {/* Theme Switcher for mobile */}
            <div className="mr-2">
              <ThemeSwitcher />
            </div>
            
            <button 
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsLanguageOpen(false);
                setIsAccessibilityOpen(false);
              }}
              className="text-white focus:outline-none p-2 rounded-lg hover:bg-blue-600 transition-colors"
              aria-label={isMenuOpen ? t('navigation.close') : t('navigation.menu')}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Search Bar for Mobile */}
        {isSearchOpen && (
          <div className="md:hidden mt-2 pb-2">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('common.search')}
                className="flex-grow px-3 py-2 rounded-l-lg text-gray-700 text-sm focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-lg text-white"
              >
                {t('common.search')}
              </button>
            </form>
          </div>
        )}
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden bg-blue-600 rounded-lg mt-2 py-2 absolute left-4 right-4 shadow-xl" role="menu">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                }`}
                role="menuitem"
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
        
        {/* Accessibility Options for Mobile */}
        {isAccessibilityOpen && !isMenuOpen && (
          <div className="md:hidden bg-white rounded-lg mt-2 py-2 absolute left-4 right-4 shadow-xl z-50" role="menu">
            <div className="px-4 py-2 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">{t('accessibility.accessibility_options')}</h3>
            </div>
            <button
              onClick={increaseFontSize}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              {t('accessibility.increase_font_size')}
            </button>
            <button
              onClick={decreaseFontSize}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              {t('accessibility.decrease_font_size')}
            </button>
            <button
              onClick={toggleHighContrast}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              {t('accessibility.high_contrast')}
            </button>
            <button
              onClick={() => {
                setIsReadingAssistanceOpen(true);
                setIsAccessibilityOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              {t('accessibility.reading_assistance')}
            </button>
          </div>
        )}
      </div>
      
      {/* Reading Assistance Modal */}
      <ReadingAssistance 
        isOpen={isReadingAssistanceOpen} 
        onClose={() => setIsReadingAssistanceOpen(false)} 
      />
    </nav>
  );
};

export default Navigation;