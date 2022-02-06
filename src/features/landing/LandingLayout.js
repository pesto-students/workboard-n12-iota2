import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Layout, Row, Typography } from "antd";

import "./css/Landing.css";

import hero1 from "../../assets/hero1.png";
import hero2 from "../../assets/hero2.png";
import hero3 from "../../assets/hero3.png";

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
          <Link className="landing-link" to="/auth/signup">
            Signup
          </Link>
        </p>
      </Header>
      <Content
        style={{ background: "white", minHeight: "calc(100vh - 134px)" }}
      >
        <Row
          gutter={[20, 20]}
          style={{ flexFlow: "wrap-reverse" }}
          align="middle"
        >
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
        <Row
          gutter={[20, 20]}
          // style={{ flexFlow: "wrap-reverse" }}
          align="middle"
        >
          <Col xs={24} sm={24} md={12}>
            <img
              style={{ padding: 20, maxWidth: "100vw", float: "right" }}
              src={hero2}
              alt="hero_img2"
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Title
              style={{
                margin: "0 auto",
                width: "fit-content",
              }}
            >
              Collaboration within <br /> team made easier
              <Title
                style={{
                  color: "#7e7e7e",
                  padding: "20px 0",
                  fontWeight: "lighter",
                }}
                level={4}
              >
                Delegate tasks easily among the <br /> team members for fast and
                organized <br /> development
              </Title>
            </Title>
          </Col>
        </Row>
        <Row
          gutter={[20, 20]}
          style={{ flexFlow: "wrap-reverse" }}
          align="middle"
        >
          <Col xs={24} sm={24} md={12}>
            <Title
              style={{
                margin: "0 auto",
                width: "fit-content",
              }}
            >
              Break big tasks in <br /> smaller parts
              <Title
                style={{
                  color: "#7e7e7e",
                  padding: "20px 0",
                  fontWeight: "lighter",
                }}
                level={4}
              >
                Divide development work in small <br /> manageable stories with
                priority and <br /> multiple development stages to avoid <br />
                procastination and track story progress
              </Title>
            </Title>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <img
              style={{ padding: 20, maxWidth: "100vw" }}
              src={hero3}
              alt="hero_img3"
            />
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        workboard ©2022 Created by Pesto n12-iota2 Team
      </Footer>
    </Layout>
  );
}
