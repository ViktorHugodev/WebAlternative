import axios from "axios";

const baseURL = `https://www.googleapis.com/youtube/v3/`;

const api = axios.create({
  baseURL: baseURL,
})

export default api;