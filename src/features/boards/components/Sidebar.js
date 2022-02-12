import React from "react";
import { Layout, Menu } from "antd";
// import { useDispatch } from "react-redux";
import {
  LogoutOutlined,
  LayoutOutlined,
  UserOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import "../css/Boards.css";
import { Link, NavLink } from "react-router-dom";
// import { logoutAction } from "../../../store/authActions";
import AddNewBoard from "./AddNewBoard";
import { getAuth } from "firebase/auth";

const { SubMenu } = Menu;
const { Sider } = Layout;

export default function Sidebar({ collapsed, setCollapsed }) {
  // const dispatch = useDispatch();
  const auth = getAuth();
  // const logoutFunctionForAction = () => {
  //   dispatch(logoutAction());
  // };
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      breakpoint="sm"
      collapsedWidth="0"
      // onBreakpoint={(broken) => {
      //   console.log(broken);
      // }}
      onCollapse={(collapse) => {
        // console.log(type, collapse);
        setCollapsed(collapse);
      }}
      theme="light"
      zeroWidthTriggerStyle={{ top: 0 }}
      trigger={null}
      className="boards_sidebar"
    >
      <div>
        <p className="board_logo">workboard</p>
      </div>
      <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
        <SubMenu key="sub1" icon={<LayoutOutlined />} title="Boards">
          <Menu.Item key="3">
            <MenuLink to="/boards">All Boards</MenuLink>
          </Menu.Item>
          <Menu.Item key="4">
            <MenuLink to="/boards/shared">Shared with me</MenuLink>
          </Menu.Item>
          <Menu.Item key="5">
            <MenuLink to="/boards/owned">Owned by me</MenuLink>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="8" icon={<PlusCircleOutlined />}>
          <AddNewBoard />
        </Menu.Item>
        <Menu.Item key="9" icon={<UserOutlined />}>
          <Link to="/boards/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item
          key="10"
          icon={<LogoutOutlined />}
          onClick={() => {
            auth.signOut();
          }}
        >
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

const MenuLink = ({ children, to }) => {
  return (
    <NavLink
      style={({ isActive }) => ({
        color: isActive ? "#ff7f58" : "",
      })}
      to={to}
      end={true}
    >
      {children}
    </NavLink>
  );
};
