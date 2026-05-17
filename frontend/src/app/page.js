"use client";

import { useEffect, useMemo, useState } from "react";
import AuthPanel from "@/components/AuthPanel";
import CommunityPanel from "@/components/CommunityPanel";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import PostComposer from "@/components/PostComposer";
import { getCommunities, getPosts } from "@/lib/api";

export default function Home() {
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredPosts = useMemo(() => {
    if (!selectedSlug) return posts;
    return posts.filter((post) => post.communitySlug === selectedSlug);
  }, [posts, selectedSlug]);

  useEffect(() => {
    const savedToken = window.localStorage.getItem("stacknest_token");
    if (savedToken) {
      setToken(savedToken);
    }

    refreshData();
  }, []);

  async function refreshData() {
    setLoading(true);
    setMessage("");

    try {
      const [postData, communityData] = await Promise.all([
        getPosts(),
        getCommunities(),
      ]);

      setPosts(postData || []);
      setCommunities(communityData || []);
    } catch (error) {
      setMessage(
        `${error.message}. Make sure the Spring Boot backend is running on http://localhost:8080.`
      );
    } finally {
      setLoading(false);
    }
  }

  function handleAuthSuccess(newToken) {
    setToken(newToken);
    window.localStorage.setItem("stacknest_token", newToken);
  }

  function handleLogout() {
    setToken("");
    window.localStorage.removeItem("stacknest_token");
  }

  return (
    <main>
      <Header
        isLoggedIn={Boolean(token)}
        onLogout={handleLogout}
        onRefresh={refreshData}
        loading={loading}
      />

      <section className="border-b border-white/70">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative flex min-h-[310px] flex-col justify-end overflow-hidden rounded-lg bg-stone-950 p-6 text-white shadow-lg">
            <img
              src="/stacknest-cover.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/55 to-stone-900/10" />
            <p className="relative text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Ask, share, discuss
            </p>
            <h2 className="relative mt-2 max-w-2xl text-3xl font-black leading-tight">
              A clean Next.js frontend for the StackNest social platform.
            </h2>
            <p className="relative mt-3 max-w-2xl text-sm leading-6 text-stone-200">
              Browse communities, publish posts, vote, and discuss with comments using the Java backend APIs.
            </p>
          </div>

          <div className="grid content-start gap-4">
            <AuthPanel isLoggedIn={Boolean(token)} onAuthSuccess={handleAuthSuccess} />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-5">
          <CommunityPanel
            communities={communities}
            token={token}
            selectedSlug={selectedSlug}
            onSelect={setSelectedSlug}
            onCreated={refreshData}
          />
        </aside>

        <section className="space-y-5">
          <PostComposer communities={communities} token={token} onCreated={refreshData} />

          {message && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900">
              {message}
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-stone-950">
                {selectedSlug ? `/${selectedSlug}` : "Latest posts"}
              </h2>
              <p className="text-sm text-stone-600">
                {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
              </p>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="rounded-lg border border-dashed border-stone-300 bg-white p-8 text-center">
              <h3 className="text-lg font-bold text-stone-950">No posts to show</h3>
              <p className="mt-2 text-sm text-stone-600">
                Create a community first, then publish the first post.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} token={token} onChanged={refreshData} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
