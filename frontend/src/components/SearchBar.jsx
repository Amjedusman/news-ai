import { useState } from "react";

const SearchBar = ({ query, setQuery }) => {
  const [value, setValue] = useState(query || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(value.trim() || "technology");
  };

  return (
    <form className="grid gap-3 sm:grid-cols-[1fr_auto]" onSubmit={handleSubmit}>
      <input
        className="rounded-2xl border border-slate-300 px-4 py-3 shadow-sm outline-none transition focus:border-slate-500"
        placeholder="Search news..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-2xl bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;