import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Currently } from "@/components/Currently";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SelectedWork } from "@/components/SelectedWork";
import { ThreeSides } from "@/components/ThreeSides";
import { Toolkit } from "@/components/Toolkit";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-[100] focus:bg-electric focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <ThreeSides />
        <SelectedWork />
        <InstagramFeed />
        <Toolkit />
        <Currently />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
