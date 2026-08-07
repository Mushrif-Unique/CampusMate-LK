import api from "./api";

export const getCurrentUser = () => api.get("/auth/me");
export const loginWithGoogle = (credential) => api.post("/auth/google", { credential });
export const logout = () => api.post("/auth/logout");
