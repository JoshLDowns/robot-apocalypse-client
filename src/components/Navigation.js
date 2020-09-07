import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "@reach/router";

import NavMenu from "./NavMenu";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ...theme.global,
  scrollNav: {
    backgroundColor: "#c3c3c3",
  },
  logoLink: {
    width: "250px",
    marginLeft: "20px",
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const ScrollNav = ({ handleLogout, ...props }) => {
  const classes = useStyles();

  const username = useSelector((state) => state.user.username);

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar elevation={0} className={classes.scrollNav}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            <Tooltip title="Home">
              <Link to="/">
                <img
                  src={
                    "https://res.cloudinary.com/joshdowns-dev/image/upload/v1599503555/robot-apocalypse/robot-apocalypse-title-small_vsxpia.png"
                  }
                  alt="Logo"
                  className={classes.logoLink}
                />
              </Link>
            </Tooltip>
            <div
              style={{
                display: "flex",
                height: "100%",
                alignItems: "center",
              }}
            >
              <Typography
                color="primary"
                className={classes.titleText}
                style={{ marginRight: "20px" }}
              >
                {`Logged in as: ${username}`}
              </Typography>

              <NavMenu
                handleLogout={handleLogout}
                style={{ marginRight: "20px" }}
              />
            </div>
          </div>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
};

ScrollNav.propTypes = {
  userType: PropTypes.string,
  handleLogout: PropTypes.func.isRequired,
};

export default ScrollNav;
