"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { FAQS } from "@/constants/pizzas";
import { SITE_CONFIG } from "@/constants/navigation";
import { PageTransition, FadeIn } from "@/components/effects/page-transition";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [chatOpen, setChatOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Message sent! We'll reply within 24 hours.", "success");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h1 className="font-display text-4xl font-bold text-white">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="mt-4 text-white/50">We&apos;d love to hear from you</p>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <GlassCard hover={false}>
              <h2 className="font-display text-xl font-semibold text-white mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-1.5" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="mt-1.5" />
                </div>
                <div>
                  <Label>Message</Label>
                  <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required className="mt-1.5" rows={5} />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4" /> Send Message
                </Button>
              </form>
            </GlassCard>

            <div className="mt-6 space-y-3">
              {[
                { icon: MapPin, text: SITE_CONFIG.address },
                { icon: Phone, text: SITE_CONFIG.phone },
                { icon: Mail, text: SITE_CONFIG.email },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-white/50">
                  <Icon className="h-4 w-4 text-orange-400 shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <GlassCard hover={false} className="h-64 lg:h-full min-h-[300px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a12]">
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,107,44,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,44,0.15) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
              </div>
              <div className="relative text-center">
                <MapPin className="h-10 w-10 text-orange-400 mx-auto" />
                <p className="mt-3 text-white font-medium">Google Maps</p>
                <p className="text-sm text-white/40 mt-1">{SITE_CONFIG.address}</p>
                <p className="text-xs text-white/30 mt-2">Embed your Google Maps API key in production</p>
              </div>
            </GlassCard>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} className="mt-20">
          <h2 className="font-display text-2xl font-bold text-white text-center mb-8">FAQ</h2>
          <GlassCard hover={false} className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible>
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GlassCard>
        </FadeIn>
      </div>

      <motion.button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#ff6b2c] to-[#ff2d2d] text-white shadow-lg shadow-orange-500/30 neon-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Support chat"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {chatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-24 left-6 z-50 w-80 glass-strong rounded-2xl p-4 shadow-2xl"
        >
          <p className="font-semibold text-white text-sm">Support Chat</p>
          <p className="text-xs text-white/50 mt-1">Hi! How can we help you today?</p>
          <Input placeholder="Type a message..." className="mt-3" />
          <Button size="sm" className="mt-2 w-full">Send</Button>
        </motion.div>
      )}
    </PageTransition>
  );
}
