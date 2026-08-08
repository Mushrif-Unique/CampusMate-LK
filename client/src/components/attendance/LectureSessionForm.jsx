import { useState } from "react";

function initialForm(session) {
  if (!session) return { sessionType: "theory", hours: "", minutes: "", attendanceStatus: "present" };
  const totalMinutes = Math.round(Number(session.durationHours) * 60);
  return { sessionType: session.sessionType, hours: Math.floor(totalMinutes / 60), minutes: totalMinutes % 60, attendanceStatus: session.attendanceStatus };
}

export default function LectureSessionForm({ module, session, onSubmit, onCancel, busy }) {
  const [form, setForm] = useState(() => initialForm(session));
  const [error, setError] = useState("");
  const theoryOnly = module.moduleType === "theory_only";
  const change = (key, value) => { setError(""); setForm((old) => ({ ...old, [key]: value })); };

  async function submit(event) {
    event.preventDefault();
    const hours = Number(form.hours || 0); const minutes = Number(form.minutes || 0);
    if (!Number.isInteger(hours) || hours < 0 || !Number.isInteger(minutes) || minutes < 0 || minutes > 59) return setError("Enter whole hours and minutes between 0 and 59.");
    const durationHours = (hours * 60 + minutes) / 60;
    if (durationHours <= 0) return setError("Duration must be greater than zero.");
    await onSubmit({ sessionType: theoryOnly ? "theory" : form.sessionType, durationHours, attendanceStatus: form.attendanceStatus }, setError);
  }

  return <form onSubmit={submit} className="space-y-3 rounded-xl bg-slate-50 p-4"><h3 className="font-bold">{session ? "Edit lecture session" : "Add lecture session"}</h3><div className="grid gap-3 sm:grid-cols-4"><label className="text-sm">Session Type<select disabled={theoryOnly} value={theoryOnly ? "theory" : form.sessionType} onChange={(e) => change("sessionType", e.target.value)} className="mt-1 w-full rounded-lg border p-2"><option value="theory">Theory</option>{!theoryOnly && <option value="practical">Practical</option>}</select></label><label className="text-sm">Hours<input min="0" step="1" type="number" inputMode="numeric" value={form.hours} onChange={(e) => change("hours", e.target.value)} className="mt-1 w-full rounded-lg border p-2" /></label><label className="text-sm">Minutes<input min="0" max="59" step="1" type="number" inputMode="numeric" value={form.minutes} onChange={(e) => change("minutes", e.target.value)} className="mt-1 w-full rounded-lg border p-2" /></label><label className="text-sm">Attendance<select value={form.attendanceStatus} onChange={(e) => change("attendanceStatus", e.target.value)} className="mt-1 w-full rounded-lg border p-2"><option value="present">Present</option><option value="absent">Absent</option></select></label></div><p className="text-xs text-slate-500">Examples: 1 hour 30 minutes, or 45 minutes.</p>{error && <p className="text-sm text-red-700">{error}</p>}<button disabled={busy} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">{busy ? "Saving…" : "Save session"}</button>{onCancel && <button type="button" onClick={onCancel} className="ml-2 px-3 py-2 text-sm">Cancel</button>}</form>;
}
