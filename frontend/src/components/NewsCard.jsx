import { summarizeNews } from "../api/aiApi";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NewsCard = ({ article, onToggleFavorite, isFavorite }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!article.description) {
      setError("No description available to summarize.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await summarizeNews(article.description);
      setSummary(res.data.summary);
    } catch (err) {
      setError("Could not summarize this article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setSaving(true);
      setError("");
      await onToggleFavorite(article);
    } catch (err) {
      setError("Unable to update favorites. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {article.image ? (
        <img
          src={article.image}
          alt={article.title}
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-56 items-center justify-center bg-slate-100 text-slate-500">
          No image available
        </div>
      )}

      <div className="p-6 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500">
          {article.source?.name && <span>{article.source.name}</span>}
          {article.publishedAt && <span>{new Date(article.publishedAt).toLocaleDateString()}</span>}
        </div>

        <h2 className="text-xl font-semibold leading-tight text-slate-900">{article.title}</h2>
        <p className="text-slate-600 line-clamp-3">{article.description}</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={handleSummarize}
            disabled={loading}
            className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "Summarizing..." : "Summarize"}
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
            >
              Read full story
            </a>
            <button
              onClick={handleFavorite}
              disabled={saving}
              className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                isFavorite
                  ? "bg-rose-500 text-white hover:bg-rose-400"
                  : "bg-emerald-500 text-slate-900 hover:bg-emerald-400"
              } ${saving ? "cursor-not-allowed opacity-70" : ""}`}
            >
              {saving ? "Saving..." : isFavorite ? "Remove" : "Save"}
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-rose-600">{error}</p>}
        {summary && <p className="rounded-2xl bg-slate-50 p-4 text-slate-700">{summary}</p>}
      </div>
    </article>
  );
};

export default NewsCard;