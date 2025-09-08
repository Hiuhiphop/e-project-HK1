import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message, Select, Row, Col, Divider, TimePicker, Spin } from 'antd';
import moment from 'moment';
import axios from 'axios';

const { Title, Text } = Typography;
const { Option } = Select;

const LawyerProfilePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const fetchLawyerProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {
        message.error('Không tìm thấy thông tin người dùng.');
        return;
      }
      const response = await axios.get(`http://localhost:8000/api/lawyer/${user.id}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = response.data.data;
      form.setFieldsValue({
        ...data,
        availability: data.availability ? data.availability.map(range => [moment(range.start, 'HH:mm'), moment(range.end, 'HH:mm')]) : [],
      });
    } catch (error) {
      message.error('Không thể tải hồ sơ luật sư.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyerProfile();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {
        message.error('Không tìm thấy thông tin người dùng.');
        return;
      }
      const formattedValues = {
        ...values,
        availability: values.availability ? values.availability.map(range => ({
          start: moment(range[0]).format('HH:mm'),
          end: moment(range[1]).format('HH:mm')
        })) : [],
      };
      await axios.put(`http://localhost:8000/api/lawyer/${user.id}/profile`, formattedValues, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Cập nhật hồ sơ thành công!');
    } catch (error) {
      message.error('Cập nhật hồ sơ thất bại.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Quản lý Hồ sơ Luật sư</Title>
      <Spin spinning={loading}>
        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item name="name" label="Tên">
              <Input disabled />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input disabled />
            </Form.Item>
            
            <Divider>Thông tin chi tiết</Divider>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="specialization" label="Chuyên môn">
                  <Select placeholder="Chọn chuyên môn">
                    <Option value="Luật Dân sự">Luật Dân sự</Option>
                    <Option value="Luật Hình sự">Luật Hình sự</Option>
                    <Option value="Luật Lao động">Luật Lao động</Option>
                    <Option value="Luật Hôn nhân">Luật Hôn nhân</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="experience" label="Kinh nghiệm (năm)">
                  <Input type="number" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="bio" label="Giới thiệu bản thân">
              <Input.TextArea rows={4} />
            </Form.Item>

            <Divider>Quản lý Lịch trống</Divider>
            <Text type="secondary">Thêm các khoảng thời gian bạn có thể tư vấn (ví dụ: 10:00 - 12:00)</Text>
            <Form.Item name="availability" label="Thời gian có thể tư vấn">
              <TimePicker.RangePicker
                format="HH:mm"
                style={{ width: '100%' }}
                placeholder={['Giờ bắt đầu', 'Giờ kết thúc']}
              />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Cập nhật Hồ sơ
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    </div>
  );
};

export default LawyerProfilePage;