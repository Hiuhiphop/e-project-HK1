import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Statistic, message } from 'antd';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, Sector
} from 'recharts';
import { UserOutlined, ClockCircleOutlined, SolutionOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

const ReportPage = () => {
  const [lawyerData, setLawyerData] = useState([]);
  const [engagementData, setEngagementData] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalLawyers, setTotalLawyers] = useState(0);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/admin/reports', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const { lawyerStats, engagementStats, totalAppointments, totalLawyers } = response.data;
      
      setLawyerData(lawyerStats);
      setEngagementData(engagementStats);
      setTotalAppointments(totalAppointments);
      setTotalLawyers(totalLawyers);

    } catch (error) {
      message.error('Không thể tải dữ liệu báo cáo.');
      console.error('Lỗi khi tải dữ liệu báo cáo:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  return (
    <div>
      <Title level={2}>Báo cáo & Thống kê</Title>
      
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Tổng số Cuộc hẹn"
              value={totalAppointments}
              valueStyle={{ color: '#3f8600' }}
              prefix={<SolutionOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Tổng số Luật sư"
              value={totalLawyers}
              valueStyle={{ color: '#cf1322' }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Cuộc hẹn trung bình/tháng"
              value={totalAppointments > 0 ? (totalAppointments / 1).toFixed(1) : 0}
              precision={2}
              valueStyle={{ color: '#008c8c' }}
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