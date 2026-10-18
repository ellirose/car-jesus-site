import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { About } from "@/components/sections/About";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { Contact } from "@/components/sections/Contact";
import { Financing } from "@/components/sections/Financing";
import { Hero } from "@/components/sections/Hero";
import { Inventory } from "@/components/sections/Inventory";
import { SellCar } from "@/components/sections/SellCar";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhySell } from "@/components/sections/WhySell";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { SearchProvider } from "@/lib/search-context";

const canvas = "var(--color-canvas)";
const mist = "var(--color-mist)";
const frost = "var(--color-frost)";
const white = "#ffffff";

/**
 * Section backgrounds alternate canvas → white → mist; every change of colour
 * is bridged by a drifting wave so the page flows rather than steps.
 */
export default function Home() {
  return (
    <SearchProvider>
      <Header />
      <main>
        <Hero />
        <BrandMarquee />
        <Services />
        <WaveDivider from={canvas} to={white} />
        <Inventory />
        <WaveDivider from={white} to={mist} line="var(--color-aqua-300)" />
        <SellCar />
        <WhySell />
        <WaveDivider from={mist} to={white} />
        <Financing />
        <WaveDivider from={white} to={canvas} line="var(--color-aqua-300)" />
        <About />
        <Testimonials />
        <WaveDivider from={canvas} to={mist} />
        <Contact />
      </main>
      <WaveDivider from={mist} to={frost} line="var(--color-aqua-300)" />
      <Footer />
      <WhatsAppFab />
    </SearchProvider>
  );
}
