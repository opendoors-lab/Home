import type { Metadata } from "next";
import DeleteAccountContent from "@/components/DeleteAccountContent";

export const metadata: Metadata = {
  title: "Delete Account — MobiMates",
  description:
    "How to request deletion of your MobiMates account and what personal data is removed or retained.",
};

export default function DeleteAccountPage() {
  return <DeleteAccountContent />;
}
