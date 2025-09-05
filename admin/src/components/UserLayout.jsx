import React from 'react';
import { Layout, Menu, theme, message } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
import { 
  SolutionOutlined, 
  CalendarOutlined, 
  UserOutlined, 
  LogoutOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const UserLayout = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    message.success('Đã đăng xuất.');
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<SolutionOutlined />} onClick={() => navigate('/lawyer/profile')}>
            Quản lý Hồ sơ
          </Menu.Item>
          <Menu.Item key="2" icon={<CalendarOutlined />} onClick={() => navigate('/lawyer/appointments')}>
            Quản lý Cuộc hẹn
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />} onClick={() => navigate('/lawyer/dashboard')}>
            Dashboard Luật sư
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleLogout}>
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
