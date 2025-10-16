import { useState } from 'react';

const DonorView = () => {
  const [amount, setAmount] = useState('');
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = () => {
    // Mock wallet connection
    setConnected(true);
    setWalletAddress('ABC123...XYZ789');
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    
    if (!connected) {
      alert('Please connect your wallet first');
      return;
    }
    
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    try {
      // In a real implementation, this would interact with the Algorand blockchain
      console.log(`Donating ${amount} ALGO`);
      
      // Mock API call to backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/donate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });
      
      if (response.ok) {
        alert('Donation successful!');
        setAmount('');
      } else {
        alert('Donation failed. Please try again.');
      }
    } catch (error) {
      console.error('Donation error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Donor View</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Connect Wallet</h3>
        {!connected ? (
          <button 
            onClick={connectWallet}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center">
            <span className="mr-4 text-gray-700">Connected: {walletAddress}</span>
            <button 
              onClick={() => setConnected(false)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Make a Donation</h3>
        <form onSubmit={handleDonate}>
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
              disabled={!connected}
            />
          </div>
          
          <button
            type="submit"
            disabled={!connected}
            className={`${
              connected 
                ? 'bg-blue-500 hover:bg-blue-600' 
                : 'bg-gray-400 cursor-not-allowed'
            } text-white font-bold py-2 px-4 rounded`}
          >
            Donate
          </button>
        </form>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-md">
        <h4 className="font-semibold text-blue-800 mb-2">How it works:</h4>
        <ul className="list-disc pl-5 text-blue-700">
          <li>Your donation is held in a secure escrow smart contract</li>
          <li>Funds are only released when the NGO provides proof of aid delivery</li>
          <li>You can track the status of your donation at any time</li>
        </ul>
      </div>
    </div>
  );
};

export default DonorView;