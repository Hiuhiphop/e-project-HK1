describe('Admin Dashboard E2E Tests', () => {
  beforeEach(() => {
    
    cy.visit('http://localhost:5174/login');
  });

  it('should successfully log in as an admin', () => {
    cy.log('Test: Successful Admin Login');
    
    
    cy.get('input[placeholder="Username"]').type('admin');
    cy.get('input[placeholder="Password"]').type('password'); 
    cy.get('button[type="submit"]').click();

    
    cy.url().should('include', '/lawyers');
    
    
    cy.get('h2').should('be.visible');
  });

  it('should show an error message for incorrect login credentials', () => {
    cy.log('Test: Incorrect Login Credentials');
    
    
    cy.get('input[placeholder="Username"]').type('wrong_user');
    cy.get('input[placeholder="Password"]').type('wrong_password');
    cy.get('button[type="submit"]').click();

    
    cy.get('.ant-message').should('be.visible').and('contain.text', 'Invalid username or password!');

    
    cy.url().should('not.include', '/lawyers');
  });
});