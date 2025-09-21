import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Input, Space, Modal, Tag, message, Form, DatePicker, TimePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { mockLawyers, mockAppointments } from '../utils/mockData';
import { getLoggedInUser } from '../utils/auth';

const LawyerAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isProposeVisible, setIsProposeVisible] = useState(false);
  const [form] = Form.useForm();
  const loggedInUser = getLoggedInUser();

  const fetchAppointments = useCallback(() => {
    const currentLawyer = mockLawyers.find(l => l.name === loggedInUser?.username);
    if (currentLawyer) {
      const myAppointments = mockAppointments.filter(app => app.lawyerId === currentLawyer.id);
      setAppointments(myAppointments);
    }
  }, [loggedInUser?.username]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleAction = (id, action) => {
    const updatedAppointments = appointments.map(app =>
      app.id === id ? { ...app, status: action === 'confirm' ? 'Confirmed' : 'Canceled' } : app
    );
    setAppointments(updatedAppointments);
    message.success(`Đã ${action === 'confirm' ? 'xác nhận' : 'hủy bỏ'} cuộc hẹn!`);
    fetchAppointments();
  };

  const showDetailModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalVisible(true);
  };

  const handleProposeNewTime = (values) => {
    const newDate = values.newDate.format('YYYY-MM-DD');
    const newTime = values.newTime.format('HH:mm');
    message.success(`Đã đề xuất đổi lịch: ${newDate} ${newTime}`);
    setIsProposeVisible(false);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = mockAppointments.filter((appointment) =>
      appointment.client.toLowerCase().includes(value.toLowerCase())
    );
    setAppointments(filtered);
  };

  const getStatusTag = (status) => {
    let color = 'geekblue';
    if (status === 'Confirmed') {
      color = 'green';
    } else if (status === 'Canceled') {
      color = 'red';
    }
    return <Tag color={color}>{status}</Tag>;
  };

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Lawyer', dataIndex: 'lawyer' },
    { title: 'Client', dataIndex: 'client' },
    { title: 'Date', dataIndex: 'date' },
    { title: 'Time', dataIndex: 'time' },
    {
      title: 'Status',
      dataIndex: 'status',
      render: getStatusTag,
      filters: [
        { text: 'Pending', value: 'Pending' },
        { text: 'Confirmed', value: 'Confirmed' },
        { text: 'Canceled', value: 'Canceled' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Action',
      render: (_, record) => (
        <Space>
          <Button onClick={() => showDetailModal(record)}>Details</Button>
          <Button type="primary" onClick={() => handleAction(record.id, 'confirm')} disabled={record.status !== 'Pending'}>Confirm</Button>
          <Button danger onClick={() => handleAction(record.id, 'reject')} disabled={record.status !== 'Pending'}>Cancel</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Appointment Management</h2>
      <Input
        placeholder="Search by client"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
      />
      <Table columns={columns} dataSource={appointments} rowKey="id" pagination={{ pageSize: 10 }} />
      <Modal
        title="Appointment Details"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>Close</Button>,
          <Button key="propose" onClick={() => setIsProposeVisible(true)}>Propose New Time</Button>,
        ]}
      >
        {selectedAppointment && (
          <div>
            <p><strong>ID:</strong> {selectedAppointment.id}</p>
            <p><strong>Lawyer:</strong> {selectedAppointment.lawyer}</p>
            <p><strong>Client:</strong> {selectedAppointment.client}</p>
            <p><strong>Date:</strong> {selectedAppointment.date}</p>
            <p><strong>Time:</strong> {selectedAppointment.time}</p>
            <p><strong>Status:</strong> {selectedAppointment.status}</p>
            <p><strong>Note:</strong> {selectedAppointment.note || 'N/A'}</p>
          </div>
        )}
      </Modal>
      <Modal
        title="Propose New Time"
        open={isProposeVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsProposeVisible(false)}
      >
        <Form form={form} onFinish={handleProposeNewTime}>
          <Form.Item name="newDate" label="New Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="newTime" label="New Time" rules={[{ required: true }]}>
            <TimePicker format="HH:mm" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LawyerAppointments;