import { Button, Result } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledResult = styled(Result)`
    .ant-result-image > svg{
        display:none;
    }
    .ant-result-image {
        position:relative;
    }
    .ant-result-image::after {
        content:"";
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
        background:url(https://i.pinimg.com/564x/19/39/74/193974c418898026450c7b6eb5852fa4.jpg) no-repeat center center;
         
        
    }
`
const Forbidden = () => (
    <>
  <StyledResult
    status="500"
    title="403"
    subTitle="권한이 없습니다."
    extra={localStorage.getItem('token') ? <Button type="primary" href='/'>메인화면으로</Button> : <Button type="primary" href='/login'>로그인</Button>}
     
    />
  </>
);
export default Forbidden;