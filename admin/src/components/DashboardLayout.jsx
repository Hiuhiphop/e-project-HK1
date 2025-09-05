import React from 'react';
import { Layout, Menu, theme, message } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
import { 
  UserOutlined, 
  TeamOutlined, 
  ProfileOutlined, 
  LogoutOutlined, 
  BarChartOutlined, 
  SolutionOutlined 
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const DashboardLayout = () => {
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
          <Menu.Item key="1" icon={<UserOutlined />} onClick={() => navigate('/dashboard/lawyers')}>
            Quản lý Luật sư
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />} onClick={() => navigate('/dashboard/customers')}>
            Quản lý Khách hàng
          </Menu.Item>
          <Menu.Item key="3" icon={<ProfileOutlined />} onClick={() => navigate('/dashboard/appointments')}>
            Giám sát Cuộc hẹn
          </Menu.Item>
          <Menu.Item key="4" icon={<SolutionOutlined />} onClick={() => navigate('/dashboard/announcements')}>
            Quản lý Nội dung
          </Menu.Item>
          <Menu.Item key="5" icon={<BarChartOutlined />} onClick={() => navigate('/dashboard/reports')}>
            Báo cáo & Phân tích
          </Menu.Item>
          <Menu.Item key="6" icon={<LogoutOutlined />} onClick={handleLogout}>
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

export default DashboardLayout;
