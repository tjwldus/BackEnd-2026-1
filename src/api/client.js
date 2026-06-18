import axios from "axios";

const client = axios.create({
    baseURL : 'http://localhost:8080',
    withCredentials: true, //cors 통신 시 쿠키/인증 정보를 넘길 때 필수.
})

export default client;