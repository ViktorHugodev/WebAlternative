import axios from "axios";

// GET https://www.googleapis.com/youtube/v3/videos
// GET https://www.googleapis.com/youtube/v3/search
const baseURL = `https://www.googleapis.com/youtube/v3/`;

const api = axios.create({
  baseURL: baseURL,
})

export default api;