import { ShieldCheck, Users, MapPin, BadgeCheck } from "lucide-react";
import Reveal from "./ui/Reveal";

const stats = [
  { icon: BadgeCheck, label: "Digital ID verified", sub: "Every user, every ride" },
  { icon: ShieldCheck, label: "OTP before departure", sub: "The right match, every time" },
  { icon: MapPin, label: "Live GPS tracking", sub: "Route alerts & SOS" },
  { icon: Users, label: "Community-driven", sub: "Neighbors, not taxi fares" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-forest)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-cream)]/10 text-[var(--color-amber-300)]">
                <s.icon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-semibold text-[var(--color-cream)]">{s.label}</p>
                <p className="mt-1 text-sm text-[var(--color-cream)]/70">{s.sub}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
