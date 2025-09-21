

import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { login, isLawyer, isAdmin } from '../utils/auth';

const Login = () => {
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();

 const onFinish = (values) => {
 setLoading(true);
 const success = login(values.username, values.password);
 setLoading(false);
 if (success) {
 message.success('Login successful!');
 
  if (isAdmin()) {
 navigate('/lawyers');
 } else if (isLawyer()) {
 navigate('/lawyer-dashboard');
 } else {
 navigate('/login'); 
 }
 } else {
 message.error('Invalid username or password!');
 }
 };

return (
 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
 <Form name="login" onFinish={onFinish} style={{ width: 300 }}>
 <Form.Item name="username" rules={[{ required: true, message: 'Please enter your username!' }]}>
 <Input prefix={<UserOutlined />} placeholder="Username" />
 </Form.Item>
 <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
 <Input.Password prefix={<LockOutlined />} placeholder="Password" />
 </Form.Item>
 <Form.Item>
 <Button type="primary" htmlType="submit" loading={loading} block>
 Login
 </Button>
 </Form.Item>
 </Form>
 </div>
 );
};

export default Login;