import type { Metadata } from "next";
import PrivacyPolicy from "@/components/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy — MobiMates",
  description:
    "How OpenDoors Africa Solutions PLC (MobiMates) collects, uses, shares, and protects your personal data.",
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
