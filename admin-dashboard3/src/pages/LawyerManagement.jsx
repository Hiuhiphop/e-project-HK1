import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Modal, Form, Select, InputNumber } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { mockLawyers } from '../utils/mockData';

const LawyerManagement = () => {
  const [lawyers, setLawyers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingLawyer, setEditingLawyer] = useState(null);

  useEffect(() => {
    setLawyers(mockLawyers);
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = mockLawyers.filter((lawyer) =>
      lawyer.name.toLowerCase().includes(value.toLowerCase())
    );
    setLawyers(filtered);
  };

  const handleApprove = (id) => {
    
    setLawyers(lawyers.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
  };

  const handleReject = (id) => {
    
    setLawyers(lawyers.map(l => l.id === id ? { ...l, status: 'Rejected' } : l));
  };

  const handleDisable = (id) => {
    
    setLawyers(lawyers.map(l => l.id === id ? { ...l, status: 'Disabled' } : l));
  };

  const showEditModal = (lawyer) => {
    setEditingLawyer(lawyer);
    form.setFieldsValue(lawyer);
    setIsModalVisible(true);
  };

  const handleUpdate = (values) => {
    
    setLawyers(lawyers.map(l => l.id === editingLawyer.id ? { ...l, ...values } : l));
    setIsModalVisible(false);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', sorter: (a, b) => a.id - b.id },
    { title: 'Name', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: 'Specialty', dataIndex: 'specialty' },
    { title: 'Experience', dataIndex: 'experience' },
    { title: 'Status', dataIndex: 'status', filters: [{ text: 'Pending', value: 'Pending' }], onFilter: (value, record) => record.status === value },
    {
      title: 'Action',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleApprove(record.id)} disabled={record.status !== 'Pending'}>Approve</Button>
          <Button danger onClick={() => handleReject(record.id)} disabled={record.status !== 'Pending'}>Reject</Button>
          <Button onClick={() => showEditModal(record)}>Edit</Button>
          <Button onClick={() => handleDisable(record.id)}>Disable</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Lawyer Management</h2>
      <Input placeholder="Search lawyer" prefix={<SearchOutlined />} value={searchText} onChange={(e) => handleSearch(e.target.value)} style={{ width: 300, marginBottom: 16 }} />
      <Table columns={columns} dataSource={lawyers} rowKey="id" pagination={{ pageSize: 10 }} />

      <Modal title="Update Lawyer Profile" open={isModalVisible} onOk={() => form.submit()} onCancel={() => setIsModalVisible(false)}>
        <Form form={form} onFinish={handleUpdate}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="specialty" label="Specialty" rules={[{ required: true }]}>
            <Select options={[{ value: 'Criminal', label: 'Criminal' }, { value: 'Civil', label: 'Civil' }]} />
          </Form.Item>
          <Form.Item name="experience" label="Experience" rules={[{ required: true }]}>
            <InputNumber min={0} addonAfter="years" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LawyerManagement;