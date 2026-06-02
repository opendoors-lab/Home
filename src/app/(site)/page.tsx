import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorksGlance from "@/components/HowItWorksGlance";
import WhyMobiMates from "@/components/WhyMobiMates";
import SafetyHighlight from "@/components/SafetyHighlight";
import TrustBar from "@/components/TrustBar";
import ExploreGrid from "@/components/ExploreGrid";
import CtaBanner from "@/components/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Problem compact />
      <HowItWorksGlance />
      <div className="mx-auto max-w-6xl px-6">
        <WhyMobiMates />
      </div>
      <SafetyHighlight />
      <ExploreGrid />
      <CtaBanner />
    </>
  );
}
