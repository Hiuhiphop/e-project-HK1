import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message, Input, Modal, Form, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;

const mockAnnouncements = [
  { id: 1, title: 'Thông báo bảo trì hệ thống', content: 'Hệ thống sẽ bảo trì vào 23h ngày 26/10.', createdAt: '2025-10-25' },
  { id: 2, title: 'Chính sách mới về phí tư vấn', content: 'Áp dụng từ ngày 01/11/2025.', createdAt: '2025-10-24' },
];

const ContentManagementPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const fetchAnnouncements = () => {
    setLoading(true);
    setTimeout(() => {
      setAnnouncements(mockAnnouncements);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter(item => item.id !== id));
    message.success('Xóa thông báo thành công (giả lập)!');
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingItem) {
        // Giả lập cập nhật
        const updatedList = announcements.map(item =>
          item.id === editingItem.id ? { ...item, ...values } : item
        );
        setAnnouncements(updatedList);
        message.success('Cập nhật thông báo thành công (giả lập)!');
      } else {
        // Giả lập thêm mới
        const newItem = {
          ...values,
          id: announcements.length + 1,
          createdAt: new Date().toISOString().slice(0, 10),
        };
        setAnnouncements([...announcements, newItem]);
        message.success('Thêm thông báo thành công (giả lập)!');
      }
      setIsModalVisible(false);
    });
  };

  const columns = [
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
    { title: 'Nội dung', dataIndex: 'content', key: 'content' },
    { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Sửa</Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa không?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button icon={<DeleteOutlined />} danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản lý Thông báo/Tin tức</h2>
      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        style={{ marginBottom: 16 }} 
        onClick={handleAdd}
      >
        Thêm mới
      </Button>
      <Table 
        columns={columns} 
        dataSource={announcements} 
        loading={loading}
        rowKey="id" 
      />
      <Modal
        title={editingItem ? "Sửa Thông báo" : "Thêm Thông báo Mới"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Nội dung"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContentManagementPage;
