import { Avatar, Col, PageHeader, Row, Form, Button, Input } from "antd";
import React, { useState } from "react";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

export default function Profile() {
  const [form] = Form.useForm();
  const [formDisabled, setFormDisabled] = useState(true);
  const onFinish = () => {};
  const onFinishFailed = () => {};
  return (
    <Row>
      <Col xs={24} sm={24} md={20} lg={18} xl={18}>
        <PageHeader
          className="site-page-header"
          title="My Profile"
          extra={<EditOutlined onClick={() => setFormDisabled(false)} />}
        />
      </Col>
      <Col xs={24} sm={24} md={20} lg={18} xl={18}>
        <Row
          style={{ flexFlow: "wrap-reverse" }}
          justify="center"
          align="middle"
          gutter={[20, 20]}
        >
          <Col xs={24} sm={24} md={12} lg={10} xl={14}>
            <Form
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              initialValues={{ displayName: "John doe" }}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Display Name"
                name="displayName"
                rules={[
                  {
                    required: true,
                    message: "Please input your display name!",
                  },
                ]}
              >
                <Input disabled={formDisabled} />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input disabled={formDisabled} />
              </Form.Item>
              <Form.Item
                label="Designation"
                name="designation"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input disabled={formDisabled} />
              </Form.Item>
              <Form.Item
                label="Organization"
                name="organization"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input disabled={formDisabled} />
              </Form.Item>

              {!formDisabled && (
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    style={{ borderRadius: 5, margin: "0 10px 0 0" }}
                    disabled={formDisabled}
                    type="ghost"
                    onClick={() => setFormDisabled(true)}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={formDisabled}
                    className="primary_button"
                    style={{ color: "white" }}
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Form.Item>
              )}
            </Form>
          </Col>
          <Col xs={18} sm={20} md={10} lg={7} xl={6}>
            <Avatar
              style={{ width: "100%", height: "100%" }}
              icon={
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
              }
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
