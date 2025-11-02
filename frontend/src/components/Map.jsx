import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = ({ darkMode }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [disasterZones, setDisasterZones] = useState([]);
  const [mapKey, setMapKey] = useState(0); // Used to force re-render when dark mode changes
  const mapRef = useRef();

  // Sample campaign data for India with realistic sources
  const sampleCampaigns = [
    {
      id: 1,
      title: "Kerala Flood Relief",
      description: "Providing emergency aid to flood-affected families in Kerala",
      location: [10.8505, 76.2711],
      fundsRaised: "₹25,00,000",
      goal: "₹50,00,000",
      status: "active",
      source: "NDRF Kerala Unit"
    },
    {
      id: 2,
      title: "Rajasthan Drought Support",
      description: "Water conservation and distribution in drought-prone areas of Rajasthan",
      location: [27.0238, 74.2179],
      fundsRaised: "₹18,50,000",
      goal: "₹30,00,000",
      status: "active",
      source: "Government of Rajasthan"
    },
    {
      id: 3,
      title: "Himalayan Earthquake Recovery",
      description: "Rebuilding homes and infrastructure after the earthquake in Uttarakhand",
      location: [30.0668, 79.0193],
      fundsRaised: "₹42,00,000",
      goal: "₹42,00,000",
      status: "completed",
      source: "Ministry of Home Affairs"
    },
    {
      id: 4,
      title: "Odisha Cyclone Aid",
      description: "Emergency relief and rehabilitation after cyclone damage",
      location: [20.9517, 85.0985],
      fundsRaised: "₹15,75,000",
      goal: "₹35,00,000",
      status: "active",
      source: "NDRF Odisha Unit"
    },
    {
      id: 5,
      title: "Assam Flood Response",
      description: "Providing relief to flood-affected communities in Assam",
      location: [26.2006, 92.9376],
      fundsRaised: "₹8,25,000",
      goal: "₹20,00,000",
      status: "active",
      source: "Assam State Disaster Management Authority"
    },
    {
      id: 6,
      title: "Maharashtra Flood Relief",
      description: "Emergency response for monsoon floods in Mumbai and surrounding areas",
      location: [19.7515, 75.7139],
      fundsRaised: "₹32,00,000",
      goal: "₹40,00,000",
      status: "active",
      source: "NDRF Maharashtra Unit"
    }
  ];

  // Sample disaster risk zones
  const sampleDisasterZones = [
    {
      id: 1,
      name: "Kerala Flood Zone",
      center: [10.8505, 76.2711],
      radius: 50000, // 50km in meters
      riskLevel: "high",
      disasterType: "flood"
    },
    {
      id: 2,
      name: "Gujarat Earthquake Zone",
      center: [22.2587, 71.1924],
      radius: 100000, // 100km in meters
      riskLevel: "moderate",
      disasterType: "earthquake"
    },
    {
      id: 3,
      name: "Odisha Cyclone Zone",
      center: [20.9517, 85.0985],
      radius: 75000, // 75km in meters
      riskLevel: "high",
      disasterType: "cyclone"
    }
  ];

  useEffect(() => {
    // Simulate fetching campaign data
    setCampaigns(sampleCampaigns);
    setDisasterZones(sampleDisasterZones);
    // Force re-render when dark mode changes
    setMapKey(prev => prev + 1);
  }, [darkMode]);

  // Center of India
  const center = [20.5937, 78.9629];
  
  // Custom marker icon based on campaign status
  const getMarkerIcon = (status) => {
    const color = status === 'active' ? '#3b82f6' : '#10b981';
    return new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${status === 'active' ? 'blue' : 'green'}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  };

  // Get color based on risk level
  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return '#ef4444';
      case 'moderate': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  // Get fill opacity based on risk level
  const getFillOpacity = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return 0.3;
      case 'moderate': return 0.2;
      case 'low': return 0.1;
      default: return 0.1;
    }
  };

  return (
    <div className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <MapContainer 
        key={mapKey} // Force re-render when dark mode changes
        center={center} 
        zoom={5} 
        style={{ height: '400px', width: '100%' }}
        className={`${darkMode ? 'dark-map' : ''} rounded-2xl`}
        ref={mapRef}
      >
        <TileLayer
          url={darkMode 
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
          attribution={darkMode 
            ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
        />
        {campaigns.map(campaign => (
          <Marker 
            key={campaign.id} 
            position={campaign.location}
            icon={getMarkerIcon(campaign.status)}
          >
            <Popup>
              <div className={`max-w-xs ${darkMode ? 'dark-popup' : ''}`}>
                <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {campaign.title}
                </h3>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {campaign.description}
                </p>
                <div className="mt-2">
                  <div className="flex justify-between text-sm">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Raised:</span>
                    <span className="font-semibold">{campaign.fundsRaised}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Goal:</span>
                    <span className="font-semibold">{campaign.goal}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    campaign.status === 'active' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {campaign.status === 'active' ? 'Active' : 'Completed'}
                  </span>
                </div>
                <div className="mt-2 text-xs">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                    Source: {campaign.source}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        {disasterZones.map(zone => (
          <Circle
            key={zone.id}
            center={zone.center}
            radius={zone.radius}
            color={getRiskColor(zone.riskLevel)}
            fillColor={getRiskColor(zone.riskLevel)}
            fillOpacity={getFillOpacity(zone.riskLevel)}
            weight={2}
          >
            <Popup>
              <div className={`max-w-xs ${darkMode ? 'dark-popup' : ''}`}>
                <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {zone.name}
                </h3>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Risk Level: <span className="font-semibold capitalize">{zone.riskLevel}</span>
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Disaster Type: <span className="font-semibold capitalize">{zone.disasterType}</span>
                </p>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;