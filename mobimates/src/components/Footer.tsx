import Link from "next/link";
import { brand } from "@/lib/content";
import { footerNav, routes } from "@/lib/routes";

function LinkGroup({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-forest)]">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-amber)]"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-line)] bg-[var(--color-cream-200)]/50">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href={routes.home}
              className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]"
            >
              {brand.name}
            </Link>
            <p className="amharic mt-3 text-lg font-semibold text-[var(--color-amber)]">
              «{brand.taglineAm}»
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--color-ink-soft)]">
              Community-driven peer-to-peer carpooling for {brand.city}. Altruism first —
              cost-sharing as a welcome plus.
            </p>
          </div>
          <LinkGroup title="Product" links={footerNav.product} />
          <LinkGroup title="Community" links={footerNav.community} />
          <LinkGroup title="Support" links={footerNav.support} />
        </div>

        <div className="route-line mt-12 w-full max-w-md opacity-60" aria-hidden />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-line)] pt-8 text-sm text-[var(--color-ink-soft)] md:flex-row">
          <p>
            © {new Date().getFullYear()} {brand.name} · {brand.city}, Ethiopia
          </p>
          <p className="text-center font-medium text-[var(--color-forest)]">
            “{brand.tagline}”
          </p>
        </div>
      </div>
    </footer>
  );
}
