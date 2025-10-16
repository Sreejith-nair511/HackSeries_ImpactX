const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const AlgorandService = require('./algorandService');

const prisma = new PrismaClient();
const algorandService = new AlgorandService();

class OracleAdapter {
  constructor() {
    this.algorandService = algorandService;
  }

  // Verify oracle signature
  verifyOracleSignature(payload, signature, publicKey) {
    try {
      const verifier = crypto.createVerify('SHA256');
      verifier.update(JSON.stringify(payload));
      verifier.end();
      
      return verifier.verify(publicKey, signature, 'hex');
    } catch (error) {
      console.error('Error verifying oracle signature:', error);
      return false;
    }
  }

  // Process oracle vote
  async processOracleVote(proofId, oracleId, vote, signature) {
    try {
      // Get proof and oracle info
      const proof = await prisma.proof.findUnique({
        where: { id: proofId },
        include: { campaign: true }
      });
      
      if (!proof) {
        throw new Error('Proof not found');
      }
      
      const oracle = await prisma.oracle.findUnique({
        where: { id: oracleId }
      });
      
      if (!oracle) {
        throw new Error('Oracle not found');
      }
      
      // Verify signature
      const payload = {
        proofId,
        oracleId,
        vote,
        timestamp: Date.now()
      };
      
      const isValidSignature = this.verifyOracleSignature(payload, signature, oracle.publicKey);
      if (!isValidSignature) {
        throw new Error('Invalid oracle signature');
      }
      
      // Check if vote already exists
      const existingVote = await prisma.oracleVote.findUnique({
        where: {
          proofId_oracleId: {
            proofId,
            oracleId
          }
        }
      });
      
      if (existingVote) {
        throw new Error('Oracle has already voted on this proof');
      }
      
      // Create oracle vote record
      const oracleVote = await prisma.oracleVote.create({
        data: {
          proofId,
          oracleId,
          vote,
          signature
        }
      });
      
      // Submit vote to Algorand smart contract
      // In a real implementation, you would use the oracle's Algorand account
      // For now, we'll use a placeholder
      /*
      const oracleAccount = { addr: 'PLACEHOLDER', sk: 'PLACEHOLDER' };
      await this.algorandService.submitOracleVote(
        proof.campaign.escrow.appId,
        vote,
        oracle.weight,
        oracleAccount
      );
      */
      
      return oracleVote;
    } catch (error) {
      console.error('Error processing oracle vote:', error);
      throw error;
    }
  }

  // Calculate weighted vote result
  async calculateVoteResult(proofId) {
    try {
      const votes = await prisma.oracleVote.findMany({
        where: { proofId },
        include: { oracle: true }
      });
      
      let yesWeight = 0;
      let noWeight = 0;
      
      for (const vote of votes) {
        if (vote.vote) {
          yesWeight += vote.oracle.weight;
        } else {
          noWeight += vote.oracle.weight;
        }
      }
      
      const totalWeight = yesWeight + noWeight;
      const threshold = totalWeight * 0.5; // Simple majority
      
      return {
        yesWeight,
        noWeight,
        totalWeight,
        threshold,
        approved: yesWeight > threshold,
        rejected: noWeight > threshold,
        pending: yesWeight <= threshold && noWeight <= threshold
      };
    } catch (error) {
      console.error('Error calculating vote result:', error);
      throw error;
    }
  }
}

module.exports = OracleAdapter;