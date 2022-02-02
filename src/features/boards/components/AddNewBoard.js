import { Button, Col, Menu, Modal, Row, Input, Select } from "antd";
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { SettingOutlined } from "@ant-design/icons";

import { createBoard } from "../../../store/boardActions";

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
  const createNewBoard = () => {};

  const [boardName, setBoardName] = useState("");
  const [boardMembers, setBoardMembers] = useState([]);

  const createTheBoardFunction = () => {
    const newBoard = {
      name: boardName,
      members: boardMembers,
      owner: "master",
      stages: [],
      stories: [],
    }
    dispatch(createBoard(newBoard));
  }
  return (
    <>
      <p onClick={() => setModalVisible(true)} style={{ margin: 0 }}>
        Create new board
      </p>
      <Modal
        title="Create new board"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        bodyStyle={{ borderRadius: 15 }}
      >
        <Row gutter={[20, 20]} justify="center">
          <Col span={18}>
            <Input placeholder="Enter board name" onChange={(e) => setBoardName(e.target.value)} />
          </Col>
          <Col span={18}>
            <Select
              mode="tags"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={(members) => setBoardMembers(members)}
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
                  onClick={() => setModalVisible(false)}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button
                  className="primary_button"
                  style={{ color: "white" }}
                  onClick={createTheBoardFunction}
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
