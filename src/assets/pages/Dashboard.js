import React, { useMemo, useState, useEffect } from "react";
import { useQuery, useQueries, useMutation, useQueryClient } from "react-query";
import { RingLoader } from "react-spinners";
import styled from "styled-components";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { basicSchema } from "../validator/schema";
import { useSignOut } from "react-auth-kit";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Card from "../components/Card";
import loadError from "../images/load_error.png";
import Header from "../components/Header";
import { getDate } from "../utils/utils";
import { authAxios, checkValidity } from "../utils/weatherAPI";

import jwtExpiry from "../images/jwt_expiry.png";
import error from "../images/load_error.png";

function Dashboard() {
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

  const [time, setTime] = useState(getDate); // Handle Time
  const [open, setOpen] = useState(false); // Handle BackDrop
  const [data, setData] = useState(); // Handle User Weather Data
  const queryClient = useQueryClient();

  const validity = checkValidity();
  const expirationTime = validity.exp * 1000 - 60000;

  const addWeather = useMutation(
    (weather) => {
      return authAxios.post("/api/weather/add-weather", weather);
    },
    {
      onMutate: () => {
        setOpen(true);
      },
      onSuccess: () => {
        queryClient.invalidateQueries("weather");
        toast.success("Coordinates has been added", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        setInterval(() => setOpen(false), 1000);
      },
      onError: (error) => {
        toast.error(error, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      },
    }
  );

  const getWeatherDetails = async (lat, lon) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely&appid=${process.env.REACT_APP_WEATHER_API}`
    );
    return response.data;
  };

  const getUserWeatherData = async () => {
    const response = await authAxios.get("/api/weather/get-weather");
    setData(response.data);
    return response.data;
  };

  const { data: weatherData } = useQuery("weather", getUserWeatherData);

  const queryResults = useQueries(
    Array.isArray(weatherData) && weatherData.length > 0
      ? weatherData?.map((weather, i) => {
          return {
            queryKey: ["weather-data", i],
            queryFn: () =>
              getWeatherDetails(weather.latitude, weather.longitude),
            cacheTime: 300000,
            enabled: !!weatherData,
          };
        })
      : []
  );

  const onSubmit = async (values, actions) => {
    try {
      const response = await getWeatherDetails(
        values.latitude,
        values.longitude
      );
      if (response) {
        addWeather.mutate({
          latitude: values.latitude,
          longitude: values.longitude,
        });
      }
      actions.resetForm();
    } catch (err) {
      if (err && err instanceof AxiosError) {
        toast.error(err.response.data, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      } else if (err && err instanceof Error) {
        toast.error(err, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      latitude: "",
      longitude: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getDate);
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (Date.now() >= expirationTime) {
    handleExpiryOpen();
  }

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
            <p style={{ minHeight: "15px", margin: "5px 0" }}></p>
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
            <p style={{ minHeight: "15px", margin: "5px 0" }}></p>
          )}
        </InputGroup>
        <ButtonGroup>
          <button type="submit" disabled={formik.isSubmitting}>
            Add City
          </button>
        </ButtonGroup>
      </Form>
      <Wrap>
        {useMemo(() => {
          const color = ["#388ee7", "#6249cc", "#40b681", "#de944e", "#9c3a3a"];
          return !queryResults.length
            ? null
            : queryResults.map((result, i) => {
                if (result.isLoading) {
                  return (
                    <Loader>
                      <RingLoader color="#36d7b7" loading={result.isLoading} />
                      <p>Please wait while we fetch the Weather Data</p>
                    </Loader>
                  );
                }

                if (result.isError) {
                  return (
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
                      <p>{result.error.message}</p>
                    </Loader>
                  );
                }

                return (
                  <Card
                    time={time}
                    id={data && data[i]._id}
                    key={data ? data[i]._id : i.toString()}
                    bgColor={color[i % color.length]}
                    data={result.data}
                  />
                );
              });
        }, [queryResults, data, time])}
      </Wrap>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
  max-height: calc(100vh - 60px);
  margin: 0 auto;
  overflow-x: scroll;
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
  margin: 0 auto;
  max-width: 960px;
  overflow-x: scroll;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: max-content;
  grid-gap: 12px;
  grid-row-gap: 20px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 980px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
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
