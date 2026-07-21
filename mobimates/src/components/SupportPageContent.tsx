import Link from "next/link";
import {
  Mail,
  HelpCircle,
  Shield,
  FileText,
  Trash2,
  AlertTriangle,
  Clock,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import PageCta from "@/components/PageCta";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { routes } from "@/lib/routes";

const CONTACT = {
  company: "OpenDoors Africa Solutions PLC",
  brand: "MobiMates",
  city: "Addis Ababa, Ethiopia",
  email: "support@themobimates.com",
} as const;

const helpTopics = [
  "Account registration, OTP login, and profile updates",
  "Identity or vehicle verification status",
  "Matching, bookings, cancellations, and no-shows",
  "Cost-sharing payments, wallet balance, and platform fees",
  "Safety reports and community conduct concerns",
  "Data privacy requests and account deletion",
] as const;

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
  {
    href: routes.deleteAccount,
    icon: Trash2,
    title: "Delete Account",
    body: "Request deletion of your MobiMates account and personal data.",
  },
] as const;

export default function SupportPageContent() {
  return (
    <>
      <PageHero
        eyebrow="Help center"
        title="Support"
        description={`Need help with ${CONTACT.brand}? Contact our team or browse the resources below.`}
      />

      <Section className="!py-16 md:!py-20">
        <div className="mx-auto max-w-3xl">
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)] md:text-3xl">
              Contact us
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--color-ink-soft)]">
              For account issues, trip problems, safety concerns, payment questions, or general
              inquiries, email us. Include your registered phone number and a short description of
              the issue so we can help faster.
            </p>

            <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-cream-200)]/50 p-6 md:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-forest)] text-[var(--color-amber-300)]">
                  <Mail className="h-6 w-6" />
                </span>
                <div className="flex-1">
                  <address className="not-italic">
                    <p className="font-semibold text-[var(--color-forest)]">{CONTACT.company}</p>
                    <p className="mt-1 text-[var(--color-ink-soft)]">{CONTACT.city}</p>
                    <p className="mt-3">
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="text-xl font-semibold text-[var(--color-amber)] underline-offset-2 hover:underline"
                      >
                        {CONTACT.email}
                      </a>
                    </p>
                  </address>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button
                      href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("MobiMates support request")}`}
                      external
                    >
                      Email support
                    </Button>
                    <Button href={routes.faq} variant="secondary">
                      Browse FAQ
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white/70 px-5 py-4 text-sm text-[var(--color-ink-soft)]">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-amber)]" aria-hidden />
              <p>
                We aim to respond during business hours in Addis Ababa. For urgent safety
                emergencies, contact national emergency services first, then report the incident to
                us.
              </p>
            </div>
          </section>

          <section className="mt-14">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)] md:text-3xl">
              What we can help with
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {helpTopics.map((topic) => (
                <li
                  key={topic}
                  className="rounded-2xl border border-[var(--color-line)] bg-white/80 px-4 py-3 text-sm leading-relaxed text-[var(--color-ink-soft)]"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14">
            <div className="flex items-start gap-3 rounded-[var(--radius-card)] border border-[var(--color-amber)]/35 bg-[var(--color-amber)]/8 px-5 py-5">
              <AlertTriangle
                className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-amber)]"
                aria-hidden
              />
              <div>
                <h2 className="text-lg font-bold text-[var(--color-forest)]">Safety first</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                  In a life-threatening emergency, accident, or security breach, contact national
                  emergency services immediately. Once you are safe, email{" "}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="font-medium text-[var(--color-amber)] underline-offset-2 hover:underline"
                  >
                    {CONTACT.email}
                  </a>{" "}
                  so we can document the incident and protect your account.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-14">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)] md:text-3xl">
              Resources
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {resources.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="flex h-full gap-4 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white/80 p-5 transition-colors hover:border-[var(--color-amber)]/50"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-cream-200)] text-[var(--color-forest)]">
                      <r.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-[var(--color-forest)]">
                        {r.title}
                      </span>
                      <span className="mt-1 block text-sm text-[var(--color-ink-soft)]">
                        {r.body}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <p className="mt-12 text-sm text-[var(--color-ink-soft)]">
            Operated by {CONTACT.company} under the {CONTACT.brand} brand.
          </p>
        </div>
      </Section>

      <PageCta
        title="Still need a hand?"
        body="Email support@themobimates.com or check the FAQ for quick answers about rides, verification, and payments."
      />
    </>
  );
}
