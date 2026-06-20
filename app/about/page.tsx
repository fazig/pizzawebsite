"use client";

import { FadeIn, StaggerContainer, StaggerItem, PageTransition } from "@/components/effects/page-transition";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";

const CHEFS = [
  { name: "Marco Rossi", role: "Head Pizzaiolo", bio: "20 years in Naples. Master of the 90-second bake.", emoji: "👨‍🍳" },
  { name: "Yuki Tanaka", role: "Sauce Architect", bio: "Fermentation scientist. Every sauce aged to perfection.", emoji: "🧪" },
  { name: "Sofia Mendez", role: "Pastry & Dough", bio: "48-hour cold proof evangelist. Crust is everything.", emoji: "🌾" },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-medium text-orange-400 uppercase tracking-wider">Our Story</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-2">
            Born from <span className="gradient-text">Fire</span>
          </h1>
          <p className="mt-6 text-lg text-white/50 leading-relaxed">
            Fazig Pizza started with a simple belief: pizza delivery should feel as premium as dining at a Michelin-starred trattoria. We built the future of food ordering — immersive, intelligent, and impossibly delicious.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-20">
          <div className="relative glass rounded-3xl overflow-hidden p-8 md:p-16">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/5" />
            <div className="relative grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl font-bold text-white">The Kitchen</h2>
                <p className="mt-4 text-white/50 leading-relaxed">
                  Our 900°F brick ovens fire up at dawn. Every dough ball is hand-stretched, every sauce simmered for hours. We source San Marzano tomatoes from Campania, buffalo mozzarella from artisan dairies, and flour milled to our exact specification.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    { val: "48h", label: "Dough Rest" },
                    { val: "900°", label: "Oven Temp" },
                    { val: "90s", label: "Bake Time" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="font-display text-2xl font-bold gradient-text">{s.val}</p>
                      <p className="text-xs text-white/40 mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-64 md:h-80">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <div className="text-[120px] opacity-80">🔥</div>
                </motion.div>
                {[
                  { left: 28, top: 35 },
                  { left: 45, top: 62 },
                  { left: 62, top: 28 },
                  { left: 35, top: 55 },
                  { left: 55, top: 42 },
                  { left: 72, top: 58 },
                  { left: 40, top: 38 },
                  { left: 68, top: 48 },
                ].map((ember, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-2 w-2 rounded-full bg-orange-400/60"
                    style={{ left: `${ember.left}%`, top: `${ember.top}%` }}
                    animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="mt-24">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-white">Meet the Chefs</h2>
          </FadeIn>
          <StaggerContainer className="grid gap-6 md:grid-cols-3">
            {CHEFS.map((chef) => (
              <StaggerItem key={chef.name}>
                <GlassCard className="text-center">
                  <div className="text-5xl mb-4">{chef.emoji}</div>
                  <h3 className="font-display text-xl font-bold text-white">{chef.name}</h3>
                  <p className="text-sm text-orange-400 mt-1">{chef.role}</p>
                  <p className="text-sm text-white/50 mt-3">{chef.bio}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <FadeIn delay={0.3} className="mt-24">
          <GlassCard hover={false} className="text-center py-12">
            <h2 className="font-display text-2xl font-bold text-white">Ingredient Sourcing</h2>
            <p className="mt-4 text-white/50 max-w-2xl mx-auto">
              San Marzano DOP tomatoes · DOP buffalo mozzarella · Caputo 00 flour · Sicilian olive oil · Locally farmed produce within 50 miles
            </p>
          </GlassCard>
        </FadeIn>
      </div>
    </PageTransition>
  );
}
