import React, { useState, useEffect } from 'react';
import { Table, message, Tag, Space, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const AppointmentMonitoringPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Bạn chưa đăng nhập.');
        return;
      }
      const response = await axios.get('http://localhost:8000/api/admin/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(response.data.data); // Thay dữ liệu giả lập bằng dữ liệu thực
    } catch (error) {
      message.error('Không thể lấy dữ liệu cuộc hẹn.');
      console.error('Lỗi khi tải dữ liệu cuộc hẹn:', error);
    } finally {
      setLoading(false);
    }
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
        style={{ marginBottom: 16, width: 300 }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Table
        columns={columns}
        dataSource={appointments.filter(item => 
          item.user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.lawyer.name.toLowerCase().includes(searchText.toLowerCase())
        )}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default AppointmentMonitoringPage;