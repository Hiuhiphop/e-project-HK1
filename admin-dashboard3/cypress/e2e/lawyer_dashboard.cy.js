describe('Lawyer Dashboard E2E Tests', () => {
  beforeEach(() => {
    
    cy.visit('http://localhost:5174/login');
  });

  it('should successfully log in as a lawyer and navigate to the dashboard', () => {
    
    cy.get('input[placeholder="Username"]').type('John Doe');
    cy.get('input[placeholder="Password"]').type('password'); 
    cy.get('button[type="submit"]').click();

    
    cy.url().should('include', '/lawyer-dashboard');
    cy.contains('h2', 'Lawyer Dashboard').should('be.visible');
  });

  it('should successfully update lawyer profile', () => {
    cy.log('Test: Update Lawyer Profile');
    
    
    cy.get('input[placeholder="Username"]').type('John Doe');
    cy.get('input[placeholder="Password"]').type('password'); 
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/lawyer-dashboard');

    
    cy.get('.ant-menu-item').contains('Personal Profile').click();
    cy.url().should('include', '/lawyer-profile');
    
    
    cy.get('.ant-card-head-title').should('contain', 'Update Lawyer Profile').and('be.visible');

    
    cy.get('#lawyer_profile_name').clear()
    cy.get('#lawyer_profile_name').type('John Smith');
    
    
    cy.get('button[type="submit"]').click();
    
    
    cy.get('.ant-message').contains('Update lawyer profile successfully!').should('be.visible');
  });

  it('should successfully confirm an appointment', () => {
    cy.log('Test: Confirm Appointment');
    
    
    cy.get('input[placeholder="Username"]').type('John Doe');
    cy.get('input[placeholder="Password"]').type('password'); 
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/lawyer-dashboard');

    
    cy.get('.ant-menu-item').contains('Appointment Management').click();
    cy.url().should('include', '/lawyer-appointments');

    
    cy.get('.ant-table-row').contains('Pending').parents('.ant-table-row').within(() => {
        cy.contains('button', 'Confirm').click();
    });

    cy.get('.ant-message').contains('Confirmed appointment!').should('be.visible');
     
  });

  it('should successfully add new availability', () => {
    cy.log('Test: Add New Availability');
    
    
    cy.get('input[placeholder="Username"]').type('John Doe');
    cy.get('input[placeholder="Password"]').type('password'); 
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/lawyer-dashboard');

    
    cy.get('.ant-menu-item').contains('Availability Management').click();
    cy.url().should('include', '/lawyer-availability');

    
    cy.get('.ant-picker-cell-inner').first().click();

    
    cy.get('.ant-modal').should('be.visible');
    cy.get('input[placeholder="HH:mm"]').first().type('09:00');
    cy.get('input[placeholder="HH:mm"]').last().type('12:00');
    cy.get('.ant-modal-footer .ant-btn-primary').click();

  
    cy.get('.ant-message').contains('Added availability').should('be.visible');
  });
});