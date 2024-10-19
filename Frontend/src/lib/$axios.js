import axios from "axios";

const API_URL = "http://localhost:8081/todo-list/api/";

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;
