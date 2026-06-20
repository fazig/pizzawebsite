import { HeroSection, FeaturesSection } from "@/components/home/hero-section";
import { PageTransition } from "@/components/effects/page-transition";
import Link from "next/link";
import { PIZZAS } from "@/constants/pizzas";
import { PizzaCard } from "@/components/menu/pizza-card";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "Home",
  "Pizza Reimagined. Premium 3D pizza delivery experience with live tracking."
);

export default function HomePage() {
  const featured = PIZZAS.slice(0, 3);

  return (
    <PageTransition>
      <HeroSection />
      <FeaturesSection />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-medium text-orange-400 uppercase tracking-wider">Featured</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
                Trending Pizzas
              </h2>
            </div>
            <Link
              href="/menu"
              className="text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((pizza, i) => (
              <PizzaCard key={pizza.id} pizza={pizza} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
