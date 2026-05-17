"use client";

import { ImageUp, Send } from "lucide-react";
import { useState } from "react";
import { createPost, uploadImage } from "@/lib/api";

const emptyForm = {
  title: "",
  content: "",
  communitySlug: "",
  imageUrl: "",
};

export default function PostComposer({ communities, token, onCreated }) {
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage("");

    try {
      const result = await uploadImage(file);
      setForm({ ...form, imageUrl: result.imageUrl });
      setMessage("Image uploaded.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await createPost(form, token);
      setForm(emptyForm);
      setMessage("Post created.");
      onCreated();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-stone-950">Create a post</h2>
        <p className="mt-2 text-sm text-stone-600">Login or signup to create posts and comments.</p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-stone-950">Create a post</h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
          name="title"
          value={form.title}
          onChange={updateField}
          required
          className="h-11 w-full rounded-md border border-stone-300 bg-stone-50 px-3 outline-none focus:border-emerald-600 focus:bg-white"
          placeholder="Post title"
        />

        <select
          name="communitySlug"
          value={form.communitySlug}
          onChange={updateField}
          required
          className="h-11 w-full rounded-md border border-stone-300 bg-stone-50 px-3 outline-none focus:border-emerald-600 focus:bg-white"
        >
          <option value="">Select community</option>
          {communities.map((community) => (
            <option key={community.id} value={community.slug}>
              {community.name}
            </option>
          ))}
        </select>

        <textarea
          name="content"
          value={form.content}
          onChange={updateField}
          required
          rows={5}
          className="w-full resize-none rounded-md border border-stone-300 bg-stone-50 px-3 py-2 outline-none focus:border-emerald-600 focus:bg-white"
          placeholder="Write your post..."
        />

        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={updateField}
            className="h-11 w-full rounded-md border border-stone-300 bg-stone-50 px-3 outline-none focus:border-emerald-600 focus:bg-white"
            placeholder="Optional image URL"
          />

          <label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-stone-300 bg-stone-100 px-3 text-sm font-semibold text-stone-800 hover:bg-stone-200">
            <ImageUp size={16} />
            {uploading ? "Uploading..." : "Upload"}
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || communities.length === 0}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-emerald-700 font-semibold text-white hover:bg-emerald-800"
        >
          <Send size={16} />
          {loading ? "Posting..." : "Publish post"}
        </button>

        {message && <p className="text-sm font-medium text-stone-700">{message}</p>}
      </form>
    </section>
  );
}
