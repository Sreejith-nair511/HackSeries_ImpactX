import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const EmergencyContacts = () => {
  const { t, i18n } = useTranslation();
  const [copiedContact, setCopiedContact] = useState(null);

  // Emergency contacts data for different states
  const emergencyContacts = {
    national: [
      {
        id: 1,
        name: t('emergencyContacts.national.police') || 'Police',
        number: '100',
        type: 'emergency',
        description: t('emergencyContacts.national.policeDesc') || 'For immediate police assistance'
      },
      {
        id: 2,
        name: t('emergencyContacts.national.ambulance') || 'Ambulance',
        number: '102',
        type: 'medical',
        description: t('emergencyContacts.national.ambulanceDesc') || 'For medical emergencies'
      },
      {
        id: 3,
        name: t('emergencyContacts.national.fire') || 'Fire Department',
        number: '101',
        type: 'fire',
        description: t('emergencyContacts.national.fireDesc') || 'For fire and rescue services'
      },
      {
        id: 4,
        name: t('emergencyContacts.national.disaster') || 'Disaster Management',
        number: '108',
        type: 'disaster',
        description: t('emergencyContacts.national.disasterDesc') || 'For disaster response and management'
      }
    ],
    maharashtra: [
      {
        id: 5,
        name: t('emergencyContacts.maharashtra.controlRoom') || 'State Control Room',
        number: '022-22021111',
        type: 'disaster',
        description: t('emergencyContacts.maharashtra.controlRoomDesc') || 'Maharashtra State Disaster Management Authority'
      },
      {
        id: 6,
        name: t('emergencyContacts.maharashtra.emergency') || 'Emergency Response',
        number: '022-22621111',
        type: 'emergency',
        description: t('emergencyContacts.maharashtra.emergencyDesc') || 'Integrated Emergency Response System'
      }
    ],
    odisha: [
      {
        id: 7,
        name: t('emergencyContacts.odisha.controlRoom') || 'State Control Room',
        number: '0674-2503300',
        type: 'disaster',
        description: t('emergencyContacts.odisha.controlRoomDesc') || 'Odisha State Disaster Management Authority'
      },
      {
        id: 8,
        name: t('emergencyContacts.odisha.emergency') || 'Emergency Response',
        number: '1070',
        type: 'emergency',
        description: t('emergencyContacts.odisha.emergencyDesc') || 'Odisha Emergency Response System'
      }
    ],
    kerala: [
      {
        id: 9,
        name: t('emergencyContacts.kerala.controlRoom') || 'State Control Room',
        number: '0471-2309111',
        type: 'disaster',
        description: t('emergencyContacts.kerala.controlRoomDesc') || 'Kerala State Disaster Management Authority'
      },
      {
        id: 10,
        name: t('emergencyContacts.kerala.emergency') || 'Emergency Response',
        number: '112',
        type: 'emergency',
        description: t('emergencyContacts.kerala.emergencyDesc') || 'Kerala Emergency Response System'
      }
    ]
  };

  const copyToClipboard = (number) => {
    navigator.clipboard.writeText(number);
    setCopiedContact(number);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  const callNumber = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {t('emergencyContacts.title') || 'Emergency Contacts'}
      </h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          {t('emergencyContacts.national.title') || 'National Emergency Numbers'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {emergencyContacts.national.map((contact) => (
            <div key={contact.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-800">{contact.name}</h4>
                <span className={`inline-block w-3 h-3 rounded-full ${
                  contact.type === 'emergency' ? 'bg-red-500' :
                  contact.type === 'medical' ? 'bg-blue-500' :
                  contact.type === 'fire' ? 'bg-orange-500' :
                  'bg-green-500'
                }`}></span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{contact.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">{contact.number}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => callNumber(contact.number)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                    aria-label={`${t('emergencyContacts.call')} ${contact.name}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => copyToClipboard(contact.number)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                    aria-label={`${t('emergencyContacts.copy')} ${contact.name}`}
                  >
                    {copiedContact === contact.number ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          {t('emergencyContacts.state.title') || 'State Emergency Numbers'}
        </h3>
        <div className="space-y-4">
          {Object.entries(emergencyContacts)
            .filter(([key]) => key !== 'national')
            .map(([state, contacts]) => (
              <div key={state} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3 capitalize">{state}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h5 className="font-medium text-gray-800">{contact.name}</h5>
                        <p className="text-sm text-gray-600">{contact.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-900">{contact.number}</span>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => callNumber(contact.number)}
                            className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                            aria-label={`${t('emergencyContacts.call')} ${contact.name}`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => copyToClipboard(contact.number)}
                            className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                            aria-label={`${t('emergencyContacts.copy')} ${contact.name}`}
                          >
                            {copiedContact === contact.number ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">
          {t('emergencyContacts.safetyTip') || 'Safety Tip'}
        </h3>
        <p className="text-blue-700 text-sm">
          {t('emergencyContacts.safetyTipDesc') || 'Save these numbers in your phone and keep this information easily accessible. In an emergency, every second counts.'}
        </p>
      </div>
    </div>
  );
};

export default EmergencyContacts;