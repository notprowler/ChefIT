import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WorksHowSection from "@/components/WorksHowSection";
import FeaturedRecipesSection from "@/components/FeaturedRecipesSection";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <Navbar/>
      <HeroSection />
      < WorksHowSection />
      <FeaturedRecipesSection />
    </>
  );
}

export default HomePage;
