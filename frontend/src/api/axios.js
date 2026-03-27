import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

instance.interceptors.request.use((config) => {
  const stored = localStorage.getItem("user");

  if (stored) {
    const user = JSON.parse(stored);
    if (user?.token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }

  return config;
});

export default instance;