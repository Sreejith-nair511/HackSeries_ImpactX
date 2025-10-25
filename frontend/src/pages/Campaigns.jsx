import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      // Mock data with realistic sources
      const mockCampaigns = [
        {
          id: '1',
          title: 'Kerala Flood Relief',
          description: 'Providing emergency aid to flood-affected families in Kerala',
          goal: 5000000,
          raised: 3750000,
          status: 'active',
          source: 'NDRF Kerala Unit',
          creator: { email: 'kerala-ngo@example.com' }
        },
        {
          id: '2',
          title: 'Rajasthan Drought Support',
          description: 'Water conservation and distribution in drought-prone areas of Rajasthan',
          goal: 3000000,
          raised: 2850000,
          status: 'active',
          source: 'Government of Rajasthan',
          creator: { email: 'rajasthan-ngo@example.com' }
        },
        {
          id: '3',
          title: 'Himalayan Earthquake Recovery',
          description: 'Rebuilding homes and infrastructure after the earthquake in Uttarakhand',
          goal: 8000000,
          raised: 8000000,
          status: 'completed',
          source: 'Ministry of Home Affairs',
          creator: { email: 'mha-ngo@example.com' }
        },
        {
          id: '4',
          title: 'Odisha Cyclone Aid',
          description: 'Emergency relief and rehabilitation after cyclone damage',
          goal: 4500000,
          raised: 1200000,
          status: 'active',
          source: 'NDRF Odisha Unit',
          creator: { email: 'odisha-ngo@example.com' }
        },
        {
          id: '5',
          title: 'Assam Flood Response',
          description: 'Providing relief to flood-affected communities in Assam',
          goal: 2000000,
          raised: 825000,
          status: 'active',
          source: 'Assam State Disaster Management Authority',
          creator: { email: 'assam-ngo@example.com' }
        }
      ];
      setCampaigns(mockCampaigns);
    } catch (err) {
      setError('Failed to fetch campaigns');
      console.error('Fetch campaigns error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter campaigns based on status and search term
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesFilter = filter === 'all' || campaign.status === filter;
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Disaster Relief Campaigns</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Support verified relief efforts across India. Every donation is tracked and verified for maximum impact.
        </p>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Campaigns</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="text-3xl font-bold">{campaigns.length}</div>
          <div className="text-blue-100">Total Campaigns</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="text-3xl font-bold">
            {campaigns.filter(c => c.status === 'active').length}
          </div>
          <div className="text-green-100">Active Campaigns</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="text-3xl font-bold">
            ₹{campaigns.reduce((sum, c) => sum + c.goal, 0).toLocaleString()}
          </div>
          <div className="text-amber-100">Total Goal</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="text-3xl font-bold">
            ₹{campaigns.reduce((sum, c) => sum + (c.goal * 0.75), 0).toLocaleString()}
          </div>
          <div className="text-purple-100">Funds Raised</div>
        </div>
      </div>
      
      {filteredCampaigns.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center border border-gray-100 dark:border-gray-700">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No campaigns found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {searchTerm ? 'Try adjusting your search terms' : 'No campaigns match your selected filter'}
          </p>
          <Link 
            to="/donate" 
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg"
          >
            Start a New Donation
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {filter === 'all' ? 'All Campaigns' : filter === 'active' ? 'Active Campaigns' : 'Completed Campaigns'}
              <span className="text-gray-500 dark:text-gray-400 text-lg font-normal ml-2">({filteredCampaigns.length})</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-500 relative">
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      campaign.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status === 'active' ? 'Active' : 'Completed'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-xl font-bold text-white">{campaign.title}</h2>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{campaign.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <span>Raised</span>
                      <span>Goal</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" 
                        style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="font-semibold">₹{campaign.raised.toLocaleString()}</span>
                      <span className="font-semibold">₹{campaign.goal.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Created by</p>
                      <p className="font-semibold text-sm truncate max-w-[120px]">{campaign.creator.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Source</p>
                      <p className="font-semibold text-sm">{campaign.source}</p>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/donate?campaign=${campaign.id}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3 px-4 rounded-xl text-center block transition-all shadow-md hover:shadow-lg"
                  >
                    Donate Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;