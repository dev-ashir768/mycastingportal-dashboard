"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Role {
  id: string;
  name: string;
  description: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  role: {
    id: string;
    name: string;
    description: string;
  };
  isActive: boolean;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();

  const [user] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const userData = localStorage.getItem("user");
    return userData ? (JSON.parse(userData) as User) : null;
  });

  const [roles, setRoles] = useState<Role[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || !user) {
      router.replace("/");
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    fetch(`${baseUrl}/v1/admin/roles/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((json) => {
        if (json.data && Array.isArray(json.data)) {
          setRoles(json.data);
        } else if (Array.isArray(json)) {
          setRoles(json);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingRoles(false));
  }, [router, user]);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    router.replace("/");
  }

  if (!user) return null;

  const userRole = roles.find((r) => r.id === user.role.id) ?? user.role;
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.069A1 1 0 0121 8.868v6.264a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-lg">
              Actor Agency
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">
                {user.fullName}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 font-bold text-sm">
                {user.fullName.charAt(0).toUpperCase()}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-linear-to-r from-red-600 to-red-500 rounded-2xl p-6 text-white shadow-sm">
          <p className="text-red-100 text-sm font-medium mb-1">Welcome back</p>
          <h2 className="text-3xl font-bold">{user.fullName} 👋</h2>
          <p className="text-red-100 text-sm mt-2">
            {userRole.name} &mdash; {userRole.description}
          </p>
        </div>

        {/* Info Notice */}
        <div className="bg-white border border-red-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Important Notice
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We&apos;ve safely received your information and will send you an
                email update soon. One of our sales team members will reach out
                to you shortly.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Account Status
            </p>
            <div className="flex items-center gap-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${user.isActive ? "bg-green-500" : "bg-gray-300"}`}
              />
              <span className="text-lg font-bold text-gray-900">
                {user.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Role
            </p>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-sm font-semibold">
              {userRole.name}
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Member Since
            </p>
            <p className="text-lg font-bold text-gray-900">{memberSince}</p>
          </div>
        </div>

        {/* All Roles */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg
              className="w-4 h-4 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Available Roles
          </h3>

          {loadingRoles ? (
            <div className="flex items-center gap-2 text-gray-400 text-sm py-4">
              <svg
                className="animate-spin w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Loading roles...
            </div>
          ) : roles.length === 0 ? (
            <p className="text-sm text-gray-400 py-4">No roles found.</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="py-3 flex items-start justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      {role.name}
                      {role.id === user.role.id && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                          Your Role
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {role.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
