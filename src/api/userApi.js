import axios from "axios";

//mock fetch
const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const logInUser = async (username, password) => {
  const response = { status: "", error: null }
  await timeout(1000)
  await axios
    .post("/auth/login",
      `grant_type=password&username=${username}&password=${password}&client_id=null&client_secret=null`
    , {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
      }
    })
    .then((res) => {
      setAuthToken(res.data.access_token)
      response.status = "ok"
    })
    .catch((err) => {
      console.log(err)
      response.status = "error"
      response.error = err.toString();
    })
    return response
}

export const logoutUser = () => {
  localStorage.removeItem("robot-apocalypse-user");
  delete axios.defaults.headers.common["Authorization"];
};

const setAuthToken = (token) => {
  const authToken = `Bearer ${token}`;
  localStorage.setItem("robot-apocalypse-user", JSON.stringify(token));
  axios.defaults.headers.common["Authorization"] = authToken;
};