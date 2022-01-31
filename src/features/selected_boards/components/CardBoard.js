import { Card, Col, Row, Typography, Tag } from "antd";
import React from "react";
import { useDrag } from "react-dnd";

const { Text } = Typography;

export default function CardBoard() {
  const [cardProps, drag] = useDrag({
    type: "card",
    item: {},
  });
  return (
    <div ref={drag}>
      <Card
        hoverable
        bordered={false}
        style={{ margin: 10, borderRadius: "5px" }}
        bodyStyle={{ padding: 10 }}
        draggable={true}
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <h4>Start designing</h4>
            <EllipsisMiddle suffixCount={12}>
              In the process of internal desktop applications development, and
              reduce the efficiency of development.
            </EllipsisMiddle>
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
