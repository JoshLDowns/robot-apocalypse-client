import React, { useState } from "react";
import PropTypes from "prop-types";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ...theme.global,
  newGameControl: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

const NewGame = ({ handleNewGame, userId }) => {
  const classes = useStyles();

  const [difficulty, setDifficulty] = useState("med");

  return (
    <div className={classes.newGameControl}>
      <ButtonGroup
        color="primary"
        aria-label="difficulty"
        style={{ width: "65%" }}
      >
        <Button
          style={{ width: "33.33%" }}
          className={classes.largeButton}
          variant={difficulty === "easy" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setDifficulty("easy")}
        >
          EASY
        </Button>
        <Button
          style={{ width: "33.33%" }}
          className={classes.largeButton}
          variant={difficulty === "med" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setDifficulty("med")}
        >
          MEDIUM
        </Button>
        <Button
          style={{ width: "33.33%" }}
          className={classes.largeButton}
          variant={difficulty === "hard" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setDifficulty("hard")}
        >
          HARD
        </Button>
      </ButtonGroup>
      <Button
        className={classes.largeButton}
        color="primary"
        variant="contained"
        style={{ width: "25%" }}
        onClick={() => handleNewGame(userId, difficulty)}
      >
        NEW GAME
      </Button>
    </div>
  );
};

NewGame.propTypes = {
  handleNewGame: PropTypes.func.isRequired,
  userId: PropTypes.number,
};

export default NewGame;
