import React, {useEffect} from 'react'

import { useSelector, useDispatch } from "react-redux";

import { createNewGame, getCurrentGame } from "../redux/slices/gameSlice";
import { setGameActive } from "../redux/slices/userSlice";

import NewGame from "../components/NewGame";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
//import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.game.isLoading);
  const roomsAreLoading = useSelector((state) => state.rooms.isLoading);
  const gameId = useSelector((state) => state.game.gameId);
  const currentRoom = useSelector((state) => state.rooms.currentRoom);

  const userId = useSelector((state) => state.user.userId);
  const activeGame = useSelector((state) => state.user.activeGame);

  const handleNewGame = (userId, difficulty) => {
    dispatch(createNewGame(userId, difficulty))
    dispatch(setGameActive(userId))
  }

  useEffect(()=>{
    if (activeGame && !gameId) {
      dispatch(getCurrentGame(userId))
    }
  },[activeGame, gameId, userId, dispatch])

  return (
    <>
      <Container className={classes.mainWrapper}>
        <br />
        <Grid container spacing={6}>
            {(isLoading || roomsAreLoading) && (
              <Grid item xs={12}>
              <CircularProgress color="primary" />
            </Grid>)}
            {(!isLoading && !roomsAreLoading) && (
              <Grid item xs={12}>
                {activeGame ? (
                  <Typography>Continue?</Typography>
                ) : (
                  <NewGame handleNewGame={handleNewGame} userId={userId} />
                )}
              </Grid>
            )}
          <Grid item sm={6} xs={12}>
            <Typography className={classes.titleText}>
              Player Stats
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12} >
          <Typography className={classes.titleText}>
              Leaderboard
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Dashboard;
