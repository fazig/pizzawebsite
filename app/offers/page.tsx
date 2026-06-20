"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Copy, Tag } from "lucide-react";
import { DEALS } from "@/constants/pizzas";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "@/components/effects/page-transition";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

function CountdownTimer({ expiresAt }: { expiresAt: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const update = () => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <div className="flex gap-3 mt-4">
      {[
        { val: timeLeft.days, label: "Days" },
        { val: timeLeft.hours, label: "Hrs" },
        { val: timeLeft.mins, label: "Min" },
        { val: timeLeft.secs, label: "Sec" },
      ].map((t) => (
        <div key={t.label} className="glass rounded-lg px-3 py-2 text-center min-w-[52px]">
          <p className="font-display text-xl font-bold text-white">{t.val.toString().padStart(2, "0")}</p>
          <p className="text-[10px] text-white/40 uppercase">{t.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function OffersPage() {
  const { toast } = useToast();

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast(`Code ${code} copied!`, "success");
  };

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-medium text-orange-400 uppercase tracking-wider">Exclusive Deals</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-2">
            Hot <span className="gradient-text">Offers</span>
          </h1>
          <p className="mt-4 text-white/50 max-w-lg mx-auto">
            Limited-time deals on your favorite pizzas. Grab them before they expire.
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {DEALS.map((deal) => (
            <StaggerItem key={deal.id}>
              <GlassCard className="overflow-hidden p-0 h-full flex flex-col">
                <div className="relative h-48">
                  <Image src={deal.image} alt={deal.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-gradient-to-r from-[#ff6b2c] to-[#ff2d2d] px-3 py-1 text-xs font-bold text-white">
                    {deal.badge}
                  </span>
                  <motion.span
                    className="absolute top-4 right-4 font-display text-2xl font-bold gradient-text"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {deal.discount}
                  </motion.span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-xl font-bold text-white">{deal.title}</h3>
                  <p className="mt-2 text-sm text-white/50 flex-1">{deal.description}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <Tag className="h-4 w-4 text-orange-400" />
                    <code className="text-sm font-mono text-orange-400">{deal.code}</code>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyCode(deal.code)}>
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-white/40">
                    <Clock className="h-3.5 w-3.5" />
                    Expires soon
                  </div>
                  <CountdownTimer expiresAt={deal.expiresAt} />
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </PageTransition>
  );
}
