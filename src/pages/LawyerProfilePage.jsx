import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message, Select, Row, Col, Divider, TimePicker } from 'antd';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;

const LawyerProfilePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const mockLawyerData = {
    name: 'Trần Văn A',
    email: 'trana@example.com',
    specialization: 'Luật Dân sự',
    experience: 5,
    bio: 'Chuyên gia tư vấn về các vấn đề dân sự, hôn nhân gia đình và thừa kế.',
    availability: ['10:00-12:00', '14:00-16:00'],
  };

  useEffect(() => {
    // Giả lập lấy dữ liệu từ API và điền vào form
    setLoading(true);
    setTimeout(() => {
      form.setFieldsValue(mockLawyerData);
      setLoading(false);
    }, 1000);
  }, [form]);

  const onFinish = (values) => {
    setLoading(true);
    // Giả lập gửi dữ liệu cập nhật
    setTimeout(() => {
      message.success('Cập nhật hồ sơ thành công!');
      setLoading(false);
      console.log('Dữ liệu đã gửi:', values);
    }, 1000);
  };

  return (
    <Card>
      <Title level={3}>Quản lý Hồ sơ Luật sư</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={mockLawyerData}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="name" label="Họ và Tên">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="email" label="Email">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
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
  );
};

export default LawyerProfilePage;
