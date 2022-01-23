import { Col, Row } from "antd";
import React from "react";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <Row>
      <Col span={12}></Col>
      <Col span={12}>
        <Outlet />
      </Col>
    </Row>
  );
}
