import { Card, Col, Dropdown, Menu, Row } from "antd";
import React from "react";
import { TeamOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateBoard , deleteBoard } from '../../../store/boardActions';
const { Meta } = Card;

export default function BoardCard({ id, name, coverImg, isShared, lastUpdatedOn }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menu = (
    <Menu>
      <Menu.Item onClick={() => dispatch(updateBoard(id, { name: "New Board Name" }))}>Edit Board</Menu.Item>
      <Menu.Item danger onClick={() => dispatch(deleteBoard(id))}>Delete Board</Menu.Item>
    </Menu>
  );

  return (
    <Card
      hoverable
      onClick={() => navigate(`/board/${id}`)}
      style={{ width: "100%", borderRadius: 5 }}
      bodyStyle={{ padding: "10px 15px" }}
      cover={<img alt="coverImage" src={coverImg} />}
    >
      <Meta
        title={
          <Row justify="space-between">
            <Col>{name}</Col>
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
              {lastUpdatedOn}
            </p>
          </>
        }
      />
    </Card>
  );
}
