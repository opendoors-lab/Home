import { Coffee, Sparkles } from "lucide-react";
import { rewards } from "@/lib/content";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";

export default function Rewards() {
  const { coffee, tripValidation, pageTitle } = rewards;

  return (
    <Section>
      <Reveal>
        <div className="mx-auto max-w-3xl rounded-[var(--radius-card)] border border-[var(--color-amber)]/35 bg-gradient-to-br from-[var(--color-cream-200)] to-white p-10 text-center shadow-[var(--shadow-soft)]">
          <Coffee className="mx-auto h-10 w-10 text-[var(--color-amber)]" />
          <p className="mt-4 text-sm font-bold uppercase tracking-wider text-[var(--color-forest-700)]">
            {pageTitle}
          </p>
          <h2 className="mt-2 text-3xl text-[var(--color-forest)] md:text-4xl">{coffee.title}</h2>
          <p className="amharic mt-2 text-lg font-semibold text-[var(--color-amber)]">
            «{coffee.titleAm}»
          </p>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-ink-soft)]">
            {coffee.body}
          </p>
          <p className="mt-8 text-xl font-medium italic text-[var(--color-forest)]">
            “{coffee.quote}”
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-10 max-w-3xl rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white/80 p-10">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-forest)] text-[var(--color-amber-300)]">
              <Sparkles className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-2xl text-[var(--color-forest)]">{tripValidation.title}</h3>
              <p className="mt-3 leading-relaxed text-[var(--color-ink-soft)]">
                {tripValidation.body}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
