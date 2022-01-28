import React, { useState } from "react";
import { Outlet } from "react-router";
import { Layout, Breadcrumb } from "antd";
import "./css/Boards.css";
import Sidebar from "./components/Sidebar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;

export default function BoardsLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {collapsed ? (
            <MenuUnfoldOutlined className="trigger" onClick={toggleSidebar} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={toggleSidebar} />
          )}
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Boards</Breadcrumb.Item>
            <Breadcrumb.Item>All Boards</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          workboard ©2022 Created by Syed Vali
        </Footer>
      </Layout>
    </Layout>
  );
}
