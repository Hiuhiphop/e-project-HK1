import React from 'react';
import { Card, Row, Col } from 'antd';
import { Bar, Pie } from '@ant-design/plots';
import { mockReports } from '../utils/mockData';

const Reports = () => {
  const barConfig = {
    data: mockReports.lawyerActivity,
    xField: 'value',
    yField: 'name',
    seriesField: 'name',
    legend: { position: 'top' },
  };

  const pieConfig = {
    data: mockReports.clientEngagement,
    angleField: 'value',
    colorField: 'name',
    radius: 0.9,
    
    label: {
      type: 'outer',
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    },
  };

  return (
    <div>
      <h2>Reports and Analytics</h2>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Lawyer Activity">
            <Bar {...barConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Customer Engagement">
            <Pie {...pieConfig} />
          </Card>
        </Col>
      </Row>
      <Card title="Appointment Statistics" style={{ marginTop: 16 }}>
        <p>Total: {mockReports.appointmentStats.total}</p>
        <p>Confirmed: {mockReports.appointmentStats.confirmed}</p>
        <p>Cancelled: {mockReports.appointmentStats.cancelled}</p>
        <p>Pending: {mockReports.appointmentStats.pending}</p>
      </Card>
    </div>
  );
};

export default Reports;