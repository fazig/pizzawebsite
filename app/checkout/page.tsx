"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, Banknote, Wallet } from "lucide-react";
import { PageTransition, FadeIn } from "@/components/effects/page-transition";
import { GlassCard, FlameButton } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore, useOrderStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { PaymentMethod, CustomerInfo } from "@/types";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getTax = useCartStore((s) => s.getTax);
  const getDeliveryFee = useCartStore((s) => s.getDeliveryFee);
  const getTotal = useCartStore((s) => s.getTotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const placeOrder = useOrderStore((s) => s.placeOrder);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [form, setForm] = useState<CustomerInfo>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    apartment: "",
    city: "",
  });

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null;
  }

  const updateField = (field: keyof CustomerInfo, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.address || !form.city) {
      toast("Please fill in all required fields", "error");
      return;
    }
    const order = placeOrder(items, form, paymentMethod);
    clearCart();
    toast("Order placed successfully!", "success");
    router.push(`/confirmation?orderId=${order.id}`);
  };

  const paymentOptions = [
    { value: "cod" as const, label: "Cash on Delivery", icon: Banknote },
    { value: "card" as const, label: "Credit / Debit Card", icon: CreditCard },
    { value: "stripe" as const, label: "Stripe Pay", icon: Wallet },
  ];

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <FadeIn>
          <h1 className="font-display text-4xl font-bold text-white">
            <span className="gradient-text">Checkout</span>
          </h1>
        </FadeIn>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-6">
            <GlassCard hover={false}>
              <h2 className="font-display text-lg font-semibold text-white mb-6">Delivery Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Input id="address" value={form.address} onChange={(e) => updateField("address", e.target.value)} required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="apartment">Apt / House No.</Label>
                  <Input id="apartment" value={form.apartment} onChange={(e) => updateField("apartment", e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" value={form.city} onChange={(e) => updateField("city", e.target.value)} required className="mt-1.5" />
                </div>
              </div>
            </GlassCard>

            <GlassCard hover={false}>
              <h2 className="font-display text-lg font-semibold text-white mb-6">Payment Method</h2>
              <div className="grid gap-3">
                {paymentOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPaymentMethod(opt.value)}
                    className={cn(
                      "flex items-center gap-4 rounded-xl p-4 text-left transition-all",
                      paymentMethod === opt.value
                        ? "bg-orange-500/15 border border-orange-500/40"
                        : "glass hover:border-white/20"
                    )}
                  >
                    <opt.icon className={cn("h-5 w-5", paymentMethod === opt.value ? "text-orange-400" : "text-white/40")} />
                    <span className={cn("font-medium", paymentMethod === opt.value ? "text-white" : "text-white/60")}>
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>

              {(paymentMethod === "card" || paymentMethod === "stripe") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6 space-y-4 border-t border-white/10 pt-6"
                >
                  <div>
                    <Label>Card Number</Label>
                    <Input placeholder="4242 4242 4242 4242" className="mt-1.5" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Expiry</Label>
                      <Input placeholder="MM/YY" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>CVC</Label>
                      <Input placeholder="123" className="mt-1.5" />
                    </div>
                  </div>
                  <p className="text-xs text-white/30">Stripe integration ready — connect your API keys in production.</p>
                </motion.div>
              )}
            </GlassCard>
          </div>

          <div className="lg:col-span-2">
            <GlassCard className="sticky top-28 space-y-4" hover={false}>
              <h2 className="font-display text-lg font-semibold text-white">Order Summary</h2>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-white/60 truncate mr-2">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-white shrink-0">{formatCurrency(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-white/60"><span>Subtotal</span><span>{formatCurrency(getSubtotal())}</span></div>
                <div className="flex justify-between text-white/60"><span>Tax</span><span>{formatCurrency(getTax())}</span></div>
                <div className="flex justify-between text-white/60"><span>Delivery</span><span>{getDeliveryFee() === 0 ? "FREE" : formatCurrency(getDeliveryFee())}</span></div>
                <div className="flex justify-between font-display text-xl font-bold pt-2">
                  <span className="text-white">Total</span>
                  <span className="gradient-text">{formatCurrency(getTotal())}</span>
                </div>
              </div>
              <FlameButton type="submit" className="w-full">
                Place Order — {formatCurrency(getTotal())}
              </FlameButton>
            </GlassCard>
          </div>
        </form>
      </div>
    </PageTransition>
  );
}
