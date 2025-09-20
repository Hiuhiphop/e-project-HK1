describe('Lawyer Dashboard E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[placeholder="Username"]').type('John Doe');
    cy.get('input[placeholder="Password"]').type('MatKhauMoi2025!');
    cy.get('button[type="submit"]').click();
  });

  it('updates lawyer profile', () => {
    cy.get('.ant-menu-item').contains('Personal Profile').click();
    cy.get('.ant-card').should('be.visible');
    cy.get('.ant-input').first().clear()
    cy.get('.ant-input').first().type('John Smith');
    cy.get('button[type="submit"]').click();
    cy.contains('Update lawyer profile successfully!').should('be.visible');
  });

  it('confirms appointment', () => {
    cy.get('.ant-menu-item').contains('Appointment Management').click();
    cy.get('.ant-table-row').contains('Pending').parents('tr').find('button').contains('Confirm').click();
    cy.contains('Đã xác nhận cuộc hẹn!').should('be.visible');
  });

  it('adds availability', () => {
    cy.get('.ant-menu-item').contains('Availability Management').click();
    cy.get('.ant-calendar-date').contains('21').click();
    cy.get('.ant-modal').should('be.visible');
    cy.get('input[placeholder="HH:mm"]').first().type('09:00');
    cy.get('input[placeholder="HH:mm"]').last().type('12:00');
    cy.get('button[type="submit"]').click();
    cy.contains('Added availability').should('be.visible');
  });

  it('proposes new appointment time', () => {
    cy.get('.ant-menu-item').contains('Appointment Management').click();
    cy.get('.ant-table-row').first().find('button').contains('Details').click();
    cy.get('.ant-modal').contains('Propose New Time').click();
    cy.get('.ant-picker').first().type('2025-09-22');
    cy.get('.ant-picker').last().type('14:00');
    cy.get('button[type="submit"]').click();
    cy.contains('Đã đề xuất đổi lịch').should('be.visible');
  });
});