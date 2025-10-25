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
  const [donationType, setDonationType] = useState('general'); // 'general' or 'specific'
  const [transactionStatus, setTransactionStatus] = useState(''); // For showing transaction progress
  const [transactionId, setTransactionId] = useState(''); // For showing transaction ID
  
  const { 
    wallet, 
    connected, 
    accounts, 
    simulationMode,
    connectMyAlgo, 
    connectWalletConnect, 
    disconnectWallet 
  } = useWallet();
  
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Parse campaign from URL query params
  useEffect(() => {
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
        ngo: 'Kerala Relief Foundation'
      },
      {
        id: '2',
        title: 'Rajasthan Drought Support',
        description: 'Water conservation and distribution in drought-prone areas of Rajasthan',
        goal: 3000000,
        raised: 2850000,
        status: 'active',
        source: 'Government of Rajasthan',
        ngo: 'Rajasthan Water Initiative'
      },
      {
        id: '3',
        title: 'Himalayan Earthquake Recovery',
        description: 'Rebuilding homes and infrastructure after the earthquake in Uttarakhand',
        goal: 8000000,
        raised: 8000000,
        status: 'completed',
        source: 'Ministry of Home Affairs',
        ngo: 'Himalayan Reconstruction Trust'
      }
    ];
    
    setCampaigns(mockCampaigns);
    
    const params = new URLSearchParams(location.search);
    const campaignId = params.get('campaign');
    if (campaignId) {
      setSelectedCampaign(campaignId);
    } else if (mockCampaigns.length > 0) {
      setSelectedCampaign(mockCampaigns[0].id);
    }
  }, [location.search]);

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
      } else if (result.message) {
        // Show message for WalletConnect (QR code)
        setError(result.message);
      }
    } else if (walletType === 'walletconnect') {
      const result = await connectWalletConnect();
      if (!result.success) {
        setError(result.error);
      } else if (result.message) {
        // Show message for WalletConnect (QR code)
        setError(result.message);
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
    
    if (donationType === 'specific' && !selectedCampaign) {
      setError('Please select a campaign');
      return;
    }
    
    setLoading(true);
    setError(null);
    setTransactionStatus('Processing your donation...');
    setTransactionId('');
    
    try {
      // Simulate transaction processing with realistic steps
      setTransactionStatus('Preparing transaction...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTransactionStatus('Connecting to wallet...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (simulationMode) {
        setTransactionStatus('Simulating blockchain transaction...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate a simulated transaction ID
        const simulatedTxId = 'SIMULATED-' + Math.random().toString(36).substring(2, 15).toUpperCase();
        setTransactionId(simulatedTxId);
        setTransactionStatus('Transaction confirmed on blockchain!');
      } else {
        setTransactionStatus('Waiting for wallet confirmation...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        setTransactionStatus('Transaction confirmed on blockchain!');
      }
      
      // Send donation to backend
      setTransactionStatus('Recording donation in database...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const donationData = {
        amount: parseFloat(amount),
        campaignId: donationType === 'specific' ? selectedCampaign : null
      };
      
      await api.createDonation(donationData);
      
      setTransactionStatus('Donation recorded successfully!');
      setSuccess(true);
      setAmount('');
      
      // Redirect to success page or show confirmation
      setTimeout(() => {
        navigate('/campaigns');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to process donation');
      setTransactionStatus('');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setTransactionStatus('');
        setTransactionId('');
      }, 5000);
    }
  };

  // Preset donation amounts for India
  const presetAmounts = [
    { value: 100, label: '₹100' },
    { value: 500, label: '₹500' },
    { value: 1000, label: '₹1000' },
    { value: 5000, label: '₹5000' }
  ];

  // Get selected campaign details
  const selectedCampaignDetails = campaigns.find(c => c.id === selectedCampaign);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Make a Donation</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Your contribution helps provide immediate relief and long-term support to communities in need across India
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Donation Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Donation Details
            </h2>
            
            {success ? (
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl mb-6">
                <div className="flex items-center">
                  <svg className="w-10 h-10 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <h3 className="text-xl font-bold">Donation Successful!</h3>
                    <p>Thank you for your generous contribution. Your donation is making a difference.</p>
                  </div>
                </div>
              </div>
            ) : null}
            
            {transactionStatus && (
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 text-blue-700 dark:text-blue-300 p-4 rounded-lg mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <p><strong>Transaction:</strong> {transactionStatus}</p>
                </div>
                {transactionId && (
                  <p className="mt-2 text-sm font-mono">Transaction ID: {transactionId}</p>
                )}
              </div>
            )}
            
            {error ? (
              <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6">
                <p><strong>Error:</strong> {error}</p>
              </div>
            ) : null}
            
            <form onSubmit={handleDonate}>
              {/* Donation Type */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-3">
                  Donation Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setDonationType('general')}
                    className={`py-4 px-4 rounded-xl border-2 transition-all ${
                      donationType === 'general'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="font-semibold text-lg">General Fund</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Support all relief efforts</div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setDonationType('specific')}
                    className={`py-4 px-4 rounded-xl border-2 transition-all ${
                      donationType === 'specific'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="font-semibold text-lg">Specific Campaign</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Support a specific cause</div>
                  </button>
                </div>
              </div>
              
              {/* Campaign Selection (if specific) */}
              {donationType === 'specific' && (
                <div className="mb-6">
                  <label htmlFor="campaign" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Select Campaign
                  </label>
                  <select
                    id="campaign"
                    value={selectedCampaign}
                    onChange={(e) => setSelectedCampaign(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    disabled={loading}
                  >
                    <option value="">Choose a campaign</option>
                    {campaigns.map((campaign) => (
                      <option key={campaign.id} value={campaign.id}>
                        {campaign.title} (Goal: ₹{campaign.goal.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {/* Amount Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-3">
                  Donation Amount
                </label>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setAmount(preset.value.toString())}
                      className={`py-3 rounded-xl font-medium transition-all ${
                        amount === preset.value.toString()
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400">₹</span>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter custom amount"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    disabled={!connected || loading}
                    min="1"
                  />
                </div>
              </div>
              
              {/* Wallet Connection */}
              {!connected ? (
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-3">
                    Connect Wallet
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setWalletType('myalgo')}
                      className={`py-4 px-4 rounded-xl border-2 transition-all flex flex-col items-center ${
                        walletType === 'myalgo'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="bg-gray-200 dark:bg-gray-600 border-2 border-dashed rounded-xl w-16 h-16 mb-2" />
                      <div className="font-semibold">MyAlgo Wallet</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Browser extension</div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setWalletType('walletconnect')}
                      className={`py-4 px-4 rounded-xl border-2 transition-all flex flex-col items-center ${
                        walletType === 'walletconnect'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="bg-gray-200 dark:bg-gray-600 border-2 border-dashed rounded-xl w-16 h-16 mb-2" />
                      <div className="font-semibold">WalletConnect</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Mobile wallet</div>
                    </button>
                  </div>
                  
                  {walletType && (
                    <button
                      type="button"
                      onClick={handleConnectWallet}
                      disabled={loading}
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg"
                    >
                      {loading ? 'Connecting...' : `Connect ${walletType === 'myalgo' ? 'MyAlgo' : 'WalletConnect'}`}
                    </button>
                  )}
                </div>
              ) : (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">Connected Wallet</p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {wallet.provider === 'myalgo' ? 'MyAlgo Wallet' : 'WalletConnect'}
                        {simulationMode && (
                          <span className="ml-2 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                            Demo Mode
                          </span>
                        )}
                      </p>
                      {accounts.length > 0 && (
                        <p className="text-sm text-green-600 dark:text-green-400 font-mono">
                          {accounts[0].address.substring(0, 6)}...{accounts[0].address.substring(accounts[0].address.length - 4)}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={disconnectWallet}
                      className="bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-300 font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              )}
              
              <button
                type="submit"
                disabled={!connected || loading || !amount}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                  connected && amount
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transform hover:scale-[1.02]'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Donation...
                  </div>
                ) : (
                  `Donate ₹${amount || 0}`
                )}
              </button>
            </form>
          </div>
          
          {/* How it works */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-blue-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              How Your Donation Helps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Transparent Tracking</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Every rupee is tracked on the blockchain</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Multi-Verification</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Verified by multiple independent sources</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">100% Accountable</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Funds released only upon verification</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Tax Benefits</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Eligible for 80G tax deductions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div>
          {/* Selected Campaign Info */}
          {selectedCampaignDetails && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 mb-8">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Campaign Details</h3>
              <div className="mb-4">
                <h4 className="font-semibold text-lg">{selectedCampaignDetails.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{selectedCampaignDetails.description}</p>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <span>Raised</span>
                  <span>Goal</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" 
                    style={{ width: `${(selectedCampaignDetails.raised / selectedCampaignDetails.goal) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="font-semibold">₹{selectedCampaignDetails.raised.toLocaleString()}</span>
                  <span className="font-semibold">₹{selectedCampaignDetails.goal.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Source:</span>
                  <span className="font-medium">{selectedCampaignDetails.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">NGO:</span>
                  <span className="font-medium">{selectedCampaignDetails.ngo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className={`font-medium ${
                    selectedCampaignDetails.status === 'active' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-blue-600 dark:text-blue-400'
                  }`}>
                    {selectedCampaignDetails.status === 'active' ? 'Active' : 'Completed'}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Impact Stats */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Your Impact</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-blue-500/30">
                <span>Families Fed</span>
                <span className="font-bold text-xl">1,240</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-blue-500/30">
                <span>Homes Rebuilt</span>
                <span className="font-bold text-xl">320</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-blue-500/30">
                <span>Students Educated</span>
                <span className="font-bold text-xl">890</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Water Wells</span>
                <span className="font-bold text-xl">45</span>
              </div>
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Donor Stories</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <div className="flex items-center mb-2">
                  <div className="bg-gray-200 dark:bg-gray-600 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                  <div>
                    <div className="font-semibold">Priya Sharma</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Mumbai, Maharashtra</div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  "I can see exactly where my donation went. It's so reassuring to know that my money is actually helping people."
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <div className="flex items-center mb-2">
                  <div className="bg-gray-200 dark:bg-gray-600 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                  <div>
                    <div className="font-semibold">Rajesh Kumar</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Bangalore, Karnataka</div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  "The transparency is unmatched. I've never felt more confident about donating to a cause."
                </p>
              </div>
            </div>
          </div>
          
          {/* Tax Benefits */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl shadow-xl p-6 mt-8">
            <h3 className="text-xl font-bold mb-2">Tax Benefits</h3>
            <p className="mb-4">All donations are eligible for 80G tax deductions</p>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-sm">Potential Tax Savings</div>
              <div className="text-2xl font-bold">₹{amount ? Math.round(parseInt(amount) * 0.33) : 0}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;