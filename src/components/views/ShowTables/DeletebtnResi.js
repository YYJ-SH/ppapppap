import { Button, InputNumber, Image, message, Popconfirm } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { client2 } from "../../../constant/client";

const DeletebtnResi = ({ id }) => {
  const [confirmdisplay, setconfirmdisplay] = useState(false);
  const cancel = (e) => {
    setconfirmdisplay(true);
  };
  function removeid(id) {
    const token = localStorage.getItem("token");
    const headers = {
      //"Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    let body = {
      carnum: id,
    };
    console.log("carnum: ", id);
    console.log(body);
    client2
      .delete(`/api/residence/delete`, { headers: headers, data: body })

      .then((response) => {
        console.log(response);
        if (response.request.status === 200) {
          console.log(response.data);
        } else {
          alert("실패");
        }
      });
  }

  return (
    <>
      <Popconfirm
        title={`${id} 차량을 정기권에서 삭제합니다.`}
        onConfirm={() => {
          removeid(id);
          setconfirmdisplay(false);
          window.location.reload();
        }}
        onCancel={cancel}
        okText="삭제"
        cancelText="취소"
        display={confirmdisplay}
      >
        <Button type="primary" onClick={() => setconfirmdisplay(true)}>
          삭제
        </Button>
      </Popconfirm>
    </>
  );
};
export default DeletebtnResi;
