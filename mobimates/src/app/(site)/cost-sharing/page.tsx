import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CostSharing from "@/components/CostSharing";
import PageCta from "@/components/PageCta";
import { costSharing } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cost-Sharing — MobiMates",
  description: costSharing.body,
};

export default function CostSharingPage() {
  return (
    <>
      <PageHero
        eyebrow="Not a taxi fare"
        title={costSharing.title}
        description={costSharing.body}
      />
      <CostSharing fullPage />
      <PageCta />
    </>
  );
}
