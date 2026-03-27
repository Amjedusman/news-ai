import api from "./axios";

export const fetchNews = (q) => api.get(`/news?q=${q}`);