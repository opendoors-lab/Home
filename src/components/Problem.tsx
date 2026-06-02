import Link from "next/link";
import { problem } from "@/lib/content";
import { routes } from "@/lib/routes";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import { ArrowRight } from "lucide-react";

export default function Problem({ compact = false }: { compact?: boolean }) {
  return (
    <Section className="border-y border-[var(--color-line)]">
      <Reveal>
        <div className={`grid gap-10 ${compact ? "md:grid-cols-[1fr_1.2fr]" : "max-w-3xl"}`}>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-[var(--color-amber)]">
              The commute gap
            </p>
            <h2 className="mt-2 text-4xl text-[var(--color-forest)] md:text-5xl">
              {problem.title}
            </h2>
          </div>
          <div>
            <p className="text-xl leading-relaxed text-[var(--color-ink-soft)]">{problem.body}</p>
            {compact && (
              <Link
                href={routes.howItWorks}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-amber)] hover:underline"
              >
                See how MobiMates connects the dots
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
