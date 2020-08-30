import { createSlice } from "@reduxjs/toolkit";
//import { getUser, logInUser } from "../../api/userApi";

let initialState = {
  loginLoading: false,
  userLoading: false,
  loggedIn: false,
  username: "",
  email: "",
  topScore: 0,
  totalActiveGames: 0,
};

const startLoading = (state) => {
  state.isLoading = true;
};

const startLogin = (state) => {
  state.loginIsLoading = true;
};

const loadingFailed = (state, action) => {
  const { error } = action.payload;
  state.isLoading = false;
  state.loginIsLoading = false;
  state.error = error;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoading: startLoading,
    setLoginLoading: startLogin,
    setLoginSuccess(state) {
      state.loginIsLoading = false;
      state.loggedIn = true;
      state.error = null;
    },
    getUserSuccess(state, action) {
      const { user } = action.payload;
      state.userLoading = false;
      state.username = user.username;
      state.email = user.email;
      state.topScore = user.top_score;
      state.activeGames = user.active_games;
    },
    removeUser(state) {
      state.isLaoding = false;
      state.userLoading = false;
      state.username = "";
      state.email = "";
      state.topScore = 0;
      state.activeGames = 0;
      state.loggedIn = false;
    },
    setFailure: loadingFailed,
  },
});

export const {
  setIsLoading,
  setLoginLoading,
  setLoginSuccess,
  getUserSuccess,
  removeUser,
  setFailure,
} = userSlice.actions;

export default userSlice.reducer;

//TODO make async thunk api calls
