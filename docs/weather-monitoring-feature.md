# Weather Monitoring Feature

## Overview

The Weather Monitoring feature is a new addition to the ImpactX platform that provides real-time weather information and disaster risk assessment for Indian regions. This feature helps users stay informed about current weather conditions and potential risks, enabling better preparedness for natural disasters.

## Components

### 1. Weather Monitoring Utility (weatherMonitoring.js)

Located in `frontend/src/utils/weatherMonitoring.js`, this utility provides the following functions:

- `fetchWeatherData(city)`: Simulates fetching weather data for a given Indian city
- `analyzeWeatherRisk(weatherData)`: Analyzes weather conditions to determine risk levels
- `getPreparednessRecommendations(weatherData)`: Provides weather-based preparedness recommendations
- `formatWeatherData(weatherData)`: Formats raw weather data for display

### 2. Weather Monitor Component (WeatherMonitor.jsx)

Located in `frontend/src/components/WeatherMonitor.jsx`, this React component provides a user interface for:

- Selecting Indian cities to view weather information
- Displaying current weather conditions (temperature, humidity, wind speed, etc.)
- Showing risk assessment based on weather conditions
- Providing preparedness recommendations
- Displaying weather forecast information

### 3. Test Files

- `frontend/src/utils/__tests__/weatherMonitoring.test.js`: Unit tests for weather monitoring utilities
- `frontend/src/components/__tests__/WeatherMonitor.test.js`: Unit tests for WeatherMonitor component

## Features

### City Selection
Users can select from a list of major Indian cities to view weather information:
- Delhi
- Mumbai
- Bangalore
- Chennai
- Kolkata
- Hyderabad
- Ahmedabad
- Pune
- Jaipur
- Lucknow
- Kanpur
- Nagpur
- Indore
- Thane
- Bhopal

### Weather Information Display
The component displays the following weather information:
- Current temperature
- Humidity levels
- Wind speed
- Atmospheric pressure
- Visibility
- Current weather condition

### Risk Assessment
Based on weather conditions, the system provides:
- Risk level (low, moderate, high)
- Specific alerts for extreme conditions
- Color-coded risk indicators

### Preparedness Recommendations
The system provides context-aware recommendations based on current weather conditions:
- Heat-related advice for high temperatures
- Wind safety tips for high wind conditions
- Visibility warnings for low visibility
- General weather preparedness tips

### Weather Forecast
The component displays a 2-day weather forecast with:
- Day names
- Weather conditions
- High and low temperatures

## Multilingual Support

The feature supports all languages available in the ImpactX platform:
- English
- Hindi
- Tamil
- Telugu
- Marathi
- Bengali
- Gujarati

All UI elements and messages are properly translated in each language.

## Technical Implementation

### React Hooks Used
- `useState`: For managing component state
- `useEffect`: For initial data fetching
- `useTranslation`: For internationalization

### UI Components
- City selection dropdown
- Refresh button
- Weather condition cards
- Risk assessment display
- Preparedness recommendations list
- Weather forecast grid

### Data Flow
1. User selects a city or clicks refresh
2. Component calls `fetchWeatherData()` utility function
3. Utility returns simulated weather data
4. Component processes data with `analyzeWeatherRisk()` and `getPreparednessRecommendations()`
5. Formatted data is displayed in the UI

## Testing

The feature includes comprehensive unit tests for both utility functions and the React component, ensuring:
- Proper data fetching and processing
- Correct risk assessment logic
- Appropriate preparedness recommendations
- Component rendering and user interaction

## Future Enhancements

Potential future improvements could include:
- Integration with real weather APIs
- Location-based weather detection
- Push notifications for severe weather alerts
- Historical weather data analysis
- Integration with disaster reporting features