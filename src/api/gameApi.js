import axios from "axios";

export const newGame = async (userId, difficulty) => {
  const response = { status: "", error: null, data: null };
  const date = new Date().toLocaleDateString();
  await axios
    .post(
      "/auth/newgame",
      `userId=${userId}&date=${date}&difficulty=${difficulty}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    )
    .then((res) => {
      console.log(res);
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

export const getGame = async (userId) => {
  const response = { status: "", error: null, data: null };
  await axios
    .get(`/auth/game?userId=${userId}`, {
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
