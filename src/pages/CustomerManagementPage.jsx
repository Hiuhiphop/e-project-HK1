import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const CustomerManagementPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/admin/customers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Giả sử API trả về mảng khách hàng trong data.data
      setCustomers(response.data.data); 
    } catch (error) {
      message.error('Không thể lấy dữ liệu khách hàng.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const columns = [
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
    { 
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* Nút để mở form cập nhật hồ sơ khách hàng */}
          <Button type="primary">Cập nhật</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản lý Khách hàng</h2>
      <Input 
        placeholder="Tìm kiếm khách hàng..." 
        prefix={<SearchOutlined />} 
        style={{ width: 300, marginBottom: 16 }} 
      />
      <Table 
        columns={columns} 
        dataSource={customers} 
        loading={loading}
        rowKey="id" 
      />
    </div>
  );
};

export default CustomerManagementPage;