import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="text-2xl font-semibold tracking-tight">
          NewsAI
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          {user ? (
            <>
              <Link to="/dashboard" className="rounded-full bg-slate-800 px-4 py-2 transition hover:bg-slate-700">
                Dashboard
              </Link>
              <Link to="/favorites" className="rounded-full bg-slate-800 px-4 py-2 transition hover:bg-slate-700">
                Favorites
              </Link>
              <button
                onClick={logout}
                className="rounded-full bg-emerald-500 px-4 py-2 text-slate-900 transition hover:bg-emerald-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-full bg-slate-800 px-4 py-2 transition hover:bg-slate-700">
                Login
              </Link>
              <Link to="/register" className="rounded-full bg-emerald-500 px-4 py-2 text-slate-900 transition hover:bg-emerald-400">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;