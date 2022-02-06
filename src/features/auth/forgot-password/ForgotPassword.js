import { Col, Row, Form, Input, Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../../store/authActions";
import "../css/Auth.css";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [, setEmail] = useState("");
  const forgotPass = (info) => {
    dispatch(forgotPassword(info.email));
    // console.log("Bhooooolllllaaaa");
  };
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
              name="forgot-pass"
              onFinish={forgotPass}
              onFinishFailed={onError}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input recovery email!",
                    type: "email",
                  },
                ]}
              >
                <Input
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                    Forgot Password
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
