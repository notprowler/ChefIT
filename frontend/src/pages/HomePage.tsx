import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WorksHowSection from "@/components/WorksHowSection";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <Navbar/>
      <HeroSection />
      < WorksHowSection />
    </>
  );
}

export default HomePage;
