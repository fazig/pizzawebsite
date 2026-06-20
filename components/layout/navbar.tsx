"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, User, Flame } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/constants/navigation";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "glass-strong py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff6b2c] to-[#ff2d2d] shadow-lg shadow-orange-500/30 transition-transform group-hover:scale-105">
            <Flame className="h-5 w-5 text-white animate-flame" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            {SITE_CONFIG.name.split(" ")[0]}
            <span className="gradient-text"> Pizza</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-orange-400"
                    : "text-white/60 hover:text-white"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-orange-500/10 border border-orange-500/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/account" className="hidden sm:flex">
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Link href="/cart" className="relative">
            <Button variant="glass" size="icon" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#ff6b2c] to-[#ff2d2d] text-[10px] font-bold text-white neon-glow"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <Link href="/menu" className="hidden md:block">
            <Button size="sm" className="relative overflow-hidden">
              <span className="relative z-10">Order Now</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-[#ff2d2d] to-[#ff6b2c]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-strong mx-4 mt-2 overflow-hidden rounded-2xl lg:hidden"
          >
            <ul className="flex flex-col p-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-orange-500/10 text-orange-400"
                        : "text-white/70 hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 border-t border-white/10 pt-2">
                <Link href="/account" className="block rounded-xl px-4 py-3 text-sm text-white/70">
                  Login / Account
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
