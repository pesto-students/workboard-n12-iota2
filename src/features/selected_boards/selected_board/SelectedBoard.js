import { Button, Col, Row, Input } from "antd";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStageInBoard } from "../../../store/boardActions";
import ListBoard from "../components/ListBoard";
import { PlusOutlined } from "@ant-design/icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../css/Board.css";

import generateKey from "../../../helpers/generateKey";

export default function SelectedBoard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const message = useOutletContext();
  const [addingNewList, setAddingNewList] = useState(false);
  const getStateBoardsForStages_Stories = useSelector(
    (state) => state.boards.boards
  );
  const allStages = getStateBoardsForStages_Stories
    ? getStateBoardsForStages_Stories[0].stages
    : [{}];
  const allStories = getStateBoardsForStages_Stories
    ? getStateBoardsForStages_Stories[0].stories
    : [];
  return (
    <DndProvider backend={HTML5Backend}>
      <Row
        style={{
          overflowX: "scroll",
          flexFlow: "row",
          height: "calc(100vh - 64px)",
        }}
      >
        {allStages.map((stage) => (
          <ListBoard id={stage.id} name={stage.name} allStories={allStories} />
        ))}
        {addingNewList ? (
          <Col style={{ margin: 10 }}>
            <Row gutter={[10, 10]} style={{ width: 300 }}>
              <Col span={24}>
                <Input
                  style={{ border: "none", borderRadius: 5 }}
                  placeholder="Enter title for card"
                  autoFocus
                  onChange={(e) => setStageName(e.target.value)}
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
                          name: "New Stage",
                          id: "n",
                        };
                        dispatch(createStageInBoard(newStage));
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
