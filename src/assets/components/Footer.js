import React from "react";
import styled from "styled-components";

function Footer() {
  return <Container>2023 | Loons Lab</Container>;
}

export default Footer;

const Container = styled.div`
  background-color: #30333d;
  color: #6a6c72;
  font-size: 16px;
  line-height: 30px;
  position: fixed;
  padding: 12px 0;
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;
  z-index: 1;
`;
