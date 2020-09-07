import { createSlice } from "@reduxjs/toolkit";
import { logInUser, registerUser, getUser, patchUser } from "../../api/userApi";

let initialState = {
  loginIsLoading: false,
  userLoading: false,
  loggedIn: false,
  registered: false,
  userId: null,
  username: "",
  email: "",
  topScore: 0,
  activeGame: false,
  error: null,
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
    setRegisterSuccess(state) {
      state.loginIsLoading = false;
      state.registered = true;
      state.error = null;
    },
    setLoginSuccess(state) {
      state.loginIsLoading = false;
      state.loggedIn = true;
      state.error = null;
    },
    getUserSuccess(state, action) {
      const { user } = action.payload;
      state.userLoading = false;
      state.userId = user.id;
      state.username = user.username;
      state.email = user.email;
      state.topScore = user.top_score;
      state.activeGame = user.active_game;
      state.loggedIn = true;
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
    setActiveGame(state) {
      state.activeGame = true
    },
    clearUserErrors(state) {
      state.error = null;
    },
    resetRegister(state) {
      state.registered = false;
    },
    setFailure: loadingFailed,
  },
});

export const {
  setIsLoading,
  setLoginLoading,
  setRegisterSuccess,
  setLoginSuccess,
  getUserSuccess,
  removeUser,
  setActiveGame,
  clearUserErrors,
  resetRegister,
  setFailure,
} = userSlice.actions;

export default userSlice.reducer;

//TODO make async thunk api calls
export const logIn = (username, password) => async dispatch => {
  dispatch(setLoginLoading())
  const res = await logInUser(username, password);
  console.log(res)
  if (res.status === "ok") {
    dispatch(setLoginSuccess());
  } else {
    dispatch(setFailure({error: res.error}))
  }
}

export const register = (username, password, confirmPass) => async dispatch => {
  dispatch(setLoginLoading())
  if (password !== confirmPass) {
    dispatch(setFailure({error: "Passwords must match!"}))
  } else {
    const res = await registerUser(username, password);
    if (res.status === "ok") {
      dispatch(setRegisterSuccess())
    } else {
      dispatch(setFailure({error: res.error}))
    }
  }
}

export const fetchUser = () => async dispatch => {
  dispatch(setIsLoading());
  const user = await getUser();
  console.log(user)
  if (user.status === "ok") {
    dispatch(getUserSuccess({user: user.data}))
  } else {
    dispatch(setFailure({error: user.error}))
  }
}

export const setGameActive = (id) => async dispatch => {
  const res = await patchUser(id, "active_game", true);
  console.log(res)
  if (res.status === "ok") {
    dispatch(setActiveGame())
  } else {
    dispatch(setFailure({error: res.error}))
  }
}