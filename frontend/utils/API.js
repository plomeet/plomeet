import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://k6a205.p.ssafy.io',
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
