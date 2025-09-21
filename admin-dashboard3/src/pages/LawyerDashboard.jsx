

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Space } from 'antd';
import { mockAppointments, mockLawyers } from '../utils/mockData';
import { getLoggedInUser } from '../utils/auth';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const { Title } = Typography;

const LawyerDashboard = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const [personalInfo, setPersonalInfo] = useState(null);
  const loggedInUser = getLoggedInUser();

  
  useEffect(() => {
    const currentLawyer = mockLawyers.find(l => l.name === loggedInUser?.username);
    
    if (currentLawyer) {
      setPersonalInfo(currentLawyer);
      const myAppointments = mockAppointments.filter(app => app.lawyerId === currentLawyer.id);
      
      const confirmedCount = myAppointments.filter(app => app.status === 'Confirmed').length;
      const pendingCount = myAppointments.filter(app => app.status === 'Pending').length;
      const cancelledCount = myAppointments.filter(app => app.status === 'Cancelled').length;
      
      setAppointmentData([
        { name: 'Confirmed', value: confirmedCount },
        { name: 'Pending', value: pendingCount },
        { name: 'Cancelled', value: cancelledCount },
      ]);
    }
  }, [loggedInUser?.username]); 

  const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Lawyer Dashboard</Title>
      
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Title level={4}>Appointment Status Statistics</Title>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={appointmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {appointmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        
        <Col span={8}>
          <Card>
            <Title level={4}>Personal Information</Title>
            {personalInfo && (
              <Space direction="vertical" style={{ width: '100%' }}>
                <p><strong>Name:</strong> {personalInfo.name}</p>
                <p><strong>Specialty:</strong> {personalInfo.specialty}</p>
                <p><strong>Experience:</strong> {personalInfo.experience}</p>
                <p><strong>Status:</strong> {personalInfo.status}</p>
              </Space>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LawyerDashboard;