import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";

import { signInSchema, signUpSchema } from "../validator/schema";
import Facebook from "../components/Facebook";

function Login() {
  const [logIn, toggle] = useState(true);
  const signIn = useSignIn();

  const onSignInSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        "https://lucky-teal-duck.cyclic.app/api/user/signin",
        values
      );
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email },
      });
      toast.success("Successfully Logged In", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      actions.resetForm();
      setInterval(() => {
        window.location.pathname = "/home";
      }, 1000);
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

  const onSignUpSubmit = async (values, actions) => {
    try {
      await axios.post("https://lucky-teal-duck.cyclic.app/api/user/signup", values);
      toast.success("Successfully Registered", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      toggle(!logIn);
      actions.resetForm();
    } catch (err) {
      if (err && err instanceof AxiosError) {
        toast.error(err.message, {
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

  const signUpFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: onSignUpSubmit,
  });

  const signInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: onSignInSubmit,
  });

  return (
    <Container>
      <ToastContainer />
      <Wrap>
        <SignUpContainer signIn={logIn}>
          <Form onSubmit={signUpFormik.handleSubmit} autoComplete="false">
            <Title>Sign Up</Title>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={signUpFormik.values.email}
              onBlur={signUpFormik.handleBlur}
              onChange={signUpFormik.handleChange}
              className={
                signUpFormik.errors.email && signUpFormik.touched.email
                  ? "input-error"
                  : ""
              }
            />
            {signUpFormik.errors.email && signUpFormik.touched.email && (
              <p className="error">{signUpFormik.errors.email}</p>
            )}
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={signUpFormik.values.password}
              onBlur={signUpFormik.handleBlur}
              onChange={signUpFormik.handleChange}
              className={
                signUpFormik.errors.password && signUpFormik.touched.password
                  ? "input-error"
                  : ""
              }
            />
            {signUpFormik.errors.password && signUpFormik.touched.password && (
              <p className="error">{signUpFormik.errors.password}</p>
            )}
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Enter your password"
              value={signUpFormik.values.confirmPassword}
              onBlur={signUpFormik.handleBlur}
              onChange={signUpFormik.handleChange}
              className={
                signUpFormik.errors.confirmPassword &&
                signUpFormik.touched.confirmPassword
                  ? "input-error"
                  : ""
              }
            />
            {signUpFormik.errors.confirmPassword &&
              signUpFormik.touched.confirmPassword && (
                <p className="error">{signUpFormik.errors.confirmPassword}</p>
              )}
              <div style={{display:'flex', flexDirection:"row", justifyContent:'space-between', width: "100%"}}>
              <div style={{flex: 1}}>
                <Button disabled={signUpFormik.isSubmitting} type="submit">
                  Sign Up
                </Button>
              </div>
              <div>
                <Facebook/>
              </div>
            </div>
          </Form>
        </SignUpContainer>

        <SignInContainer signIn={logIn}>
          <Form onSubmit={signInFormik.handleSubmit} autoComplete="false">
            <Title>Sign In</Title>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={signInFormik.values.email}
              onBlur={signInFormik.handleBlur}
              onChange={signInFormik.handleChange}
              className={
                signInFormik.errors.email && signInFormik.touched.email
                  ? "input-error"
                  : ""
              }
            />
            {signInFormik.errors.email && signInFormik.touched.email && (
              <p className="error">{signInFormik.errors.email}</p>
            )}
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={signInFormik.values.password}
              onBlur={signInFormik.handleBlur}
              onChange={signInFormik.handleChange}
              className={
                signInFormik.errors.password && signInFormik.touched.password
                  ? "input-error"
                  : ""
              }
            />
            {signInFormik.errors.password && signInFormik.touched.password && (
              <p className="error">{signInFormik.errors.password}</p>
            )}
            <Anchor href="#">Forgot your password?</Anchor>
            <div style={{display:'flex', flexDirection:"row", justifyContent:'space-between', width: "100%"}}>
              <div style={{flex: 1}}>
                <Button type="submit" disabled={signInFormik.isSubmitting}> Sign In</Button>
              </div>
              <div>
                <Facebook/> 
              </div>
            </div>
          </Form>
        </SignInContainer>

        <OverlayContainer signIn={logIn}>
          <Overlay signIn={logIn}>
            <LeftOverlayPanel signIn={logIn}>
              <Title>Welcome Back!</Title>
              <Paragraph>
                To keep connected with us please login with your personal info
              </Paragraph>
              <GhostButton onClick={() => toggle(true)}>Sign In</GhostButton>
            </LeftOverlayPanel>

            <RightOverlayPanel signIn={logIn}>
              <Title>Hello, Friend!</Title>
              <Paragraph>
                Enter Your personal details and start journey with us
              </Paragraph>
              <GhostButton onClick={() => toggle(false)}>Sign Up</GhostButton>
            </RightOverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Wrap>
    </Container>
  );
}

const Container = styled.main`
  min-height: calc(100vh - 60px);
  padding: 0px calc(3vw) 0px;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrap = styled.div`
  display: flex;
  justify-self: center;
  align-self: center;
  position: relative;
  padding: 10px calc(0.5vw + 5px);
  background: #151e3d;
  border-radius: 12px;
  min-height: 400px;
  min-width: 450px;
  max-width: calc(100vw);

  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  overflow: hidden;
  width: 678px;
`;

const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signIn !== true
      ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  `
      : null}
`;

const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) => (props.signIn !== true ? `transform: translateX(100%);` : null)}
`;

const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.35;
  }

  @media (max-width: 600px) {
    padding: 12px 20px;
  }
`;
const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) => (props.signIn !== true ? `transform: translateX(-100%);` : null)}
`;

const Overlay = styled.div`
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) => (props.signIn !== true ? `transform: translateX(50%);` : null)}
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

const LeftOverlayPanel = styled(OverlayPanel)`
  ${(props) => (props.signIn !== true ? `transform: translateX(0);` : null)}
`;

const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  ${(props) => (props.signIn !== true ? `transform: translateX(20%);` : null)}
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  padding: 0 10px;
`;

export default Login;
