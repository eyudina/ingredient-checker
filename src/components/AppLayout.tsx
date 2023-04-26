import { useState, useLayoutEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Layout, Menu, Avatar, Divider } from "antd";
import {
  ExperimentOutlined,
  UserOutlined,
  LogoutOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

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
    path: "properties",
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
  const [pageTitle, setPageTitle] = useState("Ingredients");
  const [selectedKey, setSelectedKey] = useState("ingredients");
  const location = useLocation();

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
    <Layout style={{ height: "100vh" }}>
      <Sider width="200" theme="light">
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
        <Content style={{ margin: "24px 16px 0" }}>
          <h1>{pageTitle}</h1>
          <Divider />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
