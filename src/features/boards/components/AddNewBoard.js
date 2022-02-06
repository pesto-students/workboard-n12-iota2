import { Button, Col, Modal, Row, Input, Select, Empty } from "antd";
import React, { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { auth } from "../../../firebase-config";
import { createBoard, updateBoard } from "../../../store/boardActions";

import generateKey from "../../../helpers/generateKey";
import { useDispatch, useSelector } from "react-redux";

export default function AddNewBoard({ edit, boardDetails }) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const { Option } = Select;
  const children = useSelector((state) => state.team.members); //push the users in this array
  const createNewBoard = () => {};
  const [boardName, setBoardName] = useState(edit ? boardDetails.name : "");
  const [ownerMembers, setOwnerMembers] = useState([]);
  const [viewerMembers, setViewerMembers] = useState([]);
  const [editorMembers, setEditorMembers] = useState([]);

  const closeModal = () => {
    setBoardName("");
    setOwnerMembers([]);
    setViewerMembers([]);
    setEditorMembers([]);
    setModalVisible(false);
  };
  console.log(children);
  const updateBoardFunctionForAction = () => {
    closeModal();
    const updateDate = String(new Date().toLocaleDateString());
    const board = {
      id: boardDetails.id,
      name: boardName,
      backImg:
        "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      owners: [...boardDetails.owners, ...ownerMembers],
      editors: [...boardDetails.editors, ...editorMembers],
      viewers: [...boardDetails.viewers, ...viewerMembers],
      members: [
        ...boardDetails.members,
        ...ownerMembers,
        ...editorMembers,
        ...viewerMembers,
      ],
      createdOn: boardDetails.createdOn,
      lastUpdatedOn: updateDate,
      stages: boardDetails.stages,
      stories: boardDetails.stories,
    };
    dispatch(updateBoard(board));
  };

  const createBoardFunctionForAction = () => {
    closeModal();
    const creationDate = String(new Date().toLocaleDateString());
    const board = {
      id: generateKey(),
      name: boardName,
      backImg:
        "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      owners: [auth.currentUser.email, ...ownerMembers],
      editors: editorMembers,
      viewers: viewerMembers,
      members: [
        ...ownerMembers,
        ...editorMembers,
        ...viewerMembers,
        auth.currentUser.email,
      ],
      createdOn: creationDate,
      lastUpdatedOn: creationDate,
      stages: [],
      stories: [],
    };
    console.log(board);
    dispatch(createBoard(board));
  };
  return (
    <>
      <p onClick={() => setModalVisible(true)} style={{ margin: 0 }}>
        {edit ? "Edit board" : "Create new board"}
      </p>
      <Modal
        title={edit ? `Edit ${boardDetails.name}` : "Create new board"}
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        bodyStyle={{ borderRadius: 15 }}
      >
        <Row gutter={[20, 20]} justify="center">
          <Col span={18}>
            <label>Board name</label>
            <Input
              placeholder="Enter board name"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
          </Col>
          <Col span={18}>
            <label>Owners</label>
            <Select
              mode="tags"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please enter or select members to add."
              value={ownerMembers}
              onChange={(value) => setOwnerMembers(value)}
              notFoundContent={<Empty description="No users found" />}
            >
              {children &&
                children.map((child) => (
                  <Select.Option key={child}>{child}</Select.Option>
                ))}
            </Select>
          </Col>
          <Col span={18}>
            <label>Editors</label>
            <Select
              mode="tags"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please enter or select members to add."
              value={editorMembers}
              onChange={(value) => setEditorMembers(value)}
              notFoundContent={<Empty description="No users found" />}
            >
              {children &&
                children.map((child) => (
                  <Select.Option key={child}>{child}</Select.Option>
                ))}
            </Select>
          </Col>
          <Col span={18}>
            <label>Viewers</label>
            <Select
              mode="tags"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please enter or select members to add."
              value={viewerMembers}
              onChange={(value) => setViewerMembers(value)}
              notFoundContent={<Empty description="No users found" />}
            >
              {children &&
                children.map((child) => (
                  <Select.Option key={child}>{child}</Select.Option>
                ))}
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
                  onClick={
                    edit
                      ? updateBoardFunctionForAction
                      : createBoardFunctionForAction
                  }
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
