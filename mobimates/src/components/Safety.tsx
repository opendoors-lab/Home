import { ShieldCheck } from "lucide-react";
import { safety } from "@/lib/content";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";

export default function Safety({ showIntro = true }: { showIntro?: boolean }) {
  return (
    <Section>
      {showIntro && (
        <Reveal>
          <h2 className="text-4xl text-[var(--color-forest)] md:text-5xl">{safety.title}</h2>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-ink-soft)]">{safety.intro}</p>
        </Reveal>
      )}

      {/* Desktop table — matches content doc structure */}
      <Reveal delay={0.05}>
        <div
          className={`hidden overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white/80 md:block ${showIntro ? "mt-12" : "mt-0"}`}
        >
          <div className="grid grid-cols-[1.1fr_1.2fr_1.2fr] bg-[var(--color-forest)] text-sm font-semibold text-[var(--color-cream)]">
            <div className="px-6 py-4">{safety.tableHeaders.feature}</div>
            <div className="border-l border-[var(--color-cream)]/15 px-6 py-4">
              {safety.tableHeaders.how}
            </div>
            <div className="border-l border-[var(--color-cream)]/15 px-6 py-4">
              {safety.tableHeaders.benefit}
            </div>
          </div>
          {safety.pillars.map((p, i) => (
            <div
              key={p.feature}
              className={`grid grid-cols-[1.1fr_1.2fr_1.2fr] text-sm ${
                i % 2 === 0 ? "bg-[var(--color-cream)]" : "bg-[var(--color-cream-200)]/50"
              }`}
            >
              <div className="flex items-center gap-3 px-6 py-5 font-semibold text-[var(--color-forest)]">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--color-amber)]" />
                {p.feature}
              </div>
              <div className="border-l border-[var(--color-line)] px-6 py-5 text-[var(--color-ink-soft)]">
                {p.how}
              </div>
              <div className="border-l border-[var(--color-line)] px-6 py-5 text-[var(--color-ink-soft)]">
                {p.benefit}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Mobile cards */}
      <div className={`grid gap-6 md:hidden ${showIntro ? "mt-12" : "mt-0"}`}>
        {safety.pillars.map((p, i) => (
          <Reveal key={p.feature} delay={(i % 2) * 0.08}>
            <div className="card-lift rounded-2xl border border-[var(--color-line)] bg-white/80 p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-forest)] text-[var(--color-amber-300)]">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold text-[var(--color-forest)]">{p.feature}</h3>
              </div>
              <p className="mt-4 text-sm text-[var(--color-ink-soft)]">
                <strong className="text-[var(--color-ink)]">{safety.tableHeaders.how}:</strong>{" "}
                {p.how}
              </p>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                <strong className="text-[var(--color-ink)]">{safety.tableHeaders.benefit}:</strong>{" "}
                {p.benefit}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12">
          <p className="text-sm font-bold uppercase tracking-wider text-[var(--color-amber)]">
            {safety.promiseTitle}
          </p>
          <blockquote className="mt-4 rounded-[var(--radius-card)] border-l-4 border-[var(--color-amber)] bg-[var(--color-cream-200)] p-8 text-lg font-medium italic leading-relaxed text-[var(--color-forest)]">
            {safety.promise}
          </blockquote>
        </div>
      </Reveal>
    </Section>
  );
}
