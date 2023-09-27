import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSignOut } from "react-auth-kit";

import Header from "../components/Header";
import { monthDict } from "../utils/utils";
import { checkValidity } from "../utils/weatherAPI";

import jwtExpiry from "../images/jwt_expiry.png";
import error from "../images/load_error.png";
import back from "../images/back.png";
import arrow from "../images/arrow.png";

function ViewWeather() {
  const [visibleItemCount, setVisibleItemCount] = useState(4); // initially show 3 items
  const [expiryOpen, setExpiry] = useState(false);
  const signOut = useSignOut();

  const handleExpiryOpen = () => {
    setExpiry(true);
  };
  const handleExpiryClose = () => {
    setExpiry(false);
    signOut();
    window.location.pathname = "/";
  };

  const handleViewMoreClick = () => setVisibleItemCount(8); // show all more items when button is clicked

  const validity = checkValidity();
  const expirationTime = validity.exp * 1000 - 60000;

  const location = useLocation();
  const navigate = useNavigate();
  const props = location.state;

  const handleBack = () => navigate(-1); // This will navigate back to the previous page in the history

  if (Date.now() >= expirationTime) {
    handleExpiryOpen();
  }

  return (
    <Container key={props.key}>
      <Header />
      <Wrap>
        <div>
          <Primary style={{ backgroundColor: props.bgColor }}>
            <BackIcon>
              <img
                src={back}
                onClick={handleBack}
                style={{ width: "20px", cursor: "pointer" }}
                alt={"back-icon"}
              />
              <ButtonGroup>
                {visibleItemCount < 8 && (
                  <button onClick={handleViewMoreClick}>+</button>
                )}
                {visibleItemCount === 8 && (
                  <button onClick={() => setVisibleItemCount(4)}>+</button>
                )}
              </ButtonGroup>
            </BackIcon>
            <div>
              <h2>{props.data.timezone}</h2>
              <p>{props.time}</p>
            </div>
            <Temperature>
              <LeftDesc>
                <div
                  style={{
                    marginRight: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    alt="weather-icon"
                    src={`http://openweathermap.org/img/w/${props.data.current.weather[0].icon}.png`}
                    style={{
                      margin: 8,
                    }}
                  />
                  <p>{props.data.current.weather[0].main}</p>
                </div>
              </LeftDesc>
              <RightDesc>
                <div
                  style={{
                    marginLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h1>{props.data.current.temp}°c</h1>
                  <p>Temp Min: {props.data.daily[0].temp.min}°c</p>
                  <p>Temp Max: {props.data.daily[0].temp.max}°c</p>
                </div>
              </RightDesc>
            </Temperature>
          </Primary>
          <Secondary>
            <div>
              <p>
                <b>Pressure:</b> {props.data.current.pressure}hPa
              </p>
              <p>
                <b>Humidity:</b> {props.data.current.humidity}%
              </p>
              <p>
                <b>Visibility:</b> {props.data.current.visibility / 1000}km
              </p>
            </div>
            <div>
              <img
                src={arrow}
                alt={"wind-dir-arrow"}
                style={{
                  width: 24,
                  transform: `rotate(${props.data.current.wind_deg}deg)`,
                }}
              />
              <h5>
                {props.data.current.wind_speed}m/s {props.data.current.wind_deg}{" "}
                Degree
              </h5>
            </div>
            <div>
              <p>
                <b>Sunrise:</b>{" "}
                {new Date(
                  props.data.current.sunrise * 1000
                ).toLocaleTimeString()}
              </p>
              <p>
                <b>Sunset:</b>{" "}
                {new Date(
                  props.data.current.sunset * 1000
                ).toLocaleTimeString()}
              </p>
            </div>
          </Secondary>
        </div>
        <div>
          <InterMediary style={{ backgroundColor: props.bgColor }}>
            {props.data.daily.slice(0, visibleItemCount).map(
              (data, index) =>
                index > 0 && (
                  <div
                    style={{
                      background: "#000",
                      borderRadius: "12px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "8px",
                      minWidth: "80px",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: "12px" }}>
                      {new Date(data.dt * 1000).getDate()}{" "}
                      {monthDict[new Date(data.dt * 1000).getMonth()]}
                    </p>
                    <img
                      style={{ width: "40px" }}
                      alt="weather-icon"
                      src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                    />
                    <p style={{ margin: 0, fontSize: "12px" }}>
                      {Math.round(data.temp.min)}°c ~{" "}
                      {Math.round(data.temp.max)}
                      °c
                    </p>
                  </div>
                )
            )}
          </InterMediary>
        </div>
      </Wrap>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-height: calc(100vh - 60px);

  @media (max-width: 960px) {
    margin: 0 10px;
  }
`;

const Wrap = styled.div`
  margin: 0 auto;
  min-width: 700px;
  max-width: 960px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: max-content;
`;

const Primary = styled.div`
  padding-bottom: 12px;
  position: relative;
  border-top-left-radius: 5px;
  color: white;
  text-align: center;

  div {
    p {
      font-size: 12px;
    }
    h2,
    p {
      margin: 8px 0;
    }
  }
`;

const BackIcon = styled.div`
  display: flex;
  padding: 8px 12px 0;
  text-align: start;
  justify-content: space-between;
`;
const InterMediary = styled.div`
  height: 100%;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #fbfbfb;
  display: flex;
  margin-bottom: 8px,
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #7e90a5;
  text-align: center;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
`;

const Secondary = styled.div`
  padding: 40px 0px;
  border-bottom-left-radius: 5px;
  text-align: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: max-content;
  grid-gap: 12px;
  background-color: #383b47;
  color: white;

  div {
    p {
      font-size: 14px;
      margin: 5px 0;
    }
  }
  div:nth-child(1) {
    padding: 0 0 0 calc(8vw);
    p {
      text-align: start;
    }
    @media (max-width: 550px) {
      padding: 0 0 0 10px;
    }
  }
  div:nth-child(2) {
    border-right: 1px solid white;
    border-left: 1px solid white;
  }
  div:nth-child(3) {
    padding: 0 calc(10vw) 0 0;
    p {
      text-align: end;
    }
    @media (max-width: 620px) {
      padding: 0 10px 0 0;
    }
  }
`;

const Temperature = styled.div`
  margin: 30px 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: max-content;
`;

const LeftDesc = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  border-right: 1px solid white;
  div {
    p {
      margin: 5px 0;
      font-size: 15px;
    }
  }
`;
const RightDesc = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  div {
    h1 {
      font-size: 48px;
      margin: 0 0 10px;
    }
    p {
      font-size: 15px;
      margin: 0 0 5px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 48px;
  top: 200px;
  bottom: 0;
  right: -24px;

  button {
    display:flex;
    align-items: center;
    background-color: #383b47;
    border-radius: 24px;
    border-style: none;
    box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
      rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
    color: #e3e0f6;
    cursor: pointer;
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-size: 20px;
    font-weight: 300;
    height: 48px;
    width:48px
    justify-content: center;
    letter-spacing: 0.25px;
    max-width: 100%;
    padding: 6px 20px;
    position: relative;
    text-align: center;
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    width: auto;

    &:hover {
      background: #f6f9fe;
      color: #174ea6;
    }
    &:disabled {
      opacity: 0.35;
    }
  }
`;

export default ViewWeather;
