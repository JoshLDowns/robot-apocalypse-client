import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import gameReducer from "./slices/gameSlice";
import roomReducer from "./slices/roomSlice";

const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
  rooms: roomReducer,
});

export default rootReducer;
