#!/usr/bin/env node

const algosdk = require('algosdk');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

async function main() {
  const args = process.argv.slice(2);
  const network = args[1] || 'sandbox';

  // Configure Algod client based on network
  let algodClient;
  let creatorAccount;

  if (network === 'testnet') {
    // TestNet configuration
    algodClient = new algosdk.Algodv2(
      { 'X-API-Key': process.env.ALGOD_TOKEN || '' },
      process.env.ALGOD_SERVER || 'https://testnet-algorand.api.purestake.io/ps2',
      process.env.ALGOD_PORT || 443
    );
    
    // For TestNet, you would use an account with TestNet ALGO
    // This is just a placeholder - you would need to provide actual mnemonic
    console.log('Please provide a TestNet account mnemonic in .env file');
    process.exit(1);
  } else {
    // Sandbox configuration
    algodClient = new algosdk.Algodv2(
      process.env.ALGOD_TOKEN || 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      process.env.ALGOD_SERVER || 'http://localhost',
      process.env.ALGOD_PORT || 4001
    );
    
    // For sandbox, we can generate a new account
    creatorAccount = algosdk.mnemonicToSecretKey(process.env.ALGOD_MNEMONIC || '');
  }

  try {
    // Check if account has funds
    const accountInfo = await algodClient.accountInformation(creatorAccount.addr).do();
    console.log('Account balance:', accountInfo.amount, 'microAlgos');
    
    if (accountInfo.amount === 0) {
      console.log('Account has no funds. Please fund the account.');
      process.exit(1);
    }

    // Read TEAL contract
    const tealFilePath = path.join(__dirname, '..', 'contracts', 'escrow.teal');
    const tealCode = fs.readFileSync(tealFilePath, 'utf8');
    
    // Compile TEAL to bytecode
    console.log('Compiling TEAL contract...');
    const compileResponse = await algodClient.compile(tealCode).do();
    const program = new Uint8Array(Buffer.from(compileResponse.result, 'base64'));
    console.log('Contract compiled successfully');

    // Application arguments
    const ngoAddress = creatorAccount.addr; // For testing, using creator as NGO
    const goal = 100000000; // 100 ALGO in microAlgos
    const deadline = Math.floor(Date.now() / 1000) + 86400; // 24 hours from now
    const threshold = 5; // Weight threshold for release

    // Create application
    console.log('Creating application...');
    const params = await algodClient.getTransactionParams().do();
    
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
      appArgs,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );

    const signedTxn = txn.signTxn(creatorAccount.sk);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    
    // Wait for confirmation
    const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
    const appId = confirmedTxn['application-index'];
    
    console.log('Application created with ID:', appId);
    
    // Get escrow address
    const escrowAddress = algosdk.getApplicationAddress(appId);
    console.log('Escrow address:', escrowAddress);
    
    // Save to file for later use
    const deploymentInfo = {
      appId: appId,
      escrowAddress: escrowAddress,
      creatorAddress: creatorAccount.addr,
      network: network,
      timestamp: new Date().toISOString()
    };
    
    fs.writeFileSync(
      path.join(__dirname, '..', 'deployment.json'),
      JSON.stringify(deploymentInfo, null, 2)
    );
    
    console.log('Deployment information saved to deployment.json');
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = main;