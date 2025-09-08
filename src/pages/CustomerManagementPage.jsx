import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message, Input, Modal, Form } from 'antd';
import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const CustomerManagementPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Bạn chưa đăng nhập.');
        return;
      }
      const response = await axios.get('http://localhost:8000/api/admin/customers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCustomers(response.data.data);
      setFilteredCustomers(response.data.data); // Ban đầu, danh sách lọc bằng danh sách gốc
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

  useEffect(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(lowercasedSearchText) ||
      customer.email.toLowerCase().includes(lowercasedSearchText)
    );
    setFilteredCustomers(filtered);
  }, [searchText, customers]);

  const handleEdit = (record) => {
    setEditingCustomer(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const token = localStorage.getItem('token');
      
      await axios.put(`http://localhost:8000/api/admin/customers/${editingCustomer.id}`, values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Cập nhật khách hàng thành công!');
      setIsModalVisible(false);
      fetchCustomers();
    } catch (error) {
      message.error('Cập nhật khách hàng thất bại.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCustomer(null);
  };

  const columns = [
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
    { 
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Cập nhật
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản lý Khách hàng</h2>
      <Input
        placeholder="Tìm kiếm theo tên hoặc email..."
        prefix={<SearchOutlined />}
        style={{ marginBottom: 16, width: 300 }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Table 
        columns={columns} 
        dataSource={filteredCustomers} 
        loading={loading}
        rowKey="id"
      />
      <Modal
        title="Cập nhật thông tin khách hàng"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="customer_update_form">
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerManagementPage;