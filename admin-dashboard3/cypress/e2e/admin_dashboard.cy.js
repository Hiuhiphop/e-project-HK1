describe('Admin Dashboard E2E Tests', () => {
    beforeEach(() => {
      
      cy.visit('http://localhost:5173/login');
    });
 
    it('should successfully log in as admin and navigate to lawyer management page', () => {
      
      cy.get('input[placeholder="Username"]').type('admin');
      cy.get('input[placeholder="Password"]').type('password');
      cy.get('button[type="submit"]').click();
      
      
      cy.url().should('include', '/lawyers');
      cy.contains('h2', 'Lawyer Management').should('be.visible');
    });
 
    it('should navigate to other admin pages from the sidebar', () => {
      
      cy.get('input[placeholder="Username"]').type('admin');
      cy.get('input[placeholder="Password"]').type('password');
      cy.get('button[type="submit"]').click();
 
      
      cy.get('.ant-menu-item').contains('Client Management').click();
      cy.url().should('include', '/clients');
      cy.contains('h2', 'Client Management').should('be.visible');
 
      
      cy.get('.ant-menu-item').contains('Appointment Monitor').click();
      cy.url().should('include', '/appointments');
      cy.contains('h2', 'Appointment Monitor').should('be.visible');
    });
 
    it('should show an error message for incorrect login credentials', () => {
      
      cy.get('input[placeholder="Username"]').type('wrong_user');
      cy.get('input[placeholder="Password"]').type('wrong_password');
      cy.get('button[type="submit"]').click();
 
      
      cy.contains('Incorrect username or password!').should('be.visible');
      cy.url().should('not.include', '/lawyers');
    });
 
    it('should log out and redirect to login page', () => {
      
      cy.get('input[placeholder="Username"]').type('admin');
      cy.get('input[placeholder="Password"]').type('password');
      cy.get('button[type="submit"]').click();
 
      
      cy.get('button').contains('Log Out').click();
 
      
      cy.url().should('include', '/login');
      cy.contains('Please log in').should('be.visible');
    });
 });