import axios from "axios";

const baseURL = "https://safion-app.onrender.com/";

const api = axios.create({
  baseURL,
});

export default api;
