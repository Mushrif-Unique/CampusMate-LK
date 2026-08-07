import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function AppLayout({ children }) {
  const { logout } = useAuth(); const navigate = useNavigate();
  async function handleLogout() { await logout(); navigate("/"); }
  return <div className="min-h-screen bg-slate-50"><header className="border-b border-slate-200 bg-white"><nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4"><Link className="font-bold text-indigo-700" to="/dashboard">CampusMate LK</Link><div className="flex items-center gap-4 text-sm"><NavLink to="/dashboard">Dashboard</NavLink><NavLink to="/profile">Profile</NavLink><button onClick={handleLogout} className="rounded-lg bg-slate-100 px-3 py-2">Logout</button></div></nav></header><main className="mx-auto max-w-5xl px-5 py-10">{children}</main></div>;
}
