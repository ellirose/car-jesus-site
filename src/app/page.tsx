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
import { SearchProvider } from "@/lib/search-context";

export default function Home() {
  return (
    <SearchProvider>
      <Header />
      <main>
        <Hero />
        <BrandMarquee />
        <Services />
        <Inventory />
        <SellCar />
        <WhySell />
        <Financing />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </SearchProvider>
  );
}
