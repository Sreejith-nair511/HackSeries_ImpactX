# Ethereum and Polygon Integration Guide

## Overview

This guide details the implementation of Ethereum and Polygon blockchain support in the ImpactX disaster response platform. These integrations complement the primary Algorand implementation by providing access to the broader DeFi ecosystem and enhanced scalability options.

## Ethereum Integration

### Web3 Provider Setup
The platform uses ethers.js for Ethereum integration:

```javascript
import { ethers } from 'ethers';

// Initialize provider
const ethereumProvider = new ethers.providers.InfuraProvider(
  'mainnet',
  process.env.INFURA_PROJECT_ID
);

// Initialize wallet
const ethereumWallet = new ethers.Wallet(
  process.env.ETHEREUM_PRIVATE_KEY,
  ethereumProvider
);
```

### ERC-20 Token Support
Support for major stablecoins and utility tokens:

```javascript
// ERC-20 Token ABI
const erc20ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)"
];

// Token contracts
const usdcContract = new ethers.Contract(
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC contract address
  erc20ABI,
  ethereumWallet
);

const daiContract = new ethers.Contract(
  '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI contract address
  erc20ABI,
  ethereumWallet
);
```

### Smart Contract Interaction
Ethereum smart contracts for escrow and governance:

```solidity
// Simplified Ethereum escrow contract
contract EthereumEscrow {
    mapping(bytes32 => Escrow) public escrows;
    mapping(address => uint256) public balances;
    
    struct Escrow {
        address donor;
        address recipient;
        uint256 amount;
        bool released;
        bool disputed;
        uint256 createdAt;
    }
    
    event EscrowCreated(
        bytes32 indexed escrowId,
        address indexed donor,
        address indexed recipient,
        uint256 amount
    );
    
    event EscrowReleased(
        bytes32 indexed escrowId,
        uint256 amount
    );
    
    function createEscrow(
        bytes32 escrowId,
        address recipient,
        uint256 amount
    ) public {
        require(escrows[escrowId].donor == address(0), "Escrow already exists");
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");
        
        // Transfer tokens to escrow
        require(
            usdcContract.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );
        
        escrows[escrowId] = Escrow({
            donor: msg.sender,
            recipient: recipient,
            amount: amount,
            released: false,
            disputed: false,
            createdAt: block.timestamp
        });
        
        emit EscrowCreated(escrowId, msg.sender, recipient, amount);
    }
    
    function releaseFunds(bytes32 escrowId) public onlyVerified {
        Escrow storage escrow = escrows[escrowId];
        require(!escrow.released, "Funds already released");
        require(!escrow.disputed, "Escrow is disputed");
        
        escrow.released = true;
        
        // Transfer funds to recipient
        require(
            usdcContract.transfer(escrow.recipient, escrow.amount),
            "Fund release failed"
        );
        
        emit EscrowReleased(escrowId, escrow.amount);
    }
}
```

### Transaction Management
Handling Ethereum transactions with proper error handling:

```javascript
const executeEthereumTransaction = async (transaction) => {
  try {
    // Estimate gas
    const gasEstimate = await ethereumProvider.estimateGas(transaction);
    
    // Add gas buffer
    const gasLimit = gasEstimate.mul(120).div(100); // 20% buffer
    
    // Execute transaction
    const tx = await ethereumWallet.sendTransaction({
      ...transaction,
      gasLimit: gasLimit
    });
    
    // Wait for confirmation
    const receipt = await tx.wait(1); // Wait for 1 confirmation
    
    return {
      success: true,
      transactionHash: tx.hash,
      gasUsed: receipt.gasUsed.toString(),
      blockNumber: receipt.blockNumber
    };
  } catch (error) {
    console.error('Ethereum transaction failed:', error);
    
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
};
```

## Polygon Integration

### Polygon Provider Configuration
Connecting to Polygon network:

```javascript
// Polygon provider
const polygonProvider = new ethers.providers.JsonRpcProvider(
  'https://polygon-rpc.com/'
);

// Polygon wallet
const polygonWallet = new ethers.Wallet(
  process.env.POLYGON_PRIVATE_KEY,
  polygonProvider
);
```

### MATIC Token Handling
Managing native MATIC tokens and Polygon-compatible assets:

```javascript
// Check MATIC balance
const getMaticBalance = async (address) => {
  const balance = await polygonProvider.getBalance(address);
  return ethers.utils.formatEther(balance);
};

// Send MATIC
const sendMatic = async (to, amount) => {
  const tx = await polygonWallet.sendTransaction({
    to: to,
    value: ethers.utils.parseEther(amount.toString())
  });
  
  return await tx.wait();
};
```

