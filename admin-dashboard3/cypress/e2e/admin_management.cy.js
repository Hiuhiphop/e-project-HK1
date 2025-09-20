describe('Admin Management E2E Tests', () => {
    beforeEach(() => {
        // Log in with admin account before each test
        cy.visit('http://localhost:5173/login');
        cy.get('input[placeholder="Username"]').type('admin');
        cy.get('input[placeholder="Password"]').type('password');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/lawyers');
    });

    it('should successfully add, edit, and disable a new lawyer', () => {
        // 1. Add a new lawyer
        cy.log('Adding new lawyer');
        cy.get('.ant-menu-item').contains('Lawyer Management').click();
        cy.contains('h2', 'Lawyer Management').should('be.visible');

        cy.get('.ant-btn').contains('Add Lawyer').click();
        cy.get('.ant-modal-title').should('contain', 'Add New Lawyer');
        
        cy.get('#basic_name').type('Phan Van F');
        cy.get('#basic_specialty').click();
        cy.get('.ant-select-item-option-content').contains('Marriage').click();
        cy.get('#basic_experience').type('1');
        
        cy.get('.ant-modal-footer .ant-btn-primary').click();
        cy.contains('Lawyer added successfully!').should('be.visible');
        cy.get('.ant-table-row').should('contain', 'Phan Van F');

        // 2. Edit the newly added lawyer's information
        cy.log('Editing lawyer information');
        cy.get('.ant-table-row').contains('Phan Van F').parents('tr').find('.ant-btn').contains('Update').click();
        cy.get('.ant-modal-title').should('contain', 'Update Lawyer Profile');

        cy.get('#basic_name').clear().type('Phan Van G');
        cy.get('#basic_experience').clear().type('2');

        cy.get('.ant-modal-footer .ant-btn-primary').click();
        cy.contains('Update successful!').should('be.visible');
        cy.get('.ant-table-row').should('contain', 'Phan Van G');
        cy.get('.ant-table-row').should('not.contain', 'Phan Van F');

        // 3. Disable the edited lawyer
        cy.log('Disabling lawyer');
        cy.get('.ant-table-row').contains('Phan Van G').parents('tr').find('.ant-btn').contains('Disable').click();
        cy.get('.ant-table-row').contains('Phan Van G').parents('tr').find('.ant-tag').should('contain', 'Inactive');
    });

    it('should successfully add, edit, and disable a new client', () => {
        // 1. Add a new client
        cy.log('Adding new client');
        cy.get('.ant-menu-item').contains('Client Management').click();
        cy.contains('h2', 'Client Management').should('be.visible');

        cy.get('.ant-btn').contains('Add Client').click();
        cy.get('.ant-modal-title').should('contain', 'Add New Client');

        cy.get('#basic_name').type('Vu Van K');
        cy.get('#basic_email').type('vu.van.k@example.com');
        cy.get('#basic_phone').type('0123456789');

        cy.get('.ant-modal-footer .ant-btn-primary').click();
        cy.contains('Client added successfully!').should('be.visible');
        cy.get('.ant-table-row').should('contain', 'Vu Van K');

        // 2. Edit the newly added client's information
        cy.log('Editing client information');
        cy.get('.ant-table-row').contains('Vu Van K').parents('tr').find('.ant-btn').contains('Update').click();
        cy.get('.ant-modal-title').should('contain', 'Update Client Profile');

        cy.get('#basic_phone').clear().type('0987654321');

        cy.get('.ant-modal-footer .ant-btn-primary').click();
        cy.contains('Update successful!').should('be.visible');
        cy.get('.ant-table-row').contains('Vu Van K').parents('tr').should('contain', '0987654321');
    
        // 3. Disable the client
        cy.log('Disabling client');
        cy.get('.ant-table-row').contains('Vu Van K').parents('tr').find('.ant-btn').contains('Disable').click();
        cy.get('.ant-table-row').contains('Vu Van K').parents('tr').find('.ant-tag').should('contain', 'Inactive');
    });

    it('should successfully create, edit, and delete a new notification', () => {
        // 1. Create a new notification
        cy.log('Creating new notification');
        cy.get('.ant-menu-item').contains('Content Management').click();
        cy.contains('h2', 'Notification/News Management').should('be.visible');

        cy.get('.ant-btn').contains('Create New').click();
        cy.get('.ant-modal-title').should('contain', 'Create/Edit Notification');

        cy.get('#basic_title').type('Important Notice');
        cy.get('#basic_content').type('The system will be under maintenance at 11 PM on Sep 20th.');
        
        cy.get('.ant-modal-footer .ant-btn-primary').click();
        cy.get('.ant-table-row').should('contain', 'Important Notice');

        // 2. Edit the newly created notification
        cy.log('Editing notification');
        cy.get('.ant-table-row').contains('Important Notice').parents('tr').find('.ant-btn').contains('Edit').click();
        cy.get('.ant-modal-title').should('contain', 'Create/Edit Notification');

        cy.get('#basic_title').clear().type('EXTREMELY Important Notice');
        
        cy.get('.ant-modal-footer .ant-btn-primary').click();
        cy.get('.ant-table-row').should('contain', 'EXTREMELY Important Notice');
        cy.get('.ant-table-row').should('not.contain', 'Important Notice');

        // 3. Delete the notification
        cy.log('Deleting notification');
        cy.get('.ant-table-row').contains('EXTREMELY Important Notice').parents('tr').find('.ant-btn').contains('Delete').click();
        cy.get('.ant-table-row').should('not.contain', 'EXTREMELY Important Notice');
    });
});