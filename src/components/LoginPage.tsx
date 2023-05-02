import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Form, Input, Button, Switch, message } from "antd";
import { UserRole } from "types/types";
import { loginSuccess } from "../redux/authSlice";
import { RootState } from "redux/store";

const { useBreakpoint } = Grid;

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const screens = useBreakpoint();
  const isMobile = screens.xs;

  // Get the list of users from the Redux store
  const { userList } = useSelector((state: RootState) => state.auth);

  const adminUser = userList.find((user) => user.role === UserRole.admin);

  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(true);
  const [credentials, setCredentials] = useState({
    email: adminUser?.email || "",
    password: adminUser?.password || "",
  });

  // Switch between admin and user credentials
  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchOn(checked);
    const userRole = checked ? UserRole.admin : UserRole.user;
    // Finds the first user with the selected role in the store and sets the email and password
    const user = userList.find((user) => user.role === userRole);
    setCredentials({
      email: user?.email || "",
      password: user?.password || "",
    });
  };

  const handleSubmit = () => {
    const user = userList.find(
      (user) =>
        user.email === credentials.email &&
        user.password === credentials.password
    );
    // If the user exists and has a valid role, dispatch the loginSuccess action
    // UserRole is an enum, so we can check if the user has a valid role by checking if the role is included in the UserRole enum
    if (user?.role && Object.values(UserRole).includes(user.role)) {
      dispatch(loginSuccess({ user }));
      navigate("/");
      message.success("Login successful");
    } else {
      message.error("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        title="Login"
        style={{ minWidth: isMobile ? "100%" : 420 }}
        extra={
          <span style={{ marginLeft: 8, whiteSpace: "nowrap" }}>
            Fill in with &nbsp;
            <Switch
              checkedChildren={UserRole.admin}
              unCheckedChildren={UserRole.user}
              onChange={handleSwitchChange}
              defaultChecked={isSwitchOn}
              style={{
                backgroundColor: isSwitchOn ? "#f56a00" : "#1890ff",
              }}
            ></Switch>
            &nbsp; credentials
          </span>
        }
      >
        <Form
          name="login"
          style={{ maxWidth: 600 }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          onFinishFailed={() => message.error("Form submission failed")}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input
              type="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
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
  );
};

export default LoginPage;
