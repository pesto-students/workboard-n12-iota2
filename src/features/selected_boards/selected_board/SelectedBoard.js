import { Button, Col, Row, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBoardStages_Stories, createNewStageInBoard } from '../../../store/boardActions';
// import { createStageInBoard } from "../../../store/boardActions";
import ListBoard from "../components/ListBoard";
import { PlusOutlined } from "@ant-design/icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../css/Board.css";

import generateKey from "../../../helpers/generateKey";
import { useLocation } from "react-router-dom";

export default function SelectedBoard() {
  const dispatch = useDispatch();
  const boardId = useLocation().pathname.split('/')[2];
  const [addingNewList, setAddingNewList] = useState(false);

  useEffect(() => {
    console.log("connection established with board document");
    const { unsubBoard, unsubStories } = dispatch(getBoardStages_Stories(boardId));

    return () => {
      unsubBoard();
      unsubStories();
      console.log("connection broken with board document");
    }
  }, []);

  const getStateBoard = useSelector((state) => state.boards.boards.find((board) => board.id === boardId));
  const allStages = getStateBoard ? getStateBoard.stages : [];
  const allStories = getStateBoard ? getStateBoard.stories : [];

  const [newStageName, setNewStageName] = useState("");

  const createStageFunctionForAction = () => {
    const newStage = {
      id: generateKey(),
      name: newStageName,
      position: allStages.length
    }
    const newStages = [...allStages, newStage];
    dispatch(createNewStageInBoard(boardId, newStages));
  };

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
        {allStages.map((stage) => (
          <ListBoard key={stage.id} stageId={stage.id} name={stage.name} position={stage.position} allStages={allStages} allStories={allStories} />
        ))}
        {addingNewList ? (
          <Col style={{ margin: 10 }}>
            <Row gutter={[10, 10]} style={{ width: 300 }}>
              <Col span={24}>
                <Input
                  style={{ border: "none", borderRadius: 5 }}
                  placeholder="Enter title for card"
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
    </DndProvider>
  );
}
