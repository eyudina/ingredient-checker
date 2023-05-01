import { useState, useEffect, useLayoutEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Grid, Layout, Menu, Avatar, Button, theme } from "antd";
import { PageHeader } from "@ant-design/pro-components";
import {
  ExperimentOutlined,
  LogoutOutlined,
  DatabaseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useCurrentUser, IsAdmin } from "./AuthUtils";
import { UserRole } from "types/types";

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
    label: "Log out",
    icon: <LogoutOutlined />,
    path: "/login",
  },
];

const AppLayout = () => {
  const screens = useBreakpoint();
  const isMobile = screens.xs;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();

  const currentUser = useCurrentUser();
  const isAdmin = IsAdmin();

  const [collapsed, setCollapsed] = useState(isMobile);
  const [showSidebar, setShowSidebar] = useState(true);
  const [pageTitle, setPageTitle] = useState("Ingredients");
  const [selectedKey, setSelectedKey] = useState("/");

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  useLayoutEffect(() => {
    switch (location.pathname) {
      case "/":
        setPageTitle("Ingredients");
        setSelectedKey("ingredients");
        setShowSidebar(true);
        break;
      case "/properties":
        setPageTitle("Properties");
        setSelectedKey("properties");
        break;
      case "/login":
        setPageTitle("");
        setSelectedKey("logout");
        setShowSidebar(false);
        break;
      default:
        setPageTitle("Ingredients");
        setSelectedKey("ingredients");
        setShowSidebar(true);
    }
  }, [location]);

  return (
    <Layout style={{ height: "auto", minHeight: "100vh" }}>
      {currentUser && showSidebar && (
        <Sider
          width="200"
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Avatar
              style={{
                backgroundColor: isAdmin ? "#fde3cf" : "#e6f4ff",
                color: isAdmin ? "#f56a00" : "#1890ff",
              }}
              size={48}
            >
              {isAdmin
                ? UserRole.admin[0].toUpperCase()
                : UserRole.user[0].toUpperCase()}
            </Avatar>
            <h3 style={{ marginTop: "10px" }}>{isAdmin ? "Admin" : "User"}</h3>
          </div>
          <Menu theme="light" selectedKeys={[selectedKey]} mode="inline">
            {currentUser &&
              items.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.path}>{item.label}</Link>
                </Menu.Item>
              ))}
          </Menu>
        </Sider>
      )}
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {currentUser && showSidebar && (
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: 16,
                  width: 64,
                  height: 64,
                }}
              />
            )}
            <Button
              type="text"
              icon={<GithubOutlined />}
              href="https://github.com/eyudina/ingredient-checker"
              target="_blank"
              style={{
                fontSize: 18,
                width: 64,
                height: 64,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Button>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 32px 0",
            position: "relative",
          }}
        >
          <PageHeader title={pageTitle} style={{ padding: 0 }} />
          <div style={{ marginTop: 16 }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
