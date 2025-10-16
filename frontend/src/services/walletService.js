import MyAlgoConnect from '@randlabs/myalgo-connect';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import algosdk from 'algosdk';

class WalletService {
  constructor() {
    this.myAlgoWallet = null;
    this.walletConnector = null;
    this.connected = false;
    this.accounts = [];
  }

  async initMyAlgo() {
    try {
      this.myAlgoWallet = new MyAlgoConnect();
      return true;
    } catch (error) {
      console.error('Failed to initialize MyAlgo:', error);
      return false;
    }
  }

  async connectMyAlgo() {
    try {
      if (!this.myAlgoWallet) {
        await this.initMyAlgo();
      }

      const accounts = await this.myAlgoWallet.connect({
        shouldSelectOneAccount: false,
      });

      this.accounts = accounts.map(account => ({
        address: account.address,
        name: account.name,
        provider: 'myalgo'
      }));

      this.connected = true;
      return { success: true, accounts: this.accounts };
    } catch (error) {
      console.error('MyAlgo connection error:', error);
      return { success: false, error: error.message };
    }
  }

  async initWalletConnect() {
    try {
      // Create WalletConnect Client
      this.walletConnector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org', // Required
        qrcodeModal: QRCodeModal,
      });

      // Check if connection is already established
      if (!this.walletConnector.connected) {
        // Create new session
        await this.walletConnector.createSession();
      }

      // Subscribe to connection events
      this.walletConnector.on('connect', (error, payload) => {
        if (error) {
          throw error;
        }

        const { accounts } = payload.params[0];
        this.accounts = accounts.map(address => ({
          address,
          provider: 'walletconnect'
        }));

        this.connected = true;
        console.log('WalletConnect connected:', accounts);
      });

      this.walletConnector.on('session_update', (error, payload) => {
        if (error) {
          throw error;
        }

        const { accounts } = payload.params[0];
        this.accounts = accounts.map(address => ({
          address,
          provider: 'walletconnect'
        }));

        console.log('WalletConnect session updated:', accounts);
      });

      this.walletConnector.on('disconnect', (error, payload) => {
        if (error) {
          throw error;
        }

        this.connected = false;
        this.accounts = [];
        console.log('WalletConnect disconnected');
      });

      return true;
    } catch (error) {
      console.error('Failed to initialize WalletConnect:', error);
      return false;
    }
  }

  async connectWalletConnect() {
    try {
      if (!this.walletConnector) {
        await this.initWalletConnect();
      }

      if (!this.walletConnector.connected) {
        // Create new session
        await this.walletConnector.createSession();
      }

      // For now, we'll return a success message
      // The actual connection will be handled by the QR code modal
      return { success: true, message: 'Please scan the QR code with your WalletConnect-compatible wallet' };
    } catch (error) {
      console.error('WalletConnect connection error:', error);
      return { success: false, error: error.message };
    }
  }

  async disconnect() {
    try {
      if (this.walletConnector && this.walletConnector.connected) {
        await this.walletConnector.killSession();
      }

      this.connected = false;
      this.accounts = [];
      return { success: true };
    } catch (error) {
      console.error('Disconnect error:', error);
      return { success: false, error: error.message };
    }
  }

  async signTransaction(txn) {
    try {
      if (!this.connected) {
        throw new Error('No wallet connected');
      }

      // For MyAlgo
      if (this.accounts[0].provider === 'myalgo') {
        if (!this.myAlgoWallet) {
          await this.initMyAlgo();
        }

        const signedTxn = await this.myAlgoWallet.signTransaction(txn.toByte());
        return signedTxn;
      }

      // For WalletConnect
      if (this.accounts[0].provider === 'walletconnect') {
        if (!this.walletConnector) {
          throw new Error('WalletConnect not initialized');
        }

        const txnsToSign = [{
          txn: txn,
          message: 'Transaction request from ImpactX'
        }];

        const request = this.walletConnector.signTransaction([txnsToSign]);
        return request;
      }

      throw new Error('Unsupported wallet provider');
    } catch (error) {
      console.error('Sign transaction error:', error);
      throw error;
    }
  }

  getAccounts() {
    return this.accounts;
  }

  isConnected() {
    return this.connected;
  }
}

export default new WalletService();