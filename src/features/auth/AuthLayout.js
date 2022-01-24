import { Card, Col, Row } from "antd";
import React from "react";
import { Outlet } from "react-router";
import "./css/Auth.css";

export default function AuthLayout() {
  return (
    <Row>
      <Col className="auth_background" xs={0} sm={0} md={12} lg={14} xl={16}>
        <Row style={{ height: "100%" }} align="middle" justify="center">
          <Col>
            <Card className="auth_card">
              The only <br /> board <br /> you need
            </Card>
          </Col>
        </Row>
      </Col>
      <Col xs={24} sm={24} md={12} lg={10} xl={8}>
        <Outlet />
      </Col>
    </Row>
  );
}
