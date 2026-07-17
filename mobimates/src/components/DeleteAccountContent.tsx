import Link from "next/link";
import { Trash2, Smartphone, Mail } from "lucide-react";
import { routes } from "@/lib/routes";

const CONTACT = {
  company: "OpenDoors Africa Solutions PLC",
  brand: "MobiMates",
  email: "support@themobimates.com",
} as const;

export default function DeleteAccountContent() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <header className="border-b border-[var(--color-line)] pb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-amber)]">
          Account
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight text-[var(--color-forest)] md:text-5xl">
          Delete Your Account
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--color-ink-soft)]">
          Request deletion of your {CONTACT.brand} account and associated personal data. This page
          explains how deletion works for App Store and Google Play requirements.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
          How to delete your account
        </h2>

        <div className="mt-6 space-y-4">
          <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white/80 p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-forest)] text-[var(--color-amber-300)]">
                <Smartphone className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-[var(--color-forest)]">
                  Option 1 — In the app (recommended)
                </h3>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-[var(--color-ink-soft)]">
                  <li>Open the MobiMates app and sign in.</li>
                  <li>Go to Profile → Settings (or Account).</li>
                  <li>Select Delete Account and confirm the request.</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white/80 p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-forest)] text-[var(--color-amber-300)]">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-[var(--color-forest)]">
                  Option 2 — By email
                </h3>
                <p className="mt-3 leading-relaxed text-[var(--color-ink-soft)]">
                  If you cannot access the app, email us from the phone number or email linked to
                  your account:
                </p>
                <p className="mt-3">
                  <a
                    href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("MobiMates account deletion request")}`}
                    className="text-lg font-semibold text-[var(--color-amber)] underline-offset-2 hover:underline"
                  >
                    {CONTACT.email}
                  </a>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                  Include your registered phone number and the subject line{" "}
                  <span className="font-medium text-[var(--color-forest)]">
                    &quot;MobiMates account deletion request&quot;
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
          <Trash2 className="h-6 w-6 text-[var(--color-amber)]" aria-hidden />
          What happens after you request deletion
        </h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-[var(--color-ink-soft)]">
          <li>
            We will suspend your account and begin processing your deletion request.
          </li>
          <li>
            Personal profile data used to operate your account (such as name, phone number,
            profile photo, and preferences) will be deleted or anonymized, except where retention
            is required by law.
          </li>
          <li>
            Some records may be retained for a limited period as required by Ethiopian legal, tax,
            accounting, or safety obligations — for example transaction history, dispute records,
            or information needed to prevent circumvention of security bans. See our{" "}
            <Link
              href={routes.privacy}
              className="font-medium text-[var(--color-amber)] underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            for details.
          </li>
          <li>
            Any remaining positive wallet balance may be refunded subject to deduction of
            outstanding platform fees, pending disputes, or verified claims, as described in our{" "}
            <Link
              href={routes.terms}
              className="font-medium text-[var(--color-amber)] underline-offset-2 hover:underline"
            >
              Terms &amp; Conditions
            </Link>
            .
          </li>
          <li>
            After deletion is completed, you will no longer be able to sign in with that account.
            Creating a new account later requires a fresh registration.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
          Data categories affected
        </h2>
        <p className="mt-3 leading-relaxed text-[var(--color-ink-soft)]">
          Deletion typically covers account and profile information you provided, identity and
          vehicle documents associated with verification, device and usage identifiers tied to your
          account, in-app messaging history linked to your profile, and marketing preferences.
          Aggregated or anonymized analytics that cannot identify you may be retained.
        </p>
      </section>

      <section className="mt-12 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-cream-200)]/40 p-6">
        <h2 className="text-lg font-bold text-[var(--color-forest)]">Need help?</h2>
        <p className="mt-2 text-[var(--color-ink-soft)]">
          Questions about deletion or your data rights:{" "}
          <Link
            href={routes.support}
            className="font-medium text-[var(--color-amber)] underline-offset-2 hover:underline"
          >
            Support
          </Link>{" "}
          or{" "}
          <a
            href={`mailto:${CONTACT.email}`}
            className="font-medium text-[var(--color-amber)] underline-offset-2 hover:underline"
          >
            {CONTACT.email}
          </a>
          .
        </p>
        <p className="mt-4 text-sm text-[var(--color-ink-soft)]">
          Operated by {CONTACT.company}.
        </p>
      </section>
    </article>
  );
}
