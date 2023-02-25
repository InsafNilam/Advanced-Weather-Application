import React from "react";
import { useSignOut } from "react-auth-kit";
import styled from "styled-components";

import logo from "../images/logo.png";

function Header() {
  const signOut = useSignOut();

  const handleLogout = () => {
    signOut();
    window.location.pathname = "/";
  };

  return (
    <Container>
      <Wrap>
        <div>
          <img src={logo} alt="logo-icon" />
          <span>Weather App</span>
        </div>
        <div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </Wrap>
    </Container>
  );
}

const Container = styled.div`
  min-height: 10vh;
`;

const Wrap = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 20px calc(0.5vw + 5px) 20px;
  div:nth-child(1) {
    margin-left: 110px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    img {
      padding: 0 6px;
      align-self: center;
      width: 48px;
      object-fit: cover;
    }
    span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const Button = styled.button`
  align-items: center;
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  border-radius: 20px;
  border-style: none;
  color: #fff;
  cursor: pointer;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  justify-content: center;
  letter-spacing: 0.25px;
  padding: 12px;
  position: relative;
  text-align: center;

  &:before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    border-radius: 20px;
  }

  &:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    left: 0;
    top: 0;
    border-radius: 20px;
  }

  &:active {
    color: #000;
  }

  &:active:after {
    background: transparent;
  }

  &:hover:before {
    opacity: 1;
  }
`;

export default Header;
