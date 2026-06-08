import type { Metadata } from "next";
import Link from "next/link";
import { LogIn, Newspaper } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { routes } from "@/lib/routes";
import { fetchPublicPosts } from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Newsfeed — MobiMates",
  description: "Company news, blog posts, and admin access for the MobiMates team.",
};

export const revalidate = 60;

export default async function NewsfeedPage() {
  const { items: recentPosts } = await fetchPublicPosts(1, 3);

  return (
    <>
      <PageHero
        eyebrow="News & updates"
        title="Newsfeed"
        description="Read published stories from the team or sign in to write, review, and publish blog posts."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white p-8 shadow-[var(--shadow-soft)] md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-forest)] text-white">
              <LogIn className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-forest)]">
                Team login
              </h2>
              <p className="mt-1 max-w-md text-sm text-[var(--color-ink-soft)]">
                Authors, reviewers, and admins — sign in with your email and password.
              </p>
            </div>
          </div>
          <Link
            href={routes.adminLogin}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-amber)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-105"
          >
            <LogIn className="h-4 w-4" />
            Login
          </Link>
        </div>

        {recentPosts.length > 0 && (
          <div className="mt-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
                  Latest posts
                </h2>
                <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                  Recently published on the blog.
                </p>
              </div>
              <Link
                href={routes.blog}
                className="text-sm font-medium text-[var(--color-amber)] hover:underline"
              >
                View all →
              </Link>
            </div>
            <ul className="mt-6 space-y-3">
              {recentPosts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-3 rounded-xl border border-[var(--color-line)] bg-white px-5 py-4 transition-colors hover:border-[var(--color-amber)]/40"
                  >
                    <Newspaper className="h-5 w-5 shrink-0 text-[var(--color-amber)]" />
                    <div className="min-w-0 flex-1">
                      <span className="font-medium text-[var(--color-forest)]">{post.title}</span>
                      {post.publishedAt && (
                        <span className="ml-2 text-xs text-[var(--color-ink-soft)]">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
