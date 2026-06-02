import { finalCta } from "@/lib/content";
import Button from "./ui/Button";
import { routes } from "@/lib/routes";

export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-8">
      <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-forest)] px-8 py-16 text-center md:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, var(--color-amber) 0%, transparent 45%)",
          }}
          aria-hidden
        />
        <h2 className="relative mx-auto max-w-2xl text-4xl text-[var(--color-cream)] md:text-5xl">
          {finalCta.title}
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-lg text-[var(--color-cream)]/80">
          {finalCta.body}
        </p>
        <div className="relative mt-8">
          <Button href={routes.getStarted} variant="onDark" className="px-10 py-4 text-base">
            {finalCta.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
