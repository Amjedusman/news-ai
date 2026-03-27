import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchNews } from "../api/newsApi";
import { getFavorites, addFavorite, deleteFavorite } from "../api/favoriteApi";
import NewsCard from "../components/NewsCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState("technology");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetchNews(query);
        setArticles(res.data || []);
      } catch (err) {
        setError("Unable to load news right now. Please try again.");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [query]);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    const loadFavorites = async () => {
      try {
        const res = await getFavorites();
        setFavorites(res.data || []);
      } catch (err) {
        setFavorites([]);
      }
    };

    loadFavorites();
  }, [user]);

  const toggleFavorite = async (article) => {
    const existing = favorites.find((fav) => fav.url === article.url);

    if (existing) {
      await deleteFavorite(existing._id);
      setFavorites((prev) => prev.filter((fav) => fav._id !== existing._id));
      return;
    }

    const res = await addFavorite({
      title: article.title,
      url: article.url,
      image: article.image,
    });

    setFavorites((prev) => [res.data, ...prev]);
  };

  const isFavorite = (article) => favorites.some((fav) => fav.url === article.url);

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] bg-slate-900 px-6 py-8 text-slate-100 shadow-xl sm:px-10">
        <h1 className="text-3xl font-semibold sm:text-4xl">Latest AI-powered news</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Search the latest headlines, summarize interesting stories, and stay informed with a clean, responsive interface.
        </p>
      </div>

      <div className="space-y-5">
        <SearchBar query={query} setQuery={setQuery} />

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center text-slate-500 shadow-sm">
            Loading the latest stories...
          </div>
        ) : articles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article, index) => (
              <NewsCard
                key={article.url || index}
                article={article}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite(article)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-10 text-center text-slate-500 shadow-sm">
            No stories found. Try a different search term.
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;