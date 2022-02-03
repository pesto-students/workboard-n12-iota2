import { Button, Card, Col, Row, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import CardBoard from "./CardBoard";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useDrop } from "react-dnd";

import generateKey from "../../../helpers/generateKey";
import { createStoryInBoard, deleteStageInBoard, deleteStoryFromBoard } from "../../../store/boardActions";
export default function ListBoard({ stageId, name, position, allStages, allStories }) {
  const dispatch = useDispatch();
  const boardId = useLocation().pathname.split('/')[2];
  const stageStories = allStories.filter((story) => story.stageId === stageId);
  const [addingNewCard, setAddingNewCard] = useState(false);
  const [allCards, setAllCards] = useState([]);
  const [storyName, setStoryName] = useState("");
  const [{ props }, drop] = useDrop({
    accept: "card",
    drop: () => {
      setAllCards(allCards.concat({}));
      console.log(props);
    },
  });
  console.log(stageId);

  const createStoryFunctionForAction = () => {
    const story = {
      id: generateKey(),
      stageId: stageId,
      stagePosition: position,
      name: storyName,
      description: "",
      assignees: [],
      labels: [],
      comments: []
    };
    dispatch(createStoryInBoard(boardId, story))
  };

  const deleteStageFunctionForAction = () => {
    console.log("delete me");
    const updatedStages = allStages.filter((stage) => stage.id !== stageId);
    for (const story in stageStories) {
      dispatch(deleteStoryFromBoard(boardId, story.id));
    }
    dispatch(deleteStageInBoard(boardId, updatedStages));
  }
  return (
    <Col id={stageId} ref={drop} style={{ maxHeight: "calc(100vh - 64px)" }}>
      <Card
        title={name}
        extra={<EllipsisOutlined />}
        style={{
          width: 300,
          margin: 10,
          borderRadius: "5px",
          background: "rgb(240,240,240)",
        }}
        bodyStyle={{
          padding: 0,
          overflowY: "scroll",
          maxHeight: "calc(100vh - 150px)",
        }}
      // onClick={() => deleteStageFunctionForAction()}
      >
        {stageStories.map((story) => (
          <CardBoard name={story.name} description={story.description} onClick={() => { }} />
        ))}
        <Col style={{ margin: 10 }}>
          {addingNewCard ? (
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Input
                  style={{ border: "none", borderRadius: 5 }}
                  placeholder="Enter title for card"
                  autoFocus
                  onChange={(e) => setStoryName(e.target.value)}
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
                        setAddingNewCard(false);
                        setStoryName("");
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
                        setAddingNewCard(false);
                        createStoryFunctionForAction();
                      }}
                    >
                      add
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : (
            <Button
              icon={<PlusOutlined />}
              block
              size="large"
              style={{
                background: "#fff",
                color: "#ff7f58",
                border: "none",
                borderRadius: "5px",
              }}
              onClick={() => setAddingNewCard(true)}
            >
              Add new card
            </Button>
          )}
        </Col>
      </Card >
    </Col >
  );
}
