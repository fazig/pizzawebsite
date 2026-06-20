"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Flame } from "lucide-react";
import { Pizza } from "@/types";
import { GlassCard, SpiceIndicator } from "@/components/ui/glass-card";
import { formatCurrency } from "@/lib/utils";
import { useCartStore, calculateUnitPrice } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface PizzaCardProps {
  pizza: Pizza;
  index?: number;
}

export function PizzaCard({ pizza, index = 0 }: PizzaCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const unitPrice = calculateUnitPrice(pizza.price, "medium", "classic", 50, []);
    addItem({
      pizzaId: pizza.id,
      name: pizza.name,
      image: pizza.image,
      size: "medium",
      crust: "classic",
      cheeseLevel: 50,
      extraToppings: [],
      quantity: 1,
      unitPrice,
    });
    toast(`${pizza.name} added to cart!`, "success");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link href={`/product/${pizza.id}`}>
        <GlassCard className="group overflow-hidden p-0 cursor-pointer">
          <div className="relative h-52 overflow-hidden">
            <Image
              src={pizza.image}
              alt={pizza.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {pizza.isPremium && (
              <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-gradient-to-r from-[#ff6b2c] to-[#ff2d2d] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                <Flame className="h-3 w-3" /> Premium
              </span>
            )}
            <motion.div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ perspective: 800 }}
            >
              <motion.div
                whileHover={{ rotateY: 15, rotateX: -5 }}
                className="h-24 w-24 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 flex items-center justify-center text-4xl"
              >
                🍕
              </motion.div>
            </motion.div>
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display font-semibold text-white group-hover:text-orange-400 transition-colors">
                {pizza.name}
              </h3>
              <span className="font-bold gradient-text shrink-0">
                {formatCurrency(pizza.price)}
              </span>
            </div>

            <p className="mt-2 text-xs text-white/40 line-clamp-2">{pizza.description}</p>

            <div className="mt-3 flex flex-wrap gap-1">
              {pizza.ingredients.slice(0, 3).map((ing) => (
                <span
                  key={ing}
                  className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-white/50"
                >
                  {ing}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-white/40">
                <span>{pizza.calories} cal</span>
                <SpiceIndicator level={pizza.spiceLevel} />
              </div>
              <Button
                size="sm"
                onClick={handleQuickAdd}
                className="relative overflow-hidden"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
