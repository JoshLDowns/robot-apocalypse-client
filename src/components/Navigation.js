import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ...theme.global,
}));

const Navigation = ({ handleLogout }) => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.titleText} onClick={handleLogout}>
        LOGOUT
      </Typography>
    </>
  );
};

Navigation.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Navigation;
