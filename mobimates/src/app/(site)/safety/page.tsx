import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Safety from "@/components/Safety";
import PageCta from "@/components/PageCta";
import { safety } from "@/lib/content";

export const metadata: Metadata = {
  title: "Safety & Security — MobiMates",
  description: safety.intro,
};

export default function SafetyPage() {
  return (
    <>
      <PageHero
        eyebrow="Non-negotiable"
        title={safety.title}
        description={safety.intro}
        dark
      />
      <Safety showIntro={false} />
      <PageCta
        title="Travel with peace of mind"
        body="Every trip is verified, tracked, and protected — so you can focus on the good deed."
      />
    </>
  );
}
