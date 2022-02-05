import { Col, Divider, Empty, PageHeader, Row } from "antd";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
// import { createBoard } from '../../../store/boardActions';
import BoardCard from "../components/BoardCard";

export default function OwnedBoards() {
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
  const [ownBoards, setOwnBoards] = useState([]);

  useEffect(() => {
    if (user) {
      const boardsCopy = getStateBoards.map((board) => {
        return { ...board, ...dummyBoards };
      });
      setOwnBoards([
        ...boardsCopy
          .map((data) => {
            // console.log(data.owners);
            if (data.owners.includes(user.email)) {
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
      <PageHeader title="My boards" backIcon={null} />
      <Row
        justify={ownBoards.length === 0 ? "center" : "start"}
        gutter={[20, 20]}
      >
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
    </div>
  );
}
