// app/page.tsx
import { Hero } from "@/components/hero";
import { FearGrid } from "@/components/fear-grid";
import { Analogies } from "@/components/analogies";
import { FutureProjection } from "@/components/future-projection";
import { PythonDominance } from "@/components/python-dominance";
import { OfferSection } from "@/components/offer-section";
import { Testimonials } from "@/components/testimonials";
import { FinalCta } from "@/components/final-cta";

export default function Home() {
  return (
    <main> 
      <Hero />



      <FearGrid />

      <Analogies />

      <FutureProjection />

      <PythonDominance />

      <OfferSection />

      <Testimonials />

      <FinalCta />
    </main>
  );
}