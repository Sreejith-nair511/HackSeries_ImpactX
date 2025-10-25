import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import api from '../services/api';

const NGODashboard = () => {
  const [description, setDescription] = useState('');
  const [proofFile, setProofFile] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload', 'campaigns', 'analytics'
  const [proofs, setProofs] = useState([]);
  
  const { user } = useAuth();

  useEffect(() => {
    // Mock data for demonstration
    setCampaigns([
      { id: '1', title: 'Kerala Flood Relief', goal: 5000000, raised: 3750000, status: 'active' },
      { id: '2', title: 'Rajasthan Drought Support', goal: 3000000, raised: 2850000, status: 'active' },
      { id: '3', title: 'Himalayan Earthquake Recovery', goal: 8000000, raised: 8000000, status: 'completed' }
    ]);
    
    setProofs([
      { id: '1', campaign: 'Kerala Flood Relief', status: 'verified', date: '2025-10-15', amount: 1500000 },
      { id: '2', campaign: 'Rajasthan Drought Support', status: 'pending', date: '2025-10-18', amount: 950000 },
      { id: '3', campaign: 'Himalayan Earthquake Recovery', status: 'verified', date: '2025-10-10', amount: 8000000 }
    ]);
  }, []);

  const handleFileChange = (e) => {
    setProofFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!description.trim()) {
      setError('Please provide a description of the aid delivery');
      return;
    }
    
    if (!selectedCampaign) {
      setError('Please select a campaign');
      return;
    }
    
    setUploading(true);
    setError(null);
    
    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploaded(true);
      setDescription('');
      setProofFile(null);
      setSelectedCampaign('');
      
      // Add to proofs list
      const newProof = {
        id: (proofs.length + 1).toString(),
        campaign: campaigns.find(c => c.id === selectedCampaign)?.title || 'Unknown Campaign',
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        amount: Math.floor(Math.random() * 1000000) + 500000
      };
      
      setProofs([newProof, ...proofs]);
      
      // Reset form
      e.target.reset();
    } catch (err) {
      setError(err.message || 'Failed to upload proof');
    } finally {
      setUploading(false);
    }
  };

  // Calculate stats
  const totalRaised = campaigns.reduce((sum, c) => sum + c.raised, 0);
  const totalVerified = proofs.filter(p => p.status === 'verified').length;
  const pendingVerification = proofs.filter(p => p.status === 'pending').length;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">NGO Dashboard</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">Manage your campaigns and verify aid distribution</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="text-3xl font-bold">₹{totalRaised.toLocaleString()}</div>
          <div className="text-blue-100">Total Funds Raised</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="text-3xl font-bold">{campaigns.filter(c => c.status === 'active').length}</div>
          <div className="text-green-100">Active Campaigns</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="text-3xl font-bold">{totalVerified}</div>
          <div className="text-amber-100">Verified Proofs</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="text-3xl font-bold">{pendingVerification}</div>
          <div className="text-purple-100">Pending Verification</div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8 border border-gray-100 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px overflow-x-auto">
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'upload'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Upload Proof
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'campaigns'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              My Campaigns
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {/* Upload Proof Tab */}
          {activeTab === 'upload' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Upload Proof of Aid Delivery</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  As an authorized NGO, you can upload proof that aid has been delivered to release the escrowed funds.
                </p>
                
                {uploaded && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <div>
                        <h3 className="font-bold">Proof Uploaded Successfully!</h3>
                        <p className="text-green-100">The escrowed funds will be released after oracle verification.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {error && (
                  <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl">
                    <p><strong>Error:</strong> {error}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="campaign" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      Select Campaign
                    </label>
                    <select
                      id="campaign"
                      value={selectedCampaign}
                      onChange={(e) => setSelectedCampaign(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      disabled={uploading}
                    >
                      <option value="">Choose a campaign</option>
                      {campaigns.map((campaign) => (
                        <option key={campaign.id} value={campaign.id}>
                          {campaign.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      Description of Aid Delivery
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the aid that has been delivered, including quantities, locations, and beneficiaries..."
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      disabled={uploading}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="proof" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      Proof Document/Image
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-10 h-10 mb-3 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, PDF up to 10MB</p>
                        </div>
                        <input 
                          type="file" 
                          id="proof"
                          onChange={handleFileChange}
                          accept="image/*,application/pdf"
                          className="hidden" 
                          disabled={uploading}
                        />
                      </label>
                    </div>
                    {proofFile && (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Selected file: {proofFile.name}
                      </p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={uploading}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                      uploading
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transform hover:scale-[1.02]'
                    }`}
                  >
                    {uploading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading Proof...
                      </div>
                    ) : (
                      'Upload Proof & Request Fund Release'
                    )}
                  </button>
                </form>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Verification Process</h3>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-blue-100 dark:border-gray-700">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 mr-4">
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Upload Proof</h4>
                        <p className="text-gray-600 dark:text-gray-400">Submit detailed documentation of aid distribution</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 mr-4">
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Multi-Oracle Verification</h4>
                        <p className="text-gray-600 dark:text-gray-400">Multiple independent sources verify your proof</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 mr-4">
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Fund Release</h4>
                        <p className="text-gray-600 dark:text-gray-400">Upon successful verification, funds are released to your account</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Uploads</h3>
                  <div className="space-y-4">
                    {proofs.slice(0, 3).map((proof) => (
                      <div key={proof.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-600 rounded-xl">
                        <div>
                          <h4 className="font-semibold">{proof.campaign}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">₹{proof.amount.toLocaleString()} • {proof.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          proof.status === 'verified' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                        }`}>
                          {proof.status === 'verified' ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* My Campaigns Tab */}
          {activeTab === 'campaigns' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">My Campaigns</h2>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-2 px-4 rounded-xl transition-all shadow-md">
                  + New Campaign
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                    <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-500 relative">
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          campaign.status === 'active' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300'
                        }`}>
                          {campaign.status === 'active' ? 'Active' : 'Completed'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{campaign.title}</h3>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                          <span>Raised</span>
                          <span>Goal</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
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
                      
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 font-bold py-2 px-4 rounded-lg transition-colors">
                          View Details
                        </button>
                        <button className="flex-1 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 font-bold py-2 px-4 rounded-lg transition-colors">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Campaign Analytics</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-blue-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Funds Distribution</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span>Kerala Flood Relief</span>
                          <span>45%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span>Rajasthan Drought Support</span>
                          <span>30%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span>Himalayan Earthquake Recovery</span>
                          <span>25%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-green-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Impact Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-600 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-green-600">1,240</div>
                      <div className="text-gray-600 dark:text-gray-300">Families Fed</div>
                    </div>
                    <div className="bg-white dark:bg-gray-600 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-green-600">320</div>
                      <div className="text-gray-600 dark:text-gray-300">Homes Rebuilt</div>
                    </div>
                    <div className="bg-white dark:bg-gray-600 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-green-600">890</div>
                      <div className="text-gray-600 dark:text-gray-300">Students Educated</div>
                    </div>
                    <div className="bg-white dark:bg-gray-600 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-green-600">45</div>
                      <div className="text-gray-600 dark:text-gray-300">Water Wells</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-600 rounded-xl">
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 mr-4">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Proof Verified</h4>
                      <p className="text-gray-600 dark:text-gray-300">Kerala Flood Relief - ₹1,500,000 released</p>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">2 hours ago</div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-600 rounded-xl">
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2 mr-4">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Donation Received</h4>
                      <p className="text-gray-600 dark:text-gray-300">Rajasthan Drought Support - ₹500,000 from donor@example.com</p>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">1 day ago</div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-600 rounded-xl">
                    <div className="bg-amber-100 dark:bg-amber-900/30 rounded-full p-2 mr-4">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Campaign Created</h4>
                      <p className="text-gray-600 dark:text-gray-300">Himalayan Earthquake Recovery</p>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">3 days ago</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Important Guidelines</h3>
            <ul className="space-y-2 text-blue-100">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Provide detailed proof with photos/documentation
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Include GPS coordinates of aid distribution
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-2">Verification Process</h3>
            <ul className="space-y-2 text-blue-100">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Multi-oracle verification takes 24-48 hours
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Funds released immediately upon verification
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-2">Support</h3>
            <ul className="space-y-2 text-blue-100">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                contact@impactx.org
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                +91 98765 43210
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;