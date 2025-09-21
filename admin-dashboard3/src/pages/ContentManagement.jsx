import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space } from 'antd';
import { mockNotifications } from '../utils/mockData';

const ContentManagement = () => {
 const [notifications, setNotifications] = useState([]);
 const [isModalVisible, setIsModalVisible] = useState(false);
 const [form] = Form.useForm();
 const [editingNotification, setEditingNotification] = useState(null);

 useEffect(() => {
 setNotifications(mockNotifications);
 }, []);

 const showModal = (notification = null) => {
 setEditingNotification(notification);
 form.setFieldsValue(notification || {});
 setIsModalVisible(true);
 };

 const handleSubmit = (values) => {
 if (editingNotification) {
 setNotifications(notifications.map(n => n.id === editingNotification.id ? { ...n, ...values } : n));
 } else {
 setNotifications([...notifications, { id: notifications.length + 1, ...values }]);
 }
 setIsModalVisible(false);
 };

 const handleDelete = (id) => {
setNotifications(notifications.filter(n => n.id !== id));
 };

 const columns = [
 { title: 'ID', dataIndex: 'id' },
 { title: 'Title', dataIndex: 'title' },
 { title: 'Content', dataIndex: 'content' },
 {
 title: 'Action',
 render: (_, record) => (
 <Space>
 <Button onClick={() => showModal(record)}>Edit</Button>
 <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
 </Space>
 ),
 },
 ];

 return (
 <div>
 <h2>Content Management</h2>
 <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>Create New</Button>
 <Table columns={columns} dataSource={notifications} rowKey="id" />

 <Modal
 title="Create/Edit Notification"
 open={isModalVisible}
 onOk={() => form.submit()}
 onCancel={() => setIsModalVisible(false)}
>
 <Form form={form} onFinish={handleSubmit}>
 <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title!' }]}>
 <Input />
 </Form.Item>
 <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Please enter content!' }]}>
 <Input.TextArea rows={4} />
 </Form.Item>
 </Form>
 </Modal>
 </div>
 );
};

export default ContentManagement;