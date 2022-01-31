import { Col, Divider, PageHeader, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBoard } from '../../../store/boardActions';
import BoardCard from "../components/BoardCard";

export default function AllBoards() {
  const dispatch = useDispatch();       //execute dispatch(createBoard()); to create a new board and more.
  const dummyBoards = {
      coverImg:
        "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      isShared: true,
      lastUpdatedOn: String(new Date().toLocaleDateString()),
    };

  const [allBoards, setAllBoards] = useState([]);
  const getStateBoards = useSelector((state) => state.boards.boards);
  useEffect(()=> {
    if(getStateBoards) {
      const allStateBoards = getStateBoards.map((board) => {return {...board, ...dummyBoards}});
      setAllBoards([...allStateBoards]);
    }
  },[getStateBoards]);

   return (
    <div>
      <PageHeader title="Recent boards" backIcon={null} />
      <Row gutter={[20, 20]}>
        {allBoards.map((data) => (
          <Col key={data.id} xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <BoardCard {...data} />
          </Col>
        ))}
      </Row>
      <Divider />

      <PageHeader title="My boards" backIcon={null} />
      <Row gutter={[20, 20]}>
        {allBoards.map((data) => (
          <Col key={data.id} xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <BoardCard {...data} />
          </Col>
        ))}
      </Row>
      <Divider />

      <PageHeader title="Shared with me" backIcon={null} />
      <Row gutter={[20, 20]}>
        {allBoards.map((data) => (
          <Col key={data.id} xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <BoardCard {...data} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
