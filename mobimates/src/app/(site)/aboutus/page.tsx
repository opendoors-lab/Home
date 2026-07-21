import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AboutUs from "@/components/AboutUs";
import PageCta from "@/components/PageCta";
import { aboutUs, brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us — MobiMates",
  description: aboutUs.mission.body,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Community-driven carpooling"
        title={aboutUs.pageTitle}
        description={`${brand.name} is a movement rooted in mutual help (meredat) — not a taxi app, and not gig-economy ride-hailing.`}
        amharic={brand.taglineAm}
      />
      <AboutUs />
      <PageCta
        title="Be part of the movement"
        body="Every empty seat is a chance to help a neighbor and share the journey."
      />
    </>
  );
}
