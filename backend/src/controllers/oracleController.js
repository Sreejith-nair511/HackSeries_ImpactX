const { PrismaClient } = require('@prisma/client');
const { validateOracleVote } = require('../middleware/validation');
const OracleAdapter = require('../services/oracleAdapter');

const prisma = new PrismaClient();
const oracleAdapter = new OracleAdapter();

const submitOracleVote = [
  validateOracleVote,
  async (req, res) => {
    try {
      const { proofId, oracleId, vote, signature } = req.body;
      const { userId } = req.user;

      // Verify that the user is authorized to submit this vote
      const oracle = await prisma.oracle.findUnique({
        where: { id: oracleId }
      });

      if (!oracle) {
        return res.status(404).json({ error: 'Oracle not found' });
      }

      // In a real implementation, you would verify that the user
      // is associated with this oracle (e.g., through a token or key)
      // For now, we'll assume authorization is handled elsewhere

      // Process the oracle vote
      const oracleVote = await oracleAdapter.processOracleVote(
        proofId,
        oracleId,
        vote,
        signature
      );

      res.status(201).json({
        message: 'Oracle vote submitted successfully',
        vote: oracleVote
      });
    } catch (error) {
      console.error('Submit oracle vote error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
];

const getOracleVotes = async (req, res) => {
  try {
    const { proofId } = req.query;

    let whereClause = {};

    if (proofId) {
      whereClause.proofId = proofId;
    }

    const votes = await prisma.oracleVote.findMany({
      where: whereClause,
      include: {
        oracle: {
          select: {
            id: true,
            name: true,
            weight: true
          }
        },
        proof: {
          select: {
            id: true,
            description: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({ votes });
  } catch (error) {
    console.error('Get oracle votes error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getVoteResult = async (req, res) => {
  try {
    const { proofId } = req.params;

    const result = await oracleAdapter.calculateVoteResult(proofId);

    res.json({ result });
  } catch (error) {
    console.error('Get vote result error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  submitOracleVote,
  getOracleVotes,
  getVoteResult
};