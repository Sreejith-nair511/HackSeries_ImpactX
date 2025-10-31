import { 
  getCommunicationChannels, 
  getEmergencyBroadcastInfo, 
  getCommunicationEquipment,
  getCommunicationProtocols,
  getEmergencyContacts
} from '../disasterCommunicationHub';

describe('disasterCommunicationHub', () => {
  test('getCommunicationChannels returns channels for a region', () => {
    const channels = getCommunicationChannels('Maharashtra');
    expect(channels).toBeInstanceOf(Array);
    expect(channels.length).toBeGreaterThan(0);
    // Check that we get channels specific to Maharashtra or all regions
    const maharashtraChannels = channels.filter(channel => 
      channel.region === 'Maharashtra' || channel.region === 'All'
    );
    expect(maharashtraChannels.length).toBeGreaterThan(0);
  });

  test('getEmergencyBroadcastInfo returns broadcast information', () => {
    const broadcastInfo = getEmergencyBroadcastInfo('Maharashtra');
    expect(broadcastInfo).toBeInstanceOf(Object);
    expect(broadcastInfo.tvChannels).toBeInstanceOf(Array);
    expect(broadcastInfo.radioStations).toBeInstanceOf(Array);
    expect(broadcastInfo.smsAlerts).toBeInstanceOf(Object);
  });

  test('getCommunicationEquipment returns equipment list', () => {
    const equipment = getCommunicationEquipment('Maharashtra');
    expect(equipment).toBeInstanceOf(Array);
    expect(equipment.length).toBeGreaterThan(0);
    // Check that we get equipment specific to Maharashtra or all regions
    const maharashtraEquipment = equipment.filter(item => 
      item.region === 'Maharashtra' || item.region === 'All'
    );
    expect(maharashtraEquipment.length).toBeGreaterThan(0);
  });

  test('getCommunicationProtocols returns protocols for disaster type', () => {
    const protocols = getCommunicationProtocols('flood');
    expect(protocols).toBeInstanceOf(Object);
    expect(protocols.immediate).toBeInstanceOf(Array);
    expect(protocols.shortTerm).toBeInstanceOf(Array);
    expect(protocols.longTerm).toBeInstanceOf(Array);
  });

  test('getEmergencyContacts returns contacts for a region', () => {
    const contacts = getEmergencyContacts('Maharashtra');
    expect(contacts).toBeInstanceOf(Array);
    expect(contacts.length).toBeGreaterThan(0);
    // Check that we get contacts specific to Maharashtra or all regions
    const maharashtraContacts = contacts.filter(contact => 
      contact.region === 'Maharashtra' || contact.region === 'All'
    );
    expect(maharashtraContacts.length).toBeGreaterThan(0);
  });
});