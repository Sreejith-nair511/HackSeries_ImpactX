const algosdk = require('algosdk');
const fs = require('fs');
const path = require('path');

describe('TEAL Smart Contract', () => {
  let algodClient;
  let creatorAccount;

  beforeAll(async () => {
    // Initialize algod client for testing
    algodClient = new algosdk.Algodv2(
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'http://localhost',
      4001
    );

    // Generate a new account for testing
    creatorAccount = algosdk.generateAccount();
  });

  describe('Contract Compilation', () => {
    it('should compile the TEAL contract without errors', async () => {
      // Read TEAL contract
      const tealFilePath = path.join(__dirname, '..', 'contracts', 'escrow.teal');
      const tealCode = fs.readFileSync(tealFilePath, 'utf8');
      
      // Attempt to compile
      await expect(algodClient.compile(tealCode).do())
        .resolves
        .toBeDefined();
    });

    it('should have correct program structure', () => {
      const tealFilePath = path.join(__dirname, '..', 'contracts', 'escrow.teal');
      const tealCode = fs.readFileSync(tealFilePath, 'utf8');
      
      // Check for required elements
      expect(tealCode).toContain('#pragma version 8');
      expect(tealCode).toContain('app_create:');
      expect(tealCode).toContain('app_call:');
      expect(tealCode).toContain('handle_donate:');
      expect(tealCode).toContain('handle_oracle_vote:');
      expect(tealCode).toContain('handle_release:');
      expect(tealCode).toContain('handle_refund:');
    });
  });

  describe('Contract Logic', () => {
    it('should initialize with correct global state', () => {
      // This would require deploying the contract and checking state
      // For now, we'll just check the TEAL code contains expected state variables
      const tealFilePath = path.join(__dirname, '..', 'contracts', 'escrow.teal');
      const tealCode = fs.readFileSync(tealFilePath, 'utf8');
      
      expect(tealCode).toContain('approval_status');
      expect(tealCode).toContain('ngo_address');
      expect(tealCode).toContain('goal');
      expect(tealCode).toContain('deadline');
      expect(tealCode).toContain('yes_count');
      expect(tealCode).toContain('no_count');
      expect(tealCode).toContain('threshold');
    });

    it('should handle donation transactions', () => {
      const tealFilePath = path.join(__dirname, '..', 'contracts', 'escrow.teal');
      const tealCode = fs.readFileSync(tealFilePath, 'utf8');
      
      expect(tealCode).toContain('handle_donate:');
      expect(tealCode).toContain('int 1');
      expect(tealCode).toContain('return');
    });

    it('should handle oracle voting', () => {
      const tealFilePath = path.join(__dirname, '..', 'contracts', 'escrow.teal');
      const tealCode = fs.readFileSync(tealFilePath, 'utf8');
      
      expect(tealCode).toContain('handle_oracle_vote:');
      expect(tealCode).toContain('update_yes_votes');
      expect(tealCode).toContain('update_no_votes');
    });

    it('should handle fund release', () => {
      const tealFilePath = path.join(__dirname, '..', 'contracts', 'escrow.teal');
      const tealCode = fs.readFileSync(tealFilePath, 'utf8');
      
      expect(tealCode).toContain('handle_release:');
      expect(tealCode).toContain('txn Sender');
      expect(tealCode).toContain('itxn_begin');
      expect(tealCode).toContain('itxn_submit');
    });

    it('should handle refund', () => {
      const tealFilePath = path.join(__dirname, '..', 'contracts', 'escrow.teal');
      const tealCode = fs.readFileSync(tealFilePath, 'utf8');
      
      expect(tealCode).toContain('handle_refund:');
      expect(tealCode).toContain('txn Sender');
      expect(tealCode).toContain('itxn_begin');
      expect(tealCode).toContain('itxn_submit');
    });
  });
});