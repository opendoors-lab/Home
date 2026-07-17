import type { Metadata } from "next";
import SupportPageContent from "@/components/SupportPageContent";

export const metadata: Metadata = {
  title: "Support — MobiMates",
  description:
    "Contact OpenDoors Africa Solutions PLC for MobiMates help, account issues, and safety concerns.",
};

export default function SupportPage() {
  return <SupportPageContent />;
}
