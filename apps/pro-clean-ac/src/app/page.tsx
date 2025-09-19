import { Navigation } from "@/components/layout/navigation";
import { HeroSection } from "@/components/layout/hero-section";
import { ServicesSection } from "@/components/layout/services-section";
import { TestimonialsSection } from "@/components/layout/testimonials-section";
import { CorporateClientsSection } from "@/components/layout/corporate-clients-section";
import { TeamSection } from "@/components/layout/team-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <TestimonialsSection />
        <CorporateClientsSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
