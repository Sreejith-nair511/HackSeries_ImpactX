import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const data = await api.getCampaigns();
      setCampaigns(data.campaigns);
    } catch (err) {
      setError('Failed to fetch campaigns');
      console.error('Fetch campaigns error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Disaster Relief Campaigns</h1>
        <Link 
          to="/donate" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Donate to a Campaign
        </Link>
      </div>
      
      {campaigns.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No campaigns available at the moment.</p>
          <Link 
            to="/donate" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Be the first to donate →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{campaign.title}</h2>
                <p className="text-gray-600 mb-4">{campaign.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Goal</p>
                    <p className="font-semibold">{campaign.goal / 1000000} ALGO</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created by</p>
                    <p className="font-semibold text-sm">{campaign.creator.email}</p>
                  </div>
                </div>
                
                <Link 
                  to={`/donate?campaign=${campaign.id}`}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center block"
                >
                  Donate
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Campaigns;