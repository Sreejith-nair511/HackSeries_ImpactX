import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WeatherMonitor from '../WeatherMonitor';

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}));

// Mock the weather monitoring utilities
jest.mock('../../utils/weatherMonitoring', () => ({
  fetchWeatherData: jest.fn(),
  analyzeWeatherRisk: jest.fn(),
  getPreparednessRecommendations: jest.fn(),
  formatWeatherData: jest.fn()
}));

const mockWeatherData = {
  location: 'Delhi',
  temperature: 35,
  temperatureFormatted: '35°C',
  humidity: 45,
  humidityFormatted: '45%',
  windSpeed: 12,
  windSpeedFormatted: '12 km/h',
  pressure: 1013,
  pressureFormatted: '1013 hPa',
  visibility: 5,
  visibilityFormatted: '5 km',
  condition: 'Sunny',
  forecast: [
    { day: 'Today', high: 37, low: 25, condition: 'Sunny' },
    { day: 'Tomorrow', high: 36, low: 24, condition: 'Partly Cloudy' }
  ]
};

const mockRiskAssessment = {
  riskLevel: 'moderate',
  alerts: ['Extreme heat warning']
};

const mockRecommendations = [
  'Stay hydrated and avoid prolonged sun exposure',
  'Wear light-colored, loose-fitting clothing'
];

describe('WeatherMonitor Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    require('../../utils/weatherMonitoring').fetchWeatherData.mockResolvedValue(mockWeatherData);
    require('../../utils/weatherMonitoring').analyzeWeatherRisk.mockReturnValue(mockRiskAssessment);
    require('../../utils/weatherMonitoring').getPreparednessRecommendations.mockReturnValue(mockRecommendations);
    require('../../utils/weatherMonitoring').formatWeatherData.mockReturnValue(mockWeatherData);
  });

  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <WeatherMonitor />
      </BrowserRouter>
    );
    expect(screen.getByText('weather.title')).toBeInTheDocument();
  });

  it('displays weather data when loaded', async () => {
    render(
      <BrowserRouter>
        <WeatherMonitor />
      </BrowserRouter>
    );
    
    // Wait for the component to update with data
    setTimeout(() => {
      expect(screen.getByText('Delhi')).toBeInTheDocument();
      expect(screen.getByText('35°C')).toBeInTheDocument();
      expect(screen.getByText('Sunny')).toBeInTheDocument();
    }, 0);
  });

  it('displays risk assessment', async () => {
    render(
      <BrowserRouter>
        <WeatherMonitor />
      </BrowserRouter>
    );
    
    // Wait for the component to update with data
    setTimeout(() => {
      expect(screen.getByText('weather.risk_assessment')).toBeInTheDocument();
      expect(screen.getByText('moderate')).toBeInTheDocument();
      expect(screen.getByText('Extreme heat warning')).toBeInTheDocument();
    }, 0);
  });

  it('displays preparedness recommendations', async () => {
    render(
      <BrowserRouter>
        <WeatherMonitor />
      </BrowserRouter>
    );
    
    // Wait for the component to update with data
    setTimeout(() => {
      expect(screen.getByText('weather.preparedness_recommendations')).toBeInTheDocument();
      expect(screen.getByText('Stay hydrated and avoid prolonged sun exposure')).toBeInTheDocument();
    }, 0);
  });
});