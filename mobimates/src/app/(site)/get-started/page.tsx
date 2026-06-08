import type { Metadata } from "next";
import { Smartphone, BadgeCheck, Route, Coffee } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { brand, finalCta } from "@/lib/content";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Get Started — MobiMates",
  description: finalCta.body,
};

const steps = [
  {
    icon: Smartphone,
    title: "Download the app",
    body: "Available on iOS and Android. Register with your phone number in minutes.",
  },
  {
    icon: BadgeCheck,
    title: "Verify with Digital ID",
    body: "Ride givers also submit license and vehicle documents for team review.",
  },
  {
    icon: Route,
    title: "Match on your route",
    body: "Set origin, destination, and schedule — instant, recurring, or planned ahead.",
  },
  {
    icon: Coffee,
    title: "Share the road",
    body: "Confirm with OTP, travel to meeting points, and earn rewards along the way.",
  },
];

export default function GetStartedPage() {
  return (
    <>
      <PageHero
        eyebrow="Join the movement"
        title={finalCta.title}
        description={finalCta.body}
        amharic={brand.taglineAm}
        dark
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="card-lift h-full rounded-2xl border border-[var(--color-line)] bg-white/80 p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-forest)] text-[var(--color-amber-300)]">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl text-[var(--color-forest)]">{s.title}</h3>
                <p className="mt-2 text-[var(--color-ink-soft)]">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-col items-center gap-6 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-cream-200)] p-10 text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-[var(--color-amber)]">
              App stores coming soon
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="#" className="min-w-[200px] opacity-90" external>
                App Store
              </Button>
              <Button href="#" className="min-w-[200px] opacity-90" external>
                Google Play
              </Button>
            </div>
            <p className="max-w-md text-sm text-[var(--color-ink-soft)]">
              Because on our roads, every seat counts. «{brand.taglineAm}»
            </p>
            <Button href={routes.howItWorks} variant="secondary">
              Learn how it works first
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
