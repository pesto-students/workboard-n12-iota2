import { Col, Row, Form, Input, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "../css/Auth.css";
import GoogleLogo from "../../../assets/google.png";
import FacebookLogo from "../../../assets/facebook.png";

export default function Signup() {
  const signup = () => {};
  const onError = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
              onFinish={signup}
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
                <Input placeholder="Email address" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Confirm password" />
              </Form.Item>

              <Row justify="space-between">
                <h3
                  style={{
                    fontWeight: 400,
                    marginLeft: 10,
                    marginBottom: 0,
                    fontSize: "1.3em",
                  }}
                >
                  <Link to="/auth">Login</Link>
                </h3>
                <Form.Item style={{ float: "right" }}>
                  <Button
                    className="primary_button"
                    type="primary"
                    htmlType="submit"
                  >
                    Signup
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
