"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2, Clock, User, XCircle } from "lucide-react";
import type { PostDto } from "@company/shared";
import { adminApi } from "@/lib/admin-api";
import { shouldUseUnoptimizedImage } from "@/lib/upload-image";

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function postPreview(post: PostDto) {
  if (post.excerpt?.trim()) return post.excerpt.trim();
  const text = stripHtml(post.body);
  return text.length > 160 ? `${text.slice(0, 160)}…` : text;
}

function ApprovalProgress({ count }: { count: number }) {
  const pct = Math.min(100, (count / 2) * 100);
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between text-xs text-[var(--color-ink-soft)]">
        <span>{count} of 2 approvals</span>
        {count >= 2 ? (
          <span className="font-medium text-green-700">Ready to publish</span>
        ) : (
          <span>{2 - count} more needed</span>
        )}
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--color-cream-200)]">
        <div
          className="h-full rounded-full bg-[var(--color-amber)] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function QueueItem({
  post,
  selected,
  onSelect,
}: {
  post: PostDto;
  selected: boolean;
  onSelect: () => void;
}) {
  const preview = postPreview(post);
  const approvers = post.approvals.filter((a) => a.decision === "APPROVE");

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full overflow-hidden rounded-[var(--radius-card)] border text-left transition-all ${
        selected
          ? "border-[var(--color-amber)] bg-[var(--color-cream-200)]/60 shadow-[var(--shadow-soft)]"
          : "border-[var(--color-line)] bg-white hover:border-[var(--color-amber)]/50"
      }`}
    >
      <div className="flex gap-0 sm:gap-0">
        <div className="relative h-24 w-28 shrink-0 bg-[var(--color-cream-200)] sm:h-auto sm:w-32">
          {post.coverImageUrl ? (
            <Image
              src={post.coverImageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="128px"
              unoptimized={shouldUseUnoptimizedImage(post.coverImageUrl)}
            />
          ) : (
            <div className="flex h-full items-center p-3">
              <p className="line-clamp-4 text-xs leading-relaxed text-[var(--color-ink-soft)]">
                {preview}
              </p>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1 p-4">
          <p className="font-medium text-[var(--color-forest)] line-clamp-2">{post.title}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-[var(--color-ink-soft)]">
            <User size={12} />
            {post.authorName ?? "Unknown author"}
          </p>
          <ApprovalProgress count={post.approvalCount} />
          {approvers.length > 0 && (
            <p className="mt-2 text-xs text-[var(--color-ink-soft)] line-clamp-1">
              Approved by {approvers.map((a) => a.reviewerName ?? "Reviewer").join(", ")}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

function ReviewPanel({
  post,
  comment,
  setComment,
  loading,
  onApprove,
  onReject,
}: {
  post: PostDto;
  comment: string;
  setComment: (v: string) => void;
  loading: boolean;
  onApprove: () => void;
  onReject: () => void;
}) {
  const approvers = post.approvals.filter((a) => a.decision === "APPROVE");

  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white shadow-[var(--shadow-soft)]">
      {post.coverImageUrl && (
        <div className="relative aspect-[21/9] bg-[var(--color-cream-200)]">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
            unoptimized={shouldUseUnoptimizedImage(post.coverImageUrl)}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
            Pending review
          </span>
          <span className="text-xs text-[var(--color-ink-soft)]">
            Submitted {new Date(post.updatedAt).toLocaleDateString()}
          </span>
        </div>

        <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
          {post.title}
        </h2>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-[var(--color-ink-soft)]">
          <User size={14} />
          {post.authorName ?? "Unknown author"}
        </p>

        {post.excerpt && (
          <p className="mt-4 rounded-lg bg-[var(--color-cream-200)]/50 px-4 py-3 text-sm italic text-[var(--color-ink-soft)]">
            {post.excerpt}
          </p>
        )}

        <ApprovalProgress count={post.approvalCount} />

        {approvers.length > 0 && (
          <ul className="mt-4 space-y-2">
            {approvers.map((a) => (
              <li
                key={a.id}
                className="flex items-center gap-2 text-sm text-[var(--color-ink-soft)]"
              >
                <CheckCircle2 size={16} className="shrink-0 text-green-600" />
                <span>
                  {a.reviewerName ?? "Reviewer"} approved{" "}
                  <span className="text-xs">
                    · {new Date(a.createdAt).toLocaleDateString()}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="review-prose mt-6 max-h-[min(420px,40vh)] overflow-y-auto rounded-xl border border-[var(--color-line)] bg-[var(--color-cream)]/30 p-5">
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>

        <div className="mt-6 border-t border-[var(--color-line)] pt-6">
          <p className="text-sm font-medium text-[var(--color-forest)]">Your decision</p>
          <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
            Two approvals publish the post. You cannot approve your own submission.
          </p>

          <button
            type="button"
            disabled={loading}
            onClick={onApprove}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--color-forest)] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            <CheckCircle2 size={16} />
            {loading ? "Saving…" : "Approve post"}
          </button>

          <div className="mt-6 rounded-xl border border-red-200 bg-red-50/50 p-4">
            <p className="flex items-center gap-1.5 text-sm font-medium text-red-900">
              <XCircle size={16} />
              Reject post
            </p>
            <p className="mt-1 text-xs text-red-800/80">
              Rejection clears existing approvals and returns the post to the author.
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Explain what needs to change…"
              rows={3}
              className="mt-3 w-full rounded-lg border border-red-200 bg-white px-3 py-2 text-sm"
            />
            <button
              type="button"
              disabled={loading || !comment.trim()}
              onClick={onReject}
              className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              Reject with feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReviewPage() {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [selected, setSelected] = useState<PostDto | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  function refresh() {
    return adminApi
      .listPendingPosts()
      .then((data) => {
        setPosts(data);
        setSelected((prev) => {
          if (!prev) return data[0] ?? null;
          return data.find((p) => p.id === prev.id) ?? data[0] ?? null;
        });
      })
      .catch(console.error)
      .finally(() => setInitialLoading(false));
  }

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    setComment("");
  }, [selected?.id]);

  async function approve(id: string) {
    setLoading(true);
    try {
      await adminApi.approvePost(id);
      await refresh();
    } finally {
      setLoading(false);
    }
  }

  async function reject(id: string) {
    if (!comment.trim()) return;
    setLoading(true);
    try {
      await adminApi.rejectPost(id, comment);
      setComment("");
      await refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
          Review queue
        </h1>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--color-ink-soft)]">
          <Clock size={14} />
          {initialLoading
            ? "Loading…"
            : `${posts.length} ${posts.length === 1 ? "post" : "posts"} awaiting review`}
        </p>
      </div>

      {initialLoading && (
        <p className="text-[var(--color-ink-soft)]">Loading review queue…</p>
      )}

      {!initialLoading && posts.length === 0 && (
        <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-line)] bg-white p-16 text-center">
          <CheckCircle2 size={40} className="mx-auto text-[var(--color-ink-soft)]/40" />
          <p className="mt-4 font-medium text-[var(--color-forest)]">All caught up</p>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            No posts are waiting for review right now.
          </p>
        </div>
      )}

      {!initialLoading && posts.length > 0 && (
        <div className="grid gap-8 xl:grid-cols-[minmax(280px,360px)_1fr]">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-soft)]">
              Queue
            </p>
            {posts.map((post) => (
              <QueueItem
                key={post.id}
                post={post}
                selected={selected?.id === post.id}
                onSelect={() => setSelected(post)}
              />
            ))}
          </div>

          {selected ? (
            <ReviewPanel
              post={selected}
              comment={comment}
              setComment={setComment}
              loading={loading}
              onApprove={() => approve(selected.id)}
              onReject={() => reject(selected.id)}
            />
          ) : (
            <div className="flex items-center justify-center rounded-[var(--radius-card)] border border-dashed border-[var(--color-line)] bg-white p-16 text-center">
              <p className="text-[var(--color-ink-soft)]">Select a post from the queue</p>
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        .review-prose h1,
        .review-prose h2,
        .review-prose h3 {
          font-family: var(--font-display);
          color: var(--color-forest);
          margin-top: 1.25em;
          margin-bottom: 0.5em;
        }
        .review-prose p {
          margin: 0.75em 0;
          line-height: 1.7;
          color: var(--color-ink);
        }
        .review-prose ul,
        .review-prose ol {
          margin: 0.75em 0;
          padding-left: 1.5em;
        }
        .review-prose blockquote {
          margin: 1em 0;
          padding-left: 1em;
          border-left: 3px solid var(--color-amber);
          color: var(--color-ink-soft);
          font-style: italic;
        }
        .review-prose img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 1em 0;
        }
        .review-prose a {
          color: var(--color-amber);
          text-decoration: underline;
        }
        .review-prose pre {
          overflow-x: auto;
          padding: 0.875rem;
          border-radius: 0.5rem;
          background: var(--color-cream-200);
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
