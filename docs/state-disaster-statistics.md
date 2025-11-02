# State-wise Disaster Statistics Feature

## Overview

The State-wise Disaster Statistics feature provides detailed information about various types of natural disasters affecting different states in India. This India-specific enhancement helps users understand the disaster patterns and frequency across the country.

## Implementation Details

### Component: StateDisasterStats.jsx

The component displays a table with disaster statistics for major Indian states, including:

- Floods
- Cyclones
- Earthquakes
- Droughts
- Total incidents

### Features

1. **State Filtering**: Users can select a specific state to view detailed statistics
2. **Multilingual Support**: Fully integrated with the application's i18n system
3. **Responsive Design**: Works seamlessly on all device sizes
4. **Data Visualization**: Clean tabular presentation of disaster data

### Data Structure

The component uses a static dataset for demonstration purposes, but in a production environment, this would be connected to a live data source:

```javascript
const disasterStats = [
  { state: 'Maharashtra', floods: 120, cyclones: 5, earthquakes: 2, droughts: 8, total: 135 },
  { state: 'West Bengal', floods: 95, cyclones: 12, earthquakes: 1, droughts: 5, total: 113 },
  // ... more states
];
```

### Translation Keys

The component uses the following translation keys:

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

## Integration

To use this component in a page:

```jsx
import StateDisasterStats from '../components/StateDisasterStats';

function DisasterStatisticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <StateDisasterStats />
    </div>
  );
}
```

## Future Enhancements

1. **Real-time Data Integration**: Connect to government disaster databases
2. **Chart Visualization**: Add graphical representation of the data
3. **Year-wise Filtering**: Allow users to view statistics for specific years
4. **Export Functionality**: Enable users to download the data in CSV format
5. **Predictive Analytics**: Integrate machine learning models for disaster prediction

## Testing

The component has been tested for:

- Responsiveness across different screen sizes
- Accessibility compliance
- Multilingual support
- Performance with large datasets

## Related Components

- [DisasterStatistics.jsx](./DisasterStatistics.jsx)
- [RegionalStats.jsx](./RegionalStats.jsx)
- [StateDisasterInfo.jsx](./StateDisasterInfo.jsx)

## API Endpoints

For future integration with live data, the following API endpoints are planned:

```
GET /api/disaster-stats/states
GET /api/disaster-stats/state/{stateName}
GET /api/disaster-stats/state/{stateName}/year/{year}
```