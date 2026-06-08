import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { fetchPublicPosts } from "@/lib/public-api";
import { shouldUseUnoptimizedImage } from "@/lib/upload-image";

export const metadata: Metadata = {
  title: "Blog — MobiMates",
  description: "News and updates from the MobiMates team.",
};

export const revalidate = 60;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1", 10);
  const data = await fetchPublicPosts(page, 12);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-forest)]">
        Blog
      </h1>
      <p className="mt-3 text-[var(--color-ink-soft)]">
        Stories, updates, and insights from our team.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="card-lift overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-soft)]"
          >
            <div className="relative aspect-[16/10] bg-[var(--color-cream-200)]">
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
                <div className="flex h-full items-center justify-center text-sm text-[var(--color-ink-soft)]">No image</div>
              )}
            </div>
            <div className="p-5">
              <h2 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-forest)] line-clamp-2">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mt-2 text-sm text-[var(--color-ink-soft)] line-clamp-2">{post.excerpt}</p>
              )}
              <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
                {post.authorName ?? "Team"} · {new Date(post.publishedAt).toLocaleDateString()}
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-[var(--color-amber)]">
                Read more →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {data.totalPages > 1 && (
        <div className="mt-12 flex justify-center gap-2">
          {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/blog?page=${p}`}
              className={`rounded-lg px-4 py-2 text-sm ${
                p === page
                  ? "bg-[var(--color-forest)] text-white"
                  : "border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-amber)]"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}

      {!data.items.length && (
        <p className="mt-12 text-center text-[var(--color-ink-soft)]">No published posts yet.</p>
      )}
    </div>
  );
}
