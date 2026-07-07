import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchPostBySlug } from "@/lib/public-api";
import { shouldUseUnoptimizedImage } from "@/lib/upload-image";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — MobiMates Blog`,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/blog" className="text-sm text-[var(--color-amber)] hover:underline">
        ← Back to blog
      </Link>

      {post.coverImageUrl && (
        <div className="relative mt-8 aspect-[21/9] overflow-hidden rounded-[var(--radius-card)]">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width:768px) 100vw, 768px"
            unoptimized={shouldUseUnoptimizedImage(post.coverImageUrl)}
          />
        </div>
      )}

      <header className="mt-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-forest)]">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-[var(--color-ink-soft)]">
          {post.authorName ?? "MobiMates Team"} ·{" "}
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <div
        className="post-render mt-10"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </article>
  );
}
