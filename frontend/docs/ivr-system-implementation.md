# IVR System Implementation Guide

## Overview

The Interactive Voice Response (IVR) system in the ImpactX disaster response platform provides 24/7 emergency access through voice and keypad interactions. This guide details the implementation of the IVR simulator and its integration with the platform's emergency response features.

## System Architecture

### Core Components

#### IVR Simulator Component
The IVR simulator provides a web-based interface for testing and demonstrating the IVR system:

```jsx
const IVRSimulator = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userInput, setUserInput] = useState('');
  const [callHistory, setCallHistory] = useState([]);
  const [isCalling, setIsCalling] = useState(false);
  
  // Menu options configuration
  const menuOptions = {
    welcome: {
      message: "Welcome to ImpactX Emergency Response System. Press 1 for disaster reporting, Press 2 for emergency contacts, Press 3 for weather alerts, Press 4 for volunteer coordination, Press 0 for operator.",
      options: ['1', '2', '3', '4', '0']
    }
    // Additional menu options...
  };
  
  // Handle user input
  const handleInput = (input) => {
    // Process input based on current step
    // Update call history and current step
  };
  
  return (
    // JSX for IVR simulator interface
  );
};
```

#### Call Flow Management
The system manages call flow through a state machine approach:

```javascript
const processCallFlow = (currentStep, userInput) => {
  const transitions = {
    welcome: {
      '1': 'disasterReporting',
      '2': 'emergencyContacts',
      '3': 'weatherAlerts',
      '4': 'volunteerCoordination',
      '0': 'operator'
    },
    disasterReporting: {
      '1': 'floodReport',
      '2': 'earthquakeReport',
      // Additional disaster types...
      '0': 'welcome'
    }
    // Additional state transitions...
  };
  
  return transitions[currentStep][userInput] || currentStep;
};
```

## Menu Structure

### Main Menu
The main IVR menu provides access to core emergency services:

1. **Disaster Reporting** (Press 1)
   - Flood reporting
   - Earthquake reporting
   - Cyclone reporting
   - Drought reporting
   - Landslide reporting
   - Fire reporting
   - Epidemic reporting
   - Chemical hazard reporting
   - Other disaster reporting

2. **Emergency Contacts** (Press 2)
   - Police services
   - Fire department
   - Ambulance services
   - Disaster management authorities

3. **Weather Alerts** (Press 3)
   - Current weather conditions
   - Weather alerts and warnings

4. **Volunteer Coordination** (Press 4)
   - Volunteer registration
   - Volunteer opportunity search

5. **Operator Assistance** (Press 0)
   - Connection to human operator

### Disaster Reporting Submenu
Detailed disaster reporting options:

```javascript
const disasterReportingMenu = {
  message: "Press 1 to report a flood, Press 2 for earthquake, Press 3 for cyclone, Press 4 for drought, Press 5 for landslide, Press 6 for fire, Press 7 for epidemic, Press 8 for chemical hazard, Press 9 for other, Press 0 to go back.",
  options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
};
```

## Integration Points

### Disaster Reporting System
The IVR system integrates with the platform's disaster reporting feature:

```javascript
const submitDisasterReport = (reportData) => {
  // Format report data from IVR input
  const formattedReport = {
    disasterType: reportData.type,
    location: reportData.location,
    severity: reportData.severity,
    description: reportData.description,
    timestamp: new Date().toISOString(),
    source: 'ivr'
  };
  
  // Submit to backend API
  return fetch('/api/disaster-reports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formattedReport)
  });
};
```

### Emergency Contact Database
Integration with emergency contact information:

```javascript
const getEmergencyContacts = (region, serviceType) => {
  // Fetch contacts from database
  return fetch(`/api/emergency-contacts?region=${region}&type=${serviceType}`)
    .then(response => response.json())
    .then(data => {
      // Format for IVR playback
      return data.contacts.map(contact => ({
        name: contact.serviceName,
        number: contact.phoneNumber,
        description: contact.description
      }));
    });
};
```

