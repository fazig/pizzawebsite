"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, ChefHat, Package, Bike, MapPin, PartyPopper } from "lucide-react";
import { PageTransition, FadeIn } from "@/components/effects/page-transition";
import { GlassCard } from "@/components/ui/glass-card";
import { Progress } from "@/components/ui/progress";
import { useOrderStore } from "@/lib/store";
import { OrderStatus } from "@/types";
import { cn } from "@/lib/utils";

const STEPS: { status: OrderStatus; label: string; icon: typeof Check }[] = [
  { status: "received", label: "Order Received", icon: Check },
  { status: "cooking", label: "Cooking", icon: ChefHat },
  { status: "packing", label: "Packing", icon: Package },
  { status: "rider-assigned", label: "Rider Assigned", icon: Bike },
  { status: "on-the-way", label: "On the Way", icon: MapPin },
  { status: "delivered", label: "Delivered", icon: PartyPopper },
];

const STATUS_ORDER: OrderStatus[] = STEPS.map((s) => s.status);

function TrackContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const currentOrder = useOrderStore((s) => s.currentOrder);
  const trackingStatus = useOrderStore((s) => s.trackingStatus);
  const updateTrackingStatus = useOrderStore((s) => s.updateTrackingStatus);
  const [countdown, setCountdown] = useState(1800);
  const [riderPos, setRiderPos] = useState(10);

  useEffect(() => {
    if (!currentOrder) return;
    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < STATUS_ORDER.length) {
        updateTrackingStatus(STATUS_ORDER[stepIndex]);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [currentOrder, updateTrackingStatus]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((c) => Math.max(0, c - 1));
      setRiderPos((p) => Math.min(90, p + 0.5));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentIndex = STATUS_ORDER.indexOf(trackingStatus);
  const progress = ((currentIndex + 1) / STATUS_ORDER.length) * 100;

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn>
            <h1 className="font-display text-4xl font-bold text-white text-center">
              Live <span className="gradient-text">Tracking</span>
            </h1>
            {orderId && (
              <p className="text-center text-white/40 mt-2 font-mono text-sm">{orderId}</p>
            )}
          </FadeIn>

          <FadeIn delay={0.1} className="mt-8">
            <GlassCard hover={false} className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a12]">
                <div className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,107,44,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,44,0.1) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
                  <motion.path
                    d="M 40 160 Q 120 120 200 100 T 360 60"
                    fill="none"
                    stroke="rgba(255,107,44,0.4)"
                    strokeWidth="3"
                    strokeDasharray="8 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                  />
                </svg>
                <motion.div
                  className="absolute text-3xl"
                  style={{ left: `${riderPos}%`, top: `${100 - riderPos * 0.5}%` }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  🛵
                </motion.div>
                <div className="absolute left-4 bottom-4 text-xs text-orange-400/60">Restaurant</div>
                <div className="absolute right-4 top-4 text-xs text-green-400/60">Your Location</div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-sm text-white/60">ETA</span>
                <span className="font-display text-2xl font-bold text-white">
                  {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, "0")}
                </span>
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-8">
            <Progress value={progress} className="h-2" />
          </FadeIn>

          <div className="mt-8 space-y-3">
            {STEPS.map((step, i) => {
              const isActive = i <= currentIndex;
              const isCurrent = i === currentIndex;
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.status}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard
                    className={cn(
                      "flex items-center gap-4 p-4 transition-all",
                      isCurrent && "border-orange-500/40 shadow-lg shadow-orange-500/10"
                    )}
                    hover={false}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl transition-all",
                        isActive
                          ? "bg-gradient-to-br from-[#ff6b2c] to-[#ff2d2d] text-white"
                          : "bg-white/5 text-white/30"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className={cn("font-medium", isActive ? "text-white" : "text-white/40")}>
                        {step.label}
                      </p>
                      {isCurrent && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-orange-400 mt-0.5"
                        >
                          In progress...
                        </motion.p>
                      )}
                    </div>
                    {isActive && i < currentIndex && (
                      <Check className="h-5 w-5 text-green-400" />
                    )}
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center pt-24"><div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" /></div>}>
      <TrackContent />
    </Suspense>
  );
}
