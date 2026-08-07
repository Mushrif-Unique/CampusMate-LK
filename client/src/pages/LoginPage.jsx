import { GoogleLogin } from "@react-oauth/google";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth";

export default function LoginPage() {
  const { user, login } = useAuth(); const [error, setError] = useState("");
  if (user) return <Navigate to="/dashboard" replace />;
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return <main className="grid min-h-screen place-items-center bg-slate-50 p-6"><section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200"><h1 className="text-2xl font-bold text-indigo-700">CampusMate LK</h1><h2 className="mt-6 text-xl font-semibold text-slate-900">Welcome back</h2><p className="mt-2 text-slate-600">Sign in to set up your academic profile.</p><div className="mt-7">{clientId ? <GoogleLogin onSuccess={async ({ credential }) => { try { setError(""); await login(credential); } catch (e) { setError(e.response?.data?.message || "Sign-in failed. Please try again."); } }} onError={() => setError("Google sign-in was cancelled or unavailable.")} /> : <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">Google sign-in is not configured. Add VITE_GOOGLE_CLIENT_ID to client/.env.</p>}</div>{error && <p className="mt-4 text-sm text-red-600">{error}</p>}</section></main>;
}
