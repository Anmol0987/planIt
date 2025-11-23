import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { InteractiveScreens } from "@/components/InteractiveScreen";
import Navbar from "@/components/navbar";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <InteractiveScreens />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
}
