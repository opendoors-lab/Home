"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { faq } from "@/lib/content";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section>
      <div className="divide-y divide-[var(--color-line)] rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white/70 px-6 backdrop-blur-sm md:px-8">
        {faq.items.map((item, i) => (
          <Reveal key={item.q} delay={(i % 3) * 0.04}>
            <div>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-lg font-medium text-[var(--color-forest)]">
                  {item.q}
                </span>
                {open === i ? (
                  <Minus className="h-5 w-5 shrink-0 text-[var(--color-amber)]" />
                ) : (
                  <Plus className="h-5 w-5 shrink-0 text-[var(--color-ink-soft)]" />
                )}
              </button>
              <div
                className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}
              >
                <p className="overflow-hidden leading-relaxed text-[var(--color-ink-soft)]">
                  {item.a}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
