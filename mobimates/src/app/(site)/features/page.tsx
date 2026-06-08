import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Features from "@/components/Features";
import PageCta from "@/components/PageCta";
import { features } from "@/lib/content";

export const metadata: Metadata = {
  title: "Features — MobiMates",
  description: features.intro,
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Built for carpooling"
        title={features.title}
        description={features.intro}
      />
      <Features showIntro={false} />
      <PageCta />
    </>
  );
}
