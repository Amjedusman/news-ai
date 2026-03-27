import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="rounded-[28px] bg-white p-8 shadow-lg">
      <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
      <p className="mt-3 text-slate-600">
        Welcome back, <span className="font-medium text-slate-900">{user?.name || user?.email}</span>.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold">Profile</h2>
          <p className="mt-2 text-slate-600">Email: {user?.email}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold">Activity</h2>
          <p className="mt-2 text-slate-600">Browse the homepage to discover fresh news and summaries.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;