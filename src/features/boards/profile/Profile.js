import { Avatar, Col, PageHeader, Row, Form, Button, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import generateKey from "../../../helpers/generateKey";
import { getProfile, setProfile } from "../../../store/authActions";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Profile() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formDisabled, setFormDisabled] = useState(true);
  const profileState = useSelector((state) => state.auth.profile);

  const onFinish = (profile) => {
    profile["id"] = profileState.id;
    dispatch(setProfile(profile));
  };
  const onFinishFailed = () => {};

  useEffect(() => {
    if (!loading && user) {
      dispatch(getProfile(user.uid));
    }
  }, [user, loading]);

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
              ref={formRef}
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              initialValues={{ ...profileState }}
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
                <img
                  alt="user_img"
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                />
              }
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
