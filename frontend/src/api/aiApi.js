import api from "./axios";

export const summarizeNews = (text) =>
  api.post("/ai/summarize", { text });