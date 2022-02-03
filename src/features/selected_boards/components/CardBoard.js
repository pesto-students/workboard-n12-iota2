import { Card, Col, Row, Typography, Tag, Modal, Input } from "antd";
import React, { useState } from "react";
import { useDrag } from "react-dnd";
import {
  CloseOutlined,
  UserOutlined,
  PlusCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

export default function CardBoard({ name, description }) {
  const [cardVisible, setCardVisible] = useState(false);
  const handleOk = () => { };
  const handleCancel = () => {
    setCardVisible(false);
  };
  return (
    <>
      <Card
        hoverable
        bordered={false}
        style={{ margin: 10, borderRadius: "5px" }}
        bodyStyle={{ padding: 10 }}
        onClick={() => setCardVisible(true)}
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <h4>{name}</h4>
            <EllipsisMiddle suffixCount={12}>{description}</EllipsisMiddle>
          </Col>
          <Col span={24}>
            <Row gutter={[10, 10]}>
              <Tag className="tag" color="#f50">
                &emsp;&emsp;
              </Tag>
              <Tag className="tag" color="#2db7f5">
                &emsp;&emsp;
              </Tag>
              <Tag className="tag" color="#87d068">
                &emsp;&emsp;
              </Tag>
              <Tag className="tag" color="#108ee9">
                &emsp;&emsp;
              </Tag>
            </Row>
          </Col>
        </Row>
      </Card>
      <Modal
        closeIcon={
          <CloseOutlined
            style={{
              position: "absolute",
              top: -25,
              right: -25,
              background: "#c2c2c2",
              borderRadius: 20,
              padding: 5,
            }}
          />
        }
        width={800}
        footer={null}
        visible={cardVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={[20, 20]}>
          <Col span={18}>
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <Input
                  value={name}
                  bordered={false}
                  style={{ fontSize: "2em" }}
                />
              </Col>
              <Col span={24}>
                <Input.TextArea
                  rows={4}
                  bordered={false}
                  style={{
                    background: "#e2e2e2",
                    fontSize: "1.2em",
                    borderRadius: 5,
                  }}
                  value={description}
                ></Input.TextArea>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Row align="middle" gutter={[20, 20]}>
              <Col span={24}>
                <h3>Scheduled</h3>
                <p style={{ justifyItems: "center" }}>
                  <ClockCircleOutlined
                    style={{
                      fontSize: "1.5em",
                      borderRadius: 20,
                      padding: 5,
                    }}
                  />
                  <span style={{ fontSize: "1.3em" }}>19:00</span>
                </p>
              </Col>
              <Col span={24}>
                <h3>Members</h3>
                <UserOutlined
                  style={{
                    background: "#c2c2c2",
                    fontSize: "2em",
                    borderRadius: 20,
                    padding: 5,
                  }}
                />
              </Col>
              <Col span={24}>
                <h3>Labels</h3>
                <Row>
                  <Col>
                    <Tag className="tag-card" color="#f50">
                      &emsp;&emsp;
                    </Tag>
                  </Col>
                  <Col>
                    <Tag className="tag-card" color="#2db7f5">
                      &emsp;&emsp;
                    </Tag>
                  </Col>
                  <PlusCircleOutlined
                    style={{ fontSize: "2em", cursor: "pointer" }}
                  />
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

const EllipsisMiddle = ({ suffixCount, children }) => {
  const start = children.slice(0, children.length - suffixCount).trim();
  const suffix = children.slice(-suffixCount).trim();
  return (
    <Text style={{ maxWidth: "100%" }} ellipsis={{ suffix }}>
      {start}
    </Text>
  );
};
