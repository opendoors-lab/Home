import { Heart, MapPin, Users, Handshake } from "lucide-react";
import { aboutUs } from "@/lib/content";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";

const diffIcons = [Users, Heart, Handshake, MapPin];

export default function AboutUs() {
  return (
    <>
      <Section>
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-wider text-[var(--color-amber)]">
            {aboutUs.mission.title}
          </p>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-[var(--color-ink-soft)]">
            {aboutUs.mission.body}
          </p>
        </Reveal>
      </Section>

      <Section className="border-y border-[var(--color-line)] bg-[var(--color-cream-200)]/40">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-wider text-[var(--color-amber)]">
            {aboutUs.gap.title}
          </p>
          <div className="mt-6 max-w-3xl space-y-6">
            {aboutUs.gap.paragraphs.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-[var(--color-ink-soft)]">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <h2 className="text-3xl text-[var(--color-forest)] md:text-4xl">
            {aboutUs.differentiators.title}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {aboutUs.differentiators.items.map((item, i) => {
            const Icon = diffIcons[i] ?? Heart;
            return (
              <Reveal key={item} delay={i * 0.06}>
                <div className="card-lift flex gap-4 rounded-2xl border border-[var(--color-line)] bg-white/80 p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-forest)] text-[var(--color-amber-300)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="leading-relaxed text-[var(--color-ink-soft)]">{item}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="pb-8">
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-[var(--radius-card)] bg-[var(--color-forest)] px-8 py-12 text-center md:px-12">
            <p className="text-sm font-bold uppercase tracking-wider text-[var(--color-amber-300)]">
              {aboutUs.philosophy.title}
            </p>
            <blockquote className="mt-6 text-xl font-medium italic leading-relaxed text-[var(--color-cream)] md:text-2xl">
              “{aboutUs.philosophy.quote}”
            </blockquote>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
