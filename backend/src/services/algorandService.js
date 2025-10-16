const algosdk = require('algosdk');
const fs = require('fs');
const path = require('path');

class AlgorandService {
  constructor() {
    this.algodClient = new algosdk.Algodv2(
      process.env.ALGOD_TOKEN || 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      process.env.ALGOD_SERVER || 'http://localhost',
      process.env.ALGOD_PORT || 4001
    );
    
    // Load deployment info if exists
    this.deploymentInfo = null;
    try {
      const deploymentPath = path.join(__dirname, '..', 'deployment.json');
      if (fs.existsSync(deploymentPath)) {
        this.deploymentInfo = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
      }
    } catch (error) {
      console.warn('Could not load deployment info:', error.message);
    }
  }

  async createEscrow(ngoAddress, goal, deadline, threshold) {
    try {
      // For sandbox testing, we'll generate a new account
      const creatorAccount = algosdk.generateAccount();
      
      // In a real implementation, you would use an existing funded account
      console.log('Using generated account for testing:', creatorAccount.addr);
      
      // Read TEAL contract
      const tealFilePath = path.join(__dirname, '..', 'contracts', 'escrow.teal');
      const tealCode = fs.readFileSync(tealFilePath, 'utf8');
      
      // Compile TEAL to bytecode
      const compileResponse = await this.algodClient.compile(tealCode).do();
      const program = new Uint8Array(Buffer.from(compileResponse.result, 'base64'));
      
      // Create application
      const params = await this.algodClient.getTransactionParams().do();
      
      const appArgs = [
        new Uint8Array(Buffer.from(ngoAddress)),
        algosdk.encodeUint64(goal),
        algosdk.encodeUint64(deadline),
        algosdk.encodeUint64(threshold)
      ];

      const txn = algosdk.makeApplicationCreateTxn(
        creatorAccount.addr,
        params,
        algosdk.OnApplicationComplete.NoOpOC,
        program,
        program,
        appArgs
      );

      const signedTxn = txn.signTxn(creatorAccount.sk);
      const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
      
      // Wait for confirmation
      const confirmedTxn = await algosdk.waitForConfirmation(this.algodClient, txId, 4);
      const appId = confirmedTxn['application-index'];
      
      // Get escrow address
      const escrowAddress = algosdk.getApplicationAddress(appId);
      
      // Save deployment info
      const deploymentInfo = {
        appId: appId,
        escrowAddress: escrowAddress,
        creatorAddress: creatorAccount.addr,
        timestamp: new Date().toISOString()
      };
      
      fs.writeFileSync(
        path.join(__dirname, '..', 'deployment.json'),
        JSON.stringify(deploymentInfo, null, 2)
      );
      
      return deploymentInfo;
    } catch (error) {
      console.error('Error creating escrow:', error);
      throw error;
    }
  }

  async submitOracleVote(appId, vote, oracleWeight, oracleAccount) {
    try {
      const params = await this.algodClient.getTransactionParams().do();
      
      const appArgs = [
        new Uint8Array(Buffer.from('oracle_vote')),
        algosdk.encodeUint64(vote ? 1 : 0),
        algosdk.encodeUint64(oracleWeight)
      ];

      const txn = algosdk.makeApplicationNoOpTxn(
        oracleAccount.addr,
        params,
        appId,
        appArgs
      );

      const signedTxn = txn.signTxn(oracleAccount.sk);
      const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
      
      // Wait for confirmation
      await algosdk.waitForConfirmation(this.algodClient, txId, 4);
      
      return { success: true, txId };
    } catch (error) {
      console.error('Error submitting oracle vote:', error);
      throw error;
    }
  }

  async releaseFunds(appId, ngoAccount) {
    try {
      const params = await this.algodClient.getTransactionParams().do();
      
      const appArgs = [
        new Uint8Array(Buffer.from('release'))
      ];

      const txn = algosdk.makeApplicationNoOpTxn(
        ngoAccount.addr,
        params,
        appId,
        appArgs
      );

      const signedTxn = txn.signTxn(ngoAccount.sk);
      const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
      
      // Wait for confirmation
      await algosdk.waitForConfirmation(this.algodClient, txId, 4);
      
      return { success: true, txId };
    } catch (error) {
      console.error('Error releasing funds:', error);
      throw error;
    }
  }

  async getEscrowStatus(appId) {
    try {
      const appInfo = await this.algodClient.getApplicationByID(appId).do();
      const globalState = appInfo.params['global-state'];
      
      const status = {};
      
      for (const item of globalState) {
        const key = Buffer.from(item.key, 'base64').toString('utf8');
        const value = item.value.type === 1 ? 
          Buffer.from(item.value.bytes, 'base64').toString('utf8') : 
          item.value.uint;
        
        status[key] = value;
      }
      
      return status;
    } catch (error) {
      console.error('Error getting escrow status:', error);
      throw error;
    }
  }

  async anchorIPFSHash(appId, ipfsHash, account) {
    try {
      const params = await this.algodClient.getTransactionParams().do();
      
      // Create a payment transaction with IPFS hash in note
      const note = new Uint8Array(Buffer.from(`IPFS:${ipfsHash}`));
      
      const txn = algosdk.makePaymentTxnWithSuggestedParams(
        account.addr,
        account.addr, // Send to self
        0, // 0 ALGO
        undefined,
        note,
        params
      );

      const signedTxn = txn.signTxn(account.sk);
      const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
      
      // Wait for confirmation
      await algosdk.waitForConfirmation(this.algodClient, txId, 4);
      
      return { success: true, txId };
    } catch (error) {
      console.error('Error anchoring IPFS hash:', error);
      throw error;
    }
  }
}

module.exports = AlgorandService;