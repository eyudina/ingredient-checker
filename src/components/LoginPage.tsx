import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Tooltip, message } from "antd";
import { InfoCircleTwoTone, UserOutlined } from "@ant-design/icons";
import { TUser } from "types";
import { mockUserList } from "../mocks/mocks";
import { loginFailure, loginSuccess } from "../redux/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values: TUser) => {
    const user = mockUserList.find(
      (user) => user.email === email && user.password === password
    );

    if (user?.role === "user" || user?.role === "admin") {
      dispatch(loginSuccess({ email }));
      navigate("/");
      message.success("Login successful");
    } else {
      dispatch(loginFailure({ error: "Invalid email or password" }));
      message.error("Invalid email or password");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "auto",
          minHeight: "100vh",
        }}
      >
        <Card
          title="Login"
          extra={
            <Tooltip
              title={
                <>
                  <span style={{ fontWeight: 700 }}>Credentials</span>
                  <br />
                  <span style={{ color: "#b1b5b8" }}>
                    =====================
                  </span>
                  <br />
                  <UserOutlined style={{ marginRight: 8 }} />
                  Admin
                  <br />
                  Email: {mockUserList[0].email}
                  <br />
                  Password: {mockUserList[0].password}
                  <br />
                  <span style={{ color: "#b1b5b8" }}>
                    ----------------------------
                  </span>
                  <br />
                  <UserOutlined style={{ marginRight: 8 }} />
                  User
                  <br />
                  Email: {mockUserList[1].email}
                  <br />
                  User Password: {mockUserList[1].password}
                  <br />
                  <span style={{ color: "#b1b5b8" }}>
                    ----------------------------
                  </span>
                </>
              }
            >
              <InfoCircleTwoTone
                style={{ marginLeft: 16, fontSize: 16, cursor: "pointer" }}
              />
            </Tooltip>
          }
        >
          <Form
            name="login"
            style={{ maxWidth: 600, minWidth: 420 }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            onFinishFailed={() => message.error("Form submission failed")}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter email" }]}
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter password" }]}
            >
              <Input.Password
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
