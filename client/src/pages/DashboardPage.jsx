import AppLayout from "../components/layout/AppLayout";
import { useAuth } from "../context/useAuth";
export default function DashboardPage() { const { user } = useAuth(); return <AppLayout><p className="text-sm font-medium text-indigo-700">Welcome, {user.name.split(" ")[0]}</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Your workspace is ready.</h1><p className="mt-3 max-w-xl text-slate-600">Start by setting your university, faculty, degree, and current academic year. Semester and attendance tools will arrive in later phases.</p></AppLayout>; }
