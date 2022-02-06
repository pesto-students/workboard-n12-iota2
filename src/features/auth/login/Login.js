import { Col, Row, Form, Input, Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../store/authActions";
import "../css/Auth.css";
import GoogleLogo from "../../../assets/google.png";
import FacebookLogo from "../../../assets/facebook.png";

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const login = () => {
    dispatch(loginAction(email, pass));
  };
  const onError = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const testlogin = () => {
    dispatch(loginAction("mekep65629@mxclip.com", "123456789"));
  };
  return (
    <Row style={{ minHeight: "100vh" }} justify="center">
      <Col span={22}>
        <Row justify="center">
          <Col className="auth_logo" span={24}>
            workboard
          </Col>
          <Col span={24}>
            <Form
              name="login"
              onFinish={login}
              onFinishFailed={onError}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input correct email!",
                    type: "email",
                  },
                ]}
              >
                <Input
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  onChange={(e) => setPass(e.target.value)}
                />
              </Form.Item>

              <Row
                style={{ paddingBottom: "20px", fontSize: "1.1em" }}
                justify="end"
              >
                <Link to="/auth/forgot-password">Forgot password?</Link>
              </Row>

              <Row justify="space-between">
                <h3
                  style={{
                    fontWeight: 400,
                    marginLeft: 10,
                    marginBottom: 0,
                    fontSize: "1.3em",
                  }}
                >
                  <Link to="/auth/signup">Signup</Link>
                </h3>
                <Button
                  className="primary_button"
                  type="primary"
                  onClick={() => testlogin()}
                >
                  Test Login
                </Button>
                <Form.Item style={{ float: "right" }}>
                  <Button
                    className="primary_button"
                    type="primary"
                    htmlType="submit"
                  >
                    Login
                  </Button>
                </Form.Item>
              </Row>

              <Row gutter={[20, 20]} justify="center">
                <Col>Or signin using</Col>
                <Col span={24}>
                  <Row gutter={[20, 20]} justify="center">
                    <Col>
                      <img
                        style={{ cursor: "pointer" }}
                        width="45px"
                        src={GoogleLogo}
                        alt="google_logo"
                      />
                    </Col>
                    <Col>
                      <img
                        width="45px"
                        style={{ cursor: "pointer" }}
                        src={FacebookLogo}
                        alt="facebook_logo"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
