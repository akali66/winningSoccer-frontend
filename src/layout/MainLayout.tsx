import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import {
  TrophyOutlined,
  TeamOutlined,
  ScheduleOutlined,
  PushpinOutlined,
  PushpinFilled,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [pinned, setPinned] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "/matches",
      icon: <ScheduleOutlined />,
      label: "比赛数据",
    },
    {
      key: "/teams",
      icon: <TeamOutlined />,
      label: "球队数据",
    },
    {
      key: "/leagues",
      icon: <TrophyOutlined />,
      label: "联赛数据",
    },
  ];

  // Determine selected key based on current path
  const selectedKey =
    menuItems.find((item) => location.pathname.startsWith(item.key))?.key ||
    "/matches";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)", zIndex: 10 }}
        onMouseLeave={() => !pinned && setCollapsed(true)}
        onMouseEnter={() => !pinned && setCollapsed(false)}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <div
              className="demo-logo-vertical"
              style={{
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: "bold",
                color: "#1677ff",
              }}
            >
              {collapsed ? (
                <img src={logo} alt="logo" style={{ height: 40 }} />
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img src={logo} alt="logo" style={{ height: 40 }} />
                  <span style={{ whiteSpace: "nowrap" }}>致胜竟彩</span>
                </div>
              )}
            </div>
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[selectedKey]}
              items={menuItems}
              onClick={({ key }) => navigate(key)}
              style={{ flex: 1, borderRight: 0 }}
            />
          </div>
          <div
            style={{
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderTop: "1px solid rgba(5, 5, 5, 0.06)",
              fontSize: "16px",
              color: pinned ? "#1677ff" : "inherit",
            }}
            onClick={() => setPinned(!pinned)}
          >
            {pinned ? <PushpinFilled /> : <PushpinOutlined />}
          </div>
        </div>
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
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            borderRadius: borderRadiusLG,
            overflow: "auto",
            position: "relative",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
