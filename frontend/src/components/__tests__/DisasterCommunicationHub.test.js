import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DisasterCommunicationHub from '../DisasterCommunicationHub';

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}));

// Mock the utility functions
jest.mock('../../utils/disasterCommunicationHub', () => ({
  getCommunicationChannels: () => [
    {
      id: 1,
      name: 'Test Channel',
      type: 'radio',
      frequency: '162.550 MHz',
      coverage: 'Statewide',
      status: 'active',
      contact: '+91-11-2345-6789',
      region: 'All'
    }
  ],
  getEmergencyBroadcastInfo: () => ({
    tvChannels: [{ id: 1, name: 'Test TV', language: 'Hindi', transmission: '24/7', coverage: 'National', contact: '+91-11-2345-6789' }],
    radioStations: [{ id: 1, name: 'Test Radio', frequency: '162.550 MHz', transmission: '24/7', coverage: 'National', contact: '+91-44-5678-9012' }],
    smsAlerts: { service: 'Test SMS', shortcode: '144', provider: 'Test Provider', coverage: 'All Networks' },
    lastUpdated: new Date().toISOString()
  }),
  getCommunicationEquipment: () => [
    {
      id: 1,
      name: 'Test Equipment',
      type: 'communication',
      quantity: 10,
      available: 8,
      location: 'Test Location',
      contact: '+91-11-1234-5678',
      region: 'All'
    }
  ],
  getCommunicationProtocols: () => ({
    immediate: ['Step 1', 'Step 2'],
    shortTerm: ['Step 3', 'Step 4'],
    longTerm: ['Step 5', 'Step 6']
  }),
  getEmergencyContacts: () => [
    {
      id: 1,
      name: 'Test Contact',
      phone: '112',
      type: 'emergency',
      availability: '24/7',
      region: 'All'
    }
  ]
}));

describe('DisasterCommunicationHub', () => {
  test('renders without crashing', () => {
    render(<DisasterCommunicationHub />);
    expect(screen.getByText('disasterCommunicationHub.title')).toBeInTheDocument();
  });

  test('displays communication channels table', () => {
    render(<DisasterCommunicationHub />);
    expect(screen.getByText('disasterCommunicationHub.communicationChannels')).toBeInTheDocument();
  });

  test('displays emergency broadcast information', () => {
    render(<DisasterCommunicationHub />);
    expect(screen.getByText('disasterCommunicationHub.broadcastInfo')).toBeInTheDocument();
  });

  test('displays communication equipment', () => {
    render(<DisasterCommunicationHub />);
    expect(screen.getByText('disasterCommunicationHub.equipment')).toBeInTheDocument();
  });

  test('displays communication protocols', () => {
    render(<DisasterCommunicationHub />);
    expect(screen.getByText('disasterCommunicationHub.protocols')).toBeInTheDocument();
  });

  test('displays emergency contacts', () => {
    render(<DisasterCommunicationHub />);
    expect(screen.getByText('disasterCommunicationHub.emergencyContacts')).toBeInTheDocument();
  });
});