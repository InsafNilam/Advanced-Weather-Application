import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import cloud from "../images/cloud.png";
import arrow from "../images/arrow.png";
import close from "../images/close.png";
import { authAxios } from "../utils/weatherAPI";

function Card({ id, key, bgColor, data, time }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteWeather = useMutation(
    (id) => {
      return authAxios.delete(`/api/weather/delete-weather/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("weather");
      },
      onError: (error) => {
        console.log("An error occurred:", error);
      },
    }
  );

  return (
    <Container style={{ backgroundColor: bgColor }} key={key}>
      <div>
        <CloseIcon>
          <img
            src={close}
            style={{ width: 12 }}
            alt={"close-icon"}
            onClick={() => deleteWeather.mutate(id)}
          />
        </CloseIcon>
      </div>
      <div
        onClick={() =>
          navigate("/weather-info", {
            state: {
              data,
              time,
              bgColor,
            },
          })
        }
      >
        <Primary>
          <Temperature>
            <div>
              <h4>{data.timezone}</h4>
              <h6>{time}</h6>
            </div>
            <div>
              <h1>{data.current.temp}°c</h1>
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
                src={`http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`}
                style={{
                  margin: 8,
                }}
                alt="weather-icon"
              />
              <h5>{data.current.weather[0].main}</h5>
            </div>
            <div>
              <h5>Temp Min: {data.daily[0].temp.min}°c</h5>
              <h5>Temp Max {data.daily[0].temp.max}°c</h5>
            </div>
          </Temperature>
          <Image>
            <img src={cloud} width={"100%"} alt={"transparent-cloud-img"} />
          </Image>
        </Primary>
        <Secondary>
          <div>
            <h5>Pressure: {data.current.pressure}hPa</h5>
            <h5>Humidity: {data.current.humidity}%</h5>
            <h5>Visibility: {data.current.visibility / 1000}km</h5>
          </div>
          <div>
            <img
              src={arrow}
              alt={"wind-dir-arrow"}
              style={{
                width: 24,
                transform: `rotate(${data.current.wind_deg}deg)`,
              }}
            />
            <h5>
              {data.current.wind_speed}m/s {data.current.wind_deg} Degree
            </h5>
          </div>
          <div>
            <h5>
              Sunrise:{" "}
              {new Date(data.current.sunrise * 1000).toLocaleTimeString()}
            </h5>
            <h5>
              Sunset:{" "}
              {new Date(data.current.sunset * 1000).toLocaleTimeString()}
            </h5>
          </div>
        </Secondary>
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  border-radius: 5px;
  overflow: hidden;
  max-width: 450px;
  min-width: 400px;
  cursor: pointer;
`;

const Primary = styled.div`
  padding-bottom: 12px;
  position: relative;
  color: white;
  text-align: center;
`;

const CloseIcon = styled.div`
  padding: 8px 12px 0;
  z-index: 20;
  text-align: end;
`;
const Secondary = styled.div`
  padding: 12px 0px;
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
