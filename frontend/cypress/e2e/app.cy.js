describe('Navigation', () => {
  it('should navigate to all main pages', () => {
    cy.visit('/');
    
    // Check home page
    cy.contains('Transparent & Verifiable Disaster Relief Funding');
    
    // Navigate to campaigns page
    cy.get('a').contains('Campaigns').click();
    cy.url().should('include', '/campaigns');
    
    // Navigate to donate page
    cy.get('a').contains('Donate').click();
    cy.url().should('include', '/donate');
    
    // Navigate to NGO dashboard
    cy.get('a').contains('NGO Dashboard').click();
    cy.url().should('include', '/ngo');
    
    // Navigate to admin dashboard
    cy.get('a').contains('Admin').click();
    cy.url().should('include', '/admin');
  });
});

describe('Donation Flow', () => {
  it('should allow users to view campaigns and navigate to donate', () => {
    cy.visit('/campaigns');
    
    // Check that campaigns are displayed
    cy.contains('Disaster Relief Campaigns');
    
    // Click donate button (if campaigns exist)
    cy.get('a').contains('Donate').first().click();
    cy.url().should('include', '/donate');
  });
});

describe('Wallet Connection', () => {
  it('should allow wallet selection', () => {
    cy.visit('/donate');
    
    // Select MyAlgo wallet
    cy.get('button').contains('MyAlgo Wallet').click();
    
    // Check that the connect button appears
    cy.contains('Connect MyAlgo');
    
    // Select WalletConnect
    cy.get('button').contains('WalletConnect').click();
    
    // Check that the connect button updates
    cy.contains('Connect WalletConnect');
  });
});