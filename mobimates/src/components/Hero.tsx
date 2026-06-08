import Image from "next/image";
import hero from "@/assets/hero.jpg";
import { hero as h } from "@/lib/content";
import { routes } from "@/lib/routes";
import Pill from "./ui/Pill";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(242,115,20,0.12),transparent)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-28">
        <Reveal>
          <div>
            <Pill>{h.kicker}</Pill>
            <h1 className="mt-6 text-5xl leading-[1.02] text-[var(--color-forest)] md:text-7xl lg:text-[4.5rem]">
              {h.title}
            </h1>
            <p className="amharic mt-3 text-2xl font-semibold text-[var(--color-amber)] md:text-3xl">
              «{h.titleAm}»
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-ink-soft)]">
              {h.body}
            </p>

            <div className="route-line mt-8 max-w-xs opacity-70" aria-hidden />

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={routes.getStarted}>{h.primaryCta}</Button>
              <Button href={routes.howItWorks} variant="secondary">
                {h.secondaryCta}
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] ring-1 ring-[var(--color-line)]">
              <Image
                src={hero}
                alt="A driver welcoming a verified rider at sunrise in Addis Ababa"
                fill
                priority
                placeholder="blur"
                quality={72}
                sizes="(min-width:768px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-forest)]/35 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-4 -left-4 max-w-[220px] rounded-2xl border border-[var(--color-line)] bg-white/95 p-4 shadow-[var(--shadow-soft)] backdrop-blur md:-left-8">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-amber)]">
                Verified match
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--color-forest)]">
                Digital ID + secure OTP before every trip
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
