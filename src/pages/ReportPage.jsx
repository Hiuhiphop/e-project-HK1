import React from 'react';
import { Card, Col, Row, Typography, Statistic, message } from 'antd';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, Sector
} from 'recharts';
import { UserOutlined, ClockCircleOutlined, SolutionOutlined } from '@ant-design/icons';

const { Title } = Typography;

// Dữ liệu giả lập
const lawyerData = [
  { name: 'Luật sư A', 'Số cuộc hẹn': 15, 'Đánh giá': 4.8 },
  { name: 'Luật sư B', 'Số cuộc hẹn': 12, 'Đánh giá': 4.5 },
  { name: 'Luật sư C', 'Số cuộc hẹn': 10, 'Đánh giá': 4.9 },
  { name: 'Luật sư D', 'Số cuộc hẹn': 8, 'Đánh giá': 4.2 },
  { name: 'Luật sư E', 'Số cuộc hẹn': 5, 'Đánh giá': 4.1 },
];

const engagementData = [
  { name: 'Đã xác nhận', value: 300 },
  { name: 'Chờ xử lý', value: 150 },
  { name: 'Đã hủy', value: 50 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const ReportPage = () => {
  return (
    <div>
      <Title level={2}>Báo cáo & Phân tích</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng số Luật sư"
              value={55}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng số Khách hàng"
              value={1200}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng số Cuộc hẹn"
              value={480}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Hoạt động Luật sư (Số cuộc hẹn)">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={lawyerData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Số cuộc hẹn" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Mức độ tương tác Khách hàng">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ReportPage;
