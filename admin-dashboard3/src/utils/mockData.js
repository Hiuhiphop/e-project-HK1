export const mockLawyers = [
  { id: 1, name: 'Nguyễn Văn A', specialty: 'Hình sự', experience: '5 năm', status: 'Chờ duyệt' },
  { id: 2, name: 'Trần Thị B', specialty: 'Dân sự', experience: '8 năm', status: 'Đã duyệt' },
  { id: 3, name: 'Lê Văn C', specialty: 'Lao động', experience: '3 năm', status: 'Đã hủy' },
];

export const mockClients = [
  { id: 1, name: 'Lê Văn C', email: 'levanc@example.com', status: 'Active', phone: '0123456789' },
  { id: 2, name: 'Phạm Thị D', email: 'phamthi@example.com', status: 'Inactive', phone: '0987654321' },
  { id: 3, name: 'Hoàng Văn E', email: 'hoangvan@example.com', status: 'Active', phone: '0111222333' },
  { id: 4, name: 'Nguyễn Thị F', email: 'nguyenthif@example.com', status: 'Pending', phone: '0444555666' },
];

export const mockAppointments = [
  { id: 1, lawyerId: 1, lawyer: 'Nguyễn Văn A', clientId: 1, client: 'Lê Văn C', status: 'Chờ duyệt', date: '2025-09-20' },
  { id: 2, lawyerId: 2, lawyer: 'Trần Thị B', clientId: 2, client: 'Phạm Thị D', status: 'Đã xác nhận', date: '2025-09-21' },
  { id: 3, lawyerId: 1, lawyer: 'Nguyễn Văn A', clientId: 3, client: 'Hoàng Văn E', status: 'Đã hủy', date: '2025-09-22' },
  { id: 4, lawyerId: 2, lawyer: 'Trần Thị B', clientId: 4, client: 'Nguyễn Thị F', status: 'Đã xác nhận', date: '2025-09-23' },
];

export const mockNotifications = [
  { id: 1, title: 'Thông báo mới', content: 'Hệ thống sẽ bảo trì vào 23h đêm nay' },
  { id: 2, title: 'Tin tức quan trọng', content: 'Dự thảo luật mới về...'},
];

export const mockReports = {
  lawyerActivity: [
    { name: 'Nguyễn Văn A', value: 50 },
    { name: 'Trần Thị B', value: 80 },
    { name: 'Lê Văn C', value: 30 },
  ],
  clientEngagement: [
    { name: 'Khách hàng mới', value: 120 },
    { name: 'Khách hàng cũ', value: 250 },
  ],
  // Đã thêm đối tượng này để giải quyết lỗi
  appointmentStats: {
    total: 4,
    confirmed: 2,
    cancelled: 1,
    pending: 1,
  },
};