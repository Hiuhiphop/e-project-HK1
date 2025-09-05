import React, { useState, useEffect } from 'react';
import { Table, message, Tag, Space, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const mockAppointments = [
  { 
    id: 1, 
    user: { id: 101, name: 'Nguyễn Văn A' }, 
    lawyer: { id: 201, name: 'Trần Thị B' }, 
    appointment_date: '2025-10-26 10:00', 
    status: 'pending', 
    notes: 'Tư vấn về luật dân sự' 
  },
  { 
    id: 2, 
    user: { id: 102, name: 'Phạm Thị C' }, 
    lawyer: { id: 202, name: 'Lê Văn D' }, 
    appointment_date: '2025-10-27 14:30', 
    status: 'confirmed', 
    notes: 'Thủ tục ly hôn' 
  },
  { 
    id: 3, 
    user: { id: 103, name: 'Vũ Văn E' }, 
    lawyer: { id: 201, name: 'Trần Thị B' }, 
    appointment_date: '2025-10-28 09:00', 
    status: 'canceled', 
    notes: 'Không đến được' 
  },
];

const AppointmentMonitoringPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = () => {
    setLoading(true);
    // Giả lập thời gian chờ của API
    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
      message.success('Đã tải dữ liệu cuộc hẹn (giả lập).');
    }, 1000);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'blue';
      case 'confirmed': return 'green';
      case 'canceled': return 'red';
      default: return 'default';
    }
  };

  const columns = [
    { title: 'Khách hàng', dataIndex: ['user', 'name'], key: 'customerName' },
    { title: 'Luật sư', dataIndex: ['lawyer', 'name'], key: 'lawyerName' },
    { title: 'Thời gian', dataIndex: 'appointment_date', key: 'date' },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      key: 'status', 
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    { title: 'Ghi chú', dataIndex: 'notes', key: 'notes' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button>Xem chi tiết</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Giám sát Cuộc hẹn</h2>
      <Input 
        placeholder="Tìm kiếm cuộc hẹn..." 
        prefix={<SearchOutlined />} 
        style={{ width: 300, marginBottom: 16 }} 
      />
      <Table 
        columns={columns} 
        dataSource={appointments} 
        loading={loading}
        rowKey="id" 
      />
    </div>
  );
};

export default AppointmentMonitoringPage;
