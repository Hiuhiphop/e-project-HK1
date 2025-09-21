import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Modal, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { mockAppointments } from '../utils/mockData';

const AppointmentMonitor = () => {
 const [appointments, setAppointments] = useState([]);
 const [filteredAppointments, setFilteredAppointments] = useState([]);
 const [searchText, setSearchText] = useState('');
 const [isModalVisible, setIsModalVisible] = useState(false);
 const [selectedAppointment, setSelectedAppointment] = useState(null);

 useEffect(() => {
 setAppointments(mockAppointments);
 setFilteredAppointments(mockAppointments);
 }, []);

 const handleSearch = (value) => {
 setSearchText(value);
 const filtered = appointments.filter((appointment) =>
 appointment.lawyer.toLowerCase().includes(value.toLowerCase()) ||
 appointment.client.toLowerCase().includes(value.toLowerCase())
 );
 setFilteredAppointments(filtered);
 };

 const showDetailModal = (appointment) => {
 setSelectedAppointment(appointment);
 setIsModalVisible(true);
 };

 const getStatusTag = (status) => {
 let color = 'geekblue';
 if (status === 'Đã xác nhận') {
 color = 'green';
 } else if (status === 'Đã hủy') {
 color = 'red';
 }
 return <Tag color={color}>{status}</Tag>;
 };

 const columns = [
 { title: 'ID', dataIndex: 'id' },
 { title: 'Lawyer', dataIndex: 'lawyer', sorter: (a, b) => a.lawyer.localeCompare(b.lawyer) },
 { title: 'Client', dataIndex: 'client', sorter: (a, b) => a.client.localeCompare(b.client) },
{ title: 'Date', dataIndex: 'date', sorter: (a, b) => new Date(a.date) - new Date(b.date) },
 { title: 'Time', dataIndex: 'time' },
 {
 title: 'Status',
 dataIndex: 'status',
 render: (status) => getStatusTag(status),
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
 </Space>
 ),
},
];

 return (
<div>
<h2>Appointment Monitor</h2>
<Input
 placeholder="Search by lawyer or client"
 prefix={<SearchOutlined />}
 value={searchText}
 onChange={(e) => handleSearch(e.target.value)}
 style={{ width: 300, marginBottom: 16 }}
 />
 <Table columns={columns} dataSource={filteredAppointments} rowKey="id" pagination={{ pageSize: 10 }} />
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
 <p><strong>Client:</strong> {selectedAppointment.client}</p>
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

export default AppointmentMonitor;