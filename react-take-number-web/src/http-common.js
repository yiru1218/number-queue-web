import axios from "axios";

// baseUR 為後端 server REST API 的地址
export default axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json"
  }
});