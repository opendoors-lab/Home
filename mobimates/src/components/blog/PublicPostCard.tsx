import Image from "next/image";
import Link from "next/link";
import type { PublicPostSummary } from "@company/shared";
import { shouldUseUnoptimizedImage } from "@/lib/upload-image";

export default function PublicPostCard({ post }: { post: PublicPostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-lift flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white shadow-[var(--shadow-soft)]"
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
          <div className="flex h-full items-center justify-center p-5 text-center text-sm text-[var(--color-ink-soft)]">
            {post.excerpt ? (
              <p className="line-clamp-4">{post.excerpt}</p>
            ) : (
              "No cover image"
            )}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-[family-name:var(--font-display)] text-lg leading-snug text-[var(--color-forest)] line-clamp-2">
          {post.title}
        </h2>
        {post.excerpt && post.coverImageUrl && (
          <p className="mt-2 text-sm text-[var(--color-ink-soft)] line-clamp-2">{post.excerpt}</p>
        )}
        <p className="mt-auto pt-4 text-xs text-[var(--color-ink-soft)]">
          {post.authorName ?? "Team"} · {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        <span className="mt-3 text-sm font-medium text-[var(--color-amber)]">Read more →</span>
      </div>
    </Link>
  );
}
