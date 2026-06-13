import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <span className="text-2xl font-bold text-blue-600">✈ Job Pilot</span>
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/jobs" className="hover:text-blue-600">Browse Jobs</Link>
          <Link href="/tracker" className="hover:text-blue-600">My Tracker</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-br from-blue-50 to-indigo-100 flex-1">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Land Your Dream Job <br />
          <span className="text-blue-600">with Confidence</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mb-8">
          Job Pilot helps you discover opportunities, track applications, and stay organized throughout your job search journey.
        </p>
        <div className="flex gap-4">
          <Link href="/jobs" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            Browse Jobs
          </Link>
          <Link href="/tracker" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition">
            Track Applications
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-8 max-w-5xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-12">Why Job Pilot?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "🔍", title: "Smart Search", desc: "Find jobs matching your skills and preferences." },
            { icon: "📋", title: "Application Tracker", desc: "Keep track of every application in one place." },
            { icon: "📊", title: "Progress Insights", desc: "Visualize your job search progress at a glance." },
          ].map((f) => (
            <div key={f.title} className="p-6 rounded-xl border border-gray-100 shadow-sm text-center hover:shadow-md transition">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-400 border-t border-gray-100">
        © {new Date().getFullYear()} Job Pilot. All rights reserved.
      </footer>
    </div>
  );
}
