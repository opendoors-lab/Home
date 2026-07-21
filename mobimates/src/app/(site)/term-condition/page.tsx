import type { Metadata } from "next";
import TermsAndConditions from "@/components/TermsAndConditions";

export const metadata: Metadata = {
  title: "Terms and Conditions — MobiMates",
  description:
    "Terms and Conditions governing use of the MobiMates platform by OpenDoors Africa Solutions PLC.",
};

export default function TermsPage() {
  return <TermsAndConditions />;
}
