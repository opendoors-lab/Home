import type { Metadata } from "next";
import rider from "@/assets/rider.jpg";
import PageHero from "@/components/ui/PageHero";
import AudiencePage from "@/components/AudiencePage";
import PageCta from "@/components/PageCta";
import { riders } from "@/lib/content";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "For Riders — MobiMates",
  description: riders.body[0],
};

export default function RidersPage() {
  return (
    <>
      <PageHero
        eyebrow={riders.eyebrow}
        title={riders.title}
        description={riders.body[0]}
        image={rider}
        imageAlt="A rider arriving relaxed and on time"
      />
      <AudiencePage
        data={riders}
        image={rider}
        imageAlt="Rider skipping the queue with comfort"
        ctaHref={routes.getStarted}
        ctaLabel="Find a ride on your route"
        contentOnly
      />
      <PageCta
        title="Skip the queue, not the comfort"
        body="Ride with a verified neighbor — predictable, affordable, and safe."
      />
    </>
  );
}
