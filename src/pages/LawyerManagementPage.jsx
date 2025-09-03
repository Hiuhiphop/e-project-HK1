import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const LawyerManagementPage = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLawyers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/admin/lawyers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLawyers(response.data.data); // Giả sử API trả về { data: [...] }
    } catch (error) {
      message.error('Không thể lấy dữ liệu luật sư.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/admin/lawyers/${id}/status`, 
        { status }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success('Cập nhật trạng thái thành công!');
      fetchLawyers(); // Tải lại danh sách
    } catch (error) {
      message.error('Cập nhật trạng thái thất bại.');
      console.error(error);
    }
  };

  const columns = [
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Chuyên môn', dataIndex: 'specialization', key: 'specialization' },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => <Tag color={status === 'active' ? 'green' : 'red'}>{status.toUpperCase()}</Tag>
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Chi tiết</Button>
          {record.status === 'pending' && (
            <Button onClick={() => handleUpdateStatus(record.id, 'approved')}>Duyệt</Button>
          )}
          {record.status === 'approved' && (
            <Button onClick={() => handleUpdateStatus(record.id, 'inactive')}>Vô hiệu hóa</Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản lý Luật sư</h2>
      <Input 
        placeholder="Tìm kiếm luật sư..." 
        prefix={<SearchOutlined />} 
        style={{ width: 300, marginBottom: 16 }} 
      />
      <Table 
        columns={columns} 
        dataSource={lawyers} 
        loading={loading}
        rowKey="id" 
      />
    </div>
  );
};

export default LawyerManagementPage;