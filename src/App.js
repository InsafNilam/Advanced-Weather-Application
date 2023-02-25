import React from "react";
import { RequireAuth } from "react-auth-kit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Footer from "./assets/components/Footer";
import PageNotFound from "./assets/pages/PageNotFound";
import ViewWeather from "./assets/pages/ViewWeather";
import Dashboard from "./assets/pages/Dashboard";
import Login from "./assets/pages/LogIn";

import background from "./assets/images/background.png";

function App() {
  return (
    <Router>
      <Container bgImage={background}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/home"
            element={
              <RequireAuth loginPath="/">
                <Dashboard />
              </RequireAuth>
            }
          ></Route>

          <Route
            path="/weather-info"
            element={
              <RequireAuth loginPath="/">
                <ViewWeather />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/*"
            element={
              <RequireAuth loginPath="/">
                <PageNotFound />
              </RequireAuth>
            }
          ></Route>
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
}

const Container = styled.div`
  min-height: 100vh;
  position: relative;
  min-width: 400px;
  &:after {
    background: ${(props) =>
      `url(${props.bgImage}) center center / cover no-repeat fixed`};
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -2;
  }
`;

export default App;