### Polygon POS Bridge
Cross-chain asset transfer between Ethereum and Polygon:

```javascript
// Root chain contract (Ethereum)
const rootChainManager = new ethers.Contract(
  '0xA0c68C638235ee3265d2e351E389B8645f6D66Bf',
  rootChainManagerABI,
  ethereumWallet
);

// Child chain contract (Polygon)
const childChainManager = new ethers.Contract(
  '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
  childChainManagerABI,
  polygonWallet
);

// Deposit ERC-20 tokens from Ethereum to Polygon
const depositERC20ToPolygon = async (tokenAddress, amount) => {
  const tx = await rootChainManager.depositFor(
    polygonWallet.address,
    tokenAddress,
    ethers.utils.defaultAbiCoder.encode(['uint256'], [amount])
  );
  
  return await tx.wait();
};

// Withdraw ERC-20 tokens from Polygon to Ethereum
const withdrawERC20FromPolygon = async (tokenAddress, amount) => {
  const tx = await childChainManager.withdraw(
    tokenAddress,
    ethers.utils.defaultAbiCoder.encode(['uint256'], [amount])
  );
  
  return await tx.wait();
};
```

### Gas Optimization
Optimizing transactions for low Polygon gas fees:

```javascript
const getOptimalPolygonGasPrice = async () => {
  // Get current gas price
  const currentGasPrice = await polygonProvider.getGasPrice();
  
  // Apply discount for Polygon (typically much lower than Ethereum)
  const optimalGasPrice = currentGasPrice.mul(110).div(100); // 10% buffer
  
  return optimalGasPrice;
};

const executePolygonTransaction = async (transaction) => {
  try {
    // Get optimal gas price
    const gasPrice = await getOptimalPolygonGasPrice();
    
    // Estimate gas
    const gasEstimate = await polygonProvider.estimateGas(transaction);
    
    // Add gas buffer
    const gasLimit = gasEstimate.mul(120).div(100);
    
    // Execute transaction
    const tx = await polygonWallet.sendTransaction({
      ...transaction,
      gasPrice: gasPrice,
      gasLimit: gasLimit
    });
    
    // Wait for confirmation
    const receipt = await tx.wait(1);
    
    return {
      success: true,
      transactionHash: tx.hash,
      gasUsed: receipt.gasUsed.toString(),
      gasPrice: gasPrice.toString()
    };
  } catch (error) {
    console.error('Polygon transaction failed:', error);
    
    return {
      success: false,
      error: error.message
    };
  }
};
```

## Cross-Chain Bridge Implementation

### Bridge Architecture
Secure asset transfer between chains:

```javascript
class CrossChainBridge {
  constructor() {
    this.ethereumProvider = new ethers.providers.InfuraProvider('mainnet', process.env.INFURA_PROJECT_ID);
    this.polygonProvider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');
    this.algorandClient = new algosdk.Algodv2('', 'https://algoexplorerapi.io', '');
  }
  
  // Deposit from Ethereum to Polygon
  async depositToPolygon(tokenAddress, amount, userAddress) {
    try {
      // Approve token transfer
      const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, ethereumWallet);
      const approveTx = await tokenContract.approve(
        '0xA0c68C638235ee3265d2e351E389B8645f6D66Bf', // RootChainManager
        amount
      );
      await approveTx.wait();
      
      // Deposit tokens
      const depositTx = await rootChainManager.depositFor(
        userAddress,
        tokenAddress,
        ethers.utils.defaultAbiCoder.encode(['uint256'], [amount])
      );
      
      const receipt = await depositTx.wait();
      
      return {
        success: true,
        transactionHash: receipt.transactionHash,
        bridgeEvent: this.extractBridgeEvent(receipt)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  // Withdraw from Polygon to Ethereum
  async withdrawFromPolygon(tokenAddress, amount) {
    try {
      const tx = await childChainManager.withdraw(
        tokenAddress,
        ethers.utils.defaultAbiCoder.encode(['uint256'], [amount])
      );
      
      const receipt = await tx.wait();
      
      return {
        success: true,
        transactionHash: receipt.transactionHash
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  // Extract bridge event for tracking
  extractBridgeEvent(receipt) {
    const bridgeEvent = receipt.events.find(event => 
      event.address.toLowerCase() === '0xA0c68C638235ee3265d2e351E389B8645f6D66Bf'.toLowerCase()
    );
    
    return bridgeEvent ? {
      id: bridgeEvent.topics[1],
      sender: bridgeEvent.args.sender,
      token: bridgeEvent.args.token,
      amount: bridgeEvent.args.amount.toString()
    } : null;
  }
}
```

