import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Modal, Form, Select, InputNumber } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { mockClients } from '../utils/mockData';

const ClientManagement = () => {
 const [clients, setClients] = useState([]);
 const [searchText, setSearchText] = useState('');
const [isModalVisible, setIsModalVisible] = useState(false);
 const [form] = Form.useForm();
 const [editingClient, setEditingClient] = useState(null);

 useEffect(() => {
 setClients(mockClients);
 }, []);

 const handleSearch = (value) => {
 setSearchText(value);
 const filtered = mockClients.filter((client) =>
 client.name.toLowerCase().includes(value.toLowerCase())
 );
 setClients(filtered);
};

 const handleDisable = (id) => {
 
 setClients(clients.map(c => c.id === id ? { ...c, status: 'Inactive' } : c));
 };

 const showEditModal = (client) => {
 setEditingClient(client);
 form.setFieldsValue(client);
 setIsModalVisible(true);
 };

 const handleUpdate = (values) => {
 
setClients(clients.map(c => c.id === editingClient.id ? { ...c, ...values } : c));
 setIsModalVisible(false);
 };

const columns = [
{ title: 'ID', dataIndex: 'id', sorter: (a, b) => a.id - b.id },
 { title: 'Name', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
{ title: 'Email', dataIndex: 'email' },
 { 
 title: 'Status', 
 dataIndex: 'status', 
 filters: [
 { text: 'Active', value: 'Active' }, 
 { text: 'Inactive', value: 'Inactive' } 
 ], 
 onFilter: (value, record) => record.status === value 
 },
 {
 title: 'Action',
render: (_, record) => (
 <Space>
 <Button onClick={() => showEditModal(record)}>Update</Button>
 <Button onClick={() => handleDisable(record.id)} disabled={record.status === 'Inactive'}>
 Disable
 </Button>
 </Space>
),
 },
];

 return (
<div>
 <h2>Client Management</h2>
<Input placeholder="Search clients" prefix={<SearchOutlined />} value={searchText} onChange={(e) => handleSearch(e.target.value)} style={{ width: 300, marginBottom: 16 }} />
 <Table columns={columns} dataSource={clients} rowKey="id" pagination={{ pageSize: 10 }} />

<Modal title="Update Client Profile" open={isModalVisible} onOk={() => form.submit()} onCancel={() => setIsModalVisible(false)}>
 <Form form={form} onFinish={handleUpdate}>
<Form.Item name="name" label="Name" rules={[{ required: true }]}>
 <Input />
 </Form.Item>
 <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
 <Input />
 </Form.Item>
 <Form.Item name="status" label="Status" rules={[{ required: true }]}>
 <Select options={[{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }]} />
 </Form.Item>
 </Form>
 </Modal>
</div>
 );
};

export default ClientManagement;