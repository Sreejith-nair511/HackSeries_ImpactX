import { useState, useEffect } from 'react';
import walletService from '../services/walletService';

const useWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);

  // Check if wallet is already connected
  useEffect(() => {
    const storedWallet = localStorage.getItem('connectedWallet');
    if (storedWallet) {
      const parsedWallet = JSON.parse(storedWallet);
      setWallet(parsedWallet);
      setConnected(true);
      setAccounts(parsedWallet.accounts || []);
    }
  }, []);

  const connectMyAlgo = async () => {
    setLoading(true);
    
    try {
      const result = await walletService.connectMyAlgo();
      
      if (result.success) {
        const walletData = {
          provider: 'myalgo',
          accounts: result.accounts
        };
        
        setWallet(walletData);
        setConnected(true);
        setAccounts(result.accounts);
        localStorage.setItem('connectedWallet', JSON.stringify(walletData));
        
        return { success: true, wallet: walletData };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('MyAlgo connection error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const connectWalletConnect = async () => {
    setLoading(true);
    
    try {
      const result = await walletService.connectWalletConnect();
      
      if (result.success) {
        // For WalletConnect, we don't immediately have accounts
        // The connection will be established when the user scans the QR code
        return { success: true, message: result.message };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('WalletConnect connection error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      await walletService.disconnect();
      setWallet(null);
      setConnected(false);
      setAccounts([]);
      localStorage.removeItem('connectedWallet');
      return { success: true };
    } catch (error) {
      console.error('Disconnect error:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    wallet,
    connected,
    loading,
    accounts,
    connectMyAlgo,
    connectWalletConnect,
    disconnectWallet
  };
};

export default useWallet;