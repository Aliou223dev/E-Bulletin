import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { RolesSection } from "@/components/RolesSection";
import { SecuritySection } from "@/components/SecuritySection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <RolesSection />
        <SecuritySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
