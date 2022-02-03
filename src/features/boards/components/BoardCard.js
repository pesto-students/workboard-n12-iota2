import { Card, Col, Dropdown, Menu, Row } from "antd";
import React from "react";
import { TeamOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateBoard , deleteBoard } from '../../../store/boardActions';
const { Meta } = Card;

export default function BoardCard(board) {

  const isShared = true;

  const editUpdateForBoard = {
    name: `New Board ${Math.floor(Math.random()*1000)}`,
    lastUpdatedOn: String(new Date().toLocaleDateString())
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menu = (
    <Menu>
      <Menu.Item onClick={() => dispatch(updateBoard(board.id, editUpdateForBoard))}>Edit Board</Menu.Item>
      <Menu.Item danger onClick={() => dispatch(deleteBoard(board.id))}>Delete Board</Menu.Item>
    </Menu>
  );

  return (
    <Card
      hoverable
      onClick={() => navigate(`/board/${board.id}`)}
      style={{ width: "100%", borderRadius: 5 }}
      bodyStyle={{ padding: "10px 15px" }}
      cover={<img alt="coverImage" src={board.coverImg} />}
    >
      {console.log(id)}
      <Meta
        title={
          <Row justify="space-between">
            <Col>{board.name}</Col>
            <Col>
              <Dropdown overlay={menu}>
                <EllipsisOutlined style={{ transform: "rotate(90deg)" }} />
              </Dropdown>
            </Col>
          </Row>
        }
        description={
          <>
            <p>
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
