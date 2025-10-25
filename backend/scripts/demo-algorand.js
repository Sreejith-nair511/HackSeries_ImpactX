const AlgorandSimulator = require('./simulate-algorand');

async function runAlgorandDemo() {
  console.log('🔗 Algorand Blockchain Integration Demo');
  console.log('========================================\n');
  
  const simulator = new AlgorandSimulator();
  
  // Demonstrate Algorand features
  console.log('1. Creating Algorand Accounts');
  console.log('-----------------------------');
  
  const donorAccount = await simulator.createAccount();
  const donorAddress = typeof donorAccount.addr === 'string' ? donorAccount.addr : donorAccount.addr.toString();
  console.log(`💰 Donor Account Created:`);
  console.log(`   Address: ${donorAddress}`);
  console.log(`   Status: Simulated for demo\n`);
  
  const ngoAccount = await simulator.createAccount();
  const ngoAddress = typeof ngoAccount.addr === 'string' ? ngoAccount.addr : ngoAccount.addr.toString();
  console.log(`🏢 NGO Account Created:`);
  console.log(`   Address: ${ngoAddress}`);
  console.log(`   Status: Simulated for demo\n`);
  
  const escrowAccount = await simulator.createAccount();
  const escrowAddress = typeof escrowAccount.addr === 'string' ? escrowAccount.addr : escrowAccount.addr.toString();
  console.log(`📜 Escrow Account Created:`);
  console.log(`   Address: ${escrowAddress}`);
  console.log(`   Status: Simulated for demo\n`);
  
  console.log('2. Funding Accounts');
  console.log('-------------------');
  
  const fundResult = await simulator.fundAccount(donorAddress, 1000000000); // 1000 ALGO
  console.log(`💰 Donor funded with 1000 ALGO:`);
  console.log(`   Transaction ID: ${fundResult.txId}`);
  console.log(`   Confirmed Round: ${fundResult.confirmedRound}`);
  console.log(`   Status: Success (Simulated)\n`);
  
  console.log('3. Checking Account Balances');
  console.log('----------------------------');
  
  const donorInfo = await simulator.getAccountInfo(donorAddress);
  console.log(`💰 Donor Account Balance:`);
  console.log(`   Balance: ${simulator.microAlgosToAlgos(donorInfo.amount)} ALGO`);
  console.log(`   Rewards: ${simulator.microAlgosToAlgos(donorInfo['rewards'])} ALGO`);
  console.log(`   Status: ${donorInfo['status']}\n`);
  
  const ngoInfo = await simulator.getAccountInfo(ngoAddress);
  console.log(`🏢 NGO Account Balance:`);
  console.log(`   Balance: ${simulator.microAlgosToAlgos(ngoInfo.amount)} ALGO`);
  console.log(`   Rewards: ${simulator.microAlgosToAlgos(ngoInfo['rewards'])} ALGO`);
  console.log(`   Status: ${ngoInfo['status']}\n`);
  
  console.log('4. Creating Escrow Smart Contract');
  console.log('---------------------------------');
  
  // Minimal TEAL programs for demo
  const approvalProgram = new Uint8Array([
    0x01, // Version
    0x20, // txn
    0x01, // OnCompletion
    0x01, // NoOp
    0x12, // ==
    0x22, // &&
    0x01, // txn
    0x04, // NumAppArgs
    0x01, // 1
    0x12, // ==
    0x22, // &&
    0x01, // txn
    0x05, // ApplicationArgs[0]
    0x01, 0x72, 0x65, 0x6c, 0x65, 0x61, 0x73, 0x65, // "release"
    0x12, // ==
    0x22, // &&
    0x01, // gtxn
    0x00, // 0 (first transaction)
    0x02, // TypeEnum
    0x01, // 1 (Payment)
    0x12, // ==
    0x22, // &&
    0x01, // gtxn
    0x00, // 0 (first transaction)
    0x0b, // Receiver
    0x20, 0x01, // addr (first argument)
    0x12, // ==
    0x22, // &&
    0x01, // gtxn
    0x00, // 0 (first transaction)
    0x0c, // Amount
    0x26, // global
    0x04, // CurrentApplicationAddress
    0x28, // balance
    0x12, // ==
    0x12, // &&
    0x22, // &&
    0x01, // return
  ]);
  
  const clearProgram = new Uint8Array([
    0x01, // Version
    0x01, // int
    0x01, // 1
    0x01, // return
  ]);
  
  const appResult = await simulator.createApplication(
    donorAddress,
    approvalProgram,
    clearProgram,
    0, // localInts
    0, // localBytes
    1, // globalInts (for storing release status)
    0  // globalBytes
  );
  
  console.log(`📜 Escrow Smart Contract Created:`);
  console.log(`   Transaction ID: ${appResult.txId}`);
  console.log(`   Application ID: ${appResult.applicationId}`);
  console.log(`   Confirmed Round: ${appResult.confirmedRound}`);
  console.log(`   Status: Success (Simulated)\n`);
  
  console.log('5. Processing Donation Payment');
  console.log('------------------------------');
  
  const paymentResult = await simulator.sendPayment(
    donorAddress,
    escrowAddress,
    simulator.algosToMicroAlgos(500), // 500 ALGO
    'Donation for Kerala Flood Relief Campaign'
  );
  
  console.log(`💸 Donation Payment Processed:`);
  console.log(`   Transaction ID: ${paymentResult.txId}`);
  console.log(`   Amount: ${simulator.microAlgosToAlgos(paymentResult.amount)} ALGO`);
  console.log(`   From: ${donorAddress.substring(0, 10)}...${donorAddress.substring(donorAddress.length - 5)}`);
  console.log(`   To: ${escrowAddress.substring(0, 10)}...${escrowAddress.substring(escrowAddress.length - 5)}`);
  console.log(`   Note: ${paymentResult.note}`);
  console.log(`   Confirmed Round: ${paymentResult.confirmedRound}`);
  console.log(`   Status: Success (Simulated)\n`);
  
  console.log('6. Verifying Multi-Oracle Approval');
  console.log('----------------------------------');
  
  console.log(`✅ Oracle 1 (NDRF) Verification: Approved`);
  console.log(`✅ Oracle 2 (ISRO) Verification: Approved`);
  console.log(`✅ Oracle 3 (Drone Team) Verification: Approved`);
  console.log(`\n📋 All oracles have approved the aid distribution\n`);
  
  console.log('7. Releasing Funds from Escrow');
  console.log('-------------------------------');
  
  const callResult = await simulator.callApplication(
    ngoAddress,
    appResult.applicationId,
    [new Uint8Array(Buffer.from('release'))],
    [ngoAddress],
    [],
    []
  );
  
  console.log(`🔓 Funds Released from Escrow:`);
  console.log(`   Transaction ID: ${callResult.txId}`);
  console.log(`   Application ID: ${appResult.applicationId}`);
  console.log(`   Amount: 500 ALGO`);
  console.log(`   To: ${ngoAddress.substring(0, 10)}...${ngoAddress.substring(ngoAddress.length - 5)}`);
  console.log(`   Confirmed Round: ${callResult.confirmedRound}`);
  console.log(`   Status: Success (Simulated)\n`);
  
  console.log('8. Final Account Balances');
  console.log('-------------------------');
  
  const finalDonorInfo = await simulator.getAccountInfo(donorAddress);
  console.log(`💰 Donor Final Balance:`);
  console.log(`   Balance: ${simulator.microAlgosToAlgos(finalDonorInfo.amount)} ALGO\n`);
  
  const finalNgoInfo = await simulator.getAccountInfo(ngoAddress);
  console.log(`🏢 NGO Final Balance:`);
  console.log(`   Balance: ${simulator.microAlgosToAlgos(finalNgoInfo.amount)} ALGO\n`);
  
  const finalEscrowInfo = await simulator.getAccountInfo(escrowAddress);
  console.log(`📜 Escrow Final Balance:`);
  console.log(`   Balance: ${simulator.microAlgosToAlgos(finalEscrowInfo.amount)} ALGO\n`);
  
  console.log('🎉 Algorand Integration Demo Completed Successfully!');
  console.log('All transactions were simulated for demonstration purposes.');
  console.log('In a production environment, these would be actual blockchain transactions.');
}

// Run the demo if this script is executed directly
if (require.main === module) {
  runAlgorandDemo().catch(console.error);
}

module.exports = runAlgorandDemo;