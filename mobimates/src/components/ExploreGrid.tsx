import Link from "next/link";
import {
  Car,
  Coffee,
  Coins,
  Heart,
  Leaf,
  Route,
  Shield,
  Sparkles,
  Users,
  ArrowUpRight,
} from "lucide-react";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import { explorePages } from "@/lib/routes";

const icons = {
  heart: Heart,
  route: Route,
  sparkles: Sparkles,
  shield: Shield,
  car: Car,
  users: Users,
  coins: Coins,
  leaf: Leaf,
  coffee: Coffee,
} as const;

export default function ExploreGrid() {
  return (
    <Section>
      <Reveal>
        <p className="text-sm font-bold uppercase tracking-wider text-[var(--color-amber)]">
          Explore MobiMates
        </p>
        <h2 className="mt-2 text-4xl text-[var(--color-forest)] md:text-5xl">
          Everything about shared rides
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-ink-soft)]">
          Each topic has its own page — dive into how we match neighbors, keep trips safe,
          and build a carpooling movement for Addis Ababa.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {explorePages.map((page, i) => {
          const Icon = icons[page.icon];
          return (
            <Reveal key={page.href} delay={(i % 4) * 0.05}>
              <Link
                href={page.href}
                className="card-lift group flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white/70 p-6 backdrop-blur-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-forest)] text-[var(--color-amber-300)]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-[var(--color-forest)] group-hover:text-[var(--color-amber)]">
                  {page.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                  {page.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-amber)]">
                  Learn more
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
