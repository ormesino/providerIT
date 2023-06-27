import axios from "axios";

const baseURL = 'http://localhost:8080/clients';

const api = axios.create({
  baseURL,
});

export default api;