import axios from "axios";
import config from "config";

const api = axios.create({
  baseURL: config.API_ROOT,
  timeout: 30000, // 30 seconds
});

api.defaults.headers.common["Accept"] = "application/json";
// api.defaults.headers.common["Cache-Control"] = "no-cache";
api.defaults.headers.common["Content-Type"] = "application/json; charset=utf-8";

export default api;
