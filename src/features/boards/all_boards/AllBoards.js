import { Col, Divider, Empty, PageHeader, Row } from "antd";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
// import { createBoard } from '../../../store/boardActions';
import BoardCard from "../components/BoardCard";

export default function AllBoards() {
  // const dispatch = useDispatch();       //execute dispatch(createBoard()); to create a new board and more.
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
  const [ownBoards, setOwnBoards] = useState([]);
  const [allBoards, setAllBoards] = useState([]);

  useEffect(() => {
    setAllBoards(
      getStateBoards.map((board) => {
        return { ...board, ...dummyBoards };
      })
    );
    setSharedBoards(
      allBoards
        .map((data) => {
          if (
            data.viewers.includes(user.uid) ||
            data.editors.includes(user.uid)
          ) {
            return data;
          }
        })
        .filter((data) => data)
    );
    setOwnBoards(
      allBoards
        .map((data) => {
          if (data.owners.includes(user.uid)) {
            return data;
          }
          return undefined;
        })
        .filter((data) => data)
    );
  }, [getStateBoards]);

  return (
    <div>
      <PageHeader title="Recent boards" backIcon={null} />
      <Row gutter={[20, 20]}>
        {allBoards.map((board) => (
          <Col key={board.id} xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <BoardCard {...board} />
          </Col>
        ))}
      </Row>
      <Divider />

      <PageHeader title="My boards" backIcon={null} />
      <Row justify="center" gutter={[20, 20]}>
        {ownBoards.map((data, idx) => (
          <Col
            key={`ownBoard${idx}`}
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
        {ownBoards.length === 0 && (
          <Empty description="You do not own any boards" />
        )}
      </Row>
      <Divider />

      <PageHeader title="Shared with me" backIcon={null} />
      <Row justify="center" gutter={[20, 20]}>
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
