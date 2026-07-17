import Link from "next/link";
import { Mail, HelpCircle, Shield, FileText } from "lucide-react";
import { routes } from "@/lib/routes";

const CONTACT = {
  company: "OpenDoors Africa Solutions PLC",
  brand: "MobiMates",
  city: "Addis Ababa, Ethiopia",
  email: "support@themobimates.com",
} as const;

const resources = [
  {
    href: routes.faq,
    icon: HelpCircle,
    title: "FAQ",
    body: "Answers about carpooling, verification, payments, and safety.",
  },
  {
    href: routes.privacy,
    icon: Shield,
    title: "Privacy Policy",
    body: "How we collect, use, and protect your personal data.",
  },
  {
    href: routes.terms,
    icon: FileText,
    title: "Terms & Conditions",
    body: "The rules governing use of the MobiMates platform.",
  },
] as const;

export default function SupportPageContent() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <header className="border-b border-[var(--color-line)] pb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-amber)]">
          Help
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight text-[var(--color-forest)] md:text-5xl">
          Support
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--color-ink-soft)]">
          Need help with {CONTACT.brand}? Reach our team or browse common resources below.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
          Contact us
        </h2>
        <p className="mt-3 leading-relaxed text-[var(--color-ink-soft)]">
          For account issues, trip problems, safety concerns, payment questions, or general
          inquiries, email us. We aim to respond as promptly as possible during business hours.
        </p>

        <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-cream-200)]/40 p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-forest)] text-[var(--color-amber-300)]">
              <Mail className="h-5 w-5" />
            </span>
            <address className="not-italic">
              <p className="font-semibold text-[var(--color-forest)]">{CONTACT.company}</p>
              <p className="mt-1 text-[var(--color-ink-soft)]">{CONTACT.city}</p>
              <p className="mt-3">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-lg font-semibold text-[var(--color-amber)] underline-offset-2 hover:underline"
                >
                  {CONTACT.email}
                </a>
              </p>
            </address>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
          What we can help with
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--color-ink-soft)]">
          <li>Account registration, OTP login, and profile updates</li>
          <li>Identity or vehicle verification status</li>
          <li>Matching, bookings, cancellations, and no-shows</li>
          <li>Cost-sharing payments, wallet balance, and platform fees</li>
          <li>Safety reports and community conduct concerns</li>
          <li>
            Account deletion requests — see our{" "}
            <Link
              href={routes.deleteAccount}
              className="font-medium text-[var(--color-amber)] underline-offset-2 hover:underline"
            >
              Delete Account
            </Link>{" "}
            page
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
          Resources
        </h2>
        <ul className="mt-6 space-y-4">
          {resources.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="flex gap-4 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white/80 p-5 transition-colors hover:border-[var(--color-amber)]/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-cream-200)] text-[var(--color-forest)]">
                  <r.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold text-[var(--color-forest)]">{r.title}</span>
                  <span className="mt-1 block text-sm text-[var(--color-ink-soft)]">{r.body}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-12 text-sm text-[var(--color-ink-soft)]">
        Operated by {CONTACT.company} under the {CONTACT.brand} brand.
      </p>
    </article>
  );
}
