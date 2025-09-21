import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Select, InputNumber, message } from 'antd';
import { mockLawyers } from '../utils/mockData';
import { getLoggedInUser } from '../utils/auth';

const LawyerProfile = () => {
  const [form] = Form.useForm();
  const [lawyer, setLawyer] = useState(null);
  const loggedInUser = getLoggedInUser();

  useEffect(() => {
    console.log('LoggedInUser:', loggedInUser); // Debug
    const currentLawyer = mockLawyers.find(l => l.name === loggedInUser?.username);
    console.log('Found Lawyer:', currentLawyer); // Debug
    if (currentLawyer) {
      setLawyer(currentLawyer);
      form.setFieldsValue(currentLawyer);
    } else {
      message.error('No lawyer data found for the logged-in user.');
      setLawyer(null);
    }
  }, [loggedInUser, form]);

  const onFinish = async (values) => {
    try {
      console.log('Form values:', values); // Debug
      if (!lawyer || !lawyer.id) {
        throw new Error('Lawyer ID not found');
      }
      const updatedLawyers = mockLawyers.map(l =>
        l.id === lawyer.id ? { ...l, ...values } : l
      );
      const updatedLawyer = updatedLawyers.find(l => l.id === lawyer.id);
      console.log('Updated Lawyer:', updatedLawyer); // Debug
      setLawyer(updatedLawyer);
      message.success('Update lawyer profile successfully!', 10); // Hiển thị 10 giây
    } catch (error) {
      console.error('Update error:', error.message); // Debug lỗi
      message.error('Update failed! Please try again.', 10); // Hiển thị 10 giây
    }
  };

  if (!lawyer) {
    return <div style={{ padding: '20px' }}>No lawyer data found. Please check login.</div>;
  }

  return (
    <Card title="Update Lawyer Profile" style={{ width: '100%' }}>
      <Form
        form={form} // Đảm bảo có form={form}
        name="lawyer_profile"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="specialty"
          label="Specialty"
          rules={[{ required: true, message: 'Please select your specialty!' }]}
        >
          <Select>
            <Select.Option value="Criminal">Criminal</Select.Option>
            <Select.Option value="Civil">Civil</Select.Option>
            <Select.Option value="Family">Family</Select.Option>
            <Select.Option value="Labor">Labor</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="experience"
          label="Experience (years)"
          rules={[{ required: true, message: 'Please enter your years of experience!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LawyerProfile;