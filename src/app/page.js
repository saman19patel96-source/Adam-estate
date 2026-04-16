import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <FeaturedListings />
        <About />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
