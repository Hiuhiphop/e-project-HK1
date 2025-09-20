import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Select, InputNumber, message } from 'antd';
import { mockLawyers } from '../utils/mockData';
import { getLoggedInUser } from '../utils/auth';

const LawyerProfile = () => {
  const [form] = Form.useForm();
  const [lawyer, setLawyer] = useState(null);
  const loggedInUser = getLoggedInUser();

  useEffect(() => {
    
    const currentLawyer = mockLawyers.find(l => l.name === loggedInUser?.username);
    if (currentLawyer) {
      setLawyer(currentLawyer);
      form.setFieldsValue(currentLawyer);
    } else {
      message.error('No lawyer data found for the logged-in user.');
    }
  }, [loggedInUser, form]);

  const onFinish = (values) => {
    
    console.log('Update lawyer profile:', values);
    const updatedLawyers = mockLawyers.map(l =>
      l.id === lawyer.id ? { ...l, ...values } : l
    );
    
    setLawyer(updatedLawyers.find(l => l.id === lawyer.id));
    message.success('Update lawyer profile successfully!');
  };

  if (!lawyer) {
    return <div>No lawyer data found.</div>;
  }

  return (
    <Card title="Update Lawyer Profile" style={{ width: '100%' }}>
      <Form
        form={form}
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