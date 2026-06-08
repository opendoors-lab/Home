import { howItWorks } from "@/lib/content";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";

export default function HowItWorks({ showIntro = true }: { showIntro?: boolean }) {
  return (
    <Section>
      {showIntro && (
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-wider text-[var(--color-amber)]">
            Your journey
          </p>
          <h2 className="mt-2 text-4xl text-[var(--color-forest)] md:text-5xl">
            {howItWorks.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-ink-soft)]">
            {howItWorks.intro}
          </p>
        </Reveal>
      )}

      <div className={`${showIntro ? "mt-14" : "mt-0"} space-y-0`}>
        {howItWorks.steps.map((s, i) => (
          <Reveal key={s.n} delay={(i % 2) * 0.06}>
            <div className="relative grid gap-6 border-b border-[var(--color-line)] py-10 md:grid-cols-[100px_1fr] md:gap-10">
              <div className="flex md:flex-col md:items-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-forest)] font-[family-name:var(--font-display)] text-xl text-[var(--color-amber-300)]">
                  {s.n}
                </span>
                {i < howItWorks.steps.length - 1 && (
                  <div className="route-line mx-auto mt-4 hidden h-12 w-full max-w-[2px] rotate-90 opacity-40 md:block" />
                )}
              </div>
              <div>
                <h3 className="text-2xl text-[var(--color-forest)]">{s.title}</h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-[var(--color-ink-soft)]">
                  {s.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
