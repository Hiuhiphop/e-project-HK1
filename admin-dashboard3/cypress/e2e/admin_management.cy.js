describe('Admin Dashboard - Lawyer Management', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174/login');
    cy.get('input[placeholder="Username"]').type('admin');
    cy.get('input[placeholder="Password"]').type('password'); 
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/lawyers');
    cy.get('h2').contains('Lawyer Management').should('be.visible');
    
    
    cy.get('.ant-table-thead th').should('have.length.gt', 0);
  });

  it('should successfully add a new lawyer', () => {
    cy.log('Test: Adding new lawyer');
    
    cy.contains('button', 'To add a lawyer').click();
    
    cy.get('.ant-modal-content').within(() => {
        cy.get('input[id="name"]').type('New Lawyer Name');
        
        cy.get('input[id="specialty"]').click();
    });
    
    
    cy.get('.ant-select-dropdown').should('be.visible');
    
    
    cy.get('.ant-select-dropdown').contains('Civil').click();

    cy.get('.ant-modal-content').within(() => {
        
        cy.get('input[id="experience"]').type('5', { force: true });
         
        cy.contains('button', 'OK').click();
    });
    
    cy.contains('Successfully added lawyer!', { timeout: 15000 }).should('be.visible');
  });
});