import { Button, Col, Menu, Modal, Row, Input, Select } from "antd";
import React, { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";

export default function AddNewBoard() {
  const [modalVisible, setModalVisible] = useState(false);
  const { Option } = Select;
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
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
        <Row justify="center">
          <Col span={18}>
            <Input placeholder="Enter board name" />
          </Col>
          <Col span={18}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              defaultValue={["a10", "c12"]}
              onChange={handleChange}
            >
              {children}
            </Select>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
