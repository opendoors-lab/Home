import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Rewards from "@/components/Rewards";
import PageCta from "@/components/PageCta";
import { rewards } from "@/lib/content";

export const metadata: Metadata = {
  title: "Rewards & Milestones — MobiMates",
  description: rewards.coffee.body,
};

export default function RewardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Thank you for sharing"
        title={rewards.pageTitle}
        description="Small moments of appreciation that keep a good habit going — from coffee vouchers to trip recognition."
        amharic={rewards.coffee.titleAm}
      />
      <Rewards />
      <PageCta />
    </>
  );
}
