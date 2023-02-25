import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Error from "../images/error.png";

function PageNotFound() {
  return (
    <Container>
      <Content>
        <ImageWrapper src={Error} />
        <h2>PAGE NOT FOUND</h2>
        <span>
          The page you are looking for might have been removed had its name
        </span>
        <span>changed or is temporarily unavailable.</span>
      </Content>
      <ButtonGroup>
        <Link to="/">
          <button>Dashboard</button>
        </Link>
      </ButtonGroup>
    </Container>
  );
}

const Container = styled.main`
  min-height: calc(100vh);
  padding: 60px calc(3.5vw + 5px) 0px;
  overflow-x: hidden;
`;

const Content = styled.div`
  margin: 50px 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.img`
  width: 50%;
  height: fit-content;
  filter: drop-shadow(0 0 0.75rem crimson);
  object-fit: cover;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    align-items: center;
    background-color: #fff;
    border-radius: 24px;
    border-style: none;
    box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
      rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
    color: #3c4043;
    cursor: pointer;
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    height: 48px;
    justify-content: center;
    letter-spacing: 0.25px;
    max-width: 100%;
    padding: 2px 24px;
    position: relative;
    text-align: center;
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    width: auto;

    &:hover {
      background: #f6f9fe;
      color: #174ea6;
    }
  }
`;

export default PageNotFound;
