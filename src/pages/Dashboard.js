import React from 'react'

import { useSelector } from "react-redux";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ...theme.global,
  welcomeText: {
    color: "#c31445",
    fontSize: "2rem"
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const username = useSelector((state) => state.user.username);

  return (
    <>
      <Container className={classes.mainWrapper}>
        <br />
        <Typography className={classes.welcomeText}>
          {`Welcome back ${username}!`}
        </Typography>
      </Container>
    </>
  )
}

export default Dashboard;
