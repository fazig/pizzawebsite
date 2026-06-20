"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { getPizzaById, EXTRA_TOPPINGS } from "@/constants/pizzas";
import { PageTransition, FadeIn } from "@/components/effects/page-transition";
import { GlassCard, SpiceIndicator, FlameButton } from "@/components/ui/glass-card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useCartStore, calculateUnitPrice } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { PizzaSize, CrustType } from "@/types";
import { cn } from "@/lib/utils";

const Pizza3DSmall = dynamic(
  () => import("@/components/3d/pizza-model").then((m) => m.Pizza3DSmall),
  { ssr: false, loading: () => <div className="h-64 animate-pulse rounded-2xl bg-white/5" /> }
);

const SIZES: PizzaSize[] = ["small", "medium", "large", "xl"];
const CRUSTS: { value: CrustType; label: string }[] = [
  { value: "classic", label: "Classic" },
  { value: "thin", label: "Thin" },
  { value: "stuffed", label: "Stuffed" },
  { value: "gluten-free", label: "Gluten Free" },
];

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const pizza = getPizzaById(params.id as string);
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();

  const [size, setSize] = useState<PizzaSize>("medium");
  const [crust, setCrust] = useState<CrustType>("classic");
  const [cheeseLevel, setCheeseLevel] = useState(50);
  const [extraToppings, setExtraToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const unitPrice = useMemo(() => {
    if (!pizza) return 0;
    return calculateUnitPrice(pizza.price, size, crust, cheeseLevel, extraToppings);
  }, [pizza, size, crust, cheeseLevel, extraToppings]);

  if (!pizza) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="text-center">
          <p className="text-6xl mb-4">🍕</p>
          <h1 className="text-2xl font-bold text-white">Pizza not found</h1>
          <Button className="mt-6" onClick={() => router.push("/menu")}>
            Back to Menu
          </Button>
        </div>
      </div>
    );
  }

  const toggleTopping = (t: string) => {
    setExtraToppings((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const handleAddToCart = () => {
    addItem({
      pizzaId: pizza.id,
      name: pizza.name,
      image: pizza.image,
      size,
      crust,
      cheeseLevel,
      extraToppings,
      quantity,
      unitPrice,
    });
    toast(`${pizza.name} added to cart!`, "success");
  };

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <FadeIn>
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/20 to-red-500/10 blur-3xl" />
              <div className="relative glass rounded-3xl overflow-hidden">
                <div className="h-72 lg:h-96">
                  <Pizza3DSmall className="h-full w-full" />
                </div>
                <div className="relative h-32 -mt-16 mx-6 rounded-2xl overflow-hidden border border-white/10">
                  <Image src={pizza.image} alt={pizza.name} fill className="object-cover" />
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div>
              <h1 className="font-display text-4xl font-bold text-white">{pizza.name}</h1>
              <p className="mt-3 text-white/50 leading-relaxed">{pizza.description}</p>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="glass rounded-xl px-4 py-2 text-sm">
                  <span className="text-white/40">Calories</span>
                  <p className="font-semibold text-white">{pizza.calories}</p>
                </div>
                <div className="glass rounded-xl px-4 py-2 text-sm">
                  <span className="text-white/40">Spice</span>
                  <SpiceIndicator level={pizza.spiceLevel} />
                </div>
                <div className="glass rounded-xl px-4 py-2 text-sm">
                  <span className="text-white/40">Protein</span>
                  <p className="font-semibold text-white">{pizza.nutrition.protein}g</p>
                </div>
              </div>

              <GlassCard className="mt-8 space-y-6" hover={false}>
                <div>
                  <label className="text-sm font-medium text-white/80">Size</label>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {SIZES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={cn(
                          "rounded-xl py-2.5 text-sm font-medium capitalize transition-all",
                          size === s
                            ? "bg-gradient-to-r from-[#ff6b2c] to-[#ff2d2d] text-white"
                            : "glass text-white/60 hover:text-white"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white/80">Crust</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {CRUSTS.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setCrust(c.value)}
                        className={cn(
                          "rounded-xl py-2.5 text-sm font-medium transition-all",
                          crust === c.value
                            ? "bg-gradient-to-r from-[#ff6b2c] to-[#ff2d2d] text-white"
                            : "glass text-white/60 hover:text-white"
                        )}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-white/80">Cheese Level</label>
                    <span className="text-sm text-orange-400">{cheeseLevel}%</span>
                  </div>
                  <Slider
                    value={[cheeseLevel]}
                    onValueChange={([v]) => setCheeseLevel(v)}
                    max={100}
                    step={5}
                    className="mt-3"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white/80">Extra Toppings</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {EXTRA_TOPPINGS.map((t) => (
                      <button
                        key={t}
                        onClick={() => toggleTopping(t)}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                          extraToppings.includes(t)
                            ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                            : "glass text-white/50 hover:text-white"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-display text-xl font-bold text-white w-8 text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-display text-3xl font-bold gradient-text">
                    {formatCurrency(unitPrice * quantity)}
                  </p>
                </div>

                <FlameButton onClick={handleAddToCart} className="w-full">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </FlameButton>
              </GlassCard>
            </div>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}
