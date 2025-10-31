# Emergency Resource Tracker

The Emergency Resource Tracker is a comprehensive feature designed to help manage and track emergency resources during disaster response situations in India. This feature provides real-time visibility into available resources, enables resource requests, and tracks request status.

## Features

### 1. Resource Visualization
- View available emergency resources across different regions of India
- Filter resources by region (Maharashtra, Delhi, Kerala, Karnataka, Telangana)
- Display resource details including name, type, quantity, location, and availability

### 2. Resource Request System
- Submit requests for emergency resources during disaster situations
- Specify resource type, quantity, urgency level, location, and contact information
- Receive request confirmation with unique request ID and estimated delivery time

### 3. Request Tracking
- Track the status of submitted resource requests
- View current status (submitted, processing, dispatched, delivered)
- Get real-time updates on request location

### 4. Resource Statistics
- View overall resource allocation statistics
- Monitor total resources, allocated resources, and available resources
- Track pending and fulfilled requests with response rate metrics

## Technical Implementation

### Utility Functions
The Emergency Resource Tracker utility (`frontend/src/utils/emergencyResourceTracker.js`) provides the following functions:

- `getAvailableResources(region)`: Returns available emergency resources for a specified region
- `requestEmergencyResources(request)`: Submits a new emergency resource request
- `trackResourceRequest(requestId)`: Tracks the status of a specific resource request
- `getResourceTypes()`: Returns available resource types with categories
- `getResourceStatistics()`: Returns resource allocation statistics

### React Component
The Emergency Resource Tracker component (`frontend/src/components/EmergencyResourceTracker.jsx`) provides the user interface with:

- Region filtering capabilities
- Resource listing with detailed information
- Resource request form with validation
- Request status tracking
- Resource statistics dashboard

### Internationalization
The feature supports all Indian languages with complete translation files:
- English
- Hindi
- Tamil
- Telugu
- Marathi
- Bengali
- Gujarati

## Usage

### For Disaster Response Coordinators
1. Navigate to the Emergency Resource Tracker section
2. Select your region to view available resources
3. Submit resource requests as needed during emergency situations
4. Track request status to monitor delivery progress
5. Monitor resource statistics to understand allocation efficiency

### For System Administrators
1. Update resource data in the `getAvailableResources` function
2. Modify resource types in the `getResourceTypes` function
3. Adjust statistics calculations in the `getResourceStatistics` function

## API Integration

The current implementation uses mock data for demonstration purposes. For production deployment, integrate with a backend API by modifying the utility functions:

```javascript
// Example API integration
export const getAvailableResources = async (region) => {
  try {
    const response = await fetch(`/api/resources?region=${region}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
};
```

## Testing

Comprehensive test suites are available for both the utility functions and React component:
- Utility tests: `frontend/src/utils/__tests__/emergencyResourceTracker.test.js`
- Component tests: `frontend/src/components/__tests__/EmergencyResourceTracker.test.js`

Run tests using:
```bash
npm test emergencyResourceTracker
```

## Future Enhancements

1. Real-time notifications for request status updates
2. Integration with GPS tracking for resource delivery
3. Advanced filtering and search capabilities
4. Resource sharing between regions
5. Mobile-responsive design enhancements