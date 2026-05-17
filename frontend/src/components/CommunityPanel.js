"use client";

import { Plus, Users } from "lucide-react";
import { useState } from "react";
import { createCommunity } from "@/lib/api";

export default function CommunityPanel({ communities, token, selectedSlug, onSelect, onCreated }) {
  const [form, setForm] = useState({ name: "", description: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleCreate(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await createCommunity(form, token);
      setForm({ name: "", description: "" });
      setMessage("Community created.");
      onCreated();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <Users size={18} className="text-emerald-700" />
        <h2 className="text-lg font-bold text-stone-950">Communities</h2>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => onSelect("")}
          className={`w-full rounded-md px-3 py-2 text-left text-sm font-semibold ${
            selectedSlug === "" ? "bg-emerald-700 text-white shadow-sm" : "bg-stone-100 text-stone-800 hover:bg-stone-200"
          }`}
        >
          All posts
        </button>
        {communities.map((community) => (
          <button
            type="button"
            key={community.id}
            onClick={() => onSelect(community.slug)}
            className={`w-full rounded-md px-3 py-2 text-left text-sm ${
              selectedSlug === community.slug
                ? "bg-emerald-700 font-semibold text-white shadow-sm"
                : "bg-stone-100 text-stone-800 hover:bg-stone-200"
            }`}
          >
            <span className="block font-semibold">{community.name}</span>
            <span className="block text-xs opacity-80">/{community.slug}</span>
          </button>
        ))}
      </div>

      {token && (
        <form onSubmit={handleCreate} className="mt-5 space-y-3 border-t border-stone-200 pt-4">
          <h3 className="text-sm font-bold text-stone-800">Create community</h3>
          <input
            name="name"
            value={form.name}
            onChange={updateField}
            required
            className="h-10 w-full rounded-md border border-stone-300 px-3 text-sm outline-none focus:border-emerald-600"
            placeholder="Community name"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={updateField}
            required
            rows={3}
            className="w-full resize-none rounded-md border border-stone-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
            placeholder="What is this community about?"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-stone-950 text-sm font-semibold text-white hover:bg-stone-800"
          >
            <Plus size={16} />
            {loading ? "Creating..." : "Create"}
          </button>
          {message && <p className="text-sm text-stone-700">{message}</p>}
        </form>
      )}
    </section>
  );
}
