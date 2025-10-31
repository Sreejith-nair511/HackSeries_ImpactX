import { 
  getActiveAlerts, 
  getSeverityLevel, 
  formatAlert, 
  getTimeRemaining, 
  getAlertColor, 
  getHistoricalDisasterData 
} from '../disasterAlerts';

describe('Disaster Alerts Utilities', () => {
  describe('getActiveAlerts', () => {
    it('should return all alerts when no region is specified', () => {
      const alerts = getActiveAlerts();
      expect(Array.isArray(alerts)).toBe(true);
      expect(alerts.length).toBeGreaterThan(0);
    });

    it('should filter alerts by region when specified', () => {
      const alerts = getActiveAlerts('Kerala');
      expect(Array.isArray(alerts)).toBe(true);
      alerts.forEach(alert => {
        expect(alert.region).toBe('Kerala');
      });
    });
  });

  describe('getSeverityLevel', () => {
    it('should return correct numeric levels for severity strings', () => {
      expect(getSeverityLevel('low')).toBe(1);
      expect(getSeverityLevel('moderate')).toBe(2);
      expect(getSeverityLevel('high')).toBe(3);
      expect(getSeverityLevel('severe')).toBe(3);
      expect(getSeverityLevel('unknown')).toBe(1);
    });
  });

  describe('formatAlert', () => {
    it('should return null for null input', () => {
      const result = formatAlert(null);
      expect(result).toBeNull();
    });

    it('should format alert with additional properties', () => {
      const alert = {
        id: 1,
        type: 'flood',
        title: 'Flood Warning',
        description: 'Heavy rainfall expected',
        severity: 'moderate',
        issued: new Date().toISOString(),
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        region: 'Kerala'
      };
      
      const formatted = formatAlert(alert);
      expect(formatted).toBeDefined();
      expect(formatted.severityLevel).toBe(2);
      expect(formatted.issuedFormatted).toBeDefined();
      expect(formatted.expiresFormatted).toBeDefined();
      expect(formatted.timeRemaining).toBeDefined();
    });
  });

  describe('getTimeRemaining', () => {
    it('should return "Expired" for past dates', () => {
      const pastDate = new Date(Date.now() - 1000).toISOString();
      const result = getTimeRemaining(pastDate);
      expect(result).toBe('Expired');
    });

    it('should return days for future dates more than a day away', () => {
      const futureDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();
      const result = getTimeRemaining(futureDate);
      expect(result).toContain('day');
    });

    it('should return hours for future dates less than a day away', () => {
      const futureDate = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
      const result = getTimeRemaining(futureDate);
      expect(result).toContain('hour');
    });

    it('should return minutes for future dates less than an hour away', () => {
      const futureDate = new Date(Date.now() + 30 * 60 * 1000).toISOString();
      const result = getTimeRemaining(futureDate);
      expect(result).toContain('minute');
    });
  });

  describe('getAlertColor', () => {
    it('should return correct color classes for severity levels', () => {
      expect(getAlertColor('low')).toContain('blue');
      expect(getAlertColor('moderate')).toContain('yellow');
      expect(getAlertColor('high')).toContain('red');
      expect(getAlertColor('severe')).toContain('red');
      expect(getAlertColor('unknown')).toContain('gray');
    });
  });

  describe('getHistoricalDisasterData', () => {
    it('should return historical disaster data', () => {
      const data = getHistoricalDisasterData();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it('should filter historical data by region when specified', () => {
      const data = getHistoricalDisasterData('Kerala');
      expect(Array.isArray(data)).toBe(true);
      data.forEach(disaster => {
        expect(disaster.region).toBe('Kerala');
      });
    });
  });
});