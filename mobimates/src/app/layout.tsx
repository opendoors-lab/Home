import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, Noto_Sans_Ethiopic } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ethiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  variable: "--font-ethiopic",
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MobiMates — Every Seat Counts",
  description:
    "Peer-to-peer carpooling for Addis Ababa. Share your commute, rescue a neighbor from the queue, split the cost. Safer than going it alone, smarter than driving empty.",
  metadataBase: new URL("https://mobimates.com"),
  openGraph: {
    title: "MobiMates — Every Seat Counts",
    description: "Trusted carpooling for Addis Ababa.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${hanken.variable} ${ethiopic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