### Volunteer Coordination
Connection to volunteer management system:

```javascript
const findVolunteerOpportunities = (location, skills) => {
  return fetch('/api/volunteer-opportunities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      location: location,
      requiredSkills: skills
    })
  }).then(response => response.json());
};
```

## Audio Processing

### Text-to-Speech (TTS) Integration
The system uses TTS for voice prompts:

```javascript
const speakText = (text, language = 'en-US') => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Handle different languages
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => voice.lang === language);
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    speechSynthesis.speak(utterance);
  }
};
```

### Pre-recorded Audio
For critical alerts and multilingual support:

```javascript
const playAudioPrompt = (promptId, language = 'en') => {
  const audio = new Audio(`/audio/prompts/${promptId}_${language}.mp3`);
  audio.play().catch(error => {
    console.error('Audio playback failed:', error);
    // Fallback to TTS
    speakText(getTextPrompt(promptId), language);
  });
};
```

## Multi-Language Support

### Language Detection
Automatic language detection based on user preferences:

```javascript
const detectLanguage = (userInput) => {
  // Simple language detection based on input patterns
  const languagePatterns = {
    english: /^[0-9*#]$/,
    hindi: /^[\u0900-\u097F]$/,
    tamil: /^[\u0B80-\u0BFF]$/,
    telugu: /^[\u0C00-\u0C7F]$/,
    marathi: /^[\u0900-\u097F]$/,
    bengali: /^[\u0980-\u09FF]$/,
    gujarati: /^[\u0A80-\u0AFF]$/
  };
  
  // Return detected language or default to English
  for (const [language, pattern] of Object.entries(languagePatterns)) {
    if (pattern.test(userInput)) {
      return language;
    }
  }
  
  return 'english';
};
```

### Dynamic Content Translation
Real-time translation of IVR prompts:

```javascript
const translatePrompt = async (text, targetLanguage) => {
  // Use translation API for dynamic content
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: text,
      targetLanguage: targetLanguage
    })
  });
  
  const data = await response.json();
  return data.translatedText;
};
```

## Call Management Features

### Call Timer
Track call duration for analytics and billing:

```javascript
const useCallTimer = (isCalling) => {
  const [timer, setTimer] = useState(0);
  
  useEffect(() => {
    let interval;
    if (isCalling) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isCalling]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return { timer, formatTime };
};
```

### Call History
Maintain a record of IVR interactions:

```javascript
const logCallInteraction = (interaction) => {
  const callLog = {
    timestamp: new Date().toISOString(),
    userId: interaction.userId || 'anonymous',
    sessionId: interaction.sessionId,
    steps: interaction.steps,
    duration: interaction.duration,
    outcome: interaction.outcome
  };
  
  // Store in local storage or send to backend
  const existingLogs = JSON.parse(localStorage.getItem('ivrCallLogs') || '[]');
  existingLogs.push(callLog);
  localStorage.setItem('ivrCallLogs', JSON.stringify(existingLogs));
};
```

## Error Handling

### Invalid Input Management
Graceful handling of incorrect user inputs:

```javascript
const handleInvalidInput = (currentStep, userInput) => {
  const errorMessage = "Invalid input. Please try again.";
  
  // Play error message
  speakText(errorMessage);
  
  // Repeat current menu
  const currentMenu = menuOptions[currentStep];
  speakText(currentMenu.message);
  
  // Log invalid input for analytics
  logInvalidInput(currentStep, userInput);
};
```

### System Error Recovery
Recovery mechanisms for system failures:

```javascript
const handleSystemError = (error) => {
  console.error('IVR System Error:', error);
  
  // Play system error message
  speakText("We're experiencing technical difficulties. Please try again later or press 0 to speak with an operator.");
  
  // Log error for troubleshooting
  logSystemError(error);
  
  // Attempt to recover or escalate
  if (error.retryable) {
    setTimeout(() => retryLastAction(), 5000);
  } else {
    escalateToOperator();
  }
};
```

