# Theme Customization Guide

## Overview

The ImpactX platform supports multiple themes to enhance user experience and accessibility. This guide explains how to customize and extend the platform's theming system.

## Available Themes

### 1. Light Theme (Default)
- Clean, modern interface
- High contrast text
- Minimal design elements
- Optimized for daylight viewing

### 2. Dark Theme
- Reduced eye strain in low-light conditions
- OLED-friendly design
- Enhanced focus on content
- Battery-saving on compatible devices

### 3. High Contrast Theme
- Maximum accessibility for visually impaired users
- WCAG AAA compliance
- Bold color differentiation
- Enhanced text readability

## Theme Implementation

### CSS Custom Properties

Themes are implemented using CSS custom properties:

```css
:root {
  --bg-primary: #f9fafb;
  --bg-secondary: #ffffff;
  --text-primary: #374151;
  --text-secondary: #6b7280;
  --accent-primary: #4f46e5;
  --accent-secondary: #818cf8;
  --border-color: #e5e7eb;
}

.dark {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --text-primary: #d1d5db;
  --text-secondary: #9ca3af;
  --accent-primary: #6366f1;
  --accent-secondary: #4f46e5;
  --border-color: #374151;
}

.high-contrast {
  --bg-primary: #ffffff;
  --bg-secondary: #000000;
  --text-primary: #000000;
  --text-secondary: #0000ff;
  --accent-primary: #ff0000;
  --accent-secondary: #00ff00;
  --border-color: #000000;
}
```

### JavaScript Theme Management

Theme preferences are managed through localStorage:

```javascript
// Theme switcher component
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
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
```

## Creating Custom Themes

### 1. Define Theme Variables

Create a new CSS file for your custom theme:

```css
/* custom-theme.css */
.custom-theme {
  --bg-primary: #your-color;
  --bg-secondary: #your-color;
  --text-primary: #your-color;
  --text-secondary: #your-color;
  --accent-primary: #your-color;
  --accent-secondary: #your-color;
  --border-color: #your-color;
}
```

### 2. Register Theme in JavaScript

Add your theme to the theme management system:

```javascript
const availableThemes = ['light', 'dark', 'high-contrast', 'custom-theme'];

const setTheme = (themeName) => {
  // Remove all theme classes
  availableThemes.forEach(theme => {
    document.documentElement.classList.remove(theme);
  });
  
  // Add selected theme class
  document.documentElement.classList.add(themeName);
  
  // Save preference
  localStorage.setItem('theme', themeName);
};
```

### 3. Update Theme Switcher

Modify the theme switcher component to include your custom theme:

```javascript
const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const themes = ['light', 'dark', 'high-contrast', 'custom-theme'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    setTheme(nextTheme);
    updateTheme(nextTheme);
  };

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' && '🌙'}
      {theme === 'dark' && '☀️'}
      {theme === 'high-contrast' && '🎨'}
      {theme === 'custom-theme' && '🌈'}
    </button>
  );
};
```

## Accessibility Considerations

### Color Contrast Ratios

All themes must maintain WCAG compliance:
- **Normal text**: 4.5:1 contrast ratio (AA)
- **Large text**: 3:1 contrast ratio (AA)
- **UI components**: 3:1 contrast ratio (AA)

### Focus Indicators

Ensure all interactive elements have visible focus indicators:
```css
.focus-ring {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}
```

### Reduced Motion

Support users with motion sensitivity:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Mobile-Specific Considerations

### Touch Target Sizes

Ensure adequate touch target sizes for mobile users:
```css
button, a, .touch-target {
  min-height: 44px;
  min-width: 44px;
}
```

### Orientation Changes

Handle orientation changes gracefully:
```css
@media (orientation: landscape) and (max-height: 500px) {
  .modal-content {
    max-height: 80vh;
  }
}
```

## Performance Optimization

### CSS Loading

Load themes efficiently:
```html
<!-- Preload critical theme CSS -->
<link rel="preload" href="light-theme.css" as="style">
<link rel="stylesheet" href="light-theme.css">

<!-- Load other themes conditionally -->
<link rel="stylesheet" href="dark-theme.css" media="(prefers-color-scheme: dark)">
```

### JavaScript Optimization

Minimize theme switching overhead:
```javascript
// Use CSS classes instead of inline styles
// Leverage CSS custom properties for dynamic changes
// Cache theme preferences to avoid repeated DOM operations
```

## Testing Themes

### Visual Testing

Test themes across different devices and browsers:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Android Chrome)
- Screen readers and assistive technologies

### Automated Testing

Implement automated theme testing:
```javascript
// Example: Jest test for theme switching
test('switches to dark theme', () => {
  document.documentElement.classList.remove('dark');
  toggleTheme();
  expect(document.documentElement.classList.contains('dark')).toBe(true);
});
```

## Theme Extension Points

### Component-Level Customization

Allow components to adapt to themes:
```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, var(--shadow-opacity, 0.1));
}
```

### Conditional Styling

Apply styles conditionally based on theme:
```css
/* Apply different styles based on theme */
.light .hero-section {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
}

.dark .hero-section {
  background: linear-gradient(135deg, #312e81 0%, #3730a3 100%);
}
```

## Future Enhancements

### 1. Dynamic Theme Generation
- AI-powered theme suggestions
- User preference learning
- Context-aware theme adaptation

### 2. System Integration
- OS-level theme synchronization
- Time-based theme switching
- Location-based theme adaptation

### 3. Community Themes
- User-submitted themes
- Theme marketplace
- Collaborative theme development

## Conclusion

The ImpactX theming system provides a flexible and accessible foundation for customizing the user interface. By following these guidelines, developers can create new themes that enhance user experience while maintaining accessibility standards and performance optimization.

The modular approach allows for easy extension and customization, ensuring that the platform can adapt to diverse user needs and preferences while maintaining a consistent and professional appearance.