import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useWallet from '../hooks/useWallet';
import useAuth from '../hooks/useAuth';
import api from '../services/api';

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [walletType, setWalletType] = useState(''); // 'myalgo' or 'walletconnect'
  
  const { 
    wallet, 
    connected, 
    accounts, 
    connectMyAlgo, 
    connectWalletConnect, 
    disconnectWallet 
  } = useWallet();
  
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Parse campaign from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const campaignId = params.get('campaign');
    if (campaignId) {
      setSelectedCampaign(campaignId);
    }
    
    fetchCampaigns();
  }, [location.search]);

  const fetchCampaigns = async () => {
    try {
      const data = await api.getCampaigns();
      setCampaigns(data.campaigns);
      
      // If no campaign is selected and there are campaigns, select the first one
      if (!selectedCampaign && data.campaigns.length > 0) {
        setSelectedCampaign(data.campaigns[0].id);
      }
    } catch (err) {
      console.error('Fetch campaigns error:', err);
    }
  };

  const handleConnectWallet = async () => {
    if (!walletType) {
      setError('Please select a wallet type');
      return;
    }
    
    setError(null);
    
    if (walletType === 'myalgo') {
      const result = await connectMyAlgo();
      if (!result.success) {
        setError(result.error);
      }
    } else if (walletType === 'walletconnect') {
      const result = await connectWalletConnect();
      if (!result.success) {
        setError(result.error);
      }
    }
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    
    if (!connected) {
      setError('Please connect your wallet first');
      return;
    }
    
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (!selectedCampaign) {
      setError('Please select a campaign');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would interact with the Algorand blockchain
      // For now, we'll just create a donation record in our database
      const donationData = {
        amount: parseFloat(amount) * 1000000, // Convert to microAlgos
        campaignId: selectedCampaign
      };
      
      await api.createDonation(donationData);
      
      setSuccess(true);
      setAmount('');
      
      // Redirect to success page or show confirmation
      setTimeout(() => {
        navigate('/campaigns');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to process donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Make a Donation</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Connect Wallet</h2>
        
        {!connected ? (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Select Wallet Type
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setWalletType('myalgo')}
                  className={`flex-1 py-3 px-4 rounded-lg border ${
                    walletType === 'myalgo' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">MyAlgo Wallet</div>
                  <div className="text-sm text-gray-600">Browser extension</div>
                </button>
                
                <button
                  onClick={() => setWalletType('walletconnect')}
                  className={`flex-1 py-3 px-4 rounded-lg border ${
                    walletType === 'walletconnect' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">WalletConnect</div>
                  <div className="text-sm text-gray-600">Mobile wallet</div>
                </button>
              </div>
            </div>
            
            {walletType && (
              <button
                onClick={handleConnectWallet}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                {loading ? 'Connecting...' : `Connect ${walletType === 'myalgo' ? 'MyAlgo' : 'WalletConnect'}`}
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Connected Wallet</p>
              <p className="text-sm text-gray-600">
                {wallet.provider === 'myalgo' ? 'MyAlgo Wallet' : 'WalletConnect'}
              </p>
              {accounts.length > 0 && (
                <p className="text-sm text-gray-600 font-mono">
                  {accounts[0].address.substring(0, 6)}...{accounts[0].address.substring(accounts[0].address.length - 4)}
                </p>
              )}
            </div>
            <button
              onClick={disconnectWallet}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Donation Details</h2>
        
        {success ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Success! </strong>
            <span className="block sm:inline">Your donation has been processed successfully.</span>
          </div>
        ) : null}
        
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : null}
        
        <form onSubmit={handleDonate}>
          <div className="mb-4">
            <label htmlFor="campaign" className="block text-gray-700 font-medium mb-2">
              Select Campaign
            </label>
            <select
              id="campaign"
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">Choose a campaign</option>
              {campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.title} (Goal: {campaign.goal / 1000000} ALGO)
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
              Amount (ALGO)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!connected || loading}
              step="0.000001"
              min="0"
            />
          </div>
          
          <button
            type="submit"
            disabled={!connected || loading}
            className={`w-full ${
              connected 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-400 cursor-not-allowed'
            } text-white font-bold py-2 px-4 rounded disabled:opacity-50`}
          >
            {loading ? 'Processing...' : 'Donate'}
          </button>
        </form>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-md">
        <h3 className="font-semibold text-blue-800 mb-2">How it works:</h3>
        <ul className="list-disc pl-5 text-blue-700">
          <li>Your donation is held in a secure escrow smart contract</li>
          <li>Funds are only released when the NGO provides proof of aid delivery</li>
          <li>Multiple oracles verify the proof before funds are released</li>
          <li>You can track the status of your donation at any time</li>
        </ul>
      </div>
    </div>
  );
};

export default Donate;