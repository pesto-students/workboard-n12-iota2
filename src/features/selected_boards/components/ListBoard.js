import { Button, Card, Col, Row, Input, Dropdown, Menu } from "antd";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import CardBoard from "./CardBoard";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import update from "immutability-helper";
import {
  createStoryInBoard,
  updateStageInBoard,
  deleteStageInBoard,
  deleteStoryFromBoard,
} from "../../../store/boardActions";
import generateKey from "../../../helpers/generateKey";

export default function ListBoard({
  boardId,
  stageId,
  name,
  allStages,
  allStageStories,
  index,
  moveList,
  position,
  moveCard,
  stage,
  setSelectedCard,
  updateStageFunctionForAction,
  openClickedStory
}) {
  const dispatch = useDispatch();
  const [addingNewCard, setAddingNewCard] = useState(false);
  const [stageTitle, setStageTitle] = useState(name);
  const [allCards, setAllCards] = useState([]);
  const [storyName, setStoryName] = useState("");

  const deleteList = () => { };
  const deleteListItems = () => { };

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "list",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleX =
        (hoverBoundingRect.left - hoverBoundingRect.right) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientX = clientOffset.x - hoverBoundingRect.right;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      moveList(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "list",
    item: () => {
      return { stageId, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const addNewCard = () => {
    const newStory = {
      id: generateKey(),
      name: `${storyName}`,
      desc: `Description ${storyName}`,
      stageId: `${stageId}`,
    };
    dispatch(createStoryInBoard(boardId, newStory));
    // setAllCards(allCards.concat({ }));
    setAddingNewCard(false);
  };

  const createStoryFunctionForAction = () => {
    const story = {
      id: generateKey(),
      stageId: stageId,
      stagePosition: position,
      name: storyName,
      description: "",
      assignees: [],
      labels: [],
      comments: [],
    };
    dispatch(createStoryInBoard(boardId, story));
    stage.storyIds.push(story.id);
    const newStages = allStages.map((allStage) => {
      if (allStage.id === stage.id) {
        allStage.storyIds.concat(story.id);
      }
      return allStage;
    })
    dispatch(updateStageInBoard(boardId, newStages));
  };

  const deleteStageFunctionForAction = () => {
    console.log("delete me");
    const updatedStages = allStages.filter((stage) => stage.id !== stageId);
    allStageStories.forEach((story) => {
      dispatch(deleteStoryFromBoard(boardId, story.id));
    });
    dispatch(deleteStageInBoard(boardId, updatedStages));
  };

  useEffect(() => {
    if (stage) {
      setAllCards([
        ...stage.storyIds.map((story) => {
          return allStageStories.find((findStory) => findStory.id === story);
        }),
      ]);
    }
  }, [stage, allStageStories]);

  drag(drop(ref));

  const menu = (
    <Menu>
      <Menu.Item danger onClick={deleteList}>
        Delete list
      </Menu.Item>
      <Menu.Item danger onClick={deleteListItems}>
        Delete list items
      </Menu.Item>
    </Menu>
  );

  const [stageNameUI, setStageNameUI] = useState(false);

  return (
    <Col
      ref={ref}
      key={stageId}
      style={{
        maxHeight: "calc(100vh - 64px)",
        transform: "translate3d(0, 0, 0)",
      }}
    >
      <Card
        title={
          <Input
            bordered={stageNameUI}
            value={stageTitle}
            style={{
              fontSize: "1.1em",
              fontWeight: "500",
              padding: 0,
              width: "10vw",
            }}
            onFocus={() => setStageNameUI(true)}
            onBlur={() => setStageNameUI(false)}
            onChange={(e) => setStageTitle(e.target.value)}
            onPressEnter={(e) => {
              updateStageFunctionForAction(stageId, stageTitle, position);
              setStageNameUI(false);
              e.target.blur();
            }}
          />
        }
        extra={
          <Dropdown overlay={menu}>
            <EllipsisOutlined />
          </Dropdown>
        }
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
        <div>
          {allCards.map(
            (story, idx) =>
              story && (
                <CardBoard
                  key={story.id}
                  name={story.name}
                  description={story.description}
                  index={idx}
                  id={story.id}
                  stageId={stageId}
                  stageIndex={index}
                  moveCard={moveCard}
                  cardDetails={story}
                  openClickedStory={openClickedStory}
                />
              )
          )}
        </div>
        <Col style={{ margin: 10 }}>
          {addingNewCard ? (
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Input
                  style={{ border: "none", borderRadius: 5 }}
                  placeholder="Enter title for card"
                  autoFocus
                  onChange={(e) => setStoryName(e.target.value)}
                  onPressEnter={() => {
                    setAddingNewCard(false);
                    createStoryFunctionForAction();
                  }}
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
              Add new story
            </Button>
          )}
        </Col>
      </Card>
    </Col>
  );
}
