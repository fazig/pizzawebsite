"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, Clock, Home, Navigation } from "lucide-react";
import { PageTransition } from "@/components/effects/page-transition";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const currentOrder = useOrderStore((s) => s.currentOrder);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (currentOrder?.estimatedDelivery) {
      const target = new Date(currentOrder.estimatedDelivery).getTime();
      const update = () => {
        const diff = Math.max(0, Math.floor((target - Date.now()) / 1000));
        setCountdown(diff);
      };
      update();
      const interval = setInterval(update, 1000);
      return () => clearInterval(interval);
    }
  }, [currentOrder]);

  const mins = Math.floor(countdown / 60);
  const secs = countdown % 60;

  if (!currentOrder) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center pt-24">
        <div className="text-center">
          <p className="text-white/50">No order found.</p>
          <Link href="/"><Button className="mt-4">Back Home</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-2xl px-4 pt-32 pb-24 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30"
        >
          <CheckCircle className="h-12 w-12 text-green-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 font-display text-4xl font-bold text-white"
        >
          Order Confirmed!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-6xl"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            🍕
          </motion.span>
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
            className="inline-block ml-2"
          >
            🔥
          </motion.span>
        </motion.div>

        <GlassCard className="mt-10 text-left space-y-4" hover={false}>
          <div className="flex justify-between items-center">
            <span className="text-white/50 text-sm">Order ID</span>
            <span className="font-mono text-orange-400 font-medium">{orderId || currentOrder.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/50 text-sm flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Address</span>
            <span className="text-white text-sm text-right max-w-[200px]">
              {currentOrder.customer.address}, {currentOrder.customer.city}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/50 text-sm">Payment</span>
            <span className="text-green-400 text-sm capitalize">{currentOrder.paymentStatus}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/50 text-sm">Total</span>
            <span className="font-bold gradient-text">{formatCurrency(currentOrder.total)}</span>
          </div>
          <div className="border-t border-white/10 pt-4 flex items-center justify-center gap-2">
            <Clock className="h-5 w-5 text-orange-400" />
            <span className="font-display text-2xl font-bold text-white">
              {mins}:{secs.toString().padStart(2, "0")}
            </span>
            <span className="text-white/50 text-sm">estimated delivery</span>
          </div>
        </GlassCard>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/track?orderId=${currentOrder.id}`}>
            <Button size="lg">
              <Navigation className="h-5 w-5" />
              Track Order
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              <Home className="h-5 w-5" />
              Back Home
            </Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" /></div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
