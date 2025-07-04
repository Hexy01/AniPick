// src/api.js
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  withCredentials: true,
});

export default instance;
