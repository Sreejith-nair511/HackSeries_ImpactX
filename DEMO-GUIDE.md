# ImpactX Platform - Complete Demo Guide

This guide will walk you through setting up and demonstrating the ImpactX disaster relief funding platform with all features working in a simulated environment.

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Git

## Setup Instructions

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the complete demo setup:
   ```
   npm run demo
   ```

This will:
- Set up the database with the latest schema
- Populate the database with realistic demo data
- Start the backend server on `http://localhost:5000`

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` (or the next available port).

## Demo Credentials

### User Accounts
| Role | Email | Password |
|------|-------|----------|
| Donor | donor@example.com | Password123! |
| NGO | ngo@example.com | Password123! |
| Admin | admin@example.com | Password123! |
| Oracle | oracle1@example.com | Password123! |
| Oracle | oracle2@example.com | Password123! |
| Oracle | oracle3@example.com | Password123! |

## Demo Scenarios

### Scenario 1: Donor Journey

1. **Login as Donor**
   - Navigate to `http://localhost:5173`
   - Click "Login" in the navigation bar
   - Enter donor credentials: `donor@example.com` / `Password123!`

2. **Browse Campaigns**
   - Click "Campaigns" in the navigation menu
   - View active campaigns (Kerala Flood Relief, Rajasthan Drought Support)
   - Click on a campaign to see details

3. **Make a Donation**
   - Click "Donate Now" button on any campaign
   - Select a wallet (MyAlgo or WalletConnect)
   - Click "Connect" (simulated connection will be established)
   - Enter donation amount (use preset amounts or custom value)
   - Click "Donate ₹[amount]"
   - Observe the realistic transaction flow:
     * Transaction preparation
     * Wallet connection simulation
     * Blockchain transaction simulation
     * Database recording
     * Success confirmation

4. **View Donation History**
   - Click "Donations" in the user menu
   - See all previous donations with details

### Scenario 2: NGO Workflow

1. **Login as NGO**
   - Logout as donor if still logged in
   - Login with NGO credentials: `ngo@example.com` / `Password123!`

2. **Create a New Campaign**
   - Click "Create Campaign" in the NGO dashboard
   - Fill in campaign details:
     * Title: "Assam Flood Relief 2025"
     * Description: "Emergency response for flood-affected communities in Assam"
     * Goal: ₹4,000,000
     * NGO Address: "Assam-Relief-Fund-Address-11223"
   - Click "Create Campaign"

