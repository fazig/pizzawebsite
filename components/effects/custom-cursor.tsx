"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    setVisible(true);

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          target.closest("a, button, [role='button']") !== null
      );
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="cursor-dot hidden md:block"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isPointer ? 1.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="h-3 w-3 rounded-full bg-white" />
      </motion.div>
      <motion.div
        className="cursor-dot hidden md:block"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.8 }}
      >
        <div
          className="h-10 w-10 rounded-full border border-white/30"
          style={{ opacity: 0.4 }}
        />
      </motion.div>
    </>
  );
}
