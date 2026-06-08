import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import Pill from "./Pill";
import { routes } from "@/lib/routes";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  amharic?: string;
  image?: StaticImageData;
  imageAlt?: string;
  dark?: boolean;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  amharic,
  image,
  imageAlt = "",
  dark = false,
}: Props) {
  return (
    <section
      className={`relative overflow-hidden border-b ${
        dark
          ? "border-[var(--color-forest)]/40 bg-[var(--color-forest)] text-[var(--color-cream)]"
          : "border-[var(--color-line)] bg-gradient-to-br from-[var(--color-cream)] via-[var(--color-cream-200)]/40 to-[var(--color-cream)]"
      }`}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: dark ? "var(--color-amber)" : "var(--brand-orange)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--brand-blue)" }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-20">
        <div>
          <nav className="mb-6 flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
            <Link
              href={routes.home}
              className={`transition-colors hover:text-[var(--color-amber)] ${dark ? "text-[var(--color-cream)]/70" : ""}`}
            >
              Home
            </Link>
            <span className={dark ? "text-[var(--color-cream)]/40" : "text-[var(--color-line)]"}>
              /
            </span>
            <span className={dark ? "text-[var(--color-cream)]" : "text-[var(--color-forest)]"}>
              {title}
            </span>
          </nav>

          {eyebrow && <Pill>{eyebrow}</Pill>}

          <h1
            className={`mt-4 text-4xl leading-[1.05] md:text-5xl lg:text-6xl ${
              dark ? "text-[var(--color-cream)]" : "text-[var(--color-forest)]"
            }`}
          >
            {title}
          </h1>

          {amharic && (
            <p className="amharic mt-3 text-xl font-semibold text-[var(--color-amber)] md:text-2xl">
              «{amharic}»
            </p>
          )}

          {description && (
            <p
              className={`mt-5 max-w-xl text-lg leading-relaxed ${
                dark ? "text-[var(--color-cream)]/85" : "text-[var(--color-ink-soft)]"
              }`}
            >
              {description}
            </p>
          )}
        </div>

        {image && (
          <div className="relative aspect-[16/11] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] ring-1 ring-black/5">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              placeholder="blur"
              quality={72}
              sizes="(min-width:768px) 42vw, 100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[var(--color-forest)]/30 to-transparent" />
          </div>
        )}
      </div>
    </section>
  );
}
