import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Faq from "@/components/Faq";
import PageCta from "@/components/PageCta";
import { faq } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ — MobiMates",
  description: "Answers about peer-to-peer carpooling in Addis Ababa.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title={faq.title}
        description="Everything you need to know about community carpooling with MobiMates."
      />
      <Faq />
      <PageCta />
    </>
  );
}
