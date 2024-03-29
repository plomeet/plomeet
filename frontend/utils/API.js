import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://plomeet-app.com:8000',
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
