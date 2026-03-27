import apiClient from "../utils/apiClient.js";

export const fetchNews = async (query = "technology") => {
  const encodedQuery = encodeURIComponent(query);
  const res = await apiClient.get(
    `https://gnews.io/api/v4/search?q=${encodedQuery}&lang=en&max=5&apikey=${process.env.NEWS_API_KEY}`
  );

  return res.data.articles;
};
