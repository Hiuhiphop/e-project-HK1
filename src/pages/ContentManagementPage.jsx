import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message, Input, Modal, Form, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;

const ContentManagementPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/admin/announcements', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnnouncements(response.data.data);
    } catch (error) {
      message.error('Không thể tải dữ liệu thông báo.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/admin/announcements/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Xóa thông báo thành công!');
      fetchAnnouncements(); // Tải lại danh sách
    } catch (error) {
      message.error('Không thể xóa thông báo.');
      console.error(error);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const token = localStorage.getItem('token');
      if (editingItem) {
        // Cập nhật thông báo hiện có
        await axios.put(`http://localhost:8000/api/admin/announcements/${editingItem.id}`, values, {
          headers: { Authorization: `Bearer ${token}` }
        });
        message.success('Cập nhật thông báo thành công!');
      } else {
        // Thêm thông báo mới
        await axios.post('http://localhost:8000/api/admin/announcements', values, {
          headers: { Authorization: `Bearer ${token}` }
        });
        message.success('Thêm thông báo mới thành công!');
      }
      setIsModalVisible(false);
      fetchAnnouncements(); // Tải lại danh sách
    } catch (error) {
      message.error('Thực hiện thất bại. Vui lòng thử lại.');
      console.error(error);
    } finally {
      setLoading(false);
    }
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