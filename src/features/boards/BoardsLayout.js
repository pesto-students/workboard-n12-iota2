import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { Layout, Breadcrumb } from "antd";
import { getBoards } from "../../store/boardActions";
import "./css/Boards.css";
import Sidebar from "./components/Sidebar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import AddNewBoard from "./components/AddNewBoard";
const { Header, Content, Footer } = Layout;
export default function BoardsLayout() {

  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  let unsub;    //Execute this to disconnect from firrebase to recieve live updates.


  useEffect(() => {
    unsub = dispatch(getBoards());
  }, []);
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
          workboard ©2022 Created by Pesto n12-iota2 Team
        </Footer>
      </Layout>
    </Layout>
  );
}
