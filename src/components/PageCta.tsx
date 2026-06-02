import Button from "./ui/Button";
import { routes } from "@/lib/routes";

type Props = {
  title?: string;
  body?: string;
};

export default function PageCta({
  title = "Ready to share the road?",
  body = "Download MobiMates, verify your route, and start your day with a good deed.",
}: Props) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-4">
      <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-forest)] px-8 py-14 text-center md:py-16">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--color-amber)]/20 blur-3xl"
          aria-hidden
        />
        <h2 className="relative text-3xl text-[var(--color-cream)] md:text-4xl">{title}</h2>
        <p className="relative mx-auto mt-4 max-w-lg text-lg text-[var(--color-cream)]/80">{body}</p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-4">
          <Button href={routes.getStarted} variant="onDark">
            Download MobiMates
          </Button>
          <Button href={routes.faq} variant="secondary" className="!border-[var(--color-cream)]/30 !text-[var(--color-cream)] !bg-transparent hover:!bg-[var(--color-cream)]/10">
            Read FAQ
          </Button>
        </div>
      </div>
    </section>
  );
}
