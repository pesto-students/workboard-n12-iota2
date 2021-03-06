/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Layout, Breadcrumb } from "antd";
import { getBoards } from "../../store/boardActions";
import { useAuthState } from "react-firebase-hooks/auth";
import "./css/Boards.css";
import Sidebar from "./components/Sidebar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { getAuth } from "firebase/auth";
import { getTeamMembers } from "../../store/teamActions";
// import AddNewBoard from "./components/AddNewBoard";
const { Header, Content, Footer } = Layout;
export default function BoardsLayout() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    if (user) {
      console.log("connection established with boards collection");
      const unsub = dispatch(getBoards());
      return () => {
        console.log("connection broken with boards collection");
        unsub();
      };
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", { replace: true });
    }
    if (user) {
      dispatch(getTeamMembers());
    }
  }, [user, loading]);

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
          workboard ??2022 Created by Pesto n12-iota2 Team
        </Footer>
      </Layout>
    </Layout>
  );
}
