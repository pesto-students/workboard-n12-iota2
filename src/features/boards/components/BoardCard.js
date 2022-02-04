import { Card, Col, Dropdown, Menu, Row } from "antd";
import React from "react";
import { TeamOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateBoard, deleteBoard } from "../../../store/boardActions";
import AddNewBoard from "./AddNewBoard";
const { Meta } = Card;

export default function BoardCard(board) {
  const isShared = true;

  const editUpdateForBoard = {
    name: `New Board ${Math.floor(Math.random() * 1000)}`,
    lastUpdatedOn: String(new Date().toLocaleDateString()),
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menu = (
    <Menu>
      <Menu.Item>
        <AddNewBoard edit={true} boardDetails={board} />
      </Menu.Item>
      <Menu.Item danger onClick={() => dispatch(deleteBoard(board.id))}>
        Delete Board
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      hoverable
      style={{ width: "100%", borderRadius: 5 }}
      bodyStyle={{ padding: "10px 15px" }}
      cover={
        <img
          onClick={() => navigate(`/board/${board.id}`)}
          alt="coverImage"
          src={board.coverImg}
        />
      }
    >
      <Meta
        title={
          <Row justify="space-between">
            <Col onClick={() => navigate(`/board/${board.id}`)}>
              {board.name}
            </Col>
            <Col>
              <Dropdown overlay={menu}>
                <EllipsisOutlined style={{ transform: "rotate(90deg)" }} />
              </Dropdown>
            </Col>
          </Row>
        }
        description={
          <>
            <p onClick={() => navigate(`/board/${board.id}`)}>
              {isShared && (
                <>
                  <TeamOutlined /> &nbsp;
                </>
              )}
              {board.lastUpdatedOn}
            </p>
          </>
        }
      />
    </Card>
  );
}
