"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Zap } from "lucide-react";
import { REVIEWS } from "@/constants/pizzas";
import { FlameButton } from "@/components/ui/glass-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/effects/page-transition";

const Pizza3D = dynamic(
  () => import("@/components/3d/pizza-model").then((m) => m.Pizza3D),
  { ssr: false, loading: () => <div className="h-[400px] w-full animate-pulse rounded-full bg-white/5" /> }
);

function DeliveryScooter() {
  return (
    <motion.div
      className="absolute bottom-20 left-0 opacity-20 pointer-events-none"
      animate={{ x: ["-10%", "110%"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <div className="flex items-center gap-2 text-4xl">
        <span>🛵</span>
        <span className="text-sm font-medium text-orange-400/60">Delivering...</span>
      </div>
    </motion.div>
  );
}

function FloatingReview({ review, index }: { review: typeof REVIEWS[0]; index: number }) {
  const positions = [
    "top-32 left-8",
    "top-48 right-8",
    "bottom-32 left-16",
  ];
  return (
    <motion.div
      className={`absolute hidden lg:block ${positions[index % 3]} z-10`}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="glass max-w-[220px] rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-xs font-bold">
            {review.avatar}
          </div>
          <div>
            <p className="text-xs font-semibold text-white">{review.name}</p>
            <div className="flex gap-0.5">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-white/60 leading-relaxed">{review.text.slice(0, 80)}...</p>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      <DeliveryScooter />

      {REVIEWS.map((review, i) => (
        <FloatingReview key={review.id} review={review} index={i} />
      ))}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-orange-400/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <FadeIn className="text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-orange-400 mb-6"
            >
              <Zap className="h-3.5 w-3.5" />
              Next-Gen Food Delivery
            </motion.div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              <span className="gradient-text neon-text">Pizza</span>
              <br />
              <span className="text-white">Reimagined.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg text-white/50 leading-relaxed mx-auto lg:mx-0">
              Experience the future of pizza delivery. 3D-crafted menu, live tracking,
              and flavors that transcend ordinary.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/menu">
                <FlameButton>
                  Order Now
                  <ArrowRight className="h-5 w-5" />
                </FlameButton>
              </Link>
              <Link href="/offers">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass rounded-2xl px-8 py-4 font-semibold text-white/80 hover:text-white hover:border-orange-500/30 transition-all"
                >
                  View Deals
                </motion.button>
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 justify-center lg:justify-start">
              {[
                { value: "25min", label: "Avg Delivery" },
                { value: "4.9★", label: "Rating" },
                { value: "50K+", label: "Orders" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-xs text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[350px] sm:h-[450px] lg:h-[550px]"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/20 via-red-500/10 to-transparent blur-3xl" />
            <Pizza3D className="relative h-full w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const features = [
    { icon: "🍕", title: "3D Menu Experience", desc: "Explore every pizza in immersive 3D before you order." },
    { icon: "⚡", title: "Lightning Delivery", desc: "AI-optimized routes get your pizza to you in under 30 minutes." },
    { icon: "🔥", title: "900° Wood-Fired", desc: "Blistered crust, molten cheese, authentic Neapolitan heat." },
    { icon: "📍", title: "Live Tracking", desc: "Watch your order from oven to doorstep in real-time." },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="glass group rounded-2xl p-6 transition-all hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="mt-4 font-display font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
