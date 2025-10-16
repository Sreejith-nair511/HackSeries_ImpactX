import { useState } from 'react';

const NGOView = () => {
  const [description, setDescription] = useState('');
  const [proofFile, setProofFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e) => {
    setProofFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!description.trim()) {
      alert('Please provide a description of the aid delivery');
      return;
    }
    
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('description', description);
      if (proofFile) {
        formData.append('proof', proofFile);
      }
      
      // Upload proof to backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload-proof`, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Proof uploaded:', result);
        setUploaded(true);
        setDescription('');
        setProofFile(null);
        
        // Reset form
        e.target.reset();
      } else {
        alert('Failed to upload proof. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">NGO View</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Upload Proof of Aid Delivery</h3>
        <p className="text-gray-600 mb-4">
          As an NGO, you can upload proof that aid has been delivered to release the escrowed funds.
        </p>
        
        <form onSubmit={handleSubmit}>
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
            className={`${
              uploading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600'
            } text-white font-bold py-2 px-4 rounded`}
          >
            {uploading ? 'Uploading...' : 'Upload Proof & Release Funds'}
          </button>
        </form>
        
        {uploaded && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
            <p>Proof uploaded successfully! The escrowed funds will be released to your account.</p>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-yellow-50 rounded-md">
        <h4 className="font-semibold text-yellow-800 mb-2">Important:</h4>
        <ul className="list-disc pl-5 text-yellow-700">
          <li>Only authorized NGOs can release funds from the escrow</li>
          <li>Provide detailed proof of aid delivery to maintain transparency</li>
          <li>All uploads are recorded on the blockchain for accountability</li>
        </ul>
      </div>
    </div>
  );
};

export default NGOView;