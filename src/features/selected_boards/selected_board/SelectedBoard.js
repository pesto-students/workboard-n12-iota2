import { Button, Col, Row, Input } from "antd";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { createStageInBoard } from "../../../store/boardActions";
import ListBoard from "../components/ListBoard";
import { PlusOutlined } from "@ant-design/icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../css/Board.css";

export default function SelectedBoard() {
  const dispatch = useDispatch();
  const boardId = useLocation().pathname.split("/")[2];
  const [addingNewList, setAddingNewList] = useState(false);
  const getStateBoardsForStages_Stories = useSelector(
    (state) => state.boards.boards
  );

  const allStages = getStateBoardsForStages_Stories
    ? getStateBoardsForStages_Stories.filter((board) => board.id === boardId)[0]
        ?.stages
    : [{}];
  const allStories = getStateBoardsForStages_Stories
    ? getStateBoardsForStages_Stories.filter((board) => board.id === boardId)[0]
        ?.stories
    : [];

  const storiesForStage = (stageId) => {
    const releventStories = allStories.filter(
      (story) => story.stageId === stageId
    );
    return releventStories;
  };

  const [listName, setListName] = useState("");
  return (
    <DndProvider backend={HTML5Backend}>
      <Row
        style={{
          overflowX: "scroll",
          flexFlow: "row",
          height: "calc(100vh - 64px)",
        }}
      >
        {allStages.map((stage) => {
          const sendStageStories = storiesForStage(stage.id);
          return (
            <ListBoard
              boardId={boardId}
              id={stage.id}
              name={stage.name}
              allStageStories={sendStageStories}
              allStories={allStories}
            />
          );
        })}
        {addingNewList ? (
          <Col style={{ margin: 10 }}>
            <Row gutter={[10, 10]} style={{ width: 300 }}>
              <Col span={24}>
                <Input
                  style={{ border: "none", borderRadius: 5 }}
                  placeholder="Enter title for list"
                  autoFocus
                  onChange={(e) => setListName(e.target.value)}
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
                        // setAllCards(allCards.concat({}));
                        setAddingNewList(false);
                        const newStage = {
                          name: listName,
                          id: `${allStages ? allStages.length : 0}`,
                        };
                        dispatch(
                          createStageInBoard(newStage, boardId, allStages)
                        );
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
              Add new list
            </Button>
          </Col>
        )}
      </Row>
    </DndProvider>
  );
}
