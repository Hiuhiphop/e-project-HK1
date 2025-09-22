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

    cy.get('.ant-message').contains('Successfully confirmed the appointment!').should('be.visible');
     
  });

  // Thay thế đoạn code trong test case của bạn
// ...
// ...
it('should successfully add new availability', () => {
    cy.log('Test: Add New Availability');
    
    // Đăng nhập lại để đảm bảo bài kiểm thử độc lập
    cy.get('input[placeholder="Username"]').type('John Doe');
    cy.get('input[placeholder="Password"]').type('password'); 
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/lawyer-dashboard');

    // Chuyển đến trang quản lý thời gian rảnh
    cy.get('.ant-menu-item').contains('Availability Management').click();
    cy.url().should('include', '/lawyer-availability');

    // Chọn ô ngày đầu tiên không bị vô hiệu hóa trên lịch
    cy.get('.ant-picker-cell:not(.ant-picker-cell-disabled)').first().click();
    
    // Sử dụng .within() để tương tác với các thành phần trong modal
    cy.get('.ant-modal').within(() => {
        // SỬA LỖI Ở ĐÂY: Dùng bộ chọn chính xác hơn cho trường nhập liệu
        // Tìm element có class .ant-picker-input và placeholder="HH:mm"
        cy.get('.ant-picker-input').contains('input', {force: true}).eq(0).should('be.visible').click();
    });

    // Bảng chọn giờ hiện ra bên ngoài modal, nên chúng ta không dùng .within() nữa
    cy.get('.ant-picker-panel-container').should('be.visible').within(() => {
        // Chọn giờ và phút cho thời gian bắt đầu (09:00)
        cy.get('.ant-picker-time-panel-column ul').eq(0).find('li').contains('09').click();
        cy.get('.ant-picker-time-panel-column ul').eq(1).find('li').contains('00').click();
    });
    // Nhấn OK để đóng bảng chọn giờ
    cy.get('.ant-picker-ok').click();
    
    // Tiếp tục với trường giờ kết thúc
    cy.get('.ant-modal').within(() => {
        // SỬA LỖI Ở ĐÂY: Dùng bộ chọn chính xác hơn
        cy.get('.ant-picker-input').contains('input', {force: true}).eq(1).should('be.visible').click();
    });
    
    // Bảng chọn giờ hiện ra lần nữa
    cy.get('.ant-picker-panel-container').should('be.visible').within(() => {
        // Chọn giờ và phút cho thời gian kết thúc (12:00)
        cy.get('.ant-picker-time-panel-column ul').eq(0).find('li').contains('12').click();
        cy.get('.ant-picker-time-panel-column ul').eq(1).find('li').contains('00').click();
    });
    cy.get('.ant-picker-ok').click();
    
    // Nhấn nút thêm giờ làm trong footer của modal
    cy.get('.ant-modal-footer .ant-btn-primary').click();

    // Xác nhận thông báo thành công
    cy.get('.ant-message').contains('Added availability').should('be.visible');
});
});