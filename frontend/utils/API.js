import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://plomeet-app.com',
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
