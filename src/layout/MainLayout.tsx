import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
  TrophyOutlined,
  TeamOutlined,
  ScheduleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/matches',
      icon: <ScheduleOutlined />,
      label: '比赛数据',
    },
    {
      key: '/teams',
      icon: <TeamOutlined />,
      label: '球队数据',
    },
    {
      key: '/leagues',
      icon: <TrophyOutlined />,
      label: '联赛数据',
    },
  ];

  // Determine selected key based on current path
  const selectedKey = menuItems.find(item => location.pathname.startsWith(item.key))?.key || '/matches';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 10 }}>
        <div className="demo-logo-vertical" style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 'bold', color: '#1677ff' }}>
          {collapsed ? '胜' : '致胜竟彩'}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              padding: '0 24px',
              fontSize: '18px',
              cursor: 'pointer',
              transition: 'color 0.3s',
            }}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <div style={{ fontSize: '16px', fontWeight: 500 }}>
            足球数据管理系统
          </div>
        </Header> */}
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            borderRadius: borderRadiusLG,
            overflow: 'auto',
            position: 'relative',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
