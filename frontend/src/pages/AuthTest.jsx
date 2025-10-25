import { useState, useEffect } from 'react';
import api from '../services/api';
import useAuth from '../hooks/useAuth';

const AuthTest = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState('');
  
  const { isAuthenticated, user, simulateAuth } = useAuth();

  useEffect(() => {
    // Auto-initialize authentication for testing
    const initAuth = async () => {
      try {
        await simulateAuth();
        await loadDonations();
      } catch (err) {
        setError('Failed to initialize authentication: ' + err.message);
      }
    };
    
    if (!isAuthenticated) {
      initAuth();
    } else {
      loadDonations();
    }
  }, [isAuthenticated]);

  const loadDonations = async () => {
    try {
      setLoading(true);
      const response = await api.getDonations();
      const data = await response.json();
      setDonations(data.donations);
      setError(null);
    } catch (err) {
      setError('Failed to load donations: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDonation = async (e) => {
    e.preventDefault();
    
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.createDonation(parseFloat(amount));
      const data = await response.json();
      
      setSuccess(true);
      setAmount('');
      
      // Reload donations
      await loadDonations();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to create donation: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Authentication Test</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This page demonstrates that the authentication system is working correctly and no "Access token required" errors occur.
        </p>
        
        {isAuthenticated && user && (
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6">
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">Authentication Status</h2>
            <p className="text-green-700 dark:text-green-300">
              ✅ Successfully authenticated as <strong>{user.email}</strong> with role <strong>{user.role}</strong>
            </p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
            <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">Error</h2>
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6">
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">Success</h2>
            <p className="text-green-700 dark:text-green-300">Donation created successfully!</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Create Donation</h2>
            <form onSubmit={handleCreateDonation} className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Donation Amount (₹)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={loading}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading || !amount}
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  loading || !amount
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg transform hover:scale-[1.02]'
                }`}
              >
                {loading ? 'Creating Donation...' : 'Create Donation'}
              </button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Your Donations</h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : donations.length === 0 ? (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">No donations found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {donations.map((donation) => (
                  <div key={donation.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">Donation #{donation.id.substring(0, 8)}...</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(donation.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">
                        ₹{donation.amount.toFixed(2)}
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        donation.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
                      }`}>
                        {donation.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTest;