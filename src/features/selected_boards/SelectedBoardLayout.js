import { Avatar, Dropdown, Input, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Outlet } from "react-router";
import {
  LeftCircleOutlined,
  UserOutlined,
  LogoutOutlined,
  LayoutOutlined,
} from "@ant-design/icons";
import SearchBoard from "./components/SearchBoard";
import "./css/Board.css";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getTeamMembers } from "../../store/teamActions";
import { updateBoard } from "../../store/boardActions";

const { Header, Content } = Layout;

export default function SelectedBoardLayout() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState("");
  const [boardNameUI, setBoardNameUI] = useState(false);
  const getStateBoard = useSelector((state) =>
    state.boards.boards.find((board) => board.id === boardId)
  );
  const updateBoardName = () => { };
  useEffect(() => {
    setBoardName(getStateBoard?.name);
    dispatch(getTeamMembers());
  }, [getStateBoard?.name]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, loading]);

  const profileMenu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />}>
        <Link to="/boards/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item icon={<LayoutOutlined />}>
        <Link to="/boards">All Boards</Link>
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} onClick={() => auth.signOut()}>
        Logout
      </Menu.Item>
    </Menu>
  );

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
              <LeftCircleOutlined style={{ color: 'red', fontSize: '25px' }}
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
                bordered={boardNameUI}
                onFocus={() => setBoardNameUI(true)}
                onBlur={() => setBoardNameUI(false)}
                style={{ fontSize: "1.2em", fontWeight: 600 }}
                onPressEnter={(e) => { e.target.blur(); updateBoardName(); }}
                onChange={(e) => setBoardName(e.target.value)}
              />
            </div>
          </Menu.Item>
          <Menu.Item style={{ float: "right" }}>
            <Dropdown overlay={profileMenu}>
              <Avatar
                size="large"
                icon={<UserOutlined style={{ fontSize: "1em" }} />}
              />
            </Dropdown>
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
