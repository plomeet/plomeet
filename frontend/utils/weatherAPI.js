import axios from "axios";

const weatherApiInstance = axios.create({
    //baseURL: 'http://10.0.2.2:8080',
    baseURL: 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0',
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default weatherApiInstance;