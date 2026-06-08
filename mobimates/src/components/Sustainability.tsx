import Image from "next/image";
import city from "@/assets/city.jpg";
import { sustainability as s } from "@/lib/content";
import Reveal from "./ui/Reveal";
import PageHero from "./ui/PageHero";
import Section from "./ui/Section";

export default function Sustainability({ showHero = false }: { showHero?: boolean }) {
  if (showHero) {
    return (
      <>
        <PageHero
          eyebrow="Beyond one trip"
          title={s.title}
          description={s.intro}
          image={city}
          imageAlt="Addis Ababa skyline"
        />
        <Section>
          <ImpactGrid onLight />
          <Reveal delay={0.15}>
            <p className="mt-12 text-center text-xl font-medium italic text-[var(--color-forest)]">
              {s.band}
            </p>
          </Reveal>
        </Section>
      </>
    );
  }

  return (
    <section className="relative min-h-[520px] overflow-hidden">
      <div className="absolute inset-0 min-h-[520px]">
        <Image
          src={city}
          alt="Addis Ababa skyline"
          fill
          placeholder="blur"
          quality={70}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--color-forest)]/88" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-20 text-[var(--color-cream)] md:py-28">
        <Reveal>
          <h2 className="max-w-2xl text-4xl md:text-5xl">{s.title}</h2>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-cream)]/85">{s.intro}</p>
        </Reveal>
        <ImpactGrid />
        <Reveal delay={0.15}>
          <p className="mt-12 text-xl font-medium italic text-[var(--color-amber-300)]">
            {s.band}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ImpactGrid({ onLight = false }: { onLight?: boolean }) {
  const cardClass = onLight
    ? "rounded-2xl border border-[var(--color-line)] bg-white/80 p-8 shadow-sm"
    : "rounded-2xl border border-[var(--color-cream)]/15 bg-[var(--color-cream)]/5 p-8 backdrop-blur-sm";
  const headingClass = onLight
    ? "text-2xl text-[var(--color-forest)]"
    : "text-2xl text-[var(--color-amber-300)]";
  const textClass = onLight
    ? "text-[var(--color-ink-soft)]"
    : "text-[var(--color-cream)]/90";
  const dotClass = onLight ? "bg-[var(--color-amber)]" : "bg-[var(--color-amber-300)]";

  return (
    <div className={`grid gap-10 md:grid-cols-2 ${onLight ? "mt-0" : "mt-12"}`}>
      {(
        [
          ["For the city", s.city],
          ["For people", s.people],
        ] as const
      ).map(([label, list], i) => (
        <Reveal key={label} delay={i * 0.1}>
          <div className={cardClass}>
            <h3 className={headingClass}>{label}</h3>
            <ul className="mt-4 space-y-3">
              {list.map((p) => (
                <li key={p} className={`flex gap-3 ${textClass}`}>
                  <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
