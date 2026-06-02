"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, CarFront } from "lucide-react";
import { brand } from "@/lib/content";
import { mainNav, routes } from "@/lib/routes";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === routes.home ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)]/70 bg-[var(--color-cream)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5">
        <Link
          href={routes.home}
          className="group flex items-center gap-2.5 font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-forest)] text-[var(--color-amber)] shadow-sm transition-transform group-hover:scale-105">
            <CarFront className="h-5 w-5" strokeWidth={2.25} />
          </span>
          {brand.name}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(n.href)
                  ? "bg-[var(--color-forest)] text-[var(--color-cream)]"
                  : "text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-200)] hover:text-[var(--color-forest)]"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={routes.getStarted}
            className="hidden rounded-full bg-[var(--color-amber)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-105 sm:inline-flex"
          >
            Get the app
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-line)] text-[var(--color-forest)] lg:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--color-line)] bg-[var(--color-cream)] px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {mainNav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-medium ${
                  isActive(n.href)
                    ? "bg-[var(--color-forest)] text-[var(--color-cream)]"
                    : "text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-200)]"
                }`}
              >
                {n.label}
              </Link>
            ))}
            <Link
              href={routes.getStarted}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-[var(--color-amber)] px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Get the app
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
