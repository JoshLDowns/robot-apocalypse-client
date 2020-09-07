import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
//import { Link } from "@reach/router";

import Menu from "@material-ui/core/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";

import MenuIcon from "@material-ui/icons/Menu";

const StyledMenu = withStyles((theme) => ({
  paper: {
    border: `1.5px solid ${theme.palette.secondary.dark}`,
    backgroundColor: theme.palette.primary.main,
  },
}))((props) => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
));

const NavMenu = ({ handleLogout }) => {
  const [anchorEl, setAnchorEl] = useCallback(useState(null));

  const handleOpen = (evt) => {
    setAnchorEl(evt.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-owns={anchorEl ? "navMenu" : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <MenuIcon fontSize="large" color="primary" />
      </IconButton>
      <StyledMenu
        style={{ marginTop: "10px" }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List style={{ width: "150px", backgroundColor: "#c31445" }}>
          <ListItem
            button
            onClick={() => {
              handleLogout();
              handleClose();
            }}
          >
            <ListItemText primary="Logout" style={{ color: "#c3c3c3" }} />
          </ListItem>
        </List>
      </StyledMenu>
    </>
  );
};

NavMenu.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default NavMenu;
