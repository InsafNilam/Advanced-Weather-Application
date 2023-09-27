import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { checkValidity } from "../utils/weatherAPI";

import Error from "../images/error.png";
import jwtExpiry from "../images/jwt_expiry.png";
import error from "../images/load_error.png";

function PageNotFound() {
  const [expiryOpen, setExpiry] = useState(false);
  const signOut = useSignOut();

  const validity = checkValidity();
  const expirationTime = validity.exp * 1000 - 60000;

  const handleExpiryOpen = () => {
    setExpiry(true);
  };
  const handleExpiryClose = () => {
    setExpiry(false);
    signOut();
    window.location.pathname = "/";
  };

  if (Date.now() >= expirationTime) {
    handleExpiryOpen();
  }

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
        <Link to="/home">
          <button>Dashboard</button>
        </Link>
      </ButtonGroup>
      <Dialog
        open={expiryOpen}
        onClose={handleExpiryClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <img src={error} width={60} alt="error-icon" />
          JWT EXPIRY ERROR
        </DialogTitle>
        <DialogContent>
          <img src={jwtExpiry} width={500} alt="jwt-error-icon" />
          <DialogContentText
            id="alert-dialog-description"
            style={{
              textAlign: "center",
              margin: "10px",
              color: "#d0312d",
              fontSize: "30px",
            }}
          >
            JWT TOKEN INVALID
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExpiryClose}>OK</Button>
        </DialogActions>
      </Dialog>
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
