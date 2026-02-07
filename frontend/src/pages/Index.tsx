import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustSignals from "@/components/TrustSignals";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustSignals />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
