import { useState } from 'react';
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
  
  const { user } = useAuth();

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
      const formData = new FormData();
      formData.append('description', description);
      formData.append('campaignId', selectedCampaign);
      
      if (proofFile) {
        formData.append('proof', proofFile);
      }
      
      // Upload proof to backend
      await api.createProof(formData);
      
      setUploaded(true);
      setDescription('');
      setProofFile(null);
      setSelectedCampaign('');
      
      // Reset form
      e.target.reset();
    } catch (err) {
      setError(err.message || 'Failed to upload proof');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">NGO Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Proof of Aid Delivery</h2>
          <p className="text-gray-600 mb-4">
            As an NGO, you can upload proof that aid has been delivered to release the escrowed funds.
          </p>
          
          {uploaded && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
              <p>Proof uploaded successfully! The escrowed funds will be released to your account after oracle verification.</p>
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="campaign" className="block text-gray-700 font-medium mb-2">
                Select Campaign
              </label>
              <select
                id="campaign"
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Description of Aid Delivery
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the aid that has been delivered..."
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={uploading}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="proof" className="block text-gray-700 font-medium mb-2">
                Proof Document/Image (Optional)
              </label>
              <input
                type="file"
                id="proof"
                onChange={handleFileChange}
                accept="image/*,application/pdf"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={uploading}
              />
            </div>
            
            <button
              type="submit"
              disabled={uploading}
              className={`w-full ${
                uploading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              } text-white font-bold py-2 px-4 rounded`}
            >
              {uploading ? 'Uploading...' : 'Upload Proof'}
            </button>
          </form>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="font-semibold">Campaign Created</h3>
              <p className="text-sm text-gray-600">Earthquake Relief Fund</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="font-semibold">Donation Received</h3>
              <p className="text-sm text-gray-600">50 ALGO from donor@example.com</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="font-semibold">Proof Uploaded</h3>
              <p className="text-sm text-gray-600">Food distribution in Zone A</p>
              <p className="text-xs text-gray-500">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-yellow-50 rounded-md">
        <h3 className="font-semibold text-yellow-800 mb-2">Important:</h3>
        <ul className="list-disc pl-5 text-yellow-700">
          <li>Only authorized NGOs can release funds from the escrow</li>
          <li>Provide detailed proof of aid delivery to maintain transparency</li>
          <li>All uploads are recorded on the blockchain for accountability</li>
          <li>Multiple oracles will verify your proof before funds are released</li>
        </ul>
      </div>
    </div>
  );
};

export default NGODashboard;