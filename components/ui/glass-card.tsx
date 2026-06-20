"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "glass rounded-2xl p-6 transition-shadow duration-300",
        hover && "hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-500/20",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function FlameButton({
  children,
  className,
  onClick,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-2xl px-8 py-4 font-semibold text-white transition-all disabled:opacity-50",
        className
      )}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-[#ff6b2c] to-[#ff2d2d]" />
      <span className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute bottom-0 h-4 w-1 rounded-full bg-yellow-400"
            style={{ left: `${15 + i * 17}%` }}
            animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6], scaleY: [1, 1.3, 1] }}
            transition={{ duration: 0.4 + i * 0.1, repeat: Infinity, delay: i * 0.05 }}
          />
        ))}
      </span>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 rounded-2xl shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow" />
    </button>
  );
}

export function SpiceIndicator({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-3 w-1.5 rounded-full transition-colors",
            i < level
              ? "bg-gradient-to-t from-red-600 to-orange-400"
              : "bg-white/10"
          )}
        />
      ))}
    </div>
  );
}
