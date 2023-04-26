import { useState, useEffect, useLayoutEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Grid, Layout, Menu, Avatar, Button, theme } from "antd";
import {
  ExperimentOutlined,
  UserOutlined,
  LogoutOutlined,
  DatabaseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { PageHeader } from "@ant-design/pro-components";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const items = [
  {
    key: "ingredients",
    type: "item",
    label: "Ingredients",
    icon: <ExperimentOutlined />,
    path: "/",
  },
  {
    key: "properties",
    type: "item",
    label: "Properties",
    icon: <DatabaseOutlined />,
    path: "/properties",
  },
  {
    key: "logout",
    type: "item",
    label: "Logout",
    icon: <LogoutOutlined />,
    path: "/logout",
  },
];

export const AppLayout = () => {
  const screens = useBreakpoint();
  const isMobile = screens.xs;

  const [collapsed, setCollapsed] = useState(isMobile);
  const [pageTitle, setPageTitle] = useState("Ingredients");
  const [selectedKey, setSelectedKey] = useState("/");
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  useLayoutEffect(() => {
    switch (location.pathname) {
      case "/":
        setPageTitle("Ingredients");
        setSelectedKey("ingredients");
        break;
      case "/properties":
        setPageTitle("Properties");
        setSelectedKey("properties");
        break;
      case "/logout":
        setPageTitle("Logout");
        setSelectedKey("logout");
        break;
      default:
        setPageTitle("Ingredients");
        setSelectedKey("ingredients");
    }
  }, [location]);

  return (
    <Layout style={{ height: "auto", minHeight: "100vh" }}>
      <Sider
        width="200"
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Avatar size={48} icon={<UserOutlined />} />
          <h3 style={{ marginTop: "10px" }}>Admin</h3>
        </div>
        <Menu theme="light" selectedKeys={[selectedKey]} mode="inline">
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content style={{ margin: "16px 16px 0" }}>
          <PageHeader ghost={true} title={pageTitle} style={{ padding: 0 }} />
          <div style={{ marginTop: 16 }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
