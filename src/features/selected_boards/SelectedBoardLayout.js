import { Input, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Outlet } from "react-router";
import { ArrowLeftOutlined } from "@ant-design/icons";
import SearchBoard from "./components/SearchBoard";
import "./css/Board.css";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const { Header, Content } = Layout;

export default function SelectedBoardLayout() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState("");
  const getStateBoard = useSelector((state) =>
    state.boards.boards.find((board) => board.id === boardId)
  );
  const updateBoardName = () => {};
  useEffect(() => {
    setBoardName(getStateBoard?.name);
  }, [getStateBoard?.name]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, loading]);

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
              <ArrowLeftOutlined
                onClick={() => navigate("/boards", { replace: true })}
              />
            </div>
          </Menu.Item>
          <Menu.Item disabled style={{ cursor: "pointer" }}>
            <div>
              <p className="selected_board_logo">workboard</p>
            </div>
          </Menu.Item>
          <Menu.Item disabled style={{ cursor: "initial" }}>
            <div>
              <Input
                value={boardName}
                bordered={false}
                style={{ fontSize: "1.2em", fontWeight: 600 }}
                onPressEnter={() => updateBoardName()}
                onChange={(e) => setBoardName(e.target.value)}
              />
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
