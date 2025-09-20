import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Space, Typography } from 'antd';
import { Pie } from '@ant-design/plots';
import { mockLawyers, mockAppointments } from '../utils/mockData';
import { getLoggedInUser } from '../utils/auth';

const { Title } = Typography;

const LawyerDashboard = () => {
  const [lawyerData, setLawyerData] = useState(null);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const loggedInUser = getLoggedInUser();

  useEffect(() => {
   
    const currentLawyer = mockLawyers.find(l => l.name === loggedInUser?.username);
    const myAppointments = mockAppointments.filter(app => app.lawyerId === currentLawyer?.id);

    if (currentLawyer) {
      setLawyerData(currentLawyer);
      setAppointmentsData(myAppointments);
    }
  }, [loggedInUser]);

  const appointmentStatusData = appointmentsData.reduce((acc, curr) => {
    const status = curr.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(appointmentStatusData).map(key => ({
    type: key,
    value: appointmentStatusData[key],
  }));

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v) => `${v} Appointments`,
      },
    },
    label: {
      type: 'outer',
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        
        formatter: () => `Total\n${appointmentsData.length}`,
      },
    },
  };

  if (!lawyerData) {
    return <div>No lawyer data found.</div>;
  }

  return (
    <div>
      <Title level={2}>Lawyer Dashboard</Title>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Confirmed Appointments" bordered={false}>
            <Title level={3}>{appointmentStatusData['Confirmed'] || 0}</Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Pending Appointments" bordered={false}>
            <Title level={3}>{appointmentStatusData['Pending'] || 0}</Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Total Customers" bordered={false}>
            <Title level={3}>{new Set(appointmentsData.map(a => a.clientId)).size}</Title>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Appointment Status Statistics" bordered={false}>
            <Pie {...pieConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Personal Information" bordered={false}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <p><strong>Name:</strong> {lawyerData.name}</p>
              <p><strong>Specialty:</strong> {lawyerData.specialty}</p>
              <p><strong>Experience:</strong> {lawyerData.experience}</p>
              <p><strong>Status:</strong> {lawyerData.status}</p>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LawyerDashboard;