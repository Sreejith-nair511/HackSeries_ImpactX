# System Design Document

This document provides an overview of the technical design of the ImpactX system, including the TEAL smart contract logic, oracle weighting mechanism, and data privacy choices.

## Table of Contents

1. [TEAL Smart Contract Design](#teal-smart-contract-design)
2. [Oracle Weighting Mechanism](#oracle-weighting-mechanism)
3. [Data Privacy and Security](#data-privacy-and-security)
4. [System Architecture](#system-architecture)

## TEAL Smart Contract Design

### Overview

The TEAL smart contract implements an escrow system for disaster relief funding. It holds donated funds until verified proof of aid delivery is provided through a multi-oracle verification system.

### Key Features

1. **Escrow Management**:
   - Accepts donations from multiple donors
   - Holds funds in escrow until release conditions are met
   - Supports fund release or refund mechanisms

2. **Oracle Voting System**:
   - Multi-oracle verification for proof validation
   - Weighted voting based on oracle credibility
   - Threshold-based decision making

3. **IPFS Hash Anchoring**:
   - Stores IPFS hashes of proof documents on-chain
   - Uses transaction notes to minimize on-chain storage
   - Provides audit trail for all transactions

### State Schema

The smart contract maintains minimal on-chain state to optimize costs and performance:

| Key | Type | Description |
|-----|------|-------------|
| goal | bytes | Campaign goal description |
| ngoAddress | address | NGO wallet address for fund release |
| threshold | uint64 | Minimum votes required for fund release |
| deadline | uint64 | Deadline for proof submission |
| yesCount | uint64 | Current count of positive votes |
| noCount | uint64 | Current count of negative votes |

### Transaction Types

1. **Initialize**:
   - Sets up the escrow with campaign parameters
   - Initializes state variables
   - Sets the NGO address and voting threshold

2. **Donate**:
   - Accepts ALGO donations from donors
   - Records donation in escrow balance
   - Anchors donation transaction hash

3. **Oracle Vote**:
   - Accepts votes from authorized oracles
   - Verifies oracle signature
   - Updates vote counts based on oracle weight

4. **Release**:
   - Releases funds to NGO when threshold is met
   - Transfers escrow balance to NGO address
   - Marks campaign as completed

5. **Refund**:
   - Refunds funds to donors when deadline passes without approval
   - Only available after deadline expiration
   - Requires admin authorization

### Security Considerations

1. **Access Control**:
   - Only authorized oracles can submit votes
   - Only NGO or admin can trigger fund release
   - Only admin can trigger refunds

2. **Signature Verification**:
   - All oracle votes must be cryptographically signed
   - Signature verification ensures authenticity
   - Prevents unauthorized vote submission

3. **Reentrancy Protection**:
   - Uses state checks to prevent reentrancy attacks
   - Validates transaction sequence
   - Implements proper fund transfer ordering

## Oracle Weighting Mechanism

### Overview

The system implements a weighted voting mechanism to determine the validity of aid delivery proofs. Different oracles have different weights based on their credibility and expertise.

### Oracle Types and Weights

| Oracle Type | Weight | Description |
|-------------|--------|-------------|
| NGO | 40% | Primary validator with domain expertise |
| Drone | 25% | Provides aerial imagery verification |
| Satellite | 20% | Provides large-scale geographic verification |
| IoT Sensor | 10% | Provides ground-level sensor data |
| Community | 5% | Local community verification |

### Voting Process

1. **Proof Submission**:
   - NGO uploads proof document to IPFS
   - IPFS hash is anchored on-chain
   - Oracles are notified of new proof

2. **Vote Submission**:
   - Each oracle reviews the proof independently
   - Oracles sign their vote with private key
   - Votes are submitted to backend API

3. **Vote Verification**:
   - Backend verifies oracle signatures
   - Applies weighting based on oracle type
   - Submits verified votes to smart contract

4. **Decision Making**:
   - Smart contract tallies weighted votes
   - If threshold is met, funds are released
   - If threshold is not met, campaign continues

### Threshold Calculation

The system uses a dynamic threshold based on the total weight of available oracles:

```
Threshold = 60% of total available weight
```

For example, if only NGO and Drone oracles are available:
- Total weight = 40% + 25% = 65%
- Required threshold = 60% of 65% = 39%

### Security Considerations

1. **Signature Verification**:
   - All votes must be cryptographically signed
   - Public keys are stored and verified
   - Prevents vote tampering

2. **Oracle Authentication**:
   - Only registered oracles can submit votes
   - Oracle credentials are verified
   - Unauthorized oracles are rejected

3. **Weight Integrity**:
   - Oracle weights are stored on-chain
   - Cannot be modified without admin approval
   - Ensures fair voting process

## Data Privacy and Security

### Overview

The system implements multiple layers of data privacy and security to protect sensitive information while maintaining transparency for public verification.

### Data Classification

1. **Public Data**:
   - Campaign information
   - Donation amounts and timestamps
   - Proof document IPFS hashes
   - Oracle votes (without details)

2. **Restricted Data**:
   - Donor personal information
   - Detailed proof documents
   - Oracle verification details
   - Internal campaign communications

3. **Private Data**:
   - Oracle private keys
   - Admin credentials
   - Database access credentials
   - IPFS provider credentials

### Privacy Measures

1. **Data Minimization**:
   - Only essential data stored on-chain
   - Personal information kept off-chain
   - IPFS used for document storage

2. **Encryption**:
   - Sensitive data encrypted at rest
   - TLS encryption for data in transit
   - Key management for encryption keys

3. **Access Control**:
   - Role-based access control (RBAC)
   - JWT-based authentication
   - API key protection for services

4. **Audit Trail**:
   - All transactions recorded on-chain
   - IPFS hashes provide document integrity
   - Activity logs for accountability

### Security Implementation

1. **Input Validation**:
   - Server-side validation for all inputs
   - Sanitization of user-provided data
   - Protection against injection attacks

2. **Rate Limiting**:
   - API rate limiting to prevent abuse
   - Throttling for high-volume requests
   - DDoS protection measures

3. **Secrets Management**:
   - Environment variables for configuration
   - Secure storage for sensitive credentials
   - Regular credential rotation

4. **File Security**:
   - File type and size validation
   - Virus scanning for uploaded files
   - Secure temporary file handling

## System Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Donors        │    │   NGO           │    │   Oracles       │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │Wallet       │ │    │ │Dashboard    │ │    │ │Verification │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │      Frontend           │
                    │   (React + Vite)        │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │      Backend            │
                    │  (Node.js + Express)    │
                    ├─────────────────────────┤
                    │ • REST API              │
                    │ • Business Logic        │
                    │ • Oracle Adapter        │
                    │ • IPFS Integration      │
                    └────────────┬────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
┌────────▼────────┐   ┌──────────▼──────────┐   ┌────────▼────────┐
│   PostgreSQL    │   │   Algorand Node     │   │      IPFS       │
│  (Database)     │   │  (Smart Contract)   │   │ (Pinata/Infura) │
└─────────────────┘   └─────────────────────┘   └─────────────────┘
```

### Component Responsibilities

1. **Frontend**:
   - User interface for donors, NGOs, and admins
   - Wallet integration for Algorand transactions
   - Real-time status updates
   - Proof document upload

2. **Backend**:
   - REST API for all system interactions
   - Business logic implementation
   - Oracle vote processing
   - IPFS document management
   - Authentication and authorization

3. **Database**:
   - User account management
   - Campaign and donation tracking
   - Proof document metadata
   - Oracle registration and weighting

4. **Blockchain**:
   - Escrow fund management
   - Oracle vote recording
   - Transaction audit trail
   - Smart contract execution

5. **IPFS**:
   - Decentralized document storage
   - Proof document persistence
   - Content addressing
   - Redundancy and availability

### Data Flow

1. **Donation Flow**:
   ```
   Donor → Frontend → Backend → Algorand Node
                              ↘
                               → Database
   ```

2. **Proof Submission Flow**:
   ```
   NGO → Frontend → Backend → IPFS
                            ↘
                             → Algorand Node
                             ↘
                              → Database
   ```

3. **Oracle Verification Flow**:
   ```
   Oracle → Frontend → Backend → Algorand Node
                               ↘
                                → Database
   ```

4. **Fund Release Flow**:
   ```
   Backend → Algorand Node → NGO Wallet
                          ↘
                           → Database
   ```

### Scalability Considerations

1. **Horizontal Scaling**:
   - Backend services can be scaled horizontally
   - Load balancing for high availability
   - Database connection pooling

2. **Caching**:
   - API response caching
   - Database query optimization
   - CDN for frontend assets

3. **Database Optimization**:
   - Indexing for performance
   - Query optimization
   - Connection pooling

4. **Blockchain Optimization**:
   - Batch transactions where possible
   - Efficient smart contract design
   - Off-chain computation when appropriate