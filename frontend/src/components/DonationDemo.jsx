import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

/**
 * Donation Demo Component
 * Demonstrates seamless authentication handling to prevent "Access token required" errors
 */

const DonationDemo = () => {
  const { 
    isAuthenticated, 
    user, 
    loading, 
    simulateAuth, 
    makeAuthenticatedRequest 
  } = useAuth();
  
  const [donations, setDonations] = useState([]);
  const [amount, setAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Auto-simulate authentication on component mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        await simulateAuth();
        await loadDonations();
      } catch (error) {
        console.error('Initialization failed:', error);
        setMessage('Failed to initialize authentication');
      }
    };

    if (!isAuthenticated && !loading) {
      initAuth();
    } else if (isAuthenticated) {
      loadDonations();
    }
  }, [isAuthenticated, loading]);

  const loadDonations = async () => {
    try {
      const response = await makeAuthenticatedRequest('http://localhost:5000/api/v1/donations');
      const data = await response.json();
      setDonations(data.donations);
    } catch (error) {
      console.error('Failed to load donations:', error);
      setMessage('Failed to load donations');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setMessage('Please enter a valid amount');
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      const response = await makeAuthenticatedRequest('http://localhost:5000/api/v1/donations', {
        method: 'POST',
        body: JSON.stringify({ amount: parseFloat(amount) })
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Donation of $${amount} created successfully!`);
        setAmount('');
        // Reload donations
        await loadDonations();
      } else {
        throw new Error('Failed to create donation');
      }
    } catch (error) {
      console.error('Donation failed:', error);
      setMessage('Failed to create donation. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3">Initializing authentication...</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Donation Demo</h2>
        
        {isAuthenticated && user && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <p className="text-green-800">
              <span className="font-semibold">Authenticated as:</span> {user.email} ({user.role})
            </p>
          </div>
        )}

        {message && (
          <div className={`mb-4 p-3 rounded ${message.includes('Failed') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter donation amount"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting || !amount}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'Processing...' : 'Donate'}
            </button>
          </div>
        </form>

        <div className="border-t pt-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Recent Donations</h3>
          
          {donations.length === 0 ? (
            <p className="text-gray-500 italic">No donations yet. Make your first donation above!</p>
          ) : (
            <div className="space-y-3">
              {donations.map((donation) => (
                <div key={donation.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Donation #{donation.id.slice(0, 8)}...</span>
                  <span className="font-bold text-green-600">${donation.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationDemo;