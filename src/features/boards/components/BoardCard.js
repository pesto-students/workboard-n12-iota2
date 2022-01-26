import { Card, Col, Dropdown, Menu, Row } from "antd";
import React from "react";
import { TeamOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
const { Meta } = Card;

export default function BoardCard({ name, coverImg, isShared, lastUpdatedOn }) {
  const navigate = useNavigate();
  const menu = (
    <Menu>
      <Menu.Item>Edit Board</Menu.Item>
      <Menu.Item danger>Delete Board</Menu.Item>
    </Menu>
  );

  return (
    <Card
      hoverable
      onClick={() => navigate("/boards/my-board")}
      style={{ width: 240, borderRadius: 10 }}
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
