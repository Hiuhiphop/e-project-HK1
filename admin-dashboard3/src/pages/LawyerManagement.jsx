import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Modal, Form, Select, InputNumber, message } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { mockLawyers } from '../utils/mockData';

const LawyerManagement = () => {
  const [lawyers, setLawyers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
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
    setIsEditModalVisible(true);
  };

  const handleUpdate = (values) => {
    setLawyers(lawyers.map(l => l.id === editingLawyer.id ? { ...l, ...values } : l));
    setIsEditModalVisible(false);
    message.success('Successfully updated lawyer information!');
  };

  const handleAddLawyer = (values) => {
    const newLawyer = {
      id: lawyers.length + 1,
      ...values,
      status: 'Pending',
    };
    setLawyers([...lawyers, newLawyer]);
    setIsAddModalVisible(false);
    form.resetFields();
    message.success('Successfully added new lawyer!');
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
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Input placeholder="Search lawyer" prefix={<SearchOutlined />} value={searchText} onChange={(e) => handleSearch(e.target.value)} style={{ width: 300 }} />
        <Button type="primary" icon={<UserAddOutlined />} onClick={() => setIsAddModalVisible(true)}>
          Add Lawyer
        </Button>
      </div>
      <Table columns={columns} dataSource={lawyers} rowKey="id" pagination={{ pageSize: 10 }} />

      <Modal title="Update Lawyer Profile" open={isEditModalVisible} onOk={() => form.submit()} onCancel={() => setIsEditModalVisible(false)}>
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

      <Modal title="Add New Lawyer" open={isAddModalVisible} onOk={() => form.submit()} onCancel={() => setIsAddModalVisible(false)}>
        <Form form={form} onFinish={handleAddLawyer}>
          <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please enter name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="specialty" label="Specialty" rules={[{ required: true, message: 'Please select specialty!' }]}>
            <Select options={[{ value: 'Criminal', label: 'Criminal' }, { value: 'Civil', label: 'Civil' }]} />
          </Form.Item>
          <Form.Item name="experience" label="Experience" rules={[{ required: true, message: 'Please enter years of experience!' }]}>
            <InputNumber min={0} addonAfter="years" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LawyerManagement;  