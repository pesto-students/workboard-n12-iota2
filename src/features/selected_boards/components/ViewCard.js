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
  Avatar,
  Popconfirm,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CloseOutlined,
  PlusCircleOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../css/Board.css";
import { tagColors } from "../../../helpers/tagColors";
import {
  deleteStoryFromBoard,
  updateStageInBoard,
  updateStoryInBoard,
} from "../../../store/boardActions";
import DateTimePicker from "react-datetime-picker";

export default function ViewCard({ boardId, selectedCard, allStages }) {
  // console.log(selectedCard);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentBoard = useSelector((state) =>
    state.boards.boards.find((board) => board.id === boardId)
  );
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
  const [scheduledDate, setScheduledDate] = useState(new Date());

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
    // closeClickedStory();
    navigate(`/board/${boardId}`, { replace: true });
  };
  const handleAddUsers = () => {
    console.log(cardMembers);
    updateAssignees(cardMembers);
  };
  const handleAddUsersCancel = () => {
    setUserSelection(false);
  };

  const updateStoryName = () => {
    const newStory = {
      ...selectedCard,
      name: cardName,
    };
    dispatch(updateStoryInBoard(boardId, newStory));
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
  const updateAssignees = (assignees) => {
    dispatch(
      updateStoryInBoard(boardId, {
        ...selectedCard,
        assignees: [...new Set([...assignees])].filter((a) => a),
      })
    );
    setUserSelection(false);
  };
  const deleteCard = () => {
    const newStages = allStages.map((allStage) => {
      let newStage = { ...allStage };
      if (newStage.id === selectedCard.stageId) {
        newStage.storyIds = [...newStage.storyIds].filter(
          (a) => a !== selectedCard.id
        );
        return newStage;
      }
      return newStage;
    });
    dispatch(updateStageInBoard(boardId, newStages));
    dispatch(deleteStoryFromBoard(boardId, selectedCard.id));
  };
  const tagMenu = (
    <Menu>
      {tagColors.map((tag) => (
        <Menu.Item key={tag.color}>
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
      width={1000}
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
                onPressEnter={updateStoryName}
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
              {selectedCard?.description !== cardDescription && (
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
                <DateTimePicker
                  onChange={setScheduledDate}
                  value={scheduledDate}
                />
              </p>
            </Col>
            <Col span={24}>
              <h3>Members</h3>
              <Row align="middle">
                <Avatar.Group>
                  {cardMembers.map((member) => (
                    <Avatar style={{ backgroundColor: "#f56a00" }}>
                      {member && member.charAt(0)}
                    </Avatar>
                  ))}
                </Avatar.Group>
                <PlusCircleOutlined
                  style={{
                    fontSize: "2em",
                    cursor: "pointer",
                    margin: "0 5px",
                  }}
                  onClick={() => setUserSelection(true)}
                />
              </Row>
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
            <Col span={24}>
              <Popconfirm
                title="Are you sure to delete this card?"
                onConfirm={deleteCard}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <p style={{ color: "#ff7f58", cursor: "pointer" }}>
                  Delete this card
                </p>
              </Popconfirm>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        title="Assign members"
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
          {currentBoard &&
            [
              ...currentBoard.owners,
              ...currentBoard.viewers,
              ...currentBoard.editors,
            ].map(
              (option) =>
                option && <Select.Option value={option}>{option}</Select.Option>
            )}
        </Select>
      </Modal>
    </Modal>
  );
}
