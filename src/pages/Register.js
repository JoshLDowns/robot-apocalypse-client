import React, { useEffect, useCallback, useState } from "react";
import { Link, navigate } from "@reach/router";

import { useInput } from "../hooks/forms";

import { useDispatch, useSelector } from "react-redux";

import {
  register,
  clearUserErrors,
  resetRegister,
} from "../redux/slices/userSlice";

import ConfirmRegister from "../components/ConfirmRegister";

import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ...theme.global,
  titleImage: {
    width: "50%",
    height: "auto",
    minWidth: "400px",
  },
}));

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    value: username,
    bind: bindUsername,
    reset: resetUserName,
  } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");
  const {
    value: confirmPass,
    bind: bindConfirmPass,
    reset: resetConfirmPass,
  } = useInput("");
  const [registerModal, setRegisterModal] = useCallback(useState(false))

  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loginIsLoading);
  const registered = useSelector((state) => state.user.registered);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const user = username;
    const pass = password;
    const confPass = confirmPass;
    resetUserName();
    resetPassword();
    resetConfirmPass();
    dispatch(register(user, pass, confPass));
  };

  const handleRegisterClose = useCallback(() => {
    setRegisterModal(false)
    navigate("/login")
  }, [setRegisterModal])

  useEffect(()=>{
    if (registered) {
      dispatch(resetRegister())
      setRegisterModal(true)
    }
  }, [registered, dispatch, setRegisterModal])

  return (
    <>
      <ConfirmRegister
        username={username}
        open={registerModal}
        handleClose={handleRegisterClose}
      />
      <Container className={classes.mainWrapper}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <br />
          <img
            className={classes.titleImage}
            src="https://res.cloudinary.com/joshdowns-dev/image/upload/v1598804938/robot-apocalypse/robot-apocalypse-title_ptot2m.png"
            alt="logo"
          />
          <br />
          <br />
          <br />
          <form>
            <div
              style={{
                width: "30%",
                display: "flex",
                flexDirection: "column",
                minWidth: "400px",
              }}
            >
              <TextField
                fullWidth
                size="small"
                color="primary"
                variant="outlined"
                label="Username"
                required
                name="username"
                autoFocus
                autoComplete="email"
                error={error ? true : false}
                {...bindUsername}
              />
              <br />
              <TextField
                fullWidth
                size="small"
                color="primary"
                variant="outlined"
                label="Password"
                type="password"
                required
                name="passworde"
                autoComplete="current-password"
                error={error ? true : false}
                {...bindPassword}
              />
              <br />
              <TextField
                fullWidth
                size="small"
                color="primary"
                variant="outlined"
                label="Confirm Password"
                type="password"
                required
                name="confirmPassword"
                autoComplete="current-password"
                helperText={error ? error : null}
                error={error ? true : false}
                {...bindConfirmPass}
              />
              <br />
              <Button
                type="submit"
                className={classes.largeButton}
                fullWidth
                variant="contained"
                color="primary"
                onClick={(evt) => {
                  handleSubmit(evt);
                }}
              >
                {loading ? <CircularProgress color="secondary" /> : "REGISTER"}
              </Button>
            </div>
          </form>
          <br />
          <Typography
            component={Link}
            to="/login"
            onClick={() => dispatch(clearUserErrors())}
            className={classes.linkText}
          >
            Already have an account? Login here!
          </Typography>
        </div>
      </Container>
    </>
  );
};

export default Register;
