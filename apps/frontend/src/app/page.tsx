import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { TrustBadges } from "@/components/TrustBadges";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-900">
      <Header />
      <main>
        <Hero />
        <CategoryGrid />
        <FeaturedProducts />
        <TrustBadges />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
