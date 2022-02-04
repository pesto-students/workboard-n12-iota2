import {
  Modal,
  Row,
  Col,
  Input,
  Tag,
  Menu,
  Dropdown,
  Select,
  Empty,
  Button,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  CloseOutlined,
  UserOutlined,
  PlusCircleOutlined,
  ClockCircleOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../css/Board.css";
import { tagColors } from "../../../helpers/tagColors";
import { useDispatch } from "react-redux";
import { updateStoryInBoard } from "../../../store/boardActions";

export default function ViewCard({ boardId, selectedCard }) {
  // console.log(selectedCard);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cardName, setCardName] = useState(
    selectedCard ? selectedCard.name : ""
  );
  const [cardDescription, setCardDescription] = useState(
    selectedCard ? selectedCard.description : ""
  );
  const [cardLabels, setCardLabels] = useState(
    selectedCard ? selectedCard.labels : []
  );
  const [cardMembers, setCardMembers] = useState(
    selectedCard ? selectedCard.assignees : []
  );
  const [userSelection, setUserSelection] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  useEffect(() => {
    if (selectedCard) {
      setViewModal(true);
      setCardName(selectedCard.name);
      setCardDescription(selectedCard.description);
      setCardLabels(selectedCard.labels);
      setCardMembers(selectedCard.assignees);
    } else setViewModal(false);
  }, [selectedCard]);

  const handleOk = () => {};
  const handleCancel = () => {
    navigate(`/board/${boardId}`, { replace: true });
  };
  const handleAddUsers = () => {};
  const handleAddUsersCancel = () => {
    setUserSelection(false);
  };
  const updateLabel = (label) => {
    dispatch(
      updateStoryInBoard(boardId, {
        ...selectedCard,
        labels: [{ color: label.color }],
      })
    );
  };
  const updateDescription = () => {
    dispatch(
      updateStoryInBoard(boardId, {
        ...selectedCard,
        description: cardDescription,
      })
    );
  };
  const tagMenu = (
    <Menu>
      {tagColors.map((tag) => (
        <Menu.Item>
          <Tag
            className="tag-card"
            style={{ width: "150px" }}
            color={tag.color}
            onClick={() => updateLabel(tag)}
          >
            {tag.name}
          </Tag>
        </Menu.Item>
      ))}
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item>
        <Select
          mode="tags"
          allowClear
          style={{ width: "250px" }}
          placeholder="Please enter or select members to add."
          value={cardMembers}
          on
          onChange={(value) => setCardMembers(value)}
          notFoundContent={<Empty description="No users found" />}
        >
          {/* {children} add card members here */}
        </Select>
      </Menu.Item>
    </Menu>
  );

  return (
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
      visible={viewModal}
      onOk={handleOk}
      style={{ borderRadius: 5 }}
      onCancel={handleCancel}
    >
      <Row gutter={[20, 20]}>
        <Col span={18}>
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Input
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                bordered={false}
                style={{ fontSize: "2em" }}
              />
            </Col>
            <Col span={24}>
              <Input.TextArea
                rows={4}
                bordered={false}
                style={{
                  background: "#f1f1f1",
                  fontSize: "1.2em",
                  borderRadius: 5,
                }}
                placeholder="description"
                value={cardDescription}
                onChange={(e) => setCardDescription(e.target.value)}
              ></Input.TextArea>
              {selectedCard.description !== cardDescription && (
                <Button
                  className="primary_button"
                  style={{ float: "right", margin: 5, color: "white" }}
                  onClick={() => updateDescription()}
                >
                  Save
                </Button>
              )}
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
              {cardMembers.map((member) => (
                <UserOutlined
                  style={{
                    background: "#e2e2e2",
                    fontSize: "1.5em",
                    borderRadius: 20,
                    padding: 7,
                  }}
                />
              ))}
              <PlusCircleOutlined
                style={{ fontSize: "2em", cursor: "pointer" }}
                onClick={() => setUserSelection(true)}
              />
            </Col>
            <Col span={24}>
              <h3>Labels</h3>
              <Row>
                {cardLabels.map((label) => (
                  <Col>
                    <Tag className="tag-card" color={label.color}>
                      &emsp;&emsp;
                    </Tag>
                  </Col>
                ))}
                <Dropdown overlay={tagMenu} trigger="click">
                  {cardLabels.length >= 1 ? (
                    <RedoOutlined
                      style={{ fontSize: "2em", cursor: "pointer" }}
                    />
                  ) : (
                    <PlusCircleOutlined
                      style={{ fontSize: "2em", cursor: "pointer" }}
                    />
                  )}
                </Dropdown>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        title="Add members"
        visible={userSelection}
        onOk={handleAddUsers}
        onCancel={handleAddUsersCancel}
        okType="ghosted"
      >
        <Select
          mode="tags"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please enter or select members to add."
          value={cardMembers}
          onChange={(value) => setCardMembers(value)}
          notFoundContent={<Empty description="No users found" />}
        >
          {/* {children} add card members here */}
        </Select>
      </Modal>
    </Modal>
  );
}
