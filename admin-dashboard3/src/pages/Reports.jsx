import React, { useMemo } from 'react';
import { Card, Row, Col } from 'antd';
import { Bar, Pie } from '@ant-design/plots';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
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

  const radarData = useMemo(() => mockReports.lawyerActivity, []);

  return (
    <div>
      <h2>Reports and Analytics</h2>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Lawyer Activity (Bar)">
            <Bar {...barConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Customer Engagement (Pie)">
            <Pie {...pieConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Lawyer Activity (Radar)">
            <RadarChart width={500} height={300} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <Radar name="Activity" dataKey="value" stroke="#1a3c34" fill="#1a3c34" fillOpacity={0.6} />
            </RadarChart>
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