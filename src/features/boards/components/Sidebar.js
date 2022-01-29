import React from "react";
import { Layout, Menu } from "antd";
import {
  SettingOutlined,
  LogoutOutlined,
  LayoutOutlined,
} from "@ant-design/icons";
import "../css/Boards.css";
import { NavLink } from "react-router-dom";

const { SubMenu } = Menu;
const { Sider } = Layout;

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      breakpoint="sm"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapse, type) => {
        console.log(type, collapse);
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
        <Menu.Item key="9" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
        <Menu.Item key="10" icon={<LogoutOutlined />}>
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