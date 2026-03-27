import { fetchNews } from "../services/newsService.js";

export const getNews = async (req, res) => {
  const q = req.query.q || "technology";

  const articles = await fetchNews(q);

  res.json(articles);
};