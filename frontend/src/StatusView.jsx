import { useState, useEffect } from 'react';

const StatusView = () => {
  const [escrowStatus, setEscrowStatus] = useState(null);
  const [proofs, setProofs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
    fetchProofs();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/escrow-status`);
      if (response.ok) {
        const data = await response.json();
        setEscrowStatus(data);
      }
    } catch (error) {
      console.error('Error fetching escrow status:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProofs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/proofs`);
      if (response.ok) {
        const data = await response.json();
        setProofs(data.proofs);
      }
    } catch (error) {
      console.error('Error fetching proofs:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Status View</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Status View</h2>
      
      {/* Escrow Status Card */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Escrow Status</h3>
        
        {escrowStatus ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-md">
              <h4 className="font-semibold text-blue-800">Balance</h4>
              <p className="text-2xl font-bold">{escrowStatus.balance / 1000000} ALGO</p>
              <p className="text-sm text-gray-600">({escrowStatus.balance} microAlgos)</p>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-md">
              <h4 className="font-semibold text-yellow-800">Status</h4>
              <p className="text-2xl font-bold capitalize">{escrowStatus.approvalStatus}</p>
              <p className="text-sm text-gray-600">
                {escrowStatus.approvalStatus === 'approved' 
                  ? 'Funds released to NGO' 
                  : 'Awaiting NGO verification'}
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-md">
              <h4 className="font-semibold text-green-800">NGO Address</h4>
              <p className="font-mono text-sm break-words">{escrowStatus.ngoAddress}</p>
            </div>
          </div>
        ) : (
          <p>Unable to fetch escrow status</p>
        )}
      </div>
      
      {/* Proof Uploads */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Proof of Aid Delivery</h3>
        
        {proofs.length > 0 ? (
          <div className="space-y-4">
            {proofs.map((proof) => (
              <div key={proof.id} className="p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{proof.description}</h4>
                    <p className="text-sm text-gray-500">
                      Uploaded on {new Date(proof.uploadDate).toLocaleString()}
                    </p>
                  </div>
                  {proof.fileName && (
                    <a 
                      href={`${import.meta.env.VITE_API_URL}/${proof.filePath}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View Document
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No proof uploads yet.</p>
        )}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <h4 className="font-semibold text-gray-800 mb-2">How to use this system:</h4>
        <ol className="list-decimal pl-5 text-gray-700">
          <li>Donors contribute funds which are held in the escrow smart contract</li>
          <li>NGOs deliver aid and upload proof of delivery</li>
          <li>Upon verification, funds are automatically released to the NGO</li>
        </ol>
      </div>
    </div>
  );
};

export default StatusView;