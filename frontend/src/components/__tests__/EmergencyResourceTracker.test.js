import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import EmergencyResourceTracker from '../EmergencyResourceTracker';

// Mock the utility functions
jest.mock('../../utils/emergencyResourceTracker', () => ({
  getAvailableResources: jest.fn(() => [
    {
      id: 1,
      name: 'Emergency Medical Kits',
      type: 'medical',
      quantity: 150,
      unit: 'kits',
      location: 'Mumbai Medical Center',
      contact: '+91-22-1234-5678',
      availability: '24/7',
      region: 'Maharashtra'
    }
  ]),
  requestEmergencyResources: jest.fn(() => ({
    requestId: 'REQ-1234',
    status: 'submitted',
    timestamp: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    resourceType: 'medical',
    quantity: 100,
    urgency: 'high',
    location: 'Test Location',
    contact: '+91-0000000000'
  })),
  trackResourceRequest: jest.fn(() => ({
    requestId: 'REQ-1234',
    status: 'processing',
    lastUpdated: new Date().toISOString(),
    location: 'Processing Center'
  })),
  getResourceTypes: jest.fn(() => [
    { id: 'medical', name: 'Medical Supplies', icon: '🏥' },
    { id: 'food', name: 'Food & Water', icon: '🍎' }
  ]),
  getResourceStatistics: jest.fn(() => ({
    totalResources: 12000,
    allocatedResources: 8500,
    availableResources: 3500,
    pendingRequests: 42,
    fulfilledRequests: 158,
    responseRate: '92%'
  }))
}));

const renderWithProviders = (component) => {
  return render(
    <I18nextProvider i18n={i18n}>
      {component}
    </I18nextProvider>
  );
};

describe('EmergencyResourceTracker Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    renderWithProviders(<EmergencyResourceTracker />);
    
    expect(screen.getByText('Emergency Resource Tracker')).toBeInTheDocument();
    expect(screen.getByText('Available Resources')).toBeInTheDocument();
    expect(screen.getByText('Request Resources')).toBeInTheDocument();
  });

  test('displays resource statistics', () => {
    renderWithProviders(<EmergencyResourceTracker />);
    
    expect(screen.getByText('12,000')).toBeInTheDocument();
    expect(screen.getByText('3,500')).toBeInTheDocument();
    expect(screen.getByText('92%')).toBeInTheDocument();
  });

  test('displays available resources', () => {
    renderWithProviders(<EmergencyResourceTracker />);
    
    expect(screen.getByText('Emergency Medical Kits')).toBeInTheDocument();
    expect(screen.getByText('150 kits')).toBeInTheDocument();
    expect(screen.getByText('Mumbai Medical Center')).toBeInTheDocument();
  });

  test('allows region filtering', () => {
    renderWithProviders(<EmergencyResourceTracker />);
    
    const regionSelect = screen.getByLabelText('Region:');
    fireEvent.change(regionSelect, { target: { value: 'Maharashtra' } });
    
    expect(regionSelect.value).toBe('Maharashtra');
  });

  test('handles resource request submission', () => {
    renderWithProviders(<EmergencyResourceTracker />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Resource Type'), { target: { value: 'medical' } });
    fireEvent.change(screen.getByLabelText('Quantity'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'Test Location' } });
    fireEvent.change(screen.getByLabelText('Contact'), { target: { value: '+91-0000000000' } });
    
    // Submit the form
    const submitButton = screen.getByText('Submit Request');
    fireEvent.click(submitButton);
    
    // Check that request was submitted
    expect(screen.getByText('REQ-1234')).toBeInTheDocument();
  });

  test('allows tracking resource requests', () => {
    renderWithProviders(<EmergencyResourceTracker />);
    
    // First submit a request to have something to track
    fireEvent.change(screen.getByLabelText('Resource Type'), { target: { value: 'medical' } });
    fireEvent.change(screen.getByLabelText('Quantity'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'Test Location' } });
    fireEvent.change(screen.getByLabelText('Contact'), { target: { value: '+91-0000000000' } });
    
    const submitButton = screen.getByText('Submit Request');
    fireEvent.click(submitButton);
    
    // Now track the request
    const trackButton = screen.getByText('Refresh Status');
    fireEvent.click(trackButton);
    
    // Check that status was updated
    expect(screen.getByText('processing')).toBeInTheDocument();
  });
});