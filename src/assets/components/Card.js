import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import cloud from "../images/cloud.png";
import arrow from "../images/arrow.png";
import close from "../images/close.png";

function Card(props) {
  const navigate = useNavigate();
  const getDate = () => {
    let monthDict = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    let date = new Date();
    let hour = date.getHours() >= 12 ? date.getHours() - 12 : date.getHours();
    let mm =
      date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
    let am_pm = date.getHours() >= 12 ? "pm" : "am";
    let day = date.getDate();
    let month = monthDict[date.getMonth()];

    return hour + "." + mm + am_pm + ", " + month + " " + day;
  };

  const [time, setTime] = useState(getDate);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getDate);
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Container
      onClick={() =>
        navigate("/weather-info", {
          replace: false,
          state: {
            ...props,
          },
        })
      }
    >
      <Primary style={{ backgroundColor: props.bgColor }}>
        <CloseIcon>
          <img src={close} width={12} alt={"close-icon"} />
        </CloseIcon>
        <Temperature>
          <div>
            <h4>{props.data.timezone}</h4>
            <h6>{time}</h6>
          </div>
          <div>
            <h1>{props.data.current.temp}°c</h1>
          </div>
          <div
            style={{
              marginRight: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={`http://openweathermap.org/img/w/${props.data.current.weather[0].icon}.png`}
              style={{
                margin: 8,
              }}
              alt="weather-icon"
            />
            <h5>{props.data.current.weather[0].main}</h5>
          </div>
          <div>
            <h5>Temp Min: {props.data.daily[0].temp.min}°c</h5>
            <h5>Temp Max {props.data.daily[0].temp.max}°c</h5>
          </div>
        </Temperature>
        <Image>
          <img src={cloud} width={"100%"} alt={"transparent-cloud-img"} />
        </Image>
      </Primary>
      <Secondary>
        <div>
          <h5>Pressure: {props.data.current.pressure}hPa</h5>
          <h5>Humidity: {props.data.current.humidity}%</h5>
          <h5>Visibility: {props.data.current.visibility / 1000}km</h5>
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
          <h5>
            Sunrise:{" "}
            {new Date(props.data.current.sunrise * 1000).toLocaleTimeString()}
          </h5>
          <h5>
            Sunset:{" "}
            {new Date(props.data.current.sunset * 1000).toLocaleTimeString()}
          </h5>
        </div>
      </Secondary>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 450px;
  min-width: 400px;
  cursor: pointer;
`;

const Primary = styled.div`
  padding-bottom: 12px;
  position: relative;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: white;
  text-align: center;
`;

const CloseIcon = styled.div`
  padding: 8px 12px 0;
  text-align: end;
`;
const Secondary = styled.div`
  padding: 12px 0px;
  border-bottom-right-radius: 5px;
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
    h5 {
      margin: 5px 0;
    }
  }
  div:nth-child(1) {
    padding: 0 0 0 24px;
    h5 {
      text-align: start;
    }
  }
  div:nth-child(2) {
    border-right: 1px solid white;
    border-left: 1px solid white;
  }
`;

const Temperature = styled.div`
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: max-content;

  div {
    h1,
    h4,
    h6 {
      margin: 0px 0px 10px;
    }
    h5 {
      margin: 5px 0;
    }
  }

  div:nth-child(3) {
    align-self: end;
  }
`;

const Image = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  bottom: -30px;
`;

export default Card;
