import Image, { type StaticImageData } from "next/image";
import { drivers, riders } from "@/lib/content";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import Pill from "./ui/Pill";
import Button from "./ui/Button";
import { routes } from "@/lib/routes";

type AudienceData = typeof drivers | typeof riders;

export default function AudiencePage({
  data,
  image,
  imageAlt,
  ctaHref,
  ctaLabel,
  contentOnly = false,
}: {
  data: AudienceData;
  image: StaticImageData;
  imageAlt: string;
  ctaHref: string;
  ctaLabel: string;
  contentOnly?: boolean;
}) {
  if (contentOnly) {
    return (
      <Section>
        {data.body.slice(1).map((b) => (
          <Reveal key={b}>
            <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-[var(--color-ink-soft)]">
              {b}
            </p>
          </Reveal>
        ))}
        <Reveal delay={0.1}>
          <blockquote className="amharic mx-auto mt-8 max-w-2xl rounded-2xl border-l-4 border-[var(--color-amber)] bg-[var(--color-cream-200)] px-8 py-6 text-center text-xl italic text-[var(--color-forest)]">
            “{data.quote}”
          </blockquote>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {data.points.map((pt, i) => (
              <div
                key={pt}
                className="card-lift rounded-2xl border border-[var(--color-line)] bg-white/80 p-6"
              >
                <span className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-amber)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 leading-relaxed text-[var(--color-ink-soft)]">{pt}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href={ctaHref}>{ctaLabel}</Button>
          <Button href={routes.howItWorks} variant="secondary">
            See how it works
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <Reveal>
          <div>
            <Pill>{data.eyebrow}</Pill>
            <h2 className="mt-5 text-3xl text-[var(--color-forest)] md:text-4xl">{data.title}</h2>
            {data.body.map((b) => (
              <p key={b} className="mt-4 text-lg leading-relaxed text-[var(--color-ink-soft)]">
                {b}
              </p>
            ))}
            <blockquote className="amharic mt-8 rounded-2xl border-l-4 border-[var(--color-amber)] bg-[var(--color-cream-200)] px-6 py-5 text-lg italic text-[var(--color-forest)]">
              “{data.quote}”
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={ctaHref}>{ctaLabel}</Button>
              <Button href={routes.howItWorks} variant="secondary">
                See how it works
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] ring-1 ring-[var(--color-line)]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              placeholder="blur"
              quality={72}
              sizes="(min-width:1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {data.points.map((pt, i) => (
            <div
              key={pt}
              className="card-lift rounded-2xl border border-[var(--color-line)] bg-white/80 p-6"
            >
              <span className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-amber)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 leading-relaxed text-[var(--color-ink-soft)]">{pt}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
