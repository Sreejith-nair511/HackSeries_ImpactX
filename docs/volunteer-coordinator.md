# Volunteer Coordinator Feature

## Overview
The Volunteer Coordinator is a comprehensive feature designed to manage volunteers during disaster response and recovery efforts in India. It provides tools for volunteer matching, task assignment, communication planning, hour tracking, and shift scheduling.

## Features

### 1. Volunteer Matching
- Matches volunteers with disaster response needs based on skills and location
- Calculates suitability scores considering skills, proximity, experience, and availability
- Supports multiple disaster types with specific skill requirements

### 2. Task Assignment
- Assigns volunteers to specific tasks based on their skills
- Prioritizes tasks and allocates appropriate number of volunteers
- Tracks assignments with timestamps

### 3. Communication Planning
- Groups volunteers by location for regional coordination
- Creates communication channels for different purposes
- Generates contact lists for easy communication

### 4. Hour Tracking
- Tracks volunteer hours for recognition and reporting
- Calculates recognition levels (bronze, silver, gold, platinum)
- Identifies top contributors and generates statistics

### 5. Shift Scheduling
- Schedules volunteer shifts based on availability and skills
- Balances workload across volunteers
- Tracks volunteer utilization

## Technical Implementation

### Utility Functions
The feature is powered by utility functions in `frontend/src/utils/volunteerCoordinator.js`:

- `matchVolunteersToNeeds()`: Matches volunteers with disaster needs
- `assignVolunteersToTasks()`: Assigns volunteers to specific tasks
- `generateCommunicationPlan()`: Creates communication plans
- `trackVolunteerHours()`: Tracks volunteer hours and generates reports
- `scheduleVolunteerShifts()`: Schedules volunteer shifts

### Component
The main component is `VolunteerCoordinator.jsx` which provides a tabbed interface for all features:

- Matching Tab: Displays volunteer matches with suitability scores
- Assignments Tab: Shows task assignments
- Communication Tab: Displays communication plans
- Tracking Tab: Shows hour tracking and recognition
- Scheduling Tab: Displays shift schedules

## Disaster Types Supported
- Flood
- Earthquake
- Cyclone
- Drought
- Landslide
- Fire

## Languages Supported
- English
- Hindi
- Tamil
- Telugu
- Marathi
- Bengali
- Gujarati

## Usage
1. Select a disaster type and location
2. View matched volunteers in the Matching tab
3. Assign volunteers to tasks in the Assignments tab
4. Coordinate communication in the Communication tab
5. Track volunteer hours in the Tracking tab
6. Schedule shifts in the Scheduling tab

## Data Structure

### Volunteer Object
```javascript
{
  id: 'unique-id',
  name: 'Volunteer Name',
  skills: ['skill1', 'skill2'],
  location: { lat: 19.0760, lng: 72.8777 },
  experience: { disasterResponse: 5 },
  availability: { 
    immediate: true, 
    days: [0, 1, 2, 3, 4, 5, 6], 
    timeRanges: [{ start: 8, end: 20 }] 
  },
  communicationPreferences: { emergency: true, taskUpdates: true },
  contact: { phone: '9876543210', email: 'volunteer@example.com' },
  role: 'Volunteer Role'
}
```

### Task Object
```javascript
{
  id: 'task-id',
  name: 'Task Name',
  requiredSkills: ['skill1', 'skill2'],
  requiredVolunteers: 3,
  priority: 5
}
```

### Shift Object
```javascript
{
  id: 'shift-id',
  name: 'Shift Name',
  startTime: 'ISO Timestamp',
  endTime: 'ISO Timestamp',
  requiredSkills: ['skill1'],
  requiredVolunteers: 2,
  priority: 5,
  role: 'Role Name'
}
```

## Recognition Levels
- **Platinum**: 100+ hours
- **Gold**: 50-99 hours
- **Silver**: 20-49 hours
- **Bronze**: 0-19 hours

## Future Enhancements
- Integration with SMS and email notification systems
- Mobile app support for volunteers
- Real-time location tracking
- Performance analytics dashboard
- Integration with government disaster management systems