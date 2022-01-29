import { Col, Divider, PageHeader, Row } from "antd";
import React, { useState, useEffect } from "react";
import { db } from '../../../firebase-config';
import { collection, getDocs } from "firebase/firestore";
import BoardCard from "../components/BoardCard";

export default function AllBoards() {
  const [allBoards, setAllBoards] = useState([
    {
      coverImg:
        "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      isShared: true,
      lastUpdatedOn: String(new Date().toLocaleDateString()),
    }
  ]);
  useEffect( async () => {
    const dataCollectionRef = collection(db, "board");
    const data = await getDocs(dataCollectionRef);
    const getBoards = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const updateData = getBoards[0];
    setAllBoards((allBoards) => [{...allBoards[0], ...updateData}])
  }, []);


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
