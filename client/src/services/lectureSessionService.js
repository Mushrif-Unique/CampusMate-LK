import api from "./api";
export const getSessions = (moduleId) => api.get(`/modules/${moduleId}/lecture-sessions`);
export const createSession = (data) => api.post("/lecture-sessions", data);
export const updateSession = (id, data) => api.patch(`/lecture-sessions/${id}`, data);
export const deleteSession = (id) => api.delete(`/lecture-sessions/${id}`);
