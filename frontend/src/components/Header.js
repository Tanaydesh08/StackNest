"use client";

import { LogOut, RefreshCw } from "lucide-react";

export default function Header({ isLoggedIn, onLogout, onRefresh, loading }) {
  return (
    <header className="sticky top-0 z-10 border-b border-white/70 bg-white/80 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
            Community Forum
          </p>
          <h1 className="text-2xl font-black text-stone-950">StackNest</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-stone-800 shadow-sm hover:border-emerald-200 hover:bg-emerald-50"
            aria-label="Refresh feed"
            title="Refresh feed"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>

          {isLoggedIn ? (
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex h-10 items-center gap-2 rounded-md bg-stone-950 px-3 text-sm font-semibold text-white shadow-sm hover:bg-stone-800"
              aria-label="Log out"
              title="Log out"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <span className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900">
              Guest mode
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
