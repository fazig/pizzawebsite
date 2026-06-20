"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, Tag, ArrowRight, ShoppingBag } from "lucide-react";
import { PageTransition, FadeIn } from "@/components/effects/page-transition";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, getEstimatedMinutes } from "@/lib/utils";
import { useState } from "react";

export default function CartPage() {
  const router = useRouter();
  const { toast } = useToast();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const applyPromo = useCartStore((s) => s.applyPromo);
  const promoCode = useCartStore((s) => s.promoCode);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getTax = useCartStore((s) => s.getTax);
  const getDeliveryFee = useCartStore((s) => s.getDeliveryFee);
  const getTotal = useCartStore((s) => s.getTotal);
  const [promoInput, setPromoInput] = useState("");

  const handlePromo = () => {
    if (applyPromo(promoInput)) {
      toast("Promo code applied!", "success");
    } else {
      toast("Invalid promo code", "error");
    }
  };

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="flex min-h-[70vh] flex-col items-center justify-center pt-24 px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-7xl mb-6"
          >
            🛒
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-white">Your cart is empty</h1>
          <p className="mt-2 text-white/50">Add some delicious pizzas to get started!</p>
          <Link href="/menu">
            <Button className="mt-8" size="lg">
              <ShoppingBag className="h-5 w-5" />
              Browse Menu
            </Button>
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <FadeIn>
          <h1 className="font-display text-4xl font-bold text-white">
            Your <span className="gradient-text">Cart</span>
          </h1>
          <p className="mt-2 text-white/50">{items.length} item(s) · Est. {getEstimatedMinutes(items.length)} min delivery</p>
        </FadeIn>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard className="flex gap-4 p-4" hover={false}>
                    <div className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{item.name}</h3>
                      <p className="text-xs text-white/40 mt-1 capitalize">
                        {item.size} · {item.crust} crust
                        {item.extraToppings.length > 0 && ` · +${item.extraToppings.join(", ")}`}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium text-white w-6 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-orange-400">
                            {formatCurrency(item.unitPrice * item.quantity)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-400 hover:text-red-300"
                            onClick={() => {
                              removeItem(item.id);
                              toast("Item removed", "info");
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <FadeIn delay={0.1}>
            <GlassCard className="sticky top-28 space-y-4" hover={false}>
              <h2 className="font-display text-lg font-semibold text-white">Order Summary</h2>

              <div className="flex gap-2">
                <Input
                  placeholder="Promo code"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                />
                <Button variant="outline" onClick={handlePromo}>
                  <Tag className="h-4 w-4" />
                </Button>
              </div>
              {promoCode && (
                <p className="text-xs text-green-400">Code {promoCode} applied!</p>
              )}

              <div className="space-y-2 text-sm border-t border-white/10 pt-4">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>{formatCurrency(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Tax (8%)</span>
                  <span>{formatCurrency(getTax())}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Delivery</span>
                  <span>{getDeliveryFee() === 0 ? "FREE" : formatCurrency(getDeliveryFee())}</span>
                </div>
                <div className="flex justify-between font-display text-xl font-bold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="gradient-text">{formatCurrency(getTotal())}</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={() => router.push("/checkout")}
              >
                Proceed to Checkout
                <ArrowRight className="h-5 w-5" />
              </Button>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}
