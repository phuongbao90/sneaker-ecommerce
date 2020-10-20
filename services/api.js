import Axios from "axios";

const api = Axios.create({
  baseURL: process.env.API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
