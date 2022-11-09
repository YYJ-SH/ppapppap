import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import axios from "axios";
import { client2 } from "../../../constant/client";

function ShowMyinfo() {
  const token = localStorage.getItem("token");
  const headers = {
    //"Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  const [mydata, setMydata] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      client2.get("/api/user", { headers: headers }).then((response) => {
        if (response.request.status === 200) {
          console.log("받아왔지롱");
          console.log("res::", response);

          setMydata([response.data]);
        } else {
          alert("주차장 정보를 불러오는데 실패했습니다.");
        }
      });

      // client2.get("/api/user", { headers: headers });
      // setData(Response.data);
      // console.log(Response.data)
      // setLoading(false);
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "내 닉네임",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "내 이름",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "내 이메일",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "내 회사",
      dataIndex: "company",
      key: "company",
    },

    {
      title: "내 전화번호",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "내 등급",
      dataIndex: "authorityDtoSet",
      key: "authorityDtoSet",

      // render:(text, record) => (<>{text.map(v => v.authority_name  )}</>),
      render: (text, record) => (
        <>
          {text.map((v) => (
            <p style={{ marginBottom: 0 }}>
              {v.authority_name.replace("ROLE_", "")}
            </p>
          ))}
        </>
      ),
    },
    {
      title: "내 주차장",
      dataIndex: "parkingDtoSet",
      key: "parkingDtoSet",

      render: (text, record) => <>{text.map((v) => v.parkname)}</>,
    },
    {
      title: "내 주차장 주소",
      dataIndex: "parkingDtoSet",
      key: "parkingDtoSet",

      render: (text, record) => <>{text.map((v) => v.building)}</>,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={mydata}
        pagination={{
          position: ["none", "bottomCenter"],
        }}
      />
      <a href="/onemorelogin">내 정보 수정하기</a>
      <Button
        onClick={() => {
          client2
            .delete("/api/user/delete", { headers: headers })
            .then((response) => {
              if (response.request.status === 200) {
                alert("회원탈퇴가 완료되었습니다.");
                localStorage.removeItem("token");
                window.location.href = "/login";
              } else {
                alert("회원탈퇴에 실패했습니다.");
              }
            });
        }}
      >
        탈퇴하기
      </Button>
    </>
  );
}

export default ShowMyinfo;
