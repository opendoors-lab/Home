import {
  BadgeCheck,
  Calendar,
  Coffee,
  Fingerprint,
  MapPin,
  Radio,
  RefreshCw,
  ShieldAlert,
  Siren,
  Star,
  User,
} from "lucide-react";
import { features } from "@/lib/content";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";

const featureIcons = [
  Fingerprint,
  RefreshCw,
  Calendar,
  Radio,
  BadgeCheck,
  MapPin,
  ShieldAlert,
  Siren,
  Star,
  User,
];

export default function Features({ showIntro = true }: { showIntro?: boolean }) {
  return (
    <Section>
      {showIntro && (
        <Reveal>
          <h2 className="text-4xl text-[var(--color-forest)] md:text-5xl">{features.title}</h2>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-ink-soft)]">{features.intro}</p>
        </Reveal>
      )}

      <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${showIntro ? "mt-12" : "mt-0"}`}>
        {features.items.map((f, i) => {
          const Icon = featureIcons[i] ?? Coffee;
          return (
            <Reveal key={f.title} delay={(i % 3) * 0.06}>
              <div className="card-lift h-full rounded-2xl border border-[var(--color-line)] bg-white/75 p-6 backdrop-blur-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-forest)] text-[var(--color-amber-300)]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-[var(--color-forest)]">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                  {f.body}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
