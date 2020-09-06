import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  ...theme.global,
}));
const ConfirmRegister = ({
  username,
  open,
  handleClose,
}) => {
  const classes = useStyles();

  return (
    <div style={{ position: "relative" }}>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DialogContent style={{backgroundColor: "#c3c3c3"}}>
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CancelIcon fontSize="large" color="primary" />
          </IconButton>
          <br />
          <br />
          <Typography className={classes.titleText}>
            {`Thank you ${username} for registering!`}
          </Typography>
          <br />
          <br />
          <Button
            className={classes.largeButton}
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleClose}
          >
            LOGIN
          </Button>
          <br />
          <br />
        </DialogContent>
      </Dialog>
    </div>
  );
};

ConfirmRegister.propTypes = {
  username: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ConfirmRegister;
