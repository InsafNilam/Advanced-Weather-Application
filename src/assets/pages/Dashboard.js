import React from "react";
import { useQuery } from "react-query";
import { RingLoader } from "react-spinners";
import styled from "styled-components";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { basicSchema } from "../validator/schema";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Card from "../components/Card";
import loadError from "../images/load_error.png";
import Header from "../components/Header";

function Dashboard() {
  const navigate = useNavigate();

  const getWeatherDetailsById = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=6.927079&lon=79.861244&units=metric&exclude=hourly,minutely&appid=${process.env.REACT_APP_WEATHER_API}`
    );
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery(
    "weather-data",
    getWeatherDetailsById,
    {
      cacheTime: 300000, // Cache for 5 minute
      staleTime: 60000, // Stale for 1 minute
    }
  );

  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${values.latitude}&lon=${values.longitude}&units=metric&exclude=hourly,minutely&appid=${process.env.REACT_APP_WEATHER_API}`
      );
      navigate("/weather-info", {
        replace: false,
        state: {
          bgColor: "#388ee7",
          data: response.data,
        },
      });
      actions.resetForm();
    } catch (err) {
      if (err && err instanceof AxiosError) {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      } else if (err && err instanceof Error) {
        toast.error(err.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      }
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      latitude: "",
      longitude: "",
    },
    validationSchema: basicSchema,
    onSubmit: onSubmit,
  });

  return (
    <Container>
      <Header />
      <ToastContainer />
      <Form onSubmit={formik.handleSubmit} autoComplete="false">
        <InputGroup>
          <Input
            name="latitude"
            type="number"
            placeholder="Enter latitude"
            value={formik.values.latitude}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={
              formik.errors.latitude && formik.touched.latitude
                ? "input-error"
                : ""
            }
          />
          {formik.errors.latitude && formik.touched.latitude ? (
            <p className="error">{formik.errors.latitude}</p>
          ) : (
            <p></p>
          )}
        </InputGroup>
        <InputGroup>
          <Input
            name="longitude"
            type="number"
            placeholder="Enter longitude"
            value={formik.values.longitude}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={
              formik.errors.longitude && formik.touched.longitude
                ? "input-error"
                : ""
            }
          />
          {formik.errors.longitude && formik.touched.longitude ? (
            <p className="error">{formik.errors.longitude}</p>
          ) : (
            <p></p>
          )}
        </InputGroup>
        <ButtonGroup>
          <button type="submit" disabled={formik.isSubmitting}>
            Search City
          </button>
        </ButtonGroup>
      </Form>
      <Wrap>
        {isLoading && (
          <Loader>
            <RingLoader color="#36d7b7" loading={isLoading} />
            <p>Please wait while we fetch the Weather Data</p>
          </Loader>
        )}
        {isError && (
          <Loader>
            <img
              alt="error-icon"
              src={loadError}
              style={{
                width: "40%",
                height: "fit-content",
                filter: "drop-shadow(0 0 0.75rem crimson)",
                objectFit: "cover",
              }}
            />
            <p>{error.message}</p>
          </Loader>
        )}
        {!isLoading && !isError && (
          <Card key={1} bgColor={"#388ee7"} data={data} />
        )}
      </Wrap>
    </Container>
  );
}

const Container = styled.main`
  max-height: calc(80vh);
  margin: 0 auto;
  padding: 0px calc(3.5vw + 5px) 0px;
  align-items: center;
  justify-content: center;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Loader = styled.div`
  max-width: 450px;
  min-width: 400px;
  min-height: 250px;
  margin: 0 auto;
  background-color: #070814;
  border-radius: 12px;
  outline: 3px solid #0b1c24;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: #a2a208;
  p {
    margin: 30px 0;
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 960px;
  min-width: 440px;
  min-height: calc(80vh);
  position: relative;
  bottom: 60px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 40px;
  margin-right: -60px;
  top: 0;
  bottom: 0;
  right: 0;

  button {
    align-items: center;
    background-color: #6c5dd3;
    border-radius: 15px;
    border-style: none;
    box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
      rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
    color: #e3e0f6;
    cursor: pointer;
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    height: 40px;
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

const Form = styled.form`
  z-index: 10;
  position: relative;
  width: 420px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  text-align: center;
`;

const Input = styled.input`
  outline: none;
  border: none;
  height: 40px;
  border-radius: 20px;
  padding: 1px 12px;
  margin: 0 8px;
  background: #000;
  color: #fff;
`;

const InputGroup = styled.div`
  width: 50%;
  p {
    text-align: start;
    padding-left: 36px;
  }
`;

export default Dashboard;
