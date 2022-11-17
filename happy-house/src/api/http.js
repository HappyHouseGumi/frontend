import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "http://192.168.31.53/happy", // 학교
  // baseURL: "http://218.150.0.132/happy", // 집
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
