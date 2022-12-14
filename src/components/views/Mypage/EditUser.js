import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Select,
} from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { client2 } from "../../../constant/client";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const token = localStorage.getItem("token");
  const [userdata, setUserdata] = useState([]);
  const headers = {
    //"Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  const onFinish = (values) => {
    fetchData();

    delete values.confirm;

    if (values.company === undefined || values.company === "") {
      values.company = userdata.company;
    }
    if (values.email === undefined || values.email === "") {
      values.email = userdata.email;
    }
    if (values.nickname === undefined || values.nickname === "") {
      values.nickname = userdata.nickname;
    }
    if (values.phone === undefined || values.phone === "") {
      values.phone = userdata.phone;
    }
    console.log("Received values of form: ", values);

    client2
      .put("/api/update/username", values, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        if (response.request.status === 200) {
          alert("정보가 수정되었습니다.");
          window.location.href = "/";
        } else {
          alert("정보수정 실패");
        }
      });
  };

  const fetchData = () => {
    client2.get("/api/user", { headers: headers }).then((response) => {
      if (response.request.status === 200) {
        console.log("받아왔지롱");
        console.log(response.data);

        setUserdata(response.data);
      } else {
        alert("주차장 정보를 불러오는데 실패했습니다.");
      }
    });

    // client2.get("/api/user", { headers: headers });
    // setData(Response.data);
    // console.log(Response.data)
    // setLoading(false);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      style={{ marginTop: 100, float: "left", marginLeft: 100 }}
    >
      <Form.Item
        name="email"
        label="email"
        rules={[
          {
            type: "email",
            message: "올바른 이메일 형식으로 입력해주세요.",
          },
          {
            required: false,
            message: "수정하실 이메일을 입력해주세요.",
          },
        ]}
      >
        <Input placeholder="수정된 이메일" />
      </Form.Item>

      <Form.Item
        name="nickname"
        label="이름"
        tooltip="성함은 두 자 이상 입력해주세요."
        rules={[
          {
            required: false,
            message: "성함을 입력해주세요",
          },
        ]}
      >
        <Input placeholder="개명 시 입력" />
      </Form.Item>

      <Form.Item
        name="company"
        label="company"
        tooltip="회사명을 입력해주세요"
        rules={[
          {
            required: false,
            message: "회사명을 입력해주세요.",
          },
        ]}
      >
        <Input placeholder="수정된 회사" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="전화번호"
        rules={[
          {
            required: false,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input
          style={{
            width: "100%",
          }}
          placeholder="수정된 전화번호"
        />
      </Form.Item>

      <Form.Item
        name="new_password"
        label="수정된 비밀번호"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="수정된 비밀번호" />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="비밀번호 재확인"
        dependencies={["new_password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("new_password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}
export default Register;
