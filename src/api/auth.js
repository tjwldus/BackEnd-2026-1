import client from "./client";

//회원가입 함수
export const signup = (userData) => client.post('/api/auth/signup', userData);

//로그인 함수
export const login = (userData) => client.post('/api/auth/login', userData);