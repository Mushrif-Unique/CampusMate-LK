import api from "./api";

export const getSemesters = () => api.get("/semesters");
export const getCurrentSemester = () => api.get("/semesters/current");
export const createSemester = (semester) => api.post("/semesters", semester);
export const updateSemester = (id, semester) => api.patch(`/semesters/${id}`, semester);
export const completeSemester = (id) => api.patch(`/semesters/${id}/complete`);
export const deleteSemester = (id) => api.delete(`/semesters/${id}`);
