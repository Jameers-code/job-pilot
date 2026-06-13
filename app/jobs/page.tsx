"use client";
import { useState } from "react";
import Link from "next/link";

const JOBS = [
  { id: 1, title: "Frontend Developer", company: "TechCorp", location: "Remote", type: "Full-time", salary: "$80k–$110k" },
  { id: 2, title: "Backend Engineer", company: "DataFlow", location: "New York, NY", type: "Full-time", salary: "$90k–$130k" },
  { id: 3, title: "UI/UX Designer", company: "Creativio", location: "Remote", type: "Contract", salary: "$60k–$85k" },
  { id: 4, title: "Product Manager", company: "LaunchPad", location: "San Francisco, CA", type: "Full-time", salary: "$100k–$140k" },
  { id: 5, title: "DevOps Engineer", company: "CloudBase", location: "Remote", type: "Full-time", salary: "$95k–$125k" },
  { id: 6, title: "Data Analyst", company: "InsightCo", location: "Austin, TX", type: "Part-time", salary: "$50k–$70k" },
];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const filtered = JOBS.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <Link href="/" className="text-2xl font-bold text-blue-600">✈ Job Pilot</Link>
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/jobs" className="text-blue-600 font-semibold">Browse Jobs</Link>
          <Link href="/tracker" className="hover:text-blue-600">My Tracker</Link>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Browse Jobs</h1>
        <input
          type="text"
          placeholder="Search by title or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <div className="flex flex-col gap-4">
          {filtered.length === 0 && (
            <p className="text-gray-500 text-center py-12">No jobs found.</p>
          )}
          {filtered.map((job) => (
            <div key={job.id} className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-gray-500 text-sm">{job.company} · {job.location}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">{job.type}</span>
                  <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">{job.salary}</span>
                </div>
              </div>
              <Link
                href={`/tracker?apply=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}`}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Apply
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
