/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Empty, PageHeader, Row } from "antd";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
// import { createBoard } from '../../../store/boardActions';
import BoardCard from "../components/BoardCard";
export default function SharedBoards() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const dummyBoards = {
    coverImg:
      "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    isShared: true,
    lastUpdatedOn: String(new Date().toLocaleDateString()),
  };

  const getStateBoards = useSelector((state) => state.boards.boards);
  const [sharedBoards, setSharedBoards] = useState([]);

  useEffect(() => {
    if (user) {
      const boardsCopy = getStateBoards.map((board) => {
        return { ...board, ...dummyBoards };
      });
      setSharedBoards([
        ...boardsCopy
          .map((data) => {
            if (
              data.viewers.includes(user.email) ||
              data.editors.includes(user.email)
            ) {
              return data;
            }
            return undefined;
          })
          .filter((data) => data),
      ]);
    }
  }, [getStateBoards, user]);

  return (
    <div>
      <PageHeader title="Shared with me" backIcon={null} />
      <Row
        justify={sharedBoards.length === 0 ? "center" : "start"}
        gutter={[20, 20]}
      >
        {sharedBoards.map((data, idx) => (
          <Col
            key={`sharedBoard${idx}`}
            xs={24}
            sm={24}
            md={12}
            lg={8}
            xl={6}
            xxl={4}
          >
            <BoardCard {...data} />
          </Col>
        ))}
        {sharedBoards.length === 0 && (
          <Empty description="You do not have any shared boards" />
        )}
      </Row>
    </div>
  );
}
