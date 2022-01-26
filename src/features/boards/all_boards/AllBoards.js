import { Card, Col, Divider, Dropdown, Menu, PageHeader, Row } from "antd";
import React from "react";
import BoardCard from "../components/BoardCard";

export default function AllBoards() {
  const allBoards = [
    {
      name: "My personal board",
      coverImg:
        "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      isShared: true,
      lastUpdatedOn: String(new Date().toLocaleDateString()),
    },
    {
      name: "My personal board",
      coverImg:
        "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      isShared: true,
      lastUpdatedOn: String(new Date().toLocaleDateString()),
    },
    {
      name: "My personal board",
      coverImg:
        "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      isShared: true,
      lastUpdatedOn: String(new Date().toLocaleDateString()),
    },
    {
      name: "My personal board",
      coverImg:
        "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      isShared: true,
      lastUpdatedOn: String(new Date().toLocaleDateString()),
    },
    {
      name: "My personal board",
      coverImg:
        "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      isShared: true,
      lastUpdatedOn: String(new Date().toLocaleDateString()),
    },
  ];
  return (
    <div>
      <PageHeader title="Recent boards" backIcon={null} />
      <Row>
        {allBoards.map((data) => (
          <Col span={4}>
            <BoardCard {...data} />
          </Col>
        ))}
      </Row>
      <Divider />

      <PageHeader title="My boards" backIcon={null} />
      <Row>
        {allBoards.map((data) => (
          <Col span={4}>
            <BoardCard {...data} />
          </Col>
        ))}
      </Row>
      <Divider />

      <PageHeader title="Shared with me" backIcon={null} />
      <Row>
        {allBoards.map((data) => (
          <Col span={4}>
            <BoardCard {...data} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
