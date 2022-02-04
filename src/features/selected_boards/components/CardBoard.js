import { Card, Col, Row, Typography, Tag } from "antd";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useNavigate } from "react-router";

const { Text } = Typography;

export default function CardBoard({ name, description, index, moveCard, id }) {
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
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
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
        style={{ margin: 10, borderRadius: "5px", cursor: "pointer" }}
        bodyStyle={{ padding: 0 }}
        onClick={() => navigate(id)}
      >
        <Row
          //   ref={ref}
          data-handler-id={handlerId}
          style={{ padding: 10, margin: 0 }}
          gutter={[10, 10]}
        >
          <Col span={24}>
            <h4>{name}</h4>
            <EllipsisMiddle suffixCount={12}>{description}</EllipsisMiddle>
          </Col>
          <Col span={24}>
            <Row gutter={[10, 10]}>
              <Tag className="tag" color="#f50">
                &emsp;&emsp;
              </Tag>
              <Tag className="tag" color="#2db7f5">
                &emsp;&emsp;
              </Tag>
              <Tag className="tag" color="#87d068">
                &emsp;&emsp;
              </Tag>
              <Tag className="tag" color="#108ee9">
                &emsp;&emsp;
              </Tag>
            </Row>
          </Col>
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