## Token Management

### Multi-Chain Token Support
Unified interface for tokens across chains:

```javascript
class TokenManager {
  constructor() {
    this.tokens = {
      USDC: {
        ethereum: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        polygon: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        algorand: 31566704,
        decimals: 6
      },
      DAI: {
        ethereum: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        polygon: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        decimals: 18
      }
    };
  }
  
  // Get token contract for specific chain
  getTokenContract(tokenSymbol, chain) {
    const tokenInfo = this.tokens[tokenSymbol];
    if (!tokenInfo) {
      throw new Error(`Token ${tokenSymbol} not supported`);
    }
    
    const contractAddress = tokenInfo[chain];
    if (!contractAddress) {
      throw new Error(`Token ${tokenSymbol} not available on ${chain}`);
    }
    
    switch (chain) {
      case 'ethereum':
        return new ethers.Contract(contractAddress, erc20ABI, ethereumWallet);
      case 'polygon':
        return new ethers.Contract(contractAddress, erc20ABI, polygonWallet);
      case 'algorand':
        return new algosdk.ABIContract({
          name: tokenSymbol,
          methods: [
            {
              name: 'balance',
              args: [{ type: 'address' }],
              returns: { type: 'uint256' }
            }
          ]
        });
      default:
        throw new Error(`Chain ${chain} not supported`);
    }
  }
  
  // Get token balance across all chains
  async getMultiChainBalance(tokenSymbol, userAddress) {
    const balances = {};
    
    for (const chain of ['ethereum', 'polygon', 'algorand']) {
      try {
        if (this.tokens[tokenSymbol][chain]) {
          const contract = this.getTokenContract(tokenSymbol, chain);
          
          if (chain === 'algorand') {
            const accountInfo = await algodClient.accountInformation(userAddress).do();
            balances[chain] = accountInfo.assets[this.tokens[tokenSymbol].algorand] || 0;
          } else {
            balances[chain] = await contract.balanceOf(userAddress);
          }
        }
      } catch (error) {
        console.warn(`Failed to get ${tokenSymbol} balance on ${chain}:`, error.message);
        balances[chain] = '0';
      }
    }
    
    return balances;
  }
}
```

## Security Considerations

### Private Key Management
Secure handling of blockchain credentials:

```javascript
// Environment-based configuration
const blockchainConfig = {
  ethereum: {
    provider: process.env.ETHEREUM_PROVIDER,
    privateKey: process.env.ETHEREUM_PRIVATE_KEY,
    contractAddresses: {
      escrow: process.env.ETHEREUM_ESCROW_CONTRACT,
      token: process.env.ETHEREUM_TOKEN_CONTRACT
    }
  },
  polygon: {
    provider: process.env.POLYGON_PROVIDER,
    privateKey: process.env.POLYGON_PRIVATE_KEY,
    contractAddresses: {
      escrow: process.env.POLYGON_ESCROW_CONTRACT,
      token: process.env.POLYGON_TOKEN_CONTRACT
    }
  }
};

// Validate configuration
const validateBlockchainConfig = (config) => {
  const requiredFields = ['provider', 'privateKey', 'contractAddresses'];
  
  for (const chain of Object.keys(config)) {
    for (const field of requiredFields) {
      if (!config[chain][field]) {
        throw new Error(`Missing ${field} for ${chain} configuration`);
      }
    }
  }
};
```

### Transaction Verification
Ensuring transaction integrity:

```javascript
const verifyTransaction = async (chain, transactionHash) => {
  let provider;
  
  switch (chain) {
    case 'ethereum':
      provider = ethereumProvider;
      break;
    case 'polygon':
      provider = polygonProvider;
      break;
    default:
      throw new Error(`Unsupported chain: ${chain}`);
  }
  
  // Get transaction receipt
  const receipt = await provider.getTransactionReceipt(transactionHash);
  
  if (!receipt) {
    throw new Error('Transaction not found');
  }
  
  // Verify transaction success
  if (receipt.status !== 1) {
    throw new Error('Transaction failed');
  }
  
  // Verify block confirmations
  const currentBlock = await provider.getBlockNumber();
  const confirmations = currentBlock - receipt.blockNumber;
  
  if (confirmations < 12) {
    throw new Error(`Insufficient confirmations: ${confirmations}`);
  }
  
  return {
    success: true,
    receipt: receipt,
    confirmations: confirmations
  };
};
```

## Performance Optimization

### Batch Processing
Efficient handling of multiple transactions:

