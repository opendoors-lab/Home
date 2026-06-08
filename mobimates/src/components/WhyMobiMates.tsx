import { Car, Heart, Shield, Wallet } from "lucide-react";
import { whyMobiMates } from "@/lib/content";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";

const cardIcons = [Car, Wallet, Shield, Heart];

export default function WhyMobiMates() {
  return (
    <Section className="rounded-[var(--radius-card)] bg-[var(--color-forest)] py-16 text-[var(--color-cream)] md:py-20">
      <Reveal>
        <h2 className="text-4xl text-[var(--color-cream)] md:text-5xl">
          {whyMobiMates.title}
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {whyMobiMates.cards.map((c, i) => {
          const Icon = cardIcons[i] ?? Heart;
          return (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="card-lift h-full rounded-2xl border border-[var(--color-cream)]/15 bg-[var(--color-cream)]/5 p-6 backdrop-blur-sm">
                <Icon className="h-7 w-7 text-[var(--color-amber-300)]" />
                <h3 className="mt-4 text-xl text-[var(--color-amber-300)]">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-cream)]/80">
                  {c.body}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
