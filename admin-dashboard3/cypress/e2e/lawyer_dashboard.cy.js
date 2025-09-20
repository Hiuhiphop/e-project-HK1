describe('Lawyer Dashboard E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174/login');
    cy.get('input[placeholder="Username"]').type('John Doe');
    cy.get('input[placeholder="Password"]').type('MatKhauMoi2025!');
    cy.get('button[type="submit"]').click();
    cy.get('.ant-layout').should('be.visible', { timeout: 10000 });
  });

  it('updates lawyer profile', () => {
  cy.get('.ant-menu-item').contains('Personal Profile').click();
  cy.get('.ant-card').should('be.visible', { timeout: 10000 });
  cy.get('.ant-card-head-title').contains('Update Lawyer Profile').should('be.visible', { timeout: 10000 });
  cy.get('.ant-form-item-label').contains('Name').parent().find('.ant-input').clear()
  cy.get('.ant-form-item-label').contains('Name').parent().find('.ant-input').type('John Smith');
  cy.get('.ant-btn-primary').click();
  cy.screenshot('after_submit'); 
  cy.get('.ant-message').contains('Update lawyer profile successfully!', { timeout: 10000 }).should('be.visible');
});

  it('confirms appointment', () => {
    cy.get('.ant-menu-item').contains('Appointment Management').click();
    cy.get('.ant-table').should('be.visible', { timeout: 10000 });
    cy.get('.ant-table-row').contains('Pending').parents('.ant-table-row').find('button').contains('Confirm').click();
    cy.get('.ant-message').contains('Đã xác nhận cuộc hẹn!', { timeout: 10000 }).should('be.visible');
  });

  it('adds availability', () => {
    cy.get('.ant-menu-item').contains('Availability Management').click();
    cy.get('.ant-picker-cell-inner').contains('21').click({ timeout: 10000 });
    cy.get('.ant-modal').should('be.visible');
    cy.get('input[placeholder="HH:mm"]').first().type('09:00');
    cy.get('input[placeholder="HH:mm"]').last().type('12:00');
    cy.get('.ant-btn-primary').click();
    cy.get('.ant-message').contains('Added availability', { timeout: 10000 }).should('be.visible');
  });

  it('proposes new appointment time', () => {
    cy.get('.ant-menu-item').contains('Appointment Management').click();
    cy.get('.ant-table').should('be.visible', { timeout: 10000 });
    cy.get('.ant-table-row').first().find('button').contains('Details').click();
    cy.get('.ant-modal').contains('Propose New Time').click();
    cy.get('.ant-picker-input > input').first().type('2025-09-22', { force: true });
    cy.get('.ant-picker-input > input').last().type('14:00', { force: true });
    cy.get('.ant-btn-primary').click();
    cy.get('.ant-message').contains('Đã đề xuất đổi lịch', { timeout: 10000 }).should('be.visible');
  });
});