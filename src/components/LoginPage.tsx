import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Switch, message } from "antd";
import { UserRole } from "types";
import { loginSuccess } from "../redux/authSlice";
import { RootState } from "redux/store";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userList } = useSelector((state: RootState) => state.auth);

  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(true);
  const [email, setEmail] = useState<string>(
    isSwitchOn
      ? userList.find((user) => user.role === UserRole.admin)?.email || ""
      : userList.find((user) => user.role === UserRole.user)?.email || ""
  );
  const [password, setPassword] = useState<string>(
    isSwitchOn
      ? userList.find((user) => user.role === UserRole.admin)?.password || ""
      : userList.find((user) => user.role === UserRole.user)?.password || ""
  );

  const handleSubmit = () => {
    const user = userList.find(
      (user) => user.email === email && user.password === password
    );

    if (user?.role && Object.values(UserRole).includes(user.role)) {
      dispatch(loginSuccess({ user }));
      navigate("/");
      message.success("Login successful");
    } else {
      message.error("Invalid email or password");
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchOn(checked);

    setEmail(
      checked
        ? userList.find((user) => user.role === UserRole.admin)?.email || ""
        : userList.find((user) => user.role === UserRole.user)?.email || ""
    );
    setPassword(
      checked
        ? userList.find((user) => user.role === UserRole.admin)?.password || ""
        : userList.find((user) => user.role === UserRole.user)?.password || ""
    );
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
            <span>
              Fill in with &nbsp;
              <Switch
                checkedChildren={UserRole.admin}
                unCheckedChildren={UserRole.user}
                onChange={handleSwitchChange}
                defaultChecked={isSwitchOn}
              ></Switch>
              &nbsp; credentials
            </span>
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
