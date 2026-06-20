"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { PIZZAS } from "@/constants/pizzas";
import { PizzaCard } from "@/components/menu/pizza-card";
import { PageTransition, FadeIn } from "@/components/effects/page-transition";
import { Input } from "@/components/ui/input";
import { PizzaCategory } from "@/types";
import { cn } from "@/lib/utils";

const FILTERS: { label: string; value: PizzaCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Veg", value: "veg" },
  { label: "Chicken", value: "chicken" },
  { label: "Beef", value: "beef" },
  { label: "Cheese Burst", value: "cheese-burst" },
  { label: "Spicy", value: "spicy" },
  { label: "Premium", value: "premium" },
];

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<PizzaCategory | "all">("all");

  const filtered = useMemo(() => {
    return PIZZAS.filter((p) => {
      const matchesSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.ingredients.some((i) => i.toLowerCase().includes(search.toLowerCase()));
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "premium" ? p.isPremium : p.category.includes(activeFilter));
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-sm font-medium text-orange-400 uppercase tracking-wider">Menu</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-2">
            Explore Our <span className="gradient-text">Pizzas</span>
          </h1>
          <p className="mt-4 text-white/50 max-w-xl">
            Every pizza crafted with premium ingredients. Filter, search, and customize your perfect slice.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <Input
              placeholder="Search pizzas, ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-6">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={cn(
                  "shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-all",
                  activeFilter === f.value
                    ? "bg-gradient-to-r from-[#ff6b2c] to-[#ff2d2d] text-white shadow-lg shadow-orange-500/20"
                    : "glass text-white/60 hover:text-white"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((pizza, i) => (
            <PizzaCard key={pizza.id} pizza={pizza} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🍕</p>
            <p className="text-white/50">No pizzas match your search. Try a different filter.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
