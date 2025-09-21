// File: src/utils/mockData.js

export const mockLawyers = [
  { id: 1, name: 'John Doe', username: 'John Doe', specialty: 'Criminal', experience: 'Five years', status: 'Approved' },
  { id: 2, name: 'Jane Smith', specialty: 'Civil', experience: 'Eight years', status: 'Approved' },
  { id: 3, name: 'Peter Jones', specialty: 'Labor', experience: 'Three years', status: 'Pending' },
];

export const mockClients = [
  { id: 1, name: 'Mike Johnson', email: 'mikej@example.com', status: 'Active', phone: '0123456789' },
  { id: 2, name: 'Emily Davis', email: 'emilyd@example.com', status: 'Inactive', phone: '0987654321' },
  { id: 3, name: 'Chris Evans', email: 'chrise@example.com', status: 'Active', phone: '0111222333' },
  { id: 4, name: 'Sarah Miller', email: 'sarahm@example.com', status: 'Pending', phone: '0444555666' },
];

export const mockAppointments = [
  { id: 1, lawyerId: 1, lawyer: 'John Doe', clientId: 1, client: 'Mike Johnson', status: 'Pending', date: '2025-09-20', time: '10:00 AM', note: 'Initial consultation' },
  { id: 2, lawyerId: 2, lawyer: 'Jane Smith', clientId: 2, client: 'Emily Davis', status: 'Confirmed', date: '2025-09-21', time: '02:30 PM', note: 'Follow-up' },
  { id: 3, lawyerId: 1, lawyer: 'John Doe', clientId: 3, client: 'Chris Evans', status: 'Cancelled', date: '2025-09-22', time: '09:00 AM', note: 'Rescheduled' },
  { id: 4, lawyerId: 2, lawyer: 'Jane Smith', clientId: 4, client: 'Sarah Miller', status: 'Confirmed', date: '2025-09-23', time: '11:15 AM', note: 'New client' },
];

export const mockNotifications = [
  { id: 1, title: 'New Notification', content: 'The system will be under maintenance at 11 PM tonight' },
  { id: 2, title: 'Important News', content: 'Draft law on...' },
];

export const mockReports = {
  lawyerActivity: [
    { name: 'John Doe', value: 50 },
    { name: 'Jane Smith', value: 80 },
    { name: 'Peter Jones', value: 30 },
  ],
  clientEngagement: [
    { name: 'New Clients', value: 120 },
    { name: 'Returning Clients', value: 250 },
  ],
  appointmentStats: {
    total: 4,
    confirmed: 2,
    cancelled: 1,
    pending: 1,
  },
};