import type { Metadata } from "next";
import driver from "@/assets/driver.jpg";
import PageHero from "@/components/ui/PageHero";
import AudiencePage from "@/components/AudiencePage";
import PageCta from "@/components/PageCta";
import { drivers } from "@/lib/content";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "For Ride Givers — MobiMates",
  description: drivers.body[0],
};

export default function DriversPage() {
  return (
    <>
      <PageHero
        eyebrow={drivers.eyebrow}
        title={drivers.title}
        description={drivers.body[0]}
        image={driver}
        imageAlt="A car owner offering a ride to a verified neighbor"
      />
      <AudiencePage
        data={drivers}
        image={driver}
        imageAlt="Ride giver welcoming a verified rider"
        ctaHref={routes.getStarted}
        ctaLabel="Start sharing your route"
        contentOnly
      />
      <PageCta
        title="Turn empty seats into good deeds"
        body="Share a drive you're already making — and welcome fair cost-sharing along the way."
      />
    </>
  );
}
