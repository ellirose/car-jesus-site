import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { SearchProvider } from "@/lib/search-context";

export default function Home() {
  return (
    <SearchProvider>
      <Header />
      <main>
        <Hero />
      </main>
    </SearchProvider>
  );
}
