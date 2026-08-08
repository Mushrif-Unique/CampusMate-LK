import api from "./api";
export const getModules = (semesterId) => api.get(`/modules?semesterId=${semesterId}`);
export const getModule = (id) => api.get(`/modules/${id}`);
export const createModule = (data) => api.post("/modules", data);
export const updateModule = (id, data) => api.patch(`/modules/${id}`, data);
export const deleteModule = (id) => api.delete(`/modules/${id}`);
export const getAttendance = (id) => api.get(`/modules/${id}/attendance`);
