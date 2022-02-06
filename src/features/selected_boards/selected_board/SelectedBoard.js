/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Row, Input, Form } from "antd";
import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getBoardStages_Stories,
  createNewStageInBoard,
  updateStageInBoard,
  getStoryInBoard,
  updateStoryInBoard,
} from "../../../store/boardActions";
import ListBoard from "../components/ListBoard";
import { PlusOutlined } from "@ant-design/icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import "../css/Board.css";
import _ from "lodash";

import generateKey from "../../../helpers/generateKey";
import ViewCard from "../components/ViewCard";

export default function SelectedBoard() {
  const dispatch = useDispatch();
  const [selectedCard, setSelectedCard] = useState(false);
  const [disconnectBoardStoriesRef, setDisconnectBoardStoriesRef] =
    useState(null);
  const [disconnectStoryRef, setDisconnecStoryRef] = useState(null);
  const { boardId, cardId } = useParams();
  // const boardId = useLocation().pathname.split("/")[2];
  const [addingNewList, setAddingNewList] = useState(false);

  useEffect(() => {
    console.log(
      "connection established with board document",
      disconnectStoryRef
    );
    console.log("connection established with stories sub collection");
    const disconnectBoardStories = dispatch(getBoardStages_Stories(boardId));
    setDisconnectBoardStoriesRef(disconnectBoardStories);

    // return () => {
    //   console.log("connection broken with story document");
    //   disconnectStoryRef();
    // };
  }, []);

  const openClickedStory = (storyId) => {
    const { unsubBoard, unsubStories } = disconnectBoardStoriesRef;
    unsubBoard();
    unsubStories();
    console.log("connection broken with board document");
    console.log("connection broken with stories sub collection");
    const disconnectStory = dispatch(getStoryInBoard(boardId, storyId));
    setDisconnecStoryRef(disconnectStory);
  };

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
      const updatedStages = update(stages, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragStage],
        ],
      }).map((stage, index) => {
        stage.position = index;
        return stage;
      });
      setStages(updatedStages);
      dispatch(updateStageInBoard(boardId, updatedStages));
    },
    [stages]
  );

  const moveCard = (storyId, destStageId, index) => {
    let updatedStages = stages.map((stage) => ({
      ...stage,
      storyIds: _.flowRight(
        (ids) =>
          stage.id === destStageId
            ? [...ids.slice(0, index), storyId, ...ids.slice(index)]
            : ids,
        (ids) => ids.filter((id) => id !== storyId)
      )(stage.storyIds),
    }));
    setStages(updatedStages);
    const updatedStory = {
      ...allStories.find((story) => story.id === storyId),
    };
    updatedStory.stageId = destStageId;
    // console.log(updatedStory);
    dispatch(updateStoryInBoard(boardId, updatedStory));
    dispatch(updateStageInBoard(boardId, updatedStages));
  };

  const createStageFunctionForAction = () => {
    const newStage = {
      id: generateKey(),
      name: newStageName,
      position: allStages.length,
      storyIds: [],
    };
    const newStages = [...allStages, newStage];
    dispatch(createNewStageInBoard(boardId, newStages));
  };

  const updateStageFunctionForAction = (
    stageId,
    updatedName,
    updatedPosition
  ) => {
    const newStages = allStages.map((stage) => {
      if (stage.id === stageId) {
        return { id: stageId, name: updatedName, position: updatedPosition };
      } else return stage;
    });
    dispatch(updateStageInBoard(boardId, newStages));
  };

  const addNewList = () => {
    setAddingNewList(false);
    createStageFunctionForAction();
  };

  useEffect(() => {
    if (cardId && getStateBoard) {
      setSelectedCard(allStories.find((story) => story.id === cardId));
    } else setSelectedCard(false);
  }, [cardId, getStateBoard]);

  useEffect(() => {
    setStages(
      allStages.map((stage) => {
        return {
          ...stage,
          // storyIds: [
          //   ...allStories.filter((story) => story.stageId === stage.id),
          // ].map((story) => story.id),
        };
      })
    );
  }, [allStages, allStories, getStateBoard]);

  useEffect(() => {
    // console.log(stages);
  }, [stages]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Row
        style={{
          overflowX: "scroll",
          flexFlow: "row",
          height: "calc(100vh - 64px)",
        }}
      >
        {stages &&
          stages.map((stage, index) => {
            if (stage) {
              return (
                <ListBoard
                  key={stage.id}
                  boardId={boardId}
                  stageId={stage.id}
                  index={index}
                  name={stage.name}
                  position={stage.position}
                  allStageStories={allStories}
                  allStages={allStages}
                  moveList={moveList}
                  moveCard={moveCard}
                  stage={stage}
                  updateStageFunctionForAction={updateStageFunctionForAction}
                  openClickedStory={openClickedStory}
                />
              );
            }
            return null;
          })}
        {addingNewList ? (
          <Form name="newList" onFinish={addNewList}>
            <Col style={{ margin: 10 }}>
              <Row gutter={[10, 10]} style={{ width: 300 }}>
                <Col span={24}>
                  <Form.Item
                    name="listName"
                    rules={[
                      {
                        required: true,
                        message: "Please input list name!",
                      },
                    ]}
                  >
                    <Input
                      style={{ border: "none", borderRadius: 5 }}
                      placeholder="Enter title for list"
                      autoFocus
                      onChange={(e) => setNewStageName(e.target.value)}
                    />
                  </Form.Item>
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
                        htmlType="submit"
                      >
                        add
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Form>
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
      <ViewCard
        boardId={boardId}
        selectedCard={selectedCard}
        allStages={allStages}
      />
    </DndProvider>
  );
}
