import { useEffect, useState } from "react";
import { getCurrentUser, loginWithGoogle, logout as logoutRequest } from "../services/authService";
import { AuthContext } from "./authContext.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getCurrentUser().then(({ data }) => setUser(data.data.user)).catch(() => setUser(null)).finally(() => setLoading(false)); }, []);
  const login = async (credential) => { const { data } = await loginWithGoogle(credential); setUser(data.data.user); };
  const logout = async () => { await logoutRequest(); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>{children}</AuthContext.Provider>;
}
