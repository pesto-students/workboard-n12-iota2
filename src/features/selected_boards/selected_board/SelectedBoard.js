/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Row, Input, Modal, Tag } from "antd";
import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getBoardStages_Stories,
  createNewStageInBoard,
} from "../../../store/boardActions";
import ListBoard from "../components/ListBoard";
import { PlusOutlined } from "@ant-design/icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import "../css/Board.css";

import {
  CloseOutlined,
  UserOutlined,
  PlusCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import generateKey from "../../../helpers/generateKey";

export default function SelectedBoard() {
  const dispatch = useDispatch();
  const [selectedCard, setSelectedCard] = useState(false);
  const { boardId, cardId } = useParams();
  const navigate = useNavigate();
  // const boardId = useLocation().pathname.split("/")[2];
  const [addingNewList, setAddingNewList] = useState(false);

  useEffect(() => {
    console.log("connection established with board document");
    const { unsubBoard, unsubStories } = dispatch(
      getBoardStages_Stories(boardId)
    );

    return () => {
      unsubBoard();
      unsubStories();
      console.log("connection broken with board document");
    };
  }, []);

  const getStateBoard = useSelector((state) =>
    state.boards.boards.find((board) => board.id === boardId)
  );
  const allStages = getStateBoard ? getStateBoard.stages : [];
  const allStories = getStateBoard ? getStateBoard.stories : [];

  const [newStageName, setNewStageName] = useState("");

  const [stages, setStages] = useState([]);

  const moveList = useCallback(
    (dragIndex, hoverIndex) => {
      const dragStage = stages[dragIndex];
      setStages(
        update(stages, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragStage],
          ],
        })
      );
    },
    [stages]
  );

  const storiesForStage = (stageId) => {
    const releventStories = allStories.filter(
      (story) => story.stageId === stageId
    );
    return releventStories;
  };

  const createStageFunctionForAction = () => {
    const newStage = {
      id: generateKey(),
      name: newStageName,
      position: allStages.length,
    };
    const newStages = [...allStages, newStage];
    dispatch(createNewStageInBoard(boardId, newStages));
  };

  const handleOk = () => {};
  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (cardId) {
      setSelectedCard(allStories.find((story) => story.id === cardId));
    } else setSelectedCard(false);
  }, [cardId]);

  return (
    <DndProvider backend={HTML5Backend}>
      {console.log(allStories.length)}
      <Row
        style={{
          overflowX: "scroll",
          flexFlow: "row",
          height: "calc(100vh - 64px)",
        }}
      >
        {allStages &&
          allStages.map((stage, index) => {
            if (stage) {
              const sendStageStories = storiesForStage(stage.id);
              return (
                <ListBoard
                  key={stage.id}
                  boardId={boardId}
                  stageId={stage.id}
                  index={index}
                  name={stage.name}
                  position={stage.position}
                  allStageStories={sendStageStories}
                  allStages={allStages}
                  allStories={allStories}
                  moveList={moveList}
                  setSelectedCard={setSelectedCard}
                />
              );
            }
            return null;
          })}
        {addingNewList ? (
          <Col style={{ margin: 10 }}>
            <Row gutter={[10, 10]} style={{ width: 300 }}>
              <Col span={24}>
                <Input
                  style={{ border: "none", borderRadius: 5 }}
                  placeholder="Enter title for list"
                  autoFocus
                  onChange={(e) => setNewStageName(e.target.value)}
                />
              </Col>
              <Col span={24}>
                <Row gutter={[10, 10]} justify="end">
                  <Col>
                    <Button
                      style={{
                        background: "#fff",
                        color: "#c2c2c2",
                        borderRadius: 5,
                      }}
                      onClick={() => {
                        setAddingNewList(false);
                        setNewStageName("");
                      }}
                    >
                      cancel
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      style={{
                        background: "#ff7f58",
                        color: "#fff",
                        borderRadius: 5,
                      }}
                      onClick={() => {
                        setAddingNewList(false);
                        createStageFunctionForAction();
                      }}
                    >
                      add
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        ) : (
          <Col style={{ margin: 10 }}>
            <Button
              icon={<PlusOutlined />}
              block
              size="large"
              style={{
                background: "#fff",
                color: "#ff7f58",
                border: "none",
                borderRadius: "5px",
                width: 300,
              }}
              onClick={() => {
                setAddingNewList(true);
              }}
            >
              Add New Stage
            </Button>
          </Col>
        )}
      </Row>
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
        visible={selectedCard}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={[20, 20]}>
          <Col span={18}>
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <Input
                  value={selectedCard?.name}
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
                  value={selectedCard?.description}
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
    </DndProvider>
  );
}
