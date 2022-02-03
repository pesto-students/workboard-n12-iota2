import { Layout, Menu } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router";
import SearchBoard from "./components/SearchBoard";
import "./css/Board.css";

const { Header, Content } = Layout;

export default function SelectedBoardLayout() {
  const boardId = useLocation().pathname.split('/')[2];
  const getStateBoard = useSelector((state) => state.boards.boards.find((board) => board.id === boardId));
  return (
    <Layout
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
      }}
      className="site-layout"
    >
      <Header className="site-layout-background">
        <Menu
          theme="light"
          mode="horizontal"
          style={{
            display: "block",
            background: "transparent",
            borderBottom: "none",
          }}
        >
          <Menu.Item disabled style={{ cursor: "pointer" }}>
            <div>
              <p className="selected_board_logo">workboard</p>
            </div>
          </Menu.Item>
          <Menu.Item disabled style={{ cursor: "initial" }}>
            <div>
              <h3 style={{ margin: 0 }}>{getStateBoard?.name}</h3>
            </div>
          </Menu.Item>
          <Menu.Item disabled style={{ float: "right" }}>
            <SearchBoard />
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <div className="content-layout">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
