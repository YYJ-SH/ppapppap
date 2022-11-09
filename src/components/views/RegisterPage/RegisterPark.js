import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterPark.css";
import { client2 } from "../../../constant/client";
import { MainContainer } from "../LoginPage/LoginPage";
import styled from "styled-components";

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

// let Form = styled.div`
//   width: 100%;
//   margin-left: 10%;
//   `;
function RegisterPark() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const token = localStorage.getItem("token");
    const headers = {
      //"Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };

    client2
      .post("/api/inputParking", values, { headers: headers })
      .then((response) => {
        if (response.request.status === 200) {
          alert("주차장 등록 성공");
          navigate("/referencepark");
        } else if (response.request.status === 401) {
          alert("토큰이 만료되었습니다. 재 로그인 해주세요.");
          navigate("/login");
        } else if (response.request.status === 403) {
          alert("권한이 없습니다. 관리자에게 문의하세요.");
          navigate("/");
        } else if (response.request.status === 500) {
          alert("서버 오류입니다. 다시 시도하세요.");
        } else if (response.request.status === 404) {
          alert("없는 페이지입니다.");
          navigate("*");
        } else {
          alert(
            "알 수 없는 오류입니다. 다시 시도하거나 관리자에게 연락하세요."
          );
        }
      })
      .catch((error) => {
        console.log(error);
        alert("알 수 없는 오류입니다. 다시 시도하거나 관리자에게 연락하세요.");
      });
  };

  // useEffect(()=>{
  //     fetch("/api/signup")
  //         .then((res)=>{
  //           return res.json();
  //         })
  //         .then((data)=>{
  //             console.log(data);
  //         });
  //   },[]);

  const StyledDiv = styled(MainContainer)`
    width: calc(100% - 500px);
    height: auto;

    margin: 50px auto;
  `;

  const StyledFormItem = styled(Form.Item)`
    width: 400px;
  `;

  return (
    <StyledDiv>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form
          layout="vertical"
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          style={{ marginTop: 100 }}
        >
          <h2>주차장 등록하기</h2>
          <StyledFormItem
            name="parkname"
            label="주차장 이름"
            rules={[
              {
                type: "text",
                message: "주차장 이름을 입력해주세요!",
              },
              {
                required: true,
                message: "주차장 이름을 적어주세요.",
              },
            ]}
          >
            <Input />
          </StyledFormItem>

          {/* <StyledFormItem
        name="password"
        label="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </StyledFormItem>

      <StyledFormItem
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </StyledFormItem> */}

          <StyledFormItem
            name="building"
            label="건물명"
            tooltip="건물명을 입력해주세요."
            rules={[
              {
                required: true,
                message: "건물명을 입력해주세요",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </StyledFormItem>

          <StyledFormItem
            name="address"
            label="주소"
            tooltip="주소를 입력해주세요."
            rules={[
              {
                required: true,
                message: "주소를  입력해주세요",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </StyledFormItem>
          <StyledFormItem
            name="freetime"
            label="무료 주차 시간"
            tooltip="무료 주차 시간을 입력해주세요."
            rules={[
              {
                type: "text",
                message: "숫자로 입력해주세요!",
              },
              {
                required: true,
                message: "무료 주차 시간을 입력해주세요",
                // whitespace: false,
              },
            ]}
          >
            <Input />
          </StyledFormItem>

          <StyledFormItem
            name="enablearea"
            label="주차 가용 공간"
            tooltip="주차 가용 공간을 입력해주세요."
            rules={[
              {
                type: "long",
                message: "숫자로 입력해주세요!",
              },
              {
                required: true,
                message: "무료 주차 시간을 입력해주세요",
                // whitespace: false,
              },
            ]}
          >
            <Input />
          </StyledFormItem>
          <StyledFormItem
            name="baserate"
            label="기본요금"
            tooltip="기본 요금을 입력해주세요."
            rules={[
              {
                type: "double",
                message: "숫자로 입력해주세요!",
              },
              {
                required: true,
                message: "기본요금을 입력해주세요",
                // whitespace: false,
              },
            ]}
          >
            <Input />
          </StyledFormItem>

          <StyledFormItem
            name="eleccharger"
            label="전기차 충전기(대)"
            tooltip="전기차를 입력해주세요."
            rules={[
              {
                type: "Number",
              },
              {
                required: false,
              },
            ]}
          >
            <Input />
          </StyledFormItem>

          <StyledFormItem
            name="starttime"
            label="운영 시간"
            tooltip="운영 시간을 입력해주세요."
            rules={[
              {
                type: "date",
                message: "숫자로 입력해주세요!",
              },
              {
                required: true,
                message: "운영시작 시간을 입력해주세요",
                // whitespace: false,
              },
            ]}
          >
            <Input placeholder="yyyy-mm-dd" />
          </StyledFormItem>

          <StyledFormItem
            name="allarea"
            label="주차공간(대)"
            tooltip="전체 주차 가능한 공간의 개수를 입력해주세요"
            rules={[
              {
                type: "Number",
              },
              {
                required: true,
                // message: '전체 주차공간을 입력해주세요',
                // whitespace: false,
              },
            ]}
          >
            <Input />
          </StyledFormItem>

          <StyledFormItem
            name="endtime"
            label="운영종료시간(시)"
            tooltip="운영종료시간을 입력해주세요"
            rules={[
              {
                type: "date",
                message: "00시 형식으로 입력해주세요!",
              },
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="yyyy-mm-dd 형식으로 입력해주세요" />
          </StyledFormItem>

          {/* <StyledFormItem
        name="phone"
        label="phone"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
         
          style={{
            width: '100%',
          }}
        />
      </StyledFormItem> */}

          <StyledFormItem
            {...tailFormItemLayout}
            style={{ marginLeft: "-135px" }}
          >
            <Button type="primary" htmlType="submit" block>
              edit
            </Button>
          </StyledFormItem>
        </Form>
      </div>
    </StyledDiv>
  );
}
export default RegisterPark;
