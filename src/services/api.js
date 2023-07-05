import axios from "axios";

export const api = axios.create({
  baseURL: "https://ex-rocketnotesbackend.onrender.com",
});
