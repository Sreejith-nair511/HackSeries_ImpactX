# Theme Customization Guide

## Overview

The ImpactX disaster response platform supports multiple themes to enhance user experience and accessibility. This guide covers the implementation of light/dark mode, high contrast mode, and font size adjustments.

## Theme Architecture

### CSS Custom Properties
The platform uses CSS custom properties for theme management:

```css
:root {
  /* Light theme colors */
  --bg-primary: #f9fafb;
  --bg-secondary: #f3f4f6;
  --text-primary: #1f2937;
  --text-secondary: #4b5563;
  --accent-primary: #4f46e5;
  --accent-secondary: #818cf8;
  --border-color: #e5e7eb;
}

.dark {
  /* Dark theme colors */
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --accent-primary: #818cf8;
  --accent-secondary: #c7d2fe;
  --border-color: #374151;
}

.high-contrast {
  /* High contrast theme */
  --bg-primary: #000000;
  --bg-secondary: #000000;
  --text-primary: #ffffff;
  --text-secondary: #ffffff;
  --accent-primary: #ffff00;
  --accent-secondary: #ffff00;
  --border-color: #ffffff;
}
```

### JavaScript Theme Management
Theme preferences are stored in localStorage and applied on page load:

```javascript
// Check for saved theme preference
useEffect(() => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
  document.documentElement.classList.toggle('dark', savedTheme === 'dark');
}, []);

// Toggle theme function
const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
  document.documentElement.classList.toggle('dark', newTheme === 'dark');
};
```

## Component Implementation

### Theme Switcher Component
The ThemeSwitcher component provides a user-friendly interface for theme selection:

```jsx
const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        // Moon icon for dark mode
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
      ) : (
        // Sun icon for light mode
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      )}
    </button>
  );
};
```

## Accessibility Features

### Font Size Adjustment
Users can adjust font size for better readability:

```javascript
// Font size management
const [fontSize, setFontSize] = useState(16);

const increaseFontSize = () => {
  const newSize = Math.min(fontSize + 2, 24); // Max 24px
  setFontSize(newSize);
  localStorage.setItem('fontSize', newSize.toString());
  document.documentElement.style.fontSize = `${newSize}px`;
};

const decreaseFontSize = () => {
  const newSize = Math.max(fontSize - 2, 12); // Min 12px
  setFontSize(newSize);
  localStorage.setItem('fontSize', newSize.toString());
  document.documentElement.style.fontSize = `${newSize}px`;
};
```

### High Contrast Mode
High contrast mode improves visibility for users with visual impairments:

```javascript
const [highContrast, setHighContrast] = useState(false);

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
```

## Responsive Design Integration

### Theme-Aware Components
All components are designed to maintain their theme appearance across devices:

```css
/* Responsive card with theme support */
.theme-card {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.theme-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* Dark theme specific adjustments */
.dark .theme-card {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
}

/* High contrast adjustments */
.high-contrast .theme-card {
  border: 2px solid var(--border-color);
  outline: 2px solid transparent;
}
```

## Custom Theme Creation

### Theme Variables Structure
To create custom themes, define a complete set of CSS variables:

```css
.custom-theme {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --accent-primary: #0d6efd;
  --accent-secondary: #6ea8fe;
  --success: #198754;
  --warning: #ffc107;
  --error: #dc3545;
  --border-color: #dee2e6;
  --shadow: rgba(0, 0, 0, 0.1);
}
```

### Theme Switching Logic
Implement theme switching with smooth transitions:

```javascript
const applyTheme = (themeName) => {
  // Remove existing theme classes
  document.documentElement.classList.remove('dark', 'light', 'high-contrast');
  
  // Apply new theme class
  document.documentElement.classList.add(themeName);
  
  // Save preference
  localStorage.setItem('theme', themeName);
  
  // Dispatch theme change event
  window.dispatchEvent(new CustomEvent('themechange', { detail: themeName }));
};
```

## Performance Considerations

### CSS Optimization
- Minimize repaints and reflows during theme transitions
- Use hardware acceleration for smooth animations
- Optimize CSS selectors for faster rendering

### JavaScript Efficiency
- Debounce theme change events to prevent excessive re-renders
- Cache DOM elements to reduce query overhead
- Use efficient state management for theme preferences

## Testing Strategies

### Cross-Browser Compatibility
- Test theme switching across major browsers
- Verify high contrast mode meets accessibility standards
- Ensure font size adjustments work on all devices

### Automated Testing
```javascript
// Example test for theme persistence
describe('Theme Switching', () => {
  it('should persist theme preference', () => {
    // Set theme to dark
    localStorage.setItem('theme', 'dark');
    
    // Reload page
    window.location.reload();
    
    // Verify dark theme is applied
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
```

## Future Enhancements

### Dynamic Theme Generation
- AI-powered theme suggestions based on user preferences
- Automatic theme switching based on time of day
- Personalized color schemes for individual users

### Advanced Accessibility
- Custom color palette generation for colorblind users
- Text-to-speech integration with theme awareness
- Reduced motion options for users with vestibular disorders

## Conclusion

The ImpactX platform's theme customization system provides users with flexible options to personalize their experience while maintaining accessibility standards. The implementation follows modern web development practices and ensures consistent appearance across all supported devices and browsers.