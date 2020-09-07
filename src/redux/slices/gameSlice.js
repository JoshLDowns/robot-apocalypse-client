import { createSlice } from "@reduxjs/toolkit";
import { newGame, getGame } from "../../api/gameApi";

let initialState = {
  gameLoading: false,
  gameId: null,
  startDate: null,
  time: null,
  score: null,
  currentRoom: "",
  difficulty: "",
};

const startLoading = (state) => {
  state.isLoading = true;
};

const loadingFailed = (state, action) => {
  const { error } = action.payload;
  state.isLoading = false;
  state.error = error;
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setIsLoading: startLoading,
    getGameSuccess(state, action) {
      const { game } = action.payload;
      state.gameId = game.id;
      state.startDate = game.start_date;
      state.time = game.seconds_played;
      state.score = game.score;
      state.currentRoom = game.current_room;
      state.difficulty = game.difficulty;
      state.isLoading = false;
    },
    updateGameTime(state) {
      state.time += 1;
    },
    updateScore(state, action) {
      const { value } = action.payload;
      state.score += value;
    },
    updateRoom(state, action) {
      const { room } = action.payload;
      state.currentRoom = room;
    },
    clearGame(state) {
      state = { ...initialState };
    },
    setFailure: loadingFailed,
  },
});

export const {
  setIsLoading,
  getGameSuccess,
  updateGameTime,
  updateGameScore,
  updateRoom,
  clearGame,
  setFailure,
} = gameSlice.actions;

export default gameSlice.reducer;

export const createNewGame = (userId, difficulty) => async (dispatch) => {
  dispatch(setIsLoading);
  const game = await newGame(userId, difficulty);
  console.log(game);
  if (game.status === "ok") {
    dispatch(getGameSuccess({ game: game.data }));
  } else {
    dispatch(setFailure({ error: game.error }));
  }
};

export const getCurrentGame = (userId) => async (dispatch) => {
  dispatch(setIsLoading);
  const game = await getGame(userId);
  console.log(game);
  if (game.status === "ok") {
    dispatch(getGameSuccess({ game: game.data }));
  } else {
    dispatch(setFailure({ error: game.error }));
  }
}
