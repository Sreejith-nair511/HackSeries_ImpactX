import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DisasterAlerts from '../DisasterAlerts';

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}));

// Mock the disaster alerts utilities
jest.mock('../../utils/disasterAlerts', () => ({
  getActiveAlerts: jest.fn(),
  formatAlert: jest.fn(),
  getAlertColor: jest.fn()
}));

const mockAlerts = [
  {
    id: 1,
    type: 'flood',
    title: 'Flood Warning',
    description: 'Heavy rainfall expected in the region.',
    severity: 'moderate',
    issuedFormatted: '2023-01-01',
    expiresFormatted: '2023-01-02',
    timeRemaining: '1 day',
    safetyTip: 'Stay informed about weather conditions.'
  }
];

describe('DisasterAlerts Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    require('../../utils/disasterAlerts').getActiveAlerts.mockReturnValue(mockAlerts);
    require('../../utils/disasterAlerts').formatAlert.mockImplementation(alert => alert);
    require('../../utils/disasterAlerts').getAlertColor.mockReturnValue('bg-yellow-100 text-yellow-800');
  });

  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <DisasterAlerts />
      </BrowserRouter>
    );
    expect(screen.getByText('weatherAlerts.title')).toBeInTheDocument();
  });

  it('displays alerts when data is available', async () => {
    render(
      <BrowserRouter>
        <DisasterAlerts />
      </BrowserRouter>
    );
    
    // Wait for the component to update with data
    setTimeout(() => {
      expect(screen.getByText('Flood Warning')).toBeInTheDocument();
      expect(screen.getByText('Heavy rainfall expected in the region.')).toBeInTheDocument();
    }, 0);
  });

  it('shows no alerts message when no data is available', () => {
    require('../../utils/disasterAlerts').getActiveAlerts.mockReturnValue([]);
    
    render(
      <BrowserRouter>
        <DisasterAlerts />
      </BrowserRouter>
    );
    
    expect(screen.getByText('weatherAlerts.noAlerts')).toBeInTheDocument();
  });
});