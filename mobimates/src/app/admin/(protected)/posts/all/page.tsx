"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PostDto } from "@company/shared";
import { adminApi } from "@/lib/admin-api";
import { shouldUseUnoptimizedImage } from "@/lib/upload-image";

const STATUS_COLORS: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  PENDING_REVIEW: "bg-yellow-100 text-yellow-800",
  PUBLISHED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function postPreview(post: PostDto) {
  if (post.excerpt?.trim()) return post.excerpt.trim();
  const text = stripHtml(post.body);
  return text.length > 220 ? `${text.slice(0, 220)}…` : text;
}

function PostCard({ post }: { post: PostDto }) {
  const preview = postPreview(post);

  return (
    <Link
      href={`/admin/posts/${post.id}/edit`}
      className="card-lift flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white shadow-[var(--shadow-soft)]"
    >
      <div className="relative aspect-[16/10] shrink-0 bg-[var(--color-cream-200)]">
        {post.coverImageUrl ? (
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 33vw"
            unoptimized={shouldUseUnoptimizedImage(post.coverImageUrl)}
          />
        ) : (
          <div className="flex h-full flex-col justify-center p-5">
            <p className="line-clamp-5 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              {preview || "No preview yet"}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[post.status] ?? ""}`}>
            {post.status.replace(/_/g, " ")}
          </span>
        </div>

        <h2 className="mt-3 font-[family-name:var(--font-display)] text-lg leading-snug text-[var(--color-forest)] line-clamp-2">
          {post.title}
        </h2>

        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
          {post.authorName ?? "Unknown author"}
        </p>

        {post.coverImageUrl && preview && (
          <p className="mt-2 text-sm text-[var(--color-ink-soft)] line-clamp-2">{preview}</p>
        )}

        <p className="mt-auto pt-4 text-xs text-[var(--color-ink-soft)]">
          Updated {new Date(post.updatedAt).toLocaleDateString()}
        </p>

        <span className="mt-3 text-sm font-medium text-[var(--color-amber)]">Edit post →</span>
      </div>
    </Link>
  );
}

export default function AllPostsPage() {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .listAllPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
          All posts
        </h1>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
          {posts.length} {posts.length === 1 ? "post" : "posts"} across all authors
        </p>
      </div>

      {loading && <p className="text-[var(--color-ink-soft)]">Loading posts…</p>}

      {!loading && posts.length === 0 && (
        <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-line)] bg-white p-12 text-center">
          <p className="text-[var(--color-ink-soft)]">No posts yet.</p>
        </div>
      )}

      {!loading && posts.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