## Analytics and Monitoring

### Usage Analytics
Track IVR system usage patterns:

```javascript
const trackIVRUsage = (interaction) => {
  // Send analytics data
  analytics.track('IVR_Interaction', {
    menuPath: interaction.path,
    duration: interaction.duration,
    completion: interaction.completed,
    errors: interaction.errors
  });
};
```

### Performance Monitoring
Monitor system performance and response times:

```javascript
const monitorPerformance = () => {
  const performance = {
    responseTime: performance.now(),
    memoryUsage: performance.memory ? performance.memory.usedJSHeapSize : null,
    cpuUsage: navigator.hardwareConcurrency
  };
  
  // Send to monitoring service
  monitoringService.record('IVR_Performance', performance);
};
```

## Security Considerations

### Input Validation
Prevent malicious input and ensure data integrity:

```javascript
const validateUserInput = (input) => {
  // Sanitize input
  const sanitizedInput = input.replace(/[^0-9*#]/g, '');
  
  // Validate length
  if (sanitizedInput.length > 10) {
    throw new Error('Input too long');
  }
  
  // Validate characters
  if (!/^[0-9*#]*$/.test(sanitizedInput)) {
    throw new Error('Invalid characters');
  }
  
  return sanitizedInput;
};
```

### Privacy Protection
Protect user privacy and sensitive information:

```javascript
const anonymizeCallData = (callData) => {
  // Remove personally identifiable information
  const anonymized = {
    ...callData,
    userId: callData.userId ? hashUserId(callData.userId) : 'anonymous',
    location: callData.location ? anonymizeLocation(callData.location) : null,
    timestamp: callData.timestamp
  };
  
  return anonymized;
};
```

## Testing and Quality Assurance

### Unit Testing
Comprehensive testing of IVR logic:

```javascript
describe('IVR System', () => {
  test('should handle valid input correctly', () => {
    const result = processCallFlow('welcome', '1');
    expect(result).toBe('disasterReporting');
  });
  
  test('should handle invalid input gracefully', () => {
    const result = processCallFlow('welcome', '9');
    expect(result).toBe('welcome'); // Should remain on current step
  });
  
  test('should validate user input', () => {
    expect(() => validateUserInput('12345678901')).toThrow();
    expect(validateUserInput('123')).toBe('123');
  });
});
```

### Integration Testing
Test integration with backend services:

```javascript
describe('IVR Integration', () => {
  test('should submit disaster report successfully', async () => {
    const mockReport = { type: 'flood', location: 'Kerala' };
    
    fetch.mockResponseOnce(JSON.stringify({ success: true }));
    
    const result = await submitDisasterReport(mockReport);
    
    expect(result.success).toBe(true);
    expect(fetch).toHaveBeenCalledWith('/api/disaster-reports', expect.any(Object));
  });
});
```

## Future Enhancements

### AI-Powered Voice Recognition
Integration with voice recognition for hands-free operation:

```javascript
const recognizeVoiceCommand = async (audioStream) => {
  // Use Web Speech API or external service
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  
  return new Promise((resolve, reject) => {
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      resolve(transcript);
    };
    
    recognition.onerror = (event) => {
      reject(event.error);
    };
    
    recognition.start();
  });
};
```

### SMS Integration
Two-way SMS communication for areas with limited voice coverage:

```javascript
const handleSMSInteraction = (phoneNumber, message) => {
  // Parse SMS command
  const command = parseSMSCommand(message);
  
  // Process command and generate response
  const response = processCommand(command);
  
  // Send SMS response
  return sendSMS(phoneNumber, response);
};
```

## Conclusion

The IVR system implementation in the ImpactX platform provides a robust, accessible, and scalable solution for emergency response communication. By combining traditional IVR functionality with modern web technologies, the system ensures that critical emergency services remain available to all users, regardless of their technical capabilities or device limitations.