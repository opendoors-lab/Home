import Link from "next/link";
import Image from "next/image";
import { fetchLatestPosts } from "@/lib/public-api";
import { shouldUseUnoptimizedImage } from "@/lib/upload-image";

export default async function LatestPosts() {
  const posts = await fetchLatestPosts(3);
  if (!posts.length) return null;

  return (
    <section className="border-t border-[var(--color-line)] bg-[var(--color-cream-200)]/40 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
              Latest from the blog
            </h2>
            <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
              News and updates from the MobiMates team
            </p>
          </div>
          <Link href="/blog" className="text-sm font-medium text-[var(--color-amber)] hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
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
                  <div className="flex h-full items-center justify-center text-[var(--color-ink-soft)]">
                    No image
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-forest)] line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="mt-2 text-sm text-[var(--color-ink-soft)] line-clamp-2">{post.excerpt}</p>
                )}
                <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
                  {post.authorName ?? "Team"} ·{" "}
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString()
                    : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
