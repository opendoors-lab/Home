import type { Metadata } from "next";
import Sustainability from "@/components/Sustainability";
import PageCta from "@/components/PageCta";
import { sustainability } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sustainability & Impact — MobiMates",
  description: sustainability.intro,
};

export default function SustainabilityPage() {
  return (
    <>
      <Sustainability showHero />
      <PageCta
        title="Every filled seat counts"
        body="Less congestion, cleaner air, stronger community — one shared ride at a time."
      />
    </>
  );
}
