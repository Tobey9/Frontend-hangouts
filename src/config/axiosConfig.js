import axios from "axios";
const API_URL = "/api"; // No need for VITE_API_URL here anymore, or it can point to just "/api"

const axiosInstance = axios.create({
  baseURL: API_URL, // Now this will be "/api"
  withCredentials: true,
});

export default axiosInstance;