3. **Upload Proof of Aid Distribution**
   - Navigate to the newly created campaign
   - Click "Upload Proof" button
   - Add description: "Distribution of relief kits to 300 families in Dibrugarh"
   - (In a real scenario, you would upload documents, but for demo we'll show the UI)

### Scenario 3: Oracle Verification Process

1. **Login as Oracle**
   - Logout as NGO if still logged in
   - Login with oracle credentials: `oracle1@example.com` / `Password123!`

2. **Review Pending Proofs**
   - Navigate to "Proof Verification" section
   - View pending proofs from various campaigns
   - Click on "Rajasthan Drought Support" proof

3. **Submit Verification Vote**
   - Review proof details
   - Submit verification (approve or reject)
   - Note how the weighted voting system works:
     * NDRF votes have higher weight (3)
     * ISRO satellite data has medium weight (2)
     * Drone surveillance has lower weight (1)

### Scenario 4: Admin Dashboard

1. **Login as Admin**
   - Logout as oracle if still logged in
   - Login with admin credentials: `admin@example.com` / `Password123!`

2. **View Platform Analytics**
   - Navigate to Admin Dashboard
   - View overall platform statistics:
     * Total campaigns
     * Total donations
     * Funds distributed
     * Active users

3. **Manage Users**
   - Navigate to "User Management" section
   - View all registered users
   - Promote/demote users between roles
   - Deactivate suspicious accounts

4. **Monitor Campaigns**
   - View all campaigns with their status
   - See funding progress
   - Identify completed campaigns

## Algorand Blockchain Features (Simulated)

The platform simulates all Algorand blockchain features for demonstration:

1. **Wallet Connections**
   - MyAlgo Wallet simulation
   - WalletConnect simulation with QR code display
   - Automatic fallback to simulation mode if real wallets aren't available

2. **Transaction Processing**
   - Realistic transaction IDs (SIMULATED-TX-XXXXXX)
   - Transaction status updates
   - Blockchain confirmation simulation

3. **Smart Contract Escrows**
   - Escrow creation for each campaign
   - Fund holding until verification
   - Automatic release upon multi-oracle approval

4. **Multi-Signature Verification**
   - Weighted voting system
   - Threshold-based fund release
   - Transparent verification process

## Data Verification Features

1. **Multi-Source Oracles**
   - Government agencies (NDRF)
   - Satellite imagery (ISRO)
   - Drone surveillance teams

2. **IPFS Document Storage**
   - Proof documents stored on IPFS
   - Content addressing for tamper-proof storage
   - Hash anchoring on blockchain

3. **Transparent Tracking**
   - Real-time donation tracking
   - Verification status updates
   - Public campaign progress

## Mobile Responsiveness

The platform is fully responsive and works on mobile devices:

1. **Navigation Menu**
   - Collapsible hamburger menu on small screens
   - Touch-friendly interface elements

2. **Campaign Cards**
   - Responsive grid layout
   - Optimized for touch interactions

3. **Donation Flow**
   - Mobile-optimized forms
   - Large touch targets for buttons

## Dark Mode Support

The platform includes full dark mode support:

1. **Toggle Switch**
   - Available in the user menu
   - System preference detection

2. **Consistent Styling**
   - All components adapt to dark theme
   - Proper contrast ratios for accessibility

## Branding Elements

The platform includes Algorand branding:

1. **Visual Identity**
   - Algorand color scheme (orange accents)
   - Blockchain-themed icons and graphics

2. **Technical Branding**
   - References to Algorand TestNet
   - TEAL smart contract mentions
   - PureStake API integration points

## Troubleshooting

### Common Issues

1. **Port Conflicts**
   - Backend runs on port 5000 by default
   - Frontend runs on port 5173 by default
   - If ports are in use, the system will automatically select the next available port

2. **Database Issues**
   - If you encounter database errors, try resetting:
     ```
     cd backend
     npx prisma migrate reset
     npm run demo-seed
     ```

3. **Dependency Issues**
   - Ensure all dependencies are installed:
     ```
     cd backend && npm install
     cd frontend && npm install
     ```

### Resetting Demo Data

To reset the demo data:

1. Stop both backend and frontend servers
2. In the backend directory:
   ```
   npx prisma migrate reset
   npm run demo-seed
   ```
3. Restart both servers

## Video Demo Script

For recording a comprehensive video demo, follow this script:

1. **Introduction (30 seconds)**
   - Briefly explain the platform's purpose
   - Mention Algorand blockchain integration

2. **Donor Journey (2 minutes)**
   - Login as donor
   - Browse campaigns
   - Make donation with wallet simulation
   - Show transaction flow

3. **NGO Workflow (1.5 minutes)**
   - Login as NGO
   - Create campaign
   - Upload proof (show UI)

4. **Oracle Verification (1 minute)**
   - Login as oracle
   - Review proof
   - Submit vote

5. **Admin Dashboard (1 minute)**
   - Login as admin
   - Show analytics
   - Manage users

6. **Technical Features (1 minute)**
   - Highlight Algorand integration
   - Show mobile responsiveness
   - Toggle dark mode

7. **Conclusion (30 seconds)**
   - Recap key benefits
   - Mention transparency and trust

Total demo time: ~7.5 minutes

## Additional Features to Highlight

1. **Real-time Updates**
   - Donation counters update in real-time
   - Verification status changes immediately

2. **Security Features**
   - JWT authentication
   - Role-based access control
   - XSS protection
   - Rate limiting

3. **Performance Optimizations**
   - Fast loading times
   - Efficient database queries
   - Caching mechanisms

This comprehensive demo showcases all aspects of the ImpactX platform while demonstrating how blockchain technology can bring transparency and trust to disaster relief funding.