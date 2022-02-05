import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";

import "./css/Landing.css";

const { Header, Footer, Content } = Layout;

export default function LandingLayout() {
  return (
    <Layout>
      <Header style={{ background: "white" }}>
        <p className="landing-logo">workboard</p>
      </Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
