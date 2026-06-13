"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Status = "Applied" | "Interview" | "Offer" | "Rejected";

type Application = {
  id: number;
  title: string;
  company: string;
  status: Status;
  date: string;
};

const STATUS_COLORS: Record<Status, string> = {
  Applied: "bg-blue-50 text-blue-600",
  Interview: "bg-yellow-50 text-yellow-600",
  Offer: "bg-green-50 text-green-600",
  Rejected: "bg-red-50 text-red-500",
};

function TrackerContent() {
  const params = useSearchParams();
  const [apps, setApps] = useState<Application[]>([
    { id: 1, title: "React Developer", company: "Startupify", status: "Interview", date: "2025-06-01" },
    { id: 2, title: "Full Stack Engineer", company: "WebWorks", status: "Applied", date: "2025-06-10" },
  ]);
  const [form, setForm] = useState({ title: "", company: "" });
  const [filter, setFilter] = useState<Status | "All">("All");

  useEffect(() => {
    const t = params.get("apply");
    const c = params.get("company");
    if (t && c) setForm({ title: t, company: c });
  }, [params]);

  const addApp = () => {
    if (!form.title || !form.company) return;
    setApps([...apps, { id: Date.now(), title: form.title, company: form.company, status: "Applied", date: new Date().toISOString().split("T")[0] }]);
    setForm({ title: "", company: "" });
  };

  const updateStatus = (id: number, status: Status) =>
    setApps(apps.map((a) => (a.id === id ? { ...a, status } : a)));

  const deleteApp = (id: number) => setApps(apps.filter((a) => a.id !== id));

  const filtered = filter === "All" ? apps : apps.filter((a) => a.status === filter);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <Link href="/" className="text-2xl font-bold text-blue-600">✈ Job Pilot</Link>
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/jobs" className="hover:text-blue-600">Browse Jobs</Link>
          <Link href="/tracker" className="text-blue-600 font-semibold">My Tracker</Link>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">My Applications</h1>

        {/* Add Form */}
        <div className="flex gap-3 mb-8">
          <input
            placeholder="Job title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            placeholder="Company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button onClick={addApp} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
            + Add
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {(["All", "Applied", "Interview", "Offer", "Rejected"] as const).slice(1).map((s) => (
            <div key={s} className="border border-gray-100 rounded-xl p-4 text-center shadow-sm">
              <p className="text-2xl font-bold">{apps.filter((a) => a.status === s).length}</p>
              <p className="text-xs text-gray-500 mt-1">{s}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["All", "Applied", "Interview", "Offer", "Rejected"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filter === s ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {filtered.length === 0 && <p className="text-gray-400 text-center py-12">No applications yet.</p>}
          {filtered.map((app) => (
            <div key={app.id} className="border border-gray-100 rounded-xl p-4 shadow-sm flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{app.title}</p>
                <p className="text-sm text-gray-500">{app.company} · {app.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={app.status}
                  onChange={(e) => updateStatus(app.id, e.target.value as Status)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border-0 focus:outline-none cursor-pointer ${STATUS_COLORS[app.status]}`}
                >
                  {(["Applied", "Interview", "Offer", "Rejected"] as Status[]).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button onClick={() => deleteApp(app.id)} className="text-gray-300 hover:text-red-400 transition text-lg">×</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function TrackerPage() {
  return (
    <Suspense>
      <TrackerContent />
    </Suspense>
  );
}
