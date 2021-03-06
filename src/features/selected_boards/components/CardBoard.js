import { Card, Col, Row, Typography, Tag, Avatar } from "antd";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useNavigate } from "react-router";

const { Text } = Typography;

export default function CardBoard({
  name,
  index,
  moveCard,
  id,
  cardDetails,
  openClickedStory,
  stageId,
  stageIndex,
  isSpacer,
}) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      const draggingItem = monitor.getItem();
      // console.log(draggingItem.id, id);
      if (draggingItem.id !== id) {
        moveCard(draggingItem.id, stageId, index);
      }
    },
  });
  const [, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    isDragging(monitor) {
      return id === monitor.getItem().id;
    },
  });
  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{
        transform: "translate3d(0, 0, 0)",
      }}
    >
      <Card
        bordered={false}
        style={{
          margin: 10,
          borderRadius: "5px",
          cursor: "pointer",
          background: isSpacer ? "transparent" : "",
        }}
        bodyStyle={{
          padding: 0,
        }}
        onClick={() => {
          navigate(id);
          // openClickedStory(id);
        }}
      >
        <Row
          //   ref={ref}
          data-handler-id={handlerId}
          style={{ padding: 10, margin: 0 }}
          gutter={[10, 10]}
          align="bottom"
        >
          <Col span={24} style={{ height: "fit-content" }}>
            <h4>{name}</h4>
            {cardDetails && cardDetails.description.length > 1 && (
              <EllipsisMiddle suffixCount={12}>
                {cardDetails.description}
              </EllipsisMiddle>
            )}
          </Col>
          <Col span={12}>
            {cardDetails && cardDetails.labels.length >= 1 && (
              <Row gutter={[10, 10]}>
                {cardDetails.labels.map((label) => (
                  <Tag className="tag" color={label.color}>
                    &emsp;&emsp;
                  </Tag>
                ))}
              </Row>
            )}
          </Col>

          {cardDetails && cardDetails.assignees.length >= 1 && (
            <Col span={12}>
              <Row justify="end" gutter={[10, 10]}>
                <Avatar.Group>
                  {cardDetails.assignees.map((assignee) => (
                    <Avatar style={{ backgroundColor: "#f56a00" }}>
                      {assignee && String(assignee).charAt(0).toUpperCase()}
                    </Avatar>
                  ))}
                </Avatar.Group>
              </Row>
            </Col>
          )}
        </Row>
      </Card>
    </div>
  );
}

const EllipsisMiddle = ({ suffixCount, children }) => {
  const start = children.slice(0, children.length - suffixCount).trim();
  const suffix = children.slice(-suffixCount).trim();
  return (
    <Text style={{ maxWidth: "100%" }} ellipsis={{ suffix }}>
      {start}
    </Text>
  );
};
