import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Modal, Tag, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { mockLawyers, mockAppointments } from '../utils/mockData';
import { getLoggedInUser } from '../utils/auth';

const LawyerAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const loggedInUser = getLoggedInUser();

  const fetchAppointments = () => {
    const currentLawyer = mockLawyers.find(l => l.name === loggedInUser?.username);
    if (currentLawyer) {
      const myAppointments = mockAppointments.filter(app => app.lawyerId === currentLawyer.id);
      setAppointments(myAppointments);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [loggedInUser]); 

  const handleAction = (id, action) => {
    const updatedAppointments = appointments.map(app =>
      app.id === id ? { ...app, status: action === 'confirm' ? 'Confirmed' : 'Canceled' } : app
    );
    setAppointments(updatedAppointments);
    message.success(`Successfully ${action === 'confirm' ? 'confirmed' : 'canceled'} the appointment!`);
  };

  const showDetailModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalVisible(true);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const myAppointments = mockAppointments.filter(app => app.lawyerId === mockLawyers.find(l => l.name === loggedInUser?.username).id);
    const filtered = myAppointments.filter((appointment) =>
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
    { title: ' Customer', dataIndex: 'client', sorter: (a, b) => a.client.localeCompare(b.client) },
    { title: 'Date', dataIndex: 'date' },
    { title: 'Status', dataIndex: 'status', render: (status) => getStatusTag(status),
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
        footer={[<Button key="close" onClick={() => setIsModalVisible(false)}>Close</Button>]}
      >
        {selectedAppointment && (
          <div>
            <p><strong>ID:</strong> {selectedAppointment.id}</p>
            <p><strong>Lawyer:</strong> {selectedAppointment.lawyer}</p>
            <p><strong>Customer:</strong> {selectedAppointment.client}</p>
            <p><strong>Date:</strong> {selectedAppointment.date}</p>
            <p><strong>Time:</strong> {selectedAppointment.time}</p>
            <p><strong>Status:</strong> {selectedAppointment.status}</p>
            <p><strong>Note:</strong> {selectedAppointment.note}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LawyerAppointments;