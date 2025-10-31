import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import DisasterRecoveryStatus from '../DisasterRecoveryStatus';

// Mock the utility functions
jest.mock('../../utils/disasterRecoveryStatus', () => ({
  getRecoveryStatus: jest.fn(() => ({
    overallProgress: 78,
    phases: {
      immediate: { completed: true, progress: 100 },
      shortTerm: { completed: true, progress: 95 },
      mediumTerm: { completed: false, progress: 65 },
      longTerm: { completed: false, progress: 25 }
    },
    keyMetrics: {
      homesRebuilt: 185000,
      infrastructureRestored: 87,
      economicRecovery: 72,
      communityResilience: 85
    },
    lastUpdated: new Date().toISOString()
  })),
  getRecoveryTasks: jest.fn(() => [
    {
      id: 1,
      title: 'Temporary Shelter Construction',
      description: 'Build temporary shelters for displaced families',
      priority: 'high',
      status: 'completed',
      progress: 100,
      assignedTo: 'Construction Team A',
      estimatedCompletion: '2025-06-15',
      actualCompletion: '2025-06-10'
    },
    {
      id: 2,
      title: 'Water Supply Restoration',
      description: 'Restore clean water supply to affected areas',
      priority: 'critical',
      status: 'in-progress',
      progress: 75,
      assignedTo: 'Utilities Team',
      estimatedCompletion: '2025-07-20',
      actualCompletion: null
    }
  ]),
  getRecoveryFunding: jest.fn(() => ({
    totalAllocated: 5000000000,
    totalDisbursed: 3200000000,
    totalUtilized: 2950000000,
    remaining: 1800000000,
    fundingSources: [
      {
        source: 'Central Government',
        amount: 2500000000,
        percentage: 50
      },
      {
        source: 'State Government',
        amount: 1500000000,
        percentage: 30
      }
    ],
    lastUpdated: new Date().toISOString()
  })),
  getCommunityIndicators: jest.fn(() => ({
    populationReturn: 85,
    employmentRate: 72,
    healthcareAccess: 90,
    educationContinuity: 78,
    mentalHealthSupport: 65,
    communityEngagement: 80,
    lastUpdated: new Date().toISOString()
  })),
  getRecoveryTimeline: jest.fn(() => [
    {
      date: '2025-06-01',
      event: 'Immediate Response Phase Completed',
      description: 'All emergency response activities concluded successfully',
      milestone: true
    },
    {
      date: '2025-08-15',
      event: 'Temporary Shelters Operational',
      description: '100% of temporary shelters completed and occupied',
      milestone: true
    }
  ])
}));

const renderWithProviders = (component) => {
  return render(
    <I18nextProvider i18n={i18n}>
      {component}
    </I18nextProvider>
  );
};

describe('DisasterRecoveryStatus Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    renderWithProviders(<DisasterRecoveryStatus />);
    
    expect(screen.getByText('Disaster Recovery Status')).toBeInTheDocument();
    expect(screen.getByText('Select Region')).toBeInTheDocument();
  });

  test('displays overall progress', () => {
    renderWithProviders(<DisasterRecoveryStatus />);
    
    expect(screen.getByText('Overall Recovery Progress')).toBeInTheDocument();
    expect(screen.getByText('78%')).toBeInTheDocument();
  });

  test('displays recovery phases', () => {
    renderWithProviders(<DisasterRecoveryStatus />);
    
    expect(screen.getByText('Recovery Phases')).toBeInTheDocument();
    expect(screen.getByText('Immediate Response')).toBeInTheDocument();
    expect(screen.getByText('Short-term Recovery')).toBeInTheDocument();
    expect(screen.getByText('Medium-term Rehabilitation')).toBeInTheDocument();
    expect(screen.getByText('Long-term Reconstruction')).toBeInTheDocument();
  });

  test('displays key metrics', () => {
    renderWithProviders(<DisasterRecoveryStatus />);
    
    expect(screen.getByText('Key Recovery Metrics')).toBeInTheDocument();
    expect(screen.getByText('Homes Rebuilt')).toBeInTheDocument();
    expect(screen.getByText('Infrastructure Restored')).toBeInTheDocument();
    expect(screen.getByText('Economic Recovery')).toBeInTheDocument();
    expect(screen.getByText('Community Resilience')).toBeInTheDocument();
  });

  test('displays recovery tasks', () => {
    renderWithProviders(<DisasterRecoveryStatus />);
    
    expect(screen.getByText('Recovery Tasks')).toBeInTheDocument();
    expect(screen.getByText('Temporary Shelter Construction')).toBeInTheDocument();
    expect(screen.getByText('Water Supply Restoration')).toBeInTheDocument();
  });

  test('displays funding information', () => {
    renderWithProviders(<DisasterRecoveryStatus />);
    
    expect(screen.getByText('Recovery Funding')).toBeInTheDocument();
    expect(screen.getByText('Total Allocated')).toBeInTheDocument();
    expect(screen.getByText('₹5,000,000,000')).toBeInTheDocument();
    expect(screen.getByText('Funding Sources')).toBeInTheDocument();
    expect(screen.getByText('Central Government')).toBeInTheDocument();
    expect(screen.getByText('State Government')).toBeInTheDocument();
  });

  test('displays community indicators', () => {
    renderWithProviders(<DisasterRecoveryStatus />);
    
    expect(screen.getByText('Community Recovery Indicators')).toBeInTheDocument();
    expect(screen.getByText('Population Return')).toBeInTheDocument();
    expect(screen.getByText('Employment Rate')).toBeInTheDocument();
    expect(screen.getByText('Healthcare Access')).toBeInTheDocument();
  });

  test('displays recovery timeline', () => {
    renderWithProviders(<DisasterRecoveryStatus />);
    
    expect(screen.getByText('Recovery Timeline')).toBeInTheDocument();
    expect(screen.getByText('Immediate Response Phase Completed')).toBeInTheDocument();
    expect(screen.getByText('Temporary Shelters Operational')).toBeInTheDocument();
  });

  test('allows region selection', () => {
    renderWithProviders(<DisasterRecoveryStatus />);
    
    const regionSelect = screen.getByLabelText('Select Region');
    fireEvent.change(regionSelect, { target: { value: 'Maharashtra' } });
    
    expect(regionSelect.value).toBe('Maharashtra');
  });

  test('updates data when region changes', () => {
    renderWithProviders(<DisasterRecoveryStatus />);
    
    const regionSelect = screen.getByLabelText('Select Region');
    fireEvent.change(regionSelect, { target: { value: 'Odisha' } });
    
    // Verify that the utility functions are called with the new region
    expect(require('../../utils/disasterRecoveryStatus').getRecoveryStatus).toHaveBeenCalledWith('Odisha');
    expect(require('../../utils/disasterRecoveryStatus').getRecoveryTasks).toHaveBeenCalledWith('Odisha');
    expect(require('../../utils/disasterRecoveryStatus').getRecoveryFunding).toHaveBeenCalledWith('Odisha');
    expect(require('../../utils/disasterRecoveryStatus').getCommunityIndicators).toHaveBeenCalledWith('Odisha');
    expect(require('../../utils/disasterRecoveryStatus').getRecoveryTimeline).toHaveBeenCalledWith('Odisha');
  });
});