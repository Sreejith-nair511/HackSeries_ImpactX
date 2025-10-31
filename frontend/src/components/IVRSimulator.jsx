import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const IVRSimulator = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userInput, setUserInput] = useState('');
  const [callHistory, setCallHistory] = useState([]);
  const [isCalling, setIsCalling] = useState(false);
  const [timer, setTimer] = useState(0);

  // Mock IVR menu options
  const menuOptions = {
    welcome: {
      message: "Welcome to ImpactX Emergency Response System. Press 1 for disaster reporting, Press 2 for emergency contacts, Press 3 for weather alerts, Press 4 for volunteer coordination, Press 0 for operator.",
      options: ['1', '2', '3', '4', '0']
    },
    disasterReporting: {
      message: "Press 1 to report a flood, Press 2 for earthquake, Press 3 for cyclone, Press 4 for drought, Press 5 for landslide, Press 6 for fire, Press 7 for epidemic, Press 8 for chemical hazard, Press 9 for other, Press 0 to go back.",
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    },
    emergencyContacts: {
      message: "Press 1 for police, Press 2 for fire department, Press 3 for ambulance, Press 4 for disaster management, Press 0 to go back.",
      options: ['1', '2', '3', '4', '0']
    },
    weatherAlerts: {
      message: "Press 1 for current weather, Press 2 for weather alerts, Press 0 to go back.",
      options: ['1', '2', '0']
    },
    volunteerCoordination: {
      message: "Press 1 to register as volunteer, Press 2 to find volunteer opportunities, Press 0 to go back.",
      options: ['1', '2', '0']
    },
    operator: {
      message: "Connecting you to an operator. Please wait.",
      options: []
    }
  };

  // Timer for call duration
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

  const handleStartCall = () => {
    setIsCalling(true);
    setCurrentStep('welcome');
    setUserInput('');
    setCallHistory([{ step: 'welcome', message: menuOptions.welcome.message, time: new Date() }]);
  };

  const handleEndCall = () => {
    setIsCalling(false);
    setCurrentStep('welcome');
    setUserInput('');
    setCallHistory(prev => [...prev, { step: 'end', message: 'Call ended', time: new Date() }]);
  };

  const handleInput = (input) => {
    if (!isCalling) return;

    // Add user input to history
    const newHistory = [...callHistory, { step: 'user', message: `Pressed: ${input}`, time: new Date() }];
    
    // Process the input based on current step
    let nextStep = currentStep;
    let responseMessage = '';

    switch (currentStep) {
      case 'welcome':
        switch (input) {
          case '1':
            nextStep = 'disasterReporting';
            responseMessage = menuOptions.disasterReporting.message;
            break;
          case '2':
            nextStep = 'emergencyContacts';
            responseMessage = menuOptions.emergencyContacts.message;
            break;
          case '3':
            nextStep = 'weatherAlerts';
            responseMessage = menuOptions.weatherAlerts.message;
            break;
          case '4':
            nextStep = 'volunteerCoordination';
            responseMessage = menuOptions.volunteerCoordination.message;
            break;
          case '0':
            nextStep = 'operator';
            responseMessage = menuOptions.operator.message;
            break;
          default:
            responseMessage = "Invalid input. " + menuOptions.welcome.message;
        }
        break;
        
      case 'disasterReporting':
        if (input === '0') {
          nextStep = 'welcome';
          responseMessage = menuOptions.welcome.message;
        } else if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(input)) {
          responseMessage = "Thank you for your report. Our team will respond shortly. Press 0 to return to main menu.";
          nextStep = 'reportConfirmation';
        } else {
          responseMessage = "Invalid input. " + menuOptions.disasterReporting.message;
        }
        break;
        
      case 'reportConfirmation':
        if (input === '0') {
          nextStep = 'welcome';
          responseMessage = menuOptions.welcome.message;
        } else {
          responseMessage = "Press 0 to return to main menu.";
        }
        break;
        
      case 'emergencyContacts':
        if (input === '0') {
          nextStep = 'welcome';
          responseMessage = menuOptions.welcome.message;
        } else if (['1', '2', '3', '4'].includes(input)) {
          const contacts = {
            '1': 'Police: 100',
            '2': 'Fire Department: 101',
            '3': 'Ambulance: 102',
            '4': 'Disaster Management: 1078'
          };
          responseMessage = `Contact: ${contacts[input]}. Press 0 to return to main menu.`;
          nextStep = 'contactConfirmation';
        } else {
          responseMessage = "Invalid input. " + menuOptions.emergencyContacts.message;
        }
        break;
        
      case 'contactConfirmation':
        if (input === '0') {
          nextStep = 'welcome';
          responseMessage = menuOptions.welcome.message;
        } else {
          responseMessage = "Press 0 to return to main menu.";
        }
        break;
        
      case 'weatherAlerts':
        if (input === '0') {
          nextStep = 'welcome';
          responseMessage = menuOptions.welcome.message;
        } else if (['1', '2'].includes(input)) {
          responseMessage = input === '1' 
            ? "Current weather: Clear skies, 28°C. Press 0 to return to main menu." 
            : "No active weather alerts. Press 0 to return to main menu.";
          nextStep = 'weatherConfirmation';
        } else {
          responseMessage = "Invalid input. " + menuOptions.weatherAlerts.message;
        }
        break;
        
      case 'weatherConfirmation':
        if (input === '0') {
          nextStep = 'welcome';
          responseMessage = menuOptions.welcome.message;
        } else {
          responseMessage = "Press 0 to return to main menu.";
        }
        break;
        
      case 'volunteerCoordination':
        if (input === '0') {
          nextStep = 'welcome';
          responseMessage = menuOptions.welcome.message;
        } else if (['1', '2'].includes(input)) {
          responseMessage = input === '1' 
            ? "Thank you for registering as a volunteer. Our team will contact you soon. Press 0 to return to main menu." 
            : "Current volunteer opportunities: Flood relief in Kerala, Earthquake response in Gujarat. Press 0 to return to main menu.";
          nextStep = 'volunteerConfirmation';
        } else {
          responseMessage = "Invalid input. " + menuOptions.volunteerCoordination.message;
        }
        break;
        
      case 'volunteerConfirmation':
        if (input === '0') {
          nextStep = 'welcome';
          responseMessage = menuOptions.welcome.message;
        } else {
          responseMessage = "Press 0 to return to main menu.";
        }
        break;
        
      case 'operator':
        responseMessage = "Thank you for calling ImpactX. An operator will assist you shortly.";
        break;
        
      default:
        nextStep = 'welcome';
        responseMessage = menuOptions.welcome.message;
    }

    setCurrentStep(nextStep);
    setUserInput('');
    setCallHistory([...newHistory, { step: nextStep, message: responseMessage, time: new Date() }]);
  };

  const handleKeyPress = (key) => {
    if (!isCalling) return;
    setUserInput(key);
    handleInput(key);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {t('ivrSimulator.title')}
      </h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold text-gray-700">
            {isCalling ? t('ivrSimulator.inProgress') : t('ivrSimulator.ready')}
          </div>
          {isCalling && (
            <div className="text-sm font-medium text-gray-500">
              {formatTime(timer)}
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 h-48 overflow-y-auto mb-4">
          {callHistory.length > 0 ? (
            callHistory.map((entry, index) => (
              <div key={index} className="mb-2">
                <div className="text-xs text-gray-500">
                  {entry.time.toLocaleTimeString()}
                </div>
                <div className={`p-2 rounded ${entry.step === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                  {entry.message}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic">
              {t('ivrSimulator.noActiveCall')}
            </div>
          )}
        </div>
        
        <div className="flex justify-center space-x-4 mb-6">
          {!isCalling ? (
            <button
              onClick={handleStartCall}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              {t('ivrSimulator.startCall')}
            </button>
          ) : (
            <button
              onClick={handleEndCall}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              {t('ivrSimulator.endCall')}
            </button>
          )}
        </div>
      </div>
      
      {isCalling && (
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            {t('ivrSimulator.dialpad')}
          </h3>
          
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key.toString())}
                className="h-16 bg-white rounded-lg shadow hover:bg-gray-50 active:bg-gray-200 transition-colors flex items-center justify-center text-xl font-bold text-gray-800"
                disabled={!isCalling}
              >
                {key}
              </button>
            ))}
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            {t('ivrSimulator.instructions')}
          </div>
        </div>
      )}
      
      <div className="mt-8 bg-blue-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {t('ivrSimulator.howItWorks')}
        </h3>
        <p className="text-gray-600 mb-3">
          {t('ivrSimulator.description')}
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>{t('ivrSimulator.feature1')}</li>
          <li>{t('ivrSimulator.feature2')}</li>
          <li>{t('ivrSimulator.feature3')}</li>
          <li>{t('ivrSimulator.feature4')}</li>
        </ul>
      </div>
    </div>
  );
};

export default IVRSimulator;
