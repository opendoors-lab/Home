import { Coins, Heart, Receipt, Users } from "lucide-react";
import { costSharing } from "@/lib/content";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";

const pointIcons = [Users, Coins, Receipt, Heart];

export default function CostSharing({ fullPage = false }: { fullPage?: boolean }) {
  return (
    <Section className={fullPage ? "" : "border-y border-[var(--color-line)]"}>
      <Reveal>
        {!fullPage && (
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <h2 className="text-4xl text-[var(--color-forest)] md:text-5xl">
              {costSharing.title}
            </h2>
            <div>
              <p className="text-lg leading-relaxed text-[var(--color-ink-soft)]">
                {costSharing.body}
              </p>
            </div>
          </div>
        )}

        <div className={`grid gap-5 sm:grid-cols-2 ${fullPage ? "" : "mt-10"}`}>
          {costSharing.points.map((p, i) => {
            const Icon = pointIcons[i] ?? Coins;
            return (
              <div
                key={p}
                className="card-lift flex gap-4 rounded-2xl border border-[var(--color-line)] bg-white/80 p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-amber)]/15 text-[var(--color-amber)]">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="leading-relaxed text-[var(--color-ink-soft)]">{p}</p>
              </div>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
