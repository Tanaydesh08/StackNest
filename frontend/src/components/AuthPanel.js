"use client";

import { LogIn, UserPlus } from "lucide-react";
import { useState } from "react";
import { loginUser, signupUser } from "@/lib/api";

const emptyForm = {
  username: "",
  email: "",
  password: "",
};

export default function AuthPanel({ isLoggedIn, onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) {
    return (
      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-800">
          Signed in
        </p>
        <h2 className="mt-2 text-xl font-bold text-stone-950">You can post, vote, and comment.</h2>
        <p className="mt-2 text-sm leading-6 text-stone-700">
          Use the composer below to create content in any community.
        </p>
      </section>
    );
  }

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = mode === "login" ? await loginUser(form) : await signupUser(form);
      onAuthSuccess(result.token);
      setForm(emptyForm);
      setMessage("Signed in successfully.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex rounded-md border border-stone-200 bg-stone-100 p-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex h-9 flex-1 items-center justify-center gap-2 rounded-md text-sm font-semibold ${
            mode === "login" ? "bg-white text-stone-950 shadow-sm" : "text-stone-600"
          }`}
        >
          <LogIn size={16} />
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`flex h-9 flex-1 items-center justify-center gap-2 rounded-md text-sm font-semibold ${
            mode === "signup" ? "bg-white text-stone-950 shadow-sm" : "text-stone-600"
          }`}
        >
          <UserPlus size={16} />
          Signup
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === "signup" && (
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-stone-700">Username</span>
            <input
              name="username"
              value={form.username}
              onChange={updateField}
              required
              className="h-11 w-full rounded-md border border-stone-300 bg-stone-50 px-3 outline-none focus:border-emerald-600 focus:bg-white"
              placeholder="User Name"
            />
          </label>
        )}

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-stone-700">Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            required
            className="h-11 w-full rounded-md border border-stone-300 bg-stone-50 px-3 outline-none focus:border-emerald-600 focus:bg-white"
            placeholder="you@example.com"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-stone-700">Password</span>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={updateField}
            required
            minLength={6}
            className="h-11 w-full rounded-md border border-stone-300 bg-stone-50 px-3 outline-none focus:border-emerald-600 focus:bg-white"
            placeholder="Minimum 6 characters"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="h-11 w-full rounded-md bg-emerald-700 font-semibold text-white hover:bg-emerald-800"
        >
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
        </button>

        {message && <p className="text-sm font-medium text-stone-700">{message}</p>}
      </form>
    </section>
  );
}
