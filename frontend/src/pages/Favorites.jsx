import { useEffect, useState } from "react";
import { getFavorites, deleteFavorite } from "../api/favoriteApi";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getFavorites();
        setFavorites(res.data || []);
      } catch {
        setError("Unable to load favorites. Please log in and try again.");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleRemove = async (id) => {
    try {
      await deleteFavorite(id);
      setFavorites((prev) => prev.filter((fav) => fav._id !== id));
    } catch {
      setError("Could not remove favorite. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-slate-900">Saved Favorites</h1>
        <p className="mt-2 text-slate-500">
          Your saved stories are stored securely. Remove any item you no longer need.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-white p-10 text-center text-slate-500 shadow-sm">
          Loading favorites...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
          {error}
        </div>
      ) : favorites.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center text-slate-500 shadow-sm">
          No favorites yet. Visit the homepage to save articles.
          <button
            className="mt-4 rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-700"
            onClick={() => navigate("/")}
          >
            Browse news
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {favorites.map((fav) => (
            <article
              key={fav._id}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
            >
              {fav.image ? (
                <img
                  src={fav.image}
                  alt={fav.title}
                  className="mb-4 h-48 w-full rounded-3xl object-cover"
                />
              ) : (
                <div className="mb-4 flex h-48 items-center justify-center rounded-3xl bg-slate-100 text-slate-500">
                  No image available
                </div>
              )}
              <h2 className="text-xl font-semibold text-slate-900">{fav.title}</h2>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href={fav.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
                >
                  Read article
                </a>
                <button
                  className="rounded-full bg-rose-500 px-4 py-2 text-white transition hover:bg-rose-400"
                  onClick={() => handleRemove(fav._id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
