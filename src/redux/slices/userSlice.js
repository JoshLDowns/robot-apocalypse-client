import { createSlice } from "@reduxjs/toolkit";
import { logInUser, registerUser, getUser } from "../../api/userApi";

let initialState = {
  loginIsLoading: false,
  userLoading: false,
  loggedIn: false,
  registered: false,
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
      state.username = user.username;
      state.email = user.email;
      state.topScore = user.top_score;
      state.activeGames = user.active_games;
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
  if (user.status === "ok") {
    dispatch(getUserSuccess({user: user.data}))
  } else {
    dispatch(setFailure({error: user.error}))
  }
}