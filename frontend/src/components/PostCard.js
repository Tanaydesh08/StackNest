"use client";

import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { addComment, getComments, voteOnPost } from "@/lib/api";

export default function PostCard({ post, token, onChanged }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [voting, setVoting] = useState(false);

  async function loadComments() {
    setLoading(true);
    setMessage("");

    try {
      const result = await getComments(post.id);
      setComments(result || []);
      setShowComments(true);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleVote(value) {
    if (!token) {
      setMessage("Login is required for voting.");
      return;
    }

    setVoting(true);
    setMessage("");

    try {
      const result = await voteOnPost(post.id, value, token);
      setMessage(typeof result === "string" ? result : "Vote saved.");
      await onChanged();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setVoting(false);
    }
  }

  async function handleComment(event) {
    event.preventDefault();

    if (!token) {
      setMessage("Login is required for commenting.");
      return;
    }

    try {
      await addComment(post.id, commentText, token);
      setCommentText("");
      await loadComments();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <article className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt=""
          className="h-56 w-full object-cover"
        />
      )}

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-stone-500">
          <span className="rounded-md bg-emerald-50 px-2 py-1 text-emerald-800">
            {post.communityName || post.communitySlug}
          </span>
          <span>Posted by {post.authorUsername || "unknown"}</span>
          {post.createdAt && <span>{new Date(post.createdAt).toLocaleString()}</span>}
        </div>

        <h2 className="mt-3 text-xl font-bold leading-tight text-stone-950">{post.title}</h2>
        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-stone-700">{post.content}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <div className="inline-flex h-10 items-center overflow-hidden rounded-md border border-stone-300 bg-stone-50">
            <button
              type="button"
              onClick={() => handleVote(1)}
              disabled={voting}
              className="inline-flex h-full items-center gap-2 px-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
              title="Upvote"
            >
              <ThumbsUp size={16} />
              Upvote
            </button>
            <span className="flex h-full min-w-12 items-center justify-center border-x border-stone-300 bg-white px-3 text-sm font-bold text-stone-950">
              {post.voteCount ?? 0}
            </span>
            <button
              type="button"
              onClick={() => handleVote(-1)}
              disabled={voting}
              className="inline-flex h-full items-center gap-2 px-3 text-sm font-semibold text-rose-700 hover:bg-rose-50"
              title="Downvote"
            >
              <ThumbsDown size={16} />
              Downvote
            </button>
          </div>
          <button
            type="button"
            onClick={showComments ? () => setShowComments(false) : loadComments}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-stone-300 bg-white px-3 text-sm font-semibold text-stone-800 hover:bg-stone-100"
            title="Comments"
          >
            <MessageCircle size={16} />
            {showComments ? "Hide comments" : loading ? "Loading..." : "Comments"}
          </button>
        </div>

        {message && <p className="mt-3 text-sm font-medium text-amber-800">{message}</p>}

        {showComments && (
          <div className="mt-4 border-t border-stone-200 pt-4">
            <form onSubmit={handleComment} className="flex gap-2">
              <input
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                required
                className="h-10 min-w-0 flex-1 rounded-md border border-stone-300 px-3 text-sm outline-none focus:border-emerald-600"
                placeholder="Add a comment"
              />
              <button
                type="submit"
                className="h-10 rounded-md bg-stone-950 px-3 text-sm font-semibold text-white hover:bg-stone-800"
              >
                Send
              </button>
            </form>

            <div className="mt-3 space-y-2">
              {comments.length === 0 ? (
                <p className="text-sm text-stone-500">No comments yet.</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="rounded-md bg-stone-100 p-3">
                    <p className="text-sm text-stone-800">{comment.content}</p>
                    <p className="mt-1 text-xs font-semibold text-stone-500">
                      {comment.authorUsername}{" "}
                      {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : ""}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
