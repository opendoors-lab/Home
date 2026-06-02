import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { safetyHighlight } from "@/lib/content";
import { routes } from "@/lib/routes";
import Reveal from "./ui/Reveal";

export default function SafetyHighlight() {
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-forest)]">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-16 md:flex-row md:items-center md:gap-12 md:py-20">
        <Reveal>
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-cream)]/10 text-[var(--color-amber-300)]">
            <ShieldCheck className="h-7 w-7" />
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="flex-1">
            <h2 className="text-3xl text-[var(--color-cream)] md:text-4xl">
              {safetyHighlight.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-cream)]/85">
              {safetyHighlight.body}
            </p>
            <Link
              href={routes.safety}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-amber-300)] hover:underline"
            >
              Explore Safety & Security
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