```javascript
class BatchProcessor {
  constructor() {
    this.batchSize = 10;
    this.processingQueue = [];
  }
  
  async processBatch(transactions) {
    const results = [];
    
    for (let i = 0; i < transactions.length; i += this.batchSize) {
      const batch = transactions.slice(i, i + this.batchSize);
      const batchResults = await Promise.all(
        batch.map(tx => this.processTransaction(tx))
      );
      
      results.push(...batchResults);
      
      // Add delay between batches to avoid rate limiting
      if (i + this.batchSize < transactions.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }
  
  async processTransaction(transaction) {
    try {
      // Determine chain and process accordingly
      const chain = transaction.chain;
      
      switch (chain) {
        case 'ethereum':
          return await executeEthereumTransaction(transaction);
        case 'polygon':
          return await executePolygonTransaction(transaction);
        default:
          throw new Error(`Unsupported chain: ${chain}`);
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        transaction: transaction
      };
    }
  }
}
```

## Monitoring and Analytics

### Transaction Tracking
Monitoring cross-chain transactions:

```javascript
const trackCrossChainTransaction = (transactionData) => {
  // Log transaction for analytics
  analytics.track('CrossChainTransaction', {
    chain: transactionData.chain,
    type: transactionData.type,
    amount: transactionData.amount,
    token: transactionData.token,
    timestamp: new Date().toISOString(),
    gasUsed: transactionData.gasUsed,
    gasPrice: transactionData.gasPrice,
    status: transactionData.status
  });
  
  // Update user's transaction history
  updateUserTransactionHistory(transactionData.userId, transactionData);
};

const updateUserTransactionHistory = (userId, transaction) => {
  const historyKey = `user_${userId}_transactions`;
  const existingHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
  
  existingHistory.push({
    ...transaction,
    timestamp: new Date().toISOString()
  });
  
  localStorage.setItem(historyKey, JSON.stringify(existingHistory));
};
```

## Error Handling and Recovery

### Graceful Error Management
Handling blockchain-specific errors:

```javascript
const handleBlockchainError = (error, chain) => {
  console.error(`${chain} blockchain error:`, error);
  
  // Common error patterns
  const errorPatterns = {
    'INSUFFICIENT_FUNDS': 'Insufficient funds for transaction',
    'NETWORK_ERROR': 'Network connectivity issue',
    'GAS_LIMIT_EXCEEDED': 'Transaction gas limit exceeded',
    'NONCE_TOO_LOW': 'Transaction nonce too low',
    'REPLACEMENT_UNDERPRICED': 'Replacement transaction underpriced'
  };
  
  // Match error pattern
  for (const [pattern, message] of Object.entries(errorPatterns)) {
    if (error.message.includes(pattern)) {
      return {
        success: false,
        error: message,
        code: pattern,
        retryable: isRetryableError(pattern)
      };
    }
  }
  
  // Unknown error
  return {
    success: false,
    error: 'Unknown blockchain error',
    code: 'UNKNOWN_ERROR',
    retryable: false
  };
};

const isRetryableError = (errorCode) => {
  const retryableErrors = [
    'NETWORK_ERROR',
    'TIMEOUT',
    'REPLACEMENT_UNDERPRICED'
  ];
  
  return retryableErrors.includes(errorCode);
};
```

## Future Enhancements

### Layer 2 Integration
Planning for additional scaling solutions:

```javascript
// Optimism integration
const optimismProvider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.optimism.io'
);

// Arbitrum integration
const arbitrumProvider = new ethers.providers.JsonRpcProvider(
  'https://arb1.arbitrum.io/rpc'
);

// zkSync integration
const zksyncProvider = new ethers.providers.JsonRpcProvider(
  'https://zksync2-mainnet.zksync.io'
);
```

### Advanced Token Features
Support for more sophisticated token mechanics:

```javascript
// Yield-bearing tokens
const yieldTokenABI = [
  ...erc20ABI,
  "function deposit(uint256 amount) returns (uint256)",
  "function withdraw(uint256 shares) returns (uint256)",
  "function getReward() returns (uint256)"
];

// Governance tokens
const governanceTokenABI = [
  ...erc20ABI,
  "function delegate(address delegatee)",
  "function getVotes(address account) view returns (uint256)",
  "function propose(address[] targets, uint256[] values, string[] calldatas, string description) returns (uint256)"
];
```

## Conclusion

The Ethereum and Polygon integrations in the ImpactX platform provide essential scalability and interoperability features that complement the primary Algorand implementation. These integrations enable access to the broader DeFi ecosystem, support for major stablecoins, and enhanced user experience through reduced transaction costs on Polygon.

The multi-chain architecture ensures that users can choose the most appropriate blockchain for their needs while maintaining the security and transparency that are fundamental to the ImpactX mission of verifiable disaster relief funding.