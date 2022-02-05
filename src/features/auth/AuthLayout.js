import { Card, Col, Row } from "antd";
import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, useNavigate } from "react-router";
import "./css/Auth.css";

export default function AuthLayout() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && user) {
      navigate("/boards", { replace: true });
    }
  }, [user, loading]);
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
