# StateDisasterStats Component Documentation

## Overview

The StateDisasterStats component is a React component that displays disaster statistics for Indian states in a tabular format. It allows users to filter the data by state and view detailed information about different types of disasters.

## Features

- State-wise disaster statistics display
- Interactive state filtering
- Responsive table design
- Multilingual support
- Data disclaimer for transparency

## Props

This component does not accept any props. It is self-contained and manages its own state.

## State

The component manages the following state:

- `selectedState`: The currently selected state for filtering
- `disasterData`: The disaster statistics data

## Usage

```jsx
import StateDisasterStats from './components/StateDisasterStats';

function App() {
  return (
    <div>
      <StateDisasterStats />
    </div>
  );
}
```

## Data Structure

The component uses the following data structure for disaster statistics:

```javascript
const disasterStats = [
  { 
    state: 'Maharashtra', 
    floods: 120, 
    cyclones: 5, 
    earthquakes: 2, 
    droughts: 8, 
    total: 135 
  },
  // ... additional states
];
```

## Styling

The component uses Tailwind CSS classes for styling and follows the application's design system.

## Accessibility

- Keyboard navigation support
- Proper ARIA labels
- Semantic HTML structure
- Screen reader compatibility

## Internationalization

The component uses react-i18next for translations. The following translation keys are used:

- `disaster_stats.title`
- `disaster_stats.select_state`
- `disaster_stats.state`
- `disaster_stats.floods`
- `disaster_stats.cyclones`
- `disaster_stats.earthquakes`
- `disaster_stats.droughts`
- `disaster_stats.total`
- `disaster_stats.disclaimer`
- `disaster_stats.disclaimer_text`

## Testing

The component includes unit tests located in `src/components/__tests__/StateDisasterStats.test.jsx`.

## Dependencies

- React
- react-i18next
- Tailwind CSS

## File Location

`src/components/StateDisasterStats.jsx`

## Related Components

- [DisasterStatisticsPage](./DisasterStatisticsPage.jsx)
- [DisasterStatsChart](./DisasterStatsChart.jsx)

## Version History

### v1.0.0
- Initial implementation
- State filtering functionality
- Table display of disaster statistics
- Multilingual support
- Responsive design