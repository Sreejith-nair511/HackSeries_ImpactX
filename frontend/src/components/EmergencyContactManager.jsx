import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getEmergencyContacts, searchEmergencyContacts, formatPhoneNumber } from '../utils/emergencyContactManager';

const EmergencyContactManager = () => {
  const { t, i18n } = useTranslation();
  const [selectedState, setSelectedState] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);

  // Indian states list
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  useEffect(() => {
    if (selectedState) {
      const contacts = getEmergencyContacts(selectedState);
      setAllContacts(contacts);
      setFilteredContacts(searchEmergencyContacts(contacts, searchTerm));
    } else {
      setAllContacts([]);
      setFilteredContacts([]);
    }
  }, [selectedState]);

  useEffect(() => {
    setFilteredContacts(searchEmergencyContacts(allContacts, searchTerm));
  }, [searchTerm, allContacts]);

  const handleCall = (phoneNumber) => {
    // In a real app, this would initiate a call
    alert(`${t('emergencyContacts.calling')} ${phoneNumber}`);
  };

  const handleCopy = (phoneNumber) => {
    navigator.clipboard.writeText(phoneNumber);
    alert(t('emergencyContacts.numberCopied'));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('emergencyContacts.title')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* State Selection */}
        <div>
          <label htmlFor="stateSelect" className="block text-sm font-medium text-gray-700 mb-2">
            {t('emergencyContacts.selectState')}
          </label>
          <select
            id="stateSelect"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('emergencyContacts.chooseState')}</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Search Box */}
        <div>
          <label htmlFor="searchContacts" className="block text-sm font-medium text-gray-700 mb-2">
            {t('emergencyContacts.search')}
          </label>
          <input
            type="text"
            id="searchContacts"
            placeholder={t('emergencyContacts.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Contacts Display */}
      {selectedState ? (
        filteredContacts.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">
              {t('emergencyContacts.contactsFor')} {selectedState}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContacts.map((contact, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                      <p className="text-sm text-gray-600 mt-1 capitalize">{contact.type}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {contact.type}
                    </span>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-mono text-blue-600">
                      {formatPhoneNumber(contact.phone)}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCall(contact.phone)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {t('emergencyContacts.call')}
                      </button>
                      <button
                        onClick={() => handleCopy(contact.phone)}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {t('emergencyContacts.copy')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">{t('emergencyContacts.noContactsFound')}</p>
          </div>
        )
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">{t('emergencyContacts.selectStateMessage')}</p>
        </div>
      )}

      {/* Quick Access Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">{t('emergencyContacts.quickAccess')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">100</div>
            <div className="text-sm text-gray-600">{t('emergencyContacts.police')}</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">101</div>
            <div className="text-sm text-gray-600">{t('emergencyContacts.fire')}</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">102</div>
            <div className="text-sm text-gray-600">{t('emergencyContacts.ambulance')}</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">1070</div>
            <div className="text-sm text-gray-600">{t('emergencyContacts.disaster')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactManager;