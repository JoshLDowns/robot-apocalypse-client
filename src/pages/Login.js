import React from "react";

import { useInput } from "../hooks/forms";

import { useDispatch, useSelector } from "react-redux";

import { logIn } from "../redux/slices/userSlice";

import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ...theme.global,
  titleImage: {
    width: "50%",
    height: "auto",
    minWidth: "400px",
  },
}));

const Login = ({ handleLogin }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { value: username, bind: bindUsername, reset: resetUserName } = useInput("");
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput("");

  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loginIsLoading);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const user = username;
    const pass = password;
    resetUserName();
    resetPassword();
    dispatch(logIn(user, pass));
  };

  return (
    <>
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
                helperText={error ? "Invalid username or password" : null}
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
                helperText={error ? "Invalid username or password" : null}
                error={error ? true : false}
                {...bindPassword}
              />
              <br />
              <Button
                type="submit"
                className={classes.largeButton}
                fullWidth
                variant="contained"
                color="primary"
                onClick={(evt) => {
                  handleLogin({ username: username, password: password });
                  handleSubmit(evt);
                }}
              >
                {loading ? <CircularProgress color="secondary" /> : "SUBMIT"}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Login;
