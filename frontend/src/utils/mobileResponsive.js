/**
 * Mobile Responsiveness Utility
 * Provides hooks and utilities for responsive design
 */

import { useState, useEffect } from 'react';

/**
 * Custom hook to detect screen size breakpoints
 * @returns {Object} Object containing boolean values for different screen sizes
 */
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    width: 0,
    height: 0
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        width,
        height
      });
    };

    // Initial call
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

/**
 * Custom hook to detect device orientation
 * @returns {string} 'portrait' or 'landscape'
 */
export const useOrientation = () => {
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    };

    // Initial call
    handleOrientationChange();
    
    // Add event listener
    window.addEventListener('resize', handleOrientationChange);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleOrientationChange);
  }, []);

  return orientation;
};

/**
 * Custom hook to detect touch capability
 * @returns {boolean} True if device supports touch
 */
export const useTouchDetection = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return isTouchDevice;
};

/**
 * Utility function to get responsive class names
 * @param {Object} breakpoints - Object with class names for different breakpoints
 * @returns {string} Combined class names
 */
export const getResponsiveClasses = (breakpoints) => {
  const { mobile = '', tablet = '', desktop = '', default: defaultClass = '' } = breakpoints;
  const screenSize = useScreenSize();
  
  if (screenSize.isMobile) return `${defaultClass} ${mobile}`.trim();
  if (screenSize.isTablet) return `${defaultClass} ${tablet}`.trim();
  if (screenSize.isDesktop) return `${defaultClass} ${desktop}`.trim();
  
  return defaultClass;
};

/**
 * Utility function to get responsive styles
 * @param {Object} styles - Object with styles for different breakpoints
 * @returns {Object} Combined styles
 */
export const getResponsiveStyles = (styles) => {
  const { mobile = {}, tablet = {}, desktop = {}, default: defaultStyles = {} } = styles;
  const screenSize = useScreenSize();
  
  if (screenSize.isMobile) return { ...defaultStyles, ...mobile };
  if (screenSize.isTablet) return { ...defaultStyles, ...tablet };
  if (screenSize.isDesktop) return { ...defaultStyles, ...desktop };
  
  return defaultStyles;
};

export default {
  useScreenSize,
  useOrientation,
  useTouchDetection,
  getResponsiveClasses,
  getResponsiveStyles
};