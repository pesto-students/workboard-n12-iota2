import { Button, Card, Col, Row, Input } from "antd";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import CardBoard from "./CardBoard";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import update from "immutability-helper";

import { createStoryInBoard } from "../../../store/boardActions";
import { useDrag, useDrop } from "react-dnd";

export default function ListBoard({
  boardId,
  id,
  name,
  allStageStories,
  allStories,
  index,
  moveList,
}) {
  const dispatch = useDispatch();
  const [addingNewCard, setAddingNewCard] = useState(false);
  const [allCards, setAllCards] = useState([...allStageStories]);
  const [cardName, setCardName] = useState("");

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
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  const addNewCard = () => {
    const story = {
      name: `${cardName}`,
      desc: `Description ${cardName}`,
      stageId: `${id}`,
    };
    dispatch(createStoryInBoard(story, boardId, allStories));
    // setAllCards(allCards.concat({}));
    setAddingNewCard(false);
  };
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = allCards[dragIndex];
      console.log(
        update(allCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
      setAllCards(
        update(allCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [allCards]
  );
  console.log(handlerId, isDragging);
  useEffect(() => {
    setAllCards(allStageStories);
  }, [allStageStories]);
  return (
    <Col ref={ref} key={id} style={{ maxHeight: "calc(100vh - 64px)" }}>
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
      >
        <div>
          {allCards.map(
            (story, idx) =>
              story && (
                <CardBoard
                  name={story.name}
                  desc={story.desc}
                  index={idx}
                  id={story.id}
                  moveCard={moveCard}
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
                  onChange={(e) => setCardName(e.target.value)}
                  onPressEnter={() => addNewCard()}
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
                      onClick={() => addNewCard()}
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
      </Card>
    </Col>
  );
}
