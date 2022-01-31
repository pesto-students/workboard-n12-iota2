import { Button, Card, Col, Row, Input } from "antd";
import React, { useState } from "react";
import CardBoard from "./CardBoard";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useDrop } from "react-dnd";

export default function ListBoard() {
  const [addingNewCard, setAddingNewCard] = useState(false);
  const [allCards, setAllCards] = useState([]);
  const [{ props }, drop] = useDrop({
    accept: "card",
    drop: () => {
      setAllCards(allCards.concat({}));
      console.log(props);
    },
  });
  return (
    <Col ref={drop} style={{ maxHeight: "calc(100vh - 64px)" }}>
      <Card
        title="Default size card"
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
        {allCards.map(() => (
          <CardBoard />
        ))}
        <Col style={{ margin: 10 }}>
          {addingNewCard ? (
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Input
                  style={{ border: "none", borderRadius: 5 }}
                  placeholder="Enter title for card"
                  autoFocus
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
                      onClick={() => {
                        setAllCards(allCards.concat({}));
                        setAddingNewCard(false);
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
      </Card>
    </Col>
  );
}