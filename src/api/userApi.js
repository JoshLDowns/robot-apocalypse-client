import axios from "axios";

//mock fetch
const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const logInUser = async (username, password) => {
  const response = { status: "", error: null };
  await timeout(1000);
  await axios
    .post(
      "/auth/login",
      `grant_type=password&username=${username}&password=${password}&client_id=null&client_secret=null`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    )
    .then((res) => {
      setAuthToken(res.data.access_token);
      response.status = "ok";
    })
    .catch((err) => {
      console.log(err);
      response.status = "error";
      response.error = err.toString();
    });
  return response;
};

export const registerUser = async (username, password) => {
  const response = { status: "", error: null };
  await timeout(1000);
  await axios
    .post(
      "/auth/register",
      `grant_type=password&username=${username}&password=${password}&client_id=null&client_secret=null`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    )
    .then((res) => {
      console.log(res);
      if (res.data.message.includes("exists")) {
        response.status = "error";
        response.error = res.data.message;
      } else {
        response.status = "ok";
      }
    })
    .catch((err) => {
      console.log(err);
      response.status = "error";
      response.error = err.toString();
    });
  return response;
};

export const getUser = async () => {
  const response = { status: "", error: null, data: null };
  await axios
    .get("/auth/user", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    })
    .then((res) => {
      if (
        typeof res.data.string === "string" &&
        res.data.message.includes("wrong")
      ) {
        response.status = "error";
        response.error = res.data.message;
      } else {
        console.log(res.data.message);
        response.status = "ok";
        response.data = res.data.message;
      }
    })
    .catch((err) => {
      console.log(err);
      response.status = "error";
      response.error = err.toString();
    });
  return response;
};

export const patchUser = async (id, field, value) => {
  const response = { status: "", error: null };
  await axios
    .patch("/auth/user/update", `id=${id}&field=${field}&value=${value}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    })
    .then((res) => {
      console.log(res);
      response.status = "ok";
    })
    .catch((err) => {
      console.log(err);
      response.status = "error";
      response.error = err.toString();
    });
  return response
};

export const logoutUser = () => {
  localStorage.removeItem("robot-apocalypse-user");
  delete axios.defaults.headers.common["Authorization"];
};

const setAuthToken = (token) => {
  const authToken = `Bearer ${token}`;
  localStorage.setItem("robot-apocalypse-user", token);
  axios.defaults.headers.common["Authorization"] = authToken;
};
