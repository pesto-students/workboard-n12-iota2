import { Button, Col, Menu, Modal, Row, Input, Select } from "antd";
import React, { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { createBoard } from "../../../store/boardActions";

import generateKey from "../../../helpers/generateKey";
import { useDispatch } from "react-redux";

export default function AddNewBoard() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const { Option } = Select;
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }
  const createNewBoard = () => { };
  const [boardName, setBoardName] = useState("");
  const [members, setMembers] = useState([]);

  const closeModal = () => {
    console.log("fire me");
    setBoardName("");
    setMembers([]);
    setModalVisible(false);
  }



  const createBoardFunctionForAction = () => {
    closeModal();
    const creationDate = String(new Date().toLocaleDateString());
    const board = {
      id: generateKey(boardName),
      name: boardName,
      backImg: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      owners: members,
      editors: members,
      viewers: members,
      createdOn: creationDate,
      lastUpdatedOn: creationDate,
      stages: [],
      stories: [],
    };
    dispatch(createBoard(board));
  }
  return (
    <>
      <p onClick={() => setModalVisible(true)} style={{ margin: 0 }}>
        Create new board
      </p>
      <Modal
        title="Create new board"
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        bodyStyle={{ borderRadius: 15 }}
      >
        <Row gutter={[20, 20]} justify="center">
          <Col span={18}>
            <Input placeholder="Enter board name" value={boardName} onChange={(e) => setBoardName(e.target.value)} />
          </Col>
          <Col span={18}>
            <Select
              mode="tags"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select members to add."
              value={members}
              onChange={(value) => setMembers(value)}
            >
              {children}
            </Select>
          </Col>
          <Col span={24}>
            <Row gutter={[10, 10]} justify="end">
              <Col>
                <Button
                  type="ghost"
                  style={{ borderRadius: "5px" }}
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button
                  className="primary_button"
                  style={{ color: "white" }}
                  onClick={createBoardFunctionForAction}
                >
                  Create
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
