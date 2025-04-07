import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WorksHowSection from "@/components/WorksHowSection";
import FeaturedRecipesSection from "@/components/FeaturedRecipesSection";
import CallToActionSection from "@/components/CallToActionSection";
import Footer from "@/components/Footer";

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WorksHowSection />
      <FeaturedRecipesSection />
      <CallToActionSection />
      <Footer />
    </>
  );
}

export default HomePage;
