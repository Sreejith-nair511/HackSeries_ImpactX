import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const EmergencyContacts = () => {
  const { t, i18n } = useTranslation();
  const [copiedContact, setCopiedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [activeGroup, setActiveGroup] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Emergency contacts data for different states
  const emergencyContacts = {
    national: [
      {
        id: 1,
        name: t('emergencyContacts.national.police') || 'Police',
        number: '100',
        type: 'emergency',
        description: t('emergencyContacts.national.policeDesc') || 'For immediate police assistance',
        group: 'police'
      },
      {
        id: 2,
        name: t('emergencyContacts.national.ambulance') || 'Ambulance',
        number: '102',
        type: 'medical',
        description: t('emergencyContacts.national.ambulanceDesc') || 'For medical emergencies',
        group: 'medical'
      },
      {
        id: 3,
        name: t('emergencyContacts.national.fire') || 'Fire Department',
        number: '101',
        type: 'fire',
        description: t('emergencyContacts.national.fireDesc') || 'For fire and rescue services',
        group: 'fire'
      },
      {
        id: 4,
        name: t('emergencyContacts.national.disaster') || 'Disaster Management',
        number: '108',
        type: 'disaster',
        description: t('emergencyContacts.national.disasterDesc') || 'For disaster response and management',
        group: 'disaster'
      }
    ],
    maharashtra: [
      {
        id: 5,
        name: t('emergencyContacts.maharashtra.controlRoom') || 'State Control Room',
        number: '022-22021111',
        type: 'disaster',
        description: t('emergencyContacts.maharashtra.controlRoomDesc') || 'Maharashtra State Disaster Management Authority',
        group: 'disaster'
      },
      {
        id: 6,
        name: t('emergencyContacts.maharashtra.emergency') || 'Emergency Response',
        number: '022-22621111',
        type: 'emergency',
        description: t('emergencyContacts.maharashtra.emergencyDesc') || 'Integrated Emergency Response System',
        group: 'emergency'
      }
    ],
    odisha: [
      {
        id: 7,
        name: t('emergencyContacts.odisha.controlRoom') || 'State Control Room',
        number: '0674-2503300',
        type: 'disaster',
        description: t('emergencyContacts.odisha.controlRoomDesc') || 'Odisha State Disaster Management Authority',
        group: 'disaster'
      },
      {
        id: 8,
        name: t('emergencyContacts.odisha.emergency') || 'Emergency Response',
        number: '1070',
        type: 'emergency',
        description: t('emergencyContacts.odisha.emergencyDesc') || 'Odisha Emergency Response System',
        group: 'emergency'
      }
    ],
    kerala: [
      {
        id: 9,
        name: t('emergencyContacts.kerala.controlRoom') || 'State Control Room',
        number: '0471-2309111',
        type: 'disaster',
        description: t('emergencyContacts.kerala.controlRoomDesc') || 'Kerala State Disaster Management Authority',
        group: 'disaster'
      },
      {
        id: 10,
        name: t('emergencyContacts.kerala.emergency') || 'Emergency Response',
        number: '112',
        type: 'emergency',
        description: t('emergencyContacts.kerala.emergencyDesc') || 'Kerala Emergency Response System',
        group: 'emergency'
      }
    ]
  };

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('emergencyContactFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Failed to parse favorites from localStorage', e);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('emergencyContactFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const copyToClipboard = (number) => {
    navigator.clipboard.writeText(number);
    setCopiedContact(number);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  const callNumber = (number) => {
    window.location.href = `tel:${number}`;
  };

  // Toggle favorite status
  const toggleFavorite = (contactId) => {
    if (favorites.includes(contactId)) {
      setFavorites(favorites.filter(id => id !== contactId));
    } else {
      setFavorites([...favorites, contactId]);
    }
  };

  // Flatten all contacts into a single array
  const getAllContacts = () => {
    return Object.values(emergencyContacts).flat();
  };

  // Filter contacts based on search term, group, and favorites
  const getFilteredContacts = () => {
    let contacts = getAllContacts();
    
    // Filter by search term
    if (searchTerm) {
      contacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.number.includes(searchTerm) ||
        contact.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by group
    if (activeGroup !== 'all') {
      contacts = contacts.filter(contact => contact.group === activeGroup);
    }
    
    // Filter by favorites only
    if (showFavoritesOnly) {
      contacts = contacts.filter(contact => favorites.includes(contact.id));
    }
    
    return contacts;
  };

  // Get unique groups for filtering
  const getGroups = () => {
    const allContacts = getAllContacts();
    const groups = [...new Set(allContacts.map(contact => contact.group))];
    return groups;
  };

  // Group contacts by state/region
  const groupContactsByRegion = (contacts) => {
    const grouped = {};
    
    // Add national contacts first
    if (contacts.some(contact => emergencyContacts.national.some(nat => nat.id === contact.id))) {
      grouped.national = contacts.filter(contact => 
        emergencyContacts.national.some(nat => nat.id === contact.id)
      );
    }
    
    // Add state contacts
    Object.keys(emergencyContacts)
      .filter(key => key !== 'national')
      .forEach(state => {
        const stateContacts = contacts.filter(contact => 
          emergencyContacts[state].some(st => st.id === contact.id)
        );
        if (stateContacts.length > 0) {
          grouped[state] = stateContacts;
        }
      });
    
    return grouped;
  };

  const filteredContacts = getFilteredContacts();
  const groupedContacts = groupContactsByRegion(filteredContacts);
  const groups = getGroups();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 md:mb-0 text-gray-800">
          {t('emergencyContacts.title') || 'Emergency Contacts'}
        </h2>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder={t('emergencyContacts.searchPlaceholder') || 'Search contacts...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg 
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          onClick={() => {
            setActiveGroup('all');
            setShowFavoritesOnly(false);
          }}
          className={`px-3 py-1 rounded-full text-sm ${
            activeGroup === 'all' && !showFavoritesOnly
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t('emergencyContacts.all') || 'All'}
        </button>
        
        {groups.map(group => (
          <button
            key={group}
            onClick={() => {
              setActiveGroup(group);
              setShowFavoritesOnly(false);
            }}
            className={`px-3 py-1 rounded-full text-sm capitalize ${
              activeGroup === group && !showFavoritesOnly
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t(`emergencyContacts.groups.${group}`) || group}
          </button>
        ))}
        
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`px-3 py-1 rounded-full text-sm flex items-center ${
            showFavoritesOnly
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <svg 
            className={`h-4 w-4 mr-1 ${showFavoritesOnly ? 'text-white' : 'text-yellow-500'}`} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {t('emergencyContacts.favorites') || 'Favorites'}
        </button>
      </div>
      
      {/* Favorites Section */}
      {favorites.length > 0 && !showFavoritesOnly && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
            <svg 
              className="h-5 w-5 text-yellow-500 mr-2" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {t('emergencyContacts.favoriteContacts') || 'Favorite Contacts'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {getAllContacts()
              .filter(contact => favorites.includes(contact.id))
              .map(contact => (
                <div key={contact.id} className="border border-gray-200 rounded-lg p-3 bg-yellow-50 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-gray-800 text-sm truncate">{contact.name}</h4>
                    <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 mt-1 ${
                      contact.type === 'emergency' ? 'bg-red-500' :
                      contact.type === 'medical' ? 'bg-blue-500' :
                      contact.type === 'fire' ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}></span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 truncate">{contact.number}</p>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => callNumber(contact.number)}
                      className="p-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                      aria-label={`${t('emergencyContacts.call')} ${contact.name}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => copyToClipboard(contact.number)}
                      className="p-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                      aria-label={`${t('emergencyContacts.copy')} ${contact.name}`}
                    >
                      {copiedContact === contact.number ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      
      {/* Results Info */}
      <div className="mb-4 text-sm text-gray-600">
        {filteredContacts.length} {t('emergencyContacts.contactsFound') || 'contacts found'}
      </div>
      
      {/* Contacts by Region */}
      {Object.keys(groupedContacts).length > 0 ? (
        Object.entries(groupedContacts).map(([region, contacts]) => (
          <div key={region} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              {region === 'national' 
                ? (t('emergencyContacts.national.title') || 'National Emergency Numbers')
                : t(`states.${region}`) || region}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative">
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(contact.id)}
                    className="absolute top-2 right-2 p-1 rounded-full"
                    aria-label={favorites.includes(contact.id) 
                      ? t('emergencyContacts.removeFromFavorites') 
                      : t('emergencyContacts.addToFavorites')}
                  >
                    <svg 
                      className={`h-5 w-5 ${favorites.includes(contact.id) ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'}`} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                  
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
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          {t('emergencyContacts.noContactsFound') || 'No contacts found matching your search criteria.'}
        </div>
      )}
      
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