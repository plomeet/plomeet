import axios from "axios";

export const axiosInstance = axios.create({ //완료된건 이거 사용
  //baseURL: 'http://10.0.2.2:8080',
  baseURL: 'http://k6a205.p.ssafy.io',
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstanceLocal = axios.create({ // 로컬 테스트용 나중에 지우자
  //baseURL: 'http://10.0.2.2:8080',
  baseURL: 'http://127.0.0.1:8080',
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});
