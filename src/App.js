import React, { useState, useEffect } from "react";
import { Router, Redirect } from "@reach/router";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { fetchUser, removeUser } from "./redux/slices/userSlice";

import { logoutUser } from "./api/userApi";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Navigation from "./components/Navigation";
import Loading from "./components/Loading";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./utility/theme.js";

const theme = createMuiTheme(themeFile);

const App = () => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(
    window.localStorage.getItem("robot-apocalypse-user")
  );

  const loggedIn = useSelector((state) => state.user.loggedIn);
  const loading = useSelector((state) => state.user.userLoading);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    dispatch(removeUser());
  };

  useEffect(() => {
    const fetchCurrentUser = async (token) => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await dispatch(fetchUser());
    };
    if (currentUser) {
      fetchCurrentUser(currentUser);
    } else {
      setCurrentUser(null);
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (loggedIn && !currentUser) {
      setCurrentUser(window.localStorage.getItem("robot-apocalypse-user"));
    }
  }, [loggedIn, currentUser]);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser && !loggedIn) {
    return (
      <MuiThemeProvider theme={theme}>
        <div id="main-container">
        <Redirect noThrow to="/login" />
          <Router>
            <Login path="/login" />
            <Register path="/register" />
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
  return (
    <MuiThemeProvider theme={theme}>
      <Redirect noThrow to="/login" />
      <div id="main-container">
        {window.location.pathname === "/login" && <Redirect noThrow to="/" />}
        <Navigation handleLogout={handleLogout} />
        <Router>
          <Dashboard path="/" />
        </Router>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
