import Link from "next/link";
import { ArrowRight, BadgeCheck, MapPin, ShieldCheck, Car } from "lucide-react";
import { howItWorksGlance } from "@/lib/content";
import { routes } from "@/lib/routes";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";

const icons = [BadgeCheck, MapPin, ShieldCheck, Car];

export default function HowItWorksGlance() {
  return (
    <Section>
      <Reveal>
        <h2 className="text-4xl text-[var(--color-forest)] md:text-5xl">
          {howItWorksGlance.title}
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {howItWorksGlance.steps.map((step, i) => {
          const Icon = icons[i] ?? Car;
          return (
            <Reveal key={step.title} delay={i * 0.07}>
              <div className="card-lift relative h-full rounded-2xl border border-[var(--color-line)] bg-white/80 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-amber)]/15 text-[var(--color-amber)]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-[var(--color-forest)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                  {step.body}
                </p>
                {i < howItWorksGlance.steps.length - 1 && (
                  <span
                    className="route-line absolute -right-3 top-1/2 hidden w-6 lg:block"
                    aria-hidden
                  />
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={0.2}>
        <Link
          href={routes.howItWorks}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-amber)] hover:underline"
        >
          See the full 8-step journey
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </Section>
  );
}
