import type { Metadata } from "next";
import commute from "@/assets/commute.jpg";
import PageHero from "@/components/ui/PageHero";
import HowItWorks from "@/components/HowItWorks";
import PageCta from "@/components/PageCta";
import { howItWorks } from "@/lib/content";

export const metadata: Metadata = {
  title: "How It Works — MobiMates",
  description: howItWorks.intro,
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Step by step"
        title={howItWorks.title}
        description={howItWorks.intro}
        image={commute}
        imageAlt="Morning commute in Addis Ababa"
      />
      <HowItWorks showIntro={false} />
      <PageCta />
    </>
  );
}
