import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "http://192.168.31.53/happy",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
