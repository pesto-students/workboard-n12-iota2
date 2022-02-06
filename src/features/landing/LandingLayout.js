import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Layout, Row, Typography } from "antd";

import "./css/Landing.css";

import hero1 from "../../assets/hero1.png";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

export default function LandingLayout() {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header style={{ background: "white" }}>
        <p className="landing-logo">
          workboard{" "}
          <Link className="landing-link" to="/auth">
            Login
          </Link>
          <Link className="landing-link" to="/auth">
            Signup
          </Link>
        </p>
      </Header>
      <Content
        style={{ background: "white", minHeight: "calc(100vh - 134px)" }}
      >
        <Row style={{ flexFlow: "wrap-reverse" }} align="middle">
          <Col xs={24} sm={24} md={12}>
            <Title
              style={{
                margin: "0 auto",
                width: "fit-content",
              }}
            >
              For people who love <br /> organized progress
              <Title
                style={{
                  color: "#7e7e7e",
                  padding: "20px 0",
                  fontWeight: "lighter",
                }}
                level={4}
              >
                Project management simplified
              </Title>
              <button className="hero-button" onClick={() => navigate("/auth")}>
                Get started
              </button>
            </Title>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <img
              style={{ padding: 20, maxWidth: "100vw" }}
              src={hero1}
              alt="hero_img"
            />
          </Col>
        </Row>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
