import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import SemestersPage from "./pages/SemestersPage";
import ModulesPage from "./pages/ModulesPage";
import ModuleDetailsPage from "./pages/ModuleDetailsPage";

function App() { return <AuthProvider><BrowserRouter><Routes><Route path="/" element={<LandingPage />} /><Route path="/login" element={<LoginPage />} /><Route element={<ProtectedRoute />}><Route path="/dashboard" element={<DashboardPage />} /><Route path="/profile" element={<ProfilePage />} /><Route path="/semesters" element={<SemestersPage />} /><Route path="/semesters/:semesterId/modules" element={<ModulesPage />} /><Route path="/modules/:moduleId" element={<ModuleDetailsPage />} /></Route></Routes></BrowserRouter></AuthProvider>; }

export default App;
