import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  getCommunicationChannels, 
  getEmergencyBroadcastInfo, 
  getCommunicationEquipment,
  getCommunicationProtocols,
  getEmergencyContacts
} from '../utils/disasterCommunicationHub';

const DisasterCommunicationHub = () => {
  const { t } = useTranslation();
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [communicationChannels, setCommunicationChannels] = useState([]);
  const [broadcastInfo, setBroadcastInfo] = useState({});
  const [equipment, setEquipment] = useState([]);
  const [selectedDisaster, setSelectedDisaster] = useState('flood');
  const [protocols, setProtocols] = useState({});
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  useEffect(() => {
    loadCommunicationData();
  }, [selectedRegion, selectedDisaster]);

  const loadCommunicationData = () => {
    setCommunicationChannels(getCommunicationChannels(selectedRegion));
    setBroadcastInfo(getEmergencyBroadcastInfo(selectedRegion));
    setEquipment(getCommunicationEquipment(selectedRegion));
    setProtocols(getCommunicationProtocols(selectedDisaster));
    setEmergencyContacts(getEmergencyContacts(selectedRegion));
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handleDisasterChange = (e) => {
    setSelectedDisaster(e.target.value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEquipmentAvailabilityColor = (available, quantity) => {
    const percentage = (available / quantity) * 100;
    if (percentage > 75) return 'bg-green-500';
    if (percentage > 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('disasterCommunicationHub.title')}</h1>
      
      {/* Region and Disaster Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
            {t('disasterCommunicationHub.selectRegion')}
          </label>
          <select
            id="region"
            value={selectedRegion}
            onChange={handleRegionChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="All">{t('disasterCommunicationHub.allRegions')}</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Gujarat">Gujarat</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="disaster" className="block text-sm font-medium text-gray-700 mb-2">
            {t('disasterCommunicationHub.selectDisaster')}
          </label>
          <select
            id="disaster"
            value={selectedDisaster}
            onChange={handleDisasterChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="flood">{t('disasterTypes.flood')}</option>
            <option value="earthquake">{t('disasterTypes.earthquake')}</option>
            <option value="cyclone">{t('disasterTypes.cyclone')}</option>
          </select>
        </div>
      </div>

      {/* Communication Channels */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('disasterCommunicationHub.communicationChannels')}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('disasterCommunicationHub.channelName')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('disasterCommunicationHub.type')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('disasterCommunicationHub.frequency')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('disasterCommunicationHub.coverage')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('disasterCommunicationHub.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('disasterCommunicationHub.contact')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {communicationChannels.map((channel) => (
                <tr key={channel.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {channel.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {channel.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {channel.frequency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {channel.coverage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(channel.status)}`}>
                      {channel.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {channel.contact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Emergency Broadcast Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('disasterCommunicationHub.broadcastInfo')}</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">{t('disasterCommunicationHub.tvChannels')}</h3>
            <div className="space-y-3">
              {broadcastInfo.tvChannels?.map((channel) => (
                <div key={channel.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-900">{channel.name}</h4>
                    <span className="text-sm text-gray-500">{channel.language}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>{t('disasterCommunicationHub.transmission')}: {channel.transmission}</p>
                    <p>{t('disasterCommunicationHub.coverage')}: {channel.coverage}</p>
                    <p>{t('disasterCommunicationHub.contact')}: {channel.contact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">{t('disasterCommunicationHub.radioStations')}</h3>
            <div className="space-y-3">
              {broadcastInfo.radioStations?.map((station) => (
                <div key={station.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-900">{station.name}</h4>
                    <span className="text-sm text-gray-500">{station.frequency}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>{t('disasterCommunicationHub.transmission')}: {station.transmission}</p>
                    <p>{t('disasterCommunicationHub.coverage')}: {station.coverage}</p>
                    <p>{t('disasterCommunicationHub.contact')}: {station.contact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-700 mb-2">{t('disasterCommunicationHub.smsAlerts')}</h3>
            <p className="text-sm text-gray-600">
              <strong>{t('disasterCommunicationHub.service')}:</strong> {broadcastInfo.smsAlerts?.service}
            </p>
            <p className="text-sm text-gray-600">
              <strong>{t('disasterCommunicationHub.shortcode')}:</strong> {broadcastInfo.smsAlerts?.shortcode}
            </p>
            <p className="text-sm text-gray-600">
              <strong>{t('disasterCommunicationHub.provider')}:</strong> {broadcastInfo.smsAlerts?.provider}
            </p>
          </div>
        </div>

        {/* Communication Equipment */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('disasterCommunicationHub.equipment')}</h2>
          <div className="space-y-4">
            {equipment.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.location}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {item.available}/{item.quantity}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">{t('disasterCommunicationHub.availability')}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {Math.round((item.available / item.quantity) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getEquipmentAvailabilityColor(item.available, item.quantity)}`}
                      style={{ width: `${(item.available / item.quantity) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {t('disasterCommunicationHub.contact')}: {item.contact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Communication Protocols */}
      <div className="bg-white rounded-lg shadow p-6 my-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {t('disasterCommunicationHub.protocols', { disaster: t(`disasterTypes.${selectedDisaster}`) })}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">{t('disasterCommunicationHub.immediateResponse')}</h3>
            <ul className="space-y-2">
              {protocols.immediate?.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-600">•</span>
                  <span className="ml-2 text-sm text-gray-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">{t('disasterCommunicationHub.shortTermResponse')}</h3>
            <ul className="space-y-2">
              {protocols.shortTerm?.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-600">•</span>
                  <span className="ml-2 text-sm text-gray-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">{t('disasterCommunicationHub.longTermResponse')}</h3>
            <ul className="space-y-2">
              {protocols.longTerm?.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-600">•</span>
                  <span className="ml-2 text-sm text-gray-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('disasterCommunicationHub.emergencyContacts')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyContacts.map((contact) => (
            <div key={contact.id} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900">{contact.name}</h3>
              <div className="mt-2">
                <p className="text-lg font-semibold text-indigo-600">{contact.phone}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {t('disasterCommunicationHub.type')}: {contact.type}
                </p>
                <p className="text-sm text-gray-500">
                  {t('disasterCommunicationHub.availability')}: {contact.availability}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisasterCommunicationHub;