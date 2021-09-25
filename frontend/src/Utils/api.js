import axios from "axios";

const API_URL = "localhost:3001";

export default axios.create({ baseURL: API_URL, withCredentials: true });
