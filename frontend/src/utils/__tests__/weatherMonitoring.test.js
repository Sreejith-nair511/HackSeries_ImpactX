import { fetchWeatherData, analyzeWeatherRisk, getPreparednessRecommendations, formatWeatherData } from '../weatherMonitoring';

describe('Weather Monitoring Utilities', () => {
  describe('fetchWeatherData', () => {
    it('should return weather data for a given city', async () => {
      const data = await fetchWeatherData('Delhi');
      expect(data).toBeDefined();
      expect(data.location).toBe('Delhi');
      expect(typeof data.temperature).toBe('number');
      expect(typeof data.humidity).toBe('number');
      expect(typeof data.windSpeed).toBe('number');
      expect(typeof data.pressure).toBe('number');
      expect(typeof data.visibility).toBe('number');
      expect(typeof data.condition).toBe('string');
      expect(Array.isArray(data.forecast)).toBe(true);
    });
  });

  describe('analyzeWeatherRisk', () => {
    it('should return unknown risk level for null data', () => {
      const result = analyzeWeatherRisk(null);
      expect(result.riskLevel).toBe('unknown');
      expect(Array.isArray(result.alerts)).toBe(true);
    });

    it('should identify high risk for stormy conditions', () => {
      const weatherData = {
        temperature: 25,
        windSpeed: 10,
        visibility: 5,
        condition: 'Stormy'
      };
      const result = analyzeWeatherRisk(weatherData);
      expect(result.riskLevel).toBe('high');
      expect(result.alerts).toContain('Severe weather alert');
    });

    it('should identify moderate risk for extreme temperatures', () => {
      const weatherData = {
        temperature: 45,
        windSpeed: 10,
        visibility: 5,
        condition: 'Sunny'
      };
      const result = analyzeWeatherRisk(weatherData);
      expect(result.riskLevel).toBe('moderate');
      expect(result.alerts).toContain('Extreme heat warning');
    });
  });

  describe('getPreparednessRecommendations', () => {
    it('should return empty array for null data', () => {
      const result = getPreparednessRecommendations(null);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('should provide heat-related recommendations for high temperatures', () => {
      const weatherData = {
        temperature: 40,
        windSpeed: 10,
        visibility: 5,
        condition: 'Sunny'
      };
      const result = getPreparednessRecommendations(weatherData);
      expect(result.some(rec => rec.includes('hydrated'))).toBe(true);
      expect(result.some(rec => rec.includes('light-colored'))).toBe(true);
    });

    it('should provide storm-related recommendations for stormy conditions', () => {
      const weatherData = {
        temperature: 25,
        windSpeed: 10,
        visibility: 5,
        condition: 'Stormy'
      };
      const result = getPreparednessRecommendations(weatherData);
      expect(result.some(rec => rec.includes('indoors'))).toBe(true);
      expect(result.some(rec => rec.includes('emergency kit'))).toBe(true);
    });
  });

  describe('formatWeatherData', () => {
    it('should return null for null data', () => {
      const result = formatWeatherData(null);
      expect(result).toBeNull();
    });

    it('should format weather data with proper units', () => {
      const weatherData = {
        temperature: 25,
        windSpeed: 15,
        pressure: 1013,
        visibility: 8,
        humidity: 60,
        location: 'Delhi',
        condition: 'Sunny'
      };
      const result = formatWeatherData(weatherData);
      expect(result.temperatureFormatted).toBe('25°C');
      expect(result.windSpeedFormatted).toBe('15 km/h');
      expect(result.pressureFormatted).toBe('1013 hPa');
      expect(result.visibilityFormatted).toBe('8 km');
      expect(result.humidityFormatted).toBe('60%');
    });
  });
});