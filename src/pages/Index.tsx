
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedListings from "@/components/FeaturedListings";
import BenefitsSection from "@/components/BenefitCard";
import ContactSection from "@/components/ContactSection";
// Footer is no longer imported or used

const Index = () => {
  useEffect(() => {
    // Add intersection observer to animate sections when they come into view
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    document.querySelectorAll(".section-animate").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturedListings />
      <BenefitsSection />
      <ContactSection />
      {/* Footer component removed */}
    </div>
  );
};

export default Index;
