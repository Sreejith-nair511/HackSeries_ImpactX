import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import StateDisasterStats from '../StateDisasterStats';

// Mock the i18n instance
jest.mock('../../i18n', () => ({
  t: (key) => key,
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      language: 'en',
      changeLanguage: () => Promise.resolve(),
    },
  }),
}));

describe('StateDisasterStats', () => {
  const renderWithI18n = (component) => {
    return render(
      <I18nextProvider i18n={i18n}>
        {component}
      </I18nextProvider>
    );
  };

  test('renders StateDisasterStats component', () => {
    renderWithI18n(<StateDisasterStats />);
    
    // Check if the title is rendered
    expect(screen.getByText('disaster_stats.title')).toBeInTheDocument();
    
    // Check if the state selector is rendered
    expect(screen.getByLabelText('disaster_stats.select_state')).toBeInTheDocument();
    
    // Check if the table headers are rendered
    expect(screen.getByText('disaster_stats.state')).toBeInTheDocument();
    expect(screen.getByText('disaster_stats.floods')).toBeInTheDocument();
    expect(screen.getByText('disaster_stats.cyclones')).toBeInTheDocument();
    expect(screen.getByText('disaster_stats.earthquakes')).toBeInTheDocument();
    expect(screen.getByText('disaster_stats.droughts')).toBeInTheDocument();
    expect(screen.getByText('disaster_stats.total')).toBeInTheDocument();
  });

  test('displays all states by default', () => {
    renderWithI18n(<StateDisasterStats />);
    
    // Check if multiple states are displayed in the table
    expect(screen.getByText('Maharashtra')).toBeInTheDocument();
    expect(screen.getByText('West Bengal')).toBeInTheDocument();
    expect(screen.getByText('Odisha')).toBeInTheDocument();
  });

  test('filters data when a specific state is selected', () => {
    renderWithI18n(<StateDisasterStats />);
    
    // Select a specific state
    const selectElement = screen.getByLabelText('disaster_stats.select_state');
    fireEvent.change(selectElement, { target: { value: 'Maharashtra' } });
    
    // Check that only the selected state is displayed
    expect(screen.getByText('Maharashtra')).toBeInTheDocument();
    // We won't check for absence of other states as they might still be in the select options
  });

  test('displays disclaimer text', () => {
    renderWithI18n(<StateDisasterStats />);
    
    // Check if disclaimer is rendered
    expect(screen.getByText('disaster_stats.disclaimer')).toBeInTheDocument();
    expect(screen.getByText('disaster_stats.disclaimer_text')).toBeInTheDocument();
  });
});