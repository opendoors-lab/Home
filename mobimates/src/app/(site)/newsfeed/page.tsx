import type { Metadata } from "next";
import Link from "next/link";
import { LogIn } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import PublicPostCard from "@/components/blog/PublicPostCard";
import { routes } from "@/lib/routes";
import { fetchPublicPosts } from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Newsfeed — MobiMates",
  description: "Company news, blog posts, and admin access for the MobiMates team.",
};

export const revalidate = 60;

export default async function NewsfeedPage() {
  const { items: posts, total } = await fetchPublicPosts(1, 12);

  return (
    <>
      <PageHero
        eyebrow="News & updates"
        title="Newsfeed"
        description="Published stories from the MobiMates team."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
              Posts
            </h2>
            <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
              {total > 0
                ? `${total} published ${total === 1 ? "story" : "stories"} from the team`
                : "Stories will appear here once published."}
            </p>
          </div>
          {total > 0 && (
            <Link
              href={routes.blog}
              className="text-sm font-medium text-[var(--color-amber)] hover:underline"
            >
              View all on blog →
            </Link>
          )}
        </div>

        {posts.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PublicPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[var(--radius-card)] border border-dashed border-[var(--color-line)] bg-white p-12 text-center">
            <p className="text-[var(--color-ink-soft)]">No published posts yet.</p>
            <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
              Check back soon for news and updates from the team.
            </p>
          </div>
        )}

        <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white p-8 shadow-[var(--shadow-soft)] md:flex-row md:items-center">
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
      </section>
    </>
  );
}
