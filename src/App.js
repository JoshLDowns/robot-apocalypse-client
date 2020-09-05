import React, { useState, useEffect } from "react";
import { Router, Redirect } from "@reach/router";

import { useDispatch, useSelector } from "react-redux";

import Login from "./pages/Login";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./utility/theme.js";

const theme = createMuiTheme(themeFile);

const App = () => {
  const [currentUser, setCurrentUser] = useState(
    window.localStorage.getItem("robo-user")
  );

  const handleLogin = (userInfo) => {
    //TODO make this work
    console.log(userInfo);
  };

  if (!currentUser) {
    return (
      <MuiThemeProvider theme={theme}>
        <Redirect noThrow to="/login" />
        <div id="main-container">
          <Router>
            <Login path="/login" handleLogin={handleLogin} />
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
  return (
    <>
      <img
        src="https://res.cloudinary.com/joshdowns-dev/image/upload/v1598804938/robot-apocalypse/robot-apocalypse-title_ptot2m.png"
        alt="logo"
      />
    </>
  );
};

export default App;
