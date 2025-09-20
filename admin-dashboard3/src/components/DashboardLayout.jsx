import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { LogoutOutlined, HomeOutlined, UserOutlined, CalendarOutlined, FileTextOutlined, LineChartOutlined } from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';
import { logout, isAdmin, isLawyer } from '../utils/auth';

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
 const navigate = useNavigate();

 const adminMenuItems = [
 { key: '/lawyers', icon: <UserOutlined />, label: 'Lawyer Management' },
 { key: '/clients', icon: <UserOutlined />, label: 'Client Management' },
{ key: '/appointments', icon: <CalendarOutlined />, label: 'Appointment Monitor' },
 { key: '/content', icon: <FileTextOutlined />, label: 'Content Management' },
{ key: '/reports', icon: <LineChartOutlined />, label: 'Reports & Analytics' },
 ];

const lawyerMenuItems = [
 { key: '/lawyer-dashboard', icon: <HomeOutlined />, label: 'Dashboard' },
 { key: '/lawyer-appointments', icon: <CalendarOutlined />, label: 'Appointment Management' },
 { key: '/lawyer-profile', icon: <UserOutlined />, label: 'Personal Profile' },
 ];

 const menuItems = isAdmin() ? adminMenuItems : (isLawyer() ? lawyerMenuItems : []);

 return (
<Layout style={{ minHeight: '100vh' }}>
 <Sider width={200} theme="dark">
 <div style={{ padding: '16px', color: 'white', fontSize: '18px' }}>
 {isAdmin() ? 'Admin Dashboard' : 'Lawyer Dashboard'}
 </div>
 <Menu
 theme="dark"
 mode="inline"
 defaultSelectedKeys={[window.location.pathname]}
 items={menuItems}
 onClick={({ key }) => navigate(key)}
 />
 </Sider>
 <Layout>
 <Header style={{ background: '#fff', padding: '0 16px', display: 'flex', justifyContent: 'flex-end' }}>
 <Button type="primary" danger onClick={() => {
 logout();
 navigate('/login');
 }} icon={<LogoutOutlined />}>Log Out</Button>
 </Header>
 <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
 <Outlet />
 </Content>
 </Layout>
 </Layout>
 );
};

export default DashboardLayout;